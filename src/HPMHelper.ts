import { HttpPostRequestMessage } from "./HttpPostRequestMessage";
import { SerializationType } from "./SerializationType";
import { createHmac } from 'crypto'
import { HttpPostResponseMessage } from "./HttpPostResponseMessage";

import { HPRSendAckResponse } from "./HPRSendAckResponse";
import NodeFetch from 'node-fetch';
import { SerializationHelper } from "./SerializationHelper";


function generateHash(data: string, key: string) {
    let hash = createHmac('sha256', key);
    hash = hash.update(data);
    return hash.digest('hex');
}

export class HPMHelper {
    public static BuildForm(baseUrl: string, key: string, requestMessage: HttpPostRequestMessage, serializationType: SerializationType = SerializationType.JSON) {
        var text = SerializationHelper.Serialize(requestMessage, serializationType);
        var contentType = ((serializationType == SerializationType.XML) ? "xml" : "json");
        var hash = generateHash(text, key);
        var body = "";
        body += "<script type='text/javascript'>window.onload=function(){ document.forms['paymentpage'].submit(); };</script>";
        body += `<form action='${baseUrl}/hpm/${contentType}' method='post' id='paymentpage' name='paymentpage' enctype='application/x-www-form-urlencoded'>`;
        body += `<input type='hidden' name='DATA' value='${text}' />`;
        body += `<input type='hidden' name='HASH' value='${hash}' />`;
        body += "</form>";
        return body;
    }
    public static ReceivePaymentRequest(body: any, serializationType: SerializationType = SerializationType.JSON): HttpPostResponseMessage {
        var responseMessage: string = decodeURIComponent(body.DATA);
        var responseData: any = SerializationHelper.Deserialize(responseMessage, serializationType);
        return responseData;
    }
    public static async SendPaymentApproveAsync(baseUrl: string, responseId: string, key: string): Promise<HPRSendAckResponse> {
        var body = {
            RESPONSEID: responseId,
            DATETIME: new Date().toISOString(),
            HASH: null
        };
        body.HASH = generateHash(`{$RESPONSEID$}${body.RESPONSEID}{$DATETIME$}${body.DATETIME}`, key);
        var formRequest = "?" + Object.keys(body).map(key => `${key}=${encodeURIComponent(body[key])}`).join('&');
        var isSuccess = false;
        var errorMessage = "Service error!";
        await NodeFetch(`${baseUrl}/hpm/responseack`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formRequest
        }).then(_ => {
            isSuccess = true;
        }).catch((err) => {
            errorMessage = err;
        });
        var response = new HPRSendAckResponse();
        response.Error = errorMessage;
        response.IsSendSuccess = isSuccess;
        return response;
    }
}
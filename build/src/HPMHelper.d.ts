import { HttpPostRequestMessage } from "./HttpPostRequestMessage";
import { SerializationType } from "./SerializationType";
import { HttpPostResponseMessage } from "./HttpPostResponseMessage";
import { HPRSendAckResponse } from "./HPRSendAckResponse";
export declare class HPMHelper {
    static BuildForm(baseUrl: string, key: string, requestMessage: HttpPostRequestMessage, serializationType?: SerializationType): string;
    static ReceivePaymentRequest(body: any, serializationType?: SerializationType): HttpPostResponseMessage;
    static SendPaymentApproveAsync(baseUrl: string, responseId: string, key: string): Promise<HPRSendAckResponse>;
}
//# sourceMappingURL=HPMHelper.d.ts.map
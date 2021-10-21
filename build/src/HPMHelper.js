"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HPMHelper = void 0;
var tslib_1 = require("tslib");
var SerializationType_1 = require("./SerializationType");
var crypto_1 = require("crypto");
var HPRSendAckResponse_1 = require("./HPRSendAckResponse");
var node_fetch_1 = require("node-fetch");
var SerializationHelper_1 = require("./SerializationHelper");
function generateHash(data, key) {
    var hash = (0, crypto_1.createHmac)('sha256', key);
    hash = hash.update(data);
    return hash.digest('hex');
}
var HPMHelper = (function () {
    function HPMHelper() {
    }
    Object.defineProperty(HPMHelper, "BuildForm", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (baseUrl, key, requestMessage, serializationType) {
            if (serializationType === void 0) { serializationType = SerializationType_1.SerializationType.JSON; }
            var text = SerializationHelper_1.SerializationHelper.Serialize(requestMessage, serializationType);
            var contentType = ((serializationType == SerializationType_1.SerializationType.XML) ? "xml" : "json");
            var hash = generateHash(text, key);
            var body = "";
            body += "<script type='text/javascript'>window.onload=function(){ document.forms['paymentpage'].submit(); };</script>";
            body += "<form action='" + baseUrl + "/hpm/" + contentType + "' method='post' id='paymentpage' name='paymentpage' enctype='application/x-www-form-urlencoded'>";
            body += "<input type='hidden' name='DATA' value='" + text + "' />";
            body += "<input type='hidden' name='HASH' value='" + hash + "' />";
            body += "</form>";
            return body;
        }
    });
    Object.defineProperty(HPMHelper, "ReceivePaymentRequest", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (body, serializationType) {
            if (serializationType === void 0) { serializationType = SerializationType_1.SerializationType.JSON; }
            var responseMessage = decodeURIComponent(body.DATA);
            var responseData = SerializationHelper_1.SerializationHelper.Deserialize(responseMessage, serializationType);
            return responseData;
        }
    });
    Object.defineProperty(HPMHelper, "SendPaymentApproveAsync", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (baseUrl, responseId, key) {
            return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
                var body, formRequest, isSuccess, errorMessage, response;
                return (0, tslib_1.__generator)(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            body = {
                                RESPONSEID: responseId,
                                DATETIME: new Date().toISOString(),
                                HASH: null
                            };
                            body.HASH = generateHash("{$RESPONSEID$}" + body.RESPONSEID + "{$DATETIME$}" + body.DATETIME, key);
                            formRequest = "?" + Object.keys(body).map(function (key) { return key + "=" + encodeURIComponent(body[key]); }).join('&');
                            isSuccess = false;
                            errorMessage = "Service error!";
                            return [4, (0, node_fetch_1.default)(baseUrl + "/hpm/responseack", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    body: formRequest
                                }).then(function (_) {
                                    isSuccess = true;
                                }).catch(function (err) {
                                    errorMessage = err;
                                })];
                        case 1:
                            _a.sent();
                            response = new HPRSendAckResponse_1.HPRSendAckResponse();
                            response.Error = errorMessage;
                            response.IsSendSuccess = isSuccess;
                            return [2, response];
                    }
                });
            });
        }
    });
    return HPMHelper;
}());
exports.HPMHelper = HPMHelper;
//# sourceMappingURL=HPMHelper.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HPMHelper = void 0;
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
    HPMHelper.BuildForm = function (baseUrl, key, requestMessage, serializationType) {
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
    };
    HPMHelper.ReceivePaymentRequest = function (body, serializationType) {
        if (serializationType === void 0) { serializationType = SerializationType_1.SerializationType.JSON; }
        var responseMessage = decodeURIComponent(body.DATA);
        var responseData = SerializationHelper_1.SerializationHelper.Deserialize(responseMessage, serializationType);
        return responseData;
    };
    HPMHelper.SendPaymentApproveAsync = function (baseUrl, responseId, key) {
        return __awaiter(this, void 0, void 0, function () {
            var body, formRequest, isSuccess, errorMessage, response;
            return __generator(this, function (_a) {
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
    };
    return HPMHelper;
}());
exports.HPMHelper = HPMHelper;
//# sourceMappingURL=HPMHelper.js.map
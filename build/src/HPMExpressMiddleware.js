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
exports.HPMExpressMiddleware = void 0;
var Delivery_1 = require("./Delivery");
var HPMHelper_1 = require("./HPMHelper");
var HttpPostRequestMessage_1 = require("./HttpPostRequestMessage");
var Order_1 = require("./Order");
var Payment_1 = require("./Payment");
var ResponseForms_1 = require("./ResponseForms");
var SerializationType_1 = require("./SerializationType");
var User_1 = require("./User");
var HPMExpressMiddleware = (function () {
    function HPMExpressMiddleware(app, hpmUrl, key, baseUrl, path) {
        if (baseUrl === void 0) { baseUrl = ""; }
        if (path === void 0) { path = "/order/payment"; }
        this.app = app;
        this.path = path;
        this.hpmUrl = hpmUrl;
        this.baseUrl = baseUrl;
        this.key = key;
    }
    HPMExpressMiddleware.prototype.usePaymentProcess = function (action) {
        var _this = this;
        this.app.use(this.path + "/process", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var request, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new HttpPostRequestMessage_1.HttpPostRequestMessage();
                        request.User = new User_1.User();
                        request.Order = new Order_1.Order();
                        request.Payment = new Payment_1.Payment();
                        request.Payment.SuccessUrl = "" + this.baseUrl + this.path + "/success";
                        request.Payment.FailUrl = "" + this.baseUrl + this.path + "/failed";
                        request.Payment.ReturnUrl = "" + this.baseUrl + this.path + "/return";
                        request.Delivery = new Delivery_1.Delivery();
                        r = action(request, req, res);
                        if (!(r instanceof Promise)) return [3, 2];
                        return [4, r.catch(console.error)];
                    case 1:
                        r = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (r === false) {
                            return [2];
                        }
                        res.header("Content-Type", "text/html");
                        res.status(200);
                        res.send(HPMHelper_1.HPMHelper.BuildForm(this.hpmUrl, this.key, request, SerializationType_1.SerializationType.JSON));
                        return [2];
                }
            });
        }); });
    };
    HPMExpressMiddleware.prototype.usePaymentSuccess = function (action) {
        var _this = this;
        this.app.use(this.path + "/success", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var response, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = HPMHelper_1.HPMHelper.ReceivePaymentRequest(req.body, SerializationType_1.SerializationType.JSON);
                        r = action(response, req);
                        if (response && response.Request.Error && response.Request.Error.Code === 'PaymentCancelled') {
                            res.header("Content-Type", "text/html");
                            res.status(200);
                            res.send((0, ResponseForms_1.PaymentFailedResponseForm)(r.title, r.message));
                            return [2];
                        }
                        if (!(r instanceof Promise)) return [3, 2];
                        return [4, r.catch(console.error)];
                    case 1:
                        r = _a.sent();
                        _a.label = 2;
                    case 2:
                        res.header("Content-Type", "text/html");
                        res.status(200);
                        res.send((0, ResponseForms_1.PaymentSuccessResponseForm)(r.title, r.message));
                        return [2];
                }
            });
        }); });
    };
    HPMExpressMiddleware.prototype.usePaymentFailed = function (action) {
        var _this = this;
        this.app.use(this.path + "/failed", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var response, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = HPMHelper_1.HPMHelper.ReceivePaymentRequest(req.body, SerializationType_1.SerializationType.JSON);
                        r = action(response, req);
                        if (!(r instanceof Promise)) return [3, 2];
                        return [4, r.catch(console.error)];
                    case 1:
                        r = _a.sent();
                        _a.label = 2;
                    case 2:
                        res.header("Content-Type", "text/html");
                        res.status(200);
                        res.send((0, ResponseForms_1.PaymentFailedResponseForm)(r.title, r.message));
                        return [2];
                }
            });
        }); });
    };
    return HPMExpressMiddleware;
}());
exports.HPMExpressMiddleware = HPMExpressMiddleware;
//# sourceMappingURL=HPMExpressMiddleware.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HPMExpressMiddleware = void 0;
var tslib_1 = require("tslib");
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
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hpmUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.app = app;
        this.path = path;
        this.hpmUrl = hpmUrl;
        this.baseUrl = baseUrl;
        this.key = key;
    }
    Object.defineProperty(HPMExpressMiddleware.prototype, "usePaymentProcess", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (action) {
            var _this = this;
            this.app.use(this.path + "/process", function (req, res, next) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                var request, r;
                return (0, tslib_1.__generator)(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            request = new HttpPostRequestMessage_1.HttpPostRequestMessage();
                            request.User = new User_1.User();
                            request.Order = new Order_1.Order();
                            request.Payment = new Payment_1.Payment();
                            request.Payment.SuccessUrl = "" + this.baseUrl + this.path + "/success";
                            request.Payment.FailUrl = "" + this.baseUrl + this.path + "/failed";
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
        }
    });
    Object.defineProperty(HPMExpressMiddleware.prototype, "usePaymentSuccess", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (action) {
            var _this = this;
            this.app.use(this.path + "/success", function (req, res, next) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                var response, r;
                return (0, tslib_1.__generator)(this, function (_a) {
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
        }
    });
    Object.defineProperty(HPMExpressMiddleware.prototype, "usePaymentFailed", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (action) {
            var _this = this;
            this.app.use(this.path + "/failed", function (req, res, next) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                var response, r;
                return (0, tslib_1.__generator)(this, function (_a) {
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
        }
    });
    return HPMExpressMiddleware;
}());
exports.HPMExpressMiddleware = HPMExpressMiddleware;
//# sourceMappingURL=HPMExpressMiddleware.js.map
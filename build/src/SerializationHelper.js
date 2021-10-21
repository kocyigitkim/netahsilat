"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationHelper = void 0;
var SerializationType_1 = require("./SerializationType");
var xml_1 = require("xml");
var xml_js_1 = require("xml-js");
var SerializationHelper = (function () {
    function SerializationHelper() {
    }
    Object.defineProperty(SerializationHelper, "Serialize", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (requestMessage, serializationType) {
            if (serializationType === void 0) { serializationType = SerializationType_1.SerializationType.JSON; }
            if (serializationType == SerializationType_1.SerializationType.JSON)
                return JSON.stringify(requestMessage);
            else if (serializationType == SerializationType_1.SerializationType.XML) {
                return (0, xml_1.default)(requestMessage);
            }
            else {
                return requestMessage.toString();
            }
        }
    });
    Object.defineProperty(SerializationHelper, "Deserialize", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (response, serializationType) {
            if (serializationType === void 0) { serializationType = SerializationType_1.SerializationType.JSON; }
            if (serializationType == SerializationType_1.SerializationType.JSON)
                return JSON.parse(response);
            else if (serializationType == SerializationType_1.SerializationType.XML) {
                return xml_js_1.default.xml2js(response, { compact: true });
            }
            else {
                return response;
            }
        }
    });
    return SerializationHelper;
}());
exports.SerializationHelper = SerializationHelper;
//# sourceMappingURL=SerializationHelper.js.map
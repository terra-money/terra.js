"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTypeParam = exports.AccessType = void 0;
var types_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/types");
Object.defineProperty(exports, "AccessType", { enumerable: true, get: function () { return types_1.AccessType; } });
var json_1 = require("../../util/json");
var util_1 = require("./util");
/**
 *
 */
var AccessTypeParam = /** @class */ (function (_super) {
    __extends(AccessTypeParam, _super);
    /**
     * @param value access type
     */
    function AccessTypeParam(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    AccessTypeParam.fromAmino = function (data) {
        return new AccessTypeParam((0, util_1.convertAccessTypeFromJSON)(data.value));
    };
    AccessTypeParam.prototype.toAmino = function () {
        var res = {
            value: (0, types_1.accessTypeToJSON)(this.value),
        };
        return res;
    };
    AccessTypeParam.fromData = function (data) {
        return new AccessTypeParam((0, util_1.convertAccessTypeFromJSON)(data.value));
    };
    AccessTypeParam.prototype.toData = function () {
        var res = {
            value: (0, types_1.accessTypeToJSON)(this.value),
        };
        return res;
    };
    AccessTypeParam.fromProto = function (proto) {
        return new AccessTypeParam(proto.value);
    };
    AccessTypeParam.prototype.toProto = function () {
        return types_1.AccessTypeParam.fromPartial({
            value: this.value,
        });
    };
    return AccessTypeParam;
}(json_1.JSONSerializable));
exports.AccessTypeParam = AccessTypeParam;
//# sourceMappingURL=AccessTypeParam.js.map
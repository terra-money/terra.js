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
exports.AccessConfig = exports.AccessType = void 0;
var types_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/types");
Object.defineProperty(exports, "AccessType", { enumerable: true, get: function () { return types_1.AccessType; } });
var json_1 = require("../../util/json");
var util_1 = require("./util");
/**
 *
 */
var AccessConfig = /** @class */ (function (_super) {
    __extends(AccessConfig, _super);
    /**
     * @param permission access type
     * @param address
     */
    function AccessConfig(permission, address) {
        var _this = _super.call(this) || this;
        _this.permission = permission;
        _this.address = address;
        return _this;
    }
    AccessConfig.fromAmino = function (data) {
        return new AccessConfig((0, util_1.convertAccessTypeFromJSON)(data.permission), data.address);
    };
    AccessConfig.prototype.toAmino = function () {
        var res = {
            permission: (0, types_1.accessTypeToJSON)(this.permission),
            address: this.address,
        };
        return res;
    };
    AccessConfig.fromData = function (data) {
        // FIXME: new core returns human-friendly string like 'Everybody'.
        // but convertAccessTypeFromJSON requires "ACCESS_TYPE_EVERYBODY"
        // TODO: find out why the strings arent't matching
        return new AccessConfig((0, util_1.convertAccessTypeFromJSON)(data.permission), data.address);
    };
    AccessConfig.prototype.toData = function () {
        var res = {
            permission: (0, types_1.accessTypeToJSON)(this.permission),
            address: this.address,
        };
        return res;
    };
    AccessConfig.fromProto = function (proto) {
        return new AccessConfig(proto.permission, proto.address);
    };
    AccessConfig.prototype.toProto = function () {
        return types_1.AccessConfig.fromPartial({
            permission: this.permission,
            address: this.address,
        });
    };
    return AccessConfig;
}(json_1.JSONSerializable));
exports.AccessConfig = AccessConfig;
//# sourceMappingURL=AccessConfig.js.map
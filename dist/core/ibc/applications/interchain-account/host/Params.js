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
exports.Params = void 0;
var host_1 = require("@terra-money/terra.proto/ibc/applications/interchain_accounts/host/v1/host");
var json_1 = require("../../../../../util/json");
/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the host submodule.
 */
var Params = /** @class */ (function (_super) {
    __extends(Params, _super);
    /**
     * @param host_enabled host_enabled enables or disables the host submodule.
     */
    function Params(host_enabled, allowed_messages) {
        var _this = _super.call(this) || this;
        _this.host_enabled = host_enabled;
        _this.allowed_messages = allowed_messages;
        return _this;
    }
    Params.fromAmino = function (data) {
        var host_enabled = data.host_enabled, allowed_messages = data.allowed_messages;
        return new Params(host_enabled, allowed_messages);
    };
    Params.prototype.toAmino = function () {
        var _a = this, host_enabled = _a.host_enabled, allowed_messages = _a.allowed_messages;
        var res = {
            host_enabled: host_enabled,
            allowed_messages: allowed_messages,
        };
        return res;
    };
    Params.fromData = function (data) {
        var host_enabled = data.host_enabled, allowed_messages = data.allowed_messages;
        return new Params(host_enabled, allowed_messages);
    };
    Params.prototype.toData = function () {
        var _a = this, host_enabled = _a.host_enabled, allowed_messages = _a.allowed_messages;
        var res = {
            host_enabled: host_enabled,
            allowed_messages: allowed_messages,
        };
        return res;
    };
    Params.fromProto = function (proto) {
        return new Params(proto.hostEnabled, proto.allowMessages);
    };
    Params.prototype.toProto = function () {
        var _a = this, host_enabled = _a.host_enabled, allowed_messages = _a.allowed_messages;
        return host_1.Params.fromPartial({
            hostEnabled: host_enabled,
            allowMessages: allowed_messages,
        });
    };
    return Params;
}(json_1.JSONSerializable));
exports.Params = Params;
//# sourceMappingURL=Params.js.map
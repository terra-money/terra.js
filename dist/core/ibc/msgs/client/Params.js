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
var client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
var json_1 = require("../../../../util/json");
/**
 * Params defines the set of IBC light client parameters.
 */
var Params = /** @class */ (function (_super) {
    __extends(Params, _super);
    /**
     * @param allowed_clients allowed_clients defines the list of allowed client state types.
     */
    function Params(allowed_clients) {
        var _this = _super.call(this) || this;
        _this.allowed_clients = allowed_clients;
        return _this;
    }
    Params.fromAmino = function (data) {
        var allowed_clients = data.allowed_clients;
        return new Params(allowed_clients);
    };
    Params.prototype.toAmino = function () {
        var allowed_clients = this.allowed_clients;
        var res = {
            allowed_clients: allowed_clients,
        };
        return res;
    };
    Params.fromData = function (data) {
        var allowed_clients = data.allowed_clients;
        return new Params(allowed_clients);
    };
    Params.prototype.toData = function () {
        var allowed_clients = this.allowed_clients;
        var res = {
            allowed_clients: allowed_clients,
        };
        return res;
    };
    Params.fromProto = function (proto) {
        return new Params(proto.allowedClients);
    };
    Params.prototype.toProto = function () {
        var allowed_clients = this.allowed_clients;
        return client_1.Params.fromPartial({
            allowedClients: allowed_clients,
        });
    };
    return Params;
}(json_1.JSONSerializable));
exports.Params = Params;
//# sourceMappingURL=Params.js.map
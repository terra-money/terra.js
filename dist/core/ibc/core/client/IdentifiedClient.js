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
exports.IdentifiedClientState = void 0;
var client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
var json_1 = require("../../../../util/json");
/**
 * IdentifiedClientState defines a client state with an additional client identifier field
 */
var IdentifiedClientState = /** @class */ (function (_super) {
    __extends(IdentifiedClientState, _super);
    /**
     * @param client_id client identifier
     * @param client_state client state
     */
    function IdentifiedClientState(client_id, client_state) {
        var _this = _super.call(this) || this;
        _this.client_id = client_id;
        _this.client_state = client_state;
        return _this;
    }
    IdentifiedClientState.fromAmino = function (data) {
        var client_id = data.client_id, client_state = data.client_state;
        return new IdentifiedClientState(client_id, client_state);
    };
    IdentifiedClientState.prototype.toAmino = function () {
        var _a = this, client_id = _a.client_id, client_state = _a.client_state;
        var res = {
            client_id: client_id,
            client_state: client_state,
        };
        return res;
    };
    IdentifiedClientState.fromData = function (data) {
        var client_id = data.client_id, client_state = data.client_state;
        return new IdentifiedClientState(client_id, client_state);
    };
    IdentifiedClientState.prototype.toData = function () {
        var _a = this, client_id = _a.client_id, client_state = _a.client_state;
        var res = {
            client_id: client_id,
            client_state: client_state,
        };
        return res;
    };
    IdentifiedClientState.fromProto = function (proto) {
        return new IdentifiedClientState(proto.clientId, proto.clientState);
    };
    IdentifiedClientState.prototype.toProto = function () {
        var _a = this, client_id = _a.client_id, client_state = _a.client_state;
        return client_1.IdentifiedClientState.fromPartial({
            clientId: client_id,
            clientState: client_state,
        });
    };
    return IdentifiedClientState;
}(json_1.JSONSerializable));
exports.IdentifiedClientState = IdentifiedClientState;
//# sourceMappingURL=IdentifiedClient.js.map
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
exports.Counterparty = void 0;
var connection_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/connection");
var json_1 = require("../../../../util/json");
var MerklePrefix_1 = require("../commitment/MerklePrefix");
/** Counterparty defines a channel end counterparty */
var Counterparty = /** @class */ (function (_super) {
    __extends(Counterparty, _super);
    /**
     * @param client_id identifies the client on the counterparty chain associated with a given connection.
     * @param connection_id identifies the connection end on the counterparty chain associated with a given connection.
     * @param prefix commitment merkle prefix of the counterparty chain.
     */
    function Counterparty(client_id, connection_id, prefix) {
        var _this = _super.call(this) || this;
        _this.client_id = client_id;
        _this.connection_id = connection_id;
        _this.prefix = prefix;
        return _this;
    }
    Counterparty.fromAmino = function (data) {
        var client_id = data.client_id, connection_id = data.connection_id, prefix = data.prefix;
        return new Counterparty(client_id, connection_id, prefix ? MerklePrefix_1.MerklePrefix.fromAmino(prefix) : undefined);
    };
    Counterparty.prototype.toAmino = function () {
        var _a = this, client_id = _a.client_id, connection_id = _a.connection_id, prefix = _a.prefix;
        var res = {
            client_id: client_id,
            connection_id: connection_id,
            prefix: prefix,
        };
        return res;
    };
    Counterparty.fromData = function (data) {
        var client_id = data.client_id, connection_id = data.connection_id, prefix = data.prefix;
        return new Counterparty(client_id, connection_id, prefix ? MerklePrefix_1.MerklePrefix.fromData(prefix) : undefined);
    };
    Counterparty.prototype.toData = function () {
        var _a = this, client_id = _a.client_id, connection_id = _a.connection_id, prefix = _a.prefix;
        var res = {
            client_id: client_id,
            connection_id: connection_id,
            prefix: prefix ? prefix.toData() : undefined,
        };
        return res;
    };
    Counterparty.fromProto = function (proto) {
        return new Counterparty(proto.clientId, proto.connectionId, proto.prefix ? MerklePrefix_1.MerklePrefix.fromProto(proto.prefix) : undefined);
    };
    Counterparty.prototype.toProto = function () {
        var _a = this, client_id = _a.client_id, connection_id = _a.connection_id, prefix = _a.prefix;
        return connection_1.Counterparty.fromPartial({
            clientId: client_id,
            connectionId: connection_id,
            prefix: prefix ? prefix.toProto() : undefined,
        });
    };
    return Counterparty;
}(json_1.JSONSerializable));
exports.Counterparty = Counterparty;
//# sourceMappingURL=Counterparty.js.map
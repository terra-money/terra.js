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
exports.MsgCreateClient = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/core/client/v1/tx");
/**
 * MsgCreateClient defines a message to create an IBC client
 */
var MsgCreateClient = /** @class */ (function (_super) {
    __extends(MsgCreateClient, _super);
    /**
     * @param client_state light client state
     * @param consensus_state consensus state associated with the client that corresponds to a given
     * @param signer signer address
     */
    function MsgCreateClient(client_state, consensus_state, signer) {
        var _this = _super.call(this) || this;
        _this.client_state = client_state;
        _this.consensus_state = consensus_state;
        _this.signer = signer;
        return _this;
    }
    MsgCreateClient.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgCreateClient.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgCreateClient.fromData = function (data, _) {
        _;
        var client_state = data.client_state, consensus_state = data.consensus_state, signer = data.signer;
        return new MsgCreateClient(client_state, consensus_state, signer);
    };
    MsgCreateClient.prototype.toData = function (_) {
        _;
        var _a = this, client_state = _a.client_state, consensus_state = _a.consensus_state, signer = _a.signer;
        return {
            '@type': '/ibc.core.client.v1.MsgCreateClient',
            client_state: client_state,
            consensus_state: consensus_state,
            signer: signer,
        };
    };
    MsgCreateClient.fromProto = function (proto, _) {
        _;
        return new MsgCreateClient(proto.clientState, proto.consensusState, proto.signer);
    };
    MsgCreateClient.prototype.toProto = function (_) {
        _;
        var _a = this, client_state = _a.client_state, consensus_state = _a.consensus_state, signer = _a.signer;
        return tx_1.MsgCreateClient.fromPartial({
            clientState: client_state,
            consensusState: consensus_state,
            signer: signer,
        });
    };
    MsgCreateClient.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.MsgCreateClient',
            value: tx_1.MsgCreateClient.encode(this.toProto()).finish(),
        });
    };
    MsgCreateClient.unpackAny = function (msgAny, _) {
        _;
        return MsgCreateClient.fromProto(tx_1.MsgCreateClient.decode(msgAny.value));
    };
    return MsgCreateClient;
}(json_1.JSONSerializable));
exports.MsgCreateClient = MsgCreateClient;
//# sourceMappingURL=MsgCreateClient.js.map
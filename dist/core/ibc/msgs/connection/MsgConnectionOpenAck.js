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
exports.MsgConnectionOpenAck = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Version_1 = require("../../core/connection/Version");
var tx_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/tx");
var Height_1 = require("../../core/client/Height");
/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
var MsgConnectionOpenAck = /** @class */ (function (_super) {
    __extends(MsgConnectionOpenAck, _super);
    /**
     * @param connection_id
     * @param counterparty_connection_id
     * @param version
     * @param client_state
     * @param proof_height proof of the initialization the connection on Chain B: `UNITIALIZED -> TRYOPEN`
     * @param proof_try proof of client state included in message
     * @param proof_client proof of client consensus state
     * @param proof_consensus
     * @param consenesus_height
     * @param signer signer address
     */
    function MsgConnectionOpenAck(connection_id, counterparty_connection_id, version, client_state, proof_height, proof_try, proof_client, proof_consensus, consensus_height, signer) {
        var _this = _super.call(this) || this;
        _this.connection_id = connection_id;
        _this.counterparty_connection_id = counterparty_connection_id;
        _this.version = version;
        _this.client_state = client_state;
        _this.proof_height = proof_height;
        _this.proof_try = proof_try;
        _this.proof_client = proof_client;
        _this.proof_consensus = proof_consensus;
        _this.consensus_height = consensus_height;
        _this.signer = signer;
        return _this;
    }
    MsgConnectionOpenAck.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgConnectionOpenAck.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgConnectionOpenAck.fromData = function (data, _) {
        _;
        var connection_id = data.connection_id, counterparty_connection_id = data.counterparty_connection_id, version = data.version, client_state = data.client_state, proof_height = data.proof_height, proof_try = data.proof_try, proof_client = data.proof_client, proof_consensus = data.proof_consensus, consensus_height = data.consensus_height, signer = data.signer;
        return new MsgConnectionOpenAck(connection_id, counterparty_connection_id, version ? Version_1.Version.fromData(version) : undefined, client_state, proof_height ? Height_1.Height.fromData(proof_height) : undefined, proof_try, proof_client, proof_consensus, consensus_height ? Height_1.Height.fromData(consensus_height) : undefined, signer);
    };
    MsgConnectionOpenAck.prototype.toData = function (_) {
        _;
        var _a = this, connection_id = _a.connection_id, counterparty_connection_id = _a.counterparty_connection_id, version = _a.version, client_state = _a.client_state, proof_height = _a.proof_height, proof_try = _a.proof_try, proof_client = _a.proof_client, proof_consensus = _a.proof_consensus, consensus_height = _a.consensus_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck',
            connection_id: connection_id,
            counterparty_connection_id: counterparty_connection_id,
            version: version ? version.toData() : undefined,
            client_state: client_state,
            proof_height: proof_height ? proof_height.toData() : undefined,
            proof_try: proof_try,
            proof_client: proof_client,
            proof_consensus: proof_consensus,
            consensus_height: consensus_height
                ? consensus_height.toData()
                : undefined,
            signer: signer,
        };
    };
    MsgConnectionOpenAck.fromProto = function (proto, _) {
        _;
        return new MsgConnectionOpenAck(proto.connectionId, proto.counterpartyConnectionId, proto.version ? Version_1.Version.fromProto(proto.version) : undefined, proto.clientState, proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, Buffer.from(proto.proofTry).toString('base64'), Buffer.from(proto.proofClient).toString('base64'), Buffer.from(proto.proofConsensus).toString('base64'), proto.consensusHeight
            ? Height_1.Height.fromProto(proto.consensusHeight)
            : undefined, proto.signer);
    };
    MsgConnectionOpenAck.prototype.toProto = function (_) {
        _;
        var _a = this, connection_id = _a.connection_id, counterparty_connection_id = _a.counterparty_connection_id, version = _a.version, client_state = _a.client_state, proof_height = _a.proof_height, proof_try = _a.proof_try, proof_client = _a.proof_client, proof_consensus = _a.proof_consensus, consensus_height = _a.consensus_height, signer = _a.signer;
        return tx_1.MsgConnectionOpenAck.fromPartial({
            connectionId: connection_id,
            counterpartyConnectionId: counterparty_connection_id,
            version: version ? version.toProto() : undefined,
            clientState: client_state,
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            proofTry: Buffer.from(proof_try, 'base64'),
            proofClient: Buffer.from(proof_client, 'base64'),
            proofConsensus: Buffer.from(proof_consensus, 'base64'),
            consensusHeight: consensus_height
                ? consensus_height.toProto()
                : undefined,
            signer: signer,
        });
    };
    MsgConnectionOpenAck.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenAck',
            value: tx_1.MsgConnectionOpenAck.encode(this.toProto()).finish(),
        });
    };
    MsgConnectionOpenAck.unpackAny = function (msgAny, _) {
        _;
        return MsgConnectionOpenAck.fromProto(tx_1.MsgConnectionOpenAck.decode(msgAny.value));
    };
    return MsgConnectionOpenAck;
}(json_1.JSONSerializable));
exports.MsgConnectionOpenAck = MsgConnectionOpenAck;
//# sourceMappingURL=MsgConnectionOpenAck.js.map
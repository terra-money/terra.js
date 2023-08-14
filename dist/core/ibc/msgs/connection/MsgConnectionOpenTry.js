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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgConnectionOpenTry = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Counterparty_1 = require("../../core/connection/Counterparty");
var Version_1 = require("../../core/connection/Version");
var tx_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/tx");
var long_1 = __importDefault(require("long"));
var Height_1 = require("../../core/client/Height");
/**
 *  MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B.
 */
var MsgConnectionOpenTry = /** @class */ (function (_super) {
    __extends(MsgConnectionOpenTry, _super);
    /**
     * @param client_id in the case of crossing hello's, when both chains call OpenInit, we need the connection identifier of the previous connection in state INIT
     * @param previous_connection_id
     * @param client_state
     * @param counterparty
     * @param delay_period
     * @param counterparty_versions
     * @param proof_height proof of the initialization the connection on Chain A: `UNITIALIZED -> INIT`
     * @param proof_init proof of client state included in message
     * @param proof_client proof of client consensus state
     * @param proof_consensus
     * @param consensus_height
     * @param signer signer address
     */
    function MsgConnectionOpenTry(client_id, previous_connection_id, client_state, counterparty, delay_period, counterparty_versions, proof_height, proof_init, proof_client, proof_consensus, consensus_height, signer) {
        var _this = _super.call(this) || this;
        _this.client_id = client_id;
        _this.previous_connection_id = previous_connection_id;
        _this.client_state = client_state;
        _this.counterparty = counterparty;
        _this.delay_period = delay_period;
        _this.counterparty_versions = counterparty_versions;
        _this.proof_height = proof_height;
        _this.proof_init = proof_init;
        _this.proof_client = proof_client;
        _this.proof_consensus = proof_consensus;
        _this.consensus_height = consensus_height;
        _this.signer = signer;
        return _this;
    }
    MsgConnectionOpenTry.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgConnectionOpenTry.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgConnectionOpenTry.fromData = function (data, _) {
        _;
        var client_id = data.client_id, previous_connection_id = data.previous_connection_id, client_state = data.client_state, counterparty = data.counterparty, delay_period = data.delay_period, counterparty_versions = data.counterparty_versions, proof_height = data.proof_height, proof_init = data.proof_init, proof_client = data.proof_client, proof_consensus = data.proof_consensus, consensus_height = data.consensus_height, signer = data.signer;
        return new MsgConnectionOpenTry(client_id, previous_connection_id, client_state, counterparty ? Counterparty_1.Counterparty.fromData(counterparty) : undefined, Number.parseInt(delay_period), counterparty_versions.length > 0
            ? counterparty_versions.map(function (cv) { return Version_1.Version.fromData(cv); })
            : [], proof_height ? Height_1.Height.fromData(proof_height) : undefined, Buffer.from(proof_init).toString('base64'), Buffer.from(proof_client).toString('base64'), Buffer.from(proof_consensus).toString('base64'), consensus_height ? Height_1.Height.fromData(consensus_height) : undefined, signer);
    };
    MsgConnectionOpenTry.prototype.toData = function (_) {
        _;
        var _a = this, client_id = _a.client_id, previous_connection_id = _a.previous_connection_id, client_state = _a.client_state, counterparty = _a.counterparty, delay_period = _a.delay_period, counterparty_versions = _a.counterparty_versions, proof_height = _a.proof_height, proof_init = _a.proof_init, proof_client = _a.proof_client, proof_consensus = _a.proof_consensus, consensus_height = _a.consensus_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry',
            client_id: client_id,
            previous_connection_id: previous_connection_id,
            client_state: client_state,
            counterparty: counterparty ? counterparty.toData() : undefined,
            delay_period: delay_period.toFixed(),
            counterparty_versions: counterparty_versions.length > 0
                ? counterparty_versions.map(function (cv) { return cv.toData(); })
                : [],
            proof_height: proof_height ? proof_height.toData() : undefined,
            proof_init: proof_init,
            proof_client: proof_client,
            proof_consensus: proof_consensus,
            consensus_height: consensus_height
                ? consensus_height.toData()
                : undefined,
            signer: signer,
        };
    };
    MsgConnectionOpenTry.fromProto = function (proto, _) {
        _;
        return new MsgConnectionOpenTry(proto.clientId, proto.previousConnectionId, proto.clientState, proto.counterparty
            ? Counterparty_1.Counterparty.fromProto(proto.counterparty)
            : undefined, proto.delayPeriod.toNumber(), proto.counterpartyVersions.length > 0
            ? proto.counterpartyVersions.map(function (cv) { return Version_1.Version.fromProto(cv); })
            : [], proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, Buffer.from(proto.proofInit).toString('base64'), Buffer.from(proto.proofClient).toString('base64'), Buffer.from(proto.proofConsensus).toString('base64'), proto.consensusHeight
            ? Height_1.Height.fromProto(proto.consensusHeight)
            : undefined, proto.signer);
    };
    MsgConnectionOpenTry.prototype.toProto = function (_) {
        _;
        var _a = this, client_id = _a.client_id, previous_connection_id = _a.previous_connection_id, client_state = _a.client_state, counterparty = _a.counterparty, delay_period = _a.delay_period, counterparty_versions = _a.counterparty_versions, proof_height = _a.proof_height, proof_init = _a.proof_init, proof_client = _a.proof_client, proof_consensus = _a.proof_consensus, consensus_height = _a.consensus_height, signer = _a.signer;
        return tx_1.MsgConnectionOpenTry.fromPartial({
            clientId: client_id,
            previousConnectionId: previous_connection_id,
            clientState: client_state.toProto(),
            counterparty: counterparty ? counterparty.toProto() : undefined,
            delayPeriod: long_1.default.fromNumber(delay_period),
            counterpartyVersions: counterparty_versions.length > 0
                ? counterparty_versions.map(function (cv) { return cv.toProto(); })
                : [],
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            proofInit: Buffer.from(proof_init, 'base64'),
            proofClient: Buffer.from(proof_client, 'base64'),
            proofConsensus: Buffer.from(proof_consensus, 'base64'),
            consensusHeight: consensus_height
                ? consensus_height.toProto()
                : undefined,
            signer: signer,
        });
    };
    MsgConnectionOpenTry.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenTry',
            value: tx_1.MsgConnectionOpenTry.encode(this.toProto()).finish(),
        });
    };
    MsgConnectionOpenTry.unpackAny = function (msgAny, _) {
        _;
        return MsgConnectionOpenTry.fromProto(tx_1.MsgConnectionOpenTry.decode(msgAny.value));
    };
    return MsgConnectionOpenTry;
}(json_1.JSONSerializable));
exports.MsgConnectionOpenTry = MsgConnectionOpenTry;
//# sourceMappingURL=MsgConnectionOpenTry.js.map
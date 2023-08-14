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
exports.MsgUpgradeClient = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/core/client/v1/tx");
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client state
 */
var MsgUpgradeClient = /** @class */ (function (_super) {
    __extends(MsgUpgradeClient, _super);
    /**
     * @param client_id client unique identifier
     * @param client_state  upgraded client state
     * @param consensus_state upgraded consensus state, only contains enough information to serve as a basis of trust in update logic
     * @param proof_upgrade_client proof that old chain committed to new client
     * @param proof_upgrade_consensus_state  proof that old chain committed to new consensus state
     * @param signer signer address
     */
    function MsgUpgradeClient(client_id, client_state, consensus_state, proof_upgrade_client, proof_upgrade_consensus_state, signer) {
        var _this = _super.call(this) || this;
        _this.client_id = client_id;
        _this.client_state = client_state;
        _this.consensus_state = consensus_state;
        _this.proof_upgrade_client = proof_upgrade_client;
        _this.proof_upgrade_consensus_state = proof_upgrade_consensus_state;
        _this.signer = signer;
        return _this;
    }
    MsgUpgradeClient.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgUpgradeClient.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgUpgradeClient.fromData = function (data, _) {
        _;
        var client_id = data.client_id, client_state = data.client_state, consensus_state = data.consensus_state, proof_upgrade_client = data.proof_upgrade_client, proof_upgrade_consensus_state = data.proof_upgrade_consensus_state, signer = data.signer;
        return new MsgUpgradeClient(client_id, client_state, consensus_state, proof_upgrade_client, proof_upgrade_consensus_state, signer);
    };
    MsgUpgradeClient.prototype.toData = function (_) {
        _;
        var _a = this, client_id = _a.client_id, client_state = _a.client_state, consensus_state = _a.consensus_state, proof_upgrade_client = _a.proof_upgrade_client, proof_upgrade_consensus_state = _a.proof_upgrade_consensus_state, signer = _a.signer;
        return {
            '@type': '/ibc.core.client.v1.MsgUpgradeClient',
            client_id: client_id,
            client_state: client_state,
            consensus_state: consensus_state,
            proof_upgrade_client: proof_upgrade_client,
            proof_upgrade_consensus_state: proof_upgrade_consensus_state,
            signer: signer,
        };
    };
    MsgUpgradeClient.fromProto = function (proto, _) {
        _;
        return new MsgUpgradeClient(proto.clientId, proto.clientState, proto.consensusState, Buffer.from(proto.proofUpgradeClient).toString('base64'), Buffer.from(proto.proofUpgradeConsensusState).toString('base64'), proto.signer);
    };
    MsgUpgradeClient.prototype.toProto = function (_) {
        _;
        var _a = this, client_id = _a.client_id, client_state = _a.client_state, consensus_state = _a.consensus_state, proof_upgrade_client = _a.proof_upgrade_client, proof_upgrade_consensus_state = _a.proof_upgrade_consensus_state, signer = _a.signer;
        return tx_1.MsgUpgradeClient.fromPartial({
            clientId: client_id,
            clientState: client_state,
            consensusState: consensus_state,
            proofUpgradeClient: Buffer.from(proof_upgrade_client, 'base64'),
            proofUpgradeConsensusState: Buffer.from(proof_upgrade_consensus_state, 'base64'),
            signer: signer,
        });
    };
    MsgUpgradeClient.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.MsgUpgradeClient',
            value: tx_1.MsgUpgradeClient.encode(this.toProto()).finish(),
        });
    };
    MsgUpgradeClient.unpackAny = function (msgAny, _) {
        _;
        return MsgUpgradeClient.fromProto(tx_1.MsgUpgradeClient.decode(msgAny.value));
    };
    return MsgUpgradeClient;
}(json_1.JSONSerializable));
exports.MsgUpgradeClient = MsgUpgradeClient;
//# sourceMappingURL=MsgUpgradeClient.js.map
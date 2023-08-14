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
exports.MsgConnectionOpenConfirm = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/tx");
var Height_1 = require("../../core/client/Height");
/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
var MsgConnectionOpenConfirm = /** @class */ (function (_super) {
    __extends(MsgConnectionOpenConfirm, _super);
    /**
     * @param connection_id
     * @param proof_ack proof for the change of the connection state on Chain A: `INIT -> OPEN`
     * @param proof_height
     * @param signer signer address
     */
    function MsgConnectionOpenConfirm(connection_id, proof_ack, proof_height, signer) {
        var _this = _super.call(this) || this;
        _this.connection_id = connection_id;
        _this.proof_ack = proof_ack;
        _this.proof_height = proof_height;
        _this.signer = signer;
        return _this;
    }
    MsgConnectionOpenConfirm.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgConnectionOpenConfirm.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgConnectionOpenConfirm.fromData = function (data, _) {
        _;
        var connection_id = data.connection_id, proof_ack = data.proof_ack, proof_height = data.proof_height, signer = data.signer;
        return new MsgConnectionOpenConfirm(connection_id, proof_ack, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    };
    MsgConnectionOpenConfirm.prototype.toData = function (_) {
        _;
        var _a = this, connection_id = _a.connection_id, proof_ack = _a.proof_ack, proof_height = _a.proof_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
            connection_id: connection_id,
            proof_ack: proof_ack,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer: signer,
        };
    };
    MsgConnectionOpenConfirm.fromProto = function (proto, _) {
        _;
        return new MsgConnectionOpenConfirm(proto.connectionId, Buffer.from(proto.proofAck).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    };
    MsgConnectionOpenConfirm.prototype.toProto = function (_) {
        _;
        var _a = this, connection_id = _a.connection_id, proof_ack = _a.proof_ack, proof_height = _a.proof_height, signer = _a.signer;
        return tx_1.MsgConnectionOpenConfirm.fromPartial({
            connectionId: connection_id,
            proofAck: Buffer.from(proof_ack, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer: signer,
        });
    };
    MsgConnectionOpenConfirm.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
            value: tx_1.MsgConnectionOpenConfirm.encode(this.toProto()).finish(),
        });
    };
    MsgConnectionOpenConfirm.unpackAny = function (msgAny, _) {
        _;
        return MsgConnectionOpenConfirm.fromProto(tx_1.MsgConnectionOpenConfirm.decode(msgAny.value));
    };
    return MsgConnectionOpenConfirm;
}(json_1.JSONSerializable));
exports.MsgConnectionOpenConfirm = MsgConnectionOpenConfirm;
//# sourceMappingURL=MsgConnectionOpenConfirm.js.map
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
exports.MsgChannelOpenConfirm = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Height_1 = require("../../core/client/Height");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 *  MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to OPEN on Chain A.
 */
var MsgChannelOpenConfirm = /** @class */ (function (_super) {
    __extends(MsgChannelOpenConfirm, _super);
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param proof_ack
     * @param proof_height
     * @param signer signer address
     */
    function MsgChannelOpenConfirm(port_id, channel_id, proof_ack, proof_height, signer) {
        var _this = _super.call(this) || this;
        _this.port_id = port_id;
        _this.channel_id = channel_id;
        _this.proof_ack = proof_ack;
        _this.proof_height = proof_height;
        _this.signer = signer;
        return _this;
    }
    MsgChannelOpenConfirm.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgChannelOpenConfirm.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgChannelOpenConfirm.fromData = function (data, _) {
        _;
        var port_id = data.port_id, channel_id = data.channel_id, proof_ack = data.proof_ack, proof_height = data.proof_height, signer = data.signer;
        return new MsgChannelOpenConfirm(port_id, channel_id, proof_ack, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    };
    MsgChannelOpenConfirm.prototype.toData = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, proof_ack = _a.proof_ack, proof_height = _a.proof_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelOpenConfirm',
            port_id: port_id,
            channel_id: channel_id,
            proof_ack: proof_ack,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer: signer,
        };
    };
    MsgChannelOpenConfirm.fromProto = function (proto, _) {
        _;
        return new MsgChannelOpenConfirm(proto.portId, proto.channelId, Buffer.from(proto.proofAck).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    };
    MsgChannelOpenConfirm.prototype.toProto = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, proof_ack = _a.proof_ack, proof_height = _a.proof_height, signer = _a.signer;
        return tx_1.MsgChannelOpenConfirm.fromPartial({
            portId: port_id,
            channelId: channel_id,
            proofAck: Buffer.from(proof_ack, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer: signer,
        });
    };
    MsgChannelOpenConfirm.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelOpenConfirm',
            value: tx_1.MsgChannelOpenConfirm.encode(this.toProto()).finish(),
        });
    };
    MsgChannelOpenConfirm.unpackAny = function (msgAny, _) {
        _;
        return MsgChannelOpenConfirm.fromProto(tx_1.MsgChannelOpenConfirm.decode(msgAny.value));
    };
    return MsgChannelOpenConfirm;
}(json_1.JSONSerializable));
exports.MsgChannelOpenConfirm = MsgChannelOpenConfirm;
//# sourceMappingURL=MsgChannelOpenConfirm.js.map
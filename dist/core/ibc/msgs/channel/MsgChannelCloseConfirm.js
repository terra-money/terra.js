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
exports.MsgChannelCloseConfirm = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Height_1 = require("../../core/client/Height");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to CLOSED on Chain A.
 */
var MsgChannelCloseConfirm = /** @class */ (function (_super) {
    __extends(MsgChannelCloseConfirm, _super);
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param proof_init
     * @param proof_height
     * @param signer signer address
     */
    function MsgChannelCloseConfirm(port_id, channel_id, proof_init, proof_height, signer) {
        var _this = _super.call(this) || this;
        _this.port_id = port_id;
        _this.channel_id = channel_id;
        _this.proof_init = proof_init;
        _this.proof_height = proof_height;
        _this.signer = signer;
        return _this;
    }
    MsgChannelCloseConfirm.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgChannelCloseConfirm.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgChannelCloseConfirm.fromData = function (data, _) {
        _;
        var port_id = data.port_id, channel_id = data.channel_id, proof_init = data.proof_init, proof_height = data.proof_height, signer = data.signer;
        return new MsgChannelCloseConfirm(port_id, channel_id, proof_init, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    };
    MsgChannelCloseConfirm.prototype.toData = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, proof_init = _a.proof_init, proof_height = _a.proof_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelCloseConfirm',
            port_id: port_id,
            channel_id: channel_id,
            proof_init: proof_init,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer: signer,
        };
    };
    MsgChannelCloseConfirm.fromProto = function (proto, _) {
        _;
        return new MsgChannelCloseConfirm(proto.portId, proto.channelId, Buffer.from(proto.proofInit).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    };
    MsgChannelCloseConfirm.prototype.toProto = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, proof_init = _a.proof_init, proof_height = _a.proof_height, signer = _a.signer;
        return tx_1.MsgChannelCloseConfirm.fromPartial({
            portId: port_id,
            channelId: channel_id,
            proofInit: Buffer.from(proof_init, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer: signer,
        });
    };
    MsgChannelCloseConfirm.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelCloseConfirm',
            value: tx_1.MsgChannelCloseConfirm.encode(this.toProto()).finish(),
        });
    };
    MsgChannelCloseConfirm.unpackAny = function (msgAny, _) {
        _;
        return MsgChannelCloseConfirm.fromProto(tx_1.MsgChannelCloseConfirm.decode(msgAny.value));
    };
    return MsgChannelCloseConfirm;
}(json_1.JSONSerializable));
exports.MsgChannelCloseConfirm = MsgChannelCloseConfirm;
//# sourceMappingURL=MsgChannelCloseConfirm.js.map
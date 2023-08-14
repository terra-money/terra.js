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
exports.MsgChannelOpenAck = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Height_1 = require("../../core/client/Height");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge the change of channel state to TRYOPEN on Chain B.
 */
var MsgChannelOpenAck = /** @class */ (function (_super) {
    __extends(MsgChannelOpenAck, _super);
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param counterparty_channel_id
     * @param counterparty_version
     * @param proof_try
     * @param proof_height
     * @param signer signer address
     */
    function MsgChannelOpenAck(port_id, channel_id, counterparty_channel_id, counterparty_version, proof_try, proof_height, signer) {
        var _this = _super.call(this) || this;
        _this.port_id = port_id;
        _this.channel_id = channel_id;
        _this.counterparty_channel_id = counterparty_channel_id;
        _this.counterparty_version = counterparty_version;
        _this.proof_try = proof_try;
        _this.proof_height = proof_height;
        _this.signer = signer;
        return _this;
    }
    MsgChannelOpenAck.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgChannelOpenAck.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgChannelOpenAck.fromData = function (data, _) {
        _;
        var port_id = data.port_id, channel_id = data.channel_id, counterparty_channel_id = data.counterparty_channel_id, counterparty_version = data.counterparty_version, proof_try = data.proof_try, proof_height = data.proof_height, signer = data.signer;
        return new MsgChannelOpenAck(port_id, channel_id, counterparty_channel_id, counterparty_version, proof_try, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    };
    MsgChannelOpenAck.prototype.toData = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, counterparty_channel_id = _a.counterparty_channel_id, counterparty_version = _a.counterparty_version, proof_try = _a.proof_try, proof_height = _a.proof_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelOpenAck',
            port_id: port_id,
            channel_id: channel_id,
            counterparty_channel_id: counterparty_channel_id,
            counterparty_version: counterparty_version,
            proof_try: proof_try,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer: signer,
        };
    };
    MsgChannelOpenAck.fromProto = function (proto, _) {
        _;
        return new MsgChannelOpenAck(proto.portId, proto.channelId, proto.counterpartyChannelId, proto.counterpartyVersion, Buffer.from(proto.proofTry).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    };
    MsgChannelOpenAck.prototype.toProto = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, counterparty_channel_id = _a.counterparty_channel_id, counterparty_version = _a.counterparty_version, proof_try = _a.proof_try, proof_height = _a.proof_height, signer = _a.signer;
        return tx_1.MsgChannelOpenAck.fromPartial({
            portId: port_id,
            channelId: channel_id,
            counterpartyChannelId: counterparty_channel_id,
            counterpartyVersion: counterparty_version,
            proofTry: Buffer.from(proof_try, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer: signer,
        });
    };
    MsgChannelOpenAck.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelOpenAck',
            value: tx_1.MsgChannelOpenAck.encode(this.toProto()).finish(),
        });
    };
    MsgChannelOpenAck.unpackAny = function (msgAny, _) {
        _;
        return MsgChannelOpenAck.fromProto(tx_1.MsgChannelOpenAck.decode(msgAny.value));
    };
    return MsgChannelOpenAck;
}(json_1.JSONSerializable));
exports.MsgChannelOpenAck = MsgChannelOpenAck;
//# sourceMappingURL=MsgChannelOpenAck.js.map
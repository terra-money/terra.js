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
exports.MsgChannelOpenTry = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Channel_1 = require("../../core/channel/Channel");
var Height_1 = require("../../core/client/Height");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelOpenTry defines a msg sent by a Relayer to try to open a channel on Chain B
 */
var MsgChannelOpenTry = /** @class */ (function (_super) {
    __extends(MsgChannelOpenTry, _super);
    /**
     * @param port_id identifier of the port to use
     * @param previous_channel_id
     * @param channel channel info
     * @param counterparty_version
     * @param proof_init
     * @param proof_height
     * @param signer signer address
     */
    function MsgChannelOpenTry(port_id, previous_channel_id, channel, counterparty_version, proof_init, proof_height, signer) {
        var _this = _super.call(this) || this;
        _this.port_id = port_id;
        _this.previous_channel_id = previous_channel_id;
        _this.channel = channel;
        _this.counterparty_version = counterparty_version;
        _this.proof_init = proof_init;
        _this.proof_height = proof_height;
        _this.signer = signer;
        return _this;
    }
    MsgChannelOpenTry.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgChannelOpenTry.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgChannelOpenTry.fromData = function (data, _) {
        _;
        var port_id = data.port_id, previous_channel_id = data.previous_channel_id, channel = data.channel, counterparty_version = data.counterparty_version, proof_init = data.proof_init, proof_height = data.proof_height, signer = data.signer;
        return new MsgChannelOpenTry(port_id, previous_channel_id, channel ? Channel_1.Channel.fromData(channel) : undefined, counterparty_version, proof_init, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    };
    MsgChannelOpenTry.prototype.toData = function (_) {
        _;
        var _a = this, port_id = _a.port_id, previous_channel_id = _a.previous_channel_id, channel = _a.channel, counterparty_version = _a.counterparty_version, proof_init = _a.proof_init, proof_height = _a.proof_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelOpenTry',
            port_id: port_id,
            previous_channel_id: previous_channel_id,
            channel: channel ? channel.toData() : undefined,
            counterparty_version: counterparty_version,
            proof_init: proof_init,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer: signer,
        };
    };
    MsgChannelOpenTry.fromProto = function (proto, _) {
        _;
        return new MsgChannelOpenTry(proto.portId, proto.previousChannelId, proto.channel ? Channel_1.Channel.fromProto(proto.channel) : undefined, proto.counterpartyVersion, Buffer.from(proto.proofInit).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    };
    MsgChannelOpenTry.prototype.toProto = function (_) {
        _;
        var _a = this, port_id = _a.port_id, previous_channel_id = _a.previous_channel_id, channel = _a.channel, counterparty_version = _a.counterparty_version, proof_init = _a.proof_init, proof_height = _a.proof_height, signer = _a.signer;
        return tx_1.MsgChannelOpenTry.fromPartial({
            portId: port_id,
            previousChannelId: previous_channel_id,
            channel: channel ? channel.toProto() : undefined,
            counterpartyVersion: counterparty_version,
            proofInit: Buffer.from(proof_init, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer: signer,
        });
    };
    MsgChannelOpenTry.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelOpenTry',
            value: tx_1.MsgChannelOpenTry.encode(this.toProto()).finish(),
        });
    };
    MsgChannelOpenTry.unpackAny = function (msgAny, _) {
        _;
        return MsgChannelOpenTry.fromProto(tx_1.MsgChannelOpenTry.decode(msgAny.value));
    };
    return MsgChannelOpenTry;
}(json_1.JSONSerializable));
exports.MsgChannelOpenTry = MsgChannelOpenTry;
//# sourceMappingURL=MsgChannelOpenTry.js.map
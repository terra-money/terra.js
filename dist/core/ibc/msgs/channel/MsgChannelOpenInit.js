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
exports.MsgChannelOpenInit = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Channel_1 = require("../../core/channel/Channel");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It is called by a relayer on Chain A.
 */
var MsgChannelOpenInit = /** @class */ (function (_super) {
    __extends(MsgChannelOpenInit, _super);
    /**
     * @param port_id identifier of the port to use
     * @param channel channel info
     * @param signer signer address
     */
    function MsgChannelOpenInit(port_id, channel, signer) {
        var _this = _super.call(this) || this;
        _this.port_id = port_id;
        _this.channel = channel;
        _this.signer = signer;
        return _this;
    }
    MsgChannelOpenInit.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgChannelOpenInit.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgChannelOpenInit.fromData = function (data, _) {
        _;
        var port_id = data.port_id, channel = data.channel, signer = data.signer;
        return new MsgChannelOpenInit(port_id, channel ? Channel_1.Channel.fromData(channel) : undefined, signer);
    };
    MsgChannelOpenInit.prototype.toData = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel = _a.channel, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelOpenInit',
            port_id: port_id,
            channel: channel ? channel.toData() : undefined,
            signer: signer,
        };
    };
    MsgChannelOpenInit.fromProto = function (proto, _) {
        _;
        return new MsgChannelOpenInit(proto.portId, proto.channel ? Channel_1.Channel.fromProto(proto.channel) : undefined, proto.signer);
    };
    MsgChannelOpenInit.prototype.toProto = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel = _a.channel, signer = _a.signer;
        return tx_1.MsgChannelOpenInit.fromPartial({
            portId: port_id,
            channel: channel ? channel.toProto() : undefined,
            signer: signer,
        });
    };
    MsgChannelOpenInit.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelOpenInit',
            value: tx_1.MsgChannelOpenInit.encode(this.toProto()).finish(),
        });
    };
    MsgChannelOpenInit.unpackAny = function (msgAny, _) {
        _;
        return MsgChannelOpenInit.fromProto(tx_1.MsgChannelOpenInit.decode(msgAny.value));
    };
    return MsgChannelOpenInit;
}(json_1.JSONSerializable));
exports.MsgChannelOpenInit = MsgChannelOpenInit;
//# sourceMappingURL=MsgChannelOpenInit.js.map
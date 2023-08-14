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
exports.MsgChannelCloseInit = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A to close a channel with Chain B.
 */
var MsgChannelCloseInit = /** @class */ (function (_super) {
    __extends(MsgChannelCloseInit, _super);
    /**
     * @param port_id identifier of the port to use
     * @param channel channel info
     * @param signer signer address
     */
    function MsgChannelCloseInit(port_id, channel_id, signer) {
        var _this = _super.call(this) || this;
        _this.port_id = port_id;
        _this.channel_id = channel_id;
        _this.signer = signer;
        return _this;
    }
    MsgChannelCloseInit.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgChannelCloseInit.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgChannelCloseInit.fromData = function (data, _) {
        _;
        var port_id = data.port_id, channel_id = data.channel_id, signer = data.signer;
        return new MsgChannelCloseInit(port_id, channel_id, signer);
    };
    MsgChannelCloseInit.prototype.toData = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelCloseInit',
            port_id: port_id,
            channel_id: channel_id,
            signer: signer,
        };
    };
    MsgChannelCloseInit.fromProto = function (proto, _) {
        _;
        return new MsgChannelCloseInit(proto.portId, proto.channelId, proto.signer);
    };
    MsgChannelCloseInit.prototype.toProto = function (_) {
        _;
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, signer = _a.signer;
        return tx_1.MsgChannelCloseInit.fromPartial({
            portId: port_id,
            channelId: channel_id,
            signer: signer,
        });
    };
    MsgChannelCloseInit.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelCloseInit',
            value: tx_1.MsgChannelCloseInit.encode(this.toProto()).finish(),
        });
    };
    MsgChannelCloseInit.unpackAny = function (msgAny, _) {
        _;
        return MsgChannelCloseInit.fromProto(tx_1.MsgChannelCloseInit.decode(msgAny.value));
    };
    return MsgChannelCloseInit;
}(json_1.JSONSerializable));
exports.MsgChannelCloseInit = MsgChannelCloseInit;
//# sourceMappingURL=MsgChannelCloseInit.js.map
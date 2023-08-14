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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketId = void 0;
var channel_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/channel");
var json_1 = require("../../../../util/json");
var Long = __importStar(require("long"));
/**
 * PacketId is an identifer for a unique Packet
 * Source chains refer to packets by source port/channel
 * Destination chains refer to packets by destination port/channel
 */
var PacketId = /** @class */ (function (_super) {
    __extends(PacketId, _super);
    /**
     * @param port_id  channel port identifier
     * @param channel_id channel unique identifier
     * @param sequence packet sequence
     */
    function PacketId(port_id, channel_id, sequence) {
        var _this = _super.call(this) || this;
        _this.port_id = port_id;
        _this.channel_id = channel_id;
        _this.sequence = sequence;
        return _this;
    }
    PacketId.fromAmino = function (data) {
        var port_id = data.port_id, channel_id = data.channel_id, sequence = data.sequence;
        return new PacketId(port_id, channel_id, Number.parseInt(sequence));
    };
    PacketId.prototype.toAmino = function () {
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, sequence = _a.sequence;
        var res = {
            port_id: port_id,
            channel_id: channel_id,
            sequence: sequence.toFixed(),
        };
        return res;
    };
    PacketId.fromData = function (data) {
        var port_id = data.port_id, channel_id = data.channel_id, sequence = data.sequence;
        return new PacketId(port_id, channel_id, Number.parseInt(sequence));
    };
    PacketId.prototype.toData = function () {
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, sequence = _a.sequence;
        var res = {
            port_id: port_id,
            channel_id: channel_id,
            sequence: sequence.toFixed(),
        };
        return res;
    };
    PacketId.fromProto = function (proto) {
        return new PacketId(proto.portId, proto.channelId, proto.sequence.toNumber());
    };
    PacketId.prototype.toProto = function () {
        var _a = this, port_id = _a.port_id, channel_id = _a.channel_id, sequence = _a.sequence;
        return channel_1.PacketId.fromPartial({
            portId: port_id,
            channelId: channel_id,
            sequence: Long.fromNumber(sequence),
        });
    };
    return PacketId;
}(json_1.JSONSerializable));
exports.PacketId = PacketId;
//# sourceMappingURL=PacketId.js.map
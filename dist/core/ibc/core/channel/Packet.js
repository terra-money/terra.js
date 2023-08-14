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
exports.Packet = void 0;
var channel_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/channel");
var long_1 = __importDefault(require("long"));
var json_1 = require("../../../../util/json");
var Height_1 = require("../client/Height");
/** Packet defines a type that carries data across different chains through IBC */
var Packet = /** @class */ (function (_super) {
    __extends(Packet, _super);
    /**
     * @param port_id port on the counterparty chain which owns the other end of the channel.
     * @param channel_id channel end on the counterparty chain
     */
    function Packet(sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height, timeout_timestamp) {
        var _this = _super.call(this) || this;
        _this.sequence = sequence;
        _this.source_port = source_port;
        _this.source_channel = source_channel;
        _this.destination_port = destination_port;
        _this.destination_channel = destination_channel;
        _this.data = data;
        _this.timeout_height = timeout_height;
        _this.timeout_timestamp = timeout_timestamp;
        return _this;
    }
    Packet.fromAmino = function (_data) {
        var sequence = _data.sequence, source_port = _data.source_port, source_channel = _data.source_channel, destination_port = _data.destination_port, destination_channel = _data.destination_channel, data = _data.data, timeout_height = _data.timeout_height, timeout_timestamp = _data.timeout_timestamp;
        return new Packet(sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height ? Height_1.Height.fromAmino(timeout_height) : undefined, timeout_timestamp);
    };
    Packet.prototype.toAmino = function () {
        var _a = this, sequence = _a.sequence, source_port = _a.source_port, source_channel = _a.source_channel, destination_port = _a.destination_port, destination_channel = _a.destination_channel, data = _a.data, timeout_height = _a.timeout_height, timeout_timestamp = _a.timeout_timestamp;
        var res = {
            sequence: sequence,
            source_port: source_port,
            source_channel: source_channel,
            destination_port: destination_port,
            destination_channel: destination_channel,
            data: data,
            timeout_height: timeout_height ? timeout_height.toAmino() : undefined,
            timeout_timestamp: timeout_timestamp,
        };
        return res;
    };
    Packet.fromData = function (_data) {
        var sequence = _data.sequence, source_port = _data.source_port, source_channel = _data.source_channel, destination_port = _data.destination_port, destination_channel = _data.destination_channel, data = _data.data, timeout_height = _data.timeout_height, timeout_timestamp = _data.timeout_timestamp;
        return new Packet(sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height ? Height_1.Height.fromData(timeout_height) : undefined, Number.parseInt(timeout_timestamp));
    };
    Packet.prototype.toData = function () {
        var _a = this, sequence = _a.sequence, source_port = _a.source_port, source_channel = _a.source_channel, destination_port = _a.destination_port, destination_channel = _a.destination_channel, data = _a.data, timeout_height = _a.timeout_height, timeout_timestamp = _a.timeout_timestamp;
        var res = {
            sequence: sequence,
            source_port: source_port,
            source_channel: source_channel,
            destination_port: destination_port,
            destination_channel: destination_channel,
            data: data,
            timeout_height: timeout_height ? timeout_height.toData() : undefined,
            timeout_timestamp: timeout_timestamp.toFixed(),
        };
        return res;
    };
    Packet.fromProto = function (proto) {
        return new Packet(proto.sequence.toNumber(), proto.sourcePort, proto.sourceChannel, proto.destinationPort, proto.destinationChannel, Buffer.from(proto.data).toString('base64'), proto.timeoutHeight ? Height_1.Height.fromProto(proto.timeoutHeight) : undefined, proto.timeoutTimestamp.toNumber());
    };
    Packet.prototype.toProto = function () {
        var _a = this, sequence = _a.sequence, source_port = _a.source_port, source_channel = _a.source_channel, destination_port = _a.destination_port, destination_channel = _a.destination_channel, data = _a.data, timeout_height = _a.timeout_height, timeout_timestamp = _a.timeout_timestamp;
        return channel_1.Packet.fromPartial({
            sequence: long_1.default.fromNumber(sequence),
            sourcePort: source_port,
            sourceChannel: source_channel,
            destinationPort: destination_port,
            destinationChannel: destination_channel,
            data: Buffer.from(data, 'base64'),
            timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
            timeoutTimestamp: long_1.default.fromNumber(timeout_timestamp),
        });
    };
    return Packet;
}(json_1.JSONSerializable));
exports.Packet = Packet;
//# sourceMappingURL=Packet.js.map
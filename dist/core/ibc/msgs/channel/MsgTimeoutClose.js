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
exports.MsgTimeoutOnClose = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Height_1 = require("../../core/client/Height");
var Packet_1 = require("../../core/channel/Packet");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
var long_1 = __importDefault(require("long"));
/**
 * MsgTimeoutOnClose timed-out packet upon counterparty channel closure.
 */
var MsgTimeoutOnClose = /** @class */ (function (_super) {
    __extends(MsgTimeoutOnClose, _super);
    /**
     * @param packet
     * @param proof_unreceived
     * @param proof_height
     * @param proof_close
     * @param next_seuqnce_recv
     * @param signer signer address
     */
    function MsgTimeoutOnClose(packet, proof_unreceived, proof_close, proof_height, next_sequence_recv, signer) {
        var _this = _super.call(this) || this;
        _this.packet = packet;
        _this.proof_unreceived = proof_unreceived;
        _this.proof_close = proof_close;
        _this.proof_height = proof_height;
        _this.next_sequence_recv = next_sequence_recv;
        _this.signer = signer;
        return _this;
    }
    MsgTimeoutOnClose.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgTimeoutOnClose.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgTimeoutOnClose.fromData = function (data, _) {
        _;
        var packet = data.packet, proof_unreceived = data.proof_unreceived, proof_close = data.proof_close, proof_height = data.proof_height, next_sequence_recv = data.next_sequence_recv, signer = data.signer;
        return new MsgTimeoutOnClose(packet ? Packet_1.Packet.fromData(packet) : undefined, proof_close, proof_unreceived, proof_height ? Height_1.Height.fromData(proof_height) : undefined, Number.parseInt(next_sequence_recv), signer);
    };
    MsgTimeoutOnClose.prototype.toData = function (_) {
        _;
        var _a = this, packet = _a.packet, proof_unreceived = _a.proof_unreceived, proof_close = _a.proof_close, proof_height = _a.proof_height, next_sequence_recv = _a.next_sequence_recv, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgTimeoutOnClose',
            packet: packet ? packet.toData() : undefined,
            proof_unreceived: proof_unreceived,
            proof_close: proof_close,
            proof_height: proof_height ? proof_height.toData() : undefined,
            next_sequence_recv: next_sequence_recv.toFixed(),
            signer: signer,
        };
    };
    MsgTimeoutOnClose.fromProto = function (proto, _) {
        _;
        return new MsgTimeoutOnClose(proto.packet ? Packet_1.Packet.fromProto(proto.packet) : undefined, Buffer.from(proto.proofUnreceived).toString('base64'), Buffer.from(proto.proofClose).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.nextSequenceRecv.toNumber(), proto.signer);
    };
    MsgTimeoutOnClose.prototype.toProto = function (_) {
        _;
        var _a = this, packet = _a.packet, proof_unreceived = _a.proof_unreceived, proof_close = _a.proof_close, proof_height = _a.proof_height, next_sequence_recv = _a.next_sequence_recv, signer = _a.signer;
        return tx_1.MsgTimeoutOnClose.fromPartial({
            packet: packet ? packet.toProto() : undefined,
            proofUnreceived: Buffer.from(proof_unreceived, 'base64'),
            proofClose: Buffer.from(proof_close, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            nextSequenceRecv: long_1.default.fromNumber(next_sequence_recv),
            signer: signer,
        });
    };
    MsgTimeoutOnClose.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgTimeoutOnClose',
            value: tx_1.MsgTimeoutOnClose.encode(this.toProto()).finish(),
        });
    };
    MsgTimeoutOnClose.unpackAny = function (msgAny, _) {
        _;
        return MsgTimeoutOnClose.fromProto(tx_1.MsgTimeoutOnClose.decode(msgAny.value));
    };
    return MsgTimeoutOnClose;
}(json_1.JSONSerializable));
exports.MsgTimeoutOnClose = MsgTimeoutOnClose;
//# sourceMappingURL=MsgTimeoutClose.js.map
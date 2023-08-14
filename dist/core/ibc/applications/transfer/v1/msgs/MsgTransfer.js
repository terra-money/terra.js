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
exports.MsgTransfer = void 0;
var json_1 = require("../../../../../../util/json");
var Coin_1 = require("../../../../../Coin");
var Long = __importStar(require("long"));
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/applications/transfer/v1/tx");
var Height_1 = require("../../../../core/client/Height");
var numeric_1 = require("../../../../../numeric");
/**
 * A basic message for transfer [[Coin]] via IBC.
 */
var MsgTransfer = /** @class */ (function (_super) {
    __extends(MsgTransfer, _super);
    /**
     * @param source_port the port on which the packet will be sent
     * @param source_channel  the channel by which the packet will be sent
     * @param token the tokens to be transferred
     * @param sender the sender address
     * @param receiver the recipient address on the destination chain
     * @param timeout_height Timeout height relative to the current block height. (0 to disable)
     * @param timeout_timestamp Timeout timestamp (in nanoseconds) relative to the current block timestamp. (0 to disable)
     */
    function MsgTransfer(source_port, source_channel, token, sender, receiver, timeout_height, timeout_timestamp) {
        var _this = _super.call(this) || this;
        if (!timeout_height && !timeout_timestamp) {
            throw 'both of timeout_height and timeout_timestamp are undefined';
        }
        _this.source_port = source_port;
        _this.source_channel = source_channel;
        _this.token = token;
        _this.sender = sender;
        _this.receiver = receiver;
        _this.timeout_height = timeout_height;
        _this.timeout_timestamp = timeout_timestamp
            ? numeric_1.Numeric.parse(timeout_timestamp)
            : undefined;
        return _this;
    }
    MsgTransfer.fromAmino = function (data, _) {
        _;
        var _a = data.value, source_port = _a.source_port, source_channel = _a.source_channel, token = _a.token, sender = _a.sender, receiver = _a.receiver, timeout_height = _a.timeout_height, timeout_timestamp = _a.timeout_timestamp;
        if (!timeout_height && !timeout_timestamp) {
            throw 'both of timeout_height and timeout_timestamp are undefined';
        }
        return new MsgTransfer(source_port, source_channel, token ? Coin_1.Coin.fromAmino(token) : undefined, sender, receiver, timeout_height ? Height_1.Height.fromAmino(timeout_height) : undefined, timeout_timestamp ? numeric_1.Numeric.parse(timeout_timestamp) : undefined);
    };
    MsgTransfer.prototype.toAmino = function (_) {
        _;
        var _a = this, source_port = _a.source_port, source_channel = _a.source_channel, token = _a.token, sender = _a.sender, receiver = _a.receiver, timeout_height = _a.timeout_height, timeout_timestamp = _a.timeout_timestamp;
        return {
            type: 'cosmos-sdk/MsgTransfer',
            value: {
                source_port: source_port,
                source_channel: source_channel,
                token: token ? token.toAmino() : undefined,
                sender: sender,
                receiver: receiver,
                timeout_height: (timeout_height === null || timeout_height === void 0 ? void 0 : timeout_height.toAmino()) || {},
                timeout_timestamp: (timeout_timestamp === null || timeout_timestamp === void 0 ? void 0 : timeout_timestamp.toFixed()) || undefined,
            },
        };
    };
    MsgTransfer.fromData = function (data, _) {
        _;
        var source_port = data.source_port, source_channel = data.source_channel, token = data.token, sender = data.sender, receiver = data.receiver, timeout_timestamp = data.timeout_timestamp, timeout_height = data.timeout_height;
        if (!timeout_height && !timeout_timestamp) {
            throw 'both of timeout_height and timeout_timestamp are undefined';
        }
        return new MsgTransfer(source_port, source_channel, token ? Coin_1.Coin.fromData(token) : undefined, sender, receiver, timeout_height ? Height_1.Height.fromData(timeout_height) : undefined, timeout_timestamp ? Number.parseInt(timeout_timestamp) : undefined);
    };
    MsgTransfer.prototype.toData = function (_) {
        _;
        var _a = this, source_port = _a.source_port, source_channel = _a.source_channel, token = _a.token, sender = _a.sender, receiver = _a.receiver, timeout_height = _a.timeout_height, timeout_timestamp = _a.timeout_timestamp;
        return {
            '@type': '/ibc.applications.transfer.v1.MsgTransfer',
            source_port: source_port,
            source_channel: source_channel,
            token: token ? token.toData() : undefined,
            sender: sender,
            receiver: receiver,
            timeout_height: timeout_height
                ? timeout_height.toData()
                : new Height_1.Height(0, 0).toData(),
            timeout_timestamp: (timeout_timestamp === null || timeout_timestamp === void 0 ? void 0 : timeout_timestamp.toFixed()) || '0',
        };
    };
    MsgTransfer.fromProto = function (proto, _) {
        _;
        if (!proto.timeoutHeight && proto.timeoutTimestamp.toNumber() == 0) {
            throw 'both of timeout_height and timeout_timestamp are empty';
        }
        return new MsgTransfer(proto.sourcePort, proto.sourceChannel, proto.token ? Coin_1.Coin.fromProto(proto.token) : undefined, proto.sender, proto.receiver, proto.timeoutHeight ? Height_1.Height.fromProto(proto.timeoutHeight) : undefined, proto.timeoutTimestamp.toNumber());
    };
    MsgTransfer.prototype.toProto = function (_) {
        _;
        var _a = this, source_port = _a.source_port, source_channel = _a.source_channel, token = _a.token, sender = _a.sender, receiver = _a.receiver, timeout_height = _a.timeout_height, timeout_timestamp = _a.timeout_timestamp;
        return tx_1.MsgTransfer.fromPartial({
            sourcePort: source_port,
            sourceChannel: source_channel,
            token: token ? token.toProto() : undefined,
            sender: sender,
            receiver: receiver,
            timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
            timeoutTimestamp: Long.fromString((timeout_timestamp === null || timeout_timestamp === void 0 ? void 0 : timeout_timestamp.toFixed()) || '0'),
        });
    };
    MsgTransfer.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
            value: tx_1.MsgTransfer.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgTransfer.unpackAny = function (msgAny, isClassic) {
        return MsgTransfer.fromProto(tx_1.MsgTransfer.decode(msgAny.value), isClassic);
    };
    return MsgTransfer;
}(json_1.JSONSerializable));
exports.MsgTransfer = MsgTransfer;
//# sourceMappingURL=MsgTransfer.js.map
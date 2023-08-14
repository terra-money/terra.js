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
exports.MsgSwapSend = void 0;
var json_1 = require("../../../util/json");
var Coin_1 = require("../../Coin");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@classic-terra/terra.proto/terra/market/v1beta1/tx");
/**
 * Executes a market swap send between 2 denominations at the exchange rate registered by the
 * Oracle module. The sender account will lose the amount of coins offered, and receiver will receive funds
 * in the requested denomination after a swap and send fee has been applied.
 */
var MsgSwapSend = /** @class */ (function (_super) {
    __extends(MsgSwapSend, _super);
    /**
     * @param from_address sender's account address
     * @param to_address receiver's account address
     * @param offer_coin coin to be swapped (from)
     * @param ask_denom desired denomination (to)
     */
    function MsgSwapSend(from_address, to_address, offer_coin, ask_denom) {
        var _this = _super.call(this) || this;
        _this.from_address = from_address;
        _this.to_address = to_address;
        _this.offer_coin = offer_coin;
        _this.ask_denom = ask_denom;
        return _this;
    }
    MsgSwapSend.fromAmino = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = data.value, from_address = _a.from_address, to_address = _a.to_address, offer_coin = _a.offer_coin, ask_denom = _a.ask_denom;
        return new MsgSwapSend(from_address, to_address, Coin_1.Coin.fromAmino(offer_coin), ask_denom);
    };
    MsgSwapSend.prototype.toAmino = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, offer_coin = _a.offer_coin, ask_denom = _a.ask_denom;
        return {
            type: 'market/MsgSwapSend',
            value: {
                from_address: from_address,
                to_address: to_address,
                offer_coin: offer_coin.toAmino(),
                ask_denom: ask_denom,
            },
        };
    };
    MsgSwapSend.fromProto = function (proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgSwapSend(proto.fromAddress, proto.toAddress, Coin_1.Coin.fromProto(proto.offerCoin), proto.askDenom);
    };
    MsgSwapSend.prototype.toProto = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, offer_coin = _a.offer_coin, ask_denom = _a.ask_denom;
        return tx_1.MsgSwapSend.fromPartial({
            askDenom: ask_denom,
            fromAddress: from_address,
            offerCoin: offer_coin.toProto(),
            toAddress: to_address,
        });
    };
    MsgSwapSend.prototype.packAny = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.market.v1beta1.MsgSwapSend',
            value: tx_1.MsgSwapSend.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgSwapSend.unpackAny = function (msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgSwapSend.fromProto(tx_1.MsgSwapSend.decode(msgAny.value), isClassic);
    };
    MsgSwapSend.fromData = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var from_address = data.from_address, to_address = data.to_address, offer_coin = data.offer_coin, ask_denom = data.ask_denom;
        return new MsgSwapSend(from_address, to_address, Coin_1.Coin.fromData(offer_coin), ask_denom);
    };
    MsgSwapSend.prototype.toData = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, offer_coin = _a.offer_coin, ask_denom = _a.ask_denom;
        return {
            '@type': '/terra.market.v1beta1.MsgSwapSend',
            from_address: from_address,
            to_address: to_address,
            offer_coin: offer_coin.toData(),
            ask_denom: ask_denom,
        };
    };
    return MsgSwapSend;
}(json_1.JSONSerializable));
exports.MsgSwapSend = MsgSwapSend;
//# sourceMappingURL=MsgSwapSend.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSwap = void 0;
var json_1 = require("../../../util/json");
var Coin_1 = require("../../Coin");
/**
 * Executes a market swap between 2 denominations at the exchange rate registered by the
 * Oracle module. The account will lose the amount of coins offered, and receive funds
 * in the requested denomination after a swap fee has been applied.
 */
var MsgSwap = /** @class */ (function (_super) {
    __extends(MsgSwap, _super);
    /**
     * @param trader trader's account address
     * @param offer_coin coin to be swapped (from)
     * @param ask_denom desired denomination (to)
     */
    function MsgSwap(trader, offer_coin, ask_denom) {
        var _this = _super.call(this) || this;
        _this.trader = trader;
        _this.offer_coin = offer_coin;
        _this.ask_denom = ask_denom;
        return _this;
    }
    MsgSwap.fromData = function (data) {
        var _a = data.value, trader = _a.trader, offer_coin = _a.offer_coin, ask_denom = _a.ask_denom;
        return new MsgSwap(trader, Coin_1.Coin.fromData(offer_coin), ask_denom);
    };
    MsgSwap.prototype.toData = function () {
        var _a = this, trader = _a.trader, offer_coin = _a.offer_coin, ask_denom = _a.ask_denom;
        return {
            type: 'market/MsgSwap',
            value: {
                trader: trader,
                offer_coin: offer_coin.toData(),
                ask_denom: ask_denom,
            },
        };
    };
    return MsgSwap;
}(json_1.JSONSerializable));
exports.MsgSwap = MsgSwap;
//# sourceMappingURL=MsgSwap.js.map
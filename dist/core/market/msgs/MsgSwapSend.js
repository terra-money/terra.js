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
exports.MsgSwapSend = void 0;
var json_1 = require("../../../util/json");
var Coin_1 = require("../../Coin");
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
    MsgSwapSend.fromData = function (data) {
        var _a = data.value, from_address = _a.from_address, to_address = _a.to_address, offer_coin = _a.offer_coin, ask_denom = _a.ask_denom;
        return new MsgSwapSend(from_address, to_address, Coin_1.Coin.fromData(offer_coin), ask_denom);
    };
    MsgSwapSend.prototype.toData = function () {
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, offer_coin = _a.offer_coin, ask_denom = _a.ask_denom;
        return {
            type: 'market/MsgSwapSend',
            value: {
                from_address: from_address,
                to_address: to_address,
                offer_coin: offer_coin.toData(),
                ask_denom: ask_denom,
            },
        };
    };
    return MsgSwapSend;
}(json_1.JSONSerializable));
exports.MsgSwapSend = MsgSwapSend;
//# sourceMappingURL=MsgSwapSend.js.map
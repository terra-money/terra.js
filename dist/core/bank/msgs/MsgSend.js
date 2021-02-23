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
exports.MsgSend = void 0;
var Coins_1 = require("../../Coins");
var json_1 = require("../../../util/json");
/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
var MsgSend = /** @class */ (function (_super) {
    __extends(MsgSend, _super);
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     * @param amount value of the transaction
     */
    function MsgSend(from_address, to_address, amount) {
        var _this = _super.call(this) || this;
        _this.from_address = from_address;
        _this.to_address = to_address;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    MsgSend.fromData = function (data) {
        var _a = data.value, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount;
        return new MsgSend(from_address, to_address, Coins_1.Coins.fromData(amount));
    };
    MsgSend.prototype.toData = function () {
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount;
        return {
            type: 'bank/MsgSend',
            value: {
                from_address: from_address,
                to_address: to_address,
                amount: amount.toData(),
            },
        };
    };
    return MsgSend;
}(json_1.JSONSerializable));
exports.MsgSend = MsgSend;
//# sourceMappingURL=MsgSend.js.map
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
exports.MsgFundCommunityPool = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var MsgFundCommunityPool = /** @class */ (function (_super) {
    __extends(MsgFundCommunityPool, _super);
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    function MsgFundCommunityPool(depositor, amount) {
        var _this = _super.call(this) || this;
        _this.depositor = depositor;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    MsgFundCommunityPool.fromData = function (data) {
        var _a = data.value, depositor = _a.depositor, amount = _a.amount;
        return new MsgFundCommunityPool(depositor, Coins_1.Coins.fromData(amount));
    };
    MsgFundCommunityPool.prototype.toData = function () {
        var _a = this, depositor = _a.depositor, amount = _a.amount;
        return {
            type: 'distribution/MsgFundCommunityPool',
            value: {
                depositor: depositor,
                amount: amount.toData(),
            },
        };
    };
    return MsgFundCommunityPool;
}(json_1.JSONSerializable));
exports.MsgFundCommunityPool = MsgFundCommunityPool;
//# sourceMappingURL=MsgFundCommunityPool.js.map
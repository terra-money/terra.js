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
exports.MsgDeposit = void 0;
var Coins_1 = require("../../Coins");
var json_1 = require("../../../util/json");
/**
 * Add a deposit for a proposal
 */
var MsgDeposit = /** @class */ (function (_super) {
    __extends(MsgDeposit, _super);
    /**
     * @param proposal_id Id of porposal to deposit to
     * @param depositor depositor's account address
     * @param amount amount to deposit
     */
    function MsgDeposit(proposal_id, depositor, amount) {
        var _this = _super.call(this) || this;
        _this.proposal_id = proposal_id;
        _this.depositor = depositor;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    MsgDeposit.fromData = function (data) {
        var _a = data.value, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return new MsgDeposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromData(amount));
    };
    MsgDeposit.prototype.toData = function () {
        var _a = this, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return {
            type: 'gov/MsgDeposit',
            value: {
                proposal_id: proposal_id.toString(),
                depositor: depositor,
                amount: amount.toData(),
            },
        };
    };
    return MsgDeposit;
}(json_1.JSONSerializable));
exports.MsgDeposit = MsgDeposit;
//# sourceMappingURL=MsgDeposit.js.map
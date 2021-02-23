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
exports.CommunityPoolSpendProposal = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
/**
 * Proposal that disburses funds from the Distribution module's community pool to the
 * specified recipient if passed.
 */
var CommunityPoolSpendProposal = /** @class */ (function (_super) {
    __extends(CommunityPoolSpendProposal, _super);
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param recipient recipient address
     * @param amount amount to give recipient
     */
    function CommunityPoolSpendProposal(title, description, recipient, amount) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.recipient = recipient;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    CommunityPoolSpendProposal.fromData = function (data) {
        var _a = data.value, title = _a.title, description = _a.description, recipient = _a.recipient, amount = _a.amount;
        return new CommunityPoolSpendProposal(title, description, recipient, Coins_1.Coins.fromData(amount));
    };
    CommunityPoolSpendProposal.prototype.toData = function () {
        var _a = this, title = _a.title, description = _a.description, recipient = _a.recipient, amount = _a.amount;
        return {
            type: 'distribution/CommunityPoolSpendProposal',
            value: {
                title: title,
                description: description,
                recipient: recipient,
                amount: amount.toData(),
            },
        };
    };
    return CommunityPoolSpendProposal;
}(json_1.JSONSerializable));
exports.CommunityPoolSpendProposal = CommunityPoolSpendProposal;
//# sourceMappingURL=CommunityPoolSpendProposal.js.map
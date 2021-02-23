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
exports.RewardWeightUpdateProposal = void 0;
var json_1 = require("../../../util/json");
var numeric_1 = require("../../numeric");
/**
 * A proposal for a direct and immediate change to the treasury's reward weight state,
 * which governs staking and validator returns. If passed, the new reward weight is put
 * into effect immediately, after clamping.
 */
var RewardWeightUpdateProposal = /** @class */ (function (_super) {
    __extends(RewardWeightUpdateProposal, _super);
    /**
     *
     * @param title proposal's title
     * @param description proposal's description
     * @param reward_weight new proposed value for reward weight
     */
    function RewardWeightUpdateProposal(title, description, reward_weight) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.reward_weight = reward_weight;
        return _this;
    }
    RewardWeightUpdateProposal.fromData = function (data) {
        var _a = data.value, title = _a.title, description = _a.description, reward_weight = _a.reward_weight;
        return new RewardWeightUpdateProposal(title, description, new numeric_1.Dec(reward_weight));
    };
    RewardWeightUpdateProposal.prototype.toData = function () {
        var _a = this, title = _a.title, description = _a.description, reward_weight = _a.reward_weight;
        return {
            type: 'treasury/RewardWeightUpdateProposal',
            value: {
                title: title,
                description: description,
                reward_weight: reward_weight.toString(),
            },
        };
    };
    return RewardWeightUpdateProposal;
}(json_1.JSONSerializable));
exports.RewardWeightUpdateProposal = RewardWeightUpdateProposal;
//# sourceMappingURL=RewardWeightUpdateProposal.js.map
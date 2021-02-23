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
exports.MsgSubmitProposal = void 0;
var Coins_1 = require("../../Coins");
var Proposal_1 = require("../../Proposal");
var json_1 = require("../../../util/json");
/**
 * Submit a proposal alongside an initial deposit.
 */
var MsgSubmitProposal = /** @class */ (function (_super) {
    __extends(MsgSubmitProposal, _super);
    /**
     * @param content proposal content to submit
     * @param initial_deposit deposit provided
     * @param proposer proposer's account address
     */
    function MsgSubmitProposal(content, initial_deposit, proposer) {
        var _this = _super.call(this) || this;
        _this.content = content;
        _this.proposer = proposer;
        _this.initial_deposit = new Coins_1.Coins(initial_deposit);
        return _this;
    }
    MsgSubmitProposal.fromData = function (data) {
        var _a = data.value, content = _a.content, initial_deposit = _a.initial_deposit, proposer = _a.proposer;
        return new MsgSubmitProposal(Proposal_1.Proposal.Content.fromData(content), Coins_1.Coins.fromData(initial_deposit), proposer);
    };
    MsgSubmitProposal.prototype.toData = function () {
        var _a = this, content = _a.content, initial_deposit = _a.initial_deposit, proposer = _a.proposer;
        return {
            type: 'gov/MsgSubmitProposal',
            value: {
                content: content.toData(),
                initial_deposit: initial_deposit.toData(),
                proposer: proposer,
            },
        };
    };
    return MsgSubmitProposal;
}(json_1.JSONSerializable));
exports.MsgSubmitProposal = MsgSubmitProposal;
//# sourceMappingURL=MsgSubmitProposal.js.map
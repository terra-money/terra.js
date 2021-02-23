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
exports.MsgVote = void 0;
var json_1 = require("../../../util/json");
/**
 * Vote for a proposal
 */
var MsgVote = /** @class */ (function (_super) {
    __extends(MsgVote, _super);
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param option one of voting options
     */
    function MsgVote(proposal_id, voter, option) {
        var _this = _super.call(this) || this;
        _this.proposal_id = proposal_id;
        _this.voter = voter;
        _this.option = option;
        return _this;
    }
    MsgVote.fromData = function (data) {
        var _a = data.value, proposal_id = _a.proposal_id, voter = _a.voter, option = _a.option;
        return new MsgVote(Number.parseInt(proposal_id), voter, option);
    };
    MsgVote.prototype.toData = function () {
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, option = _a.option;
        return {
            type: 'gov/MsgVote',
            value: {
                proposal_id: proposal_id.toFixed(),
                voter: voter,
                option: option,
            },
        };
    };
    return MsgVote;
}(json_1.JSONSerializable));
exports.MsgVote = MsgVote;
(function (MsgVote) {
    /** Voting options */
    var Option;
    (function (Option) {
        /** - */
        Option["EMPTY"] = "Empty";
        /** Vote yes */
        Option["YES"] = "Yes";
        /** Do not vote */
        Option["ABSTAIN"] = "Abstain";
        /** Vote no */
        Option["NO"] = "No";
        /** Vote No with the option to veto if passed */
        Option["NO_WITH_VETO"] = "NoWithVeto";
    })(Option = MsgVote.Option || (MsgVote.Option = {}));
})(MsgVote = exports.MsgVote || (exports.MsgVote = {}));
exports.MsgVote = MsgVote;
//# sourceMappingURL=MsgVote.js.map
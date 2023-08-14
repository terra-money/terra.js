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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightedVoteOption = exports.Vote = void 0;
var json_1 = require("../../util/json");
var gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
var numeric_1 = require("../numeric");
var Long = __importStar(require("long"));
/**
 * Stores vote information for a proposal
 */
var Vote = /** @class */ (function (_super) {
    __extends(Vote, _super);
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param options voting options
     */
    function Vote(proposal_id, voter, options) {
        var _this = _super.call(this) || this;
        _this.proposal_id = proposal_id;
        _this.voter = voter;
        _this.options = options;
        _this.Option = gov_1.VoteOption;
        return _this;
    }
    Vote.fromAmino = function (data, _) {
        _;
        var proposal_id = data.proposal_id, voter = data.voter, options = data.options;
        return new Vote(Number.parseInt(proposal_id), voter, options.map(function (v) { return WeightedVoteOption.fromAmino(v); }));
    };
    Vote.prototype.toAmino = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, options = _a.options;
        var res = {
            proposal_id: proposal_id.toFixed(),
            voter: voter,
            options: options.map(function (v) { return v.toAmino(); }),
        };
        return res;
    };
    Vote.fromData = function (data, _) {
        _;
        var proposal_id = data.proposal_id, voter = data.voter, options = data.options;
        return new Vote(Number.parseInt(proposal_id), voter, options.map(function (v) { return WeightedVoteOption.fromData(v); }));
    };
    Vote.prototype.toData = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, options = _a.options;
        var res = {
            proposal_id: proposal_id.toFixed(),
            voter: voter,
            options: options.map(function (v) { return v.toData(); }),
        };
        return res;
    };
    Vote.fromProto = function (proto, _) {
        _;
        return new Vote(proto.proposalId.toNumber(), proto.voter, proto.options.map(function (o) { return WeightedVoteOption.fromProto(o); }));
    };
    Vote.prototype.toProto = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, options = _a.options;
        return gov_1.Vote.fromPartial({
            options: options.map(function (o) { return o.toProto(); }),
            proposalId: Long.fromNumber(proposal_id),
            voter: voter,
        });
    };
    return Vote;
}(json_1.JSONSerializable));
exports.Vote = Vote;
(function (Vote) {
    Vote.Option = gov_1.VoteOption;
})(Vote = exports.Vote || (exports.Vote = {}));
exports.Vote = Vote;
var WeightedVoteOption = /** @class */ (function (_super) {
    __extends(WeightedVoteOption, _super);
    function WeightedVoteOption(option, weight) {
        var _this = _super.call(this) || this;
        _this.option = option;
        _this.weight = new numeric_1.Dec(weight);
        return _this;
    }
    WeightedVoteOption.fromAmino = function (data, _) {
        _;
        var option = data.option, weight = data.weight;
        return new WeightedVoteOption(option, weight);
    };
    WeightedVoteOption.prototype.toAmino = function (_) {
        _;
        var _a = this, option = _a.option, weight = _a.weight;
        return {
            option: option,
            weight: weight.toString(),
        };
    };
    WeightedVoteOption.fromData = function (data, _) {
        _;
        var option = data.option, weight = data.weight;
        return new WeightedVoteOption(option, weight);
    };
    WeightedVoteOption.prototype.toData = function (_) {
        _;
        var _a = this, option = _a.option, weight = _a.weight;
        return {
            option: option,
            weight: weight.toString(),
        };
    };
    WeightedVoteOption.fromProto = function (proto, _) {
        _;
        return new WeightedVoteOption(proto.option, proto.weight);
    };
    WeightedVoteOption.prototype.toProto = function (_) {
        _;
        var _a = this, option = _a.option, weight = _a.weight;
        return gov_1.WeightedVoteOption.fromPartial({
            option: option,
            weight: weight.toString(),
        });
    };
    return WeightedVoteOption;
}(json_1.JSONSerializable));
exports.WeightedVoteOption = WeightedVoteOption;
//# sourceMappingURL=Vote.js.map
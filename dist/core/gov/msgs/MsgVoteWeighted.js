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
exports.MsgVoteWeighted = void 0;
var json_1 = require("../../../util/json");
var Vote_1 = require("../Vote");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/tx");
var Long = __importStar(require("long"));
/**
 * Weighted vote for a proposal
 */
var MsgVoteWeighted = /** @class */ (function (_super) {
    __extends(MsgVoteWeighted, _super);
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param option one of voting options
     */
    function MsgVoteWeighted(proposal_id, voter, options) {
        var _this = _super.call(this) || this;
        _this.proposal_id = proposal_id;
        _this.voter = voter;
        _this.options = options;
        return _this;
    }
    MsgVoteWeighted.fromAmino = function (data, _) {
        _;
        var _a = data.value, proposal_id = _a.proposal_id, voter = _a.voter, options = _a.options;
        return new MsgVoteWeighted(Number.parseInt(proposal_id), voter, options.map(function (o) { return Vote_1.WeightedVoteOption.fromAmino(o); }));
    };
    MsgVoteWeighted.prototype.toAmino = function (isClassic) {
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, options = _a.options;
        return {
            type: isClassic ? 'gov/MsgVoteWeighted' : 'cosmos-sdk/MsgVoteWeighted',
            value: {
                proposal_id: proposal_id.toFixed(),
                voter: voter,
                options: options.map(function (o) { return o.toAmino(); }),
            },
        };
    };
    MsgVoteWeighted.fromData = function (data, _) {
        _;
        var proposal_id = data.proposal_id, voter = data.voter, options = data.options;
        return new MsgVoteWeighted(Number.parseInt(proposal_id), voter, options.map(function (o) { return Vote_1.WeightedVoteOption.fromData(o); }));
    };
    MsgVoteWeighted.prototype.toData = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, options = _a.options;
        return {
            '@type': '/cosmos.gov.v1beta1.MsgVoteWeighted',
            proposal_id: proposal_id.toFixed(),
            voter: voter,
            options: options.map(function (o) { return o.toData(); }),
        };
    };
    MsgVoteWeighted.fromProto = function (proto, _) {
        _;
        return new MsgVoteWeighted(proto.proposalId.toNumber(), proto.voter, proto.options.map(function (o) { return Vote_1.WeightedVoteOption.fromProto(o); }));
    };
    MsgVoteWeighted.prototype.toProto = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, options = _a.options;
        return tx_1.MsgVoteWeighted.fromPartial({
            options: options.map(function (o) { return o.toProto(); }),
            proposalId: Long.fromNumber(proposal_id),
            voter: voter,
        });
    };
    MsgVoteWeighted.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.MsgVoteWeighted',
            value: tx_1.MsgVoteWeighted.encode(this.toProto()).finish(),
        });
    };
    MsgVoteWeighted.unpackAny = function (msgAny, _) {
        _;
        return MsgVoteWeighted.fromProto(tx_1.MsgVoteWeighted.decode(msgAny.value));
    };
    return MsgVoteWeighted;
}(json_1.JSONSerializable));
exports.MsgVoteWeighted = MsgVoteWeighted;
//# sourceMappingURL=MsgVoteWeighted.js.map
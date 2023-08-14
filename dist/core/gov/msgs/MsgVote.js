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
exports.MsgVote = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/tx");
var gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
var Long = __importStar(require("long"));
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
    MsgVote.fromAmino = function (data, _) {
        _;
        var _a = data.value, proposal_id = _a.proposal_id, voter = _a.voter, option = _a.option;
        return new MsgVote(Number.parseInt(proposal_id), voter, option);
    };
    MsgVote.prototype.toAmino = function (isClassic) {
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, option = _a.option;
        return {
            type: isClassic ? 'gov/MsgVote' : 'cosmos-sdk/MsgVote',
            value: {
                proposal_id: proposal_id.toFixed(),
                voter: voter,
                option: option,
            },
        };
    };
    MsgVote.fromData = function (data, _) {
        _;
        var proposal_id = data.proposal_id, voter = data.voter, option = data.option;
        return new MsgVote(Number.parseInt(proposal_id), voter, option);
    };
    MsgVote.prototype.toData = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, option = _a.option;
        return {
            '@type': '/cosmos.gov.v1beta1.MsgVote',
            proposal_id: proposal_id.toFixed(),
            voter: voter,
            option: option,
        };
    };
    MsgVote.fromProto = function (proto, _) {
        _;
        return new MsgVote(proto.proposalId.toNumber(), proto.voter, proto.option);
    };
    MsgVote.prototype.toProto = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, voter = _a.voter, option = _a.option;
        return tx_1.MsgVote.fromPartial({
            option: option,
            proposalId: Long.fromNumber(proposal_id),
            voter: voter,
        });
    };
    MsgVote.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.MsgVote',
            value: tx_1.MsgVote.encode(this.toProto()).finish(),
        });
    };
    MsgVote.unpackAny = function (msgAny, _) {
        _;
        return MsgVote.fromProto(tx_1.MsgVote.decode(msgAny.value));
    };
    return MsgVote;
}(json_1.JSONSerializable));
exports.MsgVote = MsgVote;
(function (MsgVote) {
    MsgVote.Option = gov_1.VoteOption;
})(MsgVote = exports.MsgVote || (exports.MsgVote = {}));
exports.MsgVote = MsgVote;
//# sourceMappingURL=MsgVote.js.map
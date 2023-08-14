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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSubmitProposal = void 0;
var Coins_1 = require("../../Coins");
var Proposal_1 = require("../Proposal");
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/tx");
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
    MsgSubmitProposal.fromAmino = function (data, isClassic) {
        var _a = data.value, content = _a.content, initial_deposit = _a.initial_deposit, proposer = _a.proposer;
        return new MsgSubmitProposal(Proposal_1.Proposal.Content.fromAmino(content, isClassic), Coins_1.Coins.fromAmino(initial_deposit), proposer);
    };
    MsgSubmitProposal.prototype.toAmino = function (isClassic) {
        var _a = this, content = _a.content, initial_deposit = _a.initial_deposit, proposer = _a.proposer;
        return {
            type: isClassic
                ? 'gov/MsgSubmitProposal'
                : 'cosmos-sdk/MsgSubmitProposal',
            value: {
                content: content.toAmino(isClassic),
                initial_deposit: initial_deposit.toAmino(),
                proposer: proposer,
            },
        };
    };
    MsgSubmitProposal.fromData = function (data, isClassic) {
        var content = data.content, initial_deposit = data.initial_deposit, proposer = data.proposer;
        return new MsgSubmitProposal(Proposal_1.Proposal.Content.fromData(content, isClassic), Coins_1.Coins.fromData(initial_deposit), proposer);
    };
    MsgSubmitProposal.prototype.toData = function (isClassic) {
        var _a = this, content = _a.content, initial_deposit = _a.initial_deposit, proposer = _a.proposer;
        return {
            '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal',
            content: content.toData(isClassic),
            initial_deposit: initial_deposit.toData(),
            proposer: proposer,
        };
    };
    MsgSubmitProposal.fromProto = function (proto, isClassic) {
        return new MsgSubmitProposal(Proposal_1.Proposal.Content.fromProto(proto.content, isClassic), Coins_1.Coins.fromProto(proto.initialDeposit), proto.proposer);
    };
    MsgSubmitProposal.prototype.toProto = function (isClassic) {
        var _a = this, content = _a.content, initial_deposit = _a.initial_deposit, proposer = _a.proposer;
        return tx_1.MsgSubmitProposal.fromPartial({
            content: content.packAny(isClassic),
            initialDeposit: initial_deposit.toProto(),
            proposer: proposer,
        });
    };
    MsgSubmitProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
            value: tx_1.MsgSubmitProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgSubmitProposal.unpackAny = function (msgAny, isClassic) {
        return MsgSubmitProposal.fromProto(tx_1.MsgSubmitProposal.decode(msgAny.value), isClassic);
    };
    return MsgSubmitProposal;
}(json_1.JSONSerializable));
exports.MsgSubmitProposal = MsgSubmitProposal;
//# sourceMappingURL=MsgSubmitProposal.js.map
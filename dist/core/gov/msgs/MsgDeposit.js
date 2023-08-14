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
exports.MsgDeposit = void 0;
var Coins_1 = require("../../Coins");
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/tx");
var Long = __importStar(require("long"));
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
    MsgDeposit.fromAmino = function (data, _) {
        _;
        var _a = data.value, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return new MsgDeposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromAmino(amount));
    };
    MsgDeposit.prototype.toAmino = function (isClassic) {
        var _a = this, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return {
            type: isClassic ? 'gov/MsgDeposit' : 'cosmos-sdk/MsgDeposit',
            value: {
                proposal_id: proposal_id.toString(),
                depositor: depositor,
                amount: amount.toAmino(),
            },
        };
    };
    MsgDeposit.fromData = function (data, _) {
        _;
        var proposal_id = data.proposal_id, depositor = data.depositor, amount = data.amount;
        return new MsgDeposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromData(amount));
    };
    MsgDeposit.prototype.toData = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return {
            '@type': '/cosmos.gov.v1beta1.MsgDeposit',
            proposal_id: proposal_id.toString(),
            depositor: depositor,
            amount: amount.toData(),
        };
    };
    MsgDeposit.fromProto = function (proto, _) {
        _;
        return new MsgDeposit(proto.proposalId.toNumber(), proto.depositor, Coins_1.Coins.fromProto(proto.amount));
    };
    MsgDeposit.prototype.toProto = function (_) {
        _;
        var _a = this, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return tx_1.MsgDeposit.fromPartial({
            amount: amount.toProto(),
            depositor: depositor,
            proposalId: Long.fromNumber(proposal_id),
        });
    };
    MsgDeposit.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
            value: tx_1.MsgDeposit.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgDeposit.unpackAny = function (msgAny, isClassic) {
        return MsgDeposit.fromProto(tx_1.MsgDeposit.decode(msgAny.value), isClassic);
    };
    return MsgDeposit;
}(json_1.JSONSerializable));
exports.MsgDeposit = MsgDeposit;
//# sourceMappingURL=MsgDeposit.js.map
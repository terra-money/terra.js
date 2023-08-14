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
exports.Deposit = void 0;
var Coins_1 = require("./Coins");
var json_1 = require("../util/json");
var gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
var Long = __importStar(require("long"));
/**
 * Stores deposit information for a proposal
 */
var Deposit = /** @class */ (function (_super) {
    __extends(Deposit, _super);
    /**
     * @param proposal_id Id of porposal to deposit to
     * @param depositor depositor's account address
     * @param amount amount to deposit
     */
    function Deposit(proposal_id, depositor, amount) {
        var _this = _super.call(this) || this;
        _this.proposal_id = proposal_id;
        _this.depositor = depositor;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    Deposit.fromAmino = function (data) {
        var proposal_id = data.proposal_id, depositor = data.depositor, amount = data.amount;
        return new Deposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromAmino(amount));
    };
    Deposit.prototype.toAmino = function () {
        var _a = this, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return {
            proposal_id: proposal_id.toString(),
            depositor: depositor,
            amount: amount.toAmino(),
        };
    };
    Deposit.fromData = function (data) {
        var proposal_id = data.proposal_id, depositor = data.depositor, amount = data.amount;
        return new Deposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromData(amount));
    };
    Deposit.prototype.toData = function () {
        var _a = this, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return {
            proposal_id: proposal_id.toString(),
            depositor: depositor,
            amount: amount.toData(),
        };
    };
    Deposit.fromProto = function (data) {
        return new Deposit(data.proposalId.toNumber(), data.depositor, Coins_1.Coins.fromProto(data.amount));
    };
    Deposit.prototype.toProto = function () {
        var _a = this, proposal_id = _a.proposal_id, depositor = _a.depositor, amount = _a.amount;
        return gov_1.Deposit.fromPartial({
            proposalId: Long.fromNumber(proposal_id),
            depositor: depositor,
            amount: amount.toProto(),
        });
    };
    return Deposit;
}(json_1.JSONSerializable));
exports.Deposit = Deposit;
//# sourceMappingURL=Deposit.js.map
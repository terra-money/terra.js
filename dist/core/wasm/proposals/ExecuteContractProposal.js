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
exports.ExecuteContractProposal = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
/**
 * ExecuteContractProposal gov proposal content type to call execute on a
 * contract.
 */
var ExecuteContractProposal = /** @class */ (function (_super) {
    __extends(ExecuteContractProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param run_as contract user
     * @param contract contract address
     * @param execute_msg HandleMsg to pass as arguments for contract invocation
     * @param coins coins to be sent to contract
     */
    function ExecuteContractProposal(title, description, run_as, contract, execute_msg, coins) {
        if (coins === void 0) { coins = {}; }
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.run_as = run_as;
        _this.contract = contract;
        _this.execute_msg = execute_msg;
        _this.coins = new Coins_1.Coins(coins);
        return _this;
    }
    ExecuteContractProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, run_as = _a.run_as, contract = _a.contract, msg = _a.msg, funds = _a.funds;
        return new ExecuteContractProposal(title, description, run_as, contract, msg, Coins_1.Coins.fromAmino(funds));
    };
    ExecuteContractProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
        return {
            type: 'wasm/ExecuteContractProposal',
            value: {
                title: title,
                description: description,
                run_as: run_as,
                contract: contract,
                msg: (0, json_1.removeNull)(execute_msg),
                funds: coins.toAmino(),
            },
        };
    };
    ExecuteContractProposal.fromProto = function (proto, _) {
        return new ExecuteContractProposal(proto.title, proto.description, proto.runAs, proto.contract, JSON.parse(Buffer.from(proto.msg).toString('utf-8')), Coins_1.Coins.fromProto(proto.funds));
    };
    ExecuteContractProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
        return proposal_1.ExecuteContractProposal.fromPartial({
            title: title,
            description: description,
            funds: coins.toProto(),
            contract: contract,
            runAs: run_as,
            msg: Buffer.from(JSON.stringify((0, json_1.removeNull)(execute_msg)), 'utf-8'),
        });
    };
    ExecuteContractProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.ExecuteContractProposal',
            value: proposal_1.ExecuteContractProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    ExecuteContractProposal.unpackAny = function (msgAny, isClassic) {
        return ExecuteContractProposal.fromProto(proposal_1.ExecuteContractProposal.decode(msgAny.value), isClassic);
    };
    ExecuteContractProposal.fromData = function (data, _) {
        var _a = data, title = _a.title, description = _a.description, run_as = _a.run_as, contract = _a.contract, msg = _a.msg, funds = _a.funds;
        return new ExecuteContractProposal(title, description, run_as, contract, msg, Coins_1.Coins.fromData(funds));
    };
    ExecuteContractProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
        return {
            '@type': '/cosmwasm.wasm.v1.ExecuteContractProposal',
            title: title,
            description: description,
            run_as: run_as,
            contract: contract,
            msg: execute_msg,
            funds: coins.toData(),
        };
    };
    return ExecuteContractProposal;
}(json_1.JSONSerializable));
exports.ExecuteContractProposal = ExecuteContractProposal;
//# sourceMappingURL=ExecuteContractProposal.js.map
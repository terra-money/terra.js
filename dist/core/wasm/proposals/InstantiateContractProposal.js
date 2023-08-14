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
exports.InstantiateContractProposal = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
var Long = __importStar(require("long"));
/**
 * InstantiateContractProposal gov proposal content type to instantiate a
 * contract.
 */
var InstantiateContractProposal = /** @class */ (function (_super) {
    __extends(InstantiateContractProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param run_as is a run_as address
     * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
     * @param code_id is the reference to the stored WASM code
     * @param init_msg json encoded message to be passed to the contract on instantiation
     * @param init_coins are transferred to the contract on execution
     * @param label label for the contract. v2 supported only
     */
    function InstantiateContractProposal(title, description, run_as, admin, code_id, init_msg, init_coins, label) {
        if (init_coins === void 0) { init_coins = {}; }
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.run_as = run_as;
        _this.admin = admin;
        _this.code_id = code_id;
        _this.init_msg = init_msg;
        _this.label = label;
        _this.init_coins = new Coins_1.Coins(init_coins);
        return _this;
    }
    InstantiateContractProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, run_as = _a.run_as, admin = _a.admin, code_id = _a.code_id, msg = _a.msg, funds = _a.funds, label = _a.label;
        return new InstantiateContractProposal(title, description, run_as, admin, Number.parseInt(code_id), msg, Coins_1.Coins.fromAmino(funds), label);
    };
    InstantiateContractProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, admin = _a.admin, code_id = _a.code_id, init_msg = _a.init_msg, init_coins = _a.init_coins, label = _a.label;
        return {
            type: 'wasm/InstantiateContractProposal',
            value: {
                title: title,
                description: description,
                run_as: run_as,
                admin: admin,
                code_id: code_id.toFixed(),
                label: label,
                msg: (0, json_1.removeNull)(init_msg),
                funds: init_coins.toAmino(),
            },
        };
    };
    InstantiateContractProposal.fromProto = function (proto, _) {
        return new InstantiateContractProposal(proto.title, proto.description, proto.runAs, proto.admin !== '' ? proto.admin : undefined, proto.codeId.toNumber(), JSON.parse(Buffer.from(proto.msg).toString('utf-8')), Coins_1.Coins.fromProto(proto.funds), proto.label);
    };
    InstantiateContractProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, admin = _a.admin, code_id = _a.code_id, init_msg = _a.init_msg, init_coins = _a.init_coins, label = _a.label;
        return proposal_1.InstantiateContractProposal.fromPartial({
            title: title,
            description: description,
            runAs: run_as,
            admin: admin,
            codeId: Long.fromNumber(code_id),
            funds: init_coins.toProto(),
            msg: Buffer.from(JSON.stringify(init_msg), 'utf-8'),
            label: label,
        });
    };
    InstantiateContractProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.InstantiateContractProposal',
            value: proposal_1.InstantiateContractProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    InstantiateContractProposal.unpackAny = function (msgAny, isClassic) {
        return InstantiateContractProposal.fromProto(proposal_1.InstantiateContractProposal.decode(msgAny.value), isClassic);
    };
    InstantiateContractProposal.fromData = function (data, _) {
        var _a = data, title = _a.title, description = _a.description, run_as = _a.run_as, admin = _a.admin, code_id = _a.code_id, label = _a.label, msg = _a.msg, funds = _a.funds;
        return new InstantiateContractProposal(title, description, run_as, admin !== '' ? admin : undefined, Number.parseInt(code_id), msg, Coins_1.Coins.fromData(funds), label);
    };
    InstantiateContractProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, admin = _a.admin, code_id = _a.code_id, label = _a.label, init_msg = _a.init_msg, init_coins = _a.init_coins;
        return {
            '@type': '/cosmwasm.wasm.v1.InstantiateContractProposal',
            title: title,
            description: description,
            run_as: run_as,
            admin: admin || '',
            code_id: code_id.toFixed(),
            label: label,
            msg: (0, json_1.removeNull)(init_msg),
            funds: init_coins.toData(),
        };
    };
    return InstantiateContractProposal;
}(json_1.JSONSerializable));
exports.InstantiateContractProposal = InstantiateContractProposal;
//# sourceMappingURL=InstantiateContractProposal.js.map
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
exports.MigrateContractProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
var Long = __importStar(require("long"));
/** MigrateContractProposal gov proposal content type to migrate a contract. */
var MigrateContractProposal = /** @class */ (function (_super) {
    __extends(MigrateContractProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract contract address to be migrated from
     * @param new_code_id reference to the new code on the blockchain
     * @param migrate_msg JSON message to configure the migrate state of the contract
     */
    function MigrateContractProposal(title, description, contract, new_code_id, migrate_msg // json object or string
    ) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.contract = contract;
        _this.new_code_id = new_code_id;
        _this.migrate_msg = migrate_msg;
        return _this;
    }
    MigrateContractProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, contract = _a.contract, code_id = _a.code_id, msg = _a.msg;
        return new MigrateContractProposal(title, description, contract, Number.parseInt(code_id), msg);
    };
    MigrateContractProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
        return {
            type: 'wasm/MigrateContractProposal',
            value: {
                title: title,
                description: description,
                contract: contract,
                code_id: new_code_id.toFixed(),
                msg: (0, json_1.removeNull)(migrate_msg),
            },
        };
    };
    MigrateContractProposal.fromProto = function (proto, _) {
        return new MigrateContractProposal(proto.title, proto.description, proto.contract, proto.codeId.toNumber(), JSON.parse(Buffer.from(proto.msg).toString('utf-8')));
    };
    MigrateContractProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
        return proposal_1.MigrateContractProposal.fromPartial({
            title: title,
            description: description,
            contract: contract,
            codeId: Long.fromNumber(new_code_id),
            msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
        });
    };
    MigrateContractProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.MigrateContractProposal',
            value: proposal_1.MigrateContractProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    MigrateContractProposal.unpackAny = function (msgAny, isClassic) {
        return MigrateContractProposal.fromProto(proposal_1.MigrateContractProposal.decode(msgAny.value), isClassic);
    };
    MigrateContractProposal.fromData = function (data, _) {
        var _a = data, title = _a.title, description = _a.description, contract = _a.contract, code_id = _a.code_id, msg = _a.msg;
        return new MigrateContractProposal(title, description, contract, Number.parseInt(code_id), msg);
    };
    MigrateContractProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
        return {
            '@type': '/cosmwasm.wasm.v1.MigrateContractProposal',
            title: title,
            description: description,
            contract: contract,
            code_id: new_code_id.toFixed(),
            msg: (0, json_1.removeNull)(migrate_msg),
        };
    };
    return MigrateContractProposal;
}(json_1.JSONSerializable));
exports.MigrateContractProposal = MigrateContractProposal;
//# sourceMappingURL=MigrateContractProposal.js.map
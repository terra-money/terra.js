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
exports.SudoContractProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
var SudoContractProposal = /** @class */ (function (_super) {
    __extends(SudoContractProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract contract address to be migrated from
     * @param msg JSON message to configure the migrate state of the contract
     */
    function SudoContractProposal(title, description, contract, msg // json object or string
    ) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.contract = contract;
        _this.msg = msg;
        return _this;
    }
    SudoContractProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, contract = _a.contract, msg = _a.msg;
        return new SudoContractProposal(title, description, contract, msg);
    };
    SudoContractProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, msg = _a.msg;
        return {
            type: 'wasm/SudoContractProposal',
            value: {
                title: title,
                description: description,
                contract: contract,
                msg: (0, json_1.removeNull)(msg),
            },
        };
    };
    SudoContractProposal.fromProto = function (proto, _) {
        return new SudoContractProposal(proto.title, proto.description, proto.contract, JSON.parse(Buffer.from(proto.msg).toString('utf-8')));
    };
    SudoContractProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, msg = _a.msg;
        return proposal_1.SudoContractProposal.fromPartial({
            title: title,
            description: description,
            contract: contract,
            msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
        });
    };
    SudoContractProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.SudoContractProposal',
            value: proposal_1.SudoContractProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    SudoContractProposal.unpackAny = function (msgAny, isClassic) {
        return SudoContractProposal.fromProto(proposal_1.SudoContractProposal.decode(msgAny.value), isClassic);
    };
    SudoContractProposal.fromData = function (data, _) {
        var _a = data, title = _a.title, description = _a.description, contract = _a.contract, msg = _a.msg;
        return new SudoContractProposal(title, description, contract, msg);
    };
    SudoContractProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, msg = _a.msg;
        return {
            '@type': '/cosmwasm.wasm.v1.SudoContractProposal',
            title: title,
            description: description,
            contract: contract,
            msg: (0, json_1.removeNull)(msg),
        };
    };
    return SudoContractProposal;
}(json_1.JSONSerializable));
exports.SudoContractProposal = SudoContractProposal;
//# sourceMappingURL=SudoContractProposal.js.map
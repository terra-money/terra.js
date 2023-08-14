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
exports.ClearAdminProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
/**
 * ClearAdminProposal gov proposal content type to clear the admin of a
 * contract.
 */
var ClearAdminProposal = /** @class */ (function (_super) {
    __extends(ClearAdminProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract the address of the smart contract
     */
    function ClearAdminProposal(title, description, contract) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.contract = contract;
        return _this;
    }
    ClearAdminProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, contract = _a.contract;
        return new ClearAdminProposal(title, description, contract);
    };
    ClearAdminProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract;
        return {
            type: 'wasm/ClearAdminProposal',
            value: {
                title: title,
                description: description,
                contract: contract,
            },
        };
    };
    ClearAdminProposal.fromProto = function (proto, _) {
        return new ClearAdminProposal(proto.title, proto.description, proto.contract);
    };
    ClearAdminProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract;
        return proposal_1.ClearAdminProposal.fromPartial({
            title: title,
            description: description,
            contract: contract,
        });
    };
    ClearAdminProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.ClearAdminProposal',
            value: proposal_1.ClearAdminProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    ClearAdminProposal.unpackAny = function (msgAny, isClassic) {
        return ClearAdminProposal.fromProto(proposal_1.ClearAdminProposal.decode(msgAny.value), isClassic);
    };
    ClearAdminProposal.fromData = function (data, _) {
        var _a = data, title = _a.title, description = _a.description, contract = _a.contract;
        return new ClearAdminProposal(title, description, contract);
    };
    ClearAdminProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract;
        return {
            '@type': '/cosmwasm.wasm.v1.ClearAdminProposal',
            title: title,
            description: description,
            contract: contract,
        };
    };
    return ClearAdminProposal;
}(json_1.JSONSerializable));
exports.ClearAdminProposal = ClearAdminProposal;
//# sourceMappingURL=ClearAdminProposal.js.map
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
exports.UpdateAdminProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
/** UpdateAdminProposal gov proposal content type to set an admin for a contract. */
var UpdateAdminProposal = /** @class */ (function (_super) {
    __extends(UpdateAdminProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract the address of the smart contract
     * @param new_admin address to be set
     */
    function UpdateAdminProposal(title, description, contract, new_admin) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.contract = contract;
        _this.new_admin = new_admin;
        return _this;
    }
    UpdateAdminProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, contract = _a.contract, new_admin = _a.new_admin;
        return new UpdateAdminProposal(title, description, contract, new_admin);
    };
    UpdateAdminProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, new_admin = _a.new_admin;
        return {
            type: 'wasm/UpdateAdminProposal',
            value: {
                title: title,
                description: description,
                contract: contract,
                new_admin: new_admin,
            },
        };
    };
    UpdateAdminProposal.fromProto = function (proto, _) {
        return new UpdateAdminProposal(proto.title, proto.description, proto.contract, proto.newAdmin);
    };
    UpdateAdminProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, new_admin = _a.new_admin;
        return proposal_1.UpdateAdminProposal.fromPartial({
            title: title,
            description: description,
            contract: contract,
            newAdmin: new_admin,
        });
    };
    UpdateAdminProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.UpdateAdminProposal',
            value: proposal_1.UpdateAdminProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    UpdateAdminProposal.unpackAny = function (msgAny, isClassic) {
        return UpdateAdminProposal.fromProto(proposal_1.UpdateAdminProposal.decode(msgAny.value), isClassic);
    };
    UpdateAdminProposal.fromData = function (data, _) {
        var _a = data, title = _a.title, description = _a.description, contract = _a.contract, new_admin = _a.new_admin;
        return new UpdateAdminProposal(title, description, contract, new_admin);
    };
    UpdateAdminProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, contract = _a.contract, new_admin = _a.new_admin;
        return {
            '@type': '/cosmwasm.wasm.v1.UpdateAdminProposal',
            title: title,
            description: description,
            contract: contract,
            new_admin: new_admin,
        };
    };
    return UpdateAdminProposal;
}(json_1.JSONSerializable));
exports.UpdateAdminProposal = UpdateAdminProposal;
//# sourceMappingURL=UpdateAdminProposal.js.map
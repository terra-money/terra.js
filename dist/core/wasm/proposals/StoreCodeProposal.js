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
exports.StoreCodeProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
var AccessConfig_1 = require("../AccessConfig");
/**
 * StoreCodeProposal gov proposal content type to submit WASM code to the system
 */
var StoreCodeProposal = /** @class */ (function (_super) {
    __extends(StoreCodeProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param run_as the address that is passed to the contract's environment as sender
     * @param wasm_byte_code can be raw or gzip compressed
     * @param instantiate_permission to apply on contract creation, optional
     */
    function StoreCodeProposal(title, description, run_as, wasm_byte_code, instantiate_permission) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.run_as = run_as;
        _this.wasm_byte_code = wasm_byte_code;
        _this.instantiate_permission = instantiate_permission;
        return _this;
    }
    StoreCodeProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, run_as = _a.run_as, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return new StoreCodeProposal(title, description, run_as, wasm_byte_code, instantiate_permission
            ? AccessConfig_1.AccessConfig.fromAmino(instantiate_permission)
            : undefined);
    };
    StoreCodeProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return {
            type: 'wasm/StoreCodeProposal',
            value: {
                title: title,
                description: description,
                run_as: run_as,
                wasm_byte_code: wasm_byte_code,
                instantiate_permission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toAmino(),
            },
        };
    };
    StoreCodeProposal.fromData = function (data, _) {
        var title = data.title, description = data.description, run_as = data.run_as, wasm_byte_code = data.wasm_byte_code, instantiate_permission = data.instantiate_permission;
        return new StoreCodeProposal(title, description, run_as, wasm_byte_code, instantiate_permission
            ? AccessConfig_1.AccessConfig.fromData(instantiate_permission)
            : undefined);
    };
    StoreCodeProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return {
            '@type': '/cosmwasm.wasm.v1.StoreCodeProposal',
            title: title,
            description: description,
            run_as: run_as,
            wasm_byte_code: wasm_byte_code,
            instantiate_permission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toData(),
        };
    };
    StoreCodeProposal.fromProto = function (proto, _) {
        return new StoreCodeProposal(proto.title, proto.description, proto.runAs, Buffer.from(proto.wasmByteCode).toString('base64'), proto.instantiatePermission
            ? AccessConfig_1.AccessConfig.fromProto(proto.instantiatePermission)
            : undefined);
    };
    StoreCodeProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, run_as = _a.run_as, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return proposal_1.StoreCodeProposal.fromPartial({
            title: title,
            description: description,
            runAs: run_as,
            wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
            instantiatePermission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toProto(),
        });
    };
    StoreCodeProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.StoreCodeProposal',
            value: proposal_1.StoreCodeProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    StoreCodeProposal.unpackAny = function (msgAny, isClassic) {
        return StoreCodeProposal.fromProto(proposal_1.StoreCodeProposal.decode(msgAny.value), isClassic);
    };
    return StoreCodeProposal;
}(json_1.JSONSerializable));
exports.StoreCodeProposal = StoreCodeProposal;
//# sourceMappingURL=StoreCodeProposal.js.map
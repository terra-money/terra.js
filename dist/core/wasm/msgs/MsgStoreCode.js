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
exports.MsgStoreCode = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/tx");
var AccessConfig_1 = require("../AccessConfig");
var MsgStoreCode = /** @class */ (function (_super) {
    __extends(MsgStoreCode, _super);
    /**
     * @param sender code creator
     * @param wasm_byte_code base64-encoded bytecode contents
     * @param instantiate_permission  InstantiatePermission access control to apply on contract creation, optional. v2 supported only
     */
    function MsgStoreCode(sender, wasm_byte_code, instantiate_permission) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.wasm_byte_code = wasm_byte_code;
        _this.instantiate_permission = instantiate_permission;
        return _this;
    }
    MsgStoreCode.fromAmino = function (data, _) {
        var _a = data.value, sender = _a.sender, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return new MsgStoreCode(sender, wasm_byte_code, instantiate_permission
            ? AccessConfig_1.AccessConfig.fromAmino(instantiate_permission)
            : undefined);
    };
    MsgStoreCode.prototype.toAmino = function (_) {
        var _a = this, sender = _a.sender, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return {
            type: 'wasm/MsgStoreCode',
            value: {
                sender: sender,
                wasm_byte_code: wasm_byte_code,
                instantiate_permission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toAmino(),
            },
        };
    };
    MsgStoreCode.fromProto = function (proto, _) {
        var p = proto;
        return new MsgStoreCode(p.sender, Buffer.from(p.wasmByteCode).toString('base64'), p.instantiatePermission
            ? AccessConfig_1.AccessConfig.fromProto(p.instantiatePermission)
            : undefined);
    };
    MsgStoreCode.prototype.toProto = function (_) {
        var _a = this, sender = _a.sender, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return tx_1.MsgStoreCode.fromPartial({
            sender: sender,
            wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
            instantiatePermission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toProto(),
        });
    };
    MsgStoreCode.prototype.packAny = function (isClassic) {
        var any = any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.MsgStoreCode',
            value: tx_1.MsgStoreCode.encode(this.toProto(isClassic)).finish(),
        });
        return any;
    };
    MsgStoreCode.unpackAny = function (msgAny, isClassic) {
        return MsgStoreCode.fromProto(tx_1.MsgStoreCode.decode(msgAny.value), isClassic);
    };
    MsgStoreCode.fromData = function (data, _) {
        var _a = data, sender = _a.sender, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return new MsgStoreCode(sender, wasm_byte_code, instantiate_permission
            ? AccessConfig_1.AccessConfig.fromData(instantiate_permission)
            : undefined);
    };
    MsgStoreCode.prototype.toData = function (_) {
        var _a = this, sender = _a.sender, wasm_byte_code = _a.wasm_byte_code, instantiate_permission = _a.instantiate_permission;
        return {
            '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
            sender: sender,
            wasm_byte_code: wasm_byte_code,
            instantiate_permission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toData(),
        };
    };
    return MsgStoreCode;
}(json_1.JSONSerializable));
exports.MsgStoreCode = MsgStoreCode;
//# sourceMappingURL=MsgStoreCode.js.map
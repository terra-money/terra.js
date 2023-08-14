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
exports.AccessConfigUpdate = void 0;
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
var json_1 = require("../../util/json");
var AccessConfig_1 = require("./AccessConfig");
var Long = __importStar(require("long"));
/**
 *
 */
var AccessConfigUpdate = /** @class */ (function (_super) {
    __extends(AccessConfigUpdate, _super);
    /**
     * @param code_id the reference to the stored WASM code to be updated
     * @param instantiate_permission to apply to the set of code ids
     */
    function AccessConfigUpdate(code_id, instantiate_permission) {
        var _this = _super.call(this) || this;
        _this.code_id = code_id;
        _this.instantiate_permission = instantiate_permission;
        return _this;
    }
    AccessConfigUpdate.fromAmino = function (data) {
        return new AccessConfigUpdate(Number.parseInt(data.code_id), data.instantiate_permission ? AccessConfig_1.AccessConfig.fromAmino(data.instantiate_permission) : undefined);
    };
    AccessConfigUpdate.prototype.toAmino = function () {
        var _a;
        var res = {
            code_id: this.code_id.toFixed(),
            instantiate_permission: (_a = this.instantiate_permission) === null || _a === void 0 ? void 0 : _a.toAmino()
        };
        return res;
    };
    AccessConfigUpdate.fromData = function (data) {
        return new AccessConfigUpdate(Number.parseInt(data.code_id), data.instantiate_permission ? AccessConfig_1.AccessConfig.fromData(data.instantiate_permission) : undefined);
    };
    AccessConfigUpdate.prototype.toData = function () {
        var _a;
        var res = {
            code_id: this.code_id.toFixed(),
            instantiate_permission: (_a = this.instantiate_permission) === null || _a === void 0 ? void 0 : _a.toData()
        };
        return res;
    };
    AccessConfigUpdate.fromProto = function (proto) {
        return new AccessConfigUpdate(proto.codeId.toNumber(), proto.instantiatePermission ? AccessConfig_1.AccessConfig.fromProto(proto.instantiatePermission) : undefined);
    };
    AccessConfigUpdate.prototype.toProto = function () {
        var _a;
        return proposal_1.AccessConfigUpdate.fromPartial({
            codeId: Long.fromNumber(this.code_id),
            instantiatePermission: (_a = this.instantiate_permission) === null || _a === void 0 ? void 0 : _a.toProto()
        });
    };
    return AccessConfigUpdate;
}(json_1.JSONSerializable));
exports.AccessConfigUpdate = AccessConfigUpdate;
//# sourceMappingURL=AccessConfigUpdate.js.map
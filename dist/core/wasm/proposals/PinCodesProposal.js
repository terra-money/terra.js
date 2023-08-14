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
exports.PinCodesProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var proposal_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/proposal");
var Long = __importStar(require("long"));
/**
 * PinCodesProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
var PinCodesProposal = /** @class */ (function (_super) {
    __extends(PinCodesProposal, _super);
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param code_ids the address of the smart code_ids
     */
    function PinCodesProposal(title, description, code_ids) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.code_ids = code_ids;
        return _this;
    }
    PinCodesProposal.fromAmino = function (data, _) {
        var _a = data.value, title = _a.title, description = _a.description, code_ids = _a.code_ids;
        return new PinCodesProposal(title, description, code_ids.map(function (cid) { return Number.parseInt(cid); }));
    };
    PinCodesProposal.prototype.toAmino = function (_) {
        var _a = this, title = _a.title, description = _a.description, code_ids = _a.code_ids;
        return {
            type: 'wasm/PinCodesProposal',
            value: {
                title: title,
                description: description,
                code_ids: code_ids.map(function (cid) { return cid.toFixed(); }),
            },
        };
    };
    PinCodesProposal.fromProto = function (proto, _) {
        return new PinCodesProposal(proto.title, proto.description, proto.codeIds.map(function (codeId) { return codeId.toNumber(); }));
    };
    PinCodesProposal.prototype.toProto = function (_) {
        var _a = this, title = _a.title, description = _a.description, code_ids = _a.code_ids;
        return proposal_1.PinCodesProposal.fromPartial({
            title: title,
            description: description,
            codeIds: code_ids.map(function (cid) { return Long.fromNumber(cid); }),
        });
    };
    PinCodesProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.PinCodesProposal',
            value: proposal_1.PinCodesProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    PinCodesProposal.unpackAny = function (msgAny, isClassic) {
        return PinCodesProposal.fromProto(proposal_1.PinCodesProposal.decode(msgAny.value), isClassic);
    };
    PinCodesProposal.fromData = function (data, _) {
        var _a = data, title = _a.title, description = _a.description, code_ids = _a.code_ids;
        return new PinCodesProposal(title, description, code_ids.map(function (cid) { return Number.parseInt(cid); }));
    };
    PinCodesProposal.prototype.toData = function (_) {
        var _a = this, title = _a.title, description = _a.description, code_ids = _a.code_ids;
        return {
            '@type': '/cosmwasm.wasm.v1.PinCodesProposal',
            title: title,
            description: description,
            code_ids: code_ids.map(function (cid) { return cid.toFixed(); }),
        };
    };
    return PinCodesProposal;
}(json_1.JSONSerializable));
exports.PinCodesProposal = PinCodesProposal;
//# sourceMappingURL=PinCodesProposal.js.map
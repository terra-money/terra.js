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
exports.HistoryEntry = void 0;
var types_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/types");
var json_1 = require("../../util/json");
var Long = __importStar(require("long"));
var AbsoluteTxPosition_1 = require("./AbsoluteTxPosition");
/**
 *
 */
var HistoryEntry = /** @class */ (function (_super) {
    __extends(HistoryEntry, _super);
    /**
     * @param operation access type
     * @param code_id
     */
    function HistoryEntry(operation, code_id, updated, msg) {
        var _this = _super.call(this) || this;
        _this.operation = operation;
        _this.code_id = code_id;
        _this.updated = updated;
        _this.msg = msg;
        return _this;
    }
    HistoryEntry.fromAmino = function (data) {
        return new HistoryEntry((0, types_1.contractCodeHistoryOperationTypeFromJSON)(data.operation), Number.parseInt(data.code_id), data.updated ? AbsoluteTxPosition_1.AbsoluteTxPosition.fromAmino(data.updated) : undefined, data.msg);
    };
    HistoryEntry.prototype.toAmino = function () {
        var _a;
        var res = {
            operation: (0, types_1.contractCodeHistoryOperationTypeToJSON)(this.operation),
            code_id: this.code_id.toFixed(),
            updated: (_a = this.updated) === null || _a === void 0 ? void 0 : _a.toAmino(),
            msg: this.msg,
        };
        return res;
    };
    HistoryEntry.fromData = function (data) {
        return new HistoryEntry((0, types_1.contractCodeHistoryOperationTypeFromJSON)(data.operation), Number.parseInt(data.code_id), data.updated ? AbsoluteTxPosition_1.AbsoluteTxPosition.fromData(data.updated) : undefined, data.msg);
    };
    HistoryEntry.prototype.toData = function () {
        var _a;
        var res = {
            operation: (0, types_1.contractCodeHistoryOperationTypeToJSON)(this.operation),
            code_id: this.code_id.toFixed(),
            updated: (_a = this.updated) === null || _a === void 0 ? void 0 : _a.toData(),
            msg: this.msg,
        };
        return res;
    };
    HistoryEntry.fromProto = function (proto) {
        return new HistoryEntry(proto.operation, proto.codeId.toNumber(), proto.updated ? AbsoluteTxPosition_1.AbsoluteTxPosition.fromProto(proto.updated) : undefined, JSON.parse(Buffer.from(proto.msg).toString('utf-8')));
    };
    HistoryEntry.prototype.toProto = function () {
        var _a;
        return types_1.ContractCodeHistoryEntry.fromPartial({
            operation: this.operation,
            codeId: Long.fromNumber(this.code_id),
            updated: (_a = this.updated) === null || _a === void 0 ? void 0 : _a.toProto(),
            msg: Buffer.from(JSON.stringify((0, json_1.removeNull)(this.msg)), 'utf-8'),
        });
    };
    return HistoryEntry;
}(json_1.JSONSerializable));
exports.HistoryEntry = HistoryEntry;
//# sourceMappingURL=HistoryEntry.js.map
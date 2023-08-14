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
exports.AbsoluteTxPosition = void 0;
var types_1 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/types");
var json_1 = require("../../util/json");
var Long = __importStar(require("long"));
/**
 *
 */
var AbsoluteTxPosition = /** @class */ (function (_super) {
    __extends(AbsoluteTxPosition, _super);
    /**
     * @param block_height
     * @param tx_index
     */
    function AbsoluteTxPosition(block_height, tx_index) {
        var _this = _super.call(this) || this;
        _this.block_height = block_height;
        _this.tx_index = tx_index;
        return _this;
    }
    AbsoluteTxPosition.fromAmino = function (data) {
        return new AbsoluteTxPosition(Number.parseInt(data.block_height), Number.parseInt(data.tx_index));
    };
    AbsoluteTxPosition.prototype.toAmino = function () {
        var res = {
            block_height: this.block_height.toFixed(),
            tx_index: this.tx_index.toFixed(),
        };
        return res;
    };
    AbsoluteTxPosition.fromData = function (data) {
        return new AbsoluteTxPosition(Number.parseInt(data.block_height), Number.parseInt(data.tx_index));
    };
    AbsoluteTxPosition.prototype.toData = function () {
        var res = {
            block_height: this.block_height.toFixed(),
            tx_index: this.tx_index.toFixed(),
        };
        return res;
    };
    AbsoluteTxPosition.fromProto = function (proto) {
        return new AbsoluteTxPosition(proto.blockHeight.toNumber(), proto.txIndex.toNumber());
    };
    AbsoluteTxPosition.prototype.toProto = function () {
        return types_1.AbsoluteTxPosition.fromPartial({
            blockHeight: Long.fromNumber(this.block_height),
            txIndex: Long.fromNumber(this.tx_index),
        });
    };
    return AbsoluteTxPosition;
}(json_1.JSONSerializable));
exports.AbsoluteTxPosition = AbsoluteTxPosition;
//# sourceMappingURL=AbsoluteTxPosition.js.map
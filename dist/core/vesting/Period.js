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
exports.Period = void 0;
var Coins_1 = require("../Coins");
var vesting_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting");
var json_1 = require("../../util/json");
var Long = __importStar(require("long"));
/**
 * Period defines a length of time and amount of coins that will vest.
 */
var Period = /** @class */ (function (_super) {
    __extends(Period, _super);
    /**
     * @param length
     * @param amount
     */
    function Period(length, amount) {
        var _this = _super.call(this) || this;
        _this.length = length;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    Period.fromAmino = function (data, _) {
        _;
        var length = data.length, amount = data.amount;
        return new Period(Number.parseInt(length), Coins_1.Coins.fromAmino(amount));
    };
    Period.prototype.toAmino = function (_) {
        _;
        var _a = this, length = _a.length, amount = _a.amount;
        var res = {
            length: length.toFixed(),
            amount: amount.toAmino(),
        };
        return res;
    };
    Period.fromData = function (data, _) {
        _;
        var length = data.length, amount = data.amount;
        return new Period(Number.parseInt(length), Coins_1.Coins.fromData(amount));
    };
    Period.prototype.toData = function (_) {
        _;
        var _a = this, length = _a.length, amount = _a.amount;
        var res = {
            length: length.toFixed(),
            amount: amount.toData(),
        };
        return res;
    };
    Period.fromProto = function (proto, _) {
        _;
        return new Period(proto.length.toNumber(), Coins_1.Coins.fromProto(proto.amount));
    };
    Period.prototype.toProto = function (_) {
        _;
        var _a = this, length = _a.length, amount = _a.amount;
        return vesting_1.Period.fromPartial({
            length: Long.fromNumber(length),
            amount: amount.toProto(),
        });
    };
    return Period;
}(json_1.JSONSerializable));
exports.Period = Period;
//# sourceMappingURL=Period.js.map
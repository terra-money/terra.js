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
exports.MsgFundCommunityPool = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/tx");
var MsgFundCommunityPool = /** @class */ (function (_super) {
    __extends(MsgFundCommunityPool, _super);
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    function MsgFundCommunityPool(depositor, amount) {
        var _this = _super.call(this) || this;
        _this.depositor = depositor;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    MsgFundCommunityPool.fromAmino = function (data, _) {
        var _a = data.value, depositor = _a.depositor, amount = _a.amount;
        _;
        return new MsgFundCommunityPool(depositor, Coins_1.Coins.fromAmino(amount));
    };
    MsgFundCommunityPool.prototype.toAmino = function (isClassic) {
        var _a = this, depositor = _a.depositor, amount = _a.amount;
        return {
            type: isClassic
                ? 'distribution/MsgFundCommunityPool'
                : 'cosmos-sdk/MsgFundCommunityPool',
            value: {
                depositor: depositor,
                amount: amount.toAmino(),
            },
        };
    };
    MsgFundCommunityPool.fromData = function (proto, _) {
        _;
        var depositor = proto.depositor, amount = proto.amount;
        return new MsgFundCommunityPool(depositor, Coins_1.Coins.fromData(amount));
    };
    MsgFundCommunityPool.prototype.toData = function (_) {
        _;
        var _a = this, depositor = _a.depositor, amount = _a.amount;
        return {
            '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
            depositor: depositor,
            amount: amount.toData(),
        };
    };
    MsgFundCommunityPool.fromProto = function (proto, _) {
        _;
        return new MsgFundCommunityPool(proto.depositor, Coins_1.Coins.fromProto(proto.amount));
    };
    MsgFundCommunityPool.prototype.toProto = function (_) {
        _;
        var _a = this, depositor = _a.depositor, amount = _a.amount;
        return tx_1.MsgFundCommunityPool.fromPartial({
            amount: amount.toProto(),
            depositor: depositor,
        });
    };
    MsgFundCommunityPool.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
            value: tx_1.MsgFundCommunityPool.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgFundCommunityPool.unpackAny = function (msgAny, isClassic) {
        return MsgFundCommunityPool.fromProto(tx_1.MsgFundCommunityPool.decode(msgAny.value), isClassic);
    };
    return MsgFundCommunityPool;
}(json_1.JSONSerializable));
exports.MsgFundCommunityPool = MsgFundCommunityPool;
//# sourceMappingURL=MsgFundCommunityPool.js.map
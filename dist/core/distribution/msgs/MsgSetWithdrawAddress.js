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
exports.MsgSetWithdrawAddress = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/tx");
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
var MsgSetWithdrawAddress = /** @class */ (function (_super) {
    __extends(MsgSetWithdrawAddress, _super);
    /**
     * @param delegator_address delegator's account address
     * @param withdraw_address desired new withdraw address
     */
    function MsgSetWithdrawAddress(delegator_address, withdraw_address) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.withdraw_address = withdraw_address;
        return _this;
    }
    MsgSetWithdrawAddress.fromAmino = function (data, _) {
        _;
        var _a = data.value, delegator_address = _a.delegator_address, withdraw_address = _a.withdraw_address;
        return new MsgSetWithdrawAddress(delegator_address, withdraw_address);
    };
    MsgSetWithdrawAddress.prototype.toAmino = function (isClassic) {
        var _a = this, delegator_address = _a.delegator_address, withdraw_address = _a.withdraw_address;
        return {
            type: isClassic
                ? 'distribution/MsgModifyWithdrawAddress'
                : 'cosmos-sdk/MsgModifyWithdrawAddress',
            value: {
                delegator_address: delegator_address,
                withdraw_address: withdraw_address,
            },
        };
    };
    MsgSetWithdrawAddress.fromData = function (data, _) {
        _;
        var delegator_address = data.delegator_address, withdraw_address = data.withdraw_address;
        return new MsgSetWithdrawAddress(delegator_address, withdraw_address);
    };
    MsgSetWithdrawAddress.prototype.toData = function (_) {
        _;
        var _a = this, delegator_address = _a.delegator_address, withdraw_address = _a.withdraw_address;
        return {
            '@type': '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
            delegator_address: delegator_address,
            withdraw_address: withdraw_address,
        };
    };
    MsgSetWithdrawAddress.fromProto = function (proto, _) {
        _;
        return new MsgSetWithdrawAddress(proto.delegatorAddress, proto.withdrawAddress);
    };
    MsgSetWithdrawAddress.prototype.toProto = function (_) {
        _;
        var _a = this, delegator_address = _a.delegator_address, withdraw_address = _a.withdraw_address;
        return tx_1.MsgSetWithdrawAddress.fromPartial({
            delegatorAddress: delegator_address,
            withdrawAddress: withdraw_address,
        });
    };
    MsgSetWithdrawAddress.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
            value: tx_1.MsgSetWithdrawAddress.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgSetWithdrawAddress.unpackAny = function (msgAny, isClassic) {
        return MsgSetWithdrawAddress.fromProto(tx_1.MsgSetWithdrawAddress.decode(msgAny.value), isClassic);
    };
    return MsgSetWithdrawAddress;
}(json_1.JSONSerializable));
exports.MsgSetWithdrawAddress = MsgSetWithdrawAddress;
//# sourceMappingURL=MsgSetWithdrawAddress.js.map
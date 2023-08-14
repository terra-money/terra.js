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
exports.MsgWithdrawValidatorCommission = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/tx");
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
var MsgWithdrawValidatorCommission = /** @class */ (function (_super) {
    __extends(MsgWithdrawValidatorCommission, _super);
    /**
     * @param validator_address validator's operator address
     */
    function MsgWithdrawValidatorCommission(validator_address) {
        var _this = _super.call(this) || this;
        _this.validator_address = validator_address;
        return _this;
    }
    MsgWithdrawValidatorCommission.fromAmino = function (data, _) {
        _;
        var validator_address = data.value.validator_address;
        return new MsgWithdrawValidatorCommission(validator_address);
    };
    MsgWithdrawValidatorCommission.prototype.toAmino = function (isClassic) {
        var validator_address = this.validator_address;
        return {
            type: isClassic
                ? 'distribution/MsgWithdrawValidatorCommission'
                : 'cosmos-sdk/MsgWithdrawValidatorCommission',
            value: {
                validator_address: validator_address,
            },
        };
    };
    MsgWithdrawValidatorCommission.fromData = function (proto, _) {
        _;
        var validator_address = proto.validator_address;
        return new MsgWithdrawValidatorCommission(validator_address);
    };
    MsgWithdrawValidatorCommission.prototype.toData = function (_) {
        _;
        var validator_address = this.validator_address;
        return {
            '@type': '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
            validator_address: validator_address,
        };
    };
    MsgWithdrawValidatorCommission.fromProto = function (proto, _) {
        _;
        return new MsgWithdrawValidatorCommission(proto.validatorAddress);
    };
    MsgWithdrawValidatorCommission.prototype.toProto = function (_) {
        _;
        var validator_address = this.validator_address;
        return tx_1.MsgWithdrawValidatorCommission.fromPartial({
            validatorAddress: validator_address,
        });
    };
    MsgWithdrawValidatorCommission.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
            value: tx_1.MsgWithdrawValidatorCommission.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgWithdrawValidatorCommission.unpackAny = function (msgAny, isClassic) {
        return MsgWithdrawValidatorCommission.fromProto(tx_1.MsgWithdrawValidatorCommission.decode(msgAny.value), isClassic);
    };
    return MsgWithdrawValidatorCommission;
}(json_1.JSONSerializable));
exports.MsgWithdrawValidatorCommission = MsgWithdrawValidatorCommission;
//# sourceMappingURL=MsgWithdrawValidatorCommission.js.map
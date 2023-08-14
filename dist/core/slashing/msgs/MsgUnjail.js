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
exports.MsgUnjail = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/slashing/v1beta1/tx");
/**
 * A validator can be jailed by the blockchain if misbehavior is detected, such as
 * double-signing or having missed too many vote periods in the Oracle ballot.
 *
 * This is done to protect delegators' funds from getting slashed further, until the
 * validator's issues have been addressed. A jailed validator cannot participate in
 * block rewards, and must be manually unjailed by submitting this message.
 */
var MsgUnjail = /** @class */ (function (_super) {
    __extends(MsgUnjail, _super);
    /**
     * @param address validator's operator address
     */
    function MsgUnjail(address) {
        var _this = _super.call(this) || this;
        _this.address = address;
        return _this;
    }
    MsgUnjail.fromAmino = function (data, _) {
        _;
        var address = data.value.address;
        return new MsgUnjail(address);
    };
    MsgUnjail.prototype.toAmino = function (isClassic) {
        var address = this.address;
        return {
            type: isClassic ? 'slashing/MsgUnjail' : 'cosmos-sdk/MsgUnjail',
            value: {
                address: address,
            },
        };
    };
    MsgUnjail.fromData = function (proto, _) {
        _;
        var address = proto.address;
        return new MsgUnjail(address);
    };
    MsgUnjail.prototype.toData = function (_) {
        _;
        var address = this.address;
        return {
            '@type': '/cosmos.slashing.v1beta1.MsgUnjail',
            address: address,
        };
    };
    MsgUnjail.fromProto = function (proto, _) {
        _;
        return new MsgUnjail(proto.validatorAddr);
    };
    MsgUnjail.prototype.toProto = function (_) {
        _;
        var address = this.address;
        return tx_1.MsgUnjail.fromPartial({
            validatorAddr: address,
        });
    };
    MsgUnjail.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.slashing.v1beta1.MsgUnjail',
            value: tx_1.MsgUnjail.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgUnjail.unpackAny = function (msgAny, isClassic) {
        return MsgUnjail.fromProto(tx_1.MsgUnjail.decode(msgAny.value), isClassic);
    };
    return MsgUnjail;
}(json_1.JSONSerializable));
exports.MsgUnjail = MsgUnjail;
//# sourceMappingURL=MsgUnjail.js.map
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
exports.MsgDonateAllVestingTokens = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/tx");
/**
 * DonateAllVestingTokens defines a method that enables donating all vesting
 */
var MsgDonateAllVestingTokens = /** @class */ (function (_super) {
    __extends(MsgDonateAllVestingTokens, _super);
    /**
     * @param from_address donor's address
     */
    function MsgDonateAllVestingTokens(from_address) {
        var _this = _super.call(this) || this;
        _this.from_address = from_address;
        return _this;
    }
    MsgDonateAllVestingTokens.fromAmino = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgDonateAllVestingTokens(data.value.from_address);
    };
    MsgDonateAllVestingTokens.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return {
            type: 'cosmos-sdk/MsgDonateAllVestingTokens',
            value: {
                from_address: this.from_address,
            },
        };
    };
    MsgDonateAllVestingTokens.fromData = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgDonateAllVestingTokens(data.from_address);
    };
    MsgDonateAllVestingTokens.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return {
            '@type': '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens',
            from_address: this.from_address,
        };
    };
    MsgDonateAllVestingTokens.fromProto = function (proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgDonateAllVestingTokens(proto.fromAddress);
    };
    MsgDonateAllVestingTokens.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return tx_1.MsgDonateAllVestingTokens.fromPartial({
            fromAddress: this.from_address,
        });
    };
    MsgDonateAllVestingTokens.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens',
            value: tx_1.MsgDonateAllVestingTokens.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgDonateAllVestingTokens.unpackAny = function (msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgDonateAllVestingTokens.fromProto(tx_1.MsgDonateAllVestingTokens.decode(msgAny.value), isClassic);
    };
    return MsgDonateAllVestingTokens;
}(json_1.JSONSerializable));
exports.MsgDonateAllVestingTokens = MsgDonateAllVestingTokens;
//# sourceMappingURL=MsgDonateAllVestingTokens.js.map
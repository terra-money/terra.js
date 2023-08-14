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
exports.MsgAggregateExchangeRatePrevote = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@classic-terra/terra.proto/terra/oracle/v1beta1/tx");
/**
 * Aggregate analog of MsgExchangeRatePrevote
 */
var MsgAggregateExchangeRatePrevote = /** @class */ (function (_super) {
    __extends(MsgAggregateExchangeRatePrevote, _super);
    /**
     * @param hash vote hash
     * @param feeder validator's feeder account address
     * @param validator validator's operator address
     */
    function MsgAggregateExchangeRatePrevote(hash, feeder, validator) {
        var _this = _super.call(this) || this;
        _this.hash = hash;
        _this.feeder = feeder;
        _this.validator = validator;
        return _this;
    }
    MsgAggregateExchangeRatePrevote.fromAmino = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = data.value, hash = _a.hash, feeder = _a.feeder, validator = _a.validator;
        return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
    };
    MsgAggregateExchangeRatePrevote.prototype.toAmino = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, hash = _a.hash, feeder = _a.feeder, validator = _a.validator;
        return {
            type: 'oracle/MsgAggregateExchangeRatePrevote',
            value: {
                hash: hash,
                feeder: feeder,
                validator: validator,
            },
        };
    };
    MsgAggregateExchangeRatePrevote.fromData = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var hash = data.hash, feeder = data.feeder, validator = data.validator;
        return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
    };
    MsgAggregateExchangeRatePrevote.prototype.toData = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, hash = _a.hash, feeder = _a.feeder, validator = _a.validator;
        return {
            '@type': '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
            hash: hash,
            feeder: feeder,
            validator: validator,
        };
    };
    MsgAggregateExchangeRatePrevote.fromProto = function (proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgAggregateExchangeRatePrevote(proto.hash, proto.feeder, proto.validator);
    };
    MsgAggregateExchangeRatePrevote.prototype.toProto = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, hash = _a.hash, feeder = _a.feeder, validator = _a.validator;
        return tx_1.MsgAggregateExchangeRatePrevote.fromPartial({
            hash: hash,
            feeder: feeder,
            validator: validator,
        });
    };
    MsgAggregateExchangeRatePrevote.prototype.packAny = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
            value: tx_1.MsgAggregateExchangeRatePrevote.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgAggregateExchangeRatePrevote.unpackAny = function (msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgAggregateExchangeRatePrevote.fromProto(tx_1.MsgAggregateExchangeRatePrevote.decode(msgAny.value), isClassic);
    };
    return MsgAggregateExchangeRatePrevote;
}(json_1.JSONSerializable));
exports.MsgAggregateExchangeRatePrevote = MsgAggregateExchangeRatePrevote;
//# sourceMappingURL=MsgAggregateExchangeRatePrevote.js.map
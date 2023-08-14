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
exports.MsgDelegateFeedConsent = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@classic-terra/terra.proto/terra/oracle/v1beta1/tx");
/**
 * A **feeeder** is an account which is responsible for signing transactions with Oracle vote
 * and prevote messages on behalf of the validator. The blockchain will reject
 * [[MsgExchangeRateVote]] and [[MsgExchangeRatePrevote]] messages in transactions
 * signed by an
 * account different than the registered feeder.
 *
 * The following message registers a validator's feeder address.
 */
var MsgDelegateFeedConsent = /** @class */ (function (_super) {
    __extends(MsgDelegateFeedConsent, _super);
    /**
     * @param operator validator's operator address
     * @param delegate account address to set to feeder
     */
    function MsgDelegateFeedConsent(operator, delegate) {
        var _this = _super.call(this) || this;
        _this.operator = operator;
        _this.delegate = delegate;
        return _this;
    }
    MsgDelegateFeedConsent.fromAmino = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = data.value, operator = _a.operator, delegate = _a.delegate;
        return new MsgDelegateFeedConsent(operator, delegate);
    };
    MsgDelegateFeedConsent.prototype.toAmino = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, operator = _a.operator, delegate = _a.delegate;
        return {
            type: 'oracle/MsgDelegateFeedConsent',
            value: {
                operator: operator,
                delegate: delegate,
            },
        };
    };
    MsgDelegateFeedConsent.fromData = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var operator = data.operator, delegate = data.delegate;
        return new MsgDelegateFeedConsent(operator, delegate);
    };
    MsgDelegateFeedConsent.prototype.toData = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, operator = _a.operator, delegate = _a.delegate;
        return {
            '@type': '/terra.oracle.v1beta1.MsgDelegateFeedConsent',
            operator: operator,
            delegate: delegate,
        };
    };
    MsgDelegateFeedConsent.fromProto = function (proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgDelegateFeedConsent(proto.operator, proto.delegate);
    };
    MsgDelegateFeedConsent.prototype.toProto = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, operator = _a.operator, delegate = _a.delegate;
        return tx_1.MsgDelegateFeedConsent.fromPartial({
            delegate: delegate,
            operator: operator,
        });
    };
    MsgDelegateFeedConsent.prototype.packAny = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.oracle.v1beta1.MsgDelegateFeedConsent',
            value: tx_1.MsgDelegateFeedConsent.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgDelegateFeedConsent.unpackAny = function (msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgDelegateFeedConsent.fromProto(tx_1.MsgDelegateFeedConsent.decode(msgAny.value), isClassic);
    };
    return MsgDelegateFeedConsent;
}(json_1.JSONSerializable));
exports.MsgDelegateFeedConsent = MsgDelegateFeedConsent;
//# sourceMappingURL=MsgDelegateFeedConsent.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StdTx = void 0;
var StdSignature_1 = require("./StdSignature");
var json_1 = require("../util/json");
var StdFee_1 = require("./StdFee");
var Msg_1 = require("./Msg");
/**
 * The StdTx data structure contains the signatures from [[StdSignMsg]] with the same
 * information, and can be broadcasted to the node to be included in a block.
 */
var StdTx = /** @class */ (function (_super) {
    __extends(StdTx, _super);
    /**
     * @param msg list of messages to include (not a typo)
     * @param fee transaction fee
     * @param signatures list of signatures
     * @param memo optional note
     */
    function StdTx(msg, fee, signatures, memo) {
        if (memo === void 0) { memo = ''; }
        var _this = _super.call(this) || this;
        _this.msg = msg;
        _this.fee = fee;
        _this.signatures = signatures;
        _this.memo = memo;
        return _this;
    }
    StdTx.fromData = function (data) {
        var _a = data.value, msg = _a.msg, fee = _a.fee, signatures = _a.signatures, memo = _a.memo;
        return new StdTx(msg.map(function (m) { return Msg_1.Msg.fromData(m); }), StdFee_1.StdFee.fromData(fee), signatures.map(function (s) { return StdSignature_1.StdSignature.fromData(s); }), memo);
    };
    StdTx.prototype.toData = function () {
        var _a = this, msg = _a.msg, fee = _a.fee, signatures = _a.signatures, memo = _a.memo;
        return {
            type: 'core/StdTx',
            value: {
                msg: msg.map(function (m) { return m.toData(); }),
                fee: fee.toData(),
                signatures: signatures.map(function (s) { return s.toData(); }),
                memo: memo,
            },
        };
    };
    return StdTx;
}(json_1.JSONSerializable));
exports.StdTx = StdTx;
//# sourceMappingURL=StdTx.js.map
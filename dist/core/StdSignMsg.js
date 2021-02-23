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
exports.StdSignMsg = void 0;
var StdFee_1 = require("./StdFee");
var Msg_1 = require("./Msg");
var json_1 = require("../util/json");
var StdTx_1 = require("./StdTx");
/**
 * A sign message is a data structure that is used to create a [[StdSignature]] to be later
 * appended to the list of signatures in an [[StdTx]]. Essentially, it contains all the
 * information needed to sign and build a transaction, and can be described as an
 * "unsigned transaction."
 */
var StdSignMsg = /** @class */ (function (_super) {
    __extends(StdSignMsg, _super);
    /**
     *
     * @param chain_id ID of blockchain to submit transaction to
     * @param account_number account number on blockchain
     * @param sequence Sequence number (nonce), number of signed previous transactions by
     *    account included on the blockchain at time of broadcast.
     * @param fee transaction fee
     * @param msgs list of messages to include
     * @param memo optional note
     */
    function StdSignMsg(chain_id, account_number, sequence, fee, msgs, memo) {
        if (memo === void 0) { memo = ''; }
        var _this = _super.call(this) || this;
        _this.chain_id = chain_id;
        _this.account_number = account_number;
        _this.sequence = sequence;
        _this.fee = fee;
        _this.msgs = msgs;
        _this.memo = memo;
        return _this;
    }
    StdSignMsg.prototype.toData = function () {
        var _a = this, chain_id = _a.chain_id, account_number = _a.account_number, sequence = _a.sequence, fee = _a.fee, msgs = _a.msgs, memo = _a.memo;
        return {
            chain_id: chain_id,
            account_number: account_number.toString(),
            sequence: sequence.toString(),
            fee: fee.toData(),
            msgs: msgs.map(function (m) { return m.toData(); }),
            memo: memo,
        };
    };
    StdSignMsg.fromData = function (data) {
        var chain_id = data.chain_id, account_number = data.account_number, sequence = data.sequence, fee = data.fee, msgs = data.msgs, memo = data.memo;
        return new StdSignMsg(chain_id, Number.parseInt(account_number), Number.parseInt(sequence), StdFee_1.StdFee.fromData(fee), msgs.map(function (m) { return Msg_1.Msg.fromData(m); }), memo);
    };
    /**
     * You get the [[StdTx]] value from a `StdSignMsg` (without the signature).
     */
    StdSignMsg.prototype.toStdTx = function () {
        var _a = this, fee = _a.fee, msgs = _a.msgs, memo = _a.memo;
        return new StdTx_1.StdTx(msgs, fee, [], memo);
    };
    return StdSignMsg;
}(json_1.JSONSerializable));
exports.StdSignMsg = StdSignMsg;
//# sourceMappingURL=StdSignMsg.js.map
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
exports.SignDoc = void 0;
var json_1 = require("../util/json");
var Long = __importStar(require("long"));
var tx_1 = require("@terra-money/terra.proto/cosmos/tx/v1beta1/tx");
var Tx_1 = require("./Tx");
/**
 * A sign message is a data structure that is used to create a [[StdSignature]] to be later
 * appended to the list of signatures in an [[StdTx]]. Essentially, it contains all the
 * information needed to sign and build a transaction, and can be described as an
 * "unsigned transaction."
 */
var SignDoc = /** @class */ (function (_super) {
    __extends(SignDoc, _super);
    /**
     *
     * @param chain_id ID of blockchain to submit transaction to
     * @param account_number account number on blockchain
     * @param sequence Sequence number (nonce), number of signed previous transactions by
     *    account included on the blockchain at time of broadcast.
     * @param fee transaction fee
     * @param msgs list of messages to include
     * @param memo optional note
     * @param timeout_height optional transaction timeout height, does not support amino
     * @param public_key Signer's public key, only used at direct sign mode
     */
    function SignDoc(chain_id, account_number, sequence, auth_info, tx_body) {
        var _this = _super.call(this) || this;
        _this.chain_id = chain_id;
        _this.account_number = account_number;
        _this.sequence = sequence;
        _this.auth_info = auth_info;
        _this.tx_body = tx_body;
        return _this;
    }
    SignDoc.prototype.toAmino = function (isClassic) {
        var _a = this, chain_id = _a.chain_id, account_number = _a.account_number, sequence = _a.sequence, _b = _a.tx_body, memo = _b.memo, messages = _b.messages, timeout_height = _b.timeout_height, fee = _a.auth_info.fee;
        return {
            chain_id: chain_id,
            account_number: account_number.toString(),
            sequence: sequence.toString(),
            timeout_height: timeout_height && timeout_height !== 0
                ? timeout_height.toString()
                : undefined,
            fee: fee.toAmino(),
            msgs: messages.map(function (m) { return m.toAmino(isClassic); }),
            memo: memo !== null && memo !== void 0 ? memo : '',
        };
    };
    SignDoc.prototype.toData = function (isClassic) {
        var _a = this, account_number = _a.account_number, chain_id = _a.chain_id, tx_body = _a.tx_body, auth_info = _a.auth_info;
        return {
            body_bytes: Buffer.from(tx_body.toBytes(isClassic)).toString('base64'),
            auth_info_bytes: Buffer.from(auth_info.toBytes()).toString('base64'),
            account_number: account_number.toFixed(),
            chain_id: chain_id,
        };
    };
    SignDoc.prototype.toProto = function (isClassic) {
        var _a = this, account_number = _a.account_number, chain_id = _a.chain_id, tx_body = _a.tx_body, auth_info = _a.auth_info;
        return tx_1.SignDoc.fromPartial({
            bodyBytes: tx_body.toBytes(isClassic),
            authInfoBytes: auth_info.toBytes(),
            accountNumber: Long.fromNumber(account_number),
            chainId: chain_id,
        });
    };
    SignDoc.prototype.toUnSignedTx = function () {
        return new Tx_1.Tx(this.tx_body, this.auth_info, []);
    };
    SignDoc.prototype.toBytes = function (isClassic) {
        return tx_1.SignDoc.encode(this.toProto(isClassic)).finish();
    };
    return SignDoc;
}(json_1.JSONSerializable));
exports.SignDoc = SignDoc;
//# sourceMappingURL=SignDoc.js.map
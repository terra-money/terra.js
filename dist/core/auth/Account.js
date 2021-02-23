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
exports.Account = void 0;
var Coins_1 = require("../Coins");
var PublicKey_1 = require("../PublicKey");
var json_1 = require("../../util/json");
/**
 * Stores information about an account fetched from the blockchain.
 */
var Account = /** @class */ (function (_super) {
    __extends(Account, _super);
    /**
     * Creates a new Account object, holding information about a basic account.
     *
     * @param address account address
     * @param coins account's balance
     * @param public_key account's public key information
     * @param account_number account number on the blockchain
     * @param sequence sequence number, or number of transactions that have been posted
     */
    function Account(address, coins, public_key, account_number, sequence) {
        var _this = _super.call(this) || this;
        _this.address = address;
        _this.coins = coins;
        _this.public_key = public_key;
        _this.account_number = account_number;
        _this.sequence = sequence;
        return _this;
    }
    Account.prototype.toData = function () {
        var _a = this, address = _a.address, coins = _a.coins, public_key = _a.public_key, account_number = _a.account_number, sequence = _a.sequence;
        return {
            type: 'core/Account',
            value: {
                address: address,
                coins: coins.toData(),
                public_key: public_key ? public_key.toData() : null,
                account_number: account_number.toFixed(),
                sequence: sequence.toFixed(),
            },
        };
    };
    Account.fromData = function (data) {
        var _a = data.value, address = _a.address, coins = _a.coins, public_key = _a.public_key, account_number = _a.account_number, sequence = _a.sequence;
        return new Account(address, Coins_1.Coins.fromData(coins), public_key ? PublicKey_1.PublicKey.fromData(public_key) : null, Number.parseInt(account_number), Number.parseInt(sequence));
    };
    return Account;
}(json_1.JSONSerializable));
exports.Account = Account;
//# sourceMappingURL=Account.js.map
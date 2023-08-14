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
exports.InterchainAccount = void 0;
var account_1 = require("@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/account");
var __1 = require("../../../..");
var json_1 = require("../../../../util/json");
/**
 * An InterchainAccount is defined as a BaseAccount & the address of the account owner on the controller chain
 */
var InterchainAccount = /** @class */ (function (_super) {
    __extends(InterchainAccount, _super);
    /**
     * @param base_account
     * @param account_owner
     */
    function InterchainAccount(base_account, account_owner) {
        var _this = _super.call(this) || this;
        _this.base_account = base_account;
        _this.account_owner = account_owner;
        return _this;
    }
    InterchainAccount.fromAmino = function (data) {
        var base_account = data.base_account, account_owner = data.account_owner;
        return new InterchainAccount(base_account ? __1.BaseAccount.fromAmino(base_account) : undefined, account_owner);
    };
    InterchainAccount.prototype.toAmino = function () {
        var _a = this, base_account = _a.base_account, account_owner = _a.account_owner;
        var res = {
            base_account: base_account === null || base_account === void 0 ? void 0 : base_account.toAmino(),
            account_owner: account_owner,
        };
        return res;
    };
    InterchainAccount.fromData = function (data) {
        var base_account = data.base_account, account_owner = data.account_owner;
        return new InterchainAccount(base_account ? __1.BaseAccount.fromData(base_account) : undefined, account_owner);
    };
    InterchainAccount.prototype.toData = function () {
        var _a = this, base_account = _a.base_account, account_owner = _a.account_owner;
        var res = {
            base_account: base_account === null || base_account === void 0 ? void 0 : base_account.toData(),
            account_owner: account_owner,
        };
        return res;
    };
    InterchainAccount.fromProto = function (proto) {
        return new InterchainAccount(proto.baseAccount ? __1.BaseAccount.fromProto(proto.baseAccount) : undefined, proto.accountOwner);
    };
    InterchainAccount.prototype.toProto = function () {
        var _a = this, base_account = _a.base_account, account_owner = _a.account_owner;
        return account_1.InterchainAccount.fromPartial({
            baseAccount: base_account === null || base_account === void 0 ? void 0 : base_account.toProto(),
            accountOwner: account_owner,
        });
    };
    return InterchainAccount;
}(json_1.JSONSerializable));
exports.InterchainAccount = InterchainAccount;
//# sourceMappingURL=Account.js.map
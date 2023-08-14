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
exports.BaseAccount = void 0;
var PublicKey_1 = require("../PublicKey");
var json_1 = require("../../util/json");
var auth_1 = require("@terra-money/terra.proto/cosmos/auth/v1beta1/auth");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Long = __importStar(require("long"));
/**
 * Stores information about an account fetched from the blockchain.
 */
var BaseAccount = /** @class */ (function (_super) {
    __extends(BaseAccount, _super);
    /**
     * Creates a new Account object, holding information about a basic account.
     *
     * @param address account address
     * @param public_key account's public key information
     * @param account_number account number on the blockchain
     * @param sequence sequence number, or number of transactions that have been posted
     */
    function BaseAccount(address, public_key, account_number, sequence) {
        var _this = _super.call(this) || this;
        _this.address = address;
        _this.public_key = public_key;
        _this.account_number = account_number;
        _this.sequence = sequence;
        return _this;
    }
    BaseAccount.prototype.getAccountNumber = function () {
        return this.account_number;
    };
    BaseAccount.prototype.getSequenceNumber = function () {
        return this.sequence;
    };
    BaseAccount.prototype.getPublicKey = function () {
        return this.public_key;
    };
    BaseAccount.prototype.toAmino = function (isClassic) {
        var _a = this, address = _a.address, public_key = _a.public_key, account_number = _a.account_number, sequence = _a.sequence;
        return {
            type: isClassic ? 'core/Account' : 'cosmos-sdk/BaseAccount',
            value: {
                address: address,
                public_key: public_key ? public_key.toAmino() : null,
                account_number: account_number.toFixed(),
                sequence: sequence.toFixed(),
            },
        };
    };
    BaseAccount.fromAmino = function (data, _) {
        _;
        var _a = data.value, address = _a.address, public_key = _a.public_key, account_number = _a.account_number, sequence = _a.sequence;
        return new BaseAccount(address || '', public_key ? PublicKey_1.PublicKey.fromAmino(public_key) : null, Number.parseInt(account_number) || 0, Number.parseInt(sequence) || 0);
    };
    BaseAccount.fromData = function (data, _) {
        _;
        var address = data.address, pub_key = data.pub_key, account_number = data.account_number, sequence = data.sequence;
        return new BaseAccount(address || '', pub_key ? PublicKey_1.PublicKey.fromData(pub_key) : null, Number.parseInt(account_number) || 0, Number.parseInt(sequence) || 0);
    };
    BaseAccount.prototype.toData = function (_) {
        _;
        var _a = this, address = _a.address, public_key = _a.public_key, account_number = _a.account_number, sequence = _a.sequence;
        return {
            '@type': '/cosmos.auth.v1beta1.BaseAccount',
            address: address,
            pub_key: public_key ? public_key.toData() : null,
            account_number: account_number.toFixed(),
            sequence: sequence.toFixed(),
        };
    };
    BaseAccount.prototype.toProto = function (_) {
        _;
        var _a = this, address = _a.address, public_key = _a.public_key, account_number = _a.account_number, sequence = _a.sequence;
        return auth_1.BaseAccount.fromPartial({
            address: address,
            pubKey: public_key === null || public_key === void 0 ? void 0 : public_key.packAny(),
            accountNumber: Long.fromNumber(account_number),
            sequence: Long.fromNumber(sequence),
        });
    };
    BaseAccount.fromProto = function (baseAccountProto, _) {
        _;
        var pubkey = baseAccountProto.pubKey;
        return new BaseAccount(baseAccountProto.address, pubkey ? PublicKey_1.PublicKey.fromProto(pubkey) : null, baseAccountProto.accountNumber.toNumber(), baseAccountProto.sequence.toNumber());
    };
    BaseAccount.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.auth.v1beta1.BaseAccount',
            value: auth_1.BaseAccount.encode(this.toProto(isClassic)).finish(),
        });
    };
    BaseAccount.unpackAny = function (pubkeyAny, isClassic) {
        return BaseAccount.fromProto(auth_1.BaseAccount.decode(pubkeyAny.value), isClassic);
    };
    return BaseAccount;
}(json_1.JSONSerializable));
exports.BaseAccount = BaseAccount;
//# sourceMappingURL=BaseAccount.js.map
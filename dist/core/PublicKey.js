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
exports.ValConsPublicKey = exports.LegacyAminoMultisigPublicKey = exports.SimplePublicKey = exports.PublicKey = void 0;
var json_1 = require("../util/json");
var hash_1 = require("../util/hash");
var keys_1 = require("@terra-money/terra.proto/cosmos/crypto/multisig/keys");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var keys_2 = require("@terra-money/terra.proto/cosmos/crypto/secp256k1/keys");
var keys_3 = require("@terra-money/terra.proto/cosmos/crypto/ed25519/keys");
var bech32_1 = require("bech32");
// As discussed in https://github.com/binance-chain/javascript-sdk/issues/163
// Prefixes listed here: https://github.com/tendermint/tendermint/blob/d419fffe18531317c28c29a292ad7d253f6cafdf/docs/spec/blockchain/encoding.md#public-key-cryptography
// Last bytes is varint-encoded length prefix
var pubkeyAminoPrefixSecp256k1 = Buffer.from('eb5ae987' + '21' /* fixed length */, 'hex');
var pubkeyAminoPrefixEd25519 = Buffer.from('1624de64' + '20' /* fixed length */, 'hex');
/** See https://github.com/tendermint/tendermint/commit/38b401657e4ad7a7eeb3c30a3cbf512037df3740 */
var pubkeyAminoPrefixMultisigThreshold = Buffer.from('22c1f7e2' /* variable length not included */, 'hex');
var encodeUvarint = function (value) {
    var checked = Number.parseInt(value.toString());
    if (checked > 127) {
        throw new Error('Encoding numbers > 127 is not supported here. Please tell those lazy CosmJS maintainers to port the binary.PutUvarint implementation from the Go standard library and write some tests.');
    }
    return [checked];
};
var PublicKey;
(function (PublicKey) {
    function fromAmino(data) {
        switch (data.type) {
            case 'tendermint/PubKeySecp256k1':
                return SimplePublicKey.fromAmino(data);
            case 'tendermint/PubKeyMultisigThreshold':
                return LegacyAminoMultisigPublicKey.fromAmino(data);
            case 'tendermint/PubKeyEd25519':
                return ValConsPublicKey.fromAmino(data);
        }
    }
    PublicKey.fromAmino = fromAmino;
    function fromData(data) {
        switch (data['@type']) {
            case '/cosmos.crypto.secp256k1.PubKey':
                return SimplePublicKey.fromData(data);
            case '/cosmos.crypto.multisig.LegacyAminoPubKey':
                return LegacyAminoMultisigPublicKey.fromData(data);
            case '/cosmos.crypto.ed25519.PubKey':
                return ValConsPublicKey.fromData(data);
        }
    }
    PublicKey.fromData = fromData;
    function fromProto(pubkeyAny) {
        var typeUrl = pubkeyAny.typeUrl;
        if (typeUrl === '/cosmos.crypto.secp256k1.PubKey') {
            return SimplePublicKey.unpackAny(pubkeyAny);
        }
        else if (typeUrl === '/cosmos.crypto.multisig.LegacyAminoPubKey') {
            return LegacyAminoMultisigPublicKey.unpackAny(pubkeyAny);
        }
        else if (typeUrl === '/cosmos.crypto.ed25519.PubKey') {
            return ValConsPublicKey.unpackAny(pubkeyAny);
        }
        throw new Error("Pubkey type ".concat(typeUrl, " not recognized"));
    }
    PublicKey.fromProto = fromProto;
})(PublicKey = exports.PublicKey || (exports.PublicKey = {}));
var SimplePublicKey = /** @class */ (function (_super) {
    __extends(SimplePublicKey, _super);
    function SimplePublicKey(key) {
        var _this = _super.call(this) || this;
        _this.key = key;
        return _this;
    }
    SimplePublicKey.fromAmino = function (data) {
        return new SimplePublicKey(data.value);
    };
    SimplePublicKey.prototype.toAmino = function () {
        return {
            type: 'tendermint/PubKeySecp256k1',
            value: this.key,
        };
    };
    SimplePublicKey.fromData = function (data) {
        return new SimplePublicKey(data.key);
    };
    SimplePublicKey.prototype.toData = function () {
        return {
            '@type': '/cosmos.crypto.secp256k1.PubKey',
            key: this.key,
        };
    };
    SimplePublicKey.fromProto = function (pubkeyProto) {
        return new SimplePublicKey(Buffer.from(pubkeyProto.key).toString('base64'));
    };
    SimplePublicKey.prototype.toProto = function () {
        return keys_2.PubKey.fromPartial({
            key: Buffer.from(this.key, 'base64'),
        });
    };
    SimplePublicKey.prototype.packAny = function () {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.crypto.secp256k1.PubKey',
            value: keys_2.PubKey.encode(this.toProto()).finish(),
        });
    };
    SimplePublicKey.unpackAny = function (pubkeyAny) {
        return SimplePublicKey.fromProto(keys_2.PubKey.decode(pubkeyAny.value));
    };
    SimplePublicKey.prototype.encodeAminoPubkey = function () {
        return Buffer.concat([
            pubkeyAminoPrefixSecp256k1,
            Buffer.from(this.key, 'base64'),
        ]);
    };
    SimplePublicKey.prototype.rawAddress = function () {
        var pubkeyData = Buffer.from(this.key, 'base64');
        return (0, hash_1.ripemd160)((0, hash_1.sha256)(pubkeyData));
    };
    SimplePublicKey.prototype.address = function () {
        return bech32_1.bech32.encode('terra', bech32_1.bech32.toWords(this.rawAddress()));
    };
    SimplePublicKey.prototype.pubkeyAddress = function () {
        return bech32_1.bech32.encode('terrapub', bech32_1.bech32.toWords(this.encodeAminoPubkey()));
    };
    return SimplePublicKey;
}(json_1.JSONSerializable));
exports.SimplePublicKey = SimplePublicKey;
var LegacyAminoMultisigPublicKey = /** @class */ (function (_super) {
    __extends(LegacyAminoMultisigPublicKey, _super);
    function LegacyAminoMultisigPublicKey(threshold, pubkeys) {
        var _this = _super.call(this) || this;
        _this.threshold = threshold;
        _this.pubkeys = pubkeys;
        return _this;
    }
    LegacyAminoMultisigPublicKey.prototype.encodeAminoPubkey = function () {
        var out = Array.from(pubkeyAminoPrefixMultisigThreshold);
        out.push(0x08);
        out.push.apply(out, encodeUvarint(this.threshold));
        for (var _i = 0, _a = this.pubkeys.map(function (p) { return p.encodeAminoPubkey(); }); _i < _a.length; _i++) {
            var pubkeyData = _a[_i];
            out.push(0x12);
            out.push.apply(out, encodeUvarint(pubkeyData.length));
            out.push.apply(out, Array.from(pubkeyData));
        }
        return new Uint8Array(out);
    };
    LegacyAminoMultisigPublicKey.prototype.rawAddress = function () {
        var pubkeyData = this.encodeAminoPubkey();
        return (0, hash_1.sha256)(pubkeyData).slice(0, 20);
    };
    LegacyAminoMultisigPublicKey.prototype.address = function () {
        return bech32_1.bech32.encode('terra', bech32_1.bech32.toWords(this.rawAddress()));
    };
    LegacyAminoMultisigPublicKey.prototype.pubkeyAddress = function () {
        return bech32_1.bech32.encode('terrapub', bech32_1.bech32.toWords(this.encodeAminoPubkey()));
    };
    LegacyAminoMultisigPublicKey.fromAmino = function (data) {
        return new LegacyAminoMultisigPublicKey(Number.parseInt(data.value.threshold), data.value.pubkeys.map(function (p) { return SimplePublicKey.fromAmino(p); }));
    };
    LegacyAminoMultisigPublicKey.prototype.toAmino = function () {
        return {
            type: 'tendermint/PubKeyMultisigThreshold',
            value: {
                threshold: this.threshold.toFixed(),
                pubkeys: this.pubkeys.map(function (p) { return p.toAmino(); }),
            },
        };
    };
    LegacyAminoMultisigPublicKey.fromData = function (data) {
        return new LegacyAminoMultisigPublicKey(Number.parseInt(data.threshold), data.public_keys.map(function (v) { return SimplePublicKey.fromData(v); }));
    };
    LegacyAminoMultisigPublicKey.prototype.toData = function () {
        return {
            '@type': '/cosmos.crypto.multisig.LegacyAminoPubKey',
            threshold: this.threshold.toFixed(),
            public_keys: this.pubkeys.map(function (p) { return p.toData(); }),
        };
    };
    LegacyAminoMultisigPublicKey.fromProto = function (pubkeyProto) {
        return new LegacyAminoMultisigPublicKey(pubkeyProto.threshold, pubkeyProto.publicKeys.map(function (v) { return SimplePublicKey.unpackAny(v); }));
    };
    LegacyAminoMultisigPublicKey.prototype.toProto = function () {
        return keys_1.LegacyAminoPubKey.fromPartial({
            threshold: this.threshold,
            publicKeys: this.pubkeys.map(function (v) { return v.packAny(); }),
        });
    };
    LegacyAminoMultisigPublicKey.prototype.packAny = function () {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.crypto.multisig.LegacyAminoPubKey',
            value: keys_1.LegacyAminoPubKey.encode(this.toProto()).finish(),
        });
    };
    LegacyAminoMultisigPublicKey.unpackAny = function (pubkeyAny) {
        return LegacyAminoMultisigPublicKey.fromProto(keys_1.LegacyAminoPubKey.decode(pubkeyAny.value));
    };
    return LegacyAminoMultisigPublicKey;
}(json_1.JSONSerializable));
exports.LegacyAminoMultisigPublicKey = LegacyAminoMultisigPublicKey;
var ValConsPublicKey = /** @class */ (function (_super) {
    __extends(ValConsPublicKey, _super);
    function ValConsPublicKey(key) {
        var _this = _super.call(this) || this;
        _this.key = key;
        return _this;
    }
    ValConsPublicKey.fromAmino = function (data) {
        return new ValConsPublicKey(data.value);
    };
    ValConsPublicKey.prototype.toAmino = function () {
        return {
            type: 'tendermint/PubKeyEd25519',
            value: this.key,
        };
    };
    ValConsPublicKey.fromData = function (data) {
        return new ValConsPublicKey(data.key);
    };
    ValConsPublicKey.prototype.toData = function () {
        return {
            '@type': '/cosmos.crypto.ed25519.PubKey',
            key: this.key,
        };
    };
    ValConsPublicKey.fromProto = function (pubkeyProto) {
        return new ValConsPublicKey(Buffer.from(pubkeyProto.key).toString('base64'));
    };
    ValConsPublicKey.prototype.toProto = function () {
        return keys_2.PubKey.fromPartial({
            key: Buffer.from(this.key, 'base64'),
        });
    };
    ValConsPublicKey.prototype.packAny = function () {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.crypto.ed25519.PubKey',
            value: keys_3.PubKey.encode(this.toProto()).finish(),
        });
    };
    ValConsPublicKey.unpackAny = function (pubkeyAny) {
        return ValConsPublicKey.fromProto(keys_3.PubKey.decode(pubkeyAny.value));
    };
    ValConsPublicKey.prototype.encodeAminoPubkey = function () {
        return Buffer.concat([
            pubkeyAminoPrefixEd25519,
            Buffer.from(this.key, 'base64'),
        ]);
    };
    ValConsPublicKey.prototype.rawAddress = function () {
        var pubkeyData = Buffer.from(this.key, 'base64');
        return (0, hash_1.sha256)(pubkeyData).slice(0, 20);
    };
    ValConsPublicKey.prototype.address = function () {
        return bech32_1.bech32.encode('terravalcons', bech32_1.bech32.toWords(this.rawAddress()));
    };
    ValConsPublicKey.prototype.pubkeyAddress = function () {
        return bech32_1.bech32.encode('terravalconspub', bech32_1.bech32.toWords(this.encodeAminoPubkey()));
    };
    return ValConsPublicKey;
}(json_1.JSONSerializable));
exports.ValConsPublicKey = ValConsPublicKey;
//# sourceMappingURL=PublicKey.js.map
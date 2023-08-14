"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureV2 = exports.SignMode = void 0;
var PublicKey_1 = require("./PublicKey");
var Tx_1 = require("./Tx");
var CompactBitArray_1 = require("./CompactBitArray");
var signing_1 = require("@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing");
var multisig_1 = require("@terra-money/terra.proto/cosmos/crypto/multisig/v1beta1/multisig");
var signing_2 = require("@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing");
Object.defineProperty(exports, "SignMode", { enumerable: true, get: function () { return signing_2.SignMode; } });
var SignatureV2 = /** @class */ (function () {
    function SignatureV2(public_key, data, sequence) {
        this.public_key = public_key;
        this.data = data;
        this.sequence = sequence;
    }
    SignatureV2.fromData = function (data) {
        return new SignatureV2(PublicKey_1.PublicKey.fromData(data.public_key), SignatureV2.Descriptor.fromData(data.data), Number.parseInt(data.sequence));
    };
    SignatureV2.prototype.toData = function () {
        return {
            public_key: this.public_key.toData(),
            data: this.data.toData(),
            sequence: this.sequence.toFixed(),
        };
    };
    SignatureV2.fromAmino = function (data) {
        return new SignatureV2(PublicKey_1.PublicKey.fromAmino(data.pub_key), new SignatureV2.Descriptor(new SignatureV2.Descriptor.Single(SignatureV2.SignMode.SIGN_MODE_LEGACY_AMINO_JSON, data.signature)), 0);
    };
    return SignatureV2;
}());
exports.SignatureV2 = SignatureV2;
(function (SignatureV2) {
    SignatureV2.SignMode = signing_1.SignMode;
    var Descriptor = /** @class */ (function () {
        function Descriptor(data) {
            data instanceof Descriptor.Single
                ? (this.single = data)
                : (this.multi = data);
        }
        Descriptor.fromData = function (data) {
            if (data.single) {
                return new Descriptor(Descriptor.Single.fromData(data.single));
            }
            if (data.multi) {
                return new Descriptor(Descriptor.Multi.fromData(data.multi));
            }
            throw new Error('must be one of single or multi');
        };
        Descriptor.prototype.toData = function () {
            if (this.single) {
                return {
                    single: this.single.toData(),
                };
            }
            if (this.multi) {
                return {
                    multi: this.multi.toData(),
                };
            }
            throw new Error('must be one of single or multi');
        };
        Descriptor.prototype.toModeInfoAndSignature = function () {
            if (this.single) {
                var sigData = this.single;
                return [
                    new Tx_1.ModeInfo(new Tx_1.ModeInfo.Single(sigData.mode)),
                    Buffer.from(sigData.signature, 'base64'),
                ];
            }
            if (this.multi) {
                var sigData = this.multi;
                var modeInfos = [];
                var signatures = [];
                for (var _i = 0, _a = sigData.signatures; _i < _a.length; _i++) {
                    var signature = _a[_i];
                    var _b = signature.toModeInfoAndSignature(), modeInfo = _b[0], sigBytes = _b[1];
                    modeInfos.push(modeInfo);
                    signatures.push(sigBytes);
                }
                var multisigBytes = multisig_1.MultiSignature.encode(multisig_1.MultiSignature.fromPartial({
                    signatures: signatures,
                })).finish();
                return [
                    new Tx_1.ModeInfo(new Tx_1.ModeInfo.Multi(sigData.bitarray, modeInfos)),
                    multisigBytes,
                ];
            }
            throw new Error('invalid signature descriptor');
        };
        return Descriptor;
    }());
    SignatureV2.Descriptor = Descriptor;
    (function (Descriptor) {
        var Single = /** @class */ (function () {
            function Single(mode, signature) {
                this.mode = mode;
                this.signature = signature;
            }
            Single.fromData = function (data) {
                return new Single((0, signing_1.signModeFromJSON)(data.mode), data.signature);
            };
            Single.prototype.toData = function () {
                var _a = this, mode = _a.mode, signature = _a.signature;
                return {
                    mode: (0, signing_1.signModeToJSON)(mode),
                    signature: signature,
                };
            };
            return Single;
        }());
        Descriptor.Single = Single;
        var Multi = /** @class */ (function () {
            function Multi(bitarray, signatures) {
                this.bitarray = bitarray;
                this.signatures = signatures;
            }
            Multi.fromData = function (data) {
                return new Multi(CompactBitArray_1.CompactBitArray.fromData(data.bitarray), data.signatures.map(function (v) { return Descriptor.fromData(v); }));
            };
            Multi.prototype.toData = function () {
                return {
                    bitarray: this.bitarray.toData(),
                    signatures: this.signatures.map(function (sig) { return sig.toData(); }),
                };
            };
            return Multi;
        }());
        Descriptor.Multi = Multi;
    })(Descriptor = SignatureV2.Descriptor || (SignatureV2.Descriptor = {}));
})(SignatureV2 = exports.SignatureV2 || (exports.SignatureV2 = {}));
exports.SignatureV2 = SignatureV2;
//# sourceMappingURL=SignatureV2.js.map
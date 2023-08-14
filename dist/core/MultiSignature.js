"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSignature = void 0;
var PublicKey_1 = require("./PublicKey");
var CompactBitArray_1 = require("./CompactBitArray");
var SignatureV2_1 = require("./SignatureV2");
var MultiSignature = /** @class */ (function () {
    /**
     * MultiSignature constructor
     * public_keys order must be guaranteed
     */
    function MultiSignature(multisig_pubkey) {
        this.multisig_pubkey = multisig_pubkey;
        var n = multisig_pubkey.pubkeys.length;
        this.bitarray = CompactBitArray_1.CompactBitArray.fromBits(n);
        this.signatures = [];
    }
    MultiSignature.prototype.appendSignature = function (signature_data, index) {
        var newSigIndex = this.bitarray.numTrueBitsBefore(index);
        // Signature already exists, just replace the value there
        if (this.bitarray.getIndex(index)) {
            this.signatures[newSigIndex] = signature_data;
            return;
        }
        this.bitarray.setIndex(index, true);
        // Optimization if the index is the greatest index
        if (newSigIndex == this.signatures.length) {
            this.signatures.push(signature_data);
            return;
        }
        this.signatures.splice(newSigIndex, 0, signature_data);
    };
    // adds a signature to the multisig, at the index in
    // keys corresponding to the provided pubkey.
    MultiSignature.prototype.appendSignatureFromPubKey = function (signature_data, public_key) {
        var index = this.multisig_pubkey.pubkeys.findIndex(function (v) { return v.key === public_key.key; });
        if (index == -1) {
            throw new Error("provided key doesn't exist in public_keys");
        }
        this.appendSignature(signature_data, index);
    };
    MultiSignature.prototype.appendSignatureV2s = function (signatures) {
        for (var _i = 0, signatures_1 = signatures; _i < signatures_1.length; _i++) {
            var signature = signatures_1[_i];
            if (!(signature.public_key instanceof PublicKey_1.SimplePublicKey)) {
                throw new Error('non-SimplePublicKey cannot be used to sign multisig');
            }
            this.appendSignatureFromPubKey(signature.data, signature.public_key);
        }
    };
    MultiSignature.prototype.toSignatureDescriptor = function () {
        return new SignatureV2_1.SignatureV2.Descriptor(new SignatureV2_1.SignatureV2.Descriptor.Multi(this.bitarray, this.signatures));
    };
    return MultiSignature;
}());
exports.MultiSignature = MultiSignature;
//# sourceMappingURL=MultiSignature.js.map
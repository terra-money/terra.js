"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompactBitArray = void 0;
var multisig_1 = require("@terra-money/terra.proto/cosmos/crypto/multisig/v1beta1/multisig");
var CompactBitArray = /** @class */ (function () {
    function CompactBitArray(extra_bits_stored, elems) {
        this.extra_bits_stored = extra_bits_stored;
        this.elems = elems;
    }
    CompactBitArray.fromBits = function (bits) {
        if (bits <= 0) {
            throw new Error('CompactBitArray bits must be bigger than 0');
        }
        var num_elems = (bits + 7) / 8;
        if (num_elems <= 0 || num_elems > Math.pow(2, 32) - 1) {
            // We encountered an overflow here, and shouldn't pass negatives
            // to make, nor should we allow unreasonable limits > maxint32.
            // See https://github.com/cosmos/cosmos-sdk/issues/9162
            throw new Error('CompactBitArray overflow');
        }
        return new CompactBitArray(bits % 8, Buffer.alloc(num_elems));
    };
    // returns the number of bits in the bitarray
    CompactBitArray.prototype.count = function () {
        if (this.extra_bits_stored == 0) {
            return this.elems.length * 8;
        }
        return (this.elems.length - 1) * 8 + this.extra_bits_stored;
    };
    // returns true if the bit at index i is set; returns false otherwise.
    // The behavior is undefined if i >= bA.Count()
    CompactBitArray.prototype.getIndex = function (i) {
        if (i < 0 || i >= this.count()) {
            return false;
        }
        return (this.elems.readUInt8(i >> 3) & (1 << (7 - (i % 8)))) > 0;
    };
    // sets the bit at index i within the bit array. Returns true if and only if the
    // operation succeeded. The behavior is undefined if i >= bA.Count()
    CompactBitArray.prototype.setIndex = function (i, v) {
        if (i < 0 || i >= this.count()) {
            return false;
        }
        if (v) {
            this.elems[i >> 3] |= 1 << (7 - (i % 8));
        }
        else {
            this.elems[i >> 3] &= ~(1 << (7 - (i % 8)));
        }
        return true;
    };
    // returns the number of bits set to true before the
    // given index. e.g. if bA = _XX__XX, NumOfTrueBitsBefore(4) = 2, since
    // there are two bits set to true before index 4.
    CompactBitArray.prototype.numTrueBitsBefore = function (index) {
        var countOneBits = function (n) {
            return n.toString(2).split('0').join('').length;
        };
        var ones_count = 0;
        var max = this.count();
        if (index > max) {
            index = max;
        }
        // below we iterate over the bytes then over bits (in low endian) and count bits set to 1
        for (var elem = 0;; elem++) {
            if (elem * 8 + 7 >= index) {
                ones_count += countOneBits(this.elems[elem] >> (7 - (index % 8) + 1));
                return ones_count;
            }
            ones_count += countOneBits(this.elems[elem]);
        }
    };
    CompactBitArray.fromData = function (data) {
        return new CompactBitArray(data.extra_bits_stored, Buffer.from(data.elems, 'base64'));
    };
    CompactBitArray.prototype.toData = function () {
        return {
            elems: this.elems.toString('base64'),
            extra_bits_stored: this.extra_bits_stored,
        };
    };
    CompactBitArray.fromProto = function (proto) {
        return new CompactBitArray(proto.extraBitsStored, Buffer.from(proto.elems));
    };
    CompactBitArray.prototype.toProto = function () {
        return multisig_1.CompactBitArray.fromPartial({
            elems: this.elems,
            extraBitsStored: this.extra_bits_stored,
        });
    };
    return CompactBitArray;
}());
exports.CompactBitArray = CompactBitArray;
//# sourceMappingURL=CompactBitArray.js.map
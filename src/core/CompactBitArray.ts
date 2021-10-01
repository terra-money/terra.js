import { CompactBitArray as CompactBitArray_pb } from '@terra-money/terra.proto/cosmos/crypto/multisig/v1beta1/multisig';

export class CompactBitArray {
  constructor(public extra_bits_stored: number, public elems: Buffer) {}

  public static fromBits(bits: number): CompactBitArray {
    if (bits <= 0) {
      throw new Error('CompactBitArray bits must be bigger than 0');
    }

    const num_elems = (bits + 7) / 8;
    if (num_elems <= 0 || num_elems > Math.pow(2, 32) - 1) {
      // We encountered an overflow here, and shouldn't pass negatives
      // to make, nor should we allow unreasonable limits > maxint32.
      // See https://github.com/cosmos/cosmos-sdk/issues/9162
      throw new Error('CompactBitArray overflow');
    }

    return new CompactBitArray(bits % 8, Buffer.alloc(num_elems));
  }

  // returns the number of bits in the bitarray
  public count(): number {
    if (this.extra_bits_stored == 0) {
      return this.elems.length * 8;
    }

    return (this.elems.length - 1) * 8 + this.extra_bits_stored;
  }

  // returns true if the bit at index i is set; returns false otherwise.
  // The behavior is undefined if i >= bA.Count()
  public getIndex(i: number): boolean {
    if (i < 0 || i >= this.count()) {
      return false;
    }

    return (this.elems.readUInt8(i >> 3) & (1 << (7 - (i % 8)))) > 0;
  }

  // sets the bit at index i within the bit array. Returns true if and only if the
  // operation succeeded. The behavior is undefined if i >= bA.Count()
  public setIndex(i: number, v: boolean): boolean {
    if (i < 0 || i >= this.count()) {
      return false;
    }

    if (v) {
      this.elems[i >> 3] |= 1 << (7 - (i % 8));
    } else {
      this.elems[i >> 3] &= ~(1 << (7 - (i % 8)));
    }

    return true;
  }

  // returns the number of bits set to true before the
  // given index. e.g. if bA = _XX__XX, NumOfTrueBitsBefore(4) = 2, since
  // there are two bits set to true before index 4.
  public numTrueBitsBefore(index: number): number {
    const countOneBits = (n: number) =>
      n.toString(2).split('0').join('').length;

    let ones_count = 0;
    const max = this.count();
    if (index > max) {
      index = max;
    }

    // below we iterate over the bytes then over bits (in low endian) and count bits set to 1
    for (let elem = 0; ; elem++) {
      if (elem * 8 + 7 >= index) {
        ones_count += countOneBits(this.elems[elem] >> (7 - (index % 8) + 1));
        return ones_count;
      }
      ones_count += countOneBits(this.elems[elem]);
    }
  }

  public static fromData(data: CompactBitArray.Data): CompactBitArray {
    return new CompactBitArray(
      data.extra_bits_stored,
      Buffer.from(data.elems, 'base64')
    );
  }

  public toData(): CompactBitArray.Data {
    return {
      elems: this.elems.toString('base64'),
      extra_bits_stored: this.extra_bits_stored,
    };
  }

  public static fromProto(proto: CompactBitArray.Proto): CompactBitArray {
    return new CompactBitArray(proto.extraBitsStored, Buffer.from(proto.elems));
  }

  public toProto(): CompactBitArray.Proto {
    return CompactBitArray_pb.fromPartial({
      elems: this.elems,
      extraBitsStored: this.extra_bits_stored,
    });
  }
}

export namespace CompactBitArray {
  export interface Data {
    extra_bits_stored: number;
    elems: string;
  }

  export type Proto = CompactBitArray_pb;
}

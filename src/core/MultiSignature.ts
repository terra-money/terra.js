import { LegacyAminoMultisigPublicKey, SimplePublicKey } from './PublicKey';
import { CompactBitArray } from './CompactBitArray';
import { SignatureV2 } from './SignatureV2';

export class MultiSignature {
  public bitarray: CompactBitArray;
  public signatures: SignatureV2.Descriptor[];

  /**
   * MultiSignature constructor
   * public_keys order must be guaranteed
   */
  constructor(public multisig_pubkey: LegacyAminoMultisigPublicKey) {
    const n = multisig_pubkey.pubkeys.length;
    this.bitarray = CompactBitArray.fromBits(n);
    this.signatures = [];
  }

  public appendSignature(
    signature_data: SignatureV2.Descriptor,
    index: number
  ) {
    const newSigIndex = this.bitarray.numTrueBitsBefore(index);

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
  }

  // adds a signature to the multisig, at the index in
  // keys corresponding to the provided pubkey.
  public appendSignatureFromPubKey(
    signature_data: SignatureV2.Descriptor,
    public_key: SimplePublicKey
  ) {
    const index = this.multisig_pubkey.pubkeys.findIndex(
      v => v.key === public_key.key
    );
    if (index == -1) {
      throw new Error("provided key doesn't exist in public_keys");
    }

    this.appendSignature(signature_data, index);
  }

  public appendSignatureV2s(signatures: SignatureV2[]) {
    for (const signature of signatures) {
      if (!(signature.public_key instanceof SimplePublicKey)) {
        throw new Error('non-SimplePublicKey cannot be used to sign multisig');
      }

      this.appendSignatureFromPubKey(signature.data, signature.public_key);
    }
  }

  public toSignatureDescriptor(): SignatureV2.Descriptor {
    return new SignatureV2.Descriptor(
      new SignatureV2.Descriptor.Multi(this.bitarray, this.signatures)
    );
  }
}

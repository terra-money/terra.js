import { LegacyAminoMultisigPublicKey, SimplePublicKey } from './PublicKey';
import { CompactBitArray } from './CompactBitArray';
import { SignatureV2 } from './SignatureV2';
export declare class MultiSignature {
    multisig_pubkey: LegacyAminoMultisigPublicKey;
    bitarray: CompactBitArray;
    signatures: SignatureV2.Descriptor[];
    /**
     * MultiSignature constructor
     * public_keys order must be guaranteed
     */
    constructor(multisig_pubkey: LegacyAminoMultisigPublicKey);
    appendSignature(signature_data: SignatureV2.Descriptor, index: number): void;
    appendSignatureFromPubKey(signature_data: SignatureV2.Descriptor, public_key: SimplePublicKey): void;
    appendSignatureV2s(signatures: SignatureV2[]): void;
    toSignatureDescriptor(): SignatureV2.Descriptor;
}

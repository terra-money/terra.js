import { JSONSerializable } from '../util/json';
export declare class PublicKey extends JSONSerializable<PublicKey.Data> {
    readonly type: PublicKey.Data['type'];
    readonly value: PublicKey.Data['value'];
    constructor(type: PublicKey.Data['type'], value: PublicKey.Data['value']);
    static fromData(data: PublicKey.Data): PublicKey;
    toData(): PublicKey.Data;
}
export declare namespace PublicKey {
    type Data = SimplePublicKey.Data | MultisigPublicKey.Data;
}
export declare namespace SimplePublicKey {
    interface Data {
        type: 'tendermint/PubKeySecp256k1';
        value: string;
    }
}
export declare namespace MultisigPublicKey {
    interface Data {
        type: 'tendermint/PubKeyMultisigThreshold';
        value: {
            threshold: string;
            pubkeys: SimplePublicKey.Data[];
        };
    }
}

/// <reference types="node" />
import { Key } from './Key';
import { StdSignMsg, StdSignature, AccPubKey, AccAddress, ValAddress, ValPubKey } from '../core';
interface CLIKeyParams {
    keyName: string;
    multisig?: string;
    cliPath?: string;
    home?: string;
}
/**
 * Key implementation that uses `terracli` to sign transactions. Keys should be registered
 * in `terracli`'s OS keyring.
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
export declare class CLIKey extends Key {
    private params;
    private _accAddress?;
    private _accPubKey?;
    /**
     *
     * @param keyName name of the key for terracli
     * @param multisig (optional) address of multisig account on behalf of which transaction shall be signed
     * @param cliPath (optional) path of terracli
     * @param home (optional) home option for terracli
     */
    constructor(params: CLIKeyParams);
    private generateCommand;
    private loadAccountDetails;
    /**
     * Terra account address. `terra-` prefixed.
     */
    get accAddress(): AccAddress;
    /**
     * Terra validator address. `terravaloper-` prefixed.
     */
    get valAddress(): ValAddress;
    /**
     * Terra account public key. `terrapub-` prefixed.
     */
    get accPubKey(): AccPubKey;
    /**
     * Terra validator public key. `terravaloperpub-` prefixed.
     */
    get valPubKey(): ValPubKey;
    sign(): Promise<Buffer>;
    createSignature(tx: StdSignMsg): Promise<StdSignature>;
}
export {};

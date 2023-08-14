/// <reference types="node" />
import { Key } from './Key';
import { AccAddress, ValAddress } from '../core/bech32';
import { SignDoc } from '../core/SignDoc';
import { SignatureV2 } from '../core/SignatureV2';
interface CLIKeyParams {
    keyName: string;
    multisig?: string;
    cliPath?: string;
    home?: string;
}
/**
 * Key implementation that uses `terrad` to sign transactions. Keys should be registered
 * in `terrad`'s OS keyring.
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
export declare class CLIKey extends Key {
    private params;
    private _accAddress?;
    /**
     *
     * @param keyName name of the key for terrad
     * @param multisig (optional) address of multisig account on behalf of which transaction shall be signed
     * @param cliPath (optional) path of terrad
     * @param home (optional) home option for terrad
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
    sign(): Promise<Buffer>;
    createSignature(tx: SignDoc): Promise<SignatureV2>;
    createSignatureAmino(tx: SignDoc): Promise<SignatureV2>;
}
export {};

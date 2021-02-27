import { BaseAPI } from './BaseAPI';
import { Dec, ValConsAddress, ValConsPubKey } from '../../../core';
export interface SlashingParams {
    /** Amount of time in seconds that evidence for validator misbehavior remains valid and can be submitted. */
    max_evidence_age: number;
    /** Number of blocks over which missed blocks are tallied for downtime. */
    signed_blocks_window: number;
    /** If a validator misses more than this number, they will be penalized and jailed for downtime. */
    min_signed_per_window: Dec;
    /** Amount of time in seconds after which a jailed validator can be unjailed. */
    downtime_jail_duration: number;
    /** Ratio of funds slashed for a double-sign infraction. */
    slash_fraction_double_sign: Dec;
    /** Ratio of funds slashed for a downtime infraction. */
    slash_fraction_downtime: Dec;
}
export declare namespace SlashingParams {
    interface Data {
        max_evidence_age: string;
        signed_blocks_window: string;
        min_signed_per_window: string;
        downtime_jail_duration: string;
        slash_fraction_double_sign: string;
        slash_fraction_downtime: string;
    }
}
export interface SigningInfo {
    /** Validator's consensus address. */
    address: ValConsAddress;
    /** Number of blocks over which missed blocks are tallied for downtime. */
    start_height: number;
    /** If a validator misses more than this number, they will be penalized and jailed for downtime. */
    index_offset: number;
    /** If the current validator is jailed, this value represents when they can submit a [[MsgUnjail]] to unjail themselves. */
    jailed_until: Date;
    /** Whether or not the validator is "tombstoned", meaning they are forever barred from joining the validator process. */
    tombstoned: boolean;
    /** Number of blocks the validator has missed for the current signed blocks window. */
    missed_blocks_counter: number;
}
export declare namespace SigningInfo {
    interface Data {
        address: string;
        start_height: string;
        index_offset: string;
        jailed_until: string;
        tombstoned: boolean;
        missed_blocks_counter: string;
    }
}
export declare class SlashingAPI extends BaseAPI {
    /**
     * Gets all signing info, or just the signing info of a particular validator.
     *
     * @param valConsPubKey validator's consensus public key
     */
    signingInfos(valConsPubKey?: ValConsPubKey): Promise<SigningInfo[]>;
    /**
     * Gets the current Slashing module's parameters.
     */
    parameters(): Promise<SlashingParams>;
}

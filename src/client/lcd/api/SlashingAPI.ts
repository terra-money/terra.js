import { BaseAPI } from './BaseAPI';
import { Dec, ValConsAddress, ValConsPubKey } from '../../../core';

export interface SlashingParams {
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

export namespace SlashingParams {
  export interface Data {
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

export namespace SigningInfo {
  export interface Data {
    address: string;
    start_height: string;
    index_offset: string;
    jailed_until: string;
    tombstoned: boolean;
    missed_blocks_counter: string;
  }
}

export class SlashingAPI extends BaseAPI {
  /**
   * Gets all signing info, or just the signing info of a particular validator.
   *
   * @param valConsPubKey validator's consensus public key
   */
  public async signingInfos(
    valConsPubKey?: ValConsPubKey
  ): Promise<SigningInfo[]> {
    let url;
    if (valConsPubKey !== undefined) {
      url = `/slashing/validators/${valConsPubKey}/signing_info`;
    } else {
      url = `/slashing/signing_infos`;
    }

    return this.c.get<SigningInfo.Data[]>(url).then(d =>
      d.result.map(x => ({
        address: x.address,
        start_height: Number.parseInt(x.start_height),
        index_offset: Number.parseInt(x.index_offset),
        jailed_until: new Date(x.jailed_until),
        tombstoned: x.tombstoned,
        missed_blocks_counter: Number.parseInt(x.missed_blocks_counter),
      }))
    );
  }

  /**
   * Gets the current Slashing module's parameters.
   */
  public async parameters(): Promise<SlashingParams> {
    return this.c
      .get<SlashingParams.Data>(`/slashing/parameters`)
      .then(({ result: d }) => ({
        signed_blocks_window: Number.parseInt(d.signed_blocks_window),
        min_signed_per_window: new Dec(d.min_signed_per_window),
        downtime_jail_duration: Number.parseInt(d.downtime_jail_duration),
        slash_fraction_double_sign: new Dec(d.slash_fraction_double_sign),
        slash_fraction_downtime: new Dec(d.slash_fraction_downtime),
      }));
  }
}

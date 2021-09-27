import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';

/**
 * Stores vote information for a proposal
 */
export class Vote extends JSONSerializable<Vote.Data> {
  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param option one of voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public options: Vote.Options,
    public option?: Vote.Option // undefined except proposals in voting status
  ) {
    super();
  }

  public static fromData(data: Vote.Data): Vote {
    const { proposal_id, voter, options, option } = data;

    return new Vote(Number.parseInt(proposal_id), voter, options, option);
  }

  public toData(): Vote.Data {
    const { proposal_id, voter, options, option } = this;

    const res: Vote.Data = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options,
    };

    if (option) {
      res.option = option;
    }

    return res;
  }
}

export namespace Vote {
  export type Options = {
    option: Option;
    weight: string;
  }[];

  /** Voting options */
  export enum Option {
    /** - */
    EMPTY = 0,

    /** Vote yes */
    YES = 1,

    /** Do not vote */
    ABSTAIN = 2,

    /** Vote no */
    NO = 3,

    /** Vote No with the option to veto if passed */
    NO_WITH_VETO = 4,
  }

  export interface Data {
    proposal_id: string;
    voter: AccAddress;
    option?: Option; // undefined except proposals in voting status
    options: {
      option: Option;
      weight: string; // Dec
    }[];
  }
}

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

    return new Vote(
      parseInt(proposal_id),
      voter,
      options.map(({ option, weight }) => ({
        option: Vote.OptionMapping[option],
        weight,
      })),
      option ? Vote.OptionMapping[option] : undefined
    );
  }

  public toData(): Vote.Data {
    const { proposal_id, voter, options, option } = this;

    const res: Vote.Data = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(({ option, weight }) => ({
        option: Object.keys(Vote.OptionMapping).indexOf(option),
        weight,
      })),
    };

    if (option) {
      res.option = Object.keys(Vote.OptionMapping).indexOf(option);
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
    EMPTY = 'Empty',

    /** Vote yes */
    YES = 'Yes',

    /** Do not vote */
    ABSTAIN = 'Abstain',

    /** Vote no */
    NO = 'No',

    /** Vote No with the option to veto if passed */
    NO_WITH_VETO = 'NoWithVeto',
  }

  export const OptionMapping: { [key: number]: Option } = {
    0: Option.EMPTY,
    1: Option.YES,
    2: Option.ABSTAIN,
    3: Option.NO,
    4: Option.NO_WITH_VETO,
  };

  export interface Data {
    proposal_id: string;
    voter: AccAddress;
    option?: number; // undefined except proposals in voting status
    options: {
      option: number;
      weight: string; // Dec
    }[];
  }
}

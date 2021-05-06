import { JSONSerializable } from '../../util/json';

/**
 * This captures the Treasury module's `tax_policy` and `reward_policy` parameters, which
 * determine how the Tax Rate and Reward Weight values are allowed to change.
 */
export class EventParams extends JSONSerializable<EventParams.Data> {
  /**
   * Maximum number of event attributes
   */
  public max_attribute_num: number;

  /**
   * Maximum length of the event attribute key
   */
  public max_attribute_key_length: number;

  /**
   * Maximum length of the event attribute value
   */
  public max_attribute_value_length: number;

  /**
   *
   * @param max_attribute_num maximum number of attributes
   * @param max_attribute_key_length  maximum key length
   * @param max_attribute_value_length maximum value length
   */
  constructor(
    max_attribute_num: number,
    max_attribute_key_length: number,
    max_attribute_value_length: number
  ) {
    super();
    this.max_attribute_num = max_attribute_num;
    this.max_attribute_key_length = max_attribute_key_length;
    this.max_attribute_value_length = max_attribute_value_length;
  }

  public static fromData(data: EventParams.Data): EventParams {
    const {
      max_attribute_num,
      max_attribute_key_length,
      max_attribute_value_length,
    } = data;
    return new EventParams(
      Number.parseInt(max_attribute_num),
      Number.parseInt(max_attribute_key_length),
      Number.parseInt(max_attribute_value_length)
    );
  }

  public toData(): EventParams.Data {
    const {
      max_attribute_num,
      max_attribute_key_length,
      max_attribute_value_length,
    } = this;
    return {
      max_attribute_num: max_attribute_num.toFixed(),
      max_attribute_key_length: max_attribute_key_length.toFixed(),
      max_attribute_value_length: max_attribute_value_length.toFixed(),
    };
  }
}

export namespace EventParams {
  export interface Data {
    max_attribute_num: string;
    max_attribute_key_length: string;
    max_attribute_value_length: string;
  }
}

import * as bech32 from 'bech32';

/** `terra-` prefixed account address */
export type AccAddress = string;

/** `terravaloper-` prefixed validator operator address */
export type ValAddress = string;

/** `terravalcons-` prefixed validator consensus address */
export type ValConsAddress = string;

/** `terrapub-` prefixed account public key */
export type AccPubKey = string;

/** `terravaloperpub-` prefixed validator public key */
export type ValPubKey = string;

/** `terravalconspub-` prefixed validator consensus public key */
export type ValConsPubKey = string;

function checkPrefixAndLength(
  prefix: string,
  data: string,
  length: number
): boolean {
  try {
    const vals = bech32.decode(data);
    console.log(vals.words);
    return vals.prefix === prefix && data.length == length;
  } catch (e) {
    return false;
  }
}

export namespace AccAddress {
  /**
   * Checks if a string is a valid Terra account address.
   *
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terra', data, 44);
  }

  /**
   * Converts a validator address into an account address
   *
   * @param address validator address
   */
  export function fromValAddress(address: ValAddress): AccAddress {
    const vals = bech32.decode(address);
    return bech32.encode('terra', vals.words);
  }
}

export namespace ValAddress {
  /**
   * Checks if a string is a Terra validator address.
   *
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terravaloper', data, 51);
  }

  /**
   * Converts a Terra account address to a validator address.
   * @param address account address to convert
   */
  export function fromAccAddress(address: AccAddress): ValAddress {
    const vals = bech32.decode(address);
    return bech32.encode('terravaloper', vals.words);
  }
}

export namespace ValConsAddress {
  /**
   * Checks if a string is a Terra validator consensus address
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terravalcons', data, 51);
  }
}

export namespace AccPubKey {
  /**
   * Checks if a string is a Terra validator consensus address
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terrapub', data, 76);
  }

  /**
   * Converts a Terra validaotr pubkey to an account pubkey.
   * @param address validator pubkey to convert
   */
  export function fromValPubKey(pubkey: ValPubKey): AccPubKey {
    const vals = bech32.decode(pubkey);
    return bech32.encode('terrapub', vals.words);
  }
}

export namespace ValPubKey {
  /**
   * Checks if a string is a Terra validator pubkey
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terravaloperpub', data, 83);
  }

  /**
   * Converts a Terra account pubkey to a validator pubkey.
   * @param pubkey account pubkey
   */
  export function fromAccPubKey(pubkey: AccPubKey): ValPubKey {
    const vals = bech32.decode(pubkey);
    return bech32.encode('terravaloperpub', vals.words);
  }
}

export namespace ValConsPubKey {
  /**
   * Checks if string is a valid Terra consensus (node) pubkey.
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terravalconspub', data, 83);
  }
}

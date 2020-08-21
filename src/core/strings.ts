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
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terra', data, 44);
  }

  export function fromValAddress(address: ValAddress): AccAddress {
    const vals = bech32.decode(address);
    return bech32.encode('terra', vals.words);
  }
}

export namespace ValAddress {
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terravaloper', data, 51);
  }

  export function fromAccAddress(address: ValAddress): AccAddress {
    const vals = bech32.decode(address);
    return bech32.encode('terravaloper', vals.words);
  }
}

export namespace ValConsAddress {
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terravalcons', data, 51);
  }
}

export namespace AccPubKey {
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terrapub', data, 76);
  }

  export function fromValPubKey(pubkey: ValPubKey): AccPubKey {
    const vals = bech32.decode(pubkey);
    return bech32.encode('terrapub', vals.words);
  }
}

export namespace ValPubKey {
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terravaloperpub', data, 83);
  }

  export function fromAccPubKey(pubkey: AccPubKey): ValPubKey {
    const vals = bech32.decode(pubkey);
    return bech32.encode('terravaloperpub', vals.words);
  }
}

export namespace ValConsPubKey {
  export function validate(data: string): boolean {
    return checkPrefixAndLength('terravalconspub', data, 83);
  }
}

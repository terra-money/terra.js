import { PublicKey } from './PublicKey';
import { Coins } from './Coins';
import { AccAddress } from './bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';

export namespace ProtoTx {
  export interface Proto {
    body: TxBody.Proto;
    auth_info: AuthInfo.Proto;
    signatures: string[];
  }
}

export namespace TxBody {
  export interface Proto {
    messages: Any[];
    memo: string;
    timeout_height: string;
  }
}

export namespace AuthInfo {
  export interface Proto {
    signer_infos: SignerInfo.Proto[];
    fee: Fee.Proto;
  }
}

export class SignerInfo {
  constructor(
    public public_key: PublicKey,
    public sequence: string,
    public mode_info: ModeInfo
  ) {}

  public static fromProto(proto: SignerInfo.Proto): SignerInfo {
    const { public_key, sequence, mode_info } = proto;
    return new SignerInfo(
      PublicKey.fromProto(public_key),
      sequence,
      ModeInfo.fromProto(mode_info)
    );
  }

  public toProto(): SignerInfo.Proto {
    const { public_key, sequence, mode_info } = this;
    return {
      public_key: public_key.packAny(),
      sequence,
      mode_info: mode_info.toProto(),
    };
  }
}

export namespace SignerInfo {
  export interface Proto {
    public_key: Any;
    sequence: string;
    mode_info: ModeInfo.Proto;
  }
}

export class ModeInfo {
  constructor(public mode_info: ModeInfo.Proto) {}
  public static fromProto(proto: ModeInfo.Proto): ModeInfo {
    return new ModeInfo(proto);
  }
  public toProto(): ModeInfo.Proto {
    return this.mode_info;
  }
}

export namespace ModeInfo {
  export type Proto = SingleMode.Proto | MultiMode.Proto;
}

export namespace SingleMode {
  export interface Proto {
    single: {
      mode: string;
    };
  }
}

export namespace MultiMode {
  export interface Proto {
    multi: {
      bitarray: {
        extra_bits_stored: string;
        elems: string;
      };
      mode_infos: SingleMode.Proto[];
    };
  }
}

export class Fee {
  /** Fee amount to be paid */
  public readonly amount: Coins;

  /**
   * Creates a new StdFee object.
   * @param gas gas limit
   * @param amount amount to be paid to validator
   */
  constructor(
    public readonly gas_limit: string,
    amount: Coins.Input,
    public payer: AccAddress,
    public granter: AccAddress
  ) {
    this.amount = new Coins(amount);
  }

  public static fromProto(proto: Fee.Proto): Fee {
    const { amount, gas_limit, payer, granter } = proto;
    return new Fee(gas_limit, Coins.fromData(amount), payer, granter);
  }
  public toProto(): Fee.Proto {
    const { amount, gas_limit, payer, granter } = this;
    return {
      gas_limit,
      amount: amount.toData(),
      payer,
      granter,
    };
  }
}
export namespace Fee {
  export interface Proto {
    amount: Coins.Data;
    gas_limit: string;
    payer: AccAddress;
    granter: AccAddress;
  }
}

import { Consensus as Consensus_pb } from '@terra-money/terra.proto/tendermint/version/types';
import { App as App_pb } from '@terra-money/terra.proto/tendermint/version/types';
import * as Long from 'long';
import { JSONSerializable } from '../../../../../util/json';

/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export class Consensus extends JSONSerializable<
  any,
  Consensus.Data,
  Consensus.Proto
> {
  /**
   * @param block
   * @param app
   */
  constructor(public block: number, public app: number) {
    super();
  }

  public static fromAmino(_: any): Consensus {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Consensus.Data): Consensus {
    const { block, app } = data;
    return new Consensus(Number.parseInt(block), Number.parseInt(app));
  }

  public toData(): Consensus.Data {
    const { block, app } = this;
    const res: Consensus.Data = {
      block: block.toFixed(),
      app: app.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: Consensus.Proto): Consensus {
    return new Consensus(proto.block.toNumber(), proto.app.toNumber());
  }

  public toProto(): Consensus.Proto {
    const { block, app } = this;
    return Consensus_pb.fromPartial({
      block: Long.fromNumber(block),
      app: Long.fromNumber(app),
    });
  }
}

export namespace Consensus {
  export interface Data {
    block: string;
    app: string;
  }

  export type Proto = Consensus_pb;
}

/**
 * App captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export class App extends JSONSerializable<any, App.Data, App.Proto> {
  /**
   * @param protocol
   * @param software
   */
  constructor(public protocol: number, public software: string) {
    super();
  }

  public static fromAmino(_: any): App {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: App.Data): App {
    const { protocol, software } = data;
    return new App(Number.parseInt(protocol), software);
  }

  public toData(): App.Data {
    const { protocol, software } = this;
    const res: App.Data = {
      protocol: protocol.toFixed(),
      software: software,
    };
    return res;
  }

  public static fromProto(proto: App.Proto): App {
    return new App(proto.protocol.toNumber(), proto.software);
  }

  public toProto(): App.Proto {
    const { protocol, software } = this;
    return App_pb.fromPartial({
      protocol: Long.fromNumber(protocol),
      software: software,
    });
  }
}

export namespace App {
  export interface Data {
    protocol: string;
    software: string;
  }

  export type Proto = App_pb;
}

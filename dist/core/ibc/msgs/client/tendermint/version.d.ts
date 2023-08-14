import { Consensus as Consensus_pb } from '@terra-money/terra.proto/tendermint/version/types';
import { App as App_pb } from '@terra-money/terra.proto/tendermint/version/types';
import { JSONSerializable } from '../../../../../util/json';
/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export declare class Consensus extends JSONSerializable<any, Consensus.Data, Consensus.Proto> {
    block: number;
    app: number;
    /**
     * @param block
     * @param app
     */
    constructor(block: number, app: number);
    static fromAmino(_: any): Consensus;
    toAmino(): any;
    static fromData(data: Consensus.Data): Consensus;
    toData(): Consensus.Data;
    static fromProto(proto: Consensus.Proto): Consensus;
    toProto(): Consensus.Proto;
}
export declare namespace Consensus {
    interface Data {
        block: string;
        app: string;
    }
    type Proto = Consensus_pb;
}
/**
 * App captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export declare class App extends JSONSerializable<any, App.Data, App.Proto> {
    protocol: number;
    software: string;
    /**
     * @param protocol
     * @param software
     */
    constructor(protocol: number, software: string);
    static fromAmino(_: any): App;
    toAmino(): any;
    static fromData(data: App.Data): App;
    toData(): App.Data;
    static fromProto(proto: App.Proto): App;
    toProto(): App.Proto;
}
export declare namespace App {
    interface Data {
        protocol: string;
        software: string;
    }
    type Proto = App_pb;
}

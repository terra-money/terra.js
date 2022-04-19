import {
  Header as Header_pb,
  SignedHeader as SignedHeader_pb,
  BlockID as BlockID_pb,
  PartSetHeader as PartSetHeader_pb,
  Commit as Commit_pb,
  CommitSig as CommitSig_pb,
  BlockIDFlag,
  blockIDFlagFromJSON,
  blockIDFlagToJSON,
} from '@terra-money/terra.proto/tendermint/types/types';
import {
  Validator as Validator_pb,
  ValidatorSet as ValidatorSet_pb,
} from '@terra-money/terra.proto/tendermint/types/validator';

import * as Long from 'long';
import { JSONSerializable } from '../../../../../util/json';
import { Consensus } from './version';
import { PublicKey } from './crypto';

/** Header defines the structure of a Tendermint block header. */
export class Header extends JSONSerializable<any, Header.Data, Header.Proto> {
  /**
   * @param total
   * @param hash
   */
  constructor(
    public version: Consensus | undefined,
    public chainId: string,
    public height: string,
    public time: Date | undefined,
    public lastBlockId: BlockID | undefined,
    public lastCommitHash: string,
    public dataHash: string,
    public validatorsHash: string,
    public nextValidatorsHash: string,
    public consensusHash: string,
    public appHash: string,
    public lastResultsHash: string,
    public evidenceHash: string,
    public proposerAddress: string
  ) {
    super();
  }

  public static fromAmino(_: any): Header {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Header.Data): Header {
    const {
      version,
      chain_id: chainId,
      height,
      time,
      last_block_id: lastBlockId,
      last_commit_hash: lastCommitHash,
      data_hash: dataHash,
      validators_hash: validatorsHash,
      next_validators_hash: nextValidatorsHash,
      consensus_hash: consensusHash,
      app_hash: appHash,
      last_results_hash: lastResultsHash,
      evidence_hash: evidenceHash,
      proposer_address: proposerAddress,
    } = data;
    return new Header(
      version ? Consensus.fromData(version) : undefined,
      chainId,
      height,
      time ? new Date(time) : undefined,
      lastBlockId ? BlockID.fromData(lastBlockId) : undefined,
      lastCommitHash,
      dataHash,
      validatorsHash,
      nextValidatorsHash,
      consensusHash,
      appHash,
      lastResultsHash,
      evidenceHash,
      proposerAddress
    );
  }

  public toData(): Header.Data {
    const {
      version,
      chainId,
      height,
      time,
      lastBlockId,
      lastCommitHash,
      dataHash,
      validatorsHash,
      nextValidatorsHash,
      consensusHash,
      appHash,
      lastResultsHash,
      evidenceHash,
      proposerAddress,
    } = this;
    const res: Header.Data = {
      version: version?.toData(),
      chain_id: chainId,
      height,
      time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
      last_block_id: lastBlockId ? lastBlockId.toData() : undefined,
      last_commit_hash: lastCommitHash,
      data_hash: dataHash,
      validators_hash: validatorsHash,
      next_validators_hash: nextValidatorsHash,
      consensus_hash: consensusHash,
      app_hash: appHash,
      last_results_hash: lastResultsHash,
      evidence_hash: evidenceHash,
      proposer_address: proposerAddress,
    };
    return res;
  }

  public static fromProto(proto: Header.Proto): Header {
    const {
      version,
      chainId,
      height,
      time,
      lastBlockId,
      lastCommitHash,
      dataHash,
      validatorsHash,
      nextValidatorsHash,
      consensusHash,
      appHash,
      lastResultsHash,
      evidenceHash,
      proposerAddress,
    } = proto;
    return new Header(
      version ? Consensus.fromProto(version) : undefined,
      chainId,
      height.toString(),
      time,
      lastBlockId ? BlockID.fromProto(lastBlockId) : undefined,
      Buffer.from(lastCommitHash).toString('base64'),
      Buffer.from(dataHash).toString('base64'),
      Buffer.from(validatorsHash).toString('base64'),
      Buffer.from(nextValidatorsHash).toString('base64'),
      Buffer.from(consensusHash).toString('base64'),
      Buffer.from(appHash).toString('base64'),
      Buffer.from(lastResultsHash).toString('base64'),
      Buffer.from(evidenceHash).toString('base64'),
      proposerAddress.toString()
    );
  }

  public toProto(): Header.Proto {
    const {
      version,
      chainId,
      height,
      time,
      lastBlockId,
      lastCommitHash,
      dataHash,
      validatorsHash,
      nextValidatorsHash,
      consensusHash,
      appHash,
      lastResultsHash,
      evidenceHash,
      proposerAddress,
    } = this;
    return Header_pb.fromPartial({
      version: version?.toProto(),
      chainId,
      height: Long.fromString(height),
      time,
      lastBlockId: lastBlockId?.toProto(),
      lastCommitHash: Buffer.from(lastCommitHash, 'base64'),
      dataHash: Buffer.from(dataHash, 'base64'),
      validatorsHash: Buffer.from(validatorsHash, 'base64'),
      nextValidatorsHash: Buffer.from(nextValidatorsHash, 'base64'),
      consensusHash: Buffer.from(consensusHash, 'base64'),
      appHash: Buffer.from(appHash, 'base64'),
      lastResultsHash: Buffer.from(lastResultsHash, 'base64'),
      evidenceHash: Buffer.from(evidenceHash, 'base64'),
      proposerAddress: Buffer.from(proposerAddress),
    });
  }
}

export namespace Header {
  export interface Data {
    version?: Consensus.Data;
    chain_id: string;
    height: string;
    time?: string;
    last_block_id?: BlockID.Data;
    last_commit_hash: string;
    data_hash: string;
    validators_hash: string;
    next_validators_hash: string;
    consensus_hash: string;
    app_hash: string;
    last_results_hash: string;
    evidence_hash: string;
    proposer_address: string;
  }

  export type Proto = Header_pb;
}

export class SignedHeader extends JSONSerializable<
  any,
  SignedHeader.Data,
  SignedHeader.Proto
> {
  /**
   * @param header
   * @param commit
   */
  constructor(public header?: Header, public commit?: Commit) {
    super();
  }

  public static fromAmino(_: any): SignedHeader {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: SignedHeader.Data): SignedHeader {
    const { header, commit } = data;
    return new SignedHeader(
      header ? Header.fromData(header) : undefined,
      commit ? Commit.fromData(commit) : undefined
    );
  }

  public toData(): SignedHeader.Data {
    const { header, commit } = this;
    const res: SignedHeader.Data = {
      header: header?.toData(),
      commit: commit?.toData(),
    };
    return res;
  }

  public static fromProto(proto: SignedHeader.Proto): SignedHeader {
    return new SignedHeader(
      proto.header ? Header.fromProto(proto.header) : undefined,
      proto.commit ? Commit.fromProto(proto.commit) : undefined
    );
  }

  public toProto(): SignedHeader.Proto {
    const { header, commit } = this;
    return SignedHeader_pb.fromPartial({
      header: header?.toProto(),
      commit: commit?.toProto(),
    });
  }
}

export namespace SignedHeader {
  export interface Data {
    header?: Header.Data;
    commit?: Commit.Data;
  }

  export type Proto = SignedHeader_pb;
}

/** BlockID */
export class BlockID extends JSONSerializable<
  any,
  BlockID.Data,
  BlockID.Proto
> {
  /**
   * @param hash
   * @param partSetHeader
   */
  constructor(public hash: string, public partSetHeader?: PartSetHeader) {
    super();
  }

  public static fromAmino(_: any): BlockID {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: BlockID.Data): BlockID {
    const { hash, part_set_header: partSetHeader } = data;
    return new BlockID(
      hash,
      partSetHeader ? PartSetHeader.fromData(partSetHeader) : undefined
    );
  }

  public toData(): BlockID.Data {
    const { hash, partSetHeader } = this;
    const res: BlockID.Data = {
      hash,
      part_set_header: partSetHeader?.toData(),
    };
    return res;
  }

  public static fromProto(proto: BlockID.Proto): BlockID {
    return new BlockID(
      Buffer.from(proto.hash).toString('base64'),
      proto.partSetHeader
        ? PartSetHeader.fromProto(proto.partSetHeader)
        : undefined
    );
  }

  public toProto(): BlockID.Proto {
    const { hash, partSetHeader } = this;
    return BlockID_pb.fromPartial({
      hash: Buffer.from(hash, 'base64'),
      partSetHeader: partSetHeader ? partSetHeader.toProto() : undefined,
    });
  }
}

export namespace BlockID {
  export interface Data {
    hash: string;
    part_set_header?: PartSetHeader.Data;
  }

  export type Proto = BlockID_pb;
}

/** PartsetHeader */
export class PartSetHeader extends JSONSerializable<
  any,
  PartSetHeader.Data,
  PartSetHeader.Proto
> {
  /**
   * @param total
   * @param hash
   */
  constructor(public total: number, public hash: string) {
    super();
  }

  public static fromAmino(_: any): PartSetHeader {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: PartSetHeader.Data): PartSetHeader {
    const { total, hash } = data;
    return new PartSetHeader(parseInt(total), hash);
  }

  public toData(): PartSetHeader.Data {
    const { total, hash } = this;
    const res: PartSetHeader.Data = {
      total: total.toFixed(),
      hash: hash,
    };
    return res;
  }

  public static fromProto(proto: PartSetHeader.Proto): PartSetHeader {
    return new PartSetHeader(
      proto.total,
      Buffer.from(proto.hash).toString('base64')
    );
  }

  public toProto(): PartSetHeader.Proto {
    const { total, hash } = this;
    return PartSetHeader_pb.fromPartial({
      total: total,
      hash: Buffer.from(hash, 'base64'),
    });
  }
}

export namespace PartSetHeader {
  export interface Data {
    total: string;
    hash: string;
  }

  export type Proto = PartSetHeader_pb;
}

/** Commit contains the evidence that a block was committed by a set of validators. */
export class Commit extends JSONSerializable<any, Commit.Data, Commit.Proto> {
  /**
   * @param height
   * @param round
   * @param blockId
   * @param signatures
   */
  constructor(
    public height: Long,
    public round: number,
    public blockId: BlockID | undefined,
    public signatures: CommitSig[]
  ) {
    super();
  }

  public static fromAmino(_: any): Commit {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Commit.Data): Commit {
    const { height, round, block_id: blockId, signatures } = data;
    return new Commit(
      Long.fromString(height),
      Number.parseInt(round),
      blockId ? BlockID.fromData(blockId) : undefined,
      signatures.map(sig => CommitSig.fromData(sig))
    );
  }

  public toData(): Commit.Data {
    const { height, round, blockId, signatures } = this;
    const res: Commit.Data = {
      height: height.toString(),
      round: round.toFixed(),
      block_id: blockId?.toData(),
      signatures: signatures.map(sig => sig.toData()),
    };
    return res;
  }

  public static fromProto(proto: Commit.Proto): Commit {
    const { height, round, blockId, signatures } = proto;
    return new Commit(
      height,
      round,
      blockId ? BlockID.fromProto(blockId) : undefined,
      signatures.map(sig => CommitSig.fromProto(sig))
    );
  }

  public toProto(): Commit.Proto {
    const { height, round, blockId, signatures } = this;
    return Commit_pb.fromPartial({
      height,
      round,
      blockId: blockId?.toProto(),
      signatures: signatures.map(sig => sig.toProto()),
    });
  }
}

export namespace Commit {
  export interface Data {
    height: string;
    round: string;
    block_id?: BlockID.Data;
    signatures: CommitSig.Data[];
  }

  export type Proto = Commit_pb;
}

/** CommitSig is a part of the Vote included in a Commit. */
export class CommitSig extends JSONSerializable<
  any,
  CommitSig.Data,
  CommitSig.Proto
> {
  /**
   * @param blockIdFlag
   * @param validatorAddress
   * @param timestamp
   * @param signature
   */
  constructor(
    public blockIdFlag: BlockIDFlag,
    public validatorAddress: string | undefined,
    public timestamp: Date | undefined,
    public signature: string | undefined
  ) {
    super();
  }

  public static fromAmino(_: any): CommitSig {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: CommitSig.Data): CommitSig {
    const { block_id_flag, validator_address, timestamp, signature } = data;
    return new CommitSig(
      blockIDFlagFromJSON(block_id_flag),
      validator_address,
      timestamp ? new Date(timestamp) : undefined,
      signature
    );
  }

  public toData(): CommitSig.Data {
    const { blockIdFlag, validatorAddress, timestamp, signature } = this;
    const res: CommitSig.Data = {
      block_id_flag: blockIDFlagToJSON(blockIdFlag),
      validator_address: validatorAddress || '',
      timestamp: timestamp
        ? timestamp.toISOString().replace(/\.000Z$/, 'Z')
        : undefined,
      signature: signature || '',
    };
    return res;
  }

  public static fromProto(proto: CommitSig.Proto): CommitSig {
    const { blockIdFlag, validatorAddress, timestamp, signature } = proto;
    return new CommitSig(
      blockIdFlag,
      Buffer.from(validatorAddress).toString('base64'),
      timestamp,
      Buffer.from(signature).toString('base64')
    );
  }

  public toProto(): CommitSig.Proto {
    const { blockIdFlag, validatorAddress, timestamp, signature } = this;
    return CommitSig_pb.fromPartial({
      blockIdFlag,
      validatorAddress: validatorAddress
        ? Buffer.from(validatorAddress, 'base64')
        : undefined,
      timestamp,
      signature: signature ? Buffer.from(signature, 'base64') : undefined,
    });
  }
}

export namespace CommitSig {
  export interface Data {
    block_id_flag: string;
    validator_address?: string;
    timestamp?: string;
    signature?: string;
  }

  export type Proto = CommitSig_pb;
}

export class ValidatorSet extends JSONSerializable<
  any,
  ValidatorSet.Data,
  ValidatorSet.Proto
> {
  /**
   * @param validators
   * @param proposer
   * @param totalVotingPower
   */
  constructor(
    public validators: Validator[],
    public proposer: Validator | undefined,
    public totalVotingPower: Long
  ) {
    super();
  }

  public static fromAmino(_: any): ValidatorSet {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: ValidatorSet.Data): ValidatorSet {
    const { validators, proposer, total_voting_power } = data;
    return new ValidatorSet(
      validators.map(val => Validator.fromData(val)),
      proposer ? Validator.fromData(proposer) : undefined,
      Long.fromString(total_voting_power)
    );
  }

  public toData(): ValidatorSet.Data {
    const { validators, proposer, totalVotingPower } = this;
    const res: ValidatorSet.Data = {
      validators: validators.map(val => val.toData()),
      proposer: proposer?.toData(),
      total_voting_power: totalVotingPower.toString(),
    };
    return res;
  }

  public static fromProto(proto: ValidatorSet.Proto): ValidatorSet {
    const { validators, proposer, totalVotingPower } = proto;
    return new ValidatorSet(
      validators.map(val => Validator.fromProto(val)),
      proposer ? Validator.fromProto(proposer) : undefined,
      totalVotingPower
    );
  }

  public toProto(): ValidatorSet.Proto {
    const { validators, proposer, totalVotingPower } = this;
    return ValidatorSet_pb.fromPartial({
      validators: validators.map(val => val.toProto()),
      proposer: proposer?.toProto() || undefined,
      totalVotingPower,
    });
  }
}

export namespace ValidatorSet {
  export interface Data {
    validators: Validator.Data[];
    proposer?: Validator.Data;
    total_voting_power: string;
  }

  export type Proto = ValidatorSet_pb;
}

export class Validator extends JSONSerializable<
  any,
  Validator.Data,
  Validator.Proto
> {
  /**
   * @param address
   * @param pubKey
   * @param votingPower
   * @param proposerPriority
   */
  constructor(
    public address: string, // not AccAddress in case of opposite chain is not cosmos-sdk based
    public pubKey: PublicKey | undefined,
    public votingPower: Long,
    public proposerPriority: Long
  ) {
    super();
  }

  public static fromAmino(_: any): Validator {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Validator.Data): Validator {
    const {
      address,
      pub_key: pubKey,
      voting_power: votingPower,
      proposer_priority: proposerPriority,
    } = data;
    return new Validator(
      address,
      pubKey ? PublicKey.fromData(pubKey) : undefined,
      Long.fromString(votingPower),
      Long.fromString(proposerPriority)
    );
  }

  public toData(): Validator.Data {
    const { address, pubKey, votingPower, proposerPriority } = this;
    const res: Validator.Data = {
      address,
      pub_key: pubKey?.toData(),
      voting_power: votingPower.toString(),
      proposer_priority: proposerPriority.toString(),
    };
    return res;
  }

  public static fromProto(proto: Validator.Proto): Validator {
    const { address, pubKey, votingPower, proposerPriority } = proto;
    return new Validator(
      Buffer.from(address).toString('base64'),
      pubKey ? PublicKey.fromProto(pubKey) : undefined,
      votingPower,
      proposerPriority
    );
  }

  public toProto(): Validator.Proto {
    const { address, pubKey, votingPower, proposerPriority } = this;
    return Validator_pb.fromPartial({
      address: Buffer.from(address, 'base64'),
      pubKey: pubKey?.toProto() || undefined,
      votingPower,
      proposerPriority,
    });
  }
}

export namespace Validator {
  export interface Data {
    address: string;
    pub_key?: PublicKey.Data;
    voting_power: string;
    proposer_priority: string;
  }

  export type Proto = Validator_pb;
}

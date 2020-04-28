export interface BlockInfo {
  block_meta: BlockMeta;
  block: Block;
}

export interface Block {
  header: Header;
  data: Data;
  evidence: Evidence;
  last_commit: LastCommit;
}

export interface Data {
  txs: string[] | null;
}

export interface Evidence {
  evidence: string | null;
}

export interface Header {
  version: Version;

  /** blockchain ID */
  chain_id: string;

  /** block's height */
  height: string;

  /** time the block was included */
  time: string;

  /** number of transactions in the block */
  num_txs: string;

  /** total amount of transactions in blockchain after time of inclusion */
  total_txs: string;
  last_block_id: BlockID;
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

export interface BlockID {
  hash: string;
  parts: Parts;
}

export interface Parts {
  total: string;
  hash: string;
}

export interface Version {
  block: string;
  app: string;
}

export interface LastCommit {
  block_id: BlockID;
  precommits: Precommit[];
}

export interface Precommit {
  type: number;
  height: string;
  round: string;
  block_id: BlockID;
  timestamp: string;
  validator_address: string;
  validator_index: string;
  signature: string;
}

export interface BlockMeta {
  block_id: BlockID;
  header: Header;
}

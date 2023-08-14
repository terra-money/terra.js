export interface BlockInfo {
    block_id: BlockID;
    block: Block;
}
export interface Block {
    header: Header;
    data: {
        txs: string[] | null;
    };
    evidence: Evidence;
    last_commit: LastCommit;
}
export interface Evidence {
    evidence: string[];
}
export interface Header {
    version: Version;
    /** blockchain ID */
    chain_id: string;
    /** block's height */
    height: string;
    /** time the block was included */
    time: string;
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
    part_set_header: Parts;
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
    height: string;
    round: number;
    block_id: BlockID;
    signatures: Signature[];
}
export interface Signature {
    block_id_flag: number;
    validator_address: string;
    timestamp: string;
    signature: string;
}

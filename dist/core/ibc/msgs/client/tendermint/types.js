"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.ValidatorSet = exports.CommitSig = exports.Commit = exports.PartSetHeader = exports.BlockID = exports.SignedHeader = exports.Header = void 0;
var types_1 = require("@terra-money/terra.proto/tendermint/types/types");
var validator_1 = require("@terra-money/terra.proto/tendermint/types/validator");
var Long = __importStar(require("long"));
var json_1 = require("../../../../../util/json");
var version_1 = require("./version");
var crypto_1 = require("./crypto");
/** Header defines the structure of a Tendermint block header. */
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    /**
     * @param total
     * @param hash
     */
    function Header(version, chainId, height, time, lastBlockId, lastCommitHash, dataHash, validatorsHash, nextValidatorsHash, consensusHash, appHash, lastResultsHash, evidenceHash, proposerAddress) {
        var _this = _super.call(this) || this;
        _this.version = version;
        _this.chainId = chainId;
        _this.height = height;
        _this.time = time;
        _this.lastBlockId = lastBlockId;
        _this.lastCommitHash = lastCommitHash;
        _this.dataHash = dataHash;
        _this.validatorsHash = validatorsHash;
        _this.nextValidatorsHash = nextValidatorsHash;
        _this.consensusHash = consensusHash;
        _this.appHash = appHash;
        _this.lastResultsHash = lastResultsHash;
        _this.evidenceHash = evidenceHash;
        _this.proposerAddress = proposerAddress;
        return _this;
    }
    Header.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    Header.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    Header.fromData = function (data) {
        var version = data.version, chainId = data.chain_id, height = data.height, time = data.time, lastBlockId = data.last_block_id, lastCommitHash = data.last_commit_hash, dataHash = data.data_hash, validatorsHash = data.validators_hash, nextValidatorsHash = data.next_validators_hash, consensusHash = data.consensus_hash, appHash = data.app_hash, lastResultsHash = data.last_results_hash, evidenceHash = data.evidence_hash, proposerAddress = data.proposer_address;
        return new Header(version ? version_1.Consensus.fromData(version) : undefined, chainId, height, time ? new Date(time) : undefined, lastBlockId ? BlockID.fromData(lastBlockId) : undefined, lastCommitHash, dataHash, validatorsHash, nextValidatorsHash, consensusHash, appHash, lastResultsHash, evidenceHash, proposerAddress);
    };
    Header.prototype.toData = function () {
        var _a = this, version = _a.version, chainId = _a.chainId, height = _a.height, time = _a.time, lastBlockId = _a.lastBlockId, lastCommitHash = _a.lastCommitHash, dataHash = _a.dataHash, validatorsHash = _a.validatorsHash, nextValidatorsHash = _a.nextValidatorsHash, consensusHash = _a.consensusHash, appHash = _a.appHash, lastResultsHash = _a.lastResultsHash, evidenceHash = _a.evidenceHash, proposerAddress = _a.proposerAddress;
        var res = {
            version: version === null || version === void 0 ? void 0 : version.toData(),
            chain_id: chainId,
            height: height,
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
    };
    Header.fromProto = function (proto) {
        var version = proto.version, chainId = proto.chainId, height = proto.height, time = proto.time, lastBlockId = proto.lastBlockId, lastCommitHash = proto.lastCommitHash, dataHash = proto.dataHash, validatorsHash = proto.validatorsHash, nextValidatorsHash = proto.nextValidatorsHash, consensusHash = proto.consensusHash, appHash = proto.appHash, lastResultsHash = proto.lastResultsHash, evidenceHash = proto.evidenceHash, proposerAddress = proto.proposerAddress;
        return new Header(version ? version_1.Consensus.fromProto(version) : undefined, chainId, height.toString(), time, lastBlockId ? BlockID.fromProto(lastBlockId) : undefined, Buffer.from(lastCommitHash).toString('base64'), Buffer.from(dataHash).toString('base64'), Buffer.from(validatorsHash).toString('base64'), Buffer.from(nextValidatorsHash).toString('base64'), Buffer.from(consensusHash).toString('base64'), Buffer.from(appHash).toString('base64'), Buffer.from(lastResultsHash).toString('base64'), Buffer.from(evidenceHash).toString('base64'), proposerAddress.toString());
    };
    Header.prototype.toProto = function () {
        var _a = this, version = _a.version, chainId = _a.chainId, height = _a.height, time = _a.time, lastBlockId = _a.lastBlockId, lastCommitHash = _a.lastCommitHash, dataHash = _a.dataHash, validatorsHash = _a.validatorsHash, nextValidatorsHash = _a.nextValidatorsHash, consensusHash = _a.consensusHash, appHash = _a.appHash, lastResultsHash = _a.lastResultsHash, evidenceHash = _a.evidenceHash, proposerAddress = _a.proposerAddress;
        return types_1.Header.fromPartial({
            version: version === null || version === void 0 ? void 0 : version.toProto(),
            chainId: chainId,
            height: Long.fromString(height),
            time: time,
            lastBlockId: lastBlockId === null || lastBlockId === void 0 ? void 0 : lastBlockId.toProto(),
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
    };
    return Header;
}(json_1.JSONSerializable));
exports.Header = Header;
var SignedHeader = /** @class */ (function (_super) {
    __extends(SignedHeader, _super);
    /**
     * @param header
     * @param commit
     */
    function SignedHeader(header, commit) {
        var _this = _super.call(this) || this;
        _this.header = header;
        _this.commit = commit;
        return _this;
    }
    SignedHeader.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    SignedHeader.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    SignedHeader.fromData = function (data) {
        var header = data.header, commit = data.commit;
        return new SignedHeader(header ? Header.fromData(header) : undefined, commit ? Commit.fromData(commit) : undefined);
    };
    SignedHeader.prototype.toData = function () {
        var _a = this, header = _a.header, commit = _a.commit;
        var res = {
            header: header === null || header === void 0 ? void 0 : header.toData(),
            commit: commit === null || commit === void 0 ? void 0 : commit.toData(),
        };
        return res;
    };
    SignedHeader.fromProto = function (proto) {
        return new SignedHeader(proto.header ? Header.fromProto(proto.header) : undefined, proto.commit ? Commit.fromProto(proto.commit) : undefined);
    };
    SignedHeader.prototype.toProto = function () {
        var _a = this, header = _a.header, commit = _a.commit;
        return types_1.SignedHeader.fromPartial({
            header: header === null || header === void 0 ? void 0 : header.toProto(),
            commit: commit === null || commit === void 0 ? void 0 : commit.toProto(),
        });
    };
    return SignedHeader;
}(json_1.JSONSerializable));
exports.SignedHeader = SignedHeader;
/** BlockID */
var BlockID = /** @class */ (function (_super) {
    __extends(BlockID, _super);
    /**
     * @param hash
     * @param partSetHeader
     */
    function BlockID(hash, partSetHeader) {
        var _this = _super.call(this) || this;
        _this.hash = hash;
        _this.partSetHeader = partSetHeader;
        return _this;
    }
    BlockID.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    BlockID.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    BlockID.fromData = function (data) {
        var hash = data.hash, partSetHeader = data.part_set_header;
        return new BlockID(hash, partSetHeader ? PartSetHeader.fromData(partSetHeader) : undefined);
    };
    BlockID.prototype.toData = function () {
        var _a = this, hash = _a.hash, partSetHeader = _a.partSetHeader;
        var res = {
            hash: hash,
            part_set_header: partSetHeader === null || partSetHeader === void 0 ? void 0 : partSetHeader.toData(),
        };
        return res;
    };
    BlockID.fromProto = function (proto) {
        return new BlockID(Buffer.from(proto.hash).toString('base64'), proto.partSetHeader
            ? PartSetHeader.fromProto(proto.partSetHeader)
            : undefined);
    };
    BlockID.prototype.toProto = function () {
        var _a = this, hash = _a.hash, partSetHeader = _a.partSetHeader;
        return types_1.BlockID.fromPartial({
            hash: Buffer.from(hash, 'base64'),
            partSetHeader: partSetHeader ? partSetHeader.toProto() : undefined,
        });
    };
    return BlockID;
}(json_1.JSONSerializable));
exports.BlockID = BlockID;
/** PartsetHeader */
var PartSetHeader = /** @class */ (function (_super) {
    __extends(PartSetHeader, _super);
    /**
     * @param total
     * @param hash
     */
    function PartSetHeader(total, hash) {
        var _this = _super.call(this) || this;
        _this.total = total;
        _this.hash = hash;
        return _this;
    }
    PartSetHeader.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    PartSetHeader.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    PartSetHeader.fromData = function (data) {
        var total = data.total, hash = data.hash;
        return new PartSetHeader(parseInt(total), hash);
    };
    PartSetHeader.prototype.toData = function () {
        var _a = this, total = _a.total, hash = _a.hash;
        var res = {
            total: total.toFixed(),
            hash: hash,
        };
        return res;
    };
    PartSetHeader.fromProto = function (proto) {
        return new PartSetHeader(proto.total, Buffer.from(proto.hash).toString('base64'));
    };
    PartSetHeader.prototype.toProto = function () {
        var _a = this, total = _a.total, hash = _a.hash;
        return types_1.PartSetHeader.fromPartial({
            total: total,
            hash: Buffer.from(hash, 'base64'),
        });
    };
    return PartSetHeader;
}(json_1.JSONSerializable));
exports.PartSetHeader = PartSetHeader;
/** Commit contains the evidence that a block was committed by a set of validators. */
var Commit = /** @class */ (function (_super) {
    __extends(Commit, _super);
    /**
     * @param height
     * @param round
     * @param blockId
     * @param signatures
     */
    function Commit(height, round, blockId, signatures) {
        var _this = _super.call(this) || this;
        _this.height = height;
        _this.round = round;
        _this.blockId = blockId;
        _this.signatures = signatures;
        return _this;
    }
    Commit.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    Commit.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    Commit.fromData = function (data) {
        var height = data.height, round = data.round, blockId = data.block_id, signatures = data.signatures;
        return new Commit(Long.fromString(height), Number.parseInt(round), blockId ? BlockID.fromData(blockId) : undefined, signatures.map(function (sig) { return CommitSig.fromData(sig); }));
    };
    Commit.prototype.toData = function () {
        var _a = this, height = _a.height, round = _a.round, blockId = _a.blockId, signatures = _a.signatures;
        var res = {
            height: height.toString(),
            round: round.toFixed(),
            block_id: blockId === null || blockId === void 0 ? void 0 : blockId.toData(),
            signatures: signatures.map(function (sig) { return sig.toData(); }),
        };
        return res;
    };
    Commit.fromProto = function (proto) {
        var height = proto.height, round = proto.round, blockId = proto.blockId, signatures = proto.signatures;
        return new Commit(height, round, blockId ? BlockID.fromProto(blockId) : undefined, signatures.map(function (sig) { return CommitSig.fromProto(sig); }));
    };
    Commit.prototype.toProto = function () {
        var _a = this, height = _a.height, round = _a.round, blockId = _a.blockId, signatures = _a.signatures;
        return types_1.Commit.fromPartial({
            height: height,
            round: round,
            blockId: blockId === null || blockId === void 0 ? void 0 : blockId.toProto(),
            signatures: signatures.map(function (sig) { return sig.toProto(); }),
        });
    };
    return Commit;
}(json_1.JSONSerializable));
exports.Commit = Commit;
/** CommitSig is a part of the Vote included in a Commit. */
var CommitSig = /** @class */ (function (_super) {
    __extends(CommitSig, _super);
    /**
     * @param blockIdFlag
     * @param validatorAddress
     * @param timestamp
     * @param signature
     */
    function CommitSig(blockIdFlag, validatorAddress, timestamp, signature) {
        var _this = _super.call(this) || this;
        _this.blockIdFlag = blockIdFlag;
        _this.validatorAddress = validatorAddress;
        _this.timestamp = timestamp;
        _this.signature = signature;
        return _this;
    }
    CommitSig.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    CommitSig.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    CommitSig.fromData = function (data) {
        var block_id_flag = data.block_id_flag, validator_address = data.validator_address, timestamp = data.timestamp, signature = data.signature;
        return new CommitSig((0, types_1.blockIDFlagFromJSON)(block_id_flag), validator_address, timestamp ? new Date(timestamp) : undefined, signature);
    };
    CommitSig.prototype.toData = function () {
        var _a = this, blockIdFlag = _a.blockIdFlag, validatorAddress = _a.validatorAddress, timestamp = _a.timestamp, signature = _a.signature;
        var res = {
            block_id_flag: (0, types_1.blockIDFlagToJSON)(blockIdFlag),
            validator_address: validatorAddress || '',
            timestamp: timestamp
                ? timestamp.toISOString().replace(/\.000Z$/, 'Z')
                : undefined,
            signature: signature || '',
        };
        return res;
    };
    CommitSig.fromProto = function (proto) {
        var blockIdFlag = proto.blockIdFlag, validatorAddress = proto.validatorAddress, timestamp = proto.timestamp, signature = proto.signature;
        return new CommitSig(blockIdFlag, Buffer.from(validatorAddress).toString('base64'), timestamp, Buffer.from(signature).toString('base64'));
    };
    CommitSig.prototype.toProto = function () {
        var _a = this, blockIdFlag = _a.blockIdFlag, validatorAddress = _a.validatorAddress, timestamp = _a.timestamp, signature = _a.signature;
        return types_1.CommitSig.fromPartial({
            blockIdFlag: blockIdFlag,
            validatorAddress: validatorAddress
                ? Buffer.from(validatorAddress, 'base64')
                : undefined,
            timestamp: timestamp,
            signature: signature ? Buffer.from(signature, 'base64') : undefined,
        });
    };
    return CommitSig;
}(json_1.JSONSerializable));
exports.CommitSig = CommitSig;
var ValidatorSet = /** @class */ (function (_super) {
    __extends(ValidatorSet, _super);
    /**
     * @param validators
     * @param proposer
     * @param totalVotingPower
     */
    function ValidatorSet(validators, proposer, totalVotingPower) {
        var _this = _super.call(this) || this;
        _this.validators = validators;
        _this.proposer = proposer;
        _this.totalVotingPower = totalVotingPower;
        return _this;
    }
    ValidatorSet.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    ValidatorSet.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    ValidatorSet.fromData = function (data) {
        var validators = data.validators, proposer = data.proposer, total_voting_power = data.total_voting_power;
        return new ValidatorSet(validators.map(function (val) { return Validator.fromData(val); }), proposer ? Validator.fromData(proposer) : undefined, Long.fromString(total_voting_power));
    };
    ValidatorSet.prototype.toData = function () {
        var _a = this, validators = _a.validators, proposer = _a.proposer, totalVotingPower = _a.totalVotingPower;
        var res = {
            validators: validators.map(function (val) { return val.toData(); }),
            proposer: proposer === null || proposer === void 0 ? void 0 : proposer.toData(),
            total_voting_power: totalVotingPower.toString(),
        };
        return res;
    };
    ValidatorSet.fromProto = function (proto) {
        var validators = proto.validators, proposer = proto.proposer, totalVotingPower = proto.totalVotingPower;
        return new ValidatorSet(validators.map(function (val) { return Validator.fromProto(val); }), proposer ? Validator.fromProto(proposer) : undefined, totalVotingPower);
    };
    ValidatorSet.prototype.toProto = function () {
        var _a = this, validators = _a.validators, proposer = _a.proposer, totalVotingPower = _a.totalVotingPower;
        return validator_1.ValidatorSet.fromPartial({
            validators: validators.map(function (val) { return val.toProto(); }),
            proposer: (proposer === null || proposer === void 0 ? void 0 : proposer.toProto()) || undefined,
            totalVotingPower: totalVotingPower,
        });
    };
    return ValidatorSet;
}(json_1.JSONSerializable));
exports.ValidatorSet = ValidatorSet;
var Validator = /** @class */ (function (_super) {
    __extends(Validator, _super);
    /**
     * @param address
     * @param pubKey
     * @param votingPower
     * @param proposerPriority
     */
    function Validator(address, // not AccAddress in case of opposite chain is not cosmos-sdk based
    pubKey, votingPower, proposerPriority) {
        var _this = _super.call(this) || this;
        _this.address = address;
        _this.pubKey = pubKey;
        _this.votingPower = votingPower;
        _this.proposerPriority = proposerPriority;
        return _this;
    }
    Validator.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    Validator.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    Validator.fromData = function (data) {
        var address = data.address, pubKey = data.pub_key, votingPower = data.voting_power, proposerPriority = data.proposer_priority;
        return new Validator(address, pubKey ? crypto_1.PublicKey.fromData(pubKey) : undefined, Long.fromString(votingPower), Long.fromString(proposerPriority));
    };
    Validator.prototype.toData = function () {
        var _a = this, address = _a.address, pubKey = _a.pubKey, votingPower = _a.votingPower, proposerPriority = _a.proposerPriority;
        var res = {
            address: address,
            pub_key: pubKey === null || pubKey === void 0 ? void 0 : pubKey.toData(),
            voting_power: votingPower.toString(),
            proposer_priority: proposerPriority.toString(),
        };
        return res;
    };
    Validator.fromProto = function (proto) {
        var address = proto.address, pubKey = proto.pubKey, votingPower = proto.votingPower, proposerPriority = proto.proposerPriority;
        return new Validator(Buffer.from(address).toString('base64'), pubKey ? crypto_1.PublicKey.fromProto(pubKey) : undefined, votingPower, proposerPriority);
    };
    Validator.prototype.toProto = function () {
        var _a = this, address = _a.address, pubKey = _a.pubKey, votingPower = _a.votingPower, proposerPriority = _a.proposerPriority;
        return validator_1.Validator.fromPartial({
            address: Buffer.from(address, 'base64'),
            pubKey: (pubKey === null || pubKey === void 0 ? void 0 : pubKey.toProto()) || undefined,
            votingPower: votingPower,
            proposerPriority: proposerPriority,
        });
    };
    return Validator;
}(json_1.JSONSerializable));
exports.Validator = Validator;
//# sourceMappingURL=types.js.map
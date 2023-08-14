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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var json_1 = require("../../../../util/json");
var tendermint_1 = require("@terra-money/terra.proto/ibc/lightclients/tendermint/v1/tendermint");
var Height_1 = require("../../core/client/Height");
var types_1 = require("../../msgs/client/tendermint/types");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    /**
     * @param signedHeader
     * @param validatorSet
     * @param trustedHeight
     * @param trustedValidators
     */
    function Header(signedHeader, validatorSet, trustedHeight, trustedValidators) {
        var _this = _super.call(this) || this;
        _this.signedHeader = signedHeader;
        _this.validatorSet = validatorSet;
        _this.trustedHeight = trustedHeight;
        _this.trustedValidators = trustedValidators;
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
        var signedHeader = data.signed_header, validatorSet = data.validator_set, trustedHeight = data.trusted_height, trustedValidators = data.trusted_validators;
        return new Header(signedHeader ? types_1.SignedHeader.fromData(signedHeader) : undefined, validatorSet ? types_1.ValidatorSet.fromData(validatorSet) : undefined, trustedHeight ? Height_1.Height.fromData(trustedHeight) : undefined, trustedValidators ? types_1.ValidatorSet.fromData(trustedValidators) : undefined);
    };
    Header.prototype.toData = function () {
        var _a = this, signedHeader = _a.signedHeader, validatorSet = _a.validatorSet, trustedHeight = _a.trustedHeight, trustedValidators = _a.trustedValidators;
        return {
            signed_header: (signedHeader === null || signedHeader === void 0 ? void 0 : signedHeader.toData()) || undefined,
            validator_set: (validatorSet === null || validatorSet === void 0 ? void 0 : validatorSet.toData()) || undefined,
            trusted_height: (trustedHeight === null || trustedHeight === void 0 ? void 0 : trustedHeight.toData()) || undefined,
            trusted_validators: (trustedValidators === null || trustedValidators === void 0 ? void 0 : trustedValidators.toData()) || undefined,
        };
    };
    Header.fromProto = function (proto) {
        var signedHeader = proto.signedHeader, validatorSet = proto.validatorSet, trustedHeight = proto.trustedHeight, trustedValidators = proto.trustedValidators;
        return new Header(signedHeader ? types_1.SignedHeader.fromProto(signedHeader) : undefined, validatorSet ? types_1.ValidatorSet.fromProto(validatorSet) : undefined, trustedHeight ? Height_1.Height.fromProto(trustedHeight) : undefined, trustedValidators ? types_1.ValidatorSet.fromProto(trustedValidators) : undefined);
    };
    Header.prototype.toProto = function () {
        var _a = this, signedHeader = _a.signedHeader, validatorSet = _a.validatorSet, trustedHeight = _a.trustedHeight, trustedValidators = _a.trustedValidators;
        return tendermint_1.Header.fromPartial({
            signedHeader: (signedHeader === null || signedHeader === void 0 ? void 0 : signedHeader.toProto()) || undefined,
            validatorSet: (validatorSet === null || validatorSet === void 0 ? void 0 : validatorSet.toProto()) || undefined,
            trustedHeight: (trustedHeight === null || trustedHeight === void 0 ? void 0 : trustedHeight.toProto()) || undefined,
            trustedValidators: (trustedValidators === null || trustedValidators === void 0 ? void 0 : trustedValidators.toProto()) || undefined,
        });
    };
    Header.prototype.packAny = function () {
        return any_1.Any.fromPartial({
            typeUrl: 'ibc.lightclients.tendermint.v1.Header',
            value: tendermint_1.Header.encode(this.toProto()).finish(),
        });
    };
    Header.unpackAny = function (msgAny) {
        return Header.fromProto(tendermint_1.Header.decode(msgAny.value));
    };
    return Header;
}(json_1.JSONSerializable));
exports.Header = Header;
//# sourceMappingURL=Header.js.map
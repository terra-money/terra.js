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
exports.CommunityPoolSpendProposal = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var distribution_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/distribution");
/**
 * Proposal that disburses funds from the Distribution module's community pool to the
 * specified recipient if passed.
 */
var CommunityPoolSpendProposal = /** @class */ (function (_super) {
    __extends(CommunityPoolSpendProposal, _super);
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param recipient recipient address
     * @param amount amount to give recipient
     */
    function CommunityPoolSpendProposal(title, description, recipient, amount) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.recipient = recipient;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    CommunityPoolSpendProposal.fromAmino = function (data, _) {
        _;
        var _a = data.value, title = _a.title, description = _a.description, recipient = _a.recipient, amount = _a.amount;
        return new CommunityPoolSpendProposal(title, description, recipient, Coins_1.Coins.fromAmino(amount));
    };
    CommunityPoolSpendProposal.prototype.toAmino = function (isClassic) {
        var _a = this, title = _a.title, description = _a.description, recipient = _a.recipient, amount = _a.amount;
        return {
            type: isClassic
                ? 'distribution/CommunityPoolSpendProposal'
                : 'cosmos-sdk/CommunityPoolSpendProposal',
            value: {
                title: title,
                description: description,
                recipient: recipient,
                amount: amount.toAmino(),
            },
        };
    };
    CommunityPoolSpendProposal.fromData = function (data, _) {
        _;
        var title = data.title, description = data.description, recipient = data.recipient, amount = data.amount;
        return new CommunityPoolSpendProposal(title, description, recipient, Coins_1.Coins.fromData(amount));
    };
    CommunityPoolSpendProposal.prototype.toData = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, recipient = _a.recipient, amount = _a.amount;
        return {
            '@type': '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
            title: title,
            description: description,
            recipient: recipient,
            amount: amount.toData(),
        };
    };
    CommunityPoolSpendProposal.fromProto = function (proto, _) {
        _;
        return new CommunityPoolSpendProposal(proto.title, proto.description, proto.recipient, Coins_1.Coins.fromProto(proto.amount));
    };
    CommunityPoolSpendProposal.prototype.toProto = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, recipient = _a.recipient, amount = _a.amount;
        return distribution_1.CommunityPoolSpendProposal.fromPartial({
            amount: amount.toProto(),
            description: description,
            recipient: recipient,
            title: title,
        });
    };
    CommunityPoolSpendProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
            value: distribution_1.CommunityPoolSpendProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    CommunityPoolSpendProposal.unpackAny = function (msgAny, isClassic) {
        return CommunityPoolSpendProposal.fromProto(distribution_1.CommunityPoolSpendProposal.decode(msgAny.value), isClassic);
    };
    return CommunityPoolSpendProposal;
}(json_1.JSONSerializable));
exports.CommunityPoolSpendProposal = CommunityPoolSpendProposal;
//# sourceMappingURL=CommunityPoolSpendProposal.js.map
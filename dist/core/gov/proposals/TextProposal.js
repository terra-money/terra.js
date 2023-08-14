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
exports.TextProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
var TextProposal = /** @class */ (function (_super) {
    __extends(TextProposal, _super);
    /**
     * @param title proposal's title
     * @param description proposal's description
     */
    function TextProposal(title, description) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        return _this;
    }
    TextProposal.fromAmino = function (data, _) {
        _;
        var _a = data.value, title = _a.title, description = _a.description;
        return new TextProposal(title, description);
    };
    TextProposal.prototype.toAmino = function (isClassic) {
        var _a = this, title = _a.title, description = _a.description;
        return {
            type: isClassic ? 'gov/TextProposal' : 'cosmos-sdk/TextProposal',
            value: {
                title: title,
                description: description,
            },
        };
    };
    TextProposal.fromData = function (proto, _) {
        _;
        var title = proto.title, description = proto.description;
        return new TextProposal(title, description);
    };
    TextProposal.prototype.toData = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description;
        return {
            '@type': '/cosmos.gov.v1beta1.TextProposal',
            title: title,
            description: description,
        };
    };
    TextProposal.fromProto = function (proto, _) {
        _;
        return new TextProposal(proto.title, proto.description);
    };
    TextProposal.prototype.toProto = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description;
        return gov_1.TextProposal.fromPartial({
            description: description,
            title: title,
        });
    };
    TextProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.TextProposal',
            value: gov_1.TextProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    TextProposal.unpackAny = function (msgAny, isClassic) {
        return TextProposal.fromProto(gov_1.TextProposal.decode(msgAny.value), isClassic);
    };
    return TextProposal;
}(json_1.JSONSerializable));
exports.TextProposal = TextProposal;
//# sourceMappingURL=TextProposal.js.map
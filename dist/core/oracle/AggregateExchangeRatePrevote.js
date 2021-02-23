"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateExchangeRatePrevote = void 0;
var json_1 = require("../../util/json");
/**
 * Stores information about data about Oracle aggregate prevotes fetched from the blockchain.
 */
var AggregateExchangeRatePrevote = /** @class */ (function (_super) {
    __extends(AggregateExchangeRatePrevote, _super);
    /**
     * @param hash aggregate vote hash
     * @param voter validator
     * @param submit_block block during which aggregate prevote was submitted
     */
    function AggregateExchangeRatePrevote(hash, voter, submit_block) {
        var _this = _super.call(this) || this;
        _this.hash = hash;
        _this.voter = voter;
        _this.submit_block = submit_block;
        return _this;
    }
    AggregateExchangeRatePrevote.fromData = function (data) {
        var hash = data.hash, voter = data.voter, submit_block = data.submit_block;
        return new AggregateExchangeRatePrevote(hash, voter, Number.parseInt(submit_block));
    };
    AggregateExchangeRatePrevote.prototype.toData = function () {
        var _a = this, hash = _a.hash, voter = _a.voter, submit_block = _a.submit_block;
        return {
            hash: hash,
            voter: voter,
            submit_block: submit_block.toFixed(),
        };
    };
    return AggregateExchangeRatePrevote;
}(json_1.JSONSerializable));
exports.AggregateExchangeRatePrevote = AggregateExchangeRatePrevote;
//# sourceMappingURL=AggregateExchangeRatePrevote.js.map
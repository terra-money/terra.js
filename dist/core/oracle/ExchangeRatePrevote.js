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
exports.ExchangeRatePrevote = void 0;
var json_1 = require("../../util/json");
/**
 * Stores information about data about Oracle prevotes fetched from the blockchain.
 */
var ExchangeRatePrevote = /** @class */ (function (_super) {
    __extends(ExchangeRatePrevote, _super);
    /**
     *
     * @param hash vote hash.
     * @param denom denomination against LUNA reported
     * @param voter voting validator's operator address
     * @param submit_block height of block during which prevote was submitted
     */
    function ExchangeRatePrevote(hash, denom, voter, submit_block) {
        var _this = _super.call(this) || this;
        _this.hash = hash;
        _this.denom = denom;
        _this.voter = voter;
        _this.submit_block = submit_block;
        return _this;
    }
    ExchangeRatePrevote.fromData = function (data) {
        var hash = data.hash, denom = data.denom, voter = data.voter, submit_block = data.submit_block;
        return new ExchangeRatePrevote(hash, denom, voter, Number.parseInt(submit_block));
    };
    ExchangeRatePrevote.prototype.toData = function () {
        var _a = this, hash = _a.hash, denom = _a.denom, voter = _a.voter;
        return {
            hash: hash,
            denom: denom,
            voter: voter,
            submit_block: this.submit_block.toFixed(),
        };
    };
    return ExchangeRatePrevote;
}(json_1.JSONSerializable));
exports.ExchangeRatePrevote = ExchangeRatePrevote;
//# sourceMappingURL=ExchangeRatePrevote.js.map
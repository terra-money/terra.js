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
exports.TaxRateUpdateProposal = void 0;
var json_1 = require("../../../util/json");
var numeric_1 = require("../../numeric");
/**
 * A proposal for a direct and immediate change to the treasury's tax rate state, which
 * governs transaction fees. If passed, the new tax rate is put into effect immediately,
 * after clamping.
 */
var TaxRateUpdateProposal = /** @class */ (function (_super) {
    __extends(TaxRateUpdateProposal, _super);
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param tax_rate new proposed value for tax rate.
     */
    function TaxRateUpdateProposal(title, description, tax_rate) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.tax_rate = tax_rate;
        return _this;
    }
    TaxRateUpdateProposal.fromData = function (data) {
        var _a = data.value, title = _a.title, description = _a.description, tax_rate = _a.tax_rate;
        return new TaxRateUpdateProposal(title, description, new numeric_1.Dec(tax_rate));
    };
    TaxRateUpdateProposal.prototype.toData = function () {
        var _a = this, title = _a.title, description = _a.description, tax_rate = _a.tax_rate;
        return {
            type: 'treasury/TaxRateUpdateProposal',
            value: {
                title: title,
                description: description,
                tax_rate: tax_rate.toString(),
            },
        };
    };
    return TaxRateUpdateProposal;
}(json_1.JSONSerializable));
exports.TaxRateUpdateProposal = TaxRateUpdateProposal;
//# sourceMappingURL=TaxRateUpdateProposal.js.map
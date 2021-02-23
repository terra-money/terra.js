"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamChanges = void 0;
var params_1 = require("../distribution/params");
var params_2 = require("../gov/params");
var params_3 = require("../market/params");
var params_4 = require("../oracle/params");
var params_5 = require("../slashing/params");
var params_6 = require("../staking/params");
var params_7 = require("../treasury/params");
var params_8 = require("../wasm/params");
var params_9 = require("../mint/params");
var ParamChanges;
(function (ParamChanges) {
    ParamChanges.ConversionTable = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, params_1.DistributionParamChanges.ConversionTable), params_2.GovParamChanges.ConversionTable), params_3.MarketParamChanges.ConversionTable), params_4.OracleParamChanges.ConversionTable), params_5.SlashingParamChanges.ConversionTable), params_6.StakingParamChanges.ConversionTable), params_7.TreasuryParamChanges.ConversionTable), params_8.WasmParamChanges.ConversionTable), params_9.MintParamChanges.ConversionTable);
    function fromData(data) {
        var result = {};
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var pc = data_1[_i];
            if (result[pc.subspace] === undefined) {
                result[pc.subspace] = {};
            }
            // @ts-ignore
            var converter = ParamChanges.ConversionTable[pc.subspace][pc.key][0];
            // @ts-ignore
            result[pc.subspace][pc.key] = converter(JSON.parse(pc.value));
        }
        return result;
    }
    ParamChanges.fromData = fromData;
    function toData(pc) {
        var result = [];
        for (var _i = 0, _a = Object.keys(pc); _i < _a.length; _i++) {
            var subspace = _a[_i];
            // @ts-ignore
            for (var _b = 0, _c = Object.keys(pc[subspace]); _b < _c.length; _b++) {
                var key = _c[_b];
                // @ts-ignore
                var serializer = ParamChanges.ConversionTable[subspace][key][1];
                result.push({
                    // @ts-ignore
                    subspace: subspace,
                    // @ts-ignore
                    key: key,
                    // @ts-ignore
                    value: JSON.stringify(serializer(pc[subspace][key])),
                });
            }
        }
        return result;
    }
    ParamChanges.toData = toData;
})(ParamChanges = exports.ParamChanges || (exports.ParamChanges = {}));
//# sourceMappingURL=ParamChange.js.map
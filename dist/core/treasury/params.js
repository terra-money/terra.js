"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasuryParamChanges = void 0;
var convert_1 = require("../../util/convert");
var TreasuryParamChanges;
(function (TreasuryParamChanges) {
    TreasuryParamChanges.ConversionTable = {
        treasury: {
            taxpolicy: [convert_1.Convert.toPolicyConstraints, convert_1.Convert.toData],
            rewardpolicy: [convert_1.Convert.toPolicyConstraints, convert_1.Convert.toData],
            seigniorageburdentarget: [convert_1.Convert.toDec, convert_1.Convert.toString],
            miningincrement: [convert_1.Convert.toDec, convert_1.Convert.toString],
            windowshort: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            windowlong: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            windowprobation: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
        },
    };
})(TreasuryParamChanges = exports.TreasuryParamChanges || (exports.TreasuryParamChanges = {}));
//# sourceMappingURL=params.js.map
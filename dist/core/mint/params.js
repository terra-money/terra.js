"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintParamChanges = void 0;
var convert_1 = require("../../util/convert");
var MintParamChanges;
(function (MintParamChanges) {
    MintParamChanges.ConversionTable = {
        mint: {
            MintDenom: [convert_1.Convert.id, convert_1.Convert.id],
            InflationRateChange: [convert_1.Convert.toDec, convert_1.Convert.toString],
            InflationMax: [convert_1.Convert.toDec, convert_1.Convert.toString],
            InflationMin: [convert_1.Convert.toDec, convert_1.Convert.toString],
            GoalBonded: [convert_1.Convert.toDec, convert_1.Convert.toString],
            BlocksPerYear: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
        },
    };
})(MintParamChanges = exports.MintParamChanges || (exports.MintParamChanges = {}));
//# sourceMappingURL=params.js.map
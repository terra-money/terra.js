"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleParamChanges = void 0;
var convert_1 = require("../../util/convert");
var OracleParamChanges;
(function (OracleParamChanges) {
    OracleParamChanges.ConversionTable = {
        oracle: {
            voteperiod: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            votethreshold: [convert_1.Convert.toDec, convert_1.Convert.toString],
            rewardband: [convert_1.Convert.toDec, convert_1.Convert.toString],
            rewarddistributionwindow: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            whitelist: [convert_1.Convert.toOracleWhitelist, convert_1.Convert.serializeOracleWhitelist],
            slashfraction: [convert_1.Convert.toDec, convert_1.Convert.toString],
            slashwindow: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            minvalidperwindow: [convert_1.Convert.toDec, convert_1.Convert.toString],
        },
    };
})(OracleParamChanges = exports.OracleParamChanges || (exports.OracleParamChanges = {}));
//# sourceMappingURL=params.js.map
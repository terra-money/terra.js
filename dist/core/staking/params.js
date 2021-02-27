"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingParamChanges = void 0;
var convert_1 = require("../../util/convert");
var StakingParamChanges;
(function (StakingParamChanges) {
    StakingParamChanges.ConversionTable = {
        staking: {
            UnbondingTime: [convert_1.Convert.toNumber, convert_1.Convert.toFixed],
            MaxValidators: [convert_1.Convert.toNumber, convert_1.Convert.toNumber],
            KeyMaxEntries: [convert_1.Convert.toNumber, convert_1.Convert.toNumber],
            BondDenom: [convert_1.Convert.id, convert_1.Convert.id],
        },
    };
})(StakingParamChanges = exports.StakingParamChanges || (exports.StakingParamChanges = {}));
//# sourceMappingURL=params.js.map
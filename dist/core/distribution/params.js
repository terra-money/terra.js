"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributionParamChanges = void 0;
var convert_1 = require("../../util/convert");
var DistributionParamChanges;
(function (DistributionParamChanges) {
    DistributionParamChanges.ConversionTable = {
        distribution: {
            communitytax: [convert_1.Convert.toDec, convert_1.Convert.toString],
            baseproposerreward: [convert_1.Convert.toDec, convert_1.Convert.toString],
            bonusproposerreward: [convert_1.Convert.toDec, convert_1.Convert.toString],
            withdrawaddrenabled: [convert_1.Convert.id, convert_1.Convert.id],
        },
    };
})(DistributionParamChanges = exports.DistributionParamChanges || (exports.DistributionParamChanges = {}));
//# sourceMappingURL=params.js.map
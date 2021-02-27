"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovParamChanges = void 0;
var convert_1 = require("../../util/convert");
var GovParamChanges;
(function (GovParamChanges) {
    GovParamChanges.ConversionTable = {
        gov: {
            depositparams: [convert_1.Convert.toDepositParams, convert_1.Convert.serializeDepositParams],
            votingparams: [convert_1.Convert.toVotingParams, convert_1.Convert.serializeVotingParams],
            tallyparams: [convert_1.Convert.toTallyParams, convert_1.Convert.serializeTallyParams],
        },
    };
})(GovParamChanges = exports.GovParamChanges || (exports.GovParamChanges = {}));
//# sourceMappingURL=params.js.map
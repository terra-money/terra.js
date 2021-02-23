"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
var core_1 = require("../core");
var PolicyConstraints_1 = require("../core/treasury/PolicyConstraints");
var core_2 = require("../core");
var Convert;
(function (Convert) {
    Convert.id = function (c) { return c; };
    Convert.toDec = function (c) { return new core_2.Dec(c); };
    Convert.toString = function (c) { return c.toString(); };
    Convert.toFixed = function (c) { return c.toFixed(); };
    Convert.toNumber = Number.parseInt;
    Convert.toOracleWhitelist = function (c) {
        return c.map(function (v) { return ({
            name: v.name,
            tobin_tax: new core_2.Dec(v.tobin_tax),
        }); });
    };
    Convert.toVotingParams = function (c) { return ({
        voting_period: Number.parseInt(c.voting_period),
    }); };
    Convert.toDepositParams = function (c) { return ({
        min_deposit: core_1.Coins.fromData(c.min_deposit),
        max_deposit_period: Number.parseInt(c.max_deposit_period),
    }); };
    Convert.toTallyParams = function (c) { return ({
        quorum: new core_2.Dec(c.quorum),
        threshold: new core_2.Dec(c.threshold),
        veto: new core_2.Dec(c.veto),
    }); };
    Convert.toPolicyConstraints = PolicyConstraints_1.PolicyConstraints.fromData;
    Convert.toData = function (c) { return c.toData(); };
    Convert.serializeDepositParams = function (c) { return ({
        min_deposit: c.min_deposit.toData(),
        max_deposit_period: c.max_deposit_period.toFixed(),
    }); };
    Convert.serializeVotingParams = function (c) { return ({
        voting_period: c.voting_period.toFixed(),
    }); };
    Convert.serializeTallyParams = function (c) { return ({
        quorum: c.quorum.toString(),
        threshold: c.threshold.toString(),
        veto: c.veto.toString(),
    }); };
    Convert.serializeOracleWhitelist = function (c) {
        return c.map(function (v) { return ({
            name: v.name,
            tobin_tax: v.tobin_tax.toString(),
        }); });
    };
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=convert.js.map
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
exports.LCDClient = void 0;
var APIRequester_1 = require("./APIRequester");
var api_1 = require("./api");
var LCDUtils_1 = require("./LCDUtils");
var Wallet_1 = require("./Wallet");
var DEFAULT_LCD_OPTIONS = {
    gasAdjustment: 1.75,
};
// isClassic network: true
// forked network : false
var DEFAULT_NETWORK_TYPE_BY_CHAIN_ID = {
    default: false,
    'columbus-5': true,
    'bombay-12': true,
    'pisco-1': false,
};
var DEFAULT_GAS_PRICES_BY_CHAIN_ID = {
    default: {
        uluna: 0.15,
    },
    'columbus-5': {
        uusd: 0.15,
    },
    'bombay-12': {
        uusd: 0.15,
    },
    'pisco-1': {
        uluna: 0.15,
    },
};
/**
 * An object repesenting a connection to a terrad node running the Lite Client Daemon (LCD)
 * server, a REST server providing access to a node.
 *
 * ### Example
 *
 * ```ts
 * import { LCDClient, Coin } from 'terra.js';
 *
 * const terra = new LCDClient({
 *    URL: "https://lcd.terra.dev",
 *    chainID: "columbus-3"
 * });
 *
 * terra.market.swapRate(new Coin('uluna', 10000), 'ukrw').then(c => console.log(c.toString()));
 * ```
 */
var LCDClient = /** @class */ (function () {
    /**
     * Creates a new LCD client with the specified configuration.
     *
     * @param config LCD configuration
     */
    function LCDClient(config) {
        this.config = __assign(__assign(__assign({}, DEFAULT_LCD_OPTIONS), { gasPrices: DEFAULT_GAS_PRICES_BY_CHAIN_ID[config.chainID] ||
                DEFAULT_GAS_PRICES_BY_CHAIN_ID['default'], isClassic: DEFAULT_NETWORK_TYPE_BY_CHAIN_ID[config.chainID] ||
                DEFAULT_NETWORK_TYPE_BY_CHAIN_ID['default'] }), config);
        this.apiRequester = new APIRequester_1.APIRequester(this.config.URL);
        // instantiate APIs
        this.auth = new api_1.AuthAPI(this);
        this.bank = new api_1.BankAPI(this);
        this.distribution = new api_1.DistributionAPI(this);
        this.feeGrant = new api_1.FeeGrantAPI(this);
        this.gov = new api_1.GovAPI(this);
        this.market = new api_1.MarketAPI(this);
        this.mint = new api_1.MintAPI(this);
        this.authz = new api_1.AuthzAPI(this);
        this.oracle = new api_1.OracleAPI(this);
        this.slashing = new api_1.SlashingAPI(this);
        this.staking = new api_1.StakingAPI(this);
        this.tendermint = new api_1.TendermintAPI(this);
        this.treasury = new api_1.TreasuryAPI(this);
        this.wasm = new api_1.WasmAPI(this);
        this.ibc = new api_1.IbcAPI(this);
        this.ibcTransfer = new api_1.IbcTransferAPI(this);
        this.tx = new api_1.TxAPI(this);
        this.utils = new LCDUtils_1.LCDUtils(this);
    }
    /** Creates a new wallet with the Key. */
    LCDClient.prototype.wallet = function (key) {
        return new Wallet_1.Wallet(this, key);
    };
    return LCDClient;
}());
exports.LCDClient = LCDClient;
//# sourceMappingURL=LCDClient.js.map
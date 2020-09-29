import { APIRequester } from './APIRequester';
import {
  AuthAPI,
  BankAPI,
  DistributionAPI,
  GovAPI,
  MarketAPI,
  MsgAuthAPI,
  OracleAPI,
  SlashingAPI,
  StakingAPI,
  SupplyAPI,
  TendermintAPI,
  TreasuryAPI,
  TxAPI,
  WasmAPI,
} from './api';
import { Wallet } from './Wallet';
import { Numeric, Coins } from '../../core';
import { Key } from '../../key';

export interface LCDClientConfig {
  /**
   * The base URL to which LCD requests will be made.
   */
  URL: string;

  /**
   * Chain ID of the blockchain to connect to.
   */
  chainID: string;

  /**
   * Coins representing the default gas prices to use for fee estimation.
   */
  gasPrices?: Coins.Input;

  /**
   * Number presenting the default gas adjustment value to use for fee estimation.
   */
  gasAdjustment?: Numeric.Input;
}

const DEFAULT_LCD_OPTIONS: Partial<LCDClientConfig> = {
  gasAdjustment: 1.4,
};

const DEFAULT_GAS_PRICES_BY_CHAIN_ID: { [key: string]: Coins.Input } = {
  default: {
    uluna: 0.00506,
    uusd: 0.0015,
    usdr: 0.00102,
    ukrw: 1.7805,
    umnt: 4.31626,
  },
  'columbus-3': {
    uluna: 0.015,
    uusd: 0.015,
    usdr: 0.015,
    ukrw: 0.015,
    umnt: 0.015,
  },
  'tequila-0004': {
    uluna: 0.15,
    uusd: 0.15,
    usdr: 0.1018,
    ukrw: 178.05,
    umnt: 431.6259,
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

export class LCDClient {
  public config: LCDClientConfig;
  public apiRequester: APIRequester;

  // API access
  public auth: AuthAPI;
  public bank: BankAPI;
  public distribution: DistributionAPI;
  public gov: GovAPI;
  public market: MarketAPI;
  public msgauth: MsgAuthAPI;
  public oracle: OracleAPI;
  public slashing: SlashingAPI;
  public staking: StakingAPI;
  public supply: SupplyAPI;
  public tendermint: TendermintAPI;
  public treasury: TreasuryAPI;
  public wasm: WasmAPI;
  public tx: TxAPI;

  /**
   * Creates a new LCD client with the specified configuration.
   *
   * @param config LCD configuration
   */
  constructor(config: LCDClientConfig) {
    this.config = {
      ...DEFAULT_LCD_OPTIONS,
      gasPrices:
        DEFAULT_GAS_PRICES_BY_CHAIN_ID[config.chainID] ||
        DEFAULT_GAS_PRICES_BY_CHAIN_ID['default'],
      ...config,
    };

    this.apiRequester = new APIRequester(this.config.URL);

    // instantiate APIs
    this.auth = new AuthAPI(this.apiRequester);
    this.bank = new BankAPI(this.apiRequester);
    this.distribution = new DistributionAPI(this.apiRequester);
    this.gov = new GovAPI(this.apiRequester);
    this.market = new MarketAPI(this.apiRequester);
    this.msgauth = new MsgAuthAPI(this.apiRequester);
    this.oracle = new OracleAPI(this.apiRequester);
    this.slashing = new SlashingAPI(this.apiRequester);
    this.staking = new StakingAPI(this.apiRequester);
    this.supply = new SupplyAPI(this.apiRequester);
    this.tendermint = new TendermintAPI(this.apiRequester);
    this.treasury = new TreasuryAPI(this.apiRequester);
    this.wasm = new WasmAPI(this.apiRequester);
    this.tx = new TxAPI(this);
  }

  /** Creates a new wallet with the Key. */
  public wallet(key: Key): Wallet {
    return new Wallet(this, key);
  }
}

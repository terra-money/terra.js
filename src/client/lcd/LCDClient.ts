import { APIRequester } from './APIRequester';
import {
  AuthAPI,
  BankAPI,
  DistributionAPI,
  GovAPI,
  MarketAPI,
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
  gasPrices: { uluna: 0.015 },
  gasAdjustment: 1.4,
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
  public oracle: OracleAPI;
  public slashing: SlashingAPI;
  public staking: StakingAPI;
  public supply: SupplyAPI;
  public tendermint: TendermintAPI;
  public treasury: TreasuryAPI;
  public tx: TxAPI;

  /**
   * Creates a new LCD client with the specified configuration.
   *
   * @param config LCD configuration
   */
  constructor(config: LCDClientConfig) {
    this.config = {
      ...DEFAULT_LCD_OPTIONS,
      ...config,
    };

    this.apiRequester = new APIRequester(this.config.URL);

    // instantiate APIs
    this.auth = new AuthAPI(this.apiRequester);
    this.bank = new BankAPI(this.apiRequester);
    this.distribution = new DistributionAPI(this.apiRequester);
    this.gov = new GovAPI(this.apiRequester);
    this.market = new MarketAPI(this.apiRequester);
    this.oracle = new OracleAPI(this.apiRequester);
    this.slashing = new SlashingAPI(this.apiRequester);
    this.staking = new StakingAPI(this.apiRequester);
    this.supply = new SupplyAPI(this.apiRequester);
    this.tendermint = new TendermintAPI(this.apiRequester);
    this.treasury = new TreasuryAPI(this.apiRequester);
    this.tx = new TxAPI(this);
    this.wasm = new WasmAPI(this);
  }

  /** Creates a new wallet with the Key. */
  public wallet(key: Key): Wallet {
    return new Wallet(this, key);
  }
}

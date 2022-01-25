import { APIRequester } from './APIRequester';
import {
  AuthAPI,
  BankAPI,
  DistributionAPI,
  FeeGrantAPI,
  GovAPI,
  MarketAPI,
  MintAPI,
  AuthzAPI,
  OracleAPI,
  SlashingAPI,
  StakingAPI,
  TendermintAPI,
  TreasuryAPI,
  TxAPI,
  WasmAPI,
  IbcTransferAPI,
} from './api';
import { LCDUtils } from './LCDUtils';
import { Wallet } from './Wallet';
import { Numeric } from '../../core/numeric';
import { Coins } from '../../core/Coins';
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
  gasAdjustment: 1.75,
};

const DEFAULT_GAS_PRICES_BY_CHAIN_ID: { [key: string]: Coins.Input } = {
  default: {
    uusd: 0.15,
  },
  'columbus-5': {
    uusd: 0.15,
  },
  'bombay-12': {
    uusd: 0.15,
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
  public feeGrant: FeeGrantAPI;
  public gov: GovAPI;
  public market: MarketAPI;
  public mint: MintAPI;
  public authz: AuthzAPI;
  public oracle: OracleAPI;
  public slashing: SlashingAPI;
  public staking: StakingAPI;
  public tendermint: TendermintAPI;
  public treasury: TreasuryAPI;
  public wasm: WasmAPI;
  public tx: TxAPI;
  public ibcTransfer: IbcTransferAPI;
  public utils: LCDUtils;

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
    this.feeGrant = new FeeGrantAPI(this.apiRequester);
    this.gov = new GovAPI(this.apiRequester);
    this.market = new MarketAPI(this.apiRequester);
    this.mint = new MintAPI(this.apiRequester);
    this.authz = new AuthzAPI(this.apiRequester);
    this.oracle = new OracleAPI(this.apiRequester);
    this.slashing = new SlashingAPI(this.apiRequester);
    this.staking = new StakingAPI(this.apiRequester);
    this.tendermint = new TendermintAPI(this.apiRequester);
    this.treasury = new TreasuryAPI(this.apiRequester);
    this.wasm = new WasmAPI(this.apiRequester);
    this.ibcTransfer = new IbcTransferAPI(this.apiRequester);
    this.tx = new TxAPI(this);

    this.utils = new LCDUtils(this);
  }

  /** Creates a new wallet with the Key. */
  public wallet(key: Key): Wallet {
    return new Wallet(this, key);
  }
}

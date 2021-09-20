import { LCDClient } from '../src';

async function main() {
  const bombay = new LCDClient({
    chainID: 'localterra',
    URL: 'http://localhost:1317',
    gasPrices: { uusd: 0.38 },
  });

  console.log(
    `Txs Page 1: ${JSON.stringify(
      (
        await bombay.tx.search({
          events: [{ key: 'tx.height', value: '12' }],
          'pagination.limit': '50',
        })
      ).txs.map(tx => tx)
    )}`
  );
}
main().catch(console.error);

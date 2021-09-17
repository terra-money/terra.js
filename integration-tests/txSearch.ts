import { LCDClient } from '../src';

async function main() {
  const bombay = new LCDClient({
    chainID: 'bombay-10',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices: { uusd: 0.38 },
  });

  console.log(
    `Txs Page 1: ${JSON.stringify(
      (
        await bombay.tx.search({
          events: [{ key: 'tx.height', value: '5403875' }],
          'pagination.limit': '50',
        })
      ).txs.map(tx => tx.txhash)
    )}`
  );

  console.log(
    `Txs Page 2: ${JSON.stringify(
      (
        await bombay.tx.search({
          events: [{ key: 'tx.height', value: '5403875' }],
          'pagination.limit': '50',
          'pagination.offset': '50',
        })
      ).txs.map(tx => tx.txhash)
    )}`
  );
}

main().catch(console.error);

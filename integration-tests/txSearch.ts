import { LCDClient } from '../src';

async function main() {
  const terra = new LCDClient({
    chainID: 'localterra',
    URL: 'http://localhost:1317',
    gasPrices: { uusd: 0.38 },
  });

  console.log(
    `Txs Page 1: ${JSON.stringify(
      (
        await terra.tx.search({
          events: [{ key: 'tx.height', value: '8343' },
			  {key:'message.sender', value:'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38p'}],
          'pagination.limit': '100',
        })
      ).txs.map(tx => tx.txhash)
    )}`
  );

  console.log(
    `Txs Page 2: ${JSON.stringify(
      (
        await terra.tx.search({
          events: [{ key: 'tx.height', value: '8345' }],
          'pagination.limit': '50',
          'pagination.offset': '1',
        })
      ).txs.map(tx => tx.txhash)
    )}`
  );
}

main().catch(console.error);

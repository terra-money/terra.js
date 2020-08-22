import { TxInfo } from './TxInfo';
const data = require('./TxInfo.data.json');

describe('TxInfo', () => {
  it('deserializes', () => {
    data.txs.forEach((txInfo: TxInfo.Data) => {
      expect(txInfo).toMatchObject(TxInfo.fromData(txInfo).toData());
    });
  });
});

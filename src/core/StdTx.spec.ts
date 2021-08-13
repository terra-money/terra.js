import { StdTx } from './StdTx';
const StdTxData = require('./StdTx.data.json');

describe('StdTx', () => {
  it('deserializes', () => {
    StdTxData.forEach((tx: any) => {
      expect(tx).toMatchObject(StdTx.fromData(tx).toData());
    });
  });
});

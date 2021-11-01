import { APIRequester } from '../APIRequester';
import { TendermintAPI } from './TendermintAPI';
import { Tx } from '../../../core/Tx';
import { Tx as Tx_pb } from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const tendermint = new TendermintAPI(c);

describe('TendermintAPI', () => {
  it('load block and decode txs', async () => {
    const blockInfo = await tendermint.blockInfo(6389857);
    if (blockInfo.block.data.txs != null) {
      blockInfo.block.data.txs.every(txBytes => {
        const txProto = Tx_pb.decode(Buffer.from(txBytes, 'base64'));
        expect(Tx.fromProto(txProto)).toBeDefined();
      });
    }
  });
});

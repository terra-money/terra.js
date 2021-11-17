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

  it('node info', async () => {
    await expect(tendermint.nodeInfo()).resolves.toBeInstanceOf(Object);
  });

  it('syncing', async () => {
    await expect(tendermint.syncing()).resolves;
  });

  it('validator set (latest)', async () => {
    const vals = await tendermint.validatorSet();

    expect(vals[0]).toContainEqual({
      address: expect.any(String),
      pub_key: {
        '@type': expect.any(String),
        key: expect.any(String),
      },
      proposer_priority: expect.any(String),
      voting_power: expect.any(String),
    });
  });

  it('validator set (5900001)', async () => {
    const vals = await tendermint.validatorSet(5900001);

    expect(vals[0]).toContainEqual({
      address: expect.any(String),
      pub_key: {
        '@type': expect.any(String),
        key: expect.any(String),
      },
      proposer_priority: expect.any(String),
      voting_power: expect.any(String),
    });
  });

  it('block info', async () => {
    const block = await tendermint.blockInfo();

    expect(block).toMatchObject({
      block_id: expect.any(Object),
      block: expect.any(Object),
    });
  });
});

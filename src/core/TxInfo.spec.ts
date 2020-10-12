import { assert } from 'console';
import { TxInfo } from './TxInfo';
const data = require('./TxInfo.data.json');

const instantiateContractTxData = {
  height: '301435',
  txhash: '69CA62F1328A3FBC810A3E370A186BC2A5FAED2739848CA3336580DD17C58F7E',
  raw_log:
    '[{"msg_index":0,"log":"","events":[{"type":"instantiate_contract","attributes":[{"key":"owner","value":"terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3"},{"key":"code_id","value":"118"},{"key":"contract_address","value":"terra1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s"}]},{"type":"message","attributes":[{"key":"action","value":"instantiate_contract"},{"key":"module","value":"wasm"}]}]}]',
  logs: [
    {
      msg_index: 0,
      log: '',
      events: [
        {
          type: 'instantiate_contract',
          attributes: [
            {
              key: 'owner',
              value: 'terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
            },
            {
              key: 'code_id',
              value: '118',
            },
            {
              key: 'contract_address',
              value: 'terra1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s',
            },
          ],
        },
        {
          type: 'message',
          attributes: [
            {
              key: 'action',
              value: 'instantiate_contract',
            },
            {
              key: 'module',
              value: 'wasm',
            },
          ],
        },
      ],
    },
  ],
  gas_wanted: '136830',
  gas_used: '113019',
  tx: {
    type: 'core/StdTx',
    value: {
      msg: [
        {
          type: 'wasm/MsgInstantiateContract',
          value: {
            owner: 'terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
            code_id: '118',
            init_msg:
              'eyJmZWUiOnsiZGVub20iOiJ1bHVuYSIsImFtb3VudCI6IjEwMCJ9fQ==',
            init_coins: [],
            migratable: false,
          },
        },
      ],
      fee: {
        amount: [
          {
            denom: 'uluna',
            amount: '20525',
          },
        ],
        gas: '136830',
      },
      signatures: [
        {
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: 'A5NuEwpsm7e/WbVT46IUx1MHhgAr4sBVjNymm8jfldoi',
          },
          signature:
            '7vqw1gAhQ9O9pXVXKIVwtw0O6wPnvWnLT2ATrUkXIDlUN2VJVdzKF5QpDdsvJIWQlz15JhfeHyFlyINiudP3Bg==',
        },
      ],
      memo: '',
    },
  },
  timestamp: '2020-09-23T13:17:22Z',
};

describe('TxInfo', () => {
  it('deserializes', () => {
    data.txs.forEach((txInfo: TxInfo.Data) => {
      expect(txInfo).toMatchObject(TxInfo.fromData(txInfo).toData());
    });
  });

  it('parses events correctly', () => {
    const tx = TxInfo.fromData(instantiateContractTxData as TxInfo.Data);

    if (!tx.logs) {
      throw new Error('logs undefined');
    }

    const {
      message: { action, module },
      instantiate_contract: { owner, code_id, contract_address },
    } = tx.logs[0].eventsByType;

    expect({
      action: action[0],
      module: module[0],
      owner: owner[0],
      code_id: code_id[0],
      contract_address: contract_address[0],
    }).toMatchObject({
      action: 'instantiate_contract',
      module: 'wasm',
      owner: 'terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
      code_id: '118',
      contract_address: 'terra1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s',
    });
  });
});

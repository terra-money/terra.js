import { MsgExecuteContract } from './MsgExecuteContract';

describe('MsgExecuteContract', () => {
  it('works when execute_msg is not JSON', () => {
    const msg1 = MsgExecuteContract.fromData({
      type: 'wasm/MsgExecuteContract',
      value: {
        sender: 'terra16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
        contract: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
        execute_msg:
          'eyJ0cmFuc2ZlciI6eyJyZWNpcGllbnQiOnRlcnJhMTNqcWdydHF3dWN4NGpkdmhnMGQ0dGM4MDg5MmZzY3g1NDI5OHl0LCJhbW91bnQiOjEwMDAwfX0=',
        coins: [],
      },
    });

    expect(typeof msg1.execute_msg).toBe('string');
    expect(msg1.execute_msg).toEqual(
      'eyJ0cmFuc2ZlciI6eyJyZWNpcGllbnQiOnRlcnJhMTNqcWdydHF3dWN4NGpkdmhnMGQ0dGM4MDg5MmZzY3g1NDI5OHl0LCJhbW91bnQiOjEwMDAwfX0='
    );
  });
});

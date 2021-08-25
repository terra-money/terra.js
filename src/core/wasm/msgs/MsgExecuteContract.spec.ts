import { MsgExecuteContract } from './MsgExecuteContract';

describe('MsgExecuteContract', () => {
  it('works when execute_msg is not JSON', () => {
    const msg1 = MsgExecuteContract.fromData({
      type: 'wasm/MsgExecuteContract',
      value: {
        sender: 'terra16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
        contract: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
        execute_msg: {
          transfer: {
            recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
            amount: 10000,
          },
        },
        coins: [],
      },
    });

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });

  it('proto', () => {
    const msg1 = MsgExecuteContract.fromProto({
      '@type': '/terra.wasm.v1beta1.MsgExecuteContract',
      sender: 'terra16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
      contract: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
      execute_msg: {
        transfer: {
          recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
          amount: 10000,
        },
      },
      coins: [],
    })

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  })
});

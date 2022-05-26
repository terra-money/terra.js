import { MsgExecuteContract } from './MsgExecuteContract';
import { MsgExecuteContract as MsgExecuteContract_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
import { MsgExecuteContract as MsgExecuteContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

describe('MsgExecuteContract', () => {
  it('legacy: works when execute_msg is not JSON', () => {
    const msg1 = MsgExecuteContract.fromAmino({
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
    }, true);

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });

  it('works when execute_msg is not JSON', () => {
    const msg1 = MsgExecuteContract.fromAmino({
      type: 'wasm/MsgExecuteContract',
      value: {
        sender: 'terra16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
        contract: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
        msg: {
          transfer: {
            recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
            amount: 10000,
          },
        },
        funds: [],
      },
    }, false);

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });

  it('legacy proto', () => {
    const msg1 = MsgExecuteContract.fromData({
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
    }, true);

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });

  it('proto', () => {
    const msg1 = MsgExecuteContract.fromData({
      '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
      sender: 'terra16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
      contract: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
      msg: {
        transfer: {
          recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
          amount: 10000,
        },
      },
      funds: [],
    }, false);

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'terra13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });



  it('legacy: with string msg', () => {
    const msgWithExecuteString = new MsgExecuteContract(
      'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      'execute_msg_as_string',
      { uluna: 120400 }
    );
    const aminoWithExecuteString = msgWithExecuteString.toAmino(true) as MsgExecuteContract.AminoV1;
    expect(aminoWithExecuteString.value.execute_msg).toEqual(
      msgWithExecuteString.execute_msg
    );
    const protoWithExecuteString = msgWithExecuteString.toProto(true) as MsgExecuteContract_legacy_pb;
    expect(protoWithExecuteString.executeMsg.toString()).toEqual(
      JSON.stringify(msgWithExecuteString.execute_msg)
    );
    const dataWithExecuteString = msgWithExecuteString.toData(true) as MsgExecuteContract.DataV1;
    expect(dataWithExecuteString.execute_msg).toEqual(
      msgWithExecuteString.execute_msg
    );
  });

  it('with string msg', () => {
    const msgWithExecuteString = new MsgExecuteContract(
      'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      'execute_msg_as_string',
      { uluna: 120400 }
    );
    const aminoWithExecuteString = msgWithExecuteString.toAmino(false) as MsgExecuteContract.AminoV2;
    expect(aminoWithExecuteString.value.msg).toEqual(
      msgWithExecuteString.execute_msg
    );
    const protoWithExecuteString = msgWithExecuteString.toProto(false) as MsgExecuteContract_pb;
    expect(protoWithExecuteString.msg.toString()).toEqual(
      JSON.stringify(msgWithExecuteString.execute_msg)
    );
    const dataWithExecuteString = msgWithExecuteString.toData(false) as MsgExecuteContract.DataV2;
    expect(dataWithExecuteString.msg).toEqual(
      msgWithExecuteString.execute_msg
    );
  });


});

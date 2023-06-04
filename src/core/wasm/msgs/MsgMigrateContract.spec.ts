import { MsgMigrateContract } from './MsgMigrateContract';
import { MsgMigrateContract as MsgMigrateContract_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

const msgWithAdmin = new MsgMigrateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  2,
  { count: 0 }
);

const msgWithMigrateString = new MsgMigrateContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  2,
  'migrate_msg_as_string'
);

describe('MsgMigrateContract', () => {
  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino(
      false
    ) as MsgMigrateContract.AminoV2;
    expect(aminoWithAdmin.value.sender).toEqual(msgWithAdmin.admin);

    const aminoWithMigrateString = msgWithMigrateString.toAmino(
      false
    ) as MsgMigrateContract.AminoV2;
    expect(aminoWithMigrateString.value.msg).toEqual(
      msgWithMigrateString.migrate_msg
    );
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto(false) as MsgMigrateContract_pb;
    expect(protoWithAdmin.sender).toEqual(msgWithAdmin.admin);

    const protoWithMigrateString = msgWithMigrateString.toProto(
      false
    ) as MsgMigrateContract_pb;
    expect(protoWithMigrateString.msg.toString()).toEqual(
      JSON.stringify(msgWithMigrateString.migrate_msg)
    );
  });

  it('data', () => {
    const dataWithAdmin = msgWithAdmin.toData(
      false
    ) as MsgMigrateContract.DataV2;
    expect(dataWithAdmin.sender).toEqual(msgWithAdmin.admin);

    const dataWithMigrateString = msgWithMigrateString.toData(
      false
    ) as MsgMigrateContract.DataV2;
    expect(dataWithMigrateString.msg).toEqual(msgWithMigrateString.migrate_msg);
  });
});

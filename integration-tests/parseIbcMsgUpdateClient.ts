import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { assert } from 'console';
import { LCDClient, Msg, MsgUpdateClient } from '../src';

async function main() {
  const terra = new LCDClient({
    chainID: 'columbus-5',
    URL: 'https://lcd.terra.dev',
  });
  const originalTx = await terra.tx.txInfo('6aff2666ab32c95b670709f4b1ca57e63f2e72ca656f2d3c4b4fc43f3a54760f');
  const data = MsgUpdateClient.fromData(originalTx.tx.body.messages[0].toData() as MsgUpdateClient.Data).toJSON();
  const proto = MsgUpdateClient.fromProto(originalTx.tx.body.messages[0].toProto() as MsgUpdateClient.Proto).toJSON();
  assert(data === proto, "conversion error")
}

main().catch(console.error);

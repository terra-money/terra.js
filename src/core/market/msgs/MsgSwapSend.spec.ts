import { MsgSwapSend } from './MsgSwapSend';
const MsgSwapSendAmino = require('./MsgSwapSend.data.json');

describe('MsgSwapSend', () => {
    it('deserializes', () => {
        MsgSwapSendAmino.txs.forEach((txinfo: any) => {
            txinfo.tx.value.msg.forEach((msg: any) => {
                if (msg.type == 'market/MsgSwapSend') {
                    const e = MsgSwapSend.fromAmino(msg, true);
                    expect(e.toAmino(true)).toEqual(msg);
                }
            });
        });
    });
});

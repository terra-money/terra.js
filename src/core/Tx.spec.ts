import { Tx } from './Tx';

describe('Tx', () => {
  it('deserializes', () => {
    const txAmino: Tx.Amino = {
      type: 'core/StdTx',
      value: {
        msg: [
          {
            type: 'wasm/MsgExecuteContract',
            value: {
              sender: 'terra15d7zke8yrwvz360es5gr97y8upktm79q6j33de',
              contract: 'terra1a06dgl27rhujjphsn4drl242ufws267qxypptx',
              execute_msg: {
                adjust_premium: {
                  asset_tokens: [
                    'terra15t9afkpj0wnh8m74n8n2f8tspkn7r65vnru45s',
                    'terra1qre9crlfnulcg0m68qqywqqstplgvrzywsg3am',
                    'terra1p50j2k5vyw3q2tgywqvxyz59z8csh9p7x8dk5m',
                    'terra18gphn8r437p2xmjpw7a79hgsglf5y4t0x7s5ee',
                    'terra1csr22xvxs6r3gkjsl7pmjkmpt39mwjsrm0e2r8',
                    'terra1ys4dwwzaenjg2gy02mslmc96f267xvpsjat7gx',
                    'terra16vfxm98rxlc8erj4g0sj5932dvylgmdufnugk0',
                    'terra1avryzxnsn2denq7p2d7ukm6nkck9s0rz2llgnc',
                    'terra1zeyfhurlrun6sgytqfue555e6vw2ndxt2j7jhd',
                    'terra12saaecsqwxj04fn0jsv4jmdyp6gylptf5tksge',
                    'terra15dr4ah3kha68kam7a907pje9w6z2lpjpnrkd06',
                    'terra14gq9wj0tt6vu0m4ec2tkkv4ln3qrtl58lgdl2c',
                    'terra104tgj4gc3pp5s240a0mzqkhd3jzkn8v0u07hlf',
                    'terra1qg9ugndl25567u03jrr79xur2yk9d632fke3h2',
                    'terra13myzfjdmvqkama2tt3v5f7quh75rv78w8kq6u6',
                    'terra12s2h8vlztjwu440khpc0063p34vm7nhu25w4p9',
                    'terra1djnlav60utj06kk9dl7defsv8xql5qpryzvm3h',
                    'terra18yx7ff8knc98p07pdkhm3u36wufaeacv47fuha',
                    'terra1fdkfhgk433tar72t4edh6p6y9rmjulzc83ljuw',
                    'terra1nslem9lgwx53rvgqwd8hgq7pepsry6yr3wsen4',
                    'terra1ax7mhqahj6vcqnnl675nqq2g9wghzuecy923vy',
                    'terra1fucmfp8x4mpzsydjaxyv26hrkdg4vpdzdvf647',
                    'terra1ftefjmtpnk2fctsa8xkv8naven65z5qtgq83nu',
                    'terra1fs6c6y65c65kkjanjwvmnrfvnm2s58ph88t9ky',
                    'terra18qs6704f4ujnwus9x9vxcxrrm0du0f232kpnd6',
                    'terra1qk0cd8576fqf33paf40xy3rt82p7yluwtxz7qx',
                    'terra179na3xcvjastpptnh9g6lnf75hqqjnsv9mqm3j',
                  ],
                },
              },
              coins: [],
            },
          },
        ],
        fee: { amount: [{ denom: 'uusd', amount: '1417500' }], gas: '9450000' },
        signatures: [],
        memo: '',
        timeout_height: '0',
      },
    };

    expect(Tx.fromAmino(txAmino, true)).toBeTruthy();
  });
});

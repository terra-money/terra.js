import { LCDClient } from '../src'

async function main() {
    const bombay = new LCDClient({
        chainID: 'bombay-12',
        URL: 'https://bombay-lcd.terra.dev',
        gasPrices: { uusd: 0.38 },
    });

    console.log('unbonding delgations', await bombay.staking.unbondingDelegations(
    	'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp', // delegator
    	'terravaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35' // validator
    ));
}

main().catch(console.error);

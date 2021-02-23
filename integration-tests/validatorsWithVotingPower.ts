import { LCDClient } from '../src';

const terra = new LCDClient({
  chainID: 'columbus-4',
  URL: 'https://lcd.terra.dev',
});

terra.utils.validatorsWithVotingPower().then(x => console.log(x));

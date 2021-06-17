import { LCDClient } from '../src';

const terra = new LCDClient({
  chainID: 'bombay-0007',
  URL: 'https://bombay-lcd.terra.dev',
});

terra.utils.validatorsWithVotingPower().then(x => console.log(x));

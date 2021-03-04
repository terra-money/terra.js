import { LCDClient, getContractEvents } from '../src';

const tequila = new LCDClient({
  chainID: 'tequila-0004',
  URL: 'https://tequila-lcd.terra.dev',
});

tequila.tx
  .txInfo('B652DF530D50E470070F3F211519495078082D01B49ED36B762B4E9446CE484E')
  .then(txInfo => getContractEvents(txInfo))
  .then(console.log);

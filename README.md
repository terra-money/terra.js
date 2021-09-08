<p>&nbsp;</p>
<p align="center">
<img src="https://raw.githubusercontent.com/terra-money/terra.js/master/img/terrajs.svg" width=500>
</p>

<p align="center">
The JavaScript SDK for Terra
</p>

![diagram](https://raw.githubusercontent.com/terra-money/terra.js/master/img/terrajs-diagram.png)

<br/>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/terra-money/terra.js">
  <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@terra-money/terra.js">
</p>

<p align="center">
  <a href="https://github.com/terra-money/terra.js/wiki"><strong>Explore the Docs »</strong></a>
  <br />
  <br/>
  <a href="https://github.com/terra-money/terra.js/wiki">Examples</a>
  ·
  <a href="https://terra-money.github.io/terra.js/">API Reference</a>
  ·
  <a href="https://www.npmjs.com/package/@terra-money/terra.js">NPM Package</a>
  ·
  <a href="https://github.com/terra-money/terra.js">GitHub</a>
</p>

Terra.js a JavaScript SDK for writing applications that interact with the Terra blockchain from either Node.js, browser, or React Native environments and provides simple abstractions over core data structures, serialization, key management, and API request generation.

## Features

- **Written in TypeScript**, with type definitions
- Versatile support for [key management](https://github.com/terra-money/terra.js/wiki/Keys) solutions
- Works in Node.js, in the browser, and React Native
- Exposes the Terra API through [`LCDClient`](https://github.com/terra-money/terra.js/wiki/Querying)
- Parses responses into native JavaScript types

We highly suggest using Terra.js with TypeScript, or JavaScript in a code editor that has support for type declarations, so you can take advantage of the helpful type hints that are included with the package.

## Installation

Grab the latest version off [NPM](https://www.npmjs.com/package/@terra-money/terra.js):

```sh
npm install @terra-money/terra.js
```

For columbus-4 and tequila network, use v1.x

```sh
npm install @terra-money/terra.js@^1
```

## Usage

Terra.js can be use in Node.js, as well as inside the browser. Please check the [GitHub Wiki](https://github.com/terra-money/terra.js/wiki) for notes on how to get up and running.

### Getting blockchain data

```ts
import { LCDClient, Coin } from '@terra-money/terra.js';

// connect to bombay testnet
const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-10',
});

// To use LocalTerra
// const terra = new LCDClient({
//   URL: 'http://localhost:1317',
//   chainID: 'localterra'
// });

// get the current swap rate from 1 TerraUSD to TerraKRW
const offerCoin = new Coin('uusd', '1000000');
terra.market.swapRate(offerCoin, 'ukrw').then(c => {
  console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
});
```

### Broadcasting transactions

First, [get](https://faucet.terra.money/) some testnet tokens for `terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v`, or use [LocalTerra](https://www.github.com/terra-money/LocalTerra).

```ts
import { LCDClient, MsgSend, MnemonicKey } from '@terra-money/terra.js';

// create a key out of a mnemonic
const mk = new MnemonicKey({
  mnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});

// connect to bombay testnet
const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-10',
});

// To use LocalTerra
// const terra = new LCDClient({
//   URL: 'http://localhost:1317',
//   chainID: 'localterra'
// });

// a wallet can be created out of any key
// wallets abstract transaction building
const wallet = terra.wallet(mk);

// create a simple message that moves coin balances
const send = new MsgSend(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
  { uluna: 1000000, ukrw: 1230201, uusd: 1312029 }
);

wallet
  .createAndSignTx({
    msgs: [send],
    memo: 'test from terra.js!',
  })
  .then(tx => terra.tx.broadcast(tx))
  .then(result => {
    console.log(`TX hash: ${result.txhash}`);
  });
```

## Terra.js in the browser

You can access all the objects of the `@terra-money/terra.js` from the global `Terra` object if you load Terra.js with a `<script>` tag.

Include the following in your browser:

```html
<script
  crossorigin
  src="https://unpkg.com/@terra-money/terra.js/dist/bundle.js"
></script>
```

You can find a small JSFiddle example that refreshes current Oracle votes [here](https://jsfiddle.net/tLm1b527/1/).

## Terra.js in React Native

In order to use Terra.js inside React Native, you need to add the [`node-libs-react-native`](https://github.com/parshap/node-libs-react-native) package and [`react-native-get-random-values`](https://github.com/LinusU/react-native-get-random-values) package to your React Native app's `package.json`.

```sh
yarn add node-libs-react-native react-native-get-random-values
```

You will need to register Node.js native modules in an entry point of your application, such as `index.tsx`:

```js
import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
```

Also, add resolvers to your `metro.config.js`

```js
module.exports {
  // ...
  resolver: {
    // ...
    extraNodeModules: require('node-libs-react-native'),
  },
  // ...
}
```

There have been many complaints about `MnemonicKey` of having poor performance or being sometimes incompatible when used inside React Native. It is recommended to use [`react-native-mnemonic-key`](https://github.com/terra-money/react-native-mnemonic-key) instead for more reliable performance and security.

## License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2020 Terraform Labs, PTE.

<hr/>

<p>&nbsp;</p>
<p align="center">
    <a href="https://terra.money/"><img src="http://terra.money/logos/terra_logo.svg" align="center" width=200/></a>
</p>
<div align="center">
  <sub><em>Powering the innovation of money.</em></sub>
</div>

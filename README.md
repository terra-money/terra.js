<p>&nbsp;</p>
<p align="center">
<img src="https://raw.githubusercontent.com/terra-project/terra.js/master/img/terrajs.svg" width=500>
</p>

<p align="center">
The JavaScript SDK for Terra
</p>

<br/>

![diagram](https://raw.githubusercontent.com/terra-project/terra.js/master/img/terrajs-diagram.png)

<div align="center">
  <h3>
    <a href="https://github.com/terra-project/terra.js/wiki">
      Docs
    </a>
    <span> | </span>
    <a href="https://terra-project.github.io/terra.js/">
      API
    </a>
    <span> | </span>
    <a href="https://www.npmjs.com/package/@terra-money/terra.js">
      NPM Package
    </a>
  </h3>
</div>

## Installation

Grab the latest version off [NPM](https://www.npmjs.com/package/@terra-money/terra.js):

```sh
yarn add @terra-money/terra.js
```

## Features

- **Written in TypeScript**, includes type definitions for core data objects
- Cosmos SDK **compatible** `Int` and `Dec` numeric types
- Includes BIP39 mnemonic key, with support for **custom key types**
- **Interoperable:** Supports JSON-format Terra objects and native JavaScript objects
- **Simple and consistent API** for converting to/from blockchain data
- Works in both Node.js and in the browser

## Usage

We highly suggest using Terra.js with TypeScript, or JavaScript in a code editor that has support for type declarations, so you can take advantage of the helpful type hints that are included with the package. Terra.js can be use in Node.js, as well as inside the browser. Please check the [GitHub Wiki](https://github.com/terra-project/terra.js/wiki) for notes on how to get up and running.

## Example

The best way to learn how to use Terra.js is to get started with a quick example and then explore the documentation on your own. Let's create our first transaction by generating a mnemonic, acquiring some testnet tokens, signing a simple transaction, and broadcast it on the network by using just our browser.

You can play with the complete example on JSFiddle [here](https://jsfiddle.net/wchen298/y6roqbdw/63/).

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

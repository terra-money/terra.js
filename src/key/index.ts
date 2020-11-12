export * from './Key';
export * from './MnemonicKey';
export * from './RawKey';

let CLIKey: any;

declare const __WEBPACK_BROWSER__: boolean | undefined;

if (typeof __WEBPACK_BROWSER__ !== 'boolean') {
  ({ CLIKey } = require('./CLIKey'));
}

export { CLIKey };

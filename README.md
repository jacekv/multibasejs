js-multibase
============

## Disclaimers

This code has been copied from [Multiformats/Js-Multibase](https://github.com/multiformats/js-multibase) and has been used to understand the multibase concepts.

## Table of Contents

- [Install](#install)
  - [NPM](#npm)
  - [In the Browser through `<script>` tag](#in-the-browser-through-script-tag)
- [Usage](#usage)
  - [Example](#example)
- [API](#api)
  - [`multibase` - Prefixes an encoded Uint8Array with its multibase code](#multibase---prefixes-an-encoded-Uint8Array-with-its-multibase-code)
  - [`multibase.encode` - Encodes Uint8Array into one of the supported encodings, prefixing it with the multibase code](#multibaseencode---encodes-Uint8Array-into-one-of-the-supported-encodings-prefixing-it-with-the-multibase-code)
  - [`multibase.decode` - Decodes Uint8Array or string](#multibasedecode---decodes-Uint8Array-or-string)
  - [`multibase.isEncoded` - Checks if Uint8Array or string is encoded](#multibaseisencoded---checks-if-Uint8Array-or-string-is-encoded)
  - [`multibase.names` - Supported base encoding names](#multibasenames)
  - [`multibase.codes` - Supported base encoding codes](#multibasecodes)
  - [Supported Encodings, see `src/constants.js`](#supported-encodings-see-srcconstantsjs)
- [Architecture and Encoding/Decoding](#architecture-and-encodingdecoding)
- [Adding additional bases](#adding-additional-bases)
- [License](#license)

## Install

### NPM

```sh
$ npm install --save multibase
```

The type definitions for this package are available on http://definitelytyped.org/. To install just use:

```sh
$ npm install -D @types/multibase
```

### In the Browser through `<script>` tag

Loading this module through a script tag will make the ```Multibase``` obj available in the global namespace.

```html
<script src="https://unpkg.com/multibase/dist/index.min.js"></script>
```

## Usage

### Example

```JavaScript
const multibase = require('multibase')

const bytes = multibase.encode('base58btc', new TextEncoder().encode('hey, how is it going'))

const decodedBytes = multibase.decode(bytes)
console.log(decodedBytes.toString())
// hey, how is it going
```

## API
https://multiformats.github.io/js-multibase/

#### `multibase` - Prefixes an encoded Uint8Array with its multibase code

```
const multibased = multibase(<nameOrCode>, encodedBytes)
```

#### `multibase.encode` - Encodes Uint8Array into one of the supported encodings, prefixing it with the multibase code

```JavaScript
const encodedBuf = multibase.encode(<nameOrCode>, <bytes>)
```

#### `multibase.decode` - Decodes Uint8Array or string

```JavaScript
const decodedBuf = multibase.decode(bufOrString)
```

#### `multibase.isEncoded` - Checks if Uint8Array or string is encoded

```JavaScript
const value = multibase.isEncoded(bytesOrString)
// value is the name of the encoding if it is encoded, false otherwise
```

#### `multibase.encoding` - Get the encoding by name or code

```JavaScript
const value = multibase.encoding(nameOrCode)
// value is an instance of the corresponding `Base`
```

#### `multibase.encodingFromData` - Get the encoding from data either a `string` or `Uint8Array`

```JavaScript
const value = multibase.encodingFromData(data)
// value is an instance of the corresponding `Base`
```

#### `multibase.names`

A frozen `Object` of supported base encoding names mapped to the corresponding `Base` instance.

#### `multibase.codes`

A frozen `Object` of supported base encoding codes  mapped to the corresponding `Base` instance.

### Supported Encodings, see [`src/constants.js`](/src/constants.js)

## License

[MIT](LICENSE)
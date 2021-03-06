const constants = require('./constants.js');
const {encodeText, decodeText, concat} = require('./utils.js');

/**
 * Create a new Uint8Array with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Uint8Array} buf - The data to be prefixed with multibase.
 * @return {Uint8Array}
 * @throws {Error} Will throw if the encoding is not supported
 */
function multibase(nameOrCode, buf) {
    if (!buf) {
        throw new Error('requires an encoded Uint8Array');
    }
    const {name, codeBuf} = encoding(nameOrCode);
    validEncode(name, buf);

    return concat([codeBuf, buf], codeBuf.length + buf.length);
}

/**
 * Get the encoding by name or code
 *
 * @param {string|number} nameOrCode
 * @return {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encoding(nameOrCode) {
    if (constants.names[nameOrCode]) {
        return constants.names[nameOrCode];
    } else if (constants.codes[nameOrCode]) {
        return constants.codes[nameOrCode];
    } else {
        throw new Error(`Unsupported encoding: ${nameOrCode}`);
    }
}

/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Uint8Array} buf - The data to be encoded.
 * @return {Uint8Array}
 * @throws {Error} Will throw if the encoding is not supported
 *
 */
function encode(nameOrCode, buf) {
    const enc = encoding(nameOrCode);
    const data = encodeText(enc.encode(buf));

    return concat([enc.codeBuf, data], enc.codeBuf.length + data.length);
}


/**
 * Takes a Uint8Array or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Uint8Array|string} data
 * @return {Uint8Array}
 * @throws {Error} Will throw if the encoding is not supported
 *
 */
function decode(data) {
    if (data instanceof Uint8Array) {
        data = decodeText(data);
    }
    const prefix = data[0];

    // Make all encodings case-insensitive except the ones that include upper and lower chars in the alphabet
    if (['f', 'F', 'v', 'V', 't', 'T', 'b', 'B', 'c', 'C', 'h', 'k', 'K'].includes(prefix)) {
        data = data.toLowerCase();
    }
    const enc = encoding(data[0]);
    return enc.decode(data.substring(1));
}

/**
 * Is the given data multibase encoded?
 *
 * @param {Uint8Array|string} data
 * @return {false|string}
 */
function isEncoded(data) {
    if (data instanceof Uint8Array) {
        data = decodeText(data);
    }
    // Ensure bufOrString is a string
    if (Object.prototype.toString.call(data) !== '[object String]') {
        return false;
    }

    try {
        const enc = encoding(data[0]);
        return enc.name;
    } catch (err) {
        return false;
    }
}

/**
 * Validate encoded data
 *
 * @param {string} name
 * @param {Uint8Array} buf
 * @return {void}
 * @throws {Error} Will throw if the encoding is not supported
 */
function validEncode(name, buf) {
    const enc = encoding(name);
    enc.decode(decodeText(buf));
}

/**
 * Get the encoding by name or code
 *
 * @param {string|number} nameOrCode
 * @return {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encoding(nameOrCode) {
    if (constants.names[nameOrCode]) {
        return constants.names[nameOrCode];
    } else if (constants.codes[nameOrCode]) {
        return constants.codes[nameOrCode];
    } else {
        throw new Error(`Unsupported encoding: ${nameOrCode}`);
    }
}

/**
 * Get encoding from data
 *
 * @param {string|Uint8Array} data
 * @return {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encodingFromData(data) {
    if (data instanceof Uint8Array) {
        data = decodeText(data);
    }
    return encoding(data[0]);
}

module.exports = {
    multibase,
    encode,
    decode,
    isEncoded,
    encoding,
    encodingFromData,
    validEncode,
    names: Object.freeze(constants.names),
    codes: Object.freeze(constants.codes),
};

import {
  init_sha256,
  require_buffer,
  sha256
} from "./chunk-KPHJQWGP.js";
import {
  init_sha3,
  keccak_256
} from "./chunk-IBWGIHRU.js";
import {
  Field,
  FpInvertBatch,
  FpSqrtEven,
  createHasher,
  init_curve,
  init_hash_to_curve,
  init_modular,
  init_secp256k1,
  init_sha2,
  isNegativeLE,
  mod,
  pippenger,
  pow2,
  secp256k1,
  sha512,
  validateBasic,
  wNAF
} from "./chunk-VESSVHNC.js";
import {
  aInRange,
  abool,
  bytesToHex,
  bytesToNumberLE,
  concatBytes,
  concatBytes2,
  ensureBytes,
  equalBytes,
  init_utils,
  init_utils2,
  memoized,
  numberToBytesLE,
  randomBytes,
  utf8ToBytes,
  validateObject
} from "./chunk-Y5D73FR4.js";
import {
  import_index,
  init_eventemitter3
} from "./chunk-IJLNJGDT.js";
import {
  __commonJS,
  __esm,
  __export,
  __publicField,
  __toCommonJS,
  __toESM
} from "./chunk-MVEJMUOB.js";

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset2, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset2 + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset2 + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset2 + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset2, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset2 + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset2 + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset2 + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer2 = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer4;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer4.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer4.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer4.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer4.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer4.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer4.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer4.prototype);
      return buf;
    }
    function Buffer4(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer4.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer4.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer4.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer4.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer4.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer4, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer4.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer4.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer4.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer4.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string2, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string2, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array2) {
      const length = array2.length < 0 ? 0 : checked(array2.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array2[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array2, byteOffset, length) {
      if (byteOffset < 0 || array2.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array2.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array2);
      } else if (length === void 0) {
        buf = new Uint8Array(array2, byteOffset);
      } else {
        buf = new Uint8Array(array2, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer4.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer4.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer4.alloc(+length);
    }
    Buffer4.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer4.prototype;
    };
    Buffer4.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer4.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer4.from(b, b.offset, b.byteLength);
      if (!Buffer4.isBuffer(a) || !Buffer4.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer4.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer4.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer4.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer4.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer4.isBuffer(buf)) buf = Buffer4.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer4.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string2, encoding) {
      if (Buffer4.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2
        );
      }
      const len = string2.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes2(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes2(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer4.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer4.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer4.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer4.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer4.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer4.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer4.prototype.toLocaleString = Buffer4.prototype.toString;
    Buffer4.prototype.equals = function equals(b) {
      if (!Buffer4.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer4.compare(this, b) === 0;
    };
    Buffer4.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer4.prototype[customInspectSymbol] = Buffer4.prototype.inspect;
    }
    Buffer4.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer4.from(target, target.offset, target.byteLength);
      }
      if (!Buffer4.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer4.from(val, encoding);
      }
      if (Buffer4.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer4.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer4.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer4.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string2, offset2, length) {
      offset2 = Number(offset2) || 0;
      const remaining = buf.length - offset2;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string2.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset2 + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string2, offset2, length) {
      return blitBuffer(utf8ToBytes2(string2, buf.length - offset2), buf, offset2, length);
    }
    function asciiWrite(buf, string2, offset2, length) {
      return blitBuffer(asciiToBytes(string2), buf, offset2, length);
    }
    function base64Write(buf, string2, offset2, length) {
      return blitBuffer(base64ToBytes(string2), buf, offset2, length);
    }
    function ucs2Write(buf, string2, offset2, length) {
      return blitBuffer(utf16leToBytes(string2, buf.length - offset2), buf, offset2, length);
    }
    Buffer4.prototype.write = function write(string2, offset2, length, encoding) {
      if (offset2 === void 0) {
        encoding = "utf8";
        length = this.length;
        offset2 = 0;
      } else if (length === void 0 && typeof offset2 === "string") {
        encoding = offset2;
        length = this.length;
        offset2 = 0;
      } else if (isFinite(offset2)) {
        offset2 = offset2 >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset2;
      if (length === void 0 || length > remaining) length = remaining;
      if (string2.length > 0 && (length < 0 || offset2 < 0) || offset2 > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset2, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset2, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset2, length);
          case "base64":
            return base64Write(this, string2, offset2, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset2, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer4.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer4.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer4.prototype);
      return newBuf;
    };
    function checkOffset(offset2, ext, length) {
      if (offset2 % 1 !== 0 || offset2 < 0) throw new RangeError("offset is not uint");
      if (offset2 + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer4.prototype.readUintLE = Buffer4.prototype.readUIntLE = function readUIntLE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset2, byteLength2, this.length);
      let val = this[offset2];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset2 + i] * mul;
      }
      return val;
    };
    Buffer4.prototype.readUintBE = Buffer4.prototype.readUIntBE = function readUIntBE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset2, byteLength2, this.length);
      }
      let val = this[offset2 + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset2 + --byteLength2] * mul;
      }
      return val;
    };
    Buffer4.prototype.readUint8 = Buffer4.prototype.readUInt8 = function readUInt8(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 1, this.length);
      return this[offset2];
    };
    Buffer4.prototype.readUint16LE = Buffer4.prototype.readUInt16LE = function readUInt16LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 2, this.length);
      return this[offset2] | this[offset2 + 1] << 8;
    };
    Buffer4.prototype.readUint16BE = Buffer4.prototype.readUInt16BE = function readUInt16BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 2, this.length);
      return this[offset2] << 8 | this[offset2 + 1];
    };
    Buffer4.prototype.readUint32LE = Buffer4.prototype.readUInt32LE = function readUInt32LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return (this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16) + this[offset2 + 3] * 16777216;
    };
    Buffer4.prototype.readUint32BE = Buffer4.prototype.readUInt32BE = function readUInt32BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return this[offset2] * 16777216 + (this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3]);
    };
    Buffer4.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const lo = first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24;
      const hi = this[++offset2] + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer4.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
      const lo = this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer4.prototype.readIntLE = function readIntLE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset2, byteLength2, this.length);
      let val = this[offset2];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset2 + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer4.prototype.readIntBE = function readIntBE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset2, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset2 + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset2 + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer4.prototype.readInt8 = function readInt8(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 1, this.length);
      if (!(this[offset2] & 128)) return this[offset2];
      return (255 - this[offset2] + 1) * -1;
    };
    Buffer4.prototype.readInt16LE = function readInt16LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 2, this.length);
      const val = this[offset2] | this[offset2 + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer4.prototype.readInt16BE = function readInt16BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 2, this.length);
      const val = this[offset2 + 1] | this[offset2] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer4.prototype.readInt32LE = function readInt32LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16 | this[offset2 + 3] << 24;
    };
    Buffer4.prototype.readInt32BE = function readInt32BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return this[offset2] << 24 | this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3];
    };
    Buffer4.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const val = this[offset2 + 4] + this[offset2 + 5] * 2 ** 8 + this[offset2 + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24);
    });
    Buffer4.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last);
    });
    Buffer4.prototype.readFloatLE = function readFloatLE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return ieee754.read(this, offset2, true, 23, 4);
    };
    Buffer4.prototype.readFloatBE = function readFloatBE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 4, this.length);
      return ieee754.read(this, offset2, false, 23, 4);
    };
    Buffer4.prototype.readDoubleLE = function readDoubleLE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 8, this.length);
      return ieee754.read(this, offset2, true, 52, 8);
    };
    Buffer4.prototype.readDoubleBE = function readDoubleBE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert) checkOffset(offset2, 8, this.length);
      return ieee754.read(this, offset2, false, 52, 8);
    };
    function checkInt(buf, value, offset2, ext, max, min) {
      if (!Buffer4.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset2 + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer4.prototype.writeUintLE = Buffer4.prototype.writeUIntLE = function writeUIntLE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset2, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset2] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset2 + i] = value / mul & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer4.prototype.writeUintBE = Buffer4.prototype.writeUIntBE = function writeUIntBE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset2, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset2 + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset2 + i] = value / mul & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer4.prototype.writeUint8 = Buffer4.prototype.writeUInt8 = function writeUInt8(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 1, 255, 0);
      this[offset2] = value & 255;
      return offset2 + 1;
    };
    Buffer4.prototype.writeUint16LE = Buffer4.prototype.writeUInt16LE = function writeUInt16LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 2, 65535, 0);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      return offset2 + 2;
    };
    Buffer4.prototype.writeUint16BE = Buffer4.prototype.writeUInt16BE = function writeUInt16BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 2, 65535, 0);
      this[offset2] = value >>> 8;
      this[offset2 + 1] = value & 255;
      return offset2 + 2;
    };
    Buffer4.prototype.writeUint32LE = Buffer4.prototype.writeUInt32LE = function writeUInt32LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 4, 4294967295, 0);
      this[offset2 + 3] = value >>> 24;
      this[offset2 + 2] = value >>> 16;
      this[offset2 + 1] = value >>> 8;
      this[offset2] = value & 255;
      return offset2 + 4;
    };
    Buffer4.prototype.writeUint32BE = Buffer4.prototype.writeUInt32BE = function writeUInt32BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 4, 4294967295, 0);
      this[offset2] = value >>> 24;
      this[offset2 + 1] = value >>> 16;
      this[offset2 + 2] = value >>> 8;
      this[offset2 + 3] = value & 255;
      return offset2 + 4;
    };
    function wrtBigUInt64LE(buf, value, offset2, min, max) {
      checkIntBI(value, min, max, buf, offset2, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      return offset2;
    }
    function wrtBigUInt64BE(buf, value, offset2, min, max) {
      checkIntBI(value, min, max, buf, offset2, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset2 + 7] = lo;
      lo = lo >> 8;
      buf[offset2 + 6] = lo;
      lo = lo >> 8;
      buf[offset2 + 5] = lo;
      lo = lo >> 8;
      buf[offset2 + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset2 + 3] = hi;
      hi = hi >> 8;
      buf[offset2 + 2] = hi;
      hi = hi >> 8;
      buf[offset2 + 1] = hi;
      hi = hi >> 8;
      buf[offset2] = hi;
      return offset2 + 8;
    }
    Buffer4.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset2 = 0) {
      return wrtBigUInt64LE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer4.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset2 = 0) {
      return wrtBigUInt64BE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer4.prototype.writeIntLE = function writeIntLE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset2, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset2] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset2 + i - 1] !== 0) {
          sub = 1;
        }
        this[offset2 + i] = (value / mul >> 0) - sub & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer4.prototype.writeIntBE = function writeIntBE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset2, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset2 + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset2 + i + 1] !== 0) {
          sub = 1;
        }
        this[offset2 + i] = (value / mul >> 0) - sub & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer4.prototype.writeInt8 = function writeInt8(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset2] = value & 255;
      return offset2 + 1;
    };
    Buffer4.prototype.writeInt16LE = function writeInt16LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 2, 32767, -32768);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      return offset2 + 2;
    };
    Buffer4.prototype.writeInt16BE = function writeInt16BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 2, 32767, -32768);
      this[offset2] = value >>> 8;
      this[offset2 + 1] = value & 255;
      return offset2 + 2;
    };
    Buffer4.prototype.writeInt32LE = function writeInt32LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 4, 2147483647, -2147483648);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      this[offset2 + 2] = value >>> 16;
      this[offset2 + 3] = value >>> 24;
      return offset2 + 4;
    };
    Buffer4.prototype.writeInt32BE = function writeInt32BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) checkInt(this, value, offset2, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset2] = value >>> 24;
      this[offset2 + 1] = value >>> 16;
      this[offset2 + 2] = value >>> 8;
      this[offset2 + 3] = value & 255;
      return offset2 + 4;
    };
    Buffer4.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset2 = 0) {
      return wrtBigUInt64LE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer4.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset2 = 0) {
      return wrtBigUInt64BE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset2, ext, max, min) {
      if (offset2 + ext > buf.length) throw new RangeError("Index out of range");
      if (offset2 < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset2, littleEndian, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset2, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset2, littleEndian, 23, 4);
      return offset2 + 4;
    }
    Buffer4.prototype.writeFloatLE = function writeFloatLE(value, offset2, noAssert) {
      return writeFloat(this, value, offset2, true, noAssert);
    };
    Buffer4.prototype.writeFloatBE = function writeFloatBE(value, offset2, noAssert) {
      return writeFloat(this, value, offset2, false, noAssert);
    };
    function writeDouble(buf, value, offset2, littleEndian, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset2, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset2, littleEndian, 52, 8);
      return offset2 + 8;
    }
    Buffer4.prototype.writeDoubleLE = function writeDoubleLE(value, offset2, noAssert) {
      return writeDouble(this, value, offset2, true, noAssert);
    };
    Buffer4.prototype.writeDoubleBE = function writeDoubleBE(value, offset2, noAssert) {
      return writeDouble(this, value, offset2, false, noAssert);
    };
    Buffer4.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer4.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer4.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer4.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer4.isBuffer(val) ? val : Buffer4.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset2, byteLength2) {
      validateNumber(offset2, "offset");
      if (buf[offset2] === void 0 || buf[offset2 + byteLength2] === void 0) {
        boundsError(offset2, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset2, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset2, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type2) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type2);
        throw new errors.ERR_OUT_OF_RANGE(type2 || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type2 || "offset",
        `>= ${type2 ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes2(string2, units) {
      units = units || Infinity;
      let codePoint;
      const length = string2.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset2, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset2 >= dst.length || i >= src.length) break;
        dst[i + offset2] = src[i];
      }
      return i;
    }
    function isInstance(obj, type2) {
      return obj instanceof type2 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type2.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/@noble/curves/esm/abstract/edwards.js
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(curve, {
    hash: "function",
    a: "bigint",
    d: "bigint",
    randomBytes: "function"
  }, {
    adjustScalarBytes: "function",
    domain: "function",
    uvRatio: "function",
    mapToCurve: "function"
  });
  return Object.freeze({ ...opts });
}
function twistedEdwards(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp: Fp2, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes2, nByteLength, h: cofactor } = CURVE;
  const MASK = _2n << BigInt(nByteLength * 8) - _1n;
  const modP = Fp2.create;
  const Fn = Field(CURVE.n, CURVE.nBitLength);
  function isEdValidXY(x, y) {
    const x2 = Fp2.sqr(x);
    const y2 = Fp2.sqr(y);
    const left = Fp2.add(Fp2.mul(CURVE.a, x2), y2);
    const right = Fp2.add(Fp2.ONE, Fp2.mul(CURVE.d, Fp2.mul(x2, y2)));
    return Fp2.eql(left, right);
  }
  if (!isEdValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const uvRatio2 = CURVE.uvRatio || ((u, v) => {
    try {
      return { isValid: true, value: Fp2.sqrt(u * Fp2.inv(v)) };
    } catch (e) {
      return { isValid: false, value: _0n };
    }
  });
  const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes) => bytes);
  const domain = CURVE.domain || ((data, ctx, phflag) => {
    abool("phflag", phflag);
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  function aCoordinate(title, n, banZero = false) {
    const min = banZero ? _1n : _0n;
    aInRange("coordinate " + title, n, min, MASK);
  }
  function aextpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ExtendedPoint expected");
  }
  const toAffineMemo = memoized((p, iz) => {
    const { ex: x, ey: y, ez: z } = p;
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? _8n : Fp2.inv(z);
    const ax = modP(x * iz);
    const ay = modP(y * iz);
    const zz = modP(z * iz);
    if (is0)
      return { x: _0n, y: _1n };
    if (zz !== _1n)
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p) => {
    const { a, d } = CURVE;
    if (p.is0())
      throw new Error("bad point: ZERO");
    const { ex: X, ey: Y, ez: Z, et: T } = p;
    const X2 = modP(X * X);
    const Y2 = modP(Y * Y);
    const Z2 = modP(Z * Z);
    const Z4 = modP(Z2 * Z2);
    const aX2 = modP(X2 * a);
    const left = modP(Z2 * modP(aX2 + Y2));
    const right = modP(Z4 + modP(d * modP(X2 * Y2)));
    if (left !== right)
      throw new Error("bad point: equation left != right (1)");
    const XY = modP(X * Y);
    const ZT = modP(Z * T);
    if (XY !== ZT)
      throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class Point {
    constructor(ex, ey, ez, et) {
      aCoordinate("x", ex);
      aCoordinate("y", ey);
      aCoordinate("z", ez, true);
      aCoordinate("t", et);
      this.ex = ex;
      this.ey = ey;
      this.ez = ez;
      this.et = et;
      Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(p) {
      if (p instanceof Point)
        throw new Error("extended point not allowed");
      const { x, y } = p || {};
      aCoordinate("x", x);
      aCoordinate("y", y);
      return new Point(x, y, _1n, modP(x * y));
    }
    static normalizeZ(points) {
      const toInv = FpInvertBatch(Fp2, points.map((p) => p.ez));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // Not required for fromHex(), which always creates valid points.
    // Could be useful for fromAffine().
    assertValidity() {
      assertValidMemo(this);
    }
    // Compare one point to another.
    equals(other) {
      aextpoint(other);
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const { ex: X2, ey: Y2, ez: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    negate() {
      return new Point(modP(-this.ex), this.ey, this.ez, modP(-this.et));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const A = modP(X1 * X1);
      const B = modP(Y1 * Y1);
      const C = modP(_2n * modP(Z1 * Z1));
      const D = modP(a * A);
      const x1y1 = X1 + Y1;
      const E = modP(modP(x1y1 * x1y1) - A - B);
      const G2 = D + B;
      const F = G2 - C;
      const H = D - B;
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      aextpoint(other);
      const { a, d } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
      const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
      const A = modP(X1 * X2);
      const B = modP(Y1 * Y2);
      const C = modP(T1 * d * T2);
      const D = modP(Z1 * Z2);
      const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
      const F = D - C;
      const G2 = D + C;
      const H = modP(B - a * A);
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, n, Point.normalizeZ);
    }
    // Constant-time multiplication.
    multiply(scalar) {
      const n = scalar;
      aInRange("scalar", n, _1n, CURVE_ORDER);
      const { p, f: f2 } = this.wNAF(n);
      return Point.normalizeZ([p, f2])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(scalar, acc = Point.ZERO) {
      const n = scalar;
      aInRange("scalar", n, _0n, CURVE_ORDER);
      if (n === _0n)
        return I;
      if (this.is0() || n === _1n)
        return this;
      return wnaf.wNAFCachedUnsafe(this, n, Point.normalizeZ, acc);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    clearCofactor() {
      const { h: cofactor2 } = CURVE;
      if (cofactor2 === _1n)
        return this;
      return this.multiplyUnsafe(cofactor2);
    }
    // Converts hash string or Uint8Array to Point.
    // Uses algo from RFC8032 5.1.3.
    static fromHex(hex, zip215 = false) {
      const { d, a } = CURVE;
      const len = Fp2.BYTES;
      hex = ensureBytes("pointHex", hex, len);
      abool("zip215", zip215);
      const normed = hex.slice();
      const lastByte = hex[len - 1];
      normed[len - 1] = lastByte & ~128;
      const y = bytesToNumberLE(normed);
      const max = zip215 ? MASK : Fp2.ORDER;
      aInRange("pointHex.y", y, _0n, max);
      const y2 = modP(y * y);
      const u = modP(y2 - _1n);
      const v = modP(d * y2 - a);
      let { isValid, value: x } = uvRatio2(u, v);
      if (!isValid)
        throw new Error("Point.fromHex: invalid y coordinate");
      const isXOdd = (x & _1n) === _1n;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x === _0n && isLastByteOdd)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x = modP(-x);
      return Point.fromAffine({ x, y });
    }
    static fromPrivateKey(privKey) {
      const { scalar } = getPrivateScalar(privKey);
      return G.multiply(scalar);
    }
    toRawBytes() {
      const { x, y } = this.toAffine();
      const bytes = numberToBytesLE(y, Fp2.BYTES);
      bytes[bytes.length - 1] |= x & _1n ? 128 : 0;
      return bytes;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n, modP(CURVE.Gx * CURVE.Gy));
  Point.ZERO = new Point(_0n, _1n, _1n, _0n);
  const { BASE: G, ZERO: I } = Point;
  const wnaf = wNAF(Point, nByteLength * 8);
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  function modN_LE(hash) {
    return modN(bytesToNumberLE(hash));
  }
  function getPrivateScalar(key) {
    const len = Fp2.BYTES;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    return { head, prefix, scalar };
  }
  function getExtendedPublicKey(key) {
    const { head, prefix, scalar } = getPrivateScalar(key);
    const point = G.multiply(scalar);
    const pointBytes = point.toRawBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey2(privKey) {
    return getExtendedPublicKey(privKey).pointBytes;
  }
  function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
    const msg = concatBytes2(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign2(msg, privKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
    const r = hashDomainToScalar(options.context, prefix, msg);
    const R = G.multiply(r).toRawBytes();
    const k = hashDomainToScalar(options.context, R, pointBytes, msg);
    const s = modN(r + k * scalar);
    aInRange("signature.s", s, _0n, CURVE_ORDER);
    const res = concatBytes2(R, numberToBytesLE(s, Fp2.BYTES));
    return ensureBytes("result", res, Fp2.BYTES * 2);
  }
  const verifyOpts = VERIFY_DEFAULT;
  function verify2(sig, msg, publicKey2, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = Fp2.BYTES;
    sig = ensureBytes("signature", sig, 2 * len);
    msg = ensureBytes("message", msg);
    publicKey2 = ensureBytes("publicKey", publicKey2, len);
    if (zip215 !== void 0)
      abool("zip215", zip215);
    if (prehash)
      msg = prehash(msg);
    const s = bytesToNumberLE(sig.slice(len, 2 * len));
    let A, R, SB;
    try {
      A = Point.fromHex(publicKey2, zip215);
      R = Point.fromHex(sig.slice(0, len), zip215);
      SB = G.multiplyUnsafe(s);
    } catch (error) {
      return false;
    }
    if (!zip215 && A.isSmallOrder())
      return false;
    const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
    const RkA = R.add(A.multiplyUnsafe(k));
    return RkA.subtract(SB).clearCofactor().equals(Point.ZERO);
  }
  G._setWindowSize(8);
  const utils = {
    getExtendedPublicKey,
    /** ed25519 priv keys are uniform 32b. No need to check for modulo bias, like in secp256k1. */
    randomPrivateKey: () => randomBytes2(Fp2.BYTES),
    /**
     * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
     * values. This slows down first getPublicKey() by milliseconds (see Speed section),
     * but allows to speed-up subsequent getPublicKey() calls up to 20x.
     * @param windowSize 2, 4, 8, 16
     */
    precompute(windowSize = 8, point = Point.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  return {
    CURVE,
    getPublicKey: getPublicKey2,
    sign: sign2,
    verify: verify2,
    ExtendedPoint: Point,
    utils
  };
}
var _0n, _1n, _2n, _8n, VERIFY_DEFAULT;
var init_edwards = __esm({
  "node_modules/@noble/curves/esm/abstract/edwards.js"() {
    init_curve();
    init_modular();
    init_utils2();
    _0n = BigInt(0);
    _1n = BigInt(1);
    _2n = BigInt(2);
    _8n = BigInt(8);
    VERIFY_DEFAULT = { zip215: true };
  }
});

// node_modules/@noble/curves/esm/abstract/montgomery.js
function validateOpts2(curve) {
  validateObject(curve, {
    adjustScalarBytes: "function",
    powPminus2: "function"
  });
  return Object.freeze({ ...curve });
}
function montgomery(curveDef) {
  const CURVE = validateOpts2(curveDef);
  const { P, type: type2, adjustScalarBytes: adjustScalarBytes2, powPminus2 } = CURVE;
  const is25519 = type2 === "x25519";
  if (!is25519 && type2 !== "x448")
    throw new Error("invalid type");
  const montgomeryBits = is25519 ? 255 : 448;
  const fieldLen = is25519 ? 32 : 56;
  const Gu = is25519 ? BigInt(9) : BigInt(5);
  const a24 = is25519 ? BigInt(121665) : BigInt(39081);
  const minScalar = is25519 ? _2n2 ** BigInt(254) : _2n2 ** BigInt(447);
  const maxAdded = is25519 ? BigInt(8) * _2n2 ** BigInt(251) - _1n2 : BigInt(4) * _2n2 ** BigInt(445) - _1n2;
  const maxScalar = minScalar + maxAdded + _1n2;
  const modP = (n) => mod(n, P);
  const GuBytes = encodeU(Gu);
  function encodeU(u) {
    return numberToBytesLE(modP(u), fieldLen);
  }
  function decodeU(u) {
    const _u = ensureBytes("u coordinate", u, fieldLen);
    if (is25519)
      _u[31] &= 127;
    return modP(bytesToNumberLE(_u));
  }
  function decodeScalar(scalar) {
    return bytesToNumberLE(adjustScalarBytes2(ensureBytes("scalar", scalar, fieldLen)));
  }
  function scalarMult(scalar, u) {
    const pu = montgomeryLadder(decodeU(u), decodeScalar(scalar));
    if (pu === _0n2)
      throw new Error("invalid private or public key received");
    return encodeU(pu);
  }
  function scalarMultBase(scalar) {
    return scalarMult(scalar, GuBytes);
  }
  function cswap(swap, x_2, x_3) {
    const dummy = modP(swap * (x_2 - x_3));
    x_2 = modP(x_2 - dummy);
    x_3 = modP(x_3 + dummy);
    return { x_2, x_3 };
  }
  function montgomeryLadder(u, scalar) {
    aInRange("u", u, _0n2, P);
    aInRange("scalar", scalar, minScalar, maxScalar);
    const k = scalar;
    const x_1 = u;
    let x_2 = _1n2;
    let z_2 = _0n2;
    let x_3 = u;
    let z_3 = _1n2;
    let swap = _0n2;
    for (let t = BigInt(montgomeryBits - 1); t >= _0n2; t--) {
      const k_t = k >> t & _1n2;
      swap ^= k_t;
      ({ x_2, x_3 } = cswap(swap, x_2, x_3));
      ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
      swap = k_t;
      const A = x_2 + z_2;
      const AA = modP(A * A);
      const B = x_2 - z_2;
      const BB = modP(B * B);
      const E = AA - BB;
      const C = x_3 + z_3;
      const D = x_3 - z_3;
      const DA = modP(D * A);
      const CB = modP(C * B);
      const dacb = DA + CB;
      const da_cb = DA - CB;
      x_3 = modP(dacb * dacb);
      z_3 = modP(x_1 * modP(da_cb * da_cb));
      x_2 = modP(AA * BB);
      z_2 = modP(E * (AA + modP(a24 * E)));
    }
    ({ x_2, x_3 } = cswap(swap, x_2, x_3));
    ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
    const z2 = powPminus2(z_2);
    return modP(x_2 * z2);
  }
  return {
    scalarMult,
    scalarMultBase,
    getSharedSecret: (privateKey, publicKey2) => scalarMult(privateKey, publicKey2),
    getPublicKey: (privateKey) => scalarMultBase(privateKey),
    utils: { randomPrivateKey: () => CURVE.randomBytes(fieldLen) },
    GuBytes: GuBytes.slice()
  };
}
var _0n2, _1n2, _2n2;
var init_montgomery = __esm({
  "node_modules/@noble/curves/esm/abstract/montgomery.js"() {
    init_modular();
    init_utils2();
    _0n2 = BigInt(0);
    _1n2 = BigInt(1);
    _2n2 = BigInt(2);
  }
});

// node_modules/@noble/curves/esm/ed25519.js
function ed25519_pow_2_252_3(x) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P = ED25519_P;
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow2(b2, _2n3, P) * b2 % P;
  const b5 = pow2(b4, _1n3, P) * x % P;
  const b10 = pow2(b5, _5n, P) * b5 % P;
  const b20 = pow2(b10, _10n, P) * b10 % P;
  const b40 = pow2(b20, _20n, P) * b20 % P;
  const b80 = pow2(b40, _40n, P) * b40 % P;
  const b160 = pow2(b80, _80n, P) * b80 % P;
  const b240 = pow2(b160, _80n, P) * b80 % P;
  const b250 = pow2(b240, _10n, P) * b10 % P;
  const pow_p_5_8 = pow2(b250, _2n3, P) * x % P;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes) {
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  return bytes;
}
function uvRatio(u, v) {
  const P = ED25519_P;
  const v32 = mod(v * v * v, P);
  const v7 = mod(v32 * v32 * v, P);
  const pow = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x = mod(u * v32 * pow, P);
  const vx2 = mod(v * x * x, P);
  const root1 = x;
  const root2 = mod(x * ED25519_SQRT_M1, P);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod(-u, P);
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if (isNegativeLE(x, P))
    x = mod(-x, P);
  return { isValid: useRoot1 || useRoot2, value: x };
}
function ed25519_domain(data, ctx, phflag) {
  if (ctx.length > 255)
    throw new Error("Context is too big");
  return concatBytes(utf8ToBytes("SigEd25519 no Ed25519 collisions"), new Uint8Array([phflag ? 1 : 0, ctx.length]), ctx, data);
}
function map_to_curve_elligator2_curve25519(u) {
  const ELL2_C4 = (Fp.ORDER - _5n) / _8n2;
  const ELL2_J = BigInt(486662);
  let tv1 = Fp.sqr(u);
  tv1 = Fp.mul(tv1, _2n3);
  let xd = Fp.add(tv1, Fp.ONE);
  let x1n = Fp.neg(ELL2_J);
  let tv2 = Fp.sqr(xd);
  let gxd = Fp.mul(tv2, xd);
  let gx1 = Fp.mul(tv1, ELL2_J);
  gx1 = Fp.mul(gx1, x1n);
  gx1 = Fp.add(gx1, tv2);
  gx1 = Fp.mul(gx1, x1n);
  let tv3 = Fp.sqr(gxd);
  tv2 = Fp.sqr(tv3);
  tv3 = Fp.mul(tv3, gxd);
  tv3 = Fp.mul(tv3, gx1);
  tv2 = Fp.mul(tv2, tv3);
  let y11 = Fp.pow(tv2, ELL2_C4);
  y11 = Fp.mul(y11, tv3);
  let y12 = Fp.mul(y11, ELL2_C3);
  tv2 = Fp.sqr(y11);
  tv2 = Fp.mul(tv2, gxd);
  let e1 = Fp.eql(tv2, gx1);
  let y1 = Fp.cmov(y12, y11, e1);
  let x2n = Fp.mul(x1n, tv1);
  let y21 = Fp.mul(y11, u);
  y21 = Fp.mul(y21, ELL2_C2);
  let y22 = Fp.mul(y21, ELL2_C3);
  let gx2 = Fp.mul(gx1, tv1);
  tv2 = Fp.sqr(y21);
  tv2 = Fp.mul(tv2, gxd);
  let e2 = Fp.eql(tv2, gx2);
  let y2 = Fp.cmov(y22, y21, e2);
  tv2 = Fp.sqr(y1);
  tv2 = Fp.mul(tv2, gxd);
  let e3 = Fp.eql(tv2, gx1);
  let xn = Fp.cmov(x2n, x1n, e3);
  let y = Fp.cmov(y2, y1, e3);
  let e4 = Fp.isOdd(y);
  y = Fp.cmov(y, Fp.neg(y), e3 !== e4);
  return { xMn: xn, xMd: xd, yMn: y, yMd: _1n3 };
}
function map_to_curve_elligator2_edwards25519(u) {
  const { xMn, xMd, yMn, yMd } = map_to_curve_elligator2_curve25519(u);
  let xn = Fp.mul(xMn, yMd);
  xn = Fp.mul(xn, ELL2_C1_EDWARDS);
  let xd = Fp.mul(xMd, yMn);
  let yn = Fp.sub(xMn, xMd);
  let yd = Fp.add(xMn, xMd);
  let tv1 = Fp.mul(xd, yd);
  let e = Fp.eql(tv1, Fp.ZERO);
  xn = Fp.cmov(xn, Fp.ZERO, e);
  xd = Fp.cmov(xd, Fp.ONE, e);
  yn = Fp.cmov(yn, Fp.ONE, e);
  yd = Fp.cmov(yd, Fp.ONE, e);
  const [xd_inv, yd_inv] = FpInvertBatch(Fp, [xd, yd], true);
  return { x: Fp.mul(xn, xd_inv), y: Fp.mul(yn, yd_inv) };
}
function aristp(other) {
  if (!(other instanceof RistPoint))
    throw new Error("RistrettoPoint expected");
}
function calcElligatorRistrettoMap(r0) {
  const { d } = ed25519.CURVE;
  const P = ed25519.CURVE.Fp.ORDER;
  const mod2 = ed25519.CURVE.Fp.create;
  const r = mod2(SQRT_M1 * r0 * r0);
  const Ns = mod2((r + _1n3) * ONE_MINUS_D_SQ);
  let c = BigInt(-1);
  const D = mod2((c - d * r) * mod2(r + d));
  let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
  let s_ = mod2(s * r0);
  if (!isNegativeLE(s_, P))
    s_ = mod2(-s_);
  if (!Ns_D_is_sq)
    s = s_;
  if (!Ns_D_is_sq)
    c = r;
  const Nt = mod2(c * (r - _1n3) * D_MINUS_ONE_SQ - D);
  const s2 = s * s;
  const W0 = mod2((s + s) * D);
  const W1 = mod2(Nt * SQRT_AD_MINUS_ONE);
  const W2 = mod2(_1n3 - s2);
  const W3 = mod2(_1n3 + s2);
  return new ed25519.ExtendedPoint(mod2(W0 * W3), mod2(W2 * W1), mod2(W1 * W3), mod2(W0 * W2));
}
var ED25519_P, ED25519_SQRT_M1, _0n3, _1n3, _2n3, _3n, _5n, _8n2, Fp, ed25519Defaults, ed25519, ed25519ctx, ed25519ph, x25519, ELL2_C1, ELL2_C2, ELL2_C3, ELL2_C1_EDWARDS, ed25519_hasher, hashToCurve, encodeToCurve, SQRT_M1, SQRT_AD_MINUS_ONE, INVSQRT_A_MINUS_D, ONE_MINUS_D_SQ, D_MINUS_ONE_SQ, invertSqrt, MAX_255B, bytes255ToNumberLE, RistPoint, RistrettoPoint;
var init_ed25519 = __esm({
  "node_modules/@noble/curves/esm/ed25519.js"() {
    init_sha2();
    init_utils();
    init_curve();
    init_edwards();
    init_hash_to_curve();
    init_modular();
    init_montgomery();
    init_utils2();
    ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
    ED25519_SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
    _0n3 = BigInt(0);
    _1n3 = BigInt(1);
    _2n3 = BigInt(2);
    _3n = BigInt(3);
    _5n = BigInt(5);
    _8n2 = BigInt(8);
    Fp = (() => Field(ED25519_P, void 0, true))();
    ed25519Defaults = (() => ({
      // Removing Fp.create() will still work, and is 10% faster on sign
      a: Fp.create(BigInt(-1)),
      // d is -121665/121666 a.k.a. Fp.neg(121665 * Fp.inv(121666))
      d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
      // Finite field 2n**255n - 19n
      Fp,
      // Subgroup order 2n**252n + 27742317777372353535851937790883648493n;
      n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
      h: _8n2,
      Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
      Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
      hash: sha512,
      randomBytes,
      adjustScalarBytes,
      // dom2
      // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
      // Constant-time, u/√v
      uvRatio
    }))();
    ed25519 = (() => twistedEdwards(ed25519Defaults))();
    ed25519ctx = (() => twistedEdwards({
      ...ed25519Defaults,
      domain: ed25519_domain
    }))();
    ed25519ph = (() => twistedEdwards(Object.assign({}, ed25519Defaults, {
      domain: ed25519_domain,
      prehash: sha512
    })))();
    x25519 = (() => montgomery({
      P: ED25519_P,
      type: "x25519",
      powPminus2: (x) => {
        const P = ED25519_P;
        const { pow_p_5_8, b2 } = ed25519_pow_2_252_3(x);
        return mod(pow2(pow_p_5_8, _3n, P) * b2, P);
      },
      adjustScalarBytes,
      randomBytes
    }))();
    ELL2_C1 = (() => (Fp.ORDER + _3n) / _8n2)();
    ELL2_C2 = (() => Fp.pow(_2n3, ELL2_C1))();
    ELL2_C3 = (() => Fp.sqrt(Fp.neg(Fp.ONE)))();
    ELL2_C1_EDWARDS = (() => FpSqrtEven(Fp, Fp.neg(BigInt(486664))))();
    ed25519_hasher = (() => createHasher(ed25519.ExtendedPoint, (scalars) => map_to_curve_elligator2_edwards25519(scalars[0]), {
      DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
      encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
      p: Fp.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: sha512
    }))();
    hashToCurve = (() => ed25519_hasher.hashToCurve)();
    encodeToCurve = (() => ed25519_hasher.encodeToCurve)();
    SQRT_M1 = ED25519_SQRT_M1;
    SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
    INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
    ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
    D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
    invertSqrt = (number2) => uvRatio(_1n3, number2);
    MAX_255B = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    bytes255ToNumberLE = (bytes) => ed25519.CURVE.Fp.create(bytesToNumberLE(bytes) & MAX_255B);
    RistPoint = class _RistPoint {
      // Private property to discourage combining ExtendedPoint + RistrettoPoint
      // Always use Ristretto encoding/decoding instead.
      constructor(ep) {
        this.ep = ep;
      }
      static fromAffine(ap) {
        return new _RistPoint(ed25519.ExtendedPoint.fromAffine(ap));
      }
      /**
       * Takes uniform output of 64-byte hash function like sha512 and converts it to `RistrettoPoint`.
       * The hash-to-group operation applies Elligator twice and adds the results.
       * **Note:** this is one-way map, there is no conversion from point to hash.
       * Described in [RFC9380](https://www.rfc-editor.org/rfc/rfc9380#appendix-B) and on
       * the [website](https://ristretto.group/formulas/elligator.html).
       * @param hex 64-byte output of a hash function
       */
      static hashToCurve(hex) {
        hex = ensureBytes("ristrettoHash", hex, 64);
        const r1 = bytes255ToNumberLE(hex.slice(0, 32));
        const R1 = calcElligatorRistrettoMap(r1);
        const r2 = bytes255ToNumberLE(hex.slice(32, 64));
        const R2 = calcElligatorRistrettoMap(r2);
        return new _RistPoint(R1.add(R2));
      }
      /**
       * Converts ristretto-encoded string to ristretto point.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-decode).
       * @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
       */
      static fromHex(hex) {
        hex = ensureBytes("ristrettoHex", hex, 32);
        const { a, d } = ed25519.CURVE;
        const P = ed25519.CURVE.Fp.ORDER;
        const mod2 = ed25519.CURVE.Fp.create;
        const emsg = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint";
        const s = bytes255ToNumberLE(hex);
        if (!equalBytes(numberToBytesLE(s, 32), hex) || isNegativeLE(s, P))
          throw new Error(emsg);
        const s2 = mod2(s * s);
        const u1 = mod2(_1n3 + a * s2);
        const u2 = mod2(_1n3 - a * s2);
        const u1_2 = mod2(u1 * u1);
        const u2_2 = mod2(u2 * u2);
        const v = mod2(a * d * u1_2 - u2_2);
        const { isValid, value: I } = invertSqrt(mod2(v * u2_2));
        const Dx = mod2(I * u2);
        const Dy = mod2(I * Dx * v);
        let x = mod2((s + s) * Dx);
        if (isNegativeLE(x, P))
          x = mod2(-x);
        const y = mod2(u1 * Dy);
        const t = mod2(x * y);
        if (!isValid || isNegativeLE(t, P) || y === _0n3)
          throw new Error(emsg);
        return new _RistPoint(new ed25519.ExtendedPoint(x, y, _1n3, t));
      }
      static msm(points, scalars) {
        const Fn = Field(ed25519.CURVE.n, ed25519.CURVE.nBitLength);
        return pippenger(_RistPoint, Fn, points, scalars);
      }
      /**
       * Encodes ristretto point to Uint8Array.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-encode).
       */
      toRawBytes() {
        let { ex: x, ey: y, ez: z, et: t } = this.ep;
        const P = ed25519.CURVE.Fp.ORDER;
        const mod2 = ed25519.CURVE.Fp.create;
        const u1 = mod2(mod2(z + y) * mod2(z - y));
        const u2 = mod2(x * y);
        const u2sq = mod2(u2 * u2);
        const { value: invsqrt } = invertSqrt(mod2(u1 * u2sq));
        const D1 = mod2(invsqrt * u1);
        const D2 = mod2(invsqrt * u2);
        const zInv = mod2(D1 * D2 * t);
        let D;
        if (isNegativeLE(t * zInv, P)) {
          let _x = mod2(y * SQRT_M1);
          let _y = mod2(x * SQRT_M1);
          x = _x;
          y = _y;
          D = mod2(D1 * INVSQRT_A_MINUS_D);
        } else {
          D = D2;
        }
        if (isNegativeLE(x * zInv, P))
          y = mod2(-y);
        let s = mod2((z - y) * D);
        if (isNegativeLE(s, P))
          s = mod2(-s);
        return numberToBytesLE(s, 32);
      }
      toHex() {
        return bytesToHex(this.toRawBytes());
      }
      toString() {
        return this.toHex();
      }
      /**
       * Compares two Ristretto points.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-equals).
       */
      equals(other) {
        aristp(other);
        const { ex: X1, ey: Y1 } = this.ep;
        const { ex: X2, ey: Y2 } = other.ep;
        const mod2 = ed25519.CURVE.Fp.create;
        const one = mod2(X1 * Y2) === mod2(Y1 * X2);
        const two = mod2(Y1 * Y2) === mod2(X1 * X2);
        return one || two;
      }
      add(other) {
        aristp(other);
        return new _RistPoint(this.ep.add(other.ep));
      }
      subtract(other) {
        aristp(other);
        return new _RistPoint(this.ep.subtract(other.ep));
      }
      multiply(scalar) {
        return new _RistPoint(this.ep.multiply(scalar));
      }
      multiplyUnsafe(scalar) {
        return new _RistPoint(this.ep.multiplyUnsafe(scalar));
      }
      double() {
        return new _RistPoint(this.ep.double());
      }
      negate() {
        return new _RistPoint(this.ep.negate());
      }
    };
    RistrettoPoint = (() => {
      if (!RistPoint.BASE)
        RistPoint.BASE = new RistPoint(ed25519.ExtendedPoint.BASE);
      if (!RistPoint.ZERO)
        RistPoint.ZERO = new RistPoint(ed25519.ExtendedPoint.ZERO);
      return RistPoint;
    })();
  }
});

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert3(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN2(number2, base, endian) {
        if (BN2.isBN(number2)) {
          return number2;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number2 !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number2 || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2;
      } else {
        exports2.BN = BN2;
      }
      BN2.BN = BN2;
      BN2.wordSize = 26;
      var Buffer4;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer4 = window.Buffer;
        } else {
          Buffer4 = require_buffer().Buffer;
        }
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      };
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN2.prototype._init = function init(number2, base, endian) {
        if (typeof number2 === "number") {
          return this._initNumber(number2, base, endian);
        }
        if (typeof number2 === "object") {
          return this._initArray(number2, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert3(base === (base | 0) && base >= 2 && base <= 36);
        number2 = number2.toString().replace(/\s+/g, "");
        var start = 0;
        if (number2[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number2.length) {
          if (base === 16) {
            this._parseHex(number2, start, endian);
          } else {
            this._parseBase(number2, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN2.prototype._initNumber = function _initNumber(number2, base, endian) {
        if (number2 < 0) {
          this.negative = 1;
          number2 = -number2;
        }
        if (number2 < 67108864) {
          this.words = [number2 & 67108863];
          this.length = 1;
        } else if (number2 < 4503599627370496) {
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert3(number2 < 9007199254740992);
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initArray = function _initArray(number2, base, endian) {
        assert3(typeof number2.length === "number");
        if (number2.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number2.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number2.length - 1, j = 0; i >= 0; i -= 3) {
            w = number2[i] | number2[i - 1] << 8 | number2[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number2.length; i += 3) {
            w = number2[i] | number2[i + 1] << 8 | number2[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this._strip();
      };
      function parseHex4Bits(string2, index) {
        var c = string2.charCodeAt(index);
        if (c >= 48 && c <= 57) {
          return c - 48;
        } else if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          assert3(false, "Invalid character in " + string2);
        }
      }
      function parseHexByte(string2, lowerBound, index) {
        var r = parseHex4Bits(string2, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string2, index - 1) << 4;
        }
        return r;
      }
      BN2.prototype._parseHex = function _parseHex(number2, start, endian) {
        this.length = Math.ceil((number2.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number2.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number2, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number2.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number2.length; i += 2) {
            w = parseHexByte(number2, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this._strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var b = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            b = c - 49 + 10;
          } else if (c >= 17) {
            b = c - 17 + 10;
          } else {
            b = c;
          }
          assert3(c >= 0 && b < mul, "Invalid character");
          r += b;
        }
        return r;
      }
      BN2.prototype._parseBase = function _parseBase(number2, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number2.length - start;
        var mod2 = total % limbLen;
        var end = Math.min(total, total - mod2) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number2, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod2 !== 0) {
          var pow = 1;
          word = parseBase(number2, i, number2.length, base);
          for (i = 0; i < mod2; i++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this._strip();
      };
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      BN2.prototype._move = function _move(dest) {
        move(dest, this);
      };
      BN2.prototype.clone = function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      };
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN2.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN2.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
        } catch (e) {
          BN2.prototype.inspect = inspect;
        }
      } else {
        BN2.prototype.inspect = inspect;
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN2.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert3(false, "Base should be between 2 and 36");
      };
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert3(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16, 2);
      };
      if (Buffer4) {
        BN2.prototype.toBuffer = function toBuffer2(endian, length) {
          return this.toArrayLike(Buffer4, endian, length);
        };
      }
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      var allocate = function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size);
        }
        return new ArrayType(size);
      };
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert3(byteLength <= reqLength, "byte array longer than desired length");
        assert3(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      };
      BN2.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position++] = word & 255;
          if (position < res.length) {
            res[position++] = word >> 8 & 255;
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position < res.length) {
          res[position++] = carry;
          while (position < res.length) {
            res[position++] = 0;
          }
        }
      };
      BN2.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position--] = word & 255;
          if (position >= 0) {
            res[position--] = word >> 8 & 255;
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position >= 0) {
          res[position--] = carry;
          while (position >= 0) {
            res[position--] = 0;
          }
        }
      };
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      };
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN2.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      };
      BN2.prototype.ior = function ior(num) {
        assert3((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN2.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN2.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this._strip();
      };
      BN2.prototype.iand = function iand(num) {
        assert3((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN2.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN2.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this._strip();
      };
      BN2.prototype.ixor = function ixor(num) {
        assert3((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN2.prototype.inotn = function inotn(width) {
        assert3(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this._strip();
      };
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN2.prototype.setn = function setn(bit, val) {
        assert3(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this._strip();
      };
      BN2.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN2.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length) return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this._strip();
      };
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        var len = self.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out._strip();
      }
      var comb10MulTo = function comb10MulTo2(self, num, out) {
        var a = self.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        out.length = self.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out._strip();
      }
      function jumboMulTo(self, num, out) {
        return bigMulTo(self, num, out);
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert3(carry === 0);
        assert3((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out._strip();
      };
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN2.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert3(typeof num === "number");
        assert3(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        this.length = num === 0 ? 1 : this.length;
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN2.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN2.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0) return new BN2(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN2.prototype.iushln = function iushln(bits) {
        assert3(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this._strip();
      };
      BN2.prototype.ishln = function ishln(bits) {
        assert3(this.negative === 0);
        return this.iushln(bits);
      };
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert3(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask2 = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask2;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this._strip();
      };
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert3(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN2.prototype.testn = function testn(bit) {
        assert3(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN2.prototype.imaskn = function imaskn(bits) {
        assert3(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert3(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask2 = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask2;
        }
        return this._strip();
      };
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN2.prototype.iaddn = function iaddn(num) {
        assert3(typeof num === "number");
        assert3(num < 67108864);
        if (num < 0) return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN2.prototype.isubn = function isubn(num) {
        assert3(typeof num === "number");
        assert3(num < 67108864);
        if (num < 0) return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this._strip();
      };
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN2.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN2.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0) return this._strip();
        assert3(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this._strip();
      };
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN2(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q._strip();
        }
        a._strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert3(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          };
        }
        var div, mod2, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod2 = res.mod.neg();
            if (positive && mod2.negative !== 0) {
              mod2.iadd(num);
            }
          }
          return {
            div,
            mod: mod2
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod2 = res.mod.neg();
            if (positive && mod2.negative !== 0) {
              mod2.isub(num);
            }
          }
          return {
            div: res.div,
            mod: mod2
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modrn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modrn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN2.prototype.mod = function mod2(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod2 = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod2.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN2.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert3(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      };
      BN2.prototype.modn = function modn(num) {
        return this.modrn(num);
      };
      BN2.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert3(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        this._strip();
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN2.prototype.egcd = function egcd(p) {
        assert3(p.negative === 0);
        assert3(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN2(1);
        var B = new BN2(0);
        var C = new BN2(0);
        var D = new BN2(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN2.prototype._invmp = function _invmp(p) {
        assert3(p.negative === 0);
        assert3(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN2(1);
        var x2 = new BN2(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN2.prototype.bincn = function bincn(bit) {
        assert3(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN2.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative) return -1;
        if (this.negative === 0 && negative) return 1;
        this._strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert3(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1;
        if (this.length < num.length) return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b) continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN2.red = function red(num) {
        return new Red(num);
      };
      BN2.prototype.toRed = function toRed(ctx) {
        assert3(!this.red, "Already a number in reduction context");
        assert3(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN2.prototype.fromRed = function fromRed() {
        assert3(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert3(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN2.prototype.redAdd = function redAdd(num) {
        assert3(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert3(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN2.prototype.redSub = function redSub(num) {
        assert3(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN2.prototype.redISub = function redISub(num) {
        assert3(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN2.prototype.redShl = function redShl(num) {
        assert3(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN2.prototype.redMul = function redMul(num) {
        assert3(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN2.prototype.redIMul = function redIMul(num) {
        assert3(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN2.prototype.redSqr = function redSqr() {
        assert3(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN2.prototype.redISqr = function redISqr() {
        assert3(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN2.prototype.redSqrt = function redSqrt() {
        assert3(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN2.prototype.redInvm = function redInvm() {
        assert3(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN2.prototype.redNeg = function redNeg() {
        assert3(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN2.prototype.redPow = function redPow(num) {
        assert3(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN2(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN2(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask2 = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask2;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask2) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN2._prime = function prime(name) {
        if (primes[name]) return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert3(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert3(a.negative === 0, "red works only with positives");
        assert3(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert3((a.negative | b.negative) === 0, "red works only with positives");
        assert3(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone();
        var mod3 = this.m.andln(3);
        assert3(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN2(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert3(!q.isZero());
        var one = new BN2(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN2(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert3(i < m);
          var b = this.pow(c, new BN2(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN2(1).toRed(this);
        if (num.cmpn(1) === 0) return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN2(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN2.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN2(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN2(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    var buffer = require_buffer2();
    var Buffer4 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer4.from && Buffer4.alloc && Buffer4.allocUnsafe && Buffer4.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer4(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer4.prototype);
    copyProps(Buffer4, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer4(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer4(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer4(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/base-x/src/index.js
var require_src = __commonJS({
  "node_modules/base-x/src/index.js"(exports, module) {
    "use strict";
    var _Buffer = require_safe_buffer().Buffer;
    function base(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode2(source) {
        if (Array.isArray(source) || source instanceof Uint8Array) {
          source = _Buffer.from(source);
        }
        if (!_Buffer.isBuffer(source)) {
          throw new TypeError("Expected Buffer");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          pbegin++;
        }
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return _Buffer.alloc(0);
        }
        var psz = 0;
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (psz < source.length) {
          var charCode = source.charCodeAt(psz);
          if (charCode > 255) {
            return;
          }
          var carry = BASE_MAP[charCode];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          psz++;
        }
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
        vch.fill(0, 0, zeroes);
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode2(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode: encode2,
        decodeUnsafe,
        decode: decode2
      };
    }
    module.exports = base;
  }
});

// node_modules/bs58/index.js
var require_bs58 = __commonJS({
  "node_modules/bs58/index.js"(exports, module) {
    var basex = require_src();
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET);
  }
});

// node_modules/text-encoding-utf-8/src/encoding.js
var encoding_exports = {};
__export(encoding_exports, {
  TextDecoder: () => TextDecoder2,
  TextEncoder: () => TextEncoder
});
function inRange(a, min, max) {
  return min <= a && a <= max;
}
function ToDictionary(o) {
  if (o === void 0) return {};
  if (o === Object(o)) return o;
  throw TypeError("Could not convert argument to dictionary");
}
function stringToCodePoints(string2) {
  var s = String(string2);
  var n = s.length;
  var i = 0;
  var u = [];
  while (i < n) {
    var c = s.charCodeAt(i);
    if (c < 55296 || c > 57343) {
      u.push(c);
    } else if (56320 <= c && c <= 57343) {
      u.push(65533);
    } else if (55296 <= c && c <= 56319) {
      if (i === n - 1) {
        u.push(65533);
      } else {
        var d = string2.charCodeAt(i + 1);
        if (56320 <= d && d <= 57343) {
          var a = c & 1023;
          var b = d & 1023;
          u.push(65536 + (a << 10) + b);
          i += 1;
        } else {
          u.push(65533);
        }
      }
    }
    i += 1;
  }
  return u;
}
function codePointsToString(code_points) {
  var s = "";
  for (var i = 0; i < code_points.length; ++i) {
    var cp = code_points[i];
    if (cp <= 65535) {
      s += String.fromCharCode(cp);
    } else {
      cp -= 65536;
      s += String.fromCharCode(
        (cp >> 10) + 55296,
        (cp & 1023) + 56320
      );
    }
  }
  return s;
}
function Stream(tokens) {
  this.tokens = [].slice.call(tokens);
}
function decoderError(fatal, opt_code_point) {
  if (fatal)
    throw TypeError("Decoder error");
  return opt_code_point || 65533;
}
function Decoder() {
}
function Encoder() {
}
function TextDecoder2(encoding, options) {
  if (!(this instanceof TextDecoder2)) {
    return new TextDecoder2(encoding, options);
  }
  encoding = encoding !== void 0 ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
  if (encoding !== DEFAULT_ENCODING) {
    throw new Error("Encoding not supported. Only utf-8 is supported");
  }
  options = ToDictionary(options);
  this._streaming = false;
  this._BOMseen = false;
  this._decoder = null;
  this._fatal = Boolean(options["fatal"]);
  this._ignoreBOM = Boolean(options["ignoreBOM"]);
  Object.defineProperty(this, "encoding", { value: "utf-8" });
  Object.defineProperty(this, "fatal", { value: this._fatal });
  Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
}
function TextEncoder(encoding, options) {
  if (!(this instanceof TextEncoder))
    return new TextEncoder(encoding, options);
  encoding = encoding !== void 0 ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
  if (encoding !== DEFAULT_ENCODING) {
    throw new Error("Encoding not supported. Only utf-8 is supported");
  }
  options = ToDictionary(options);
  this._streaming = false;
  this._encoder = null;
  this._options = { fatal: Boolean(options["fatal"]) };
  Object.defineProperty(this, "encoding", { value: "utf-8" });
}
function UTF8Decoder(options) {
  var fatal = options.fatal;
  var utf8_code_point = 0, utf8_bytes_seen = 0, utf8_bytes_needed = 0, utf8_lower_boundary = 128, utf8_upper_boundary = 191;
  this.handler = function(stream, bite) {
    if (bite === end_of_stream && utf8_bytes_needed !== 0) {
      utf8_bytes_needed = 0;
      return decoderError(fatal);
    }
    if (bite === end_of_stream)
      return finished;
    if (utf8_bytes_needed === 0) {
      if (inRange(bite, 0, 127)) {
        return bite;
      }
      if (inRange(bite, 194, 223)) {
        utf8_bytes_needed = 1;
        utf8_code_point = bite - 192;
      } else if (inRange(bite, 224, 239)) {
        if (bite === 224)
          utf8_lower_boundary = 160;
        if (bite === 237)
          utf8_upper_boundary = 159;
        utf8_bytes_needed = 2;
        utf8_code_point = bite - 224;
      } else if (inRange(bite, 240, 244)) {
        if (bite === 240)
          utf8_lower_boundary = 144;
        if (bite === 244)
          utf8_upper_boundary = 143;
        utf8_bytes_needed = 3;
        utf8_code_point = bite - 240;
      } else {
        return decoderError(fatal);
      }
      utf8_code_point = utf8_code_point << 6 * utf8_bytes_needed;
      return null;
    }
    if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {
      utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
      utf8_lower_boundary = 128;
      utf8_upper_boundary = 191;
      stream.prepend(bite);
      return decoderError(fatal);
    }
    utf8_lower_boundary = 128;
    utf8_upper_boundary = 191;
    utf8_bytes_seen += 1;
    utf8_code_point += bite - 128 << 6 * (utf8_bytes_needed - utf8_bytes_seen);
    if (utf8_bytes_seen !== utf8_bytes_needed)
      return null;
    var code_point = utf8_code_point;
    utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
    return code_point;
  };
}
function UTF8Encoder(options) {
  var fatal = options.fatal;
  this.handler = function(stream, code_point) {
    if (code_point === end_of_stream)
      return finished;
    if (inRange(code_point, 0, 127))
      return code_point;
    var count, offset2;
    if (inRange(code_point, 128, 2047)) {
      count = 1;
      offset2 = 192;
    } else if (inRange(code_point, 2048, 65535)) {
      count = 2;
      offset2 = 224;
    } else if (inRange(code_point, 65536, 1114111)) {
      count = 3;
      offset2 = 240;
    }
    var bytes = [(code_point >> 6 * count) + offset2];
    while (count > 0) {
      var temp = code_point >> 6 * (count - 1);
      bytes.push(128 | temp & 63);
      count -= 1;
    }
    return bytes;
  };
}
var end_of_stream, finished, DEFAULT_ENCODING;
var init_encoding = __esm({
  "node_modules/text-encoding-utf-8/src/encoding.js"() {
    "use strict";
    end_of_stream = -1;
    Stream.prototype = {
      /**
       * @return {boolean} True if end-of-stream has been hit.
       */
      endOfStream: function() {
        return !this.tokens.length;
      },
      /**
       * When a token is read from a stream, the first token in the
       * stream must be returned and subsequently removed, and
       * end-of-stream must be returned otherwise.
       *
       * @return {number} Get the next token from the stream, or
       * end_of_stream.
       */
      read: function() {
        if (!this.tokens.length)
          return end_of_stream;
        return this.tokens.shift();
      },
      /**
       * When one or more tokens are prepended to a stream, those tokens
       * must be inserted, in given order, before the first token in the
       * stream.
       *
       * @param {(number|!Array.<number>)} token The token(s) to prepend to the stream.
       */
      prepend: function(token) {
        if (Array.isArray(token)) {
          var tokens = (
            /**@type {!Array.<number>}*/
            token
          );
          while (tokens.length)
            this.tokens.unshift(tokens.pop());
        } else {
          this.tokens.unshift(token);
        }
      },
      /**
       * When one or more tokens are pushed to a stream, those tokens
       * must be inserted, in given order, after the last token in the
       * stream.
       *
       * @param {(number|!Array.<number>)} token The tokens(s) to prepend to the stream.
       */
      push: function(token) {
        if (Array.isArray(token)) {
          var tokens = (
            /**@type {!Array.<number>}*/
            token
          );
          while (tokens.length)
            this.tokens.push(tokens.shift());
        } else {
          this.tokens.push(token);
        }
      }
    };
    finished = -1;
    Decoder.prototype = {
      /**
       * @param {Stream} stream The stream of bytes being decoded.
       * @param {number} bite The next byte read from the stream.
       * @return {?(number|!Array.<number>)} The next code point(s)
       *     decoded, or null if not enough data exists in the input
       *     stream to decode a complete code point, or |finished|.
       */
      handler: function(stream, bite) {
      }
    };
    Encoder.prototype = {
      /**
       * @param {Stream} stream The stream of code points being encoded.
       * @param {number} code_point Next code point read from the stream.
       * @return {(number|!Array.<number>)} Byte(s) to emit, or |finished|.
       */
      handler: function(stream, code_point) {
      }
    };
    DEFAULT_ENCODING = "utf-8";
    TextDecoder2.prototype = {
      /**
       * @param {ArrayBufferView=} input The buffer of bytes to decode.
       * @param {Object=} options
       * @return {string} The decoded string.
       */
      decode: function decode(input, options) {
        var bytes;
        if (typeof input === "object" && input instanceof ArrayBuffer) {
          bytes = new Uint8Array(input);
        } else if (typeof input === "object" && "buffer" in input && input.buffer instanceof ArrayBuffer) {
          bytes = new Uint8Array(
            input.buffer,
            input.byteOffset,
            input.byteLength
          );
        } else {
          bytes = new Uint8Array(0);
        }
        options = ToDictionary(options);
        if (!this._streaming) {
          this._decoder = new UTF8Decoder({ fatal: this._fatal });
          this._BOMseen = false;
        }
        this._streaming = Boolean(options["stream"]);
        var input_stream = new Stream(bytes);
        var code_points = [];
        var result;
        while (!input_stream.endOfStream()) {
          result = this._decoder.handler(input_stream, input_stream.read());
          if (result === finished)
            break;
          if (result === null)
            continue;
          if (Array.isArray(result))
            code_points.push.apply(
              code_points,
              /**@type {!Array.<number>}*/
              result
            );
          else
            code_points.push(result);
        }
        if (!this._streaming) {
          do {
            result = this._decoder.handler(input_stream, input_stream.read());
            if (result === finished)
              break;
            if (result === null)
              continue;
            if (Array.isArray(result))
              code_points.push.apply(
                code_points,
                /**@type {!Array.<number>}*/
                result
              );
            else
              code_points.push(result);
          } while (!input_stream.endOfStream());
          this._decoder = null;
        }
        if (code_points.length) {
          if (["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen) {
            if (code_points[0] === 65279) {
              this._BOMseen = true;
              code_points.shift();
            } else {
              this._BOMseen = true;
            }
          }
        }
        return codePointsToString(code_points);
      }
    };
    TextEncoder.prototype = {
      /**
       * @param {string=} opt_string The string to encode.
       * @param {Object=} options
       * @return {Uint8Array} Encoded bytes, as a Uint8Array.
       */
      encode: function encode(opt_string, options) {
        opt_string = opt_string ? String(opt_string) : "";
        options = ToDictionary(options);
        if (!this._streaming)
          this._encoder = new UTF8Encoder(this._options);
        this._streaming = Boolean(options["stream"]);
        var bytes = [];
        var input_stream = new Stream(stringToCodePoints(opt_string));
        var result;
        while (!input_stream.endOfStream()) {
          result = this._encoder.handler(input_stream, input_stream.read());
          if (result === finished)
            break;
          if (Array.isArray(result))
            bytes.push.apply(
              bytes,
              /**@type {!Array.<number>}*/
              result
            );
          else
            bytes.push(result);
        }
        if (!this._streaming) {
          while (true) {
            result = this._encoder.handler(input_stream, input_stream.read());
            if (result === finished)
              break;
            if (Array.isArray(result))
              bytes.push.apply(
                bytes,
                /**@type {!Array.<number>}*/
                result
              );
            else
              bytes.push(result);
          }
          this._encoder = null;
        }
        return new Uint8Array(bytes);
      }
    };
  }
});

// node_modules/borsh/lib/index.js
var require_lib = __commonJS({
  "node_modules/borsh/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports && exports.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule) return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2) if (k !== "default" && Object.hasOwnProperty.call(mod2, k)) __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deserializeUnchecked = exports.deserialize = exports.serialize = exports.BinaryReader = exports.BinaryWriter = exports.BorshError = exports.baseDecode = exports.baseEncode = void 0;
    var bn_js_1 = __importDefault(require_bn());
    var bs58_1 = __importDefault(require_bs58());
    var encoding = __importStar((init_encoding(), __toCommonJS(encoding_exports)));
    var ResolvedTextDecoder = typeof TextDecoder !== "function" ? encoding.TextDecoder : TextDecoder;
    var textDecoder = new ResolvedTextDecoder("utf-8", { fatal: true });
    function baseEncode(value) {
      if (typeof value === "string") {
        value = Buffer.from(value, "utf8");
      }
      return bs58_1.default.encode(Buffer.from(value));
    }
    exports.baseEncode = baseEncode;
    function baseDecode(value) {
      return Buffer.from(bs58_1.default.decode(value));
    }
    exports.baseDecode = baseDecode;
    var INITIAL_LENGTH = 1024;
    var BorshError = class extends Error {
      constructor(message) {
        super(message);
        this.fieldPath = [];
        this.originalMessage = message;
      }
      addToFieldPath(fieldName) {
        this.fieldPath.splice(0, 0, fieldName);
        this.message = this.originalMessage + ": " + this.fieldPath.join(".");
      }
    };
    exports.BorshError = BorshError;
    var BinaryWriter = class {
      constructor() {
        this.buf = Buffer.alloc(INITIAL_LENGTH);
        this.length = 0;
      }
      maybeResize() {
        if (this.buf.length < 16 + this.length) {
          this.buf = Buffer.concat([this.buf, Buffer.alloc(INITIAL_LENGTH)]);
        }
      }
      writeU8(value) {
        this.maybeResize();
        this.buf.writeUInt8(value, this.length);
        this.length += 1;
      }
      writeU16(value) {
        this.maybeResize();
        this.buf.writeUInt16LE(value, this.length);
        this.length += 2;
      }
      writeU32(value) {
        this.maybeResize();
        this.buf.writeUInt32LE(value, this.length);
        this.length += 4;
      }
      writeU64(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 8)));
      }
      writeU128(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 16)));
      }
      writeU256(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 32)));
      }
      writeU512(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 64)));
      }
      writeBuffer(buffer) {
        this.buf = Buffer.concat([
          Buffer.from(this.buf.subarray(0, this.length)),
          buffer,
          Buffer.alloc(INITIAL_LENGTH)
        ]);
        this.length += buffer.length;
      }
      writeString(str) {
        this.maybeResize();
        const b = Buffer.from(str, "utf8");
        this.writeU32(b.length);
        this.writeBuffer(b);
      }
      writeFixedArray(array2) {
        this.writeBuffer(Buffer.from(array2));
      }
      writeArray(array2, fn) {
        this.maybeResize();
        this.writeU32(array2.length);
        for (const elem of array2) {
          this.maybeResize();
          fn(elem);
        }
      }
      toArray() {
        return this.buf.subarray(0, this.length);
      }
    };
    exports.BinaryWriter = BinaryWriter;
    function handlingRangeError(target, propertyKey, propertyDescriptor) {
      const originalMethod = propertyDescriptor.value;
      propertyDescriptor.value = function(...args) {
        try {
          return originalMethod.apply(this, args);
        } catch (e) {
          if (e instanceof RangeError) {
            const code = e.code;
            if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(code) >= 0) {
              throw new BorshError("Reached the end of buffer when deserializing");
            }
          }
          throw e;
        }
      };
    }
    var BinaryReader = class {
      constructor(buf) {
        this.buf = buf;
        this.offset = 0;
      }
      readU8() {
        const value = this.buf.readUInt8(this.offset);
        this.offset += 1;
        return value;
      }
      readU16() {
        const value = this.buf.readUInt16LE(this.offset);
        this.offset += 2;
        return value;
      }
      readU32() {
        const value = this.buf.readUInt32LE(this.offset);
        this.offset += 4;
        return value;
      }
      readU64() {
        const buf = this.readBuffer(8);
        return new bn_js_1.default(buf, "le");
      }
      readU128() {
        const buf = this.readBuffer(16);
        return new bn_js_1.default(buf, "le");
      }
      readU256() {
        const buf = this.readBuffer(32);
        return new bn_js_1.default(buf, "le");
      }
      readU512() {
        const buf = this.readBuffer(64);
        return new bn_js_1.default(buf, "le");
      }
      readBuffer(len) {
        if (this.offset + len > this.buf.length) {
          throw new BorshError(`Expected buffer length ${len} isn't within bounds`);
        }
        const result = this.buf.slice(this.offset, this.offset + len);
        this.offset += len;
        return result;
      }
      readString() {
        const len = this.readU32();
        const buf = this.readBuffer(len);
        try {
          return textDecoder.decode(buf);
        } catch (e) {
          throw new BorshError(`Error decoding UTF-8 string: ${e}`);
        }
      }
      readFixedArray(len) {
        return new Uint8Array(this.readBuffer(len));
      }
      readArray(fn) {
        const len = this.readU32();
        const result = Array();
        for (let i = 0; i < len; ++i) {
          result.push(fn());
        }
        return result;
      }
    };
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU8", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU16", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU32", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU64", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU128", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU256", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU512", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readString", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readFixedArray", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readArray", null);
    exports.BinaryReader = BinaryReader;
    function capitalizeFirstLetter(string2) {
      return string2.charAt(0).toUpperCase() + string2.slice(1);
    }
    function serializeField(schema, fieldName, value, fieldType, writer) {
      try {
        if (typeof fieldType === "string") {
          writer[`write${capitalizeFirstLetter(fieldType)}`](value);
        } else if (fieldType instanceof Array) {
          if (typeof fieldType[0] === "number") {
            if (value.length !== fieldType[0]) {
              throw new BorshError(`Expecting byte array of length ${fieldType[0]}, but got ${value.length} bytes`);
            }
            writer.writeFixedArray(value);
          } else if (fieldType.length === 2 && typeof fieldType[1] === "number") {
            if (value.length !== fieldType[1]) {
              throw new BorshError(`Expecting byte array of length ${fieldType[1]}, but got ${value.length} bytes`);
            }
            for (let i = 0; i < fieldType[1]; i++) {
              serializeField(schema, null, value[i], fieldType[0], writer);
            }
          } else {
            writer.writeArray(value, (item) => {
              serializeField(schema, fieldName, item, fieldType[0], writer);
            });
          }
        } else if (fieldType.kind !== void 0) {
          switch (fieldType.kind) {
            case "option": {
              if (value === null || value === void 0) {
                writer.writeU8(0);
              } else {
                writer.writeU8(1);
                serializeField(schema, fieldName, value, fieldType.type, writer);
              }
              break;
            }
            case "map": {
              writer.writeU32(value.size);
              value.forEach((val, key) => {
                serializeField(schema, fieldName, key, fieldType.key, writer);
                serializeField(schema, fieldName, val, fieldType.value, writer);
              });
              break;
            }
            default:
              throw new BorshError(`FieldType ${fieldType} unrecognized`);
          }
        } else {
          serializeStruct(schema, value, writer);
        }
      } catch (error) {
        if (error instanceof BorshError) {
          error.addToFieldPath(fieldName);
        }
        throw error;
      }
    }
    function serializeStruct(schema, obj, writer) {
      if (typeof obj.borshSerialize === "function") {
        obj.borshSerialize(writer);
        return;
      }
      const structSchema = schema.get(obj.constructor);
      if (!structSchema) {
        throw new BorshError(`Class ${obj.constructor.name} is missing in schema`);
      }
      if (structSchema.kind === "struct") {
        structSchema.fields.map(([fieldName, fieldType]) => {
          serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
        });
      } else if (structSchema.kind === "enum") {
        const name = obj[structSchema.field];
        for (let idx = 0; idx < structSchema.values.length; ++idx) {
          const [fieldName, fieldType] = structSchema.values[idx];
          if (fieldName === name) {
            writer.writeU8(idx);
            serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
            break;
          }
        }
      } else {
        throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${obj.constructor.name}`);
      }
    }
    function serialize2(schema, obj, Writer = BinaryWriter) {
      const writer = new Writer();
      serializeStruct(schema, obj, writer);
      return writer.toArray();
    }
    exports.serialize = serialize2;
    function deserializeField(schema, fieldName, fieldType, reader) {
      try {
        if (typeof fieldType === "string") {
          return reader[`read${capitalizeFirstLetter(fieldType)}`]();
        }
        if (fieldType instanceof Array) {
          if (typeof fieldType[0] === "number") {
            return reader.readFixedArray(fieldType[0]);
          } else if (typeof fieldType[1] === "number") {
            const arr = [];
            for (let i = 0; i < fieldType[1]; i++) {
              arr.push(deserializeField(schema, null, fieldType[0], reader));
            }
            return arr;
          } else {
            return reader.readArray(() => deserializeField(schema, fieldName, fieldType[0], reader));
          }
        }
        if (fieldType.kind === "option") {
          const option = reader.readU8();
          if (option) {
            return deserializeField(schema, fieldName, fieldType.type, reader);
          }
          return void 0;
        }
        if (fieldType.kind === "map") {
          let map = /* @__PURE__ */ new Map();
          const length = reader.readU32();
          for (let i = 0; i < length; i++) {
            const key = deserializeField(schema, fieldName, fieldType.key, reader);
            const val = deserializeField(schema, fieldName, fieldType.value, reader);
            map.set(key, val);
          }
          return map;
        }
        return deserializeStruct(schema, fieldType, reader);
      } catch (error) {
        if (error instanceof BorshError) {
          error.addToFieldPath(fieldName);
        }
        throw error;
      }
    }
    function deserializeStruct(schema, classType, reader) {
      if (typeof classType.borshDeserialize === "function") {
        return classType.borshDeserialize(reader);
      }
      const structSchema = schema.get(classType);
      if (!structSchema) {
        throw new BorshError(`Class ${classType.name} is missing in schema`);
      }
      if (structSchema.kind === "struct") {
        const result = {};
        for (const [fieldName, fieldType] of schema.get(classType).fields) {
          result[fieldName] = deserializeField(schema, fieldName, fieldType, reader);
        }
        return new classType(result);
      }
      if (structSchema.kind === "enum") {
        const idx = reader.readU8();
        if (idx >= structSchema.values.length) {
          throw new BorshError(`Enum index: ${idx} is out of range`);
        }
        const [fieldName, fieldType] = structSchema.values[idx];
        const fieldValue = deserializeField(schema, fieldName, fieldType, reader);
        return new classType({ [fieldName]: fieldValue });
      }
      throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${classType.constructor.name}`);
    }
    function deserialize2(schema, classType, buffer, Reader = BinaryReader) {
      const reader = new Reader(buffer);
      const result = deserializeStruct(schema, classType, reader);
      if (reader.offset < buffer.length) {
        throw new BorshError(`Unexpected ${buffer.length - reader.offset} bytes after deserialized data`);
      }
      return result;
    }
    exports.deserialize = deserialize2;
    function deserializeUnchecked2(schema, classType, buffer, Reader = BinaryReader) {
      const reader = new Reader(buffer);
      return deserializeStruct(schema, classType, reader);
    }
    exports.deserializeUnchecked = deserializeUnchecked2;
  }
});

// node_modules/@solana/buffer-layout/lib/Layout.js
var require_Layout = __commonJS({
  "node_modules/@solana/buffer-layout/lib/Layout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.s16 = exports.s8 = exports.nu64be = exports.u48be = exports.u40be = exports.u32be = exports.u24be = exports.u16be = exports.nu64 = exports.u48 = exports.u40 = exports.u32 = exports.u24 = exports.u16 = exports.u8 = exports.offset = exports.greedy = exports.Constant = exports.UTF8 = exports.CString = exports.Blob = exports.Boolean = exports.BitField = exports.BitStructure = exports.VariantLayout = exports.Union = exports.UnionLayoutDiscriminator = exports.UnionDiscriminator = exports.Structure = exports.Sequence = exports.DoubleBE = exports.Double = exports.FloatBE = exports.Float = exports.NearInt64BE = exports.NearInt64 = exports.NearUInt64BE = exports.NearUInt64 = exports.IntBE = exports.Int = exports.UIntBE = exports.UInt = exports.OffsetLayout = exports.GreedyCount = exports.ExternalLayout = exports.bindConstructorLayout = exports.nameWithProperty = exports.Layout = exports.uint8ArrayToBuffer = exports.checkUint8Array = void 0;
    exports.constant = exports.utf8 = exports.cstr = exports.blob = exports.unionLayoutDiscriminator = exports.union = exports.seq = exports.bits = exports.struct = exports.f64be = exports.f64 = exports.f32be = exports.f32 = exports.ns64be = exports.s48be = exports.s40be = exports.s32be = exports.s24be = exports.s16be = exports.ns64 = exports.s48 = exports.s40 = exports.s32 = exports.s24 = void 0;
    var buffer_1 = require_buffer2();
    function checkUint8Array(b) {
      if (!(b instanceof Uint8Array)) {
        throw new TypeError("b must be a Uint8Array");
      }
    }
    exports.checkUint8Array = checkUint8Array;
    function uint8ArrayToBuffer(b) {
      checkUint8Array(b);
      return buffer_1.Buffer.from(b.buffer, b.byteOffset, b.length);
    }
    exports.uint8ArrayToBuffer = uint8ArrayToBuffer;
    var Layout = class {
      constructor(span, property) {
        if (!Number.isInteger(span)) {
          throw new TypeError("span must be an integer");
        }
        this.span = span;
        this.property = property;
      }
      /** Function to create an Object into which decoded properties will
       * be written.
       *
       * Used only for layouts that {@link Layout#decode|decode} to Object
       * instances, which means:
       * * {@link Structure}
       * * {@link Union}
       * * {@link VariantLayout}
       * * {@link BitStructure}
       *
       * If left undefined the JavaScript representation of these layouts
       * will be Object instances.
       *
       * See {@link bindConstructorLayout}.
       */
      makeDestinationObject() {
        return {};
      }
      /**
       * Calculate the span of a specific instance of a layout.
       *
       * @param {Uint8Array} b - the buffer that contains an encoded instance.
       *
       * @param {Number} [offset] - the offset at which the encoded instance
       * starts.  If absent a zero offset is inferred.
       *
       * @return {Number} - the number of bytes covered by the layout
       * instance.  If this method is not overridden in a subclass the
       * definition-time constant {@link Layout#span|span} will be
       * returned.
       *
       * @throws {RangeError} - if the length of the value cannot be
       * determined.
       */
      getSpan(b, offset2) {
        if (0 > this.span) {
          throw new RangeError("indeterminate span");
        }
        return this.span;
      }
      /**
       * Replicate the layout using a new property.
       *
       * This function must be used to get a structurally-equivalent layout
       * with a different name since all {@link Layout} instances are
       * immutable.
       *
       * **NOTE** This is a shallow copy.  All fields except {@link
       * Layout#property|property} are strictly equal to the origin layout.
       *
       * @param {String} property - the value for {@link
       * Layout#property|property} in the replica.
       *
       * @returns {Layout} - the copy with {@link Layout#property|property}
       * set to `property`.
       */
      replicate(property) {
        const rv = Object.create(this.constructor.prototype);
        Object.assign(rv, this);
        rv.property = property;
        return rv;
      }
      /**
       * Create an object from layout properties and an array of values.
       *
       * **NOTE** This function returns `undefined` if invoked on a layout
       * that does not return its value as an Object.  Objects are
       * returned for things that are a {@link Structure}, which includes
       * {@link VariantLayout|variant layouts} if they are structures, and
       * excludes {@link Union}s.  If you want this feature for a union
       * you must use {@link Union.getVariant|getVariant} to select the
       * desired layout.
       *
       * @param {Array} values - an array of values that correspond to the
       * default order for properties.  As with {@link Layout#decode|decode}
       * layout elements that have no property name are skipped when
       * iterating over the array values.  Only the top-level properties are
       * assigned; arguments are not assigned to properties of contained
       * layouts.  Any unused values are ignored.
       *
       * @return {(Object|undefined)}
       */
      fromArray(values) {
        return void 0;
      }
    };
    exports.Layout = Layout;
    function nameWithProperty(name, lo) {
      if (lo.property) {
        return name + "[" + lo.property + "]";
      }
      return name;
    }
    exports.nameWithProperty = nameWithProperty;
    function bindConstructorLayout(Class, layout) {
      if ("function" !== typeof Class) {
        throw new TypeError("Class must be constructor");
      }
      if (Object.prototype.hasOwnProperty.call(Class, "layout_")) {
        throw new Error("Class is already bound to a layout");
      }
      if (!(layout && layout instanceof Layout)) {
        throw new TypeError("layout must be a Layout");
      }
      if (Object.prototype.hasOwnProperty.call(layout, "boundConstructor_")) {
        throw new Error("layout is already bound to a constructor");
      }
      Class.layout_ = layout;
      layout.boundConstructor_ = Class;
      layout.makeDestinationObject = () => new Class();
      Object.defineProperty(Class.prototype, "encode", {
        value(b, offset2) {
          return layout.encode(this, b, offset2);
        },
        writable: true
      });
      Object.defineProperty(Class, "decode", {
        value(b, offset2) {
          return layout.decode(b, offset2);
        },
        writable: true
      });
    }
    exports.bindConstructorLayout = bindConstructorLayout;
    var ExternalLayout = class extends Layout {
      /**
       * Return `true` iff the external layout decodes to an unsigned
       * integer layout.
       *
       * In that case it can be used as the source of {@link
       * Sequence#count|Sequence counts}, {@link Blob#length|Blob lengths},
       * or as {@link UnionLayoutDiscriminator#layout|external union
       * discriminators}.
       *
       * @abstract
       */
      isCount() {
        throw new Error("ExternalLayout is abstract");
      }
    };
    exports.ExternalLayout = ExternalLayout;
    var GreedyCount = class extends ExternalLayout {
      constructor(elementSpan = 1, property) {
        if (!Number.isInteger(elementSpan) || 0 >= elementSpan) {
          throw new TypeError("elementSpan must be a (positive) integer");
        }
        super(-1, property);
        this.elementSpan = elementSpan;
      }
      /** @override */
      isCount() {
        return true;
      }
      /** @override */
      decode(b, offset2 = 0) {
        checkUint8Array(b);
        const rem = b.length - offset2;
        return Math.floor(rem / this.elementSpan);
      }
      /** @override */
      encode(src, b, offset2) {
        return 0;
      }
    };
    exports.GreedyCount = GreedyCount;
    var OffsetLayout = class extends ExternalLayout {
      constructor(layout, offset2 = 0, property) {
        if (!(layout instanceof Layout)) {
          throw new TypeError("layout must be a Layout");
        }
        if (!Number.isInteger(offset2)) {
          throw new TypeError("offset must be integer or undefined");
        }
        super(layout.span, property || layout.property);
        this.layout = layout;
        this.offset = offset2;
      }
      /** @override */
      isCount() {
        return this.layout instanceof UInt || this.layout instanceof UIntBE;
      }
      /** @override */
      decode(b, offset2 = 0) {
        return this.layout.decode(b, offset2 + this.offset);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        return this.layout.encode(src, b, offset2 + this.offset);
      }
    };
    exports.OffsetLayout = OffsetLayout;
    var UInt = class extends Layout {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readUIntLE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeUIntLE(src, offset2, this.span);
        return this.span;
      }
    };
    exports.UInt = UInt;
    var UIntBE = class extends Layout {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readUIntBE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeUIntBE(src, offset2, this.span);
        return this.span;
      }
    };
    exports.UIntBE = UIntBE;
    var Int = class extends Layout {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readIntLE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeIntLE(src, offset2, this.span);
        return this.span;
      }
    };
    exports.Int = Int;
    var IntBE = class extends Layout {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readIntBE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeIntBE(src, offset2, this.span);
        return this.span;
      }
    };
    exports.IntBE = IntBE;
    var V2E32 = Math.pow(2, 32);
    function divmodInt64(src) {
      const hi32 = Math.floor(src / V2E32);
      const lo32 = src - hi32 * V2E32;
      return { hi32, lo32 };
    }
    function roundedInt64(hi32, lo32) {
      return hi32 * V2E32 + lo32;
    }
    var NearUInt64 = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const lo32 = buffer.readUInt32LE(offset2);
        const hi32 = buffer.readUInt32LE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split.lo32, offset2);
        buffer.writeUInt32LE(split.hi32, offset2 + 4);
        return 8;
      }
    };
    exports.NearUInt64 = NearUInt64;
    var NearUInt64BE = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const hi32 = buffer.readUInt32BE(offset2);
        const lo32 = buffer.readUInt32BE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32BE(split.hi32, offset2);
        buffer.writeUInt32BE(split.lo32, offset2 + 4);
        return 8;
      }
    };
    exports.NearUInt64BE = NearUInt64BE;
    var NearInt64 = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const lo32 = buffer.readUInt32LE(offset2);
        const hi32 = buffer.readInt32LE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split.lo32, offset2);
        buffer.writeInt32LE(split.hi32, offset2 + 4);
        return 8;
      }
    };
    exports.NearInt64 = NearInt64;
    var NearInt64BE = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const hi32 = buffer.readInt32BE(offset2);
        const lo32 = buffer.readUInt32BE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeInt32BE(split.hi32, offset2);
        buffer.writeUInt32BE(split.lo32, offset2 + 4);
        return 8;
      }
    };
    exports.NearInt64BE = NearInt64BE;
    var Float = class extends Layout {
      constructor(property) {
        super(4, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readFloatLE(offset2);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeFloatLE(src, offset2);
        return 4;
      }
    };
    exports.Float = Float;
    var FloatBE = class extends Layout {
      constructor(property) {
        super(4, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readFloatBE(offset2);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeFloatBE(src, offset2);
        return 4;
      }
    };
    exports.FloatBE = FloatBE;
    var Double = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readDoubleLE(offset2);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeDoubleLE(src, offset2);
        return 8;
      }
    };
    exports.Double = Double;
    var DoubleBE = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readDoubleBE(offset2);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeDoubleBE(src, offset2);
        return 8;
      }
    };
    exports.DoubleBE = DoubleBE;
    var Sequence = class extends Layout {
      constructor(elementLayout, count, property) {
        if (!(elementLayout instanceof Layout)) {
          throw new TypeError("elementLayout must be a Layout");
        }
        if (!(count instanceof ExternalLayout && count.isCount() || Number.isInteger(count) && 0 <= count)) {
          throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
        }
        let span = -1;
        if (!(count instanceof ExternalLayout) && 0 < elementLayout.span) {
          span = count * elementLayout.span;
        }
        super(span, property);
        this.elementLayout = elementLayout;
        this.count = count;
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        if (0 <= this.span) {
          return this.span;
        }
        let span = 0;
        let count = this.count;
        if (count instanceof ExternalLayout) {
          count = count.decode(b, offset2);
        }
        if (0 < this.elementLayout.span) {
          span = count * this.elementLayout.span;
        } else {
          let idx = 0;
          while (idx < count) {
            span += this.elementLayout.getSpan(b, offset2 + span);
            ++idx;
          }
        }
        return span;
      }
      /** @override */
      decode(b, offset2 = 0) {
        const rv = [];
        let i = 0;
        let count = this.count;
        if (count instanceof ExternalLayout) {
          count = count.decode(b, offset2);
        }
        while (i < count) {
          rv.push(this.elementLayout.decode(b, offset2));
          offset2 += this.elementLayout.getSpan(b, offset2);
          i += 1;
        }
        return rv;
      }
      /** Implement {@link Layout#encode|encode} for {@link Sequence}.
       *
       * **NOTE** If `src` is shorter than {@link Sequence#count|count} then
       * the unused space in the buffer is left unchanged.  If `src` is
       * longer than {@link Sequence#count|count} the unneeded elements are
       * ignored.
       *
       * **NOTE** If {@link Layout#count|count} is an instance of {@link
       * ExternalLayout} then the length of `src` will be encoded as the
       * count after `src` is encoded. */
      encode(src, b, offset2 = 0) {
        const elo = this.elementLayout;
        const span = src.reduce((span2, v) => {
          return span2 + elo.encode(v, b, offset2 + span2);
        }, 0);
        if (this.count instanceof ExternalLayout) {
          this.count.encode(src.length, b, offset2);
        }
        return span;
      }
    };
    exports.Sequence = Sequence;
    var Structure = class extends Layout {
      constructor(fields, property, decodePrefixes) {
        if (!(Array.isArray(fields) && fields.reduce((acc, v) => acc && v instanceof Layout, true))) {
          throw new TypeError("fields must be array of Layout instances");
        }
        if ("boolean" === typeof property && void 0 === decodePrefixes) {
          decodePrefixes = property;
          property = void 0;
        }
        for (const fd of fields) {
          if (0 > fd.span && void 0 === fd.property) {
            throw new Error("fields cannot contain unnamed variable-length layout");
          }
        }
        let span = -1;
        try {
          span = fields.reduce((span2, fd) => span2 + fd.getSpan(), 0);
        } catch (e) {
        }
        super(span, property);
        this.fields = fields;
        this.decodePrefixes = !!decodePrefixes;
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        if (0 <= this.span) {
          return this.span;
        }
        let span = 0;
        try {
          span = this.fields.reduce((span2, fd) => {
            const fsp = fd.getSpan(b, offset2);
            offset2 += fsp;
            return span2 + fsp;
          }, 0);
        } catch (e) {
          throw new RangeError("indeterminate span");
        }
        return span;
      }
      /** @override */
      decode(b, offset2 = 0) {
        checkUint8Array(b);
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            dest[fd.property] = fd.decode(b, offset2);
          }
          offset2 += fd.getSpan(b, offset2);
          if (this.decodePrefixes && b.length === offset2) {
            break;
          }
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link Structure}.
       *
       * If `src` is missing a property for a member with a defined {@link
       * Layout#property|property} the corresponding region of the buffer is
       * left unmodified. */
      encode(src, b, offset2 = 0) {
        const firstOffset = offset2;
        let lastOffset = 0;
        let lastWrote = 0;
        for (const fd of this.fields) {
          let span = fd.span;
          lastWrote = 0 < span ? span : 0;
          if (void 0 !== fd.property) {
            const fv = src[fd.property];
            if (void 0 !== fv) {
              lastWrote = fd.encode(fv, b, offset2);
              if (0 > span) {
                span = fd.getSpan(b, offset2);
              }
            }
          }
          lastOffset = offset2;
          offset2 += span;
        }
        return lastOffset + lastWrote - firstOffset;
      }
      /** @override */
      fromArray(values) {
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
          if (void 0 !== fd.property && 0 < values.length) {
            dest[fd.property] = values.shift();
          }
        }
        return dest;
      }
      /**
       * Get access to the layout of a given property.
       *
       * @param {String} property - the structure member of interest.
       *
       * @return {Layout} - the layout associated with `property`, or
       * undefined if there is no such property.
       */
      layoutFor(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        for (const fd of this.fields) {
          if (fd.property === property) {
            return fd;
          }
        }
        return void 0;
      }
      /**
       * Get the offset of a structure member.
       *
       * @param {String} property - the structure member of interest.
       *
       * @return {Number} - the offset in bytes to the start of `property`
       * within the structure, or undefined if `property` is not a field
       * within the structure.  If the property is a member but follows a
       * variable-length structure member a negative number will be
       * returned.
       */
      offsetOf(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        let offset2 = 0;
        for (const fd of this.fields) {
          if (fd.property === property) {
            return offset2;
          }
          if (0 > fd.span) {
            offset2 = -1;
          } else if (0 <= offset2) {
            offset2 += fd.span;
          }
        }
        return void 0;
      }
    };
    exports.Structure = Structure;
    var UnionDiscriminator = class {
      constructor(property) {
        this.property = property;
      }
      /** Analog to {@link Layout#decode|Layout decode} for union discriminators.
       *
       * The implementation of this method need not reference the buffer if
       * variant information is available through other means. */
      decode(b, offset2) {
        throw new Error("UnionDiscriminator is abstract");
      }
      /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
       *
       * The implementation of this method need not store the value if
       * variant information is maintained through other means. */
      encode(src, b, offset2) {
        throw new Error("UnionDiscriminator is abstract");
      }
    };
    exports.UnionDiscriminator = UnionDiscriminator;
    var UnionLayoutDiscriminator = class extends UnionDiscriminator {
      constructor(layout, property) {
        if (!(layout instanceof ExternalLayout && layout.isCount())) {
          throw new TypeError("layout must be an unsigned integer ExternalLayout");
        }
        super(property || layout.property || "variant");
        this.layout = layout;
      }
      /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
      decode(b, offset2) {
        return this.layout.decode(b, offset2);
      }
      /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
      encode(src, b, offset2) {
        return this.layout.encode(src, b, offset2);
      }
    };
    exports.UnionLayoutDiscriminator = UnionLayoutDiscriminator;
    var Union = class extends Layout {
      constructor(discr, defaultLayout, property) {
        let discriminator;
        if (discr instanceof UInt || discr instanceof UIntBE) {
          discriminator = new UnionLayoutDiscriminator(new OffsetLayout(discr));
        } else if (discr instanceof ExternalLayout && discr.isCount()) {
          discriminator = new UnionLayoutDiscriminator(discr);
        } else if (!(discr instanceof UnionDiscriminator)) {
          throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
        } else {
          discriminator = discr;
        }
        if (void 0 === defaultLayout) {
          defaultLayout = null;
        }
        if (!(null === defaultLayout || defaultLayout instanceof Layout)) {
          throw new TypeError("defaultLayout must be null or a Layout");
        }
        if (null !== defaultLayout) {
          if (0 > defaultLayout.span) {
            throw new Error("defaultLayout must have constant span");
          }
          if (void 0 === defaultLayout.property) {
            defaultLayout = defaultLayout.replicate("content");
          }
        }
        let span = -1;
        if (defaultLayout) {
          span = defaultLayout.span;
          if (0 <= span && (discr instanceof UInt || discr instanceof UIntBE)) {
            span += discriminator.layout.span;
          }
        }
        super(span, property);
        this.discriminator = discriminator;
        this.usesPrefixDiscriminator = discr instanceof UInt || discr instanceof UIntBE;
        this.defaultLayout = defaultLayout;
        this.registry = {};
        let boundGetSourceVariant = this.defaultGetSourceVariant.bind(this);
        this.getSourceVariant = function(src) {
          return boundGetSourceVariant(src);
        };
        this.configGetSourceVariant = function(gsv) {
          boundGetSourceVariant = gsv.bind(this);
        };
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        if (0 <= this.span) {
          return this.span;
        }
        const vlo = this.getVariant(b, offset2);
        if (!vlo) {
          throw new Error("unable to determine span for unrecognized variant");
        }
        return vlo.getSpan(b, offset2);
      }
      /**
       * Method to infer a registered Union variant compatible with `src`.
       *
       * The first satisfied rule in the following sequence defines the
       * return value:
       * * If `src` has properties matching the Union discriminator and
       *   the default layout, `undefined` is returned regardless of the
       *   value of the discriminator property (this ensures the default
       *   layout will be used);
       * * If `src` has a property matching the Union discriminator, the
       *   value of the discriminator identifies a registered variant, and
       *   either (a) the variant has no layout, or (b) `src` has the
       *   variant's property, then the variant is returned (because the
       *   source satisfies the constraints of the variant it identifies);
       * * If `src` does not have a property matching the Union
       *   discriminator, but does have a property matching a registered
       *   variant, then the variant is returned (because the source
       *   matches a variant without an explicit conflict);
       * * An error is thrown (because we either can't identify a variant,
       *   or we were explicitly told the variant but can't satisfy it).
       *
       * @param {Object} src - an object presumed to be compatible with
       * the content of the Union.
       *
       * @return {(undefined|VariantLayout)} - as described above.
       *
       * @throws {Error} - if `src` cannot be associated with a default or
       * registered variant.
       */
      defaultGetSourceVariant(src) {
        if (Object.prototype.hasOwnProperty.call(src, this.discriminator.property)) {
          if (this.defaultLayout && this.defaultLayout.property && Object.prototype.hasOwnProperty.call(src, this.defaultLayout.property)) {
            return void 0;
          }
          const vlo = this.registry[src[this.discriminator.property]];
          if (vlo && (!vlo.layout || vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property))) {
            return vlo;
          }
        } else {
          for (const tag in this.registry) {
            const vlo = this.registry[tag];
            if (vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property)) {
              return vlo;
            }
          }
        }
        throw new Error("unable to infer src variant");
      }
      /** Implement {@link Layout#decode|decode} for {@link Union}.
       *
       * If the variant is {@link Union#addVariant|registered} the return
       * value is an instance of that variant, with no explicit
       * discriminator.  Otherwise the {@link Union#defaultLayout|default
       * layout} is used to decode the content. */
      decode(b, offset2 = 0) {
        let dest;
        const dlo = this.discriminator;
        const discr = dlo.decode(b, offset2);
        const clo = this.registry[discr];
        if (void 0 === clo) {
          const defaultLayout = this.defaultLayout;
          let contentOffset = 0;
          if (this.usesPrefixDiscriminator) {
            contentOffset = dlo.layout.span;
          }
          dest = this.makeDestinationObject();
          dest[dlo.property] = discr;
          dest[defaultLayout.property] = defaultLayout.decode(b, offset2 + contentOffset);
        } else {
          dest = clo.decode(b, offset2);
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link Union}.
       *
       * This API assumes the `src` object is consistent with the union's
       * {@link Union#defaultLayout|default layout}.  To encode variants
       * use the appropriate variant-specific {@link VariantLayout#encode}
       * method. */
      encode(src, b, offset2 = 0) {
        const vlo = this.getSourceVariant(src);
        if (void 0 === vlo) {
          const dlo = this.discriminator;
          const clo = this.defaultLayout;
          let contentOffset = 0;
          if (this.usesPrefixDiscriminator) {
            contentOffset = dlo.layout.span;
          }
          dlo.encode(src[dlo.property], b, offset2);
          return contentOffset + clo.encode(src[clo.property], b, offset2 + contentOffset);
        }
        return vlo.encode(src, b, offset2);
      }
      /** Register a new variant structure within a union.  The newly
       * created variant is returned.
       *
       * @param {Number} variant - initializer for {@link
       * VariantLayout#variant|variant}.
       *
       * @param {Layout} layout - initializer for {@link
       * VariantLayout#layout|layout}.
       *
       * @param {String} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {VariantLayout} */
      addVariant(variant, layout, property) {
        const rv = new VariantLayout(this, variant, layout, property);
        this.registry[variant] = rv;
        return rv;
      }
      /**
       * Get the layout associated with a registered variant.
       *
       * If `vb` does not produce a registered variant the function returns
       * `undefined`.
       *
       * @param {(Number|Uint8Array)} vb - either the variant number, or a
       * buffer from which the discriminator is to be read.
       *
       * @param {Number} offset - offset into `vb` for the start of the
       * union.  Used only when `vb` is an instance of {Uint8Array}.
       *
       * @return {({VariantLayout}|undefined)}
       */
      getVariant(vb, offset2 = 0) {
        let variant;
        if (vb instanceof Uint8Array) {
          variant = this.discriminator.decode(vb, offset2);
        } else {
          variant = vb;
        }
        return this.registry[variant];
      }
    };
    exports.Union = Union;
    var VariantLayout = class extends Layout {
      constructor(union2, variant, layout, property) {
        if (!(union2 instanceof Union)) {
          throw new TypeError("union must be a Union");
        }
        if (!Number.isInteger(variant) || 0 > variant) {
          throw new TypeError("variant must be a (non-negative) integer");
        }
        if ("string" === typeof layout && void 0 === property) {
          property = layout;
          layout = null;
        }
        if (layout) {
          if (!(layout instanceof Layout)) {
            throw new TypeError("layout must be a Layout");
          }
          if (null !== union2.defaultLayout && 0 <= layout.span && layout.span > union2.defaultLayout.span) {
            throw new Error("variant span exceeds span of containing union");
          }
          if ("string" !== typeof property) {
            throw new TypeError("variant must have a String property");
          }
        }
        let span = union2.span;
        if (0 > union2.span) {
          span = layout ? layout.span : 0;
          if (0 <= span && union2.usesPrefixDiscriminator) {
            span += union2.discriminator.layout.span;
          }
        }
        super(span, property);
        this.union = union2;
        this.variant = variant;
        this.layout = layout || null;
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        if (0 <= this.span) {
          return this.span;
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        let span = 0;
        if (this.layout) {
          span = this.layout.getSpan(b, offset2 + contentOffset);
        }
        return contentOffset + span;
      }
      /** @override */
      decode(b, offset2 = 0) {
        const dest = this.makeDestinationObject();
        if (this !== this.union.getVariant(b, offset2)) {
          throw new Error("variant mismatch");
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout) {
          dest[this.property] = this.layout.decode(b, offset2 + contentOffset);
        } else if (this.property) {
          dest[this.property] = true;
        } else if (this.union.usesPrefixDiscriminator) {
          dest[this.union.discriminator.property] = this.variant;
        }
        return dest;
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout && !Object.prototype.hasOwnProperty.call(src, this.property)) {
          throw new TypeError("variant lacks property " + this.property);
        }
        this.union.discriminator.encode(this.variant, b, offset2);
        let span = contentOffset;
        if (this.layout) {
          this.layout.encode(src[this.property], b, offset2 + contentOffset);
          span += this.layout.getSpan(b, offset2 + contentOffset);
          if (0 <= this.union.span && span > this.union.span) {
            throw new Error("encoded variant overruns containing union");
          }
        }
        return span;
      }
      /** Delegate {@link Layout#fromArray|fromArray} to {@link
       * VariantLayout#layout|layout}. */
      fromArray(values) {
        if (this.layout) {
          return this.layout.fromArray(values);
        }
        return void 0;
      }
    };
    exports.VariantLayout = VariantLayout;
    function fixBitwiseResult(v) {
      if (0 > v) {
        v += 4294967296;
      }
      return v;
    }
    var BitStructure = class extends Layout {
      constructor(word, msb, property) {
        if (!(word instanceof UInt || word instanceof UIntBE)) {
          throw new TypeError("word must be a UInt or UIntBE layout");
        }
        if ("string" === typeof msb && void 0 === property) {
          property = msb;
          msb = false;
        }
        if (4 < word.span) {
          throw new RangeError("word cannot exceed 32 bits");
        }
        super(word.span, property);
        this.word = word;
        this.msb = !!msb;
        this.fields = [];
        let value = 0;
        this._packedSetValue = function(v) {
          value = fixBitwiseResult(v);
          return this;
        };
        this._packedGetValue = function() {
          return value;
        };
      }
      /** @override */
      decode(b, offset2 = 0) {
        const dest = this.makeDestinationObject();
        const value = this.word.decode(b, offset2);
        this._packedSetValue(value);
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            dest[fd.property] = fd.decode(b);
          }
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link BitStructure}.
       *
       * If `src` is missing a property for a member with a defined {@link
       * Layout#property|property} the corresponding region of the packed
       * value is left unmodified.  Unused bits are also left unmodified. */
      encode(src, b, offset2 = 0) {
        const value = this.word.decode(b, offset2);
        this._packedSetValue(value);
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            const fv = src[fd.property];
            if (void 0 !== fv) {
              fd.encode(fv);
            }
          }
        }
        return this.word.encode(this._packedGetValue(), b, offset2);
      }
      /** Register a new bitfield with a containing bit structure.  The
       * resulting bitfield is returned.
       *
       * @param {Number} bits - initializer for {@link BitField#bits|bits}.
       *
       * @param {string} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {BitField} */
      addField(bits, property) {
        const bf = new BitField(this, bits, property);
        this.fields.push(bf);
        return bf;
      }
      /** As with {@link BitStructure#addField|addField} for single-bit
       * fields with `boolean` value representation.
       *
       * @param {string} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {Boolean} */
      // `Boolean` conflicts with the native primitive type
      // eslint-disable-next-line @typescript-eslint/ban-types
      addBoolean(property) {
        const bf = new Boolean2(this, property);
        this.fields.push(bf);
        return bf;
      }
      /**
       * Get access to the bit field for a given property.
       *
       * @param {String} property - the bit field of interest.
       *
       * @return {BitField} - the field associated with `property`, or
       * undefined if there is no such property.
       */
      fieldFor(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        for (const fd of this.fields) {
          if (fd.property === property) {
            return fd;
          }
        }
        return void 0;
      }
    };
    exports.BitStructure = BitStructure;
    var BitField = class {
      constructor(container, bits, property) {
        if (!(container instanceof BitStructure)) {
          throw new TypeError("container must be a BitStructure");
        }
        if (!Number.isInteger(bits) || 0 >= bits) {
          throw new TypeError("bits must be positive integer");
        }
        const totalBits = 8 * container.span;
        const usedBits = container.fields.reduce((sum, fd) => sum + fd.bits, 0);
        if (bits + usedBits > totalBits) {
          throw new Error("bits too long for span remainder (" + (totalBits - usedBits) + " of " + totalBits + " remain)");
        }
        this.container = container;
        this.bits = bits;
        this.valueMask = (1 << bits) - 1;
        if (32 === bits) {
          this.valueMask = 4294967295;
        }
        this.start = usedBits;
        if (this.container.msb) {
          this.start = totalBits - usedBits - bits;
        }
        this.wordMask = fixBitwiseResult(this.valueMask << this.start);
        this.property = property;
      }
      /** Store a value into the corresponding subsequence of the containing
       * bit field. */
      decode(b, offset2) {
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(word & this.wordMask);
        const value = wordValue >>> this.start;
        return value;
      }
      /** Store a value into the corresponding subsequence of the containing
       * bit field.
       *
       * **NOTE** This is not a specialization of {@link
       * Layout#encode|Layout.encode} and there is no return value. */
      encode(value) {
        if ("number" !== typeof value || !Number.isInteger(value) || value !== fixBitwiseResult(value & this.valueMask)) {
          throw new TypeError(nameWithProperty("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
        }
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(value << this.start);
        this.container._packedSetValue(fixBitwiseResult(word & ~this.wordMask) | wordValue);
      }
    };
    exports.BitField = BitField;
    var Boolean2 = class extends BitField {
      constructor(container, property) {
        super(container, 1, property);
      }
      /** Override {@link BitField#decode|decode} for {@link Boolean|Boolean}.
       *
       * @returns {boolean} */
      decode(b, offset2) {
        return !!super.decode(b, offset2);
      }
      /** @override */
      encode(value) {
        if ("boolean" === typeof value) {
          value = +value;
        }
        super.encode(value);
      }
    };
    exports.Boolean = Boolean2;
    var Blob = class extends Layout {
      constructor(length, property) {
        if (!(length instanceof ExternalLayout && length.isCount() || Number.isInteger(length) && 0 <= length)) {
          throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
        }
        let span = -1;
        if (!(length instanceof ExternalLayout)) {
          span = length;
        }
        super(span, property);
        this.length = length;
      }
      /** @override */
      getSpan(b, offset2) {
        let span = this.span;
        if (0 > span) {
          span = this.length.decode(b, offset2);
        }
        return span;
      }
      /** @override */
      decode(b, offset2 = 0) {
        let span = this.span;
        if (0 > span) {
          span = this.length.decode(b, offset2);
        }
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span);
      }
      /** Implement {@link Layout#encode|encode} for {@link Blob}.
       *
       * **NOTE** If {@link Layout#count|count} is an instance of {@link
       * ExternalLayout} then the length of `src` will be encoded as the
       * count after `src` is encoded. */
      encode(src, b, offset2) {
        let span = this.length;
        if (this.length instanceof ExternalLayout) {
          span = src.length;
        }
        if (!(src instanceof Uint8Array && span === src.length)) {
          throw new TypeError(nameWithProperty("Blob.encode", this) + " requires (length " + span + ") Uint8Array as src");
        }
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Uint8Array");
        }
        const srcBuffer = uint8ArrayToBuffer(src);
        uint8ArrayToBuffer(b).write(srcBuffer.toString("hex"), offset2, span, "hex");
        if (this.length instanceof ExternalLayout) {
          this.length.encode(span, b, offset2);
        }
        return span;
      }
    };
    exports.Blob = Blob;
    var CString = class extends Layout {
      constructor(property) {
        super(-1, property);
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        checkUint8Array(b);
        let idx = offset2;
        while (idx < b.length && 0 !== b[idx]) {
          idx += 1;
        }
        return 1 + idx - offset2;
      }
      /** @override */
      decode(b, offset2 = 0) {
        const span = this.getSpan(b, offset2);
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span - 1).toString("utf-8");
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        if ("string" !== typeof src) {
          src = String(src);
        }
        const srcb = buffer_1.Buffer.from(src, "utf8");
        const span = srcb.length;
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        const buffer = uint8ArrayToBuffer(b);
        srcb.copy(buffer, offset2);
        buffer[offset2 + span] = 0;
        return span + 1;
      }
    };
    exports.CString = CString;
    var UTF8 = class extends Layout {
      constructor(maxSpan, property) {
        if ("string" === typeof maxSpan && void 0 === property) {
          property = maxSpan;
          maxSpan = void 0;
        }
        if (void 0 === maxSpan) {
          maxSpan = -1;
        } else if (!Number.isInteger(maxSpan)) {
          throw new TypeError("maxSpan must be an integer");
        }
        super(-1, property);
        this.maxSpan = maxSpan;
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        checkUint8Array(b);
        return b.length - offset2;
      }
      /** @override */
      decode(b, offset2 = 0) {
        const span = this.getSpan(b, offset2);
        if (0 <= this.maxSpan && this.maxSpan < span) {
          throw new RangeError("text length exceeds maxSpan");
        }
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span).toString("utf-8");
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        if ("string" !== typeof src) {
          src = String(src);
        }
        const srcb = buffer_1.Buffer.from(src, "utf8");
        const span = srcb.length;
        if (0 <= this.maxSpan && this.maxSpan < span) {
          throw new RangeError("text length exceeds maxSpan");
        }
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        srcb.copy(uint8ArrayToBuffer(b), offset2);
        return span;
      }
    };
    exports.UTF8 = UTF8;
    var Constant = class extends Layout {
      constructor(value, property) {
        super(0, property);
        this.value = value;
      }
      /** @override */
      decode(b, offset2) {
        return this.value;
      }
      /** @override */
      encode(src, b, offset2) {
        return 0;
      }
    };
    exports.Constant = Constant;
    exports.greedy = (elementSpan, property) => new GreedyCount(elementSpan, property);
    exports.offset = (layout, offset2, property) => new OffsetLayout(layout, offset2, property);
    exports.u8 = (property) => new UInt(1, property);
    exports.u16 = (property) => new UInt(2, property);
    exports.u24 = (property) => new UInt(3, property);
    exports.u32 = (property) => new UInt(4, property);
    exports.u40 = (property) => new UInt(5, property);
    exports.u48 = (property) => new UInt(6, property);
    exports.nu64 = (property) => new NearUInt64(property);
    exports.u16be = (property) => new UIntBE(2, property);
    exports.u24be = (property) => new UIntBE(3, property);
    exports.u32be = (property) => new UIntBE(4, property);
    exports.u40be = (property) => new UIntBE(5, property);
    exports.u48be = (property) => new UIntBE(6, property);
    exports.nu64be = (property) => new NearUInt64BE(property);
    exports.s8 = (property) => new Int(1, property);
    exports.s16 = (property) => new Int(2, property);
    exports.s24 = (property) => new Int(3, property);
    exports.s32 = (property) => new Int(4, property);
    exports.s40 = (property) => new Int(5, property);
    exports.s48 = (property) => new Int(6, property);
    exports.ns64 = (property) => new NearInt64(property);
    exports.s16be = (property) => new IntBE(2, property);
    exports.s24be = (property) => new IntBE(3, property);
    exports.s32be = (property) => new IntBE(4, property);
    exports.s40be = (property) => new IntBE(5, property);
    exports.s48be = (property) => new IntBE(6, property);
    exports.ns64be = (property) => new NearInt64BE(property);
    exports.f32 = (property) => new Float(property);
    exports.f32be = (property) => new FloatBE(property);
    exports.f64 = (property) => new Double(property);
    exports.f64be = (property) => new DoubleBE(property);
    exports.struct = (fields, property, decodePrefixes) => new Structure(fields, property, decodePrefixes);
    exports.bits = (word, msb, property) => new BitStructure(word, msb, property);
    exports.seq = (elementLayout, count, property) => new Sequence(elementLayout, count, property);
    exports.union = (discr, defaultLayout, property) => new Union(discr, defaultLayout, property);
    exports.unionLayoutDiscriminator = (layout, property) => new UnionLayoutDiscriminator(layout, property);
    exports.blob = (length, property) => new Blob(length, property);
    exports.cstr = (property) => new CString(property);
    exports.utf8 = (maxSpan, property) => new UTF8(maxSpan, property);
    exports.constant = (value, property) => new Constant(value, property);
  }
});

// node_modules/@solana/errors/dist/index.browser.mjs
function getHumanReadableErrorMessage(code, context = {}) {
  const messageFormatString = SolanaErrorMessages[code];
  if (messageFormatString.length === 0) {
    return "";
  }
  let state;
  function commitStateUpTo(endIndex) {
    if (state[TYPE] === 2) {
      const variableName = messageFormatString.slice(state[START_INDEX] + 1, endIndex);
      fragments.push(
        variableName in context ? (
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${context[variableName]}`
        ) : `$${variableName}`
      );
    } else if (state[TYPE] === 1) {
      fragments.push(messageFormatString.slice(state[START_INDEX], endIndex));
    }
  }
  const fragments = [];
  messageFormatString.split("").forEach((char, ii) => {
    if (ii === 0) {
      state = {
        [START_INDEX]: 0,
        [TYPE]: messageFormatString[0] === "\\" ? 0 : messageFormatString[0] === "$" ? 2 : 1
        /* Text */
      };
      return;
    }
    let nextState;
    switch (state[TYPE]) {
      case 0:
        nextState = {
          [START_INDEX]: ii,
          [TYPE]: 1
          /* Text */
        };
        break;
      case 1:
        if (char === "\\") {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 0
            /* EscapeSequence */
          };
        } else if (char === "$") {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 2
            /* Variable */
          };
        }
        break;
      case 2:
        if (char === "\\") {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 0
            /* EscapeSequence */
          };
        } else if (char === "$") {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 2
            /* Variable */
          };
        } else if (!char.match(/\w/)) {
          nextState = {
            [START_INDEX]: ii,
            [TYPE]: 1
            /* Text */
          };
        }
        break;
    }
    if (nextState) {
      if (state !== nextState) {
        commitStateUpTo(ii);
      }
      state = nextState;
    }
  });
  commitStateUpTo();
  return fragments.join("");
}
function getErrorMessage(code, context = {}) {
  if (true) {
    return getHumanReadableErrorMessage(code, context);
  } else {
    let decodingAdviceMessage = `Solana error #${code}; Decode this error by running \`npx @solana/errors decode -- ${code}`;
    if (Object.keys(context).length) {
      decodingAdviceMessage += ` '${encodeContextObject(context)}'`;
    }
    return `${decodingAdviceMessage}\``;
  }
}
var SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED, SOLANA_ERROR__INVALID_NONCE, SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND, SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE, SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH, SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE, SOLANA_ERROR__MALFORMED_BIGINT_STRING, SOLANA_ERROR__MALFORMED_NUMBER_STRING, SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE, SOLANA_ERROR__MALFORMED_JSON_RPC_ERROR, SOLANA_ERROR__JSON_RPC__PARSE_ERROR, SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR, SOLANA_ERROR__JSON_RPC__INVALID_PARAMS, SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND, SOLANA_ERROR__JSON_RPC__INVALID_REQUEST, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH, SOLANA_ERROR__JSON_RPC__SCAN_ERROR, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE, SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP, SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH, SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE, SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS, SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY, SOLANA_ERROR__ADDRESSES__MALFORMED_PDA, SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE, SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED, SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED, SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE, SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED, SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER, SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND, SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND, SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT, SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT, SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED, SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT, SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY, SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED, SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH, SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH, SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH, SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE, SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY, SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS, SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA, SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH, SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN, SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL, SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS, SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID, SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED, SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT, SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION, SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID, SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND, SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE, SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX, SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING, SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC, SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR, SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED, SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE, SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT, SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID, SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH, SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT, SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED, SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC, SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION, SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE, SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE, SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE, SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE, SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY, SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR, SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT, SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER, SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW, SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR, SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER, SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED, SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS, SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS, SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER, SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER, SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS, SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING, SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED, SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES, SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE, SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME, SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME, SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND, SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING, SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING, SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING, SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING, SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING, SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING, SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE, SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION, SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES, SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH, SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT, SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_COMPUTE_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN, SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE, SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE, SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND, SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND, SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE, SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED, SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND, SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP, SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX, SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION, SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE, SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE, SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS, SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION, SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT, SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED, SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT, SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED, SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED, SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION, SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY, SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH, SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH, SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH, SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH, SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH, SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH, SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS, SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE, SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT, SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT, SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE, SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE, SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH, SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE, SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT, SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE, SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE, SOLANA_ERROR__CODECS__INVALID_CONSTANT, SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE, SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL, SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES, SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS, SOLANA_ERROR__RPC__INTEGER_OVERFLOW, SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN, SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR, SOLANA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD, SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN, SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID, SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CLOSED_BEFORE_MESSAGE_BUFFERED, SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CONNECTION_CLOSED, SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_FAILED_TO_CONNECT, SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_STATE_MISSING, SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE, SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING, SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE, SOLANA_ERROR__INVARIANT_VIOLATION__DATA_PUBLISHER_CHANNEL_UNIMPLEMENTED, SolanaErrorMessages, START_INDEX, TYPE, SolanaError;
var init_index_browser = __esm({
  "node_modules/@solana/errors/dist/index.browser.mjs"() {
    SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED = 1;
    SOLANA_ERROR__INVALID_NONCE = 2;
    SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND = 3;
    SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE = 4;
    SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH = 5;
    SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE = 6;
    SOLANA_ERROR__MALFORMED_BIGINT_STRING = 7;
    SOLANA_ERROR__MALFORMED_NUMBER_STRING = 8;
    SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE = 9;
    SOLANA_ERROR__MALFORMED_JSON_RPC_ERROR = 10;
    SOLANA_ERROR__JSON_RPC__PARSE_ERROR = -32700;
    SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR = -32603;
    SOLANA_ERROR__JSON_RPC__INVALID_PARAMS = -32602;
    SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND = -32601;
    SOLANA_ERROR__JSON_RPC__INVALID_REQUEST = -32600;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED = -32016;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION = -32015;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET = -32014;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH = -32013;
    SOLANA_ERROR__JSON_RPC__SCAN_ERROR = -32012;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE = -32011;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX = -32010;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED = -32009;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT = -32008;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED = -32007;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE = -32006;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY = -32005;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE = -32004;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE = -32003;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE = -32002;
    SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP = -32001;
    SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH = 28e5;
    SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE = 2800001;
    SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS = 2800002;
    SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY = 2800003;
    SOLANA_ERROR__ADDRESSES__MALFORMED_PDA = 2800004;
    SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE = 2800005;
    SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED = 2800006;
    SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED = 2800007;
    SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE = 2800008;
    SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED = 2800009;
    SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER = 2800010;
    SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND = 323e4;
    SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND = 32300001;
    SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT = 3230002;
    SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT = 3230003;
    SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED = 3230004;
    SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT = 361e4;
    SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED = 3610001;
    SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED = 3610002;
    SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED = 3610003;
    SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED = 3610004;
    SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED = 3610005;
    SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED = 3610006;
    SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY = 3610007;
    SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED = 3611e3;
    SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH = 3704e3;
    SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH = 3704001;
    SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH = 3704002;
    SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE = 3704003;
    SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY = 3704004;
    SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS = 4128e3;
    SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA = 4128001;
    SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH = 4128002;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN = 4615e3;
    SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR = 4615001;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT = 4615002;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA = 4615003;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA = 4615004;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL = 4615005;
    SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS = 4615006;
    SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID = 4615007;
    SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE = 4615008;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED = 4615009;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT = 4615010;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION = 4615011;
    SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID = 4615012;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND = 4615013;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED = 4615014;
    SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE = 4615015;
    SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED = 4615016;
    SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX = 4615017;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED = 4615018;
    SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED = 4615019;
    SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS = 4615020;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED = 4615021;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE = 4615022;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED = 4615023;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING = 4615024;
    SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC = 4615025;
    SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM = 4615026;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR = 4615027;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED = 4615028;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE = 4615029;
    SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT = 4615030;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID = 4615031;
    SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH = 4615032;
    SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT = 4615033;
    SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED = 4615034;
    SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED = 4615035;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS = 4615036;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC = 4615037;
    SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED = 4615038;
    SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION = 4615039;
    SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE = 4615040;
    SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE = 4615041;
    SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE = 4615042;
    SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE = 4615043;
    SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY = 4615044;
    SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR = 4615045;
    SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT = 4615046;
    SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER = 4615047;
    SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW = 4615048;
    SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR = 4615049;
    SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER = 4615050;
    SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED = 4615051;
    SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED = 4615052;
    SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED = 4615053;
    SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS = 4615054;
    SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS = 5508e3;
    SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER = 5508001;
    SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER = 5508002;
    SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER = 5508003;
    SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER = 5508004;
    SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER = 5508005;
    SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER = 5508006;
    SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER = 5508007;
    SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER = 5508008;
    SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS = 5508009;
    SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING = 5508010;
    SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED = 5508011;
    SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES = 5663e3;
    SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE = 5663001;
    SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME = 5663002;
    SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME = 5663003;
    SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE = 5663004;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING = 5663005;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE = 5663006;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND = 5663007;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING = 5663008;
    SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING = 5663009;
    SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING = 5663010;
    SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING = 5663011;
    SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING = 5663012;
    SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING = 5663013;
    SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE = 5663014;
    SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION = 5663015;
    SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES = 5663016;
    SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH = 5663017;
    SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT = 5663018;
    SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_COMPUTE_LIMIT = 5663019;
    SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN = 705e4;
    SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE = 7050001;
    SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE = 7050002;
    SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND = 7050003;
    SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND = 7050004;
    SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE = 7050005;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE = 7050006;
    SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED = 7050007;
    SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND = 7050008;
    SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP = 7050009;
    SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE = 7050010;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX = 7050011;
    SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE = 7050012;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION = 7050013;
    SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE = 7050014;
    SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE = 7050015;
    SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING = 7050016;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT = 7050017;
    SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION = 7050018;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT = 7050019;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT = 7050020;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT = 7050021;
    SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS = 7050022;
    SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND = 7050023;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER = 7050024;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA = 7050025;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX = 7050026;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT = 7050027;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT = 7050028;
    SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT = 7050029;
    SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION = 7050030;
    SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT = 7050031;
    SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED = 7050032;
    SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT = 7050033;
    SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED = 7050034;
    SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED = 7050035;
    SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION = 7050036;
    SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY = 8078e3;
    SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH = 8078001;
    SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH = 8078002;
    SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH = 8078003;
    SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH = 8078004;
    SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH = 8078005;
    SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH = 8078006;
    SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS = 8078007;
    SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE = 8078008;
    SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT = 8078009;
    SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT = 8078010;
    SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE = 8078011;
    SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE = 8078012;
    SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH = 8078013;
    SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE = 8078014;
    SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT = 8078015;
    SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE = 8078016;
    SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE = 8078017;
    SOLANA_ERROR__CODECS__INVALID_CONSTANT = 8078018;
    SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE = 8078019;
    SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL = 8078020;
    SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES = 8078021;
    SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS = 8078022;
    SOLANA_ERROR__RPC__INTEGER_OVERFLOW = 81e5;
    SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN = 8100001;
    SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR = 8100002;
    SOLANA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD = 8100003;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN = 819e4;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID = 8190001;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CLOSED_BEFORE_MESSAGE_BUFFERED = 8190002;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CONNECTION_CLOSED = 8190003;
    SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_FAILED_TO_CONNECT = 8190004;
    SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_STATE_MISSING = 99e5;
    SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE = 9900001;
    SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING = 9900002;
    SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE = 9900003;
    SOLANA_ERROR__INVARIANT_VIOLATION__DATA_PUBLISHER_CHANNEL_UNIMPLEMENTED = 9900004;
    SolanaErrorMessages = {
      [SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND]: "Account not found at address: $address",
      [SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED]: "Not all accounts were decoded. Encoded accounts found at addresses: $addresses.",
      [SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT]: "Expected decoded account at address: $address",
      [SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT]: "Failed to decode account data at address: $address",
      [SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND]: "Accounts not found at addresses: $addresses",
      [SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED]: "Unable to find a viable program address bump seed.",
      [SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS]: "$putativeAddress is not a base58-encoded address.",
      [SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH]: "Expected base58 encoded address to decode to a byte array of length 32. Actual length: $actualLength.",
      [SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY]: "The `CryptoKey` must be an `Ed25519` public key.",
      [SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE]: "Invalid seeds; point must fall off the Ed25519 curve.",
      [SOLANA_ERROR__ADDRESSES__MALFORMED_PDA]: "Expected given program derived address to have the following format: [Address, ProgramDerivedAddressBump].",
      [SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED]: "A maximum of $maxSeeds seeds, including the bump seed, may be supplied when creating an address. Received: $actual.",
      [SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED]: "The seed at index $index with length $actual exceeds the maximum length of $maxSeedLength bytes.",
      [SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE]: "Expected program derived address bump to be in the range [0, 255], got: $bump.",
      [SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER]: "Program address cannot end with PDA marker.",
      [SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded address string of length in the range [32, 44]. Actual length: $actualLength.",
      [SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded blockash string of length in the range [32, 44]. Actual length: $actualLength.",
      [SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED]: "The network has progressed past the last block for which this transaction could have been committed.",
      [SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY]: "Codec [$codecDescription] cannot decode empty byte arrays.",
      [SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS]: "Enum codec cannot use lexical values [$stringValues] as discriminators. Either remove all lexical values or set `useValuesAsDiscriminators` to `false`.",
      [SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL]: "Sentinel [$hexSentinel] must not be present in encoded bytes [$hexEncodedBytes].",
      [SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH]: "Encoder and decoder must have the same fixed size, got [$encoderFixedSize] and [$decoderFixedSize].",
      [SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH]: "Encoder and decoder must have the same max size, got [$encoderMaxSize] and [$decoderMaxSize].",
      [SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH]: "Encoder and decoder must either both be fixed-size or variable-size.",
      [SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE]: "Enum discriminator out of range. Expected a number in [$formattedValidDiscriminators], got $discriminator.",
      [SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH]: "Expected a fixed-size codec, got a variable-size one.",
      [SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH]: "Codec [$codecDescription] expected a positive byte length, got $bytesLength.",
      [SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH]: "Expected a variable-size codec, got a fixed-size one.",
      [SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE]: "Codec [$codecDescription] expected zero-value [$hexZeroValue] to have the same size as the provided fixed-size item [$expectedSize bytes].",
      [SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH]: "Codec [$codecDescription] expected $expected bytes, got $bytesLength.",
      [SOLANA_ERROR__CODECS__INVALID_CONSTANT]: "Expected byte array constant [$hexConstant] to be present in data [$hexData] at offset [$offset].",
      [SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT]: "Invalid discriminated union variant. Expected one of [$variants], got $value.",
      [SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT]: "Invalid enum variant. Expected one of [$stringValues] or a number in [$formattedNumericalValues], got $variant.",
      [SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT]: "Invalid literal union variant. Expected one of [$variants], got $value.",
      [SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS]: "Expected [$codecDescription] to have $expected items, got $actual.",
      [SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE]: "Invalid value $value for base $base with alphabet $alphabet.",
      [SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE]: "Literal union discriminator out of range. Expected a number between $minRange and $maxRange, got $discriminator.",
      [SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE]: "Codec [$codecDescription] expected number to be in the range [$min, $max], got $value.",
      [SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE]: "Codec [$codecDescription] expected offset to be in the range [0, $bytesLength], got $offset.",
      [SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES]: "Expected sentinel [$hexSentinel] to be present in decoded bytes [$hexDecodedBytes].",
      [SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE]: "Union variant out of range. Expected an index between $minRange and $maxRange, got $variant.",
      [SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED]: "No random values implementation could be found.",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED]: "instruction requires an uninitialized account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED]: "instruction tries to borrow reference for an account which is already borrowed",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING]: "instruction left account with an outstanding borrowed reference",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED]: "program other than the account's owner changed the size of the account data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL]: "account data too small for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE]: "instruction expected an executable account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT]: "An account does not have enough lamports to be rent-exempt",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW]: "Program arithmetic overflowed",
      [SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR]: "Failed to serialize or deserialize account data: $encodedData",
      [SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS]: "Builtin programs must consume compute units",
      [SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH]: "Cross-program invocation call depth too deep",
      [SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED]: "Computational budget exceeded",
      [SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM]: "custom program error: #$code",
      [SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX]: "instruction contains duplicate accounts",
      [SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC]: "instruction modifications of multiply-passed account differ",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT]: "executable accounts must be rent exempt",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED]: "instruction changed executable accounts data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE]: "instruction changed the balance of an executable account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED]: "instruction changed executable bit of an account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED]: "instruction modified data of an account it does not own",
      [SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND]: "instruction spent from the balance of an account it does not own",
      [SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR]: "generic instruction error",
      [SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER]: "Provided owner is not allowed",
      [SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE]: "Account is immutable",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY]: "Incorrect authority provided",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID]: "incorrect program id for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS]: "insufficient funds for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA]: "invalid account data for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER]: "Invalid account owner",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT]: "invalid program argument",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR]: "program returned invalid error code",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA]: "invalid instruction data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC]: "Failed to reallocate account data",
      [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS]: "Provided seeds do not result in a valid address",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED]: "Accounts data allocations exceeded the maximum allowed per transaction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED]: "Max accounts exceeded",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED]: "Max instruction trace length exceeded",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED]: "Length of the seed is too long for address generation",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT]: "An account required by the instruction is missing",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE]: "missing required signature for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID]: "instruction illegally modified the program id of an account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS]: "insufficient account keys for instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION]: "Cross-program invocation with unauthorized signer or writable account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE]: "Failed to create program execution environment",
      [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE]: "Program failed to compile",
      [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE]: "Program failed to complete",
      [SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED]: "instruction modified data of a read-only account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE]: "instruction changed the balance of a read-only account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED]: "Cross-program invocation reentrancy not allowed for this instruction",
      [SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED]: "instruction modified rent epoch of an account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION]: "sum of account balances before and after instruction do not match",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT]: "instruction requires an initialized account",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN]: "",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID]: "Unsupported program id",
      [SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR]: "Unsupported sysvar",
      [SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS]: "The instruction does not have any accounts.",
      [SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA]: "The instruction does not have any data.",
      [SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH]: "Expected instruction to have progress address $expectedProgramAddress, got $actualProgramAddress.",
      [SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH]: "Expected base58 encoded blockhash to decode to a byte array of length 32. Actual length: $actualLength.",
      [SOLANA_ERROR__INVALID_NONCE]: "The nonce `$expectedNonceValue` is no longer valid. It has advanced to `$actualNonceValue`",
      [SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING]: "Invariant violation: Found no abortable iterable cache entry for key `$cacheKey`. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
      [SOLANA_ERROR__INVARIANT_VIOLATION__DATA_PUBLISHER_CHANNEL_UNIMPLEMENTED]: "Invariant violation: This data publisher does not publish to the channel named `$channelName`. Supported channels include $supportedChannelNames.",
      [SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE]: "Invariant violation: WebSocket message iterator state is corrupt; iterated without first resolving existing message promise. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
      [SOLANA_ERROR__INVARIANT_VIOLATION__SUBSCRIPTION_ITERATOR_STATE_MISSING]: "Invariant violation: WebSocket message iterator is missing state storage. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
      [SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE]: "Invariant violation: Switch statement non-exhaustive. Received unexpected value `$unexpectedValue`. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
      [SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR]: "JSON-RPC error: Internal JSON-RPC error ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__INVALID_PARAMS]: "JSON-RPC error: Invalid method parameter(s) ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__INVALID_REQUEST]: "JSON-RPC error: The JSON sent is not a valid `Request` object ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND]: "JSON-RPC error: The method does not exist / is not available ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__PARSE_ERROR]: "JSON-RPC error: An error occurred on the server while parsing the JSON text ($__serverMessage)",
      [SOLANA_ERROR__JSON_RPC__SCAN_ERROR]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED]: "Minimum context slot has not been reached",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY]: "Node is unhealthy; behind by $numSlotsBehind slots",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT]: "No snapshot",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE]: "Transaction simulation failed",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE]: "Transaction history is not available from this node",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE]: "$__serverMessage",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH]: "Transaction signature length mismatch",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE]: "Transaction signature verification failure",
      [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION]: "$__serverMessage",
      [SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH]: "Key pair bytes must be of length 64, got $byteLength.",
      [SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH]: "Expected private key bytes with length 32. Actual length: $actualLength.",
      [SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH]: "Expected base58-encoded signature to decode to a byte array of length 64. Actual length: $actualLength.",
      [SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY]: "The provided private key does not match the provided public key.",
      [SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded signature string of length in the range [64, 88]. Actual length: $actualLength.",
      [SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE]: "Lamports value must be in the range [0, 2e64-1]",
      [SOLANA_ERROR__MALFORMED_BIGINT_STRING]: "`$value` cannot be parsed as a `BigInt`",
      [SOLANA_ERROR__MALFORMED_JSON_RPC_ERROR]: "$message",
      [SOLANA_ERROR__MALFORMED_NUMBER_STRING]: "`$value` cannot be parsed as a `Number`",
      [SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND]: "No nonce account could be found at address `$nonceAccountAddress`",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN]: "The notification name must end in 'Notifications' and the API must supply a subscription plan creator function for the notification '$notificationName'.",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CLOSED_BEFORE_MESSAGE_BUFFERED]: "WebSocket was closed before payload could be added to the send buffer",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CONNECTION_CLOSED]: "WebSocket connection closed",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_FAILED_TO_CONNECT]: "WebSocket failed to connect",
      [SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID]: "Failed to obtain a subscription id from the server",
      [SOLANA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD]: "Could not find an API plan for RPC method: `$method`",
      [SOLANA_ERROR__RPC__INTEGER_OVERFLOW]: "The $argumentLabel argument to the `$methodName` RPC method$optionalPathLabel was `$value`. This number is unsafe for use with the Solana JSON-RPC because it exceeds `Number.MAX_SAFE_INTEGER`.",
      [SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR]: "HTTP error ($statusCode): $message",
      [SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN]: "HTTP header(s) forbidden: $headers. Learn more at https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name.",
      [SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS]: "Multiple distinct signers were identified for address `$address`. Please ensure that you are using the same signer instance for each address.",
      [SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER]: "The provided value does not implement the `KeyPairSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER]: "The provided value does not implement the `MessageModifyingSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER]: "The provided value does not implement the `MessagePartialSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER]: "The provided value does not implement any of the `MessageSigner` interfaces",
      [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER]: "The provided value does not implement the `TransactionModifyingSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER]: "The provided value does not implement the `TransactionPartialSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER]: "The provided value does not implement the `TransactionSendingSigner` interface",
      [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER]: "The provided value does not implement any of the `TransactionSigner` interfaces",
      [SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS]: "More than one `TransactionSendingSigner` was identified.",
      [SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING]: "No `TransactionSendingSigner` was identified. Please provide a valid `ITransactionWithSingleSendingSigner` transaction.",
      [SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED]: "Wallet account signers do not support signing multiple messages/transactions in a single operation",
      [SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY]: "Cannot export a non-extractable key.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED]: "No digest implementation could be found.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT]: "Cryptographic operations are only allowed in secure browser contexts. Read more here: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED]: "This runtime does not support the generation of Ed25519 key pairs.\n\nInstall @solana/webcrypto-ed25519-polyfill and call its `install` function before generating keys in environments that do not support Ed25519.\n\nFor a list of runtimes that currently support Ed25519 operations, visit https://github.com/WICG/webcrypto-secure-curves/issues/20.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED]: "No signature verification implementation could be found.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED]: "No key generation implementation could be found.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED]: "No signing implementation could be found.",
      [SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED]: "No key export implementation could be found.",
      [SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE]: "Timestamp value must be in the range [-(2n ** 63n), (2n ** 63n) - 1]. `$value` given",
      [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING]: "Transaction processing left an account with an outstanding borrowed reference",
      [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE]: "Account in use",
      [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE]: "Account loaded twice",
      [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND]: "Attempt to debit an account but found no record of a prior credit.",
      [SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND]: "Transaction loads an address table account that doesn't exist",
      [SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED]: "This transaction has already been processed",
      [SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND]: "Blockhash not found",
      [SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP]: "Loader call chain is too deep",
      [SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE]: "Transactions are currently disabled due to cluster maintenance",
      [SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION]: "Transaction contains a duplicate instruction ($index) that is not allowed",
      [SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE]: "Insufficient funds for fee",
      [SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT]: "Transaction results in an account ($accountIndex) with insufficient funds for rent",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE]: "This account may not be used to pay transaction fees",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX]: "Transaction contains an invalid account reference",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA]: "Transaction loads an address table account with invalid data",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX]: "Transaction address table lookup uses an invalid index",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER]: "Transaction loads an address table account with an invalid owner",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT]: "LoadedAccountsDataSizeLimit set for transaction must be greater than 0.",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION]: "This program may not be used for executing instructions",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT]: "Transaction leaves an account with a lower balance than rent-exempt minimum",
      [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT]: "Transaction loads a writable account that cannot be written",
      [SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED]: "Transaction exceeded max loaded accounts data size cap",
      [SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE]: "Transaction requires a fee but has no signature present",
      [SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND]: "Attempt to load a program that does not exist",
      [SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED]: "Execution of the program referenced by account at index $accountIndex is temporarily restricted.",
      [SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED]: "ResanitizationNeeded",
      [SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE]: "Transaction failed to sanitize accounts offsets correctly",
      [SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE]: "Transaction did not pass signature verification",
      [SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS]: "Transaction locked too many accounts",
      [SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION]: "Sum of account balances before and after transaction do not match",
      [SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN]: "The transaction failed with the error `$errorName`",
      [SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION]: "Transaction version is unsupported",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT]: "Transaction would exceed account data limit within the block",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT]: "Transaction would exceed total account data limit",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT]: "Transaction would exceed max account limit within the block",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT]: "Transaction would exceed max Block Cost Limit",
      [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT]: "Transaction would exceed max Vote Cost Limit",
      [SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION]: "Attempted to sign a transaction with an address that is not a signer for it",
      [SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING]: "Transaction is missing an address at index: $index.",
      [SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES]: "Transaction has no expected signers therefore it cannot be encoded",
      [SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME]: "Transaction does not have a blockhash lifetime",
      [SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME]: "Transaction is not a durable nonce transaction",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING]: "Contents of these address lookup tables unknown: $lookupTableAddresses",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE]: "Lookup of address at index $highestRequestedIndex failed for lookup table `$lookupTableAddress`. Highest known index is $highestKnownIndex. The lookup table may have been extended since its contents were retrieved",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING]: "No fee payer set in CompiledTransaction",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND]: "Could not find program address at index $index",
      [SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT]: "Failed to estimate the compute unit consumption for this transaction message. This is likely because simulating the transaction failed. Inspect the `cause` property of this error to learn more",
      [SOLANA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_COMPUTE_LIMIT]: "Transaction failed when it was simulated in order to estimate the compute unit consumption. The compute unit estimate provided is for a transaction that failed when simulated and may not be representative of the compute units this transaction would consume if successful. Inspect the `cause` property of this error to learn more",
      [SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING]: "Transaction is missing a fee payer.",
      [SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING]: "Could not determine this transaction's signature. Make sure that the transaction has been signed by its fee payer.",
      [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE]: "Transaction first instruction is not advance nonce account instruction.",
      [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING]: "Transaction with no instructions cannot be durable nonce transaction.",
      [SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES]: "This transaction includes an address (`$programAddress`) which is both invoked and set as the fee payer. Program addresses may not pay fees",
      [SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE]: "This transaction includes an address (`$programAddress`) which is both invoked and marked writable. Program addresses may not be writable",
      [SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH]: "The transaction message expected the transaction to have $signerAddressesLength signatures, got $signaturesLength.",
      [SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING]: "Transaction is missing signatures for addresses: $addresses.",
      [SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE]: "Transaction version must be in the range [0, 127]. `$actualVersion` given"
    };
    START_INDEX = "i";
    TYPE = "t";
    SolanaError = class extends Error {
      constructor(...[code, contextAndErrorOptions]) {
        let context;
        let errorOptions;
        if (contextAndErrorOptions) {
          const { cause, ...contextRest } = contextAndErrorOptions;
          if (cause) {
            errorOptions = { cause };
          }
          if (Object.keys(contextRest).length > 0) {
            context = contextRest;
          }
        }
        const message = getErrorMessage(code, context);
        super(message, errorOptions);
        /**
         * Indicates the root cause of this {@link SolanaError}, if any.
         *
         * For example, a transaction error might have an instruction error as its root cause. In this
         * case, you will be able to access the instruction error on the transaction error as `cause`.
         */
        __publicField(this, "cause", this.cause);
        /**
         * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
         */
        __publicField(this, "context");
        this.context = {
          __code: code,
          ...context
        };
        this.name = "SolanaError";
      }
    };
  }
});

// node_modules/@solana/codecs-core/dist/index.browser.mjs
function getEncodedSize(value, encoder) {
  return "fixedSize" in encoder ? encoder.fixedSize : encoder.getSizeFromValue(value);
}
function createEncoder(encoder) {
  return Object.freeze({
    ...encoder,
    encode: (value) => {
      const bytes = new Uint8Array(getEncodedSize(value, encoder));
      encoder.write(value, bytes, 0);
      return bytes;
    }
  });
}
function createDecoder(decoder) {
  return Object.freeze({
    ...decoder,
    decode: (bytes, offset2 = 0) => decoder.read(bytes, offset2)[0]
  });
}
function isFixedSize(codec) {
  return "fixedSize" in codec && typeof codec.fixedSize === "number";
}
function combineCodec(encoder, decoder) {
  if (isFixedSize(encoder) !== isFixedSize(decoder)) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH);
  }
  if (isFixedSize(encoder) && isFixedSize(decoder) && encoder.fixedSize !== decoder.fixedSize) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH, {
      decoderFixedSize: decoder.fixedSize,
      encoderFixedSize: encoder.fixedSize
    });
  }
  if (!isFixedSize(encoder) && !isFixedSize(decoder) && encoder.maxSize !== decoder.maxSize) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH, {
      decoderMaxSize: decoder.maxSize,
      encoderMaxSize: encoder.maxSize
    });
  }
  return {
    ...decoder,
    ...encoder,
    decode: decoder.decode,
    encode: encoder.encode,
    read: decoder.read,
    write: encoder.write
  };
}
function assertByteArrayIsNotEmptyForCodec(codecDescription, bytes, offset2 = 0) {
  if (bytes.length - offset2 <= 0) {
    throw new SolanaError(SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY, {
      codecDescription
    });
  }
}
function assertByteArrayHasEnoughBytesForCodec(codecDescription, expected, bytes, offset2 = 0) {
  const bytesLength = bytes.length - offset2;
  if (bytesLength < expected) {
    throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH, {
      bytesLength,
      codecDescription,
      expected
    });
  }
}
var init_index_browser2 = __esm({
  "node_modules/@solana/codecs-core/dist/index.browser.mjs"() {
    init_index_browser();
  }
});

// node_modules/@solana/codecs-numbers/dist/index.browser.mjs
function assertNumberIsBetweenForCodec(codecDescription, min, max, value) {
  if (value < min || value > max) {
    throw new SolanaError(SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE, {
      codecDescription,
      max,
      min,
      value
    });
  }
}
function isLittleEndian(config) {
  return (config == null ? void 0 : config.endian) === 1 ? false : true;
}
function numberEncoderFactory(input) {
  return createEncoder({
    fixedSize: input.size,
    write(value, bytes, offset2) {
      if (input.range) {
        assertNumberIsBetweenForCodec(input.name, input.range[0], input.range[1], value);
      }
      const arrayBuffer = new ArrayBuffer(input.size);
      input.set(new DataView(arrayBuffer), value, isLittleEndian(input.config));
      bytes.set(new Uint8Array(arrayBuffer), offset2);
      return offset2 + input.size;
    }
  });
}
function numberDecoderFactory(input) {
  return createDecoder({
    fixedSize: input.size,
    read(bytes, offset2 = 0) {
      assertByteArrayIsNotEmptyForCodec(input.name, bytes, offset2);
      assertByteArrayHasEnoughBytesForCodec(input.name, input.size, bytes, offset2);
      const view = new DataView(toArrayBuffer(bytes, offset2, input.size));
      return [input.get(view, isLittleEndian(input.config)), offset2 + input.size];
    }
  });
}
function toArrayBuffer(bytes, offset2, length) {
  const bytesOffset = bytes.byteOffset + (offset2 ?? 0);
  const bytesLength = length ?? bytes.byteLength;
  return bytes.buffer.slice(bytesOffset, bytesOffset + bytesLength);
}
var Endian, getU64Encoder, getU64Decoder, getU64Codec;
var init_index_browser3 = __esm({
  "node_modules/@solana/codecs-numbers/dist/index.browser.mjs"() {
    init_index_browser();
    init_index_browser2();
    Endian = ((Endian2) => {
      Endian2[Endian2["Little"] = 0] = "Little";
      Endian2[Endian2["Big"] = 1] = "Big";
      return Endian2;
    })(Endian || {});
    getU64Encoder = (config = {}) => numberEncoderFactory({
      config,
      name: "u64",
      range: [0n, BigInt("0xffffffffffffffff")],
      set: (view, value, le) => view.setBigUint64(0, BigInt(value), le),
      size: 8
    });
    getU64Decoder = (config = {}) => numberDecoderFactory({
      config,
      get: (view, le) => view.getBigUint64(0, le),
      name: "u64",
      size: 8
    });
    getU64Codec = (config = {}) => combineCodec(getU64Encoder(config), getU64Decoder(config));
  }
});

// node_modules/superstruct/dist/index.mjs
function isIterable(x) {
  return isObject(x) && typeof x[Symbol.iterator] === "function";
}
function isObject(x) {
  return typeof x === "object" && x != null;
}
function isNonArrayObject(x) {
  return isObject(x) && !Array.isArray(x);
}
function print(value) {
  if (typeof value === "symbol") {
    return value.toString();
  }
  return typeof value === "string" ? JSON.stringify(value) : `${value}`;
}
function shiftIterator(input) {
  const { done, value } = input.next();
  return done ? void 0 : value;
}
function toFailure(result, context, struct2, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === "string") {
    result = { message: result };
  }
  const { path, branch } = context;
  const { type: type2 } = struct2;
  const { refinement, message = `Expected a value of type \`${type2}\`${refinement ? ` with refinement \`${refinement}\`` : ""}, but received: \`${print(value)}\`` } = result;
  return {
    value,
    type: type2,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
function* toFailures(result, context, struct2, value) {
  if (!isIterable(result)) {
    result = [result];
  }
  for (const r of result) {
    const failure = toFailure(r, context, struct2, value);
    if (failure) {
      yield failure;
    }
  }
}
function* run(value, struct2, options = {}) {
  const { path = [], branch = [value], coerce: coerce2 = false, mask: mask2 = false } = options;
  const ctx = { path, branch, mask: mask2 };
  if (coerce2) {
    value = struct2.coercer(value, ctx);
  }
  let status = "valid";
  for (const failure of struct2.validator(value, ctx)) {
    failure.explanation = options.message;
    status = "not_valid";
    yield [failure, void 0];
  }
  for (let [k, v, s] of struct2.entries(value, ctx)) {
    const ts = run(v, s, {
      path: k === void 0 ? path : [...path, k],
      branch: k === void 0 ? branch : [...branch, v],
      coerce: coerce2,
      mask: mask2,
      message: options.message
    });
    for (const t of ts) {
      if (t[0]) {
        status = t[0].refinement != null ? "not_refined" : "not_valid";
        yield [t[0], void 0];
      } else if (coerce2) {
        v = t[1];
        if (k === void 0) {
          value = v;
        } else if (value instanceof Map) {
          value.set(k, v);
        } else if (value instanceof Set) {
          value.add(v);
        } else if (isObject(value)) {
          if (v !== void 0 || k in value)
            value[k] = v;
        }
      }
    }
  }
  if (status !== "not_valid") {
    for (const failure of struct2.refiner(value, ctx)) {
      failure.explanation = options.message;
      status = "not_refined";
      yield [failure, void 0];
    }
  }
  if (status === "valid") {
    yield [void 0, value];
  }
}
function assert(value, struct2, message) {
  const result = validate(value, struct2, { message });
  if (result[0]) {
    throw result[0];
  }
}
function create(value, struct2, message) {
  const result = validate(value, struct2, { coerce: true, message });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function mask(value, struct2, message) {
  const result = validate(value, struct2, { coerce: true, mask: true, message });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function is(value, struct2) {
  const result = validate(value, struct2);
  return !result[0];
}
function validate(value, struct2, options = {}) {
  const tuples = run(value, struct2, options);
  const tuple2 = shiftIterator(tuples);
  if (tuple2[0]) {
    const error = new StructError(tuple2[0], function* () {
      for (const t of tuples) {
        if (t[0]) {
          yield t[0];
        }
      }
    });
    return [error, void 0];
  } else {
    const v = tuple2[1];
    return [void 0, v];
  }
}
function define(name, validator) {
  return new Struct({ type: name, schema: null, validator });
}
function any() {
  return define("any", () => true);
}
function array(Element) {
  return new Struct({
    type: "array",
    schema: Element,
    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i, v] of value.entries()) {
          yield [i, v, Element];
        }
      }
    },
    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },
    validator(value) {
      return Array.isArray(value) || `Expected an array value, but received: ${print(value)}`;
    }
  });
}
function boolean() {
  return define("boolean", (value) => {
    return typeof value === "boolean";
  });
}
function instance(Class) {
  return define("instance", (value) => {
    return value instanceof Class || `Expected a \`${Class.name}\` instance, but received: ${print(value)}`;
  });
}
function literal(constant) {
  const description = print(constant);
  const t = typeof constant;
  return new Struct({
    type: "literal",
    schema: t === "string" || t === "number" || t === "boolean" ? constant : null,
    validator(value) {
      return value === constant || `Expected the literal \`${description}\`, but received: ${print(value)}`;
    }
  });
}
function never() {
  return define("never", () => false);
}
function nullable(struct2) {
  return new Struct({
    ...struct2,
    validator: (value, ctx) => value === null || struct2.validator(value, ctx),
    refiner: (value, ctx) => value === null || struct2.refiner(value, ctx)
  });
}
function number() {
  return define("number", (value) => {
    return typeof value === "number" && !isNaN(value) || `Expected a number, but received: ${print(value)}`;
  });
}
function optional(struct2) {
  return new Struct({
    ...struct2,
    validator: (value, ctx) => value === void 0 || struct2.validator(value, ctx),
    refiner: (value, ctx) => value === void 0 || struct2.refiner(value, ctx)
  });
}
function record(Key, Value) {
  return new Struct({
    type: "record",
    schema: null,
    *entries(value) {
      if (isObject(value)) {
        for (const k in value) {
          const v = value[k];
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },
    validator(value) {
      return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
    },
    coercer(value) {
      return isNonArrayObject(value) ? { ...value } : value;
    }
  });
}
function string() {
  return define("string", (value) => {
    return typeof value === "string" || `Expected a string, but received: ${print(value)}`;
  });
}
function tuple(Structs) {
  const Never = never();
  return new Struct({
    type: "tuple",
    schema: null,
    *entries(value) {
      if (Array.isArray(value)) {
        const length = Math.max(Structs.length, value.length);
        for (let i = 0; i < length; i++) {
          yield [i, value[i], Structs[i] || Never];
        }
      }
    },
    validator(value) {
      return Array.isArray(value) || `Expected an array, but received: ${print(value)}`;
    },
    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    }
  });
}
function type(schema) {
  const keys = Object.keys(schema);
  return new Struct({
    type: "type",
    schema,
    *entries(value) {
      if (isObject(value)) {
        for (const k of keys) {
          yield [k, value[k], schema[k]];
        }
      }
    },
    validator(value) {
      return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
    },
    coercer(value) {
      return isNonArrayObject(value) ? { ...value } : value;
    }
  });
}
function union(Structs) {
  const description = Structs.map((s) => s.type).join(" | ");
  return new Struct({
    type: "union",
    schema: null,
    coercer(value, ctx) {
      for (const S of Structs) {
        const [error, coerced] = S.validate(value, {
          coerce: true,
          mask: ctx.mask
        });
        if (!error) {
          return coerced;
        }
      }
      return value;
    },
    validator(value, ctx) {
      const failures = [];
      for (const S of Structs) {
        const [...tuples] = run(value, S, ctx);
        const [first] = tuples;
        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }
      return [
        `Expected the value to satisfy a union of \`${description}\`, but received: ${print(value)}`,
        ...failures
      ];
    }
  });
}
function unknown() {
  return define("unknown", () => true);
}
function coerce(struct2, condition, coercer) {
  return new Struct({
    ...struct2,
    coercer: (value, ctx) => {
      return is(value, condition) ? struct2.coercer(coercer(value, ctx), ctx) : struct2.coercer(value, ctx);
    }
  });
}
var StructError, Struct;
var init_dist = __esm({
  "node_modules/superstruct/dist/index.mjs"() {
    StructError = class extends TypeError {
      constructor(failure, failures) {
        let cached;
        const { message, explanation, ...rest } = failure;
        const { path } = failure;
        const msg = path.length === 0 ? message : `At path: ${path.join(".")} -- ${message}`;
        super(explanation ?? msg);
        if (explanation != null)
          this.cause = msg;
        Object.assign(this, rest);
        this.name = this.constructor.name;
        this.failures = () => {
          return cached ?? (cached = [failure, ...failures()]);
        };
      }
    };
    Struct = class {
      constructor(props) {
        const { type: type2, schema, validator, refiner, coercer = (value) => value, entries = function* () {
        } } = props;
        this.type = type2;
        this.schema = schema;
        this.entries = entries;
        this.coercer = coercer;
        if (validator) {
          this.validator = (value, context) => {
            const result = validator(value, context);
            return toFailures(result, context, this, value);
          };
        } else {
          this.validator = () => [];
        }
        if (refiner) {
          this.refiner = (value, context) => {
            const result = refiner(value, context);
            return toFailures(result, context, this, value);
          };
        } else {
          this.refiner = () => [];
        }
      }
      /**
       * Assert that a value passes the struct's validation, throwing if it doesn't.
       */
      assert(value, message) {
        return assert(value, this, message);
      }
      /**
       * Create a value with the struct's coercion logic, then validate it.
       */
      create(value, message) {
        return create(value, this, message);
      }
      /**
       * Check if a value passes the struct's validation.
       */
      is(value) {
        return is(value, this);
      }
      /**
       * Mask a value, coercing and validating it, but returning only the subset of
       * properties defined by the struct's schema. Masking applies recursively to
       * props of `object` structs only.
       */
      mask(value, message) {
        return mask(value, this, message);
      }
      /**
       * Validate a value with the struct's validation logic, returning a tuple
       * representing the result.
       *
       * You may optionally pass `true` for the `coerce` argument to coerce
       * the value before attempting to validate it. If you do, the result will
       * contain the coerced result when successful. Also, `mask` will turn on
       * masking of the unknown `object` props recursively if passed.
       */
      validate(value, options = {}) {
        return validate(value, this, options);
      }
    };
  }
});

// node_modules/uuid/dist/esm-browser/rng.js
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var getRandomValues, rnds8;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-browser/rng.js"() {
    rnds8 = new Uint8Array(16);
  }
});

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/uuid/dist/esm-browser/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/uuid/dist/esm-browser/validate.js
function validate2(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/uuid/dist/esm-browser/validate.js"() {
    init_regex();
    validate_default = validate2;
  }
});

// node_modules/uuid/dist/esm-browser/stringify.js
function stringify(arr) {
  var offset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset2 + 0]] + byteToHex[arr[offset2 + 1]] + byteToHex[arr[offset2 + 2]] + byteToHex[arr[offset2 + 3]] + "-" + byteToHex[arr[offset2 + 4]] + byteToHex[arr[offset2 + 5]] + "-" + byteToHex[arr[offset2 + 6]] + byteToHex[arr[offset2 + 7]] + "-" + byteToHex[arr[offset2 + 8]] + byteToHex[arr[offset2 + 9]] + "-" + byteToHex[arr[offset2 + 10]] + byteToHex[arr[offset2 + 11]] + byteToHex[arr[offset2 + 12]] + byteToHex[arr[offset2 + 13]] + byteToHex[arr[offset2 + 14]] + byteToHex[arr[offset2 + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, i, stringify_default;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-browser/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/uuid/dist/esm-browser/v1.js
function v1(options, buf, offset2) {
  var i = buf && offset2 || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  var tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/uuid/dist/esm-browser/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  var v;
  var arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/uuid/dist/esm-browser/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset2) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset2 = offset2 || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset2 + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
var DNS, URL;
var init_v35 = __esm({
  "node_modules/uuid/dist/esm-browser/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 255;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x, y) {
  var lsw = (x & 65535) + (y & 65535);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var md5_default;
var init_md5 = __esm({
  "node_modules/uuid/dist/esm-browser/md5.js"() {
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-browser/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/uuid/dist/esm-browser/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset2) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset2 = offset2 || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset2 + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-browser/v4.js"() {
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-browser/sha1.js
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782];
  var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var sha1_default;
var init_sha1 = __esm({
  "node_modules/uuid/dist/esm-browser/sha1.js"() {
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-browser/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/uuid/dist/esm-browser/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/uuid/dist/esm-browser/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/uuid/dist/esm-browser/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/uuid/dist/esm-browser/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/uuid/dist/esm-browser/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/uuid/dist/esm-browser/index.js
var esm_browser_exports = {};
__export(esm_browser_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_browser = __esm({
  "node_modules/uuid/dist/esm-browser/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/jayson/lib/generateRequest.js
var require_generateRequest = __commonJS({
  "node_modules/jayson/lib/generateRequest.js"(exports, module) {
    "use strict";
    var uuid = (init_esm_browser(), __toCommonJS(esm_browser_exports)).v4;
    var generateRequest = function(method, params, id, options) {
      if (typeof method !== "string") {
        throw new TypeError(method + " must be a string");
      }
      options = options || {};
      const version2 = typeof options.version === "number" ? options.version : 2;
      if (version2 !== 1 && version2 !== 2) {
        throw new TypeError(version2 + " must be 1 or 2");
      }
      const request = {
        method
      };
      if (version2 === 2) {
        request.jsonrpc = "2.0";
      }
      if (params) {
        if (typeof params !== "object" && !Array.isArray(params)) {
          throw new TypeError(params + " must be an object, array or omitted");
        }
        request.params = params;
      }
      if (typeof id === "undefined") {
        const generator = typeof options.generator === "function" ? options.generator : function() {
          return uuid();
        };
        request.id = generator(request, options);
      } else if (version2 === 2 && id === null) {
        if (options.notificationIdNull) {
          request.id = null;
        }
      } else {
        request.id = id;
      }
      return request;
    };
    module.exports = generateRequest;
  }
});

// node_modules/jayson/lib/client/browser/index.js
var require_browser = __commonJS({
  "node_modules/jayson/lib/client/browser/index.js"(exports, module) {
    "use strict";
    var uuid = (init_esm_browser(), __toCommonJS(esm_browser_exports)).v4;
    var generateRequest = require_generateRequest();
    var ClientBrowser = function(callServer, options) {
      if (!(this instanceof ClientBrowser)) {
        return new ClientBrowser(callServer, options);
      }
      if (!options) {
        options = {};
      }
      this.options = {
        reviver: typeof options.reviver !== "undefined" ? options.reviver : null,
        replacer: typeof options.replacer !== "undefined" ? options.replacer : null,
        generator: typeof options.generator !== "undefined" ? options.generator : function() {
          return uuid();
        },
        version: typeof options.version !== "undefined" ? options.version : 2,
        notificationIdNull: typeof options.notificationIdNull === "boolean" ? options.notificationIdNull : false
      };
      this.callServer = callServer;
    };
    module.exports = ClientBrowser;
    ClientBrowser.prototype.request = function(method, params, id, callback) {
      const self = this;
      let request = null;
      const isBatch = Array.isArray(method) && typeof params === "function";
      if (this.options.version === 1 && isBatch) {
        throw new TypeError("JSON-RPC 1.0 does not support batching");
      }
      const isRaw = !isBatch && method && typeof method === "object" && typeof params === "function";
      if (isBatch || isRaw) {
        callback = params;
        request = method;
      } else {
        if (typeof id === "function") {
          callback = id;
          id = void 0;
        }
        const hasCallback = typeof callback === "function";
        try {
          request = generateRequest(method, params, id, {
            generator: this.options.generator,
            version: this.options.version,
            notificationIdNull: this.options.notificationIdNull
          });
        } catch (err) {
          if (hasCallback) {
            return callback(err);
          }
          throw err;
        }
        if (!hasCallback) {
          return request;
        }
      }
      let message;
      try {
        message = JSON.stringify(request, this.options.replacer);
      } catch (err) {
        return callback(err);
      }
      this.callServer(message, function(err, response) {
        self._parseResponse(err, response, callback);
      });
      return request;
    };
    ClientBrowser.prototype._parseResponse = function(err, responseText, callback) {
      if (err) {
        callback(err);
        return;
      }
      if (!responseText) {
        return callback();
      }
      let response;
      try {
        response = JSON.parse(responseText, this.options.reviver);
      } catch (err2) {
        return callback(err2);
      }
      if (callback.length === 3) {
        if (Array.isArray(response)) {
          const isError = function(res) {
            return typeof res.error !== "undefined";
          };
          const isNotError = function(res) {
            return !isError(res);
          };
          return callback(null, response.filter(isError), response.filter(isNotError));
        } else {
          return callback(null, response.error, response.result);
        }
      }
      callback(null, response);
    };
  }
});

// node_modules/rpc-websockets/dist/index.browser.mjs
function WebSocket(address, options) {
  return new WebSocketBrowserImpl(address, options);
}
var import_buffer, WebSocketBrowserImpl, DefaultDataPack, CommonClient;
var init_index_browser4 = __esm({
  "node_modules/rpc-websockets/dist/index.browser.mjs"() {
    import_buffer = __toESM(require_buffer2(), 1);
    init_eventemitter3();
    WebSocketBrowserImpl = class extends import_index.default {
      /** Instantiate a WebSocket class
      * @constructor
      * @param {String} address - url to a websocket server
      * @param {(Object)} options - websocket options
      * @param {(String|Array)} protocols - a list of protocols
      * @return {WebSocketBrowserImpl} - returns a WebSocket instance
      */
      constructor(address, options, protocols) {
        super();
        __publicField(this, "socket");
        this.socket = new window.WebSocket(address, protocols);
        this.socket.onopen = () => this.emit("open");
        this.socket.onmessage = (event) => this.emit("message", event.data);
        this.socket.onerror = (error) => this.emit("error", error);
        this.socket.onclose = (event) => {
          this.emit("close", event.code, event.reason);
        };
      }
      /**
      * Sends data through a websocket connection
      * @method
      * @param {(String|Object)} data - data to be sent via websocket
      * @param {Object} optionsOrCallback - ws options
      * @param {Function} callback - a callback called once the data is sent
      * @return {Undefined}
      */
      send(data, optionsOrCallback, callback) {
        const cb = callback || optionsOrCallback;
        try {
          this.socket.send(data);
          cb();
        } catch (error) {
          cb(error);
        }
      }
      /**
      * Closes an underlying socket
      * @method
      * @param {Number} code - status code explaining why the connection is being closed
      * @param {String} reason - a description why the connection is closing
      * @return {Undefined}
      * @throws {Error}
      */
      close(code, reason) {
        this.socket.close(code, reason);
      }
      addEventListener(type2, listener, options) {
        this.socket.addEventListener(type2, listener, options);
      }
    };
    DefaultDataPack = class {
      encode(value) {
        return JSON.stringify(value);
      }
      decode(value) {
        return JSON.parse(value);
      }
    };
    CommonClient = class extends import_index.default {
      /**
      * Instantiate a Client class.
      * @constructor
      * @param {webSocketFactory} webSocketFactory - factory method for WebSocket
      * @param {String} address - url to a websocket server
      * @param {Object} options - ws options object with reconnect parameters
      * @param {Function} generate_request_id - custom generation request Id
      * @param {DataPack} dataPack - data pack contains encoder and decoder
      * @return {CommonClient}
      */
      constructor(webSocketFactory, address = "ws://localhost:8080", {
        autoconnect = true,
        reconnect = true,
        reconnect_interval = 1e3,
        max_reconnects = 5,
        ...rest_options
      } = {}, generate_request_id, dataPack) {
        super();
        __publicField(this, "address");
        __publicField(this, "rpc_id");
        __publicField(this, "queue");
        __publicField(this, "options");
        __publicField(this, "autoconnect");
        __publicField(this, "ready");
        __publicField(this, "reconnect");
        __publicField(this, "reconnect_timer_id");
        __publicField(this, "reconnect_interval");
        __publicField(this, "max_reconnects");
        __publicField(this, "rest_options");
        __publicField(this, "current_reconnects");
        __publicField(this, "generate_request_id");
        __publicField(this, "socket");
        __publicField(this, "webSocketFactory");
        __publicField(this, "dataPack");
        this.webSocketFactory = webSocketFactory;
        this.queue = {};
        this.rpc_id = 0;
        this.address = address;
        this.autoconnect = autoconnect;
        this.ready = false;
        this.reconnect = reconnect;
        this.reconnect_timer_id = void 0;
        this.reconnect_interval = reconnect_interval;
        this.max_reconnects = max_reconnects;
        this.rest_options = rest_options;
        this.current_reconnects = 0;
        this.generate_request_id = generate_request_id || (() => typeof this.rpc_id === "number" ? ++this.rpc_id : Number(this.rpc_id) + 1);
        if (!dataPack) this.dataPack = new DefaultDataPack();
        else this.dataPack = dataPack;
        if (this.autoconnect)
          this._connect(this.address, {
            autoconnect: this.autoconnect,
            reconnect: this.reconnect,
            reconnect_interval: this.reconnect_interval,
            max_reconnects: this.max_reconnects,
            ...this.rest_options
          });
      }
      /**
      * Connects to a defined server if not connected already.
      * @method
      * @return {Undefined}
      */
      connect() {
        if (this.socket) return;
        this._connect(this.address, {
          autoconnect: this.autoconnect,
          reconnect: this.reconnect,
          reconnect_interval: this.reconnect_interval,
          max_reconnects: this.max_reconnects,
          ...this.rest_options
        });
      }
      /**
      * Calls a registered RPC method on server.
      * @method
      * @param {String} method - RPC method name
      * @param {Object|Array} params - optional method parameters
      * @param {Number} timeout - RPC reply timeout value
      * @param {Object} ws_opts - options passed to ws
      * @return {Promise}
      */
      call(method, params, timeout, ws_opts) {
        if (!ws_opts && "object" === typeof timeout) {
          ws_opts = timeout;
          timeout = null;
        }
        return new Promise((resolve, reject) => {
          if (!this.ready) return reject(new Error("socket not ready"));
          const rpc_id = this.generate_request_id(method, params);
          const message = {
            jsonrpc: "2.0",
            method,
            params: params || void 0,
            id: rpc_id
          };
          this.socket.send(this.dataPack.encode(message), ws_opts, (error) => {
            if (error) return reject(error);
            this.queue[rpc_id] = { promise: [resolve, reject] };
            if (timeout) {
              this.queue[rpc_id].timeout = setTimeout(() => {
                delete this.queue[rpc_id];
                reject(new Error("reply timeout"));
              }, timeout);
            }
          });
        });
      }
      /**
      * Logins with the other side of the connection.
      * @method
      * @param {Object} params - Login credentials object
      * @return {Promise}
      */
      async login(params) {
        const resp = await this.call("rpc.login", params);
        if (!resp) throw new Error("authentication failed");
        return resp;
      }
      /**
      * Fetches a list of client's methods registered on server.
      * @method
      * @return {Array}
      */
      async listMethods() {
        return await this.call("__listMethods");
      }
      /**
      * Sends a JSON-RPC 2.0 notification to server.
      * @method
      * @param {String} method - RPC method name
      * @param {Object} params - optional method parameters
      * @return {Promise}
      */
      notify(method, params) {
        return new Promise((resolve, reject) => {
          if (!this.ready) return reject(new Error("socket not ready"));
          const message = {
            jsonrpc: "2.0",
            method,
            params
          };
          this.socket.send(this.dataPack.encode(message), (error) => {
            if (error) return reject(error);
            resolve();
          });
        });
      }
      /**
      * Subscribes for a defined event.
      * @method
      * @param {String|Array} event - event name
      * @return {Undefined}
      * @throws {Error}
      */
      async subscribe(event) {
        if (typeof event === "string") event = [event];
        const result = await this.call("rpc.on", event);
        if (typeof event === "string" && result[event] !== "ok")
          throw new Error(
            "Failed subscribing to an event '" + event + "' with: " + result[event]
          );
        return result;
      }
      /**
      * Unsubscribes from a defined event.
      * @method
      * @param {String|Array} event - event name
      * @return {Undefined}
      * @throws {Error}
      */
      async unsubscribe(event) {
        if (typeof event === "string") event = [event];
        const result = await this.call("rpc.off", event);
        if (typeof event === "string" && result[event] !== "ok")
          throw new Error("Failed unsubscribing from an event with: " + result);
        return result;
      }
      /**
      * Closes a WebSocket connection gracefully.
      * @method
      * @param {Number} code - socket close code
      * @param {String} data - optional data to be sent before closing
      * @return {Undefined}
      */
      close(code, data) {
        this.socket.close(code || 1e3, data);
      }
      /**
      * Enable / disable automatic reconnection.
      * @method
      * @param {Boolean} reconnect - enable / disable reconnection
      * @return {Undefined}
      */
      setAutoReconnect(reconnect) {
        this.reconnect = reconnect;
      }
      /**
      * Set the interval between reconnection attempts.
      * @method
      * @param {Number} interval - reconnection interval in milliseconds
      * @return {Undefined}
      */
      setReconnectInterval(interval) {
        this.reconnect_interval = interval;
      }
      /**
      * Set the maximum number of reconnection attempts.
      * @method
      * @param {Number} max_reconnects - maximum reconnection attempts
      * @return {Undefined}
      */
      setMaxReconnects(max_reconnects) {
        this.max_reconnects = max_reconnects;
      }
      /**
      * Connection/Message handler.
      * @method
      * @private
      * @param {String} address - WebSocket API address
      * @param {Object} options - ws options object
      * @return {Undefined}
      */
      _connect(address, options) {
        clearTimeout(this.reconnect_timer_id);
        this.socket = this.webSocketFactory(address, options);
        this.socket.addEventListener("open", () => {
          this.ready = true;
          this.emit("open");
          this.current_reconnects = 0;
        });
        this.socket.addEventListener("message", ({ data: message }) => {
          if (message instanceof ArrayBuffer)
            message = import_buffer.Buffer.from(message).toString();
          try {
            message = this.dataPack.decode(message);
          } catch (error) {
            return;
          }
          if (message.notification && this.listeners(message.notification).length) {
            if (!Object.keys(message.params).length)
              return this.emit(message.notification);
            const args = [message.notification];
            if (message.params.constructor === Object) args.push(message.params);
            else
              for (let i = 0; i < message.params.length; i++)
                args.push(message.params[i]);
            return Promise.resolve().then(() => {
              this.emit.apply(this, args);
            });
          }
          if (!this.queue[message.id]) {
            if (message.method) {
              return Promise.resolve().then(() => {
                this.emit(message.method, message == null ? void 0 : message.params);
              });
            }
            return;
          }
          if ("error" in message === "result" in message)
            this.queue[message.id].promise[1](
              new Error(
                'Server response malformed. Response must include either "result" or "error", but not both.'
              )
            );
          if (this.queue[message.id].timeout)
            clearTimeout(this.queue[message.id].timeout);
          if (message.error) this.queue[message.id].promise[1](message.error);
          else this.queue[message.id].promise[0](message.result);
          delete this.queue[message.id];
        });
        this.socket.addEventListener("error", (error) => this.emit("error", error));
        this.socket.addEventListener("close", ({ code, reason }) => {
          if (this.ready)
            setTimeout(() => this.emit("close", code, reason), 0);
          this.ready = false;
          this.socket = void 0;
          if (code === 1e3) return;
          this.current_reconnects++;
          if (this.reconnect && (this.max_reconnects > this.current_reconnects || this.max_reconnects === 0))
            this.reconnect_timer_id = setTimeout(
              () => this._connect(address, options),
              this.reconnect_interval
            );
        });
      }
    };
  }
});

// node_modules/@solana/web3.js/lib/index.browser.esm.js
var index_browser_esm_exports = {};
__export(index_browser_esm_exports, {
  Account: () => Account,
  AddressLookupTableAccount: () => AddressLookupTableAccount,
  AddressLookupTableInstruction: () => AddressLookupTableInstruction,
  AddressLookupTableProgram: () => AddressLookupTableProgram,
  Authorized: () => Authorized,
  BLOCKHASH_CACHE_TIMEOUT_MS: () => BLOCKHASH_CACHE_TIMEOUT_MS,
  BPF_LOADER_DEPRECATED_PROGRAM_ID: () => BPF_LOADER_DEPRECATED_PROGRAM_ID,
  BPF_LOADER_PROGRAM_ID: () => BPF_LOADER_PROGRAM_ID,
  BpfLoader: () => BpfLoader,
  COMPUTE_BUDGET_INSTRUCTION_LAYOUTS: () => COMPUTE_BUDGET_INSTRUCTION_LAYOUTS,
  ComputeBudgetInstruction: () => ComputeBudgetInstruction,
  ComputeBudgetProgram: () => ComputeBudgetProgram,
  Connection: () => Connection,
  Ed25519Program: () => Ed25519Program,
  Enum: () => Enum,
  EpochSchedule: () => EpochSchedule,
  FeeCalculatorLayout: () => FeeCalculatorLayout,
  Keypair: () => Keypair,
  LAMPORTS_PER_SOL: () => LAMPORTS_PER_SOL,
  LOOKUP_TABLE_INSTRUCTION_LAYOUTS: () => LOOKUP_TABLE_INSTRUCTION_LAYOUTS,
  Loader: () => Loader,
  Lockup: () => Lockup,
  MAX_SEED_LENGTH: () => MAX_SEED_LENGTH,
  Message: () => Message,
  MessageAccountKeys: () => MessageAccountKeys,
  MessageV0: () => MessageV0,
  NONCE_ACCOUNT_LENGTH: () => NONCE_ACCOUNT_LENGTH,
  NonceAccount: () => NonceAccount,
  PACKET_DATA_SIZE: () => PACKET_DATA_SIZE,
  PUBLIC_KEY_LENGTH: () => PUBLIC_KEY_LENGTH,
  PublicKey: () => PublicKey,
  SIGNATURE_LENGTH_IN_BYTES: () => SIGNATURE_LENGTH_IN_BYTES,
  SOLANA_SCHEMA: () => SOLANA_SCHEMA,
  STAKE_CONFIG_ID: () => STAKE_CONFIG_ID,
  STAKE_INSTRUCTION_LAYOUTS: () => STAKE_INSTRUCTION_LAYOUTS,
  SYSTEM_INSTRUCTION_LAYOUTS: () => SYSTEM_INSTRUCTION_LAYOUTS,
  SYSVAR_CLOCK_PUBKEY: () => SYSVAR_CLOCK_PUBKEY,
  SYSVAR_EPOCH_SCHEDULE_PUBKEY: () => SYSVAR_EPOCH_SCHEDULE_PUBKEY,
  SYSVAR_INSTRUCTIONS_PUBKEY: () => SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RECENT_BLOCKHASHES_PUBKEY: () => SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
  SYSVAR_RENT_PUBKEY: () => SYSVAR_RENT_PUBKEY,
  SYSVAR_REWARDS_PUBKEY: () => SYSVAR_REWARDS_PUBKEY,
  SYSVAR_SLOT_HASHES_PUBKEY: () => SYSVAR_SLOT_HASHES_PUBKEY,
  SYSVAR_SLOT_HISTORY_PUBKEY: () => SYSVAR_SLOT_HISTORY_PUBKEY,
  SYSVAR_STAKE_HISTORY_PUBKEY: () => SYSVAR_STAKE_HISTORY_PUBKEY,
  Secp256k1Program: () => Secp256k1Program,
  SendTransactionError: () => SendTransactionError,
  SolanaJSONRPCError: () => SolanaJSONRPCError,
  SolanaJSONRPCErrorCode: () => SolanaJSONRPCErrorCode,
  StakeAuthorizationLayout: () => StakeAuthorizationLayout,
  StakeInstruction: () => StakeInstruction,
  StakeProgram: () => StakeProgram,
  Struct: () => Struct2,
  SystemInstruction: () => SystemInstruction,
  SystemProgram: () => SystemProgram,
  Transaction: () => Transaction,
  TransactionExpiredBlockheightExceededError: () => TransactionExpiredBlockheightExceededError,
  TransactionExpiredNonceInvalidError: () => TransactionExpiredNonceInvalidError,
  TransactionExpiredTimeoutError: () => TransactionExpiredTimeoutError,
  TransactionInstruction: () => TransactionInstruction,
  TransactionMessage: () => TransactionMessage,
  TransactionStatus: () => TransactionStatus,
  VALIDATOR_INFO_KEY: () => VALIDATOR_INFO_KEY,
  VERSION_PREFIX_MASK: () => VERSION_PREFIX_MASK,
  VOTE_PROGRAM_ID: () => VOTE_PROGRAM_ID,
  ValidatorInfo: () => ValidatorInfo,
  VersionedMessage: () => VersionedMessage,
  VersionedTransaction: () => VersionedTransaction,
  VoteAccount: () => VoteAccount,
  VoteAuthorizationLayout: () => VoteAuthorizationLayout,
  VoteInit: () => VoteInit,
  VoteInstruction: () => VoteInstruction,
  VoteProgram: () => VoteProgram,
  clusterApiUrl: () => clusterApiUrl,
  sendAndConfirmRawTransaction: () => sendAndConfirmRawTransaction,
  sendAndConfirmTransaction: () => sendAndConfirmTransaction
});
function isOnCurve(publicKey2) {
  try {
    ed25519.ExtendedPoint.fromHex(publicKey2);
    return true;
  } catch {
    return false;
  }
}
function isPublicKeyData(value) {
  return value._bn !== void 0;
}
function getAlloc(type2, fields) {
  const getItemAlloc = (item) => {
    if (item.span >= 0) {
      return item.span;
    } else if (typeof item.alloc === "function") {
      return item.alloc(fields[item.property]);
    } else if ("count" in item && "elementLayout" in item) {
      const field = fields[item.property];
      if (Array.isArray(field)) {
        return field.length * getItemAlloc(item.elementLayout);
      }
    } else if ("fields" in item) {
      return getAlloc({
        layout: item
      }, fields[item.property]);
    }
    return 0;
  };
  let alloc = 0;
  type2.layout.fields.forEach((item) => {
    alloc += getItemAlloc(item);
  });
  return alloc;
}
function decodeLength(bytes) {
  let len = 0;
  let size = 0;
  for (; ; ) {
    let elem = bytes.shift();
    len |= (elem & 127) << size * 7;
    size += 1;
    if ((elem & 128) === 0) {
      break;
    }
  }
  return len;
}
function encodeLength(bytes, len) {
  let rem_len = len;
  for (; ; ) {
    let elem = rem_len & 127;
    rem_len >>= 7;
    if (rem_len == 0) {
      bytes.push(elem);
      break;
    } else {
      elem |= 128;
      bytes.push(elem);
    }
  }
}
function assert2(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
function guardedShift(byteArray) {
  if (byteArray.length === 0) {
    throw new Error(END_OF_BUFFER_ERROR_MESSAGE);
  }
  return byteArray.shift();
}
function guardedSplice(byteArray, ...args) {
  const [start] = args;
  if (args.length === 2 ? start + (args[1] ?? 0) > byteArray.length : start >= byteArray.length) {
    throw new Error(END_OF_BUFFER_ERROR_MESSAGE);
  }
  return byteArray.splice(...args);
}
async function sendAndConfirmTransaction(connection, transaction, signers, options) {
  const sendOptions = options && {
    skipPreflight: options.skipPreflight,
    preflightCommitment: options.preflightCommitment || options.commitment,
    maxRetries: options.maxRetries,
    minContextSlot: options.minContextSlot
  };
  const signature2 = await connection.sendTransaction(transaction, signers, sendOptions);
  let status;
  if (transaction.recentBlockhash != null && transaction.lastValidBlockHeight != null) {
    status = (await connection.confirmTransaction({
      abortSignal: options == null ? void 0 : options.abortSignal,
      signature: signature2,
      blockhash: transaction.recentBlockhash,
      lastValidBlockHeight: transaction.lastValidBlockHeight
    }, options && options.commitment)).value;
  } else if (transaction.minNonceContextSlot != null && transaction.nonceInfo != null) {
    const {
      nonceInstruction
    } = transaction.nonceInfo;
    const nonceAccountPubkey = nonceInstruction.keys[0].pubkey;
    status = (await connection.confirmTransaction({
      abortSignal: options == null ? void 0 : options.abortSignal,
      minContextSlot: transaction.minNonceContextSlot,
      nonceAccountPubkey,
      nonceValue: transaction.nonceInfo.nonce,
      signature: signature2
    }, options && options.commitment)).value;
  } else {
    if ((options == null ? void 0 : options.abortSignal) != null) {
      console.warn("sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable.");
    }
    status = (await connection.confirmTransaction(signature2, options && options.commitment)).value;
  }
  if (status.err) {
    if (signature2 != null) {
      throw new SendTransactionError({
        action: "send",
        signature: signature2,
        transactionMessage: `Status: (${JSON.stringify(status)})`
      });
    }
    throw new Error(`Transaction ${signature2} failed (${JSON.stringify(status)})`);
  }
  return signature2;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function encodeData(type2, fields) {
  const allocLength = type2.layout.span >= 0 ? type2.layout.span : getAlloc(type2, fields);
  const data = import_buffer2.Buffer.alloc(allocLength);
  const layoutFields = Object.assign({
    instruction: type2.index
  }, fields);
  type2.layout.encode(layoutFields, data);
  return data;
}
function decodeData$1(type2, buffer) {
  let data;
  try {
    data = type2.layout.decode(buffer);
  } catch (err) {
    throw new Error("invalid instruction; " + err);
  }
  if (data.instruction !== type2.index) {
    throw new Error(`invalid instruction; instruction index mismatch ${data.instruction} != ${type2.index}`);
  }
  return data;
}
function u64(property) {
  const layout = (0, import_buffer_layout.blob)(8, property);
  const decode2 = layout.decode.bind(layout);
  const encode2 = layout.encode.bind(layout);
  const bigIntLayout = layout;
  const codec = getU64Codec();
  bigIntLayout.decode = (buffer, offset2) => {
    const src = decode2(buffer, offset2);
    return codec.decode(src);
  };
  bigIntLayout.encode = (bigInt, buffer, offset2) => {
    const src = codec.encode(bigInt);
    return encode2(src, buffer, offset2);
  };
  return bigIntLayout;
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function requireFastStableStringify() {
  if (hasRequiredFastStableStringify) return fastStableStringify$1;
  hasRequiredFastStableStringify = 1;
  var objToString = Object.prototype.toString;
  var objKeys = Object.keys || function(obj) {
    var keys = [];
    for (var name in obj) {
      keys.push(name);
    }
    return keys;
  };
  function stringify2(val, isArrayProp) {
    var i, max, str, keys, key, propVal, toStr;
    if (val === true) {
      return "true";
    }
    if (val === false) {
      return "false";
    }
    switch (typeof val) {
      case "object":
        if (val === null) {
          return null;
        } else if (val.toJSON && typeof val.toJSON === "function") {
          return stringify2(val.toJSON(), isArrayProp);
        } else {
          toStr = objToString.call(val);
          if (toStr === "[object Array]") {
            str = "[";
            max = val.length - 1;
            for (i = 0; i < max; i++) {
              str += stringify2(val[i], true) + ",";
            }
            if (max > -1) {
              str += stringify2(val[i], true);
            }
            return str + "]";
          } else if (toStr === "[object Object]") {
            keys = objKeys(val).sort();
            max = keys.length;
            str = "";
            i = 0;
            while (i < max) {
              key = keys[i];
              propVal = stringify2(val[key], false);
              if (propVal !== void 0) {
                if (str) {
                  str += ",";
                }
                str += JSON.stringify(key) + ":" + propVal;
              }
              i++;
            }
            return "{" + str + "}";
          } else {
            return JSON.stringify(val);
          }
        }
      case "function":
      case "undefined":
        return isArrayProp ? null : void 0;
      case "string":
        return JSON.stringify(val);
      default:
        return isFinite(val) ? val : null;
    }
  }
  fastStableStringify$1 = function(val) {
    var returnVal = stringify2(val, false);
    if (returnVal !== void 0) {
      return "" + returnVal;
    }
  };
  return fastStableStringify$1;
}
function trailingZeros(n) {
  let trailingZeros2 = 0;
  while (n > 1) {
    n /= 2;
    trailingZeros2++;
  }
  return trailingZeros2;
}
function nextPowerOfTwo(n) {
  if (n === 0) return 1;
  n--;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  n |= n >> 32;
  return n + 1;
}
function decodeData(type2, data) {
  let decoded;
  try {
    decoded = type2.layout.decode(data);
  } catch (err) {
    throw new Error("invalid instruction; " + err);
  }
  if (decoded.typeIndex !== type2.index) {
    throw new Error(`invalid account data; account type mismatch ${decoded.typeIndex} != ${type2.index}`);
  }
  return decoded;
}
function makeWebsocketUrl(endpoint2) {
  const matches = endpoint2.match(URL_RE);
  if (matches == null) {
    throw TypeError(`Failed to validate endpoint URL \`${endpoint2}\``);
  }
  const [
    _,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    hostish,
    portWithColon,
    rest
  ] = matches;
  const protocol = endpoint2.startsWith("https:") ? "wss:" : "ws:";
  const startPort = portWithColon == null ? null : parseInt(portWithColon.slice(1), 10);
  const websocketPort = (
    // Only shift the port by +1 as a convention for ws(s) only if given endpoint
    // is explicitly specifying the endpoint port (HTTP-based RPC), assuming
    // we're directly trying to connect to agave-validator's ws listening port.
    // When the endpoint omits the port, we're connecting to the protocol
    // default ports: http(80) or https(443) and it's assumed we're behind a reverse
    // proxy which manages WebSocket upgrade and backend port redirection.
    startPort == null ? "" : `:${startPort + 1}`
  );
  return `${protocol}//${hostish}${websocketPort}${rest}`;
}
function assertEndpointUrl(putativeUrl) {
  if (/^https?:/.test(putativeUrl) === false) {
    throw new TypeError("Endpoint URL must start with `http:` or `https:`.");
  }
  return putativeUrl;
}
function extractCommitmentFromConfig(commitmentOrConfig) {
  let commitment;
  let config;
  if (typeof commitmentOrConfig === "string") {
    commitment = commitmentOrConfig;
  } else if (commitmentOrConfig) {
    const {
      commitment: specifiedCommitment,
      ...specifiedConfig
    } = commitmentOrConfig;
    commitment = specifiedCommitment;
    config = specifiedConfig;
  }
  return {
    commitment,
    config
  };
}
function applyDefaultMemcmpEncodingToFilters(filters) {
  return filters.map((filter) => "memcmp" in filter ? {
    ...filter,
    memcmp: {
      ...filter.memcmp,
      encoding: filter.memcmp.encoding ?? "base58"
    }
  } : filter);
}
function createRpcResult(result) {
  return union([type({
    jsonrpc: literal("2.0"),
    id: string(),
    result
  }), type({
    jsonrpc: literal("2.0"),
    id: string(),
    error: type({
      code: unknown(),
      message: string(),
      data: optional(any())
    })
  })]);
}
function jsonRpcResult(schema) {
  return coerce(createRpcResult(schema), UnknownRpcResult, (value) => {
    if ("error" in value) {
      return value;
    } else {
      return {
        ...value,
        result: create(value.result, schema)
      };
    }
  });
}
function jsonRpcResultAndContext(value) {
  return jsonRpcResult(type({
    context: type({
      slot: number()
    }),
    value
  }));
}
function notificationResultAndContext(value) {
  return type({
    context: type({
      slot: number()
    }),
    value
  });
}
function versionedMessageFromResponse(version2, response) {
  if (version2 === 0) {
    return new MessageV0({
      header: response.header,
      staticAccountKeys: response.accountKeys.map((accountKey) => new PublicKey(accountKey)),
      recentBlockhash: response.recentBlockhash,
      compiledInstructions: response.instructions.map((ix) => ({
        programIdIndex: ix.programIdIndex,
        accountKeyIndexes: ix.accounts,
        data: import_bs58.default.decode(ix.data)
      })),
      addressTableLookups: response.addressTableLookups
    });
  } else {
    return new Message(response);
  }
}
function createRpcClient(url, httpHeaders, customFetch, fetchMiddleware, disableRetryOnRateLimit, httpAgent) {
  const fetch = customFetch ? customFetch : fetchImpl;
  let agent;
  {
    if (httpAgent != null) {
      console.warn("You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments.");
    }
  }
  let fetchWithMiddleware;
  if (fetchMiddleware) {
    fetchWithMiddleware = async (info, init) => {
      const modifiedFetchArgs = await new Promise((resolve, reject) => {
        try {
          fetchMiddleware(info, init, (modifiedInfo, modifiedInit) => resolve([modifiedInfo, modifiedInit]));
        } catch (error) {
          reject(error);
        }
      });
      return await fetch(...modifiedFetchArgs);
    };
  }
  const clientBrowser = new import_browser.default(async (request, callback) => {
    const options = {
      method: "POST",
      body: request,
      agent,
      headers: Object.assign({
        "Content-Type": "application/json"
      }, httpHeaders || {}, COMMON_HTTP_HEADERS)
    };
    try {
      let too_many_requests_retries = 5;
      let res;
      let waitTime = 500;
      for (; ; ) {
        if (fetchWithMiddleware) {
          res = await fetchWithMiddleware(url, options);
        } else {
          res = await fetch(url, options);
        }
        if (res.status !== 429) {
          break;
        }
        if (disableRetryOnRateLimit === true) {
          break;
        }
        too_many_requests_retries -= 1;
        if (too_many_requests_retries === 0) {
          break;
        }
        console.error(`Server responded with ${res.status} ${res.statusText}.  Retrying after ${waitTime}ms delay...`);
        await sleep(waitTime);
        waitTime *= 2;
      }
      const text = await res.text();
      if (res.ok) {
        callback(null, text);
      } else {
        callback(new Error(`${res.status} ${res.statusText}: ${text}`));
      }
    } catch (err) {
      if (err instanceof Error) callback(err);
    }
  }, {});
  return clientBrowser;
}
function createRpcRequest(client) {
  return (method, args) => {
    return new Promise((resolve, reject) => {
      client.request(method, args, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  };
}
function createRpcBatchRequest(client) {
  return (requests) => {
    return new Promise((resolve, reject) => {
      if (requests.length === 0) resolve([]);
      const batch = requests.map((params) => {
        return client.request(params.methodName, params.args);
      });
      client.request(batch, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  };
}
function parseAuthorizedVoter({
  authorizedVoter,
  epoch
}) {
  return {
    epoch,
    authorizedVoter: new PublicKey(authorizedVoter)
  };
}
function parsePriorVoters({
  authorizedPubkey,
  epochOfLastAuthorizedSwitch,
  targetEpoch
}) {
  return {
    authorizedPubkey: new PublicKey(authorizedPubkey),
    epochOfLastAuthorizedSwitch,
    targetEpoch
  };
}
function getPriorVoters({
  buf,
  idx,
  isEmpty
}) {
  if (isEmpty) {
    return [];
  }
  return [...buf.slice(idx + 1).map(parsePriorVoters), ...buf.slice(0, idx).map(parsePriorVoters)];
}
function clusterApiUrl(cluster, tls) {
  const key = tls === false ? "http" : "https";
  if (!cluster) {
    return endpoint[key]["devnet"];
  }
  const url = endpoint[key][cluster];
  if (!url) {
    throw new Error(`Unknown ${key} cluster: ${cluster}`);
  }
  return url;
}
async function sendAndConfirmRawTransaction(connection, rawTransaction, confirmationStrategyOrConfirmOptions, maybeConfirmOptions) {
  let confirmationStrategy;
  let options;
  if (confirmationStrategyOrConfirmOptions && Object.prototype.hasOwnProperty.call(confirmationStrategyOrConfirmOptions, "lastValidBlockHeight")) {
    confirmationStrategy = confirmationStrategyOrConfirmOptions;
    options = maybeConfirmOptions;
  } else if (confirmationStrategyOrConfirmOptions && Object.prototype.hasOwnProperty.call(confirmationStrategyOrConfirmOptions, "nonceValue")) {
    confirmationStrategy = confirmationStrategyOrConfirmOptions;
    options = maybeConfirmOptions;
  } else {
    options = confirmationStrategyOrConfirmOptions;
  }
  const sendOptions = options && {
    skipPreflight: options.skipPreflight,
    preflightCommitment: options.preflightCommitment || options.commitment,
    minContextSlot: options.minContextSlot
  };
  const signature2 = await connection.sendRawTransaction(rawTransaction, sendOptions);
  const commitment = options && options.commitment;
  const confirmationPromise = confirmationStrategy ? connection.confirmTransaction(confirmationStrategy, commitment) : connection.confirmTransaction(signature2, commitment);
  const status = (await confirmationPromise).value;
  if (status.err) {
    if (signature2 != null) {
      throw new SendTransactionError({
        action: (sendOptions == null ? void 0 : sendOptions.skipPreflight) ? "send" : "simulate",
        signature: signature2,
        transactionMessage: `Status: (${JSON.stringify(status)})`
      });
    }
    throw new Error(`Raw transaction ${signature2} failed (${JSON.stringify(status)})`);
  }
  return signature2;
}
var import_buffer2, import_bn, import_bs58, import_borsh, BufferLayout, import_buffer_layout, import_browser, generatePrivateKey, generateKeypair, getPublicKey, sign, verify, toBuffer, Struct2, Enum, SOLANA_SCHEMA, _PublicKey, MAX_SEED_LENGTH, PUBLIC_KEY_LENGTH, uniquePublicKeyCounter, PublicKey, Account, BPF_LOADER_DEPRECATED_PROGRAM_ID, PACKET_DATA_SIZE, VERSION_PREFIX_MASK, SIGNATURE_LENGTH_IN_BYTES, TransactionExpiredBlockheightExceededError, TransactionExpiredTimeoutError, TransactionExpiredNonceInvalidError, MessageAccountKeys, publicKey, signature, rustString, authorized, lockup, voteInit, voteAuthorizeWithSeedArgs, CompiledKeys, END_OF_BUFFER_ERROR_MESSAGE, Message, MessageV0, VersionedMessage, TransactionStatus, DEFAULT_SIGNATURE, TransactionInstruction, Transaction, TransactionMessage, VersionedTransaction, NUM_TICKS_PER_SECOND, DEFAULT_TICKS_PER_SLOT, NUM_SLOTS_PER_SECOND, MS_PER_SLOT, SYSVAR_CLOCK_PUBKEY, SYSVAR_EPOCH_SCHEDULE_PUBKEY, SYSVAR_INSTRUCTIONS_PUBKEY, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, SYSVAR_RENT_PUBKEY, SYSVAR_REWARDS_PUBKEY, SYSVAR_SLOT_HASHES_PUBKEY, SYSVAR_SLOT_HISTORY_PUBKEY, SYSVAR_STAKE_HISTORY_PUBKEY, SendTransactionError, SolanaJSONRPCErrorCode, SolanaJSONRPCError, FeeCalculatorLayout, NonceAccountLayout, NONCE_ACCOUNT_LENGTH, NonceAccount, SystemInstruction, SYSTEM_INSTRUCTION_LAYOUTS, SystemProgram, CHUNK_SIZE, Loader, BPF_LOADER_PROGRAM_ID, BpfLoader, fastStableStringify$1, hasRequiredFastStableStringify, fastStableStringifyExports, fastStableStringify, MINIMUM_SLOT_PER_EPOCH, EpochSchedule, fetchImpl, RpcWebSocketClient, LOOKUP_TABLE_META_SIZE, AddressLookupTableAccount, LookupTableMetaLayout, URL_RE, PublicKeyFromString, RawAccountDataResult, BufferFromRawAccountData, BLOCKHASH_CACHE_TIMEOUT_MS, UnknownRpcResult, GetInflationGovernorResult, GetInflationRewardResult, GetRecentPrioritizationFeesResult, GetInflationRateResult, GetEpochInfoResult, GetEpochScheduleResult, GetLeaderScheduleResult, TransactionErrorResult, SignatureStatusResult, SignatureReceivedResult, VersionResult, ParsedInstructionStruct, PartiallyDecodedInstructionStruct, SimulatedTransactionResponseStruct, BlockProductionResponseStruct, GetInflationGovernorRpcResult, GetInflationRateRpcResult, GetRecentPrioritizationFeesRpcResult, GetEpochInfoRpcResult, GetEpochScheduleRpcResult, GetLeaderScheduleRpcResult, SlotRpcResult, GetSupplyRpcResult, TokenAmountResult, GetTokenLargestAccountsResult, GetTokenAccountsByOwner, ParsedAccountDataResult, GetParsedTokenAccountsByOwner, GetLargestAccountsRpcResult, AccountInfoResult, KeyedAccountInfoResult, ParsedOrRawAccountData, ParsedAccountInfoResult, KeyedParsedAccountInfoResult, StakeActivationResult, GetConfirmedSignaturesForAddress2RpcResult, GetSignaturesForAddressRpcResult, AccountNotificationResult, ProgramAccountInfoResult, ProgramAccountNotificationResult, SlotInfoResult, SlotNotificationResult, SlotUpdateResult, SlotUpdateNotificationResult, SignatureNotificationResult, RootNotificationResult, ContactInfoResult, VoteAccountInfoResult, GetVoteAccounts, ConfirmationStatus, SignatureStatusResponse, GetSignatureStatusesRpcResult, GetMinimumBalanceForRentExemptionRpcResult, AddressTableLookupStruct, ConfirmedTransactionResult, AnnotatedAccountKey, ConfirmedTransactionAccountsModeResult, ParsedInstructionResult, RawInstructionResult, InstructionResult, UnknownInstructionResult, ParsedOrRawInstruction, ParsedConfirmedTransactionResult, TokenBalanceResult, LoadedAddressesResult, ConfirmedTransactionMetaResult, ParsedConfirmedTransactionMetaResult, TransactionVersionStruct, RewardsResult, GetBlockRpcResult, GetNoneModeBlockRpcResult, GetAccountsModeBlockRpcResult, GetParsedBlockRpcResult, GetParsedAccountsModeBlockRpcResult, GetParsedNoneModeBlockRpcResult, GetConfirmedBlockRpcResult, GetBlockSignaturesRpcResult, GetTransactionRpcResult, GetParsedTransactionRpcResult, GetLatestBlockhashRpcResult, IsBlockhashValidRpcResult, PerfSampleResult, GetRecentPerformanceSamplesRpcResult, GetFeeCalculatorRpcResult, RequestAirdropRpcResult, SendTransactionRpcResult, LogsResult, LogsNotificationResult, COMMON_HTTP_HEADERS, Connection, Keypair, LOOKUP_TABLE_INSTRUCTION_LAYOUTS, AddressLookupTableInstruction, AddressLookupTableProgram, ComputeBudgetInstruction, COMPUTE_BUDGET_INSTRUCTION_LAYOUTS, ComputeBudgetProgram, PRIVATE_KEY_BYTES$1, PUBLIC_KEY_BYTES$1, SIGNATURE_BYTES, ED25519_INSTRUCTION_LAYOUT, Ed25519Program, ecdsaSign, publicKeyCreate, PRIVATE_KEY_BYTES, ETHEREUM_ADDRESS_BYTES, PUBLIC_KEY_BYTES, SIGNATURE_OFFSETS_SERIALIZED_SIZE, SECP256K1_INSTRUCTION_LAYOUT, Secp256k1Program, _Lockup, STAKE_CONFIG_ID, Authorized, Lockup, StakeInstruction, STAKE_INSTRUCTION_LAYOUTS, StakeAuthorizationLayout, StakeProgram, VoteInit, VoteInstruction, VOTE_INSTRUCTION_LAYOUTS, VoteAuthorizationLayout, VoteProgram, VALIDATOR_INFO_KEY, InfoString, ValidatorInfo, VOTE_PROGRAM_ID, VoteAccountLayout, VoteAccount, endpoint, LAMPORTS_PER_SOL;
var init_index_browser_esm = __esm({
  "node_modules/@solana/web3.js/lib/index.browser.esm.js"() {
    import_buffer2 = __toESM(require_buffer2());
    init_ed25519();
    import_bn = __toESM(require_bn());
    import_bs58 = __toESM(require_bs58());
    init_sha256();
    import_borsh = __toESM(require_lib());
    BufferLayout = __toESM(require_Layout());
    import_buffer_layout = __toESM(require_Layout());
    init_index_browser3();
    init_dist();
    import_browser = __toESM(require_browser());
    init_index_browser4();
    init_sha3();
    init_secp256k1();
    generatePrivateKey = ed25519.utils.randomPrivateKey;
    generateKeypair = () => {
      const privateScalar = ed25519.utils.randomPrivateKey();
      const publicKey2 = getPublicKey(privateScalar);
      const secretKey = new Uint8Array(64);
      secretKey.set(privateScalar);
      secretKey.set(publicKey2, 32);
      return {
        publicKey: publicKey2,
        secretKey
      };
    };
    getPublicKey = ed25519.getPublicKey;
    sign = (message, secretKey) => ed25519.sign(message, secretKey.slice(0, 32));
    verify = ed25519.verify;
    toBuffer = (arr) => {
      if (import_buffer2.Buffer.isBuffer(arr)) {
        return arr;
      } else if (arr instanceof Uint8Array) {
        return import_buffer2.Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
      } else {
        return import_buffer2.Buffer.from(arr);
      }
    };
    Struct2 = class {
      constructor(properties) {
        Object.assign(this, properties);
      }
      encode() {
        return import_buffer2.Buffer.from((0, import_borsh.serialize)(SOLANA_SCHEMA, this));
      }
      static decode(data) {
        return (0, import_borsh.deserialize)(SOLANA_SCHEMA, this, data);
      }
      static decodeUnchecked(data) {
        return (0, import_borsh.deserializeUnchecked)(SOLANA_SCHEMA, this, data);
      }
    };
    Enum = class extends Struct2 {
      constructor(properties) {
        super(properties);
        this.enum = "";
        if (Object.keys(properties).length !== 1) {
          throw new Error("Enum can only take single value");
        }
        Object.keys(properties).map((key) => {
          this.enum = key;
        });
      }
    };
    SOLANA_SCHEMA = /* @__PURE__ */ new Map();
    MAX_SEED_LENGTH = 32;
    PUBLIC_KEY_LENGTH = 32;
    uniquePublicKeyCounter = 1;
    PublicKey = class _PublicKey2 extends Struct2 {
      /**
       * Create a new PublicKey object
       * @param value ed25519 public key as buffer or base-58 encoded string
       */
      constructor(value) {
        super({});
        this._bn = void 0;
        if (isPublicKeyData(value)) {
          this._bn = value._bn;
        } else {
          if (typeof value === "string") {
            const decoded = import_bs58.default.decode(value);
            if (decoded.length != PUBLIC_KEY_LENGTH) {
              throw new Error(`Invalid public key input`);
            }
            this._bn = new import_bn.default(decoded);
          } else {
            this._bn = new import_bn.default(value);
          }
          if (this._bn.byteLength() > PUBLIC_KEY_LENGTH) {
            throw new Error(`Invalid public key input`);
          }
        }
      }
      /**
       * Returns a unique PublicKey for tests and benchmarks using a counter
       */
      static unique() {
        const key = new _PublicKey2(uniquePublicKeyCounter);
        uniquePublicKeyCounter += 1;
        return new _PublicKey2(key.toBuffer());
      }
      /**
       * Default public key value. The base58-encoded string representation is all ones (as seen below)
       * The underlying BN number is 32 bytes that are all zeros
       */
      /**
       * Checks if two publicKeys are equal
       */
      equals(publicKey2) {
        return this._bn.eq(publicKey2._bn);
      }
      /**
       * Return the base-58 representation of the public key
       */
      toBase58() {
        return import_bs58.default.encode(this.toBytes());
      }
      toJSON() {
        return this.toBase58();
      }
      /**
       * Return the byte array representation of the public key in big endian
       */
      toBytes() {
        const buf = this.toBuffer();
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
      }
      /**
       * Return the Buffer representation of the public key in big endian
       */
      toBuffer() {
        const b = this._bn.toArrayLike(import_buffer2.Buffer);
        if (b.length === PUBLIC_KEY_LENGTH) {
          return b;
        }
        const zeroPad = import_buffer2.Buffer.alloc(32);
        b.copy(zeroPad, 32 - b.length);
        return zeroPad;
      }
      get [Symbol.toStringTag]() {
        return `PublicKey(${this.toString()})`;
      }
      /**
       * Return the base-58 representation of the public key
       */
      toString() {
        return this.toBase58();
      }
      /**
       * Derive a public key from another key, a seed, and a program ID.
       * The program ID will also serve as the owner of the public key, giving
       * it permission to write data to the account.
       */
      /* eslint-disable require-await */
      static async createWithSeed(fromPublicKey, seed, programId) {
        const buffer = import_buffer2.Buffer.concat([fromPublicKey.toBuffer(), import_buffer2.Buffer.from(seed), programId.toBuffer()]);
        const publicKeyBytes = sha256(buffer);
        return new _PublicKey2(publicKeyBytes);
      }
      /**
       * Derive a program address from seeds and a program ID.
       */
      /* eslint-disable require-await */
      static createProgramAddressSync(seeds, programId) {
        let buffer = import_buffer2.Buffer.alloc(0);
        seeds.forEach(function(seed) {
          if (seed.length > MAX_SEED_LENGTH) {
            throw new TypeError(`Max seed length exceeded`);
          }
          buffer = import_buffer2.Buffer.concat([buffer, toBuffer(seed)]);
        });
        buffer = import_buffer2.Buffer.concat([buffer, programId.toBuffer(), import_buffer2.Buffer.from("ProgramDerivedAddress")]);
        const publicKeyBytes = sha256(buffer);
        if (isOnCurve(publicKeyBytes)) {
          throw new Error(`Invalid seeds, address must fall off the curve`);
        }
        return new _PublicKey2(publicKeyBytes);
      }
      /**
       * Async version of createProgramAddressSync
       * For backwards compatibility
       *
       * @deprecated Use {@link createProgramAddressSync} instead
       */
      /* eslint-disable require-await */
      static async createProgramAddress(seeds, programId) {
        return this.createProgramAddressSync(seeds, programId);
      }
      /**
       * Find a valid program address
       *
       * Valid program addresses must fall off the ed25519 curve.  This function
       * iterates a nonce until it finds one that when combined with the seeds
       * results in a valid program address.
       */
      static findProgramAddressSync(seeds, programId) {
        let nonce = 255;
        let address;
        while (nonce != 0) {
          try {
            const seedsWithNonce = seeds.concat(import_buffer2.Buffer.from([nonce]));
            address = this.createProgramAddressSync(seedsWithNonce, programId);
          } catch (err) {
            if (err instanceof TypeError) {
              throw err;
            }
            nonce--;
            continue;
          }
          return [address, nonce];
        }
        throw new Error(`Unable to find a viable program address nonce`);
      }
      /**
       * Async version of findProgramAddressSync
       * For backwards compatibility
       *
       * @deprecated Use {@link findProgramAddressSync} instead
       */
      static async findProgramAddress(seeds, programId) {
        return this.findProgramAddressSync(seeds, programId);
      }
      /**
       * Check that a pubkey is on the ed25519 curve.
       */
      static isOnCurve(pubkeyData) {
        const pubkey = new _PublicKey2(pubkeyData);
        return isOnCurve(pubkey.toBytes());
      }
    };
    _PublicKey = PublicKey;
    PublicKey.default = new _PublicKey("11111111111111111111111111111111");
    SOLANA_SCHEMA.set(PublicKey, {
      kind: "struct",
      fields: [["_bn", "u256"]]
    });
    Account = class {
      /**
       * Create a new Account object
       *
       * If the secretKey parameter is not provided a new key pair is randomly
       * created for the account
       *
       * @param secretKey Secret key for the account
       */
      constructor(secretKey) {
        this._publicKey = void 0;
        this._secretKey = void 0;
        if (secretKey) {
          const secretKeyBuffer = toBuffer(secretKey);
          if (secretKey.length !== 64) {
            throw new Error("bad secret key size");
          }
          this._publicKey = secretKeyBuffer.slice(32, 64);
          this._secretKey = secretKeyBuffer.slice(0, 32);
        } else {
          this._secretKey = toBuffer(generatePrivateKey());
          this._publicKey = toBuffer(getPublicKey(this._secretKey));
        }
      }
      /**
       * The public key for this account
       */
      get publicKey() {
        return new PublicKey(this._publicKey);
      }
      /**
       * The **unencrypted** secret key for this account. The first 32 bytes
       * is the private scalar and the last 32 bytes is the public key.
       * Read more: https://blog.mozilla.org/warner/2011/11/29/ed25519-keys/
       */
      get secretKey() {
        return import_buffer2.Buffer.concat([this._secretKey, this._publicKey], 64);
      }
    };
    BPF_LOADER_DEPRECATED_PROGRAM_ID = new PublicKey("BPFLoader1111111111111111111111111111111111");
    PACKET_DATA_SIZE = 1280 - 40 - 8;
    VERSION_PREFIX_MASK = 127;
    SIGNATURE_LENGTH_IN_BYTES = 64;
    TransactionExpiredBlockheightExceededError = class extends Error {
      constructor(signature2) {
        super(`Signature ${signature2} has expired: block height exceeded.`);
        this.signature = void 0;
        this.signature = signature2;
      }
    };
    Object.defineProperty(TransactionExpiredBlockheightExceededError.prototype, "name", {
      value: "TransactionExpiredBlockheightExceededError"
    });
    TransactionExpiredTimeoutError = class extends Error {
      constructor(signature2, timeoutSeconds) {
        super(`Transaction was not confirmed in ${timeoutSeconds.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${signature2} using the Solana Explorer or CLI tools.`);
        this.signature = void 0;
        this.signature = signature2;
      }
    };
    Object.defineProperty(TransactionExpiredTimeoutError.prototype, "name", {
      value: "TransactionExpiredTimeoutError"
    });
    TransactionExpiredNonceInvalidError = class extends Error {
      constructor(signature2) {
        super(`Signature ${signature2} has expired: the nonce is no longer valid.`);
        this.signature = void 0;
        this.signature = signature2;
      }
    };
    Object.defineProperty(TransactionExpiredNonceInvalidError.prototype, "name", {
      value: "TransactionExpiredNonceInvalidError"
    });
    MessageAccountKeys = class {
      constructor(staticAccountKeys, accountKeysFromLookups) {
        this.staticAccountKeys = void 0;
        this.accountKeysFromLookups = void 0;
        this.staticAccountKeys = staticAccountKeys;
        this.accountKeysFromLookups = accountKeysFromLookups;
      }
      keySegments() {
        const keySegments = [this.staticAccountKeys];
        if (this.accountKeysFromLookups) {
          keySegments.push(this.accountKeysFromLookups.writable);
          keySegments.push(this.accountKeysFromLookups.readonly);
        }
        return keySegments;
      }
      get(index) {
        for (const keySegment of this.keySegments()) {
          if (index < keySegment.length) {
            return keySegment[index];
          } else {
            index -= keySegment.length;
          }
        }
        return;
      }
      get length() {
        return this.keySegments().flat().length;
      }
      compileInstructions(instructions) {
        const U8_MAX = 255;
        if (this.length > U8_MAX + 1) {
          throw new Error("Account index overflow encountered during compilation");
        }
        const keyIndexMap = /* @__PURE__ */ new Map();
        this.keySegments().flat().forEach((key, index) => {
          keyIndexMap.set(key.toBase58(), index);
        });
        const findKeyIndex = (key) => {
          const keyIndex = keyIndexMap.get(key.toBase58());
          if (keyIndex === void 0) throw new Error("Encountered an unknown instruction account key during compilation");
          return keyIndex;
        };
        return instructions.map((instruction) => {
          return {
            programIdIndex: findKeyIndex(instruction.programId),
            accountKeyIndexes: instruction.keys.map((meta) => findKeyIndex(meta.pubkey)),
            data: instruction.data
          };
        });
      }
    };
    publicKey = (property = "publicKey") => {
      return BufferLayout.blob(32, property);
    };
    signature = (property = "signature") => {
      return BufferLayout.blob(64, property);
    };
    rustString = (property = "string") => {
      const rsl = BufferLayout.struct([BufferLayout.u32("length"), BufferLayout.u32("lengthPadding"), BufferLayout.blob(BufferLayout.offset(BufferLayout.u32(), -8), "chars")], property);
      const _decode = rsl.decode.bind(rsl);
      const _encode = rsl.encode.bind(rsl);
      const rslShim = rsl;
      rslShim.decode = (b, offset2) => {
        const data = _decode(b, offset2);
        return data["chars"].toString();
      };
      rslShim.encode = (str, b, offset2) => {
        const data = {
          chars: import_buffer2.Buffer.from(str, "utf8")
        };
        return _encode(data, b, offset2);
      };
      rslShim.alloc = (str) => {
        return BufferLayout.u32().span + BufferLayout.u32().span + import_buffer2.Buffer.from(str, "utf8").length;
      };
      return rslShim;
    };
    authorized = (property = "authorized") => {
      return BufferLayout.struct([publicKey("staker"), publicKey("withdrawer")], property);
    };
    lockup = (property = "lockup") => {
      return BufferLayout.struct([BufferLayout.ns64("unixTimestamp"), BufferLayout.ns64("epoch"), publicKey("custodian")], property);
    };
    voteInit = (property = "voteInit") => {
      return BufferLayout.struct([publicKey("nodePubkey"), publicKey("authorizedVoter"), publicKey("authorizedWithdrawer"), BufferLayout.u8("commission")], property);
    };
    voteAuthorizeWithSeedArgs = (property = "voteAuthorizeWithSeedArgs") => {
      return BufferLayout.struct([BufferLayout.u32("voteAuthorizationType"), publicKey("currentAuthorityDerivedKeyOwnerPubkey"), rustString("currentAuthorityDerivedKeySeed"), publicKey("newAuthorized")], property);
    };
    CompiledKeys = class _CompiledKeys {
      constructor(payer, keyMetaMap) {
        this.payer = void 0;
        this.keyMetaMap = void 0;
        this.payer = payer;
        this.keyMetaMap = keyMetaMap;
      }
      static compile(instructions, payer) {
        const keyMetaMap = /* @__PURE__ */ new Map();
        const getOrInsertDefault = (pubkey) => {
          const address = pubkey.toBase58();
          let keyMeta = keyMetaMap.get(address);
          if (keyMeta === void 0) {
            keyMeta = {
              isSigner: false,
              isWritable: false,
              isInvoked: false
            };
            keyMetaMap.set(address, keyMeta);
          }
          return keyMeta;
        };
        const payerKeyMeta = getOrInsertDefault(payer);
        payerKeyMeta.isSigner = true;
        payerKeyMeta.isWritable = true;
        for (const ix of instructions) {
          getOrInsertDefault(ix.programId).isInvoked = true;
          for (const accountMeta of ix.keys) {
            const keyMeta = getOrInsertDefault(accountMeta.pubkey);
            keyMeta.isSigner || (keyMeta.isSigner = accountMeta.isSigner);
            keyMeta.isWritable || (keyMeta.isWritable = accountMeta.isWritable);
          }
        }
        return new _CompiledKeys(payer, keyMetaMap);
      }
      getMessageComponents() {
        const mapEntries = [...this.keyMetaMap.entries()];
        assert2(mapEntries.length <= 256, "Max static account keys length exceeded");
        const writableSigners = mapEntries.filter(([, meta]) => meta.isSigner && meta.isWritable);
        const readonlySigners = mapEntries.filter(([, meta]) => meta.isSigner && !meta.isWritable);
        const writableNonSigners = mapEntries.filter(([, meta]) => !meta.isSigner && meta.isWritable);
        const readonlyNonSigners = mapEntries.filter(([, meta]) => !meta.isSigner && !meta.isWritable);
        const header = {
          numRequiredSignatures: writableSigners.length + readonlySigners.length,
          numReadonlySignedAccounts: readonlySigners.length,
          numReadonlyUnsignedAccounts: readonlyNonSigners.length
        };
        {
          assert2(writableSigners.length > 0, "Expected at least one writable signer key");
          const [payerAddress] = writableSigners[0];
          assert2(payerAddress === this.payer.toBase58(), "Expected first writable signer key to be the fee payer");
        }
        const staticAccountKeys = [...writableSigners.map(([address]) => new PublicKey(address)), ...readonlySigners.map(([address]) => new PublicKey(address)), ...writableNonSigners.map(([address]) => new PublicKey(address)), ...readonlyNonSigners.map(([address]) => new PublicKey(address))];
        return [header, staticAccountKeys];
      }
      extractTableLookup(lookupTable) {
        const [writableIndexes, drainedWritableKeys] = this.drainKeysFoundInLookupTable(lookupTable.state.addresses, (keyMeta) => !keyMeta.isSigner && !keyMeta.isInvoked && keyMeta.isWritable);
        const [readonlyIndexes, drainedReadonlyKeys] = this.drainKeysFoundInLookupTable(lookupTable.state.addresses, (keyMeta) => !keyMeta.isSigner && !keyMeta.isInvoked && !keyMeta.isWritable);
        if (writableIndexes.length === 0 && readonlyIndexes.length === 0) {
          return;
        }
        return [{
          accountKey: lookupTable.key,
          writableIndexes,
          readonlyIndexes
        }, {
          writable: drainedWritableKeys,
          readonly: drainedReadonlyKeys
        }];
      }
      /** @internal */
      drainKeysFoundInLookupTable(lookupTableEntries, keyMetaFilter) {
        const lookupTableIndexes = new Array();
        const drainedKeys = new Array();
        for (const [address, keyMeta] of this.keyMetaMap.entries()) {
          if (keyMetaFilter(keyMeta)) {
            const key = new PublicKey(address);
            const lookupTableIndex = lookupTableEntries.findIndex((entry) => entry.equals(key));
            if (lookupTableIndex >= 0) {
              assert2(lookupTableIndex < 256, "Max lookup table index exceeded");
              lookupTableIndexes.push(lookupTableIndex);
              drainedKeys.push(key);
              this.keyMetaMap.delete(address);
            }
          }
        }
        return [lookupTableIndexes, drainedKeys];
      }
    };
    END_OF_BUFFER_ERROR_MESSAGE = "Reached end of buffer unexpectedly";
    Message = class _Message {
      constructor(args) {
        this.header = void 0;
        this.accountKeys = void 0;
        this.recentBlockhash = void 0;
        this.instructions = void 0;
        this.indexToProgramIds = /* @__PURE__ */ new Map();
        this.header = args.header;
        this.accountKeys = args.accountKeys.map((account) => new PublicKey(account));
        this.recentBlockhash = args.recentBlockhash;
        this.instructions = args.instructions;
        this.instructions.forEach((ix) => this.indexToProgramIds.set(ix.programIdIndex, this.accountKeys[ix.programIdIndex]));
      }
      get version() {
        return "legacy";
      }
      get staticAccountKeys() {
        return this.accountKeys;
      }
      get compiledInstructions() {
        return this.instructions.map((ix) => ({
          programIdIndex: ix.programIdIndex,
          accountKeyIndexes: ix.accounts,
          data: import_bs58.default.decode(ix.data)
        }));
      }
      get addressTableLookups() {
        return [];
      }
      getAccountKeys() {
        return new MessageAccountKeys(this.staticAccountKeys);
      }
      static compile(args) {
        const compiledKeys = CompiledKeys.compile(args.instructions, args.payerKey);
        const [header, staticAccountKeys] = compiledKeys.getMessageComponents();
        const accountKeys = new MessageAccountKeys(staticAccountKeys);
        const instructions = accountKeys.compileInstructions(args.instructions).map((ix) => ({
          programIdIndex: ix.programIdIndex,
          accounts: ix.accountKeyIndexes,
          data: import_bs58.default.encode(ix.data)
        }));
        return new _Message({
          header,
          accountKeys: staticAccountKeys,
          recentBlockhash: args.recentBlockhash,
          instructions
        });
      }
      isAccountSigner(index) {
        return index < this.header.numRequiredSignatures;
      }
      isAccountWritable(index) {
        const numSignedAccounts = this.header.numRequiredSignatures;
        if (index >= this.header.numRequiredSignatures) {
          const unsignedAccountIndex = index - numSignedAccounts;
          const numUnsignedAccounts = this.accountKeys.length - numSignedAccounts;
          const numWritableUnsignedAccounts = numUnsignedAccounts - this.header.numReadonlyUnsignedAccounts;
          return unsignedAccountIndex < numWritableUnsignedAccounts;
        } else {
          const numWritableSignedAccounts = numSignedAccounts - this.header.numReadonlySignedAccounts;
          return index < numWritableSignedAccounts;
        }
      }
      isProgramId(index) {
        return this.indexToProgramIds.has(index);
      }
      programIds() {
        return [...this.indexToProgramIds.values()];
      }
      nonProgramIds() {
        return this.accountKeys.filter((_, index) => !this.isProgramId(index));
      }
      serialize() {
        const numKeys = this.accountKeys.length;
        let keyCount = [];
        encodeLength(keyCount, numKeys);
        const instructions = this.instructions.map((instruction) => {
          const {
            accounts,
            programIdIndex
          } = instruction;
          const data = Array.from(import_bs58.default.decode(instruction.data));
          let keyIndicesCount = [];
          encodeLength(keyIndicesCount, accounts.length);
          let dataCount = [];
          encodeLength(dataCount, data.length);
          return {
            programIdIndex,
            keyIndicesCount: import_buffer2.Buffer.from(keyIndicesCount),
            keyIndices: accounts,
            dataLength: import_buffer2.Buffer.from(dataCount),
            data
          };
        });
        let instructionCount = [];
        encodeLength(instructionCount, instructions.length);
        let instructionBuffer = import_buffer2.Buffer.alloc(PACKET_DATA_SIZE);
        import_buffer2.Buffer.from(instructionCount).copy(instructionBuffer);
        let instructionBufferLength = instructionCount.length;
        instructions.forEach((instruction) => {
          const instructionLayout = BufferLayout.struct([BufferLayout.u8("programIdIndex"), BufferLayout.blob(instruction.keyIndicesCount.length, "keyIndicesCount"), BufferLayout.seq(BufferLayout.u8("keyIndex"), instruction.keyIndices.length, "keyIndices"), BufferLayout.blob(instruction.dataLength.length, "dataLength"), BufferLayout.seq(BufferLayout.u8("userdatum"), instruction.data.length, "data")]);
          const length2 = instructionLayout.encode(instruction, instructionBuffer, instructionBufferLength);
          instructionBufferLength += length2;
        });
        instructionBuffer = instructionBuffer.slice(0, instructionBufferLength);
        const signDataLayout = BufferLayout.struct([BufferLayout.blob(1, "numRequiredSignatures"), BufferLayout.blob(1, "numReadonlySignedAccounts"), BufferLayout.blob(1, "numReadonlyUnsignedAccounts"), BufferLayout.blob(keyCount.length, "keyCount"), BufferLayout.seq(publicKey("key"), numKeys, "keys"), publicKey("recentBlockhash")]);
        const transaction = {
          numRequiredSignatures: import_buffer2.Buffer.from([this.header.numRequiredSignatures]),
          numReadonlySignedAccounts: import_buffer2.Buffer.from([this.header.numReadonlySignedAccounts]),
          numReadonlyUnsignedAccounts: import_buffer2.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
          keyCount: import_buffer2.Buffer.from(keyCount),
          keys: this.accountKeys.map((key) => toBuffer(key.toBytes())),
          recentBlockhash: import_bs58.default.decode(this.recentBlockhash)
        };
        let signData = import_buffer2.Buffer.alloc(2048);
        const length = signDataLayout.encode(transaction, signData);
        instructionBuffer.copy(signData, length);
        return signData.slice(0, length + instructionBuffer.length);
      }
      /**
       * Decode a compiled message into a Message object.
       */
      static from(buffer) {
        let byteArray = [...buffer];
        const numRequiredSignatures = guardedShift(byteArray);
        if (numRequiredSignatures !== (numRequiredSignatures & VERSION_PREFIX_MASK)) {
          throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
        }
        const numReadonlySignedAccounts = guardedShift(byteArray);
        const numReadonlyUnsignedAccounts = guardedShift(byteArray);
        const accountCount = decodeLength(byteArray);
        let accountKeys = [];
        for (let i = 0; i < accountCount; i++) {
          const account = guardedSplice(byteArray, 0, PUBLIC_KEY_LENGTH);
          accountKeys.push(new PublicKey(import_buffer2.Buffer.from(account)));
        }
        const recentBlockhash = guardedSplice(byteArray, 0, PUBLIC_KEY_LENGTH);
        const instructionCount = decodeLength(byteArray);
        let instructions = [];
        for (let i = 0; i < instructionCount; i++) {
          const programIdIndex = guardedShift(byteArray);
          const accountCount2 = decodeLength(byteArray);
          const accounts = guardedSplice(byteArray, 0, accountCount2);
          const dataLength = decodeLength(byteArray);
          const dataSlice = guardedSplice(byteArray, 0, dataLength);
          const data = import_bs58.default.encode(import_buffer2.Buffer.from(dataSlice));
          instructions.push({
            programIdIndex,
            accounts,
            data
          });
        }
        const messageArgs = {
          header: {
            numRequiredSignatures,
            numReadonlySignedAccounts,
            numReadonlyUnsignedAccounts
          },
          recentBlockhash: import_bs58.default.encode(import_buffer2.Buffer.from(recentBlockhash)),
          accountKeys,
          instructions
        };
        return new _Message(messageArgs);
      }
    };
    MessageV0 = class _MessageV0 {
      constructor(args) {
        this.header = void 0;
        this.staticAccountKeys = void 0;
        this.recentBlockhash = void 0;
        this.compiledInstructions = void 0;
        this.addressTableLookups = void 0;
        this.header = args.header;
        this.staticAccountKeys = args.staticAccountKeys;
        this.recentBlockhash = args.recentBlockhash;
        this.compiledInstructions = args.compiledInstructions;
        this.addressTableLookups = args.addressTableLookups;
      }
      get version() {
        return 0;
      }
      get numAccountKeysFromLookups() {
        let count = 0;
        for (const lookup of this.addressTableLookups) {
          count += lookup.readonlyIndexes.length + lookup.writableIndexes.length;
        }
        return count;
      }
      getAccountKeys(args) {
        let accountKeysFromLookups;
        if (args && "accountKeysFromLookups" in args && args.accountKeysFromLookups) {
          if (this.numAccountKeysFromLookups != args.accountKeysFromLookups.writable.length + args.accountKeysFromLookups.readonly.length) {
            throw new Error("Failed to get account keys because of a mismatch in the number of account keys from lookups");
          }
          accountKeysFromLookups = args.accountKeysFromLookups;
        } else if (args && "addressLookupTableAccounts" in args && args.addressLookupTableAccounts) {
          accountKeysFromLookups = this.resolveAddressTableLookups(args.addressLookupTableAccounts);
        } else if (this.addressTableLookups.length > 0) {
          throw new Error("Failed to get account keys because address table lookups were not resolved");
        }
        return new MessageAccountKeys(this.staticAccountKeys, accountKeysFromLookups);
      }
      isAccountSigner(index) {
        return index < this.header.numRequiredSignatures;
      }
      isAccountWritable(index) {
        const numSignedAccounts = this.header.numRequiredSignatures;
        const numStaticAccountKeys = this.staticAccountKeys.length;
        if (index >= numStaticAccountKeys) {
          const lookupAccountKeysIndex = index - numStaticAccountKeys;
          const numWritableLookupAccountKeys = this.addressTableLookups.reduce((count, lookup) => count + lookup.writableIndexes.length, 0);
          return lookupAccountKeysIndex < numWritableLookupAccountKeys;
        } else if (index >= this.header.numRequiredSignatures) {
          const unsignedAccountIndex = index - numSignedAccounts;
          const numUnsignedAccounts = numStaticAccountKeys - numSignedAccounts;
          const numWritableUnsignedAccounts = numUnsignedAccounts - this.header.numReadonlyUnsignedAccounts;
          return unsignedAccountIndex < numWritableUnsignedAccounts;
        } else {
          const numWritableSignedAccounts = numSignedAccounts - this.header.numReadonlySignedAccounts;
          return index < numWritableSignedAccounts;
        }
      }
      resolveAddressTableLookups(addressLookupTableAccounts) {
        const accountKeysFromLookups = {
          writable: [],
          readonly: []
        };
        for (const tableLookup of this.addressTableLookups) {
          const tableAccount = addressLookupTableAccounts.find((account) => account.key.equals(tableLookup.accountKey));
          if (!tableAccount) {
            throw new Error(`Failed to find address lookup table account for table key ${tableLookup.accountKey.toBase58()}`);
          }
          for (const index of tableLookup.writableIndexes) {
            if (index < tableAccount.state.addresses.length) {
              accountKeysFromLookups.writable.push(tableAccount.state.addresses[index]);
            } else {
              throw new Error(`Failed to find address for index ${index} in address lookup table ${tableLookup.accountKey.toBase58()}`);
            }
          }
          for (const index of tableLookup.readonlyIndexes) {
            if (index < tableAccount.state.addresses.length) {
              accountKeysFromLookups.readonly.push(tableAccount.state.addresses[index]);
            } else {
              throw new Error(`Failed to find address for index ${index} in address lookup table ${tableLookup.accountKey.toBase58()}`);
            }
          }
        }
        return accountKeysFromLookups;
      }
      static compile(args) {
        const compiledKeys = CompiledKeys.compile(args.instructions, args.payerKey);
        const addressTableLookups = new Array();
        const accountKeysFromLookups = {
          writable: new Array(),
          readonly: new Array()
        };
        const lookupTableAccounts = args.addressLookupTableAccounts || [];
        for (const lookupTable of lookupTableAccounts) {
          const extractResult = compiledKeys.extractTableLookup(lookupTable);
          if (extractResult !== void 0) {
            const [addressTableLookup, {
              writable,
              readonly
            }] = extractResult;
            addressTableLookups.push(addressTableLookup);
            accountKeysFromLookups.writable.push(...writable);
            accountKeysFromLookups.readonly.push(...readonly);
          }
        }
        const [header, staticAccountKeys] = compiledKeys.getMessageComponents();
        const accountKeys = new MessageAccountKeys(staticAccountKeys, accountKeysFromLookups);
        const compiledInstructions = accountKeys.compileInstructions(args.instructions);
        return new _MessageV0({
          header,
          staticAccountKeys,
          recentBlockhash: args.recentBlockhash,
          compiledInstructions,
          addressTableLookups
        });
      }
      serialize() {
        const encodedStaticAccountKeysLength = Array();
        encodeLength(encodedStaticAccountKeysLength, this.staticAccountKeys.length);
        const serializedInstructions = this.serializeInstructions();
        const encodedInstructionsLength = Array();
        encodeLength(encodedInstructionsLength, this.compiledInstructions.length);
        const serializedAddressTableLookups = this.serializeAddressTableLookups();
        const encodedAddressTableLookupsLength = Array();
        encodeLength(encodedAddressTableLookupsLength, this.addressTableLookups.length);
        const messageLayout = BufferLayout.struct([BufferLayout.u8("prefix"), BufferLayout.struct([BufferLayout.u8("numRequiredSignatures"), BufferLayout.u8("numReadonlySignedAccounts"), BufferLayout.u8("numReadonlyUnsignedAccounts")], "header"), BufferLayout.blob(encodedStaticAccountKeysLength.length, "staticAccountKeysLength"), BufferLayout.seq(publicKey(), this.staticAccountKeys.length, "staticAccountKeys"), publicKey("recentBlockhash"), BufferLayout.blob(encodedInstructionsLength.length, "instructionsLength"), BufferLayout.blob(serializedInstructions.length, "serializedInstructions"), BufferLayout.blob(encodedAddressTableLookupsLength.length, "addressTableLookupsLength"), BufferLayout.blob(serializedAddressTableLookups.length, "serializedAddressTableLookups")]);
        const serializedMessage = new Uint8Array(PACKET_DATA_SIZE);
        const MESSAGE_VERSION_0_PREFIX = 1 << 7;
        const serializedMessageLength = messageLayout.encode({
          prefix: MESSAGE_VERSION_0_PREFIX,
          header: this.header,
          staticAccountKeysLength: new Uint8Array(encodedStaticAccountKeysLength),
          staticAccountKeys: this.staticAccountKeys.map((key) => key.toBytes()),
          recentBlockhash: import_bs58.default.decode(this.recentBlockhash),
          instructionsLength: new Uint8Array(encodedInstructionsLength),
          serializedInstructions,
          addressTableLookupsLength: new Uint8Array(encodedAddressTableLookupsLength),
          serializedAddressTableLookups
        }, serializedMessage);
        return serializedMessage.slice(0, serializedMessageLength);
      }
      serializeInstructions() {
        let serializedLength = 0;
        const serializedInstructions = new Uint8Array(PACKET_DATA_SIZE);
        for (const instruction of this.compiledInstructions) {
          const encodedAccountKeyIndexesLength = Array();
          encodeLength(encodedAccountKeyIndexesLength, instruction.accountKeyIndexes.length);
          const encodedDataLength = Array();
          encodeLength(encodedDataLength, instruction.data.length);
          const instructionLayout = BufferLayout.struct([BufferLayout.u8("programIdIndex"), BufferLayout.blob(encodedAccountKeyIndexesLength.length, "encodedAccountKeyIndexesLength"), BufferLayout.seq(BufferLayout.u8(), instruction.accountKeyIndexes.length, "accountKeyIndexes"), BufferLayout.blob(encodedDataLength.length, "encodedDataLength"), BufferLayout.blob(instruction.data.length, "data")]);
          serializedLength += instructionLayout.encode({
            programIdIndex: instruction.programIdIndex,
            encodedAccountKeyIndexesLength: new Uint8Array(encodedAccountKeyIndexesLength),
            accountKeyIndexes: instruction.accountKeyIndexes,
            encodedDataLength: new Uint8Array(encodedDataLength),
            data: instruction.data
          }, serializedInstructions, serializedLength);
        }
        return serializedInstructions.slice(0, serializedLength);
      }
      serializeAddressTableLookups() {
        let serializedLength = 0;
        const serializedAddressTableLookups = new Uint8Array(PACKET_DATA_SIZE);
        for (const lookup of this.addressTableLookups) {
          const encodedWritableIndexesLength = Array();
          encodeLength(encodedWritableIndexesLength, lookup.writableIndexes.length);
          const encodedReadonlyIndexesLength = Array();
          encodeLength(encodedReadonlyIndexesLength, lookup.readonlyIndexes.length);
          const addressTableLookupLayout = BufferLayout.struct([publicKey("accountKey"), BufferLayout.blob(encodedWritableIndexesLength.length, "encodedWritableIndexesLength"), BufferLayout.seq(BufferLayout.u8(), lookup.writableIndexes.length, "writableIndexes"), BufferLayout.blob(encodedReadonlyIndexesLength.length, "encodedReadonlyIndexesLength"), BufferLayout.seq(BufferLayout.u8(), lookup.readonlyIndexes.length, "readonlyIndexes")]);
          serializedLength += addressTableLookupLayout.encode({
            accountKey: lookup.accountKey.toBytes(),
            encodedWritableIndexesLength: new Uint8Array(encodedWritableIndexesLength),
            writableIndexes: lookup.writableIndexes,
            encodedReadonlyIndexesLength: new Uint8Array(encodedReadonlyIndexesLength),
            readonlyIndexes: lookup.readonlyIndexes
          }, serializedAddressTableLookups, serializedLength);
        }
        return serializedAddressTableLookups.slice(0, serializedLength);
      }
      static deserialize(serializedMessage) {
        let byteArray = [...serializedMessage];
        const prefix = guardedShift(byteArray);
        const maskedPrefix = prefix & VERSION_PREFIX_MASK;
        assert2(prefix !== maskedPrefix, `Expected versioned message but received legacy message`);
        const version2 = maskedPrefix;
        assert2(version2 === 0, `Expected versioned message with version 0 but found version ${version2}`);
        const header = {
          numRequiredSignatures: guardedShift(byteArray),
          numReadonlySignedAccounts: guardedShift(byteArray),
          numReadonlyUnsignedAccounts: guardedShift(byteArray)
        };
        const staticAccountKeys = [];
        const staticAccountKeysLength = decodeLength(byteArray);
        for (let i = 0; i < staticAccountKeysLength; i++) {
          staticAccountKeys.push(new PublicKey(guardedSplice(byteArray, 0, PUBLIC_KEY_LENGTH)));
        }
        const recentBlockhash = import_bs58.default.encode(guardedSplice(byteArray, 0, PUBLIC_KEY_LENGTH));
        const instructionCount = decodeLength(byteArray);
        const compiledInstructions = [];
        for (let i = 0; i < instructionCount; i++) {
          const programIdIndex = guardedShift(byteArray);
          const accountKeyIndexesLength = decodeLength(byteArray);
          const accountKeyIndexes = guardedSplice(byteArray, 0, accountKeyIndexesLength);
          const dataLength = decodeLength(byteArray);
          const data = new Uint8Array(guardedSplice(byteArray, 0, dataLength));
          compiledInstructions.push({
            programIdIndex,
            accountKeyIndexes,
            data
          });
        }
        const addressTableLookupsCount = decodeLength(byteArray);
        const addressTableLookups = [];
        for (let i = 0; i < addressTableLookupsCount; i++) {
          const accountKey = new PublicKey(guardedSplice(byteArray, 0, PUBLIC_KEY_LENGTH));
          const writableIndexesLength = decodeLength(byteArray);
          const writableIndexes = guardedSplice(byteArray, 0, writableIndexesLength);
          const readonlyIndexesLength = decodeLength(byteArray);
          const readonlyIndexes = guardedSplice(byteArray, 0, readonlyIndexesLength);
          addressTableLookups.push({
            accountKey,
            writableIndexes,
            readonlyIndexes
          });
        }
        return new _MessageV0({
          header,
          staticAccountKeys,
          recentBlockhash,
          compiledInstructions,
          addressTableLookups
        });
      }
    };
    VersionedMessage = {
      deserializeMessageVersion(serializedMessage) {
        const prefix = serializedMessage[0];
        const maskedPrefix = prefix & VERSION_PREFIX_MASK;
        if (maskedPrefix === prefix) {
          return "legacy";
        }
        return maskedPrefix;
      },
      deserialize: (serializedMessage) => {
        const version2 = VersionedMessage.deserializeMessageVersion(serializedMessage);
        if (version2 === "legacy") {
          return Message.from(serializedMessage);
        }
        if (version2 === 0) {
          return MessageV0.deserialize(serializedMessage);
        } else {
          throw new Error(`Transaction message version ${version2} deserialization is not supported`);
        }
      }
    };
    TransactionStatus = function(TransactionStatus2) {
      TransactionStatus2[TransactionStatus2["BLOCKHEIGHT_EXCEEDED"] = 0] = "BLOCKHEIGHT_EXCEEDED";
      TransactionStatus2[TransactionStatus2["PROCESSED"] = 1] = "PROCESSED";
      TransactionStatus2[TransactionStatus2["TIMED_OUT"] = 2] = "TIMED_OUT";
      TransactionStatus2[TransactionStatus2["NONCE_INVALID"] = 3] = "NONCE_INVALID";
      return TransactionStatus2;
    }({});
    DEFAULT_SIGNATURE = import_buffer2.Buffer.alloc(SIGNATURE_LENGTH_IN_BYTES).fill(0);
    TransactionInstruction = class {
      constructor(opts) {
        this.keys = void 0;
        this.programId = void 0;
        this.data = import_buffer2.Buffer.alloc(0);
        this.programId = opts.programId;
        this.keys = opts.keys;
        if (opts.data) {
          this.data = opts.data;
        }
      }
      /**
       * @internal
       */
      toJSON() {
        return {
          keys: this.keys.map(({
            pubkey,
            isSigner,
            isWritable
          }) => ({
            pubkey: pubkey.toJSON(),
            isSigner,
            isWritable
          })),
          programId: this.programId.toJSON(),
          data: [...this.data]
        };
      }
    };
    Transaction = class _Transaction {
      /**
       * The first (payer) Transaction signature
       *
       * @returns {Buffer | null} Buffer of payer's signature
       */
      get signature() {
        if (this.signatures.length > 0) {
          return this.signatures[0].signature;
        }
        return null;
      }
      /**
       * The transaction fee payer
       */
      // Construct a transaction with a blockhash and lastValidBlockHeight
      // Construct a transaction using a durable nonce
      /**
       * @deprecated `TransactionCtorFields` has been deprecated and will be removed in a future version.
       * Please supply a `TransactionBlockhashCtor` instead.
       */
      /**
       * Construct an empty Transaction
       */
      constructor(opts) {
        this.signatures = [];
        this.feePayer = void 0;
        this.instructions = [];
        this.recentBlockhash = void 0;
        this.lastValidBlockHeight = void 0;
        this.nonceInfo = void 0;
        this.minNonceContextSlot = void 0;
        this._message = void 0;
        this._json = void 0;
        if (!opts) {
          return;
        }
        if (opts.feePayer) {
          this.feePayer = opts.feePayer;
        }
        if (opts.signatures) {
          this.signatures = opts.signatures;
        }
        if (Object.prototype.hasOwnProperty.call(opts, "nonceInfo")) {
          const {
            minContextSlot,
            nonceInfo
          } = opts;
          this.minNonceContextSlot = minContextSlot;
          this.nonceInfo = nonceInfo;
        } else if (Object.prototype.hasOwnProperty.call(opts, "lastValidBlockHeight")) {
          const {
            blockhash,
            lastValidBlockHeight
          } = opts;
          this.recentBlockhash = blockhash;
          this.lastValidBlockHeight = lastValidBlockHeight;
        } else {
          const {
            recentBlockhash,
            nonceInfo
          } = opts;
          if (nonceInfo) {
            this.nonceInfo = nonceInfo;
          }
          this.recentBlockhash = recentBlockhash;
        }
      }
      /**
       * @internal
       */
      toJSON() {
        return {
          recentBlockhash: this.recentBlockhash || null,
          feePayer: this.feePayer ? this.feePayer.toJSON() : null,
          nonceInfo: this.nonceInfo ? {
            nonce: this.nonceInfo.nonce,
            nonceInstruction: this.nonceInfo.nonceInstruction.toJSON()
          } : null,
          instructions: this.instructions.map((instruction) => instruction.toJSON()),
          signers: this.signatures.map(({
            publicKey: publicKey2
          }) => {
            return publicKey2.toJSON();
          })
        };
      }
      /**
       * Add one or more instructions to this Transaction
       *
       * @param {Array< Transaction | TransactionInstruction | TransactionInstructionCtorFields >} items - Instructions to add to the Transaction
       */
      add(...items) {
        if (items.length === 0) {
          throw new Error("No instructions");
        }
        items.forEach((item) => {
          if ("instructions" in item) {
            this.instructions = this.instructions.concat(item.instructions);
          } else if ("data" in item && "programId" in item && "keys" in item) {
            this.instructions.push(item);
          } else {
            this.instructions.push(new TransactionInstruction(item));
          }
        });
        return this;
      }
      /**
       * Compile transaction data
       */
      compileMessage() {
        if (this._message && JSON.stringify(this.toJSON()) === JSON.stringify(this._json)) {
          return this._message;
        }
        let recentBlockhash;
        let instructions;
        if (this.nonceInfo) {
          recentBlockhash = this.nonceInfo.nonce;
          if (this.instructions[0] != this.nonceInfo.nonceInstruction) {
            instructions = [this.nonceInfo.nonceInstruction, ...this.instructions];
          } else {
            instructions = this.instructions;
          }
        } else {
          recentBlockhash = this.recentBlockhash;
          instructions = this.instructions;
        }
        if (!recentBlockhash) {
          throw new Error("Transaction recentBlockhash required");
        }
        if (instructions.length < 1) {
          console.warn("No instructions provided");
        }
        let feePayer;
        if (this.feePayer) {
          feePayer = this.feePayer;
        } else if (this.signatures.length > 0 && this.signatures[0].publicKey) {
          feePayer = this.signatures[0].publicKey;
        } else {
          throw new Error("Transaction fee payer required");
        }
        for (let i = 0; i < instructions.length; i++) {
          if (instructions[i].programId === void 0) {
            throw new Error(`Transaction instruction index ${i} has undefined program id`);
          }
        }
        const programIds = [];
        const accountMetas = [];
        instructions.forEach((instruction) => {
          instruction.keys.forEach((accountMeta) => {
            accountMetas.push({
              ...accountMeta
            });
          });
          const programId = instruction.programId.toString();
          if (!programIds.includes(programId)) {
            programIds.push(programId);
          }
        });
        programIds.forEach((programId) => {
          accountMetas.push({
            pubkey: new PublicKey(programId),
            isSigner: false,
            isWritable: false
          });
        });
        const uniqueMetas = [];
        accountMetas.forEach((accountMeta) => {
          const pubkeyString = accountMeta.pubkey.toString();
          const uniqueIndex = uniqueMetas.findIndex((x) => {
            return x.pubkey.toString() === pubkeyString;
          });
          if (uniqueIndex > -1) {
            uniqueMetas[uniqueIndex].isWritable = uniqueMetas[uniqueIndex].isWritable || accountMeta.isWritable;
            uniqueMetas[uniqueIndex].isSigner = uniqueMetas[uniqueIndex].isSigner || accountMeta.isSigner;
          } else {
            uniqueMetas.push(accountMeta);
          }
        });
        uniqueMetas.sort(function(x, y) {
          if (x.isSigner !== y.isSigner) {
            return x.isSigner ? -1 : 1;
          }
          if (x.isWritable !== y.isWritable) {
            return x.isWritable ? -1 : 1;
          }
          const options = {
            localeMatcher: "best fit",
            usage: "sort",
            sensitivity: "variant",
            ignorePunctuation: false,
            numeric: false,
            caseFirst: "lower"
          };
          return x.pubkey.toBase58().localeCompare(y.pubkey.toBase58(), "en", options);
        });
        const feePayerIndex = uniqueMetas.findIndex((x) => {
          return x.pubkey.equals(feePayer);
        });
        if (feePayerIndex > -1) {
          const [payerMeta] = uniqueMetas.splice(feePayerIndex, 1);
          payerMeta.isSigner = true;
          payerMeta.isWritable = true;
          uniqueMetas.unshift(payerMeta);
        } else {
          uniqueMetas.unshift({
            pubkey: feePayer,
            isSigner: true,
            isWritable: true
          });
        }
        for (const signature2 of this.signatures) {
          const uniqueIndex = uniqueMetas.findIndex((x) => {
            return x.pubkey.equals(signature2.publicKey);
          });
          if (uniqueIndex > -1) {
            if (!uniqueMetas[uniqueIndex].isSigner) {
              uniqueMetas[uniqueIndex].isSigner = true;
              console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release.");
            }
          } else {
            throw new Error(`unknown signer: ${signature2.publicKey.toString()}`);
          }
        }
        let numRequiredSignatures = 0;
        let numReadonlySignedAccounts = 0;
        let numReadonlyUnsignedAccounts = 0;
        const signedKeys = [];
        const unsignedKeys = [];
        uniqueMetas.forEach(({
          pubkey,
          isSigner,
          isWritable
        }) => {
          if (isSigner) {
            signedKeys.push(pubkey.toString());
            numRequiredSignatures += 1;
            if (!isWritable) {
              numReadonlySignedAccounts += 1;
            }
          } else {
            unsignedKeys.push(pubkey.toString());
            if (!isWritable) {
              numReadonlyUnsignedAccounts += 1;
            }
          }
        });
        const accountKeys = signedKeys.concat(unsignedKeys);
        const compiledInstructions = instructions.map((instruction) => {
          const {
            data,
            programId
          } = instruction;
          return {
            programIdIndex: accountKeys.indexOf(programId.toString()),
            accounts: instruction.keys.map((meta) => accountKeys.indexOf(meta.pubkey.toString())),
            data: import_bs58.default.encode(data)
          };
        });
        compiledInstructions.forEach((instruction) => {
          assert2(instruction.programIdIndex >= 0);
          instruction.accounts.forEach((keyIndex) => assert2(keyIndex >= 0));
        });
        return new Message({
          header: {
            numRequiredSignatures,
            numReadonlySignedAccounts,
            numReadonlyUnsignedAccounts
          },
          accountKeys,
          recentBlockhash,
          instructions: compiledInstructions
        });
      }
      /**
       * @internal
       */
      _compile() {
        const message = this.compileMessage();
        const signedKeys = message.accountKeys.slice(0, message.header.numRequiredSignatures);
        if (this.signatures.length === signedKeys.length) {
          const valid = this.signatures.every((pair, index) => {
            return signedKeys[index].equals(pair.publicKey);
          });
          if (valid) return message;
        }
        this.signatures = signedKeys.map((publicKey2) => ({
          signature: null,
          publicKey: publicKey2
        }));
        return message;
      }
      /**
       * Get a buffer of the Transaction data that need to be covered by signatures
       */
      serializeMessage() {
        return this._compile().serialize();
      }
      /**
       * Get the estimated fee associated with a transaction
       *
       * @param {Connection} connection Connection to RPC Endpoint.
       *
       * @returns {Promise<number | null>} The estimated fee for the transaction
       */
      async getEstimatedFee(connection) {
        return (await connection.getFeeForMessage(this.compileMessage())).value;
      }
      /**
       * Specify the public keys which will be used to sign the Transaction.
       * The first signer will be used as the transaction fee payer account.
       *
       * Signatures can be added with either `partialSign` or `addSignature`
       *
       * @deprecated Deprecated since v0.84.0. Only the fee payer needs to be
       * specified and it can be set in the Transaction constructor or with the
       * `feePayer` property.
       */
      setSigners(...signers) {
        if (signers.length === 0) {
          throw new Error("No signers");
        }
        const seen = /* @__PURE__ */ new Set();
        this.signatures = signers.filter((publicKey2) => {
          const key = publicKey2.toString();
          if (seen.has(key)) {
            return false;
          } else {
            seen.add(key);
            return true;
          }
        }).map((publicKey2) => ({
          signature: null,
          publicKey: publicKey2
        }));
      }
      /**
       * Sign the Transaction with the specified signers. Multiple signatures may
       * be applied to a Transaction. The first signature is considered "primary"
       * and is used identify and confirm transactions.
       *
       * If the Transaction `feePayer` is not set, the first signer will be used
       * as the transaction fee payer account.
       *
       * Transaction fields should not be modified after the first call to `sign`,
       * as doing so may invalidate the signature and cause the Transaction to be
       * rejected.
       *
       * The Transaction must be assigned a valid `recentBlockhash` before invoking this method
       *
       * @param {Array<Signer>} signers Array of signers that will sign the transaction
       */
      sign(...signers) {
        if (signers.length === 0) {
          throw new Error("No signers");
        }
        const seen = /* @__PURE__ */ new Set();
        const uniqueSigners = [];
        for (const signer of signers) {
          const key = signer.publicKey.toString();
          if (seen.has(key)) {
            continue;
          } else {
            seen.add(key);
            uniqueSigners.push(signer);
          }
        }
        this.signatures = uniqueSigners.map((signer) => ({
          signature: null,
          publicKey: signer.publicKey
        }));
        const message = this._compile();
        this._partialSign(message, ...uniqueSigners);
      }
      /**
       * Partially sign a transaction with the specified accounts. All accounts must
       * correspond to either the fee payer or a signer account in the transaction
       * instructions.
       *
       * All the caveats from the `sign` method apply to `partialSign`
       *
       * @param {Array<Signer>} signers Array of signers that will sign the transaction
       */
      partialSign(...signers) {
        if (signers.length === 0) {
          throw new Error("No signers");
        }
        const seen = /* @__PURE__ */ new Set();
        const uniqueSigners = [];
        for (const signer of signers) {
          const key = signer.publicKey.toString();
          if (seen.has(key)) {
            continue;
          } else {
            seen.add(key);
            uniqueSigners.push(signer);
          }
        }
        const message = this._compile();
        this._partialSign(message, ...uniqueSigners);
      }
      /**
       * @internal
       */
      _partialSign(message, ...signers) {
        const signData = message.serialize();
        signers.forEach((signer) => {
          const signature2 = sign(signData, signer.secretKey);
          this._addSignature(signer.publicKey, toBuffer(signature2));
        });
      }
      /**
       * Add an externally created signature to a transaction. The public key
       * must correspond to either the fee payer or a signer account in the transaction
       * instructions.
       *
       * @param {PublicKey} pubkey Public key that will be added to the transaction.
       * @param {Buffer} signature An externally created signature to add to the transaction.
       */
      addSignature(pubkey, signature2) {
        this._compile();
        this._addSignature(pubkey, signature2);
      }
      /**
       * @internal
       */
      _addSignature(pubkey, signature2) {
        assert2(signature2.length === 64);
        const index = this.signatures.findIndex((sigpair) => pubkey.equals(sigpair.publicKey));
        if (index < 0) {
          throw new Error(`unknown signer: ${pubkey.toString()}`);
        }
        this.signatures[index].signature = import_buffer2.Buffer.from(signature2);
      }
      /**
       * Verify signatures of a Transaction
       * Optional parameter specifies if we're expecting a fully signed Transaction or a partially signed one.
       * If no boolean is provided, we expect a fully signed Transaction by default.
       *
       * @param {boolean} [requireAllSignatures=true] Require a fully signed Transaction
       */
      verifySignatures(requireAllSignatures = true) {
        const signatureErrors = this._getMessageSignednessErrors(this.serializeMessage(), requireAllSignatures);
        return !signatureErrors;
      }
      /**
       * @internal
       */
      _getMessageSignednessErrors(message, requireAllSignatures) {
        const errors = {};
        for (const {
          signature: signature2,
          publicKey: publicKey2
        } of this.signatures) {
          if (signature2 === null) {
            if (requireAllSignatures) {
              (errors.missing || (errors.missing = [])).push(publicKey2);
            }
          } else {
            if (!verify(signature2, message, publicKey2.toBytes())) {
              (errors.invalid || (errors.invalid = [])).push(publicKey2);
            }
          }
        }
        return errors.invalid || errors.missing ? errors : void 0;
      }
      /**
       * Serialize the Transaction in the wire format.
       *
       * @param {Buffer} [config] Config of transaction.
       *
       * @returns {Buffer} Signature of transaction in wire format.
       */
      serialize(config) {
        const {
          requireAllSignatures,
          verifySignatures
        } = Object.assign({
          requireAllSignatures: true,
          verifySignatures: true
        }, config);
        const signData = this.serializeMessage();
        if (verifySignatures) {
          const sigErrors = this._getMessageSignednessErrors(signData, requireAllSignatures);
          if (sigErrors) {
            let errorMessage = "Signature verification failed.";
            if (sigErrors.invalid) {
              errorMessage += `
Invalid signature for public key${sigErrors.invalid.length === 1 ? "" : "(s)"} [\`${sigErrors.invalid.map((p) => p.toBase58()).join("`, `")}\`].`;
            }
            if (sigErrors.missing) {
              errorMessage += `
Missing signature for public key${sigErrors.missing.length === 1 ? "" : "(s)"} [\`${sigErrors.missing.map((p) => p.toBase58()).join("`, `")}\`].`;
            }
            throw new Error(errorMessage);
          }
        }
        return this._serialize(signData);
      }
      /**
       * @internal
       */
      _serialize(signData) {
        const {
          signatures
        } = this;
        const signatureCount = [];
        encodeLength(signatureCount, signatures.length);
        const transactionLength = signatureCount.length + signatures.length * 64 + signData.length;
        const wireTransaction = import_buffer2.Buffer.alloc(transactionLength);
        assert2(signatures.length < 256);
        import_buffer2.Buffer.from(signatureCount).copy(wireTransaction, 0);
        signatures.forEach(({
          signature: signature2
        }, index) => {
          if (signature2 !== null) {
            assert2(signature2.length === 64, `signature has invalid length`);
            import_buffer2.Buffer.from(signature2).copy(wireTransaction, signatureCount.length + index * 64);
          }
        });
        signData.copy(wireTransaction, signatureCount.length + signatures.length * 64);
        assert2(wireTransaction.length <= PACKET_DATA_SIZE, `Transaction too large: ${wireTransaction.length} > ${PACKET_DATA_SIZE}`);
        return wireTransaction;
      }
      /**
       * Deprecated method
       * @internal
       */
      get keys() {
        assert2(this.instructions.length === 1);
        return this.instructions[0].keys.map((keyObj) => keyObj.pubkey);
      }
      /**
       * Deprecated method
       * @internal
       */
      get programId() {
        assert2(this.instructions.length === 1);
        return this.instructions[0].programId;
      }
      /**
       * Deprecated method
       * @internal
       */
      get data() {
        assert2(this.instructions.length === 1);
        return this.instructions[0].data;
      }
      /**
       * Parse a wire transaction into a Transaction object.
       *
       * @param {Buffer | Uint8Array | Array<number>} buffer Signature of wire Transaction
       *
       * @returns {Transaction} Transaction associated with the signature
       */
      static from(buffer) {
        let byteArray = [...buffer];
        const signatureCount = decodeLength(byteArray);
        let signatures = [];
        for (let i = 0; i < signatureCount; i++) {
          const signature2 = guardedSplice(byteArray, 0, SIGNATURE_LENGTH_IN_BYTES);
          signatures.push(import_bs58.default.encode(import_buffer2.Buffer.from(signature2)));
        }
        return _Transaction.populate(Message.from(byteArray), signatures);
      }
      /**
       * Populate Transaction object from message and signatures
       *
       * @param {Message} message Message of transaction
       * @param {Array<string>} signatures List of signatures to assign to the transaction
       *
       * @returns {Transaction} The populated Transaction
       */
      static populate(message, signatures = []) {
        const transaction = new _Transaction();
        transaction.recentBlockhash = message.recentBlockhash;
        if (message.header.numRequiredSignatures > 0) {
          transaction.feePayer = message.accountKeys[0];
        }
        signatures.forEach((signature2, index) => {
          const sigPubkeyPair = {
            signature: signature2 == import_bs58.default.encode(DEFAULT_SIGNATURE) ? null : import_bs58.default.decode(signature2),
            publicKey: message.accountKeys[index]
          };
          transaction.signatures.push(sigPubkeyPair);
        });
        message.instructions.forEach((instruction) => {
          const keys = instruction.accounts.map((account) => {
            const pubkey = message.accountKeys[account];
            return {
              pubkey,
              isSigner: transaction.signatures.some((keyObj) => keyObj.publicKey.toString() === pubkey.toString()) || message.isAccountSigner(account),
              isWritable: message.isAccountWritable(account)
            };
          });
          transaction.instructions.push(new TransactionInstruction({
            keys,
            programId: message.accountKeys[instruction.programIdIndex],
            data: import_bs58.default.decode(instruction.data)
          }));
        });
        transaction._message = message;
        transaction._json = transaction.toJSON();
        return transaction;
      }
    };
    TransactionMessage = class _TransactionMessage {
      constructor(args) {
        this.payerKey = void 0;
        this.instructions = void 0;
        this.recentBlockhash = void 0;
        this.payerKey = args.payerKey;
        this.instructions = args.instructions;
        this.recentBlockhash = args.recentBlockhash;
      }
      static decompile(message, args) {
        const {
          header,
          compiledInstructions,
          recentBlockhash
        } = message;
        const {
          numRequiredSignatures,
          numReadonlySignedAccounts,
          numReadonlyUnsignedAccounts
        } = header;
        const numWritableSignedAccounts = numRequiredSignatures - numReadonlySignedAccounts;
        assert2(numWritableSignedAccounts > 0, "Message header is invalid");
        const numWritableUnsignedAccounts = message.staticAccountKeys.length - numRequiredSignatures - numReadonlyUnsignedAccounts;
        assert2(numWritableUnsignedAccounts >= 0, "Message header is invalid");
        const accountKeys = message.getAccountKeys(args);
        const payerKey = accountKeys.get(0);
        if (payerKey === void 0) {
          throw new Error("Failed to decompile message because no account keys were found");
        }
        const instructions = [];
        for (const compiledIx of compiledInstructions) {
          const keys = [];
          for (const keyIndex of compiledIx.accountKeyIndexes) {
            const pubkey = accountKeys.get(keyIndex);
            if (pubkey === void 0) {
              throw new Error(`Failed to find key for account key index ${keyIndex}`);
            }
            const isSigner = keyIndex < numRequiredSignatures;
            let isWritable;
            if (isSigner) {
              isWritable = keyIndex < numWritableSignedAccounts;
            } else if (keyIndex < accountKeys.staticAccountKeys.length) {
              isWritable = keyIndex - numRequiredSignatures < numWritableUnsignedAccounts;
            } else {
              isWritable = keyIndex - accountKeys.staticAccountKeys.length < // accountKeysFromLookups cannot be undefined because we already found a pubkey for this index above
              accountKeys.accountKeysFromLookups.writable.length;
            }
            keys.push({
              pubkey,
              isSigner: keyIndex < header.numRequiredSignatures,
              isWritable
            });
          }
          const programId = accountKeys.get(compiledIx.programIdIndex);
          if (programId === void 0) {
            throw new Error(`Failed to find program id for program id index ${compiledIx.programIdIndex}`);
          }
          instructions.push(new TransactionInstruction({
            programId,
            data: toBuffer(compiledIx.data),
            keys
          }));
        }
        return new _TransactionMessage({
          payerKey,
          instructions,
          recentBlockhash
        });
      }
      compileToLegacyMessage() {
        return Message.compile({
          payerKey: this.payerKey,
          recentBlockhash: this.recentBlockhash,
          instructions: this.instructions
        });
      }
      compileToV0Message(addressLookupTableAccounts) {
        return MessageV0.compile({
          payerKey: this.payerKey,
          recentBlockhash: this.recentBlockhash,
          instructions: this.instructions,
          addressLookupTableAccounts
        });
      }
    };
    VersionedTransaction = class _VersionedTransaction {
      get version() {
        return this.message.version;
      }
      constructor(message, signatures) {
        this.signatures = void 0;
        this.message = void 0;
        if (signatures !== void 0) {
          assert2(signatures.length === message.header.numRequiredSignatures, "Expected signatures length to be equal to the number of required signatures");
          this.signatures = signatures;
        } else {
          const defaultSignatures = [];
          for (let i = 0; i < message.header.numRequiredSignatures; i++) {
            defaultSignatures.push(new Uint8Array(SIGNATURE_LENGTH_IN_BYTES));
          }
          this.signatures = defaultSignatures;
        }
        this.message = message;
      }
      serialize() {
        const serializedMessage = this.message.serialize();
        const encodedSignaturesLength = Array();
        encodeLength(encodedSignaturesLength, this.signatures.length);
        const transactionLayout = BufferLayout.struct([BufferLayout.blob(encodedSignaturesLength.length, "encodedSignaturesLength"), BufferLayout.seq(signature(), this.signatures.length, "signatures"), BufferLayout.blob(serializedMessage.length, "serializedMessage")]);
        const serializedTransaction = new Uint8Array(2048);
        const serializedTransactionLength = transactionLayout.encode({
          encodedSignaturesLength: new Uint8Array(encodedSignaturesLength),
          signatures: this.signatures,
          serializedMessage
        }, serializedTransaction);
        return serializedTransaction.slice(0, serializedTransactionLength);
      }
      static deserialize(serializedTransaction) {
        let byteArray = [...serializedTransaction];
        const signatures = [];
        const signaturesLength = decodeLength(byteArray);
        for (let i = 0; i < signaturesLength; i++) {
          signatures.push(new Uint8Array(guardedSplice(byteArray, 0, SIGNATURE_LENGTH_IN_BYTES)));
        }
        const message = VersionedMessage.deserialize(new Uint8Array(byteArray));
        return new _VersionedTransaction(message, signatures);
      }
      sign(signers) {
        const messageData = this.message.serialize();
        const signerPubkeys = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures);
        for (const signer of signers) {
          const signerIndex = signerPubkeys.findIndex((pubkey) => pubkey.equals(signer.publicKey));
          assert2(signerIndex >= 0, `Cannot sign with non signer key ${signer.publicKey.toBase58()}`);
          this.signatures[signerIndex] = sign(messageData, signer.secretKey);
        }
      }
      addSignature(publicKey2, signature2) {
        assert2(signature2.byteLength === 64, "Signature must be 64 bytes long");
        const signerPubkeys = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures);
        const signerIndex = signerPubkeys.findIndex((pubkey) => pubkey.equals(publicKey2));
        assert2(signerIndex >= 0, `Can not add signature; \`${publicKey2.toBase58()}\` is not required to sign this transaction`);
        this.signatures[signerIndex] = signature2;
      }
    };
    NUM_TICKS_PER_SECOND = 160;
    DEFAULT_TICKS_PER_SLOT = 64;
    NUM_SLOTS_PER_SECOND = NUM_TICKS_PER_SECOND / DEFAULT_TICKS_PER_SLOT;
    MS_PER_SLOT = 1e3 / NUM_SLOTS_PER_SECOND;
    SYSVAR_CLOCK_PUBKEY = new PublicKey("SysvarC1ock11111111111111111111111111111111");
    SYSVAR_EPOCH_SCHEDULE_PUBKEY = new PublicKey("SysvarEpochSchedu1e111111111111111111111111");
    SYSVAR_INSTRUCTIONS_PUBKEY = new PublicKey("Sysvar1nstructions1111111111111111111111111");
    SYSVAR_RECENT_BLOCKHASHES_PUBKEY = new PublicKey("SysvarRecentB1ockHashes11111111111111111111");
    SYSVAR_RENT_PUBKEY = new PublicKey("SysvarRent111111111111111111111111111111111");
    SYSVAR_REWARDS_PUBKEY = new PublicKey("SysvarRewards111111111111111111111111111111");
    SYSVAR_SLOT_HASHES_PUBKEY = new PublicKey("SysvarS1otHashes111111111111111111111111111");
    SYSVAR_SLOT_HISTORY_PUBKEY = new PublicKey("SysvarS1otHistory11111111111111111111111111");
    SYSVAR_STAKE_HISTORY_PUBKEY = new PublicKey("SysvarStakeHistory1111111111111111111111111");
    SendTransactionError = class extends Error {
      constructor({
        action,
        signature: signature2,
        transactionMessage,
        logs
      }) {
        const maybeLogsOutput = logs ? `Logs: 
${JSON.stringify(logs.slice(-10), null, 2)}. ` : "";
        const guideText = "\nCatch the `SendTransactionError` and call `getLogs()` on it for full details.";
        let message;
        switch (action) {
          case "send":
            message = `Transaction ${signature2} resulted in an error. 
${transactionMessage}. ` + maybeLogsOutput + guideText;
            break;
          case "simulate":
            message = `Simulation failed. 
Message: ${transactionMessage}. 
` + maybeLogsOutput + guideText;
            break;
          default: {
            message = `Unknown action '${/* @__PURE__ */ ((a) => a)(action)}'`;
          }
        }
        super(message);
        this.signature = void 0;
        this.transactionMessage = void 0;
        this.transactionLogs = void 0;
        this.signature = signature2;
        this.transactionMessage = transactionMessage;
        this.transactionLogs = logs ? logs : void 0;
      }
      get transactionError() {
        return {
          message: this.transactionMessage,
          logs: Array.isArray(this.transactionLogs) ? this.transactionLogs : void 0
        };
      }
      /* @deprecated Use `await getLogs()` instead */
      get logs() {
        const cachedLogs = this.transactionLogs;
        if (cachedLogs != null && typeof cachedLogs === "object" && "then" in cachedLogs) {
          return void 0;
        }
        return cachedLogs;
      }
      async getLogs(connection) {
        if (!Array.isArray(this.transactionLogs)) {
          this.transactionLogs = new Promise((resolve, reject) => {
            connection.getTransaction(this.signature).then((tx) => {
              if (tx && tx.meta && tx.meta.logMessages) {
                const logs = tx.meta.logMessages;
                this.transactionLogs = logs;
                resolve(logs);
              } else {
                reject(new Error("Log messages not found"));
              }
            }).catch(reject);
          });
        }
        return await this.transactionLogs;
      }
    };
    SolanaJSONRPCErrorCode = {
      JSON_RPC_SERVER_ERROR_BLOCK_CLEANED_UP: -32001,
      JSON_RPC_SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE: -32002,
      JSON_RPC_SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE: -32003,
      JSON_RPC_SERVER_ERROR_BLOCK_NOT_AVAILABLE: -32004,
      JSON_RPC_SERVER_ERROR_NODE_UNHEALTHY: -32005,
      JSON_RPC_SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE: -32006,
      JSON_RPC_SERVER_ERROR_SLOT_SKIPPED: -32007,
      JSON_RPC_SERVER_ERROR_NO_SNAPSHOT: -32008,
      JSON_RPC_SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED: -32009,
      JSON_RPC_SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX: -32010,
      JSON_RPC_SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE: -32011,
      JSON_RPC_SCAN_ERROR: -32012,
      JSON_RPC_SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH: -32013,
      JSON_RPC_SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET: -32014,
      JSON_RPC_SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION: -32015,
      JSON_RPC_SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED: -32016
    };
    SolanaJSONRPCError = class extends Error {
      constructor({
        code,
        message,
        data
      }, customMessage) {
        super(customMessage != null ? `${customMessage}: ${message}` : message);
        this.code = void 0;
        this.data = void 0;
        this.code = code;
        this.data = data;
        this.name = "SolanaJSONRPCError";
      }
    };
    FeeCalculatorLayout = BufferLayout.nu64("lamportsPerSignature");
    NonceAccountLayout = BufferLayout.struct([BufferLayout.u32("version"), BufferLayout.u32("state"), publicKey("authorizedPubkey"), publicKey("nonce"), BufferLayout.struct([FeeCalculatorLayout], "feeCalculator")]);
    NONCE_ACCOUNT_LENGTH = NonceAccountLayout.span;
    NonceAccount = class _NonceAccount {
      /**
       * @internal
       */
      constructor(args) {
        this.authorizedPubkey = void 0;
        this.nonce = void 0;
        this.feeCalculator = void 0;
        this.authorizedPubkey = args.authorizedPubkey;
        this.nonce = args.nonce;
        this.feeCalculator = args.feeCalculator;
      }
      /**
       * Deserialize NonceAccount from the account data.
       *
       * @param buffer account data
       * @return NonceAccount
       */
      static fromAccountData(buffer) {
        const nonceAccount = NonceAccountLayout.decode(toBuffer(buffer), 0);
        return new _NonceAccount({
          authorizedPubkey: new PublicKey(nonceAccount.authorizedPubkey),
          nonce: new PublicKey(nonceAccount.nonce).toString(),
          feeCalculator: nonceAccount.feeCalculator
        });
      }
    };
    SystemInstruction = class {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Decode a system instruction and retrieve the instruction type.
       */
      static decodeInstructionType(instruction) {
        this.checkProgramId(instruction.programId);
        const instructionTypeLayout = BufferLayout.u32("instruction");
        const typeIndex = instructionTypeLayout.decode(instruction.data);
        let type2;
        for (const [ixType, layout] of Object.entries(SYSTEM_INSTRUCTION_LAYOUTS)) {
          if (layout.index == typeIndex) {
            type2 = ixType;
            break;
          }
        }
        if (!type2) {
          throw new Error("Instruction type incorrect; not a SystemInstruction");
        }
        return type2;
      }
      /**
       * Decode a create account system instruction and retrieve the instruction params.
       */
      static decodeCreateAccount(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 2);
        const {
          lamports,
          space,
          programId
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.Create, instruction.data);
        return {
          fromPubkey: instruction.keys[0].pubkey,
          newAccountPubkey: instruction.keys[1].pubkey,
          lamports,
          space,
          programId: new PublicKey(programId)
        };
      }
      /**
       * Decode a transfer system instruction and retrieve the instruction params.
       */
      static decodeTransfer(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 2);
        const {
          lamports
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.Transfer, instruction.data);
        return {
          fromPubkey: instruction.keys[0].pubkey,
          toPubkey: instruction.keys[1].pubkey,
          lamports
        };
      }
      /**
       * Decode a transfer with seed system instruction and retrieve the instruction params.
       */
      static decodeTransferWithSeed(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        const {
          lamports,
          seed,
          programId
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed, instruction.data);
        return {
          fromPubkey: instruction.keys[0].pubkey,
          basePubkey: instruction.keys[1].pubkey,
          toPubkey: instruction.keys[2].pubkey,
          lamports,
          seed,
          programId: new PublicKey(programId)
        };
      }
      /**
       * Decode an allocate system instruction and retrieve the instruction params.
       */
      static decodeAllocate(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 1);
        const {
          space
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.Allocate, instruction.data);
        return {
          accountPubkey: instruction.keys[0].pubkey,
          space
        };
      }
      /**
       * Decode an allocate with seed system instruction and retrieve the instruction params.
       */
      static decodeAllocateWithSeed(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 1);
        const {
          base,
          seed,
          space,
          programId
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed, instruction.data);
        return {
          accountPubkey: instruction.keys[0].pubkey,
          basePubkey: new PublicKey(base),
          seed,
          space,
          programId: new PublicKey(programId)
        };
      }
      /**
       * Decode an assign system instruction and retrieve the instruction params.
       */
      static decodeAssign(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 1);
        const {
          programId
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.Assign, instruction.data);
        return {
          accountPubkey: instruction.keys[0].pubkey,
          programId: new PublicKey(programId)
        };
      }
      /**
       * Decode an assign with seed system instruction and retrieve the instruction params.
       */
      static decodeAssignWithSeed(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 1);
        const {
          base,
          seed,
          programId
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed, instruction.data);
        return {
          accountPubkey: instruction.keys[0].pubkey,
          basePubkey: new PublicKey(base),
          seed,
          programId: new PublicKey(programId)
        };
      }
      /**
       * Decode a create account with seed system instruction and retrieve the instruction params.
       */
      static decodeCreateWithSeed(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 2);
        const {
          base,
          seed,
          lamports,
          space,
          programId
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed, instruction.data);
        return {
          fromPubkey: instruction.keys[0].pubkey,
          newAccountPubkey: instruction.keys[1].pubkey,
          basePubkey: new PublicKey(base),
          seed,
          lamports,
          space,
          programId: new PublicKey(programId)
        };
      }
      /**
       * Decode a nonce initialize system instruction and retrieve the instruction params.
       */
      static decodeNonceInitialize(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        const {
          authorized: authorized2
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount, instruction.data);
        return {
          noncePubkey: instruction.keys[0].pubkey,
          authorizedPubkey: new PublicKey(authorized2)
        };
      }
      /**
       * Decode a nonce advance system instruction and retrieve the instruction params.
       */
      static decodeNonceAdvance(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount, instruction.data);
        return {
          noncePubkey: instruction.keys[0].pubkey,
          authorizedPubkey: instruction.keys[2].pubkey
        };
      }
      /**
       * Decode a nonce withdraw system instruction and retrieve the instruction params.
       */
      static decodeNonceWithdraw(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 5);
        const {
          lamports
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount, instruction.data);
        return {
          noncePubkey: instruction.keys[0].pubkey,
          toPubkey: instruction.keys[1].pubkey,
          authorizedPubkey: instruction.keys[4].pubkey,
          lamports
        };
      }
      /**
       * Decode a nonce authorize system instruction and retrieve the instruction params.
       */
      static decodeNonceAuthorize(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 2);
        const {
          authorized: authorized2
        } = decodeData$1(SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount, instruction.data);
        return {
          noncePubkey: instruction.keys[0].pubkey,
          authorizedPubkey: instruction.keys[1].pubkey,
          newAuthorizedPubkey: new PublicKey(authorized2)
        };
      }
      /**
       * @internal
       */
      static checkProgramId(programId) {
        if (!programId.equals(SystemProgram.programId)) {
          throw new Error("invalid instruction; programId is not SystemProgram");
        }
      }
      /**
       * @internal
       */
      static checkKeyLength(keys, expectedLength) {
        if (keys.length < expectedLength) {
          throw new Error(`invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`);
        }
      }
    };
    SYSTEM_INSTRUCTION_LAYOUTS = Object.freeze({
      Create: {
        index: 0,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports"), BufferLayout.ns64("space"), publicKey("programId")])
      },
      Assign: {
        index: 1,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("programId")])
      },
      Transfer: {
        index: 2,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), u64("lamports")])
      },
      CreateWithSeed: {
        index: 3,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), BufferLayout.ns64("lamports"), BufferLayout.ns64("space"), publicKey("programId")])
      },
      AdvanceNonceAccount: {
        index: 4,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      WithdrawNonceAccount: {
        index: 5,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      },
      InitializeNonceAccount: {
        index: 6,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("authorized")])
      },
      AuthorizeNonceAccount: {
        index: 7,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("authorized")])
      },
      Allocate: {
        index: 8,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("space")])
      },
      AllocateWithSeed: {
        index: 9,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), BufferLayout.ns64("space"), publicKey("programId")])
      },
      AssignWithSeed: {
        index: 10,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), publicKey("programId")])
      },
      TransferWithSeed: {
        index: 11,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), u64("lamports"), rustString("seed"), publicKey("programId")])
      },
      UpgradeNonceAccount: {
        index: 12,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      }
    });
    SystemProgram = class _SystemProgram {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Public key that identifies the System program
       */
      /**
       * Generate a transaction instruction that creates a new account
       */
      static createAccount(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.Create;
        const data = encodeData(type2, {
          lamports: params.lamports,
          space: params.space,
          programId: toBuffer(params.programId.toBuffer())
        });
        return new TransactionInstruction({
          keys: [{
            pubkey: params.fromPubkey,
            isSigner: true,
            isWritable: true
          }, {
            pubkey: params.newAccountPubkey,
            isSigner: true,
            isWritable: true
          }],
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction instruction that transfers lamports from one account to another
       */
      static transfer(params) {
        let data;
        let keys;
        if ("basePubkey" in params) {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed;
          data = encodeData(type2, {
            lamports: BigInt(params.lamports),
            seed: params.seed,
            programId: toBuffer(params.programId.toBuffer())
          });
          keys = [{
            pubkey: params.fromPubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.basePubkey,
            isSigner: true,
            isWritable: false
          }, {
            pubkey: params.toPubkey,
            isSigner: false,
            isWritable: true
          }];
        } else {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
          data = encodeData(type2, {
            lamports: BigInt(params.lamports)
          });
          keys = [{
            pubkey: params.fromPubkey,
            isSigner: true,
            isWritable: true
          }, {
            pubkey: params.toPubkey,
            isSigner: false,
            isWritable: true
          }];
        }
        return new TransactionInstruction({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction instruction that assigns an account to a program
       */
      static assign(params) {
        let data;
        let keys;
        if ("basePubkey" in params) {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed;
          data = encodeData(type2, {
            base: toBuffer(params.basePubkey.toBuffer()),
            seed: params.seed,
            programId: toBuffer(params.programId.toBuffer())
          });
          keys = [{
            pubkey: params.accountPubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.basePubkey,
            isSigner: true,
            isWritable: false
          }];
        } else {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.Assign;
          data = encodeData(type2, {
            programId: toBuffer(params.programId.toBuffer())
          });
          keys = [{
            pubkey: params.accountPubkey,
            isSigner: true,
            isWritable: true
          }];
        }
        return new TransactionInstruction({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction instruction that creates a new account at
       *   an address generated with `from`, a seed, and programId
       */
      static createAccountWithSeed(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed;
        const data = encodeData(type2, {
          base: toBuffer(params.basePubkey.toBuffer()),
          seed: params.seed,
          lamports: params.lamports,
          space: params.space,
          programId: toBuffer(params.programId.toBuffer())
        });
        let keys = [{
          pubkey: params.fromPubkey,
          isSigner: true,
          isWritable: true
        }, {
          pubkey: params.newAccountPubkey,
          isSigner: false,
          isWritable: true
        }];
        if (!params.basePubkey.equals(params.fromPubkey)) {
          keys.push({
            pubkey: params.basePubkey,
            isSigner: true,
            isWritable: false
          });
        }
        return new TransactionInstruction({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction that creates a new Nonce account
       */
      static createNonceAccount(params) {
        const transaction = new Transaction();
        if ("basePubkey" in params && "seed" in params) {
          transaction.add(_SystemProgram.createAccountWithSeed({
            fromPubkey: params.fromPubkey,
            newAccountPubkey: params.noncePubkey,
            basePubkey: params.basePubkey,
            seed: params.seed,
            lamports: params.lamports,
            space: NONCE_ACCOUNT_LENGTH,
            programId: this.programId
          }));
        } else {
          transaction.add(_SystemProgram.createAccount({
            fromPubkey: params.fromPubkey,
            newAccountPubkey: params.noncePubkey,
            lamports: params.lamports,
            space: NONCE_ACCOUNT_LENGTH,
            programId: this.programId
          }));
        }
        const initParams = {
          noncePubkey: params.noncePubkey,
          authorizedPubkey: params.authorizedPubkey
        };
        transaction.add(this.nonceInitialize(initParams));
        return transaction;
      }
      /**
       * Generate an instruction to initialize a Nonce account
       */
      static nonceInitialize(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount;
        const data = encodeData(type2, {
          authorized: toBuffer(params.authorizedPubkey.toBuffer())
        });
        const instructionData = {
          keys: [{
            pubkey: params.noncePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
      /**
       * Generate an instruction to advance the nonce in a Nonce account
       */
      static nonceAdvance(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount;
        const data = encodeData(type2);
        const instructionData = {
          keys: [{
            pubkey: params.noncePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: params.authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
      /**
       * Generate a transaction instruction that withdraws lamports from a Nonce account
       */
      static nonceWithdraw(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount;
        const data = encodeData(type2, {
          lamports: params.lamports
        });
        return new TransactionInstruction({
          keys: [{
            pubkey: params.noncePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.toPubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: params.authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction instruction that authorizes a new PublicKey as the authority
       * on a Nonce account.
       */
      static nonceAuthorize(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount;
        const data = encodeData(type2, {
          authorized: toBuffer(params.newAuthorizedPubkey.toBuffer())
        });
        return new TransactionInstruction({
          keys: [{
            pubkey: params.noncePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction instruction that allocates space in an account without funding
       */
      static allocate(params) {
        let data;
        let keys;
        if ("basePubkey" in params) {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed;
          data = encodeData(type2, {
            base: toBuffer(params.basePubkey.toBuffer()),
            seed: params.seed,
            space: params.space,
            programId: toBuffer(params.programId.toBuffer())
          });
          keys = [{
            pubkey: params.accountPubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.basePubkey,
            isSigner: true,
            isWritable: false
          }];
        } else {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.Allocate;
          data = encodeData(type2, {
            space: params.space
          });
          keys = [{
            pubkey: params.accountPubkey,
            isSigner: true,
            isWritable: true
          }];
        }
        return new TransactionInstruction({
          keys,
          programId: this.programId,
          data
        });
      }
    };
    SystemProgram.programId = new PublicKey("11111111111111111111111111111111");
    CHUNK_SIZE = PACKET_DATA_SIZE - 300;
    Loader = class _Loader {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Amount of program data placed in each load Transaction
       */
      /**
       * Minimum number of signatures required to load a program not including
       * retries
       *
       * Can be used to calculate transaction fees
       */
      static getMinNumSignatures(dataLength) {
        return 2 * // Every transaction requires two signatures (payer + program)
        (Math.ceil(dataLength / _Loader.chunkSize) + 1 + // Add one for Create transaction
        1);
      }
      /**
       * Loads a generic program
       *
       * @param connection The connection to use
       * @param payer System account that pays to load the program
       * @param program Account to load the program into
       * @param programId Public key that identifies the loader
       * @param data Program octets
       * @return true if program was loaded successfully, false if program was already loaded
       */
      static async load(connection, payer, program, programId, data) {
        {
          const balanceNeeded = await connection.getMinimumBalanceForRentExemption(data.length);
          const programInfo = await connection.getAccountInfo(program.publicKey, "confirmed");
          let transaction = null;
          if (programInfo !== null) {
            if (programInfo.executable) {
              console.error("Program load failed, account is already executable");
              return false;
            }
            if (programInfo.data.length !== data.length) {
              transaction = transaction || new Transaction();
              transaction.add(SystemProgram.allocate({
                accountPubkey: program.publicKey,
                space: data.length
              }));
            }
            if (!programInfo.owner.equals(programId)) {
              transaction = transaction || new Transaction();
              transaction.add(SystemProgram.assign({
                accountPubkey: program.publicKey,
                programId
              }));
            }
            if (programInfo.lamports < balanceNeeded) {
              transaction = transaction || new Transaction();
              transaction.add(SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: program.publicKey,
                lamports: balanceNeeded - programInfo.lamports
              }));
            }
          } else {
            transaction = new Transaction().add(SystemProgram.createAccount({
              fromPubkey: payer.publicKey,
              newAccountPubkey: program.publicKey,
              lamports: balanceNeeded > 0 ? balanceNeeded : 1,
              space: data.length,
              programId
            }));
          }
          if (transaction !== null) {
            await sendAndConfirmTransaction(connection, transaction, [payer, program], {
              commitment: "confirmed"
            });
          }
        }
        const dataLayout = BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.u32("offset"), BufferLayout.u32("bytesLength"), BufferLayout.u32("bytesLengthPadding"), BufferLayout.seq(BufferLayout.u8("byte"), BufferLayout.offset(BufferLayout.u32(), -8), "bytes")]);
        const chunkSize = _Loader.chunkSize;
        let offset2 = 0;
        let array2 = data;
        let transactions = [];
        while (array2.length > 0) {
          const bytes = array2.slice(0, chunkSize);
          const data2 = import_buffer2.Buffer.alloc(chunkSize + 16);
          dataLayout.encode({
            instruction: 0,
            // Load instruction
            offset: offset2,
            bytes,
            bytesLength: 0,
            bytesLengthPadding: 0
          }, data2);
          const transaction = new Transaction().add({
            keys: [{
              pubkey: program.publicKey,
              isSigner: true,
              isWritable: true
            }],
            programId,
            data: data2
          });
          transactions.push(sendAndConfirmTransaction(connection, transaction, [payer, program], {
            commitment: "confirmed"
          }));
          if (connection._rpcEndpoint.includes("solana.com")) {
            const REQUESTS_PER_SECOND = 4;
            await sleep(1e3 / REQUESTS_PER_SECOND);
          }
          offset2 += chunkSize;
          array2 = array2.slice(chunkSize);
        }
        await Promise.all(transactions);
        {
          const dataLayout2 = BufferLayout.struct([BufferLayout.u32("instruction")]);
          const data2 = import_buffer2.Buffer.alloc(dataLayout2.span);
          dataLayout2.encode({
            instruction: 1
            // Finalize instruction
          }, data2);
          const transaction = new Transaction().add({
            keys: [{
              pubkey: program.publicKey,
              isSigner: true,
              isWritable: true
            }, {
              pubkey: SYSVAR_RENT_PUBKEY,
              isSigner: false,
              isWritable: false
            }],
            programId,
            data: data2
          });
          const deployCommitment = "processed";
          const finalizeSignature = await connection.sendTransaction(transaction, [payer, program], {
            preflightCommitment: deployCommitment
          });
          const {
            context,
            value
          } = await connection.confirmTransaction({
            signature: finalizeSignature,
            lastValidBlockHeight: transaction.lastValidBlockHeight,
            blockhash: transaction.recentBlockhash
          }, deployCommitment);
          if (value.err) {
            throw new Error(`Transaction ${finalizeSignature} failed (${JSON.stringify(value)})`);
          }
          while (true) {
            try {
              const currentSlot = await connection.getSlot({
                commitment: deployCommitment
              });
              if (currentSlot > context.slot) {
                break;
              }
            } catch {
            }
            await new Promise((resolve) => setTimeout(resolve, Math.round(MS_PER_SLOT / 2)));
          }
        }
        return true;
      }
    };
    Loader.chunkSize = CHUNK_SIZE;
    BPF_LOADER_PROGRAM_ID = new PublicKey("BPFLoader2111111111111111111111111111111111");
    BpfLoader = class {
      /**
       * Minimum number of signatures required to load a program not including
       * retries
       *
       * Can be used to calculate transaction fees
       */
      static getMinNumSignatures(dataLength) {
        return Loader.getMinNumSignatures(dataLength);
      }
      /**
       * Load a SBF program
       *
       * @param connection The connection to use
       * @param payer Account that will pay program loading fees
       * @param program Account to load the program into
       * @param elf The entire ELF containing the SBF program
       * @param loaderProgramId The program id of the BPF loader to use
       * @return true if program was loaded successfully, false if program was already loaded
       */
      static load(connection, payer, program, elf, loaderProgramId) {
        return Loader.load(connection, payer, program, loaderProgramId, elf);
      }
    };
    fastStableStringifyExports = requireFastStableStringify();
    fastStableStringify = getDefaultExportFromCjs(fastStableStringifyExports);
    MINIMUM_SLOT_PER_EPOCH = 32;
    EpochSchedule = class {
      constructor(slotsPerEpoch, leaderScheduleSlotOffset, warmup, firstNormalEpoch, firstNormalSlot) {
        this.slotsPerEpoch = void 0;
        this.leaderScheduleSlotOffset = void 0;
        this.warmup = void 0;
        this.firstNormalEpoch = void 0;
        this.firstNormalSlot = void 0;
        this.slotsPerEpoch = slotsPerEpoch;
        this.leaderScheduleSlotOffset = leaderScheduleSlotOffset;
        this.warmup = warmup;
        this.firstNormalEpoch = firstNormalEpoch;
        this.firstNormalSlot = firstNormalSlot;
      }
      getEpoch(slot) {
        return this.getEpochAndSlotIndex(slot)[0];
      }
      getEpochAndSlotIndex(slot) {
        if (slot < this.firstNormalSlot) {
          const epoch = trailingZeros(nextPowerOfTwo(slot + MINIMUM_SLOT_PER_EPOCH + 1)) - trailingZeros(MINIMUM_SLOT_PER_EPOCH) - 1;
          const epochLen = this.getSlotsInEpoch(epoch);
          const slotIndex = slot - (epochLen - MINIMUM_SLOT_PER_EPOCH);
          return [epoch, slotIndex];
        } else {
          const normalSlotIndex = slot - this.firstNormalSlot;
          const normalEpochIndex = Math.floor(normalSlotIndex / this.slotsPerEpoch);
          const epoch = this.firstNormalEpoch + normalEpochIndex;
          const slotIndex = normalSlotIndex % this.slotsPerEpoch;
          return [epoch, slotIndex];
        }
      }
      getFirstSlotInEpoch(epoch) {
        if (epoch <= this.firstNormalEpoch) {
          return (Math.pow(2, epoch) - 1) * MINIMUM_SLOT_PER_EPOCH;
        } else {
          return (epoch - this.firstNormalEpoch) * this.slotsPerEpoch + this.firstNormalSlot;
        }
      }
      getLastSlotInEpoch(epoch) {
        return this.getFirstSlotInEpoch(epoch) + this.getSlotsInEpoch(epoch) - 1;
      }
      getSlotsInEpoch(epoch) {
        if (epoch < this.firstNormalEpoch) {
          return Math.pow(2, epoch + trailingZeros(MINIMUM_SLOT_PER_EPOCH));
        } else {
          return this.slotsPerEpoch;
        }
      }
    };
    fetchImpl = globalThis.fetch;
    RpcWebSocketClient = class extends CommonClient {
      constructor(address, options, generate_request_id) {
        const webSocketFactory = (url) => {
          const rpc = WebSocket(url, {
            autoconnect: true,
            max_reconnects: 5,
            reconnect: true,
            reconnect_interval: 1e3,
            ...options
          });
          if ("socket" in rpc) {
            this.underlyingSocket = rpc.socket;
          } else {
            this.underlyingSocket = rpc;
          }
          return rpc;
        };
        super(webSocketFactory, address, options, generate_request_id);
        this.underlyingSocket = void 0;
      }
      call(...args) {
        var _a;
        const readyState = (_a = this.underlyingSocket) == null ? void 0 : _a.readyState;
        if (readyState === 1) {
          return super.call(...args);
        }
        return Promise.reject(new Error("Tried to call a JSON-RPC method `" + args[0] + "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " + readyState + ")"));
      }
      notify(...args) {
        var _a;
        const readyState = (_a = this.underlyingSocket) == null ? void 0 : _a.readyState;
        if (readyState === 1) {
          return super.notify(...args);
        }
        return Promise.reject(new Error("Tried to send a JSON-RPC notification `" + args[0] + "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " + readyState + ")"));
      }
    };
    LOOKUP_TABLE_META_SIZE = 56;
    AddressLookupTableAccount = class {
      constructor(args) {
        this.key = void 0;
        this.state = void 0;
        this.key = args.key;
        this.state = args.state;
      }
      isActive() {
        const U64_MAX = BigInt("0xffffffffffffffff");
        return this.state.deactivationSlot === U64_MAX;
      }
      static deserialize(accountData) {
        const meta = decodeData(LookupTableMetaLayout, accountData);
        const serializedAddressesLen = accountData.length - LOOKUP_TABLE_META_SIZE;
        assert2(serializedAddressesLen >= 0, "lookup table is invalid");
        assert2(serializedAddressesLen % 32 === 0, "lookup table is invalid");
        const numSerializedAddresses = serializedAddressesLen / 32;
        const {
          addresses
        } = BufferLayout.struct([BufferLayout.seq(publicKey(), numSerializedAddresses, "addresses")]).decode(accountData.slice(LOOKUP_TABLE_META_SIZE));
        return {
          deactivationSlot: meta.deactivationSlot,
          lastExtendedSlot: meta.lastExtendedSlot,
          lastExtendedSlotStartIndex: meta.lastExtendedStartIndex,
          authority: meta.authority.length !== 0 ? new PublicKey(meta.authority[0]) : void 0,
          addresses: addresses.map((address) => new PublicKey(address))
        };
      }
    };
    LookupTableMetaLayout = {
      index: 1,
      layout: BufferLayout.struct([
        BufferLayout.u32("typeIndex"),
        u64("deactivationSlot"),
        BufferLayout.nu64("lastExtendedSlot"),
        BufferLayout.u8("lastExtendedStartIndex"),
        BufferLayout.u8(),
        // option
        BufferLayout.seq(publicKey(), BufferLayout.offset(BufferLayout.u8(), -1), "authority")
      ])
    };
    URL_RE = /^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i;
    PublicKeyFromString = coerce(instance(PublicKey), string(), (value) => new PublicKey(value));
    RawAccountDataResult = tuple([string(), literal("base64")]);
    BufferFromRawAccountData = coerce(instance(import_buffer2.Buffer), RawAccountDataResult, (value) => import_buffer2.Buffer.from(value[0], "base64"));
    BLOCKHASH_CACHE_TIMEOUT_MS = 30 * 1e3;
    UnknownRpcResult = createRpcResult(unknown());
    GetInflationGovernorResult = type({
      foundation: number(),
      foundationTerm: number(),
      initial: number(),
      taper: number(),
      terminal: number()
    });
    GetInflationRewardResult = jsonRpcResult(array(nullable(type({
      epoch: number(),
      effectiveSlot: number(),
      amount: number(),
      postBalance: number(),
      commission: optional(nullable(number()))
    }))));
    GetRecentPrioritizationFeesResult = array(type({
      slot: number(),
      prioritizationFee: number()
    }));
    GetInflationRateResult = type({
      total: number(),
      validator: number(),
      foundation: number(),
      epoch: number()
    });
    GetEpochInfoResult = type({
      epoch: number(),
      slotIndex: number(),
      slotsInEpoch: number(),
      absoluteSlot: number(),
      blockHeight: optional(number()),
      transactionCount: optional(number())
    });
    GetEpochScheduleResult = type({
      slotsPerEpoch: number(),
      leaderScheduleSlotOffset: number(),
      warmup: boolean(),
      firstNormalEpoch: number(),
      firstNormalSlot: number()
    });
    GetLeaderScheduleResult = record(string(), array(number()));
    TransactionErrorResult = nullable(union([type({}), string()]));
    SignatureStatusResult = type({
      err: TransactionErrorResult
    });
    SignatureReceivedResult = literal("receivedSignature");
    VersionResult = type({
      "solana-core": string(),
      "feature-set": optional(number())
    });
    ParsedInstructionStruct = type({
      program: string(),
      programId: PublicKeyFromString,
      parsed: unknown()
    });
    PartiallyDecodedInstructionStruct = type({
      programId: PublicKeyFromString,
      accounts: array(PublicKeyFromString),
      data: string()
    });
    SimulatedTransactionResponseStruct = jsonRpcResultAndContext(type({
      err: nullable(union([type({}), string()])),
      logs: nullable(array(string())),
      accounts: optional(nullable(array(nullable(type({
        executable: boolean(),
        owner: string(),
        lamports: number(),
        data: array(string()),
        rentEpoch: optional(number())
      }))))),
      unitsConsumed: optional(number()),
      returnData: optional(nullable(type({
        programId: string(),
        data: tuple([string(), literal("base64")])
      }))),
      innerInstructions: optional(nullable(array(type({
        index: number(),
        instructions: array(union([ParsedInstructionStruct, PartiallyDecodedInstructionStruct]))
      }))))
    }));
    BlockProductionResponseStruct = jsonRpcResultAndContext(type({
      byIdentity: record(string(), array(number())),
      range: type({
        firstSlot: number(),
        lastSlot: number()
      })
    }));
    GetInflationGovernorRpcResult = jsonRpcResult(GetInflationGovernorResult);
    GetInflationRateRpcResult = jsonRpcResult(GetInflationRateResult);
    GetRecentPrioritizationFeesRpcResult = jsonRpcResult(GetRecentPrioritizationFeesResult);
    GetEpochInfoRpcResult = jsonRpcResult(GetEpochInfoResult);
    GetEpochScheduleRpcResult = jsonRpcResult(GetEpochScheduleResult);
    GetLeaderScheduleRpcResult = jsonRpcResult(GetLeaderScheduleResult);
    SlotRpcResult = jsonRpcResult(number());
    GetSupplyRpcResult = jsonRpcResultAndContext(type({
      total: number(),
      circulating: number(),
      nonCirculating: number(),
      nonCirculatingAccounts: array(PublicKeyFromString)
    }));
    TokenAmountResult = type({
      amount: string(),
      uiAmount: nullable(number()),
      decimals: number(),
      uiAmountString: optional(string())
    });
    GetTokenLargestAccountsResult = jsonRpcResultAndContext(array(type({
      address: PublicKeyFromString,
      amount: string(),
      uiAmount: nullable(number()),
      decimals: number(),
      uiAmountString: optional(string())
    })));
    GetTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
      pubkey: PublicKeyFromString,
      account: type({
        executable: boolean(),
        owner: PublicKeyFromString,
        lamports: number(),
        data: BufferFromRawAccountData,
        rentEpoch: number()
      })
    })));
    ParsedAccountDataResult = type({
      program: string(),
      parsed: unknown(),
      space: number()
    });
    GetParsedTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
      pubkey: PublicKeyFromString,
      account: type({
        executable: boolean(),
        owner: PublicKeyFromString,
        lamports: number(),
        data: ParsedAccountDataResult,
        rentEpoch: number()
      })
    })));
    GetLargestAccountsRpcResult = jsonRpcResultAndContext(array(type({
      lamports: number(),
      address: PublicKeyFromString
    })));
    AccountInfoResult = type({
      executable: boolean(),
      owner: PublicKeyFromString,
      lamports: number(),
      data: BufferFromRawAccountData,
      rentEpoch: number()
    });
    KeyedAccountInfoResult = type({
      pubkey: PublicKeyFromString,
      account: AccountInfoResult
    });
    ParsedOrRawAccountData = coerce(union([instance(import_buffer2.Buffer), ParsedAccountDataResult]), union([RawAccountDataResult, ParsedAccountDataResult]), (value) => {
      if (Array.isArray(value)) {
        return create(value, BufferFromRawAccountData);
      } else {
        return value;
      }
    });
    ParsedAccountInfoResult = type({
      executable: boolean(),
      owner: PublicKeyFromString,
      lamports: number(),
      data: ParsedOrRawAccountData,
      rentEpoch: number()
    });
    KeyedParsedAccountInfoResult = type({
      pubkey: PublicKeyFromString,
      account: ParsedAccountInfoResult
    });
    StakeActivationResult = type({
      state: union([literal("active"), literal("inactive"), literal("activating"), literal("deactivating")]),
      active: number(),
      inactive: number()
    });
    GetConfirmedSignaturesForAddress2RpcResult = jsonRpcResult(array(type({
      signature: string(),
      slot: number(),
      err: TransactionErrorResult,
      memo: nullable(string()),
      blockTime: optional(nullable(number()))
    })));
    GetSignaturesForAddressRpcResult = jsonRpcResult(array(type({
      signature: string(),
      slot: number(),
      err: TransactionErrorResult,
      memo: nullable(string()),
      blockTime: optional(nullable(number()))
    })));
    AccountNotificationResult = type({
      subscription: number(),
      result: notificationResultAndContext(AccountInfoResult)
    });
    ProgramAccountInfoResult = type({
      pubkey: PublicKeyFromString,
      account: AccountInfoResult
    });
    ProgramAccountNotificationResult = type({
      subscription: number(),
      result: notificationResultAndContext(ProgramAccountInfoResult)
    });
    SlotInfoResult = type({
      parent: number(),
      slot: number(),
      root: number()
    });
    SlotNotificationResult = type({
      subscription: number(),
      result: SlotInfoResult
    });
    SlotUpdateResult = union([type({
      type: union([literal("firstShredReceived"), literal("completed"), literal("optimisticConfirmation"), literal("root")]),
      slot: number(),
      timestamp: number()
    }), type({
      type: literal("createdBank"),
      parent: number(),
      slot: number(),
      timestamp: number()
    }), type({
      type: literal("frozen"),
      slot: number(),
      timestamp: number(),
      stats: type({
        numTransactionEntries: number(),
        numSuccessfulTransactions: number(),
        numFailedTransactions: number(),
        maxTransactionsPerEntry: number()
      })
    }), type({
      type: literal("dead"),
      slot: number(),
      timestamp: number(),
      err: string()
    })]);
    SlotUpdateNotificationResult = type({
      subscription: number(),
      result: SlotUpdateResult
    });
    SignatureNotificationResult = type({
      subscription: number(),
      result: notificationResultAndContext(union([SignatureStatusResult, SignatureReceivedResult]))
    });
    RootNotificationResult = type({
      subscription: number(),
      result: number()
    });
    ContactInfoResult = type({
      pubkey: string(),
      gossip: nullable(string()),
      tpu: nullable(string()),
      rpc: nullable(string()),
      version: nullable(string())
    });
    VoteAccountInfoResult = type({
      votePubkey: string(),
      nodePubkey: string(),
      activatedStake: number(),
      epochVoteAccount: boolean(),
      epochCredits: array(tuple([number(), number(), number()])),
      commission: number(),
      lastVote: number(),
      rootSlot: nullable(number())
    });
    GetVoteAccounts = jsonRpcResult(type({
      current: array(VoteAccountInfoResult),
      delinquent: array(VoteAccountInfoResult)
    }));
    ConfirmationStatus = union([literal("processed"), literal("confirmed"), literal("finalized")]);
    SignatureStatusResponse = type({
      slot: number(),
      confirmations: nullable(number()),
      err: TransactionErrorResult,
      confirmationStatus: optional(ConfirmationStatus)
    });
    GetSignatureStatusesRpcResult = jsonRpcResultAndContext(array(nullable(SignatureStatusResponse)));
    GetMinimumBalanceForRentExemptionRpcResult = jsonRpcResult(number());
    AddressTableLookupStruct = type({
      accountKey: PublicKeyFromString,
      writableIndexes: array(number()),
      readonlyIndexes: array(number())
    });
    ConfirmedTransactionResult = type({
      signatures: array(string()),
      message: type({
        accountKeys: array(string()),
        header: type({
          numRequiredSignatures: number(),
          numReadonlySignedAccounts: number(),
          numReadonlyUnsignedAccounts: number()
        }),
        instructions: array(type({
          accounts: array(number()),
          data: string(),
          programIdIndex: number()
        })),
        recentBlockhash: string(),
        addressTableLookups: optional(array(AddressTableLookupStruct))
      })
    });
    AnnotatedAccountKey = type({
      pubkey: PublicKeyFromString,
      signer: boolean(),
      writable: boolean(),
      source: optional(union([literal("transaction"), literal("lookupTable")]))
    });
    ConfirmedTransactionAccountsModeResult = type({
      accountKeys: array(AnnotatedAccountKey),
      signatures: array(string())
    });
    ParsedInstructionResult = type({
      parsed: unknown(),
      program: string(),
      programId: PublicKeyFromString
    });
    RawInstructionResult = type({
      accounts: array(PublicKeyFromString),
      data: string(),
      programId: PublicKeyFromString
    });
    InstructionResult = union([RawInstructionResult, ParsedInstructionResult]);
    UnknownInstructionResult = union([type({
      parsed: unknown(),
      program: string(),
      programId: string()
    }), type({
      accounts: array(string()),
      data: string(),
      programId: string()
    })]);
    ParsedOrRawInstruction = coerce(InstructionResult, UnknownInstructionResult, (value) => {
      if ("accounts" in value) {
        return create(value, RawInstructionResult);
      } else {
        return create(value, ParsedInstructionResult);
      }
    });
    ParsedConfirmedTransactionResult = type({
      signatures: array(string()),
      message: type({
        accountKeys: array(AnnotatedAccountKey),
        instructions: array(ParsedOrRawInstruction),
        recentBlockhash: string(),
        addressTableLookups: optional(nullable(array(AddressTableLookupStruct)))
      })
    });
    TokenBalanceResult = type({
      accountIndex: number(),
      mint: string(),
      owner: optional(string()),
      programId: optional(string()),
      uiTokenAmount: TokenAmountResult
    });
    LoadedAddressesResult = type({
      writable: array(PublicKeyFromString),
      readonly: array(PublicKeyFromString)
    });
    ConfirmedTransactionMetaResult = type({
      err: TransactionErrorResult,
      fee: number(),
      innerInstructions: optional(nullable(array(type({
        index: number(),
        instructions: array(type({
          accounts: array(number()),
          data: string(),
          programIdIndex: number()
        }))
      })))),
      preBalances: array(number()),
      postBalances: array(number()),
      logMessages: optional(nullable(array(string()))),
      preTokenBalances: optional(nullable(array(TokenBalanceResult))),
      postTokenBalances: optional(nullable(array(TokenBalanceResult))),
      loadedAddresses: optional(LoadedAddressesResult),
      computeUnitsConsumed: optional(number())
    });
    ParsedConfirmedTransactionMetaResult = type({
      err: TransactionErrorResult,
      fee: number(),
      innerInstructions: optional(nullable(array(type({
        index: number(),
        instructions: array(ParsedOrRawInstruction)
      })))),
      preBalances: array(number()),
      postBalances: array(number()),
      logMessages: optional(nullable(array(string()))),
      preTokenBalances: optional(nullable(array(TokenBalanceResult))),
      postTokenBalances: optional(nullable(array(TokenBalanceResult))),
      loadedAddresses: optional(LoadedAddressesResult),
      computeUnitsConsumed: optional(number())
    });
    TransactionVersionStruct = union([literal(0), literal("legacy")]);
    RewardsResult = type({
      pubkey: string(),
      lamports: number(),
      postBalance: nullable(number()),
      rewardType: nullable(string()),
      commission: optional(nullable(number()))
    });
    GetBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      transactions: array(type({
        transaction: ConfirmedTransactionResult,
        meta: nullable(ConfirmedTransactionMetaResult),
        version: optional(TransactionVersionStruct)
      })),
      rewards: optional(array(RewardsResult)),
      blockTime: nullable(number()),
      blockHeight: nullable(number())
    })));
    GetNoneModeBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      rewards: optional(array(RewardsResult)),
      blockTime: nullable(number()),
      blockHeight: nullable(number())
    })));
    GetAccountsModeBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      transactions: array(type({
        transaction: ConfirmedTransactionAccountsModeResult,
        meta: nullable(ConfirmedTransactionMetaResult),
        version: optional(TransactionVersionStruct)
      })),
      rewards: optional(array(RewardsResult)),
      blockTime: nullable(number()),
      blockHeight: nullable(number())
    })));
    GetParsedBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      transactions: array(type({
        transaction: ParsedConfirmedTransactionResult,
        meta: nullable(ParsedConfirmedTransactionMetaResult),
        version: optional(TransactionVersionStruct)
      })),
      rewards: optional(array(RewardsResult)),
      blockTime: nullable(number()),
      blockHeight: nullable(number())
    })));
    GetParsedAccountsModeBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      transactions: array(type({
        transaction: ConfirmedTransactionAccountsModeResult,
        meta: nullable(ParsedConfirmedTransactionMetaResult),
        version: optional(TransactionVersionStruct)
      })),
      rewards: optional(array(RewardsResult)),
      blockTime: nullable(number()),
      blockHeight: nullable(number())
    })));
    GetParsedNoneModeBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      rewards: optional(array(RewardsResult)),
      blockTime: nullable(number()),
      blockHeight: nullable(number())
    })));
    GetConfirmedBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      transactions: array(type({
        transaction: ConfirmedTransactionResult,
        meta: nullable(ConfirmedTransactionMetaResult)
      })),
      rewards: optional(array(RewardsResult)),
      blockTime: nullable(number())
    })));
    GetBlockSignaturesRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      signatures: array(string()),
      blockTime: nullable(number())
    })));
    GetTransactionRpcResult = jsonRpcResult(nullable(type({
      slot: number(),
      meta: nullable(ConfirmedTransactionMetaResult),
      blockTime: optional(nullable(number())),
      transaction: ConfirmedTransactionResult,
      version: optional(TransactionVersionStruct)
    })));
    GetParsedTransactionRpcResult = jsonRpcResult(nullable(type({
      slot: number(),
      transaction: ParsedConfirmedTransactionResult,
      meta: nullable(ParsedConfirmedTransactionMetaResult),
      blockTime: optional(nullable(number())),
      version: optional(TransactionVersionStruct)
    })));
    GetLatestBlockhashRpcResult = jsonRpcResultAndContext(type({
      blockhash: string(),
      lastValidBlockHeight: number()
    }));
    IsBlockhashValidRpcResult = jsonRpcResultAndContext(boolean());
    PerfSampleResult = type({
      slot: number(),
      numTransactions: number(),
      numSlots: number(),
      samplePeriodSecs: number()
    });
    GetRecentPerformanceSamplesRpcResult = jsonRpcResult(array(PerfSampleResult));
    GetFeeCalculatorRpcResult = jsonRpcResultAndContext(nullable(type({
      feeCalculator: type({
        lamportsPerSignature: number()
      })
    })));
    RequestAirdropRpcResult = jsonRpcResult(string());
    SendTransactionRpcResult = jsonRpcResult(string());
    LogsResult = type({
      err: TransactionErrorResult,
      logs: array(string()),
      signature: string()
    });
    LogsNotificationResult = type({
      result: notificationResultAndContext(LogsResult),
      subscription: number()
    });
    COMMON_HTTP_HEADERS = {
      "solana-client": `js/${"1.0.0-maintenance"}`
    };
    Connection = class {
      /**
       * Establish a JSON RPC connection
       *
       * @param endpoint URL to the fullnode JSON RPC endpoint
       * @param commitmentOrConfig optional default commitment level or optional ConnectionConfig configuration object
       */
      constructor(endpoint2, _commitmentOrConfig) {
        this._commitment = void 0;
        this._confirmTransactionInitialTimeout = void 0;
        this._rpcEndpoint = void 0;
        this._rpcWsEndpoint = void 0;
        this._rpcClient = void 0;
        this._rpcRequest = void 0;
        this._rpcBatchRequest = void 0;
        this._rpcWebSocket = void 0;
        this._rpcWebSocketConnected = false;
        this._rpcWebSocketHeartbeat = null;
        this._rpcWebSocketIdleTimeout = null;
        this._rpcWebSocketGeneration = 0;
        this._disableBlockhashCaching = false;
        this._pollingBlockhash = false;
        this._blockhashInfo = {
          latestBlockhash: null,
          lastFetch: 0,
          transactionSignatures: [],
          simulatedSignatures: []
        };
        this._nextClientSubscriptionId = 0;
        this._subscriptionDisposeFunctionsByClientSubscriptionId = {};
        this._subscriptionHashByClientSubscriptionId = {};
        this._subscriptionStateChangeCallbacksByHash = {};
        this._subscriptionCallbacksByServerSubscriptionId = {};
        this._subscriptionsByHash = {};
        this._subscriptionsAutoDisposedByRpc = /* @__PURE__ */ new Set();
        this.getBlockHeight = /* @__PURE__ */ (() => {
          const requestPromises = {};
          return async (commitmentOrConfig) => {
            const {
              commitment,
              config
            } = extractCommitmentFromConfig(commitmentOrConfig);
            const args = this._buildArgs([], commitment, void 0, config);
            const requestHash = fastStableStringify(args);
            requestPromises[requestHash] = requestPromises[requestHash] ?? (async () => {
              try {
                const unsafeRes = await this._rpcRequest("getBlockHeight", args);
                const res = create(unsafeRes, jsonRpcResult(number()));
                if ("error" in res) {
                  throw new SolanaJSONRPCError(res.error, "failed to get block height information");
                }
                return res.result;
              } finally {
                delete requestPromises[requestHash];
              }
            })();
            return await requestPromises[requestHash];
          };
        })();
        let wsEndpoint;
        let httpHeaders;
        let fetch;
        let fetchMiddleware;
        let disableRetryOnRateLimit;
        let httpAgent;
        if (_commitmentOrConfig && typeof _commitmentOrConfig === "string") {
          this._commitment = _commitmentOrConfig;
        } else if (_commitmentOrConfig) {
          this._commitment = _commitmentOrConfig.commitment;
          this._confirmTransactionInitialTimeout = _commitmentOrConfig.confirmTransactionInitialTimeout;
          wsEndpoint = _commitmentOrConfig.wsEndpoint;
          httpHeaders = _commitmentOrConfig.httpHeaders;
          fetch = _commitmentOrConfig.fetch;
          fetchMiddleware = _commitmentOrConfig.fetchMiddleware;
          disableRetryOnRateLimit = _commitmentOrConfig.disableRetryOnRateLimit;
          httpAgent = _commitmentOrConfig.httpAgent;
        }
        this._rpcEndpoint = assertEndpointUrl(endpoint2);
        this._rpcWsEndpoint = wsEndpoint || makeWebsocketUrl(endpoint2);
        this._rpcClient = createRpcClient(endpoint2, httpHeaders, fetch, fetchMiddleware, disableRetryOnRateLimit, httpAgent);
        this._rpcRequest = createRpcRequest(this._rpcClient);
        this._rpcBatchRequest = createRpcBatchRequest(this._rpcClient);
        this._rpcWebSocket = new RpcWebSocketClient(this._rpcWsEndpoint, {
          autoconnect: false,
          max_reconnects: Infinity
        });
        this._rpcWebSocket.on("open", this._wsOnOpen.bind(this));
        this._rpcWebSocket.on("error", this._wsOnError.bind(this));
        this._rpcWebSocket.on("close", this._wsOnClose.bind(this));
        this._rpcWebSocket.on("accountNotification", this._wsOnAccountNotification.bind(this));
        this._rpcWebSocket.on("programNotification", this._wsOnProgramAccountNotification.bind(this));
        this._rpcWebSocket.on("slotNotification", this._wsOnSlotNotification.bind(this));
        this._rpcWebSocket.on("slotsUpdatesNotification", this._wsOnSlotUpdatesNotification.bind(this));
        this._rpcWebSocket.on("signatureNotification", this._wsOnSignatureNotification.bind(this));
        this._rpcWebSocket.on("rootNotification", this._wsOnRootNotification.bind(this));
        this._rpcWebSocket.on("logsNotification", this._wsOnLogsNotification.bind(this));
      }
      /**
       * The default commitment used for requests
       */
      get commitment() {
        return this._commitment;
      }
      /**
       * The RPC endpoint
       */
      get rpcEndpoint() {
        return this._rpcEndpoint;
      }
      /**
       * Fetch the balance for the specified public key, return with context
       */
      async getBalanceAndContext(publicKey2, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([publicKey2.toBase58()], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("getBalance", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(number()));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get balance for ${publicKey2.toBase58()}`);
        }
        return res.result;
      }
      /**
       * Fetch the balance for the specified public key
       */
      async getBalance(publicKey2, commitmentOrConfig) {
        return await this.getBalanceAndContext(publicKey2, commitmentOrConfig).then((x) => x.value).catch((e) => {
          throw new Error("failed to get balance of account " + publicKey2.toBase58() + ": " + e);
        });
      }
      /**
       * Fetch the estimated production time of a block
       */
      async getBlockTime(slot) {
        const unsafeRes = await this._rpcRequest("getBlockTime", [slot]);
        const res = create(unsafeRes, jsonRpcResult(nullable(number())));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get block time for slot ${slot}`);
        }
        return res.result;
      }
      /**
       * Fetch the lowest slot that the node has information about in its ledger.
       * This value may increase over time if the node is configured to purge older ledger data
       */
      async getMinimumLedgerSlot() {
        const unsafeRes = await this._rpcRequest("minimumLedgerSlot", []);
        const res = create(unsafeRes, jsonRpcResult(number()));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get minimum ledger slot");
        }
        return res.result;
      }
      /**
       * Fetch the slot of the lowest confirmed block that has not been purged from the ledger
       */
      async getFirstAvailableBlock() {
        const unsafeRes = await this._rpcRequest("getFirstAvailableBlock", []);
        const res = create(unsafeRes, SlotRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get first available block");
        }
        return res.result;
      }
      /**
       * Fetch information about the current supply
       */
      async getSupply(config) {
        let configArg = {};
        if (typeof config === "string") {
          configArg = {
            commitment: config
          };
        } else if (config) {
          configArg = {
            ...config,
            commitment: config && config.commitment || this.commitment
          };
        } else {
          configArg = {
            commitment: this.commitment
          };
        }
        const unsafeRes = await this._rpcRequest("getSupply", [configArg]);
        const res = create(unsafeRes, GetSupplyRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get supply");
        }
        return res.result;
      }
      /**
       * Fetch the current supply of a token mint
       */
      async getTokenSupply(tokenMintAddress, commitment) {
        const args = this._buildArgs([tokenMintAddress.toBase58()], commitment);
        const unsafeRes = await this._rpcRequest("getTokenSupply", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get token supply");
        }
        return res.result;
      }
      /**
       * Fetch the current balance of a token account
       */
      async getTokenAccountBalance(tokenAddress, commitment) {
        const args = this._buildArgs([tokenAddress.toBase58()], commitment);
        const unsafeRes = await this._rpcRequest("getTokenAccountBalance", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get token account balance");
        }
        return res.result;
      }
      /**
       * Fetch all the token accounts owned by the specified account
       *
       * @return {Promise<RpcResponseAndContext<GetProgramAccountsResponse>}
       */
      async getTokenAccountsByOwner(ownerAddress, filter, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        let _args = [ownerAddress.toBase58()];
        if ("mint" in filter) {
          _args.push({
            mint: filter.mint.toBase58()
          });
        } else {
          _args.push({
            programId: filter.programId.toBase58()
          });
        }
        const args = this._buildArgs(_args, commitment, "base64", config);
        const unsafeRes = await this._rpcRequest("getTokenAccountsByOwner", args);
        const res = create(unsafeRes, GetTokenAccountsByOwner);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get token accounts owned by account ${ownerAddress.toBase58()}`);
        }
        return res.result;
      }
      /**
       * Fetch parsed token accounts owned by the specified account
       *
       * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<ParsedAccountData>}>>>}
       */
      async getParsedTokenAccountsByOwner(ownerAddress, filter, commitment) {
        let _args = [ownerAddress.toBase58()];
        if ("mint" in filter) {
          _args.push({
            mint: filter.mint.toBase58()
          });
        } else {
          _args.push({
            programId: filter.programId.toBase58()
          });
        }
        const args = this._buildArgs(_args, commitment, "jsonParsed");
        const unsafeRes = await this._rpcRequest("getTokenAccountsByOwner", args);
        const res = create(unsafeRes, GetParsedTokenAccountsByOwner);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get token accounts owned by account ${ownerAddress.toBase58()}`);
        }
        return res.result;
      }
      /**
       * Fetch the 20 largest accounts with their current balances
       */
      async getLargestAccounts(config) {
        const arg = {
          ...config,
          commitment: config && config.commitment || this.commitment
        };
        const args = arg.filter || arg.commitment ? [arg] : [];
        const unsafeRes = await this._rpcRequest("getLargestAccounts", args);
        const res = create(unsafeRes, GetLargestAccountsRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get largest accounts");
        }
        return res.result;
      }
      /**
       * Fetch the 20 largest token accounts with their current balances
       * for a given mint.
       */
      async getTokenLargestAccounts(mintAddress, commitment) {
        const args = this._buildArgs([mintAddress.toBase58()], commitment);
        const unsafeRes = await this._rpcRequest("getTokenLargestAccounts", args);
        const res = create(unsafeRes, GetTokenLargestAccountsResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get token largest accounts");
        }
        return res.result;
      }
      /**
       * Fetch all the account info for the specified public key, return with context
       */
      async getAccountInfoAndContext(publicKey2, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([publicKey2.toBase58()], commitment, "base64", config);
        const unsafeRes = await this._rpcRequest("getAccountInfo", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(nullable(AccountInfoResult)));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get info about account ${publicKey2.toBase58()}`);
        }
        return res.result;
      }
      /**
       * Fetch parsed account info for the specified public key
       */
      async getParsedAccountInfo(publicKey2, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([publicKey2.toBase58()], commitment, "jsonParsed", config);
        const unsafeRes = await this._rpcRequest("getAccountInfo", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(nullable(ParsedAccountInfoResult)));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get info about account ${publicKey2.toBase58()}`);
        }
        return res.result;
      }
      /**
       * Fetch all the account info for the specified public key
       */
      async getAccountInfo(publicKey2, commitmentOrConfig) {
        try {
          const res = await this.getAccountInfoAndContext(publicKey2, commitmentOrConfig);
          return res.value;
        } catch (e) {
          throw new Error("failed to get info about account " + publicKey2.toBase58() + ": " + e);
        }
      }
      /**
       * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
       */
      async getMultipleParsedAccounts(publicKeys, rawConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(rawConfig);
        const keys = publicKeys.map((key) => key.toBase58());
        const args = this._buildArgs([keys], commitment, "jsonParsed", config);
        const unsafeRes = await this._rpcRequest("getMultipleAccounts", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(array(nullable(ParsedAccountInfoResult))));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get info for accounts ${keys}`);
        }
        return res.result;
      }
      /**
       * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
       */
      async getMultipleAccountsInfoAndContext(publicKeys, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const keys = publicKeys.map((key) => key.toBase58());
        const args = this._buildArgs([keys], commitment, "base64", config);
        const unsafeRes = await this._rpcRequest("getMultipleAccounts", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(array(nullable(AccountInfoResult))));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get info for accounts ${keys}`);
        }
        return res.result;
      }
      /**
       * Fetch all the account info for multiple accounts specified by an array of public keys
       */
      async getMultipleAccountsInfo(publicKeys, commitmentOrConfig) {
        const res = await this.getMultipleAccountsInfoAndContext(publicKeys, commitmentOrConfig);
        return res.value;
      }
      /**
       * Returns epoch activation information for a stake account that has been delegated
       *
       * @deprecated Deprecated since RPC v1.18; will be removed in a future version.
       */
      async getStakeActivation(publicKey2, commitmentOrConfig, epoch) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([publicKey2.toBase58()], commitment, void 0, {
          ...config,
          epoch: epoch != null ? epoch : config == null ? void 0 : config.epoch
        });
        const unsafeRes = await this._rpcRequest("getStakeActivation", args);
        const res = create(unsafeRes, jsonRpcResult(StakeActivationResult));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get Stake Activation ${publicKey2.toBase58()}`);
        }
        return res.result;
      }
      /**
       * Fetch all the accounts owned by the specified program id
       *
       * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>}
       */
      // eslint-disable-next-line no-dupe-class-members
      // eslint-disable-next-line no-dupe-class-members
      async getProgramAccounts(programId, configOrCommitment) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(configOrCommitment);
        const {
          encoding,
          ...configWithoutEncoding
        } = config || {};
        const args = this._buildArgs([programId.toBase58()], commitment, encoding || "base64", {
          ...configWithoutEncoding,
          ...configWithoutEncoding.filters ? {
            filters: applyDefaultMemcmpEncodingToFilters(configWithoutEncoding.filters)
          } : null
        });
        const unsafeRes = await this._rpcRequest("getProgramAccounts", args);
        const baseSchema = array(KeyedAccountInfoResult);
        const res = configWithoutEncoding.withContext === true ? create(unsafeRes, jsonRpcResultAndContext(baseSchema)) : create(unsafeRes, jsonRpcResult(baseSchema));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get accounts owned by program ${programId.toBase58()}`);
        }
        return res.result;
      }
      /**
       * Fetch and parse all the accounts owned by the specified program id
       *
       * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer | ParsedAccountData>}>>}
       */
      async getParsedProgramAccounts(programId, configOrCommitment) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(configOrCommitment);
        const args = this._buildArgs([programId.toBase58()], commitment, "jsonParsed", config);
        const unsafeRes = await this._rpcRequest("getProgramAccounts", args);
        const res = create(unsafeRes, jsonRpcResult(array(KeyedParsedAccountInfoResult)));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get accounts owned by program ${programId.toBase58()}`);
        }
        return res.result;
      }
      /** @deprecated Instead, call `confirmTransaction` and pass in {@link TransactionConfirmationStrategy} */
      // eslint-disable-next-line no-dupe-class-members
      // eslint-disable-next-line no-dupe-class-members
      async confirmTransaction(strategy, commitment) {
        var _a;
        let rawSignature;
        if (typeof strategy == "string") {
          rawSignature = strategy;
        } else {
          const config = strategy;
          if ((_a = config.abortSignal) == null ? void 0 : _a.aborted) {
            return Promise.reject(config.abortSignal.reason);
          }
          rawSignature = config.signature;
        }
        let decodedSignature;
        try {
          decodedSignature = import_bs58.default.decode(rawSignature);
        } catch (err) {
          throw new Error("signature must be base58 encoded: " + rawSignature);
        }
        assert2(decodedSignature.length === 64, "signature has invalid length");
        if (typeof strategy === "string") {
          return await this.confirmTransactionUsingLegacyTimeoutStrategy({
            commitment: commitment || this.commitment,
            signature: rawSignature
          });
        } else if ("lastValidBlockHeight" in strategy) {
          return await this.confirmTransactionUsingBlockHeightExceedanceStrategy({
            commitment: commitment || this.commitment,
            strategy
          });
        } else {
          return await this.confirmTransactionUsingDurableNonceStrategy({
            commitment: commitment || this.commitment,
            strategy
          });
        }
      }
      getCancellationPromise(signal) {
        return new Promise((_, reject) => {
          if (signal == null) {
            return;
          }
          if (signal.aborted) {
            reject(signal.reason);
          } else {
            signal.addEventListener("abort", () => {
              reject(signal.reason);
            });
          }
        });
      }
      getTransactionConfirmationPromise({
        commitment,
        signature: signature2
      }) {
        let signatureSubscriptionId;
        let disposeSignatureSubscriptionStateChangeObserver;
        let done = false;
        const confirmationPromise = new Promise((resolve, reject) => {
          try {
            signatureSubscriptionId = this.onSignature(signature2, (result, context) => {
              signatureSubscriptionId = void 0;
              const response = {
                context,
                value: result
              };
              resolve({
                __type: TransactionStatus.PROCESSED,
                response
              });
            }, commitment);
            const subscriptionSetupPromise = new Promise((resolveSubscriptionSetup) => {
              if (signatureSubscriptionId == null) {
                resolveSubscriptionSetup();
              } else {
                disposeSignatureSubscriptionStateChangeObserver = this._onSubscriptionStateChange(signatureSubscriptionId, (nextState) => {
                  if (nextState === "subscribed") {
                    resolveSubscriptionSetup();
                  }
                });
              }
            });
            (async () => {
              await subscriptionSetupPromise;
              if (done) return;
              const response = await this.getSignatureStatus(signature2);
              if (done) return;
              if (response == null) {
                return;
              }
              const {
                context,
                value
              } = response;
              if (value == null) {
                return;
              }
              if (value == null ? void 0 : value.err) {
                reject(value.err);
              } else {
                switch (commitment) {
                  case "confirmed":
                  case "single":
                  case "singleGossip": {
                    if (value.confirmationStatus === "processed") {
                      return;
                    }
                    break;
                  }
                  case "finalized":
                  case "max":
                  case "root": {
                    if (value.confirmationStatus === "processed" || value.confirmationStatus === "confirmed") {
                      return;
                    }
                    break;
                  }
                  case "processed":
                  case "recent":
                }
                done = true;
                resolve({
                  __type: TransactionStatus.PROCESSED,
                  response: {
                    context,
                    value
                  }
                });
              }
            })();
          } catch (err) {
            reject(err);
          }
        });
        const abortConfirmation = () => {
          if (disposeSignatureSubscriptionStateChangeObserver) {
            disposeSignatureSubscriptionStateChangeObserver();
            disposeSignatureSubscriptionStateChangeObserver = void 0;
          }
          if (signatureSubscriptionId != null) {
            this.removeSignatureListener(signatureSubscriptionId);
            signatureSubscriptionId = void 0;
          }
        };
        return {
          abortConfirmation,
          confirmationPromise
        };
      }
      async confirmTransactionUsingBlockHeightExceedanceStrategy({
        commitment,
        strategy: {
          abortSignal,
          lastValidBlockHeight,
          signature: signature2
        }
      }) {
        let done = false;
        const expiryPromise = new Promise((resolve) => {
          const checkBlockHeight = async () => {
            try {
              const blockHeight = await this.getBlockHeight(commitment);
              return blockHeight;
            } catch (_e) {
              return -1;
            }
          };
          (async () => {
            let currentBlockHeight = await checkBlockHeight();
            if (done) return;
            while (currentBlockHeight <= lastValidBlockHeight) {
              await sleep(1e3);
              if (done) return;
              currentBlockHeight = await checkBlockHeight();
              if (done) return;
            }
            resolve({
              __type: TransactionStatus.BLOCKHEIGHT_EXCEEDED
            });
          })();
        });
        const {
          abortConfirmation,
          confirmationPromise
        } = this.getTransactionConfirmationPromise({
          commitment,
          signature: signature2
        });
        const cancellationPromise = this.getCancellationPromise(abortSignal);
        let result;
        try {
          const outcome = await Promise.race([cancellationPromise, confirmationPromise, expiryPromise]);
          if (outcome.__type === TransactionStatus.PROCESSED) {
            result = outcome.response;
          } else {
            throw new TransactionExpiredBlockheightExceededError(signature2);
          }
        } finally {
          done = true;
          abortConfirmation();
        }
        return result;
      }
      async confirmTransactionUsingDurableNonceStrategy({
        commitment,
        strategy: {
          abortSignal,
          minContextSlot,
          nonceAccountPubkey,
          nonceValue,
          signature: signature2
        }
      }) {
        let done = false;
        const expiryPromise = new Promise((resolve) => {
          let currentNonceValue = nonceValue;
          let lastCheckedSlot = null;
          const getCurrentNonceValue = async () => {
            try {
              const {
                context,
                value: nonceAccount
              } = await this.getNonceAndContext(nonceAccountPubkey, {
                commitment,
                minContextSlot
              });
              lastCheckedSlot = context.slot;
              return nonceAccount == null ? void 0 : nonceAccount.nonce;
            } catch (e) {
              return currentNonceValue;
            }
          };
          (async () => {
            currentNonceValue = await getCurrentNonceValue();
            if (done) return;
            while (true) {
              if (nonceValue !== currentNonceValue) {
                resolve({
                  __type: TransactionStatus.NONCE_INVALID,
                  slotInWhichNonceDidAdvance: lastCheckedSlot
                });
                return;
              }
              await sleep(2e3);
              if (done) return;
              currentNonceValue = await getCurrentNonceValue();
              if (done) return;
            }
          })();
        });
        const {
          abortConfirmation,
          confirmationPromise
        } = this.getTransactionConfirmationPromise({
          commitment,
          signature: signature2
        });
        const cancellationPromise = this.getCancellationPromise(abortSignal);
        let result;
        try {
          const outcome = await Promise.race([cancellationPromise, confirmationPromise, expiryPromise]);
          if (outcome.__type === TransactionStatus.PROCESSED) {
            result = outcome.response;
          } else {
            let signatureStatus;
            while (true) {
              const status = await this.getSignatureStatus(signature2);
              if (status == null) {
                break;
              }
              if (status.context.slot < (outcome.slotInWhichNonceDidAdvance ?? minContextSlot)) {
                await sleep(400);
                continue;
              }
              signatureStatus = status;
              break;
            }
            if (signatureStatus == null ? void 0 : signatureStatus.value) {
              const commitmentForStatus = commitment || "finalized";
              const {
                confirmationStatus
              } = signatureStatus.value;
              switch (commitmentForStatus) {
                case "processed":
                case "recent":
                  if (confirmationStatus !== "processed" && confirmationStatus !== "confirmed" && confirmationStatus !== "finalized") {
                    throw new TransactionExpiredNonceInvalidError(signature2);
                  }
                  break;
                case "confirmed":
                case "single":
                case "singleGossip":
                  if (confirmationStatus !== "confirmed" && confirmationStatus !== "finalized") {
                    throw new TransactionExpiredNonceInvalidError(signature2);
                  }
                  break;
                case "finalized":
                case "max":
                case "root":
                  if (confirmationStatus !== "finalized") {
                    throw new TransactionExpiredNonceInvalidError(signature2);
                  }
                  break;
                default:
                  /* @__PURE__ */ ((_) => {
                  })(commitmentForStatus);
              }
              result = {
                context: signatureStatus.context,
                value: {
                  err: signatureStatus.value.err
                }
              };
            } else {
              throw new TransactionExpiredNonceInvalidError(signature2);
            }
          }
        } finally {
          done = true;
          abortConfirmation();
        }
        return result;
      }
      async confirmTransactionUsingLegacyTimeoutStrategy({
        commitment,
        signature: signature2
      }) {
        let timeoutId;
        const expiryPromise = new Promise((resolve) => {
          let timeoutMs = this._confirmTransactionInitialTimeout || 60 * 1e3;
          switch (commitment) {
            case "processed":
            case "recent":
            case "single":
            case "confirmed":
            case "singleGossip": {
              timeoutMs = this._confirmTransactionInitialTimeout || 30 * 1e3;
              break;
            }
          }
          timeoutId = setTimeout(() => resolve({
            __type: TransactionStatus.TIMED_OUT,
            timeoutMs
          }), timeoutMs);
        });
        const {
          abortConfirmation,
          confirmationPromise
        } = this.getTransactionConfirmationPromise({
          commitment,
          signature: signature2
        });
        let result;
        try {
          const outcome = await Promise.race([confirmationPromise, expiryPromise]);
          if (outcome.__type === TransactionStatus.PROCESSED) {
            result = outcome.response;
          } else {
            throw new TransactionExpiredTimeoutError(signature2, outcome.timeoutMs / 1e3);
          }
        } finally {
          clearTimeout(timeoutId);
          abortConfirmation();
        }
        return result;
      }
      /**
       * Return the list of nodes that are currently participating in the cluster
       */
      async getClusterNodes() {
        const unsafeRes = await this._rpcRequest("getClusterNodes", []);
        const res = create(unsafeRes, jsonRpcResult(array(ContactInfoResult)));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get cluster nodes");
        }
        return res.result;
      }
      /**
       * Return the list of nodes that are currently participating in the cluster
       */
      async getVoteAccounts(commitment) {
        const args = this._buildArgs([], commitment);
        const unsafeRes = await this._rpcRequest("getVoteAccounts", args);
        const res = create(unsafeRes, GetVoteAccounts);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get vote accounts");
        }
        return res.result;
      }
      /**
       * Fetch the current slot that the node is processing
       */
      async getSlot(commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("getSlot", args);
        const res = create(unsafeRes, jsonRpcResult(number()));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get slot");
        }
        return res.result;
      }
      /**
       * Fetch the current slot leader of the cluster
       */
      async getSlotLeader(commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("getSlotLeader", args);
        const res = create(unsafeRes, jsonRpcResult(string()));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get slot leader");
        }
        return res.result;
      }
      /**
       * Fetch `limit` number of slot leaders starting from `startSlot`
       *
       * @param startSlot fetch slot leaders starting from this slot
       * @param limit number of slot leaders to return
       */
      async getSlotLeaders(startSlot, limit) {
        const args = [startSlot, limit];
        const unsafeRes = await this._rpcRequest("getSlotLeaders", args);
        const res = create(unsafeRes, jsonRpcResult(array(PublicKeyFromString)));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get slot leaders");
        }
        return res.result;
      }
      /**
       * Fetch the current status of a signature
       */
      async getSignatureStatus(signature2, config) {
        const {
          context,
          value: values
        } = await this.getSignatureStatuses([signature2], config);
        assert2(values.length === 1);
        const value = values[0];
        return {
          context,
          value
        };
      }
      /**
       * Fetch the current statuses of a batch of signatures
       */
      async getSignatureStatuses(signatures, config) {
        const params = [signatures];
        if (config) {
          params.push(config);
        }
        const unsafeRes = await this._rpcRequest("getSignatureStatuses", params);
        const res = create(unsafeRes, GetSignatureStatusesRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get signature status");
        }
        return res.result;
      }
      /**
       * Fetch the current transaction count of the cluster
       */
      async getTransactionCount(commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("getTransactionCount", args);
        const res = create(unsafeRes, jsonRpcResult(number()));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get transaction count");
        }
        return res.result;
      }
      /**
       * Fetch the current total currency supply of the cluster in lamports
       *
       * @deprecated Deprecated since RPC v1.2.8. Please use {@link getSupply} instead.
       */
      async getTotalSupply(commitment) {
        const result = await this.getSupply({
          commitment,
          excludeNonCirculatingAccountsList: true
        });
        return result.value.total;
      }
      /**
       * Fetch the cluster InflationGovernor parameters
       */
      async getInflationGovernor(commitment) {
        const args = this._buildArgs([], commitment);
        const unsafeRes = await this._rpcRequest("getInflationGovernor", args);
        const res = create(unsafeRes, GetInflationGovernorRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get inflation");
        }
        return res.result;
      }
      /**
       * Fetch the inflation reward for a list of addresses for an epoch
       */
      async getInflationReward(addresses, epoch, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([addresses.map((pubkey) => pubkey.toBase58())], commitment, void 0, {
          ...config,
          epoch: epoch != null ? epoch : config == null ? void 0 : config.epoch
        });
        const unsafeRes = await this._rpcRequest("getInflationReward", args);
        const res = create(unsafeRes, GetInflationRewardResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get inflation reward");
        }
        return res.result;
      }
      /**
       * Fetch the specific inflation values for the current epoch
       */
      async getInflationRate() {
        const unsafeRes = await this._rpcRequest("getInflationRate", []);
        const res = create(unsafeRes, GetInflationRateRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get inflation rate");
        }
        return res.result;
      }
      /**
       * Fetch the Epoch Info parameters
       */
      async getEpochInfo(commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("getEpochInfo", args);
        const res = create(unsafeRes, GetEpochInfoRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get epoch info");
        }
        return res.result;
      }
      /**
       * Fetch the Epoch Schedule parameters
       */
      async getEpochSchedule() {
        const unsafeRes = await this._rpcRequest("getEpochSchedule", []);
        const res = create(unsafeRes, GetEpochScheduleRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get epoch schedule");
        }
        const epochSchedule = res.result;
        return new EpochSchedule(epochSchedule.slotsPerEpoch, epochSchedule.leaderScheduleSlotOffset, epochSchedule.warmup, epochSchedule.firstNormalEpoch, epochSchedule.firstNormalSlot);
      }
      /**
       * Fetch the leader schedule for the current epoch
       * @return {Promise<RpcResponseAndContext<LeaderSchedule>>}
       */
      async getLeaderSchedule() {
        const unsafeRes = await this._rpcRequest("getLeaderSchedule", []);
        const res = create(unsafeRes, GetLeaderScheduleRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get leader schedule");
        }
        return res.result;
      }
      /**
       * Fetch the minimum balance needed to exempt an account of `dataLength`
       * size from rent
       */
      async getMinimumBalanceForRentExemption(dataLength, commitment) {
        const args = this._buildArgs([dataLength], commitment);
        const unsafeRes = await this._rpcRequest("getMinimumBalanceForRentExemption", args);
        const res = create(unsafeRes, GetMinimumBalanceForRentExemptionRpcResult);
        if ("error" in res) {
          console.warn("Unable to fetch minimum balance for rent exemption");
          return 0;
        }
        return res.result;
      }
      /**
       * Fetch a recent blockhash from the cluster, return with context
       * @return {Promise<RpcResponseAndContext<{blockhash: Blockhash, feeCalculator: FeeCalculator}>>}
       *
       * @deprecated Deprecated since RPC v1.9.0. Please use {@link getLatestBlockhash} instead.
       */
      async getRecentBlockhashAndContext(commitment) {
        const {
          context,
          value: {
            blockhash
          }
        } = await this.getLatestBlockhashAndContext(commitment);
        const feeCalculator = {
          get lamportsPerSignature() {
            throw new Error("The capability to fetch `lamportsPerSignature` using the `getRecentBlockhash` API is no longer offered by the network. Use the `getFeeForMessage` API to obtain the fee for a given message.");
          },
          toJSON() {
            return {};
          }
        };
        return {
          context,
          value: {
            blockhash,
            feeCalculator
          }
        };
      }
      /**
       * Fetch recent performance samples
       * @return {Promise<Array<PerfSample>>}
       */
      async getRecentPerformanceSamples(limit) {
        const unsafeRes = await this._rpcRequest("getRecentPerformanceSamples", limit ? [limit] : []);
        const res = create(unsafeRes, GetRecentPerformanceSamplesRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get recent performance samples");
        }
        return res.result;
      }
      /**
       * Fetch the fee calculator for a recent blockhash from the cluster, return with context
       *
       * @deprecated Deprecated since RPC v1.9.0. Please use {@link getFeeForMessage} instead.
       */
      async getFeeCalculatorForBlockhash(blockhash, commitment) {
        const args = this._buildArgs([blockhash], commitment);
        const unsafeRes = await this._rpcRequest("getFeeCalculatorForBlockhash", args);
        const res = create(unsafeRes, GetFeeCalculatorRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get fee calculator");
        }
        const {
          context,
          value
        } = res.result;
        return {
          context,
          value: value !== null ? value.feeCalculator : null
        };
      }
      /**
       * Fetch the fee for a message from the cluster, return with context
       */
      async getFeeForMessage(message, commitment) {
        const wireMessage = toBuffer(message.serialize()).toString("base64");
        const args = this._buildArgs([wireMessage], commitment);
        const unsafeRes = await this._rpcRequest("getFeeForMessage", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(nullable(number())));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get fee for message");
        }
        if (res.result === null) {
          throw new Error("invalid blockhash");
        }
        return res.result;
      }
      /**
       * Fetch a list of prioritization fees from recent blocks.
       */
      async getRecentPrioritizationFees(config) {
        var _a;
        const accounts = (_a = config == null ? void 0 : config.lockedWritableAccounts) == null ? void 0 : _a.map((key) => key.toBase58());
        const args = (accounts == null ? void 0 : accounts.length) ? [accounts] : [];
        const unsafeRes = await this._rpcRequest("getRecentPrioritizationFees", args);
        const res = create(unsafeRes, GetRecentPrioritizationFeesRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get recent prioritization fees");
        }
        return res.result;
      }
      /**
       * Fetch a recent blockhash from the cluster
       * @return {Promise<{blockhash: Blockhash, feeCalculator: FeeCalculator}>}
       *
       * @deprecated Deprecated since RPC v1.8.0. Please use {@link getLatestBlockhash} instead.
       */
      async getRecentBlockhash(commitment) {
        try {
          const res = await this.getRecentBlockhashAndContext(commitment);
          return res.value;
        } catch (e) {
          throw new Error("failed to get recent blockhash: " + e);
        }
      }
      /**
       * Fetch the latest blockhash from the cluster
       * @return {Promise<BlockhashWithExpiryBlockHeight>}
       */
      async getLatestBlockhash(commitmentOrConfig) {
        try {
          const res = await this.getLatestBlockhashAndContext(commitmentOrConfig);
          return res.value;
        } catch (e) {
          throw new Error("failed to get recent blockhash: " + e);
        }
      }
      /**
       * Fetch the latest blockhash from the cluster
       * @return {Promise<BlockhashWithExpiryBlockHeight>}
       */
      async getLatestBlockhashAndContext(commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs([], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("getLatestBlockhash", args);
        const res = create(unsafeRes, GetLatestBlockhashRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get latest blockhash");
        }
        return res.result;
      }
      /**
       * Returns whether a blockhash is still valid or not
       */
      async isBlockhashValid(blockhash, rawConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(rawConfig);
        const args = this._buildArgs([blockhash], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("isBlockhashValid", args);
        const res = create(unsafeRes, IsBlockhashValidRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to determine if the blockhash `" + blockhash + "`is valid");
        }
        return res.result;
      }
      /**
       * Fetch the node version
       */
      async getVersion() {
        const unsafeRes = await this._rpcRequest("getVersion", []);
        const res = create(unsafeRes, jsonRpcResult(VersionResult));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get version");
        }
        return res.result;
      }
      /**
       * Fetch the genesis hash
       */
      async getGenesisHash() {
        const unsafeRes = await this._rpcRequest("getGenesisHash", []);
        const res = create(unsafeRes, jsonRpcResult(string()));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get genesis hash");
        }
        return res.result;
      }
      /**
       * Fetch a processed block from the cluster.
       *
       * @deprecated Instead, call `getBlock` using a `GetVersionedBlockConfig` by
       * setting the `maxSupportedTransactionVersion` property.
       */
      /**
       * @deprecated Instead, call `getBlock` using a `GetVersionedBlockConfig` by
       * setting the `maxSupportedTransactionVersion` property.
       */
      // eslint-disable-next-line no-dupe-class-members
      /**
       * @deprecated Instead, call `getBlock` using a `GetVersionedBlockConfig` by
       * setting the `maxSupportedTransactionVersion` property.
       */
      // eslint-disable-next-line no-dupe-class-members
      /**
       * Fetch a processed block from the cluster.
       */
      // eslint-disable-next-line no-dupe-class-members
      // eslint-disable-next-line no-dupe-class-members
      // eslint-disable-next-line no-dupe-class-members
      /**
       * Fetch a processed block from the cluster.
       */
      // eslint-disable-next-line no-dupe-class-members
      async getBlock(slot, rawConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(rawConfig);
        const args = this._buildArgsAtLeastConfirmed([slot], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("getBlock", args);
        try {
          switch (config == null ? void 0 : config.transactionDetails) {
            case "accounts": {
              const res = create(unsafeRes, GetAccountsModeBlockRpcResult);
              if ("error" in res) {
                throw res.error;
              }
              return res.result;
            }
            case "none": {
              const res = create(unsafeRes, GetNoneModeBlockRpcResult);
              if ("error" in res) {
                throw res.error;
              }
              return res.result;
            }
            default: {
              const res = create(unsafeRes, GetBlockRpcResult);
              if ("error" in res) {
                throw res.error;
              }
              const {
                result
              } = res;
              return result ? {
                ...result,
                transactions: result.transactions.map(({
                  transaction,
                  meta,
                  version: version2
                }) => ({
                  meta,
                  transaction: {
                    ...transaction,
                    message: versionedMessageFromResponse(version2, transaction.message)
                  },
                  version: version2
                }))
              } : null;
            }
          }
        } catch (e) {
          throw new SolanaJSONRPCError(e, "failed to get confirmed block");
        }
      }
      /**
       * Fetch parsed transaction details for a confirmed or finalized block
       */
      // eslint-disable-next-line no-dupe-class-members
      // eslint-disable-next-line no-dupe-class-members
      // eslint-disable-next-line no-dupe-class-members
      async getParsedBlock(slot, rawConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(rawConfig);
        const args = this._buildArgsAtLeastConfirmed([slot], commitment, "jsonParsed", config);
        const unsafeRes = await this._rpcRequest("getBlock", args);
        try {
          switch (config == null ? void 0 : config.transactionDetails) {
            case "accounts": {
              const res = create(unsafeRes, GetParsedAccountsModeBlockRpcResult);
              if ("error" in res) {
                throw res.error;
              }
              return res.result;
            }
            case "none": {
              const res = create(unsafeRes, GetParsedNoneModeBlockRpcResult);
              if ("error" in res) {
                throw res.error;
              }
              return res.result;
            }
            default: {
              const res = create(unsafeRes, GetParsedBlockRpcResult);
              if ("error" in res) {
                throw res.error;
              }
              return res.result;
            }
          }
        } catch (e) {
          throw new SolanaJSONRPCError(e, "failed to get block");
        }
      }
      /*
       * Returns recent block production information from the current or previous epoch
       */
      async getBlockProduction(configOrCommitment) {
        let extra;
        let commitment;
        if (typeof configOrCommitment === "string") {
          commitment = configOrCommitment;
        } else if (configOrCommitment) {
          const {
            commitment: c,
            ...rest
          } = configOrCommitment;
          commitment = c;
          extra = rest;
        }
        const args = this._buildArgs([], commitment, "base64", extra);
        const unsafeRes = await this._rpcRequest("getBlockProduction", args);
        const res = create(unsafeRes, BlockProductionResponseStruct);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get block production information");
        }
        return res.result;
      }
      /**
       * Fetch a confirmed or finalized transaction from the cluster.
       *
       * @deprecated Instead, call `getTransaction` using a
       * `GetVersionedTransactionConfig` by setting the
       * `maxSupportedTransactionVersion` property.
       */
      /**
       * Fetch a confirmed or finalized transaction from the cluster.
       */
      // eslint-disable-next-line no-dupe-class-members
      /**
       * Fetch a confirmed or finalized transaction from the cluster.
       */
      // eslint-disable-next-line no-dupe-class-members
      async getTransaction(signature2, rawConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(rawConfig);
        const args = this._buildArgsAtLeastConfirmed([signature2], commitment, void 0, config);
        const unsafeRes = await this._rpcRequest("getTransaction", args);
        const res = create(unsafeRes, GetTransactionRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get transaction");
        }
        const result = res.result;
        if (!result) return result;
        return {
          ...result,
          transaction: {
            ...result.transaction,
            message: versionedMessageFromResponse(result.version, result.transaction.message)
          }
        };
      }
      /**
       * Fetch parsed transaction details for a confirmed or finalized transaction
       */
      async getParsedTransaction(signature2, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgsAtLeastConfirmed([signature2], commitment, "jsonParsed", config);
        const unsafeRes = await this._rpcRequest("getTransaction", args);
        const res = create(unsafeRes, GetParsedTransactionRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get transaction");
        }
        return res.result;
      }
      /**
       * Fetch parsed transaction details for a batch of confirmed transactions
       */
      async getParsedTransactions(signatures, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const batch = signatures.map((signature2) => {
          const args = this._buildArgsAtLeastConfirmed([signature2], commitment, "jsonParsed", config);
          return {
            methodName: "getTransaction",
            args
          };
        });
        const unsafeRes = await this._rpcBatchRequest(batch);
        const res = unsafeRes.map((unsafeRes2) => {
          const res2 = create(unsafeRes2, GetParsedTransactionRpcResult);
          if ("error" in res2) {
            throw new SolanaJSONRPCError(res2.error, "failed to get transactions");
          }
          return res2.result;
        });
        return res;
      }
      /**
       * Fetch transaction details for a batch of confirmed transactions.
       * Similar to {@link getParsedTransactions} but returns a {@link TransactionResponse}.
       *
       * @deprecated Instead, call `getTransactions` using a
       * `GetVersionedTransactionConfig` by setting the
       * `maxSupportedTransactionVersion` property.
       */
      /**
       * Fetch transaction details for a batch of confirmed transactions.
       * Similar to {@link getParsedTransactions} but returns a {@link
       * VersionedTransactionResponse}.
       */
      // eslint-disable-next-line no-dupe-class-members
      /**
       * Fetch transaction details for a batch of confirmed transactions.
       * Similar to {@link getParsedTransactions} but returns a {@link
       * VersionedTransactionResponse}.
       */
      // eslint-disable-next-line no-dupe-class-members
      async getTransactions(signatures, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const batch = signatures.map((signature2) => {
          const args = this._buildArgsAtLeastConfirmed([signature2], commitment, void 0, config);
          return {
            methodName: "getTransaction",
            args
          };
        });
        const unsafeRes = await this._rpcBatchRequest(batch);
        const res = unsafeRes.map((unsafeRes2) => {
          const res2 = create(unsafeRes2, GetTransactionRpcResult);
          if ("error" in res2) {
            throw new SolanaJSONRPCError(res2.error, "failed to get transactions");
          }
          const result = res2.result;
          if (!result) return result;
          return {
            ...result,
            transaction: {
              ...result.transaction,
              message: versionedMessageFromResponse(result.version, result.transaction.message)
            }
          };
        });
        return res;
      }
      /**
       * Fetch a list of Transactions and transaction statuses from the cluster
       * for a confirmed block.
       *
       * @deprecated Deprecated since RPC v1.7.0. Please use {@link getBlock} instead.
       */
      async getConfirmedBlock(slot, commitment) {
        const args = this._buildArgsAtLeastConfirmed([slot], commitment);
        const unsafeRes = await this._rpcRequest("getBlock", args);
        const res = create(unsafeRes, GetConfirmedBlockRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get confirmed block");
        }
        const result = res.result;
        if (!result) {
          throw new Error("Confirmed block " + slot + " not found");
        }
        const block = {
          ...result,
          transactions: result.transactions.map(({
            transaction,
            meta
          }) => {
            const message = new Message(transaction.message);
            return {
              meta,
              transaction: {
                ...transaction,
                message
              }
            };
          })
        };
        return {
          ...block,
          transactions: block.transactions.map(({
            transaction,
            meta
          }) => {
            return {
              meta,
              transaction: Transaction.populate(transaction.message, transaction.signatures)
            };
          })
        };
      }
      /**
       * Fetch confirmed blocks between two slots
       */
      async getBlocks(startSlot, endSlot, commitment) {
        const args = this._buildArgsAtLeastConfirmed(endSlot !== void 0 ? [startSlot, endSlot] : [startSlot], commitment);
        const unsafeRes = await this._rpcRequest("getBlocks", args);
        const res = create(unsafeRes, jsonRpcResult(array(number())));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get blocks");
        }
        return res.result;
      }
      /**
       * Fetch a list of Signatures from the cluster for a block, excluding rewards
       */
      async getBlockSignatures(slot, commitment) {
        const args = this._buildArgsAtLeastConfirmed([slot], commitment, void 0, {
          transactionDetails: "signatures",
          rewards: false
        });
        const unsafeRes = await this._rpcRequest("getBlock", args);
        const res = create(unsafeRes, GetBlockSignaturesRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get block");
        }
        const result = res.result;
        if (!result) {
          throw new Error("Block " + slot + " not found");
        }
        return result;
      }
      /**
       * Fetch a list of Signatures from the cluster for a confirmed block, excluding rewards
       *
       * @deprecated Deprecated since RPC v1.7.0. Please use {@link getBlockSignatures} instead.
       */
      async getConfirmedBlockSignatures(slot, commitment) {
        const args = this._buildArgsAtLeastConfirmed([slot], commitment, void 0, {
          transactionDetails: "signatures",
          rewards: false
        });
        const unsafeRes = await this._rpcRequest("getBlock", args);
        const res = create(unsafeRes, GetBlockSignaturesRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get confirmed block");
        }
        const result = res.result;
        if (!result) {
          throw new Error("Confirmed block " + slot + " not found");
        }
        return result;
      }
      /**
       * Fetch a transaction details for a confirmed transaction
       *
       * @deprecated Deprecated since RPC v1.7.0. Please use {@link getTransaction} instead.
       */
      async getConfirmedTransaction(signature2, commitment) {
        const args = this._buildArgsAtLeastConfirmed([signature2], commitment);
        const unsafeRes = await this._rpcRequest("getTransaction", args);
        const res = create(unsafeRes, GetTransactionRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get transaction");
        }
        const result = res.result;
        if (!result) return result;
        const message = new Message(result.transaction.message);
        const signatures = result.transaction.signatures;
        return {
          ...result,
          transaction: Transaction.populate(message, signatures)
        };
      }
      /**
       * Fetch parsed transaction details for a confirmed transaction
       *
       * @deprecated Deprecated since RPC v1.7.0. Please use {@link getParsedTransaction} instead.
       */
      async getParsedConfirmedTransaction(signature2, commitment) {
        const args = this._buildArgsAtLeastConfirmed([signature2], commitment, "jsonParsed");
        const unsafeRes = await this._rpcRequest("getTransaction", args);
        const res = create(unsafeRes, GetParsedTransactionRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get confirmed transaction");
        }
        return res.result;
      }
      /**
       * Fetch parsed transaction details for a batch of confirmed transactions
       *
       * @deprecated Deprecated since RPC v1.7.0. Please use {@link getParsedTransactions} instead.
       */
      async getParsedConfirmedTransactions(signatures, commitment) {
        const batch = signatures.map((signature2) => {
          const args = this._buildArgsAtLeastConfirmed([signature2], commitment, "jsonParsed");
          return {
            methodName: "getTransaction",
            args
          };
        });
        const unsafeRes = await this._rpcBatchRequest(batch);
        const res = unsafeRes.map((unsafeRes2) => {
          const res2 = create(unsafeRes2, GetParsedTransactionRpcResult);
          if ("error" in res2) {
            throw new SolanaJSONRPCError(res2.error, "failed to get confirmed transactions");
          }
          return res2.result;
        });
        return res;
      }
      /**
       * Fetch a list of all the confirmed signatures for transactions involving an address
       * within a specified slot range. Max range allowed is 10,000 slots.
       *
       * @deprecated Deprecated since RPC v1.3. Please use {@link getConfirmedSignaturesForAddress2} instead.
       *
       * @param address queried address
       * @param startSlot start slot, inclusive
       * @param endSlot end slot, inclusive
       */
      async getConfirmedSignaturesForAddress(address, startSlot, endSlot) {
        let options = {};
        let firstAvailableBlock = await this.getFirstAvailableBlock();
        while (!("until" in options)) {
          startSlot--;
          if (startSlot <= 0 || startSlot < firstAvailableBlock) {
            break;
          }
          try {
            const block = await this.getConfirmedBlockSignatures(startSlot, "finalized");
            if (block.signatures.length > 0) {
              options.until = block.signatures[block.signatures.length - 1].toString();
            }
          } catch (err) {
            if (err instanceof Error && err.message.includes("skipped")) {
              continue;
            } else {
              throw err;
            }
          }
        }
        let highestConfirmedRoot = await this.getSlot("finalized");
        while (!("before" in options)) {
          endSlot++;
          if (endSlot > highestConfirmedRoot) {
            break;
          }
          try {
            const block = await this.getConfirmedBlockSignatures(endSlot);
            if (block.signatures.length > 0) {
              options.before = block.signatures[block.signatures.length - 1].toString();
            }
          } catch (err) {
            if (err instanceof Error && err.message.includes("skipped")) {
              continue;
            } else {
              throw err;
            }
          }
        }
        const confirmedSignatureInfo = await this.getConfirmedSignaturesForAddress2(address, options);
        return confirmedSignatureInfo.map((info) => info.signature);
      }
      /**
       * Returns confirmed signatures for transactions involving an
       * address backwards in time from the provided signature or most recent confirmed block
       *
       * @deprecated Deprecated since RPC v1.7.0. Please use {@link getSignaturesForAddress} instead.
       */
      async getConfirmedSignaturesForAddress2(address, options, commitment) {
        const args = this._buildArgsAtLeastConfirmed([address.toBase58()], commitment, void 0, options);
        const unsafeRes = await this._rpcRequest("getConfirmedSignaturesForAddress2", args);
        const res = create(unsafeRes, GetConfirmedSignaturesForAddress2RpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get confirmed signatures for address");
        }
        return res.result;
      }
      /**
       * Returns confirmed signatures for transactions involving an
       * address backwards in time from the provided signature or most recent confirmed block
       *
       *
       * @param address queried address
       * @param options
       */
      async getSignaturesForAddress(address, options, commitment) {
        const args = this._buildArgsAtLeastConfirmed([address.toBase58()], commitment, void 0, options);
        const unsafeRes = await this._rpcRequest("getSignaturesForAddress", args);
        const res = create(unsafeRes, GetSignaturesForAddressRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, "failed to get signatures for address");
        }
        return res.result;
      }
      async getAddressLookupTable(accountKey, config) {
        const {
          context,
          value: accountInfo
        } = await this.getAccountInfoAndContext(accountKey, config);
        let value = null;
        if (accountInfo !== null) {
          value = new AddressLookupTableAccount({
            key: accountKey,
            state: AddressLookupTableAccount.deserialize(accountInfo.data)
          });
        }
        return {
          context,
          value
        };
      }
      /**
       * Fetch the contents of a Nonce account from the cluster, return with context
       */
      async getNonceAndContext(nonceAccount, commitmentOrConfig) {
        const {
          context,
          value: accountInfo
        } = await this.getAccountInfoAndContext(nonceAccount, commitmentOrConfig);
        let value = null;
        if (accountInfo !== null) {
          value = NonceAccount.fromAccountData(accountInfo.data);
        }
        return {
          context,
          value
        };
      }
      /**
       * Fetch the contents of a Nonce account from the cluster
       */
      async getNonce(nonceAccount, commitmentOrConfig) {
        return await this.getNonceAndContext(nonceAccount, commitmentOrConfig).then((x) => x.value).catch((e) => {
          throw new Error("failed to get nonce for account " + nonceAccount.toBase58() + ": " + e);
        });
      }
      /**
       * Request an allocation of lamports to the specified address
       *
       * ```typescript
       * import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
       *
       * (async () => {
       *   const connection = new Connection("https://api.testnet.solana.com", "confirmed");
       *   const myAddress = new PublicKey("2nr1bHFT86W9tGnyvmYW4vcHKsQB3sVQfnddasz4kExM");
       *   const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
       *   await connection.confirmTransaction(signature);
       * })();
       * ```
       */
      async requestAirdrop(to, lamports) {
        const unsafeRes = await this._rpcRequest("requestAirdrop", [to.toBase58(), lamports]);
        const res = create(unsafeRes, RequestAirdropRpcResult);
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `airdrop to ${to.toBase58()} failed`);
        }
        return res.result;
      }
      /**
       * @internal
       */
      async _blockhashWithExpiryBlockHeight(disableCache) {
        if (!disableCache) {
          while (this._pollingBlockhash) {
            await sleep(100);
          }
          const timeSinceFetch = Date.now() - this._blockhashInfo.lastFetch;
          const expired = timeSinceFetch >= BLOCKHASH_CACHE_TIMEOUT_MS;
          if (this._blockhashInfo.latestBlockhash !== null && !expired) {
            return this._blockhashInfo.latestBlockhash;
          }
        }
        return await this._pollNewBlockhash();
      }
      /**
       * @internal
       */
      async _pollNewBlockhash() {
        this._pollingBlockhash = true;
        try {
          const startTime = Date.now();
          const cachedLatestBlockhash = this._blockhashInfo.latestBlockhash;
          const cachedBlockhash = cachedLatestBlockhash ? cachedLatestBlockhash.blockhash : null;
          for (let i = 0; i < 50; i++) {
            const latestBlockhash = await this.getLatestBlockhash("finalized");
            if (cachedBlockhash !== latestBlockhash.blockhash) {
              this._blockhashInfo = {
                latestBlockhash,
                lastFetch: Date.now(),
                transactionSignatures: [],
                simulatedSignatures: []
              };
              return latestBlockhash;
            }
            await sleep(MS_PER_SLOT / 2);
          }
          throw new Error(`Unable to obtain a new blockhash after ${Date.now() - startTime}ms`);
        } finally {
          this._pollingBlockhash = false;
        }
      }
      /**
       * get the stake minimum delegation
       */
      async getStakeMinimumDelegation(config) {
        const {
          commitment,
          config: configArg
        } = extractCommitmentFromConfig(config);
        const args = this._buildArgs([], commitment, "base64", configArg);
        const unsafeRes = await this._rpcRequest("getStakeMinimumDelegation", args);
        const res = create(unsafeRes, jsonRpcResultAndContext(number()));
        if ("error" in res) {
          throw new SolanaJSONRPCError(res.error, `failed to get stake minimum delegation`);
        }
        return res.result;
      }
      /**
       * Simulate a transaction
       *
       * @deprecated Instead, call {@link simulateTransaction} with {@link
       * VersionedTransaction} and {@link SimulateTransactionConfig} parameters
       */
      /**
       * Simulate a transaction
       */
      // eslint-disable-next-line no-dupe-class-members
      /**
       * Simulate a transaction
       */
      // eslint-disable-next-line no-dupe-class-members
      async simulateTransaction(transactionOrMessage, configOrSigners, includeAccounts) {
        if ("message" in transactionOrMessage) {
          const versionedTx = transactionOrMessage;
          const wireTransaction2 = versionedTx.serialize();
          const encodedTransaction2 = import_buffer2.Buffer.from(wireTransaction2).toString("base64");
          if (Array.isArray(configOrSigners) || includeAccounts !== void 0) {
            throw new Error("Invalid arguments");
          }
          const config2 = configOrSigners || {};
          config2.encoding = "base64";
          if (!("commitment" in config2)) {
            config2.commitment = this.commitment;
          }
          if (configOrSigners && typeof configOrSigners === "object" && "innerInstructions" in configOrSigners) {
            config2.innerInstructions = configOrSigners.innerInstructions;
          }
          const args2 = [encodedTransaction2, config2];
          const unsafeRes2 = await this._rpcRequest("simulateTransaction", args2);
          const res2 = create(unsafeRes2, SimulatedTransactionResponseStruct);
          if ("error" in res2) {
            throw new Error("failed to simulate transaction: " + res2.error.message);
          }
          return res2.result;
        }
        let transaction;
        if (transactionOrMessage instanceof Transaction) {
          let originalTx = transactionOrMessage;
          transaction = new Transaction();
          transaction.feePayer = originalTx.feePayer;
          transaction.instructions = transactionOrMessage.instructions;
          transaction.nonceInfo = originalTx.nonceInfo;
          transaction.signatures = originalTx.signatures;
        } else {
          transaction = Transaction.populate(transactionOrMessage);
          transaction._message = transaction._json = void 0;
        }
        if (configOrSigners !== void 0 && !Array.isArray(configOrSigners)) {
          throw new Error("Invalid arguments");
        }
        const signers = configOrSigners;
        if (transaction.nonceInfo && signers) {
          transaction.sign(...signers);
        } else {
          let disableCache = this._disableBlockhashCaching;
          for (; ; ) {
            const latestBlockhash = await this._blockhashWithExpiryBlockHeight(disableCache);
            transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
            transaction.recentBlockhash = latestBlockhash.blockhash;
            if (!signers) break;
            transaction.sign(...signers);
            if (!transaction.signature) {
              throw new Error("!signature");
            }
            const signature2 = transaction.signature.toString("base64");
            if (!this._blockhashInfo.simulatedSignatures.includes(signature2) && !this._blockhashInfo.transactionSignatures.includes(signature2)) {
              this._blockhashInfo.simulatedSignatures.push(signature2);
              break;
            } else {
              disableCache = true;
            }
          }
        }
        const message = transaction._compile();
        const signData = message.serialize();
        const wireTransaction = transaction._serialize(signData);
        const encodedTransaction = wireTransaction.toString("base64");
        const config = {
          encoding: "base64",
          commitment: this.commitment
        };
        if (includeAccounts) {
          const addresses = (Array.isArray(includeAccounts) ? includeAccounts : message.nonProgramIds()).map((key) => key.toBase58());
          config["accounts"] = {
            encoding: "base64",
            addresses
          };
        }
        if (signers) {
          config.sigVerify = true;
        }
        if (configOrSigners && typeof configOrSigners === "object" && "innerInstructions" in configOrSigners) {
          config.innerInstructions = configOrSigners.innerInstructions;
        }
        const args = [encodedTransaction, config];
        const unsafeRes = await this._rpcRequest("simulateTransaction", args);
        const res = create(unsafeRes, SimulatedTransactionResponseStruct);
        if ("error" in res) {
          let logs;
          if ("data" in res.error) {
            logs = res.error.data.logs;
            if (logs && Array.isArray(logs)) {
              const traceIndent = "\n    ";
              const logTrace = traceIndent + logs.join(traceIndent);
              console.error(res.error.message, logTrace);
            }
          }
          throw new SendTransactionError({
            action: "simulate",
            signature: "",
            transactionMessage: res.error.message,
            logs
          });
        }
        return res.result;
      }
      /**
       * Sign and send a transaction
       *
       * @deprecated Instead, call {@link sendTransaction} with a {@link
       * VersionedTransaction}
       */
      /**
       * Send a signed transaction
       */
      // eslint-disable-next-line no-dupe-class-members
      /**
       * Sign and send a transaction
       */
      // eslint-disable-next-line no-dupe-class-members
      async sendTransaction(transaction, signersOrOptions, options) {
        if ("version" in transaction) {
          if (signersOrOptions && Array.isArray(signersOrOptions)) {
            throw new Error("Invalid arguments");
          }
          const wireTransaction2 = transaction.serialize();
          return await this.sendRawTransaction(wireTransaction2, signersOrOptions);
        }
        if (signersOrOptions === void 0 || !Array.isArray(signersOrOptions)) {
          throw new Error("Invalid arguments");
        }
        const signers = signersOrOptions;
        if (transaction.nonceInfo) {
          transaction.sign(...signers);
        } else {
          let disableCache = this._disableBlockhashCaching;
          for (; ; ) {
            const latestBlockhash = await this._blockhashWithExpiryBlockHeight(disableCache);
            transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.sign(...signers);
            if (!transaction.signature) {
              throw new Error("!signature");
            }
            const signature2 = transaction.signature.toString("base64");
            if (!this._blockhashInfo.transactionSignatures.includes(signature2)) {
              this._blockhashInfo.transactionSignatures.push(signature2);
              break;
            } else {
              disableCache = true;
            }
          }
        }
        const wireTransaction = transaction.serialize();
        return await this.sendRawTransaction(wireTransaction, options);
      }
      /**
       * Send a transaction that has already been signed and serialized into the
       * wire format
       */
      async sendRawTransaction(rawTransaction, options) {
        const encodedTransaction = toBuffer(rawTransaction).toString("base64");
        const result = await this.sendEncodedTransaction(encodedTransaction, options);
        return result;
      }
      /**
       * Send a transaction that has already been signed, serialized into the
       * wire format, and encoded as a base64 string
       */
      async sendEncodedTransaction(encodedTransaction, options) {
        const config = {
          encoding: "base64"
        };
        const skipPreflight = options && options.skipPreflight;
        const preflightCommitment = skipPreflight === true ? "processed" : options && options.preflightCommitment || this.commitment;
        if (options && options.maxRetries != null) {
          config.maxRetries = options.maxRetries;
        }
        if (options && options.minContextSlot != null) {
          config.minContextSlot = options.minContextSlot;
        }
        if (skipPreflight) {
          config.skipPreflight = skipPreflight;
        }
        if (preflightCommitment) {
          config.preflightCommitment = preflightCommitment;
        }
        const args = [encodedTransaction, config];
        const unsafeRes = await this._rpcRequest("sendTransaction", args);
        const res = create(unsafeRes, SendTransactionRpcResult);
        if ("error" in res) {
          let logs = void 0;
          if ("data" in res.error) {
            logs = res.error.data.logs;
          }
          throw new SendTransactionError({
            action: skipPreflight ? "send" : "simulate",
            signature: "",
            transactionMessage: res.error.message,
            logs
          });
        }
        return res.result;
      }
      /**
       * @internal
       */
      _wsOnOpen() {
        this._rpcWebSocketConnected = true;
        this._rpcWebSocketHeartbeat = setInterval(() => {
          (async () => {
            try {
              await this._rpcWebSocket.notify("ping");
            } catch {
            }
          })();
        }, 5e3);
        this._updateSubscriptions();
      }
      /**
       * @internal
       */
      _wsOnError(err) {
        this._rpcWebSocketConnected = false;
        console.error("ws error:", err.message);
      }
      /**
       * @internal
       */
      _wsOnClose(code) {
        this._rpcWebSocketConnected = false;
        this._rpcWebSocketGeneration = (this._rpcWebSocketGeneration + 1) % Number.MAX_SAFE_INTEGER;
        if (this._rpcWebSocketIdleTimeout) {
          clearTimeout(this._rpcWebSocketIdleTimeout);
          this._rpcWebSocketIdleTimeout = null;
        }
        if (this._rpcWebSocketHeartbeat) {
          clearInterval(this._rpcWebSocketHeartbeat);
          this._rpcWebSocketHeartbeat = null;
        }
        if (code === 1e3) {
          this._updateSubscriptions();
          return;
        }
        this._subscriptionCallbacksByServerSubscriptionId = {};
        Object.entries(this._subscriptionsByHash).forEach(([hash, subscription]) => {
          this._setSubscription(hash, {
            ...subscription,
            state: "pending"
          });
        });
      }
      /**
       * @internal
       */
      _setSubscription(hash, nextSubscription) {
        var _a;
        const prevState = (_a = this._subscriptionsByHash[hash]) == null ? void 0 : _a.state;
        this._subscriptionsByHash[hash] = nextSubscription;
        if (prevState !== nextSubscription.state) {
          const stateChangeCallbacks = this._subscriptionStateChangeCallbacksByHash[hash];
          if (stateChangeCallbacks) {
            stateChangeCallbacks.forEach((cb) => {
              try {
                cb(nextSubscription.state);
              } catch {
              }
            });
          }
        }
      }
      /**
       * @internal
       */
      _onSubscriptionStateChange(clientSubscriptionId, callback) {
        var _a;
        const hash = this._subscriptionHashByClientSubscriptionId[clientSubscriptionId];
        if (hash == null) {
          return () => {
          };
        }
        const stateChangeCallbacks = (_a = this._subscriptionStateChangeCallbacksByHash)[hash] || (_a[hash] = /* @__PURE__ */ new Set());
        stateChangeCallbacks.add(callback);
        return () => {
          stateChangeCallbacks.delete(callback);
          if (stateChangeCallbacks.size === 0) {
            delete this._subscriptionStateChangeCallbacksByHash[hash];
          }
        };
      }
      /**
       * @internal
       */
      async _updateSubscriptions() {
        if (Object.keys(this._subscriptionsByHash).length === 0) {
          if (this._rpcWebSocketConnected) {
            this._rpcWebSocketConnected = false;
            this._rpcWebSocketIdleTimeout = setTimeout(() => {
              this._rpcWebSocketIdleTimeout = null;
              try {
                this._rpcWebSocket.close();
              } catch (err) {
                if (err instanceof Error) {
                  console.log(`Error when closing socket connection: ${err.message}`);
                }
              }
            }, 500);
          }
          return;
        }
        if (this._rpcWebSocketIdleTimeout !== null) {
          clearTimeout(this._rpcWebSocketIdleTimeout);
          this._rpcWebSocketIdleTimeout = null;
          this._rpcWebSocketConnected = true;
        }
        if (!this._rpcWebSocketConnected) {
          this._rpcWebSocket.connect();
          return;
        }
        const activeWebSocketGeneration = this._rpcWebSocketGeneration;
        const isCurrentConnectionStillActive = () => {
          return activeWebSocketGeneration === this._rpcWebSocketGeneration;
        };
        await Promise.all(
          // Don't be tempted to change this to `Object.entries`. We call
          // `_updateSubscriptions` recursively when processing the state,
          // so it's important that we look up the *current* version of
          // each subscription, every time we process a hash.
          Object.keys(this._subscriptionsByHash).map(async (hash) => {
            const subscription = this._subscriptionsByHash[hash];
            if (subscription === void 0) {
              return;
            }
            switch (subscription.state) {
              case "pending":
              case "unsubscribed":
                if (subscription.callbacks.size === 0) {
                  delete this._subscriptionsByHash[hash];
                  if (subscription.state === "unsubscribed") {
                    delete this._subscriptionCallbacksByServerSubscriptionId[subscription.serverSubscriptionId];
                  }
                  await this._updateSubscriptions();
                  return;
                }
                await (async () => {
                  const {
                    args,
                    method
                  } = subscription;
                  try {
                    this._setSubscription(hash, {
                      ...subscription,
                      state: "subscribing"
                    });
                    const serverSubscriptionId = await this._rpcWebSocket.call(method, args);
                    this._setSubscription(hash, {
                      ...subscription,
                      serverSubscriptionId,
                      state: "subscribed"
                    });
                    this._subscriptionCallbacksByServerSubscriptionId[serverSubscriptionId] = subscription.callbacks;
                    await this._updateSubscriptions();
                  } catch (e) {
                    console.error(`Received ${e instanceof Error ? "" : "JSON-RPC "}error calling \`${method}\``, {
                      args,
                      error: e
                    });
                    if (!isCurrentConnectionStillActive()) {
                      return;
                    }
                    this._setSubscription(hash, {
                      ...subscription,
                      state: "pending"
                    });
                    await this._updateSubscriptions();
                  }
                })();
                break;
              case "subscribed":
                if (subscription.callbacks.size === 0) {
                  await (async () => {
                    const {
                      serverSubscriptionId,
                      unsubscribeMethod
                    } = subscription;
                    if (this._subscriptionsAutoDisposedByRpc.has(serverSubscriptionId)) {
                      this._subscriptionsAutoDisposedByRpc.delete(serverSubscriptionId);
                    } else {
                      this._setSubscription(hash, {
                        ...subscription,
                        state: "unsubscribing"
                      });
                      this._setSubscription(hash, {
                        ...subscription,
                        state: "unsubscribing"
                      });
                      try {
                        await this._rpcWebSocket.call(unsubscribeMethod, [serverSubscriptionId]);
                      } catch (e) {
                        if (e instanceof Error) {
                          console.error(`${unsubscribeMethod} error:`, e.message);
                        }
                        if (!isCurrentConnectionStillActive()) {
                          return;
                        }
                        this._setSubscription(hash, {
                          ...subscription,
                          state: "subscribed"
                        });
                        await this._updateSubscriptions();
                        return;
                      }
                    }
                    this._setSubscription(hash, {
                      ...subscription,
                      state: "unsubscribed"
                    });
                    await this._updateSubscriptions();
                  })();
                }
                break;
            }
          })
        );
      }
      /**
       * @internal
       */
      _handleServerNotification(serverSubscriptionId, callbackArgs) {
        const callbacks = this._subscriptionCallbacksByServerSubscriptionId[serverSubscriptionId];
        if (callbacks === void 0) {
          return;
        }
        callbacks.forEach((cb) => {
          try {
            cb(
              ...callbackArgs
            );
          } catch (e) {
            console.error(e);
          }
        });
      }
      /**
       * @internal
       */
      _wsOnAccountNotification(notification) {
        const {
          result,
          subscription
        } = create(notification, AccountNotificationResult);
        this._handleServerNotification(subscription, [result.value, result.context]);
      }
      /**
       * @internal
       */
      _makeSubscription(subscriptionConfig, args) {
        const clientSubscriptionId = this._nextClientSubscriptionId++;
        const hash = fastStableStringify([subscriptionConfig.method, args]);
        const existingSubscription = this._subscriptionsByHash[hash];
        if (existingSubscription === void 0) {
          this._subscriptionsByHash[hash] = {
            ...subscriptionConfig,
            args,
            callbacks: /* @__PURE__ */ new Set([subscriptionConfig.callback]),
            state: "pending"
          };
        } else {
          existingSubscription.callbacks.add(subscriptionConfig.callback);
        }
        this._subscriptionHashByClientSubscriptionId[clientSubscriptionId] = hash;
        this._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId] = async () => {
          delete this._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId];
          delete this._subscriptionHashByClientSubscriptionId[clientSubscriptionId];
          const subscription = this._subscriptionsByHash[hash];
          assert2(subscription !== void 0, `Could not find a \`Subscription\` when tearing down client subscription #${clientSubscriptionId}`);
          subscription.callbacks.delete(subscriptionConfig.callback);
          await this._updateSubscriptions();
        };
        this._updateSubscriptions();
        return clientSubscriptionId;
      }
      /**
       * Register a callback to be invoked whenever the specified account changes
       *
       * @param publicKey Public key of the account to monitor
       * @param callback Function to invoke whenever the account is changed
       * @param config
       * @return subscription id
       */
      /** @deprecated Instead, pass in an {@link AccountSubscriptionConfig} */
      // eslint-disable-next-line no-dupe-class-members
      // eslint-disable-next-line no-dupe-class-members
      onAccountChange(publicKey2, callback, commitmentOrConfig) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs(
          [publicKey2.toBase58()],
          commitment || this._commitment || "finalized",
          // Apply connection/server default.
          "base64",
          config
        );
        return this._makeSubscription({
          callback,
          method: "accountSubscribe",
          unsubscribeMethod: "accountUnsubscribe"
        }, args);
      }
      /**
       * Deregister an account notification callback
       *
       * @param clientSubscriptionId client subscription id to deregister
       */
      async removeAccountChangeListener(clientSubscriptionId) {
        await this._unsubscribeClientSubscription(clientSubscriptionId, "account change");
      }
      /**
       * @internal
       */
      _wsOnProgramAccountNotification(notification) {
        const {
          result,
          subscription
        } = create(notification, ProgramAccountNotificationResult);
        this._handleServerNotification(subscription, [{
          accountId: result.value.pubkey,
          accountInfo: result.value.account
        }, result.context]);
      }
      /**
       * Register a callback to be invoked whenever accounts owned by the
       * specified program change
       *
       * @param programId Public key of the program to monitor
       * @param callback Function to invoke whenever the account is changed
       * @param config
       * @return subscription id
       */
      /** @deprecated Instead, pass in a {@link ProgramAccountSubscriptionConfig} */
      // eslint-disable-next-line no-dupe-class-members
      // eslint-disable-next-line no-dupe-class-members
      onProgramAccountChange(programId, callback, commitmentOrConfig, maybeFilters) {
        const {
          commitment,
          config
        } = extractCommitmentFromConfig(commitmentOrConfig);
        const args = this._buildArgs(
          [programId.toBase58()],
          commitment || this._commitment || "finalized",
          // Apply connection/server default.
          "base64",
          config ? config : maybeFilters ? {
            filters: applyDefaultMemcmpEncodingToFilters(maybeFilters)
          } : void 0
          /* extra */
        );
        return this._makeSubscription({
          callback,
          method: "programSubscribe",
          unsubscribeMethod: "programUnsubscribe"
        }, args);
      }
      /**
       * Deregister an account notification callback
       *
       * @param clientSubscriptionId client subscription id to deregister
       */
      async removeProgramAccountChangeListener(clientSubscriptionId) {
        await this._unsubscribeClientSubscription(clientSubscriptionId, "program account change");
      }
      /**
       * Registers a callback to be invoked whenever logs are emitted.
       */
      onLogs(filter, callback, commitment) {
        const args = this._buildArgs(
          [typeof filter === "object" ? {
            mentions: [filter.toString()]
          } : filter],
          commitment || this._commitment || "finalized"
          // Apply connection/server default.
        );
        return this._makeSubscription({
          callback,
          method: "logsSubscribe",
          unsubscribeMethod: "logsUnsubscribe"
        }, args);
      }
      /**
       * Deregister a logs callback.
       *
       * @param clientSubscriptionId client subscription id to deregister.
       */
      async removeOnLogsListener(clientSubscriptionId) {
        await this._unsubscribeClientSubscription(clientSubscriptionId, "logs");
      }
      /**
       * @internal
       */
      _wsOnLogsNotification(notification) {
        const {
          result,
          subscription
        } = create(notification, LogsNotificationResult);
        this._handleServerNotification(subscription, [result.value, result.context]);
      }
      /**
       * @internal
       */
      _wsOnSlotNotification(notification) {
        const {
          result,
          subscription
        } = create(notification, SlotNotificationResult);
        this._handleServerNotification(subscription, [result]);
      }
      /**
       * Register a callback to be invoked upon slot changes
       *
       * @param callback Function to invoke whenever the slot changes
       * @return subscription id
       */
      onSlotChange(callback) {
        return this._makeSubscription(
          {
            callback,
            method: "slotSubscribe",
            unsubscribeMethod: "slotUnsubscribe"
          },
          []
          /* args */
        );
      }
      /**
       * Deregister a slot notification callback
       *
       * @param clientSubscriptionId client subscription id to deregister
       */
      async removeSlotChangeListener(clientSubscriptionId) {
        await this._unsubscribeClientSubscription(clientSubscriptionId, "slot change");
      }
      /**
       * @internal
       */
      _wsOnSlotUpdatesNotification(notification) {
        const {
          result,
          subscription
        } = create(notification, SlotUpdateNotificationResult);
        this._handleServerNotification(subscription, [result]);
      }
      /**
       * Register a callback to be invoked upon slot updates. {@link SlotUpdate}'s
       * may be useful to track live progress of a cluster.
       *
       * @param callback Function to invoke whenever the slot updates
       * @return subscription id
       */
      onSlotUpdate(callback) {
        return this._makeSubscription(
          {
            callback,
            method: "slotsUpdatesSubscribe",
            unsubscribeMethod: "slotsUpdatesUnsubscribe"
          },
          []
          /* args */
        );
      }
      /**
       * Deregister a slot update notification callback
       *
       * @param clientSubscriptionId client subscription id to deregister
       */
      async removeSlotUpdateListener(clientSubscriptionId) {
        await this._unsubscribeClientSubscription(clientSubscriptionId, "slot update");
      }
      /**
       * @internal
       */
      async _unsubscribeClientSubscription(clientSubscriptionId, subscriptionName) {
        const dispose = this._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId];
        if (dispose) {
          await dispose();
        } else {
          console.warn(`Ignored unsubscribe request because an active subscription with id \`${clientSubscriptionId}\` for '${subscriptionName}' events could not be found.`);
        }
      }
      _buildArgs(args, override, encoding, extra) {
        const commitment = override || this._commitment;
        if (commitment || encoding || extra) {
          let options = {};
          if (encoding) {
            options.encoding = encoding;
          }
          if (commitment) {
            options.commitment = commitment;
          }
          if (extra) {
            options = Object.assign(options, extra);
          }
          args.push(options);
        }
        return args;
      }
      /**
       * @internal
       */
      _buildArgsAtLeastConfirmed(args, override, encoding, extra) {
        const commitment = override || this._commitment;
        if (commitment && !["confirmed", "finalized"].includes(commitment)) {
          throw new Error("Using Connection with default commitment: `" + this._commitment + "`, but method requires at least `confirmed`");
        }
        return this._buildArgs(args, override, encoding, extra);
      }
      /**
       * @internal
       */
      _wsOnSignatureNotification(notification) {
        const {
          result,
          subscription
        } = create(notification, SignatureNotificationResult);
        if (result.value !== "receivedSignature") {
          this._subscriptionsAutoDisposedByRpc.add(subscription);
        }
        this._handleServerNotification(subscription, result.value === "receivedSignature" ? [{
          type: "received"
        }, result.context] : [{
          type: "status",
          result: result.value
        }, result.context]);
      }
      /**
       * Register a callback to be invoked upon signature updates
       *
       * @param signature Transaction signature string in base 58
       * @param callback Function to invoke on signature notifications
       * @param commitment Specify the commitment level signature must reach before notification
       * @return subscription id
       */
      onSignature(signature2, callback, commitment) {
        const args = this._buildArgs(
          [signature2],
          commitment || this._commitment || "finalized"
          // Apply connection/server default.
        );
        const clientSubscriptionId = this._makeSubscription({
          callback: (notification, context) => {
            if (notification.type === "status") {
              callback(notification.result, context);
              try {
                this.removeSignatureListener(clientSubscriptionId);
              } catch (_err) {
              }
            }
          },
          method: "signatureSubscribe",
          unsubscribeMethod: "signatureUnsubscribe"
        }, args);
        return clientSubscriptionId;
      }
      /**
       * Register a callback to be invoked when a transaction is
       * received and/or processed.
       *
       * @param signature Transaction signature string in base 58
       * @param callback Function to invoke on signature notifications
       * @param options Enable received notifications and set the commitment
       *   level that signature must reach before notification
       * @return subscription id
       */
      onSignatureWithOptions(signature2, callback, options) {
        const {
          commitment,
          ...extra
        } = {
          ...options,
          commitment: options && options.commitment || this._commitment || "finalized"
          // Apply connection/server default.
        };
        const args = this._buildArgs([signature2], commitment, void 0, extra);
        const clientSubscriptionId = this._makeSubscription({
          callback: (notification, context) => {
            callback(notification, context);
            try {
              this.removeSignatureListener(clientSubscriptionId);
            } catch (_err) {
            }
          },
          method: "signatureSubscribe",
          unsubscribeMethod: "signatureUnsubscribe"
        }, args);
        return clientSubscriptionId;
      }
      /**
       * Deregister a signature notification callback
       *
       * @param clientSubscriptionId client subscription id to deregister
       */
      async removeSignatureListener(clientSubscriptionId) {
        await this._unsubscribeClientSubscription(clientSubscriptionId, "signature result");
      }
      /**
       * @internal
       */
      _wsOnRootNotification(notification) {
        const {
          result,
          subscription
        } = create(notification, RootNotificationResult);
        this._handleServerNotification(subscription, [result]);
      }
      /**
       * Register a callback to be invoked upon root changes
       *
       * @param callback Function to invoke whenever the root changes
       * @return subscription id
       */
      onRootChange(callback) {
        return this._makeSubscription(
          {
            callback,
            method: "rootSubscribe",
            unsubscribeMethod: "rootUnsubscribe"
          },
          []
          /* args */
        );
      }
      /**
       * Deregister a root notification callback
       *
       * @param clientSubscriptionId client subscription id to deregister
       */
      async removeRootChangeListener(clientSubscriptionId) {
        await this._unsubscribeClientSubscription(clientSubscriptionId, "root change");
      }
    };
    Keypair = class _Keypair {
      /**
       * Create a new keypair instance.
       * Generate random keypair if no {@link Ed25519Keypair} is provided.
       *
       * @param {Ed25519Keypair} keypair ed25519 keypair
       */
      constructor(keypair) {
        this._keypair = void 0;
        this._keypair = keypair ?? generateKeypair();
      }
      /**
       * Generate a new random keypair
       *
       * @returns {Keypair} Keypair
       */
      static generate() {
        return new _Keypair(generateKeypair());
      }
      /**
       * Create a keypair from a raw secret key byte array.
       *
       * This method should only be used to recreate a keypair from a previously
       * generated secret key. Generating keypairs from a random seed should be done
       * with the {@link Keypair.fromSeed} method.
       *
       * @throws error if the provided secret key is invalid and validation is not skipped.
       *
       * @param secretKey secret key byte array
       * @param options skip secret key validation
       *
       * @returns {Keypair} Keypair
       */
      static fromSecretKey(secretKey, options) {
        if (secretKey.byteLength !== 64) {
          throw new Error("bad secret key size");
        }
        const publicKey2 = secretKey.slice(32, 64);
        if (!options || !options.skipValidation) {
          const privateScalar = secretKey.slice(0, 32);
          const computedPublicKey = getPublicKey(privateScalar);
          for (let ii = 0; ii < 32; ii++) {
            if (publicKey2[ii] !== computedPublicKey[ii]) {
              throw new Error("provided secretKey is invalid");
            }
          }
        }
        return new _Keypair({
          publicKey: publicKey2,
          secretKey
        });
      }
      /**
       * Generate a keypair from a 32 byte seed.
       *
       * @param seed seed byte array
       *
       * @returns {Keypair} Keypair
       */
      static fromSeed(seed) {
        const publicKey2 = getPublicKey(seed);
        const secretKey = new Uint8Array(64);
        secretKey.set(seed);
        secretKey.set(publicKey2, 32);
        return new _Keypair({
          publicKey: publicKey2,
          secretKey
        });
      }
      /**
       * The public key for this keypair
       *
       * @returns {PublicKey} PublicKey
       */
      get publicKey() {
        return new PublicKey(this._keypair.publicKey);
      }
      /**
       * The raw secret key for this keypair
       * @returns {Uint8Array} Secret key in an array of Uint8 bytes
       */
      get secretKey() {
        return new Uint8Array(this._keypair.secretKey);
      }
    };
    LOOKUP_TABLE_INSTRUCTION_LAYOUTS = Object.freeze({
      CreateLookupTable: {
        index: 0,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), u64("recentSlot"), BufferLayout.u8("bumpSeed")])
      },
      FreezeLookupTable: {
        index: 1,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      ExtendLookupTable: {
        index: 2,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), u64(), BufferLayout.seq(publicKey(), BufferLayout.offset(BufferLayout.u32(), -8), "addresses")])
      },
      DeactivateLookupTable: {
        index: 3,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      CloseLookupTable: {
        index: 4,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      }
    });
    AddressLookupTableInstruction = class {
      /**
       * @internal
       */
      constructor() {
      }
      static decodeInstructionType(instruction) {
        this.checkProgramId(instruction.programId);
        const instructionTypeLayout = BufferLayout.u32("instruction");
        const index = instructionTypeLayout.decode(instruction.data);
        let type2;
        for (const [layoutType, layout] of Object.entries(LOOKUP_TABLE_INSTRUCTION_LAYOUTS)) {
          if (layout.index == index) {
            type2 = layoutType;
            break;
          }
        }
        if (!type2) {
          throw new Error("Invalid Instruction. Should be a LookupTable Instruction");
        }
        return type2;
      }
      static decodeCreateLookupTable(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeysLength(instruction.keys, 4);
        const {
          recentSlot
        } = decodeData$1(LOOKUP_TABLE_INSTRUCTION_LAYOUTS.CreateLookupTable, instruction.data);
        return {
          authority: instruction.keys[1].pubkey,
          payer: instruction.keys[2].pubkey,
          recentSlot: Number(recentSlot)
        };
      }
      static decodeExtendLookupTable(instruction) {
        this.checkProgramId(instruction.programId);
        if (instruction.keys.length < 2) {
          throw new Error(`invalid instruction; found ${instruction.keys.length} keys, expected at least 2`);
        }
        const {
          addresses
        } = decodeData$1(LOOKUP_TABLE_INSTRUCTION_LAYOUTS.ExtendLookupTable, instruction.data);
        return {
          lookupTable: instruction.keys[0].pubkey,
          authority: instruction.keys[1].pubkey,
          payer: instruction.keys.length > 2 ? instruction.keys[2].pubkey : void 0,
          addresses: addresses.map((buffer) => new PublicKey(buffer))
        };
      }
      static decodeCloseLookupTable(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeysLength(instruction.keys, 3);
        return {
          lookupTable: instruction.keys[0].pubkey,
          authority: instruction.keys[1].pubkey,
          recipient: instruction.keys[2].pubkey
        };
      }
      static decodeFreezeLookupTable(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeysLength(instruction.keys, 2);
        return {
          lookupTable: instruction.keys[0].pubkey,
          authority: instruction.keys[1].pubkey
        };
      }
      static decodeDeactivateLookupTable(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeysLength(instruction.keys, 2);
        return {
          lookupTable: instruction.keys[0].pubkey,
          authority: instruction.keys[1].pubkey
        };
      }
      /**
       * @internal
       */
      static checkProgramId(programId) {
        if (!programId.equals(AddressLookupTableProgram.programId)) {
          throw new Error("invalid instruction; programId is not AddressLookupTable Program");
        }
      }
      /**
       * @internal
       */
      static checkKeysLength(keys, expectedLength) {
        if (keys.length < expectedLength) {
          throw new Error(`invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`);
        }
      }
    };
    AddressLookupTableProgram = class {
      /**
       * @internal
       */
      constructor() {
      }
      static createLookupTable(params) {
        const [lookupTableAddress, bumpSeed] = PublicKey.findProgramAddressSync([params.authority.toBuffer(), getU64Encoder().encode(params.recentSlot)], this.programId);
        const type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.CreateLookupTable;
        const data = encodeData(type2, {
          recentSlot: BigInt(params.recentSlot),
          bumpSeed
        });
        const keys = [{
          pubkey: lookupTableAddress,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.authority,
          isSigner: true,
          isWritable: false
        }, {
          pubkey: params.payer,
          isSigner: true,
          isWritable: true
        }, {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false
        }];
        return [new TransactionInstruction({
          programId: this.programId,
          keys,
          data
        }), lookupTableAddress];
      }
      static freezeLookupTable(params) {
        const type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.FreezeLookupTable;
        const data = encodeData(type2);
        const keys = [{
          pubkey: params.lookupTable,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.authority,
          isSigner: true,
          isWritable: false
        }];
        return new TransactionInstruction({
          programId: this.programId,
          keys,
          data
        });
      }
      static extendLookupTable(params) {
        const type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.ExtendLookupTable;
        const data = encodeData(type2, {
          addresses: params.addresses.map((addr) => addr.toBytes())
        });
        const keys = [{
          pubkey: params.lookupTable,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.authority,
          isSigner: true,
          isWritable: false
        }];
        if (params.payer) {
          keys.push({
            pubkey: params.payer,
            isSigner: true,
            isWritable: true
          }, {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false
          });
        }
        return new TransactionInstruction({
          programId: this.programId,
          keys,
          data
        });
      }
      static deactivateLookupTable(params) {
        const type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.DeactivateLookupTable;
        const data = encodeData(type2);
        const keys = [{
          pubkey: params.lookupTable,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.authority,
          isSigner: true,
          isWritable: false
        }];
        return new TransactionInstruction({
          programId: this.programId,
          keys,
          data
        });
      }
      static closeLookupTable(params) {
        const type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.CloseLookupTable;
        const data = encodeData(type2);
        const keys = [{
          pubkey: params.lookupTable,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.authority,
          isSigner: true,
          isWritable: false
        }, {
          pubkey: params.recipient,
          isSigner: false,
          isWritable: true
        }];
        return new TransactionInstruction({
          programId: this.programId,
          keys,
          data
        });
      }
    };
    AddressLookupTableProgram.programId = new PublicKey("AddressLookupTab1e1111111111111111111111111");
    ComputeBudgetInstruction = class {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Decode a compute budget instruction and retrieve the instruction type.
       */
      static decodeInstructionType(instruction) {
        this.checkProgramId(instruction.programId);
        const instructionTypeLayout = BufferLayout.u8("instruction");
        const typeIndex = instructionTypeLayout.decode(instruction.data);
        let type2;
        for (const [ixType, layout] of Object.entries(COMPUTE_BUDGET_INSTRUCTION_LAYOUTS)) {
          if (layout.index == typeIndex) {
            type2 = ixType;
            break;
          }
        }
        if (!type2) {
          throw new Error("Instruction type incorrect; not a ComputeBudgetInstruction");
        }
        return type2;
      }
      /**
       * Decode request units compute budget instruction and retrieve the instruction params.
       */
      static decodeRequestUnits(instruction) {
        this.checkProgramId(instruction.programId);
        const {
          units,
          additionalFee
        } = decodeData$1(COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestUnits, instruction.data);
        return {
          units,
          additionalFee
        };
      }
      /**
       * Decode request heap frame compute budget instruction and retrieve the instruction params.
       */
      static decodeRequestHeapFrame(instruction) {
        this.checkProgramId(instruction.programId);
        const {
          bytes
        } = decodeData$1(COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestHeapFrame, instruction.data);
        return {
          bytes
        };
      }
      /**
       * Decode set compute unit limit compute budget instruction and retrieve the instruction params.
       */
      static decodeSetComputeUnitLimit(instruction) {
        this.checkProgramId(instruction.programId);
        const {
          units
        } = decodeData$1(COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.SetComputeUnitLimit, instruction.data);
        return {
          units
        };
      }
      /**
       * Decode set compute unit price compute budget instruction and retrieve the instruction params.
       */
      static decodeSetComputeUnitPrice(instruction) {
        this.checkProgramId(instruction.programId);
        const {
          microLamports
        } = decodeData$1(COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.SetComputeUnitPrice, instruction.data);
        return {
          microLamports
        };
      }
      /**
       * @internal
       */
      static checkProgramId(programId) {
        if (!programId.equals(ComputeBudgetProgram.programId)) {
          throw new Error("invalid instruction; programId is not ComputeBudgetProgram");
        }
      }
    };
    COMPUTE_BUDGET_INSTRUCTION_LAYOUTS = Object.freeze({
      RequestUnits: {
        index: 0,
        layout: BufferLayout.struct([BufferLayout.u8("instruction"), BufferLayout.u32("units"), BufferLayout.u32("additionalFee")])
      },
      RequestHeapFrame: {
        index: 1,
        layout: BufferLayout.struct([BufferLayout.u8("instruction"), BufferLayout.u32("bytes")])
      },
      SetComputeUnitLimit: {
        index: 2,
        layout: BufferLayout.struct([BufferLayout.u8("instruction"), BufferLayout.u32("units")])
      },
      SetComputeUnitPrice: {
        index: 3,
        layout: BufferLayout.struct([BufferLayout.u8("instruction"), u64("microLamports")])
      }
    });
    ComputeBudgetProgram = class {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Public key that identifies the Compute Budget program
       */
      /**
       * @deprecated Instead, call {@link setComputeUnitLimit} and/or {@link setComputeUnitPrice}
       */
      static requestUnits(params) {
        const type2 = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestUnits;
        const data = encodeData(type2, params);
        return new TransactionInstruction({
          keys: [],
          programId: this.programId,
          data
        });
      }
      static requestHeapFrame(params) {
        const type2 = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestHeapFrame;
        const data = encodeData(type2, params);
        return new TransactionInstruction({
          keys: [],
          programId: this.programId,
          data
        });
      }
      static setComputeUnitLimit(params) {
        const type2 = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.SetComputeUnitLimit;
        const data = encodeData(type2, params);
        return new TransactionInstruction({
          keys: [],
          programId: this.programId,
          data
        });
      }
      static setComputeUnitPrice(params) {
        const type2 = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.SetComputeUnitPrice;
        const data = encodeData(type2, {
          microLamports: BigInt(params.microLamports)
        });
        return new TransactionInstruction({
          keys: [],
          programId: this.programId,
          data
        });
      }
    };
    ComputeBudgetProgram.programId = new PublicKey("ComputeBudget111111111111111111111111111111");
    PRIVATE_KEY_BYTES$1 = 64;
    PUBLIC_KEY_BYTES$1 = 32;
    SIGNATURE_BYTES = 64;
    ED25519_INSTRUCTION_LAYOUT = BufferLayout.struct([BufferLayout.u8("numSignatures"), BufferLayout.u8("padding"), BufferLayout.u16("signatureOffset"), BufferLayout.u16("signatureInstructionIndex"), BufferLayout.u16("publicKeyOffset"), BufferLayout.u16("publicKeyInstructionIndex"), BufferLayout.u16("messageDataOffset"), BufferLayout.u16("messageDataSize"), BufferLayout.u16("messageInstructionIndex")]);
    Ed25519Program = class _Ed25519Program {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Public key that identifies the ed25519 program
       */
      /**
       * Create an ed25519 instruction with a public key and signature. The
       * public key must be a buffer that is 32 bytes long, and the signature
       * must be a buffer of 64 bytes.
       */
      static createInstructionWithPublicKey(params) {
        const {
          publicKey: publicKey2,
          message,
          signature: signature2,
          instructionIndex
        } = params;
        assert2(publicKey2.length === PUBLIC_KEY_BYTES$1, `Public Key must be ${PUBLIC_KEY_BYTES$1} bytes but received ${publicKey2.length} bytes`);
        assert2(signature2.length === SIGNATURE_BYTES, `Signature must be ${SIGNATURE_BYTES} bytes but received ${signature2.length} bytes`);
        const publicKeyOffset = ED25519_INSTRUCTION_LAYOUT.span;
        const signatureOffset = publicKeyOffset + publicKey2.length;
        const messageDataOffset = signatureOffset + signature2.length;
        const numSignatures = 1;
        const instructionData = import_buffer2.Buffer.alloc(messageDataOffset + message.length);
        const index = instructionIndex == null ? 65535 : instructionIndex;
        ED25519_INSTRUCTION_LAYOUT.encode({
          numSignatures,
          padding: 0,
          signatureOffset,
          signatureInstructionIndex: index,
          publicKeyOffset,
          publicKeyInstructionIndex: index,
          messageDataOffset,
          messageDataSize: message.length,
          messageInstructionIndex: index
        }, instructionData);
        instructionData.fill(publicKey2, publicKeyOffset);
        instructionData.fill(signature2, signatureOffset);
        instructionData.fill(message, messageDataOffset);
        return new TransactionInstruction({
          keys: [],
          programId: _Ed25519Program.programId,
          data: instructionData
        });
      }
      /**
       * Create an ed25519 instruction with a private key. The private key
       * must be a buffer that is 64 bytes long.
       */
      static createInstructionWithPrivateKey(params) {
        const {
          privateKey,
          message,
          instructionIndex
        } = params;
        assert2(privateKey.length === PRIVATE_KEY_BYTES$1, `Private key must be ${PRIVATE_KEY_BYTES$1} bytes but received ${privateKey.length} bytes`);
        try {
          const keypair = Keypair.fromSecretKey(privateKey);
          const publicKey2 = keypair.publicKey.toBytes();
          const signature2 = sign(message, keypair.secretKey);
          return this.createInstructionWithPublicKey({
            publicKey: publicKey2,
            message,
            signature: signature2,
            instructionIndex
          });
        } catch (error) {
          throw new Error(`Error creating instruction; ${error}`);
        }
      }
    };
    Ed25519Program.programId = new PublicKey("Ed25519SigVerify111111111111111111111111111");
    ecdsaSign = (msgHash, privKey) => {
      const signature2 = secp256k1.sign(msgHash, privKey);
      return [signature2.toCompactRawBytes(), signature2.recovery];
    };
    secp256k1.utils.isValidPrivateKey;
    publicKeyCreate = secp256k1.getPublicKey;
    PRIVATE_KEY_BYTES = 32;
    ETHEREUM_ADDRESS_BYTES = 20;
    PUBLIC_KEY_BYTES = 64;
    SIGNATURE_OFFSETS_SERIALIZED_SIZE = 11;
    SECP256K1_INSTRUCTION_LAYOUT = BufferLayout.struct([BufferLayout.u8("numSignatures"), BufferLayout.u16("signatureOffset"), BufferLayout.u8("signatureInstructionIndex"), BufferLayout.u16("ethAddressOffset"), BufferLayout.u8("ethAddressInstructionIndex"), BufferLayout.u16("messageDataOffset"), BufferLayout.u16("messageDataSize"), BufferLayout.u8("messageInstructionIndex"), BufferLayout.blob(20, "ethAddress"), BufferLayout.blob(64, "signature"), BufferLayout.u8("recoveryId")]);
    Secp256k1Program = class _Secp256k1Program {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Public key that identifies the secp256k1 program
       */
      /**
       * Construct an Ethereum address from a secp256k1 public key buffer.
       * @param {Buffer} publicKey a 64 byte secp256k1 public key buffer
       */
      static publicKeyToEthAddress(publicKey2) {
        assert2(publicKey2.length === PUBLIC_KEY_BYTES, `Public key must be ${PUBLIC_KEY_BYTES} bytes but received ${publicKey2.length} bytes`);
        try {
          return import_buffer2.Buffer.from(keccak_256(toBuffer(publicKey2))).slice(-ETHEREUM_ADDRESS_BYTES);
        } catch (error) {
          throw new Error(`Error constructing Ethereum address: ${error}`);
        }
      }
      /**
       * Create an secp256k1 instruction with a public key. The public key
       * must be a buffer that is 64 bytes long.
       */
      static createInstructionWithPublicKey(params) {
        const {
          publicKey: publicKey2,
          message,
          signature: signature2,
          recoveryId,
          instructionIndex
        } = params;
        return _Secp256k1Program.createInstructionWithEthAddress({
          ethAddress: _Secp256k1Program.publicKeyToEthAddress(publicKey2),
          message,
          signature: signature2,
          recoveryId,
          instructionIndex
        });
      }
      /**
       * Create an secp256k1 instruction with an Ethereum address. The address
       * must be a hex string or a buffer that is 20 bytes long.
       */
      static createInstructionWithEthAddress(params) {
        const {
          ethAddress: rawAddress,
          message,
          signature: signature2,
          recoveryId,
          instructionIndex = 0
        } = params;
        let ethAddress;
        if (typeof rawAddress === "string") {
          if (rawAddress.startsWith("0x")) {
            ethAddress = import_buffer2.Buffer.from(rawAddress.substr(2), "hex");
          } else {
            ethAddress = import_buffer2.Buffer.from(rawAddress, "hex");
          }
        } else {
          ethAddress = rawAddress;
        }
        assert2(ethAddress.length === ETHEREUM_ADDRESS_BYTES, `Address must be ${ETHEREUM_ADDRESS_BYTES} bytes but received ${ethAddress.length} bytes`);
        const dataStart = 1 + SIGNATURE_OFFSETS_SERIALIZED_SIZE;
        const ethAddressOffset = dataStart;
        const signatureOffset = dataStart + ethAddress.length;
        const messageDataOffset = signatureOffset + signature2.length + 1;
        const numSignatures = 1;
        const instructionData = import_buffer2.Buffer.alloc(SECP256K1_INSTRUCTION_LAYOUT.span + message.length);
        SECP256K1_INSTRUCTION_LAYOUT.encode({
          numSignatures,
          signatureOffset,
          signatureInstructionIndex: instructionIndex,
          ethAddressOffset,
          ethAddressInstructionIndex: instructionIndex,
          messageDataOffset,
          messageDataSize: message.length,
          messageInstructionIndex: instructionIndex,
          signature: toBuffer(signature2),
          ethAddress: toBuffer(ethAddress),
          recoveryId
        }, instructionData);
        instructionData.fill(toBuffer(message), SECP256K1_INSTRUCTION_LAYOUT.span);
        return new TransactionInstruction({
          keys: [],
          programId: _Secp256k1Program.programId,
          data: instructionData
        });
      }
      /**
       * Create an secp256k1 instruction with a private key. The private key
       * must be a buffer that is 32 bytes long.
       */
      static createInstructionWithPrivateKey(params) {
        const {
          privateKey: pkey,
          message,
          instructionIndex
        } = params;
        assert2(pkey.length === PRIVATE_KEY_BYTES, `Private key must be ${PRIVATE_KEY_BYTES} bytes but received ${pkey.length} bytes`);
        try {
          const privateKey = toBuffer(pkey);
          const publicKey2 = publicKeyCreate(
            privateKey,
            false
            /* isCompressed */
          ).slice(1);
          const messageHash = import_buffer2.Buffer.from(keccak_256(toBuffer(message)));
          const [signature2, recoveryId] = ecdsaSign(messageHash, privateKey);
          return this.createInstructionWithPublicKey({
            publicKey: publicKey2,
            message,
            signature: signature2,
            recoveryId,
            instructionIndex
          });
        } catch (error) {
          throw new Error(`Error creating instruction; ${error}`);
        }
      }
    };
    Secp256k1Program.programId = new PublicKey("KeccakSecp256k11111111111111111111111111111");
    STAKE_CONFIG_ID = new PublicKey("StakeConfig11111111111111111111111111111111");
    Authorized = class {
      /**
       * Create a new Authorized object
       * @param staker the stake authority
       * @param withdrawer the withdraw authority
       */
      constructor(staker, withdrawer) {
        this.staker = void 0;
        this.withdrawer = void 0;
        this.staker = staker;
        this.withdrawer = withdrawer;
      }
    };
    Lockup = class {
      /**
       * Create a new Lockup object
       */
      constructor(unixTimestamp, epoch, custodian) {
        this.unixTimestamp = void 0;
        this.epoch = void 0;
        this.custodian = void 0;
        this.unixTimestamp = unixTimestamp;
        this.epoch = epoch;
        this.custodian = custodian;
      }
      /**
       * Default, inactive Lockup value
       */
    };
    _Lockup = Lockup;
    Lockup.default = new _Lockup(0, 0, PublicKey.default);
    StakeInstruction = class {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Decode a stake instruction and retrieve the instruction type.
       */
      static decodeInstructionType(instruction) {
        this.checkProgramId(instruction.programId);
        const instructionTypeLayout = BufferLayout.u32("instruction");
        const typeIndex = instructionTypeLayout.decode(instruction.data);
        let type2;
        for (const [ixType, layout] of Object.entries(STAKE_INSTRUCTION_LAYOUTS)) {
          if (layout.index == typeIndex) {
            type2 = ixType;
            break;
          }
        }
        if (!type2) {
          throw new Error("Instruction type incorrect; not a StakeInstruction");
        }
        return type2;
      }
      /**
       * Decode a initialize stake instruction and retrieve the instruction params.
       */
      static decodeInitialize(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 2);
        const {
          authorized: authorized2,
          lockup: lockup2
        } = decodeData$1(STAKE_INSTRUCTION_LAYOUTS.Initialize, instruction.data);
        return {
          stakePubkey: instruction.keys[0].pubkey,
          authorized: new Authorized(new PublicKey(authorized2.staker), new PublicKey(authorized2.withdrawer)),
          lockup: new Lockup(lockup2.unixTimestamp, lockup2.epoch, new PublicKey(lockup2.custodian))
        };
      }
      /**
       * Decode a delegate stake instruction and retrieve the instruction params.
       */
      static decodeDelegate(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 6);
        decodeData$1(STAKE_INSTRUCTION_LAYOUTS.Delegate, instruction.data);
        return {
          stakePubkey: instruction.keys[0].pubkey,
          votePubkey: instruction.keys[1].pubkey,
          authorizedPubkey: instruction.keys[5].pubkey
        };
      }
      /**
       * Decode an authorize stake instruction and retrieve the instruction params.
       */
      static decodeAuthorize(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        const {
          newAuthorized,
          stakeAuthorizationType
        } = decodeData$1(STAKE_INSTRUCTION_LAYOUTS.Authorize, instruction.data);
        const o = {
          stakePubkey: instruction.keys[0].pubkey,
          authorizedPubkey: instruction.keys[2].pubkey,
          newAuthorizedPubkey: new PublicKey(newAuthorized),
          stakeAuthorizationType: {
            index: stakeAuthorizationType
          }
        };
        if (instruction.keys.length > 3) {
          o.custodianPubkey = instruction.keys[3].pubkey;
        }
        return o;
      }
      /**
       * Decode an authorize-with-seed stake instruction and retrieve the instruction params.
       */
      static decodeAuthorizeWithSeed(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 2);
        const {
          newAuthorized,
          stakeAuthorizationType,
          authoritySeed,
          authorityOwner
        } = decodeData$1(STAKE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed, instruction.data);
        const o = {
          stakePubkey: instruction.keys[0].pubkey,
          authorityBase: instruction.keys[1].pubkey,
          authoritySeed,
          authorityOwner: new PublicKey(authorityOwner),
          newAuthorizedPubkey: new PublicKey(newAuthorized),
          stakeAuthorizationType: {
            index: stakeAuthorizationType
          }
        };
        if (instruction.keys.length > 3) {
          o.custodianPubkey = instruction.keys[3].pubkey;
        }
        return o;
      }
      /**
       * Decode a split stake instruction and retrieve the instruction params.
       */
      static decodeSplit(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        const {
          lamports
        } = decodeData$1(STAKE_INSTRUCTION_LAYOUTS.Split, instruction.data);
        return {
          stakePubkey: instruction.keys[0].pubkey,
          splitStakePubkey: instruction.keys[1].pubkey,
          authorizedPubkey: instruction.keys[2].pubkey,
          lamports
        };
      }
      /**
       * Decode a merge stake instruction and retrieve the instruction params.
       */
      static decodeMerge(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        decodeData$1(STAKE_INSTRUCTION_LAYOUTS.Merge, instruction.data);
        return {
          stakePubkey: instruction.keys[0].pubkey,
          sourceStakePubKey: instruction.keys[1].pubkey,
          authorizedPubkey: instruction.keys[4].pubkey
        };
      }
      /**
       * Decode a withdraw stake instruction and retrieve the instruction params.
       */
      static decodeWithdraw(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 5);
        const {
          lamports
        } = decodeData$1(STAKE_INSTRUCTION_LAYOUTS.Withdraw, instruction.data);
        const o = {
          stakePubkey: instruction.keys[0].pubkey,
          toPubkey: instruction.keys[1].pubkey,
          authorizedPubkey: instruction.keys[4].pubkey,
          lamports
        };
        if (instruction.keys.length > 5) {
          o.custodianPubkey = instruction.keys[5].pubkey;
        }
        return o;
      }
      /**
       * Decode a deactivate stake instruction and retrieve the instruction params.
       */
      static decodeDeactivate(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        decodeData$1(STAKE_INSTRUCTION_LAYOUTS.Deactivate, instruction.data);
        return {
          stakePubkey: instruction.keys[0].pubkey,
          authorizedPubkey: instruction.keys[2].pubkey
        };
      }
      /**
       * @internal
       */
      static checkProgramId(programId) {
        if (!programId.equals(StakeProgram.programId)) {
          throw new Error("invalid instruction; programId is not StakeProgram");
        }
      }
      /**
       * @internal
       */
      static checkKeyLength(keys, expectedLength) {
        if (keys.length < expectedLength) {
          throw new Error(`invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`);
        }
      }
    };
    STAKE_INSTRUCTION_LAYOUTS = Object.freeze({
      Initialize: {
        index: 0,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), authorized(), lockup()])
      },
      Authorize: {
        index: 1,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("stakeAuthorizationType")])
      },
      Delegate: {
        index: 2,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      Split: {
        index: 3,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      },
      Withdraw: {
        index: 4,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      },
      Deactivate: {
        index: 5,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      Merge: {
        index: 7,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      AuthorizeWithSeed: {
        index: 8,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("stakeAuthorizationType"), rustString("authoritySeed"), publicKey("authorityOwner")])
      }
    });
    StakeAuthorizationLayout = Object.freeze({
      Staker: {
        index: 0
      },
      Withdrawer: {
        index: 1
      }
    });
    StakeProgram = class {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Public key that identifies the Stake program
       */
      /**
       * Generate an Initialize instruction to add to a Stake Create transaction
       */
      static initialize(params) {
        const {
          stakePubkey,
          authorized: authorized2,
          lockup: maybeLockup
        } = params;
        const lockup2 = maybeLockup || Lockup.default;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Initialize;
        const data = encodeData(type2, {
          authorized: {
            staker: toBuffer(authorized2.staker.toBuffer()),
            withdrawer: toBuffer(authorized2.withdrawer.toBuffer())
          },
          lockup: {
            unixTimestamp: lockup2.unixTimestamp,
            epoch: lockup2.epoch,
            custodian: toBuffer(lockup2.custodian.toBuffer())
          }
        });
        const instructionData = {
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
      /**
       * Generate a Transaction that creates a new Stake account at
       *   an address generated with `from`, a seed, and the Stake programId
       */
      static createAccountWithSeed(params) {
        const transaction = new Transaction();
        transaction.add(SystemProgram.createAccountWithSeed({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.stakePubkey,
          basePubkey: params.basePubkey,
          seed: params.seed,
          lamports: params.lamports,
          space: this.space,
          programId: this.programId
        }));
        const {
          stakePubkey,
          authorized: authorized2,
          lockup: lockup2
        } = params;
        return transaction.add(this.initialize({
          stakePubkey,
          authorized: authorized2,
          lockup: lockup2
        }));
      }
      /**
       * Generate a Transaction that creates a new Stake account
       */
      static createAccount(params) {
        const transaction = new Transaction();
        transaction.add(SystemProgram.createAccount({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.stakePubkey,
          lamports: params.lamports,
          space: this.space,
          programId: this.programId
        }));
        const {
          stakePubkey,
          authorized: authorized2,
          lockup: lockup2
        } = params;
        return transaction.add(this.initialize({
          stakePubkey,
          authorized: authorized2,
          lockup: lockup2
        }));
      }
      /**
       * Generate a Transaction that delegates Stake tokens to a validator
       * Vote PublicKey. This transaction can also be used to redelegate Stake
       * to a new validator Vote PublicKey.
       */
      static delegate(params) {
        const {
          stakePubkey,
          authorizedPubkey,
          votePubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Delegate;
        const data = encodeData(type2);
        return new Transaction().add({
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: votePubkey,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: STAKE_CONFIG_ID,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a Transaction that authorizes a new PublicKey as Staker
       * or Withdrawer on the Stake account.
       */
      static authorize(params) {
        const {
          stakePubkey,
          authorizedPubkey,
          newAuthorizedPubkey,
          stakeAuthorizationType,
          custodianPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Authorize;
        const data = encodeData(type2, {
          newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
          stakeAuthorizationType: stakeAuthorizationType.index
        });
        const keys = [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }];
        if (custodianPubkey) {
          keys.push({
            pubkey: custodianPubkey,
            isSigner: true,
            isWritable: false
          });
        }
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a Transaction that authorizes a new PublicKey as Staker
       * or Withdrawer on the Stake account.
       */
      static authorizeWithSeed(params) {
        const {
          stakePubkey,
          authorityBase,
          authoritySeed,
          authorityOwner,
          newAuthorizedPubkey,
          stakeAuthorizationType,
          custodianPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed;
        const data = encodeData(type2, {
          newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
          stakeAuthorizationType: stakeAuthorizationType.index,
          authoritySeed,
          authorityOwner: toBuffer(authorityOwner.toBuffer())
        });
        const keys = [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: authorityBase,
          isSigner: true,
          isWritable: false
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }];
        if (custodianPubkey) {
          keys.push({
            pubkey: custodianPubkey,
            isSigner: true,
            isWritable: false
          });
        }
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * @internal
       */
      static splitInstruction(params) {
        const {
          stakePubkey,
          authorizedPubkey,
          splitStakePubkey,
          lamports
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Split;
        const data = encodeData(type2, {
          lamports
        });
        return new TransactionInstruction({
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: splitStakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a Transaction that splits Stake tokens into another stake account
       */
      static split(params, rentExemptReserve) {
        const transaction = new Transaction();
        transaction.add(SystemProgram.createAccount({
          fromPubkey: params.authorizedPubkey,
          newAccountPubkey: params.splitStakePubkey,
          lamports: rentExemptReserve,
          space: this.space,
          programId: this.programId
        }));
        return transaction.add(this.splitInstruction(params));
      }
      /**
       * Generate a Transaction that splits Stake tokens into another account
       * derived from a base public key and seed
       */
      static splitWithSeed(params, rentExemptReserve) {
        const {
          stakePubkey,
          authorizedPubkey,
          splitStakePubkey,
          basePubkey,
          seed,
          lamports
        } = params;
        const transaction = new Transaction();
        transaction.add(SystemProgram.allocate({
          accountPubkey: splitStakePubkey,
          basePubkey,
          seed,
          space: this.space,
          programId: this.programId
        }));
        if (rentExemptReserve && rentExemptReserve > 0) {
          transaction.add(SystemProgram.transfer({
            fromPubkey: params.authorizedPubkey,
            toPubkey: splitStakePubkey,
            lamports: rentExemptReserve
          }));
        }
        return transaction.add(this.splitInstruction({
          stakePubkey,
          authorizedPubkey,
          splitStakePubkey,
          lamports
        }));
      }
      /**
       * Generate a Transaction that merges Stake accounts.
       */
      static merge(params) {
        const {
          stakePubkey,
          sourceStakePubKey,
          authorizedPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Merge;
        const data = encodeData(type2);
        return new Transaction().add({
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: sourceStakePubKey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a Transaction that withdraws deactivated Stake tokens.
       */
      static withdraw(params) {
        const {
          stakePubkey,
          authorizedPubkey,
          toPubkey,
          lamports,
          custodianPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Withdraw;
        const data = encodeData(type2, {
          lamports
        });
        const keys = [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: toPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }];
        if (custodianPubkey) {
          keys.push({
            pubkey: custodianPubkey,
            isSigner: true,
            isWritable: false
          });
        }
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a Transaction that deactivates Stake tokens.
       */
      static deactivate(params) {
        const {
          stakePubkey,
          authorizedPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Deactivate;
        const data = encodeData(type2);
        return new Transaction().add({
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
    };
    StakeProgram.programId = new PublicKey("Stake11111111111111111111111111111111111111");
    StakeProgram.space = 200;
    VoteInit = class {
      /** [0, 100] */
      constructor(nodePubkey, authorizedVoter, authorizedWithdrawer, commission) {
        this.nodePubkey = void 0;
        this.authorizedVoter = void 0;
        this.authorizedWithdrawer = void 0;
        this.commission = void 0;
        this.nodePubkey = nodePubkey;
        this.authorizedVoter = authorizedVoter;
        this.authorizedWithdrawer = authorizedWithdrawer;
        this.commission = commission;
      }
    };
    VoteInstruction = class {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Decode a vote instruction and retrieve the instruction type.
       */
      static decodeInstructionType(instruction) {
        this.checkProgramId(instruction.programId);
        const instructionTypeLayout = BufferLayout.u32("instruction");
        const typeIndex = instructionTypeLayout.decode(instruction.data);
        let type2;
        for (const [ixType, layout] of Object.entries(VOTE_INSTRUCTION_LAYOUTS)) {
          if (layout.index == typeIndex) {
            type2 = ixType;
            break;
          }
        }
        if (!type2) {
          throw new Error("Instruction type incorrect; not a VoteInstruction");
        }
        return type2;
      }
      /**
       * Decode an initialize vote instruction and retrieve the instruction params.
       */
      static decodeInitializeAccount(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 4);
        const {
          voteInit: voteInit2
        } = decodeData$1(VOTE_INSTRUCTION_LAYOUTS.InitializeAccount, instruction.data);
        return {
          votePubkey: instruction.keys[0].pubkey,
          nodePubkey: instruction.keys[3].pubkey,
          voteInit: new VoteInit(new PublicKey(voteInit2.nodePubkey), new PublicKey(voteInit2.authorizedVoter), new PublicKey(voteInit2.authorizedWithdrawer), voteInit2.commission)
        };
      }
      /**
       * Decode an authorize instruction and retrieve the instruction params.
       */
      static decodeAuthorize(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        const {
          newAuthorized,
          voteAuthorizationType
        } = decodeData$1(VOTE_INSTRUCTION_LAYOUTS.Authorize, instruction.data);
        return {
          votePubkey: instruction.keys[0].pubkey,
          authorizedPubkey: instruction.keys[2].pubkey,
          newAuthorizedPubkey: new PublicKey(newAuthorized),
          voteAuthorizationType: {
            index: voteAuthorizationType
          }
        };
      }
      /**
       * Decode an authorize instruction and retrieve the instruction params.
       */
      static decodeAuthorizeWithSeed(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        const {
          voteAuthorizeWithSeedArgs: {
            currentAuthorityDerivedKeyOwnerPubkey,
            currentAuthorityDerivedKeySeed,
            newAuthorized,
            voteAuthorizationType
          }
        } = decodeData$1(VOTE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed, instruction.data);
        return {
          currentAuthorityDerivedKeyBasePubkey: instruction.keys[2].pubkey,
          currentAuthorityDerivedKeyOwnerPubkey: new PublicKey(currentAuthorityDerivedKeyOwnerPubkey),
          currentAuthorityDerivedKeySeed,
          newAuthorizedPubkey: new PublicKey(newAuthorized),
          voteAuthorizationType: {
            index: voteAuthorizationType
          },
          votePubkey: instruction.keys[0].pubkey
        };
      }
      /**
       * Decode a withdraw instruction and retrieve the instruction params.
       */
      static decodeWithdraw(instruction) {
        this.checkProgramId(instruction.programId);
        this.checkKeyLength(instruction.keys, 3);
        const {
          lamports
        } = decodeData$1(VOTE_INSTRUCTION_LAYOUTS.Withdraw, instruction.data);
        return {
          votePubkey: instruction.keys[0].pubkey,
          authorizedWithdrawerPubkey: instruction.keys[2].pubkey,
          lamports,
          toPubkey: instruction.keys[1].pubkey
        };
      }
      /**
       * @internal
       */
      static checkProgramId(programId) {
        if (!programId.equals(VoteProgram.programId)) {
          throw new Error("invalid instruction; programId is not VoteProgram");
        }
      }
      /**
       * @internal
       */
      static checkKeyLength(keys, expectedLength) {
        if (keys.length < expectedLength) {
          throw new Error(`invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`);
        }
      }
    };
    VOTE_INSTRUCTION_LAYOUTS = Object.freeze({
      InitializeAccount: {
        index: 0,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), voteInit()])
      },
      Authorize: {
        index: 1,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("voteAuthorizationType")])
      },
      Withdraw: {
        index: 3,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      },
      UpdateValidatorIdentity: {
        index: 4,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      AuthorizeWithSeed: {
        index: 10,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), voteAuthorizeWithSeedArgs()])
      }
    });
    VoteAuthorizationLayout = Object.freeze({
      Voter: {
        index: 0
      },
      Withdrawer: {
        index: 1
      }
    });
    VoteProgram = class _VoteProgram {
      /**
       * @internal
       */
      constructor() {
      }
      /**
       * Public key that identifies the Vote program
       */
      /**
       * Generate an Initialize instruction.
       */
      static initializeAccount(params) {
        const {
          votePubkey,
          nodePubkey,
          voteInit: voteInit2
        } = params;
        const type2 = VOTE_INSTRUCTION_LAYOUTS.InitializeAccount;
        const data = encodeData(type2, {
          voteInit: {
            nodePubkey: toBuffer(voteInit2.nodePubkey.toBuffer()),
            authorizedVoter: toBuffer(voteInit2.authorizedVoter.toBuffer()),
            authorizedWithdrawer: toBuffer(voteInit2.authorizedWithdrawer.toBuffer()),
            commission: voteInit2.commission
          }
        });
        const instructionData = {
          keys: [{
            pubkey: votePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: nodePubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
      /**
       * Generate a transaction that creates a new Vote account.
       */
      static createAccount(params) {
        const transaction = new Transaction();
        transaction.add(SystemProgram.createAccount({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.votePubkey,
          lamports: params.lamports,
          space: this.space,
          programId: this.programId
        }));
        return transaction.add(this.initializeAccount({
          votePubkey: params.votePubkey,
          nodePubkey: params.voteInit.nodePubkey,
          voteInit: params.voteInit
        }));
      }
      /**
       * Generate a transaction that authorizes a new Voter or Withdrawer on the Vote account.
       */
      static authorize(params) {
        const {
          votePubkey,
          authorizedPubkey,
          newAuthorizedPubkey,
          voteAuthorizationType
        } = params;
        const type2 = VOTE_INSTRUCTION_LAYOUTS.Authorize;
        const data = encodeData(type2, {
          newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
          voteAuthorizationType: voteAuthorizationType.index
        });
        const keys = [{
          pubkey: votePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }];
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction that authorizes a new Voter or Withdrawer on the Vote account
       * where the current Voter or Withdrawer authority is a derived key.
       */
      static authorizeWithSeed(params) {
        const {
          currentAuthorityDerivedKeyBasePubkey,
          currentAuthorityDerivedKeyOwnerPubkey,
          currentAuthorityDerivedKeySeed,
          newAuthorizedPubkey,
          voteAuthorizationType,
          votePubkey
        } = params;
        const type2 = VOTE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed;
        const data = encodeData(type2, {
          voteAuthorizeWithSeedArgs: {
            currentAuthorityDerivedKeyOwnerPubkey: toBuffer(currentAuthorityDerivedKeyOwnerPubkey.toBuffer()),
            currentAuthorityDerivedKeySeed,
            newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
            voteAuthorizationType: voteAuthorizationType.index
          }
        });
        const keys = [{
          pubkey: votePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: currentAuthorityDerivedKeyBasePubkey,
          isSigner: true,
          isWritable: false
        }];
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction to withdraw from a Vote account.
       */
      static withdraw(params) {
        const {
          votePubkey,
          authorizedWithdrawerPubkey,
          lamports,
          toPubkey
        } = params;
        const type2 = VOTE_INSTRUCTION_LAYOUTS.Withdraw;
        const data = encodeData(type2, {
          lamports
        });
        const keys = [{
          pubkey: votePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: toPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: authorizedWithdrawerPubkey,
          isSigner: true,
          isWritable: false
        }];
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      /**
       * Generate a transaction to withdraw safely from a Vote account.
       *
       * This function was created as a safeguard for vote accounts running validators, `safeWithdraw`
       * checks that the withdraw amount will not exceed the specified balance while leaving enough left
       * to cover rent. If you wish to close the vote account by withdrawing the full amount, call the
       * `withdraw` method directly.
       */
      static safeWithdraw(params, currentVoteAccountBalance, rentExemptMinimum) {
        if (params.lamports > currentVoteAccountBalance - rentExemptMinimum) {
          throw new Error("Withdraw will leave vote account with insufficient funds.");
        }
        return _VoteProgram.withdraw(params);
      }
      /**
       * Generate a transaction to update the validator identity (node pubkey) of a Vote account.
       */
      static updateValidatorIdentity(params) {
        const {
          votePubkey,
          authorizedWithdrawerPubkey,
          nodePubkey
        } = params;
        const type2 = VOTE_INSTRUCTION_LAYOUTS.UpdateValidatorIdentity;
        const data = encodeData(type2);
        const keys = [{
          pubkey: votePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: nodePubkey,
          isSigner: true,
          isWritable: false
        }, {
          pubkey: authorizedWithdrawerPubkey,
          isSigner: true,
          isWritable: false
        }];
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
    };
    VoteProgram.programId = new PublicKey("Vote111111111111111111111111111111111111111");
    VoteProgram.space = 3762;
    VALIDATOR_INFO_KEY = new PublicKey("Va1idator1nfo111111111111111111111111111111");
    InfoString = type({
      name: string(),
      website: optional(string()),
      details: optional(string()),
      iconUrl: optional(string()),
      keybaseUsername: optional(string())
    });
    ValidatorInfo = class _ValidatorInfo {
      /**
       * Construct a valid ValidatorInfo
       *
       * @param key validator public key
       * @param info validator information
       */
      constructor(key, info) {
        this.key = void 0;
        this.info = void 0;
        this.key = key;
        this.info = info;
      }
      /**
       * Deserialize ValidatorInfo from the config account data. Exactly two config
       * keys are required in the data.
       *
       * @param buffer config account data
       * @return null if info was not found
       */
      static fromConfigData(buffer) {
        let byteArray = [...buffer];
        const configKeyCount = decodeLength(byteArray);
        if (configKeyCount !== 2) return null;
        const configKeys = [];
        for (let i = 0; i < 2; i++) {
          const publicKey2 = new PublicKey(guardedSplice(byteArray, 0, PUBLIC_KEY_LENGTH));
          const isSigner = guardedShift(byteArray) === 1;
          configKeys.push({
            publicKey: publicKey2,
            isSigner
          });
        }
        if (configKeys[0].publicKey.equals(VALIDATOR_INFO_KEY)) {
          if (configKeys[1].isSigner) {
            const rawInfo = rustString().decode(import_buffer2.Buffer.from(byteArray));
            const info = JSON.parse(rawInfo);
            assert(info, InfoString);
            return new _ValidatorInfo(configKeys[1].publicKey, info);
          }
        }
        return null;
      }
    };
    VOTE_PROGRAM_ID = new PublicKey("Vote111111111111111111111111111111111111111");
    VoteAccountLayout = BufferLayout.struct([
      publicKey("nodePubkey"),
      publicKey("authorizedWithdrawer"),
      BufferLayout.u8("commission"),
      BufferLayout.nu64(),
      // votes.length
      BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("slot"), BufferLayout.u32("confirmationCount")]), BufferLayout.offset(BufferLayout.u32(), -8), "votes"),
      BufferLayout.u8("rootSlotValid"),
      BufferLayout.nu64("rootSlot"),
      BufferLayout.nu64(),
      // authorizedVoters.length
      BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("epoch"), publicKey("authorizedVoter")]), BufferLayout.offset(BufferLayout.u32(), -8), "authorizedVoters"),
      BufferLayout.struct([BufferLayout.seq(BufferLayout.struct([publicKey("authorizedPubkey"), BufferLayout.nu64("epochOfLastAuthorizedSwitch"), BufferLayout.nu64("targetEpoch")]), 32, "buf"), BufferLayout.nu64("idx"), BufferLayout.u8("isEmpty")], "priorVoters"),
      BufferLayout.nu64(),
      // epochCredits.length
      BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("epoch"), BufferLayout.nu64("credits"), BufferLayout.nu64("prevCredits")]), BufferLayout.offset(BufferLayout.u32(), -8), "epochCredits"),
      BufferLayout.struct([BufferLayout.nu64("slot"), BufferLayout.nu64("timestamp")], "lastTimestamp")
    ]);
    VoteAccount = class _VoteAccount {
      /**
       * @internal
       */
      constructor(args) {
        this.nodePubkey = void 0;
        this.authorizedWithdrawer = void 0;
        this.commission = void 0;
        this.rootSlot = void 0;
        this.votes = void 0;
        this.authorizedVoters = void 0;
        this.priorVoters = void 0;
        this.epochCredits = void 0;
        this.lastTimestamp = void 0;
        this.nodePubkey = args.nodePubkey;
        this.authorizedWithdrawer = args.authorizedWithdrawer;
        this.commission = args.commission;
        this.rootSlot = args.rootSlot;
        this.votes = args.votes;
        this.authorizedVoters = args.authorizedVoters;
        this.priorVoters = args.priorVoters;
        this.epochCredits = args.epochCredits;
        this.lastTimestamp = args.lastTimestamp;
      }
      /**
       * Deserialize VoteAccount from the account data.
       *
       * @param buffer account data
       * @return VoteAccount
       */
      static fromAccountData(buffer) {
        const versionOffset = 4;
        const va = VoteAccountLayout.decode(toBuffer(buffer), versionOffset);
        let rootSlot = va.rootSlot;
        if (!va.rootSlotValid) {
          rootSlot = null;
        }
        return new _VoteAccount({
          nodePubkey: new PublicKey(va.nodePubkey),
          authorizedWithdrawer: new PublicKey(va.authorizedWithdrawer),
          commission: va.commission,
          votes: va.votes,
          rootSlot,
          authorizedVoters: va.authorizedVoters.map(parseAuthorizedVoter),
          priorVoters: getPriorVoters(va.priorVoters),
          epochCredits: va.epochCredits,
          lastTimestamp: va.lastTimestamp
        });
      }
    };
    endpoint = {
      http: {
        devnet: "http://api.devnet.solana.com",
        testnet: "http://api.testnet.solana.com",
        "mainnet-beta": "http://api.mainnet-beta.solana.com/"
      },
      https: {
        devnet: "https://api.devnet.solana.com",
        testnet: "https://api.testnet.solana.com",
        "mainnet-beta": "https://api.mainnet-beta.solana.com/"
      }
    };
    LAMPORTS_PER_SOL = 1e9;
  }
});

export {
  require_base64_js,
  require_ieee754,
  require_buffer2 as require_buffer,
  ed25519,
  init_ed25519,
  require_safe_buffer,
  require_bs58,
  v4_default,
  esm_browser_exports,
  init_esm_browser,
  Struct2 as Struct,
  Enum,
  SOLANA_SCHEMA,
  MAX_SEED_LENGTH,
  PUBLIC_KEY_LENGTH,
  PublicKey,
  Account,
  BPF_LOADER_DEPRECATED_PROGRAM_ID,
  PACKET_DATA_SIZE,
  VERSION_PREFIX_MASK,
  SIGNATURE_LENGTH_IN_BYTES,
  TransactionExpiredBlockheightExceededError,
  TransactionExpiredTimeoutError,
  TransactionExpiredNonceInvalidError,
  MessageAccountKeys,
  Message,
  MessageV0,
  VersionedMessage,
  TransactionStatus,
  TransactionInstruction,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_EPOCH_SCHEDULE_PUBKEY,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_REWARDS_PUBKEY,
  SYSVAR_SLOT_HASHES_PUBKEY,
  SYSVAR_SLOT_HISTORY_PUBKEY,
  SYSVAR_STAKE_HISTORY_PUBKEY,
  SendTransactionError,
  SolanaJSONRPCErrorCode,
  SolanaJSONRPCError,
  sendAndConfirmTransaction,
  FeeCalculatorLayout,
  NONCE_ACCOUNT_LENGTH,
  NonceAccount,
  SystemInstruction,
  SYSTEM_INSTRUCTION_LAYOUTS,
  SystemProgram,
  Loader,
  BPF_LOADER_PROGRAM_ID,
  BpfLoader,
  EpochSchedule,
  AddressLookupTableAccount,
  BLOCKHASH_CACHE_TIMEOUT_MS,
  Connection,
  Keypair,
  LOOKUP_TABLE_INSTRUCTION_LAYOUTS,
  AddressLookupTableInstruction,
  AddressLookupTableProgram,
  ComputeBudgetInstruction,
  COMPUTE_BUDGET_INSTRUCTION_LAYOUTS,
  ComputeBudgetProgram,
  Ed25519Program,
  Secp256k1Program,
  STAKE_CONFIG_ID,
  Authorized,
  Lockup,
  StakeInstruction,
  STAKE_INSTRUCTION_LAYOUTS,
  StakeAuthorizationLayout,
  StakeProgram,
  VoteInit,
  VoteInstruction,
  VoteAuthorizationLayout,
  VoteProgram,
  VALIDATOR_INFO_KEY,
  ValidatorInfo,
  VOTE_PROGRAM_ID,
  VoteAccount,
  clusterApiUrl,
  sendAndConfirmRawTransaction,
  LAMPORTS_PER_SOL,
  index_browser_esm_exports,
  init_index_browser_esm
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/curves/esm/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/montgomery.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

@solana/buffer-layout/lib/Layout.js:
  (**
   * Support for translating between Uint8Array instances and JavaScript
   * native types.
   *
   * {@link module:Layout~Layout|Layout} is the basis of a class
   * hierarchy that associates property names with sequences of encoded
   * bytes.
   *
   * Layouts are supported for these scalar (numeric) types:
   * * {@link module:Layout~UInt|Unsigned integers in little-endian
   *   format} with {@link module:Layout.u8|8-bit}, {@link
   *   module:Layout.u16|16-bit}, {@link module:Layout.u24|24-bit},
   *   {@link module:Layout.u32|32-bit}, {@link
   *   module:Layout.u40|40-bit}, and {@link module:Layout.u48|48-bit}
   *   representation ranges;
   * * {@link module:Layout~UIntBE|Unsigned integers in big-endian
   *   format} with {@link module:Layout.u16be|16-bit}, {@link
   *   module:Layout.u24be|24-bit}, {@link module:Layout.u32be|32-bit},
   *   {@link module:Layout.u40be|40-bit}, and {@link
   *   module:Layout.u48be|48-bit} representation ranges;
   * * {@link module:Layout~Int|Signed integers in little-endian
   *   format} with {@link module:Layout.s8|8-bit}, {@link
   *   module:Layout.s16|16-bit}, {@link module:Layout.s24|24-bit},
   *   {@link module:Layout.s32|32-bit}, {@link
   *   module:Layout.s40|40-bit}, and {@link module:Layout.s48|48-bit}
   *   representation ranges;
   * * {@link module:Layout~IntBE|Signed integers in big-endian format}
   *   with {@link module:Layout.s16be|16-bit}, {@link
   *   module:Layout.s24be|24-bit}, {@link module:Layout.s32be|32-bit},
   *   {@link module:Layout.s40be|40-bit}, and {@link
   *   module:Layout.s48be|48-bit} representation ranges;
   * * 64-bit integral values that decode to an exact (if magnitude is
   *   less than 2^53) or nearby integral Number in {@link
   *   module:Layout.nu64|unsigned little-endian}, {@link
   *   module:Layout.nu64be|unsigned big-endian}, {@link
   *   module:Layout.ns64|signed little-endian}, and {@link
   *   module:Layout.ns64be|unsigned big-endian} encodings;
   * * 32-bit floating point values with {@link
   *   module:Layout.f32|little-endian} and {@link
   *   module:Layout.f32be|big-endian} representations;
   * * 64-bit floating point values with {@link
   *   module:Layout.f64|little-endian} and {@link
   *   module:Layout.f64be|big-endian} representations;
   * * {@link module:Layout.const|Constants} that take no space in the
   *   encoded expression.
   *
   * and for these aggregate types:
   * * {@link module:Layout.seq|Sequence}s of instances of a {@link
   *   module:Layout~Layout|Layout}, with JavaScript representation as
   *   an Array and constant or data-dependent {@link
   *   module:Layout~Sequence#count|length};
   * * {@link module:Layout.struct|Structure}s that aggregate a
   *   heterogeneous sequence of {@link module:Layout~Layout|Layout}
   *   instances, with JavaScript representation as an Object;
   * * {@link module:Layout.union|Union}s that support multiple {@link
   *   module:Layout~VariantLayout|variant layouts} over a fixed
   *   (padded) or variable (not padded) span of bytes, using an
   *   unsigned integer at the start of the data or a separate {@link
   *   module:Layout.unionLayoutDiscriminator|layout element} to
   *   determine which layout to use when interpreting the buffer
   *   contents;
   * * {@link module:Layout.bits|BitStructure}s that contain a sequence
   *   of individual {@link
   *   module:Layout~BitStructure#addField|BitField}s packed into an 8,
   *   16, 24, or 32-bit unsigned integer starting at the least- or
   *   most-significant bit;
   * * {@link module:Layout.cstr|C strings} of varying length;
   * * {@link module:Layout.blob|Blobs} of fixed- or variable-{@link
   *   module:Layout~Blob#length|length} raw data.
   *
   * All {@link module:Layout~Layout|Layout} instances are immutable
   * after construction, to prevent internal state from becoming
   * inconsistent.
   *
   * @local Layout
   * @local ExternalLayout
   * @local GreedyCount
   * @local OffsetLayout
   * @local UInt
   * @local UIntBE
   * @local Int
   * @local IntBE
   * @local NearUInt64
   * @local NearUInt64BE
   * @local NearInt64
   * @local NearInt64BE
   * @local Float
   * @local FloatBE
   * @local Double
   * @local DoubleBE
   * @local Sequence
   * @local Structure
   * @local UnionDiscriminator
   * @local UnionLayoutDiscriminator
   * @local Union
   * @local VariantLayout
   * @local BitStructure
   * @local BitField
   * @local Boolean
   * @local Blob
   * @local CString
   * @local Constant
   * @local bindConstructorLayout
   * @module Layout
   * @license MIT
   * @author Peter A. Bigot
   * @see {@link https://github.com/pabigot/buffer-layout|buffer-layout on GitHub}
   *)
*/
//# sourceMappingURL=chunk-5NC5FW7O.js.map

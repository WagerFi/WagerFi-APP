import {
  require_crypto
} from "./chunk-N77D4CVZ.js";
import {
  require_events
} from "./chunk-SQBP2HP4.js";
import {
  Connection,
  PublicKey,
  Transaction,
  init_esm_browser,
  init_index_browser_esm,
  require_bs58,
  require_buffer,
  v4_default
} from "./chunk-5NC5FW7O.js";
import "./chunk-KPHJQWGP.js";
import "./chunk-IBWGIHRU.js";
import "./chunk-VESSVHNC.js";
import "./chunk-Y5D73FR4.js";
import "./chunk-IJLNJGDT.js";
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-MVEJMUOB.js";

// node_modules/crypto-js/core.js
var require_core = __commonJS({
  "node_modules/crypto-js/core.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.CryptoJS = factory();
      }
    })(exports, function() {
      var CryptoJS3 = CryptoJS3 || function(Math2, undefined2) {
        var crypto;
        if (typeof window !== "undefined" && window.crypto) {
          crypto = window.crypto;
        }
        if (typeof self !== "undefined" && self.crypto) {
          crypto = self.crypto;
        }
        if (typeof globalThis !== "undefined" && globalThis.crypto) {
          crypto = globalThis.crypto;
        }
        if (!crypto && typeof window !== "undefined" && window.msCrypto) {
          crypto = window.msCrypto;
        }
        if (!crypto && typeof global !== "undefined" && global.crypto) {
          crypto = global.crypto;
        }
        if (!crypto && typeof __require === "function") {
          try {
            crypto = require_crypto();
          } catch (err) {
          }
        }
        var cryptoSecureRandomInt = function() {
          if (crypto) {
            if (typeof crypto.getRandomValues === "function") {
              try {
                return crypto.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {
              }
            }
            if (typeof crypto.randomBytes === "function") {
              try {
                return crypto.randomBytes(4).readInt32LE();
              } catch (err) {
              }
            }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        };
        var create = Object.create || /* @__PURE__ */ function() {
          function F() {
          }
          return function(obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
        var C = {};
        var C_lib = C.lib = {};
        var Base2 = C_lib.Base = /* @__PURE__ */ function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(overrides) {
              var subtype = create(this);
              if (overrides) {
                subtype.mixIn(overrides);
              }
              if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                };
              }
              subtype.init.prototype = subtype;
              subtype.$super = this;
              return subtype;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              }
              if (properties.hasOwnProperty("toString")) {
                this.toString = properties.toString;
              }
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray = C_lib.WordArray = Base2.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined2) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 4;
            }
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(encoder) {
            return (encoder || Hex).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              }
            } else {
              for (var j = 0; j < thatSigBytes; j += 4) {
                thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;
            return this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math2.ceil(sigBytes / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var clone = Base2.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
              words.push(cryptoSecureRandomInt());
            }
            return new WordArray.init(words, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
              words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }
            return new WordArray.init(words, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
              words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }
            return new WordArray.init(words, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base2.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(data) {
            if (typeof data == "string") {
              data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(doFlush) {
            var processedWords;
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
              nBlocksReady = Math2.ceil(nBlocksReady);
            } else {
              nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                this._doProcessBlock(dataWords, offset);
              }
              processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var clone = Base2.clone.call(this);
            clone._data = this._data.clone();
            return clone;
          },
          _minBufferSize: 0
        });
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
          /**
           * Configuration options.
           */
          cfg: Base2.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(messageUpdate) {
            if (messageUpdate) {
              this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
          },
          blockSize: 512 / 32,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function(hasher) {
            return function(message, key) {
              return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
          }
        });
        var C_algo = C.algo = {};
        return C;
      }(Math);
      return CryptoJS3;
    });
  }
});

// node_modules/crypto-js/x64-core.js
var require_x64_core = __commonJS({
  "node_modules/crypto-js/x64-core.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function(undefined2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var Base2 = C_lib.Base;
        var X32WordArray = C_lib.WordArray;
        var C_x64 = C.x64 = {};
        var X64Word = C_x64.Word = Base2.extend({
          /**
           * Initializes a newly created 64-bit word.
           *
           * @param {number} high The high 32 bits.
           * @param {number} low The low 32 bits.
           *
           * @example
           *
           *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
           */
          init: function(high, low) {
            this.high = high;
            this.low = low;
          }
          /**
           * Bitwise NOTs this word.
           *
           * @return {X64Word} A new x64-Word object after negating.
           *
           * @example
           *
           *     var negated = x64Word.not();
           */
          // not: function () {
          // var high = ~this.high;
          // var low = ~this.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ANDs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to AND with this word.
           *
           * @return {X64Word} A new x64-Word object after ANDing.
           *
           * @example
           *
           *     var anded = x64Word.and(anotherX64Word);
           */
          // and: function (word) {
          // var high = this.high & word.high;
          // var low = this.low & word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to OR with this word.
           *
           * @return {X64Word} A new x64-Word object after ORing.
           *
           * @example
           *
           *     var ored = x64Word.or(anotherX64Word);
           */
          // or: function (word) {
          // var high = this.high | word.high;
          // var low = this.low | word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise XORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to XOR with this word.
           *
           * @return {X64Word} A new x64-Word object after XORing.
           *
           * @example
           *
           *     var xored = x64Word.xor(anotherX64Word);
           */
          // xor: function (word) {
          // var high = this.high ^ word.high;
          // var low = this.low ^ word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the left.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftL(25);
           */
          // shiftL: function (n) {
          // if (n < 32) {
          // var high = (this.high << n) | (this.low >>> (32 - n));
          // var low = this.low << n;
          // } else {
          // var high = this.low << (n - 32);
          // var low = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the right.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftR(7);
           */
          // shiftR: function (n) {
          // if (n < 32) {
          // var low = (this.low >>> n) | (this.high << (32 - n));
          // var high = this.high >>> n;
          // } else {
          // var low = this.high >>> (n - 32);
          // var high = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Rotates this word n bits to the left.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotL(25);
           */
          // rotL: function (n) {
          // return this.shiftL(n).or(this.shiftR(64 - n));
          // },
          /**
           * Rotates this word n bits to the right.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotR(7);
           */
          // rotR: function (n) {
          // return this.shiftR(n).or(this.shiftL(64 - n));
          // },
          /**
           * Adds this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to add with this word.
           *
           * @return {X64Word} A new x64-Word object after adding.
           *
           * @example
           *
           *     var added = x64Word.add(anotherX64Word);
           */
          // add: function (word) {
          // var low = (this.low + word.low) | 0;
          // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
          // var high = (this.high + word.high + carry) | 0;
          // return X64Word.create(high, low);
          // }
        });
        var X64WordArray = C_x64.WordArray = Base2.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.x64.WordArray.create();
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ]);
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ], 10);
           */
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined2) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 8;
            }
          },
          /**
           * Converts this 64-bit word array to a 32-bit word array.
           *
           * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
           *
           * @example
           *
           *     var x32WordArray = x64WordArray.toX32();
           */
          toX32: function() {
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
              var x64Word = x64Words[i];
              x32Words.push(x64Word.high);
              x32Words.push(x64Word.low);
            }
            return X32WordArray.create(x32Words, this.sigBytes);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {X64WordArray} The clone.
           *
           * @example
           *
           *     var clone = x64WordArray.clone();
           */
          clone: function() {
            var clone = Base2.clone.call(this);
            var words = clone.words = this.words.slice(0);
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) {
              words[i] = words[i].clone();
            }
            return clone;
          }
        });
      })();
      return CryptoJS3;
    });
  }
});

// node_modules/crypto-js/lib-typedarrays.js
var require_lib_typedarrays = __commonJS({
  "node_modules/crypto-js/lib-typedarrays.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        if (typeof ArrayBuffer != "function") {
          return;
        }
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function(typedArray) {
          if (typedArray instanceof ArrayBuffer) {
            typedArray = new Uint8Array(typedArray);
          }
          if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
          }
          if (typedArray instanceof Uint8Array) {
            var typedArrayByteLength = typedArray.byteLength;
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) {
              words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
            }
            superInit.call(this, words, typedArrayByteLength);
          } else {
            superInit.apply(this, arguments);
          }
        };
        subInit.prototype = WordArray;
      })();
      return CryptoJS3.lib.WordArray;
    });
  }
});

// node_modules/crypto-js/enc-utf16.js
var require_enc_utf16 = __commonJS({
  "node_modules/crypto-js/enc-utf16.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
          /**
           * Converts a word array to a UTF-16 BE string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-16 BE string.
           *
           * @static
           *
           * @example
           *
           *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          /**
           * Converts a UTF-16 BE string to a word array.
           *
           * @param {string} utf16Str The UTF-16 BE string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
           */
          parse: function(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) {
              words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
            }
            return WordArray.create(words, utf16StrLength * 2);
          }
        };
        C_enc.Utf16LE = {
          /**
           * Converts a word array to a UTF-16 LE string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-16 LE string.
           *
           * @static
           *
           * @example
           *
           *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          /**
           * Converts a UTF-16 LE string to a word array.
           *
           * @param {string} utf16Str The UTF-16 LE string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
           */
          parse: function(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) {
              words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
            }
            return WordArray.create(words, utf16StrLength * 2);
          }
        };
        function swapEndian(word) {
          return word << 8 & 4278255360 | word >>> 8 & 16711935;
        }
      })();
      return CryptoJS3.enc.Utf16;
    });
  }
});

// node_modules/crypto-js/enc-base64.js
var require_enc_base64 = __commonJS({
  "node_modules/crypto-js/enc-base64.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
          /**
           * Converts a word array to a Base64 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Base64 string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
              }
            }
            return base64Chars.join("");
          },
          /**
           * Converts a Base64 string to a word array.
           *
           * @param {string} base64Str The Base64 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
           */
          parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
              }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
              var bitsCombined = bits1 | bits2;
              words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
              nBytes++;
            }
          }
          return WordArray.create(words, nBytes);
        }
      })();
      return CryptoJS3.enc.Base64;
    });
  }
});

// node_modules/crypto-js/enc-base64url.js
var require_enc_base64url = __commonJS({
  "node_modules/crypto-js/enc-base64url.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64url = C_enc.Base64url = {
          /**
           * Converts a word array to a Base64url string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @param {boolean} urlSafe Whether to use url safe
           *
           * @return {string} The Base64url string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
           */
          stringify: function(wordArray, urlSafe) {
            if (urlSafe === void 0) {
              urlSafe = true;
            }
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = urlSafe ? this._safe_map : this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
              }
            }
            return base64Chars.join("");
          },
          /**
           * Converts a Base64url string to a word array.
           *
           * @param {string} base64Str The Base64url string.
           *
           * @param {boolean} urlSafe Whether to use url safe
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
           */
          parse: function(base64Str, urlSafe) {
            if (urlSafe === void 0) {
              urlSafe = true;
            }
            var base64StrLength = base64Str.length;
            var map = urlSafe ? this._safe_map : this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
              }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
              var bitsCombined = bits1 | bits2;
              words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
              nBytes++;
            }
          }
          return WordArray.create(words, nBytes);
        }
      })();
      return CryptoJS3.enc.Base64url;
    });
  }
});

// node_modules/crypto-js/md5.js
var require_md5 = __commonJS({
  "node_modules/crypto-js/md5.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function(Math2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function() {
          for (var i = 0; i < 64; i++) {
            T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
          }
        })();
        var MD5 = C_algo.MD5 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
              var H_i = H[i];
              H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function FF(a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function GG(a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function HH(a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function II(a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
      })(Math);
      return CryptoJS3.MD5;
    });
  }
});

// node_modules/crypto-js/sha1.js
var require_sha1 = __commonJS({
  "node_modules/crypto-js/sha1.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            for (var i = 0; i < 80; i++) {
              if (i < 16) {
                W[i] = M[offset + i] | 0;
              } else {
                var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = n << 1 | n >>> 31;
              }
              var t = (a << 5 | a >>> 27) + e + W[i];
              if (i < 20) {
                t += (b & c | ~b & d) + 1518500249;
              } else if (i < 40) {
                t += (b ^ c ^ d) + 1859775393;
              } else if (i < 60) {
                t += (b & c | b & d | c & d) - 1894007588;
              } else {
                t += (b ^ c ^ d) - 899497514;
              }
              e = d;
              d = c;
              c = b << 30 | b >>> 2;
              b = a;
              a = t;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
      })();
      return CryptoJS3.SHA1;
    });
  }
});

// node_modules/crypto-js/sha256.js
var require_sha256 = __commonJS({
  "node_modules/crypto-js/sha256.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function(Math2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
          function isPrime(n2) {
            var sqrtN = Math2.sqrt(n2);
            for (var factor = 2; factor <= sqrtN; factor++) {
              if (!(n2 % factor)) {
                return false;
              }
            }
            return true;
          }
          function getFractionalBits(n2) {
            return (n2 - (n2 | 0)) * 4294967296 | 0;
          }
          var n = 2;
          var nPrime = 0;
          while (nPrime < 64) {
            if (isPrime(n)) {
              if (nPrime < 8) {
                H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
              }
              K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
              nPrime++;
            }
            n++;
          }
        })();
        var W = [];
        var SHA256 = C_algo.SHA256 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init(H.slice(0));
          },
          _doProcessBlock: function(M, offset) {
            var H2 = this._hash.words;
            var a = H2[0];
            var b = H2[1];
            var c = H2[2];
            var d = H2[3];
            var e = H2[4];
            var f = H2[5];
            var g = H2[6];
            var h = H2[7];
            for (var i = 0; i < 64; i++) {
              if (i < 16) {
                W[i] = M[offset + i] | 0;
              } else {
                var gamma0x = W[i - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
              }
              var ch = e & f ^ ~e & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
              var t1 = h + sigma1 + ch + K[i] + W[i];
              var t2 = sigma0 + maj;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            H2[0] = H2[0] + a | 0;
            H2[1] = H2[1] + b | 0;
            H2[2] = H2[2] + c | 0;
            H2[3] = H2[3] + d | 0;
            H2[4] = H2[4] + e | 0;
            H2[5] = H2[5] + f | 0;
            H2[6] = H2[6] + g | 0;
            H2[7] = H2[7] + h | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA256 = Hasher._createHelper(SHA256);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
      })(Math);
      return CryptoJS3.SHA256;
    });
  }
});

// node_modules/crypto-js/sha224.js
var require_sha224 = __commonJS({
  "node_modules/crypto-js/sha224.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_sha256());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha256"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var SHA224 = C_algo.SHA224 = SHA256.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              3238371032,
              914150663,
              812702999,
              4144912697,
              4290775857,
              1750603025,
              1694076839,
              3204075428
            ]);
          },
          _doFinalize: function() {
            var hash = SHA256._doFinalize.call(this);
            hash.sigBytes -= 4;
            return hash;
          }
        });
        C.SHA224 = SHA256._createHelper(SHA224);
        C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
      })();
      return CryptoJS3.SHA224;
    });
  }
});

// node_modules/crypto-js/sha512.js
var require_sha512 = __commonJS({
  "node_modules/crypto-js/sha512.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_x64_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        function X64Word_create() {
          return X64Word.create.apply(X64Word, arguments);
        }
        var K = [
          X64Word_create(1116352408, 3609767458),
          X64Word_create(1899447441, 602891725),
          X64Word_create(3049323471, 3964484399),
          X64Word_create(3921009573, 2173295548),
          X64Word_create(961987163, 4081628472),
          X64Word_create(1508970993, 3053834265),
          X64Word_create(2453635748, 2937671579),
          X64Word_create(2870763221, 3664609560),
          X64Word_create(3624381080, 2734883394),
          X64Word_create(310598401, 1164996542),
          X64Word_create(607225278, 1323610764),
          X64Word_create(1426881987, 3590304994),
          X64Word_create(1925078388, 4068182383),
          X64Word_create(2162078206, 991336113),
          X64Word_create(2614888103, 633803317),
          X64Word_create(3248222580, 3479774868),
          X64Word_create(3835390401, 2666613458),
          X64Word_create(4022224774, 944711139),
          X64Word_create(264347078, 2341262773),
          X64Word_create(604807628, 2007800933),
          X64Word_create(770255983, 1495990901),
          X64Word_create(1249150122, 1856431235),
          X64Word_create(1555081692, 3175218132),
          X64Word_create(1996064986, 2198950837),
          X64Word_create(2554220882, 3999719339),
          X64Word_create(2821834349, 766784016),
          X64Word_create(2952996808, 2566594879),
          X64Word_create(3210313671, 3203337956),
          X64Word_create(3336571891, 1034457026),
          X64Word_create(3584528711, 2466948901),
          X64Word_create(113926993, 3758326383),
          X64Word_create(338241895, 168717936),
          X64Word_create(666307205, 1188179964),
          X64Word_create(773529912, 1546045734),
          X64Word_create(1294757372, 1522805485),
          X64Word_create(1396182291, 2643833823),
          X64Word_create(1695183700, 2343527390),
          X64Word_create(1986661051, 1014477480),
          X64Word_create(2177026350, 1206759142),
          X64Word_create(2456956037, 344077627),
          X64Word_create(2730485921, 1290863460),
          X64Word_create(2820302411, 3158454273),
          X64Word_create(3259730800, 3505952657),
          X64Word_create(3345764771, 106217008),
          X64Word_create(3516065817, 3606008344),
          X64Word_create(3600352804, 1432725776),
          X64Word_create(4094571909, 1467031594),
          X64Word_create(275423344, 851169720),
          X64Word_create(430227734, 3100823752),
          X64Word_create(506948616, 1363258195),
          X64Word_create(659060556, 3750685593),
          X64Word_create(883997877, 3785050280),
          X64Word_create(958139571, 3318307427),
          X64Word_create(1322822218, 3812723403),
          X64Word_create(1537002063, 2003034995),
          X64Word_create(1747873779, 3602036899),
          X64Word_create(1955562222, 1575990012),
          X64Word_create(2024104815, 1125592928),
          X64Word_create(2227730452, 2716904306),
          X64Word_create(2361852424, 442776044),
          X64Word_create(2428436474, 593698344),
          X64Word_create(2756734187, 3733110249),
          X64Word_create(3204031479, 2999351573),
          X64Word_create(3329325298, 3815920427),
          X64Word_create(3391569614, 3928383900),
          X64Word_create(3515267271, 566280711),
          X64Word_create(3940187606, 3454069534),
          X64Word_create(4118630271, 4000239992),
          X64Word_create(116418474, 1914138554),
          X64Word_create(174292421, 2731055270),
          X64Word_create(289380356, 3203993006),
          X64Word_create(460393269, 320620315),
          X64Word_create(685471733, 587496836),
          X64Word_create(852142971, 1086792851),
          X64Word_create(1017036298, 365543100),
          X64Word_create(1126000580, 2618297676),
          X64Word_create(1288033470, 3409855158),
          X64Word_create(1501505948, 4234509866),
          X64Word_create(1607167915, 987167468),
          X64Word_create(1816402316, 1246189591)
        ];
        var W = [];
        (function() {
          for (var i = 0; i < 80; i++) {
            W[i] = X64Word_create();
          }
        })();
        var SHA512 = C_algo.SHA512 = Hasher.extend({
          _doReset: function() {
            this._hash = new X64WordArray.init([
              new X64Word.init(1779033703, 4089235720),
              new X64Word.init(3144134277, 2227873595),
              new X64Word.init(1013904242, 4271175723),
              new X64Word.init(2773480762, 1595750129),
              new X64Word.init(1359893119, 2917565137),
              new X64Word.init(2600822924, 725511199),
              new X64Word.init(528734635, 4215389547),
              new X64Word.init(1541459225, 327033209)
            ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];
            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;
            for (var i = 0; i < 80; i++) {
              var Wil;
              var Wih;
              var Wi = W[i];
              if (i < 16) {
                Wih = Wi.high = M[offset + i * 2] | 0;
                Wil = Wi.low = M[offset + i * 2 + 1] | 0;
              } else {
                var gamma0x = W[i - 15];
                var gamma0xh = gamma0x.high;
                var gamma0xl = gamma0x.low;
                var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                var gamma1x = W[i - 2];
                var gamma1xh = gamma1x.high;
                var gamma1xl = gamma1x.low;
                var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                var Wi7 = W[i - 7];
                var Wi7h = Wi7.high;
                var Wi7l = Wi7.low;
                var Wi16 = W[i - 16];
                var Wi16h = Wi16.high;
                var Wi16l = Wi16.low;
                Wil = gamma0l + Wi7l;
                Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                Wil = Wil + gamma1l;
                Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                Wil = Wil + Wi16l;
                Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                Wi.high = Wih;
                Wi.low = Wil;
              }
              var chh = eh & fh ^ ~eh & gh;
              var chl = el & fl ^ ~el & gl;
              var majh = ah & bh ^ ah & ch ^ bh & ch;
              var majl = al & bl ^ al & cl ^ bl & cl;
              var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
              var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
              var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
              var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
              var Ki = K[i];
              var Kih = Ki.high;
              var Kil = Ki.low;
              var t1l = hl + sigma1l;
              var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
              var t1l = t1l + chl;
              var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
              var t1l = t1l + Kil;
              var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
              var t1l = t1l + Wil;
              var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
              var t2l = sigma0l + majl;
              var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
              hh = gh;
              hl = gl;
              gh = fh;
              gl = fl;
              fh = eh;
              fl = el;
              el = dl + t1l | 0;
              eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
              dh = ch;
              dl = cl;
              ch = bh;
              cl = bl;
              bh = ah;
              bl = al;
              al = t1l + t2l | 0;
              ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
            }
            H0l = H0.low = H0l + al;
            H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
            H1l = H1.low = H1l + bl;
            H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
            H2l = H2.low = H2l + cl;
            H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
            H3l = H3.low = H3l + dl;
            H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
            H4l = H4.low = H4l + el;
            H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
            H5l = H5.low = H5l + fl;
            H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
            H6l = H6.low = H6l + gl;
            H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
            H7l = H7.low = H7l + hl;
            H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            var hash = this._hash.toX32();
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          },
          blockSize: 1024 / 32
        });
        C.SHA512 = Hasher._createHelper(SHA512);
        C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
      })();
      return CryptoJS3.SHA512;
    });
  }
});

// node_modules/crypto-js/sha384.js
var require_sha384 = __commonJS({
  "node_modules/crypto-js/sha384.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_x64_core(), require_sha512());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core", "./sha512"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        var SHA512 = C_algo.SHA512;
        var SHA384 = C_algo.SHA384 = SHA512.extend({
          _doReset: function() {
            this._hash = new X64WordArray.init([
              new X64Word.init(3418070365, 3238371032),
              new X64Word.init(1654270250, 914150663),
              new X64Word.init(2438529370, 812702999),
              new X64Word.init(355462360, 4144912697),
              new X64Word.init(1731405415, 4290775857),
              new X64Word.init(2394180231, 1750603025),
              new X64Word.init(3675008525, 1694076839),
              new X64Word.init(1203062813, 3204075428)
            ]);
          },
          _doFinalize: function() {
            var hash = SHA512._doFinalize.call(this);
            hash.sigBytes -= 16;
            return hash;
          }
        });
        C.SHA384 = SHA512._createHelper(SHA384);
        C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
      })();
      return CryptoJS3.SHA384;
    });
  }
});

// node_modules/crypto-js/sha3.js
var require_sha3 = __commonJS({
  "node_modules/crypto-js/sha3.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_x64_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function(Math2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var C_algo = C.algo;
        var RHO_OFFSETS = [];
        var PI_INDEXES = [];
        var ROUND_CONSTANTS = [];
        (function() {
          var x = 1, y = 0;
          for (var t = 0; t < 24; t++) {
            RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
            var newX = y % 5;
            var newY = (2 * x + 3 * y) % 5;
            x = newX;
            y = newY;
          }
          for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
              PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
            }
          }
          var LFSR = 1;
          for (var i = 0; i < 24; i++) {
            var roundConstantMsw = 0;
            var roundConstantLsw = 0;
            for (var j = 0; j < 7; j++) {
              if (LFSR & 1) {
                var bitPosition = (1 << j) - 1;
                if (bitPosition < 32) {
                  roundConstantLsw ^= 1 << bitPosition;
                } else {
                  roundConstantMsw ^= 1 << bitPosition - 32;
                }
              }
              if (LFSR & 128) {
                LFSR = LFSR << 1 ^ 113;
              } else {
                LFSR <<= 1;
              }
            }
            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
          }
        })();
        var T = [];
        (function() {
          for (var i = 0; i < 25; i++) {
            T[i] = X64Word.create();
          }
        })();
        var SHA3 = C_algo.SHA3 = Hasher.extend({
          /**
           * Configuration options.
           *
           * @property {number} outputLength
           *   The desired number of bits in the output hash.
           *   Only values permitted are: 224, 256, 384, 512.
           *   Default: 512
           */
          cfg: Hasher.cfg.extend({
            outputLength: 512
          }),
          _doReset: function() {
            var state = this._state = [];
            for (var i = 0; i < 25; i++) {
              state[i] = new X64Word.init();
            }
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(M, offset) {
            var state = this._state;
            var nBlockSizeLanes = this.blockSize / 2;
            for (var i = 0; i < nBlockSizeLanes; i++) {
              var M2i = M[offset + 2 * i];
              var M2i1 = M[offset + 2 * i + 1];
              M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
              M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
              var lane = state[i];
              lane.high ^= M2i1;
              lane.low ^= M2i;
            }
            for (var round = 0; round < 24; round++) {
              for (var x = 0; x < 5; x++) {
                var tMsw = 0, tLsw = 0;
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  tMsw ^= lane.high;
                  tLsw ^= lane.low;
                }
                var Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
              }
              for (var x = 0; x < 5; x++) {
                var Tx4 = T[(x + 4) % 5];
                var Tx1 = T[(x + 1) % 5];
                var Tx1Msw = Tx1.high;
                var Tx1Lsw = Tx1.low;
                var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  lane.high ^= tMsw;
                  lane.low ^= tLsw;
                }
              }
              for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                var tMsw;
                var tLsw;
                var lane = state[laneIndex];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                var rhoOffset = RHO_OFFSETS[laneIndex];
                if (rhoOffset < 32) {
                  tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                  tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                } else {
                  tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                  tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                }
                var TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
              }
              var T0 = T[0];
              var state0 = state[0];
              T0.high = state0.high;
              T0.low = state0.low;
              for (var x = 0; x < 5; x++) {
                for (var y = 0; y < 5; y++) {
                  var laneIndex = x + 5 * y;
                  var lane = state[laneIndex];
                  var TLane = T[laneIndex];
                  var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                  var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                  lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                  lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                }
              }
              var lane = state[0];
              var roundConstant = ROUND_CONSTANTS[round];
              lane.high ^= roundConstant.high;
              lane.low ^= roundConstant.low;
            }
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            var blockSizeBits = this.blockSize * 32;
            dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
            dataWords[(Math2.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
            data.sigBytes = dataWords.length * 4;
            this._process();
            var state = this._state;
            var outputLengthBytes = this.cfg.outputLength / 8;
            var outputLengthLanes = outputLengthBytes / 8;
            var hashWords = [];
            for (var i = 0; i < outputLengthLanes; i++) {
              var lane = state[i];
              var laneMsw = lane.high;
              var laneLsw = lane.low;
              laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
              laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
              hashWords.push(laneLsw);
              hashWords.push(laneMsw);
            }
            return new WordArray.init(hashWords, outputLengthBytes);
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            var state = clone._state = this._state.slice(0);
            for (var i = 0; i < 25; i++) {
              state[i] = state[i].clone();
            }
            return clone;
          }
        });
        C.SHA3 = Hasher._createHelper(SHA3);
        C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
      })(Math);
      return CryptoJS3.SHA3;
    });
  }
});

// node_modules/crypto-js/ripemd160.js
var require_ripemd160 = __commonJS({
  "node_modules/crypto-js/ripemd160.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function(Math2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var _zl = WordArray.create([
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          7,
          4,
          13,
          1,
          10,
          6,
          15,
          3,
          12,
          0,
          9,
          5,
          2,
          14,
          11,
          8,
          3,
          10,
          14,
          4,
          9,
          15,
          8,
          1,
          2,
          7,
          0,
          6,
          13,
          11,
          5,
          12,
          1,
          9,
          11,
          10,
          0,
          8,
          12,
          4,
          13,
          3,
          7,
          15,
          14,
          5,
          6,
          2,
          4,
          0,
          5,
          9,
          7,
          12,
          2,
          10,
          14,
          1,
          3,
          8,
          11,
          6,
          15,
          13
        ]);
        var _zr = WordArray.create([
          5,
          14,
          7,
          0,
          9,
          2,
          11,
          4,
          13,
          6,
          15,
          8,
          1,
          10,
          3,
          12,
          6,
          11,
          3,
          7,
          0,
          13,
          5,
          10,
          14,
          15,
          8,
          12,
          4,
          9,
          1,
          2,
          15,
          5,
          1,
          3,
          7,
          14,
          6,
          9,
          11,
          8,
          12,
          2,
          10,
          0,
          4,
          13,
          8,
          6,
          4,
          1,
          3,
          11,
          15,
          0,
          5,
          12,
          2,
          13,
          9,
          7,
          10,
          14,
          12,
          15,
          10,
          4,
          1,
          5,
          8,
          7,
          6,
          2,
          13,
          14,
          0,
          3,
          9,
          11
        ]);
        var _sl = WordArray.create([
          11,
          14,
          15,
          12,
          5,
          8,
          7,
          9,
          11,
          13,
          14,
          15,
          6,
          7,
          9,
          8,
          7,
          6,
          8,
          13,
          11,
          9,
          7,
          15,
          7,
          12,
          15,
          9,
          11,
          7,
          13,
          12,
          11,
          13,
          6,
          7,
          14,
          9,
          13,
          15,
          14,
          8,
          13,
          6,
          5,
          12,
          7,
          5,
          11,
          12,
          14,
          15,
          14,
          15,
          9,
          8,
          9,
          14,
          5,
          6,
          8,
          6,
          5,
          12,
          9,
          15,
          5,
          11,
          6,
          8,
          13,
          12,
          5,
          12,
          13,
          14,
          11,
          8,
          5,
          6
        ]);
        var _sr = WordArray.create([
          8,
          9,
          9,
          11,
          13,
          15,
          15,
          5,
          7,
          7,
          8,
          11,
          14,
          14,
          12,
          6,
          9,
          13,
          15,
          7,
          12,
          8,
          9,
          11,
          7,
          7,
          12,
          7,
          6,
          15,
          13,
          11,
          9,
          7,
          15,
          11,
          8,
          6,
          6,
          14,
          12,
          13,
          5,
          14,
          13,
          13,
          7,
          5,
          15,
          5,
          8,
          11,
          14,
          14,
          6,
          14,
          6,
          9,
          12,
          9,
          12,
          5,
          15,
          8,
          8,
          5,
          12,
          9,
          12,
          5,
          14,
          6,
          8,
          13,
          6,
          5,
          15,
          13,
          11,
          11
        ]);
        var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
        var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
        var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
          _doReset: function() {
            this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var hl = _hl.words;
            var hr = _hr.words;
            var zl = _zl.words;
            var zr = _zr.words;
            var sl = _sl.words;
            var sr = _sr.words;
            var al, bl, cl, dl, el;
            var ar, br, cr, dr, er;
            ar = al = H[0];
            br = bl = H[1];
            cr = cl = H[2];
            dr = dl = H[3];
            er = el = H[4];
            var t;
            for (var i = 0; i < 80; i += 1) {
              t = al + M[offset + zl[i]] | 0;
              if (i < 16) {
                t += f1(bl, cl, dl) + hl[0];
              } else if (i < 32) {
                t += f2(bl, cl, dl) + hl[1];
              } else if (i < 48) {
                t += f3(bl, cl, dl) + hl[2];
              } else if (i < 64) {
                t += f4(bl, cl, dl) + hl[3];
              } else {
                t += f5(bl, cl, dl) + hl[4];
              }
              t = t | 0;
              t = rotl(t, sl[i]);
              t = t + el | 0;
              al = el;
              el = dl;
              dl = rotl(cl, 10);
              cl = bl;
              bl = t;
              t = ar + M[offset + zr[i]] | 0;
              if (i < 16) {
                t += f5(br, cr, dr) + hr[0];
              } else if (i < 32) {
                t += f4(br, cr, dr) + hr[1];
              } else if (i < 48) {
                t += f3(br, cr, dr) + hr[2];
              } else if (i < 64) {
                t += f2(br, cr, dr) + hr[3];
              } else {
                t += f1(br, cr, dr) + hr[4];
              }
              t = t | 0;
              t = rotl(t, sr[i]);
              t = t + er | 0;
              ar = er;
              er = dr;
              dr = rotl(cr, 10);
              cr = br;
              br = t;
            }
            t = H[1] + cl + dr | 0;
            H[1] = H[2] + dl + er | 0;
            H[2] = H[3] + el + ar | 0;
            H[3] = H[4] + al + br | 0;
            H[4] = H[0] + bl + cr | 0;
            H[0] = t;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 5; i++) {
              var H_i = H[i];
              H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function f1(x, y, z) {
          return x ^ y ^ z;
        }
        function f2(x, y, z) {
          return x & y | ~x & z;
        }
        function f3(x, y, z) {
          return (x | ~y) ^ z;
        }
        function f4(x, y, z) {
          return x & z | y & ~z;
        }
        function f5(x, y, z) {
          return x ^ (y | ~z);
        }
        function rotl(x, n) {
          return x << n | x >>> 32 - n;
        }
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
        C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
      })(Math);
      return CryptoJS3.RIPEMD160;
    });
  }
});

// node_modules/crypto-js/hmac.js
var require_hmac = __commonJS({
  "node_modules/crypto-js/hmac.js"(exports, module3) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var Base2 = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base2.extend({
          /**
           * Initializes a newly created HMAC.
           *
           * @param {Hasher} hasher The hash algorithm to use.
           * @param {WordArray|string} key The secret key.
           *
           * @example
           *
           *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
           */
          init: function(hasher, key) {
            hasher = this._hasher = new hasher.init();
            if (typeof key == "string") {
              key = Utf8.parse(key);
            }
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;
            if (key.sigBytes > hasherBlockSizeBytes) {
              key = hasher.finalize(key);
            }
            key.clamp();
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i = 0; i < hasherBlockSize; i++) {
              oKeyWords[i] ^= 1549556828;
              iKeyWords[i] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
          },
          /**
           * Updates this HMAC with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {HMAC} This HMAC instance.
           *
           * @example
           *
           *     hmacHasher.update('message');
           *     hmacHasher.update(wordArray);
           */
          update: function(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
          },
          /**
           * Finalizes the HMAC computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The HMAC.
           *
           * @example
           *
           *     var hmac = hmacHasher.finalize();
           *     var hmac = hmacHasher.finalize('message');
           *     var hmac = hmacHasher.finalize(wordArray);
           */
          finalize: function(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac;
          }
        });
      })();
    });
  }
});

// node_modules/crypto-js/pbkdf2.js
var require_pbkdf2 = __commonJS({
  "node_modules/crypto-js/pbkdf2.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_sha256(), require_hmac());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha256", "./hmac"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var Base2 = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var HMAC = C_algo.HMAC;
        var PBKDF2 = C_algo.PBKDF2 = Base2.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hasher to use. Default: SHA256
           * @property {number} iterations The number of iterations to perform. Default: 250000
           */
          cfg: Base2.extend({
            keySize: 128 / 32,
            hasher: SHA256,
            iterations: 25e4
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.PBKDF2.create();
           *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
           */
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          /**
           * Computes the Password-Based Key Derivation Function 2.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(password, salt) {
            var cfg = this.cfg;
            var hmac = HMAC.create(cfg.hasher, password);
            var derivedKey = WordArray.create();
            var blockIndex = WordArray.create([1]);
            var derivedKeyWords = derivedKey.words;
            var blockIndexWords = blockIndex.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              var block = hmac.update(salt).finalize(blockIndex);
              hmac.reset();
              var blockWords = block.words;
              var blockWordsLength = blockWords.length;
              var intermediate = block;
              for (var i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                var intermediateWords = intermediate.words;
                for (var j = 0; j < blockWordsLength; j++) {
                  blockWords[j] ^= intermediateWords[j];
                }
              }
              derivedKey.concat(block);
              blockIndexWords[0]++;
            }
            derivedKey.sigBytes = keySize * 4;
            return derivedKey;
          }
        });
        C.PBKDF2 = function(password, salt, cfg) {
          return PBKDF2.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS3.PBKDF2;
    });
  }
});

// node_modules/crypto-js/evpkdf.js
var require_evpkdf = __commonJS({
  "node_modules/crypto-js/evpkdf.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_sha1(), require_hmac());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var Base2 = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base2.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hash algorithm to use. Default: MD5
           * @property {number} iterations The number of iterations to perform. Default: 1
           */
          cfg: Base2.extend({
            keySize: 128 / 32,
            hasher: MD5,
            iterations: 1
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.EvpKDF.create();
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
           */
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          /**
           * Derives a key from a password.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(password, salt) {
            var block;
            var cfg = this.cfg;
            var hasher = cfg.hasher.create();
            var derivedKey = WordArray.create();
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              if (block) {
                hasher.update(block);
              }
              block = hasher.update(password).finalize(salt);
              hasher.reset();
              for (var i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
              }
              derivedKey.concat(block);
            }
            derivedKey.sigBytes = keySize * 4;
            return derivedKey;
          }
        });
        C.EvpKDF = function(password, salt, cfg) {
          return EvpKDF.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS3.EvpKDF;
    });
  }
});

// node_modules/crypto-js/cipher-core.js
var require_cipher_core = __commonJS({
  "node_modules/crypto-js/cipher-core.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_evpkdf());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./evpkdf"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.lib.Cipher || function(undefined2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var Base2 = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
          /**
           * Configuration options.
           *
           * @property {WordArray} iv The IV to use for this operation.
           */
          cfg: Base2.extend(),
          /**
           * Creates this cipher in encryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
           */
          createEncryptor: function(key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
          },
          /**
           * Creates this cipher in decryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
           */
          createDecryptor: function(key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
          },
          /**
           * Initializes a newly created cipher.
           *
           * @param {number} xformMode Either the encryption or decryption transormation mode constant.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
           */
          init: function(xformMode, key, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key;
            this.reset();
          },
          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          /**
           * Adds data to be encrypted or decrypted.
           *
           * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
           *
           * @return {WordArray} The data after processing.
           *
           * @example
           *
           *     var encrypted = cipher.process('data');
           *     var encrypted = cipher.process(wordArray);
           */
          process: function(dataUpdate) {
            this._append(dataUpdate);
            return this._process();
          },
          /**
           * Finalizes the encryption or decryption process.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
           *
           * @return {WordArray} The data after final processing.
           *
           * @example
           *
           *     var encrypted = cipher.finalize();
           *     var encrypted = cipher.finalize('data');
           *     var encrypted = cipher.finalize(wordArray);
           */
          finalize: function(dataUpdate) {
            if (dataUpdate) {
              this._append(dataUpdate);
            }
            var finalProcessedData = this._doFinalize();
            return finalProcessedData;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          /**
           * Creates shortcut functions to a cipher's object interface.
           *
           * @param {Cipher} cipher The cipher to create a helper for.
           *
           * @return {Object} An object with encrypt and decrypt shortcut functions.
           *
           * @static
           *
           * @example
           *
           *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
           */
          _createHelper: /* @__PURE__ */ function() {
            function selectCipherStrategy(key) {
              if (typeof key == "string") {
                return PasswordBasedCipher;
              } else {
                return SerializableCipher;
              }
            }
            return function(cipher) {
              return {
                encrypt: function(message, key, cfg) {
                  return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },
                decrypt: function(ciphertext, key, cfg) {
                  return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
              };
            };
          }()
        });
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
          _doFinalize: function() {
            var finalProcessedBlocks = this._process(true);
            return finalProcessedBlocks;
          },
          blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base2.extend({
          /**
           * Creates this mode for encryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
           */
          createEncryptor: function(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
          },
          /**
           * Creates this mode for decryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
           */
          createDecryptor: function(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
          },
          /**
           * Initializes a newly created mode.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
           */
          init: function(cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
          }
        });
        var CBC = C_mode.CBC = function() {
          var CBC2 = BlockCipherMode.extend();
          CBC2.Encryptor = CBC2.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              xorBlock.call(this, words, offset, blockSize);
              cipher.encryptBlock(words, offset);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CBC2.Decryptor = CBC2.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              cipher.decryptBlock(words, offset);
              xorBlock.call(this, words, offset, blockSize);
              this._prevBlock = thisBlock;
            }
          });
          function xorBlock(words, offset, blockSize) {
            var block;
            var iv = this._iv;
            if (iv) {
              block = iv;
              this._iv = undefined2;
            } else {
              block = this._prevBlock;
            }
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= block[i];
            }
          }
          return CBC2;
        }();
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
          /**
           * Pads data using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to pad.
           * @param {number} blockSize The multiple that the data should be padded to.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
           */
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) {
              paddingWords.push(paddingWord);
            }
            var padding = WordArray.create(paddingWords, nPaddingBytes);
            data.concat(padding);
          },
          /**
           * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to unpad.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.unpad(wordArray);
           */
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
          }),
          reset: function() {
            var modeCreator;
            Cipher.reset.call(this);
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              modeCreator = mode.createEncryptor;
            } else {
              modeCreator = mode.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == modeCreator) {
              this._mode.init(this, iv && iv.words);
            } else {
              this._mode = modeCreator.call(mode, this, iv && iv.words);
              this._mode.__creator = modeCreator;
            }
          },
          _doProcessBlock: function(words, offset) {
            this._mode.processBlock(words, offset);
          },
          _doFinalize: function() {
            var finalProcessedBlocks;
            var padding = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              padding.pad(this._data, this.blockSize);
              finalProcessedBlocks = this._process(true);
            } else {
              finalProcessedBlocks = this._process(true);
              padding.unpad(finalProcessedBlocks);
            }
            return finalProcessedBlocks;
          },
          blockSize: 128 / 32
        });
        var CipherParams = C_lib.CipherParams = Base2.extend({
          /**
           * Initializes a newly created cipher params object.
           *
           * @param {Object} cipherParams An object with any of the possible cipher parameters.
           *
           * @example
           *
           *     var cipherParams = CryptoJS.lib.CipherParams.create({
           *         ciphertext: ciphertextWordArray,
           *         key: keyWordArray,
           *         iv: ivWordArray,
           *         salt: saltWordArray,
           *         algorithm: CryptoJS.algo.AES,
           *         mode: CryptoJS.mode.CBC,
           *         padding: CryptoJS.pad.PKCS7,
           *         blockSize: 4,
           *         formatter: CryptoJS.format.OpenSSL
           *     });
           */
          init: function(cipherParams) {
            this.mixIn(cipherParams);
          },
          /**
           * Converts this cipher params object to a string.
           *
           * @param {Format} formatter (Optional) The formatting strategy to use.
           *
           * @return {string} The stringified cipher params.
           *
           * @throws Error If neither the formatter nor the default formatter is set.
           *
           * @example
           *
           *     var string = cipherParams + '';
           *     var string = cipherParams.toString();
           *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
           */
          toString: function(formatter) {
            return (formatter || this.formatter).stringify(this);
          }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
          /**
           * Converts a cipher params object to an OpenSSL-compatible string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The OpenSSL-compatible string.
           *
           * @static
           *
           * @example
           *
           *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
           */
          stringify: function(cipherParams) {
            var wordArray;
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;
            if (salt) {
              wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
            } else {
              wordArray = ciphertext;
            }
            return wordArray.toString(Base64);
          },
          /**
           * Converts an OpenSSL-compatible string to a cipher params object.
           *
           * @param {string} openSSLStr The OpenSSL-compatible string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
           */
          parse: function(openSSLStr) {
            var salt;
            var ciphertext = Base64.parse(openSSLStr);
            var ciphertextWords = ciphertext.words;
            if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
              salt = WordArray.create(ciphertextWords.slice(2, 4));
              ciphertextWords.splice(0, 4);
              ciphertext.sigBytes -= 16;
            }
            return CipherParams.create({ ciphertext, salt });
          }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base2.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: Base2.extend({
            format: OpenSSLFormatter
          }),
          /**
           * Encrypts a message.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(cipher, message, key, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
              ciphertext,
              key,
              iv: cipherCfg.iv,
              algorithm: cipher,
              mode: cipherCfg.mode,
              padding: cipherCfg.padding,
              blockSize: cipher.blockSize,
              formatter: cfg.format
            });
          },
          /**
           * Decrypts serialized ciphertext.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(cipher, ciphertext, key, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
            return plaintext;
          },
          /**
           * Converts serialized ciphertext to CipherParams,
           * else assumed CipherParams already and returns ciphertext unchanged.
           *
           * @param {CipherParams|string} ciphertext The ciphertext.
           * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
           *
           * @return {CipherParams} The unserialized ciphertext.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
           */
          _parse: function(ciphertext, format) {
            if (typeof ciphertext == "string") {
              return format.parse(ciphertext, this);
            } else {
              return ciphertext;
            }
          }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
          /**
           * Derives a key and IV from a password.
           *
           * @param {string} password The password to derive from.
           * @param {number} keySize The size in words of the key to generate.
           * @param {number} ivSize The size in words of the IV to generate.
           * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
           *
           * @return {CipherParams} A cipher params object with the key, IV, and salt.
           *
           * @static
           *
           * @example
           *
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
           */
          execute: function(password, keySize, ivSize, salt, hasher) {
            if (!salt) {
              salt = WordArray.random(64 / 8);
            }
            if (!hasher) {
              var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
            } else {
              var key = EvpKDF.create({ keySize: keySize + ivSize, hasher }).compute(password, salt);
            }
            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
            key.sigBytes = keySize * 4;
            return CipherParams.create({ key, iv, salt });
          }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
          }),
          /**
           * Encrypts a message using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
            cfg.iv = derivedParams.iv;
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
            ciphertext.mixIn(derivedParams);
            return ciphertext;
          },
          /**
           * Decrypts serialized ciphertext using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
            cfg.iv = derivedParams.iv;
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
            return plaintext;
          }
        });
      }();
    });
  }
});

// node_modules/crypto-js/mode-cfb.js
var require_mode_cfb = __commonJS({
  "node_modules/crypto-js/mode-cfb.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.mode.CFB = function() {
        var CFB = CryptoJS3.lib.BlockCipherMode.extend();
        CFB.Encryptor = CFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = words.slice(offset, offset + blockSize);
          }
        });
        CFB.Decryptor = CFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = thisBlock;
          }
        });
        function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
          var keystream;
          var iv = this._iv;
          if (iv) {
            keystream = iv.slice(0);
            this._iv = void 0;
          } else {
            keystream = this._prevBlock;
          }
          cipher.encryptBlock(keystream, 0);
          for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
          }
        }
        return CFB;
      }();
      return CryptoJS3.mode.CFB;
    });
  }
});

// node_modules/crypto-js/mode-ctr.js
var require_mode_ctr = __commonJS({
  "node_modules/crypto-js/mode-ctr.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.mode.CTR = function() {
        var CTR = CryptoJS3.lib.BlockCipherMode.extend();
        var Encryptor = CTR.Encryptor = CTR.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
        });
        CTR.Decryptor = Encryptor;
        return CTR;
      }();
      return CryptoJS3.mode.CTR;
    });
  }
});

// node_modules/crypto-js/mode-ctr-gladman.js
var require_mode_ctr_gladman = __commonJS({
  "node_modules/crypto-js/mode-ctr-gladman.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.mode.CTRGladman = function() {
        var CTRGladman = CryptoJS3.lib.BlockCipherMode.extend();
        function incWord(word) {
          if ((word >> 24 & 255) === 255) {
            var b1 = word >> 16 & 255;
            var b2 = word >> 8 & 255;
            var b3 = word & 255;
            if (b1 === 255) {
              b1 = 0;
              if (b2 === 255) {
                b2 = 0;
                if (b3 === 255) {
                  b3 = 0;
                } else {
                  ++b3;
                }
              } else {
                ++b2;
              }
            } else {
              ++b1;
            }
            word = 0;
            word += b1 << 16;
            word += b2 << 8;
            word += b3;
          } else {
            word += 1 << 24;
          }
          return word;
        }
        function incCounter(counter) {
          if ((counter[0] = incWord(counter[0])) === 0) {
            counter[1] = incWord(counter[1]);
          }
          return counter;
        }
        var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            incCounter(counter);
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
        });
        CTRGladman.Decryptor = Encryptor;
        return CTRGladman;
      }();
      return CryptoJS3.mode.CTRGladman;
    });
  }
});

// node_modules/crypto-js/mode-ofb.js
var require_mode_ofb = __commonJS({
  "node_modules/crypto-js/mode-ofb.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.mode.OFB = function() {
        var OFB = CryptoJS3.lib.BlockCipherMode.extend();
        var Encryptor = OFB.Encryptor = OFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;
            if (iv) {
              keystream = this._keystream = iv.slice(0);
              this._iv = void 0;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
        });
        OFB.Decryptor = Encryptor;
        return OFB;
      }();
      return CryptoJS3.mode.OFB;
    });
  }
});

// node_modules/crypto-js/mode-ecb.js
var require_mode_ecb = __commonJS({
  "node_modules/crypto-js/mode-ecb.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.mode.ECB = function() {
        var ECB = CryptoJS3.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.encryptBlock(words, offset);
          }
        });
        ECB.Decryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.decryptBlock(words, offset);
          }
        });
        return ECB;
      }();
      return CryptoJS3.mode.ECB;
    });
  }
});

// node_modules/crypto-js/pad-ansix923.js
var require_pad_ansix923 = __commonJS({
  "node_modules/crypto-js/pad-ansix923.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.pad.AnsiX923 = {
        pad: function(data, blockSize) {
          var dataSigBytes = data.sigBytes;
          var blockSizeBytes = blockSize * 4;
          var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
          var lastBytePos = dataSigBytes + nPaddingBytes - 1;
          data.clamp();
          data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
          data.sigBytes += nPaddingBytes;
        },
        unpad: function(data) {
          var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
          data.sigBytes -= nPaddingBytes;
        }
      };
      return CryptoJS3.pad.Ansix923;
    });
  }
});

// node_modules/crypto-js/pad-iso10126.js
var require_pad_iso10126 = __commonJS({
  "node_modules/crypto-js/pad-iso10126.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.pad.Iso10126 = {
        pad: function(data, blockSize) {
          var blockSizeBytes = blockSize * 4;
          var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
          data.concat(CryptoJS3.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS3.lib.WordArray.create([nPaddingBytes << 24], 1));
        },
        unpad: function(data) {
          var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
          data.sigBytes -= nPaddingBytes;
        }
      };
      return CryptoJS3.pad.Iso10126;
    });
  }
});

// node_modules/crypto-js/pad-iso97971.js
var require_pad_iso97971 = __commonJS({
  "node_modules/crypto-js/pad-iso97971.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.pad.Iso97971 = {
        pad: function(data, blockSize) {
          data.concat(CryptoJS3.lib.WordArray.create([2147483648], 1));
          CryptoJS3.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function(data) {
          CryptoJS3.pad.ZeroPadding.unpad(data);
          data.sigBytes--;
        }
      };
      return CryptoJS3.pad.Iso97971;
    });
  }
});

// node_modules/crypto-js/pad-zeropadding.js
var require_pad_zeropadding = __commonJS({
  "node_modules/crypto-js/pad-zeropadding.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.pad.ZeroPadding = {
        pad: function(data, blockSize) {
          var blockSizeBytes = blockSize * 4;
          data.clamp();
          data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
        },
        unpad: function(data) {
          var dataWords = data.words;
          var i = data.sigBytes - 1;
          for (var i = data.sigBytes - 1; i >= 0; i--) {
            if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
              data.sigBytes = i + 1;
              break;
            }
          }
        }
      };
      return CryptoJS3.pad.ZeroPadding;
    });
  }
});

// node_modules/crypto-js/pad-nopadding.js
var require_pad_nopadding = __commonJS({
  "node_modules/crypto-js/pad-nopadding.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      CryptoJS3.pad.NoPadding = {
        pad: function() {
        },
        unpad: function() {
        }
      };
      return CryptoJS3.pad.NoPadding;
    });
  }
});

// node_modules/crypto-js/format-hex.js
var require_format_hex = __commonJS({
  "node_modules/crypto-js/format-hex.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function(undefined2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var CipherParams = C_lib.CipherParams;
        var C_enc = C.enc;
        var Hex = C_enc.Hex;
        var C_format = C.format;
        var HexFormatter = C_format.Hex = {
          /**
           * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The hexadecimally encoded string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
           */
          stringify: function(cipherParams) {
            return cipherParams.ciphertext.toString(Hex);
          },
          /**
           * Converts a hexadecimally encoded ciphertext string to a cipher params object.
           *
           * @param {string} input The hexadecimally encoded string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
           */
          parse: function(input) {
            var ciphertext = Hex.parse(input);
            return CipherParams.create({ ciphertext });
          }
        };
      })();
      return CryptoJS3.format.Hex;
    });
  }
});

// node_modules/crypto-js/aes.js
var require_aes = __commonJS({
  "node_modules/crypto-js/aes.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];
        (function() {
          var d = [];
          for (var i = 0; i < 256; i++) {
            if (i < 128) {
              d[i] = i << 1;
            } else {
              d[i] = i << 1 ^ 283;
            }
          }
          var x = 0;
          var xi = 0;
          for (var i = 0; i < 256; i++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ sx & 255 ^ 99;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t = d[sx] * 257 ^ sx * 16843008;
            SUB_MIX_0[x] = t << 24 | t >>> 8;
            SUB_MIX_1[x] = t << 16 | t >>> 16;
            SUB_MIX_2[x] = t << 8 | t >>> 24;
            SUB_MIX_3[x] = t;
            var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
            INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
            INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
            INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
            INV_SUB_MIX_3[sx] = t;
            if (!x) {
              x = xi = 1;
            } else {
              x = x2 ^ d[d[d[x8 ^ x2]]];
              xi ^= d[d[xi]];
            }
          }
        })();
        var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        var AES = C_algo.AES = BlockCipher.extend({
          _doReset: function() {
            var t;
            if (this._nRounds && this._keyPriorReset === this._key) {
              return;
            }
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            var nRounds = this._nRounds = keySize + 6;
            var ksRows = (nRounds + 1) * 4;
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
              if (ksRow < keySize) {
                keySchedule[ksRow] = keyWords[ksRow];
              } else {
                t = keySchedule[ksRow - 1];
                if (!(ksRow % keySize)) {
                  t = t << 8 | t >>> 24;
                  t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  t ^= RCON[ksRow / keySize | 0] << 24;
                } else if (keySize > 6 && ksRow % keySize == 4) {
                  t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                }
                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
              }
            }
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
              var ksRow = ksRows - invKsRow;
              if (invKsRow % 4) {
                var t = keySchedule[ksRow];
              } else {
                var t = keySchedule[ksRow - 4];
              }
              if (invKsRow < 4 || ksRow <= 4) {
                invKeySchedule[invKsRow] = t;
              } else {
                invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
              }
            }
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
          },
          decryptBlock: function(M, offset) {
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
          },
          _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
            var nRounds = this._nRounds;
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round = 1; round < nRounds; round++) {
              var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
              var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
              var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
              var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
              s0 = t0;
              s1 = t1;
              s2 = t2;
              s3 = t3;
            }
            var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
            var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
            var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
            var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
          },
          keySize: 256 / 32
        });
        C.AES = BlockCipher._createHelper(AES);
      })();
      return CryptoJS3.AES;
    });
  }
});

// node_modules/crypto-js/tripledes.js
var require_tripledes = __commonJS({
  "node_modules/crypto-js/tripledes.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var PC1 = [
          57,
          49,
          41,
          33,
          25,
          17,
          9,
          1,
          58,
          50,
          42,
          34,
          26,
          18,
          10,
          2,
          59,
          51,
          43,
          35,
          27,
          19,
          11,
          3,
          60,
          52,
          44,
          36,
          63,
          55,
          47,
          39,
          31,
          23,
          15,
          7,
          62,
          54,
          46,
          38,
          30,
          22,
          14,
          6,
          61,
          53,
          45,
          37,
          29,
          21,
          13,
          5,
          28,
          20,
          12,
          4
        ];
        var PC2 = [
          14,
          17,
          11,
          24,
          1,
          5,
          3,
          28,
          15,
          6,
          21,
          10,
          23,
          19,
          12,
          4,
          26,
          8,
          16,
          7,
          27,
          20,
          13,
          2,
          41,
          52,
          31,
          37,
          47,
          55,
          30,
          40,
          51,
          45,
          33,
          48,
          44,
          49,
          39,
          56,
          34,
          53,
          46,
          42,
          50,
          36,
          29,
          32
        ];
        var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
        var SBOX_P = [
          {
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          },
          {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          },
          {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          },
          {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          },
          {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          },
          {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          },
          {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          },
          {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }
        ];
        var SBOX_MASK = [
          4160749569,
          528482304,
          33030144,
          2064384,
          129024,
          8064,
          504,
          2147483679
        ];
        var DES = C_algo.DES = BlockCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keyBits = [];
            for (var i = 0; i < 56; i++) {
              var keyBitPos = PC1[i] - 1;
              keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
            }
            var subKeys = this._subKeys = [];
            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
              var subKey = subKeys[nSubKey] = [];
              var bitShift = BIT_SHIFTS[nSubKey];
              for (var i = 0; i < 24; i++) {
                subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
              }
              subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
              for (var i = 1; i < 7; i++) {
                subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
              }
              subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
            }
            var invSubKeys = this._invSubKeys = [];
            for (var i = 0; i < 16; i++) {
              invSubKeys[i] = subKeys[15 - i];
            }
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._subKeys);
          },
          decryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._invSubKeys);
          },
          _doCryptBlock: function(M, offset, subKeys) {
            this._lBlock = M[offset];
            this._rBlock = M[offset + 1];
            exchangeLR.call(this, 4, 252645135);
            exchangeLR.call(this, 16, 65535);
            exchangeRL.call(this, 2, 858993459);
            exchangeRL.call(this, 8, 16711935);
            exchangeLR.call(this, 1, 1431655765);
            for (var round = 0; round < 16; round++) {
              var subKey = subKeys[round];
              var lBlock = this._lBlock;
              var rBlock = this._rBlock;
              var f = 0;
              for (var i = 0; i < 8; i++) {
                f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
              }
              this._lBlock = rBlock;
              this._rBlock = lBlock ^ f;
            }
            var t = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = t;
            exchangeLR.call(this, 1, 1431655765);
            exchangeRL.call(this, 8, 16711935);
            exchangeRL.call(this, 2, 858993459);
            exchangeLR.call(this, 16, 65535);
            exchangeLR.call(this, 4, 252645135);
            M[offset] = this._lBlock;
            M[offset + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function exchangeLR(offset, mask) {
          var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
          this._rBlock ^= t;
          this._lBlock ^= t << offset;
        }
        function exchangeRL(offset, mask) {
          var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
          this._lBlock ^= t;
          this._rBlock ^= t << offset;
        }
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            }
            var key1 = keyWords.slice(0, 2);
            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
            this._des1 = DES.createEncryptor(WordArray.create(key1));
            this._des2 = DES.createEncryptor(WordArray.create(key2));
            this._des3 = DES.createEncryptor(WordArray.create(key3));
          },
          encryptBlock: function(M, offset) {
            this._des1.encryptBlock(M, offset);
            this._des2.decryptBlock(M, offset);
            this._des3.encryptBlock(M, offset);
          },
          decryptBlock: function(M, offset) {
            this._des3.decryptBlock(M, offset);
            this._des2.encryptBlock(M, offset);
            this._des1.decryptBlock(M, offset);
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        C.TripleDES = BlockCipher._createHelper(TripleDES);
      })();
      return CryptoJS3.TripleDES;
    });
  }
});

// node_modules/crypto-js/rc4.js
var require_rc4 = __commonJS({
  "node_modules/crypto-js/rc4.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keySigBytes = key.sigBytes;
            var S = this._S = [];
            for (var i = 0; i < 256; i++) {
              S[i] = i;
            }
            for (var i = 0, j = 0; i < 256; i++) {
              var keyByteIndex = i % keySigBytes;
              var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
              j = (j + S[i] + keyByte) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(M, offset) {
            M[offset] ^= generateKeystreamWord.call(this);
          },
          keySize: 256 / 32,
          ivSize: 0
        });
        function generateKeystreamWord() {
          var S = this._S;
          var i = this._i;
          var j = this._j;
          var keystreamWord = 0;
          for (var n = 0; n < 4; n++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            var t = S[i];
            S[i] = S[j];
            S[j] = t;
            keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
          }
          this._i = i;
          this._j = j;
          return keystreamWord;
        }
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
          /**
           * Configuration options.
           *
           * @property {number} drop The number of keystream words to drop. Default 192
           */
          cfg: RC4.cfg.extend({
            drop: 192
          }),
          _doReset: function() {
            RC4._doReset.call(this);
            for (var i = this.cfg.drop; i > 0; i--) {
              generateKeystreamWord.call(this);
            }
          }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
      })();
      return CryptoJS3.RC4;
    });
  }
});

// node_modules/crypto-js/rabbit.js
var require_rabbit = __commonJS({
  "node_modules/crypto-js/rabbit.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var Rabbit = C_algo.Rabbit = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            for (var i = 0; i < 4; i++) {
              K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360;
            }
            var X = this._X = [
              K[0],
              K[3] << 16 | K[2] >>> 16,
              K[1],
              K[0] << 16 | K[3] >>> 16,
              K[2],
              K[1] << 16 | K[0] >>> 16,
              K[3],
              K[2] << 16 | K[1] >>> 16
            ];
            var C2 = this._C = [
              K[2] << 16 | K[2] >>> 16,
              K[0] & 4294901760 | K[1] & 65535,
              K[3] << 16 | K[3] >>> 16,
              K[1] & 4294901760 | K[2] & 65535,
              K[0] << 16 | K[0] >>> 16,
              K[2] & 4294901760 | K[3] & 65535,
              K[1] << 16 | K[1] >>> 16,
              K[3] & 4294901760 | K[0] & 65535
            ];
            this._b = 0;
            for (var i = 0; i < 4; i++) {
              nextState.call(this);
            }
            for (var i = 0; i < 8; i++) {
              C2[i] ^= X[i + 4 & 7];
            }
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
              var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
              var i1 = i0 >>> 16 | i2 & 4294901760;
              var i3 = i2 << 16 | i0 & 65535;
              C2[0] ^= i0;
              C2[1] ^= i1;
              C2[2] ^= i2;
              C2[3] ^= i3;
              C2[4] ^= i0;
              C2[5] ^= i1;
              C2[6] ^= i2;
              C2[7] ^= i3;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
            }
          },
          _doProcessBlock: function(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function nextState() {
          var X = this._X;
          var C2 = this._C;
          for (var i = 0; i < 8; i++) {
            C_[i] = C2[i];
          }
          C2[0] = C2[0] + 1295307597 + this._b | 0;
          C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C2[i];
            var ga = gx & 65535;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.Rabbit = StreamCipher._createHelper(Rabbit);
      })();
      return CryptoJS3.Rabbit;
    });
  }
});

// node_modules/crypto-js/rabbit-legacy.js
var require_rabbit_legacy = __commonJS({
  "node_modules/crypto-js/rabbit-legacy.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            var X = this._X = [
              K[0],
              K[3] << 16 | K[2] >>> 16,
              K[1],
              K[0] << 16 | K[3] >>> 16,
              K[2],
              K[1] << 16 | K[0] >>> 16,
              K[3],
              K[2] << 16 | K[1] >>> 16
            ];
            var C2 = this._C = [
              K[2] << 16 | K[2] >>> 16,
              K[0] & 4294901760 | K[1] & 65535,
              K[3] << 16 | K[3] >>> 16,
              K[1] & 4294901760 | K[2] & 65535,
              K[0] << 16 | K[0] >>> 16,
              K[2] & 4294901760 | K[3] & 65535,
              K[1] << 16 | K[1] >>> 16,
              K[3] & 4294901760 | K[0] & 65535
            ];
            this._b = 0;
            for (var i = 0; i < 4; i++) {
              nextState.call(this);
            }
            for (var i = 0; i < 8; i++) {
              C2[i] ^= X[i + 4 & 7];
            }
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
              var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
              var i1 = i0 >>> 16 | i2 & 4294901760;
              var i3 = i2 << 16 | i0 & 65535;
              C2[0] ^= i0;
              C2[1] ^= i1;
              C2[2] ^= i2;
              C2[3] ^= i3;
              C2[4] ^= i0;
              C2[5] ^= i1;
              C2[6] ^= i2;
              C2[7] ^= i3;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
            }
          },
          _doProcessBlock: function(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function nextState() {
          var X = this._X;
          var C2 = this._C;
          for (var i = 0; i < 8; i++) {
            C_[i] = C2[i];
          }
          C2[0] = C2[0] + 1295307597 + this._b | 0;
          C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C2[i];
            var ga = gx & 65535;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
      })();
      return CryptoJS3.RabbitLegacy;
    });
  }
});

// node_modules/crypto-js/blowfish.js
var require_blowfish = __commonJS({
  "node_modules/crypto-js/blowfish.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        const N = 16;
        const ORIG_P = [
          608135816,
          2242054355,
          320440878,
          57701188,
          2752067618,
          698298832,
          137296536,
          3964562569,
          1160258022,
          953160567,
          3193202383,
          887688300,
          3232508343,
          3380367581,
          1065670069,
          3041331479,
          2450970073,
          2306472731
        ];
        const ORIG_S = [
          [
            3509652390,
            2564797868,
            805139163,
            3491422135,
            3101798381,
            1780907670,
            3128725573,
            4046225305,
            614570311,
            3012652279,
            134345442,
            2240740374,
            1667834072,
            1901547113,
            2757295779,
            4103290238,
            227898511,
            1921955416,
            1904987480,
            2182433518,
            2069144605,
            3260701109,
            2620446009,
            720527379,
            3318853667,
            677414384,
            3393288472,
            3101374703,
            2390351024,
            1614419982,
            1822297739,
            2954791486,
            3608508353,
            3174124327,
            2024746970,
            1432378464,
            3864339955,
            2857741204,
            1464375394,
            1676153920,
            1439316330,
            715854006,
            3033291828,
            289532110,
            2706671279,
            2087905683,
            3018724369,
            1668267050,
            732546397,
            1947742710,
            3462151702,
            2609353502,
            2950085171,
            1814351708,
            2050118529,
            680887927,
            999245976,
            1800124847,
            3300911131,
            1713906067,
            1641548236,
            4213287313,
            1216130144,
            1575780402,
            4018429277,
            3917837745,
            3693486850,
            3949271944,
            596196993,
            3549867205,
            258830323,
            2213823033,
            772490370,
            2760122372,
            1774776394,
            2652871518,
            566650946,
            4142492826,
            1728879713,
            2882767088,
            1783734482,
            3629395816,
            2517608232,
            2874225571,
            1861159788,
            326777828,
            3124490320,
            2130389656,
            2716951837,
            967770486,
            1724537150,
            2185432712,
            2364442137,
            1164943284,
            2105845187,
            998989502,
            3765401048,
            2244026483,
            1075463327,
            1455516326,
            1322494562,
            910128902,
            469688178,
            1117454909,
            936433444,
            3490320968,
            3675253459,
            1240580251,
            122909385,
            2157517691,
            634681816,
            4142456567,
            3825094682,
            3061402683,
            2540495037,
            79693498,
            3249098678,
            1084186820,
            1583128258,
            426386531,
            1761308591,
            1047286709,
            322548459,
            995290223,
            1845252383,
            2603652396,
            3431023940,
            2942221577,
            3202600964,
            3727903485,
            1712269319,
            422464435,
            3234572375,
            1170764815,
            3523960633,
            3117677531,
            1434042557,
            442511882,
            3600875718,
            1076654713,
            1738483198,
            4213154764,
            2393238008,
            3677496056,
            1014306527,
            4251020053,
            793779912,
            2902807211,
            842905082,
            4246964064,
            1395751752,
            1040244610,
            2656851899,
            3396308128,
            445077038,
            3742853595,
            3577915638,
            679411651,
            2892444358,
            2354009459,
            1767581616,
            3150600392,
            3791627101,
            3102740896,
            284835224,
            4246832056,
            1258075500,
            768725851,
            2589189241,
            3069724005,
            3532540348,
            1274779536,
            3789419226,
            2764799539,
            1660621633,
            3471099624,
            4011903706,
            913787905,
            3497959166,
            737222580,
            2514213453,
            2928710040,
            3937242737,
            1804850592,
            3499020752,
            2949064160,
            2386320175,
            2390070455,
            2415321851,
            4061277028,
            2290661394,
            2416832540,
            1336762016,
            1754252060,
            3520065937,
            3014181293,
            791618072,
            3188594551,
            3933548030,
            2332172193,
            3852520463,
            3043980520,
            413987798,
            3465142937,
            3030929376,
            4245938359,
            2093235073,
            3534596313,
            375366246,
            2157278981,
            2479649556,
            555357303,
            3870105701,
            2008414854,
            3344188149,
            4221384143,
            3956125452,
            2067696032,
            3594591187,
            2921233993,
            2428461,
            544322398,
            577241275,
            1471733935,
            610547355,
            4027169054,
            1432588573,
            1507829418,
            2025931657,
            3646575487,
            545086370,
            48609733,
            2200306550,
            1653985193,
            298326376,
            1316178497,
            3007786442,
            2064951626,
            458293330,
            2589141269,
            3591329599,
            3164325604,
            727753846,
            2179363840,
            146436021,
            1461446943,
            4069977195,
            705550613,
            3059967265,
            3887724982,
            4281599278,
            3313849956,
            1404054877,
            2845806497,
            146425753,
            1854211946
          ],
          [
            1266315497,
            3048417604,
            3681880366,
            3289982499,
            290971e4,
            1235738493,
            2632868024,
            2414719590,
            3970600049,
            1771706367,
            1449415276,
            3266420449,
            422970021,
            1963543593,
            2690192192,
            3826793022,
            1062508698,
            1531092325,
            1804592342,
            2583117782,
            2714934279,
            4024971509,
            1294809318,
            4028980673,
            1289560198,
            2221992742,
            1669523910,
            35572830,
            157838143,
            1052438473,
            1016535060,
            1802137761,
            1753167236,
            1386275462,
            3080475397,
            2857371447,
            1040679964,
            2145300060,
            2390574316,
            1461121720,
            2956646967,
            4031777805,
            4028374788,
            33600511,
            2920084762,
            1018524850,
            629373528,
            3691585981,
            3515945977,
            2091462646,
            2486323059,
            586499841,
            988145025,
            935516892,
            3367335476,
            2599673255,
            2839830854,
            265290510,
            3972581182,
            2759138881,
            3795373465,
            1005194799,
            847297441,
            406762289,
            1314163512,
            1332590856,
            1866599683,
            4127851711,
            750260880,
            613907577,
            1450815602,
            3165620655,
            3734664991,
            3650291728,
            3012275730,
            3704569646,
            1427272223,
            778793252,
            1343938022,
            2676280711,
            2052605720,
            1946737175,
            3164576444,
            3914038668,
            3967478842,
            3682934266,
            1661551462,
            3294938066,
            4011595847,
            840292616,
            3712170807,
            616741398,
            312560963,
            711312465,
            1351876610,
            322626781,
            1910503582,
            271666773,
            2175563734,
            1594956187,
            70604529,
            3617834859,
            1007753275,
            1495573769,
            4069517037,
            2549218298,
            2663038764,
            504708206,
            2263041392,
            3941167025,
            2249088522,
            1514023603,
            1998579484,
            1312622330,
            694541497,
            2582060303,
            2151582166,
            1382467621,
            776784248,
            2618340202,
            3323268794,
            2497899128,
            2784771155,
            503983604,
            4076293799,
            907881277,
            423175695,
            432175456,
            1378068232,
            4145222326,
            3954048622,
            3938656102,
            3820766613,
            2793130115,
            2977904593,
            26017576,
            3274890735,
            3194772133,
            1700274565,
            1756076034,
            4006520079,
            3677328699,
            720338349,
            1533947780,
            354530856,
            688349552,
            3973924725,
            1637815568,
            332179504,
            3949051286,
            53804574,
            2852348879,
            3044236432,
            1282449977,
            3583942155,
            3416972820,
            4006381244,
            1617046695,
            2628476075,
            3002303598,
            1686838959,
            431878346,
            2686675385,
            1700445008,
            1080580658,
            1009431731,
            832498133,
            3223435511,
            2605976345,
            2271191193,
            2516031870,
            1648197032,
            4164389018,
            2548247927,
            300782431,
            375919233,
            238389289,
            3353747414,
            2531188641,
            2019080857,
            1475708069,
            455242339,
            2609103871,
            448939670,
            3451063019,
            1395535956,
            2413381860,
            1841049896,
            1491858159,
            885456874,
            4264095073,
            4001119347,
            1565136089,
            3898914787,
            1108368660,
            540939232,
            1173283510,
            2745871338,
            3681308437,
            4207628240,
            3343053890,
            4016749493,
            1699691293,
            1103962373,
            3625875870,
            2256883143,
            3830138730,
            1031889488,
            3479347698,
            1535977030,
            4236805024,
            3251091107,
            2132092099,
            1774941330,
            1199868427,
            1452454533,
            157007616,
            2904115357,
            342012276,
            595725824,
            1480756522,
            206960106,
            497939518,
            591360097,
            863170706,
            2375253569,
            3596610801,
            1814182875,
            2094937945,
            3421402208,
            1082520231,
            3463918190,
            2785509508,
            435703966,
            3908032597,
            1641649973,
            2842273706,
            3305899714,
            1510255612,
            2148256476,
            2655287854,
            3276092548,
            4258621189,
            236887753,
            3681803219,
            274041037,
            1734335097,
            3815195456,
            3317970021,
            1899903192,
            1026095262,
            4050517792,
            356393447,
            2410691914,
            3873677099,
            3682840055
          ],
          [
            3913112168,
            2491498743,
            4132185628,
            2489919796,
            1091903735,
            1979897079,
            3170134830,
            3567386728,
            3557303409,
            857797738,
            1136121015,
            1342202287,
            507115054,
            2535736646,
            337727348,
            3213592640,
            1301675037,
            2528481711,
            1895095763,
            1721773893,
            3216771564,
            62756741,
            2142006736,
            835421444,
            2531993523,
            1442658625,
            3659876326,
            2882144922,
            676362277,
            1392781812,
            170690266,
            3921047035,
            1759253602,
            3611846912,
            1745797284,
            664899054,
            1329594018,
            3901205900,
            3045908486,
            2062866102,
            2865634940,
            3543621612,
            3464012697,
            1080764994,
            553557557,
            3656615353,
            3996768171,
            991055499,
            499776247,
            1265440854,
            648242737,
            3940784050,
            980351604,
            3713745714,
            1749149687,
            3396870395,
            4211799374,
            3640570775,
            1161844396,
            3125318951,
            1431517754,
            545492359,
            4268468663,
            3499529547,
            1437099964,
            2702547544,
            3433638243,
            2581715763,
            2787789398,
            1060185593,
            1593081372,
            2418618748,
            4260947970,
            69676912,
            2159744348,
            86519011,
            2512459080,
            3838209314,
            1220612927,
            3339683548,
            133810670,
            1090789135,
            1078426020,
            1569222167,
            845107691,
            3583754449,
            4072456591,
            1091646820,
            628848692,
            1613405280,
            3757631651,
            526609435,
            236106946,
            48312990,
            2942717905,
            3402727701,
            1797494240,
            859738849,
            992217954,
            4005476642,
            2243076622,
            3870952857,
            3732016268,
            765654824,
            3490871365,
            2511836413,
            1685915746,
            3888969200,
            1414112111,
            2273134842,
            3281911079,
            4080962846,
            172450625,
            2569994100,
            980381355,
            4109958455,
            2819808352,
            2716589560,
            2568741196,
            3681446669,
            3329971472,
            1835478071,
            660984891,
            3704678404,
            4045999559,
            3422617507,
            3040415634,
            1762651403,
            1719377915,
            3470491036,
            2693910283,
            3642056355,
            3138596744,
            1364962596,
            2073328063,
            1983633131,
            926494387,
            3423689081,
            2150032023,
            4096667949,
            1749200295,
            3328846651,
            309677260,
            2016342300,
            1779581495,
            3079819751,
            111262694,
            1274766160,
            443224088,
            298511866,
            1025883608,
            3806446537,
            1145181785,
            168956806,
            3641502830,
            3584813610,
            1689216846,
            3666258015,
            3200248200,
            1692713982,
            2646376535,
            4042768518,
            1618508792,
            1610833997,
            3523052358,
            4130873264,
            2001055236,
            3610705100,
            2202168115,
            4028541809,
            2961195399,
            1006657119,
            2006996926,
            3186142756,
            1430667929,
            3210227297,
            1314452623,
            4074634658,
            4101304120,
            2273951170,
            1399257539,
            3367210612,
            3027628629,
            1190975929,
            2062231137,
            2333990788,
            2221543033,
            2438960610,
            1181637006,
            548689776,
            2362791313,
            3372408396,
            3104550113,
            3145860560,
            296247880,
            1970579870,
            3078560182,
            3769228297,
            1714227617,
            3291629107,
            3898220290,
            166772364,
            1251581989,
            493813264,
            448347421,
            195405023,
            2709975567,
            677966185,
            3703036547,
            1463355134,
            2715995803,
            1338867538,
            1343315457,
            2802222074,
            2684532164,
            233230375,
            2599980071,
            2000651841,
            3277868038,
            1638401717,
            4028070440,
            3237316320,
            6314154,
            819756386,
            300326615,
            590932579,
            1405279636,
            3267499572,
            3150704214,
            2428286686,
            3959192993,
            3461946742,
            1862657033,
            1266418056,
            963775037,
            2089974820,
            2263052895,
            1917689273,
            448879540,
            3550394620,
            3981727096,
            150775221,
            3627908307,
            1303187396,
            508620638,
            2975983352,
            2726630617,
            1817252668,
            1876281319,
            1457606340,
            908771278,
            3720792119,
            3617206836,
            2455994898,
            1729034894,
            1080033504
          ],
          [
            976866871,
            3556439503,
            2881648439,
            1522871579,
            1555064734,
            1336096578,
            3548522304,
            2579274686,
            3574697629,
            3205460757,
            3593280638,
            3338716283,
            3079412587,
            564236357,
            2993598910,
            1781952180,
            1464380207,
            3163844217,
            3332601554,
            1699332808,
            1393555694,
            1183702653,
            3581086237,
            1288719814,
            691649499,
            2847557200,
            2895455976,
            3193889540,
            2717570544,
            1781354906,
            1676643554,
            2592534050,
            3230253752,
            1126444790,
            2770207658,
            2633158820,
            2210423226,
            2615765581,
            2414155088,
            3127139286,
            673620729,
            2805611233,
            1269405062,
            4015350505,
            3341807571,
            4149409754,
            1057255273,
            2012875353,
            2162469141,
            2276492801,
            2601117357,
            993977747,
            3918593370,
            2654263191,
            753973209,
            36408145,
            2530585658,
            25011837,
            3520020182,
            2088578344,
            530523599,
            2918365339,
            1524020338,
            1518925132,
            3760827505,
            3759777254,
            1202760957,
            3985898139,
            3906192525,
            674977740,
            4174734889,
            2031300136,
            2019492241,
            3983892565,
            4153806404,
            3822280332,
            352677332,
            2297720250,
            60907813,
            90501309,
            3286998549,
            1016092578,
            2535922412,
            2839152426,
            457141659,
            509813237,
            4120667899,
            652014361,
            1966332200,
            2975202805,
            55981186,
            2327461051,
            676427537,
            3255491064,
            2882294119,
            3433927263,
            1307055953,
            942726286,
            933058658,
            2468411793,
            3933900994,
            4215176142,
            1361170020,
            2001714738,
            2830558078,
            3274259782,
            1222529897,
            1679025792,
            2729314320,
            3714953764,
            1770335741,
            151462246,
            3013232138,
            1682292957,
            1483529935,
            471910574,
            1539241949,
            458788160,
            3436315007,
            1807016891,
            3718408830,
            978976581,
            1043663428,
            3165965781,
            1927990952,
            4200891579,
            2372276910,
            3208408903,
            3533431907,
            1412390302,
            2931980059,
            4132332400,
            1947078029,
            3881505623,
            4168226417,
            2941484381,
            1077988104,
            1320477388,
            886195818,
            18198404,
            3786409e3,
            2509781533,
            112762804,
            3463356488,
            1866414978,
            891333506,
            18488651,
            661792760,
            1628790961,
            3885187036,
            3141171499,
            876946877,
            2693282273,
            1372485963,
            791857591,
            2686433993,
            3759982718,
            3167212022,
            3472953795,
            2716379847,
            445679433,
            3561995674,
            3504004811,
            3574258232,
            54117162,
            3331405415,
            2381918588,
            3769707343,
            4154350007,
            1140177722,
            4074052095,
            668550556,
            3214352940,
            367459370,
            261225585,
            2610173221,
            4209349473,
            3468074219,
            3265815641,
            314222801,
            3066103646,
            3808782860,
            282218597,
            3406013506,
            3773591054,
            379116347,
            1285071038,
            846784868,
            2669647154,
            3771962079,
            3550491691,
            2305946142,
            453669953,
            1268987020,
            3317592352,
            3279303384,
            3744833421,
            2610507566,
            3859509063,
            266596637,
            3847019092,
            517658769,
            3462560207,
            3443424879,
            370717030,
            4247526661,
            2224018117,
            4143653529,
            4112773975,
            2788324899,
            2477274417,
            1456262402,
            2901442914,
            1517677493,
            1846949527,
            2295493580,
            3734397586,
            2176403920,
            1280348187,
            1908823572,
            3871786941,
            846861322,
            1172426758,
            3287448474,
            3383383037,
            1655181056,
            3139813346,
            901632758,
            1897031941,
            2986607138,
            3066810236,
            3447102507,
            1393639104,
            373351379,
            950779232,
            625454576,
            3124240540,
            4148612726,
            2007998917,
            544563296,
            2244738638,
            2330496472,
            2058025392,
            1291430526,
            424198748,
            50039436,
            29584100,
            3605783033,
            2429876329,
            2791104160,
            1057563949,
            3255363231,
            3075367218,
            3463963227,
            1469046755,
            985887462
          ]
        ];
        var BLOWFISH_CTX = {
          pbox: [],
          sbox: []
        };
        function F(ctx, x) {
          let a = x >> 24 & 255;
          let b = x >> 16 & 255;
          let c = x >> 8 & 255;
          let d = x & 255;
          let y = ctx.sbox[0][a] + ctx.sbox[1][b];
          y = y ^ ctx.sbox[2][c];
          y = y + ctx.sbox[3][d];
          return y;
        }
        function BlowFish_Encrypt(ctx, left, right) {
          let Xl = left;
          let Xr = right;
          let temp;
          for (let i = 0; i < N; ++i) {
            Xl = Xl ^ ctx.pbox[i];
            Xr = F(ctx, Xl) ^ Xr;
            temp = Xl;
            Xl = Xr;
            Xr = temp;
          }
          temp = Xl;
          Xl = Xr;
          Xr = temp;
          Xr = Xr ^ ctx.pbox[N];
          Xl = Xl ^ ctx.pbox[N + 1];
          return { left: Xl, right: Xr };
        }
        function BlowFish_Decrypt(ctx, left, right) {
          let Xl = left;
          let Xr = right;
          let temp;
          for (let i = N + 1; i > 1; --i) {
            Xl = Xl ^ ctx.pbox[i];
            Xr = F(ctx, Xl) ^ Xr;
            temp = Xl;
            Xl = Xr;
            Xr = temp;
          }
          temp = Xl;
          Xl = Xr;
          Xr = temp;
          Xr = Xr ^ ctx.pbox[1];
          Xl = Xl ^ ctx.pbox[0];
          return { left: Xl, right: Xr };
        }
        function BlowFishInit(ctx, key, keysize) {
          for (let Row = 0; Row < 4; Row++) {
            ctx.sbox[Row] = [];
            for (let Col = 0; Col < 256; Col++) {
              ctx.sbox[Row][Col] = ORIG_S[Row][Col];
            }
          }
          let keyIndex = 0;
          for (let index = 0; index < N + 2; index++) {
            ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
            keyIndex++;
            if (keyIndex >= keysize) {
              keyIndex = 0;
            }
          }
          let Data1 = 0;
          let Data2 = 0;
          let res = 0;
          for (let i = 0; i < N + 2; i += 2) {
            res = BlowFish_Encrypt(ctx, Data1, Data2);
            Data1 = res.left;
            Data2 = res.right;
            ctx.pbox[i] = Data1;
            ctx.pbox[i + 1] = Data2;
          }
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 256; j += 2) {
              res = BlowFish_Encrypt(ctx, Data1, Data2);
              Data1 = res.left;
              Data2 = res.right;
              ctx.sbox[i][j] = Data1;
              ctx.sbox[i][j + 1] = Data2;
            }
          }
          return true;
        }
        var Blowfish = C_algo.Blowfish = BlockCipher.extend({
          _doReset: function() {
            if (this._keyPriorReset === this._key) {
              return;
            }
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            BlowFishInit(BLOWFISH_CTX, keyWords, keySize);
          },
          encryptBlock: function(M, offset) {
            var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
            M[offset] = res.left;
            M[offset + 1] = res.right;
          },
          decryptBlock: function(M, offset) {
            var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
            M[offset] = res.left;
            M[offset + 1] = res.right;
          },
          blockSize: 64 / 32,
          keySize: 128 / 32,
          ivSize: 64 / 32
        });
        C.Blowfish = BlockCipher._createHelper(Blowfish);
      })();
      return CryptoJS3.Blowfish;
    });
  }
});

// node_modules/crypto-js/index.js
var require_crypto_js = __commonJS({
  "node_modules/crypto-js/index.js"(exports, module3) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module3.exports = exports = factory(require_core(), require_x64_core(), require_lib_typedarrays(), require_enc_utf16(), require_enc_base64(), require_enc_base64url(), require_md5(), require_sha1(), require_sha256(), require_sha224(), require_sha512(), require_sha384(), require_sha3(), require_ripemd160(), require_hmac(), require_pbkdf2(), require_evpkdf(), require_cipher_core(), require_mode_cfb(), require_mode_ctr(), require_mode_ctr_gladman(), require_mode_ofb(), require_mode_ecb(), require_pad_ansix923(), require_pad_iso10126(), require_pad_iso97971(), require_pad_zeropadding(), require_pad_nopadding(), require_format_hex(), require_aes(), require_tripledes(), require_rc4(), require_rabbit(), require_rabbit_legacy(), require_blowfish());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./enc-base64url", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy", "./blowfish"], factory);
      } else {
        root.CryptoJS = factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      return CryptoJS3;
    });
  }
});

// node_modules/@particle-network/analytics/es/index.js
init_esm_browser();
var AcitveLoginType = ((AcitveLoginType2) => {
  AcitveLoginType2["PARTICLE"] = "particle";
  AcitveLoginType2["PRIVATE_KEY"] = "private_key";
  AcitveLoginType2["METAMASK"] = "metamask";
  AcitveLoginType2["RAINBOW"] = "rainbow";
  AcitveLoginType2["TRUST"] = "trust";
  AcitveLoginType2["IM_TOKEN"] = "im_token";
  AcitveLoginType2["BIT_KEEP"] = "bit_keep";
  AcitveLoginType2["PHANTOM"] = "phantom";
  AcitveLoginType2["OTHER"] = "other";
  return AcitveLoginType2;
})(AcitveLoginType || {});
var ActiveAction = ((ActiveAction2) => {
  ActiveAction2["SIGN"] = "sign";
  ActiveAction2["LOGIN"] = "login";
  ActiveAction2["OPEN"] = "open";
  ActiveAction2["OPEN_WALLET"] = "open_wallet";
  return ActiveAction2;
})(ActiveAction || {});
var RecordType = ((RecordType2) => {
  RecordType2["PAGE_LOGIN_BUTTON_CLICK"] = "page_login_button_click";
  RecordType2["PAGE_LOGIN_BUTTON_CLICK_SUCCESS"] = "page_login_button_click_success";
  RecordType2["PAGE_LOGIN_BUTTON_CLICK_FAILURE"] = "page_login_button_click_failure";
  RecordType2["PAGE_LOGIN_SUCCESS_BACK"] = "page_login_success_back";
  RecordType2["PAGE_SIGN_CONFIRM_BUTTON_CLICK"] = "page_sign_confirm_button_click";
  RecordType2["PAGE_SIGN_CONFIRM_BUTTON_CLICK_SUCCESS"] = "page_sign_confirm_button_click_success";
  RecordType2["PAGE_SIGN_CONFIRM_BUTTON_CLICK_FAILURE"] = "page_sign_confirm_button_click_failure";
  RecordType2["PAGE_SETTING_MASTER_PASSWORD_ENTER"] = "page_setting_master_password_enter";
  RecordType2["PAGE_SETTING_MASTER_PASSWORD_SET"] = "page_setting_master_password_set";
  RecordType2["PAGE_SETTING_MASTER_PASSWORD_CHANGE"] = "page_setting_master_password_change";
  RecordType2["PAGE_MASTER_PASSWORD_VERIFY"] = "page_master_password_verify";
  RecordType2["PAGE_MASTER_PASSWORD_VERIFY_SUCCESS"] = "page_master_password_verify_success";
  return RecordType2;
})(RecordType || {});
var BI = class {
  constructor(options) {
    this.options = options;
  }
  active(params) {
    const timestamp = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
    const randomStr = v4_default();
    const { project_uuid, project_key, project_app_uuid } = this.options.project_config;
    const queryParams = {
      timestamp,
      random_str: randomStr,
      project_app_uuid,
      projectUuid: project_uuid,
      projectKey: project_key
    };
    let url = this.options.sdk_api_domain + "/active?";
    Object.keys(queryParams).forEach((key) => {
      url += `${key}=${encodeURI(queryParams[key])}&`;
    });
    url = url.slice(0, -1);
    navigator.sendBeacon(
      url,
      new Blob([new URLSearchParams(params).toString()], {
        type: "application/x-www-form-urlencoded"
      })
    );
  }
  records(params) {
    try {
      const timestamp = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
      const randomStr = v4_default();
      const { project_uuid, project_key, project_app_uuid } = this.options.project_config;
      const queryParams = {
        timestamp,
        random_str: randomStr,
        project_app_uuid,
        projectUuid: project_uuid,
        projectKey: project_key
      };
      let url = this.options.sdk_api_domain + "/records?";
      Object.keys(queryParams).forEach((key) => {
        url += `${key}=${encodeURI(queryParams[key])}&`;
      });
      url = url.slice(0, -1);
      navigator.sendBeacon(
        url,
        new Blob([new URLSearchParams(params).toString()], {
          type: "application/x-www-form-urlencoded"
        })
      );
    } catch (error) {
    }
  }
};

// node_modules/@particle-network/chains/esm/index.js
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name3 in all)
    __defProp(target, name3, { get: all[name3], enumerable: true });
};
var Ethereum = {
  id: 1,
  name: "Ethereum",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/ethereum/native.png",
  nativeIcon: "",
  fullname: "Ethereum Mainnet",
  network: "Mainnet",
  website: "https://ethereum.org",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://ethereum.publicnode.com",
  blockExplorerUrl: "https://etherscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "LIGHT",
          version: "1.0.2"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var Optimism = {
  id: 10,
  name: "Optimism",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/optimism/native.png",
  nativeIcon: "",
  fullname: "Optimism Mainnet",
  network: "Mainnet",
  website: "https://optimism.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://mainnet.optimism.io",
  blockExplorerUrl: "https://optimistic.etherscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "LIGHT",
          version: "1.0.2"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var ThunderCoreTestnet = {
  id: 18,
  name: "ThunderCore",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/thundercore/native.png",
  nativeIcon: "",
  fullname: "ThunderCore Testnet",
  network: "Testnet",
  website: "https://thundercore.com",
  nativeCurrency: {
    name: "ThunderCore Token",
    symbol: "TT",
    decimals: 18
  },
  rpcUrl: "https://testnet-rpc.thundercore.com",
  faucetUrl: "https://faucet-testnet.thundercore.com",
  blockExplorerUrl: "https://explorer-testnet.thundercore.com"
};
var Elastos = {
  id: 20,
  name: "Elastos",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/elastos/native.png",
  nativeIcon: "",
  fullname: "Elastos Mainnet",
  network: "Mainnet",
  website: "https://elastos.org",
  nativeCurrency: {
    name: "ELA",
    symbol: "ELA",
    decimals: 18
  },
  rpcUrl: "https://api.elastos.io/esc",
  blockExplorerUrl: "https://esc.elastos.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Cronos = {
  id: 25,
  name: "Cronos",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/cronos/native.png",
  nativeIcon: "",
  fullname: "Cronos Mainnet",
  network: "Mainnet",
  website: "https://cronos.org",
  nativeCurrency: {
    name: "Cronos",
    symbol: "CRO",
    decimals: 18
  },
  rpcUrl: "https://evm.cronos.org",
  blockExplorerUrl: "https://cronoscan.com",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "SWAP"
    }
  ]
};
var BNBChain = {
  id: 56,
  name: "BSC",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bsc/native.png",
  nativeIcon: "https://static.particle.network/token-list/bsc/native.png",
  fullname: "BNB Chain",
  network: "Mainnet",
  website: "https://www.bnbchain.org/en",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrl: "https://bsc-dataseed1.binance.org",
  blockExplorerUrl: "https://bscscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var OKTCTestnet = {
  id: 65,
  name: "OKC",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/okc/native.png",
  nativeIcon: "",
  fullname: "OKTC Testnet",
  network: "Testnet",
  website: "https://www.okex.com/okexchain",
  nativeCurrency: {
    name: "OKT",
    symbol: "OKT",
    decimals: 18
  },
  rpcUrl: "https://exchaintestrpc.okex.org",
  faucetUrl: "https://docs.oxdex.com/v/en/help/gitter",
  blockExplorerUrl: "https://www.oklink.com/okc-test"
};
var OKTC = {
  id: 66,
  name: "OKC",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/okc/native.png",
  nativeIcon: "",
  fullname: "OKTC Mainnet",
  network: "Mainnet",
  website: "https://www.okex.com/okc",
  nativeCurrency: {
    name: "OKT",
    symbol: "OKT",
    decimals: 18
  },
  rpcUrl: "https://exchainrpc.okex.org",
  blockExplorerUrl: "https://www.oklink.com/okc",
  features: [
    {
      name: "SWAP"
    }
  ]
};
var ConfluxeSpaceTestnet = {
  id: 71,
  name: "ConfluxESpace",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/confluxespace/native.png",
  nativeIcon: "",
  fullname: "Conflux eSpace Testnet",
  network: "Testnet",
  website: "https://confluxnetwork.org",
  nativeCurrency: {
    name: "CFX",
    symbol: "CFX",
    decimals: 18
  },
  rpcUrl: "https://evmtestnet.confluxrpc.com",
  faucetUrl: "https://efaucet.confluxnetwork.org",
  blockExplorerUrl: "https://evmtestnet.confluxscan.net"
};
var Viction = {
  id: 88,
  name: "Viction",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/viction/native.png",
  nativeIcon: "",
  fullname: "Viction Mainnet",
  network: "Mainnet",
  website: "https://tomochain.com",
  nativeCurrency: {
    name: "Viction",
    symbol: "VIC",
    decimals: 18
  },
  rpcUrl: "https://rpc.viction.xyz",
  blockExplorerUrl: "https://vicscan.xyz",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var VictionTestnet = {
  id: 89,
  name: "Viction",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/viction/native.png",
  nativeIcon: "",
  fullname: "Viction Testnet",
  network: "Testnet",
  website: "https://tomochain.com",
  nativeCurrency: {
    name: "Viction",
    symbol: "VIC",
    decimals: 18
  },
  rpcUrl: "https://rpc-testnet.viction.xyz",
  blockExplorerUrl: "https://testnet.vicscan.xyz",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BNBChainTestnet = {
  id: 97,
  name: "BSC",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bsc/native.png",
  nativeIcon: "https://static.particle.network/token-list/bsc/native.png",
  fullname: "BNB Chain Testnet",
  network: "Testnet",
  website: "https://www.bnbchain.org/en",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
  faucetUrl: "https://testnet.bnbchain.org/faucet-smart",
  blockExplorerUrl: "https://testnet.bscscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    }
  ]
};
var Gnosis = {
  id: 100,
  name: "Gnosis",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/gnosis/native.png",
  nativeIcon: "",
  fullname: "Gnosis Mainnet",
  network: "Mainnet",
  website: "https://docs.gnosischain.com",
  nativeCurrency: {
    name: "Gnosis",
    symbol: "XDAI",
    decimals: 18
  },
  rpcUrl: "https://rpc.ankr.com/gnosis",
  blockExplorerUrl: "https://gnosisscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var Solana = {
  id: 101,
  name: "Solana",
  chainType: "solana",
  icon: "https://static.particle.network/token-list/solana/native.png",
  nativeIcon: "",
  fullname: "Solana Mainnet",
  network: "Mainnet",
  website: "https://solana.com",
  nativeCurrency: {
    name: "SOL",
    symbol: "SOL",
    decimals: 9
  },
  rpcUrl: "https://api.mainnet-beta.solana.com",
  blockExplorerUrl: "https://solscan.io",
  features: [
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var SolanaTestnet = {
  id: 102,
  name: "Solana",
  chainType: "solana",
  icon: "https://static.particle.network/token-list/solana/native.png",
  nativeIcon: "",
  fullname: "Solana Testnet",
  network: "Testnet",
  website: "https://solana.com",
  nativeCurrency: {
    name: "SOL",
    symbol: "SOL",
    decimals: 9
  },
  rpcUrl: "https://api.testnet.solana.com",
  faucetUrl: "https://solfaucet.com",
  blockExplorerUrl: "https://solscan.io"
};
var SolanaDevnet = {
  id: 103,
  name: "Solana",
  chainType: "solana",
  icon: "https://static.particle.network/token-list/solana/native.png",
  nativeIcon: "",
  fullname: "Solana Devnet",
  network: "Devnet",
  website: "https://solana.com",
  nativeCurrency: {
    name: "SOL",
    symbol: "SOL",
    decimals: 9
  },
  rpcUrl: "https://api.devnet.solana.com",
  faucetUrl: "https://solfaucet.com",
  blockExplorerUrl: "https://solscan.io"
};
var ThunderCore = {
  id: 108,
  name: "ThunderCore",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/thundercore/native.png",
  nativeIcon: "",
  fullname: "ThunderCore Mainnet",
  network: "Mainnet",
  website: "https://thundercore.com",
  nativeCurrency: {
    name: "ThunderCore Token",
    symbol: "TT",
    decimals: 18
  },
  rpcUrl: "https://mainnet-rpc.thundercore.com",
  blockExplorerUrl: "https://viewblock.io/thundercore"
};
var BOBTestnet = {
  id: 111,
  name: "BOB",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bob/native.png",
  nativeIcon: "",
  fullname: "BOB Testnet",
  network: "Testnet",
  website: "https://www.gobob.xyz",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://testnet.rpc.gobob.xyz",
  blockExplorerUrl: "https://testnet-explorer.gobob.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Fuse = {
  id: 122,
  name: "fuse",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/fuse/native.png",
  nativeIcon: "",
  fullname: "Fuse Mainnet",
  network: "Mainnet",
  website: "https://www.fuse.io",
  nativeCurrency: {
    name: "FUSE",
    symbol: "FUSE",
    decimals: 18
  },
  rpcUrl: "https://rpc.fuse.io",
  blockExplorerUrl: "https://explorer.fuse.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var FuseTestnet = {
  id: 123,
  name: "fuse",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/fuse/native.png",
  nativeIcon: "",
  fullname: "Fuse Testnet",
  network: "Testnet",
  website: "https://www.fuse.io",
  nativeCurrency: {
    name: "FUSE",
    symbol: "FUSE",
    decimals: 18
  },
  rpcUrl: "https://rpc.fusespark.io",
  blockExplorerUrl: "https://explorer.fusespark.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var HashKeyChainTestnet = {
  id: 133,
  name: "hsk",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/hsk/native.png",
  nativeIcon: "",
  fullname: "HashKey Chain Testnet",
  network: "Testnet",
  website: "https://group.hashkey.com/",
  nativeCurrency: {
    name: "HSK",
    symbol: "HSK",
    decimals: 18
  },
  rpcUrl: "https://hashkeychain-testnet.alt.technology",
  blockExplorerUrl: "https://hashkeychain-testnet-explorer.alt.technology",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Polygon = {
  id: 137,
  name: "Polygon",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/polygon/native.png",
  nativeIcon: "",
  fullname: "Polygon Mainnet",
  network: "Mainnet",
  website: "https://polygon.technology",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  },
  rpcUrl: "https://polygon-rpc.com",
  blockExplorerUrl: "https://polygonscan.com",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "LIGHT",
          version: "1.0.2"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var Manta = {
  id: 169,
  name: "Manta",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/manta/native.png",
  nativeIcon: "",
  fullname: "Manta Mainnet",
  network: "Mainnet",
  website: "https://manta.network",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://pacific-rpc.manta.network/http",
  blockExplorerUrl: "https://pacific-explorer.manta.network",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var HashKeyChain = {
  id: 177,
  name: "hsk",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/hsk/native.png",
  nativeIcon: "",
  fullname: "HashKey Chain Mainnet",
  network: "Mainnet",
  website: "https://group.hashkey.com/",
  nativeCurrency: {
    name: "HSK",
    symbol: "HSK",
    decimals: 18
  },
  rpcUrl: "https://mainnet.hsk.xyz",
  blockExplorerUrl: "https://explorer.hsk.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var XLayerTestnet = {
  id: 195,
  name: "OKBC",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/okc/native.png",
  nativeIcon: "",
  fullname: "X Layer Testnet",
  network: "Testnet",
  website: "https://www.okx.com",
  nativeCurrency: {
    name: "OKB",
    symbol: "OKB",
    decimals: 18
  },
  rpcUrl: "https://testrpc.xlayer.tech",
  blockExplorerUrl: "https://www.okx.com/explorer/xlayer-test",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var XLayer = {
  id: 196,
  name: "OKBC",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/okc/native.png",
  nativeIcon: "",
  fullname: "X Layer Mainnet",
  network: "Mainnet",
  website: "https://www.okx.com",
  nativeCurrency: {
    name: "OKB",
    symbol: "OKB",
    decimals: 18
  },
  rpcUrl: "https://rpc.xlayer.tech",
  blockExplorerUrl: "https://www.okx.com/zh-hans/explorer/xlayer",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var opBNB = {
  id: 204,
  name: "opBNB",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/opbnb/native.png",
  nativeIcon: "https://static.particle.network/token-list/bsc/native.png",
  fullname: "opBNB Mainnet",
  network: "Mainnet",
  website: "https://opbnb.bnbchain.org",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrl: "https://opbnb-mainnet-rpc.bnbchain.org",
  blockExplorerUrl: "https://mainnet.opbnbscan.com",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        }
      ]
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var MAPProtocolTestnet = {
  id: 212,
  name: "MAPProtocol",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/mapprotocol/native.png",
  nativeIcon: "",
  fullname: "MAP Protocol Testnet",
  network: "Testnet",
  website: "https://maplabs.io",
  nativeCurrency: {
    name: "MAPO",
    symbol: "MAPO",
    decimals: 18
  },
  rpcUrl: "https://testnet-rpc.maplabs.io",
  faucetUrl: "https://faucet.mapprotocol.io",
  blockExplorerUrl: "https://testnet.maposcan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BSquared = {
  id: 223,
  name: "BSquared",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bsquared/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "B² Network Mainnet",
  network: "Mainnet",
  website: "https://www.bsquared.network",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://rpc.bsquared.network",
  blockExplorerUrl: "https://explorer.bsquared.network",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Fantom = {
  id: 250,
  name: "Fantom",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/fantom/native.png",
  nativeIcon: "",
  fullname: "Fantom Mainnet",
  network: "Mainnet",
  website: "https://fantom.foundation",
  nativeCurrency: {
    name: "FTM",
    symbol: "FTM",
    decimals: 18
  },
  rpcUrl: "https://rpc.ftm.tools",
  blockExplorerUrl: "https://ftmscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var zkSyncEraSepolia = {
  id: 300,
  name: "zkSync",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zksync/native.png",
  nativeIcon: "",
  fullname: "zkSync Era Sepolia",
  network: "Sepolia",
  website: "https://era.zksync.io",
  nativeCurrency: {
    name: "zkSync",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://sepolia.era.zksync.dev",
  faucetUrl: "https://portal.zksync.io/faucet",
  blockExplorerUrl: "https://sepolia.explorer.zksync.io",
  features: [
    {
      name: "EIP1559"
    }
  ]
};
var KCC = {
  id: 321,
  name: "KCC",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/kcc/native.png",
  nativeIcon: "",
  fullname: "KCC Mainnet",
  network: "Mainnet",
  website: "https://kcc.io",
  nativeCurrency: {
    name: "KCS",
    symbol: "KCS",
    decimals: 18
  },
  rpcUrl: "https://rpc-mainnet.kcc.network",
  blockExplorerUrl: "https://explorer.kcc.io/en"
};
var KCCTestnet = {
  id: 322,
  name: "KCC",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/kcc/native.png",
  nativeIcon: "",
  fullname: "KCC Testnet",
  network: "Testnet",
  website: "https://scan-testnet.kcc.network",
  nativeCurrency: {
    name: "KCS",
    symbol: "KCS",
    decimals: 18
  },
  rpcUrl: "https://rpc-testnet.kcc.network",
  faucetUrl: "https://faucet-testnet.kcc.network",
  blockExplorerUrl: "https://scan-testnet.kcc.network"
};
var zkSyncEra = {
  id: 324,
  name: "zkSync",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zksync/native.png",
  nativeIcon: "",
  fullname: "zkSync Era",
  network: "Mainnet",
  website: "https://zksync.io",
  nativeCurrency: {
    name: "zkSync",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://zksync2-mainnet.zksync.io",
  blockExplorerUrl: "https://explorer.zksync.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var CronosTestnet = {
  id: 338,
  name: "Cronos",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/cronos/native.png",
  nativeIcon: "",
  fullname: "Cronos Testnet",
  network: "Testnet",
  website: "https://cronos.org",
  nativeCurrency: {
    name: "Cronos",
    symbol: "CRO",
    decimals: 18
  },
  rpcUrl: "https://evm-t3.cronos.org",
  faucetUrl: "https://cronos.org/faucet",
  blockExplorerUrl: "https://testnet.cronoscan.com",
  features: [
    {
      name: "EIP1559"
    }
  ]
};
var ModeTestnet = {
  id: 919,
  name: "Mode",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/mode/native.png",
  nativeIcon: "",
  fullname: "Mode Testnet",
  network: "Testnet",
  website: "https://www.mode.network",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://sepolia.mode.network",
  blockExplorerUrl: "https://sepolia.explorer.mode.network",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var fiveire = {
  id: 995,
  name: "fiveire",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/fiveire/native.png",
  nativeIcon: "",
  fullname: "5ire Mainnet",
  network: "Mainnet",
  website: "https://www.5ire.org",
  nativeCurrency: {
    name: "5IRE",
    symbol: "5IRE",
    decimals: 18
  },
  rpcUrl: "https://rpc.5ire.network",
  blockExplorerUrl: "https://5irescan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var fiveireTestnet = {
  id: 997,
  name: "fiveire",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/fiveire/native.png",
  nativeIcon: "",
  fullname: "5ire Testnet",
  network: "Testnet",
  website: "https://www.5ire.org",
  nativeCurrency: {
    name: "5IRE",
    symbol: "5IRE",
    decimals: 18
  },
  rpcUrl: "https://rpc.qa.5ire.network",
  blockExplorerUrl: "https://scan.qa.5ire.network",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var KlaytnTestnet = {
  id: 1001,
  name: "Klaytn",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/klaytn/native.png",
  nativeIcon: "",
  fullname: "Klaytn Testnet",
  network: "Testnet",
  website: "https://www.klaytn.com",
  nativeCurrency: {
    name: "Klaytn",
    symbol: "KLAY",
    decimals: 18
  },
  rpcUrl: "https://api.baobab.klaytn.net:8651",
  faucetUrl: "https://baobab.wallet.klaytn.foundation/faucet",
  blockExplorerUrl: "https://baobab.scope.klaytn.com"
};
var ConfluxeSpace = {
  id: 1030,
  name: "ConfluxESpace",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/confluxespace/native.png",
  nativeIcon: "",
  fullname: "Conflux eSpace",
  network: "Mainnet",
  website: "https://confluxnetwork.org",
  nativeCurrency: {
    name: "CFX",
    symbol: "CFX",
    decimals: 18
  },
  rpcUrl: "https://evm.confluxrpc.com",
  blockExplorerUrl: "https://evm.confluxscan.net",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    }
  ]
};
var Metis = {
  id: 1088,
  name: "Metis",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/metis/native.png",
  nativeIcon: "",
  fullname: "Metis Mainnet",
  network: "Mainnet",
  website: "https://www.metis.io",
  nativeCurrency: {
    name: "Metis",
    symbol: "METIS",
    decimals: 18
  },
  rpcUrl: "https://andromeda.metis.io/?owner=1088",
  blockExplorerUrl: "https://andromeda-explorer.metis.io"
};
var PolygonzkEVM = {
  id: 1101,
  name: "PolygonZkEVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/polygonzkevm/native.png",
  nativeIcon: "",
  fullname: "Polygon zkEVM",
  network: "Mainnet",
  website: "https://polygon.technology/polygon-zkevm",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://zkevm-rpc.com",
  blockExplorerUrl: "https://zkevm.polygonscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var CoreTestnet = {
  id: 1115,
  name: "Core",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/core/native.png",
  nativeIcon: "",
  fullname: "Core Testnet",
  network: "Testnet",
  website: "https://coredao.org",
  nativeCurrency: {
    name: "CORE",
    symbol: "CORE",
    decimals: 18
  },
  rpcUrl: "https://rpc.test.btcs.network",
  blockExplorerUrl: "https://scan.test.btcs.network",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Core = {
  id: 1116,
  name: "Core",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/core/native.png",
  nativeIcon: "",
  fullname: "Core Mainnet",
  network: "Mainnet",
  website: "https://coredao.org",
  nativeCurrency: {
    name: "CORE",
    symbol: "CORE",
    decimals: 18
  },
  rpcUrl: "https://rpc.coredao.org",
  blockExplorerUrl: "https://scan.coredao.org",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BSquaredTestnet = {
  id: 1123,
  name: "BSquared",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bsquared/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "B² Network Testnet",
  network: "Testnet",
  website: "https://www.bsquared.network",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://b2-testnet.alt.technology",
  blockExplorerUrl: "https://testnet-explorer.bsquared.network",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var HybridTestnet = {
  id: 1225,
  name: "Hybrid",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/hybrid/native.png",
  nativeIcon: "",
  fullname: "Hybrid Testnet",
  network: "Testnet",
  website: "https://buildonhybrid.com",
  nativeCurrency: {
    name: "HYB",
    symbol: "HYB",
    decimals: 18
  },
  rpcUrl: "https://hybrid-testnet.rpc.caldera.xyz/http",
  blockExplorerUrl: "https://explorer.buildonhybrid.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Moonbeam = {
  id: 1284,
  name: "Moonbeam",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/moonbeam/native.png",
  nativeIcon: "",
  fullname: "Moonbeam Mainnet",
  network: "Mainnet",
  website: "https://moonbeam.network/networks/moonbeam",
  nativeCurrency: {
    name: "GLMR",
    symbol: "GLMR",
    decimals: 18
  },
  rpcUrl: "https://rpc.api.moonbeam.network",
  blockExplorerUrl: "https://moonbeam.moonscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var Moonriver = {
  id: 1285,
  name: "Moonriver",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/moonriver/native.png",
  nativeIcon: "",
  fullname: "Moonriver Mainnet",
  network: "Mainnet",
  website: "https://moonbeam.network/networks/moonriver",
  nativeCurrency: {
    name: "MOVR",
    symbol: "MOVR",
    decimals: 18
  },
  rpcUrl: "https://rpc.api.moonriver.moonbeam.network",
  blockExplorerUrl: "https://moonriver.moonscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var MoonbeamTestnet = {
  id: 1287,
  name: "Moonbeam",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/moonbeam/native.png",
  nativeIcon: "",
  fullname: "Moonbeam Testnet",
  network: "Testnet",
  website: "https://docs.moonbeam.network/networks/testnet",
  nativeCurrency: {
    name: "Dev",
    symbol: "DEV",
    decimals: 18
  },
  rpcUrl: "https://rpc.api.moonbase.moonbeam.network",
  faucetUrl: "https://apps.moonbeam.network/moonbase-alpha/faucet",
  blockExplorerUrl: "https://moonbase.moonscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var SeiTestnet = {
  id: 1328,
  name: "Sei",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/sei/native.png",
  nativeIcon: "",
  fullname: "Sei Testnet",
  network: "Testnet",
  website: "https://www.sei.io",
  nativeCurrency: {
    name: "SEI",
    symbol: "SEI",
    decimals: 18
  },
  rpcUrl: "https://evm-rpc-testnet.sei-apis.com",
  blockExplorerUrl: "https://testnet.seistream.app",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Sei = {
  id: 1329,
  name: "Sei",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/sei/native.png",
  nativeIcon: "",
  fullname: "Sei Mainnet",
  network: "Mainnet",
  website: "https://www.sei.io",
  nativeCurrency: {
    name: "SEI",
    symbol: "SEI",
    decimals: 18
  },
  rpcUrl: "https://evm-rpc.sei-apis.com",
  blockExplorerUrl: "https://seistream.app",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BEVMCanary = {
  id: 1501,
  name: "BEVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bevm/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "BEVM Canary Mainnet",
  network: "Mainnet",
  website: "https://www.bevm.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://rpc-canary-1.bevm.io",
  blockExplorerUrl: "https://scan-canary.bevm.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BEVMCanaryTestnet = {
  id: 1502,
  name: "BEVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bevm/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "BEVM Canary Testnet",
  network: "Testnet",
  website: "https://www.bevm.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://canary-testnet.bevm.io",
  blockExplorerUrl: "https://scan-canary-testnet.bevm.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var StoryTestnet = {
  id: 1516,
  name: "StoryNetwork",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/storynetwork/native.png",
  nativeIcon: "",
  fullname: "Story Testnet",
  network: "Testnet",
  website: "https://www.story.foundation",
  nativeCurrency: {
    name: "IP",
    symbol: "IP",
    decimals: 18
  },
  rpcUrl: "https://odyssey.storyrpc.io",
  blockExplorerUrl: "https://odyssey-testnet-explorer.storyscan.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Gravity = {
  id: 1625,
  name: "Gravity",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/gravity/native.png",
  nativeIcon: "",
  fullname: "Gravity Mainnet",
  network: "Mainnet",
  website: "https://gravity.xyz",
  nativeCurrency: {
    name: "G",
    symbol: "G",
    decimals: 18
  },
  rpcUrl: "https://rpc.gravity.xyz",
  blockExplorerUrl: "https://gscan.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var ComboTestnet = {
  id: 1715,
  name: "Combo",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/combo/native.png",
  nativeIcon: "https://static.particle.network/token-list/bsc/native.png",
  fullname: "Combo Testnet",
  network: "Testnet",
  website: "https://docs.combonetwork.io",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrl: "https://test-rpc.combonetwork.io",
  blockExplorerUrl: "https://combotrace-testnet.nodereal.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var SoneiumMinatoTestnet = {
  id: 1946,
  name: "Soneium",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/soneium/native.png",
  nativeIcon: "",
  fullname: "Soneium Minato Testnet",
  network: "Testnet",
  website: "https://soneium.org",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.minato.soneium.org",
  blockExplorerUrl: "https://explorer-testnet.soneium.org",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var KavaTestnet = {
  id: 2221,
  name: "Kava",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/kava/native.png",
  nativeIcon: "",
  fullname: "Kava Testnet",
  network: "Testnet",
  website: "https://www.kava.io",
  nativeCurrency: {
    name: "KAVA",
    symbol: "KAVA",
    decimals: 18
  },
  rpcUrl: "https://evm.testnet.kava.io",
  faucetUrl: "https://faucet.kava.io",
  blockExplorerUrl: "https://testnet.kavascan.com"
};
var Kava = {
  id: 2222,
  name: "Kava",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/kava/native.png",
  nativeIcon: "",
  fullname: "Kava Mainnet",
  network: "Mainnet",
  website: "https://www.kava.io",
  nativeCurrency: {
    name: "KAVA",
    symbol: "KAVA",
    decimals: 18
  },
  rpcUrl: "https://evm.kava.io",
  blockExplorerUrl: "https://kavascan.com"
};
var PeaqKrest = {
  id: 2241,
  name: "peaq",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/peaq/native.png",
  nativeIcon: "",
  fullname: "Peaq Krest Mainnet",
  network: "Mainnet",
  website: "https://www.peaq.network",
  nativeCurrency: {
    name: "KRST",
    symbol: "KRST",
    decimals: 18
  },
  rpcUrl: "https://erpc-krest.peaq.network",
  blockExplorerUrl: "https://krest.subscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var GOATNetwork = {
  id: 2345,
  name: "Goat",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/goat/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "GOAT Network",
  network: "Mainnet",
  website: "https://www.goat.network",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://rpc.goat.network",
  blockExplorerUrl: "https://explorer.goat.network",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var PolygonzkEVMCardona = {
  id: 2442,
  name: "PolygonZkEVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/polygonzkevm/native.png",
  nativeIcon: "",
  fullname: "Polygon zkEVM Cardona",
  network: "Cardona",
  website: "https://polygon.technology",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.cardona.zkevm-rpc.com",
  blockExplorerUrl: "https://cardona-zkevm.polygonscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var AILayerTestnet = {
  id: 2648,
  name: "ainn",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/ainn/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "AILayer Testnet",
  network: "Testnet",
  website: "https://anvm.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://rpc.anvm.io",
  blockExplorerUrl: "https://explorer.anvm.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var AILayer = {
  id: 2649,
  name: "ainn",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/ainn/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "AILayer Mainnet",
  network: "Mainnet",
  website: "https://anvm.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://mainnet-rpc.ailayer.xyz",
  blockExplorerUrl: "https://mainnet-explorer.ailayer.xyz",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var GMNetwork = {
  id: 2777,
  name: "GMNetwork",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/gmnetwork/native.png",
  nativeIcon: "",
  fullname: "GM Network Mainnet",
  network: "Mainnet",
  website: "https://gmnetwork.ai",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.gmnetwork.ai",
  blockExplorerUrl: "https://scan.gmnetwork.ai",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var SatoshiVMAlpha = {
  id: 3109,
  name: "satoshivm",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/satoshivm/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "SatoshiVM Alpha",
  network: "Mainnet",
  website: "https://www.satoshivm.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://alpha-rpc-node-http.svmscan.io",
  blockExplorerUrl: "https://svmscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var SatoshiVMTestnet = {
  id: 3110,
  name: "SatoshiVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/satoshivm/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "SatoshiVM Testnet",
  network: "Testnet",
  website: "https://www.satoshivm.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://test-rpc-node-http.svmscan.io",
  blockExplorerUrl: "https://testnet.svmscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Peaq = {
  id: 3338,
  name: "peaq",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/peaq/native.png",
  nativeIcon: "",
  fullname: "Peaq Mainnet",
  network: "Mainnet",
  website: "https://peaq.subscan.io",
  nativeCurrency: {
    name: "PEAQ",
    symbol: "PEAQ",
    decimals: 18
  },
  rpcUrl: " https://evm.peaq.network",
  blockExplorerUrl: "https://peaq.subscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BotanixTestnet = {
  id: 3636,
  name: "Botanix",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/botanix/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "Botanix Testnet",
  network: "Testnet",
  website: "https://botanixlabs.xyz",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://node.botanixlabs.dev",
  blockExplorerUrl: "https://blockscout.botanixlabs.dev",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var AstarzkEVMMainet = {
  id: 3776,
  name: "AstarZkEVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/astarzkevm/native.png",
  nativeIcon: "",
  fullname: "Astar zkEVM Mainet",
  network: "Mainnet",
  website: "https://astar.network",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.startale.com/astar-zkevm",
  blockExplorerUrl: "https://astar-zkevm.explorer.startale.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var FantomTestnet = {
  id: 4002,
  name: "Fantom",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/fantom/native.png",
  nativeIcon: "",
  fullname: "Fantom Testnet",
  network: "Testnet",
  website: "https://docs.fantom.foundation/quick-start/short-guide#fantom-testnet",
  nativeCurrency: {
    name: "FTM",
    symbol: "FTM",
    decimals: 18
  },
  rpcUrl: "https://rpc.testnet.fantom.network",
  faucetUrl: "https://faucet.fantom.network",
  blockExplorerUrl: "https://testnet.ftmscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Merlin = {
  id: 4200,
  name: "Merlin",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/merlin/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "Merlin Mainnet",
  network: "Mainnet",
  website: "https://merlinprotocol.org",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://rpc.merlinchain.io",
  blockExplorerUrl: "https://scan.merlinchain.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var IoTeX = {
  id: 4689,
  name: "iotex",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/iotex/native.png",
  nativeIcon: "",
  fullname: "IoTeX Mainnet",
  network: "Mainnet",
  website: "https://iotex.io",
  nativeCurrency: {
    name: "IOTX",
    symbol: "IOTX",
    decimals: 18
  },
  rpcUrl: "https://babel-api.mainnet.iotex.io",
  blockExplorerUrl: "https://iotexscan.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var IoTeXTestnet = {
  id: 4690,
  name: "iotex",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/iotex/native.png",
  nativeIcon: "",
  fullname: "IoTeX Testnet",
  network: "Testnet",
  website: "https://iotex.io",
  nativeCurrency: {
    name: "IOTX",
    symbol: "IOTX",
    decimals: 18
  },
  rpcUrl: "https://babel-api.testnet.iotex.io",
  blockExplorerUrl: "https://testnet.iotexscan.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Mantle = {
  id: 5e3,
  name: "Mantle",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/mantle/native.png",
  nativeIcon: "",
  fullname: "Mantle Mainnet",
  network: "Mainnet",
  website: "https://mantle.xyz",
  nativeCurrency: {
    name: "MNT",
    symbol: "MNT",
    decimals: 18
  },
  rpcUrl: "https://rpc.mantle.xyz",
  blockExplorerUrl: "https://explorer.mantle.xyz",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var MantleSepoliaTestnet = {
  id: 5003,
  name: "Mantle",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/mantle/native.png",
  nativeIcon: "",
  fullname: "Mantle Sepolia Testnet",
  network: "Testnet",
  website: "https://mantle.xyz",
  nativeCurrency: {
    name: "MNT",
    symbol: "MNT",
    decimals: 18
  },
  rpcUrl: "https://rpc.sepolia.mantle.xyz",
  faucetUrl: "https://faucet.sepolia.mantle.xyz",
  blockExplorerUrl: "https://explorer.sepolia.mantle.xyz",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Duckchain = {
  id: 5545,
  name: "Duckchain",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/duckchain/native.png",
  nativeIcon: "https://static.particle.network/token-list/duckchain/ton.png",
  fullname: "Duckchain Mainnet",
  network: "Mainnet",
  website: "https://duckchain.io",
  nativeCurrency: {
    name: "TON",
    symbol: "TON",
    decimals: 18
  },
  rpcUrl: "https://rpc.duckchain.io",
  blockExplorerUrl: "https://scan.duckchain.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var opBNBTestnet = {
  id: 5611,
  name: "opBNB",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/opbnb/native.png",
  nativeIcon: "https://static.particle.network/token-list/bsc/native.png",
  fullname: "opBNB Testnet",
  network: "Testnet",
  website: "https://opbnb.bnbchain.org",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrl: "https://opbnb-testnet-rpc.bnbchain.org",
  blockExplorerUrl: "https://opbnb-testnet.bscscan.com",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var AuraTestnet = {
  id: 6321,
  name: "aura",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/aura/native.png",
  nativeIcon: "",
  fullname: "Aura Testnet",
  network: "Testnet",
  website: "https://aura.network",
  nativeCurrency: {
    name: "AURA",
    symbol: "AURA",
    decimals: 18
  },
  rpcUrl: "https://jsonrpc.euphoria.aura.network",
  blockExplorerUrl: "https://euphoria.aurascan.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Aura = {
  id: 6322,
  name: "aura",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/aura/native.png",
  nativeIcon: "",
  fullname: "Aura Mainnet",
  network: "Mainnet",
  website: "https://aura.network",
  nativeCurrency: {
    name: "AURA",
    symbol: "AURA",
    decimals: 18
  },
  rpcUrl: "https://jsonrpc.aura.network",
  blockExplorerUrl: "https://aurascan.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var ZetaChain = {
  id: 7e3,
  name: "ZetaChain",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zetachain/native.png",
  nativeIcon: "",
  fullname: "ZetaChain Mainnet",
  network: "Mainnet",
  website: "https://zetachain.com",
  nativeCurrency: {
    name: "ZETA",
    symbol: "ZETA",
    decimals: 18
  },
  rpcUrl: "https://zetachain-evm.blockpi.network/v1/rpc/public",
  blockExplorerUrl: "https://zetachain.blockscout.com",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var ZetaChainTestnet = {
  id: 7001,
  name: "ZetaChain",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zetachain/native.png",
  nativeIcon: "",
  fullname: "ZetaChain Testnet",
  network: "Testnet",
  website: "https://zetachain.com",
  nativeCurrency: {
    name: "ZETA",
    symbol: "ZETA",
    decimals: 18
  },
  rpcUrl: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
  faucetUrl: "https://labs.zetachain.com/get-zeta",
  blockExplorerUrl: "https://zetachain-athens-3.blockscout.com",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Cyber = {
  id: 7560,
  name: "Cyber",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/cyber/native.png",
  nativeIcon: "",
  fullname: "Cyber Mainnet",
  network: "Mainnet",
  website: "https://cyber-explorer.alt.technology",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://cyber.alt.technology",
  blockExplorerUrl: "https://cyberscan.co",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Klaytn = {
  id: 8217,
  name: "Klaytn",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/klaytn/native.png",
  nativeIcon: "",
  fullname: "Klaytn Mainnet",
  network: "Mainnet",
  website: "https://www.klaytn.com",
  nativeCurrency: {
    name: "Klaytn",
    symbol: "KLAY",
    decimals: 18
  },
  rpcUrl: "https://cypress.fandom.finance/archive",
  blockExplorerUrl: "https://scope.klaytn.com",
  features: [
    {
      name: "SWAP"
    }
  ]
};
var Lorenzo = {
  id: 8329,
  name: "lorenzo",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/lorenzo/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "Lorenzo Mainnet",
  network: "Mainnet",
  website: "https://lorenzo-protocol.xyz",
  nativeCurrency: {
    name: "stBTC",
    symbol: "stBTC",
    decimals: 18
  },
  rpcUrl: "https://rpc.lorenzo-protocol.xyz",
  blockExplorerUrl: "https://scan.lorenzo-protocol.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Base = {
  id: 8453,
  name: "Base",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/base/native.png",
  nativeIcon: "",
  fullname: "Base Mainnet",
  network: "Mainnet",
  website: "https://base.org",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://developer-access-mainnet.base.org",
  blockExplorerUrl: "https://basescan.org",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "LIGHT",
          version: "1.0.2"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var Combo = {
  id: 9980,
  name: "Combo",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/combo/native.png",
  nativeIcon: "https://static.particle.network/token-list/bsc/native.png",
  fullname: "Combo Mainnet",
  network: "Mainnet",
  website: "https://docs.combonetwork.io",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrl: "https://rpc.combonetwork.io",
  blockExplorerUrl: "https://combotrace.nodereal.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var PeaqAgungTestnet = {
  id: 9990,
  name: "peaq",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/peaq/native.png",
  nativeIcon: "",
  fullname: "Peaq Agung Testnet",
  network: "Testnet",
  website: "https://www.peaq.network",
  nativeCurrency: {
    name: "AGUNG",
    symbol: "AGUNG",
    decimals: 18
  },
  rpcUrl: "https://rpcpc1-qa.agung.peaq.network",
  blockExplorerUrl: "https://agung-testnet.subscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var GnosisTestnet = {
  id: 10200,
  name: "Gnosis",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/gnosis/native.png",
  nativeIcon: "",
  fullname: "Gnosis Testnet",
  network: "Testnet",
  website: "https://docs.gnosischain.com",
  nativeCurrency: {
    name: "Gnosis",
    symbol: "XDAI",
    decimals: 18
  },
  rpcUrl: "https://optimism.gnosischain.com",
  faucetUrl: "https://gnosisfaucet.com",
  blockExplorerUrl: "https://blockscout.com/gnosis/chiado",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BEVM = {
  id: 11501,
  name: "BEVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bevm/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "BEVM Mainnet",
  network: "Mainnet",
  website: "https://www.bevm.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://rpc-mainnet-1.bevm.io",
  blockExplorerUrl: "https://scan-mainnet.bevm.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BEVMTestnet = {
  id: 11503,
  name: "BEVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bevm/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "BEVM Testnet",
  network: "Testnet",
  website: "https://www.bevm.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://testnet.bevm.io",
  blockExplorerUrl: "https://scan-testnet.bevm.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var ReadONTestnet = {
  id: 12015,
  name: "ReadON",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/readon/native.png",
  nativeIcon: "",
  fullname: "ReadON Testnet",
  network: "Testnet",
  website: "https://opside.network",
  nativeCurrency: {
    name: "READ",
    symbol: "READ",
    decimals: 18
  },
  rpcUrl: "https://pre-alpha-zkrollup-rpc.opside.network/readon-content-test-chain",
  blockExplorerUrl: "https://readon-content-test-chain.zkevm.opside.info",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var ImmutablezkEVMTestnet = {
  id: 13473,
  name: "Immutable",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/immutable/native.png",
  nativeIcon: "",
  fullname: "Immutable zkEVM Testnet",
  network: "Testnet",
  website: "https://www.immutable.com",
  nativeCurrency: {
    name: "IMX",
    symbol: "IMX",
    decimals: 18
  },
  rpcUrl: "https://rpc.testnet.immutable.com",
  blockExplorerUrl: "https://explorer.testnet.immutable.com",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var GravityTestnet = {
  id: 13505,
  name: "Gravity",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/gravity/native.png",
  nativeIcon: "",
  fullname: "Gravity Testnet",
  network: "Testnet",
  website: "https://gravity.xyz",
  nativeCurrency: {
    name: "G",
    symbol: "G",
    decimals: 18
  },
  rpcUrl: "https://rpc-sepolia.gravity.xyz",
  blockExplorerUrl: " https://explorer-sepolia.gravity.xyz",
  features: [
    {
      name: "EIP1559"
    }
  ]
};
var EOSEVMTestnet = {
  id: 15557,
  name: "Eosevm",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/eosevm/native.png",
  nativeIcon: "",
  fullname: "EOS EVM Testnet",
  network: "Testnet",
  website: "https://eosnetwork.com",
  nativeCurrency: {
    name: "EOS",
    symbol: "EOS",
    decimals: 18
  },
  rpcUrl: "https://api.testnet.evm.eosnetwork.com",
  faucetUrl: "https://bridge.testnet.evm.eosnetwork.com",
  blockExplorerUrl: "https://explorer.testnet.evm.eosnetwork.com"
};
var EthereumHolesky = {
  id: 17e3,
  name: "Ethereum",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/ethereum/native.png",
  nativeIcon: "",
  fullname: "Ethereum Holesky",
  network: "Holesky",
  website: "https://holesky.ethpandaops.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://ethereum-holesky.blockpi.network/v1/rpc/public",
  faucetUrl: "https://faucet.quicknode.com/drip",
  blockExplorerUrl: "https://holesky.etherscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var EOSEVM = {
  id: 17777,
  name: "Eosevm",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/eosevm/native.png",
  nativeIcon: "",
  fullname: "EOS EVM",
  network: "Mainnet",
  website: "https://eosnetwork.com",
  nativeCurrency: {
    name: "EOS",
    symbol: "EOS",
    decimals: 18
  },
  rpcUrl: "https://api.evm.eosnetwork.com",
  blockExplorerUrl: "https://explorer.evm.eosnetwork.com"
};
var MAPProtocol = {
  id: 22776,
  name: "MAPProtocol",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/mapprotocol/native.png",
  nativeIcon: "",
  fullname: "MAP Protocol",
  network: "Mainnet",
  website: "https://maplabs.io",
  nativeCurrency: {
    name: "MAPO",
    symbol: "MAPO",
    decimals: 18
  },
  rpcUrl: "https://rpc.maplabs.io",
  blockExplorerUrl: "https://mapscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Zeroone = {
  id: 27827,
  name: "Zeroone",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zeroone/native.png",
  nativeIcon: "",
  fullname: "Zeroone Mainnet",
  network: "Mainnet",
  website: "https://zeroone.art",
  nativeCurrency: {
    name: "ZERO",
    symbol: "ZERO",
    decimals: 18
  },
  rpcUrl: "https://subnets.avax.network/zeroonemai/mainnet/rpc",
  blockExplorerUrl: "https://subnets.avax.network/zeroonemai",
  features: [
    {
      name: "EIP1559"
    }
  ]
};
var MovementDevnet = {
  id: 30732,
  name: "Movement",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/movement/native.png",
  nativeIcon: "",
  fullname: "Movement Devnet",
  network: "Devnet",
  website: "https://movementlabs.xyz",
  nativeCurrency: {
    name: "MOVE",
    symbol: "MOVE",
    decimals: 18
  },
  rpcUrl: "https://mevm.devnet.imola.movementnetwork.xyz",
  blockExplorerUrl: "https://explorer.devnet.imola.movementnetwork.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Mode = {
  id: 34443,
  name: "Mode",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/mode/native.png",
  nativeIcon: "",
  fullname: "Mode Mainnet",
  network: "Mainnet",
  website: "https://www.mode.network",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://mainnet.mode.network",
  blockExplorerUrl: "https://explorer.mode.network",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var ArbitrumOne = {
  id: 42161,
  name: "Arbitrum",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/arbitrum/native.png",
  nativeIcon: "",
  fullname: "Arbitrum One",
  network: "Mainnet",
  website: "https://arbitrum.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://arb1.arbitrum.io/rpc",
  blockExplorerUrl: "https://arbiscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "LIGHT",
          version: "1.0.2"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var ArbitrumNova = {
  id: 42170,
  name: "Arbitrum",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/arbitrum/native.png",
  nativeIcon: "",
  fullname: "Arbitrum Nova",
  network: "Mainnet",
  website: "https://arbitrum.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://nova.arbitrum.io/rpc",
  blockExplorerUrl: "https://nova.arbiscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Celo = {
  id: 42220,
  name: "Celo",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/celo/native.png",
  nativeIcon: "",
  fullname: "Celo Mainnet",
  network: "Mainnet",
  website: "https://docs.celo.org",
  nativeCurrency: {
    name: "Celo",
    symbol: "CELO",
    decimals: 18
  },
  rpcUrl: "https://rpc.ankr.com/celo",
  blockExplorerUrl: "https://explorer.celo.org/mainnet",
  features: [
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var OasisEmeraldTestnet = {
  id: 42261,
  name: "OasisEmerald",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/oasisemerald/native.png",
  nativeIcon: "",
  fullname: "OasisEmerald Testnet",
  network: "Testnet",
  website: "https://docs.oasis.io/dapp/emerald",
  nativeCurrency: {
    name: "OasisEmerald",
    symbol: "ROSE",
    decimals: 18
  },
  rpcUrl: "https://testnet.emerald.oasis.dev",
  faucetUrl: "https://faucet.testnet.oasis.dev",
  blockExplorerUrl: "https://testnet.explorer.emerald.oasis.dev"
};
var OasisEmerald = {
  id: 42262,
  name: "OasisEmerald",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/oasisemerald/native.png",
  nativeIcon: "",
  fullname: "OasisEmerald Mainnet",
  network: "Mainnet",
  website: "https://docs.oasis.io/dapp/emerald",
  nativeCurrency: {
    name: "OasisEmerald",
    symbol: "ROSE",
    decimals: 18
  },
  rpcUrl: "https://emerald.oasis.dev",
  blockExplorerUrl: "https://explorer.emerald.oasis.dev"
};
var ZKFair = {
  id: 42766,
  name: "ZKFair",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zkfair/native.png",
  nativeIcon: "https://static.particle.network/token-list/zkfair/usdc.png",
  fullname: "ZKFair Mainnet",
  network: "Mainnet",
  website: "https://zkfair.io",
  nativeCurrency: {
    name: "ZKF",
    symbol: "USDC",
    decimals: 18
  },
  rpcUrl: "https://rpc.zkfair.io",
  blockExplorerUrl: "https://scan.zkfair.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var AvalancheTestnet = {
  id: 43113,
  name: "Avalanche",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/avalanche/native.png",
  nativeIcon: "",
  fullname: "Avalanche Testnet",
  network: "Testnet",
  website: "https://cchain.explorer.avax-test.network",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18
  },
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  faucetUrl: "https://faucet.avax.network",
  blockExplorerUrl: "https://testnet.snowtrace.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Avalanche = {
  id: 43114,
  name: "Avalanche",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/avalanche/native.png",
  nativeIcon: "",
  fullname: "Avalanche Mainnet",
  network: "Mainnet",
  website: "https://www.avax.network",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18
  },
  rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  blockExplorerUrl: "https://snowtrace.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "1.0.0"
        },
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var ZKFairTestnet = {
  id: 43851,
  name: "ZKFair",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zkfair/native.png",
  nativeIcon: "https://static.particle.network/token-list/zkfair/usdc.png",
  fullname: "ZKFair Testnet",
  network: "Testnet",
  website: "https://zkfair.io",
  nativeCurrency: {
    name: "ZKF",
    symbol: "USDC",
    decimals: 18
  },
  rpcUrl: "https://testnet-rpc.zkfair.io",
  blockExplorerUrl: "https://testnet-scan.zkfair.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var CeloTestnet = {
  id: 44787,
  name: "Celo",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/celo/native.png",
  nativeIcon: "",
  fullname: "Celo Testnet",
  network: "Testnet",
  website: "https://docs.celo.org",
  nativeCurrency: {
    name: "Celo",
    symbol: "CELO",
    decimals: 18
  },
  rpcUrl: "https://alfajores-forno.celo-testnet.org",
  faucetUrl: "https://celo.org/developers/faucet",
  blockExplorerUrl: "https://explorer.celo.org/alfajores"
};
var GOATTestnet3 = {
  id: 48816,
  name: "Goat",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/goat/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "GOAT Testnet3",
  network: "Testnet",
  website: "https://www.goat.network",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://rpc.testnet3.goat.network",
  blockExplorerUrl: "https://explorer.testnet3.goat.network",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var ZircuitTestnet = {
  id: 48899,
  name: "Zircuit",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zircuit/native.png",
  nativeIcon: "",
  fullname: "Zircuit Testnet",
  network: "Testnet",
  website: "https://www.zircuit.com",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://zircuit1.p2pify.com",
  blockExplorerUrl: "https://explorer.testnet.zircuit.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var DODOChainTestnet = {
  id: 53457,
  name: "DODOChain",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/dodochain/native.png",
  nativeIcon: "",
  fullname: "DODOChain Testnet",
  network: "Testnet",
  website: "https://www.dodochain.com",
  nativeCurrency: {
    name: "DODO",
    symbol: "DODO",
    decimals: 18
  },
  rpcUrl: "https://dodochain-testnet.alt.technology",
  blockExplorerUrl: "https://testnet-scan.dodochain.com",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var ZerooneTestnet = {
  id: 56400,
  name: "Zeroone",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zeroone/native.png",
  nativeIcon: "",
  fullname: "Zeroone Testnet",
  network: "Testnet",
  website: "https://zeroone.art",
  nativeCurrency: {
    name: "ZERO",
    symbol: "ZERO",
    decimals: 18
  },
  rpcUrl: "https://subnets.avax.network/testnetzer/testnet/rpc",
  blockExplorerUrl: "https://subnets-test.avax.network/testnetzer",
  features: [
    {
      name: "EIP1559"
    }
  ]
};
var LineaSepolia = {
  id: 59141,
  name: "Linea",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/linea/native.png",
  nativeIcon: "",
  fullname: "Linea Sepolia",
  network: "Sepolia",
  website: "https://linea.build",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.sepolia.linea.build",
  faucetUrl: "https://faucet.goerli.linea.build",
  blockExplorerUrl: "https://sepolia.lineascan.build",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Linea = {
  id: 59144,
  name: "Linea",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/linea/native.png",
  nativeIcon: "",
  fullname: "Linea Mainnet",
  network: "Mainnet",
  website: "https://linea.build",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.linea.build",
  blockExplorerUrl: "https://lineascan.build",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    },
    {
      name: "SWAP"
    },
    {
      name: "ON-RAMP"
    }
  ]
};
var BOB = {
  id: 60808,
  name: "BOB",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bob/native.png",
  nativeIcon: "",
  fullname: "BOB Mainnet",
  network: "Mainnet",
  website: "https://www.gobob.xyz",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.gobob.xyz",
  blockExplorerUrl: "https://explorer.gobob.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var PolygonAmoy = {
  id: 80002,
  name: "Polygon",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/polygon/native.png",
  nativeIcon: "",
  fullname: "Polygon Amoy",
  network: "Amoy",
  website: "https://polygon.technology",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  },
  rpcUrl: "https://rpc-amoy.polygon.technology",
  blockExplorerUrl: "https://www.oklink.com/amoy",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var BerachainbArtio = {
  id: 80084,
  name: "berachain",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/berachain/native.png",
  nativeIcon: "",
  fullname: "Berachain bArtio",
  network: "bArtio",
  website: "https://www.berachain.com",
  nativeCurrency: {
    name: "BERA",
    symbol: "BERA",
    decimals: 18
  },
  rpcUrl: "https://bartio.rpc.berachain.com",
  faucetUrl: "https://bartio.faucet.berachain.com",
  blockExplorerUrl: "https://bartio.beratrail.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Berachain = {
  id: 80094,
  name: "Berachain",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/berachain/native.png",
  nativeIcon: "",
  fullname: "Berachain",
  network: "Mainnet",
  website: "https://www.berachain.com",
  nativeCurrency: {
    name: "BERA",
    symbol: "BERA",
    decimals: 18
  },
  rpcUrl: "https://rpc.berachain.com",
  blockExplorerUrl: "https://beratrail.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    }
  ]
};
var Blast = {
  id: 81457,
  name: "Blast",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/blast/native.png",
  nativeIcon: "",
  fullname: "Blast Mainnet",
  network: "Mainnet",
  website: "https://blastblockchain.com",
  nativeCurrency: {
    name: "Blast Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.blast.io",
  blockExplorerUrl: "https://blastscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var LorenzoTestnet = {
  id: 83291,
  name: "lorenzo",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/lorenzo/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "Lorenzo Testnet",
  network: "Testnet",
  website: "https://lorenzo-protocol.xyz",
  nativeCurrency: {
    name: "stBTC",
    symbol: "stBTC",
    decimals: 18
  },
  rpcUrl: "https://rpc-testnet.lorenzo-protocol.xyz",
  blockExplorerUrl: "https://scan-testnet.lorenzo-protocol.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BaseSepolia = {
  id: 84532,
  name: "Base",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/base/native.png",
  nativeIcon: "",
  fullname: "Base Sepolia",
  network: "Sepolia",
  website: "https://base.org",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://sepolia.base.org",
  faucetUrl: "https://bridge.base.org/deposit",
  blockExplorerUrl: "https://sepolia.basescan.org",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    }
  ]
};
var TUNATestnet = {
  id: 89682,
  name: "TUNA",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/tuna/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "TUNA Testnet",
  network: "Testnet",
  website: "https://tunachain.io",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://babytuna.rpc.tunachain.io",
  blockExplorerUrl: "https://babytuna.explorer.tunachain.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var XterioBNB = {
  id: 112358,
  name: "xterio",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/xterio/native.png",
  nativeIcon: "https://static.particle.network/token-list/bsc/native.png",
  fullname: "Xterio(BNB) Mainnet",
  network: "Mainnet",
  website: "https://xter.io",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrl: "https://xterio.alt.technology",
  blockExplorerUrl: "https://xterscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Taiko = {
  id: 167e3,
  name: "Taiko",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/taiko/native.png",
  nativeIcon: "",
  fullname: "Taiko Mainnet",
  network: "Mainnet",
  website: "https://taiko.xyz",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.mainnet.taiko.xyz",
  blockExplorerUrl: "https://taikoscan.network",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var TaikoHekla = {
  id: 167009,
  name: "Taiko",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/taiko/native.png",
  nativeIcon: "",
  fullname: "Taiko Hekla",
  network: "Hekla",
  website: "https://taiko.xyz",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.hekla.taiko.xyz",
  blockExplorerUrl: "https://explorer.hekla.taiko.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var BitlayerTestnet = {
  id: 200810,
  name: "Bitlayer",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bitlayer/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "Bitlayer Testnet",
  network: "Testnet",
  website: "https://www.bitlayer.org",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://testnet-rpc.bitlayer.org",
  blockExplorerUrl: "https://testnet-scan.bitlayer.org",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Bitlayer = {
  id: 200901,
  name: "Bitlayer",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/bitlayer/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "Bitlayer Mainnet",
  network: "Mainnet",
  website: "https://www.bitlayer.org",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://rpc.bitlayer.org",
  blockExplorerUrl: "https://www.btrscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var DuckchainTestnet = {
  id: 202105,
  name: "Duckchain",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/duckchain/native.png",
  nativeIcon: "https://static.particle.network/token-list/duckchain/ton.png",
  fullname: "Duckchain Testnet",
  network: "Testnet",
  website: "https://testnet-scan.duckchain.io",
  nativeCurrency: {
    name: "TON",
    symbol: "TON",
    decimals: 18
  },
  rpcUrl: "https://testnet-rpc.duckchain.io",
  blockExplorerUrl: "https://testnet-scan.duckchain.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var PlatON = {
  id: 210425,
  name: "PlatON",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/platon/native.png",
  nativeIcon: "",
  fullname: "PlatON Mainnet",
  network: "Mainnet",
  website: "https://www.platon.network",
  nativeCurrency: {
    name: "LAT",
    symbol: "LAT",
    decimals: 18
  },
  rpcUrl: "https://openapi2.platon.network/rpc",
  blockExplorerUrl: "https://scan.platon.network"
};
var ArbitrumSepolia = {
  id: 421614,
  name: "Arbitrum",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/arbitrum/native.png",
  nativeIcon: "",
  fullname: "Arbitrum Sepolia",
  network: "Sepolia",
  website: "https://arbitrum.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
  blockExplorerUrl: "https://sepolia.arbiscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    }
  ]
};
var ScrollSepolia = {
  id: 534351,
  name: "Scroll",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/scroll/native.png",
  nativeIcon: "",
  fullname: "Scroll Sepolia",
  network: "Sepolia",
  website: "https://scroll.io",
  nativeCurrency: {
    name: "Scroll",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://sepolia-rpc.scroll.io",
  blockExplorerUrl: "https://sepolia.scrollscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Scroll = {
  id: 534352,
  name: "Scroll",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/scroll/native.png",
  nativeIcon: "",
  fullname: "Scroll Mainnet",
  network: "Mainnet",
  website: "https://scroll.io",
  nativeCurrency: {
    name: "Scroll",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.scroll.io",
  blockExplorerUrl: "https://scrollscan.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        }
      ]
    },
    {
      name: "SWAP"
    }
  ]
};
var MerlinTestnet = {
  id: 686868,
  name: "Merlin",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/merlin/native.png",
  nativeIcon: "https://static.particle.network/token-list/btc/native.png",
  fullname: "Merlin Testnet",
  network: "Testnet",
  website: "https://merlinprotocol.org",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrl: "https://testnet-rpc.merlinchain.io",
  blockExplorerUrl: "https://testnet-scan.merlinchain.io",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var SeiDevnet = {
  id: 713715,
  name: "Sei",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/sei/native.png",
  nativeIcon: "",
  fullname: "Sei Devnet",
  network: "Devnet",
  website: "https://www.sei.io",
  nativeCurrency: {
    name: "SEI",
    symbol: "SEI",
    decimals: 18
  },
  rpcUrl: "https://evm-rpc-arctic-1.sei-apis.com",
  blockExplorerUrl: "https://devnet.seistream.app",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var zkLinkNova = {
  id: 810180,
  name: "zkLink",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zklink/native.png",
  nativeIcon: "",
  fullname: "zkLink Nova Mainnet",
  network: "Mainnet",
  website: "https://zklink.io",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.zklink.io",
  blockExplorerUrl: "https://explorer.zklink.io"
};
var XterioBNBTestnet = {
  id: 1637450,
  name: "xterio",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/xterio/native.png",
  nativeIcon: "https://static.particle.network/token-list/bsc/native.png",
  fullname: "Xterio(BNB) Testnet",
  network: "Testnet",
  website: "https://xter.io",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrl: "https://xterio-testnet.alt.technology",
  blockExplorerUrl: "https://testnet.xterscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var PlatONTestnet = {
  id: 2206132,
  name: "PlatON",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/platon/native.png",
  nativeIcon: "",
  fullname: "PlatON Testnet",
  network: "Testnet",
  website: "https://www.platon.network",
  nativeCurrency: {
    name: "LAT",
    symbol: "LAT",
    decimals: 18
  },
  rpcUrl: "https://devnetopenapi2.platon.network/rpc",
  faucetUrl: "https://devnet2faucet.platon.network/faucet",
  blockExplorerUrl: "https://devnet2scan.platon.network"
};
var XterioETH = {
  id: 2702128,
  name: "xterioeth",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/xterioeth/native.png",
  nativeIcon: "",
  fullname: "Xterio(ETH) Mainnet",
  network: "Mainnet",
  website: "https://xterscan.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://xterio-eth.alt.technology",
  blockExplorerUrl: "https://eth.xterscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "XTERIO",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var MantaSepolia = {
  id: 3441006,
  name: "Manta",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/manta/native.png",
  nativeIcon: "",
  fullname: "Manta Sepolia",
  network: "Sepolia",
  website: "https://manta.network",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://pacific-rpc.sepolia-testnet.manta.network/http",
  faucetUrl: "https://pacific-info.manta.network",
  blockExplorerUrl: "https://pacific-explorer.sepolia-testnet.manta.network",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var AstarzkEVMTestnet = {
  id: 6038361,
  name: "AstarZkEVM",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/astarzkevm/native.png",
  nativeIcon: "",
  fullname: "Astar zkEVM Testnet",
  network: "Testnet",
  website: "https://astar.network",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.startale.com/zkyoto",
  blockExplorerUrl: "https://zkyoto.explorer.startale.com",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Zora = {
  id: 7777777,
  name: "Zora",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/zora/native.png",
  nativeIcon: "",
  fullname: "Zora Mainnet",
  network: "Mainnet",
  website: "https://zora.energy",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.zora.energy",
  blockExplorerUrl: "https://explorer.zora.energy",
  features: [
    {
      name: "EIP1559"
    }
  ]
};
var EthereumSepolia = {
  id: 11155111,
  name: "Ethereum",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/ethereum/native.png",
  nativeIcon: "",
  fullname: "Ethereum Sepolia",
  network: "Sepolia",
  website: "https://sepolia.otterscan.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.sepolia.org",
  faucetUrl: "https://faucet.quicknode.com/drip",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "LIGHT",
          version: "1.0.2"
        },
        {
          name: "XTERIO",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "1.0.0"
        },
        {
          name: "BTC",
          version: "2.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    }
  ]
};
var OptimismSepolia = {
  id: 11155420,
  name: "Optimism",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/optimism/native.png",
  nativeIcon: "",
  fullname: "Optimism Sepolia",
  network: "Sepolia",
  website: "https://optimism.io",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://sepolia.optimism.io",
  blockExplorerUrl: "https://sepolia-optimism.etherscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.2"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.3"
        }
      ]
    }
  ]
};
var Ancient8Testnet = {
  id: 28122024,
  name: "ancient8",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/ancient8/native.png",
  nativeIcon: "",
  fullname: "Ancient8 Testnet",
  network: "Testnet",
  website: "https://ancient8.gg",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpcv2-testnet.ancient8.gg",
  blockExplorerUrl: "https://scanv2-testnet.ancient8.gg",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var CyberTestnet = {
  id: 111557560,
  name: "Cyber",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/cyber/native.png",
  nativeIcon: "",
  fullname: "Cyber Testnet",
  network: "Testnet",
  website: "https://testnet.cyberscan.co",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://cyber-testnet.alt.technology",
  blockExplorerUrl: "https://testnet.cyberscan.co",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var PlumeTestnet = {
  id: 161221135,
  name: "Plume",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/plume/native.png",
  nativeIcon: "",
  fullname: "Plume Testnet",
  network: "Testnet",
  website: "https://testnet-explorer.plumenetwork.xyz",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://testnet-rpc.plumenetwork.xyz/infra-partner-http",
  blockExplorerUrl: "https://testnet-explorer.plumenetwork.xyz",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var BlastSepolia = {
  id: 168587773,
  name: "Blast",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/blast/native.png",
  nativeIcon: "",
  fullname: "Blast Sepolia",
  network: "Sepolia",
  website: "https://blastblockchain.com",
  nativeCurrency: {
    name: "Blast Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://sepolia.blast.io",
  blockExplorerUrl: "https://testnet.blastscan.io",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "BICONOMY",
          version: "2.0.0"
        },
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        },
        {
          name: "CYBERCONNECT",
          version: "1.0.0"
        },
        {
          name: "COINBASE",
          version: "1.0.0"
        },
        {
          name: "UNIVERSAL",
          version: "1.0.0"
        }
      ]
    }
  ]
};
var Tron = {
  id: 728126428,
  name: "Tron",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/tron/native.png",
  nativeIcon: "",
  fullname: "Tron Mainnet",
  network: "Mainnet",
  website: "https://tron.network",
  nativeCurrency: {
    name: "TRX",
    symbol: "TRX",
    decimals: 6
  },
  rpcUrl: "https://api.trongrid.io",
  blockExplorerUrl: "https://tronscan.io",
  features: [
    {
      name: "ON-RAMP"
    }
  ]
};
var Ancient8 = {
  id: 888888888,
  name: "ancient8",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/ancient8/native.png",
  nativeIcon: "",
  fullname: "Ancient8 Mainnet",
  network: "Mainnet",
  website: "https://ancient8.gg",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://rpc.ancient8.gg",
  blockExplorerUrl: "https://scan.ancient8.gg",
  features: [
    {
      name: "EIP1559"
    },
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var Aurora = {
  id: 1313161554,
  name: "Aurora",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/aurora/native.png",
  nativeIcon: "",
  fullname: "Aurora Mainnet",
  network: "Mainnet",
  website: "https://aurora.dev",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://mainnet.aurora.dev",
  blockExplorerUrl: "https://explorer.aurora.dev",
  features: [
    {
      name: "SWAP"
    }
  ]
};
var AuroraTestnet = {
  id: 1313161555,
  name: "Aurora",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/aurora/native.png",
  nativeIcon: "",
  fullname: "Aurora Testnet",
  network: "Testnet",
  website: "https://aurora.dev",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://testnet.aurora.dev",
  faucetUrl: "https://aurora.dev/faucet",
  blockExplorerUrl: "https://explorer.testnet.aurora.dev"
};
var SKALENebula = {
  id: 1482601649,
  name: "Nebula",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/nebula/native.png",
  nativeIcon: "",
  fullname: "SKALE Nebula",
  network: "Mainnet",
  website: "https://mainnet.skalenodes.com",
  nativeCurrency: {
    name: "sFUEL",
    symbol: "sFUEL",
    decimals: 18
  },
  rpcUrl: "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
  blockExplorerUrl: "https://green-giddy-denebola.explorer.mainnet.skalenodes.com"
};
var Harmony = {
  id: 16666e5,
  name: "Harmony",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/harmony/native.png",
  nativeIcon: "",
  fullname: "Harmony Mainnet",
  network: "Mainnet",
  website: "https://www.harmony.one",
  nativeCurrency: {
    name: "ONE",
    symbol: "ONE",
    decimals: 18
  },
  rpcUrl: "https://api.harmony.one",
  blockExplorerUrl: "https://explorer.harmony.one"
};
var HarmonyTestnet = {
  id: 16667e5,
  name: "Harmony",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/harmony/native.png",
  nativeIcon: "",
  fullname: "Harmony Testnet",
  network: "Testnet",
  website: "https://www.harmony.one",
  nativeCurrency: {
    name: "ONE",
    symbol: "ONE",
    decimals: 18
  },
  rpcUrl: "https://api.s0.b.hmny.io",
  faucetUrl: "https://faucet.pops.one",
  blockExplorerUrl: "https://explorer.pops.one"
};
var KakarotSepolia = {
  id: 1802203764,
  name: "Kakarot",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/kakarot/native.png",
  nativeIcon: "",
  fullname: "Kakarot Sepolia",
  network: "Sepolia",
  website: "https://www.kakarot.org",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrl: "https://sepolia-rpc.kakarot.org",
  blockExplorerUrl: "https://sepolia.kakarotscan.org",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var LumiaTestnet = {
  id: 1952959480,
  name: "Lumia",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/lumia/native.png",
  nativeIcon: "",
  fullname: "Lumia Testnet",
  network: "Testnet",
  website: "https://www.lumia.org",
  nativeCurrency: {
    name: "LUMIA",
    symbol: "LUMIA",
    decimals: 18
  },
  rpcUrl: "https://testnet-rpc.lumia.org",
  blockExplorerUrl: "https://testnet-explorer.lumia.org",
  features: [
    {
      name: "ERC4337",
      contracts: [
        {
          name: "SIMPLE",
          version: "1.0.0"
        },
        {
          name: "SIMPLE",
          version: "2.0.0"
        }
      ]
    }
  ]
};
var TronShasta = {
  id: 2494104990,
  name: "Tron",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/tron/native.png",
  nativeIcon: "",
  fullname: "Tron Shasta",
  network: "Shasta",
  website: "https://www.trongrid.io/shasta",
  nativeCurrency: {
    name: "TRX",
    symbol: "TRX",
    decimals: 6
  },
  rpcUrl: "https://api.shasta.trongrid.io",
  blockExplorerUrl: "https://shasta.tronscan.org"
};
var TronNile = {
  id: 3448148188,
  name: "Tron",
  chainType: "evm",
  icon: "https://static.particle.network/token-list/tron/native.png",
  nativeIcon: "",
  fullname: "Tron Nile",
  network: "Nile",
  website: "https://nileex.io",
  nativeCurrency: {
    name: "TRX",
    symbol: "TRX",
    decimals: 6
  },
  rpcUrl: "https://nile.trongrid.io",
  faucetUrl: "https://nileex.io/join/getJoinPage",
  blockExplorerUrl: "https://nile.tronscan.org"
};
var ParticleChains = {
  "ethereum-1": Ethereum,
  "optimism-10": Optimism,
  "thundercore-18": ThunderCoreTestnet,
  "elastos-20": Elastos,
  "cronos-25": Cronos,
  "bsc-56": BNBChain,
  "okc-65": OKTCTestnet,
  "okc-66": OKTC,
  "confluxespace-71": ConfluxeSpaceTestnet,
  "viction-88": Viction,
  "viction-89": VictionTestnet,
  "bsc-97": BNBChainTestnet,
  "gnosis-100": Gnosis,
  "solana-101": Solana,
  "solana-102": SolanaTestnet,
  "solana-103": SolanaDevnet,
  "thundercore-108": ThunderCore,
  "bob-111": BOBTestnet,
  "fuse-122": Fuse,
  "fuse-123": FuseTestnet,
  "hsk-133": HashKeyChainTestnet,
  "polygon-137": Polygon,
  "manta-169": Manta,
  "hsk-177": HashKeyChain,
  "okbc-195": XLayerTestnet,
  "okbc-196": XLayer,
  "opbnb-204": opBNB,
  "mapprotocol-212": MAPProtocolTestnet,
  "bsquared-223": BSquared,
  "fantom-250": Fantom,
  "zksync-300": zkSyncEraSepolia,
  "kcc-321": KCC,
  "kcc-322": KCCTestnet,
  "zksync-324": zkSyncEra,
  "cronos-338": CronosTestnet,
  "mode-919": ModeTestnet,
  "fiveire-995": fiveire,
  "fiveire-997": fiveireTestnet,
  "klaytn-1001": KlaytnTestnet,
  "confluxespace-1030": ConfluxeSpace,
  "metis-1088": Metis,
  "polygonzkevm-1101": PolygonzkEVM,
  "core-1115": CoreTestnet,
  "core-1116": Core,
  "bsquared-1123": BSquaredTestnet,
  "hybrid-1225": HybridTestnet,
  "moonbeam-1284": Moonbeam,
  "moonriver-1285": Moonriver,
  "moonbeam-1287": MoonbeamTestnet,
  "sei-1328": SeiTestnet,
  "sei-1329": Sei,
  "bevm-1501": BEVMCanary,
  "bevm-1502": BEVMCanaryTestnet,
  "storynetwork-1516": StoryTestnet,
  "gravity-1625": Gravity,
  "combo-1715": ComboTestnet,
  "soneium-1946": SoneiumMinatoTestnet,
  "kava-2221": KavaTestnet,
  "kava-2222": Kava,
  "peaq-2241": PeaqKrest,
  "goat-2345": GOATNetwork,
  "polygonzkevm-2442": PolygonzkEVMCardona,
  "ainn-2648": AILayerTestnet,
  "ainn-2649": AILayer,
  "gmnetwork-2777": GMNetwork,
  "satoshivm-3109": SatoshiVMAlpha,
  "satoshivm-3110": SatoshiVMTestnet,
  "peaq-3338": Peaq,
  "botanix-3636": BotanixTestnet,
  "astarzkevm-3776": AstarzkEVMMainet,
  "fantom-4002": FantomTestnet,
  "merlin-4200": Merlin,
  "iotex-4689": IoTeX,
  "iotex-4690": IoTeXTestnet,
  "mantle-5000": Mantle,
  "mantle-5003": MantleSepoliaTestnet,
  "duckchain-5545": Duckchain,
  "opbnb-5611": opBNBTestnet,
  "aura-6321": AuraTestnet,
  "aura-6322": Aura,
  "zetachain-7000": ZetaChain,
  "zetachain-7001": ZetaChainTestnet,
  "cyber-7560": Cyber,
  "klaytn-8217": Klaytn,
  "lorenzo-8329": Lorenzo,
  "base-8453": Base,
  "combo-9980": Combo,
  "peaq-9990": PeaqAgungTestnet,
  "gnosis-10200": GnosisTestnet,
  "bevm-11501": BEVM,
  "bevm-11503": BEVMTestnet,
  "readon-12015": ReadONTestnet,
  "immutable-13473": ImmutablezkEVMTestnet,
  "gravity-13505": GravityTestnet,
  "eosevm-15557": EOSEVMTestnet,
  "ethereum-17000": EthereumHolesky,
  "eosevm-17777": EOSEVM,
  "mapprotocol-22776": MAPProtocol,
  "zeroone-27827": Zeroone,
  "movement-30732": MovementDevnet,
  "mode-34443": Mode,
  "arbitrum-42161": ArbitrumOne,
  "arbitrum-42170": ArbitrumNova,
  "celo-42220": Celo,
  "oasisemerald-42261": OasisEmeraldTestnet,
  "oasisemerald-42262": OasisEmerald,
  "zkfair-42766": ZKFair,
  "avalanche-43113": AvalancheTestnet,
  "avalanche-43114": Avalanche,
  "zkfair-43851": ZKFairTestnet,
  "celo-44787": CeloTestnet,
  "goat-48816": GOATTestnet3,
  "zircuit-48899": ZircuitTestnet,
  "dodochain-53457": DODOChainTestnet,
  "zeroone-56400": ZerooneTestnet,
  "linea-59141": LineaSepolia,
  "linea-59144": Linea,
  "bob-60808": BOB,
  "polygon-80002": PolygonAmoy,
  "berachain-80084": BerachainbArtio,
  "berachain-80094": Berachain,
  "blast-81457": Blast,
  "lorenzo-83291": LorenzoTestnet,
  "base-84532": BaseSepolia,
  "tuna-89682": TUNATestnet,
  "xterio-112358": XterioBNB,
  "taiko-167000": Taiko,
  "taiko-167009": TaikoHekla,
  "bitlayer-200810": BitlayerTestnet,
  "bitlayer-200901": Bitlayer,
  "duckchain-202105": DuckchainTestnet,
  "platon-210425": PlatON,
  "arbitrum-421614": ArbitrumSepolia,
  "scroll-534351": ScrollSepolia,
  "scroll-534352": Scroll,
  "merlin-686868": MerlinTestnet,
  "sei-713715": SeiDevnet,
  "zklink-810180": zkLinkNova,
  "xterio-1637450": XterioBNBTestnet,
  "platon-2206132": PlatONTestnet,
  "xterioeth-2702128": XterioETH,
  "manta-3441006": MantaSepolia,
  "astarzkevm-6038361": AstarzkEVMTestnet,
  "zora-7777777": Zora,
  "ethereum-11155111": EthereumSepolia,
  "optimism-11155420": OptimismSepolia,
  "ancient8-28122024": Ancient8Testnet,
  "cyber-111557560": CyberTestnet,
  "plume-161221135": PlumeTestnet,
  "blast-168587773": BlastSepolia,
  "tron-728126428": Tron,
  "ancient8-888888888": Ancient8,
  "aurora-1313161554": Aurora,
  "aurora-1313161555": AuroraTestnet,
  "nebula-1482601649": SKALENebula,
  "harmony-1666600000": Harmony,
  "harmony-1666700000": HarmonyTestnet,
  "kakarot-1802203764": KakarotSepolia,
  "lumia-1952959480": LumiaTestnet,
  "tron-2494104990": TronShasta,
  "tron-3448148188": TronNile
};
var utils_exports = {};
__export(utils_exports, {
  getAASigners: () => getAASigners,
  getAllChainInfos: () => getAllChainInfos,
  getChainIcon: () => getChainIcon,
  getChainInfo: () => getChainInfo,
  getChainNetwork: () => getChainNetwork,
  getChainSymbol: () => getChainSymbol,
  getChainType: () => getChainType,
  getEVMChainInfoById: () => getEVMChainInfoById,
  getParticleNode: () => getParticleNode,
  getSolanaChainInfoById: () => getSolanaChainInfoById,
  isChainSupportEIP1559: () => isChainSupportEIP1559,
  isChainSupportERC4337: () => isChainSupportERC4337,
  isChainSupportOnRamp: () => isChainSupportOnRamp,
  isChainSupportSwap: () => isChainSupportSwap
});
function getChainInfo(chain) {
  return ParticleChains[`${chain.name.toLowerCase()}-${chain.id}`];
}
function getChainNetwork(chain) {
  const target = getChainInfo(chain);
  return (target == null ? void 0 : target.network) || "UNKNOWN";
}
function getChainSymbol(chain) {
  var _a;
  const target = getChainInfo(chain);
  return ((_a = target == null ? void 0 : target.nativeCurrency) == null ? void 0 : _a.symbol) || "UNKNOWN";
}
function getChainType(chain) {
  const target = getChainInfo(chain);
  return target == null ? void 0 : target.chainType;
}
function isChainSupportEIP1559(chain) {
  var _a, _b;
  const target = getChainInfo(chain);
  return (_b = (_a = target == null ? void 0 : target.features) == null ? void 0 : _a.some((it) => it.name === "EIP1559")) != null ? _b : false;
}
function isChainSupportSwap(chain) {
  var _a, _b;
  const target = getChainInfo(chain);
  return (_b = (_a = target == null ? void 0 : target.features) == null ? void 0 : _a.some((it) => it.name === "SWAP")) != null ? _b : false;
}
function isChainSupportOnRamp(chain) {
  var _a, _b;
  const target = getChainInfo(chain);
  return (_b = (_a = target == null ? void 0 : target.features) == null ? void 0 : _a.some((it) => it.name === "ON-RAMP")) != null ? _b : false;
}
function isChainSupportERC4337(chain, { name: name3, version: version3 }) {
  var _a, _b, _c, _d;
  const target = getChainInfo(chain);
  return (_d = (_c = (_b = (_a = target == null ? void 0 : target.features) == null ? void 0 : _a.find((it) => it.name === "ERC4337")) == null ? void 0 : _b.contracts) == null ? void 0 : _c.some((contract) => contract.name === name3 && contract.version === version3)) != null ? _d : false;
}
function getChainIcon(chain) {
  const target = getChainInfo(chain);
  return target == null ? void 0 : target.icon;
}
function getEVMChainInfoById(id) {
  return Object.values(ParticleChains).find((it) => it.chainType === "evm" && it.id === id);
}
function getSolanaChainInfoById(id) {
  return Object.values(ParticleChains).find((it) => it.chainType === "solana" && it.id === id);
}
function getAllChainInfos(compareFn) {
  const chains = Object.values(ParticleChains);
  if (compareFn) {
    return chains.sort(compareFn);
  }
  const sortKeys = [
    "Solana",
    "Ethereum",
    "BSC",
    "opBNB",
    "Polygon",
    "Avalanche",
    "Moonbeam",
    "Moonriver",
    "Heco",
    "Fantom",
    "Arbitrum",
    "Harmony",
    "Aurora",
    "Optimism",
    "KCC",
    "PlatON",
    "Tron"
  ];
  chains.sort((a, b) => {
    if (sortKeys.includes(a.name) && sortKeys.includes(b.name)) {
      if (a.name === b.name) {
        if (a.network === "Mainnet") {
          return -1;
        } else if (b.network === "Mainnet") {
          return 1;
        } else if (a.network === "Testnet") {
          return -1;
        } else if (b.network === "Testnet") {
          return 1;
        }
        return 0;
      } else if (sortKeys.indexOf(a.name) > sortKeys.indexOf(b.name)) {
        return 1;
      }
      return -1;
    } else if (sortKeys.includes(a.name)) {
      return -1;
    } else if (sortKeys.includes(b.name)) {
      return 1;
    } else if (a.name === b.name) {
      if (a.network === "Mainnet") {
        return -1;
      } else if (b.network === "Mainnet") {
        return 1;
      }
      return a.fullname.localeCompare(b.fullname);
    } else {
      return a.name.localeCompare(b.name);
    }
  });
  return chains;
}
function getParticleNode(id, projectId, projectKey) {
  return `https://rpc.particle.network/evm-chain?chainId=${id}&projectUuid=${projectId}&projectKey=${projectKey}`;
}
function getAASigners({ name: name3, version: version3 }) {
  const supportedPasskey = ["UNIVERSAL 1.0.0", "BICONOMY 2.0.0", "XTERIO 1.0.0", "COINBASE 1.0.0"];
  const signers = [];
  if (supportedPasskey.includes(`${name3} ${version3}`)) {
    signers.push("PASSKEY");
    if (`${name3} ${version3}` === "COINBASE 1.0.0") {
      return signers;
    }
  }
  signers.unshift("EOA");
  return signers;
}

// node_modules/@particle-network/crypto/es/index.js
init_esm_browser();
var import_crypto_js = __toESM(require_crypto_js());
init_esm_browser();
var __defProp2 = Object.defineProperty;
var __export2 = (target, all) => {
  for (var name3 in all)
    __defProp2(target, name3, { get: all[name3], enumerable: true });
};
var uuidv4 = () => v4_default().toString();
var uuidv4_default = uuidv4;
var url_crypto_exports = {};
__export2(url_crypto_exports, {
  decryptData: () => decryptData,
  decryptUrlParam: () => decryptUrlParam,
  encryptData: () => encryptData,
  encryptUrlParam: () => encryptUrlParam
});
function encryptUrlParam(params = {}, encoding = "base64") {
  const secretKey = v4_default().replace(/-/g, "").toUpperCase();
  const cipherText = encryptData(params, secretKey, encoding);
  return cipherText + secretKey;
}
function encryptData(data = {}, secretKey, encoding = "base64") {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }
  const keyWA = import_crypto_js.default.enc.Utf8.parse(secretKey);
  const cipherText = import_crypto_js.default.AES.encrypt(data, keyWA, {
    mode: import_crypto_js.default.mode.ECB,
    algorithm: import_crypto_js.default.algo.AES,
    padding: import_crypto_js.default.pad.Pkcs7,
    formatter: import_crypto_js.default.format.Hex
  }).ciphertext;
  if (encoding === "base64") {
    return encodeURIComponent(import_crypto_js.default.enc.Base64.stringify(cipherText));
  } else {
    return import_crypto_js.default.enc.Hex.stringify(cipherText).toUpperCase();
  }
}
function decryptUrlParam(params, encoding = "base64") {
  if (params) {
    const secretKey = params.slice(-32);
    const data = params.slice(0, params.length - 32);
    return decryptData(data, secretKey, encoding);
  } else {
    return "";
  }
}
function decryptData(params, secretKey, encoding = "base64") {
  let dec;
  if (encoding === "base64") {
    dec = import_crypto_js.default.enc.Base64.parse(params);
  } else {
    dec = import_crypto_js.default.enc.Hex.parse(params);
  }
  const keyWA = import_crypto_js.default.enc.Utf8.parse(secretKey);
  const bytes = import_crypto_js.default.AES.decrypt(
    import_crypto_js.default.lib.CipherParams.create({
      ciphertext: dec,
      key: keyWA,
      algorithm: import_crypto_js.default.algo.AES,
      padding: import_crypto_js.default.pad.Pkcs7,
      formatter: import_crypto_js.default.format.Hex
    }),
    keyWA,
    {
      mode: import_crypto_js.default.mode.ECB
    }
  );
  return bytes.toString(import_crypto_js.default.enc.Utf8);
}

// node_modules/@particle-network/auth/es/index.js
var import_buffer = __toESM(require_buffer());
var import_events = __toESM(require_events());
init_esm_browser();
var import_buffer2 = __toESM(require_buffer());
var import_crypto_js2 = __toESM(require_crypto_js());
var import_buffer3 = __toESM(require_buffer());
var import_buffer4 = __toESM(require_buffer());
var import_buffer5 = __toESM(require_buffer());
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export3 = (target, all) => {
  for (var name22 in all)
    __defProp3(target, name22, { get: all[name22], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp3({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var package_exports = {};
__export3(package_exports, {
  default: () => package_default,
  dependencies: () => dependencies,
  devDependencies: () => devDependencies,
  files: () => files,
  gitHead: () => gitHead,
  license: () => license,
  main: () => main,
  module: () => module,
  name: () => name,
  publishConfig: () => publishConfig,
  scripts: () => scripts,
  type: () => type,
  types: () => types,
  version: () => version
});
var name;
var version;
var files;
var type;
var main;
var module;
var types;
var license;
var publishConfig;
var dependencies;
var devDependencies;
var scripts;
var gitHead;
var package_default;
var init_package = __esm({
  "package.json"() {
    name = "@particle-network/auth";
    version = "1.3.1";
    files = [
      "lib",
      "es",
      "LICENSE"
    ];
    type = "module";
    main = "lib/index.js";
    module = "es/index.js";
    types = "lib/types/index.d.ts";
    license = "Apache-2.0";
    publishConfig = {
      access: "public"
    };
    dependencies = {
      "@particle-network/analytics": "^1.0.1",
      "@particle-network/chains": "*",
      "@particle-network/crypto": "^1.0.1",
      buffer: "^6.0.3",
      draggabilly: "^3.0.0"
    };
    devDependencies = {
      "@metamask/eth-sig-util": "^5.0.2",
      "@types/draggabilly": "^2.1.3",
      "ts-loader": "^9.3.1",
      "webpack-cli": "^4.10.0"
    };
    scripts = {
      clean: "shx rm -rf lib/* && shx rm -rf es/*",
      package: `shx echo '{ "type": "commonjs" }' > lib/package.json`,
      build: "yarn clean && node ./esBuild.js && tsc --emitDeclarationOnly -p tsconfig.json && yarn package",
      "dev:lib": 'cross-env NODE_ENV=development concurrently "tsc -w" "node ./esBuild.js"',
      "build:min.js": "webpack",
      version: "yarn build"
    };
    gitHead = "cc999e430ebfb1dd821783f7cf099ddd51f3495a";
    package_default = {
      name,
      version,
      files,
      type,
      main,
      module,
      types,
      license,
      publishConfig,
      dependencies,
      devDependencies,
      scripts,
      gitHead
    };
  }
});
var erc4337Option = false;
var controller = {
  languageCode: "en",
  fiatCoin: "USD",
  get erc4337() {
    return erc4337Option;
  },
  set erc4337(option) {
    erc4337Option = option;
  }
};
var en = {
  title: "Approve Pop-up",
  content_sign: "Click Continue to complete the signature or transaction",
  content_login: "Click Continue to complete creating or connecting wallet"
};
var ja = {
  title: "承認ポップアップ",
  content_sign: "[続行] をクリックして、署名またはトランザクションを完了します",
  content_login: "[続行] をクリックして、ウォレットの作成または接続を完了します"
};
var ko = {
  title: "팝업 승인",
  content_sign: "서명 또는 트랜잭션을 완료하려면 계속을 클릭하십시오.",
  content_login: "계속을 클릭하여 지갑 생성 또는 연결을 완료합니다."
};
var zh_CN = {
  title: "批准弹出窗口",
  content_sign: "点击继续完成签名或交易",
  content_login: "点击继续完成创建或连接钱包"
};
var zh_HK = {
  title: "批准彈出窗口",
  content_sign: "點擊繼續完成簽名或交易",
  content_login: "點擊繼續完成創建或連接錢包"
};
function locale() {
  const code = controller.languageCode;
  if (code.startsWith("en")) {
    return en;
  } else if (code.startsWith("ja")) {
    return ja;
  } else if (code.startsWith("ko")) {
    return ko;
  } else if (code === "zh_CN" || code === "zh-CN" || code === "zh") {
    return zh_CN;
  } else if (code === "zh_HK" || code === "zh-HK" || code === "zh_TW" || code === "zh-TW") {
    return zh_HK;
  } else {
    return en;
  }
}
var logoBase64_default = `data:image/png;base64,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`;
var approvePopupContentHtml = (content) => `
    <div class="particle-pam-left">
      <div class="particle-pam-wrap">
        <div class="particle-pam-img">
          <img src='${logoBase64_default}' alt="" />
        </div>
        <div class="particle-pam-content">
          <div class="particle-pam-title">${locale().title}</div>
          <div class="particle-pam-text">${content}</div>
        </div>
      </div>
    </div>
    <div class="particle-pam-right parm-continue-btn">Continue</div>
`;
var style = `
.particle-approve-popup {
  position: fixed;
  z-index: 999999;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 6px;
  padding: 0px 18px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  background: #fff;
  -webkit-box-shadow: 4px 4px 20px 1px rgba(180, 180, 180, 0.6);
          box-shadow: 4px 4px 20px 1px rgba(180, 180, 180, 0.6);
  top: 30px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  right: -600px;
  width: 379px;
  height: 78px;
  padding-right: 0;
}
@media screen and (max-width: 600px) {
  .particle-approve-popup {
    max-width: 90%;
    left: 50%;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
    padding: 0px 12px;
    right: 0;
    top: -100px;
  }
}
.particle-approve-popup.particle-approve-popup-show {
  right: 30px;
}
@media screen and (max-width: 600px) {
  .particle-approve-popup.particle-approve-popup-show {
    right: 0;
    top: 30px;
  }
}
.particle-approve-popup .particle-pam-left {
  position: relative;
  padding-right: 20px;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex:1;
}
@media screen and (max-width: 600px) {
  .particle-approve-popup .particle-pam-left {
    padding-right: 10px;
  }
}
.particle-approve-popup .particle-pam-left:after {
  content: '';
  position: absolute;
  width: 1px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  right: 0px;
  top: 0;
  height: 100%;
}
.particle-approve-popup .particle-pam-left .particle-pam-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.particle-approve-popup .particle-pam-left .particle-pam-wrap .particle-pam-img {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  width: 42px;
  height: 42px;
  min-width: 42px;
  margin-right: 10px;
  border-radius: 42px;
  position: relative;
  overflow: hidden;
}
.particle-approve-popup .particle-pam-left .particle-pam-wrap .particle-pam-img img {
  width: 100%;
  height: 100%;
}
.particle-approve-popup .particle-pam-left .particle-pam-wrap .particle-pam-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.particle-approve-popup .particle-pam-left .particle-pam-wrap .particle-pam-content .particle-pam-title {
  font-weight: bold;
  font-size: 17px;
  color: #000;
}
.particle-approve-popup .particle-pam-left .particle-pam-wrap .particle-pam-content .particle-pam-text {
  font-size: 12px;
  color: #666;
  opacity: 0.8;
  line-height: 12px;
}
.particle-approve-popup .particle-pam-right {
  position: relative;
  cursor: pointer;
  font-size: 14px;
  color: #2d6af6;
  font-weight: bold;
  margin-left: 20px;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  min-width: 88px;
  padding: 0 10px;
  margin: 0;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.particle-approve-popup .particle-pam-right:hover {
  color: #2d6af6;
  font-weight: bold;
}
`;
var approvePopupRenderStyle = () => {
  const className = "particle-approve-popup-style";
  const el = document.querySelector("." + className);
  el && el.remove();
  const styleEl = document.createElement("style");
  styleEl.classList.add(className);
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
};
var approvePopupRender = (callback, key) => {
  approvePopupRenderStyle();
  const className = "particle-approve-popup";
  const el = document.querySelector("." + className);
  el && el.remove();
  const particleApprovePopupEl = document.createElement("div");
  particleApprovePopupEl.classList.add(className);
  particleApprovePopupEl.innerHTML = approvePopupContentHtml(locale()[`content_${key}`]);
  document.body.appendChild(particleApprovePopupEl);
  setTimeout(() => {
    particleApprovePopupEl.classList.add("particle-approve-popup-show");
  });
  const parmContinueBtn = document.querySelector(".parm-continue-btn");
  parmContinueBtn && parmContinueBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    particleApprovePopupEl.classList.remove("particle-approve-popup-show");
    callback && callback();
  });
};
function isNullish(value) {
  return value === null || value === void 0;
}
function getParticleEnv() {
  if (typeof window !== "undefined") {
    if (window.__PARTICLE_ENVIRONMENT__ === "staging" || window.__PARTICLE_ENVIRONMENT__ === "development") {
      return window.__PARTICLE_ENVIRONMENT__;
    }
  }
  return "production";
}
function isSafariOrIOS() {
  const ua = navigator.userAgent;
  return /Version\/([0-9\\._]+).*Mobile.*Safari.*/.test(ua) || /Version\/([0-9\\._]+).*Safari/.test(ua) || /iP(hone|od|ad)/.test(ua);
}
var isBraveBrowser = () => {
  return typeof window !== "undefined" && navigator.brave;
};
var isFireFox = () => {
  return typeof window !== "undefined" && /Firefox\/([0-9.]+)(?:\s|$)/.test(navigator.userAgent);
};
var isChrome = () => {
  return typeof window !== "undefined" && /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\\.]+)(:?\s|$)/.test(navigator.userAgent);
};
var isBlockingThirdpartyCookiesBrowser = (chromeExclude) => {
  return isSafariOrIOS() || isBraveBrowser() || isFireFox() || isChrome() && !isBraveBrowser() && !chromeExclude;
};
function getDeviceId() {
  if (typeof window === "undefined") {
    return v4_default();
  } else {
    const storeKey = "pn_device_id";
    let deviceId = localStorage.getItem(storeKey);
    if (!deviceId) {
      deviceId = v4_default();
      localStorage.setItem(storeKey, deviceId);
    }
    return deviceId;
  }
}
function getVersion() {
  const packages = (init_package(), __toCommonJS(package_exports));
  return `web_${packages.version}`;
}
function popupWindow(url, title, w, h) {
  const left = screen.width / 2 - w / 2;
  const top = screen.height / 2 - h / 2;
  return open(
    url,
    title,
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left
  );
}
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var ALPHABET_MAP = ALPHABET.split("").reduce((acc, x, i) => {
  acc[x] = i;
  return acc;
}, {});
var authUrl = () => {
  const productionAuthUrl = "https://auth.particle.network";
  const stagingAuthUrl = "https://auth-staging.particle.network";
  const developmentAuthUrl = "https://auth-debug.particle.network";
  const env = getParticleEnv();
  if (typeof window !== "undefined" && window.__PARTICLE_AUTH_LOCALHOST__ && typeof window.__PARTICLE_AUTH_LOCALHOST__ === "string" && window.__PARTICLE_AUTH_LOCALHOST__.includes("localhost")) {
    return window.__PARTICLE_AUTH_LOCALHOST__;
  }
  switch (env) {
    case "production":
      return productionAuthUrl;
    case "staging":
      return stagingAuthUrl;
    case "development":
      return developmentAuthUrl;
  }
};
var apiUrl = () => {
  const productionApi = "https://api.particle.network";
  const developmentApi = "https://api-debug.particle.network";
  const env = getParticleEnv();
  return env === "development" ? developmentApi : productionApi;
};
var rpcUrl = () => {
  const productionApi = "https://rpc.particle.network";
  const developmentApi = "https://rpc-debug.particle.network";
  const env = getParticleEnv();
  return env === "development" ? developmentApi : productionApi;
};
var walletUrl = () => {
  const productionUrl = "https://wallet.particle.network";
  const stagingUrl = "https://wallet-staging.particle.network";
  const developmentUrl = "https://wallet-debug.particle.network";
  const env = getParticleEnv();
  switch (env) {
    case "production":
      return productionUrl;
    case "staging":
      return stagingUrl;
    case "development":
      return developmentUrl;
  }
};
var buyUrl = () => {
  const productionUrl = "https://ramp.particle.network";
  const stagingUrl = "https://ramp-staging.particle.network";
  const developmentUrl = "https://ramp-debug.particle.network";
  const env = getParticleEnv();
  switch (env) {
    case "production":
      return productionUrl;
    case "staging":
      return stagingUrl;
    case "development":
      return developmentUrl;
  }
};
var AuthError = class {
  constructor(code, message) {
    this.code = code;
    this.message = message;
    this.code = code;
    this.message = message;
  }
  static userCancelOperation() {
    return new AuthError(4011, "The user cancel the operation");
  }
  static unauthorized() {
    return new AuthError(4100, "The requested method and/or account has not been authorized by the user");
  }
  static unsupportedMethod() {
    return new AuthError(4200, "The Provider does not support the requested method");
  }
  static unsupportedChain() {
    return new AuthError(4201, "The Provider does not support the chain");
  }
  static paramsError() {
    return new AuthError(8002, "Param error, see doc for more info");
  }
  static notLogin() {
    return new AuthError(8005, "User not login");
  }
  static walletNotCreated() {
    return new AuthError(8006, "Wallet not created");
  }
  static decrypt(message) {
    return new AuthError(8007, "decrypt error: " + message);
  }
};
var SettingOption = ((SettingOption2) => {
  SettingOption2[SettingOption2["None"] = 0] = "None";
  SettingOption2[SettingOption2["Once"] = 1] = "Once";
  SettingOption2[SettingOption2["Always"] = 2] = "Always";
  SettingOption2[SettingOption2["Force"] = 3] = "Force";
  return SettingOption2;
})(SettingOption || {});
function getWalletUrl(auth, config) {
  var _a, _b, _c, _d, _e;
  if (!auth.isLogin()) {
    throw AuthError.notLogin();
  }
  if (!auth.walletExist()) {
    throw AuthError.walletNotCreated();
  }
  const { projectId, clientKey, appId, chainName, chainId, securityAccount } = auth.config;
  let supportChains = ((_b = (_a = auth.config.wallet) == null ? void 0 : _a.customStyle) == null ? void 0 : _b.supportChains) || ((_c = auth.config.wallet) == null ? void 0 : _c.supportChains);
  if (supportChains && auth.config.chainId && auth.config.chainName) {
    if (!supportChains.find(
      (item) => {
        var _a2;
        return item.id === auth.config.chainId && item.name.toLowerCase() === ((_a2 = auth.config.chainName) == null ? void 0 : _a2.toLowerCase());
      }
    )) {
      supportChains.unshift({
        id: auth.config.chainId,
        name: auth.config.chainName
      });
    }
  }
  supportChains = supportChains == null ? void 0 : supportChains.map((chain) => {
    const { id, name: name22 } = chain;
    return {
      id,
      name: name22
    };
  });
  const customStyle = (_d = auth.config.wallet) == null ? void 0 : _d.customStyle;
  if (customStyle) {
    customStyle.supportChains = supportChains;
    if (!customStyle.fiatCoin) {
      customStyle.fiatCoin = controller.fiatCoin;
    }
  }
  const params = {
    projectId,
    clientKey,
    appId,
    chainName,
    chainId,
    securityAccount,
    authUserInfo: auth.getUserInfo(),
    authType: auth.getAuthType(),
    authSDKVersion: (_e = window.particle) == null ? void 0 : _e.version,
    supportChains
  };
  const ciphertext = url_crypto_exports.encryptUrlParam(params);
  let url = `${walletUrl()}/?params=${ciphertext}&theme=${getWalletUIMode(auth)}&language=${controller.languageCode}`;
  if (customStyle) {
    url += `&customStyle=${encodeURIComponent(import_buffer3.Buffer.from(JSON.stringify(customStyle)).toString("base64"))}`;
  }
  const { uiMode, modalBorderRadius } = auth.getAuthTheme();
  url += `&authTheme=${encodeURIComponent(
    import_buffer3.Buffer.from(
      JSON.stringify({
        uiMode,
        modalBorderRadius
      })
    ).toString("base64")
  )}`;
  if (config && config.topMenuType) {
    url += `&topMenuType=${config.topMenuType}`;
  }
  if (controller.erc4337) {
    url += `&erc4337=${encodeURIComponent(JSON.stringify(controller.erc4337))}`;
  }
  return url;
}
function getBuyUrl(auth, options) {
  var _a, _b, _c;
  let url = `${buyUrl()}/?language=${controller.languageCode}&theme=${getWalletUIMode(auth)}`;
  const customStyle = (_a = auth.config.wallet) == null ? void 0 : _a.customStyle;
  if (customStyle) {
    const { light, dark } = customStyle;
    url += `&customStyle=${encodeURIComponent(import_buffer3.Buffer.from(JSON.stringify({ light, dark })).toString("base64"))}`;
    if (!customStyle.fiatCoin) {
      customStyle.fiatCoin = controller.fiatCoin;
    }
  }
  if (auth.isLogin() && auth.walletExist()) {
    if (options) {
      if (!options.walletAddress) {
        options.walletAddress = (_b = auth.getWallet()) == null ? void 0 : _b.public_address;
      }
      if (!options.network) {
        options.network = auth.config.chainName;
      }
    } else {
      options = {
        walletAddress: (_c = auth.getWallet()) == null ? void 0 : _c.public_address,
        network: auth.config.chainName
      };
    }
  } else {
    if (!options || !options.network || !options.walletAddress) {
      throw new Error("network or walletAddress not found");
    }
  }
  if (options) {
    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (value) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });
  }
  return url;
}
function getWalletUIMode(auth) {
  var _a, _b, _c;
  let walletUIMode = auth.getThemeType();
  if ((_a = auth.config.wallet) == null ? void 0 : _a.uiMode) {
    walletUIMode = ((_b = auth.config.wallet) == null ? void 0 : _b.uiMode) === "auto" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : (_c = auth.config.wallet) == null ? void 0 : _c.uiMode;
  }
  return walletUIMode;
}
var html = `
  <button class="particle-pwe-btn">
    <img class="particle-pwe-img particle-pwe-wallet-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="" />
    <img class="particle-pwe-img particle-pwe-down-arrow particle-pwe-down-arrow-hide" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="" />
  </button>
  <div class="particle-pwe-iframe-content">
  </div>
`;
var walletEntryRender = () => {
  const className = "particle-wallet-entry-container";
  const el = document.querySelector("." + className);
  el && el.remove();
  const EL = document.createElement("div");
  EL.classList.add(className);
  EL.innerHTML = html;
  document.body.appendChild(EL);
};
var html_default = walletEntryRender;
var walletIconDarkBase64 = `data:image/png;base64,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`;
var downArrowDarkBase64 = `data:image/png;base64,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`;
var style2 = `
.particle-wallet-entry-container .particle-pwe-btn {
  background: none;
  border: none;
  cursor: pointer;
  height: 60px;
  margin: 0;
  outline: none;
  padding: 0;
  position: fixed;
  width: 60px;
  -webkit-box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.1);
  border-radius: 60px;
}
.particle-wallet-entry-container .particle-pwe-btn:not(.is-dragging) {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.particle-wallet-entry-container .particle-pwe-btn > img {
  height: 100%;
  width: 100%;
}
.particle-wallet-entry-container .particle-pwe-btn .particle-pwe-wallet-icon {
  display: block;
}
.particle-wallet-entry-container .particle-pwe-btn .particle-pwe-wallet-icon:not(.particle-pwe-wallet-icon-hide) {
  -webkit-animation: particle-pwe-wallet-icon-show 0.3s ease-in-out;
          animation: particle-pwe-wallet-icon-show 0.3s ease-in-out;
}
@-webkit-keyframes particle-pwe-wallet-icon-show {
  0% {
    -webkit-transform: scale(0.6);
            transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes particle-pwe-wallet-icon-show {
  0% {
    -webkit-transform: scale(0.6);
            transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
.particle-wallet-entry-container .particle-pwe-btn .particle-pwe-wallet-icon.particle-pwe-wallet-icon-hide {
  display: none;
}
.particle-wallet-entry-container .particle-pwe-btn .particle-pwe-down-arrow {
  display: block;
}
.particle-wallet-entry-container .particle-pwe-btn .particle-pwe-down-arrow:not(.particle-pwe-down-arrow-hide) {
  -webkit-animation: particle-pwe-down-arrow-show 0.3s ease-in-out;
          animation: particle-pwe-down-arrow-show 0.3s ease-in-out;
}
@-webkit-keyframes particle-pwe-down-arrow-show {
  0% {
    -webkit-transform: scale(0.6);
            transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes particle-pwe-down-arrow-show {
  0% {
    -webkit-transform: scale(0.6);
            transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
.particle-wallet-entry-container .particle-pwe-btn .particle-pwe-down-arrow.particle-pwe-down-arrow-hide {
  display: none;
}
.particle-wallet-entry-container .particle-pwe-iframe-content {
  background-color: #fff;
  border: none;
  border-radius: 10px;
  -webkit-box-shadow: -1px 3px 11px 2px #00000073;
          box-shadow: -1px 3px 11px 2px #00000073;
  display: none;
  height: 650px;
  overflow: hidden;
  position: fixed;
  width: 400px;
  z-index: 1000;
}
.particle-wallet-entry-container .particle-pwe-iframe-content.particle-pwe-full-screen-iframe-content {
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 0 !important;
}
@media screen and (max-height: 660px) {
  .particle-wallet-entry-container .particle-pwe-iframe-content {
    height: 600px;
    width: 360px;
  }
}
.particle-wallet-entry-container .particle-pwe-iframe-content.particle-pwe-iframe-content-show {
  display: block;
}
.particle-pwe-iframe-content-dark{
  background-color: #000 !important;
}
.particle-pwe-iframe-content-light{
  background-color: #fff !important;
}
.particle-wallet-entry-container .particle-pwe-iframe-content .particle-pwe-iframe {
  border: none;
  height: 100%;
  width: 100%;
}

`;
var renderStyle = () => {
  const className = "particle-wallet-entry-style";
  const el = document.querySelector("." + className);
  el && el.remove();
  const styleEl = document.createElement("style");
  styleEl.classList.add(className);
  styleEl.innerHTML = style2;
  document.head.appendChild(styleEl);
};
var style_default = renderStyle;
var fullScreenClass = "particle-pwe-full-screen-iframe-content";
var isListen = false;
var WalletEntryPosition = ((WalletEntryPosition2) => {
  WalletEntryPosition2["BR"] = "bottom-right";
  WalletEntryPosition2["BL"] = "bottom-left";
  WalletEntryPosition2["TR"] = "top-right";
  WalletEntryPosition2["TL"] = "top-left";
  return WalletEntryPosition2;
})(WalletEntryPosition || {});
var timer = null;
var draggie;
var _WalletEntryPlugin = class {
  constructor(config, auth, options) {
    this.config = config;
    this.auth = auth;
    this.walletEntryOptions = options;
    if (typeof window !== "undefined") {
      this.destroy();
      if (this.auth.isLogin()) {
        this.walletEntryRander();
      }
      this.auth.on("connect", () => {
        this.walletEntryRander();
      });
      this.auth.on("disconnect", () => {
        this.destroy();
      });
    }
  }
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  openWallet(params) {
    var _a, _b, _c, _d, _e, _f;
    if (!((_b = (_a = this.auth) == null ? void 0 : _a.isLogin) == null ? void 0 : _b.call(_a))) {
      return;
    }
    const url = getWalletUrl(this.auth);
    if (this.isMobile() || isBraveBrowser()) {
      window.open(url);
      return false;
    }
    const walletIcon = document.querySelector(".particle-pwe-wallet-icon");
    const downArrow = document.querySelector(".particle-pwe-down-arrow");
    const iframeContent = document.querySelector(".particle-pwe-iframe-content");
    if ((params == null ? void 0 : params.windowSize) === "large") {
      iframeContent == null ? void 0 : iframeContent.classList.add(fullScreenClass);
    }
    if (!isNullish((_d = (_c = this.auth) == null ? void 0 : _c.getAuthTheme()) == null ? void 0 : _d.modalBorderRadius)) {
      iframeContent.style.borderRadius = `${(_f = (_e = this.auth) == null ? void 0 : _e.getAuthTheme()) == null ? void 0 : _f.modalBorderRadius}px`;
    }
    iframeContent == null ? void 0 : iframeContent.classList.add("particle-pwe-iframe-content-show");
    const uiMode = getWalletUIMode(this.auth);
    if (uiMode == "dark") {
      iframeContent == null ? void 0 : iframeContent.classList.add("particle-pwe-iframe-content-dark");
      iframeContent == null ? void 0 : iframeContent.classList.remove("particle-pwe-iframe-content-light");
    } else {
      iframeContent == null ? void 0 : iframeContent.classList.add("particle-pwe-iframe-content-light");
      iframeContent == null ? void 0 : iframeContent.classList.remove("particle-pwe-iframe-content-dark");
    }
    let iframe = document.querySelector(".particle-pwe-iframe");
    if ((iframe == null ? void 0 : iframe.src) && new URLSearchParams(iframe == null ? void 0 : iframe.src).get("theme") !== uiMode) {
      iframe.remove();
      iframe = null;
    }
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.className = "particle-pwe-iframe";
      iframe.allow = "camera";
      iframeContent == null ? void 0 : iframeContent.appendChild(iframe);
      iframe.src = url;
    }
    walletIcon == null ? void 0 : walletIcon.classList.add("particle-pwe-wallet-icon-hide");
    downArrow == null ? void 0 : downArrow.classList.remove("particle-pwe-down-arrow-hide");
    this.updateIframeContentPosition();
  }
  setWalletIcon() {
    const walletIconEl = document.querySelector(".particle-pwe-wallet-icon");
    const downArrowEl = document.querySelector(".particle-pwe-down-arrow");
    walletIconEl && walletIconEl.setAttribute("src", walletIconDarkBase64);
    downArrowEl && downArrowEl.setAttribute("src", downArrowDarkBase64);
  }
  updateIframeContentPosition() {
    var _a, _b;
    const iframeContent = document.querySelector(".particle-pwe-iframe-content");
    if (!iframeContent || ((_a = iframeContent == null ? void 0 : iframeContent.style) == null ? void 0 : _a.display) === "none") {
      return;
    }
    const walletBtn = document.querySelector(".particle-pwe-btn");
    if (!((_b = this.config.wallet) == null ? void 0 : _b.displayWalletEntry)) {
      walletBtn.style.display = "none";
    }
    const walletBtnRect = walletBtn.getBoundingClientRect();
    const iframeContentRect = iframeContent.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const iframeContentHeight = iframeContentRect.height;
    const iframeContentWidth = iframeContentRect.width;
    const walletBtnHeight = walletBtnRect.height;
    const walletBtnTop = walletBtnRect.top;
    const walletBtnLeft = walletBtnRect.left;
    const walletBtnBottom = walletBtnRect.bottom;
    const walletBtnRight = walletBtnRect.right;
    if (walletBtnBottom + iframeContentHeight + 10 < windowHeight && walletBtnRight + iframeContentWidth + 10 < windowWidth) {
      iframeContent.style.top = walletBtnBottom + 10 + "px";
      iframeContent.style.left = walletBtnLeft + "px";
    } else if (walletBtnBottom + iframeContentHeight + 10 < windowHeight && walletBtnLeft - iframeContentWidth - 10 > 0) {
      iframeContent.style.top = walletBtnBottom + 10 + "px";
      iframeContent.style.left = walletBtnRight - iframeContentWidth + "px";
    } else if (walletBtnTop - iframeContentHeight - 10 > 0 && walletBtnRight + iframeContentWidth + 10 < windowWidth) {
      iframeContent.style.top = walletBtnTop - iframeContentHeight - 10 + "px";
      iframeContent.style.left = walletBtnLeft + "px";
    } else if (walletBtnTop - iframeContentHeight - 10 > 0 && walletBtnLeft - iframeContentWidth - 10 > 0) {
      iframeContent.style.top = walletBtnTop - iframeContentHeight - 10 + "px";
      iframeContent.style.left = walletBtnRight - iframeContentWidth + "px";
    } else if (walletBtnRight + iframeContentWidth + 10 < windowWidth) {
      const top = walletBtnTop + walletBtnHeight / 2 - iframeContentHeight / 2;
      iframeContent.style.top = top < 30 ? "30px" : top > windowHeight - iframeContentHeight - 30 ? windowHeight - iframeContentHeight - 30 + "px" : top + "px";
      iframeContent.style.left = walletBtnRight + 10 + "px";
    } else if (walletBtnLeft - iframeContentWidth - 10 > 0) {
      const top = walletBtnTop + walletBtnHeight / 2 - iframeContentHeight / 2;
      iframeContent.style.top = top < 30 ? "30px" : top > windowHeight - iframeContentHeight - 30 ? windowHeight - iframeContentHeight - 30 + "px" : top + "px";
      iframeContent.style.left = walletBtnLeft - iframeContentWidth - 10 + "px";
    } else {
    }
  }
  setButtonStorageData(data) {
    const { innerWidth, innerHeight } = window;
    const position = this.walletEntryOptions.position || "bottom-right";
    localStorage.setItem(
      _WalletEntryPlugin.WALLET_BTN_POSITION,
      `${data.x},${data.y},${data.direction},${position}`
    );
    localStorage.setItem(_WalletEntryPlugin.WALLET_BTN_POSITION + "_window", `${innerWidth},${innerHeight}`);
  }
  getButtonStorageData() {
    var _a, _b, _c, _d;
    const { innerWidth, innerHeight } = window;
    const [x, y, direction = "right", position] = ((_b = (_a = localStorage == null ? void 0 : localStorage.getItem(_WalletEntryPlugin.WALLET_BTN_POSITION)) == null ? void 0 : _a.split) == null ? void 0 : _b.call(_a, ",")) || [];
    let [width, height] = ((_d = (_c = localStorage.getItem(_WalletEntryPlugin.WALLET_BTN_POSITION + "_window")) == null ? void 0 : _c.split) == null ? void 0 : _d.call(_c, ",")) || [];
    width = Number(width || 0);
    height = Number(height || 0);
    if (width && height && (width != innerWidth || height != innerHeight)) {
      localStorage.removeItem(_WalletEntryPlugin.WALLET_BTN_POSITION);
      localStorage.removeItem(_WalletEntryPlugin.WALLET_BTN_POSITION + "_window");
      return {
        x: innerWidth,
        y: innerHeight,
        position: position || this.walletEntryOptions.position || "bottom-right",
        direction: "right"
      };
    }
    return {
      x: Number(x) || 0,
      y: Number(y) || 0,
      position: position || this.walletEntryOptions.position || "bottom-right",
      direction
    };
  }
  updateWalletBtnPosition(x, y, type22 = "") {
    const { width } = document.body.getBoundingClientRect();
    const { direction } = this.getButtonStorageData();
    const isRight = x > width / 2 || type22 == "windowResize" && direction === "right";
    let left = isRight ? width - 60 : 0;
    let top = y;
    let newDirection = "left";
    if (left < 30) {
      left = 30;
      newDirection = "left";
    } else if (left > width - 90) {
      left = width - 90;
      newDirection = "right";
    }
    if (top < 30) {
      top = 30;
    } else if (top > window.innerHeight - 90) {
      top = window.innerHeight - 90;
    }
    return {
      left,
      top,
      direction: newDirection
    };
  }
  closeWallet() {
    const iframeContent = document.querySelector(".particle-pwe-iframe-content");
    iframeContent == null ? void 0 : iframeContent.classList.remove("particle-pwe-iframe-content-show");
    const walletIcon = document.querySelector(".particle-pwe-wallet-icon");
    const downArrow = document.querySelector(".particle-pwe-down-arrow");
    walletIcon == null ? void 0 : walletIcon.classList.remove("particle-pwe-wallet-icon-hide");
    downArrow == null ? void 0 : downArrow.classList.add("particle-pwe-down-arrow-hide");
  }
  resize() {
    const that = this;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem(_WalletEntryPlugin.WALLET_BTN_POSITION);
        const walletBtn = document.querySelector(".particle-pwe-btn");
        const { x: btnX, y: btnY } = this.getButtonStorageData();
        const x = btnX || window.innerWidth;
        const y = btnY || window.innerHeight;
        const { left, top, direction } = that.updateWalletBtnPosition(x, y, "windowResize");
        if (walletBtn) {
          walletBtn.style.left = left + "px";
          walletBtn.style.top = top + "px";
        }
        this.setButtonStorageData({
          x,
          y,
          direction
        });
        that.updateIframeContentPosition();
        (() => __async(this, null, function* () {
          let count = 0;
          do {
            count++;
            yield this.sleep(100);
            this.updateIframeContentPosition();
          } while (count < 15);
        }))();
      }, 10);
    };
  }
  sleep(ms) {
    return __async(this, null, function* () {
      return new Promise((resolve) => setTimeout(resolve, ms));
    });
  }
  preload() {
    const url = walletUrl();
    const script = document.createElement("script");
    script.src = `${url}/preload.js?_=${Math.floor(Date.now() / 6e4) * 6e4}`;
    script.setAttribute("data-target", "web-wallet");
    document.body.appendChild(script);
  }
  walletEntryRander() {
    return __async(this, null, function* () {
      var _a;
      style_default();
      html_default();
      this.setWalletIcon();
      if (((_a = this.walletEntryOptions) == null ? void 0 : _a.preload) !== false) {
        this.preload();
      }
      const walletBtn = document.querySelector(".particle-pwe-btn");
      const { x: btnX, y: btnY } = this.getButtonStorageData();
      if (btnX && btnY) {
        if ((Number(btnX) || 0) < window.innerWidth && (Number(btnY) || 0) < window.innerHeight) {
          const { left, top } = this.updateWalletBtnPosition(Number(btnX) || 0, Number(btnY) || 0);
          walletBtn.style.left = left + "px";
          walletBtn.style.top = top + "px";
          this.updateIframeContentPosition();
        } else {
          const { left, top } = this.updateWalletBtnPosition(window.innerWidth, window.innerHeight);
          walletBtn.style.left = left + "px";
          walletBtn.style.top = top + "px";
          this.updateIframeContentPosition();
        }
      } else {
        const position = this.walletEntryOptions.position || "bottom-left";
        let top, left;
        if (position === "bottom-right") {
          top = window.innerHeight;
          left = window.innerWidth;
        } else if (position === "top-right") {
          top = 0;
          left = window.innerWidth;
        } else if (position === "top-left") {
          top = 0;
          left = 0;
        } else {
          top = window.innerHeight;
          left = 0;
        }
        const positionData = this.updateWalletBtnPosition(left, top);
        walletBtn.style.left = positionData.left + "px";
        walletBtn.style.top = positionData.top + "px";
        this.updateIframeContentPosition();
      }
      const walletIcon = document.querySelector(".particle-pwe-wallet-icon");
      const downArrow = document.querySelector(".particle-pwe-down-arrow");
      let isDraggie = false;
      const Draggabilly = (yield import("./draggabilly-UQRSRFN2.js")).default;
      draggie = new Draggabilly(walletBtn);
      draggie.on("dragStart", () => {
        isDraggie = true;
        walletBtn.style.cursor = "move";
      });
      draggie.on("dragMove", () => {
        this.updateIframeContentPosition();
      });
      draggie.on("dragEnd", (event, pointer) => {
        event.stopPropagation();
        walletBtn.style.cursor = "pointer";
        const { clientX: x, clientY: y } = pointer;
        const { left, top, direction } = this.updateWalletBtnPosition(x, y - 35);
        walletBtn.style.left = left + "px";
        walletBtn.style.top = top + "px";
        this.updateIframeContentPosition();
        (() => __async(this, null, function* () {
          let count = 0;
          do {
            count++;
            yield this.sleep(20);
            this.updateIframeContentPosition();
          } while (count < 70);
        }))();
        this.setButtonStorageData({
          x: left,
          y: top,
          direction
        });
        setTimeout(() => {
          isDraggie = false;
        });
      });
      walletBtn.addEventListener("touchend", () => {
        if (!isDraggie) {
          this.openWallet();
        }
      });
      walletIcon == null ? void 0 : walletIcon.addEventListener("click", (event) => {
        var _a2;
        (_a2 = event == null ? void 0 : event.stopPropagation) == null ? void 0 : _a2.call(event);
        if (!isDraggie && !this.isMobile()) {
          this.openWallet();
        }
      });
      downArrow == null ? void 0 : downArrow.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!isDraggie) {
          this.closeWallet();
        }
      });
      window.walletEntryPlugin = this;
      if (!isListen) {
        isListen = true;
        window.addEventListener("resize", window.walletEntryPlugin.resize(), false);
        window.addEventListener(
          "message",
          (events) => {
            var _a2, _b, _c, _d, _e;
            if (((_a2 = events == null ? void 0 : events.data) == null ? void 0 : _a2.type) === "PARTICLE_WALLET_RESIZE_IFRAME") {
              const iframeContent = document.querySelector(".particle-pwe-iframe-content");
              const classList = iframeContent == null ? void 0 : iframeContent.classList;
              if ((_b = classList == null ? void 0 : classList.contains) == null ? void 0 : _b.call(classList, fullScreenClass)) {
                if (!((_c = window.walletEntryPlugin.config.wallet) == null ? void 0 : _c.displayWalletEntry)) {
                  window.walletEntryPlugin.closeWallet();
                } else {
                  (_d = classList == null ? void 0 : classList.remove) == null ? void 0 : _d.call(classList, fullScreenClass);
                  window.walletEntryPlugin.resize();
                  window.walletEntryPlugin.updateIframeContentPosition();
                }
              } else {
                (_e = classList == null ? void 0 : classList.add) == null ? void 0 : _e.call(classList, fullScreenClass);
              }
            }
          },
          false
        );
      }
    });
  }
  destroy() {
    var _a, _b, _c;
    (_a = draggie == null ? void 0 : draggie.destroy) == null ? void 0 : _a.call(draggie);
    window.removeEventListener("resize", this.resize(), false);
    (_c = (_b = document.querySelector(".particle-wallet-entry-container")) == null ? void 0 : _b.remove) == null ? void 0 : _c.call(_b);
  }
};
var WalletEntryPlugin = _WalletEntryPlugin;
WalletEntryPlugin.WALLET_BTN_POSITION = "walletBtnPosition";
function particleActive(bi, chainId, walletAddress, userInfo, action) {
  const _a = userInfo, { token, thirdparty_user_info, security_account } = _a, user = __objRest(_a, ["token", "thirdparty_user_info", "security_account"]);
  bi.active({
    chain_id: chainId,
    identity: user.uuid,
    login_type: AcitveLoginType.PARTICLE,
    action,
    wallet_address: walletAddress,
    user_info: JSON.stringify(user, (key, value) => {
      if (!isNullish(value))
        return value;
    })
  });
}
var createSession = (data) => __async(void 0, null, function* () {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl()}/auth-sessions`, true);
    xhr.timeout = 3e4;
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
      const response = JSON.parse(this.responseText);
      if (response.error_code) {
        reject(response.message);
      } else {
        resolve(response.key);
      }
    };
    xhr.onerror = function() {
      reject(this.statusText);
    };
    xhr.send(`data=${data}`);
  });
});
var create_session_default = createSession;
var silenceLogout = (_0) => __async(void 0, [_0], function* ({
  token,
  projectUuid,
  projectKey
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let url = `${apiUrl()}/fast_logout`;
    url += `?projectUuid=${projectUuid}&projectKey=${projectKey}`;
    xhr.open("POST", url, true);
    xhr.timeout = 3e4;
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
      const response = JSON.parse(this.responseText);
      if (response.error_code) {
        reject(response);
      } else {
        resolve(response.success);
      }
    };
    xhr.onerror = function() {
      reject(this.statusText);
    };
    xhr.send(`token=${token}`);
  });
});
var silence_logout_default = silenceLogout;
var userSimpleInfo = (_0) => __async(void 0, [_0], function* ({
  token,
  projectUuid,
  projectKey,
  projectAppUuid
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let url = `${apiUrl()}/apps/${projectAppUuid}/user-simple-info`;
    url += `?projectUuid=${projectUuid}&projectKey=${projectKey}&token=${token}`;
    xhr.open("GET", url, true);
    xhr.timeout = 3e4;
    xhr.onload = function() {
      const response = JSON.parse(this.responseText);
      if (response.error_code) {
        reject(response);
      } else {
        resolve(response);
      }
    };
    xhr.onerror = function() {
      reject(this.statusText);
    };
    xhr.send();
  });
});
var user_simple_info_default = userSimpleInfo;
var Auth = class {
  constructor(config, bi) {
    this.config = config;
    this.bi = bi;
    this.PN_AUTH_USER_INFO = "pn_auth_user_info";
    this.PN_AUTH_TYPE = "pn_auth_type";
    this.PN_TEMP_SECRET_KEY = "pn_temp_secret_key";
    this.events = new import_events.EventEmitter();
    this.uiMode = "auto";
    this.displayCloseButton = true;
    this.displayWallet = false;
    this.modalBorderRadius = 24;
    this.authResultMap = /* @__PURE__ */ new Map();
    if (typeof window !== "undefined") {
      addEventListener("message", (event) => {
        var _a, _b, _c;
        if (((_a = event == null ? void 0 : event.data) == null ? void 0 : _a.name) === "particle-network-provider") {
          this.handleAuthEvent(event);
        } else if (((_b = event == null ? void 0 : event.data) == null ? void 0 : _b.name) === "particle-network-wallet") {
          this.handleWalletEvent(event);
        } else if (((_c = event == null ? void 0 : event.data) == null ? void 0 : _c.name) === "particle-network-auth-load-completed") {
          this.hideIframeBackground(event);
        }
      });
    }
  }
  handleAuthEvent(event) {
    var _b, _d;
    const authResult = this.getAuthResult((_b = event.data) == null ? void 0 : _b.state, true);
    if (!authResult) {
      return;
    }
    let data;
    try {
      data = this.decrypt(event.data);
    } catch (error) {
      data = {
        error: AuthError.decrypt(error)
      };
    }
    if (data.wallets) {
      const userInfo = this.getUserInfo();
      if (userInfo) {
        userInfo.wallets = data.wallets;
        this.setUserInfo(userInfo);
      }
    }
    if (data.security_account) {
      const userInfo = this.getUserInfo();
      if (userInfo) {
        userInfo.security_account = data.security_account;
        this.setUserInfo(userInfo);
      }
    }
    if (data.token && data.uuid) {
      const _c = data, { redirect_type } = _c, info = __objRest(_c, ["redirect_type"]);
      this.setUserInfo(info);
      this.setAuthType(((_d = event.data) == null ? void 0 : _d.authType) || "");
      this.bi.records({
        record_type: RecordType.PAGE_LOGIN_SUCCESS_BACK
      });
    }
    const { resolve, reject, container } = authResult;
    if (data.error) {
      if (data.error.code === 8005 || data.error.code === 10005) {
        this.setUserInfo(null);
        this.events.emit("disconnect");
      }
      reject(data.error);
    } else {
      resolve(data);
    }
    if (container) {
      try {
        if ("remove" in container) {
          container.remove();
        }
      } catch (e) {
      }
    }
    const containerDiv = document.getElementById("particle-network-container");
    if (containerDiv) {
      containerDiv.style.display = "none";
    }
  }
  handleWalletEvent(event) {
    var _a, _b;
    const type22 = (_b = (_a = event == null ? void 0 : event.data) == null ? void 0 : _a.data) == null ? void 0 : _b.type;
    if (type22 === "logout") {
      this.setUserInfo(null);
      this.events.emit("disconnect");
    }
  }
  hideIframeBackground(event) {
    var _a;
    const state = (_a = event == null ? void 0 : event.data) == null ? void 0 : _a.state;
    const result = this.authResultMap.get(state);
    if (result && result.container && "remove" in result.container) {
      result.container.style.backgroundColor = "#00000000";
    }
  }
  setAuthResult(authResult) {
    if ((authResult == null ? void 0 : authResult.container) && "close" in authResult.container && !authResult.container.closed) {
      try {
        authResult.intervalTimer = setInterval(() => {
          if ((authResult == null ? void 0 : authResult.container) && "close" in authResult.container && authResult.container.closed) {
            const result = this.getAuthResult(authResult.state, true);
            if (result) {
              result.reject(AuthError.userCancelOperation());
            }
          }
        }, 500);
      } catch (e) {
      }
    }
    this.authResultMap.set(authResult.state, authResult);
  }
  getAuthResult(state, popup = false) {
    if (!state) {
      return void 0;
    }
    const result = this.authResultMap.get(state);
    if (popup && result) {
      if (result.intervalTimer) {
        clearInterval(result.intervalTimer);
        result.intervalTimer = void 0;
      }
      this.authResultMap.delete(state);
    }
    return result;
  }
  login(config) {
    return __async(this, null, function* () {
      var _a;
      this.bi.records({
        record_type: RecordType.PAGE_LOGIN_BUTTON_CLICK
      });
      const url = yield this.buildUrl("/login", {
        login_type: config == null ? void 0 : config.preferredAuthType,
        support_auth_types: (_a = config == null ? void 0 : config.supportAuthTypes) != null ? _a : "all",
        account: config == null ? void 0 : config.account,
        prompt: config == null ? void 0 : config.socialLoginPrompt,
        authorization: config == null ? void 0 : config.authorization
      });
      const state = new URL(url).searchParams.get("state") || "";
      let container;
      if (config && config.preferredAuthType && (this.isSocialLogin(config.preferredAuthType) || config.account && isBlockingThirdpartyCookiesBrowser(
        config.preferredAuthType === "email" || config.preferredAuthType === "phone" || config.preferredAuthType === "jwt"
      ))) {
        const iframeWidth = config.preferredAuthType == "facebook" ? 800 : 475;
        const iframeHeight = 770;
        container = yield this.openUrl(url, iframeWidth, iframeHeight, true, "login");
      } else {
        container = this.getIframe();
        container.src = url;
        if ((config == null ? void 0 : config.preferredAuthType) === "jwt" && (config == null ? void 0 : config.hideLoading)) {
          this.hideLoading(container);
        }
      }
      return new Promise((resolve, reject) => {
        this.setAuthResult({
          resolve: (value) => {
            var _a2;
            this.events.emit("connect", value);
            particleActive(
              this.bi,
              this.getChainId(),
              ((_a2 = this.getWallet()) == null ? void 0 : _a2.public_address) || "",
              this.getUserInfo(),
              ActiveAction.LOGIN
            );
            resolve(value);
          },
          reject,
          state,
          container
        });
      });
    });
  }
  isSocialLogin(authType) {
    return authType !== "email" && authType !== "phone" && authType !== "jwt";
  }
  logout(hideLoading = true) {
    return __async(this, null, function* () {
      var _a;
      if (!this.isLogin()) {
        return;
      }
      if (hideLoading) {
        try {
          yield silence_logout_default({
            token: ((_a = this.getUserInfo()) == null ? void 0 : _a.token) || "",
            projectUuid: this.config.projectId,
            projectKey: this.config.clientKey
          });
        } catch (error) {
          if ((error == null ? void 0 : error.error_code) !== 10005) {
            throw error;
          }
        }
        this.setUserInfo(null);
        this.events.emit("disconnect");
      } else {
        const url = yield this.buildUrl("/logout");
        const container = yield this.openUrl(url);
        const state = new URL(url).searchParams.get("state") || "";
        if (hideLoading) {
          this.hideLoading(container);
        }
        return new Promise((resolve) => {
          this.setAuthResult({
            resolve: () => {
              this.setUserInfo(null);
              this.events.emit("disconnect");
              resolve();
            },
            reject: (error) => {
              this.setUserInfo(null);
              this.events.emit("disconnect");
              resolve();
            },
            state,
            container
          });
        });
      }
    });
  }
  accountSecurity() {
    return __async(this, null, function* () {
      yield this.openAccountAndSecurity();
    });
  }
  openAccountAndSecurity() {
    return __async(this, null, function* () {
      var _a;
      if (!this.isLogin()) {
        return Promise.reject(AuthError.notLogin());
      }
      const url = yield this.buildUrl("/account/security", { token: (_a = this.getUserInfo()) == null ? void 0 : _a.token });
      const container = yield this.openUrl(url);
      const state = new URL(url).searchParams.get("state") || "";
      return new Promise((resolve, reject) => {
        this.setAuthResult({
          resolve,
          reject,
          state,
          container
        });
      });
    });
  }
  getSecurityAccount() {
    return __async(this, null, function* () {
      var _a;
      if (!this.isLogin()) {
        return Promise.reject(AuthError.notLogin());
      }
      const { projectId, clientKey, appId } = this.config;
      const info = yield user_simple_info_default({
        projectUuid: projectId,
        projectKey: clientKey,
        projectAppUuid: appId,
        token: ((_a = this.getUserInfo()) == null ? void 0 : _a.token) || ""
      });
      const userInfo = this.getUserInfo();
      if (userInfo) {
        this.setUserInfo(__spreadValues(__spreadValues({}, userInfo), info));
      }
      return info;
    });
  }
  hasMasterPassword() {
    var _a, _b;
    if (!this.isLogin()) {
      throw AuthError.notLogin();
    }
    return ((_b = (_a = this.getUserInfo()) == null ? void 0 : _a.security_account) == null ? void 0 : _b.has_set_master_password) || false;
  }
  hasPaymentPassword() {
    var _a, _b;
    if (!this.isLogin()) {
      throw AuthError.notLogin();
    }
    return ((_b = (_a = this.getUserInfo()) == null ? void 0 : _a.security_account) == null ? void 0 : _b.has_set_payment_password) || false;
  }
  hasSecurityAccount() {
    var _a, _b, _c, _d;
    if (!this.isLogin()) {
      throw AuthError.notLogin();
    }
    return !isNullish((_b = (_a = this.getUserInfo()) == null ? void 0 : _a.security_account) == null ? void 0 : _b.phone) || !isNullish((_d = (_c = this.getUserInfo()) == null ? void 0 : _c.security_account) == null ? void 0 : _d.email);
  }
  sign(method, message) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      if (!this.walletExist()) {
        return Promise.reject(AuthError.walletNotCreated());
      }
      let url;
      if (((_a = this.config.chainName) == null ? void 0 : _a.toLowerCase()) === "solana") {
        url = yield this.buildUrl("/solana/sign", {
          token: (_b = this.getUserInfo()) == null ? void 0 : _b.token,
          method,
          message
        });
      } else {
        url = yield this.buildUrl("/evm-chain/sign", {
          token: (_c = this.getUserInfo()) == null ? void 0 : _c.token,
          method,
          message
        });
      }
      const container = yield this.openUrl(url);
      const state = new URL(url).searchParams.get("state") || "";
      return new Promise((resolve, reject) => {
        this.setAuthResult({
          resolve: (value) => {
            var _a2, _b2;
            particleActive(
              this.bi,
              this.getChainId(),
              ((_a2 = this.getWallet()) == null ? void 0 : _a2.public_address) || "",
              this.getUserInfo(),
              ActiveAction.SIGN
            );
            resolve((_b2 = value.signature) != null ? _b2 : "");
          },
          reject,
          state,
          container
        });
      });
    });
  }
  signAllTransactions(messages) {
    return __async(this, null, function* () {
      var _a;
      if (!this.walletExist()) {
        return Promise.reject(AuthError.walletNotCreated());
      }
      if (((_a = this.config.chainName) == null ? void 0 : _a.toLowerCase()) !== "solana") {
        return Promise.reject(AuthError.unsupportedMethod());
      }
      const result = yield this.sign("signAllTransactions", JSON.stringify(messages));
      const signatures = JSON.parse(result);
      return signatures;
    });
  }
  sendTransaction(message) {
    return __async(this, null, function* () {
      var _a;
      if (!this.walletExist()) {
        return Promise.reject(AuthError.walletNotCreated());
      }
      if (((_a = this.config.chainName) == null ? void 0 : _a.toLowerCase()) === "solana") {
        return this.sign("signAndSendTransaction", message);
      } else {
        return this.sign("eth_sendTransaction", message);
      }
    });
  }
  switchChain(chain, hideLoading = false) {
    return __async(this, null, function* () {
      var _a;
      const userInfo = this.getUserInfo();
      if (!userInfo) {
        return Promise.reject(AuthError.notLogin());
      }
      if (typeof chain.name !== "string" || typeof chain.id !== "number") {
        throw AuthError.paramsError();
      }
      const chainInfo = utils_exports.getChainInfo(chain);
      if (!chainInfo) {
        throw AuthError.unsupportedChain();
      }
      const wallets = userInfo.wallets;
      if (((_a = this.config.chainName) == null ? void 0 : _a.toLowerCase()) === chain.name.toLowerCase() && this.config.chainId === chain.id) {
        return wallets;
      }
      const wallet = this.getWallet(chain.name.toLowerCase() === "solana" ? "solana" : "evm_chain");
      if (wallet) {
        this.config.chainName = chain.name;
        this.config.chainId = chain.id;
        this.events.emit("chainChanged", chain);
        return wallets;
      }
      const result = yield this.createWallet(chain.name, hideLoading);
      this.config.chainName = chain.name;
      this.config.chainId = chain.id;
      this.events.emit("connect", this.getUserInfo());
      this.events.emit("chainChanged", chain);
      return result;
    });
  }
  setChainInfo(chain) {
    if (typeof chain.name !== "string" || typeof chain.id !== "number") {
      throw AuthError.paramsError();
    }
    const chainInfo = utils_exports.getChainInfo(chain);
    if (!chainInfo) {
      throw AuthError.unsupportedChain();
    }
    this.config.chainName = chain.name;
    this.config.chainId = chain.id;
  }
  createWallet(name22, hideLoading = false) {
    return __async(this, null, function* () {
      const userInfo = this.getUserInfo();
      if (!userInfo) {
        return Promise.reject(AuthError.notLogin());
      }
      const wallet = this.getWallet(name22.toLowerCase() === "solana" ? "solana" : "evm_chain");
      if (wallet) {
        return userInfo.wallets;
      }
      const url = yield this.buildUrl("/wallet", {
        token: userInfo.token,
        chain_name: name22
      });
      const state = new URL(url).searchParams.get("state") || "";
      const container = yield this.openUrl(url);
      if (hideLoading) {
        this.hideLoading(container);
      }
      return new Promise((resolve, reject) => {
        this.setAuthResult({
          resolve: (value) => {
            resolve(value);
          },
          reject,
          state,
          container
        });
      });
    });
  }
  hideLoading(container) {
    const containerDiv = document.getElementById("particle-network-container");
    if (containerDiv) {
      containerDiv.style.display = "none";
    }
    try {
      if (container && "remove" in container) {
        container.style.display = "none";
      }
    } catch (e) {
    }
  }
  chainId() {
    return this.getChainId();
  }
  getChainId() {
    return this.config.chainId;
  }
  chain() {
    return this.getChain();
  }
  getChain() {
    return {
      id: this.config.chainId,
      name: this.config.chainName
    };
  }
  basicCredentials() {
    return `Basic ${import_buffer.Buffer.from(`${this.config.projectId}:${this.config.clientKey}`, "utf8").toString("base64")}`;
  }
  isLogin() {
    return this.getUserInfo() !== null;
  }
  isLoginAsync() {
    return __async(this, null, function* () {
      yield this.getSecurityAccount();
      return this.getUserInfo();
    });
  }
  userInfo() {
    return this.getUserInfo();
  }
  getUserInfo() {
    const info = localStorage.getItem(this.concatStorageKey(this.PN_AUTH_USER_INFO));
    return info ? JSON.parse(info) : null;
  }
  getAuthType() {
    const authType = localStorage.getItem(this.concatStorageKey(this.PN_AUTH_TYPE));
    return authType;
  }
  setAuthType(authType) {
    localStorage.setItem(this.concatStorageKey(this.PN_AUTH_TYPE), authType);
  }
  walletExist() {
    return this.getWallet() != null;
  }
  wallet(chainType) {
    return this.getWallet(chainType);
  }
  getWallet(chainType) {
    const userInfo = this.getUserInfo();
    if (!userInfo) {
      return null;
    }
    const wallet = userInfo.wallets.find((wallet2) => wallet2.chain_name === (chainType || this.walletChainName()));
    if (wallet !== void 0 && wallet.public_address.length > 0) {
      return wallet;
    }
    return null;
  }
  getEVMAddress() {
    const wallet = this.getWallet("evm_chain");
    return Promise.resolve(wallet == null ? void 0 : wallet.public_address);
  }
  getSolanaAddress() {
    const wallet = this.getWallet("solana");
    return Promise.resolve(wallet == null ? void 0 : wallet.public_address);
  }
  setAuthTheme(config) {
    if (config.uiMode) {
      this.uiMode = config.uiMode;
    }
    if (config.displayCloseButton !== null && config.displayCloseButton !== void 0) {
      this.displayCloseButton = config.displayCloseButton;
    }
    if (config.displayWallet !== null && config.displayWallet !== void 0) {
      this.displayWallet = config.displayWallet;
    }
    if (!isNullish(config.modalBorderRadius)) {
      this.modalBorderRadius = config.modalBorderRadius;
    }
  }
  getAuthTheme() {
    return {
      uiMode: this.uiMode,
      displayCloseButton: this.displayCloseButton,
      displayWallet: this.displayWallet,
      modalBorderRadius: this.modalBorderRadius
    };
  }
  on(event, listener) {
    this.events.on(event, listener);
    return this;
  }
  once(event, listener) {
    this.events.once(event, listener);
    return this;
  }
  off(event, listener) {
    this.events.off(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this.events.removeListener(event, listener);
    return this;
  }
  walletChainName() {
    var _a;
    return ((_a = this.config.chainName) == null ? void 0 : _a.toLowerCase()) === "solana" ? "solana" : "evm_chain";
  }
  setUserInfo(info) {
    if (info) {
      localStorage.setItem(this.concatStorageKey(this.PN_AUTH_USER_INFO), JSON.stringify(info));
    } else {
      localStorage.removeItem(this.concatStorageKey(this.PN_AUTH_USER_INFO));
      localStorage.removeItem(WalletEntryPlugin.WALLET_BTN_POSITION);
      localStorage.removeItem(this.concatStorageKey(this.PN_AUTH_TYPE));
    }
  }
  concatStorageKey(key) {
    return `${key}_${this.config.appId}`;
  }
  getIframe() {
    let containerDiv = document.getElementById("particle-network-container");
    if (!containerDiv) {
      containerDiv = document.createElement("div");
      containerDiv.setAttribute(
        "style",
        "display: block;position: fixed;top: 0px;right: 0px;width: 100%;height: 100%;border-radius: 0px;border: none;z-index: 2147483647;background-color: rgba(0, 0, 0, 0.5);align-items: center;"
      );
      containerDiv.id = "particle-network-container";
      document.body.appendChild(containerDiv);
    } else {
      containerDiv.style.display = "block";
    }
    let iframe;
    const elements = document.getElementsByName("particle-network-iframe");
    if (elements.length > 0) {
      iframe = elements[0];
      iframe.style.display = "";
    } else {
      iframe = document.createElement("iframe");
      iframe.name = "particle-network-iframe";
      iframe.className = "particle-auth-iframe";
      iframe.allow = "publickey-credentials-get";
      let bgColor = "#FFFFFF";
      const themeType = this.getThemeType();
      if (themeType === "dark") {
        bgColor = "#1C1D22";
      }
      const { width: screenWidth } = window.screen;
      let width = "400px";
      let height = "650px";
      let top = "50%";
      let left = "50%";
      let borderRadius = this.modalBorderRadius;
      let transform = "translate(-50%, -50%)";
      if (screenWidth < 500) {
        width = "100%";
        height = "100%";
        borderRadius = 0;
        transform = "none";
        top = "0px";
        left = "0px";
      }
      const iframeStyles = {
        position: "absolute",
        left,
        top,
        transform,
        width,
        height,
        border: "none",
        "border-radius": `${borderRadius}px`,
        "z-index": "2147483647",
        "background-color": bgColor,
        "max-width": "100%",
        "max-height": "100%"
      };
      iframe.setAttribute(
        "style",
        Object.entries(iframeStyles).map(([key, value]) => `${key}:${value}`).join(";")
      );
      containerDiv.appendChild(iframe);
    }
    return iframe;
  }
  openUrl(url, width = 475, height = 770, forcePopup = false, contentKey = "sign") {
    return __async(this, null, function* () {
      const authType = this.getAuthType();
      if (forcePopup || isBlockingThirdpartyCookiesBrowser(authType === "email" || authType === "phone" || authType === "jwt")) {
        let container = popupWindow(url, "particle-auth", width, height);
        if (!container) {
          container = yield this.continuePopup(url, width, height, contentKey);
        }
        container.name = "particle-auth-popup";
        return container;
      }
      const iframe = this.getIframe();
      iframe.src = url;
      return iframe;
    });
  }
  continuePopup(url, width = 500, height = 750, contentKey = "sign") {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        approvePopupRender(() => {
          const popup = popupWindow(url, "particle-auth", width, height);
          if (popup) {
            resolve(popup);
          } else {
            reject(new Error("popup window blocked"));
          }
        }, contentKey);
      });
    });
  }
  buildUrl(_0) {
    return __async(this, arguments, function* (path, extraParams = {}) {
      const params = {
        project_uuid: this.config.projectId,
        project_client_key: this.config.clientKey,
        project_app_uuid: this.config.appId,
        chain_name: this.config.chainName,
        chain_id: Number(this.config.chainId),
        sdk_version: getVersion(),
        device_id: getDeviceId()
      };
      Object.assign(params, __spreadValues({}, extraParams));
      const state = uuidv4_default();
      let value = url_crypto_exports.encryptUrlParam(params);
      const secretKey = value.slice(-32);
      sessionStorage.setItem(`${this.PN_TEMP_SECRET_KEY}-${state}`, secretKey);
      if (value.length > 1e4) {
        const sessionKey = yield create_session_default(value);
        value = `session_key_${sessionKey}`;
      }
      let url = `${authUrl()}?params=${value}&encoding=base64&theme_type=${this.getThemeType()}&display_close_button=${this.displayCloseButton}&display_wallet=${this.displayWallet}&language=${controller.languageCode}&state=${state}&fiat_coin=${controller.fiatCoin}`;
      if (this.config.securityAccount) {
        url += `&security_account=${encodeURIComponent(JSON.stringify(this.config.securityAccount))}`;
      }
      if (controller.erc4337) {
        url += `&erc4337=${encodeURIComponent(JSON.stringify(controller.erc4337))}`;
      }
      return `${url}#${path}`;
    });
  }
  getThemeType() {
    return this.uiMode === "auto" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : this.uiMode;
  }
  decrypt({ data, state }) {
    const secretKey = sessionStorage.getItem(`${this.PN_TEMP_SECRET_KEY}-${state}`) || "";
    const plaintext = url_crypto_exports.decryptData(data, secretKey, "hex");
    return JSON.parse(plaintext);
  }
};
function isHexPrefixed(str) {
  if (typeof str !== "string") {
    throw new Error(`[isHexPrefixed] input must be type 'string', received type ${typeof str}`);
  }
  return str[0] === "0" && str[1] === "x";
}
function addHexPrefix(str) {
  if (typeof str !== "string") {
    return str;
  }
  return isHexPrefixed(str) ? str : "0x" + str;
}
var EvmService = class {
  constructor(auth) {
    this.auth = auth;
  }
  assertEVM() {
    var _a, _b;
    if (((_b = (_a = this.auth.getChain()) == null ? void 0 : _a.name) == null ? void 0 : _b.toLowerCase()) === "solana") {
      throw AuthError.unsupportedMethod();
    }
  }
  sendTransaction(transaction) {
    return __async(this, null, function* () {
      this.assertEVM();
      return this.auth.sendTransaction(addHexPrefix(import_buffer4.Buffer.from(JSON.stringify(transaction)).toString("hex")));
    });
  }
  personalSign(message) {
    return __async(this, null, function* () {
      this.assertEVM();
      return this.auth.sign("personal_sign", message);
    });
  }
  personalSignUniq(message) {
    return __async(this, null, function* () {
      this.assertEVM();
      return this.auth.sign("personal_sign_uniq", message);
    });
  }
  signTypedData(_0) {
    return __async(this, arguments, function* ({
      data,
      version: version22
    }) {
      this.assertEVM();
      return this.auth.sign(
        `eth_signTypedData_${version22.toLowerCase()}`,
        addHexPrefix(import_buffer4.Buffer.from(JSON.stringify(data)).toString("hex"))
      );
    });
  }
  signTypedDataUniq(data) {
    return __async(this, null, function* () {
      this.assertEVM();
      return this.auth.sign(
        "eth_signTypedData_v4_uniq",
        addHexPrefix(import_buffer4.Buffer.from(JSON.stringify(data)).toString("hex"))
      );
    });
  }
  getAddress() {
    return __async(this, null, function* () {
      return this.auth.getEVMAddress();
    });
  }
  getRpcUrl() {
    this.assertEVM();
    const domain = `${rpcUrl()}/evm-chain`;
    return `${domain}?chainId=${this.auth.getChain().id}&projectUuid=${this.auth.config.projectId}&projectKey=${this.auth.config.clientKey}`;
  }
};
var evmService_default = EvmService;
var SolanaService = class {
  constructor(auth) {
    this.auth = auth;
  }
  assertSolana() {
    var _a, _b;
    if (((_b = (_a = this.auth.getChain()) == null ? void 0 : _a.name) == null ? void 0 : _b.toLowerCase()) !== "solana") {
      throw AuthError.unsupportedMethod();
    }
  }
  signAndSendTransaction(transaction) {
    this.assertSolana();
    return this.auth.sendTransaction(transaction);
  }
  signTransaction(transaction) {
    return __async(this, null, function* () {
      this.assertSolana();
      const tx = yield this.auth.sign("signTransaction", transaction);
      return import_buffer5.Buffer.from(tx, "base64");
    });
  }
  signAllTransactions(transactions) {
    return __async(this, null, function* () {
      this.assertSolana();
      const txs = yield this.auth.signAllTransactions(transactions);
      return txs.map((tx) => import_buffer5.Buffer.from(tx, "base64"));
    });
  }
  signMessage(msg) {
    return __async(this, null, function* () {
      this.assertSolana();
      const signature = yield this.auth.sign("signMessage", msg);
      return import_buffer5.Buffer.from(signature, "base64");
    });
  }
  getAddress() {
    return __async(this, null, function* () {
      return this.auth.getSolanaAddress();
    });
  }
  getRpcUrl() {
    this.assertSolana();
    const domain = `${rpcUrl()}/solana`;
    return `${domain}?chainId=${this.auth.getChain().id}&projectUuid=${this.auth.config.projectId}&projectKey=${this.auth.config.clientKey}`;
  }
};
var solanaService_default = SolanaService;
var _bi;
var ParticleNetwork = class {
  constructor(config) {
    this.isParticleNetwork = true;
    __privateAdd(this, _bi, void 0);
    if (!config) {
      config = {
        projectId: "34c6b829-5b89-44e8-90a9-6d982787b9c9",
        clientKey: "c6Z44Ml4TQeNhctvwYgdSv6DBzfjf6t6CB0JDscR",
        appId: "c1ad1496-5707-4db6-8a2b-3e9f7273d846",
        chainName: "Solana",
        chainId: 101,
        preload: true,
        wallet: {
          displayWalletEntry: true,
          defaultWalletEntryPosition: "bottom-right"
          /* BR */
        }
      };
    }
    if ((!config.chainName || typeof config.chainName === "string") && (!config.chainId || typeof config.chainId === "number") && typeof config.projectId === "string" && typeof config.clientKey === "string" && typeof config.appId === "string") {
      if (config.chainName && config.chainId) {
        const chain = utils_exports.getChainInfo({
          id: config.chainId,
          name: config.chainName
        });
        if (!chain) {
          throw AuthError.unsupportedChain();
        }
      } else {
        config.chainName = "Ethereum";
        config.chainId = 1;
      }
      this.config = config;
      __privateSet(this, _bi, new BI({
        sdk_api_domain: apiUrl(),
        device_id: getDeviceId(),
        sdk_version: getVersion(),
        project_config: {
          project_uuid: config.projectId,
          project_key: config.clientKey,
          project_app_uuid: config.appId
        }
      }));
      this.auth = new Auth(this.config, __privateGet(this, _bi));
      this.walletEntryCreate();
      this.evm = new evmService_default(this.auth);
      this.solana = new solanaService_default(this.auth);
      if (typeof window !== "undefined") {
        this.openActive();
        window.particle = this;
      }
    } else {
      throw AuthError.paramsError();
    }
    if ((config == null ? void 0 : config.preload) !== false && typeof window !== "undefined") {
      setTimeout(() => {
        this.preload();
      }, 2e3);
    }
  }
  preload() {
    const url = authUrl();
    const script = document.createElement("script");
    script.src = `${url}/preload.js?_=${Math.floor(Date.now() / 6e4) * 6e4}`;
    script.setAttribute("data-target", "web-auth");
    document.body.appendChild(script);
  }
  openActive() {
    var _a;
    if (this.auth.isLogin() && ((_a = this.auth.getWallet()) == null ? void 0 : _a.public_address)) {
      particleActive(
        __privateGet(this, _bi),
        this.auth.getChainId(),
        this.auth.getWallet().public_address,
        this.auth.getUserInfo(),
        ActiveAction.OPEN
      );
    }
  }
  setAuthTheme(config) {
    this.auth.setAuthTheme(config);
  }
  getAuthTheme() {
    return this.auth.getAuthTheme();
  }
  switchChain(chain, hideLoading = false) {
    return __async(this, null, function* () {
      return this.auth.switchChain(chain, hideLoading);
    });
  }
  setChainInfo(chain) {
    this.auth.setChainInfo(chain);
  }
  walletEntryDestroy() {
    var _a;
    (_a = this.walletEntry) == null ? void 0 : _a.destroy();
    this.walletEntry = void 0;
  }
  walletEntryCreate() {
    var _a, _b;
    this.walletEntry = new WalletEntryPlugin(this.config, this.auth, {
      position: ((_a = this.config.wallet) == null ? void 0 : _a.defaultWalletEntryPosition) || "bottom-right",
      preload: (_b = this.config.wallet) == null ? void 0 : _b.preload
    });
  }
  openWallet() {
    var _a, _b;
    if (typeof window !== "undefined") {
      if (this.auth.isLogin() && ((_a = this.auth.getWallet()) == null ? void 0 : _a.public_address)) {
        particleActive(
          __privateGet(this, _bi),
          this.auth.getChainId(),
          this.auth.getWallet().public_address,
          this.auth.getUserInfo(),
          ActiveAction.OPEN_WALLET
        );
      }
      (_b = this.walletEntry) == null ? void 0 : _b.openWallet({
        windowSize: "large"
      });
    }
  }
  buildWalletUrl(config) {
    const url = getWalletUrl(this.auth, config);
    return url;
  }
  openBuy(options, target, features) {
    const url = getBuyUrl(this.auth, options);
    if (typeof window !== "undefined") {
      window.open(url, target, features);
    }
  }
  setLanguage(code) {
    controller.languageCode = code;
  }
  getLanguage() {
    return controller.languageCode;
  }
  get version() {
    return getVersion();
  }
  setFiatCoin(unit) {
    controller.fiatCoin = unit;
  }
  getChain() {
    return this.auth.getChain();
  }
  setERC4337(option) {
    if (typeof option === "boolean" && option) {
      controller.erc4337 = {
        name: "BICONOMY",
        version: "1.0.0"
      };
    } else {
      controller.erc4337 = option;
    }
  }
};
_bi = /* @__PURE__ */ new WeakMap();

// node_modules/@particle-network/solana-wallet/es/index.js
init_index_browser_esm();
var import_bs58 = __toESM(require_bs58());
var import_buffer6 = __toESM(require_buffer());
var import_events2 = __toESM(require_events());
var __defProp4 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __esm2 = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
};
var __export4 = (target, all) => {
  for (var name22 in all)
    __defProp4(target, name22, { get: all[name22], enumerable: true });
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp4(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS2 = (mod) => __copyProps2(__defProp4({}, "__esModule", { value: true }), mod);
var __async2 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var package_exports2 = {};
__export4(package_exports2, {
  default: () => package_default2,
  dependencies: () => dependencies2,
  devDependencies: () => devDependencies2,
  files: () => files2,
  gitHead: () => gitHead2,
  license: () => license2,
  main: () => main2,
  module: () => module2,
  name: () => name2,
  peerDependencies: () => peerDependencies,
  publishConfig: () => publishConfig2,
  scripts: () => scripts2,
  type: () => type2,
  types: () => types2,
  version: () => version2
});
var name2;
var version2;
var files2;
var type2;
var main2;
var module2;
var types2;
var license2;
var publishConfig2;
var dependencies2;
var peerDependencies;
var devDependencies2;
var scripts2;
var gitHead2;
var package_default2;
var init_package2 = __esm2({
  "package.json"() {
    name2 = "@particle-network/solana-wallet";
    version2 = "1.3.2";
    files2 = [
      "es",
      "lib",
      "LICENSE"
    ];
    type2 = "module";
    main2 = "lib/index.js";
    module2 = "es/index.js";
    types2 = "lib/types/index.d.ts";
    license2 = "Apache-2.0";
    publishConfig2 = {
      access: "public"
    };
    dependencies2 = {
      "@particle-network/auth": "^1.3.1"
    };
    peerDependencies = {
      "@solana/web3.js": "^1.50.1",
      bs58: "^4.0.1"
    };
    devDependencies2 = {
      "@solana/web3.js": "^1.50.1",
      "@types/bs58": "^4.0.1",
      bs58: "^4.0.1",
      "ts-loader": "^9.3.1",
      "webpack-cli": "^4.10.0"
    };
    scripts2 = {
      clean: "shx rm -rf lib/* && shx rm -rf es/*",
      package: `shx echo '{ "type": "commonjs" }' > lib/package.json`,
      build: "yarn clean && node ./esBuild.js && tsc --emitDeclarationOnly -p tsconfig.json && yarn package",
      "build:min.js": "webpack",
      version: "yarn build"
    };
    gitHead2 = "cc999e430ebfb1dd821783f7cf099ddd51f3495a";
    package_default2 = {
      name: name2,
      version: version2,
      files: files2,
      type: type2,
      main: main2,
      module: module2,
      types: types2,
      license: license2,
      publishConfig: publishConfig2,
      dependencies: dependencies2,
      peerDependencies,
      devDependencies: devDependencies2,
      scripts: scripts2,
      gitHead: gitHead2
    };
  }
});
function getVersion2() {
  const packages = (init_package2(), __toCommonJS2(package_exports2));
  return `web_${packages.version}`;
}
var SolanaWallet = class {
  constructor(auth) {
    this.auth = auth;
    this.isParticleNetwork = true;
    this.name = "Particle";
    this.url = "https://particle.network";
    this.icon = "https://static.particle.network/wallet-icons/Particle.png";
    this.events = new import_events2.EventEmitter();
    this.auth = auth;
    this._connecting = false;
    const userInfo = this.auth.getUserInfo();
    if (userInfo) {
      const wallet = userInfo.wallets.find((w) => w.chain_name === "solana" && w.public_address.length > 0);
      if (wallet) {
        this._publicKey = new PublicKey(wallet.public_address);
      } else {
        this._publicKey = null;
      }
    } else {
      this._publicKey = null;
    }
    this.auth.on("connect", (userInfo2) => {
      const wallet = userInfo2.wallets.find((w) => w.chain_name === "solana" && w.public_address.length > 0);
      if (wallet) {
        this._publicKey = new PublicKey(wallet.public_address);
        this.events.emit("connect", this._publicKey);
      }
    });
    this.auth.on("disconnect", () => {
      this._publicKey = null;
      this.events.emit("disconnect");
    });
    if (typeof window !== "undefined" && window.particle) {
      window.particle.solanaWallet = this;
    }
  }
  get version() {
    return getVersion2();
  }
  on(event, listener) {
    this.events.on(event, listener);
  }
  once(event, listener) {
    this.events.once(event, listener);
  }
  off(event, listener) {
    this.events.off(event, listener);
  }
  removeListener(event, listener) {
    this.events.removeListener(event, listener);
  }
  get connecting() {
    return this._connecting;
  }
  get connected() {
    return this._publicKey !== null;
  }
  get publicKey() {
    return this._publicKey;
  }
  connect(config) {
    return __async2(this, null, function* () {
      try {
        this._connecting = true;
        let wallet = this.auth.getWallet();
        if (wallet) {
          this._publicKey = new PublicKey(wallet.public_address);
          return Promise.resolve();
        }
        yield this.auth.login(config);
        wallet = this.auth.getWallet();
        if (wallet) {
          this._publicKey = new PublicKey(wallet.public_address);
          return Promise.resolve();
        } else {
          return Promise.reject("wallet create failed");
        }
      } catch (e) {
        return Promise.reject(e);
      } finally {
        this._connecting = false;
      }
    });
  }
  disconnect() {
    return __async2(this, null, function* () {
      yield this.auth.logout();
      this._publicKey = null;
      return Promise.resolve();
    });
  }
  signTransaction(transaction) {
    return __async2(this, null, function* () {
      const signature = yield this.auth.sign(
        "signTransaction",
        import_bs58.default.encode(transaction.serialize({ requireAllSignatures: false, verifySignatures: false }))
      );
      return Transaction.from(import_buffer6.Buffer.from(signature, "base64"));
    });
  }
  signAllTransactions(transactions) {
    return __async2(this, null, function* () {
      const signatures = yield this.auth.signAllTransactions(
        transactions.map(
          (tx) => import_bs58.default.encode(tx.serialize({ requireAllSignatures: false, verifySignatures: false }))
        )
      );
      return signatures.map((signed) => Transaction.from(import_buffer6.Buffer.from(signed, "base64")));
    });
  }
  signAndSendTransaction(transaction) {
    return __async2(this, null, function* () {
      return this.auth.sendTransaction(
        import_bs58.default.encode(transaction.serialize({ requireAllSignatures: false, verifySignatures: false }))
      );
    });
  }
  signMessage(message) {
    return __async2(this, null, function* () {
      const signature = yield this.auth.sign("signMessage", import_bs58.default.encode(message));
      return import_buffer6.Buffer.from(signature, "base64");
    });
  }
  getConnection(config) {
    const url = `${rpcUrl()}/solana`;
    return new Connection(
      `${url}?chainId=${this.auth.getChainId()}&projectUuid=${this.auth.config.projectId}&projectKey=${this.auth.config.clientKey}`,
      {
        commitment: config == null ? void 0 : config.commitment,
        wsEndpoint: config == null ? void 0 : config.wsEndpoint,
        httpHeaders: {
          Authorization: this.auth.basicCredentials()
        },
        fetch: config == null ? void 0 : config.fetch,
        fetchMiddleware: config == null ? void 0 : config.fetchMiddleware,
        disableRetryOnRateLimit: config == null ? void 0 : config.disableRetryOnRateLimit,
        confirmTransactionInitialTimeout: config == null ? void 0 : config.confirmTransactionInitialTimeout
      }
    );
  }
};
export {
  ParticleNetwork,
  SolanaWallet
};
/*! Bundled license information:

crypto-js/ripemd160.js:
  (** @preserve
  	(c) 2012 by Cédric Mesnil. All rights reserved.
  
  	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  
  	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  
  	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  	*)

crypto-js/mode-ctr-gladman.js:
  (** @preserve
   * Counter block mode compatible with  Dr Brian Gladman fileenc.c
   * derived from CryptoJS.mode.CTR
   * Jan Hruby jhruby.web@gmail.com
   *)
*/
//# sourceMappingURL=es-UXOOWXU2.js.map

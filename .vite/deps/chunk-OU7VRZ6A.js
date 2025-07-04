import {
  require_dijkstra
} from "./chunk-NPFSRFYW.js";
import {
  require_react
} from "./chunk-HZQOY4LB.js";
import {
  ReadonlyWalletAccount,
  SOLANA_MAINNET_CHAIN,
  arraysEqual,
  bytesEqual,
  createSignInMessageText,
  getChainForEndpoint,
  getCommitment
} from "./chunk-TPI7CCOE.js";
import {
  Connection,
  PublicKey,
  SIGNATURE_LENGTH_IN_BYTES,
  Transaction,
  VersionedMessage,
  VersionedTransaction,
  init_index_browser_esm
} from "./chunk-5NC5FW7O.js";
import {
  BaseSignInMessageSignerWalletAdapter,
  BaseWalletAdapter,
  StandardConnect,
  StandardDisconnect,
  StandardEvents,
  WalletAccountError,
  WalletConfigError,
  WalletConnectionError,
  WalletDisconnectedError,
  WalletDisconnectionError,
  WalletError,
  WalletNotConnectedError,
  WalletNotReadyError,
  WalletPublicKeyError,
  WalletReadyState,
  WalletSendTransactionError,
  WalletSignInError,
  WalletSignMessageError,
  WalletSignTransactionError,
  isVersionedTransaction,
  isWalletAdapterCompatibleStandardWallet
} from "./chunk-FCW3QQ5O.js";
import {
  SolanaSignAndSendTransaction,
  SolanaSignIn,
  SolanaSignMessage,
  SolanaSignTransaction
} from "./chunk-5JTSV3KR.js";
import {
  __commonJS,
  __toESM
} from "./chunk-MVEJMUOB.js";

// node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode2(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/node_modules/base-x/src/index.js
var require_src = __commonJS({
  "node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/node_modules/base-x/src/index.js"(exports, module) {
    "use strict";
    function base2(ALPHABET2) {
      if (ALPHABET2.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET2.length; i++) {
        var x = ALPHABET2.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET2.length;
      var LEADER = ALPHABET2.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode2(source) {
        if (source instanceof Uint8Array) {
        } else if (ArrayBuffer.isView(source)) {
          source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
          source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
          throw new TypeError("Expected Uint8Array");
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
          str += ALPHABET2.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return new Uint8Array();
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
        while (source[psz]) {
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
        var vch = new Uint8Array(zeroes + (size - it4));
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode(string) {
        var buffer = decodeUnsafe(string);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode: encode2,
        decodeUnsafe,
        decode
      };
    }
    module.exports = base2;
  }
});

// node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/node_modules/bs58/index.js
var require_bs58 = __commonJS({
  "node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/node_modules/bs58/index.js"(exports, module) {
    var basex = require_src();
    var ALPHABET2 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET2);
  }
});

// node_modules/@solana-mobile/wallet-standard-mobile/node_modules/base-x/src/index.js
var require_src2 = __commonJS({
  "node_modules/@solana-mobile/wallet-standard-mobile/node_modules/base-x/src/index.js"(exports, module) {
    "use strict";
    function base2(ALPHABET2) {
      if (ALPHABET2.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET2.length; i++) {
        var x = ALPHABET2.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET2.length;
      var LEADER = ALPHABET2.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode2(source) {
        if (source instanceof Uint8Array) {
        } else if (ArrayBuffer.isView(source)) {
          source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
          source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
          throw new TypeError("Expected Uint8Array");
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
          str += ALPHABET2.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return new Uint8Array();
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
        while (source[psz]) {
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
        var vch = new Uint8Array(zeroes + (size - it4));
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode(string) {
        var buffer = decodeUnsafe(string);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode: encode2,
        decodeUnsafe,
        decode
      };
    }
    module.exports = base2;
  }
});

// node_modules/@solana-mobile/wallet-standard-mobile/node_modules/bs58/index.js
var require_bs582 = __commonJS({
  "node_modules/@solana-mobile/wallet-standard-mobile/node_modules/bs58/index.js"(exports, module) {
    var basex = require_src2();
    var ALPHABET2 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET2);
  }
});

// node_modules/@solana/wallet-adapter-react/lib/esm/ConnectionProvider.js
init_index_browser_esm();
var import_react2 = __toESM(require_react(), 1);

// node_modules/@solana/wallet-adapter-react/lib/esm/useConnection.js
var import_react = __toESM(require_react(), 1);
var ConnectionContext = (0, import_react.createContext)({});
function useConnection() {
  return (0, import_react.useContext)(ConnectionContext);
}

// node_modules/@solana/wallet-adapter-react/lib/esm/ConnectionProvider.js
var ConnectionProvider = ({ children, endpoint, config = { commitment: "confirmed" } }) => {
  const connection = (0, import_react2.useMemo)(() => new Connection(endpoint, config), [endpoint, config]);
  return import_react2.default.createElement(ConnectionContext.Provider, { value: { connection } }, children);
};

// node_modules/@solana/wallet-adapter-react/lib/esm/errors.js
var WalletNotSelectedError = class extends WalletError {
  constructor() {
    super(...arguments);
    this.name = "WalletNotSelectedError";
  }
};

// node_modules/@solana/wallet-adapter-react/lib/esm/useAnchorWallet.js
var import_react4 = __toESM(require_react(), 1);

// node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js
var import_react3 = __toESM(require_react(), 1);
var EMPTY_ARRAY = [];
var DEFAULT_CONTEXT = {
  autoConnect: false,
  connecting: false,
  connected: false,
  disconnecting: false,
  select() {
    logMissingProviderError("call", "select");
  },
  connect() {
    return Promise.reject(logMissingProviderError("call", "connect"));
  },
  disconnect() {
    return Promise.reject(logMissingProviderError("call", "disconnect"));
  },
  sendTransaction() {
    return Promise.reject(logMissingProviderError("call", "sendTransaction"));
  },
  signTransaction() {
    return Promise.reject(logMissingProviderError("call", "signTransaction"));
  },
  signAllTransactions() {
    return Promise.reject(logMissingProviderError("call", "signAllTransactions"));
  },
  signMessage() {
    return Promise.reject(logMissingProviderError("call", "signMessage"));
  },
  signIn() {
    return Promise.reject(logMissingProviderError("call", "signIn"));
  }
};
Object.defineProperty(DEFAULT_CONTEXT, "wallets", {
  get() {
    logMissingProviderError("read", "wallets");
    return EMPTY_ARRAY;
  }
});
Object.defineProperty(DEFAULT_CONTEXT, "wallet", {
  get() {
    logMissingProviderError("read", "wallet");
    return null;
  }
});
Object.defineProperty(DEFAULT_CONTEXT, "publicKey", {
  get() {
    logMissingProviderError("read", "publicKey");
    return null;
  }
});
function logMissingProviderError(action, property) {
  const error = new Error(`You have tried to ${action} "${property}" on a WalletContext without providing one. Make sure to render a WalletProvider as an ancestor of the component that uses WalletContext.`);
  console.error(error);
  return error;
}
var WalletContext = (0, import_react3.createContext)(DEFAULT_CONTEXT);
function useWallet() {
  return (0, import_react3.useContext)(WalletContext);
}

// node_modules/@solana/wallet-adapter-react/lib/esm/useAnchorWallet.js
function useAnchorWallet() {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  return (0, import_react4.useMemo)(() => publicKey && signTransaction && signAllTransactions ? { publicKey, signTransaction, signAllTransactions } : void 0, [publicKey, signTransaction, signAllTransactions]);
}

// node_modules/@solana/wallet-adapter-react/lib/esm/useLocalStorage.js
var import_react5 = __toESM(require_react(), 1);
function useLocalStorage(key, defaultState) {
  const state = (0, import_react5.useState)(() => {
    try {
      const value2 = localStorage.getItem(key);
      if (value2)
        return JSON.parse(value2);
    } catch (error) {
      if (typeof window !== "undefined") {
        console.error(error);
      }
    }
    return defaultState;
  });
  const value = state[0];
  const isFirstRenderRef = (0, import_react5.useRef)(true);
  (0, import_react5.useEffect)(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        console.error(error);
      }
    }
  }, [value, key]);
  return state;
}

// node_modules/@solana-mobile/wallet-adapter-mobile/lib/esm/index.browser.js
init_index_browser_esm();

// node_modules/@solana-mobile/wallet-standard-mobile/lib/esm/index.browser.js
init_index_browser_esm();
var import_qrcode = __toESM(require_browser());

// node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/lib/esm/index.browser.js
init_index_browser_esm();

// node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/node_modules/@solana-mobile/mobile-wallet-adapter-protocol/lib/esm/index.browser.js
var SolanaMobileWalletAdapterErrorCode = {
  ERROR_ASSOCIATION_PORT_OUT_OF_RANGE: "ERROR_ASSOCIATION_PORT_OUT_OF_RANGE",
  ERROR_REFLECTOR_ID_OUT_OF_RANGE: "ERROR_REFLECTOR_ID_OUT_OF_RANGE",
  ERROR_FORBIDDEN_WALLET_BASE_URL: "ERROR_FORBIDDEN_WALLET_BASE_URL",
  ERROR_SECURE_CONTEXT_REQUIRED: "ERROR_SECURE_CONTEXT_REQUIRED",
  ERROR_SESSION_CLOSED: "ERROR_SESSION_CLOSED",
  ERROR_SESSION_TIMEOUT: "ERROR_SESSION_TIMEOUT",
  ERROR_WALLET_NOT_FOUND: "ERROR_WALLET_NOT_FOUND",
  ERROR_INVALID_PROTOCOL_VERSION: "ERROR_INVALID_PROTOCOL_VERSION",
  ERROR_BROWSER_NOT_SUPPORTED: "ERROR_BROWSER_NOT_SUPPORTED"
};
var SolanaMobileWalletAdapterError = class extends Error {
  constructor(...args) {
    const [code, message, data] = args;
    super(message);
    this.code = code;
    this.data = data;
    this.name = "SolanaMobileWalletAdapterError";
  }
};
var SolanaMobileWalletAdapterProtocolError = class extends Error {
  constructor(...args) {
    const [jsonRpcMessageId, code, message, data] = args;
    super(message);
    this.code = code;
    this.data = data;
    this.jsonRpcMessageId = jsonRpcMessageId;
    this.name = "SolanaMobileWalletAdapterProtocolError";
  }
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function encode(input) {
  return window.btoa(input);
}
function createHelloReq(ecdhPublicKey, associationKeypairPrivateKey) {
  return __awaiter(this, void 0, void 0, function* () {
    const publicKeyBuffer = yield crypto.subtle.exportKey("raw", ecdhPublicKey);
    const signatureBuffer = yield crypto.subtle.sign({ hash: "SHA-256", name: "ECDSA" }, associationKeypairPrivateKey, publicKeyBuffer);
    const response = new Uint8Array(publicKeyBuffer.byteLength + signatureBuffer.byteLength);
    response.set(new Uint8Array(publicKeyBuffer), 0);
    response.set(new Uint8Array(signatureBuffer), publicKeyBuffer.byteLength);
    return response;
  });
}
function createSIWSMessage(payload) {
  return createSignInMessageText(payload);
}
function createSIWSMessageBase64(payload) {
  return encode(createSIWSMessage(payload));
}
var SolanaSignTransactions = "solana:signTransactions";
var SolanaCloneAuthorization = "solana:cloneAuthorization";
function createMobileWalletProxy(protocolVersion, protocolRequestHandler) {
  return new Proxy({}, {
    get(target, p) {
      if (p === "then") {
        return null;
      }
      if (target[p] == null) {
        target[p] = function(inputParams) {
          return __awaiter(this, void 0, void 0, function* () {
            const { method, params } = handleMobileWalletRequest(p, inputParams, protocolVersion);
            const result = yield protocolRequestHandler(method, params);
            if (method === "authorize" && params.sign_in_payload && !result.sign_in_result) {
              result["sign_in_result"] = yield signInFallback(params.sign_in_payload, result, protocolRequestHandler);
            }
            return handleMobileWalletResponse(p, result, protocolVersion);
          });
        };
      }
      return target[p];
    },
    defineProperty() {
      return false;
    },
    deleteProperty() {
      return false;
    }
  });
}
function handleMobileWalletRequest(methodName, methodParams, protocolVersion) {
  let params = methodParams;
  let method = methodName.toString().replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).toLowerCase();
  switch (methodName) {
    case "authorize": {
      let { chain } = params;
      if (protocolVersion === "legacy") {
        switch (chain) {
          case "solana:testnet": {
            chain = "testnet";
            break;
          }
          case "solana:devnet": {
            chain = "devnet";
            break;
          }
          case "solana:mainnet": {
            chain = "mainnet-beta";
            break;
          }
          default: {
            chain = params.cluster;
          }
        }
        params.cluster = chain;
      } else {
        switch (chain) {
          case "testnet":
          case "devnet": {
            chain = `solana:${chain}`;
            break;
          }
          case "mainnet-beta": {
            chain = "solana:mainnet";
            break;
          }
        }
        params.chain = chain;
      }
    }
    case "reauthorize": {
      const { auth_token, identity } = params;
      if (auth_token) {
        switch (protocolVersion) {
          case "legacy": {
            method = "reauthorize";
            params = { auth_token, identity };
            break;
          }
          default: {
            method = "authorize";
            break;
          }
        }
      }
      break;
    }
  }
  return { method, params };
}
function handleMobileWalletResponse(method, response, protocolVersion) {
  switch (method) {
    case "getCapabilities": {
      const capabilities = response;
      switch (protocolVersion) {
        case "legacy": {
          const features = [SolanaSignTransactions];
          if (capabilities.supports_clone_authorization === true) {
            features.push(SolanaCloneAuthorization);
          }
          return Object.assign(Object.assign({}, capabilities), { features });
        }
        case "v1": {
          return Object.assign(Object.assign({}, capabilities), { supports_sign_and_send_transactions: true, supports_clone_authorization: capabilities.features.includes(SolanaCloneAuthorization) });
        }
      }
    }
  }
  return response;
}
function signInFallback(signInPayload, authorizationResult, protocolRequestHandler) {
  var _a;
  return __awaiter(this, void 0, void 0, function* () {
    const domain = (_a = signInPayload.domain) !== null && _a !== void 0 ? _a : window.location.host;
    const address = authorizationResult.accounts[0].address;
    const siwsMessage = createSIWSMessageBase64(Object.assign(Object.assign({}, signInPayload), { domain, address }));
    const signMessageResult = yield protocolRequestHandler("sign_messages", {
      addresses: [address],
      payloads: [siwsMessage]
    });
    const signInResult = {
      address,
      signed_message: siwsMessage,
      signature: signMessageResult.signed_payloads[0].slice(siwsMessage.length)
    };
    return signInResult;
  });
}
var SEQUENCE_NUMBER_BYTES = 4;
function createSequenceNumberVector(sequenceNumber) {
  if (sequenceNumber >= 4294967296) {
    throw new Error("Outbound sequence number overflow. The maximum sequence number is 32-bytes.");
  }
  const byteArray = new ArrayBuffer(SEQUENCE_NUMBER_BYTES);
  const view = new DataView(byteArray);
  view.setUint32(
    0,
    sequenceNumber,
    /* littleEndian */
    false
  );
  return new Uint8Array(byteArray);
}
var INITIALIZATION_VECTOR_BYTES = 12;
var ENCODED_PUBLIC_KEY_LENGTH_BYTES = 65;
function encryptMessage(plaintext, sequenceNumber, sharedSecret) {
  return __awaiter(this, void 0, void 0, function* () {
    const sequenceNumberVector = createSequenceNumberVector(sequenceNumber);
    const initializationVector = new Uint8Array(INITIALIZATION_VECTOR_BYTES);
    crypto.getRandomValues(initializationVector);
    const ciphertext = yield crypto.subtle.encrypt(getAlgorithmParams(sequenceNumberVector, initializationVector), sharedSecret, new TextEncoder().encode(plaintext));
    const response = new Uint8Array(sequenceNumberVector.byteLength + initializationVector.byteLength + ciphertext.byteLength);
    response.set(new Uint8Array(sequenceNumberVector), 0);
    response.set(new Uint8Array(initializationVector), sequenceNumberVector.byteLength);
    response.set(new Uint8Array(ciphertext), sequenceNumberVector.byteLength + initializationVector.byteLength);
    return response;
  });
}
function decryptMessage(message, sharedSecret) {
  return __awaiter(this, void 0, void 0, function* () {
    const sequenceNumberVector = message.slice(0, SEQUENCE_NUMBER_BYTES);
    const initializationVector = message.slice(SEQUENCE_NUMBER_BYTES, SEQUENCE_NUMBER_BYTES + INITIALIZATION_VECTOR_BYTES);
    const ciphertext = message.slice(SEQUENCE_NUMBER_BYTES + INITIALIZATION_VECTOR_BYTES);
    const plaintextBuffer = yield crypto.subtle.decrypt(getAlgorithmParams(sequenceNumberVector, initializationVector), sharedSecret, ciphertext);
    const plaintext = getUtf8Decoder().decode(plaintextBuffer);
    return plaintext;
  });
}
function getAlgorithmParams(sequenceNumber, initializationVector) {
  return {
    additionalData: sequenceNumber,
    iv: initializationVector,
    name: "AES-GCM",
    tagLength: 128
    // 16 byte tag => 128 bits
  };
}
var _utf8Decoder;
function getUtf8Decoder() {
  if (_utf8Decoder === void 0) {
    _utf8Decoder = new TextDecoder("utf-8");
  }
  return _utf8Decoder;
}
function generateAssociationKeypair() {
  return __awaiter(this, void 0, void 0, function* () {
    return yield crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-256"
      },
      false,
      ["sign"]
      /* keyUsages */
    );
  });
}
function generateECDHKeypair() {
  return __awaiter(this, void 0, void 0, function* () {
    return yield crypto.subtle.generateKey(
      {
        name: "ECDH",
        namedCurve: "P-256"
      },
      false,
      ["deriveKey", "deriveBits"]
      /* keyUsages */
    );
  });
}
function arrayBufferToBase64String(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let ii = 0; ii < len; ii++) {
    binary += String.fromCharCode(bytes[ii]);
  }
  return window.btoa(binary);
}
function getRandomAssociationPort() {
  return assertAssociationPort(49152 + Math.floor(Math.random() * (65535 - 49152 + 1)));
}
function assertAssociationPort(port) {
  if (port < 49152 || port > 65535) {
    throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_ASSOCIATION_PORT_OUT_OF_RANGE, `Association port number must be between 49152 and 65535. ${port} given.`, { port });
  }
  return port;
}
function getStringWithURLUnsafeCharactersReplaced(unsafeBase64EncodedString) {
  return unsafeBase64EncodedString.replace(/[/+=]/g, (m) => ({
    "/": "_",
    "+": "-",
    "=": "."
  })[m]);
}
var INTENT_NAME = "solana-wallet";
function getPathParts(pathString) {
  return pathString.replace(/(^\/+|\/+$)/g, "").split("/");
}
function getIntentURL(methodPathname, intentUrlBase) {
  let baseUrl = null;
  if (intentUrlBase) {
    try {
      baseUrl = new URL(intentUrlBase);
    } catch (_a) {
    }
    if ((baseUrl === null || baseUrl === void 0 ? void 0 : baseUrl.protocol) !== "https:") {
      throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_FORBIDDEN_WALLET_BASE_URL, "Base URLs supplied by wallets must be valid `https` URLs");
    }
  }
  baseUrl || (baseUrl = new URL(`${INTENT_NAME}:/`));
  const pathname = methodPathname.startsWith("/") ? (
    // Method is an absolute path. Replace it wholesale.
    methodPathname
  ) : (
    // Method is a relative path. Merge it with the existing one.
    [...getPathParts(baseUrl.pathname), ...getPathParts(methodPathname)].join("/")
  );
  return new URL(pathname, baseUrl);
}
function getAssociateAndroidIntentURL(associationPublicKey, putativePort, associationURLBase, protocolVersions = ["v1"]) {
  return __awaiter(this, void 0, void 0, function* () {
    const associationPort = assertAssociationPort(putativePort);
    const exportedKey = yield crypto.subtle.exportKey("raw", associationPublicKey);
    const encodedKey = arrayBufferToBase64String(exportedKey);
    const url = getIntentURL("v1/associate/local", associationURLBase);
    url.searchParams.set("association", getStringWithURLUnsafeCharactersReplaced(encodedKey));
    url.searchParams.set("port", `${associationPort}`);
    protocolVersions.forEach((version) => {
      url.searchParams.set("v", version);
    });
    return url;
  });
}
function encryptJsonRpcMessage(jsonRpcMessage, sharedSecret) {
  return __awaiter(this, void 0, void 0, function* () {
    const plaintext = JSON.stringify(jsonRpcMessage);
    const sequenceNumber = jsonRpcMessage.id;
    return encryptMessage(plaintext, sequenceNumber, sharedSecret);
  });
}
function decryptJsonRpcMessage(message, sharedSecret) {
  return __awaiter(this, void 0, void 0, function* () {
    const plaintext = yield decryptMessage(message, sharedSecret);
    const jsonRpcMessage = JSON.parse(plaintext);
    if (Object.hasOwnProperty.call(jsonRpcMessage, "error")) {
      throw new SolanaMobileWalletAdapterProtocolError(jsonRpcMessage.id, jsonRpcMessage.error.code, jsonRpcMessage.error.message);
    }
    return jsonRpcMessage;
  });
}
function parseHelloRsp(payloadBuffer, associationPublicKey, ecdhPrivateKey) {
  return __awaiter(this, void 0, void 0, function* () {
    const [associationPublicKeyBuffer, walletPublicKey] = yield Promise.all([
      crypto.subtle.exportKey("raw", associationPublicKey),
      crypto.subtle.importKey(
        "raw",
        payloadBuffer.slice(0, ENCODED_PUBLIC_KEY_LENGTH_BYTES),
        { name: "ECDH", namedCurve: "P-256" },
        false,
        []
        /* keyUsages */
      )
    ]);
    const sharedSecret = yield crypto.subtle.deriveBits({ name: "ECDH", public: walletPublicKey }, ecdhPrivateKey, 256);
    const ecdhSecretKey = yield crypto.subtle.importKey(
      "raw",
      sharedSecret,
      "HKDF",
      false,
      ["deriveKey"]
      /* keyUsages */
    );
    const aesKeyMaterialVal = yield crypto.subtle.deriveKey({
      name: "HKDF",
      hash: "SHA-256",
      salt: new Uint8Array(associationPublicKeyBuffer),
      info: new Uint8Array()
    }, ecdhSecretKey, { name: "AES-GCM", length: 128 }, false, ["encrypt", "decrypt"]);
    return aesKeyMaterialVal;
  });
}
function parseSessionProps(message, sharedSecret) {
  return __awaiter(this, void 0, void 0, function* () {
    const plaintext = yield decryptMessage(message, sharedSecret);
    const jsonProperties = JSON.parse(plaintext);
    let protocolVersion = "legacy";
    if (Object.hasOwnProperty.call(jsonProperties, "v")) {
      switch (jsonProperties.v) {
        case 1:
        case "1":
        case "v1":
          protocolVersion = "v1";
          break;
        case "legacy":
          protocolVersion = "legacy";
          break;
        default:
          throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_INVALID_PROTOCOL_VERSION, `Unknown/unsupported protocol version: ${jsonProperties.v}`);
      }
    }
    return {
      protocol_version: protocolVersion
    };
  });
}
var Browser = {
  Firefox: 0,
  Other: 1
};
function assertUnreachable(x) {
  return x;
}
function getBrowser() {
  return navigator.userAgent.indexOf("Firefox/") !== -1 ? Browser.Firefox : Browser.Other;
}
function getDetectionPromise() {
  return new Promise((resolve, reject) => {
    function cleanup() {
      clearTimeout(timeoutId);
      window.removeEventListener("blur", handleBlur);
    }
    function handleBlur() {
      cleanup();
      resolve();
    }
    window.addEventListener("blur", handleBlur);
    const timeoutId = setTimeout(() => {
      cleanup();
      reject();
    }, 3e3);
  });
}
var _frame = null;
function launchUrlThroughHiddenFrame(url) {
  if (_frame == null) {
    _frame = document.createElement("iframe");
    _frame.style.display = "none";
    document.body.appendChild(_frame);
  }
  _frame.contentWindow.location.href = url.toString();
}
function launchAssociation(associationUrl) {
  return __awaiter(this, void 0, void 0, function* () {
    if (associationUrl.protocol === "https:") {
      window.location.assign(associationUrl);
    } else {
      try {
        const browser = getBrowser();
        switch (browser) {
          case Browser.Firefox:
            launchUrlThroughHiddenFrame(associationUrl);
            break;
          case Browser.Other: {
            const detectionPromise = getDetectionPromise();
            window.location.assign(associationUrl);
            yield detectionPromise;
            break;
          }
          default:
            assertUnreachable(browser);
        }
      } catch (e) {
        throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_WALLET_NOT_FOUND, "Found no installed wallet that supports the mobile wallet protocol.");
      }
    }
  });
}
function startSession(associationPublicKey, associationURLBase) {
  return __awaiter(this, void 0, void 0, function* () {
    const randomAssociationPort = getRandomAssociationPort();
    const associationUrl = yield getAssociateAndroidIntentURL(associationPublicKey, randomAssociationPort, associationURLBase);
    yield launchAssociation(associationUrl);
    return randomAssociationPort;
  });
}
var WEBSOCKET_CONNECTION_CONFIG = {
  /**
   * 300 milliseconds is a generally accepted threshold for what someone
   * would consider an acceptable response time for a user interface
   * after having performed a low-attention tapping task. We set the initial
   * interval at which we wait for the wallet to set up the websocket at
   * half this, as per the Nyquist frequency, with a progressive backoff
   * sequence from there. The total wait time is 30s, which allows for the
   * user to be presented with a disambiguation dialog, select a wallet, and
   * for the wallet app to subsequently start.
   */
  retryDelayScheduleMs: [150, 150, 200, 500, 500, 750, 750, 1e3],
  timeoutMs: 3e4
};
var WEBSOCKET_PROTOCOL_BINARY = "com.solana.mobilewalletadapter.v1";
function assertSecureContext() {
  if (typeof window === "undefined" || window.isSecureContext !== true) {
    throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_SECURE_CONTEXT_REQUIRED, "The mobile wallet adapter protocol must be used in a secure context (`https`).");
  }
}
function assertSecureEndpointSpecificURI(walletUriBase) {
  let url;
  try {
    url = new URL(walletUriBase);
  } catch (_a) {
    throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_FORBIDDEN_WALLET_BASE_URL, "Invalid base URL supplied by wallet");
  }
  if (url.protocol !== "https:") {
    throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_FORBIDDEN_WALLET_BASE_URL, "Base URLs supplied by wallets must be valid `https` URLs");
  }
}
function getSequenceNumberFromByteArray(byteArray) {
  const view = new DataView(byteArray);
  return view.getUint32(
    0,
    /* littleEndian */
    false
  );
}
function transact(callback, config) {
  return __awaiter(this, void 0, void 0, function* () {
    assertSecureContext();
    const associationKeypair = yield generateAssociationKeypair();
    const sessionPort = yield startSession(associationKeypair.publicKey, config === null || config === void 0 ? void 0 : config.baseUri);
    const websocketURL = `ws://localhost:${sessionPort}/solana-wallet`;
    let connectionStartTime;
    const getNextRetryDelayMs = (() => {
      const schedule = [...WEBSOCKET_CONNECTION_CONFIG.retryDelayScheduleMs];
      return () => schedule.length > 1 ? schedule.shift() : schedule[0];
    })();
    let nextJsonRpcMessageId = 1;
    let lastKnownInboundSequenceNumber = 0;
    let state = { __type: "disconnected" };
    return new Promise((resolve, reject) => {
      let socket;
      const jsonRpcResponsePromises = {};
      const handleOpen = () => __awaiter(this, void 0, void 0, function* () {
        if (state.__type !== "connecting") {
          console.warn(`Expected adapter state to be \`connecting\` at the moment the websocket opens. Got \`${state.__type}\`.`);
          return;
        }
        socket.removeEventListener("open", handleOpen);
        const { associationKeypair: associationKeypair2 } = state;
        const ecdhKeypair = yield generateECDHKeypair();
        socket.send(yield createHelloReq(ecdhKeypair.publicKey, associationKeypair2.privateKey));
        state = {
          __type: "hello_req_sent",
          associationPublicKey: associationKeypair2.publicKey,
          ecdhPrivateKey: ecdhKeypair.privateKey
        };
      });
      const handleClose = (evt) => {
        if (evt.wasClean) {
          state = { __type: "disconnected" };
        } else {
          reject(new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_SESSION_CLOSED, `The wallet session dropped unexpectedly (${evt.code}: ${evt.reason}).`, { closeEvent: evt }));
        }
        disposeSocket();
      };
      const handleError = (_evt) => __awaiter(this, void 0, void 0, function* () {
        disposeSocket();
        if (Date.now() - connectionStartTime >= WEBSOCKET_CONNECTION_CONFIG.timeoutMs) {
          reject(new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_SESSION_TIMEOUT, `Failed to connect to the wallet websocket at ${websocketURL}.`));
        } else {
          yield new Promise((resolve2) => {
            const retryDelayMs = getNextRetryDelayMs();
            retryWaitTimeoutId = window.setTimeout(resolve2, retryDelayMs);
          });
          attemptSocketConnection();
        }
      });
      const handleMessage = (evt) => __awaiter(this, void 0, void 0, function* () {
        const responseBuffer = yield evt.data.arrayBuffer();
        switch (state.__type) {
          case "connecting":
            if (responseBuffer.byteLength !== 0) {
              throw new Error("Encountered unexpected message while connecting");
            }
            const ecdhKeypair = yield generateECDHKeypair();
            socket.send(yield createHelloReq(ecdhKeypair.publicKey, associationKeypair.privateKey));
            state = {
              __type: "hello_req_sent",
              associationPublicKey: associationKeypair.publicKey,
              ecdhPrivateKey: ecdhKeypair.privateKey
            };
            break;
          case "connected":
            try {
              const sequenceNumberVector = responseBuffer.slice(0, SEQUENCE_NUMBER_BYTES);
              const sequenceNumber = getSequenceNumberFromByteArray(sequenceNumberVector);
              if (sequenceNumber !== lastKnownInboundSequenceNumber + 1) {
                throw new Error("Encrypted message has invalid sequence number");
              }
              lastKnownInboundSequenceNumber = sequenceNumber;
              const jsonRpcMessage = yield decryptJsonRpcMessage(responseBuffer, state.sharedSecret);
              const responsePromise = jsonRpcResponsePromises[jsonRpcMessage.id];
              delete jsonRpcResponsePromises[jsonRpcMessage.id];
              responsePromise.resolve(jsonRpcMessage.result);
            } catch (e) {
              if (e instanceof SolanaMobileWalletAdapterProtocolError) {
                const responsePromise = jsonRpcResponsePromises[e.jsonRpcMessageId];
                delete jsonRpcResponsePromises[e.jsonRpcMessageId];
                responsePromise.reject(e);
              } else {
                throw e;
              }
            }
            break;
          case "hello_req_sent": {
            if (responseBuffer.byteLength === 0) {
              const ecdhKeypair2 = yield generateECDHKeypair();
              socket.send(yield createHelloReq(ecdhKeypair2.publicKey, associationKeypair.privateKey));
              state = {
                __type: "hello_req_sent",
                associationPublicKey: associationKeypair.publicKey,
                ecdhPrivateKey: ecdhKeypair2.privateKey
              };
              break;
            }
            const sharedSecret = yield parseHelloRsp(responseBuffer, state.associationPublicKey, state.ecdhPrivateKey);
            const sessionPropertiesBuffer = responseBuffer.slice(ENCODED_PUBLIC_KEY_LENGTH_BYTES);
            const sessionProperties = sessionPropertiesBuffer.byteLength !== 0 ? yield (() => __awaiter(this, void 0, void 0, function* () {
              const sequenceNumberVector = sessionPropertiesBuffer.slice(0, SEQUENCE_NUMBER_BYTES);
              const sequenceNumber = getSequenceNumberFromByteArray(sequenceNumberVector);
              if (sequenceNumber !== lastKnownInboundSequenceNumber + 1) {
                throw new Error("Encrypted message has invalid sequence number");
              }
              lastKnownInboundSequenceNumber = sequenceNumber;
              return parseSessionProps(sessionPropertiesBuffer, sharedSecret);
            }))() : { protocol_version: "legacy" };
            state = { __type: "connected", sharedSecret, sessionProperties };
            const wallet = createMobileWalletProxy(sessionProperties.protocol_version, (method, params) => __awaiter(this, void 0, void 0, function* () {
              const id = nextJsonRpcMessageId++;
              socket.send(yield encryptJsonRpcMessage({
                id,
                jsonrpc: "2.0",
                method,
                params: params !== null && params !== void 0 ? params : {}
              }, sharedSecret));
              return new Promise((resolve2, reject2) => {
                jsonRpcResponsePromises[id] = {
                  resolve(result) {
                    switch (method) {
                      case "authorize":
                      case "reauthorize": {
                        const { wallet_uri_base } = result;
                        if (wallet_uri_base != null) {
                          try {
                            assertSecureEndpointSpecificURI(wallet_uri_base);
                          } catch (e) {
                            reject2(e);
                            return;
                          }
                        }
                        break;
                      }
                    }
                    resolve2(result);
                  },
                  reject: reject2
                };
              });
            }));
            try {
              resolve(yield callback(wallet));
            } catch (e) {
              reject(e);
            } finally {
              disposeSocket();
              socket.close();
            }
            break;
          }
        }
      });
      let disposeSocket;
      let retryWaitTimeoutId;
      const attemptSocketConnection = () => {
        if (disposeSocket) {
          disposeSocket();
        }
        state = { __type: "connecting", associationKeypair };
        if (connectionStartTime === void 0) {
          connectionStartTime = Date.now();
        }
        socket = new WebSocket(websocketURL, [WEBSOCKET_PROTOCOL_BINARY]);
        socket.addEventListener("open", handleOpen);
        socket.addEventListener("close", handleClose);
        socket.addEventListener("error", handleError);
        socket.addEventListener("message", handleMessage);
        disposeSocket = () => {
          window.clearTimeout(retryWaitTimeoutId);
          socket.removeEventListener("open", handleOpen);
          socket.removeEventListener("close", handleClose);
          socket.removeEventListener("error", handleError);
          socket.removeEventListener("message", handleMessage);
        };
      };
      attemptSocketConnection();
    });
  });
}

// node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/lib/esm/index.browser.js
var import_bs58 = __toESM(require_bs58());
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __awaiter2(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function fromUint8Array(byteArray) {
  return window.btoa(String.fromCharCode.call(null, ...byteArray));
}
function toUint8Array(base64EncodedByteArray) {
  return new Uint8Array(window.atob(base64EncodedByteArray).split("").map((c) => c.charCodeAt(0)));
}
function getPayloadFromTransaction(transaction) {
  const serializedTransaction = "version" in transaction ? transaction.serialize() : transaction.serialize({
    requireAllSignatures: false,
    verifySignatures: false
  });
  const payload = fromUint8Array(serializedTransaction);
  return payload;
}
function getTransactionFromWireMessage(byteArray) {
  const numSignatures = byteArray[0];
  const messageOffset = numSignatures * SIGNATURE_LENGTH_IN_BYTES + 1;
  const version = VersionedMessage.deserializeMessageVersion(byteArray.slice(messageOffset, byteArray.length));
  if (version === "legacy") {
    return Transaction.from(byteArray);
  } else {
    return VersionedTransaction.deserialize(byteArray);
  }
}
function transact2(callback, config) {
  return __awaiter2(this, void 0, void 0, function* () {
    const augmentedCallback = (wallet) => {
      return callback(augmentWalletAPI(wallet));
    };
    return yield transact(augmentedCallback, config);
  });
}
function augmentWalletAPI(wallet) {
  return new Proxy({}, {
    get(target, p) {
      if (target[p] == null) {
        switch (p) {
          case "signAndSendTransactions":
            target[p] = function(_a) {
              var { minContextSlot, commitment, skipPreflight, maxRetries, waitForCommitmentToSendNextTransaction, transactions } = _a, rest = __rest(_a, ["minContextSlot", "commitment", "skipPreflight", "maxRetries", "waitForCommitmentToSendNextTransaction", "transactions"]);
              return __awaiter2(this, void 0, void 0, function* () {
                const payloads = transactions.map(getPayloadFromTransaction);
                const options = {
                  min_context_slot: minContextSlot,
                  commitment,
                  skip_preflight: skipPreflight,
                  max_retries: maxRetries,
                  wait_for_commitment_to_send_next_transaction: waitForCommitmentToSendNextTransaction
                };
                const { signatures: base64EncodedSignatures } = yield wallet.signAndSendTransactions(Object.assign(Object.assign(Object.assign({}, rest), Object.values(options).some((element) => element != null) ? { options } : null), { payloads }));
                const signatures = base64EncodedSignatures.map(toUint8Array).map(import_bs58.default.encode);
                return signatures;
              });
            };
            break;
          case "signMessages":
            target[p] = function(_a) {
              var { payloads } = _a, rest = __rest(_a, ["payloads"]);
              return __awaiter2(this, void 0, void 0, function* () {
                const base64EncodedPayloads = payloads.map(fromUint8Array);
                const { signed_payloads: base64EncodedSignedMessages } = yield wallet.signMessages(Object.assign(Object.assign({}, rest), { payloads: base64EncodedPayloads }));
                const signedMessages = base64EncodedSignedMessages.map(toUint8Array);
                return signedMessages;
              });
            };
            break;
          case "signTransactions":
            target[p] = function(_a) {
              var { transactions } = _a, rest = __rest(_a, ["transactions"]);
              return __awaiter2(this, void 0, void 0, function* () {
                const payloads = transactions.map(getPayloadFromTransaction);
                const { signed_payloads: base64EncodedCompiledTransactions } = yield wallet.signTransactions(Object.assign(Object.assign({}, rest), { payloads }));
                const compiledTransactions = base64EncodedCompiledTransactions.map(toUint8Array);
                const signedTransactions = compiledTransactions.map(getTransactionFromWireMessage);
                return signedTransactions;
              });
            };
            break;
          default: {
            target[p] = wallet[p];
            break;
          }
        }
      }
      return target[p];
    },
    defineProperty() {
      return false;
    },
    deleteProperty() {
      return false;
    }
  });
}

// node_modules/@solana-mobile/wallet-standard-mobile/lib/esm/index.browser.js
var import_bs582 = __toESM(require_bs582());
function __awaiter3(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __classPrivateFieldGet$1(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet$1(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var _EmbeddedModal_instances;
var _EmbeddedModal_root;
var _EmbeddedModal_eventListeners;
var _EmbeddedModal_listenersAttached;
var _EmbeddedModal_injectHTML;
var _EmbeddedModal_attachEventListeners;
var _EmbeddedModal_removeEventListeners;
var _EmbeddedModal_handleKeyDown;
var modalHtml = `
<div class="mobile-wallet-adapter-embedded-modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div data-modal-close style="position: absolute; width: 100%; height: 100%;"></div>
	<div class="mobile-wallet-adapter-embedded-modal-card">
		<div>
			<button data-modal-close class="mobile-wallet-adapter-embedded-modal-close">
				<svg width="14" height="14">
					<path d="M 6.7125,8.3036995 1.9082,13.108199 c -0.2113,0.2112 -0.4765,0.3168 -0.7957,0.3168 -0.3192,0 -0.5844,-0.1056 -0.7958,-0.3168 C 0.1056,12.896899 0,12.631699 0,12.312499 c 0,-0.3192 0.1056,-0.5844 0.3167,-0.7958 L 5.1212,6.7124995 0.3167,1.9082 C 0.1056,1.6969 0,1.4317 0,1.1125 0,0.7933 0.1056,0.5281 0.3167,0.3167 0.5281,0.1056 0.7933,0 1.1125,0 1.4317,0 1.6969,0.1056 1.9082,0.3167 L 6.7125,5.1212 11.5167,0.3167 C 11.7281,0.1056 11.9933,0 12.3125,0 c 0.3192,0 0.5844,0.1056 0.7957,0.3167 0.2112,0.2114 0.3168,0.4766 0.3168,0.7958 0,0.3192 -0.1056,0.5844 -0.3168,0.7957 L 8.3037001,6.7124995 13.1082,11.516699 c 0.2112,0.2114 0.3168,0.4766 0.3168,0.7958 0,0.3192 -0.1056,0.5844 -0.3168,0.7957 -0.2113,0.2112 -0.4765,0.3168 -0.7957,0.3168 -0.3192,0 -0.5844,-0.1056 -0.7958,-0.3168 z" />
				</svg>
			</button>
		</div>
		<div class="mobile-wallet-adapter-embedded-modal-content"></div>
	</div>
</div>
`;
var css$2 = `
.mobile-wallet-adapter-embedded-modal-container {
    display: flex; /* Use flexbox to center content */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    overflow-y: auto; /* enable scrolling */
}

.mobile-wallet-adapter-embedded-modal-card {
    display: flex;
    flex-direction: column;
    margin: auto 20px;
    max-width: 780px;
    padding: 20px;
    border-radius: 24px;
    background: #ffffff;
    font-family: "Inter Tight", "PT Sans", Calibri, sans-serif;
    transform: translateY(-200%);
    animation: slide-in 0.5s forwards;
}

@keyframes slide-in {
    100% { transform: translateY(0%); }
}

.mobile-wallet-adapter-embedded-modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: #e4e9e9;
    border: none;
    border-radius: 50%;
}

.mobile-wallet-adapter-embedded-modal-close:focus-visible {
    outline-color: red;
}

.mobile-wallet-adapter-embedded-modal-close svg {
    fill: #546266;
    transition: fill 200ms ease 0s;
}

.mobile-wallet-adapter-embedded-modal-close:hover svg {
    fill: #fff;
}
`;
var fonts = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
`;
var EmbeddedModal = class {
  constructor() {
    _EmbeddedModal_instances.add(this);
    _EmbeddedModal_root.set(this, null);
    _EmbeddedModal_eventListeners.set(this, {});
    _EmbeddedModal_listenersAttached.set(this, false);
    this.dom = null;
    this.open = () => {
      console.debug("Modal open");
      __classPrivateFieldGet$1(this, _EmbeddedModal_instances, "m", _EmbeddedModal_attachEventListeners).call(this);
      if (__classPrivateFieldGet$1(this, _EmbeddedModal_root, "f")) {
        __classPrivateFieldGet$1(this, _EmbeddedModal_root, "f").style.display = "flex";
      }
    };
    this.close = (event = void 0) => {
      var _a;
      console.debug("Modal close");
      __classPrivateFieldGet$1(this, _EmbeddedModal_instances, "m", _EmbeddedModal_removeEventListeners).call(this);
      if (__classPrivateFieldGet$1(this, _EmbeddedModal_root, "f")) {
        __classPrivateFieldGet$1(this, _EmbeddedModal_root, "f").style.display = "none";
      }
      (_a = __classPrivateFieldGet$1(this, _EmbeddedModal_eventListeners, "f")["close"]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => listener(event));
    };
    _EmbeddedModal_handleKeyDown.set(this, (event) => {
      if (event.key === "Escape")
        this.close(event);
    });
    this.init = this.init.bind(this);
    __classPrivateFieldSet$1(this, _EmbeddedModal_root, document.getElementById("mobile-wallet-adapter-embedded-root-ui"), "f");
  }
  init() {
    return __awaiter3(this, void 0, void 0, function* () {
      console.log("Injecting modal");
      __classPrivateFieldGet$1(this, _EmbeddedModal_instances, "m", _EmbeddedModal_injectHTML).call(this);
    });
  }
  addEventListener(event, listener) {
    var _a;
    ((_a = __classPrivateFieldGet$1(this, _EmbeddedModal_eventListeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.push(listener)) || (__classPrivateFieldGet$1(this, _EmbeddedModal_eventListeners, "f")[event] = [listener]);
    return () => this.removeEventListener(event, listener);
  }
  removeEventListener(event, listener) {
    var _a;
    __classPrivateFieldGet$1(this, _EmbeddedModal_eventListeners, "f")[event] = (_a = __classPrivateFieldGet$1(this, _EmbeddedModal_eventListeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.filter((existingListener) => listener !== existingListener);
  }
};
_EmbeddedModal_root = /* @__PURE__ */ new WeakMap(), _EmbeddedModal_eventListeners = /* @__PURE__ */ new WeakMap(), _EmbeddedModal_listenersAttached = /* @__PURE__ */ new WeakMap(), _EmbeddedModal_handleKeyDown = /* @__PURE__ */ new WeakMap(), _EmbeddedModal_instances = /* @__PURE__ */ new WeakSet(), _EmbeddedModal_injectHTML = function _EmbeddedModal_injectHTML2() {
  if (document.getElementById("mobile-wallet-adapter-embedded-root-ui")) {
    if (!__classPrivateFieldGet$1(this, _EmbeddedModal_root, "f"))
      __classPrivateFieldSet$1(this, _EmbeddedModal_root, document.getElementById("mobile-wallet-adapter-embedded-root-ui"), "f");
    return;
  }
  __classPrivateFieldSet$1(this, _EmbeddedModal_root, document.createElement("div"), "f");
  __classPrivateFieldGet$1(this, _EmbeddedModal_root, "f").id = "mobile-wallet-adapter-embedded-root-ui";
  __classPrivateFieldGet$1(this, _EmbeddedModal_root, "f").innerHTML = modalHtml;
  __classPrivateFieldGet$1(this, _EmbeddedModal_root, "f").style.display = "none";
  const content = __classPrivateFieldGet$1(this, _EmbeddedModal_root, "f").querySelector(".mobile-wallet-adapter-embedded-modal-content");
  if (content)
    content.innerHTML = this.contentHtml;
  const styles = document.createElement("style");
  styles.id = "mobile-wallet-adapter-embedded-modal-styles";
  styles.textContent = css$2 + this.contentStyles;
  const host = document.createElement("div");
  host.innerHTML = fonts;
  this.dom = host.attachShadow({ mode: "closed" });
  this.dom.appendChild(styles);
  this.dom.appendChild(__classPrivateFieldGet$1(this, _EmbeddedModal_root, "f"));
  document.body.appendChild(host);
}, _EmbeddedModal_attachEventListeners = function _EmbeddedModal_attachEventListeners2() {
  if (!__classPrivateFieldGet$1(this, _EmbeddedModal_root, "f") || __classPrivateFieldGet$1(this, _EmbeddedModal_listenersAttached, "f"))
    return;
  const closers = [...__classPrivateFieldGet$1(this, _EmbeddedModal_root, "f").querySelectorAll("[data-modal-close]")];
  closers.forEach((closer) => closer === null || closer === void 0 ? void 0 : closer.addEventListener("click", this.close));
  window.addEventListener("load", this.close);
  document.addEventListener("keydown", __classPrivateFieldGet$1(this, _EmbeddedModal_handleKeyDown, "f"));
  __classPrivateFieldSet$1(this, _EmbeddedModal_listenersAttached, true, "f");
}, _EmbeddedModal_removeEventListeners = function _EmbeddedModal_removeEventListeners2() {
  if (!__classPrivateFieldGet$1(this, _EmbeddedModal_listenersAttached, "f"))
    return;
  window.removeEventListener("load", this.close);
  document.removeEventListener("keydown", __classPrivateFieldGet$1(this, _EmbeddedModal_handleKeyDown, "f"));
  if (!__classPrivateFieldGet$1(this, _EmbeddedModal_root, "f"))
    return;
  const closers = [...__classPrivateFieldGet$1(this, _EmbeddedModal_root, "f").querySelectorAll("[data-modal-close]")];
  closers.forEach((closer) => closer === null || closer === void 0 ? void 0 : closer.removeEventListener("click", this.close));
  __classPrivateFieldSet$1(this, _EmbeddedModal_listenersAttached, false, "f");
};
var icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03IDIuNUgxN0MxNy44Mjg0IDIuNSAxOC41IDMuMTcxNTcgMTguNSA0VjIwQzE4LjUgMjAuODI4NCAxNy44Mjg0IDIxLjUgMTcgMjEuNUg3QzYuMTcxNTcgMjEuNSA1LjUgMjAuODI4NCA1LjUgMjBWNEM1LjUgMy4xNzE1NyA2LjE3MTU3IDIuNSA3IDIuNVpNMyA0QzMgMS43OTA4NiA0Ljc5MDg2IDAgNyAwSDE3QzE5LjIwOTEgMCAyMSAxLjc5MDg2IDIxIDRWMjBDMjEgMjIuMjA5MSAxOS4yMDkxIDI0IDE3IDI0SDdDNC43OTA4NiAyNCAzIDIyLjIwOTEgMyAyMFY0Wk0xMSA0LjYxNTM4QzEwLjQ0NzcgNC42MTUzOCAxMCA1LjA2MzEgMTAgNS42MTUzOFY2LjM4NDYyQzEwIDYuOTM2OSAxMC40NDc3IDcuMzg0NjIgMTEgNy4zODQ2MkgxM0MxMy41NTIzIDcuMzg0NjIgMTQgNi45MzY5IDE0IDYuMzg0NjJWNS42MTUzOEMxNCA1LjA2MzEgMTMuNTUyMyA0LjYxNTM4IDEzIDQuNjE1MzhIMTFaIiBmaWxsPSIjRENCOEZGIi8+Cjwvc3ZnPgo=";
function isVersionedTransaction2(transaction) {
  return "version" in transaction;
}
function fromUint8Array2(byteArray) {
  return window.btoa(String.fromCharCode.call(null, ...byteArray));
}
function toUint8Array2(base64EncodedByteArray) {
  return new Uint8Array(window.atob(base64EncodedByteArray).split("").map((c) => c.charCodeAt(0)));
}
var _LocalSolanaMobileWalletAdapterWallet_instances;
var _LocalSolanaMobileWalletAdapterWallet_listeners;
var _LocalSolanaMobileWalletAdapterWallet_version;
var _LocalSolanaMobileWalletAdapterWallet_name;
var _LocalSolanaMobileWalletAdapterWallet_url;
var _LocalSolanaMobileWalletAdapterWallet_icon;
var _LocalSolanaMobileWalletAdapterWallet_appIdentity;
var _LocalSolanaMobileWalletAdapterWallet_authorization;
var _LocalSolanaMobileWalletAdapterWallet_authorizationCache;
var _LocalSolanaMobileWalletAdapterWallet_connecting;
var _LocalSolanaMobileWalletAdapterWallet_connectionGeneration;
var _LocalSolanaMobileWalletAdapterWallet_chains;
var _LocalSolanaMobileWalletAdapterWallet_chainSelector;
var _LocalSolanaMobileWalletAdapterWallet_optionalFeatures;
var _LocalSolanaMobileWalletAdapterWallet_onWalletNotFound;
var _LocalSolanaMobileWalletAdapterWallet_on;
var _LocalSolanaMobileWalletAdapterWallet_emit;
var _LocalSolanaMobileWalletAdapterWallet_off;
var _LocalSolanaMobileWalletAdapterWallet_connect;
var _LocalSolanaMobileWalletAdapterWallet_performAuthorization;
var _LocalSolanaMobileWalletAdapterWallet_handleAuthorizationResult;
var _LocalSolanaMobileWalletAdapterWallet_handleWalletCapabilitiesResult;
var _LocalSolanaMobileWalletAdapterWallet_performReauthorization;
var _LocalSolanaMobileWalletAdapterWallet_disconnect;
var _LocalSolanaMobileWalletAdapterWallet_transact;
var _LocalSolanaMobileWalletAdapterWallet_assertIsAuthorized;
var _LocalSolanaMobileWalletAdapterWallet_accountsToWalletStandardAccounts;
var _LocalSolanaMobileWalletAdapterWallet_performSignTransactions;
var _LocalSolanaMobileWalletAdapterWallet_performSignAndSendTransaction;
var _LocalSolanaMobileWalletAdapterWallet_signAndSendTransaction;
var _LocalSolanaMobileWalletAdapterWallet_signTransaction;
var _LocalSolanaMobileWalletAdapterWallet_signMessage;
var _LocalSolanaMobileWalletAdapterWallet_signIn;
var _LocalSolanaMobileWalletAdapterWallet_performSignIn;
var _RemoteSolanaMobileWalletAdapterWallet_instances;
var _RemoteSolanaMobileWalletAdapterWallet_listeners;
var _RemoteSolanaMobileWalletAdapterWallet_version;
var _RemoteSolanaMobileWalletAdapterWallet_name;
var _RemoteSolanaMobileWalletAdapterWallet_url;
var _RemoteSolanaMobileWalletAdapterWallet_icon;
var _RemoteSolanaMobileWalletAdapterWallet_appIdentity;
var _RemoteSolanaMobileWalletAdapterWallet_authorization;
var _RemoteSolanaMobileWalletAdapterWallet_authorizationCache;
var _RemoteSolanaMobileWalletAdapterWallet_connecting;
var _RemoteSolanaMobileWalletAdapterWallet_connectionGeneration;
var _RemoteSolanaMobileWalletAdapterWallet_chains;
var _RemoteSolanaMobileWalletAdapterWallet_chainSelector;
var _RemoteSolanaMobileWalletAdapterWallet_optionalFeatures;
var _RemoteSolanaMobileWalletAdapterWallet_onWalletNotFound;
var _RemoteSolanaMobileWalletAdapterWallet_hostAuthority;
var _RemoteSolanaMobileWalletAdapterWallet_session;
var _RemoteSolanaMobileWalletAdapterWallet_on;
var _RemoteSolanaMobileWalletAdapterWallet_emit;
var _RemoteSolanaMobileWalletAdapterWallet_off;
var _RemoteSolanaMobileWalletAdapterWallet_connect;
var _RemoteSolanaMobileWalletAdapterWallet_performAuthorization;
var _RemoteSolanaMobileWalletAdapterWallet_handleAuthorizationResult;
var _RemoteSolanaMobileWalletAdapterWallet_handleWalletCapabilitiesResult;
var _RemoteSolanaMobileWalletAdapterWallet_performReauthorization;
var _RemoteSolanaMobileWalletAdapterWallet_disconnect;
var _RemoteSolanaMobileWalletAdapterWallet_transact;
var _RemoteSolanaMobileWalletAdapterWallet_assertIsAuthorized;
var _RemoteSolanaMobileWalletAdapterWallet_accountsToWalletStandardAccounts;
var _RemoteSolanaMobileWalletAdapterWallet_performSignTransactions;
var _RemoteSolanaMobileWalletAdapterWallet_performSignAndSendTransaction;
var _RemoteSolanaMobileWalletAdapterWallet_signAndSendTransaction;
var _RemoteSolanaMobileWalletAdapterWallet_signTransaction;
var _RemoteSolanaMobileWalletAdapterWallet_signMessage;
var _RemoteSolanaMobileWalletAdapterWallet_signIn;
var _RemoteSolanaMobileWalletAdapterWallet_performSignIn;
var SolanaMobileWalletAdapterWalletName = "Mobile Wallet Adapter";
var SIGNATURE_LENGTH_IN_BYTES2 = 64;
var DEFAULT_FEATURES = [SolanaSignAndSendTransaction, SolanaSignTransaction, SolanaSignMessage, SolanaSignIn];
var LocalSolanaMobileWalletAdapterWallet = class {
  constructor(config) {
    _LocalSolanaMobileWalletAdapterWallet_instances.add(this);
    _LocalSolanaMobileWalletAdapterWallet_listeners.set(this, {});
    _LocalSolanaMobileWalletAdapterWallet_version.set(this, "1.0.0");
    _LocalSolanaMobileWalletAdapterWallet_name.set(this, SolanaMobileWalletAdapterWalletName);
    _LocalSolanaMobileWalletAdapterWallet_url.set(this, "https://solanamobile.com/wallets");
    _LocalSolanaMobileWalletAdapterWallet_icon.set(this, icon);
    _LocalSolanaMobileWalletAdapterWallet_appIdentity.set(this, void 0);
    _LocalSolanaMobileWalletAdapterWallet_authorization.set(this, void 0);
    _LocalSolanaMobileWalletAdapterWallet_authorizationCache.set(this, void 0);
    _LocalSolanaMobileWalletAdapterWallet_connecting.set(this, false);
    _LocalSolanaMobileWalletAdapterWallet_connectionGeneration.set(this, 0);
    _LocalSolanaMobileWalletAdapterWallet_chains.set(this, []);
    _LocalSolanaMobileWalletAdapterWallet_chainSelector.set(this, void 0);
    _LocalSolanaMobileWalletAdapterWallet_optionalFeatures.set(this, void 0);
    _LocalSolanaMobileWalletAdapterWallet_onWalletNotFound.set(this, void 0);
    _LocalSolanaMobileWalletAdapterWallet_on.set(this, (event, listener) => {
      var _a;
      ((_a = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.push(listener)) || (__classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_listeners, "f")[event] = [listener]);
      return () => __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_instances, "m", _LocalSolanaMobileWalletAdapterWallet_off).call(this, event, listener);
    });
    _LocalSolanaMobileWalletAdapterWallet_connect.set(this, ({ silent } = {}) => __awaiter3(this, void 0, void 0, function* () {
      if (__classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_connecting, "f") || this.connected) {
        return { accounts: this.accounts };
      }
      __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_connecting, true, "f");
      try {
        if (silent) {
          const cachedAuthorization = yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorizationCache, "f").get();
          if (cachedAuthorization) {
            yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_handleAuthorizationResult, "f").call(this, cachedAuthorization);
          } else {
            return { accounts: this.accounts };
          }
        } else {
          yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performAuthorization, "f").call(this);
        }
      } catch (e) {
        throw new Error(e instanceof Error && e.message || "Unknown error");
      } finally {
        __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_connecting, false, "f");
      }
      return { accounts: this.accounts };
    }));
    _LocalSolanaMobileWalletAdapterWallet_performAuthorization.set(this, (signInPayload) => __awaiter3(this, void 0, void 0, function* () {
      try {
        const cachedAuthorizationResult = yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorizationCache, "f").get();
        if (cachedAuthorizationResult) {
          __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_handleAuthorizationResult, "f").call(this, cachedAuthorizationResult);
          return cachedAuthorizationResult;
        }
        const selectedChain = yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_chainSelector, "f").select(__classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_chains, "f"));
        return yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_transact, "f").call(this, (wallet) => __awaiter3(this, void 0, void 0, function* () {
          const [capabilities, mwaAuthorizationResult] = yield Promise.all([
            wallet.getCapabilities(),
            wallet.authorize({
              chain: selectedChain,
              identity: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_appIdentity, "f"),
              sign_in_payload: signInPayload
            })
          ]);
          const accounts = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_accountsToWalletStandardAccounts, "f").call(this, mwaAuthorizationResult.accounts);
          const authorization = Object.assign(Object.assign({}, mwaAuthorizationResult), { accounts, chain: selectedChain });
          Promise.all([
            __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_handleWalletCapabilitiesResult, "f").call(this, capabilities),
            __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorizationCache, "f").set(authorization),
            __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_handleAuthorizationResult, "f").call(this, authorization)
          ]);
          return authorization;
        }));
      } catch (e) {
        throw new Error(e instanceof Error && e.message || "Unknown error");
      }
    }));
    _LocalSolanaMobileWalletAdapterWallet_handleAuthorizationResult.set(this, (authorization) => __awaiter3(this, void 0, void 0, function* () {
      var _a;
      const didPublicKeysChange = (
        // Case 1: We started from having no authorization.
        __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f") == null || // Case 2: The number of authorized accounts changed.
        ((_a = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f")) === null || _a === void 0 ? void 0 : _a.accounts.length) !== authorization.accounts.length || // Case 3: The new list of addresses isn't exactly the same as the old list, in the same order.
        __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f").accounts.some((account, ii) => account.address !== authorization.accounts[ii].address)
      );
      __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, authorization, "f");
      if (didPublicKeysChange) {
        __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_instances, "m", _LocalSolanaMobileWalletAdapterWallet_emit).call(this, "change", { accounts: this.accounts });
      }
    }));
    _LocalSolanaMobileWalletAdapterWallet_handleWalletCapabilitiesResult.set(this, (capabilities) => __awaiter3(this, void 0, void 0, function* () {
      const supportsSignTransaction = capabilities.features.includes("solana:signTransactions");
      const supportsSignAndSendTransaction = capabilities.supports_sign_and_send_transactions;
      const didCapabilitiesChange = SolanaSignAndSendTransaction in this.features !== supportsSignAndSendTransaction || SolanaSignTransaction in this.features !== supportsSignTransaction;
      __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_optionalFeatures, Object.assign(Object.assign({}, (supportsSignAndSendTransaction || !supportsSignAndSendTransaction && !supportsSignTransaction) && {
        [SolanaSignAndSendTransaction]: {
          version: "1.0.0",
          supportedTransactionVersions: ["legacy", 0],
          signAndSendTransaction: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_signAndSendTransaction, "f")
        }
      }), supportsSignTransaction && {
        [SolanaSignTransaction]: {
          version: "1.0.0",
          supportedTransactionVersions: ["legacy", 0],
          signTransaction: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_signTransaction, "f")
        }
      }), "f");
      if (didCapabilitiesChange) {
        __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_instances, "m", _LocalSolanaMobileWalletAdapterWallet_emit).call(this, "change", { features: this.features });
      }
    }));
    _LocalSolanaMobileWalletAdapterWallet_performReauthorization.set(this, (wallet, authToken, chain) => __awaiter3(this, void 0, void 0, function* () {
      try {
        const mwaAuthorizationResult = yield wallet.authorize({
          auth_token: authToken,
          identity: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_appIdentity, "f"),
          chain
        });
        const accounts = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_accountsToWalletStandardAccounts, "f").call(this, mwaAuthorizationResult.accounts);
        const authorization = Object.assign(Object.assign({}, mwaAuthorizationResult), { accounts, chain });
        Promise.all([
          __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorizationCache, "f").set(authorization),
          __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_handleAuthorizationResult, "f").call(this, authorization)
        ]);
      } catch (e) {
        __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_disconnect, "f").call(this);
        throw new Error(e instanceof Error && e.message || "Unknown error");
      }
    }));
    _LocalSolanaMobileWalletAdapterWallet_disconnect.set(this, () => __awaiter3(this, void 0, void 0, function* () {
      var _b;
      __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorizationCache, "f").clear();
      __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_connecting, false, "f");
      __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_connectionGeneration, (_b = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_connectionGeneration, "f"), _b++, _b), "f");
      __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, void 0, "f");
      __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_instances, "m", _LocalSolanaMobileWalletAdapterWallet_emit).call(this, "change", { accounts: this.accounts });
    }));
    _LocalSolanaMobileWalletAdapterWallet_transact.set(this, (callback) => __awaiter3(this, void 0, void 0, function* () {
      var _c;
      const walletUriBase = (_c = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f")) === null || _c === void 0 ? void 0 : _c.wallet_uri_base;
      const config2 = walletUriBase ? { baseUri: walletUriBase } : void 0;
      const currentConnectionGeneration = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_connectionGeneration, "f");
      try {
        return yield transact2(callback, config2);
      } catch (e) {
        if (__classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_connectionGeneration, "f") !== currentConnectionGeneration) {
          yield new Promise(() => {
          });
        }
        if (e instanceof Error && e.name === "SolanaMobileWalletAdapterError" && e.code === "ERROR_WALLET_NOT_FOUND") {
          yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_onWalletNotFound, "f").call(this, this);
        }
        throw e;
      }
    }));
    _LocalSolanaMobileWalletAdapterWallet_assertIsAuthorized.set(this, () => {
      if (!__classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f"))
        throw new Error("Wallet not connected");
      return { authToken: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f").auth_token, chain: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f").chain };
    });
    _LocalSolanaMobileWalletAdapterWallet_accountsToWalletStandardAccounts.set(this, (accounts) => {
      return accounts.map((account) => {
        var _a, _b;
        const publicKey = toUint8Array2(account.address);
        return {
          address: import_bs582.default.encode(publicKey),
          publicKey,
          label: account.label,
          icon: account.icon,
          chains: (_a = account.chains) !== null && _a !== void 0 ? _a : __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_chains, "f"),
          // TODO: get supported features from getCapabilities API 
          features: (_b = account.features) !== null && _b !== void 0 ? _b : DEFAULT_FEATURES
        };
      });
    });
    _LocalSolanaMobileWalletAdapterWallet_performSignTransactions.set(this, (transactions) => __awaiter3(this, void 0, void 0, function* () {
      const { authToken, chain } = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_assertIsAuthorized, "f").call(this);
      try {
        return yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_transact, "f").call(this, (wallet) => __awaiter3(this, void 0, void 0, function* () {
          yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performReauthorization, "f").call(this, wallet, authToken, chain);
          const signedTransactions = yield wallet.signTransactions({
            transactions
          });
          return signedTransactions;
        }));
      } catch (e) {
        throw new Error(e instanceof Error && e.message || "Unknown error");
      }
    }));
    _LocalSolanaMobileWalletAdapterWallet_performSignAndSendTransaction.set(this, (transaction, options) => __awaiter3(this, void 0, void 0, function* () {
      const { authToken, chain } = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_assertIsAuthorized, "f").call(this);
      try {
        return yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_transact, "f").call(this, (wallet) => __awaiter3(this, void 0, void 0, function* () {
          const [capabilities, _1] = yield Promise.all([
            wallet.getCapabilities(),
            __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performReauthorization, "f").call(this, wallet, authToken, chain)
          ]);
          if (capabilities.supports_sign_and_send_transactions) {
            const signatures = yield wallet.signAndSendTransactions(Object.assign(Object.assign({}, options), { transactions: [transaction] }));
            return signatures[0];
          } else {
            throw new Error("connected wallet does not support signAndSendTransaction");
          }
        }));
      } catch (e) {
        throw new Error(e instanceof Error && e.message || "Unknown error");
      }
    }));
    _LocalSolanaMobileWalletAdapterWallet_signAndSendTransaction.set(this, (...inputs) => __awaiter3(this, void 0, void 0, function* () {
      const outputs = [];
      for (const input of inputs) {
        const transaction = VersionedTransaction.deserialize(input.transaction);
        const signature = yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performSignAndSendTransaction, "f").call(this, transaction, input.options);
        outputs.push({ signature: import_bs582.default.decode(signature) });
      }
      return outputs;
    }));
    _LocalSolanaMobileWalletAdapterWallet_signTransaction.set(this, (...inputs) => __awaiter3(this, void 0, void 0, function* () {
      const transactions = inputs.map(({ transaction }) => VersionedTransaction.deserialize(transaction));
      const signedTransactions = yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performSignTransactions, "f").call(this, transactions);
      return signedTransactions.map((signedTransaction) => {
        const serializedTransaction = isVersionedTransaction2(signedTransaction) ? signedTransaction.serialize() : new Uint8Array(signedTransaction.serialize({
          requireAllSignatures: false,
          verifySignatures: false
        }));
        return { signedTransaction: serializedTransaction };
      });
    }));
    _LocalSolanaMobileWalletAdapterWallet_signMessage.set(this, (...inputs) => __awaiter3(this, void 0, void 0, function* () {
      const { authToken, chain } = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_assertIsAuthorized, "f").call(this);
      const addresses = inputs.map(({ account }) => fromUint8Array2(account.publicKey));
      const messages = inputs.map(({ message }) => message);
      try {
        return yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_transact, "f").call(this, (wallet) => __awaiter3(this, void 0, void 0, function* () {
          yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performReauthorization, "f").call(this, wallet, authToken, chain);
          const signedMessages = yield wallet.signMessages({
            addresses,
            payloads: messages
          });
          return signedMessages.map((signedMessage) => {
            return { signedMessage, signature: signedMessage.slice(-SIGNATURE_LENGTH_IN_BYTES2) };
          });
        }));
      } catch (e) {
        throw new Error(e instanceof Error && e.message || "Unknown error");
      }
    }));
    _LocalSolanaMobileWalletAdapterWallet_signIn.set(this, (...inputs) => __awaiter3(this, void 0, void 0, function* () {
      const outputs = [];
      if (inputs.length > 1) {
        for (const input of inputs) {
          outputs.push(yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performSignIn, "f").call(this, input));
        }
      } else {
        return [yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performSignIn, "f").call(this, inputs[0])];
      }
      return outputs;
    }));
    _LocalSolanaMobileWalletAdapterWallet_performSignIn.set(this, (input) => __awaiter3(this, void 0, void 0, function* () {
      var _d, _e;
      __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_connecting, true, "f");
      try {
        const authorizationResult = yield __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_performAuthorization, "f").call(this, Object.assign(Object.assign({}, input), { domain: (_d = input === null || input === void 0 ? void 0 : input.domain) !== null && _d !== void 0 ? _d : window.location.host }));
        if (!authorizationResult.sign_in_result) {
          throw new Error("Sign in failed, no sign in result returned by wallet");
        }
        const signedInAddress = authorizationResult.sign_in_result.address;
        const signedInAccount = Object.assign(Object.assign({}, (_e = authorizationResult.accounts.find((acc) => acc.address == signedInAddress)) !== null && _e !== void 0 ? _e : {
          address: signedInAddress
        }), { publicKey: toUint8Array2(signedInAddress) });
        return {
          account: signedInAccount,
          signedMessage: toUint8Array2(authorizationResult.sign_in_result.signed_message),
          signature: toUint8Array2(authorizationResult.sign_in_result.signature)
        };
      } catch (e) {
        throw new Error(e instanceof Error && e.message || "Unknown error");
      } finally {
        __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_connecting, false, "f");
      }
    }));
    __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorizationCache, config.authorizationCache, "f");
    __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_appIdentity, config.appIdentity, "f");
    __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_chains, config.chains, "f");
    __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_chainSelector, config.chainSelector, "f");
    __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_onWalletNotFound, config.onWalletNotFound, "f");
    __classPrivateFieldSet$1(this, _LocalSolanaMobileWalletAdapterWallet_optionalFeatures, {
      // We are forced to provide either SolanaSignAndSendTransaction or SolanaSignTransaction
      // because the wallet-adapter compatible wallet-standard wallet requires at least one of them.
      // MWA 2.0+ wallets must implement signAndSend and pre 2.0 wallets have always provided it so 
      // this is a safe assumption. We later update the features after we get the wallets capabilities. 
      [SolanaSignAndSendTransaction]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signAndSendTransaction: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_signAndSendTransaction, "f")
      }
    }, "f");
  }
  get version() {
    return __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_version, "f");
  }
  get name() {
    return __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_name, "f");
  }
  get url() {
    return __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_url, "f");
  }
  get icon() {
    return __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_icon, "f");
  }
  get chains() {
    return __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_chains, "f");
  }
  get features() {
    return Object.assign({ [StandardConnect]: {
      version: "1.0.0",
      connect: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_connect, "f")
    }, [StandardDisconnect]: {
      version: "1.0.0",
      disconnect: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_disconnect, "f")
    }, [StandardEvents]: {
      version: "1.0.0",
      on: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_on, "f")
    }, [SolanaSignMessage]: {
      version: "1.0.0",
      signMessage: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_signMessage, "f")
    }, [SolanaSignIn]: {
      version: "1.0.0",
      signIn: __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_signIn, "f")
    } }, __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_optionalFeatures, "f"));
  }
  get accounts() {
    var _a, _b;
    return (_b = (_a = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f")) === null || _a === void 0 ? void 0 : _a.accounts) !== null && _b !== void 0 ? _b : [];
  }
  get connected() {
    return !!__classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f");
  }
  get isAuthorized() {
    return !!__classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f");
  }
  get currentAuthorization() {
    return __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorization, "f");
  }
  get cachedAuthorizationResult() {
    return __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_authorizationCache, "f").get();
  }
};
_LocalSolanaMobileWalletAdapterWallet_listeners = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_version = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_name = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_url = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_icon = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_appIdentity = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_authorization = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_authorizationCache = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_connecting = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_connectionGeneration = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_chains = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_chainSelector = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_optionalFeatures = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_onWalletNotFound = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_on = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_connect = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_performAuthorization = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_handleAuthorizationResult = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_handleWalletCapabilitiesResult = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_performReauthorization = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_disconnect = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_transact = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_assertIsAuthorized = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_accountsToWalletStandardAccounts = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_performSignTransactions = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_performSignAndSendTransaction = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_signAndSendTransaction = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_signTransaction = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_signMessage = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_signIn = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_performSignIn = /* @__PURE__ */ new WeakMap(), _LocalSolanaMobileWalletAdapterWallet_instances = /* @__PURE__ */ new WeakSet(), _LocalSolanaMobileWalletAdapterWallet_emit = function _LocalSolanaMobileWalletAdapterWallet_emit2(event, ...args) {
  var _a;
  (_a = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => listener.apply(null, args));
}, _LocalSolanaMobileWalletAdapterWallet_off = function _LocalSolanaMobileWalletAdapterWallet_off2(event, listener) {
  var _a;
  __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_listeners, "f")[event] = (_a = __classPrivateFieldGet$1(this, _LocalSolanaMobileWalletAdapterWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.filter((existingListener) => listener !== existingListener);
};
_RemoteSolanaMobileWalletAdapterWallet_listeners = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_version = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_name = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_url = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_icon = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_appIdentity = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_authorization = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_authorizationCache = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_connecting = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_connectionGeneration = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_chains = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_chainSelector = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_optionalFeatures = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_onWalletNotFound = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_hostAuthority = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_session = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_on = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_connect = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_performAuthorization = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_handleAuthorizationResult = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_handleWalletCapabilitiesResult = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_performReauthorization = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_disconnect = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_transact = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_assertIsAuthorized = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_accountsToWalletStandardAccounts = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_performSignTransactions = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_performSignAndSendTransaction = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_signAndSendTransaction = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_signTransaction = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_signMessage = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_signIn = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_performSignIn = /* @__PURE__ */ new WeakMap(), _RemoteSolanaMobileWalletAdapterWallet_instances = /* @__PURE__ */ new WeakSet(), _RemoteSolanaMobileWalletAdapterWallet_emit = function _RemoteSolanaMobileWalletAdapterWallet_emit2(event, ...args) {
  var _a;
  (_a = __classPrivateFieldGet$1(this, _RemoteSolanaMobileWalletAdapterWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => listener.apply(null, args));
}, _RemoteSolanaMobileWalletAdapterWallet_off = function _RemoteSolanaMobileWalletAdapterWallet_off2(event, listener) {
  var _a;
  __classPrivateFieldGet$1(this, _RemoteSolanaMobileWalletAdapterWallet_listeners, "f")[event] = (_a = __classPrivateFieldGet$1(this, _RemoteSolanaMobileWalletAdapterWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.filter((existingListener) => listener !== existingListener);
};
var _RegisterWalletEvent_detail;
_RegisterWalletEvent_detail = /* @__PURE__ */ new WeakMap();
var WALLET_NOT_FOUND_ERROR_MESSAGE = "To use mobile wallet adapter, you must have a compatible mobile wallet application installed on your device.";
var BROWSER_NOT_SUPPORTED_ERROR_MESSAGE = "This browser appears to be incompatible with mobile wallet adapter. Open this page in a compatible mobile browser app and try again.";
var ErrorModal = class extends EmbeddedModal {
  constructor() {
    super(...arguments);
    this.contentStyles = css;
    this.contentHtml = ErrorDialogHtml;
  }
  initWithError(error) {
    super.init();
    this.populateError(error);
  }
  populateError(error) {
    var _a, _b;
    const errorMessageElement = (_a = this.dom) === null || _a === void 0 ? void 0 : _a.getElementById("mobile-wallet-adapter-error-message");
    const actionBtn = (_b = this.dom) === null || _b === void 0 ? void 0 : _b.getElementById("mobile-wallet-adapter-error-action");
    if (errorMessageElement) {
      if (error.name === "SolanaMobileWalletAdapterError") {
        switch (error.code) {
          case "ERROR_WALLET_NOT_FOUND":
            errorMessageElement.innerHTML = WALLET_NOT_FOUND_ERROR_MESSAGE;
            if (actionBtn)
              actionBtn.addEventListener("click", () => {
                window.location.href = "https://solanamobile.com/wallets";
              });
            return;
          case "ERROR_BROWSER_NOT_SUPPORTED":
            errorMessageElement.innerHTML = BROWSER_NOT_SUPPORTED_ERROR_MESSAGE;
            if (actionBtn)
              actionBtn.style.display = "none";
            return;
        }
      }
      errorMessageElement.innerHTML = `An unexpected error occurred: ${error.message}`;
    } else {
      console.log("Failed to locate error dialog element");
    }
  }
};
var ErrorDialogHtml = `
<svg class="mobile-wallet-adapter-embedded-modal-error-icon" xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#000000"><path d="M 280,-80 Q 197,-80 138.5,-138.5 80,-197 80,-280 80,-363 138.5,-421.5 197,-480 280,-480 q 83,0 141.5,58.5 58.5,58.5 58.5,141.5 0,83 -58.5,141.5 Q 363,-80 280,-80 Z M 824,-120 568,-376 Q 556,-389 542.5,-402.5 529,-416 516,-428 q 38,-24 61,-64 23,-40 23,-88 0,-75 -52.5,-127.5 Q 495,-760 420,-760 345,-760 292.5,-707.5 240,-655 240,-580 q 0,6 0.5,11.5 0.5,5.5 1.5,11.5 -18,2 -39.5,8 -21.5,6 -38.5,14 -2,-11 -3,-22 -1,-11 -1,-23 0,-109 75.5,-184.5 Q 311,-840 420,-840 q 109,0 184.5,75.5 75.5,75.5 75.5,184.5 0,43 -13.5,81.5 Q 653,-460 629,-428 l 251,252 z m -615,-61 71,-71 70,71 29,-28 -71,-71 71,-71 -28,-28 -71,71 -71,-71 -28,28 71,71 -71,71 z"/></svg>
<div class="mobile-wallet-adapter-embedded-modal-title">We can't find a wallet.</div>
<div id="mobile-wallet-adapter-error-message" class="mobile-wallet-adapter-embedded-modal-subtitle"></div>
<div>
    <button data-error-action id="mobile-wallet-adapter-error-action" class="mobile-wallet-adapter-embedded-modal-error-action">
        Find a wallet
    </button>
</div>
`;
var css = `
.mobile-wallet-adapter-embedded-modal-content {
    text-align: center;
}

.mobile-wallet-adapter-embedded-modal-error-icon {
    margin-top: 24px;
}

.mobile-wallet-adapter-embedded-modal-title {
    margin: 18px 100px auto 100px;
    color: #000000;
    font-size: 2.75em;
    font-weight: 600;
}

.mobile-wallet-adapter-embedded-modal-subtitle {
    margin: 30px 60px 40px 60px;
    color: #000000;
    font-size: 1.25em;
    font-weight: 400;
}

.mobile-wallet-adapter-embedded-modal-error-action {
    display: block;
    width: 100%;
    height: 56px;
    /*margin-top: 40px;*/
    font-size: 1.25em;
    /*line-height: 24px;*/
    /*letter-spacing: -1%;*/
    background: #000000;
    color: #FFFFFF;
    border-radius: 18px;
}

/* Smaller screens */
@media all and (max-width: 600px) {
    .mobile-wallet-adapter-embedded-modal-title {
        font-size: 1.5em;
        margin-right: 12px;
        margin-left: 12px;
    }
    .mobile-wallet-adapter-embedded-modal-subtitle {
        margin-right: 12px;
        margin-left: 12px;
    }
}
`;
function defaultErrorModalWalletNotFoundHandler() {
  return __awaiter3(this, void 0, void 0, function* () {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const errorDialog = new ErrorModal();
      if (userAgent.includes("wv")) {
        errorDialog.initWithError({
          name: "SolanaMobileWalletAdapterError",
          code: "ERROR_BROWSER_NOT_SUPPORTED",
          message: ""
        });
      } else {
        errorDialog.initWithError({
          name: "SolanaMobileWalletAdapterError",
          code: "ERROR_WALLET_NOT_FOUND",
          message: ""
        });
      }
      errorDialog.open();
    }
  });
}
var CACHE_KEY = "SolanaMobileWalletAdapterDefaultAuthorizationCache";
function createDefaultAuthorizationCache() {
  let storage;
  try {
    storage = window.localStorage;
  } catch (_a) {
  }
  return {
    clear() {
      return __awaiter3(this, void 0, void 0, function* () {
        if (!storage) {
          return;
        }
        try {
          storage.removeItem(CACHE_KEY);
        } catch (_a) {
        }
      });
    },
    get() {
      return __awaiter3(this, void 0, void 0, function* () {
        if (!storage) {
          return;
        }
        try {
          const parsed = JSON.parse(storage.getItem(CACHE_KEY));
          if (parsed && parsed.accounts) {
            const parsedAccounts = parsed.accounts.map((account) => {
              return Object.assign(Object.assign({}, account), { publicKey: "publicKey" in account ? new Uint8Array(Object.values(account.publicKey)) : new PublicKey(account.address).toBytes() });
            });
            return Object.assign(Object.assign({}, parsed), { accounts: parsedAccounts });
          } else
            return parsed || void 0;
        } catch (_a) {
        }
      });
    },
    set(authorizationResult) {
      return __awaiter3(this, void 0, void 0, function* () {
        if (!storage) {
          return;
        }
        try {
          storage.setItem(CACHE_KEY, JSON.stringify(authorizationResult));
        } catch (_a) {
        }
      });
    }
  };
}
function createDefaultChainSelector() {
  return {
    select(chains) {
      return __awaiter3(this, void 0, void 0, function* () {
        if (chains.length === 1) {
          return chains[0];
        } else if (chains.includes(SOLANA_MAINNET_CHAIN)) {
          return SOLANA_MAINNET_CHAIN;
        } else
          return chains[0];
      });
    }
  };
}

// node_modules/@solana-mobile/wallet-adapter-mobile/lib/esm/index.browser.js
function __awaiter4(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var StandardConnect2 = "standard:connect";
var StandardDisconnect2 = "standard:disconnect";
var StandardEvents2 = "standard:events";
function fromUint8Array3(byteArray) {
  return window.btoa(String.fromCharCode.call(null, ...byteArray));
}
function getIsSupported() {
  return typeof window !== "undefined" && window.isSecureContext && typeof document !== "undefined" && /android/i.test(navigator.userAgent);
}
var _BaseSolanaMobileWalletAdapter_instances;
var _BaseSolanaMobileWalletAdapter_wallet;
var _BaseSolanaMobileWalletAdapter_connecting;
var _BaseSolanaMobileWalletAdapter_readyState;
var _BaseSolanaMobileWalletAdapter_accountSelector;
var _BaseSolanaMobileWalletAdapter_selectedAccount;
var _BaseSolanaMobileWalletAdapter_publicKey;
var _BaseSolanaMobileWalletAdapter_handleChangeEvent;
var _BaseSolanaMobileWalletAdapter_connect;
var _BaseSolanaMobileWalletAdapter_declareWalletAsInstalled;
var _BaseSolanaMobileWalletAdapter_assertIsAuthorized;
var _BaseSolanaMobileWalletAdapter_performSignTransactions;
var _BaseSolanaMobileWalletAdapter_runWithGuard;
var SolanaMobileWalletAdapterWalletName2 = "Mobile Wallet Adapter";
var SIGNATURE_LENGTH_IN_BYTES3 = 64;
function isVersionedTransaction3(transaction) {
  return "version" in transaction;
}
function chainOrClusterToChainId(chain) {
  switch (chain) {
    case "mainnet-beta":
      return "solana:mainnet";
    case "testnet":
      return "solana:testnet";
    case "devnet":
      return "solana:devnet";
    default:
      return chain;
  }
}
var BaseSolanaMobileWalletAdapter = class extends BaseSignInMessageSignerWalletAdapter {
  constructor(wallet, config) {
    super();
    _BaseSolanaMobileWalletAdapter_instances.add(this);
    this.supportedTransactionVersions = /* @__PURE__ */ new Set(
      // FIXME(#244): We can't actually know what versions are supported until we know which wallet we're talking to.
      ["legacy", 0]
    );
    _BaseSolanaMobileWalletAdapter_wallet.set(this, void 0);
    _BaseSolanaMobileWalletAdapter_connecting.set(this, false);
    _BaseSolanaMobileWalletAdapter_readyState.set(this, getIsSupported() ? WalletReadyState.Loadable : WalletReadyState.Unsupported);
    _BaseSolanaMobileWalletAdapter_accountSelector.set(this, void 0);
    _BaseSolanaMobileWalletAdapter_selectedAccount.set(this, void 0);
    _BaseSolanaMobileWalletAdapter_publicKey.set(this, void 0);
    _BaseSolanaMobileWalletAdapter_handleChangeEvent.set(this, (properties) => __awaiter4(this, void 0, void 0, function* () {
      if (properties.accounts && properties.accounts.length > 0) {
        __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_declareWalletAsInstalled).call(this);
        const nextSelectedAccount = yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_accountSelector, "f").call(this, properties.accounts);
        if (nextSelectedAccount !== __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_selectedAccount, "f")) {
          __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_selectedAccount, nextSelectedAccount, "f");
          __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_publicKey, void 0, "f");
          this.emit(
            "connect",
            // Having just set `this.#selectedAccount`, `this.publicKey` is definitely non-null
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.publicKey
          );
        }
      }
    }));
    __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_accountSelector, (accounts) => __awaiter4(this, void 0, void 0, function* () {
      var _a;
      const selectedBase64EncodedAddress = yield config.addressSelector.select(accounts.map(({ publicKey }) => fromUint8Array3(publicKey)));
      return (_a = accounts.find(({ publicKey }) => fromUint8Array3(publicKey) === selectedBase64EncodedAddress)) !== null && _a !== void 0 ? _a : accounts[0];
    }), "f");
    __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_wallet, wallet, "f");
    __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[StandardEvents2].on("change", __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_handleChangeEvent, "f"));
    this.name = __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").name;
    this.icon = __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").icon;
    this.url = __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").url;
  }
  get publicKey() {
    var _a;
    if (!__classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_publicKey, "f") && __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_selectedAccount, "f")) {
      try {
        __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_publicKey, new PublicKey(__classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_selectedAccount, "f").publicKey), "f");
      } catch (e) {
        throw new WalletPublicKeyError(e instanceof Error && (e === null || e === void 0 ? void 0 : e.message) || "Unknown error", e);
      }
    }
    return (_a = __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_publicKey, "f")) !== null && _a !== void 0 ? _a : null;
  }
  get connected() {
    return __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").connected;
  }
  get connecting() {
    return __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_connecting, "f");
  }
  get readyState() {
    return __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_readyState, "f");
  }
  /** @deprecated Use `autoConnect()` instead. */
  autoConnect_DO_NOT_USE_OR_YOU_WILL_BE_FIRED() {
    return __awaiter4(this, void 0, void 0, function* () {
      return yield this.autoConnect();
    });
  }
  autoConnect() {
    return __awaiter4(this, void 0, void 0, function* () {
      __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_connect).call(this, true);
    });
  }
  connect() {
    return __awaiter4(this, void 0, void 0, function* () {
      __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_connect).call(this);
    });
  }
  /** @deprecated Use `connect()` or `autoConnect()` instead. */
  performAuthorization(signInPayload) {
    return __awaiter4(this, void 0, void 0, function* () {
      try {
        const cachedAuthorizationResult = yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").cachedAuthorizationResult;
        if (cachedAuthorizationResult) {
          yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[StandardConnect2].connect({ silent: true });
          return cachedAuthorizationResult;
        }
        if (signInPayload) {
          yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[SolanaSignIn].signIn(signInPayload);
        } else
          yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[StandardConnect2].connect();
        const authorizationResult = yield yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").cachedAuthorizationResult;
        return authorizationResult;
      } catch (e) {
        throw new WalletConnectionError(e instanceof Error && e.message || "Unknown error", e);
      }
    });
  }
  disconnect() {
    return __awaiter4(this, void 0, void 0, function* () {
      return yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_runWithGuard).call(this, () => __awaiter4(this, void 0, void 0, function* () {
        __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_connecting, false, "f");
        __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_publicKey, void 0, "f");
        __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_selectedAccount, void 0, "f");
        yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[StandardDisconnect2].disconnect();
        this.emit("disconnect");
      }));
    });
  }
  signIn(input) {
    return __awaiter4(this, void 0, void 0, function* () {
      return __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_runWithGuard).call(this, () => __awaiter4(this, void 0, void 0, function* () {
        var _a;
        if (__classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_readyState, "f") !== WalletReadyState.Installed && __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_readyState, "f") !== WalletReadyState.Loadable) {
          throw new WalletNotReadyError();
        }
        __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_connecting, true, "f");
        try {
          const outputs = yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[SolanaSignIn].signIn(Object.assign(Object.assign({}, input), { domain: (_a = input === null || input === void 0 ? void 0 : input.domain) !== null && _a !== void 0 ? _a : window.location.host }));
          if (outputs.length > 0) {
            return outputs[0];
          } else {
            throw new Error("Sign in failed, no sign in result returned by wallet");
          }
        } catch (e) {
          throw new WalletConnectionError(e instanceof Error && e.message || "Unknown error", e);
        } finally {
          __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_connecting, false, "f");
        }
      }));
    });
  }
  signMessage(message) {
    return __awaiter4(this, void 0, void 0, function* () {
      return yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_runWithGuard).call(this, () => __awaiter4(this, void 0, void 0, function* () {
        const account = __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_assertIsAuthorized).call(this);
        try {
          const outputs = yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[SolanaSignMessage].signMessage({
            account,
            message
          });
          return outputs[0].signature;
        } catch (error) {
          throw new WalletSignMessageError(error === null || error === void 0 ? void 0 : error.message, error);
        }
      }));
    });
  }
  sendTransaction(transaction, connection, options) {
    return __awaiter4(this, void 0, void 0, function* () {
      return yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_runWithGuard).call(this, () => __awaiter4(this, void 0, void 0, function* () {
        const account = __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_assertIsAuthorized).call(this);
        try {
          let getTargetCommitment = function() {
            let targetCommitment;
            switch (connection.commitment) {
              case "confirmed":
              case "finalized":
              case "processed":
                targetCommitment = connection.commitment;
                break;
              default:
                targetCommitment = "finalized";
            }
            let targetPreflightCommitment;
            switch (options === null || options === void 0 ? void 0 : options.preflightCommitment) {
              case "confirmed":
              case "finalized":
              case "processed":
                targetPreflightCommitment = options.preflightCommitment;
                break;
              case void 0:
                targetPreflightCommitment = targetCommitment;
                break;
              default:
                targetPreflightCommitment = "finalized";
            }
            const preflightCommitmentScore = targetPreflightCommitment === "finalized" ? 2 : targetPreflightCommitment === "confirmed" ? 1 : 0;
            const targetCommitmentScore = targetCommitment === "finalized" ? 2 : targetCommitment === "confirmed" ? 1 : 0;
            return preflightCommitmentScore < targetCommitmentScore ? targetPreflightCommitment : targetCommitment;
          };
          if (SolanaSignAndSendTransaction in __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features) {
            const chain = chainOrClusterToChainId(__classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").currentAuthorization.chain);
            const [signature] = (yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[SolanaSignAndSendTransaction].signAndSendTransaction({
              account,
              transaction: transaction.serialize(),
              chain,
              options: options ? {
                skipPreflight: options.skipPreflight,
                maxRetries: options.maxRetries
              } : void 0
            })).map((output) => {
              return fromUint8Array3(output.signature);
            });
            return signature;
          } else {
            const [signedTransaction] = yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_performSignTransactions).call(this, [transaction]);
            if (isVersionedTransaction3(signedTransaction)) {
              return yield connection.sendTransaction(signedTransaction);
            } else {
              const serializedTransaction = signedTransaction.serialize();
              return yield connection.sendRawTransaction(serializedTransaction, Object.assign(Object.assign({}, options), { preflightCommitment: getTargetCommitment() }));
            }
          }
        } catch (error) {
          throw new WalletSendTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
        }
      }));
    });
  }
  signTransaction(transaction) {
    return __awaiter4(this, void 0, void 0, function* () {
      return yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_runWithGuard).call(this, () => __awaiter4(this, void 0, void 0, function* () {
        const [signedTransaction] = yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_performSignTransactions).call(this, [transaction]);
        return signedTransaction;
      }));
    });
  }
  signAllTransactions(transactions) {
    return __awaiter4(this, void 0, void 0, function* () {
      return yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_runWithGuard).call(this, () => __awaiter4(this, void 0, void 0, function* () {
        const signedTransactions = yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_performSignTransactions).call(this, transactions);
        return signedTransactions;
      }));
    });
  }
};
_BaseSolanaMobileWalletAdapter_wallet = /* @__PURE__ */ new WeakMap(), _BaseSolanaMobileWalletAdapter_connecting = /* @__PURE__ */ new WeakMap(), _BaseSolanaMobileWalletAdapter_readyState = /* @__PURE__ */ new WeakMap(), _BaseSolanaMobileWalletAdapter_accountSelector = /* @__PURE__ */ new WeakMap(), _BaseSolanaMobileWalletAdapter_selectedAccount = /* @__PURE__ */ new WeakMap(), _BaseSolanaMobileWalletAdapter_publicKey = /* @__PURE__ */ new WeakMap(), _BaseSolanaMobileWalletAdapter_handleChangeEvent = /* @__PURE__ */ new WeakMap(), _BaseSolanaMobileWalletAdapter_instances = /* @__PURE__ */ new WeakSet(), _BaseSolanaMobileWalletAdapter_connect = function _BaseSolanaMobileWalletAdapter_connect2(autoConnect = false) {
  return __awaiter4(this, void 0, void 0, function* () {
    if (this.connecting || this.connected) {
      return;
    }
    return yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_runWithGuard).call(this, () => __awaiter4(this, void 0, void 0, function* () {
      if (__classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_readyState, "f") !== WalletReadyState.Installed && __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_readyState, "f") !== WalletReadyState.Loadable) {
        throw new WalletNotReadyError();
      }
      __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_connecting, true, "f");
      try {
        yield __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[StandardConnect2].connect({ silent: autoConnect });
      } catch (e) {
        throw new WalletConnectionError(e instanceof Error && e.message || "Unknown error", e);
      } finally {
        __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_connecting, false, "f");
      }
    }));
  });
}, _BaseSolanaMobileWalletAdapter_declareWalletAsInstalled = function _BaseSolanaMobileWalletAdapter_declareWalletAsInstalled2() {
  if (__classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_readyState, "f") !== WalletReadyState.Installed) {
    this.emit("readyStateChange", __classPrivateFieldSet(this, _BaseSolanaMobileWalletAdapter_readyState, WalletReadyState.Installed, "f"));
  }
}, _BaseSolanaMobileWalletAdapter_assertIsAuthorized = function _BaseSolanaMobileWalletAdapter_assertIsAuthorized2() {
  if (!__classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").isAuthorized || !__classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_selectedAccount, "f"))
    throw new WalletNotConnectedError();
  return __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_selectedAccount, "f");
}, _BaseSolanaMobileWalletAdapter_performSignTransactions = function _BaseSolanaMobileWalletAdapter_performSignTransactions2(transactions) {
  return __awaiter4(this, void 0, void 0, function* () {
    const account = __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_instances, "m", _BaseSolanaMobileWalletAdapter_assertIsAuthorized).call(this);
    try {
      if (SolanaSignTransaction in __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features) {
        return __classPrivateFieldGet(this, _BaseSolanaMobileWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction(...transactions.map((value) => {
          return { account, transaction: value.serialize() };
        })).then((outputs) => {
          return outputs.map((output) => {
            const byteArray = output.signedTransaction;
            const numSignatures = byteArray[0];
            const messageOffset = numSignatures * SIGNATURE_LENGTH_IN_BYTES3 + 1;
            const version = VersionedMessage.deserializeMessageVersion(byteArray.slice(messageOffset, byteArray.length));
            if (version === "legacy") {
              return Transaction.from(byteArray);
            } else {
              return VersionedTransaction.deserialize(byteArray);
            }
          });
        });
      } else {
        throw new Error("Connected wallet does not support signing transactions");
      }
    } catch (error) {
      throw new WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
    }
  });
}, _BaseSolanaMobileWalletAdapter_runWithGuard = function _BaseSolanaMobileWalletAdapter_runWithGuard2(callback) {
  return __awaiter4(this, void 0, void 0, function* () {
    try {
      return yield callback();
    } catch (e) {
      this.emit("error", e);
      throw e;
    }
  });
};
var LocalSolanaMobileWalletAdapter = class extends BaseSolanaMobileWalletAdapter {
  constructor(config) {
    var _a;
    const chain = chainOrClusterToChainId((_a = config.chain) !== null && _a !== void 0 ? _a : config.cluster);
    super(new LocalSolanaMobileWalletAdapterWallet({
      appIdentity: config.appIdentity,
      authorizationCache: {
        set: config.authorizationResultCache.set,
        get: () => __awaiter4(this, void 0, void 0, function* () {
          const authorizationResult = yield config.authorizationResultCache.get();
          if (authorizationResult && "chain" in authorizationResult) {
            return authorizationResult;
          } else if (authorizationResult) {
            return Object.assign(Object.assign({}, authorizationResult), { chain });
          } else
            return void 0;
        }),
        clear: config.authorizationResultCache.clear
      },
      chains: [chain],
      chainSelector: createDefaultChainSelector(),
      onWalletNotFound: () => __awaiter4(this, void 0, void 0, function* () {
        config.onWalletNotFound(this);
      })
    }), {
      addressSelector: config.addressSelector,
      chain
    });
  }
};
var SolanaMobileWalletAdapter = class extends LocalSolanaMobileWalletAdapter {
};
function createDefaultAddressSelector() {
  return {
    select(addresses) {
      return __awaiter4(this, void 0, void 0, function* () {
        return addresses[0];
      });
    }
  };
}
function createDefaultAuthorizationResultCache() {
  return createDefaultAuthorizationCache();
}
function defaultWalletNotFoundHandler(mobileWalletAdapter) {
  return __awaiter4(this, void 0, void 0, function* () {
    return defaultErrorModalWalletNotFoundHandler();
  });
}
function createDefaultWalletNotFoundHandler() {
  return defaultWalletNotFoundHandler;
}

// node_modules/@solana/wallet-standard-wallet-adapter-react/node_modules/@solana/wallet-standard-wallet-adapter-base/lib/esm/adapter.js
init_index_browser_esm();

// node_modules/@solana/wallet-standard-wallet-adapter-react/node_modules/base-x/src/esm/index.js
function base(ALPHABET2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  const BASE_MAP = new Uint8Array(256);
  for (let j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (let i = 0; i < ALPHABET2.length; i++) {
    const x = ALPHABET2.charAt(i);
    const xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  const BASE = ALPHABET2.length;
  const LEADER = ALPHABET2.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256);
  const iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array) {
    } else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    const size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    const b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      let carry = source[pbegin];
      let i = 0;
      for (let it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i;
      pbegin++;
    }
    let it2 = size - length;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    let str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET2.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    let psz = 0;
    let zeroes = 0;
    let length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    const size = (source.length - psz) * FACTOR + 1 >>> 0;
    const b256 = new Uint8Array(size);
    while (psz < source.length) {
      const charCode = source.charCodeAt(psz);
      if (charCode > 255) {
        return;
      }
      let carry = BASE_MAP[charCode];
      if (carry === 255) {
        return;
      }
      let i = 0;
      for (let it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i;
      psz++;
    }
    let it4 = size - length;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    const vch = new Uint8Array(zeroes + (size - it4));
    let j = zeroes;
    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }
    return vch;
  }
  function decode(string) {
    const buffer = decodeUnsafe(string);
    if (buffer) {
      return buffer;
    }
    throw new Error("Non-base" + BASE + " character");
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode
  };
}
var esm_default = base;

// node_modules/@solana/wallet-standard-wallet-adapter-react/node_modules/bs58/src/esm/index.js
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var esm_default2 = esm_default(ALPHABET);

// node_modules/@solana/wallet-standard-wallet-adapter-react/node_modules/@solana/wallet-standard-wallet-adapter-base/lib/esm/adapter.js
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _StandardWalletAdapter_instances;
var _StandardWalletAdapter_account;
var _StandardWalletAdapter_publicKey;
var _StandardWalletAdapter_connecting;
var _StandardWalletAdapter_disconnecting;
var _StandardWalletAdapter_off;
var _StandardWalletAdapter_supportedTransactionVersions;
var _StandardWalletAdapter_wallet;
var _StandardWalletAdapter_readyState;
var _StandardWalletAdapter_connect;
var _StandardWalletAdapter_connected;
var _StandardWalletAdapter_disconnected;
var _StandardWalletAdapter_reset;
var _StandardWalletAdapter_changed;
var _StandardWalletAdapter_signTransaction;
var _StandardWalletAdapter_signAllTransactions;
var _StandardWalletAdapter_signMessage;
var _StandardWalletAdapter_signIn;
var StandardWalletAdapter = class extends BaseWalletAdapter {
  get name() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").name;
  }
  get url() {
    return "https://github.com/solana-labs/wallet-standard";
  }
  get icon() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").icon;
  }
  get readyState() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_readyState, "f");
  }
  get publicKey() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_publicKey, "f");
  }
  get connecting() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_connecting, "f");
  }
  get supportedTransactionVersions() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_supportedTransactionVersions, "f");
  }
  get wallet() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f");
  }
  get standard() {
    return true;
  }
  constructor({ wallet }) {
    super();
    _StandardWalletAdapter_instances.add(this);
    _StandardWalletAdapter_account.set(this, void 0);
    _StandardWalletAdapter_publicKey.set(this, void 0);
    _StandardWalletAdapter_connecting.set(this, void 0);
    _StandardWalletAdapter_disconnecting.set(this, void 0);
    _StandardWalletAdapter_off.set(this, void 0);
    _StandardWalletAdapter_supportedTransactionVersions.set(this, void 0);
    _StandardWalletAdapter_wallet.set(this, void 0);
    _StandardWalletAdapter_readyState.set(this, typeof window === "undefined" || typeof document === "undefined" ? WalletReadyState.Unsupported : WalletReadyState.Installed);
    _StandardWalletAdapter_changed.set(this, (properties) => {
      if ("accounts" in properties) {
        const account = __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").accounts[0];
        if (__classPrivateFieldGet2(this, _StandardWalletAdapter_account, "f") && !__classPrivateFieldGet2(this, _StandardWalletAdapter_disconnecting, "f") && account !== __classPrivateFieldGet2(this, _StandardWalletAdapter_account, "f")) {
          if (account) {
            __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, account);
          } else {
            this.emit("error", new WalletDisconnectedError());
            __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
          }
        }
      }
      if ("features" in properties) {
        __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_reset).call(this);
      }
    });
    __classPrivateFieldSet2(this, _StandardWalletAdapter_wallet, wallet, "f");
    __classPrivateFieldSet2(this, _StandardWalletAdapter_account, null, "f");
    __classPrivateFieldSet2(this, _StandardWalletAdapter_publicKey, null, "f");
    __classPrivateFieldSet2(this, _StandardWalletAdapter_connecting, false, "f");
    __classPrivateFieldSet2(this, _StandardWalletAdapter_disconnecting, false, "f");
    __classPrivateFieldSet2(this, _StandardWalletAdapter_off, __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[StandardEvents].on("change", __classPrivateFieldGet2(this, _StandardWalletAdapter_changed, "f")), "f");
    __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_reset).call(this);
  }
  destroy() {
    __classPrivateFieldSet2(this, _StandardWalletAdapter_account, null, "f");
    __classPrivateFieldSet2(this, _StandardWalletAdapter_publicKey, null, "f");
    __classPrivateFieldSet2(this, _StandardWalletAdapter_connecting, false, "f");
    __classPrivateFieldSet2(this, _StandardWalletAdapter_disconnecting, false, "f");
    const off = __classPrivateFieldGet2(this, _StandardWalletAdapter_off, "f");
    if (off) {
      __classPrivateFieldSet2(this, _StandardWalletAdapter_off, null, "f");
      off();
    }
  }
  async autoConnect() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connect).call(this, { silent: true });
  }
  async connect() {
    return __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connect).call(this);
  }
  async disconnect() {
    if (StandardDisconnect in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features) {
      try {
        __classPrivateFieldSet2(this, _StandardWalletAdapter_disconnecting, true, "f");
        await __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[StandardDisconnect].disconnect();
      } catch (error) {
        this.emit("error", new WalletDisconnectionError(error == null ? void 0 : error.message, error));
      } finally {
        __classPrivateFieldSet2(this, _StandardWalletAdapter_disconnecting, false, "f");
      }
    }
    __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
  }
  async sendTransaction(transaction, connection, options = {}) {
    try {
      const account = __classPrivateFieldGet2(this, _StandardWalletAdapter_account, "f");
      if (!account)
        throw new WalletNotConnectedError();
      let feature;
      if (SolanaSignAndSendTransaction in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features) {
        if (account.features.includes(SolanaSignAndSendTransaction)) {
          feature = SolanaSignAndSendTransaction;
        } else if (SolanaSignTransaction in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features && account.features.includes(SolanaSignTransaction)) {
          feature = SolanaSignTransaction;
        } else {
          throw new WalletAccountError();
        }
      } else if (SolanaSignTransaction in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features) {
        if (!account.features.includes(SolanaSignTransaction))
          throw new WalletAccountError();
        feature = SolanaSignTransaction;
      } else {
        throw new WalletConfigError();
      }
      const chain = getChainForEndpoint(connection.rpcEndpoint);
      if (!account.chains.includes(chain))
        throw new WalletSendTransactionError();
      try {
        const { signers, ...sendOptions } = options;
        let serializedTransaction;
        if (isVersionedTransaction(transaction)) {
          (signers == null ? void 0 : signers.length) && transaction.sign(signers);
          serializedTransaction = transaction.serialize();
        } else {
          transaction = await this.prepareTransaction(transaction, connection, sendOptions);
          (signers == null ? void 0 : signers.length) && transaction.partialSign(...signers);
          serializedTransaction = new Uint8Array(transaction.serialize({
            requireAllSignatures: false,
            verifySignatures: false
          }));
        }
        if (feature === SolanaSignAndSendTransaction) {
          const [output] = await __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignAndSendTransaction].signAndSendTransaction({
            account,
            chain,
            transaction: serializedTransaction,
            options: {
              preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment),
              skipPreflight: sendOptions.skipPreflight,
              maxRetries: sendOptions.maxRetries,
              minContextSlot: sendOptions.minContextSlot
            }
          });
          return esm_default2.encode(output.signature);
        } else {
          const [output] = await __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction({
            account,
            chain,
            transaction: serializedTransaction,
            options: {
              preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment),
              minContextSlot: sendOptions.minContextSlot
            }
          });
          return await connection.sendRawTransaction(output.signedTransaction, {
            ...sendOptions,
            preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment)
          });
        }
      } catch (error) {
        if (error instanceof WalletError)
          throw error;
        throw new WalletSendTransactionError(error == null ? void 0 : error.message, error);
      }
    } catch (error) {
      this.emit("error", error);
      throw error;
    }
  }
};
_StandardWalletAdapter_account = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_publicKey = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_connecting = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_disconnecting = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_off = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_supportedTransactionVersions = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_wallet = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_readyState = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_changed = /* @__PURE__ */ new WeakMap(), _StandardWalletAdapter_instances = /* @__PURE__ */ new WeakSet(), _StandardWalletAdapter_connect = async function _StandardWalletAdapter_connect2(input) {
  try {
    if (this.connected || this.connecting)
      return;
    if (__classPrivateFieldGet2(this, _StandardWalletAdapter_readyState, "f") !== WalletReadyState.Installed)
      throw new WalletNotReadyError();
    __classPrivateFieldSet2(this, _StandardWalletAdapter_connecting, true, "f");
    if (!__classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").accounts.length) {
      try {
        await __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[StandardConnect].connect(input);
      } catch (error) {
        throw new WalletConnectionError(error == null ? void 0 : error.message, error);
      }
    }
    const account = __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").accounts[0];
    if (!account)
      throw new WalletAccountError();
    __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, account);
  } catch (error) {
    this.emit("error", error);
    throw error;
  } finally {
    __classPrivateFieldSet2(this, _StandardWalletAdapter_connecting, false, "f");
  }
}, _StandardWalletAdapter_connected = function _StandardWalletAdapter_connected2(account) {
  let publicKey;
  try {
    publicKey = new PublicKey(account.address);
  } catch (error) {
    throw new WalletPublicKeyError(error == null ? void 0 : error.message, error);
  }
  __classPrivateFieldSet2(this, _StandardWalletAdapter_account, account, "f");
  __classPrivateFieldSet2(this, _StandardWalletAdapter_publicKey, publicKey, "f");
  __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_reset).call(this);
  this.emit("connect", publicKey);
}, _StandardWalletAdapter_disconnected = function _StandardWalletAdapter_disconnected2() {
  __classPrivateFieldSet2(this, _StandardWalletAdapter_account, null, "f");
  __classPrivateFieldSet2(this, _StandardWalletAdapter_publicKey, null, "f");
  __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_reset).call(this);
  this.emit("disconnect");
}, _StandardWalletAdapter_reset = function _StandardWalletAdapter_reset2() {
  var _a, _b;
  const supportedTransactionVersions = SolanaSignAndSendTransaction in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features ? __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignAndSendTransaction].supportedTransactionVersions : __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].supportedTransactionVersions;
  __classPrivateFieldSet2(this, _StandardWalletAdapter_supportedTransactionVersions, arraysEqual(supportedTransactionVersions, ["legacy"]) ? null : new Set(supportedTransactionVersions), "f");
  if (SolanaSignTransaction in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features && ((_a = __classPrivateFieldGet2(this, _StandardWalletAdapter_account, "f")) == null ? void 0 : _a.features.includes(SolanaSignTransaction))) {
    this.signTransaction = __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signTransaction);
    this.signAllTransactions = __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signAllTransactions);
  } else {
    delete this.signTransaction;
    delete this.signAllTransactions;
  }
  if (SolanaSignMessage in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features && ((_b = __classPrivateFieldGet2(this, _StandardWalletAdapter_account, "f")) == null ? void 0 : _b.features.includes(SolanaSignMessage))) {
    this.signMessage = __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signMessage);
  } else {
    delete this.signMessage;
  }
  if (SolanaSignIn in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features) {
    this.signIn = __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signIn);
  } else {
    delete this.signIn;
  }
}, _StandardWalletAdapter_signTransaction = async function _StandardWalletAdapter_signTransaction2(transaction) {
  try {
    const account = __classPrivateFieldGet2(this, _StandardWalletAdapter_account, "f");
    if (!account)
      throw new WalletNotConnectedError();
    if (!(SolanaSignTransaction in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features))
      throw new WalletConfigError();
    if (!account.features.includes(SolanaSignTransaction))
      throw new WalletAccountError();
    try {
      const signedTransactions = await __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction({
        account,
        transaction: isVersionedTransaction(transaction) ? transaction.serialize() : new Uint8Array(transaction.serialize({
          requireAllSignatures: false,
          verifySignatures: false
        }))
      });
      const serializedTransaction = signedTransactions[0].signedTransaction;
      return isVersionedTransaction(transaction) ? VersionedTransaction.deserialize(serializedTransaction) : Transaction.from(serializedTransaction);
    } catch (error) {
      if (error instanceof WalletError)
        throw error;
      throw new WalletSignTransactionError(error == null ? void 0 : error.message, error);
    }
  } catch (error) {
    this.emit("error", error);
    throw error;
  }
}, _StandardWalletAdapter_signAllTransactions = async function _StandardWalletAdapter_signAllTransactions2(transactions) {
  try {
    const account = __classPrivateFieldGet2(this, _StandardWalletAdapter_account, "f");
    if (!account)
      throw new WalletNotConnectedError();
    if (!(SolanaSignTransaction in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features))
      throw new WalletConfigError();
    if (!account.features.includes(SolanaSignTransaction))
      throw new WalletAccountError();
    try {
      const signedTransactions = await __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction(...transactions.map((transaction) => ({
        account,
        transaction: isVersionedTransaction(transaction) ? transaction.serialize() : new Uint8Array(transaction.serialize({
          requireAllSignatures: false,
          verifySignatures: false
        }))
      })));
      return transactions.map((transaction, index) => {
        const signedTransaction = signedTransactions[index].signedTransaction;
        return isVersionedTransaction(transaction) ? VersionedTransaction.deserialize(signedTransaction) : Transaction.from(signedTransaction);
      });
    } catch (error) {
      throw new WalletSignTransactionError(error == null ? void 0 : error.message, error);
    }
  } catch (error) {
    this.emit("error", error);
    throw error;
  }
}, _StandardWalletAdapter_signMessage = async function _StandardWalletAdapter_signMessage2(message) {
  try {
    const account = __classPrivateFieldGet2(this, _StandardWalletAdapter_account, "f");
    if (!account)
      throw new WalletNotConnectedError();
    if (!(SolanaSignMessage in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features))
      throw new WalletConfigError();
    if (!account.features.includes(SolanaSignMessage))
      throw new WalletAccountError();
    try {
      const signedMessages = await __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignMessage].signMessage({
        account,
        message
      });
      return signedMessages[0].signature;
    } catch (error) {
      throw new WalletSignMessageError(error == null ? void 0 : error.message, error);
    }
  } catch (error) {
    this.emit("error", error);
    throw error;
  }
}, _StandardWalletAdapter_signIn = async function _StandardWalletAdapter_signIn2(input = {}) {
  try {
    if (!(SolanaSignIn in __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features))
      throw new WalletConfigError();
    let output;
    try {
      [output] = await __classPrivateFieldGet2(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignIn].signIn(input);
    } catch (error) {
      throw new WalletSignInError(error == null ? void 0 : error.message, error);
    }
    if (!output)
      throw new WalletSignInError();
    __classPrivateFieldGet2(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, output.account);
    return output;
  } catch (error) {
    this.emit("error", error);
    throw error;
  }
};

// node_modules/@solana/wallet-standard-wallet-adapter-react/node_modules/@solana/wallet-standard-wallet-adapter-base/lib/esm/types.js
var isWalletAdapterCompatibleWallet = isWalletAdapterCompatibleStandardWallet;

// node_modules/@solana/wallet-standard-wallet-adapter-react/node_modules/@solana/wallet-standard-wallet-adapter-base/lib/esm/wallet.js
init_index_browser_esm();

// node_modules/@wallet-standard/app/lib/esm/wallets.js
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet3 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _AppReadyEvent_detail;
var wallets = void 0;
var registeredWalletsSet = /* @__PURE__ */ new Set();
function addRegisteredWallet(wallet) {
  cachedWalletsArray = void 0;
  registeredWalletsSet.add(wallet);
}
function removeRegisteredWallet(wallet) {
  cachedWalletsArray = void 0;
  registeredWalletsSet.delete(wallet);
}
var listeners = {};
function getWallets() {
  if (wallets)
    return wallets;
  wallets = Object.freeze({ register, get, on });
  if (typeof window === "undefined")
    return wallets;
  const api = Object.freeze({ register });
  try {
    window.addEventListener("wallet-standard:register-wallet", ({ detail: callback }) => callback(api));
  } catch (error) {
    console.error("wallet-standard:register-wallet event listener could not be added\n", error);
  }
  try {
    window.dispatchEvent(new AppReadyEvent(api));
  } catch (error) {
    console.error("wallet-standard:app-ready event could not be dispatched\n", error);
  }
  return wallets;
}
function register(...wallets2) {
  var _a;
  wallets2 = wallets2.filter((wallet) => !registeredWalletsSet.has(wallet));
  if (!wallets2.length)
    return () => {
    };
  wallets2.forEach((wallet) => addRegisteredWallet(wallet));
  (_a = listeners["register"]) == null ? void 0 : _a.forEach((listener) => guard(() => listener(...wallets2)));
  return function unregister() {
    var _a2;
    wallets2.forEach((wallet) => removeRegisteredWallet(wallet));
    (_a2 = listeners["unregister"]) == null ? void 0 : _a2.forEach((listener) => guard(() => listener(...wallets2)));
  };
}
var cachedWalletsArray;
function get() {
  if (!cachedWalletsArray) {
    cachedWalletsArray = [...registeredWalletsSet];
  }
  return cachedWalletsArray;
}
function on(event, listener) {
  var _a;
  ((_a = listeners[event]) == null ? void 0 : _a.push(listener)) || (listeners[event] = [listener]);
  return function off() {
    var _a2;
    listeners[event] = (_a2 = listeners[event]) == null ? void 0 : _a2.filter((existingListener) => listener !== existingListener);
  };
}
function guard(callback) {
  try {
    callback();
  } catch (error) {
    console.error(error);
  }
}
var AppReadyEvent = class extends Event {
  get detail() {
    return __classPrivateFieldGet3(this, _AppReadyEvent_detail, "f");
  }
  get type() {
    return "wallet-standard:app-ready";
  }
  constructor(api) {
    super("wallet-standard:app-ready", {
      bubbles: false,
      cancelable: false,
      composed: false
    });
    _AppReadyEvent_detail.set(this, void 0);
    __classPrivateFieldSet3(this, _AppReadyEvent_detail, api, "f");
  }
  /** @deprecated */
  preventDefault() {
    throw new Error("preventDefault cannot be called");
  }
  /** @deprecated */
  stopImmediatePropagation() {
    throw new Error("stopImmediatePropagation cannot be called");
  }
  /** @deprecated */
  stopPropagation() {
    throw new Error("stopPropagation cannot be called");
  }
};
_AppReadyEvent_detail = /* @__PURE__ */ new WeakMap();
function DEPRECATED_getWallets() {
  if (wallets)
    return wallets;
  wallets = getWallets();
  if (typeof window === "undefined")
    return wallets;
  const callbacks = window.navigator.wallets || [];
  if (!Array.isArray(callbacks)) {
    console.error("window.navigator.wallets is not an array");
    return wallets;
  }
  const { register: register2 } = wallets;
  const push = (...callbacks2) => callbacks2.forEach((callback) => guard(() => callback({ register: register2 })));
  try {
    Object.defineProperty(window.navigator, "wallets", {
      value: Object.freeze({ push })
    });
  } catch (error) {
    console.error("window.navigator.wallets could not be set");
    return wallets;
  }
  push(...callbacks);
  return wallets;
}

// node_modules/@solana/wallet-standard-wallet-adapter-react/node_modules/@solana/wallet-standard-wallet-adapter-base/lib/esm/wallet.js
var __classPrivateFieldSet4 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SolanaWalletAdapterWalletAccount_adapter;
var _SolanaWalletAdapterWallet_instances;
var _SolanaWalletAdapterWallet_listeners;
var _SolanaWalletAdapterWallet_adapter;
var _SolanaWalletAdapterWallet_supportedTransactionVersions;
var _SolanaWalletAdapterWallet_chain;
var _SolanaWalletAdapterWallet_endpoint;
var _SolanaWalletAdapterWallet_account;
var _SolanaWalletAdapterWallet_connected;
var _SolanaWalletAdapterWallet_disconnected;
var _SolanaWalletAdapterWallet_connect;
var _SolanaWalletAdapterWallet_disconnect;
var _SolanaWalletAdapterWallet_on;
var _SolanaWalletAdapterWallet_emit;
var _SolanaWalletAdapterWallet_off;
var _SolanaWalletAdapterWallet_deserializeTransaction;
var _SolanaWalletAdapterWallet_signAndSendTransaction;
var _SolanaWalletAdapterWallet_signTransaction;
var _SolanaWalletAdapterWallet_signMessage;
var _SolanaWalletAdapterWallet_signIn;
var SolanaWalletAdapterWalletAccount = class _SolanaWalletAdapterWalletAccount extends ReadonlyWalletAccount {
  constructor({ adapter, address, publicKey, chains }) {
    const features = [SolanaSignAndSendTransaction];
    if ("signTransaction" in adapter) {
      features.push(SolanaSignTransaction);
    }
    if ("signMessage" in adapter) {
      features.push(SolanaSignMessage);
    }
    if ("signIn" in adapter) {
      features.push(SolanaSignIn);
    }
    super({ address, publicKey, chains, features });
    _SolanaWalletAdapterWalletAccount_adapter.set(this, void 0);
    if (new.target === _SolanaWalletAdapterWalletAccount) {
      Object.freeze(this);
    }
    __classPrivateFieldSet4(this, _SolanaWalletAdapterWalletAccount_adapter, adapter, "f");
  }
};
_SolanaWalletAdapterWalletAccount_adapter = /* @__PURE__ */ new WeakMap();
_SolanaWalletAdapterWallet_listeners = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_adapter = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_supportedTransactionVersions = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_chain = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_endpoint = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_account = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_connect = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_disconnect = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_on = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_signAndSendTransaction = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_signTransaction = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_signMessage = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_signIn = /* @__PURE__ */ new WeakMap(), _SolanaWalletAdapterWallet_instances = /* @__PURE__ */ new WeakSet(), _SolanaWalletAdapterWallet_connected = function _SolanaWalletAdapterWallet_connected2() {
  var _a;
  const publicKey = (_a = __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_adapter, "f").publicKey) == null ? void 0 : _a.toBytes();
  if (publicKey) {
    const address = __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_adapter, "f").publicKey.toBase58();
    const account = __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_account, "f");
    if (!account || account.address !== address || account.chains.includes(__classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_chain, "f")) || !bytesEqual(account.publicKey, publicKey)) {
      __classPrivateFieldSet4(this, _SolanaWalletAdapterWallet_account, new SolanaWalletAdapterWalletAccount({
        adapter: __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_adapter, "f"),
        address,
        publicKey,
        chains: [__classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_chain, "f")]
      }), "f");
      __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_emit).call(this, "change", { accounts: this.accounts });
    }
  }
}, _SolanaWalletAdapterWallet_disconnected = function _SolanaWalletAdapterWallet_disconnected2() {
  if (__classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_account, "f")) {
    __classPrivateFieldSet4(this, _SolanaWalletAdapterWallet_account, void 0, "f");
    __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_emit).call(this, "change", { accounts: this.accounts });
  }
}, _SolanaWalletAdapterWallet_emit = function _SolanaWalletAdapterWallet_emit2(event, ...args) {
  var _a;
  (_a = __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_listeners, "f")[event]) == null ? void 0 : _a.forEach((listener) => listener.apply(null, args));
}, _SolanaWalletAdapterWallet_off = function _SolanaWalletAdapterWallet_off2(event, listener) {
  var _a;
  __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_listeners, "f")[event] = (_a = __classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_listeners, "f")[event]) == null ? void 0 : _a.filter((existingListener) => listener !== existingListener);
}, _SolanaWalletAdapterWallet_deserializeTransaction = function _SolanaWalletAdapterWallet_deserializeTransaction2(serializedTransaction) {
  const transaction = VersionedTransaction.deserialize(serializedTransaction);
  if (!__classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_supportedTransactionVersions, "f").includes(transaction.version))
    throw new Error("unsupported transaction version");
  if (transaction.version === "legacy" && arraysEqual(__classPrivateFieldGet4(this, _SolanaWalletAdapterWallet_supportedTransactionVersions, "f"), ["legacy"]))
    return Transaction.from(serializedTransaction);
  return transaction;
};

// node_modules/@solana/wallet-standard-wallet-adapter-react/lib/esm/useStandardWalletAdapters.js
var import_react6 = __toESM(require_react(), 1);
function useStandardWalletAdapters(adapters) {
  const warnings = useConstant(() => /* @__PURE__ */ new Set());
  const { get: get2, on: on2 } = useConstant(() => DEPRECATED_getWallets());
  const [standardAdapters, setStandardAdapters] = (0, import_react6.useState)(() => wrapWalletsWithAdapters(get2()));
  (0, import_react6.useEffect)(() => {
    const listeners2 = [
      on2("register", (...wallets2) => setStandardAdapters((standardAdapters2) => [...standardAdapters2, ...wrapWalletsWithAdapters(wallets2)])),
      on2("unregister", (...wallets2) => setStandardAdapters((standardAdapters2) => standardAdapters2.filter((standardAdapter) => wallets2.some((wallet) => wallet === standardAdapter.wallet))))
    ];
    return () => listeners2.forEach((off) => off());
  }, [on2]);
  const prevStandardAdapters = usePrevious(standardAdapters);
  (0, import_react6.useEffect)(() => {
    if (!prevStandardAdapters)
      return;
    const currentAdapters = new Set(standardAdapters);
    const removedAdapters = new Set(prevStandardAdapters.filter((previousAdapter) => !currentAdapters.has(previousAdapter)));
    removedAdapters.forEach((adapter) => adapter.destroy());
  }, [prevStandardAdapters, standardAdapters]);
  (0, import_react6.useEffect)(() => () => standardAdapters.forEach((adapter) => adapter.destroy()), []);
  return (0, import_react6.useMemo)(() => [
    ...standardAdapters,
    ...adapters.filter(({ name }) => {
      if (standardAdapters.some((standardAdapter) => standardAdapter.name === name)) {
        if (!warnings.has(name)) {
          warnings.add(name);
          console.warn(`${name} was registered as a Standard Wallet. The Wallet Adapter for ${name} can be removed from your app.`);
        }
        return false;
      }
      return true;
    })
  ], [standardAdapters, adapters, warnings]);
}
function useConstant(fn) {
  const ref = (0, import_react6.useRef)(void 0);
  if (ref.current === void 0) {
    ref.current = { value: fn() };
  }
  return ref.current.value;
}
function usePrevious(state) {
  const ref = (0, import_react6.useRef)(void 0);
  (0, import_react6.useEffect)(() => {
    ref.current = state;
  });
  return ref.current;
}
function wrapWalletsWithAdapters(wallets2) {
  return wallets2.filter(isWalletAdapterCompatibleWallet).map((wallet) => new StandardWalletAdapter({ wallet }));
}

// node_modules/@solana/wallet-adapter-react/lib/esm/WalletProvider.js
var import_react8 = __toESM(require_react(), 1);

// node_modules/@solana/wallet-adapter-react/lib/esm/getEnvironment.js
var Environment;
(function(Environment2) {
  Environment2[Environment2["DESKTOP_WEB"] = 0] = "DESKTOP_WEB";
  Environment2[Environment2["MOBILE_WEB"] = 1] = "MOBILE_WEB";
})(Environment || (Environment = {}));
function isWebView(userAgentString) {
  return /(WebView|Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+))/i.test(userAgentString);
}
function getEnvironment({ adapters, userAgentString }) {
  if (adapters.some((adapter) => adapter.name !== SolanaMobileWalletAdapterWalletName2 && adapter.readyState === WalletReadyState.Installed)) {
    return Environment.DESKTOP_WEB;
  }
  if (userAgentString && // Step 1: Check whether we're on a platform that supports MWA at all.
  /android/i.test(userAgentString) && // Step 2: Determine that we are *not* running in a WebView.
  !isWebView(userAgentString)) {
    return Environment.MOBILE_WEB;
  } else {
    return Environment.DESKTOP_WEB;
  }
}

// node_modules/@solana/wallet-adapter-react/lib/esm/getInferredClusterFromEndpoint.js
function getInferredClusterFromEndpoint(endpoint) {
  if (!endpoint) {
    return "mainnet-beta";
  }
  if (/devnet/i.test(endpoint)) {
    return "devnet";
  } else if (/testnet/i.test(endpoint)) {
    return "testnet";
  } else {
    return "mainnet-beta";
  }
}

// node_modules/@solana/wallet-adapter-react/lib/esm/WalletProviderBase.js
var import_react7 = __toESM(require_react(), 1);
function WalletProviderBase({ children, wallets: adapters, adapter, isUnloadingRef, onAutoConnectRequest, onConnectError, onError, onSelectWallet }) {
  const isConnectingRef = (0, import_react7.useRef)(false);
  const [connecting, setConnecting] = (0, import_react7.useState)(false);
  const isDisconnectingRef = (0, import_react7.useRef)(false);
  const [disconnecting, setDisconnecting] = (0, import_react7.useState)(false);
  const [publicKey, setPublicKey] = (0, import_react7.useState)(() => (adapter == null ? void 0 : adapter.publicKey) ?? null);
  const [connected, setConnected] = (0, import_react7.useState)(() => (adapter == null ? void 0 : adapter.connected) ?? false);
  const onErrorRef = (0, import_react7.useRef)(onError);
  (0, import_react7.useEffect)(() => {
    onErrorRef.current = onError;
    return () => {
      onErrorRef.current = void 0;
    };
  }, [onError]);
  const handleErrorRef = (0, import_react7.useRef)((error, adapter2) => {
    if (!isUnloadingRef.current) {
      if (onErrorRef.current) {
        onErrorRef.current(error, adapter2);
      } else {
        console.error(error, adapter2);
        if (error instanceof WalletNotReadyError && typeof window !== "undefined" && adapter2) {
          window.open(adapter2.url, "_blank");
        }
      }
    }
    return error;
  });
  const [wallets2, setWallets] = (0, import_react7.useState)(() => adapters.map((adapter2) => ({
    adapter: adapter2,
    readyState: adapter2.readyState
  })).filter(({ readyState }) => readyState !== WalletReadyState.Unsupported));
  (0, import_react7.useEffect)(() => {
    setWallets((wallets3) => adapters.map((adapter2, index) => {
      const wallet2 = wallets3[index];
      return wallet2 && wallet2.adapter === adapter2 && wallet2.readyState === adapter2.readyState ? wallet2 : {
        adapter: adapter2,
        readyState: adapter2.readyState
      };
    }).filter(({ readyState }) => readyState !== WalletReadyState.Unsupported));
    function handleReadyStateChange(readyState) {
      setWallets((prevWallets) => {
        const index = prevWallets.findIndex(({ adapter: adapter3 }) => adapter3 === this);
        if (index === -1)
          return prevWallets;
        const { adapter: adapter2 } = prevWallets[index];
        return [
          ...prevWallets.slice(0, index),
          { adapter: adapter2, readyState },
          ...prevWallets.slice(index + 1)
        ].filter(({ readyState: readyState2 }) => readyState2 !== WalletReadyState.Unsupported);
      });
    }
    adapters.forEach((adapter2) => adapter2.on("readyStateChange", handleReadyStateChange, adapter2));
    return () => {
      adapters.forEach((adapter2) => adapter2.off("readyStateChange", handleReadyStateChange, adapter2));
    };
  }, [adapter, adapters]);
  const wallet = (0, import_react7.useMemo)(() => wallets2.find((wallet2) => wallet2.adapter === adapter) ?? null, [adapter, wallets2]);
  (0, import_react7.useEffect)(() => {
    if (!adapter)
      return;
    const handleConnect2 = (publicKey2) => {
      setPublicKey(publicKey2);
      isConnectingRef.current = false;
      setConnecting(false);
      setConnected(true);
      isDisconnectingRef.current = false;
      setDisconnecting(false);
    };
    const handleDisconnect2 = () => {
      if (isUnloadingRef.current)
        return;
      setPublicKey(null);
      isConnectingRef.current = false;
      setConnecting(false);
      setConnected(false);
      isDisconnectingRef.current = false;
      setDisconnecting(false);
    };
    const handleError = (error) => {
      handleErrorRef.current(error, adapter);
    };
    adapter.on("connect", handleConnect2);
    adapter.on("disconnect", handleDisconnect2);
    adapter.on("error", handleError);
    return () => {
      adapter.off("connect", handleConnect2);
      adapter.off("disconnect", handleDisconnect2);
      adapter.off("error", handleError);
      handleDisconnect2();
    };
  }, [adapter, isUnloadingRef]);
  const didAttemptAutoConnectRef = (0, import_react7.useRef)(false);
  (0, import_react7.useEffect)(() => {
    return () => {
      didAttemptAutoConnectRef.current = false;
    };
  }, [adapter]);
  (0, import_react7.useEffect)(() => {
    if (didAttemptAutoConnectRef.current || isConnectingRef.current || connected || !onAutoConnectRequest || !((wallet == null ? void 0 : wallet.readyState) === WalletReadyState.Installed || (wallet == null ? void 0 : wallet.readyState) === WalletReadyState.Loadable))
      return;
    isConnectingRef.current = true;
    setConnecting(true);
    didAttemptAutoConnectRef.current = true;
    (async function() {
      try {
        await onAutoConnectRequest();
      } catch {
        onConnectError();
      } finally {
        setConnecting(false);
        isConnectingRef.current = false;
      }
    })();
  }, [connected, onAutoConnectRequest, onConnectError, wallet]);
  const sendTransaction = (0, import_react7.useCallback)(async (transaction, connection, options) => {
    if (!adapter)
      throw handleErrorRef.current(new WalletNotSelectedError());
    if (!connected)
      throw handleErrorRef.current(new WalletNotConnectedError(), adapter);
    return await adapter.sendTransaction(transaction, connection, options);
  }, [adapter, connected]);
  const signTransaction = (0, import_react7.useMemo)(() => adapter && "signTransaction" in adapter ? async (transaction) => {
    if (!connected)
      throw handleErrorRef.current(new WalletNotConnectedError(), adapter);
    return await adapter.signTransaction(transaction);
  } : void 0, [adapter, connected]);
  const signAllTransactions = (0, import_react7.useMemo)(() => adapter && "signAllTransactions" in adapter ? async (transactions) => {
    if (!connected)
      throw handleErrorRef.current(new WalletNotConnectedError(), adapter);
    return await adapter.signAllTransactions(transactions);
  } : void 0, [adapter, connected]);
  const signMessage = (0, import_react7.useMemo)(() => adapter && "signMessage" in adapter ? async (message) => {
    if (!connected)
      throw handleErrorRef.current(new WalletNotConnectedError(), adapter);
    return await adapter.signMessage(message);
  } : void 0, [adapter, connected]);
  const signIn = (0, import_react7.useMemo)(() => adapter && "signIn" in adapter ? async (input) => {
    return await adapter.signIn(input);
  } : void 0, [adapter]);
  const handleConnect = (0, import_react7.useCallback)(async () => {
    if (isConnectingRef.current || isDisconnectingRef.current || (wallet == null ? void 0 : wallet.adapter.connected))
      return;
    if (!wallet)
      throw handleErrorRef.current(new WalletNotSelectedError());
    const { adapter: adapter2, readyState } = wallet;
    if (!(readyState === WalletReadyState.Installed || readyState === WalletReadyState.Loadable))
      throw handleErrorRef.current(new WalletNotReadyError(), adapter2);
    isConnectingRef.current = true;
    setConnecting(true);
    try {
      await adapter2.connect();
    } catch (e) {
      onConnectError();
      throw e;
    } finally {
      setConnecting(false);
      isConnectingRef.current = false;
    }
  }, [onConnectError, wallet]);
  const handleDisconnect = (0, import_react7.useCallback)(async () => {
    if (isDisconnectingRef.current)
      return;
    if (!adapter)
      return;
    isDisconnectingRef.current = true;
    setDisconnecting(true);
    try {
      await adapter.disconnect();
    } finally {
      setDisconnecting(false);
      isDisconnectingRef.current = false;
    }
  }, [adapter]);
  return import_react7.default.createElement(WalletContext.Provider, { value: {
    autoConnect: !!onAutoConnectRequest,
    wallets: wallets2,
    wallet,
    publicKey,
    connected,
    connecting,
    disconnecting,
    select: onSelectWallet,
    connect: handleConnect,
    disconnect: handleDisconnect,
    sendTransaction,
    signTransaction,
    signAllTransactions,
    signMessage,
    signIn
  } }, children);
}

// node_modules/@solana/wallet-adapter-react/lib/esm/WalletProvider.js
var _userAgent;
function getUserAgent() {
  var _a;
  if (_userAgent === void 0) {
    _userAgent = ((_a = globalThis.navigator) == null ? void 0 : _a.userAgent) ?? null;
  }
  return _userAgent;
}
function getIsMobile(adapters) {
  const userAgentString = getUserAgent();
  return getEnvironment({ adapters, userAgentString }) === Environment.MOBILE_WEB;
}
function getUriForAppIdentity() {
  const location = globalThis.location;
  if (!location)
    return;
  return `${location.protocol}//${location.host}`;
}
function WalletProvider({ children, wallets: adapters, autoConnect, localStorageKey = "walletName", onError }) {
  const { connection } = useConnection();
  const adaptersWithStandardAdapters = useStandardWalletAdapters(adapters);
  const mobileWalletAdapter = (0, import_react8.useMemo)(() => {
    if (!getIsMobile(adaptersWithStandardAdapters)) {
      return null;
    }
    const existingMobileWalletAdapter = adaptersWithStandardAdapters.find((adapter2) => adapter2.name === SolanaMobileWalletAdapterWalletName2);
    if (existingMobileWalletAdapter) {
      return existingMobileWalletAdapter;
    }
    return new SolanaMobileWalletAdapter({
      addressSelector: createDefaultAddressSelector(),
      appIdentity: {
        uri: getUriForAppIdentity()
      },
      authorizationResultCache: createDefaultAuthorizationResultCache(),
      cluster: getInferredClusterFromEndpoint(connection == null ? void 0 : connection.rpcEndpoint),
      onWalletNotFound: createDefaultWalletNotFoundHandler()
    });
  }, [adaptersWithStandardAdapters, connection == null ? void 0 : connection.rpcEndpoint]);
  const adaptersWithMobileWalletAdapter = (0, import_react8.useMemo)(() => {
    if (mobileWalletAdapter == null || adaptersWithStandardAdapters.indexOf(mobileWalletAdapter) !== -1) {
      return adaptersWithStandardAdapters;
    }
    return [mobileWalletAdapter, ...adaptersWithStandardAdapters];
  }, [adaptersWithStandardAdapters, mobileWalletAdapter]);
  const [walletName, setWalletName] = useLocalStorage(localStorageKey, null);
  const adapter = (0, import_react8.useMemo)(() => adaptersWithMobileWalletAdapter.find((a) => a.name === walletName) ?? null, [adaptersWithMobileWalletAdapter, walletName]);
  const changeWallet = (0, import_react8.useCallback)((nextWalletName) => {
    if (walletName === nextWalletName)
      return;
    if (adapter && // Selecting a wallet other than the mobile wallet adapter is not
    // sufficient reason to call `disconnect` on the mobile wallet adapter.
    // Calling `disconnect` on the mobile wallet adapter causes the entire
    // authorization store to be wiped.
    adapter.name !== SolanaMobileWalletAdapterWalletName2) {
      adapter.disconnect();
    }
    setWalletName(nextWalletName);
  }, [adapter, setWalletName, walletName]);
  (0, import_react8.useEffect)(() => {
    if (!adapter)
      return;
    function handleDisconnect() {
      if (isUnloadingRef.current)
        return;
      setWalletName(null);
    }
    adapter.on("disconnect", handleDisconnect);
    return () => {
      adapter.off("disconnect", handleDisconnect);
    };
  }, [adapter, adaptersWithStandardAdapters, setWalletName, walletName]);
  const hasUserSelectedAWallet = (0, import_react8.useRef)(false);
  const handleAutoConnectRequest = (0, import_react8.useMemo)(() => {
    if (!autoConnect || !adapter)
      return;
    return async () => {
      if (autoConnect === true || await autoConnect(adapter)) {
        if (hasUserSelectedAWallet.current) {
          await adapter.connect();
        } else {
          await adapter.autoConnect();
        }
      }
    };
  }, [autoConnect, adapter]);
  const isUnloadingRef = (0, import_react8.useRef)(false);
  (0, import_react8.useEffect)(() => {
    if (walletName === SolanaMobileWalletAdapterWalletName2 && getIsMobile(adaptersWithStandardAdapters)) {
      isUnloadingRef.current = false;
      return;
    }
    function handleBeforeUnload() {
      isUnloadingRef.current = true;
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [adaptersWithStandardAdapters, walletName]);
  const handleConnectError = (0, import_react8.useCallback)(() => {
    if (adapter) {
      changeWallet(null);
    }
  }, [adapter, changeWallet]);
  const selectWallet = (0, import_react8.useCallback)((walletName2) => {
    hasUserSelectedAWallet.current = true;
    changeWallet(walletName2);
  }, [changeWallet]);
  return import_react8.default.createElement(WalletProviderBase, { wallets: adaptersWithMobileWalletAdapter, adapter, isUnloadingRef, onAutoConnectRequest: handleAutoConnectRequest, onConnectError: handleConnectError, onError, onSelectWallet: selectWallet }, children);
}

export {
  ConnectionContext,
  useConnection,
  ConnectionProvider,
  WalletNotSelectedError,
  WalletContext,
  useWallet,
  useAnchorWallet,
  useLocalStorage,
  WalletProvider
};
//# sourceMappingURL=chunk-OU7VRZ6A.js.map

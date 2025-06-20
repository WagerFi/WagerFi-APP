import {
  AsyncDirective,
  classMap,
  directive,
  ifDefined,
  property,
  state
} from "./chunk-ODNZ4PJ2.js";
import {
  require_dijkstra
} from "./chunk-NPFSRFYW.js";
import {
  ConnectorUtil,
  WalletUtil
} from "./chunk-5QHL57AY.js";
import {
  ApiController,
  AssetController,
  AssetUtil,
  ChainController,
  ConnectionController,
  ConnectorController,
  ConstantsUtil,
  ConstantsUtil2,
  CoreHelperUtil,
  EventsController,
  ModalController,
  OptionsController,
  RouterController,
  SnackController,
  StorageUtil,
  ThemeController,
  UiHelperUtil,
  colorStyles,
  customElement,
  elementStyles,
  resetStyles
} from "./chunk-TARECR2R.js";
import "./chunk-CZIQUEW2.js";
import {
  LitElement,
  css,
  html,
  nothing,
  svg
} from "./chunk-366LDVMV.js";
import "./chunk-KMQUIHVC.js";
import "./chunk-TWCWUMGZ.js";
import "./chunk-UASX4XJP.js";
import "./chunk-TIKO6UFQ.js";
import "./chunk-BWZI4TFE.js";
import "./chunk-ITOYII5B.js";
import "./chunk-N77D4CVZ.js";
import "./chunk-SQBP2HP4.js";
import "./chunk-KPHJQWGP.js";
import "./chunk-IBWGIHRU.js";
import "./chunk-VESSVHNC.js";
import "./chunk-Y5D73FR4.js";
import {
  __commonJS,
  __toESM
} from "./chunk-MVEJMUOB.js";

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/utils.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/galois-field.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/polynomial.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
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
    ReedSolomonEncoder.prototype.encode = function encode(data) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/regex.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/mode.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/version.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/format-info.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
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

// node_modules/encode-utf8/index.js
var require_encode_utf8 = __commonJS({
  "node_modules/encode-utf8/index.js"(exports, module) {
    "use strict";
    module.exports = function encodeUtf8(input) {
      var result = [];
      var size = input.length;
      for (var index = 0; index < size; index++) {
        var point = input.charCodeAt(index);
        if (point >= 55296 && point <= 56319 && size > index + 1) {
          var second = input.charCodeAt(index + 1);
          if (second >= 56320 && second <= 57343) {
            point = (point - 55296) * 1024 + second - 56320 + 65536;
            index += 1;
          }
        }
        if (point < 128) {
          result.push(point);
          continue;
        }
        if (point < 2048) {
          result.push(point >> 6 | 192);
          result.push(point & 63 | 128);
          continue;
        }
        if (point < 55296 || point >= 57344 && point < 65536) {
          result.push(point >> 12 | 224);
          result.push(point >> 6 & 63 | 128);
          result.push(point & 63 | 128);
          continue;
        }
        if (point >= 65536 && point <= 1114111) {
          result.push(point >> 18 | 240);
          result.push(point >> 12 & 63 | 128);
          result.push(point >> 6 & 63 | 128);
          result.push(point & 63 | 128);
          continue;
        }
        result.push(239, 191, 189);
      }
      return new Uint8Array(result).buffer;
    };
  }
});

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var encodeUtf8 = require_encode_utf8();
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        data = encodeUtf8(data);
      }
      this.data = new Uint8Array(data);
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/segments.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/core/qrcode.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/utils.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
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

// node_modules/@reown/appkit-ui/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/@reown/appkit-ui/node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode = require_qrcode();
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
            const data = QRCode.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-image/styles.js
var styles_default = css`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-image/index.js
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiWalletImage = class WuiWalletImage2 extends LitElement {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.name = "";
    this.installed = false;
    this.badgeSize = "xs";
  }
  render() {
    let borderRadius = "xxs";
    if (this.size === "lg") {
      borderRadius = "m";
    } else if (this.size === "md") {
      borderRadius = "xs";
    } else {
      borderRadius = "xxs";
    }
    this.style.cssText = `
       --local-border-radius: var(--wui-border-radius-${borderRadius});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `;
    if (this.walletIcon) {
      this.dataset["walletIcon"] = this.walletIcon;
    }
    return html`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `;
  }
  templateVisual() {
    if (this.imageSrc) {
      return html`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`;
    } else if (this.walletIcon) {
      return html`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`;
    }
    return html`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`;
  }
};
WuiWalletImage.styles = [elementStyles, resetStyles, styles_default];
__decorate([
  property()
], WuiWalletImage.prototype, "size", void 0);
__decorate([
  property()
], WuiWalletImage.prototype, "name", void 0);
__decorate([
  property()
], WuiWalletImage.prototype, "imageSrc", void 0);
__decorate([
  property()
], WuiWalletImage.prototype, "walletIcon", void 0);
__decorate([
  property({ type: Boolean })
], WuiWalletImage.prototype, "installed", void 0);
__decorate([
  property()
], WuiWalletImage.prototype, "badgeSize", void 0);
WuiWalletImage = __decorate([
  customElement("wui-wallet-image")
], WuiWalletImage);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-all-wallets-image/styles.js
var styles_default2 = css`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-all-wallets-image/index.js
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TOTAL_IMAGES = 4;
var WuiAllWalletsImage = class WuiAllWalletsImage2 extends LitElement {
  constructor() {
    super(...arguments);
    this.walletImages = [];
  }
  render() {
    const isPlaceholders = this.walletImages.length < TOTAL_IMAGES;
    return html`${this.walletImages.slice(0, TOTAL_IMAGES).map(({ src, walletName }) => html`
            <wui-wallet-image
              size="inherit"
              imageSrc=${src}
              name=${ifDefined(walletName)}
            ></wui-wallet-image>
          `)}
      ${isPlaceholders ? [...Array(TOTAL_IMAGES - this.walletImages.length)].map(() => html` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`) : null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`;
  }
};
WuiAllWalletsImage.styles = [resetStyles, styles_default2];
__decorate2([
  property({ type: Array })
], WuiAllWalletsImage.prototype, "walletImages", void 0);
WuiAllWalletsImage = __decorate2([
  customElement("wui-all-wallets-image")
], WuiAllWalletsImage);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-wallet/styles.js
var styles_default3 = css`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-wallet/index.js
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiListWallet = class WuiListWallet2 extends LitElement {
  constructor() {
    super(...arguments);
    this.walletImages = [];
    this.imageSrc = "";
    this.name = "";
    this.tabIdx = void 0;
    this.installed = false;
    this.disabled = false;
    this.showAllWallets = false;
    this.loading = false;
    this.loadingSpinnerColor = "accent-100";
  }
  render() {
    return html`
      <button ?disabled=${this.disabled} tabindex=${ifDefined(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `;
  }
  templateAllWallets() {
    if (this.showAllWallets && this.imageSrc) {
      return html` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `;
    } else if (this.showAllWallets && this.walletIcon) {
      return html` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `;
    }
    return null;
  }
  templateWalletImage() {
    if (!this.showAllWallets && this.imageSrc) {
      return html`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`;
    } else if (!this.showAllWallets && !this.imageSrc) {
      return html`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`;
    }
    return null;
  }
  templateStatus() {
    if (this.loading) {
      return html`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`;
    } else if (this.tagLabel && this.tagVariant) {
      return html`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`;
    } else if (this.icon) {
      return html`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`;
    }
    return null;
  }
};
WuiListWallet.styles = [resetStyles, elementStyles, styles_default3];
__decorate3([
  property({ type: Array })
], WuiListWallet.prototype, "walletImages", void 0);
__decorate3([
  property()
], WuiListWallet.prototype, "imageSrc", void 0);
__decorate3([
  property()
], WuiListWallet.prototype, "name", void 0);
__decorate3([
  property()
], WuiListWallet.prototype, "tagLabel", void 0);
__decorate3([
  property()
], WuiListWallet.prototype, "tagVariant", void 0);
__decorate3([
  property()
], WuiListWallet.prototype, "icon", void 0);
__decorate3([
  property()
], WuiListWallet.prototype, "walletIcon", void 0);
__decorate3([
  property()
], WuiListWallet.prototype, "tabIdx", void 0);
__decorate3([
  property({ type: Boolean })
], WuiListWallet.prototype, "installed", void 0);
__decorate3([
  property({ type: Boolean })
], WuiListWallet.prototype, "disabled", void 0);
__decorate3([
  property({ type: Boolean })
], WuiListWallet.prototype, "showAllWallets", void 0);
__decorate3([
  property({ type: Boolean })
], WuiListWallet.prototype, "loading", void 0);
__decorate3([
  property({ type: String })
], WuiListWallet.prototype, "loadingSpinnerColor", void 0);
WuiListWallet = __decorate3([
  customElement("wui-list-wallet")
], WuiListWallet);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-widget/index.js
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mAllWalletsWidget = class W3mAllWalletsWidget2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.count = ApiController.state.count;
    this.isFetchingRecommendedWallets = ApiController.state.isFetchingRecommendedWallets;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val), ApiController.subscribeKey("count", (val) => this.count = val), ApiController.subscribeKey("isFetchingRecommendedWallets", (val) => this.isFetchingRecommendedWallets = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const wcConnector = this.connectors.find((c) => c.id === "walletConnect");
    const { allWallets } = OptionsController.state;
    if (!wcConnector || allWallets === "HIDE") {
      return null;
    }
    if (allWallets === "ONLY_MOBILE" && !CoreHelperUtil.isMobile()) {
      return null;
    }
    const featuredCount = ApiController.state.featured.length;
    const rawCount = this.count + featuredCount;
    const roundedCount = rawCount < 10 ? rawCount : Math.floor(rawCount / 10) * 10;
    const tagLabel = roundedCount < rawCount ? `${roundedCount}+` : `${roundedCount}`;
    return html`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${tagLabel}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${ifDefined(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets ? "fg-300" : "accent-100"}
      ></wui-list-wallet>
    `;
  }
  onAllWallets() {
    EventsController.sendEvent({ type: "track", event: "CLICK_ALL_WALLETS" });
    RouterController.push("AllWallets");
  }
};
__decorate4([
  property()
], W3mAllWalletsWidget.prototype, "tabIdx", void 0);
__decorate4([
  state()
], W3mAllWalletsWidget.prototype, "connectors", void 0);
__decorate4([
  state()
], W3mAllWalletsWidget.prototype, "count", void 0);
__decorate4([
  state()
], W3mAllWalletsWidget.prototype, "isFetchingRecommendedWallets", void 0);
W3mAllWalletsWidget = __decorate4([
  customElement("w3m-all-wallets-widget")
], W3mAllWalletsWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-announced-widget/index.js
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectAnnouncedWidget = class W3mConnectAnnouncedWidget2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const announcedConnectors = this.connectors.filter((connector) => connector.type === "ANNOUNCED");
    if (!(announcedConnectors == null ? void 0 : announcedConnectors.length)) {
      this.style.cssText = `display: none`;
      return null;
    }
    return html`
      <wui-flex flexDirection="column" gap="xs">
        ${announcedConnectors.filter(ConnectorUtil.showConnector).map((connector) => html`
              <wui-list-wallet
                imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
                name=${connector.name ?? "Unknown"}
                @click=${() => this.onConnector(connector)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${connector.id}`}
                .installed=${true}
                tabIdx=${ifDefined(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `;
  }
  onConnector(connector) {
    if (connector.id === "walletConnect") {
      if (CoreHelperUtil.isMobile()) {
        RouterController.push("AllWallets");
      } else {
        RouterController.push("ConnectingWalletConnect");
      }
    } else {
      RouterController.push("ConnectingExternal", { connector });
    }
  }
};
__decorate5([
  property()
], W3mConnectAnnouncedWidget.prototype, "tabIdx", void 0);
__decorate5([
  state()
], W3mConnectAnnouncedWidget.prototype, "connectors", void 0);
W3mConnectAnnouncedWidget = __decorate5([
  customElement("w3m-connect-announced-widget")
], W3mConnectAnnouncedWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-custom-widget/index.js
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectCustomWidget = class W3mConnectCustomWidget2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.loading = false;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val));
    if (CoreHelperUtil.isTelegram() && CoreHelperUtil.isIos()) {
      this.loading = !ConnectionController.state.wcUri;
      this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", (val) => this.loading = !val));
    }
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { customWallets } = OptionsController.state;
    if (!(customWallets == null ? void 0 : customWallets.length)) {
      this.style.cssText = `display: none`;
      return null;
    }
    const wallets = this.filterOutDuplicateWallets(customWallets);
    return html`<wui-flex flexDirection="column" gap="xs">
      ${wallets.map((wallet) => html`
          <wui-list-wallet
            imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
            name=${wallet.name ?? "Unknown"}
            @click=${() => this.onConnectWallet(wallet)}
            data-testid=${`wallet-selector-${wallet.id}`}
            tabIdx=${ifDefined(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`;
  }
  filterOutDuplicateWallets(wallets) {
    const recent = StorageUtil.getRecentWallets();
    const connectorRDNSs = this.connectors.map((connector) => {
      var _a;
      return (_a = connector.info) == null ? void 0 : _a.rdns;
    }).filter(Boolean);
    const recentRDNSs = recent.map((wallet) => wallet.rdns).filter(Boolean);
    const allRDNSs = connectorRDNSs.concat(recentRDNSs);
    if (allRDNSs.includes("io.metamask.mobile") && CoreHelperUtil.isMobile()) {
      const index = allRDNSs.indexOf("io.metamask.mobile");
      allRDNSs[index] = "io.metamask";
    }
    const filtered = wallets.filter((wallet) => !allRDNSs.includes(String(wallet == null ? void 0 : wallet.rdns)));
    return filtered;
  }
  onConnectWallet(wallet) {
    if (this.loading) {
      return;
    }
    RouterController.push("ConnectingWalletConnect", { wallet });
  }
};
__decorate6([
  property()
], W3mConnectCustomWidget.prototype, "tabIdx", void 0);
__decorate6([
  state()
], W3mConnectCustomWidget.prototype, "connectors", void 0);
__decorate6([
  state()
], W3mConnectCustomWidget.prototype, "loading", void 0);
W3mConnectCustomWidget = __decorate6([
  customElement("w3m-connect-custom-widget")
], W3mConnectCustomWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-external-widget/index.js
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectExternalWidget = class W3mConnectExternalWidget2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const externalConnectors = this.connectors.filter((connector) => connector.type === "EXTERNAL");
    const filteredOutCoinbaseConnectors = externalConnectors.filter((connector) => connector.id !== ConstantsUtil.CONNECTOR_ID.COINBASE_SDK);
    if (!(filteredOutCoinbaseConnectors == null ? void 0 : filteredOutCoinbaseConnectors.length)) {
      this.style.cssText = `display: none`;
      return null;
    }
    return html`
      <wui-flex flexDirection="column" gap="xs">
        ${filteredOutCoinbaseConnectors.map((connector) => html`
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? "Unknown"}
              data-testid=${`wallet-selector-external-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${ifDefined(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
  }
  onConnector(connector) {
    RouterController.push("ConnectingExternal", { connector });
  }
};
__decorate7([
  property()
], W3mConnectExternalWidget.prototype, "tabIdx", void 0);
__decorate7([
  state()
], W3mConnectExternalWidget.prototype, "connectors", void 0);
W3mConnectExternalWidget = __decorate7([
  customElement("w3m-connect-external-widget")
], W3mConnectExternalWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-featured-widget/index.js
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectFeaturedWidget = class W3mConnectFeaturedWidget2 extends LitElement {
  constructor() {
    super(...arguments);
    this.tabIdx = void 0;
    this.wallets = [];
  }
  render() {
    if (!this.wallets.length) {
      this.style.cssText = `display: none`;
      return null;
    }
    return html`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map((wallet) => html`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${wallet.id}`}
              imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
              name=${wallet.name ?? "Unknown"}
              @click=${() => this.onConnectWallet(wallet)}
              tabIdx=${ifDefined(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
  }
  onConnectWallet(wallet) {
    ConnectorController.selectWalletConnector(wallet);
  }
};
__decorate8([
  property()
], W3mConnectFeaturedWidget.prototype, "tabIdx", void 0);
__decorate8([
  property()
], W3mConnectFeaturedWidget.prototype, "wallets", void 0);
W3mConnectFeaturedWidget = __decorate8([
  customElement("w3m-connect-featured-widget")
], W3mConnectFeaturedWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-injected-widget/index.js
var __decorate9 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectInjectedWidget = class W3mConnectInjectedWidget2 extends LitElement {
  constructor() {
    super(...arguments);
    this.tabIdx = void 0;
    this.connectors = [];
  }
  render() {
    var _a;
    const injectedConnectors = this.connectors;
    if (!(injectedConnectors == null ? void 0 : injectedConnectors.length) || injectedConnectors.length === 1 && ((_a = injectedConnectors[0]) == null ? void 0 : _a.name) === "Browser Wallet" && !CoreHelperUtil.isMobile()) {
      this.style.cssText = `display: none`;
      return null;
    }
    return html`
      <wui-flex flexDirection="column" gap="xs">
        ${injectedConnectors.map((connector) => {
      var _a2;
      const walletRDNS = (_a2 = connector.info) == null ? void 0 : _a2.rdns;
      if (!CoreHelperUtil.isMobile() && connector.name === "Browser Wallet") {
        return null;
      }
      if (!walletRDNS && !ConnectionController.checkInstalled()) {
        this.style.cssText = `display: none`;
        return null;
      }
      if (!ConnectorUtil.showConnector(connector)) {
        return null;
      }
      return html`
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? "Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${ifDefined(this.tabIdx)}
            >
            </wui-list-wallet>
          `;
    })}
      </wui-flex>
    `;
  }
  onConnector(connector) {
    ConnectorController.setActiveConnector(connector);
    RouterController.push("ConnectingExternal", { connector });
  }
};
__decorate9([
  property()
], W3mConnectInjectedWidget.prototype, "tabIdx", void 0);
__decorate9([
  property()
], W3mConnectInjectedWidget.prototype, "connectors", void 0);
W3mConnectInjectedWidget = __decorate9([
  customElement("w3m-connect-injected-widget")
], W3mConnectInjectedWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-multi-chain-widget/index.js
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectMultiChainWidget = class W3mConnectMultiChainWidget2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const multiChainConnectors = this.connectors.filter((connector) => connector.type === "MULTI_CHAIN" && connector.name !== "WalletConnect");
    if (!(multiChainConnectors == null ? void 0 : multiChainConnectors.length)) {
      this.style.cssText = `display: none`;
      return null;
    }
    return html`
      <wui-flex flexDirection="column" gap="xs">
        ${multiChainConnectors.map((connector) => html`
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? "Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${ifDefined(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
  }
  onConnector(connector) {
    ConnectorController.setActiveConnector(connector);
    RouterController.push("ConnectingMultiChain");
  }
};
__decorate10([
  property()
], W3mConnectMultiChainWidget.prototype, "tabIdx", void 0);
__decorate10([
  state()
], W3mConnectMultiChainWidget.prototype, "connectors", void 0);
W3mConnectMultiChainWidget = __decorate10([
  customElement("w3m-connect-multi-chain-widget")
], W3mConnectMultiChainWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-recent-widget/index.js
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectRecentWidget = class W3mConnectRecentWidget2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.loading = false;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val));
    if (CoreHelperUtil.isTelegram() && CoreHelperUtil.isIos()) {
      this.loading = !ConnectionController.state.wcUri;
      this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", (val) => this.loading = !val));
    }
  }
  render() {
    const recentWallets = StorageUtil.getRecentWallets();
    const filteredRecentWallets = recentWallets.filter((wallet) => !this.connectors.some((connector) => connector.id === wallet.id || connector.name === wallet.name));
    if (!filteredRecentWallets.length) {
      this.style.cssText = `display: none`;
      return null;
    }
    return html`
      <wui-flex flexDirection="column" gap="xs">
        ${filteredRecentWallets.map((wallet) => html`
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
              name=${wallet.name ?? "Unknown"}
              @click=${() => this.onConnectWallet(wallet)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${ifDefined(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
  }
  onConnectWallet(wallet) {
    if (this.loading) {
      return;
    }
    ConnectorController.selectWalletConnector(wallet);
  }
};
__decorate11([
  property()
], W3mConnectRecentWidget.prototype, "tabIdx", void 0);
__decorate11([
  state()
], W3mConnectRecentWidget.prototype, "connectors", void 0);
__decorate11([
  state()
], W3mConnectRecentWidget.prototype, "loading", void 0);
W3mConnectRecentWidget = __decorate11([
  customElement("w3m-connect-recent-widget")
], W3mConnectRecentWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-recommended-widget/index.js
var __decorate12 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectRecommendedWidget = class W3mConnectRecommendedWidget2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.wallets = [];
    this.loading = false;
    if (CoreHelperUtil.isTelegram() && CoreHelperUtil.isIos()) {
      this.loading = !ConnectionController.state.wcUri;
      this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", (val) => this.loading = !val));
    }
  }
  render() {
    const { connectors } = ConnectorController.state;
    const { customWallets, featuredWalletIds } = OptionsController.state;
    const recentWallets = StorageUtil.getRecentWallets();
    const wcConnector = connectors.find((c) => c.id === "walletConnect");
    const injectedConnectors = connectors.filter((c) => c.type === "INJECTED" || c.type === "ANNOUNCED" || c.type === "MULTI_CHAIN");
    const injectedWallets = injectedConnectors.filter((i) => i.name !== "Browser Wallet");
    if (!wcConnector) {
      return null;
    }
    if (featuredWalletIds || customWallets || !this.wallets.length) {
      this.style.cssText = `display: none`;
      return null;
    }
    const overrideLength = injectedWallets.length + recentWallets.length;
    const maxRecommended = Math.max(0, 2 - overrideLength);
    const wallets = WalletUtil.filterOutDuplicateWallets(this.wallets).slice(0, maxRecommended);
    if (!wallets.length) {
      this.style.cssText = `display: none`;
      return null;
    }
    return html`
      <wui-flex flexDirection="column" gap="xs">
        ${wallets.map((wallet) => html`
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
              name=${(wallet == null ? void 0 : wallet.name) ?? "Unknown"}
              @click=${() => this.onConnectWallet(wallet)}
              tabIdx=${ifDefined(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
  }
  onConnectWallet(wallet) {
    if (this.loading) {
      return;
    }
    const connector = ConnectorController.getConnector(wallet.id, wallet.rdns);
    if (connector) {
      RouterController.push("ConnectingExternal", { connector });
    } else {
      RouterController.push("ConnectingWalletConnect", { wallet });
    }
  }
};
__decorate12([
  property()
], W3mConnectRecommendedWidget.prototype, "tabIdx", void 0);
__decorate12([
  property()
], W3mConnectRecommendedWidget.prototype, "wallets", void 0);
__decorate12([
  state()
], W3mConnectRecommendedWidget.prototype, "loading", void 0);
W3mConnectRecommendedWidget = __decorate12([
  customElement("w3m-connect-recommended-widget")
], W3mConnectRecommendedWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-walletconnect-widget/index.js
var __decorate13 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectWalletConnectWidget = class W3mConnectWalletConnectWidget2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.connectorImages = AssetController.state.connectorImages;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val), AssetController.subscribeKey("connectorImages", (val) => this.connectorImages = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (CoreHelperUtil.isMobile()) {
      this.style.cssText = `display: none`;
      return null;
    }
    const connector = this.connectors.find((c) => c.id === "walletConnect");
    if (!connector) {
      this.style.cssText = `display: none`;
      return null;
    }
    const connectorImage = connector.imageUrl || this.connectorImages[(connector == null ? void 0 : connector.imageId) ?? ""];
    return html`
      <wui-list-wallet
        imageSrc=${ifDefined(connectorImage)}
        name=${connector.name ?? "Unknown"}
        @click=${() => this.onConnector(connector)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${ifDefined(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `;
  }
  onConnector(connector) {
    ConnectorController.setActiveConnector(connector);
    RouterController.push("ConnectingWalletConnect");
  }
};
__decorate13([
  property()
], W3mConnectWalletConnectWidget.prototype, "tabIdx", void 0);
__decorate13([
  state()
], W3mConnectWalletConnectWidget.prototype, "connectors", void 0);
__decorate13([
  state()
], W3mConnectWalletConnectWidget.prototype, "connectorImages", void 0);
W3mConnectWalletConnectWidget = __decorate13([
  customElement("w3m-connect-walletconnect-widget")
], W3mConnectWalletConnectWidget);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connector-list/styles.js
var styles_default4 = css`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connector-list/index.js
var __decorate14 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectorList = class W3mConnectorList2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.recommended = ApiController.state.recommended;
    this.featured = ApiController.state.featured;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val), ApiController.subscribeKey("recommended", (val) => this.recommended = val), ApiController.subscribeKey("featured", (val) => this.featured = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return html`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `;
  }
  connectorListTemplate() {
    const { custom, recent, announced, injected, multiChain, recommended, featured, external } = ConnectorUtil.getConnectorsByType(this.connectors, this.recommended, this.featured);
    const connectorTypeOrder = ConnectorUtil.getConnectorTypeOrder({
      custom,
      recent,
      announced,
      injected,
      multiChain,
      recommended,
      featured,
      external
    });
    return connectorTypeOrder.map((type) => {
      switch (type) {
        case "injected":
          return html`
            ${multiChain.length ? html`<w3m-connect-multi-chain-widget
                  tabIdx=${ifDefined(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>` : null}
            ${announced.length ? html`<w3m-connect-announced-widget
                  tabIdx=${ifDefined(this.tabIdx)}
                ></w3m-connect-announced-widget>` : null}
            ${injected.length ? html`<w3m-connect-injected-widget
                  .connectors=${injected}
                  tabIdx=${ifDefined(this.tabIdx)}
                ></w3m-connect-injected-widget>` : null}
          `;
        case "walletConnect":
          return html`<w3m-connect-walletconnect-widget
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;
        case "recent":
          return html`<w3m-connect-recent-widget
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-recent-widget>`;
        case "featured":
          return html`<w3m-connect-featured-widget
            .wallets=${featured}
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-featured-widget>`;
        case "custom":
          return html`<w3m-connect-custom-widget
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-custom-widget>`;
        case "external":
          return html`<w3m-connect-external-widget
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-external-widget>`;
        case "recommended":
          return html`<w3m-connect-recommended-widget
            .wallets=${recommended}
            tabIdx=${ifDefined(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;
        default:
          console.warn(`Unknown connector type: ${type}`);
          return null;
      }
    });
  }
};
W3mConnectorList.styles = styles_default4;
__decorate14([
  property()
], W3mConnectorList.prototype, "tabIdx", void 0);
__decorate14([
  state()
], W3mConnectorList.prototype, "connectors", void 0);
__decorate14([
  state()
], W3mConnectorList.prototype, "recommended", void 0);
__decorate14([
  state()
], W3mConnectorList.prototype, "featured", void 0);
W3mConnectorList = __decorate14([
  customElement("w3m-connector-list")
], W3mConnectorList);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tabs/styles.js
var styles_default5 = css`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tabs/index.js
var __decorate15 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiTabs = class WuiTabs2 extends LitElement {
  constructor() {
    super(...arguments);
    this.tabs = [];
    this.onTabChange = () => null;
    this.buttons = [];
    this.disabled = false;
    this.localTabWidth = "100px";
    this.activeTab = 0;
    this.isDense = false;
  }
  render() {
    this.isDense = this.tabs.length > 3;
    this.style.cssText = `
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `;
    this.dataset["type"] = this.isDense ? "flex" : "block";
    return this.tabs.map((tab, index) => {
      var _a;
      const isActive = index === this.activeTab;
      return html`
        <button
          ?disabled=${this.disabled}
          @click=${() => this.onTabClick(index)}
          data-active=${isActive}
          data-testid="tab-${(_a = tab.label) == null ? void 0 : _a.toLowerCase()}"
        >
          ${this.iconTemplate(tab)}
          <wui-text variant="small-600" color="inherit"> ${tab.label} </wui-text>
        </button>
      `;
    });
  }
  firstUpdated() {
    if (this.shadowRoot && this.isDense) {
      this.buttons = [...this.shadowRoot.querySelectorAll("button")];
      setTimeout(() => {
        this.animateTabs(0, true);
      }, 0);
    }
  }
  iconTemplate(tab) {
    if (tab.icon) {
      return html`<wui-icon size="xs" color="inherit" name=${tab.icon}></wui-icon>`;
    }
    return null;
  }
  onTabClick(index) {
    if (this.buttons) {
      this.animateTabs(index, false);
    }
    this.activeTab = index;
    this.onTabChange(index);
  }
  animateTabs(index, initialAnimation) {
    const passiveBtn = this.buttons[this.activeTab];
    const activeBtn = this.buttons[index];
    const passiveBtnText = passiveBtn == null ? void 0 : passiveBtn.querySelector("wui-text");
    const activeBtnText = activeBtn == null ? void 0 : activeBtn.querySelector("wui-text");
    const activeBtnBounds = activeBtn == null ? void 0 : activeBtn.getBoundingClientRect();
    const activeBtnTextBounds = activeBtnText == null ? void 0 : activeBtnText.getBoundingClientRect();
    if (passiveBtn && passiveBtnText && !initialAnimation && index !== this.activeTab) {
      passiveBtnText.animate([{ opacity: 0 }], {
        duration: 50,
        easing: "ease",
        fill: "forwards"
      });
      passiveBtn.animate([{ width: `34px` }], {
        duration: 500,
        easing: "ease",
        fill: "forwards"
      });
    }
    if (activeBtn && activeBtnBounds && activeBtnTextBounds && activeBtnText) {
      if (index !== this.activeTab || initialAnimation) {
        this.localTabWidth = `${Math.round(activeBtnBounds.width + activeBtnTextBounds.width) + 6}px`;
        activeBtn.animate([{ width: `${activeBtnBounds.width + activeBtnTextBounds.width}px` }], {
          duration: initialAnimation ? 0 : 500,
          fill: "forwards",
          easing: "ease"
        });
        activeBtnText.animate([{ opacity: 1 }], {
          duration: initialAnimation ? 0 : 125,
          delay: initialAnimation ? 0 : 200,
          fill: "forwards",
          easing: "ease"
        });
      }
    }
  }
};
WuiTabs.styles = [resetStyles, elementStyles, styles_default5];
__decorate15([
  property({ type: Array })
], WuiTabs.prototype, "tabs", void 0);
__decorate15([
  property()
], WuiTabs.prototype, "onTabChange", void 0);
__decorate15([
  property({ type: Array })
], WuiTabs.prototype, "buttons", void 0);
__decorate15([
  property({ type: Boolean })
], WuiTabs.prototype, "disabled", void 0);
__decorate15([
  property()
], WuiTabs.prototype, "localTabWidth", void 0);
__decorate15([
  state()
], WuiTabs.prototype, "activeTab", void 0);
__decorate15([
  state()
], WuiTabs.prototype, "isDense", void 0);
WuiTabs = __decorate15([
  customElement("wui-tabs")
], WuiTabs);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-header/index.js
var __decorate16 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingHeader = class W3mConnectingHeader2 extends LitElement {
  constructor() {
    super();
    this.platformTabs = [];
    this.unsubscribe = [];
    this.platforms = [];
    this.onSelectPlatfrom = void 0;
    this.buffering = false;
    this.unsubscribe.push(ConnectionController.subscribeKey("buffering", (val) => this.buffering = val));
  }
  disconnectCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const tabs = this.generateTabs();
    return html`
      <wui-flex justifyContent="center" .padding=${["0", "0", "l", "0"]}>
        <wui-tabs
          ?disabled=${this.buffering}
          .tabs=${tabs}
          .onTabChange=${this.onTabChange.bind(this)}
        ></wui-tabs>
      </wui-flex>
    `;
  }
  generateTabs() {
    const tabs = this.platforms.map((platform) => {
      if (platform === "browser") {
        return { label: "Browser", icon: "extension", platform: "browser" };
      } else if (platform === "mobile") {
        return { label: "Mobile", icon: "mobile", platform: "mobile" };
      } else if (platform === "qrcode") {
        return { label: "Mobile", icon: "mobile", platform: "qrcode" };
      } else if (platform === "web") {
        return { label: "Webapp", icon: "browser", platform: "web" };
      } else if (platform === "desktop") {
        return { label: "Desktop", icon: "desktop", platform: "desktop" };
      }
      return { label: "Browser", icon: "extension", platform: "unsupported" };
    });
    this.platformTabs = tabs.map(({ platform }) => platform);
    return tabs;
  }
  onTabChange(index) {
    var _a;
    const tab = this.platformTabs[index];
    if (tab) {
      (_a = this.onSelectPlatfrom) == null ? void 0 : _a.call(this, tab);
    }
  }
};
__decorate16([
  property({ type: Array })
], W3mConnectingHeader.prototype, "platforms", void 0);
__decorate16([
  property()
], W3mConnectingHeader.prototype, "onSelectPlatfrom", void 0);
__decorate16([
  state()
], W3mConnectingHeader.prototype, "buffering", void 0);
W3mConnectingHeader = __decorate16([
  customElement("w3m-connecting-header")
], W3mConnectingHeader);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-button/styles.js
var styles_default6 = css`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-button/index.js
var __decorate17 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SPINNER_COLOR_BY_VARIANT = {
  main: "inverse-100",
  inverse: "inverse-000",
  accent: "accent-100",
  "accent-error": "error-100",
  "accent-success": "success-100",
  neutral: "fg-100",
  disabled: "gray-glass-020"
};
var TEXT_VARIANT_BY_SIZE = {
  lg: "paragraph-600",
  md: "small-600"
};
var SPINNER_SIZE_BY_SIZE = {
  lg: "md",
  md: "md"
};
var WuiButton = class WuiButton2 extends LitElement {
  constructor() {
    super(...arguments);
    this.size = "lg";
    this.disabled = false;
    this.fullWidth = false;
    this.loading = false;
    this.variant = "main";
    this.hasIconLeft = false;
    this.hasIconRight = false;
    this.borderRadius = "m";
  }
  render() {
    this.style.cssText = `
    --local-width: ${this.fullWidth ? "100%" : "auto"};
    --local-opacity-100: ${this.loading ? 0 : 1};
    --local-opacity-000: ${this.loading ? 1 : 0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;
    const textVariant = this.textVariant ?? TEXT_VARIANT_BY_SIZE[this.size];
    return html`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${() => this.handleSlotLeftChange()}></slot>
        <wui-text variant=${textVariant} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${() => this.handleSlotRightChange()}></slot>
      </button>
    `;
  }
  handleSlotLeftChange() {
    this.hasIconLeft = true;
  }
  handleSlotRightChange() {
    this.hasIconRight = true;
  }
  loadingTemplate() {
    if (this.loading) {
      const size = SPINNER_SIZE_BY_SIZE[this.size];
      const color = this.disabled ? SPINNER_COLOR_BY_VARIANT["disabled"] : SPINNER_COLOR_BY_VARIANT[this.variant];
      return html`<wui-loading-spinner color=${color} size=${size}></wui-loading-spinner>`;
    }
    return html``;
  }
};
WuiButton.styles = [resetStyles, elementStyles, styles_default6];
__decorate17([
  property()
], WuiButton.prototype, "size", void 0);
__decorate17([
  property({ type: Boolean })
], WuiButton.prototype, "disabled", void 0);
__decorate17([
  property({ type: Boolean })
], WuiButton.prototype, "fullWidth", void 0);
__decorate17([
  property({ type: Boolean })
], WuiButton.prototype, "loading", void 0);
__decorate17([
  property()
], WuiButton.prototype, "variant", void 0);
__decorate17([
  property({ type: Boolean })
], WuiButton.prototype, "hasIconLeft", void 0);
__decorate17([
  property({ type: Boolean })
], WuiButton.prototype, "hasIconRight", void 0);
__decorate17([
  property()
], WuiButton.prototype, "borderRadius", void 0);
__decorate17([
  property()
], WuiButton.prototype, "textVariant", void 0);
WuiButton = __decorate17([
  customElement("wui-button")
], WuiButton);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-link/styles.js
var styles_default7 = css`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-link/index.js
var __decorate18 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiLink = class WuiLink2 extends LitElement {
  constructor() {
    super(...arguments);
    this.tabIdx = void 0;
    this.disabled = false;
    this.color = "inherit";
  }
  render() {
    return html`
      <button ?disabled=${this.disabled} tabindex=${ifDefined(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `;
  }
};
WuiLink.styles = [resetStyles, elementStyles, styles_default7];
__decorate18([
  property()
], WuiLink.prototype, "tabIdx", void 0);
__decorate18([
  property({ type: Boolean })
], WuiLink.prototype, "disabled", void 0);
__decorate18([
  property()
], WuiLink.prototype, "color", void 0);
WuiLink = __decorate18([
  customElement("wui-link")
], WuiLink);

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-thumbnail/styles.js
var styles_default8 = css`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-thumbnail/index.js
var __decorate19 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiLoadingThumbnail = class WuiLoadingThumbnail2 extends LitElement {
  constructor() {
    super(...arguments);
    this.radius = 36;
  }
  render() {
    return this.svgLoaderTemplate();
  }
  svgLoaderTemplate() {
    const radius = this.radius > 50 ? 50 : this.radius;
    const standardValue = 36;
    const radiusFactor = standardValue - radius;
    const dashArrayStart = 116 + radiusFactor;
    const dashArrayEnd = 245 + radiusFactor;
    const dashOffset = 360 + radiusFactor * 1.75;
    return html`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${radius}
          stroke-dasharray="${dashArrayStart} ${dashArrayEnd}"
          stroke-dashoffset=${dashOffset}
        />
      </svg>
    `;
  }
};
WuiLoadingThumbnail.styles = [resetStyles, styles_default8];
__decorate19([
  property({ type: Number })
], WuiLoadingThumbnail.prototype, "radius", void 0);
WuiLoadingThumbnail = __decorate19([
  customElement("wui-loading-thumbnail")
], WuiLoadingThumbnail);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip-button/styles.js
var styles_default9 = css`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip-button/index.js
var __decorate20 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiChipButton = class WuiChipButton2 extends LitElement {
  constructor() {
    super(...arguments);
    this.variant = "accent";
    this.imageSrc = "";
    this.disabled = false;
    this.icon = "externalLink";
    this.size = "md";
    this.text = "";
  }
  render() {
    const textVariant = this.size === "sm" ? "small-600" : "paragraph-600";
    return html`
      <button
        class=${this.disabled ? "disabled" : ""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc ? html`<wui-image src=${this.imageSrc}></wui-image>` : null}
        <wui-text variant=${textVariant} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `;
  }
};
WuiChipButton.styles = [resetStyles, elementStyles, styles_default9];
__decorate20([
  property()
], WuiChipButton.prototype, "variant", void 0);
__decorate20([
  property()
], WuiChipButton.prototype, "imageSrc", void 0);
__decorate20([
  property({ type: Boolean })
], WuiChipButton.prototype, "disabled", void 0);
__decorate20([
  property()
], WuiChipButton.prototype, "icon", void 0);
__decorate20([
  property()
], WuiChipButton.prototype, "size", void 0);
__decorate20([
  property()
], WuiChipButton.prototype, "text", void 0);
WuiChipButton = __decorate20([
  customElement("wui-chip-button")
], WuiChipButton);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-cta-button/styles.js
var styles_default10 = css`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-cta-button/index.js
var __decorate21 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiCtaButton = class WuiCtaButton2 extends LitElement {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.label = "";
    this.buttonLabel = "";
  }
  render() {
    return html`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs", "2l", "1xs", "2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `;
  }
};
WuiCtaButton.styles = [resetStyles, elementStyles, styles_default10];
__decorate21([
  property({ type: Boolean })
], WuiCtaButton.prototype, "disabled", void 0);
__decorate21([
  property()
], WuiCtaButton.prototype, "label", void 0);
__decorate21([
  property()
], WuiCtaButton.prototype, "buttonLabel", void 0);
WuiCtaButton = __decorate21([
  customElement("wui-cta-button")
], WuiCtaButton);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-mobile-download-links/styles.js
var styles_default11 = css`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-mobile-download-links/index.js
var __decorate22 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mMobileDownloadLinks = class W3mMobileDownloadLinks2 extends LitElement {
  constructor() {
    super(...arguments);
    this.wallet = void 0;
  }
  render() {
    if (!this.wallet) {
      this.style.display = "none";
      return null;
    }
    const { name, app_store, play_store, chrome_store, homepage } = this.wallet;
    const isMobile = CoreHelperUtil.isMobile();
    const isIos = CoreHelperUtil.isIos();
    const isAndroid = CoreHelperUtil.isAndroid();
    const isMultiple = [app_store, play_store, homepage, chrome_store].filter(Boolean).length > 1;
    const shortName = UiHelperUtil.getTruncateString({
      string: name,
      charsStart: 12,
      charsEnd: 0,
      truncate: "end"
    });
    if (isMultiple && !isMobile) {
      return html`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${() => RouterController.push("Downloads", { wallet: this.wallet })}
        ></wui-cta-button>
      `;
    }
    if (!isMultiple && homepage) {
      return html`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `;
    }
    if (app_store && isIos) {
      return html`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `;
    }
    if (play_store && isAndroid) {
      return html`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `;
    }
    this.style.display = "none";
    return null;
  }
  onAppStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.app_store) {
      CoreHelperUtil.openHref(this.wallet.app_store, "_blank");
    }
  }
  onPlayStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.play_store) {
      CoreHelperUtil.openHref(this.wallet.play_store, "_blank");
    }
  }
  onHomePage() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.homepage) {
      CoreHelperUtil.openHref(this.wallet.homepage, "_blank");
    }
  }
};
W3mMobileDownloadLinks.styles = [styles_default11];
__decorate22([
  property({ type: Object })
], W3mMobileDownloadLinks.prototype, "wallet", void 0);
W3mMobileDownloadLinks = __decorate22([
  customElement("w3m-mobile-download-links")
], W3mMobileDownloadLinks);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/w3m-connecting-widget/styles.js
var styles_default12 = css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/w3m-connecting-widget/index.js
var __decorate23 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWidget = class extends LitElement {
  constructor() {
    var _a, _b, _c, _d, _e;
    super();
    this.wallet = (_a = RouterController.state.data) == null ? void 0 : _a.wallet;
    this.connector = (_b = RouterController.state.data) == null ? void 0 : _b.connector;
    this.timeout = void 0;
    this.secondaryBtnIcon = "refresh";
    this.onConnect = void 0;
    this.onRender = void 0;
    this.onAutoConnect = void 0;
    this.isWalletConnect = true;
    this.unsubscribe = [];
    this.imageSrc = AssetUtil.getWalletImage(this.wallet) ?? AssetUtil.getConnectorImage(this.connector);
    this.name = ((_c = this.wallet) == null ? void 0 : _c.name) ?? ((_d = this.connector) == null ? void 0 : _d.name) ?? "Wallet";
    this.isRetrying = false;
    this.uri = ConnectionController.state.wcUri;
    this.error = ConnectionController.state.wcError;
    this.ready = false;
    this.showRetry = false;
    this.secondaryBtnLabel = "Try again";
    this.secondaryLabel = "Accept connection request in the wallet";
    this.buffering = false;
    this.isLoading = false;
    this.isMobile = false;
    this.onRetry = void 0;
    this.unsubscribe.push(...[
      ConnectionController.subscribeKey("wcUri", (val) => {
        var _a2;
        this.uri = val;
        if (this.isRetrying && this.onRetry) {
          this.isRetrying = false;
          (_a2 = this.onConnect) == null ? void 0 : _a2.call(this);
        }
      }),
      ConnectionController.subscribeKey("wcError", (val) => this.error = val),
      ConnectionController.subscribeKey("buffering", (val) => this.buffering = val)
    ]);
    if ((CoreHelperUtil.isTelegram() || CoreHelperUtil.isSafari()) && CoreHelperUtil.isIos() && ConnectionController.state.wcUri) {
      (_e = this.onConnect) == null ? void 0 : _e.call(this);
    }
  }
  firstUpdated() {
    var _a;
    (_a = this.onAutoConnect) == null ? void 0 : _a.call(this);
    this.showRetry = !this.onAutoConnect;
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    clearTimeout(this.timeout);
  }
  render() {
    var _a;
    (_a = this.onRender) == null ? void 0 : _a.call(this);
    this.onShowRetry();
    const subLabel = this.error ? "Connection can be declined if a previous request is still active" : this.secondaryLabel;
    let label = `Continue in ${this.name}`;
    if (this.buffering) {
      label = "Connecting...";
    }
    if (this.error) {
      label = "Connection declined";
    }
    return html`
      <wui-flex
        data-error=${ifDefined(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${ifDefined(this.imageSrc)}></wui-wallet-image>

          ${this.error ? null : this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error ? "error-100" : "fg-100"}>
            ${label}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${subLabel}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel ? html`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying || !this.error && this.buffering || this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            ` : null}
      </wui-flex>

      ${this.isWalletConnect ? html`
            <wui-flex .padding=${["0", "xl", "xl", "xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          ` : null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
  }
  onShowRetry() {
    var _a;
    if (this.error && !this.showRetry) {
      this.showRetry = true;
      const retryButton = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("wui-button");
      retryButton == null ? void 0 : retryButton.animate([{ opacity: 0 }, { opacity: 1 }], {
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  onTryAgain() {
    var _a, _b;
    if (!this.buffering) {
      ConnectionController.setWcError(false);
      if (this.onRetry) {
        this.isRetrying = true;
        (_a = this.onRetry) == null ? void 0 : _a.call(this);
      } else {
        (_b = this.onConnect) == null ? void 0 : _b.call(this);
      }
    }
  }
  loaderTemplate() {
    const borderRadiusMaster = ThemeController.state.themeVariables["--w3m-border-radius-master"];
    const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace("px", ""), 10) : 4;
    return html`<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
  }
  onCopyUri() {
    try {
      if (this.uri) {
        CoreHelperUtil.copyToClopboard(this.uri);
        SnackController.showSuccess("Link copied");
      }
    } catch {
      SnackController.showError("Failed to copy");
    }
  }
};
W3mConnectingWidget.styles = styles_default12;
__decorate23([
  state()
], W3mConnectingWidget.prototype, "isRetrying", void 0);
__decorate23([
  state()
], W3mConnectingWidget.prototype, "uri", void 0);
__decorate23([
  state()
], W3mConnectingWidget.prototype, "error", void 0);
__decorate23([
  state()
], W3mConnectingWidget.prototype, "ready", void 0);
__decorate23([
  state()
], W3mConnectingWidget.prototype, "showRetry", void 0);
__decorate23([
  state()
], W3mConnectingWidget.prototype, "secondaryBtnLabel", void 0);
__decorate23([
  state()
], W3mConnectingWidget.prototype, "secondaryLabel", void 0);
__decorate23([
  state()
], W3mConnectingWidget.prototype, "buffering", void 0);
__decorate23([
  state()
], W3mConnectingWidget.prototype, "isLoading", void 0);
__decorate23([
  property({ type: Boolean })
], W3mConnectingWidget.prototype, "isMobile", void 0);
__decorate23([
  property()
], W3mConnectingWidget.prototype, "onRetry", void 0);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-browser/index.js
var __decorate24 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWcBrowser = class W3mConnectingWcBrowser2 extends W3mConnectingWidget {
  constructor() {
    super();
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-browser: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.onAutoConnect = this.onConnectProxy.bind(this);
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: { name: this.wallet.name, platform: "browser" }
    });
  }
  async onConnectProxy() {
    var _a;
    try {
      this.error = false;
      const { connectors } = ConnectorController.state;
      const connector = connectors.find((c) => {
        var _a2, _b, _c;
        return c.type === "ANNOUNCED" && ((_a2 = c.info) == null ? void 0 : _a2.rdns) === ((_b = this.wallet) == null ? void 0 : _b.rdns) || c.type === "INJECTED" || c.name === ((_c = this.wallet) == null ? void 0 : _c.name);
      });
      if (connector) {
        await ConnectionController.connectExternal(connector, connector.chain);
      } else {
        throw new Error("w3m-connecting-wc-browser: No connector found");
      }
      ModalController.close();
      EventsController.sendEvent({
        type: "track",
        event: "CONNECT_SUCCESS",
        properties: { method: "browser", name: ((_a = this.wallet) == null ? void 0 : _a.name) || "Unknown" }
      });
    } catch (error) {
      EventsController.sendEvent({
        type: "track",
        event: "CONNECT_ERROR",
        properties: { message: (error == null ? void 0 : error.message) ?? "Unknown" }
      });
      this.error = true;
    }
  }
};
W3mConnectingWcBrowser = __decorate24([
  customElement("w3m-connecting-wc-browser")
], W3mConnectingWcBrowser);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-desktop/index.js
var __decorate25 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWcDesktop = class W3mConnectingWcDesktop2 extends W3mConnectingWidget {
  constructor() {
    super();
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-desktop: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.onRender = this.onRenderProxy.bind(this);
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: { name: this.wallet.name, platform: "desktop" }
    });
  }
  onRenderProxy() {
    var _a;
    if (!this.ready && this.uri) {
      this.ready = true;
      (_a = this.onConnect) == null ? void 0 : _a.call(this);
    }
  }
  onConnectProxy() {
    var _a;
    if (((_a = this.wallet) == null ? void 0 : _a.desktop_link) && this.uri) {
      try {
        this.error = false;
        const { desktop_link, name } = this.wallet;
        const { redirect, href } = CoreHelperUtil.formatNativeUrl(desktop_link, this.uri);
        ConnectionController.setWcLinking({ name, href });
        ConnectionController.setRecentWallet(this.wallet);
        CoreHelperUtil.openHref(redirect, "_blank");
      } catch {
        this.error = true;
      }
    }
  }
};
W3mConnectingWcDesktop = __decorate25([
  customElement("w3m-connecting-wc-desktop")
], W3mConnectingWcDesktop);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-mobile/index.js
var __decorate26 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWcMobile = class W3mConnectingWcMobile2 extends W3mConnectingWidget {
  constructor() {
    super();
    this.btnLabelTimeout = void 0;
    this.labelTimeout = void 0;
    this.onRender = () => {
      var _a;
      if (!this.ready && this.uri) {
        this.ready = true;
        (_a = this.onConnect) == null ? void 0 : _a.call(this);
      }
    };
    this.onConnect = () => {
      var _a;
      if (((_a = this.wallet) == null ? void 0 : _a.mobile_link) && this.uri) {
        try {
          this.error = false;
          const { mobile_link, name } = this.wallet;
          const { redirect, href } = CoreHelperUtil.formatNativeUrl(mobile_link, this.uri);
          ConnectionController.setWcLinking({ name, href });
          ConnectionController.setRecentWallet(this.wallet);
          const target = CoreHelperUtil.isIframe() ? "_top" : "_self";
          CoreHelperUtil.openHref(redirect, target);
          clearTimeout(this.labelTimeout);
          this.secondaryLabel = ConstantsUtil2.CONNECT_LABELS.MOBILE;
        } catch (e) {
          EventsController.sendEvent({
            type: "track",
            event: "CONNECT_PROXY_ERROR",
            properties: {
              message: e instanceof Error ? e.message : "Error parsing the deeplink",
              uri: this.uri,
              mobile_link: this.wallet.mobile_link,
              name: this.wallet.name
            }
          });
          this.error = true;
        }
      }
    };
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-mobile: No wallet provided");
    }
    this.secondaryBtnLabel = void 0;
    this.secondaryLabel = ConstantsUtil2.CONNECT_LABELS.MOBILE;
    document.addEventListener("visibilitychange", this.onBuffering.bind(this));
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: { name: this.wallet.name, platform: "mobile" }
    });
    this.btnLabelTimeout = setTimeout(() => {
      this.secondaryBtnLabel = "Try again";
      this.secondaryLabel = ConstantsUtil2.CONNECT_LABELS.MOBILE;
    }, ConstantsUtil2.FIVE_SEC_MS);
    this.labelTimeout = setTimeout(() => {
      this.secondaryLabel = `Hold tight... it's taking longer than expected`;
    }, ConstantsUtil2.THREE_SEC_MS);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this.onBuffering.bind(this));
    clearTimeout(this.btnLabelTimeout);
    clearTimeout(this.labelTimeout);
  }
  onBuffering() {
    const isIos = CoreHelperUtil.isIos();
    if ((document == null ? void 0 : document.visibilityState) === "visible" && !this.error && isIos) {
      ConnectionController.setBuffering(true);
      setTimeout(() => {
        ConnectionController.setBuffering(false);
      }, 5e3);
    }
  }
  onTryAgain() {
    if (!this.buffering) {
      ConnectionController.setWcError(false);
      this.onConnect();
    }
  }
};
W3mConnectingWcMobile = __decorate26([
  customElement("w3m-connecting-wc-mobile")
], W3mConnectingWcMobile);

// node_modules/@reown/appkit-ui/dist/esm/src/utils/QrCode.js
var import_qrcode = __toESM(require_browser(), 1);
var CONNECTING_ERROR_MARGIN = 0.1;
var CIRCLE_SIZE_MODIFIER = 2.5;
var QRCODE_MATRIX_MARGIN = 7;
function isAdjecentDots(cy, otherCy, cellSize) {
  if (cy === otherCy) {
    return false;
  }
  const diff = cy - otherCy < 0 ? otherCy - cy : cy - otherCy;
  return diff <= cellSize + CONNECTING_ERROR_MARGIN;
}
function getMatrix(value, errorCorrectionLevel) {
  const arr = Array.prototype.slice.call(import_qrcode.default.create(value, { errorCorrectionLevel }).modules.data, 0);
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce((rows, key, index) => (index % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
}
var QrCodeUtil = {
  generate({ uri, size, logoSize, dotColor = "#141414" }) {
    const edgeColor = "transparent";
    const strokeWidth = 5;
    const dots = [];
    const matrix = getMatrix(uri, "Q");
    const cellSize = size / matrix.length;
    const qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ];
    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - QRCODE_MATRIX_MARGIN) * cellSize * x;
      const y1 = (matrix.length - QRCODE_MATRIX_MARGIN) * cellSize * y;
      const borderRadius = 0.45;
      for (let i = 0; i < qrList.length; i += 1) {
        const dotSize = cellSize * (QRCODE_MATRIX_MARGIN - i * 2);
        dots.push(svg`
            <rect
              fill=${i === 2 ? dotColor : edgeColor}
              width=${i === 0 ? dotSize - strokeWidth : dotSize}
              rx= ${i === 0 ? (dotSize - strokeWidth) * borderRadius : dotSize * borderRadius}
              ry= ${i === 0 ? (dotSize - strokeWidth) * borderRadius : dotSize * borderRadius}
              stroke=${dotColor}
              stroke-width=${i === 0 ? strokeWidth : 0}
              height=${i === 0 ? dotSize - strokeWidth : dotSize}
              x= ${i === 0 ? y1 + cellSize * i + strokeWidth / 2 : y1 + cellSize * i}
              y= ${i === 0 ? x1 + cellSize * i + strokeWidth / 2 : x1 + cellSize * i}
            />
          `);
      }
    });
    const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;
    const circles = [];
    matrix.forEach((row, i) => {
      row.forEach((_, j) => {
        if (matrix[i][j]) {
          if (!(i < QRCODE_MATRIX_MARGIN && j < QRCODE_MATRIX_MARGIN || i > matrix.length - (QRCODE_MATRIX_MARGIN + 1) && j < QRCODE_MATRIX_MARGIN || i < QRCODE_MATRIX_MARGIN && j > matrix.length - (QRCODE_MATRIX_MARGIN + 1))) {
            if (!(i > matrixMiddleStart && i < matrixMiddleEnd && j > matrixMiddleStart && j < matrixMiddleEnd)) {
              const cx = i * cellSize + cellSize / 2;
              const cy = j * cellSize + cellSize / 2;
              circles.push([cx, cy]);
            }
          }
        }
      });
    });
    const circlesToConnect = {};
    circles.forEach(([cx, cy]) => {
      var _a;
      if (circlesToConnect[cx]) {
        (_a = circlesToConnect[cx]) == null ? void 0 : _a.push(cy);
      } else {
        circlesToConnect[cx] = [cy];
      }
    });
    Object.entries(circlesToConnect).map(([cx, cys]) => {
      const newCys = cys.filter((cy) => cys.every((otherCy) => !isAdjecentDots(cy, otherCy, cellSize)));
      return [Number(cx), newCys];
    }).forEach(([cx, cys]) => {
      cys.forEach((cy) => {
        dots.push(svg`<circle cx=${cx} cy=${cy} fill=${dotColor} r=${cellSize / CIRCLE_SIZE_MODIFIER} />`);
      });
    });
    Object.entries(circlesToConnect).filter(([_, cys]) => cys.length > 1).map(([cx, cys]) => {
      const newCys = cys.filter((cy) => cys.some((otherCy) => isAdjecentDots(cy, otherCy, cellSize)));
      return [Number(cx), newCys];
    }).map(([cx, cys]) => {
      cys.sort((a, b) => a < b ? -1 : 1);
      const groups = [];
      for (const cy of cys) {
        const group = groups.find((item) => item.some((otherCy) => isAdjecentDots(cy, otherCy, cellSize)));
        if (group) {
          group.push(cy);
        } else {
          groups.push([cy]);
        }
      }
      return [cx, groups.map((item) => [item[0], item[item.length - 1]])];
    }).forEach(([cx, groups]) => {
      groups.forEach(([y1, y2]) => {
        dots.push(svg`
              <line
                x1=${cx}
                x2=${cx}
                y1=${y1}
                y2=${y2}
                stroke=${dotColor}
                stroke-width=${cellSize / (CIRCLE_SIZE_MODIFIER / 2)}
                stroke-linecap="round"
              />
            `);
      });
    });
    return dots;
  }
};

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-qr-code/styles.js
var styles_default13 = css`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-qr-code/index.js
var __decorate27 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DEFAULT_ICON_COLOR = "#3396ff";
var WuiQrCode = class WuiQrCode2 extends LitElement {
  constructor() {
    super(...arguments);
    this.uri = "";
    this.size = 0;
    this.theme = "dark";
    this.imageSrc = void 0;
    this.alt = void 0;
    this.arenaClear = void 0;
    this.farcaster = void 0;
  }
  render() {
    this.dataset["theme"] = this.theme;
    this.dataset["clear"] = String(this.arenaClear);
    this.style.cssText = `
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color ?? DEFAULT_ICON_COLOR}
    `;
    return html`${this.templateVisual()} ${this.templateSvg()}`;
  }
  templateSvg() {
    const size = this.theme === "light" ? this.size : this.size - 16 * 2;
    return svg`
      <svg height=${size} width=${size}>
        ${QrCodeUtil.generate({
      uri: this.uri,
      size,
      logoSize: this.arenaClear ? 0 : size / 4,
      dotColor: this.color
    })}
      </svg>
    `;
  }
  templateVisual() {
    if (this.imageSrc) {
      return html`<wui-image src=${this.imageSrc} alt=${this.alt ?? "logo"}></wui-image>`;
    }
    if (this.farcaster) {
      return html`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`;
    }
    return html`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`;
  }
};
WuiQrCode.styles = [resetStyles, styles_default13];
__decorate27([
  property()
], WuiQrCode.prototype, "uri", void 0);
__decorate27([
  property({ type: Number })
], WuiQrCode.prototype, "size", void 0);
__decorate27([
  property()
], WuiQrCode.prototype, "theme", void 0);
__decorate27([
  property()
], WuiQrCode.prototype, "imageSrc", void 0);
__decorate27([
  property()
], WuiQrCode.prototype, "alt", void 0);
__decorate27([
  property()
], WuiQrCode.prototype, "color", void 0);
__decorate27([
  property({ type: Boolean })
], WuiQrCode.prototype, "arenaClear", void 0);
__decorate27([
  property({ type: Boolean })
], WuiQrCode.prototype, "farcaster", void 0);
WuiQrCode = __decorate27([
  customElement("wui-qr-code")
], WuiQrCode);

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-shimmer/styles.js
var styles_default14 = css`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-shimmer/index.js
var __decorate28 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiShimmer = class WuiShimmer2 extends LitElement {
  constructor() {
    super(...arguments);
    this.width = "";
    this.height = "";
    this.borderRadius = "m";
    this.variant = "default";
  }
  render() {
    this.style.cssText = `
      width: ${this.width};
      height: ${this.height};
      border-radius: ${`clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px)`};
    `;
    return html`<slot></slot>`;
  }
};
WuiShimmer.styles = [styles_default14];
__decorate28([
  property()
], WuiShimmer.prototype, "width", void 0);
__decorate28([
  property()
], WuiShimmer.prototype, "height", void 0);
__decorate28([
  property()
], WuiShimmer.prototype, "borderRadius", void 0);
__decorate28([
  property()
], WuiShimmer.prototype, "variant", void 0);
WuiShimmer = __decorate28([
  customElement("wui-shimmer")
], WuiShimmer);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-ux-by-reown/styles.js
var styles_default15 = css`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-ux-by-reown/index.js
var __decorate29 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiUxByReown = class WuiUxByReown2 extends LitElement {
  render() {
    return html`
      <wui-flex
        justifyContent="center"
        alignItems="center"
        gap="xs"
        .padding=${["0", "0", "l", "0"]}
      >
        <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
        <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
      </wui-flex>
    `;
  }
};
WuiUxByReown.styles = [resetStyles, elementStyles, styles_default15];
WuiUxByReown = __decorate29([
  customElement("wui-ux-by-reown")
], WuiUxByReown);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-qrcode/styles.js
var styles_default16 = css`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-qrcode/index.js
var __decorate30 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWcQrcode = class W3mConnectingWcQrcode2 extends W3mConnectingWidget {
  constructor() {
    var _a;
    super();
    this.forceUpdate = () => {
      this.requestUpdate();
    };
    window.addEventListener("resize", this.forceUpdate);
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: { name: ((_a = this.wallet) == null ? void 0 : _a.name) ?? "WalletConnect", platform: "qrcode" }
    });
  }
  disconnectedCallback() {
    var _a;
    super.disconnectedCallback();
    (_a = this.unsubscribe) == null ? void 0 : _a.forEach((unsub) => unsub());
    window.removeEventListener("resize", this.forceUpdate);
  }
  render() {
    this.onRenderProxy();
    return html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
  }
  onRenderProxy() {
    if (!this.ready && this.uri) {
      this.timeout = setTimeout(() => {
        this.ready = true;
      }, 200);
    }
  }
  qrCodeTemplate() {
    if (!this.uri || !this.ready) {
      return null;
    }
    const size = this.getBoundingClientRect().width - 40;
    const alt = this.wallet ? this.wallet.name : void 0;
    ConnectionController.setWcLinking(void 0);
    ConnectionController.setRecentWallet(this.wallet);
    return html` <wui-qr-code
      size=${size}
      theme=${ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${ifDefined(AssetUtil.getWalletImage(this.wallet))}
      color=${ifDefined(ThemeController.state.themeVariables["--w3m-qr-color"])}
      alt=${ifDefined(alt)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`;
  }
  copyTemplate() {
    const inactive = !this.uri || !this.ready;
    return html`<wui-link
      .disabled=${inactive}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`;
  }
};
W3mConnectingWcQrcode.styles = styles_default16;
W3mConnectingWcQrcode = __decorate30([
  customElement("w3m-connecting-wc-qrcode")
], W3mConnectingWcQrcode);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-unsupported/index.js
var __decorate31 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWcUnsupported = class W3mConnectingWcUnsupported2 extends LitElement {
  constructor() {
    var _a;
    super();
    this.wallet = (_a = RouterController.state.data) == null ? void 0 : _a.wallet;
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-unsupported: No wallet provided");
    }
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: { name: this.wallet.name, platform: "browser" }
    });
  }
  render() {
    return html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${ifDefined(AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
  }
};
W3mConnectingWcUnsupported = __decorate31([
  customElement("w3m-connecting-wc-unsupported")
], W3mConnectingWcUnsupported);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-web/index.js
var __decorate32 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWcWeb = class W3mConnectingWcWeb2 extends W3mConnectingWidget {
  constructor() {
    super();
    this.isLoading = true;
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-web: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.secondaryBtnLabel = "Open";
    this.secondaryLabel = "Open and continue in a new browser tab";
    this.secondaryBtnIcon = "externalLink";
    this.updateLoadingState();
    this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", () => {
      this.updateLoadingState();
    }));
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: { name: this.wallet.name, platform: "web" }
    });
  }
  updateLoadingState() {
    this.isLoading = !this.uri;
  }
  onConnectProxy() {
    var _a;
    if (((_a = this.wallet) == null ? void 0 : _a.webapp_link) && this.uri) {
      try {
        this.error = false;
        const { webapp_link, name } = this.wallet;
        const { redirect, href } = CoreHelperUtil.formatUniversalUrl(webapp_link, this.uri);
        ConnectionController.setWcLinking({ name, href });
        ConnectionController.setRecentWallet(this.wallet);
        CoreHelperUtil.openHref(redirect, "_blank");
      } catch {
        this.error = true;
      }
    }
  }
};
__decorate32([
  state()
], W3mConnectingWcWeb.prototype, "isLoading", void 0);
W3mConnectingWcWeb = __decorate32([
  customElement("w3m-connecting-wc-web")
], W3mConnectingWcWeb);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-wc-view/index.js
var __decorate33 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWcView = class W3mConnectingWcView2 extends LitElement {
  constructor() {
    var _a;
    super();
    this.wallet = (_a = RouterController.state.data) == null ? void 0 : _a.wallet;
    this.platform = void 0;
    this.platforms = [];
    this.isSiwxEnabled = Boolean(OptionsController.state.siwx);
    this.determinePlatforms();
    this.initializeConnection();
  }
  render() {
    return html`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      <wui-ux-by-reown></wui-ux-by-reown>
    `;
  }
  async initializeConnection(retry = false) {
    if (this.platform === "browser" || OptionsController.state.manualWCControl && !retry) {
      return;
    }
    try {
      const { wcPairingExpiry, status } = ConnectionController.state;
      if (retry || CoreHelperUtil.isPairingExpired(wcPairingExpiry) || status === "connecting") {
        await ConnectionController.connectWalletConnect();
        if (!this.isSiwxEnabled) {
          ModalController.close();
        }
      }
    } catch (error) {
      EventsController.sendEvent({
        type: "track",
        event: "CONNECT_ERROR",
        properties: { message: (error == null ? void 0 : error.message) ?? "Unknown" }
      });
      ConnectionController.setWcError(true);
      SnackController.showError(error.message ?? "Connection error");
      ConnectionController.resetWcConnection();
      RouterController.goBack();
    }
  }
  determinePlatforms() {
    if (!this.wallet) {
      this.platforms.push("qrcode");
      this.platform = "qrcode";
      return;
    }
    if (this.platform) {
      return;
    }
    const { mobile_link, desktop_link, webapp_link, injected, rdns } = this.wallet;
    const injectedIds = injected == null ? void 0 : injected.map(({ injected_id }) => injected_id).filter(Boolean);
    const browserIds = [...rdns ? [rdns] : injectedIds ?? []];
    const isBrowser = OptionsController.state.isUniversalProvider ? false : browserIds.length;
    const isMobileWc = mobile_link;
    const isWebWc = webapp_link;
    const isBrowserInstalled = ConnectionController.checkInstalled(browserIds);
    const isBrowserWc = isBrowser && isBrowserInstalled;
    const isDesktopWc = desktop_link && !CoreHelperUtil.isMobile();
    if (isBrowserWc && !ChainController.state.noAdapters) {
      this.platforms.push("browser");
    }
    if (isMobileWc) {
      this.platforms.push(CoreHelperUtil.isMobile() ? "mobile" : "qrcode");
    }
    if (isWebWc) {
      this.platforms.push("web");
    }
    if (isDesktopWc) {
      this.platforms.push("desktop");
    }
    if (!isBrowserWc && isBrowser && !ChainController.state.noAdapters) {
      this.platforms.push("unsupported");
    }
    this.platform = this.platforms[0];
  }
  platformTemplate() {
    switch (this.platform) {
      case "browser":
        return html`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;
      case "web":
        return html`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;
      case "desktop":
        return html`
          <w3m-connecting-wc-desktop .onRetry=${() => this.initializeConnection(true)}>
          </w3m-connecting-wc-desktop>
        `;
      case "mobile":
        return html`
          <w3m-connecting-wc-mobile isMobile .onRetry=${() => this.initializeConnection(true)}>
          </w3m-connecting-wc-mobile>
        `;
      case "qrcode":
        return html`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;
      default:
        return html`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`;
    }
  }
  headerTemplate() {
    const multiPlatform = this.platforms.length > 1;
    if (!multiPlatform) {
      return null;
    }
    return html`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `;
  }
  async onSelectPlatform(platform) {
    var _a;
    const container = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("div");
    if (container) {
      await container.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.platform = platform;
      container.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
};
__decorate33([
  state()
], W3mConnectingWcView.prototype, "platform", void 0);
__decorate33([
  state()
], W3mConnectingWcView.prototype, "platforms", void 0);
__decorate33([
  state()
], W3mConnectingWcView.prototype, "isSiwxEnabled", void 0);
W3mConnectingWcView = __decorate33([
  customElement("w3m-connecting-wc-view")
], W3mConnectingWcView);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-wc-basic-view/index.js
var __decorate34 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mConnectingWcBasicView = class W3mConnectingWcBasicView2 extends LitElement {
  constructor() {
    super(...arguments);
    this.isMobile = CoreHelperUtil.isMobile();
  }
  render() {
    if (this.isMobile) {
      const { featured, recommended } = ApiController.state;
      const { customWallets } = OptionsController.state;
      const recent = StorageUtil.getRecentWallets();
      const showConnectors = featured.length || recommended.length || (customWallets == null ? void 0 : customWallets.length) || recent.length;
      return html`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs", "s", "s", "s"]}
      >
        ${showConnectors ? html`<w3m-connector-list></w3m-connector-list>` : null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`;
    }
    return html`<wui-flex flexDirection="column" .padding=${["0", "0", "l", "0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0", "m", "0", "m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`;
  }
};
__decorate34([
  state()
], W3mConnectingWcBasicView.prototype, "isMobile", void 0);
W3mConnectingWcBasicView = __decorate34([
  customElement("w3m-connecting-wc-basic-view")
], W3mConnectingWcBasicView);

// node_modules/lit-html/development/directives/ref.js
var createRef = () => new Ref();
var Ref = class {
};
var lastElementForContextAndCallback = /* @__PURE__ */ new WeakMap();
var RefDirective = class extends AsyncDirective {
  render(_ref) {
    return nothing;
  }
  update(part, [ref2]) {
    var _a;
    const refChanged = ref2 !== this._ref;
    if (refChanged && this._ref !== void 0) {
      this._updateRefValue(void 0);
    }
    if (refChanged || this._lastElementForRef !== this._element) {
      this._ref = ref2;
      this._context = (_a = part.options) == null ? void 0 : _a.host;
      this._updateRefValue(this._element = part.element);
    }
    return nothing;
  }
  _updateRefValue(element) {
    if (!this.isConnected) {
      element = void 0;
    }
    if (typeof this._ref === "function") {
      const context = this._context ?? globalThis;
      let lastElementForCallback = lastElementForContextAndCallback.get(context);
      if (lastElementForCallback === void 0) {
        lastElementForCallback = /* @__PURE__ */ new WeakMap();
        lastElementForContextAndCallback.set(context, lastElementForCallback);
      }
      if (lastElementForCallback.get(this._ref) !== void 0) {
        this._ref.call(this._context, void 0);
      }
      lastElementForCallback.set(this._ref, element);
      if (element !== void 0) {
        this._ref.call(this._context, element);
      }
    } else {
      this._ref.value = element;
    }
  }
  get _lastElementForRef() {
    var _a, _b;
    return typeof this._ref === "function" ? (_a = lastElementForContextAndCallback.get(this._context ?? globalThis)) == null ? void 0 : _a.get(this._ref) : (_b = this._ref) == null ? void 0 : _b.value;
  }
  disconnected() {
    if (this._lastElementForRef === this._element) {
      this._updateRefValue(void 0);
    }
  }
  reconnected() {
    this._updateRefValue(this._element);
  }
};
var ref = directive(RefDirective);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-switch/styles.js
var styles_default17 = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-switch/index.js
var __decorate35 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiSwitch = class WuiSwitch2 extends LitElement {
  constructor() {
    super(...arguments);
    this.inputElementRef = createRef();
    this.checked = void 0;
  }
  render() {
    return html`
      <label>
        <input
          ${ref(this.inputElementRef)}
          type="checkbox"
          ?checked=${ifDefined(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `;
  }
  dispatchChangeEvent() {
    var _a;
    this.dispatchEvent(new CustomEvent("switchChange", {
      detail: (_a = this.inputElementRef.value) == null ? void 0 : _a.checked,
      bubbles: true,
      composed: true
    }));
  }
};
WuiSwitch.styles = [resetStyles, elementStyles, colorStyles, styles_default17];
__decorate35([
  property({ type: Boolean })
], WuiSwitch.prototype, "checked", void 0);
WuiSwitch = __decorate35([
  customElement("wui-switch")
], WuiSwitch);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-certified-switch/styles.js
var styles_default18 = css`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-certified-switch/index.js
var __decorate36 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiCertifiedSwitch = class WuiCertifiedSwitch2 extends LitElement {
  constructor() {
    super(...arguments);
    this.checked = void 0;
  }
  render() {
    return html`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${ifDefined(this.checked)}></wui-switch>
      </button>
    `;
  }
};
WuiCertifiedSwitch.styles = [resetStyles, elementStyles, styles_default18];
__decorate36([
  property({ type: Boolean })
], WuiCertifiedSwitch.prototype, "checked", void 0);
WuiCertifiedSwitch = __decorate36([
  customElement("wui-certified-switch")
], WuiCertifiedSwitch);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-element/styles.js
var styles_default19 = css`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-element/index.js
var __decorate37 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiInputElement = class WuiInputElement2 extends LitElement {
  constructor() {
    super(...arguments);
    this.icon = "copy";
  }
  render() {
    return html`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `;
  }
};
WuiInputElement.styles = [resetStyles, elementStyles, styles_default19];
__decorate37([
  property()
], WuiInputElement.prototype, "icon", void 0);
WuiInputElement = __decorate37([
  customElement("wui-input-element")
], WuiInputElement);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-text/styles.js
var styles_default20 = css`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-text/index.js
var __decorate38 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiInputText = class WuiInputText2 extends LitElement {
  constructor() {
    super(...arguments);
    this.inputElementRef = createRef();
    this.size = "md";
    this.disabled = false;
    this.placeholder = "";
    this.type = "text";
    this.value = "";
  }
  render() {
    const inputClass = `wui-padding-right-${this.inputRightPadding}`;
    const sizeClass = `wui-size-${this.size}`;
    const classes = {
      [sizeClass]: true,
      [inputClass]: Boolean(this.inputRightPadding)
    };
    return html`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${ref(this.inputElementRef)}
        class=${classMap(classes)}
        type=${this.type}
        enterkeyhint=${ifDefined(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value || ""}
        tabindex=${ifDefined(this.tabIdx)}
      />
      <slot></slot>`;
  }
  templateIcon() {
    if (this.icon) {
      return html`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`;
    }
    return null;
  }
  dispatchInputChangeEvent() {
    var _a;
    this.dispatchEvent(new CustomEvent("inputChange", {
      detail: (_a = this.inputElementRef.value) == null ? void 0 : _a.value,
      bubbles: true,
      composed: true
    }));
  }
};
WuiInputText.styles = [resetStyles, elementStyles, styles_default20];
__decorate38([
  property()
], WuiInputText.prototype, "size", void 0);
__decorate38([
  property()
], WuiInputText.prototype, "icon", void 0);
__decorate38([
  property({ type: Boolean })
], WuiInputText.prototype, "disabled", void 0);
__decorate38([
  property()
], WuiInputText.prototype, "placeholder", void 0);
__decorate38([
  property()
], WuiInputText.prototype, "type", void 0);
__decorate38([
  property()
], WuiInputText.prototype, "keyHint", void 0);
__decorate38([
  property()
], WuiInputText.prototype, "value", void 0);
__decorate38([
  property()
], WuiInputText.prototype, "inputRightPadding", void 0);
__decorate38([
  property()
], WuiInputText.prototype, "tabIdx", void 0);
WuiInputText = __decorate38([
  customElement("wui-input-text")
], WuiInputText);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-search-bar/styles.js
var styles_default21 = css`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-search-bar/index.js
var __decorate39 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiSearchBar = class WuiSearchBar2 extends LitElement {
  constructor() {
    super(...arguments);
    this.inputComponentRef = createRef();
  }
  render() {
    return html`
      <wui-input-text
        ${ref(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `;
  }
  clearValue() {
    const inputComponent = this.inputComponentRef.value;
    const inputElement = inputComponent == null ? void 0 : inputComponent.inputElementRef.value;
    if (inputElement) {
      inputElement.value = "";
      inputElement.focus();
      inputElement.dispatchEvent(new Event("input"));
    }
  }
};
WuiSearchBar.styles = [resetStyles, styles_default21];
WuiSearchBar = __decorate39([
  customElement("wui-search-bar")
], WuiSearchBar);

// node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkMd.js
var networkSvgMd = svg`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-card-select-loader/styles.js
var styles_default22 = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-card-select-loader/index.js
var __decorate40 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiCardSelectLoader = class WuiCardSelectLoader2 extends LitElement {
  constructor() {
    super(...arguments);
    this.type = "wallet";
  }
  render() {
    return html`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `;
  }
  shimmerTemplate() {
    if (this.type === "network") {
      return html` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${networkSvgMd}`;
    }
    return html`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
  }
};
WuiCardSelectLoader.styles = [resetStyles, elementStyles, styles_default22];
__decorate40([
  property()
], WuiCardSelectLoader.prototype, "type", void 0);
WuiCardSelectLoader = __decorate40([
  customElement("wui-card-select-loader")
], WuiCardSelectLoader);

// node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-grid/styles.js
var styles_default23 = css`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-grid/index.js
var __decorate41 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiGrid = class WuiGrid2 extends LitElement {
  render() {
    this.style.cssText = `
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap && `var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 3)};
    `;
    return html`<slot></slot>`;
  }
};
WuiGrid.styles = [resetStyles, styles_default23];
__decorate41([
  property()
], WuiGrid.prototype, "gridTemplateRows", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "gridTemplateColumns", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "justifyItems", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "alignItems", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "justifyContent", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "alignContent", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "columnGap", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "rowGap", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "gap", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "padding", void 0);
__decorate41([
  property()
], WuiGrid.prototype, "margin", void 0);
WuiGrid = __decorate41([
  customElement("wui-grid")
], WuiGrid);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list-item/styles.js
var styles_default24 = css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list-item/index.js
var __decorate42 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mAllWalletsListItem = class W3mAllWalletsListItem2 extends LitElement {
  constructor() {
    super();
    this.observer = new IntersectionObserver(() => void 0);
    this.visible = false;
    this.imageSrc = void 0;
    this.imageLoading = false;
    this.wallet = void 0;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.visible = true;
          this.fetchImageSrc();
        } else {
          this.visible = false;
        }
      });
    }, { threshold: 0.01 });
  }
  firstUpdated() {
    this.observer.observe(this);
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  render() {
    var _a, _b;
    const certified = ((_a = this.wallet) == null ? void 0 : _a.badge_type) === "certified";
    return html`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${ifDefined(certified ? "certified" : void 0)}
            >${(_b = this.wallet) == null ? void 0 : _b.name}</wui-text
          >
          ${certified ? html`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>` : null}
        </wui-flex>
      </button>
    `;
  }
  imageTemplate() {
    var _a, _b;
    if (!this.visible && !this.imageSrc || this.imageLoading) {
      return this.shimmerTemplate();
    }
    return html`
      <wui-wallet-image
        size="md"
        imageSrc=${ifDefined(this.imageSrc)}
        name=${(_a = this.wallet) == null ? void 0 : _a.name}
        .installed=${(_b = this.wallet) == null ? void 0 : _b.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `;
  }
  shimmerTemplate() {
    return html`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
  }
  async fetchImageSrc() {
    if (!this.wallet) {
      return;
    }
    this.imageSrc = AssetUtil.getWalletImage(this.wallet);
    if (this.imageSrc) {
      return;
    }
    this.imageLoading = true;
    this.imageSrc = await AssetUtil.fetchWalletImage(this.wallet.image_id);
    this.imageLoading = false;
  }
};
W3mAllWalletsListItem.styles = styles_default24;
__decorate42([
  state()
], W3mAllWalletsListItem.prototype, "visible", void 0);
__decorate42([
  state()
], W3mAllWalletsListItem.prototype, "imageSrc", void 0);
__decorate42([
  state()
], W3mAllWalletsListItem.prototype, "imageLoading", void 0);
__decorate42([
  property()
], W3mAllWalletsListItem.prototype, "wallet", void 0);
W3mAllWalletsListItem = __decorate42([
  customElement("w3m-all-wallets-list-item")
], W3mAllWalletsListItem);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list/styles.js
var styles_default25 = css`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list/index.js
var __decorate43 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PAGINATOR_ID = "local-paginator";
var W3mAllWalletsList = class W3mAllWalletsList2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.paginationObserver = void 0;
    this.loading = !ApiController.state.wallets.length;
    this.wallets = ApiController.state.wallets;
    this.recommended = ApiController.state.recommended;
    this.featured = ApiController.state.featured;
    this.unsubscribe.push(...[
      ApiController.subscribeKey("wallets", (val) => this.wallets = val),
      ApiController.subscribeKey("recommended", (val) => this.recommended = val),
      ApiController.subscribeKey("featured", (val) => this.featured = val)
    ]);
  }
  firstUpdated() {
    this.initialFetch();
    this.createPaginationObserver();
  }
  disconnectedCallback() {
    var _a;
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    (_a = this.paginationObserver) == null ? void 0 : _a.disconnect();
  }
  render() {
    return html`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0", "s", "s", "s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading ? this.shimmerTemplate(16) : this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `;
  }
  async initialFetch() {
    var _a;
    this.loading = true;
    const gridEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("wui-grid");
    if (gridEl) {
      await ApiController.fetchWallets({ page: 1 });
      await gridEl.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.loading = false;
      gridEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  shimmerTemplate(items, id) {
    return [...Array(items)].map(() => html`
        <wui-card-select-loader type="wallet" id=${ifDefined(id)}></wui-card-select-loader>
      `);
  }
  walletsTemplate() {
    const wallets = CoreHelperUtil.uniqueBy([...this.featured, ...this.recommended, ...this.wallets], "id");
    const walletsWithInstalled = WalletUtil.markWalletsAsInstalled(wallets);
    return walletsWithInstalled.map((wallet) => html`
        <w3m-all-wallets-list-item
          @click=${() => this.onConnectWallet(wallet)}
          .wallet=${wallet}
        ></w3m-all-wallets-list-item>
      `);
  }
  paginationLoaderTemplate() {
    const { wallets, recommended, featured, count } = ApiController.state;
    const columns = window.innerWidth < 352 ? 3 : 4;
    const currentWallets = wallets.length + recommended.length;
    const minimumRows = Math.ceil(currentWallets / columns);
    let shimmerCount = minimumRows * columns - currentWallets + columns;
    shimmerCount -= wallets.length ? featured.length % columns : 0;
    if (count === 0 && featured.length > 0) {
      return null;
    }
    if (count === 0 || [...featured, ...wallets, ...recommended].length < count) {
      return this.shimmerTemplate(shimmerCount, PAGINATOR_ID);
    }
    return null;
  }
  createPaginationObserver() {
    var _a;
    const loaderEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(`#${PAGINATOR_ID}`);
    if (loaderEl) {
      this.paginationObserver = new IntersectionObserver(([element]) => {
        if ((element == null ? void 0 : element.isIntersecting) && !this.loading) {
          const { page, count, wallets } = ApiController.state;
          if (wallets.length < count) {
            ApiController.fetchWallets({ page: page + 1 });
          }
        }
      });
      this.paginationObserver.observe(loaderEl);
    }
  }
  onConnectWallet(wallet) {
    ConnectorController.selectWalletConnector(wallet);
  }
};
W3mAllWalletsList.styles = styles_default25;
__decorate43([
  state()
], W3mAllWalletsList.prototype, "loading", void 0);
__decorate43([
  state()
], W3mAllWalletsList.prototype, "wallets", void 0);
__decorate43([
  state()
], W3mAllWalletsList.prototype, "recommended", void 0);
__decorate43([
  state()
], W3mAllWalletsList.prototype, "featured", void 0);
W3mAllWalletsList = __decorate43([
  customElement("w3m-all-wallets-list")
], W3mAllWalletsList);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-search/styles.js
var styles_default26 = css`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-search/index.js
var __decorate44 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mAllWalletsSearch = class W3mAllWalletsSearch2 extends LitElement {
  constructor() {
    super(...arguments);
    this.prevQuery = "";
    this.prevBadge = void 0;
    this.loading = true;
    this.query = "";
  }
  render() {
    this.onSearch();
    return this.loading ? html`<wui-loading-spinner color="accent-100"></wui-loading-spinner>` : this.walletsTemplate();
  }
  async onSearch() {
    if (this.query.trim() !== this.prevQuery.trim() || this.badge !== this.prevBadge) {
      this.prevQuery = this.query;
      this.prevBadge = this.badge;
      this.loading = true;
      await ApiController.searchWallet({ search: this.query, badge: this.badge });
      this.loading = false;
    }
  }
  walletsTemplate() {
    const { search } = ApiController.state;
    const wallets = WalletUtil.markWalletsAsInstalled(search);
    if (!search.length) {
      return html`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `;
    }
    return html`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0", "s", "s", "s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${wallets.map((wallet) => html`
            <w3m-all-wallets-list-item
              @click=${() => this.onConnectWallet(wallet)}
              .wallet=${wallet}
              data-testid="wallet-search-item-${wallet.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `;
  }
  onConnectWallet(wallet) {
    ConnectorController.selectWalletConnector(wallet);
  }
};
W3mAllWalletsSearch.styles = styles_default26;
__decorate44([
  state()
], W3mAllWalletsSearch.prototype, "loading", void 0);
__decorate44([
  property()
], W3mAllWalletsSearch.prototype, "query", void 0);
__decorate44([
  property()
], W3mAllWalletsSearch.prototype, "badge", void 0);
W3mAllWalletsSearch = __decorate44([
  customElement("w3m-all-wallets-search")
], W3mAllWalletsSearch);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-all-wallets-view/index.js
var __decorate45 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mAllWalletsView = class W3mAllWalletsView2 extends LitElement {
  constructor() {
    super(...arguments);
    this.search = "";
    this.onDebouncedSearch = CoreHelperUtil.debounce((value) => {
      this.search = value;
    });
  }
  render() {
    const isSearch = this.search.length >= 2;
    return html`
      <wui-flex .padding=${["0", "s", "s", "s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${isSearch || this.badge ? html`<w3m-all-wallets-search
            query=${this.search}
            badge=${ifDefined(this.badge)}
          ></w3m-all-wallets-search>` : html`<w3m-all-wallets-list badge=${ifDefined(this.badge)}></w3m-all-wallets-list>`}
    `;
  }
  onInputChange(event) {
    this.onDebouncedSearch(event.detail);
  }
  onClick() {
    if (this.badge === "certified") {
      this.badge = void 0;
      return;
    }
    this.badge = "certified";
    SnackController.showSvg("Only WalletConnect certified", {
      icon: "walletConnectBrown",
      iconColor: "accent-100"
    });
  }
  qrButtonTemplate() {
    if (CoreHelperUtil.isMobile()) {
      return html`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `;
    }
    return null;
  }
  onWalletConnectQr() {
    RouterController.push("ConnectingWalletConnect");
  }
};
__decorate45([
  state()
], W3mAllWalletsView.prototype, "search", void 0);
__decorate45([
  state()
], W3mAllWalletsView.prototype, "badge", void 0);
W3mAllWalletsView = __decorate45([
  customElement("w3m-all-wallets-view")
], W3mAllWalletsView);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-item/styles.js
var styles_default27 = css`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-item/index.js
var __decorate46 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiListItem = class WuiListItem2 extends LitElement {
  constructor() {
    super(...arguments);
    this.tabIdx = void 0;
    this.variant = "icon";
    this.disabled = false;
    this.imageSrc = void 0;
    this.alt = void 0;
    this.chevron = false;
    this.loading = false;
  }
  render() {
    return html`
      <button
        ?disabled=${this.loading ? true : Boolean(this.disabled)}
        data-loading=${this.loading}
        data-iconvariant=${ifDefined(this.iconVariant)}
        tabindex=${ifDefined(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `;
  }
  visualTemplate() {
    if (this.variant === "image" && this.imageSrc) {
      return html`<wui-image src=${this.imageSrc} alt=${this.alt ?? "list item"}></wui-image>`;
    }
    if (this.iconVariant === "square" && this.icon && this.variant === "icon") {
      return html`<wui-icon name=${this.icon}></wui-icon>`;
    }
    if (this.variant === "icon" && this.icon && this.iconVariant) {
      const color = ["blue", "square-blue"].includes(this.iconVariant) ? "accent-100" : "fg-200";
      const size = this.iconVariant === "square-blue" ? "mdl" : "md";
      const iconSize = this.iconSize ? this.iconSize : size;
      return html`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${iconSize}
          background="transparent"
          iconColor=${color}
          backgroundColor=${color}
          size=${size}
        ></wui-icon-box>
      `;
    }
    return null;
  }
  loadingTemplate() {
    if (this.loading) {
      return html`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`;
    }
    return html``;
  }
  chevronTemplate() {
    if (this.chevron) {
      return html`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`;
    }
    return null;
  }
};
WuiListItem.styles = [resetStyles, elementStyles, styles_default27];
__decorate46([
  property()
], WuiListItem.prototype, "icon", void 0);
__decorate46([
  property()
], WuiListItem.prototype, "iconSize", void 0);
__decorate46([
  property()
], WuiListItem.prototype, "tabIdx", void 0);
__decorate46([
  property()
], WuiListItem.prototype, "variant", void 0);
__decorate46([
  property()
], WuiListItem.prototype, "iconVariant", void 0);
__decorate46([
  property({ type: Boolean })
], WuiListItem.prototype, "disabled", void 0);
__decorate46([
  property()
], WuiListItem.prototype, "imageSrc", void 0);
__decorate46([
  property()
], WuiListItem.prototype, "alt", void 0);
__decorate46([
  property({ type: Boolean })
], WuiListItem.prototype, "chevron", void 0);
__decorate46([
  property({ type: Boolean })
], WuiListItem.prototype, "loading", void 0);
WuiListItem = __decorate46([
  customElement("wui-list-item")
], WuiListItem);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-downloads-view/index.js
var __decorate47 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mDownloadsView = class W3mDownloadsView2 extends LitElement {
  constructor() {
    var _a;
    super(...arguments);
    this.wallet = (_a = RouterController.state.data) == null ? void 0 : _a.wallet;
  }
  render() {
    if (!this.wallet) {
      throw new Error("w3m-downloads-view");
    }
    return html`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s", "s", "l", "s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `;
  }
  chromeTemplate() {
    var _a;
    if (!((_a = this.wallet) == null ? void 0 : _a.chrome_store)) {
      return null;
    }
    return html`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`;
  }
  iosTemplate() {
    var _a;
    if (!((_a = this.wallet) == null ? void 0 : _a.app_store)) {
      return null;
    }
    return html`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`;
  }
  androidTemplate() {
    var _a;
    if (!((_a = this.wallet) == null ? void 0 : _a.play_store)) {
      return null;
    }
    return html`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`;
  }
  homepageTemplate() {
    var _a;
    if (!((_a = this.wallet) == null ? void 0 : _a.homepage)) {
      return null;
    }
    return html`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `;
  }
  onChromeStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.chrome_store) {
      CoreHelperUtil.openHref(this.wallet.chrome_store, "_blank");
    }
  }
  onAppStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.app_store) {
      CoreHelperUtil.openHref(this.wallet.app_store, "_blank");
    }
  }
  onPlayStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.play_store) {
      CoreHelperUtil.openHref(this.wallet.play_store, "_blank");
    }
  }
  onHomePage() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.homepage) {
      CoreHelperUtil.openHref(this.wallet.homepage, "_blank");
    }
  }
};
W3mDownloadsView = __decorate47([
  customElement("w3m-downloads-view")
], W3mDownloadsView);
export {
  W3mAllWalletsView,
  W3mConnectingWcBasicView,
  W3mDownloadsView
};
/*! Bundled license information:

lit-html/development/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=basic-265P6DOH.js.map

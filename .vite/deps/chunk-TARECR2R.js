import {
  AtomicReadyWalletRejectedUpgradeError,
  AtomicityNotSupportedError,
  BaseError,
  BaseError2,
  BundleTooLargeError,
  ChainDisconnectedError,
  DuplicateIdError,
  ExecutionRevertedError,
  FeeCapTooHighError,
  HttpRequestError,
  InternalRpcError,
  InvalidAddressError,
  InvalidChainIdError,
  InvalidInputRpcError,
  InvalidLegacyVError,
  InvalidParamsRpcError,
  InvalidRequestRpcError,
  InvalidSerializableTransactionError,
  InvalidStorageKeySizeError,
  JsonRpcVersionUnsupportedError,
  LimitExceededRpcError,
  LruMap as LruMap2,
  MethodNotFoundRpcError,
  MethodNotSupportedRpcError,
  ParseRpcError,
  ProviderDisconnectedError,
  ResourceNotFoundRpcError,
  ResourceUnavailableRpcError,
  RpcRequestError,
  SwitchChainError,
  TimeoutError,
  TipAboveFeeCapError,
  TransactionRejectedRpcError,
  UnauthorizedProviderError,
  UnknownBundleIdError,
  UnknownRpcError,
  UnsupportedChainIdError,
  UnsupportedNonOptionalCapabilityError,
  UnsupportedProviderMethodError,
  UserRejectedRequestError,
  bytesToHex,
  concat,
  concatHex,
  createBatchScheduler,
  createCursor,
  defineFormatter as defineFormatter2,
  formatUnits,
  from,
  fromBoolean,
  fromBytes,
  fromNumber,
  fromString,
  fromString2,
  hexToBytes,
  hexToNumber as hexToNumber2,
  isAddress,
  isHex,
  maxUint256,
  numberToHex as numberToHex2,
  padLeft,
  padRight,
  size,
  size2,
  slice,
  stringToHex,
  stringify,
  toBytes,
  toHex,
  trim
} from "./chunk-CZIQUEW2.js";
import {
  css,
  unsafeCSS
} from "./chunk-366LDVMV.js";
import {
  require_elliptic
} from "./chunk-KMQUIHVC.js";
import {
  HashMD as HashMD2
} from "./chunk-TWCWUMGZ.js";
import {
  LruMap,
  defineFormatter,
  hexToNumber,
  keccak_256 as keccak_2562,
  numberToHex
} from "./chunk-UASX4XJP.js";
import {
  rotl as rotl2,
  wrapConstructor
} from "./chunk-BWZI4TFE.js";
import {
  require_events
} from "./chunk-SQBP2HP4.js";
import {
  init_sha256,
  sha256
} from "./chunk-KPHJQWGP.js";
import {
  init_sha3,
  keccak_256
} from "./chunk-IBWGIHRU.js";
import {
  Chi,
  HashMD,
  Maj,
  init_md,
  init_secp256k1
} from "./chunk-VESSVHNC.js";
import {
  clean,
  createHasher,
  init_utils,
  rotl
} from "./chunk-Y5D73FR4.js";
import {
  __commonJS,
  __esm,
  __export,
  __reExport,
  __toCommonJS,
  __toESM
} from "./chunk-MVEJMUOB.js";

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/dayjs/dayjs.min.js"(exports, module) {
    !function(t2, e3) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e3() : "function" == typeof define && define.amd ? define(e3) : (t2 = "undefined" != typeof globalThis ? globalThis : t2 || self).dayjs = e3();
    }(exports, function() {
      "use strict";
      var t2 = 1e3, e3 = 6e4, n5 = 36e5, r3 = "millisecond", i5 = "second", s4 = "minute", u3 = "hour", a3 = "day", o5 = "week", c7 = "month", f7 = "quarter", h6 = "year", d5 = "date", l8 = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y4 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M4 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
        var e4 = ["th", "st", "nd", "rd"], n6 = t3 % 100;
        return "[" + t3 + (e4[(n6 - 20) % 10] || e4[n6] || e4[0]) + "]";
      } }, m4 = function(t3, e4, n6) {
        var r4 = String(t3);
        return !r4 || r4.length >= e4 ? t3 : "" + Array(e4 + 1 - r4.length).join(n6) + t3;
      }, v5 = { s: m4, z: function(t3) {
        var e4 = -t3.utcOffset(), n6 = Math.abs(e4), r4 = Math.floor(n6 / 60), i6 = n6 % 60;
        return (e4 <= 0 ? "+" : "-") + m4(r4, 2, "0") + ":" + m4(i6, 2, "0");
      }, m: function t3(e4, n6) {
        if (e4.date() < n6.date()) return -t3(n6, e4);
        var r4 = 12 * (n6.year() - e4.year()) + (n6.month() - e4.month()), i6 = e4.clone().add(r4, c7), s5 = n6 - i6 < 0, u4 = e4.clone().add(r4 + (s5 ? -1 : 1), c7);
        return +(-(r4 + (n6 - i6) / (s5 ? i6 - u4 : u4 - i6)) || 0);
      }, a: function(t3) {
        return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
      }, p: function(t3) {
        return { M: c7, y: h6, w: o5, d: a3, D: d5, h: u3, m: s4, s: i5, ms: r3, Q: f7 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t3) {
        return void 0 === t3;
      } }, g4 = "en", D = {};
      D[g4] = M4;
      var p4 = "$isDayjsObject", S3 = function(t3) {
        return t3 instanceof _3 || !(!t3 || !t3[p4]);
      }, w4 = function t3(e4, n6, r4) {
        var i6;
        if (!e4) return g4;
        if ("string" == typeof e4) {
          var s5 = e4.toLowerCase();
          D[s5] && (i6 = s5), n6 && (D[s5] = n6, i6 = s5);
          var u4 = e4.split("-");
          if (!i6 && u4.length > 1) return t3(u4[0]);
        } else {
          var a4 = e4.name;
          D[a4] = e4, i6 = a4;
        }
        return !r4 && i6 && (g4 = i6), i6 || !r4 && g4;
      }, O5 = function(t3, e4) {
        if (S3(t3)) return t3.clone();
        var n6 = "object" == typeof e4 ? e4 : {};
        return n6.date = t3, n6.args = arguments, new _3(n6);
      }, b4 = v5;
      b4.l = w4, b4.i = S3, b4.w = function(t3, e4) {
        return O5(t3, { locale: e4.$L, utc: e4.$u, x: e4.$x, $offset: e4.$offset });
      };
      var _3 = function() {
        function M5(t3) {
          this.$L = w4(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p4] = true;
        }
        var m5 = M5.prototype;
        return m5.parse = function(t3) {
          this.$d = function(t4) {
            var e4 = t4.date, n6 = t4.utc;
            if (null === e4) return /* @__PURE__ */ new Date(NaN);
            if (b4.u(e4)) return /* @__PURE__ */ new Date();
            if (e4 instanceof Date) return new Date(e4);
            if ("string" == typeof e4 && !/Z$/i.test(e4)) {
              var r4 = e4.match($);
              if (r4) {
                var i6 = r4[2] - 1 || 0, s5 = (r4[7] || "0").substring(0, 3);
                return n6 ? new Date(Date.UTC(r4[1], i6, r4[3] || 1, r4[4] || 0, r4[5] || 0, r4[6] || 0, s5)) : new Date(r4[1], i6, r4[3] || 1, r4[4] || 0, r4[5] || 0, r4[6] || 0, s5);
              }
            }
            return new Date(e4);
          }(t3), this.init();
        }, m5.init = function() {
          var t3 = this.$d;
          this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
        }, m5.$utils = function() {
          return b4;
        }, m5.isValid = function() {
          return !(this.$d.toString() === l8);
        }, m5.isSame = function(t3, e4) {
          var n6 = O5(t3);
          return this.startOf(e4) <= n6 && n6 <= this.endOf(e4);
        }, m5.isAfter = function(t3, e4) {
          return O5(t3) < this.startOf(e4);
        }, m5.isBefore = function(t3, e4) {
          return this.endOf(e4) < O5(t3);
        }, m5.$g = function(t3, e4, n6) {
          return b4.u(t3) ? this[e4] : this.set(n6, t3);
        }, m5.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m5.valueOf = function() {
          return this.$d.getTime();
        }, m5.startOf = function(t3, e4) {
          var n6 = this, r4 = !!b4.u(e4) || e4, f8 = b4.p(t3), l9 = function(t4, e5) {
            var i6 = b4.w(n6.$u ? Date.UTC(n6.$y, e5, t4) : new Date(n6.$y, e5, t4), n6);
            return r4 ? i6 : i6.endOf(a3);
          }, $2 = function(t4, e5) {
            return b4.w(n6.toDate()[t4].apply(n6.toDate("s"), (r4 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e5)), n6);
          }, y5 = this.$W, M6 = this.$M, m6 = this.$D, v6 = "set" + (this.$u ? "UTC" : "");
          switch (f8) {
            case h6:
              return r4 ? l9(1, 0) : l9(31, 11);
            case c7:
              return r4 ? l9(1, M6) : l9(0, M6 + 1);
            case o5:
              var g5 = this.$locale().weekStart || 0, D2 = (y5 < g5 ? y5 + 7 : y5) - g5;
              return l9(r4 ? m6 - D2 : m6 + (6 - D2), M6);
            case a3:
            case d5:
              return $2(v6 + "Hours", 0);
            case u3:
              return $2(v6 + "Minutes", 1);
            case s4:
              return $2(v6 + "Seconds", 2);
            case i5:
              return $2(v6 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m5.endOf = function(t3) {
          return this.startOf(t3, false);
        }, m5.$set = function(t3, e4) {
          var n6, o6 = b4.p(t3), f8 = "set" + (this.$u ? "UTC" : ""), l9 = (n6 = {}, n6[a3] = f8 + "Date", n6[d5] = f8 + "Date", n6[c7] = f8 + "Month", n6[h6] = f8 + "FullYear", n6[u3] = f8 + "Hours", n6[s4] = f8 + "Minutes", n6[i5] = f8 + "Seconds", n6[r3] = f8 + "Milliseconds", n6)[o6], $2 = o6 === a3 ? this.$D + (e4 - this.$W) : e4;
          if (o6 === c7 || o6 === h6) {
            var y5 = this.clone().set(d5, 1);
            y5.$d[l9]($2), y5.init(), this.$d = y5.set(d5, Math.min(this.$D, y5.daysInMonth())).$d;
          } else l9 && this.$d[l9]($2);
          return this.init(), this;
        }, m5.set = function(t3, e4) {
          return this.clone().$set(t3, e4);
        }, m5.get = function(t3) {
          return this[b4.p(t3)]();
        }, m5.add = function(r4, f8) {
          var d6, l9 = this;
          r4 = Number(r4);
          var $2 = b4.p(f8), y5 = function(t3) {
            var e4 = O5(l9);
            return b4.w(e4.date(e4.date() + Math.round(t3 * r4)), l9);
          };
          if ($2 === c7) return this.set(c7, this.$M + r4);
          if ($2 === h6) return this.set(h6, this.$y + r4);
          if ($2 === a3) return y5(1);
          if ($2 === o5) return y5(7);
          var M6 = (d6 = {}, d6[s4] = e3, d6[u3] = n5, d6[i5] = t2, d6)[$2] || 1, m6 = this.$d.getTime() + r4 * M6;
          return b4.w(m6, this);
        }, m5.subtract = function(t3, e4) {
          return this.add(-1 * t3, e4);
        }, m5.format = function(t3) {
          var e4 = this, n6 = this.$locale();
          if (!this.isValid()) return n6.invalidDate || l8;
          var r4 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i6 = b4.z(this), s5 = this.$H, u4 = this.$m, a4 = this.$M, o6 = n6.weekdays, c8 = n6.months, f8 = n6.meridiem, h7 = function(t4, n7, i7, s6) {
            return t4 && (t4[n7] || t4(e4, r4)) || i7[n7].slice(0, s6);
          }, d6 = function(t4) {
            return b4.s(s5 % 12 || 12, t4, "0");
          }, $2 = f8 || function(t4, e5, n7) {
            var r5 = t4 < 12 ? "AM" : "PM";
            return n7 ? r5.toLowerCase() : r5;
          };
          return r4.replace(y4, function(t4, r5) {
            return r5 || function(t5) {
              switch (t5) {
                case "YY":
                  return String(e4.$y).slice(-2);
                case "YYYY":
                  return b4.s(e4.$y, 4, "0");
                case "M":
                  return a4 + 1;
                case "MM":
                  return b4.s(a4 + 1, 2, "0");
                case "MMM":
                  return h7(n6.monthsShort, a4, c8, 3);
                case "MMMM":
                  return h7(c8, a4);
                case "D":
                  return e4.$D;
                case "DD":
                  return b4.s(e4.$D, 2, "0");
                case "d":
                  return String(e4.$W);
                case "dd":
                  return h7(n6.weekdaysMin, e4.$W, o6, 2);
                case "ddd":
                  return h7(n6.weekdaysShort, e4.$W, o6, 3);
                case "dddd":
                  return o6[e4.$W];
                case "H":
                  return String(s5);
                case "HH":
                  return b4.s(s5, 2, "0");
                case "h":
                  return d6(1);
                case "hh":
                  return d6(2);
                case "a":
                  return $2(s5, u4, true);
                case "A":
                  return $2(s5, u4, false);
                case "m":
                  return String(u4);
                case "mm":
                  return b4.s(u4, 2, "0");
                case "s":
                  return String(e4.$s);
                case "ss":
                  return b4.s(e4.$s, 2, "0");
                case "SSS":
                  return b4.s(e4.$ms, 3, "0");
                case "Z":
                  return i6;
              }
              return null;
            }(t4) || i6.replace(":", "");
          });
        }, m5.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m5.diff = function(r4, d6, l9) {
          var $2, y5 = this, M6 = b4.p(d6), m6 = O5(r4), v6 = (m6.utcOffset() - this.utcOffset()) * e3, g5 = this - m6, D2 = function() {
            return b4.m(y5, m6);
          };
          switch (M6) {
            case h6:
              $2 = D2() / 12;
              break;
            case c7:
              $2 = D2();
              break;
            case f7:
              $2 = D2() / 3;
              break;
            case o5:
              $2 = (g5 - v6) / 6048e5;
              break;
            case a3:
              $2 = (g5 - v6) / 864e5;
              break;
            case u3:
              $2 = g5 / n5;
              break;
            case s4:
              $2 = g5 / e3;
              break;
            case i5:
              $2 = g5 / t2;
              break;
            default:
              $2 = g5;
          }
          return l9 ? $2 : b4.a($2);
        }, m5.daysInMonth = function() {
          return this.endOf(c7).$D;
        }, m5.$locale = function() {
          return D[this.$L];
        }, m5.locale = function(t3, e4) {
          if (!t3) return this.$L;
          var n6 = this.clone(), r4 = w4(t3, e4, true);
          return r4 && (n6.$L = r4), n6;
        }, m5.clone = function() {
          return b4.w(this.$d, this);
        }, m5.toDate = function() {
          return new Date(this.valueOf());
        }, m5.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m5.toISOString = function() {
          return this.$d.toISOString();
        }, m5.toString = function() {
          return this.$d.toUTCString();
        }, M5;
      }(), k4 = _3.prototype;
      return O5.prototype = k4, [["$ms", r3], ["$s", i5], ["$m", s4], ["$H", u3], ["$W", a3], ["$M", c7], ["$y", h6], ["$D", d5]].forEach(function(t3) {
        k4[t3[1]] = function(e4) {
          return this.$g(e4, t3[0], t3[1]);
        };
      }), O5.extend = function(t3, e4) {
        return t3.$i || (t3(e4, _3, O5), t3.$i = true), O5;
      }, O5.locale = w4, O5.isDayjs = S3, O5.unix = function(t3) {
        return O5(1e3 * t3);
      }, O5.en = D[g4], O5.Ls = D, O5.p = {}, O5;
    });
  }
});

// node_modules/dayjs/locale/en.js
var require_en = __commonJS({
  "node_modules/dayjs/locale/en.js"(exports, module) {
    !function(e3, n5) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = n5() : "function" == typeof define && define.amd ? define(n5) : (e3 = "undefined" != typeof globalThis ? globalThis : e3 || self).dayjs_locale_en = n5();
    }(exports, function() {
      "use strict";
      return { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(e3) {
        var n5 = ["th", "st", "nd", "rd"], t2 = e3 % 100;
        return "[" + e3 + (n5[(t2 - 20) % 10] || n5[t2] || n5[0]) + "]";
      } };
    });
  }
});

// node_modules/dayjs/plugin/relativeTime.js
var require_relativeTime = __commonJS({
  "node_modules/dayjs/plugin/relativeTime.js"(exports, module) {
    !function(r3, e3) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e3() : "function" == typeof define && define.amd ? define(e3) : (r3 = "undefined" != typeof globalThis ? globalThis : r3 || self).dayjs_plugin_relativeTime = e3();
    }(exports, function() {
      "use strict";
      return function(r3, e3, t2) {
        r3 = r3 || {};
        var n5 = e3.prototype, o5 = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
        function i5(r4, e4, t3, o6) {
          return n5.fromToBase(r4, e4, t3, o6);
        }
        t2.en.relativeTime = o5, n5.fromToBase = function(e4, n6, i6, d6, u3) {
          for (var f7, a3, s4, l8 = i6.$locale().relativeTime || o5, h6 = r3.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m4 = h6.length, c7 = 0; c7 < m4; c7 += 1) {
            var y4 = h6[c7];
            y4.d && (f7 = d6 ? t2(e4).diff(i6, y4.d, true) : i6.diff(e4, y4.d, true));
            var p4 = (r3.rounding || Math.round)(Math.abs(f7));
            if (s4 = f7 > 0, p4 <= y4.r || !y4.r) {
              p4 <= 1 && c7 > 0 && (y4 = h6[c7 - 1]);
              var v5 = l8[y4.l];
              u3 && (p4 = u3("" + p4)), a3 = "string" == typeof v5 ? v5.replace("%d", p4) : v5(p4, n6, y4.l, s4);
              break;
            }
          }
          if (n6) return a3;
          var M4 = s4 ? l8.future : l8.past;
          return "function" == typeof M4 ? M4(a3) : M4.replace("%s", a3);
        }, n5.to = function(r4, e4) {
          return i5(r4, e4, this, true);
        }, n5.from = function(r4, e4) {
          return i5(r4, e4, this);
        };
        var d5 = function(r4) {
          return r4.$u ? t2.utc() : t2();
        };
        n5.toNow = function(r4) {
          return this.to(d5(this), r4);
        }, n5.fromNow = function(r4) {
          return this.from(d5(this), r4);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/updateLocale.js
var require_updateLocale = __commonJS({
  "node_modules/dayjs/plugin/updateLocale.js"(exports, module) {
    !function(e3, n5) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = n5() : "function" == typeof define && define.amd ? define(n5) : (e3 = "undefined" != typeof globalThis ? globalThis : e3 || self).dayjs_plugin_updateLocale = n5();
    }(exports, function() {
      "use strict";
      return function(e3, n5, t2) {
        t2.updateLocale = function(e4, n6) {
          var o5 = t2.Ls[e4];
          if (o5) return (n6 ? Object.keys(n6) : []).forEach(function(e5) {
            o5[e5] = n6[e5];
          }), o5;
        };
      };
    });
  }
});

// node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values
});
function __extends(d5, b4) {
  extendStatics(d5, b4);
  function __() {
    this.constructor = d5;
  }
  d5.prototype = b4 === null ? Object.create(b4) : (__.prototype = b4.prototype, new __());
}
function __rest(s4, e3) {
  var t2 = {};
  for (var p4 in s4) if (Object.prototype.hasOwnProperty.call(s4, p4) && e3.indexOf(p4) < 0)
    t2[p4] = s4[p4];
  if (s4 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i5 = 0, p4 = Object.getOwnPropertySymbols(s4); i5 < p4.length; i5++) {
      if (e3.indexOf(p4[i5]) < 0 && Object.prototype.propertyIsEnumerable.call(s4, p4[i5]))
        t2[p4[i5]] = s4[p4[i5]];
    }
  return t2;
}
function __decorate(decorators, target, key, desc) {
  var c7 = arguments.length, r3 = c7 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d5;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
  else for (var i5 = decorators.length - 1; i5 >= 0; i5--) if (d5 = decorators[i5]) r3 = (c7 < 3 ? d5(r3) : c7 > 3 ? d5(target, key, r3) : d5(target, key)) || r3;
  return c7 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P6, generator) {
  function adopt(value) {
    return value instanceof P6 ? value : new P6(function(resolve) {
      resolve(value);
    });
  }
  return new (P6 || (P6 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t2[0] & 1) throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f7, y4, t2, g4;
  return g4 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g4[Symbol.iterator] = function() {
    return this;
  }), g4;
  function verb(n5) {
    return function(v5) {
      return step([n5, v5]);
    };
  }
  function step(op) {
    if (f7) throw new TypeError("Generator is already executing.");
    while (_3) try {
      if (f7 = 1, y4 && (t2 = op[0] & 2 ? y4["return"] : op[0] ? y4["throw"] || ((t2 = y4["return"]) && t2.call(y4), 0) : y4.next) && !(t2 = t2.call(y4, op[1])).done) return t2;
      if (y4 = 0, t2) op = [op[0] & 2, t2.value];
      switch (op[0]) {
        case 0:
        case 1:
          t2 = op;
          break;
        case 4:
          _3.label++;
          return { value: op[1], done: false };
        case 5:
          _3.label++;
          y4 = op[1];
          op = [0];
          continue;
        case 7:
          op = _3.ops.pop();
          _3.trys.pop();
          continue;
        default:
          if (!(t2 = _3.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _3 = 0;
            continue;
          }
          if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
            _3.label = op[1];
            break;
          }
          if (op[0] === 6 && _3.label < t2[1]) {
            _3.label = t2[1];
            t2 = op;
            break;
          }
          if (t2 && _3.label < t2[2]) {
            _3.label = t2[2];
            _3.ops.push(op);
            break;
          }
          if (t2[2]) _3.ops.pop();
          _3.trys.pop();
          continue;
      }
      op = body.call(thisArg, _3);
    } catch (e3) {
      op = [6, e3];
      y4 = 0;
    } finally {
      f7 = t2 = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o5, m4, k4, k22) {
  if (k22 === void 0) k22 = k4;
  o5[k22] = m4[k4];
}
function __exportStar(m4, exports) {
  for (var p4 in m4) if (p4 !== "default" && !exports.hasOwnProperty(p4)) exports[p4] = m4[p4];
}
function __values(o5) {
  var s4 = typeof Symbol === "function" && Symbol.iterator, m4 = s4 && o5[s4], i5 = 0;
  if (m4) return m4.call(o5);
  if (o5 && typeof o5.length === "number") return {
    next: function() {
      if (o5 && i5 >= o5.length) o5 = void 0;
      return { value: o5 && o5[i5++], done: !o5 };
    }
  };
  throw new TypeError(s4 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o5, n5) {
  var m4 = typeof Symbol === "function" && o5[Symbol.iterator];
  if (!m4) return o5;
  var i5 = m4.call(o5), r3, ar3 = [], e3;
  try {
    while ((n5 === void 0 || n5-- > 0) && !(r3 = i5.next()).done) ar3.push(r3.value);
  } catch (error) {
    e3 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m4 = i5["return"])) m4.call(i5);
    } finally {
      if (e3) throw e3.error;
    }
  }
  return ar3;
}
function __spread() {
  for (var ar3 = [], i5 = 0; i5 < arguments.length; i5++)
    ar3 = ar3.concat(__read(arguments[i5]));
  return ar3;
}
function __spreadArrays() {
  for (var s4 = 0, i5 = 0, il = arguments.length; i5 < il; i5++) s4 += arguments[i5].length;
  for (var r3 = Array(s4), k4 = 0, i5 = 0; i5 < il; i5++)
    for (var a3 = arguments[i5], j3 = 0, jl = a3.length; j3 < jl; j3++, k4++)
      r3[k4] = a3[j3];
  return r3;
}
function __await(v5) {
  return this instanceof __await ? (this.v = v5, this) : new __await(v5);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g4 = generator.apply(thisArg, _arguments || []), i5, q2 = [];
  return i5 = {}, verb("next"), verb("throw"), verb("return"), i5[Symbol.asyncIterator] = function() {
    return this;
  }, i5;
  function verb(n5) {
    if (g4[n5]) i5[n5] = function(v5) {
      return new Promise(function(a3, b4) {
        q2.push([n5, v5, a3, b4]) > 1 || resume(n5, v5);
      });
    };
  }
  function resume(n5, v5) {
    try {
      step(g4[n5](v5));
    } catch (e3) {
      settle(q2[0][3], e3);
    }
  }
  function step(r3) {
    r3.value instanceof __await ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q2[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f7, v5) {
    if (f7(v5), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator(o5) {
  var i5, p4;
  return i5 = {}, verb("next"), verb("throw", function(e3) {
    throw e3;
  }), verb("return"), i5[Symbol.iterator] = function() {
    return this;
  }, i5;
  function verb(n5, f7) {
    i5[n5] = o5[n5] ? function(v5) {
      return (p4 = !p4) ? { value: __await(o5[n5](v5)), done: n5 === "return" } : f7 ? f7(v5) : v5;
    } : f7;
  }
}
function __asyncValues(o5) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m4 = o5[Symbol.asyncIterator], i5;
  return m4 ? m4.call(o5) : (o5 = typeof __values === "function" ? __values(o5) : o5[Symbol.iterator](), i5 = {}, verb("next"), verb("throw"), verb("return"), i5[Symbol.asyncIterator] = function() {
    return this;
  }, i5);
  function verb(n5) {
    i5[n5] = o5[n5] && function(v5) {
      return new Promise(function(resolve, reject) {
        v5 = o5[n5](v5), settle(resolve, reject, v5.done, v5.value);
      });
    };
  }
  function settle(resolve, reject, d5, v5) {
    Promise.resolve(v5).then(function(v6) {
      resolve({ value: v6, done: d5 });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k4 in mod) if (Object.hasOwnProperty.call(mod, k4)) result[k4] = mod[k4];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics, __assign;
var init_tslib_es6 = __esm({
  "node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js"() {
    extendStatics = function(d5, b4) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d6, b5) {
        d6.__proto__ = b5;
      } || function(d6, b5) {
        for (var p4 in b5) if (b5.hasOwnProperty(p4)) d6[p4] = b5[p4];
      };
      return extendStatics(d5, b4);
    };
    __assign = function() {
      __assign = Object.assign || function __assign3(t2) {
        for (var s4, i5 = 1, n5 = arguments.length; i5 < n5; i5++) {
          s4 = arguments[i5];
          for (var p4 in s4) if (Object.prototype.hasOwnProperty.call(s4, p4)) t2[p4] = s4[p4];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    function delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      });
    }
    exports.delay = delay;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
    exports.ONE_HUNDRED = 100;
    exports.ONE_THOUSAND = 1e3;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_misc(), exports);
    tslib_1.__exportStar(require_time(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/convert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromMiliseconds = exports.toMiliseconds = void 0;
    var constants_1 = require_constants();
    function toMiliseconds(seconds) {
      return seconds * constants_1.ONE_THOUSAND;
    }
    exports.toMiliseconds = toMiliseconds;
    function fromMiliseconds(miliseconds) {
      return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
    }
    exports.fromMiliseconds = fromMiliseconds;
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_delay(), exports);
    tslib_1.__exportStar(require_convert(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Watch = void 0;
    var Watch = class {
      constructor() {
        this.timestamps = /* @__PURE__ */ new Map();
      }
      start(label) {
        if (this.timestamps.has(label)) {
          throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, { started: Date.now() });
      }
      stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
          throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, { started: timestamp.started, elapsed });
      }
      get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
          throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
      }
      elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
      }
    };
    exports.Watch = Watch;
    exports.default = Watch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IWatch = void 0;
    var IWatch = class {
    };
    exports.IWatch = IWatch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_watch2(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_utils(), exports);
    tslib_1.__exportStar(require_watch(), exports);
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/quick-format-unescaped/index.js"(exports, module) {
    "use strict";
    function tryStringify(o5) {
      try {
        return JSON.stringify(o5);
      } catch (e3) {
        return '"[Circular]"';
      }
    }
    module.exports = format;
    function format(f7, args, opts) {
      var ss2 = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f7 === "object" && f7 !== null) {
        var len = args.length + offset;
        if (len === 1) return f7;
        var objects = new Array(len);
        objects[0] = ss2(f7);
        for (var index2 = 1; index2 < len; index2++) {
          objects[index2] = ss2(args[index2]);
        }
        return objects.join(" ");
      }
      if (typeof f7 !== "string") {
        return f7;
      }
      var argLen = args.length;
      if (argLen === 0) return f7;
      var str = "";
      var a3 = 1 - offset;
      var lastPos = -1;
      var flen = f7 && f7.length || 0;
      for (var i5 = 0; i5 < flen; ) {
        if (f7.charCodeAt(i5) === 37 && i5 + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f7.charCodeAt(i5 + 1)) {
            case 100:
            case 102:
              if (a3 >= argLen)
                break;
              if (args[a3] == null) break;
              if (lastPos < i5)
                str += f7.slice(lastPos, i5);
              str += Number(args[a3]);
              lastPos = i5 + 2;
              i5++;
              break;
            case 105:
              if (a3 >= argLen)
                break;
              if (args[a3] == null) break;
              if (lastPos < i5)
                str += f7.slice(lastPos, i5);
              str += Math.floor(Number(args[a3]));
              lastPos = i5 + 2;
              i5++;
              break;
            case 79:
            case 111:
            case 106:
              if (a3 >= argLen)
                break;
              if (args[a3] === void 0) break;
              if (lastPos < i5)
                str += f7.slice(lastPos, i5);
              var type = typeof args[a3];
              if (type === "string") {
                str += "'" + args[a3] + "'";
                lastPos = i5 + 2;
                i5++;
                break;
              }
              if (type === "function") {
                str += args[a3].name || "<anonymous>";
                lastPos = i5 + 2;
                i5++;
                break;
              }
              str += ss2(args[a3]);
              lastPos = i5 + 2;
              i5++;
              break;
            case 115:
              if (a3 >= argLen)
                break;
              if (lastPos < i5)
                str += f7.slice(lastPos, i5);
              str += String(args[a3]);
              lastPos = i5 + 2;
              i5++;
              break;
            case 37:
              if (lastPos < i5)
                str += f7.slice(lastPos, i5);
              str += "%";
              lastPos = i5 + 2;
              i5++;
              a3--;
              break;
          }
          ++a3;
        }
        ++i5;
      }
      if (lastPos === -1)
        return f7;
      else if (lastPos < flen) {
        str += f7.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/pino/browser.js
var require_browser = __commonJS({
  "node_modules/pino/browser.js"(exports, module) {
    "use strict";
    var format = require_quick_format_unescaped();
    module.exports = pino;
    var _console = pfGlobalThisOrFallback().console || {};
    var stdSerializers = {
      mapHttpRequest: mock,
      mapHttpResponse: mock,
      wrapRequestSerializer: passthrough,
      wrapResponseSerializer: passthrough,
      wrapErrorSerializer: passthrough,
      req: mock,
      res: mock,
      err: asErrValue
    };
    function shouldSerialize(serialize, serializers) {
      if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k4) {
          return k4 !== "!stdSerializers.err";
        });
        return hasToFilter;
      } else if (serialize === true) {
        return Object.keys(serializers);
      }
      return false;
    }
    function pino(opts) {
      opts = opts || {};
      opts.browser = opts.browser || {};
      const transmit2 = opts.browser.transmit;
      if (transmit2 && typeof transmit2.send !== "function") {
        throw Error("pino: transmit option must have a send function");
      }
      const proto = opts.browser.write || _console;
      if (opts.browser.write) opts.browser.asObject = true;
      const serializers = opts.serializers || {};
      const serialize = shouldSerialize(opts.browser.serialize, serializers);
      let stdErrSerialize = opts.browser.serialize;
      if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1) stdErrSerialize = false;
      const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
      if (typeof proto === "function") {
        proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
      }
      if (opts.enabled === false) opts.level = "silent";
      const level = opts.level || "info";
      const logger = Object.create(proto);
      if (!logger.log) logger.log = noop;
      Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
      });
      Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
      });
      const setOpts = {
        transmit: transmit2,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
      };
      logger.levels = pino.levels;
      logger.level = level;
      logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
      logger.serializers = serializers;
      logger._serialize = serialize;
      logger._stdErrSerialize = stdErrSerialize;
      logger.child = child;
      if (transmit2) logger._logEvent = createLogEventShape();
      function getLevelVal() {
        return this.level === "silent" ? Infinity : this.levels.values[this.level];
      }
      function getLevel() {
        return this._level;
      }
      function setLevel(level2) {
        if (level2 !== "silent" && !this.levels.values[level2]) {
          throw Error("unknown level " + level2);
        }
        this._level = level2;
        set2(setOpts, logger, "error", "log");
        set2(setOpts, logger, "fatal", "error");
        set2(setOpts, logger, "warn", "error");
        set2(setOpts, logger, "info", "log");
        set2(setOpts, logger, "debug", "log");
        set2(setOpts, logger, "trace", "log");
      }
      function child(bindings, childOptions) {
        if (!bindings) {
          throw new Error("missing bindings for child Pino");
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
          childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
          var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
          var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
          delete bindings.serializers;
          applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
          this._childLevel = (parent._childLevel | 0) + 1;
          this.error = bind(parent, bindings, "error");
          this.fatal = bind(parent, bindings, "fatal");
          this.warn = bind(parent, bindings, "warn");
          this.info = bind(parent, bindings, "info");
          this.debug = bind(parent, bindings, "debug");
          this.trace = bind(parent, bindings, "trace");
          if (childSerializers) {
            this.serializers = childSerializers;
            this._serialize = childSerialize;
          }
          if (transmit2) {
            this._logEvent = createLogEventShape(
              [].concat(parent._logEvent.bindings, bindings)
            );
          }
        }
        Child.prototype = this;
        return new Child(this);
      }
      return logger;
    }
    pino.levels = {
      values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
      }
    };
    pino.stdSerializers = stdSerializers;
    pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
    function set2(opts, logger, level, fallback3) {
      const proto = Object.getPrototypeOf(logger);
      logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback3] || noop;
      wrap(opts, logger, level);
    }
    function wrap(opts, logger, level) {
      if (!opts.transmit && logger[level] === noop) return;
      logger[level] = /* @__PURE__ */ function(write) {
        return function LOG() {
          const ts = opts.timestamp();
          const args = new Array(arguments.length);
          const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
          for (var i5 = 0; i5 < args.length; i5++) args[i5] = arguments[i5];
          if (opts.serialize && !opts.asObject) {
            applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
          }
          if (opts.asObject) write.call(proto, asObject(this, level, args, ts));
          else write.apply(proto, args);
          if (opts.transmit) {
            const transmitLevel = opts.transmit.level || logger.level;
            const transmitValue = pino.levels.values[transmitLevel];
            const methodValue = pino.levels.values[level];
            if (methodValue < transmitValue) return;
            transmit(this, {
              ts,
              methodLevel: level,
              methodValue,
              transmitLevel,
              transmitValue: pino.levels.values[opts.transmit.level || logger.level],
              send: opts.transmit.send,
              val: logger.levelVal
            }, args);
          }
        };
      }(logger[level]);
    }
    function asObject(logger, level, args, ts) {
      if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
      const argsCloned = args.slice();
      let msg = argsCloned[0];
      const o5 = {};
      if (ts) {
        o5.time = ts;
      }
      o5.level = pino.levels.values[level];
      let lvl = (logger._childLevel | 0) + 1;
      if (lvl < 1) lvl = 1;
      if (msg !== null && typeof msg === "object") {
        while (lvl-- && typeof argsCloned[0] === "object") {
          Object.assign(o5, argsCloned.shift());
        }
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
      } else if (typeof msg === "string") msg = format(argsCloned.shift(), argsCloned);
      if (msg !== void 0) o5.msg = msg;
      return o5;
    }
    function applySerializers(args, serialize, serializers, stdErrSerialize) {
      for (const i5 in args) {
        if (stdErrSerialize && args[i5] instanceof Error) {
          args[i5] = pino.stdSerializers.err(args[i5]);
        } else if (typeof args[i5] === "object" && !Array.isArray(args[i5])) {
          for (const k4 in args[i5]) {
            if (serialize && serialize.indexOf(k4) > -1 && k4 in serializers) {
              args[i5][k4] = serializers[k4](args[i5][k4]);
            }
          }
        }
      }
    }
    function bind(parent, bindings, level) {
      return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for (var i5 = 1; i5 < args.length; i5++) {
          args[i5] = arguments[i5 - 1];
        }
        return parent[level].apply(this, args);
      };
    }
    function transmit(logger, opts, args) {
      const send = opts.send;
      const ts = opts.ts;
      const methodLevel = opts.methodLevel;
      const methodValue = opts.methodValue;
      const val = opts.val;
      const bindings = logger._logEvent.bindings;
      applySerializers(
        args,
        logger._serialize || Object.keys(logger.serializers),
        logger.serializers,
        logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
      );
      logger._logEvent.ts = ts;
      logger._logEvent.messages = args.filter(function(arg) {
        return bindings.indexOf(arg) === -1;
      });
      logger._logEvent.level.label = methodLevel;
      logger._logEvent.level.value = methodValue;
      send(methodLevel, logger._logEvent, val);
      logger._logEvent = createLogEventShape(bindings);
    }
    function createLogEventShape(bindings) {
      return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: { label: "", value: 0 }
      };
    }
    function asErrValue(err) {
      const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
      };
      for (const key in err) {
        if (obj[key] === void 0) {
          obj[key] = err[key];
        }
      }
      return obj;
    }
    function getTimeFunction(opts) {
      if (typeof opts.timestamp === "function") {
        return opts.timestamp;
      }
      if (opts.timestamp === false) {
        return nullTime;
      }
      return epochTime;
    }
    function mock() {
      return {};
    }
    function passthrough(a3) {
      return a3;
    }
    function noop() {
    }
    function nullTime() {
      return false;
    }
    function epochTime() {
      return Date.now();
    }
    function unixTime() {
      return Math.round(Date.now() / 1e3);
    }
    function isoTime() {
      return new Date(Date.now()).toISOString();
    }
    function pfGlobalThisOrFallback() {
      function defd(o5) {
        return typeof o5 !== "undefined" && o5;
      }
      try {
        if (typeof globalThis !== "undefined") return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
          get: function() {
            delete Object.prototype.globalThis;
            return this.globalThis = this;
          },
          configurable: true
        });
        return globalThis;
      } catch (e3) {
        return defd(self) || defd(window) || defd(this) || {};
      }
    }
  }
});

// node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow;
    function getFromWindowOrThrow(name2) {
      const res = getFromWindow(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow;
    function getDocumentOrThrow() {
      return getFromWindowOrThrow("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow;
    function getDocument() {
      return getFromWindow("document");
    }
    exports.getDocument = getDocument;
    function getNavigatorOrThrow() {
      return getFromWindowOrThrow("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow;
    function getNavigator() {
      return getFromWindow("navigator");
    }
    exports.getNavigator = getNavigator;
    function getLocationOrThrow() {
      return getFromWindowOrThrow("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow;
    function getLocation() {
      return getFromWindow("location");
    }
    exports.getLocation = getLocation;
    function getCryptoOrThrow() {
      return getFromWindowOrThrow("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow;
    function getCrypto() {
      return getFromWindow("crypto");
    }
    exports.getCrypto = getCrypto;
    function getLocalStorageOrThrow() {
      return getFromWindowOrThrow("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
    function getLocalStorage() {
      return getFromWindow("localStorage");
    }
    exports.getLocalStorage = getLocalStorage;
  }
});

// node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@walletconnect/window-metadata/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindowMetadata = void 0;
    var window_getters_1 = require_cjs2();
    function getWindowMetadata() {
      let doc;
      let loc;
      try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
      } catch (e3) {
        return null;
      }
      function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons2 = [];
        for (let i5 = 0; i5 < links.length; i5++) {
          const link = links[i5];
          const rel = link.getAttribute("rel");
          if (rel) {
            if (rel.toLowerCase().indexOf("icon") > -1) {
              const href = link.getAttribute("href");
              if (href) {
                if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                  let absoluteHref = loc.protocol + "//" + loc.host;
                  if (href.indexOf("/") === 0) {
                    absoluteHref += href;
                  } else {
                    const path = loc.pathname.split("/");
                    path.pop();
                    const finalPath = path.join("/");
                    absoluteHref += finalPath + "/" + href;
                  }
                  icons2.push(absoluteHref);
                } else if (href.indexOf("//") === 0) {
                  const absoluteUrl = loc.protocol + href;
                  icons2.push(absoluteUrl);
                } else {
                  icons2.push(href);
                }
              }
            }
          }
        }
        return icons2;
      }
      function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for (let i5 = 0; i5 < metaTags.length; i5++) {
          const tag = metaTags[i5];
          const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
            if (attr) {
              return args.includes(attr);
            }
            return false;
          });
          if (attributes.length && attributes) {
            const content = tag.getAttribute("content");
            if (content) {
              return content;
            }
          }
        }
        return "";
      }
      function getName() {
        let name3 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name3) {
          name3 = doc.title;
        }
        return name3;
      }
      function getDescription() {
        const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description2;
      }
      const name2 = getName();
      const description = getDescription();
      const url = loc.origin;
      const icons = getIcons();
      const meta = {
        description,
        url,
        icons,
        name: name2
      };
      return meta;
    }
    exports.getWindowMetadata = getWindowMetadata;
  }
});

// node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js
var tslib_es6_exports2 = {};
__export(tslib_es6_exports2, {
  __assign: () => __assign2,
  __asyncDelegator: () => __asyncDelegator2,
  __asyncGenerator: () => __asyncGenerator2,
  __asyncValues: () => __asyncValues2,
  __await: () => __await2,
  __awaiter: () => __awaiter2,
  __classPrivateFieldGet: () => __classPrivateFieldGet2,
  __classPrivateFieldSet: () => __classPrivateFieldSet2,
  __createBinding: () => __createBinding2,
  __decorate: () => __decorate2,
  __exportStar: () => __exportStar2,
  __extends: () => __extends2,
  __generator: () => __generator2,
  __importDefault: () => __importDefault2,
  __importStar: () => __importStar2,
  __makeTemplateObject: () => __makeTemplateObject2,
  __metadata: () => __metadata2,
  __param: () => __param2,
  __read: () => __read2,
  __rest: () => __rest2,
  __spread: () => __spread2,
  __spreadArrays: () => __spreadArrays2,
  __values: () => __values2
});
function __extends2(d5, b4) {
  extendStatics2(d5, b4);
  function __() {
    this.constructor = d5;
  }
  d5.prototype = b4 === null ? Object.create(b4) : (__.prototype = b4.prototype, new __());
}
function __rest2(s4, e3) {
  var t2 = {};
  for (var p4 in s4) if (Object.prototype.hasOwnProperty.call(s4, p4) && e3.indexOf(p4) < 0)
    t2[p4] = s4[p4];
  if (s4 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i5 = 0, p4 = Object.getOwnPropertySymbols(s4); i5 < p4.length; i5++) {
      if (e3.indexOf(p4[i5]) < 0 && Object.prototype.propertyIsEnumerable.call(s4, p4[i5]))
        t2[p4[i5]] = s4[p4[i5]];
    }
  return t2;
}
function __decorate2(decorators, target, key, desc) {
  var c7 = arguments.length, r3 = c7 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d5;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
  else for (var i5 = decorators.length - 1; i5 >= 0; i5--) if (d5 = decorators[i5]) r3 = (c7 < 3 ? d5(r3) : c7 > 3 ? d5(target, key, r3) : d5(target, key)) || r3;
  return c7 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata2(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter2(thisArg, _arguments, P6, generator) {
  function adopt(value) {
    return value instanceof P6 ? value : new P6(function(resolve) {
      resolve(value);
    });
  }
  return new (P6 || (P6 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator2(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t2[0] & 1) throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f7, y4, t2, g4;
  return g4 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g4[Symbol.iterator] = function() {
    return this;
  }), g4;
  function verb(n5) {
    return function(v5) {
      return step([n5, v5]);
    };
  }
  function step(op) {
    if (f7) throw new TypeError("Generator is already executing.");
    while (_3) try {
      if (f7 = 1, y4 && (t2 = op[0] & 2 ? y4["return"] : op[0] ? y4["throw"] || ((t2 = y4["return"]) && t2.call(y4), 0) : y4.next) && !(t2 = t2.call(y4, op[1])).done) return t2;
      if (y4 = 0, t2) op = [op[0] & 2, t2.value];
      switch (op[0]) {
        case 0:
        case 1:
          t2 = op;
          break;
        case 4:
          _3.label++;
          return { value: op[1], done: false };
        case 5:
          _3.label++;
          y4 = op[1];
          op = [0];
          continue;
        case 7:
          op = _3.ops.pop();
          _3.trys.pop();
          continue;
        default:
          if (!(t2 = _3.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _3 = 0;
            continue;
          }
          if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
            _3.label = op[1];
            break;
          }
          if (op[0] === 6 && _3.label < t2[1]) {
            _3.label = t2[1];
            t2 = op;
            break;
          }
          if (t2 && _3.label < t2[2]) {
            _3.label = t2[2];
            _3.ops.push(op);
            break;
          }
          if (t2[2]) _3.ops.pop();
          _3.trys.pop();
          continue;
      }
      op = body.call(thisArg, _3);
    } catch (e3) {
      op = [6, e3];
      y4 = 0;
    } finally {
      f7 = t2 = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding2(o5, m4, k4, k22) {
  if (k22 === void 0) k22 = k4;
  o5[k22] = m4[k4];
}
function __exportStar2(m4, exports) {
  for (var p4 in m4) if (p4 !== "default" && !exports.hasOwnProperty(p4)) exports[p4] = m4[p4];
}
function __values2(o5) {
  var s4 = typeof Symbol === "function" && Symbol.iterator, m4 = s4 && o5[s4], i5 = 0;
  if (m4) return m4.call(o5);
  if (o5 && typeof o5.length === "number") return {
    next: function() {
      if (o5 && i5 >= o5.length) o5 = void 0;
      return { value: o5 && o5[i5++], done: !o5 };
    }
  };
  throw new TypeError(s4 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read2(o5, n5) {
  var m4 = typeof Symbol === "function" && o5[Symbol.iterator];
  if (!m4) return o5;
  var i5 = m4.call(o5), r3, ar3 = [], e3;
  try {
    while ((n5 === void 0 || n5-- > 0) && !(r3 = i5.next()).done) ar3.push(r3.value);
  } catch (error) {
    e3 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m4 = i5["return"])) m4.call(i5);
    } finally {
      if (e3) throw e3.error;
    }
  }
  return ar3;
}
function __spread2() {
  for (var ar3 = [], i5 = 0; i5 < arguments.length; i5++)
    ar3 = ar3.concat(__read2(arguments[i5]));
  return ar3;
}
function __spreadArrays2() {
  for (var s4 = 0, i5 = 0, il = arguments.length; i5 < il; i5++) s4 += arguments[i5].length;
  for (var r3 = Array(s4), k4 = 0, i5 = 0; i5 < il; i5++)
    for (var a3 = arguments[i5], j3 = 0, jl = a3.length; j3 < jl; j3++, k4++)
      r3[k4] = a3[j3];
  return r3;
}
function __await2(v5) {
  return this instanceof __await2 ? (this.v = v5, this) : new __await2(v5);
}
function __asyncGenerator2(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g4 = generator.apply(thisArg, _arguments || []), i5, q2 = [];
  return i5 = {}, verb("next"), verb("throw"), verb("return"), i5[Symbol.asyncIterator] = function() {
    return this;
  }, i5;
  function verb(n5) {
    if (g4[n5]) i5[n5] = function(v5) {
      return new Promise(function(a3, b4) {
        q2.push([n5, v5, a3, b4]) > 1 || resume(n5, v5);
      });
    };
  }
  function resume(n5, v5) {
    try {
      step(g4[n5](v5));
    } catch (e3) {
      settle(q2[0][3], e3);
    }
  }
  function step(r3) {
    r3.value instanceof __await2 ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q2[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f7, v5) {
    if (f7(v5), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator2(o5) {
  var i5, p4;
  return i5 = {}, verb("next"), verb("throw", function(e3) {
    throw e3;
  }), verb("return"), i5[Symbol.iterator] = function() {
    return this;
  }, i5;
  function verb(n5, f7) {
    i5[n5] = o5[n5] ? function(v5) {
      return (p4 = !p4) ? { value: __await2(o5[n5](v5)), done: n5 === "return" } : f7 ? f7(v5) : v5;
    } : f7;
  }
}
function __asyncValues2(o5) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m4 = o5[Symbol.asyncIterator], i5;
  return m4 ? m4.call(o5) : (o5 = typeof __values2 === "function" ? __values2(o5) : o5[Symbol.iterator](), i5 = {}, verb("next"), verb("throw"), verb("return"), i5[Symbol.asyncIterator] = function() {
    return this;
  }, i5);
  function verb(n5) {
    i5[n5] = o5[n5] && function(v5) {
      return new Promise(function(resolve, reject) {
        v5 = o5[n5](v5), settle(resolve, reject, v5.done, v5.value);
      });
    };
  }
  function settle(resolve, reject, d5, v5) {
    Promise.resolve(v5).then(function(v6) {
      resolve({ value: v6, done: d5 });
    }, reject);
  }
}
function __makeTemplateObject2(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar2(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k4 in mod) if (Object.hasOwnProperty.call(mod, k4)) result[k4] = mod[k4];
  }
  result.default = mod;
  return result;
}
function __importDefault2(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet2(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet2(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics2, __assign2;
var init_tslib_es62 = __esm({
  "node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js"() {
    extendStatics2 = function(d5, b4) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d6, b5) {
        d6.__proto__ = b5;
      } || function(d6, b5) {
        for (var p4 in b5) if (b5.hasOwnProperty(p4)) d6[p4] = b5[p4];
      };
      return extendStatics2(d5, b4);
    };
    __assign2 = function() {
      __assign2 = Object.assign || function __assign3(t2) {
        for (var s4, i5 = 1, n5 = arguments.length; i5 < n5; i5++) {
          s4 = arguments[i5];
          for (var p4 in s4) if (Object.prototype.hasOwnProperty.call(s4, p4)) t2[p4] = s4[p4];
        }
        return t2;
      };
      return __assign2.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
    function getBrowerCrypto() {
      return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
    }
    exports.getBrowerCrypto = getBrowerCrypto;
    function getSubtleCrypto() {
      const browserCrypto = getBrowerCrypto();
      return browserCrypto.subtle || browserCrypto.webkitSubtle;
    }
    exports.getSubtleCrypto = getSubtleCrypto;
    function isBrowserCryptoAvailable() {
      return !!getBrowerCrypto() && !!getSubtleCrypto();
    }
    exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
    function isReactNative() {
      return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
    }
    exports.isReactNative = isReactNative;
    function isNode2() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    }
    exports.isNode = isNode2;
    function isBrowser() {
      return !isReactNative() && !isNode2();
    }
    exports.isBrowser = isBrowser;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    tslib_1.__exportStar(require_crypto(), exports);
    tslib_1.__exportStar(require_env(), exports);
  }
});

// node_modules/ws/browser.js
var require_browser2 = __commonJS({
  "node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/@walletconnect/jsonrpc-http-connection/node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/@walletconnect/jsonrpc-http-connection/node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var __global__ = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
    var __globalThis__ = function() {
      function F3() {
        this.fetch = false;
        this.DOMException = __global__.DOMException;
      }
      F3.prototype = __global__;
      return new F3();
    }();
    (function(globalThis2) {
      var irrelevant = function(exports2) {
        var g4 = typeof globalThis2 !== "undefined" && globalThis2 || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
        typeof global !== "undefined" && global || {};
        var support = {
          searchParams: "URLSearchParams" in g4,
          iterable: "Symbol" in g4 && "iterator" in Symbol,
          blob: "FileReader" in g4 && "Blob" in g4 && function() {
            try {
              new Blob();
              return true;
            } catch (e3) {
              return false;
            }
          }(),
          formData: "FormData" in g4,
          arrayBuffer: "ArrayBuffer" in g4
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name2) {
          if (typeof name2 !== "string") {
            name2 = String(name2);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name2) || name2 === "") {
            throw new TypeError('Invalid character in header field name: "' + name2 + '"');
          }
          return name2.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name2) {
              this.append(name2, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              if (header.length != 2) {
                throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
              }
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name2) {
              this.append(name2, headers[name2]);
            }, this);
          }
        }
        Headers.prototype.append = function(name2, value) {
          name2 = normalizeName(name2);
          value = normalizeValue(value);
          var oldValue = this.map[name2];
          this.map[name2] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name2) {
          delete this.map[normalizeName(name2)];
        };
        Headers.prototype.get = function(name2) {
          name2 = normalizeName(name2);
          return this.has(name2) ? this.map[name2] : null;
        };
        Headers.prototype.has = function(name2) {
          return this.map.hasOwnProperty(normalizeName(name2));
        };
        Headers.prototype.set = function(name2, value) {
          this.map[normalizeName(name2)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name2 in this.map) {
            if (this.map.hasOwnProperty(name2)) {
              callback.call(thisArg, this.map[name2], name2, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name2) {
            items.push(name2);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name2) {
            items.push([name2, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body._noBody) return;
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
          var encoding = match ? match[1] : "utf-8";
          reader.readAsText(blob, encoding);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i5 = 0; i5 < view.length; i5++) {
            chars[i5] = String.fromCharCode(view[i5]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this.bodyUsed = this.bodyUsed;
            this._bodyInit = body;
            if (!body) {
              this._noBody = true;
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
          }
          this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              var isConsumed = consumed(this);
              if (isConsumed) {
                return isConsumed;
              } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                return Promise.resolve(
                  this._bodyArrayBuffer.buffer.slice(
                    this._bodyArrayBuffer.byteOffset,
                    this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                  )
                );
              } else {
                return Promise.resolve(this._bodyArrayBuffer);
              }
            } else if (support.blob) {
              return this.blob().then(readBlobAsArrayBuffer);
            } else {
              throw new Error("could not read as ArrayBuffer");
            }
          };
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode8);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request2(input, options) {
          if (!(this instanceof Request2)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          }
          options = options || {};
          var body = options.body;
          if (input instanceof Request2) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal || function() {
            if ("AbortController" in g4) {
              var ctrl = new AbortController();
              return ctrl.signal;
            }
          }();
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
          if (this.method === "GET" || this.method === "HEAD") {
            if (options.cache === "no-store" || options.cache === "no-cache") {
              var reParamSearch = /([?&])_=[^&]*/;
              if (reParamSearch.test(this.url)) {
                this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
              } else {
                var reQueryString = /\?/;
                this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
              }
            }
          }
        }
        Request2.prototype.clone = function() {
          return new Request2(this, { body: this._bodyInit });
        };
        function decode8(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name2 = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name2), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split("\r").map(function(header) {
            return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
          }).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              try {
                headers.append(key, value);
              } catch (error) {
                console.warn("Response " + error.message);
              }
            }
          });
          return headers;
        }
        Body.call(Request2.prototype);
        function Response2(bodyInit, options) {
          if (!(this instanceof Response2)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          }
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          if (this.status < 200 || this.status > 599) {
            throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
          }
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response2.prototype);
        Response2.prototype.clone = function() {
          return new Response2(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response2.error = function() {
          var response = new Response2(null, { status: 200, statusText: "" });
          response.ok = false;
          response.status = 0;
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response2.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response2(null, { status, headers: { location: url } });
        };
        exports2.DOMException = g4.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name2) {
            this.message = message;
            this.name = name2;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request2(input, init);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
                options.status = 200;
              } else {
                options.status = xhr.status;
              }
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              setTimeout(function() {
                resolve(new Response2(body, options));
              }, 0);
            };
            xhr.onerror = function() {
              setTimeout(function() {
                reject(new TypeError("Network request failed"));
              }, 0);
            };
            xhr.ontimeout = function() {
              setTimeout(function() {
                reject(new TypeError("Network request timed out"));
              }, 0);
            };
            xhr.onabort = function() {
              setTimeout(function() {
                reject(new exports2.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function fixUrl(url) {
              try {
                return url === "" && g4.location.href ? g4.location.href : url;
              } catch (e3) {
                return url;
              }
            }
            xhr.open(request.method, fixUrl(request.url), true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr) {
              if (support.blob) {
                xhr.responseType = "blob";
              } else if (support.arrayBuffer) {
                xhr.responseType = "arraybuffer";
              }
            }
            if (init && typeof init.headers === "object" && !(init.headers instanceof Headers || g4.Headers && init.headers instanceof g4.Headers)) {
              var names = [];
              Object.getOwnPropertyNames(init.headers).forEach(function(name2) {
                names.push(normalizeName(name2));
                xhr.setRequestHeader(name2, normalizeValue(init.headers[name2]));
              });
              request.headers.forEach(function(value, name2) {
                if (names.indexOf(name2) === -1) {
                  xhr.setRequestHeader(name2, value);
                }
              });
            } else {
              request.headers.forEach(function(value, name2) {
                xhr.setRequestHeader(name2, value);
              });
            }
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!g4.fetch) {
          g4.fetch = fetch2;
          g4.Headers = Headers;
          g4.Request = Request2;
          g4.Response = Response2;
        }
        exports2.Headers = Headers;
        exports2.Request = Request2;
        exports2.Response = Response2;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__globalThis__);
    __globalThis__.fetch.ponyfill = true;
    delete __globalThis__.fetch.polyfill;
    var ctx = __global__.fetch ? __global__ : __globalThis__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js
var ConstantsUtil = {
  WC_NAME_SUFFIX: ".reown.id",
  WC_NAME_SUFFIX_LEGACY: ".wcn.id",
  BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org",
  PULSE_API_URL: "https://pulse.walletconnect.org",
  W3M_API_URL: "https://api.web3modal.org",
  CONNECTOR_ID: {
    WALLET_CONNECT: "walletConnect",
    INJECTED: "injected",
    WALLET_STANDARD: "announced",
    COINBASE: "coinbaseWallet",
    COINBASE_SDK: "coinbaseWalletSDK",
    SAFE: "safe",
    LEDGER: "ledger",
    OKX: "okx",
    EIP6963: "eip6963",
    AUTH: "ID_AUTH"
  },
  CONNECTOR_NAMES: {
    AUTH: "Auth"
  },
  AUTH_CONNECTOR_SUPPORTED_CHAINS: ["eip155", "solana"],
  LIMITS: {
    PENDING_TRANSACTIONS: 99
  },
  CHAIN: {
    EVM: "eip155",
    SOLANA: "solana",
    POLKADOT: "polkadot",
    BITCOIN: "bip122"
  },
  CHAIN_NAME_MAP: {
    eip155: "EVM Networks",
    solana: "Solana",
    polkadot: "Polkadot",
    bip122: "Bitcoin"
  },
  ADAPTER_TYPES: {
    BITCOIN: "bitcoin",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5"
  },
  USDT_CONTRACT_ADDRESSES: [
    "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
    "0x919C1c267BC06a7039e03fcc2eF738525769109c",
    "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    "0x55d398326f99059fF775485246999027B3197955",
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
  ],
  HTTP_STATUS_CODES: {
    SERVICE_UNAVAILABLE: 503,
    FORBIDDEN: 403
  },
  UNSUPPORTED_NETWORK_NAME: "Unknown Network"
};

// node_modules/@reown/appkit-common/dist/esm/src/utils/DateUtil.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_en = __toESM(require_en(), 1);
var import_relativeTime = __toESM(require_relativeTime(), 1);
var import_updateLocale = __toESM(require_updateLocale(), 1);
import_dayjs.default.extend(import_relativeTime.default);
import_dayjs.default.extend(import_updateLocale.default);
var localeObject = {
  ...import_en.default,
  name: "en-web3-modal",
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d sec",
    m: "1 min",
    mm: "%d min",
    h: "1 hr",
    hh: "%d hrs",
    d: "1 d",
    dd: "%d d",
    M: "1 mo",
    MM: "%d mo",
    y: "1 yr",
    yy: "%d yr"
  }
};
import_dayjs.default.locale("en-web3-modal", localeObject);

// node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js
var NetworkUtil = {
  caipNetworkIdToNumber(caipnetworkId) {
    return caipnetworkId ? Number(caipnetworkId.split(":")[1]) : void 0;
  },
  parseEvmChainId(chainId) {
    return typeof chainId === "string" ? this.caipNetworkIdToNumber(chainId) : chainId;
  },
  getNetworksByNamespace(networks, namespace) {
    return (networks == null ? void 0 : networks.filter((network) => network.chainNamespace === namespace)) || [];
  },
  getFirstNetworkByNamespace(networks, namespace) {
    return this.getNetworksByNamespace(networks, namespace)[0];
  }
};

// node_modules/big.js/big.mjs
var DP = 20;
var RM = 1;
var MAX_DP = 1e6;
var MAX_POWER = 1e6;
var NE = -7;
var PE = 21;
var STRICT = false;
var NAME = "[big.js] ";
var INVALID = NAME + "Invalid ";
var INVALID_DP = INVALID + "decimal places";
var INVALID_RM = INVALID + "rounding mode";
var DIV_BY_ZERO = NAME + "Division by zero";
var P = {};
var UNDEFINED = void 0;
var NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function _Big_() {
  function Big2(n5) {
    var x5 = this;
    if (!(x5 instanceof Big2)) return n5 === UNDEFINED ? _Big_() : new Big2(n5);
    if (n5 instanceof Big2) {
      x5.s = n5.s;
      x5.e = n5.e;
      x5.c = n5.c.slice();
    } else {
      if (typeof n5 !== "string") {
        if (Big2.strict === true && typeof n5 !== "bigint") {
          throw TypeError(INVALID + "value");
        }
        n5 = n5 === 0 && 1 / n5 < 0 ? "-0" : String(n5);
      }
      parse(x5, n5);
    }
    x5.constructor = Big2;
  }
  Big2.prototype = P;
  Big2.DP = DP;
  Big2.RM = RM;
  Big2.NE = NE;
  Big2.PE = PE;
  Big2.strict = STRICT;
  Big2.roundDown = 0;
  Big2.roundHalfUp = 1;
  Big2.roundHalfEven = 2;
  Big2.roundUp = 3;
  return Big2;
}
function parse(x5, n5) {
  var e3, i5, nl;
  if (!NUMERIC.test(n5)) {
    throw Error(INVALID + "number");
  }
  x5.s = n5.charAt(0) == "-" ? (n5 = n5.slice(1), -1) : 1;
  if ((e3 = n5.indexOf(".")) > -1) n5 = n5.replace(".", "");
  if ((i5 = n5.search(/e/i)) > 0) {
    if (e3 < 0) e3 = i5;
    e3 += +n5.slice(i5 + 1);
    n5 = n5.substring(0, i5);
  } else if (e3 < 0) {
    e3 = n5.length;
  }
  nl = n5.length;
  for (i5 = 0; i5 < nl && n5.charAt(i5) == "0"; ) ++i5;
  if (i5 == nl) {
    x5.c = [x5.e = 0];
  } else {
    for (; nl > 0 && n5.charAt(--nl) == "0"; ) ;
    x5.e = e3 - i5 - 1;
    x5.c = [];
    for (e3 = 0; i5 <= nl; ) x5.c[e3++] = +n5.charAt(i5++);
  }
  return x5;
}
function round(x5, sd, rm, more) {
  var xc = x5.c;
  if (rm === UNDEFINED) rm = x5.constructor.RM;
  if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
    throw Error(INVALID_RM);
  }
  if (sd < 1) {
    more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
    xc.length = 1;
    if (more) {
      x5.e = x5.e - sd + 1;
      xc[0] = 1;
    } else {
      xc[0] = x5.e = 0;
    }
  } else if (sd < xc.length) {
    more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !!xc[0]);
    xc.length = sd;
    if (more) {
      for (; ++xc[--sd] > 9; ) {
        xc[sd] = 0;
        if (sd === 0) {
          ++x5.e;
          xc.unshift(1);
          break;
        }
      }
    }
    for (sd = xc.length; !xc[--sd]; ) xc.pop();
  }
  return x5;
}
function stringify2(x5, doExponential, isNonzero) {
  var e3 = x5.e, s4 = x5.c.join(""), n5 = s4.length;
  if (doExponential) {
    s4 = s4.charAt(0) + (n5 > 1 ? "." + s4.slice(1) : "") + (e3 < 0 ? "e" : "e+") + e3;
  } else if (e3 < 0) {
    for (; ++e3; ) s4 = "0" + s4;
    s4 = "0." + s4;
  } else if (e3 > 0) {
    if (++e3 > n5) {
      for (e3 -= n5; e3--; ) s4 += "0";
    } else if (e3 < n5) {
      s4 = s4.slice(0, e3) + "." + s4.slice(e3);
    }
  } else if (n5 > 1) {
    s4 = s4.charAt(0) + "." + s4.slice(1);
  }
  return x5.s < 0 && isNonzero ? "-" + s4 : s4;
}
P.abs = function() {
  var x5 = new this.constructor(this);
  x5.s = 1;
  return x5;
};
P.cmp = function(y4) {
  var isneg, x5 = this, xc = x5.c, yc = (y4 = new x5.constructor(y4)).c, i5 = x5.s, j3 = y4.s, k4 = x5.e, l8 = y4.e;
  if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j3 : i5;
  if (i5 != j3) return i5;
  isneg = i5 < 0;
  if (k4 != l8) return k4 > l8 ^ isneg ? 1 : -1;
  j3 = (k4 = xc.length) < (l8 = yc.length) ? k4 : l8;
  for (i5 = -1; ++i5 < j3; ) {
    if (xc[i5] != yc[i5]) return xc[i5] > yc[i5] ^ isneg ? 1 : -1;
  }
  return k4 == l8 ? 0 : k4 > l8 ^ isneg ? 1 : -1;
};
P.div = function(y4) {
  var x5 = this, Big2 = x5.constructor, a3 = x5.c, b4 = (y4 = new Big2(y4)).c, k4 = x5.s == y4.s ? 1 : -1, dp = Big2.DP;
  if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  if (!b4[0]) {
    throw Error(DIV_BY_ZERO);
  }
  if (!a3[0]) {
    y4.s = k4;
    y4.c = [y4.e = 0];
    return y4;
  }
  var bl, bt3, n5, cmp, ri3, bz = b4.slice(), ai3 = bl = b4.length, al = a3.length, r3 = a3.slice(0, bl), rl = r3.length, q2 = y4, qc = q2.c = [], qi2 = 0, p4 = dp + (q2.e = x5.e - y4.e) + 1;
  q2.s = k4;
  k4 = p4 < 0 ? 0 : p4;
  bz.unshift(0);
  for (; rl++ < bl; ) r3.push(0);
  do {
    for (n5 = 0; n5 < 10; n5++) {
      if (bl != (rl = r3.length)) {
        cmp = bl > rl ? 1 : -1;
      } else {
        for (ri3 = -1, cmp = 0; ++ri3 < bl; ) {
          if (b4[ri3] != r3[ri3]) {
            cmp = b4[ri3] > r3[ri3] ? 1 : -1;
            break;
          }
        }
      }
      if (cmp < 0) {
        for (bt3 = rl == bl ? b4 : bz; rl; ) {
          if (r3[--rl] < bt3[rl]) {
            ri3 = rl;
            for (; ri3 && !r3[--ri3]; ) r3[ri3] = 9;
            --r3[ri3];
            r3[rl] += 10;
          }
          r3[rl] -= bt3[rl];
        }
        for (; !r3[0]; ) r3.shift();
      } else {
        break;
      }
    }
    qc[qi2++] = cmp ? n5 : ++n5;
    if (r3[0] && cmp) r3[rl] = a3[ai3] || 0;
    else r3 = [a3[ai3]];
  } while ((ai3++ < al || r3[0] !== UNDEFINED) && k4--);
  if (!qc[0] && qi2 != 1) {
    qc.shift();
    q2.e--;
    p4--;
  }
  if (qi2 > p4) round(q2, p4, Big2.RM, r3[0] !== UNDEFINED);
  return q2;
};
P.eq = function(y4) {
  return this.cmp(y4) === 0;
};
P.gt = function(y4) {
  return this.cmp(y4) > 0;
};
P.gte = function(y4) {
  return this.cmp(y4) > -1;
};
P.lt = function(y4) {
  return this.cmp(y4) < 0;
};
P.lte = function(y4) {
  return this.cmp(y4) < 1;
};
P.minus = P.sub = function(y4) {
  var i5, j3, t2, xlty, x5 = this, Big2 = x5.constructor, a3 = x5.s, b4 = (y4 = new Big2(y4)).s;
  if (a3 != b4) {
    y4.s = -b4;
    return x5.plus(y4);
  }
  var xc = x5.c.slice(), xe3 = x5.e, yc = y4.c, ye2 = y4.e;
  if (!xc[0] || !yc[0]) {
    if (yc[0]) {
      y4.s = -b4;
    } else if (xc[0]) {
      y4 = new Big2(x5);
    } else {
      y4.s = 1;
    }
    return y4;
  }
  if (a3 = xe3 - ye2) {
    if (xlty = a3 < 0) {
      a3 = -a3;
      t2 = xc;
    } else {
      ye2 = xe3;
      t2 = yc;
    }
    t2.reverse();
    for (b4 = a3; b4--; ) t2.push(0);
    t2.reverse();
  } else {
    j3 = ((xlty = xc.length < yc.length) ? xc : yc).length;
    for (a3 = b4 = 0; b4 < j3; b4++) {
      if (xc[b4] != yc[b4]) {
        xlty = xc[b4] < yc[b4];
        break;
      }
    }
  }
  if (xlty) {
    t2 = xc;
    xc = yc;
    yc = t2;
    y4.s = -y4.s;
  }
  if ((b4 = (j3 = yc.length) - (i5 = xc.length)) > 0) for (; b4--; ) xc[i5++] = 0;
  for (b4 = i5; j3 > a3; ) {
    if (xc[--j3] < yc[j3]) {
      for (i5 = j3; i5 && !xc[--i5]; ) xc[i5] = 9;
      --xc[i5];
      xc[j3] += 10;
    }
    xc[j3] -= yc[j3];
  }
  for (; xc[--b4] === 0; ) xc.pop();
  for (; xc[0] === 0; ) {
    xc.shift();
    --ye2;
  }
  if (!xc[0]) {
    y4.s = 1;
    xc = [ye2 = 0];
  }
  y4.c = xc;
  y4.e = ye2;
  return y4;
};
P.mod = function(y4) {
  var ygtx, x5 = this, Big2 = x5.constructor, a3 = x5.s, b4 = (y4 = new Big2(y4)).s;
  if (!y4.c[0]) {
    throw Error(DIV_BY_ZERO);
  }
  x5.s = y4.s = 1;
  ygtx = y4.cmp(x5) == 1;
  x5.s = a3;
  y4.s = b4;
  if (ygtx) return new Big2(x5);
  a3 = Big2.DP;
  b4 = Big2.RM;
  Big2.DP = Big2.RM = 0;
  x5 = x5.div(y4);
  Big2.DP = a3;
  Big2.RM = b4;
  return this.minus(x5.times(y4));
};
P.neg = function() {
  var x5 = new this.constructor(this);
  x5.s = -x5.s;
  return x5;
};
P.plus = P.add = function(y4) {
  var e3, k4, t2, x5 = this, Big2 = x5.constructor;
  y4 = new Big2(y4);
  if (x5.s != y4.s) {
    y4.s = -y4.s;
    return x5.minus(y4);
  }
  var xe3 = x5.e, xc = x5.c, ye2 = y4.e, yc = y4.c;
  if (!xc[0] || !yc[0]) {
    if (!yc[0]) {
      if (xc[0]) {
        y4 = new Big2(x5);
      } else {
        y4.s = x5.s;
      }
    }
    return y4;
  }
  xc = xc.slice();
  if (e3 = xe3 - ye2) {
    if (e3 > 0) {
      ye2 = xe3;
      t2 = yc;
    } else {
      e3 = -e3;
      t2 = xc;
    }
    t2.reverse();
    for (; e3--; ) t2.push(0);
    t2.reverse();
  }
  if (xc.length - yc.length < 0) {
    t2 = yc;
    yc = xc;
    xc = t2;
  }
  e3 = yc.length;
  for (k4 = 0; e3; xc[e3] %= 10) k4 = (xc[--e3] = xc[e3] + yc[e3] + k4) / 10 | 0;
  if (k4) {
    xc.unshift(k4);
    ++ye2;
  }
  for (e3 = xc.length; xc[--e3] === 0; ) xc.pop();
  y4.c = xc;
  y4.e = ye2;
  return y4;
};
P.pow = function(n5) {
  var x5 = this, one = new x5.constructor("1"), y4 = one, isneg = n5 < 0;
  if (n5 !== ~~n5 || n5 < -MAX_POWER || n5 > MAX_POWER) {
    throw Error(INVALID + "exponent");
  }
  if (isneg) n5 = -n5;
  for (; ; ) {
    if (n5 & 1) y4 = y4.times(x5);
    n5 >>= 1;
    if (!n5) break;
    x5 = x5.times(x5);
  }
  return isneg ? one.div(y4) : y4;
};
P.prec = function(sd, rm) {
  if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
    throw Error(INVALID + "precision");
  }
  return round(new this.constructor(this), sd, rm);
};
P.round = function(dp, rm) {
  if (dp === UNDEFINED) dp = 0;
  else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  return round(new this.constructor(this), dp + this.e + 1, rm);
};
P.sqrt = function() {
  var r3, c7, t2, x5 = this, Big2 = x5.constructor, s4 = x5.s, e3 = x5.e, half = new Big2("0.5");
  if (!x5.c[0]) return new Big2(x5);
  if (s4 < 0) {
    throw Error(NAME + "No square root");
  }
  s4 = Math.sqrt(+stringify2(x5, true, true));
  if (s4 === 0 || s4 === 1 / 0) {
    c7 = x5.c.join("");
    if (!(c7.length + e3 & 1)) c7 += "0";
    s4 = Math.sqrt(c7);
    e3 = ((e3 + 1) / 2 | 0) - (e3 < 0 || e3 & 1);
    r3 = new Big2((s4 == 1 / 0 ? "5e" : (s4 = s4.toExponential()).slice(0, s4.indexOf("e") + 1)) + e3);
  } else {
    r3 = new Big2(s4 + "");
  }
  e3 = r3.e + (Big2.DP += 4);
  do {
    t2 = r3;
    r3 = half.times(t2.plus(x5.div(t2)));
  } while (t2.c.slice(0, e3).join("") !== r3.c.slice(0, e3).join(""));
  return round(r3, (Big2.DP -= 4) + r3.e + 1, Big2.RM);
};
P.times = P.mul = function(y4) {
  var c7, x5 = this, Big2 = x5.constructor, xc = x5.c, yc = (y4 = new Big2(y4)).c, a3 = xc.length, b4 = yc.length, i5 = x5.e, j3 = y4.e;
  y4.s = x5.s == y4.s ? 1 : -1;
  if (!xc[0] || !yc[0]) {
    y4.c = [y4.e = 0];
    return y4;
  }
  y4.e = i5 + j3;
  if (a3 < b4) {
    c7 = xc;
    xc = yc;
    yc = c7;
    j3 = a3;
    a3 = b4;
    b4 = j3;
  }
  for (c7 = new Array(j3 = a3 + b4); j3--; ) c7[j3] = 0;
  for (i5 = b4; i5--; ) {
    b4 = 0;
    for (j3 = a3 + i5; j3 > i5; ) {
      b4 = c7[j3] + yc[i5] * xc[j3 - i5 - 1] + b4;
      c7[j3--] = b4 % 10;
      b4 = b4 / 10 | 0;
    }
    c7[j3] = b4;
  }
  if (b4) ++y4.e;
  else c7.shift();
  for (i5 = c7.length; !c7[--i5]; ) c7.pop();
  y4.c = c7;
  return y4;
};
P.toExponential = function(dp, rm) {
  var x5 = this, n5 = x5.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x5 = round(new x5.constructor(x5), ++dp, rm);
    for (; x5.c.length < dp; ) x5.c.push(0);
  }
  return stringify2(x5, true, !!n5);
};
P.toFixed = function(dp, rm) {
  var x5 = this, n5 = x5.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x5 = round(new x5.constructor(x5), dp + x5.e + 1, rm);
    for (dp = dp + x5.e + 1; x5.c.length < dp; ) x5.c.push(0);
  }
  return stringify2(x5, false, !!n5);
};
P[Symbol.for("nodejs.util.inspect.custom")] = P.toJSON = P.toString = function() {
  var x5 = this, Big2 = x5.constructor;
  return stringify2(x5, x5.e <= Big2.NE || x5.e >= Big2.PE, !!x5.c[0]);
};
P.toNumber = function() {
  var n5 = +stringify2(this, true, true);
  if (this.constructor.strict === true && !this.eq(n5.toString())) {
    throw Error(NAME + "Imprecise conversion");
  }
  return n5;
};
P.toPrecision = function(sd, rm) {
  var x5 = this, Big2 = x5.constructor, n5 = x5.c[0];
  if (sd !== UNDEFINED) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throw Error(INVALID + "precision");
    }
    x5 = round(new Big2(x5), sd, rm);
    for (; x5.c.length < sd; ) x5.c.push(0);
  }
  return stringify2(x5, sd <= x5.e || x5.e <= Big2.NE || x5.e >= Big2.PE, !!n5);
};
P.valueOf = function() {
  var x5 = this, Big2 = x5.constructor;
  if (Big2.strict === true) {
    throw Error(NAME + "valueOf disallowed");
  }
  return stringify2(x5, x5.e <= Big2.NE || x5.e >= Big2.PE, true);
};
var Big = _Big_();
var big_default = Big;

// node_modules/@reown/appkit-common/dist/esm/src/utils/NumberUtil.js
var NumberUtil = {
  bigNumber(value) {
    if (!value) {
      return new big_default(0);
    }
    return new big_default(value);
  },
  multiply(a3, b4) {
    if (a3 === void 0 || b4 === void 0) {
      return new big_default(0);
    }
    const aBigNumber = new big_default(a3);
    const bBigNumber = new big_default(b4);
    return aBigNumber.times(bBigNumber);
  },
  formatNumberToLocalString(value, decimals = 2) {
    if (value === void 0) {
      return "0.00";
    }
    if (typeof value === "number") {
      return value.toLocaleString("en-US", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      });
    }
    return parseFloat(value).toLocaleString("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    });
  },
  parseLocalStringToNumber(value) {
    if (value === void 0) {
      return 0;
    }
    return parseFloat(value.replace(/,/gu, ""));
  }
};

// node_modules/@reown/appkit-common/dist/esm/src/contracts/erc20.js
var erc20ABI = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
];

// node_modules/@reown/appkit-common/dist/esm/src/contracts/swap.js
var swapABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ type: "bool" }]
  }
];

// node_modules/@reown/appkit-common/dist/esm/src/contracts/usdt.js
var usdtABI = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
];

// node_modules/@reown/appkit-common/dist/esm/src/utils/ContractUtil.js
var ContractUtil = {
  getERC20Abi: (tokenAddress) => {
    if (ConstantsUtil.USDT_CONTRACT_ADDRESSES.includes(tokenAddress)) {
      return usdtABI;
    }
    return erc20ABI;
  },
  getSwapAbi: () => swapABI
};

// node_modules/@reown/appkit-common/dist/esm/src/utils/EmitterUtil.js
var Emitter = class _Emitter {
  on(eventName, callback) {
    var _a;
    if (!_Emitter.eventListeners.has(eventName)) {
      _Emitter.eventListeners.set(eventName, /* @__PURE__ */ new Set());
    }
    (_a = _Emitter.eventListeners.get(eventName)) == null ? void 0 : _a.add(callback);
  }
  off(eventName, callback) {
    const listeners = _Emitter.eventListeners.get(eventName);
    if (listeners) {
      listeners.delete(callback);
    }
  }
  emit(eventName, data) {
    const listeners = _Emitter.eventListeners.get(eventName);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }
  clear(eventName) {
    _Emitter.eventListeners.delete(eventName);
  }
  clearAll() {
    _Emitter.eventListeners.clear();
  }
};
Emitter.eventListeners = /* @__PURE__ */ new Map();

// node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js
var ParseUtil = {
  validateCaipAddress(address) {
    var _a;
    if (((_a = address.split(":")) == null ? void 0 : _a.length) !== 3) {
      throw new Error("Invalid CAIP Address");
    }
    return address;
  },
  parseCaipAddress(caipAddress) {
    const parts = caipAddress.split(":");
    if (parts.length !== 3) {
      throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
    }
    const [chainNamespace, chainId, address] = parts;
    if (!chainNamespace || !chainId || !address) {
      throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
    }
    return {
      chainNamespace,
      chainId,
      address
    };
  },
  parseCaipNetworkId(caipNetworkId) {
    const parts = caipNetworkId.split(":");
    if (parts.length !== 2) {
      throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
    }
    const [chainNamespace, chainId] = parts;
    if (!chainNamespace || !chainId) {
      throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
    }
    return {
      chainNamespace,
      chainId
    };
  }
};

// node_modules/@reown/appkit-common/dist/esm/src/utils/SafeLocalStorage.js
var SafeLocalStorageKeys = {
  WALLET_ID: "@appkit/wallet_id",
  WALLET_NAME: "@appkit/wallet_name",
  SOLANA_WALLET: "@appkit/solana_wallet",
  SOLANA_CAIP_CHAIN: "@appkit/solana_caip_chain",
  ACTIVE_CAIP_NETWORK_ID: "@appkit/active_caip_network_id",
  CONNECTED_SOCIAL: "@appkit/connected_social",
  CONNECTED_SOCIAL_USERNAME: "@appkit-wallet/SOCIAL_USERNAME",
  RECENT_WALLETS: "@appkit/recent_wallets",
  DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
  ACTIVE_NAMESPACE: "@appkit/active_namespace",
  CONNECTED_NAMESPACES: "@appkit/connected_namespaces",
  CONNECTION_STATUS: "@appkit/connection_status",
  SIWX_AUTH_TOKEN: "@appkit/siwx-auth-token",
  SIWX_NONCE_TOKEN: "@appkit/siwx-nonce-token",
  TELEGRAM_SOCIAL_PROVIDER: "@appkit/social_provider",
  NATIVE_BALANCE_CACHE: "@appkit/native_balance_cache",
  PORTFOLIO_CACHE: "@appkit/portfolio_cache",
  ENS_CACHE: "@appkit/ens_cache",
  IDENTITY_CACHE: "@appkit/identity_cache"
};
function getSafeConnectorIdKey(namespace) {
  if (!namespace) {
    throw new Error("Namespace is required for CONNECTED_CONNECTOR_ID");
  }
  return `@appkit/${namespace}:connected_connector_id`;
}
var SafeLocalStorage = {
  setItem(key, value) {
    if (isSafe() && value !== void 0) {
      localStorage.setItem(key, value);
    }
  },
  getItem(key) {
    if (isSafe()) {
      return localStorage.getItem(key) || void 0;
    }
    return void 0;
  },
  removeItem(key) {
    if (isSafe()) {
      localStorage.removeItem(key);
    }
  },
  clear() {
    if (isSafe()) {
      localStorage.clear();
    }
  }
};
function isSafe() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

// node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js
function getW3mThemeVariables(themeVariables, themeType) {
  if (themeType === "light") {
    return {
      "--w3m-accent": (themeVariables == null ? void 0 : themeVariables["--w3m-accent"]) || "hsla(231, 100%, 70%, 1)",
      "--w3m-background": "#fff"
    };
  }
  return {
    "--w3m-accent": (themeVariables == null ? void 0 : themeVariables["--w3m-accent"]) || "hsla(230, 100%, 67%, 1)",
    "--w3m-background": "#121313"
  };
}

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js
var StorageUtil = {
  // Cache expiry in milliseconds
  cacheExpiry: {
    portfolio: 3e4,
    nativeBalance: 3e4,
    ens: 3e5,
    identity: 3e5
  },
  isCacheExpired(timestamp, cacheExpiry) {
    return Date.now() - timestamp > cacheExpiry;
  },
  getActiveNetworkProps() {
    const namespace = StorageUtil.getActiveNamespace();
    const caipNetworkId = StorageUtil.getActiveCaipNetworkId();
    const stringChainId = caipNetworkId ? caipNetworkId.split(":")[1] : void 0;
    const chainId = stringChainId ? isNaN(Number(stringChainId)) ? stringChainId : Number(stringChainId) : void 0;
    return {
      namespace,
      caipNetworkId,
      chainId
    };
  },
  setWalletConnectDeepLink({ name: name2, href }) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.DEEPLINK_CHOICE, JSON.stringify({ href, name: name2 }));
    } catch {
      console.info("Unable to set WalletConnect deep link");
    }
  },
  getWalletConnectDeepLink() {
    try {
      const deepLink = SafeLocalStorage.getItem(SafeLocalStorageKeys.DEEPLINK_CHOICE);
      if (deepLink) {
        return JSON.parse(deepLink);
      }
    } catch {
      console.info("Unable to get WalletConnect deep link");
    }
    return void 0;
  },
  deleteWalletConnectDeepLink() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.DEEPLINK_CHOICE);
    } catch {
      console.info("Unable to delete WalletConnect deep link");
    }
  },
  setActiveNamespace(namespace) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ACTIVE_NAMESPACE, namespace);
    } catch {
      console.info("Unable to set active namespace");
    }
  },
  setActiveCaipNetworkId(caipNetworkId) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID, caipNetworkId);
      StorageUtil.setActiveNamespace(caipNetworkId.split(":")[0]);
    } catch {
      console.info("Unable to set active caip network id");
    }
  },
  getActiveCaipNetworkId() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to get active caip network id");
      return void 0;
    }
  },
  deleteActiveCaipNetworkId() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to delete active caip network id");
    }
  },
  deleteConnectedConnectorId(namespace) {
    try {
      const key = getSafeConnectorIdKey(namespace);
      SafeLocalStorage.removeItem(key);
    } catch {
      console.info("Unable to delete connected connector id");
    }
  },
  setAppKitRecent(wallet) {
    try {
      const recentWallets = StorageUtil.getRecentWallets();
      const exists = recentWallets.find((w4) => w4.id === wallet.id);
      if (!exists) {
        recentWallets.unshift(wallet);
        if (recentWallets.length > 2) {
          recentWallets.pop();
        }
        SafeLocalStorage.setItem(SafeLocalStorageKeys.RECENT_WALLETS, JSON.stringify(recentWallets));
      }
    } catch {
      console.info("Unable to set AppKit recent");
    }
  },
  getRecentWallets() {
    try {
      const recent = SafeLocalStorage.getItem(SafeLocalStorageKeys.RECENT_WALLETS);
      return recent ? JSON.parse(recent) : [];
    } catch {
      console.info("Unable to get AppKit recent");
    }
    return [];
  },
  setConnectedConnectorId(namespace, connectorId) {
    try {
      const key = getSafeConnectorIdKey(namespace);
      SafeLocalStorage.setItem(key, connectorId);
    } catch {
      console.info("Unable to set Connected Connector Id");
    }
  },
  getActiveNamespace() {
    try {
      const activeNamespace = SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_NAMESPACE);
      return activeNamespace;
    } catch {
      console.info("Unable to get active namespace");
    }
    return void 0;
  },
  getConnectedConnectorId(namespace) {
    if (!namespace) {
      return void 0;
    }
    try {
      const key = getSafeConnectorIdKey(namespace);
      return SafeLocalStorage.getItem(key);
    } catch (e3) {
      console.info("Unable to get connected connector id in namespace ", namespace);
    }
    return void 0;
  },
  setConnectedSocialProvider(socialProvider) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTED_SOCIAL, socialProvider);
    } catch {
      console.info("Unable to set connected social provider");
    }
  },
  getConnectedSocialProvider() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to get connected social provider");
    }
    return void 0;
  },
  deleteConnectedSocialProvider() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to delete connected social provider");
    }
  },
  getConnectedSocialUsername() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_SOCIAL_USERNAME);
    } catch {
      console.info("Unable to get connected social username");
    }
    return void 0;
  },
  getStoredActiveCaipNetworkId() {
    var _a;
    const storedCaipNetworkId = SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    const networkId = (_a = storedCaipNetworkId == null ? void 0 : storedCaipNetworkId.split(":")) == null ? void 0 : _a[1];
    return networkId;
  },
  setConnectionStatus(status) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTION_STATUS, status);
    } catch {
      console.info("Unable to set connection status");
    }
  },
  getConnectionStatus() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTION_STATUS);
    } catch {
      return void 0;
    }
  },
  getConnectedNamespaces() {
    try {
      const namespaces = SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_NAMESPACES);
      if (!(namespaces == null ? void 0 : namespaces.length)) {
        return [];
      }
      return namespaces.split(",");
    } catch {
      return [];
    }
  },
  setConnectedNamespaces(namespaces) {
    try {
      const uniqueNamespaces = Array.from(new Set(namespaces));
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTED_NAMESPACES, uniqueNamespaces.join(","));
    } catch {
      console.info("Unable to set namespaces in storage");
    }
  },
  addConnectedNamespace(namespace) {
    try {
      const namespaces = StorageUtil.getConnectedNamespaces();
      if (!namespaces.includes(namespace)) {
        namespaces.push(namespace);
        StorageUtil.setConnectedNamespaces(namespaces);
      }
    } catch {
      console.info("Unable to add connected namespace");
    }
  },
  removeConnectedNamespace(namespace) {
    try {
      const namespaces = StorageUtil.getConnectedNamespaces();
      const index2 = namespaces.indexOf(namespace);
      if (index2 > -1) {
        namespaces.splice(index2, 1);
        StorageUtil.setConnectedNamespaces(namespaces);
      }
    } catch {
      console.info("Unable to remove connected namespace");
    }
  },
  getTelegramSocialProvider() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to get telegram social provider");
      return null;
    }
  },
  setTelegramSocialProvider(socialProvider) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER, socialProvider);
    } catch {
      console.info("Unable to set telegram social provider");
    }
  },
  removeTelegramSocialProvider() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to remove telegram social provider");
    }
  },
  getBalanceCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.PORTFOLIO_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return cache;
  },
  removeAddressFromBalanceCache(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.PORTFOLIO_CACHE, JSON.stringify({ ...cache, [caipAddress]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", caipAddress);
    }
  },
  getBalanceCacheForCaipAddress(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      const balanceCache = cache[caipAddress];
      if (balanceCache && !this.isCacheExpired(balanceCache.timestamp, this.cacheExpiry.portfolio)) {
        return balanceCache.balance;
      }
      StorageUtil.removeAddressFromBalanceCache(caipAddress);
    } catch {
      console.info("Unable to get balance cache for address", caipAddress);
    }
    return void 0;
  },
  updateBalanceCache(params) {
    try {
      const cache = StorageUtil.getBalanceCache();
      cache[params.caipAddress] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.PORTFOLIO_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update balance cache", params);
    }
  },
  getNativeBalanceCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return cache;
  },
  removeAddressFromNativeBalanceCache(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE, JSON.stringify({ ...cache, [caipAddress]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", caipAddress);
    }
  },
  getNativeBalanceCacheForCaipAddress(caipAddress) {
    try {
      const cache = StorageUtil.getNativeBalanceCache();
      const nativeBalanceCache = cache[caipAddress];
      if (nativeBalanceCache && !this.isCacheExpired(nativeBalanceCache.timestamp, this.cacheExpiry.nativeBalance)) {
        return nativeBalanceCache;
      }
      console.info("Discarding cache for address", caipAddress);
      StorageUtil.removeAddressFromBalanceCache(caipAddress);
    } catch {
      console.info("Unable to get balance cache for address", caipAddress);
    }
    return void 0;
  },
  updateNativeBalanceCache(params) {
    try {
      const cache = StorageUtil.getNativeBalanceCache();
      cache[params.caipAddress] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update balance cache", params);
    }
  },
  getEnsCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.ENS_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get ens name cache");
    }
    return cache;
  },
  getEnsFromCacheForAddress(address) {
    try {
      const cache = StorageUtil.getEnsCache();
      const ensCache = cache[address];
      if (ensCache && !this.isCacheExpired(ensCache.timestamp, this.cacheExpiry.ens)) {
        return ensCache.ens;
      }
      StorageUtil.removeEnsFromCache(address);
    } catch {
      console.info("Unable to get ens name from cache", address);
    }
    return void 0;
  },
  updateEnsCache(params) {
    try {
      const cache = StorageUtil.getEnsCache();
      cache[params.address] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ENS_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update ens name cache", params);
    }
  },
  removeEnsFromCache(address) {
    try {
      const cache = StorageUtil.getEnsCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ENS_CACHE, JSON.stringify({ ...cache, [address]: void 0 }));
    } catch {
      console.info("Unable to remove ens name from cache", address);
    }
  },
  getIdentityCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.IDENTITY_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get identity cache");
    }
    return cache;
  },
  getIdentityFromCacheForAddress(address) {
    try {
      const cache = StorageUtil.getIdentityCache();
      const identityCache = cache[address];
      if (identityCache && !this.isCacheExpired(identityCache.timestamp, this.cacheExpiry.identity)) {
        return identityCache.identity;
      }
      StorageUtil.removeIdentityFromCache(address);
    } catch {
      console.info("Unable to get identity from cache", address);
    }
    return void 0;
  },
  updateIdentityCache(params) {
    try {
      const cache = StorageUtil.getIdentityCache();
      cache[params.address] = {
        identity: params.identity,
        timestamp: params.timestamp
      };
      SafeLocalStorage.setItem(SafeLocalStorageKeys.IDENTITY_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update identity cache", params);
    }
  },
  removeIdentityFromCache(address) {
    try {
      const cache = StorageUtil.getIdentityCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.IDENTITY_CACHE, JSON.stringify({ ...cache, [address]: void 0 }));
    } catch {
      console.info("Unable to remove identity from cache", address);
    }
  },
  clearAddressCache() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.PORTFOLIO_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.ENS_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.IDENTITY_CACHE);
    } catch {
      console.info("Unable to clear address cache");
    }
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js
var SECURE_SITE = (
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org"
);
var ONRAMP_PROVIDERS = [
  {
    label: "Coinbase",
    name: "coinbase",
    feeRange: "1-2%",
    url: "",
    supportedChains: ["eip155"]
  },
  {
    label: "Meld.io",
    name: "meld",
    feeRange: "1-2%",
    url: "https://meldcrypto.com",
    supportedChains: ["eip155", "solana"]
  }
];
var ConstantsUtil2 = {
  FOUR_MINUTES_MS: 24e4,
  TEN_SEC_MS: 1e4,
  FIVE_SEC_MS: 5e3,
  THREE_SEC_MS: 3e3,
  ONE_SEC_MS: 1e3,
  SECURE_SITE,
  SECURE_SITE_DASHBOARD: `${SECURE_SITE}/dashboard`,
  SECURE_SITE_FAVICON: `${SECURE_SITE}/images/favicon.png`,
  RESTRICTED_TIMEZONES: [
    "ASIA/SHANGHAI",
    "ASIA/URUMQI",
    "ASIA/CHONGQING",
    "ASIA/HARBIN",
    "ASIA/KASHGAR",
    "ASIA/MACAU",
    "ASIA/HONG_KONG",
    "ASIA/MACAO",
    "ASIA/BEIJING",
    "ASIA/HARBIN"
  ],
  /**
   * Network name to Coinbase Pay SDK chain name map object
   * @see supported chain names on Coinbase for Pay SDK: https://github.com/coinbase/cbpay-js/blob/d4bda2c05c4d5917c8db6a05476b603546046394/src/types/onramp.ts
   */
  WC_COINBASE_PAY_SDK_CHAINS: [
    "ethereum",
    "arbitrum",
    "polygon",
    "berachain",
    "avalanche-c-chain",
    "optimism",
    "celo",
    "base"
  ],
  WC_COINBASE_PAY_SDK_FALLBACK_CHAIN: "ethereum",
  WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP: {
    Ethereum: "ethereum",
    "Arbitrum One": "arbitrum",
    Polygon: "polygon",
    Berachain: "berachain",
    Avalanche: "avalanche-c-chain",
    "OP Mainnet": "optimism",
    Celo: "celo",
    Base: "base"
  },
  WC_COINBASE_ONRAMP_APP_ID: "bf18c88d-495a-463b-b249-0b9d3656cf5e",
  SWAP_SUGGESTED_TOKENS: [
    "ETH",
    "UNI",
    "1INCH",
    "AAVE",
    "SOL",
    "ADA",
    "AVAX",
    "DOT",
    "LINK",
    "NITRO",
    "GAIA",
    "MILK",
    "TRX",
    "NEAR",
    "GNO",
    "WBTC",
    "DAI",
    "WETH",
    "USDC",
    "USDT",
    "ARB",
    "BAL",
    "BICO",
    "CRV",
    "ENS",
    "MATIC",
    "OP"
  ],
  SWAP_POPULAR_TOKENS: [
    "ETH",
    "UNI",
    "1INCH",
    "AAVE",
    "SOL",
    "ADA",
    "AVAX",
    "DOT",
    "LINK",
    "NITRO",
    "GAIA",
    "MILK",
    "TRX",
    "NEAR",
    "GNO",
    "WBTC",
    "DAI",
    "WETH",
    "USDC",
    "USDT",
    "ARB",
    "BAL",
    "BICO",
    "CRV",
    "ENS",
    "MATIC",
    "OP",
    "METAL",
    "DAI",
    "CHAMP",
    "WOLF",
    "SALE",
    "BAL",
    "BUSD",
    "MUST",
    "BTCpx",
    "ROUTE",
    "HEX",
    "WELT",
    "amDAI",
    "VSQ",
    "VISION",
    "AURUM",
    "pSP",
    "SNX",
    "VC",
    "LINK",
    "CHP",
    "amUSDT",
    "SPHERE",
    "FOX",
    "GIDDY",
    "GFC",
    "OMEN",
    "OX_OLD",
    "DE",
    "WNT"
  ],
  BALANCE_SUPPORTED_CHAINS: ["eip155", "solana"],
  SWAP_SUPPORTED_NETWORKS: [
    // Ethereum'
    "eip155:1",
    // Arbitrum One'
    "eip155:42161",
    // Optimism'
    "eip155:10",
    // ZKSync Era'
    "eip155:324",
    // Base'
    "eip155:8453",
    // BNB Smart Chain'
    "eip155:56",
    // Polygon'
    "eip155:137",
    // Gnosis'
    "eip155:100",
    // Avalanche'
    "eip155:43114",
    // Fantom'
    "eip155:250",
    // Klaytn'
    "eip155:8217",
    // Aurora
    "eip155:1313161554"
  ],
  NAMES_SUPPORTED_CHAIN_NAMESPACES: ["eip155"],
  ONRAMP_SUPPORTED_CHAIN_NAMESPACES: ["eip155", "solana"],
  ACTIVITY_ENABLED_CHAIN_NAMESPACES: ["eip155", "solana"],
  NATIVE_TOKEN_ADDRESS: {
    eip155: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    solana: "So11111111111111111111111111111111111111111",
    polkadot: "0x",
    bip122: "0x"
  },
  CONVERT_SLIPPAGE_TOLERANCE: 1,
  CONNECT_LABELS: {
    MOBILE: "Open and continue in a new browser tab"
  },
  DEFAULT_FEATURES: {
    swaps: true,
    onramp: true,
    receive: true,
    send: true,
    email: true,
    emailShowWallets: true,
    socials: [
      "google",
      "x",
      "discord",
      "farcaster",
      "github",
      "apple",
      "facebook"
    ],
    connectorTypeOrder: [
      "walletConnect",
      "recent",
      "injected",
      "featured",
      "custom",
      "external",
      "recommended"
    ],
    history: true,
    analytics: true,
    allWallets: true,
    legalCheckbox: false,
    smartSessions: false,
    collapseWallets: false,
    walletFeaturesOrder: ["onramp", "swaps", "receive", "send"],
    connectMethodsOrder: void 0
  },
  DEFAULT_ACCOUNT_TYPES: {
    bip122: "payment",
    eip155: "smartAccount",
    polkadot: "eoa",
    solana: "eoa"
  },
  ADAPTER_TYPES: {
    UNIVERSAL: "universal",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5",
    BITCOIN: "bitcoin"
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = {
  isMobile() {
    var _a;
    if (this.isClient()) {
      return Boolean(((_a = window == null ? void 0 : window.matchMedia("(pointer:coarse)")) == null ? void 0 : _a.matches) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent));
    }
    return false;
  },
  checkCaipNetwork(network, networkName = "") {
    return network == null ? void 0 : network.caipNetworkId.toLocaleLowerCase().includes(networkName.toLowerCase());
  },
  isAndroid() {
    if (!this.isMobile()) {
      return false;
    }
    const ua = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return CoreHelperUtil.isMobile() && ua.includes("android");
  },
  isIos() {
    if (!this.isMobile()) {
      return false;
    }
    const ua = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return ua.includes("iphone") || ua.includes("ipad");
  },
  isSafari() {
    if (!this.isClient()) {
      return false;
    }
    const ua = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return ua.includes("safari");
  },
  isClient() {
    return typeof window !== "undefined";
  },
  isPairingExpired(expiry) {
    return expiry ? expiry - Date.now() <= ConstantsUtil2.TEN_SEC_MS : true;
  },
  isAllowedRetry(lastRetry, differenceMs = ConstantsUtil2.ONE_SEC_MS) {
    return Date.now() - lastRetry >= differenceMs;
  },
  copyToClopboard(text) {
    navigator.clipboard.writeText(text);
  },
  isIframe() {
    try {
      return (window == null ? void 0 : window.self) !== (window == null ? void 0 : window.top);
    } catch (e3) {
      return false;
    }
  },
  getPairingExpiry() {
    return Date.now() + ConstantsUtil2.FOUR_MINUTES_MS;
  },
  getNetworkId(caipAddress) {
    return caipAddress == null ? void 0 : caipAddress.split(":")[1];
  },
  getPlainAddress(caipAddress) {
    return caipAddress == null ? void 0 : caipAddress.split(":")[2];
  },
  async wait(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce(func, timeout = 500) {
    let timer = void 0;
    return (...args) => {
      function next() {
        func(...args);
      }
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(next, timeout);
    };
  },
  isHttpUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://");
  },
  formatNativeUrl(appUrl, wcUri) {
    if (CoreHelperUtil.isHttpUrl(appUrl)) {
      return this.formatUniversalUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.includes("://")) {
      safeAppUrl = appUrl.replaceAll("/", "").replaceAll(":", "");
      safeAppUrl = `${safeAppUrl}://`;
    }
    if (!safeAppUrl.endsWith("/")) {
      safeAppUrl = `${safeAppUrl}/`;
    }
    if (this.isTelegram() && this.isAndroid()) {
      wcUri = encodeURIComponent(wcUri);
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
      redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
      href: safeAppUrl
    };
  },
  formatUniversalUrl(appUrl, wcUri) {
    if (!CoreHelperUtil.isHttpUrl(appUrl)) {
      return this.formatNativeUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.endsWith("/")) {
      safeAppUrl = `${safeAppUrl}/`;
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
      redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
      href: safeAppUrl
    };
  },
  getOpenTargetForPlatform(target) {
    if (target === "popupWindow") {
      return target;
    }
    if (this.isTelegram()) {
      if (StorageUtil.getTelegramSocialProvider()) {
        return "_top";
      }
      return "_blank";
    }
    return target;
  },
  openHref(href, target, features) {
    window == null ? void 0 : window.open(href, this.getOpenTargetForPlatform(target), features || "noreferrer noopener");
  },
  returnOpenHref(href, target, features) {
    return window == null ? void 0 : window.open(href, this.getOpenTargetForPlatform(target), features || "noreferrer noopener");
  },
  isTelegram() {
    return typeof window !== "undefined" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Boolean(window.TelegramWebviewProxy) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Boolean(window.Telegram) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Boolean(window.TelegramWebviewProxyProto));
  },
  async preloadImage(src2) {
    const imagePromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.crossOrigin = "anonymous";
      image.src = src2;
    });
    return Promise.race([imagePromise, CoreHelperUtil.wait(2e3)]);
  },
  formatBalance(balance, symbol) {
    let formattedBalance = "0.000";
    if (typeof balance === "string") {
      const number = Number(balance);
      if (number) {
        const formattedValue = Math.floor(number * 1e3) / 1e3;
        if (formattedValue) {
          formattedBalance = formattedValue.toString();
        }
      }
    }
    return `${formattedBalance}${symbol ? ` ${symbol}` : ""}`;
  },
  formatBalance2(balance, symbol) {
    var _a;
    let formattedBalance = void 0;
    if (balance === "0") {
      formattedBalance = "0";
    } else if (typeof balance === "string") {
      const number = Number(balance);
      if (number) {
        formattedBalance = (_a = number.toString().match(/^-?\d+(?:\.\d{0,3})?/u)) == null ? void 0 : _a[0];
      }
    }
    return {
      value: formattedBalance ?? "0",
      rest: formattedBalance === "0" ? "000" : "",
      symbol
    };
  },
  getApiUrl() {
    return ConstantsUtil.W3M_API_URL;
  },
  getBlockchainApiUrl() {
    return ConstantsUtil.BLOCKCHAIN_API_RPC_URL;
  },
  getAnalyticsUrl() {
    return ConstantsUtil.PULSE_API_URL;
  },
  getUUID() {
    if (crypto == null ? void 0 : crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (c7) => {
      const r3 = Math.random() * 16 | 0;
      const v5 = c7 === "x" ? r3 : r3 & 3 | 8;
      return v5.toString(16);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseError(error) {
    var _a, _b;
    if (typeof error === "string") {
      return error;
    } else if (typeof ((_b = (_a = error == null ? void 0 : error.issues) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) === "string") {
      return error.issues[0].message;
    } else if (error instanceof Error) {
      return error.message;
    }
    return "Unknown error";
  },
  sortRequestedNetworks(approvedIds, requestedNetworks = []) {
    const approvedIndexMap = {};
    if (requestedNetworks && approvedIds) {
      approvedIds.forEach((id, index2) => {
        approvedIndexMap[id] = index2;
      });
      requestedNetworks.sort((a3, b4) => {
        const indexA = approvedIndexMap[a3.id];
        const indexB = approvedIndexMap[b4.id];
        if (indexA !== void 0 && indexB !== void 0) {
          return indexA - indexB;
        } else if (indexA !== void 0) {
          return -1;
        } else if (indexB !== void 0) {
          return 1;
        }
        return 0;
      });
    }
    return requestedNetworks;
  },
  calculateBalance(array) {
    let sum = 0;
    for (const item of array) {
      sum += item.value ?? 0;
    }
    return sum;
  },
  formatTokenBalance(number) {
    const roundedNumber = number.toFixed(2);
    const [dollars, pennies] = roundedNumber.split(".");
    return { dollars, pennies };
  },
  isAddress(address, chain = "eip155") {
    switch (chain) {
      case "eip155":
        if (!/^(?:0x)?[0-9a-f]{40}$/iu.test(address)) {
          return false;
        } else if (/^(?:0x)?[0-9a-f]{40}$/iu.test(address) || /^(?:0x)?[0-9A-F]{40}$/iu.test(address)) {
          return true;
        }
        return false;
      case "solana":
        return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(address);
      default:
        return false;
    }
  },
  uniqueBy(arr, key) {
    const set2 = /* @__PURE__ */ new Set();
    return arr.filter((item) => {
      const keyValue = item[key];
      if (set2.has(keyValue)) {
        return false;
      }
      set2.add(keyValue);
      return true;
    });
  },
  generateSdkVersion(adapters, platform, version3) {
    const hasNoAdapters = adapters.length === 0;
    const adapterNames = hasNoAdapters ? ConstantsUtil2.ADAPTER_TYPES.UNIVERSAL : adapters.map((adapter) => adapter.adapterType).join(",");
    return `${platform}-${adapterNames}-${version3}`;
  },
  // eslint-disable-next-line max-params
  createAccount(namespace, address, type, publicKey, path) {
    return {
      namespace,
      address,
      type,
      publicKey,
      path
    };
  },
  isCaipAddress(address) {
    if (typeof address !== "string") {
      return false;
    }
    const sections = address.split(":");
    const namespace = sections[0];
    return sections.filter(Boolean).length === 3 && namespace in ConstantsUtil.CHAIN_NAME_MAP;
  },
  isMac() {
    const ua = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return ua.includes("macintosh") && !ua.includes("safari");
  },
  formatTelegramSocialLoginUrl(url) {
    const valueToInject = `--${encodeURIComponent(window == null ? void 0 : window.location.href)}`;
    const paramToInject = "state=";
    const parsedUrl = new URL(url);
    if (parsedUrl.host === "auth.magic.link") {
      const providerParam = "provider_authorization_url=";
      const providerUrl = url.substring(url.indexOf(providerParam) + providerParam.length);
      const resultUrl = this.injectIntoUrl(decodeURIComponent(providerUrl), paramToInject, valueToInject);
      return url.replace(providerUrl, encodeURIComponent(resultUrl));
    }
    return this.injectIntoUrl(url, paramToInject, valueToInject);
  },
  injectIntoUrl(url, key, appendString) {
    const keyIndex = url.indexOf(key);
    if (keyIndex === -1) {
      throw new Error(`${key} parameter not found in the URL: ${url}`);
    }
    const keyEndIndex = url.indexOf("&", keyIndex);
    const keyLength = key.length;
    const keyParamEnd = keyEndIndex !== -1 ? keyEndIndex : url.length;
    const beforeKeyValue = url.substring(0, keyIndex + keyLength);
    const currentKeyValue = url.substring(keyIndex + keyLength, keyParamEnd);
    const afterKeyValue = url.substring(keyEndIndex);
    const newKeyValue = currentKeyValue + appendString;
    const newUrl = beforeKeyValue + newKeyValue + afterKeyValue;
    return newUrl;
  }
};

// node_modules/proxy-compare/dist/index.modern.js
var e = Symbol();
var t = Symbol();
var s = Object.getPrototypeOf;
var c = /* @__PURE__ */ new WeakMap();
var l = (e3) => e3 && (c.has(e3) ? c.get(e3) : s(e3) === Object.prototype || s(e3) === Array.prototype);
var y = (e3) => l(e3) && e3[t] || null;
var h = (e3, t2 = true) => {
  c.set(e3, t2);
};

// node_modules/valtio/esm/vanilla.mjs
var isObject = (x5) => typeof x5 === "object" && x5 !== null;
var proxyStateMap = /* @__PURE__ */ new WeakMap();
var refSet = /* @__PURE__ */ new WeakSet();
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x5) => isObject(x5) && !refSet.has(x5) && (Array.isArray(x5) || !(Symbol.iterator in x5)) && !(x5 instanceof WeakMap) && !(x5 instanceof WeakSet) && !(x5 instanceof Error) && !(x5 instanceof Number) && !(x5 instanceof Date) && !(x5 instanceof String) && !(x5 instanceof RegExp) && !(x5 instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version3, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if ((cache == null ? void 0 : cache[0]) === version3) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version3, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(snap, key)) {
      return;
    }
    const value = Reflect.get(target, key);
    const { enumerable } = Reflect.getOwnPropertyDescriptor(
      target,
      key
    );
    const desc = {
      value,
      enumerable,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: true
    };
    if (refSet.has(value)) {
      h(value, false);
    } else if (value instanceof Promise) {
      delete desc.value;
      desc.get = () => handlePromise(value);
    } else if (proxyStateMap.has(value)) {
      const [target2, ensureVersion] = proxyStateMap.get(
        value
      );
      desc.value = createSnapshot(
        target2,
        ensureVersion(),
        handlePromise
      );
    }
    Object.defineProperty(snap, key, desc);
  });
  return Object.preventExtensions(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version3 = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version3 !== nextVersion) {
      version3 = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version3) {
          version3 = propVersion;
        }
      });
    }
    return version3;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = y(value) || value;
      }
      let nextValue = value;
      if (value instanceof Promise) {
        value.then((v5) => {
          value.status = "fulfilled";
          value.value = v5;
          notifyUpdate(["resolve", [prop], v5]);
        }).catch((e3) => {
          value.status = "rejected";
          value.reason = e3;
          notifyUpdate(["reject", [prop], e3]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxyFunction(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [
    baseObject,
    ensureVersion,
    createSnapshot,
    addListener
  ];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(
      initialObject,
      key
    );
    if ("value" in desc) {
      proxyObject[key] = initialObject[key];
      delete desc.value;
      delete desc.writable;
    }
    Object.defineProperty(baseObject, key, desc);
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [defaultProxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return defaultProxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}

// node_modules/valtio/esm/vanilla/utils.mjs
function subscribeKey(proxyObject, key, callback, notifyInSync) {
  let prevValue = proxyObject[key];
  return subscribe(
    proxyObject,
    () => {
      const nextValue = proxyObject[key];
      if (!Object.is(prevValue, nextValue)) {
        callback(prevValue = nextValue);
      }
    },
    notifyInSync
  );
}
var DEVTOOLS = Symbol();
function proxyMap(entries2) {
  const map = proxy({
    data: Array.from(entries2 || []),
    has(key) {
      return this.data.some((p4) => p4[0] === key);
    },
    set(key, value) {
      const record = this.data.find((p4) => p4[0] === key);
      if (record) {
        record[1] = value;
      } else {
        this.data.push([key, value]);
      }
      return this;
    },
    get(key) {
      var _a;
      return (_a = this.data.find((p4) => p4[0] === key)) == null ? void 0 : _a[1];
    },
    delete(key) {
      const index2 = this.data.findIndex((p4) => p4[0] === key);
      if (index2 === -1) {
        return false;
      }
      this.data.splice(index2, 1);
      return true;
    },
    clear() {
      this.data.splice(0);
    },
    get size() {
      return this.data.length;
    },
    toJSON() {
      return new Map(this.data);
    },
    forEach(cb) {
      this.data.forEach((p4) => {
        cb(p4[1], p4[0], this);
      });
    },
    keys() {
      return this.data.map((p4) => p4[0]).values();
    },
    values() {
      return this.data.map((p4) => p4[1]).values();
    },
    entries() {
      return new Map(this.data).entries();
    },
    get [Symbol.toStringTag]() {
      return "Map";
    },
    [Symbol.iterator]() {
      return this.entries();
    }
  });
  Object.defineProperties(map, {
    data: {
      enumerable: false
    },
    size: {
      enumerable: false
    },
    toJSON: {
      enumerable: false
    }
  });
  Object.seal(map);
  return map;
}

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/OptionsUtil.js
var OptionsUtil = {
  getFeatureValue(key, features) {
    const optionValue = features == null ? void 0 : features[key];
    if (optionValue === void 0) {
      return ConstantsUtil2.DEFAULT_FEATURES[key];
    }
    return optionValue;
  },
  filterSocialsByPlatform(socials) {
    if (!socials || !socials.length) {
      return socials;
    }
    if (CoreHelperUtil.isTelegram()) {
      if (CoreHelperUtil.isIos()) {
        return socials.filter((s4) => s4 !== "google");
      }
      if (CoreHelperUtil.isMac()) {
        return socials.filter((s4) => s4 !== "x");
      }
      if (CoreHelperUtil.isAndroid()) {
        return socials.filter((s4) => !["facebook", "x"].includes(s4));
      }
    }
    return socials;
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js
var state = proxy({
  features: ConstantsUtil2.DEFAULT_FEATURES,
  projectId: "",
  sdkType: "appkit",
  sdkVersion: "html-wagmi-undefined",
  defaultAccountTypes: ConstantsUtil2.DEFAULT_ACCOUNT_TYPES,
  enableNetworkSwitch: true
});
var OptionsController = {
  state,
  subscribeKey(key, callback) {
    return subscribeKey(state, key, callback);
  },
  setOptions(options) {
    Object.assign(state, options);
  },
  setFeatures(features) {
    if (!features) {
      return;
    }
    if (!state.features) {
      state.features = ConstantsUtil2.DEFAULT_FEATURES;
    }
    const newFeatures = { ...state.features, ...features };
    state.features = newFeatures;
    if (state.features.socials) {
      state.features.socials = OptionsUtil.filterSocialsByPlatform(state.features.socials);
    }
  },
  setProjectId(projectId) {
    state.projectId = projectId;
  },
  setCustomRpcUrls(customRpcUrls) {
    state.customRpcUrls = customRpcUrls;
  },
  setAllWallets(allWallets) {
    state.allWallets = allWallets;
  },
  setIncludeWalletIds(includeWalletIds) {
    state.includeWalletIds = includeWalletIds;
  },
  setExcludeWalletIds(excludeWalletIds) {
    state.excludeWalletIds = excludeWalletIds;
  },
  setFeaturedWalletIds(featuredWalletIds) {
    state.featuredWalletIds = featuredWalletIds;
  },
  setTokens(tokens) {
    state.tokens = tokens;
  },
  setTermsConditionsUrl(termsConditionsUrl) {
    state.termsConditionsUrl = termsConditionsUrl;
  },
  setPrivacyPolicyUrl(privacyPolicyUrl) {
    state.privacyPolicyUrl = privacyPolicyUrl;
  },
  setCustomWallets(customWallets) {
    state.customWallets = customWallets;
  },
  setIsSiweEnabled(isSiweEnabled) {
    state.isSiweEnabled = isSiweEnabled;
  },
  setIsUniversalProvider(isUniversalProvider) {
    state.isUniversalProvider = isUniversalProvider;
  },
  setSdkVersion(sdkVersion) {
    state.sdkVersion = sdkVersion;
  },
  setMetadata(metadata) {
    state.metadata = metadata;
  },
  setDisableAppend(disableAppend) {
    state.disableAppend = disableAppend;
  },
  setEIP6963Enabled(enableEIP6963) {
    state.enableEIP6963 = enableEIP6963;
  },
  setDebug(debug) {
    state.debug = debug;
  },
  setEnableWalletConnect(enableWalletConnect) {
    state.enableWalletConnect = enableWalletConnect;
  },
  setEnableWalletGuide(enableWalletGuide) {
    state.enableWalletGuide = enableWalletGuide;
  },
  setEnableAuthLogger(enableAuthLogger) {
    state.enableAuthLogger = enableAuthLogger;
  },
  setEnableWallets(enableWallets) {
    state.enableWallets = enableWallets;
  },
  setHasMultipleAddresses(hasMultipleAddresses) {
    state.hasMultipleAddresses = hasMultipleAddresses;
  },
  setSIWX(siwx) {
    state.siwx = siwx;
  },
  setConnectMethodsOrder(connectMethodsOrder) {
    state.features = {
      ...state.features,
      connectMethodsOrder
    };
  },
  setWalletFeaturesOrder(walletFeaturesOrder) {
    state.features = {
      ...state.features,
      walletFeaturesOrder
    };
  },
  setSocialsOrder(socialsOrder) {
    state.features = {
      ...state.features,
      socials: socialsOrder
    };
  },
  setCollapseWallets(collapseWallets) {
    state.features = {
      ...state.features,
      collapseWallets
    };
  },
  setEnableEmbedded(enableEmbedded) {
    state.enableEmbedded = enableEmbedded;
  },
  setAllowUnsupportedChain(allowUnsupportedChain) {
    state.allowUnsupportedChain = allowUnsupportedChain;
  },
  setManualWCControl(manualWCControl) {
    state.manualWCControl = manualWCControl;
  },
  setEnableNetworkSwitch(enableNetworkSwitch) {
    state.enableNetworkSwitch = enableNetworkSwitch;
  },
  setDefaultAccountTypes(defaultAccountType = {}) {
    Object.entries(defaultAccountType).forEach(([namespace, accountType]) => {
      if (accountType) {
        state.defaultAccountTypes[namespace] = accountType;
      }
    });
  },
  setUniversalProviderConfigOverride(universalProviderConfigOverride) {
    state.universalProviderConfigOverride = universalProviderConfigOverride;
  },
  getUniversalProviderConfigOverride() {
    return state.universalProviderConfigOverride;
  },
  getSnapshot() {
    return snapshot(state);
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AssetController.js
var state2 = proxy({
  walletImages: {},
  networkImages: {},
  chainImages: {},
  connectorImages: {},
  tokenImages: {},
  currencyImages: {}
});
var AssetController = {
  state: state2,
  subscribeNetworkImages(callback) {
    return subscribe(state2.networkImages, () => callback(state2.networkImages));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state2, key, callback);
  },
  subscribe(callback) {
    return subscribe(state2, () => callback(state2));
  },
  setWalletImage(key, value) {
    state2.walletImages[key] = value;
  },
  setNetworkImage(key, value) {
    state2.networkImages[key] = value;
  },
  setChainImage(key, value) {
    state2.chainImages[key] = value;
  },
  setConnectorImage(key, value) {
    state2.connectorImages = { ...state2.connectorImages, [key]: value };
  },
  setTokenImage(key, value) {
    state2.tokenImages[key] = value;
  },
  setCurrencyImage(key, value) {
    state2.currencyImages[key] = value;
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js
var namespaceImageIds = {
  // Ethereum
  eip155: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
  // Solana
  solana: "a1b58899-f671-4276-6a5e-56ca5bd59700",
  // Polkadot
  polkadot: "",
  // Bitcoin
  bip122: "0b4838db-0161-4ffe-022d-532bf03dba00"
};
var state3 = proxy({
  networkImagePromises: {}
});
var AssetUtil = {
  async fetchWalletImage(imageId) {
    if (!imageId) {
      return void 0;
    }
    await ApiController._fetchWalletImage(imageId);
    return this.getWalletImageById(imageId);
  },
  async fetchNetworkImage(imageId) {
    if (!imageId) {
      return void 0;
    }
    const existingImage = this.getNetworkImageById(imageId);
    if (existingImage) {
      return existingImage;
    }
    if (!state3.networkImagePromises[imageId]) {
      state3.networkImagePromises[imageId] = ApiController._fetchNetworkImage(imageId);
    }
    await state3.networkImagePromises[imageId];
    return this.getNetworkImageById(imageId);
  },
  getWalletImageById(imageId) {
    if (!imageId) {
      return void 0;
    }
    return AssetController.state.walletImages[imageId];
  },
  getWalletImage(wallet) {
    if (wallet == null ? void 0 : wallet.image_url) {
      return wallet == null ? void 0 : wallet.image_url;
    }
    if (wallet == null ? void 0 : wallet.image_id) {
      return AssetController.state.walletImages[wallet.image_id];
    }
    return void 0;
  },
  getNetworkImage(network) {
    var _a, _b, _c;
    if ((_a = network == null ? void 0 : network.assets) == null ? void 0 : _a.imageUrl) {
      return (_b = network == null ? void 0 : network.assets) == null ? void 0 : _b.imageUrl;
    }
    if ((_c = network == null ? void 0 : network.assets) == null ? void 0 : _c.imageId) {
      return AssetController.state.networkImages[network.assets.imageId];
    }
    return void 0;
  },
  getNetworkImageById(imageId) {
    if (!imageId) {
      return void 0;
    }
    return AssetController.state.networkImages[imageId];
  },
  getConnectorImage(connector) {
    if (connector == null ? void 0 : connector.imageUrl) {
      return connector.imageUrl;
    }
    if (connector == null ? void 0 : connector.imageId) {
      return AssetController.state.connectorImages[connector.imageId];
    }
    return void 0;
  },
  getChainImage(chain) {
    return AssetController.state.networkImages[namespaceImageIds[chain]];
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/FetchUtil.js
async function fetchData(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    const err = new Error(`HTTP status code: ${response.status}`, {
      cause: response
    });
    throw err;
  }
  return response;
}
var FetchUtil = class {
  constructor({ baseUrl: baseUrl4, clientId }) {
    this.baseUrl = baseUrl4;
    this.clientId = clientId;
  }
  async get({ headers, signal, cache, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, { method: "GET", headers, signal, cache });
    return response.json();
  }
  async getBlob({ headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, { method: "GET", headers, signal });
    return response.blob();
  }
  async post({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  async put({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  async delete({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "DELETE",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  createUrl({ path, params }) {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.append(key, value);
        }
      });
    }
    if (this.clientId) {
      url.searchParams.append("clientId", this.clientId);
    }
    return url;
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/MobileWallet.js
var MobileWalletUtil = {
  /**
   * Handles mobile wallet redirection for wallets that have Universal Links.
   *
   * @param {Object} properties - The properties object.
   * @param {string} properties.name - The name of the wallet.
   */
  handleSolanaDeeplinkRedirect(name2) {
    if (ChainController.state.activeChain === ConstantsUtil.CHAIN.SOLANA) {
      const href = window.location.href;
      const encodedHref = encodeURIComponent(href);
      if (name2 === "Phantom" && !("phantom" in window)) {
        const protocol = href.startsWith("https") ? "https" : "http";
        const host = href.split("/")[2];
        const encodedRef = encodeURIComponent(`${protocol}://${host}`);
        window.location.href = `https://phantom.app/ul/browse/${encodedHref}?ref=${encodedRef}`;
      }
      if (name2 === "Coinbase Wallet" && !("coinbaseSolana" in window)) {
        window.location.href = `https://go.cb-w.com/dapp?cb_url=${encodedHref}`;
      }
    }
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js
var DEFAULT_STATE = Object.freeze({
  message: "",
  variant: "success",
  svg: void 0,
  open: false,
  autoClose: true
});
var state4 = proxy({
  ...DEFAULT_STATE
});
var SnackController = {
  state: state4,
  subscribeKey(key, callback) {
    return subscribeKey(state4, key, callback);
  },
  showLoading(message, options = {}) {
    this._showMessage({ message, variant: "loading", ...options });
  },
  showSuccess(message) {
    this._showMessage({ message, variant: "success" });
  },
  showSvg(message, svg) {
    this._showMessage({ message, svg });
  },
  showError(message) {
    const errorMessage = CoreHelperUtil.parseError(message);
    this._showMessage({ message: errorMessage, variant: "error" });
  },
  hide() {
    state4.message = DEFAULT_STATE.message;
    state4.variant = DEFAULT_STATE.variant;
    state4.svg = DEFAULT_STATE.svg;
    state4.open = DEFAULT_STATE.open;
    state4.autoClose = DEFAULT_STATE.autoClose;
  },
  _showMessage({ message, svg, variant = "success", autoClose = DEFAULT_STATE.autoClose }) {
    if (state4.open) {
      state4.open = false;
      setTimeout(() => {
        state4.message = message;
        state4.variant = variant;
        state4.svg = svg;
        state4.open = true;
        state4.autoClose = autoClose;
      }, 150);
    } else {
      state4.message = message;
      state4.variant = variant;
      state4.svg = svg;
      state4.open = true;
      state4.autoClose = autoClose;
    }
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js
var DEFAULT_OPTIONS = {
  purchaseCurrencies: [
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "USD Coin",
      symbol: "USDC",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    },
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "Ether",
      symbol: "ETH",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    }
  ],
  paymentCurrencies: [
    {
      id: "USD",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    },
    {
      id: "EUR",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    }
  ]
};
var baseUrl = CoreHelperUtil.getBlockchainApiUrl();
var state5 = proxy({
  clientId: null,
  api: new FetchUtil({ baseUrl, clientId: null }),
  supportedChains: { http: [], ws: [] }
});
var BlockchainApiController = {
  state: state5,
  async get(request) {
    const { st: st2, sv } = BlockchainApiController.getSdkProperties();
    const projectId = OptionsController.state.projectId;
    const params = {
      ...request.params || {},
      st: st2,
      sv,
      projectId
    };
    return state5.api.get({
      ...request,
      params
    });
  },
  getSdkProperties() {
    const { sdkType, sdkVersion } = OptionsController.state;
    return {
      st: sdkType || "unknown",
      sv: sdkVersion || "unknown"
    };
  },
  async isNetworkSupported(networkId) {
    if (!networkId) {
      return false;
    }
    try {
      if (!state5.supportedChains.http.length) {
        await BlockchainApiController.getSupportedNetworks();
      }
    } catch (e3) {
      return false;
    }
    return state5.supportedChains.http.includes(networkId);
  },
  async getSupportedNetworks() {
    const supportedChains = await BlockchainApiController.get({
      path: "v1/supported-chains"
    });
    state5.supportedChains = supportedChains;
    return supportedChains;
  },
  async fetchIdentity({ address, caipNetworkId }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(caipNetworkId);
    if (!isSupported) {
      return { avatar: "", name: "" };
    }
    const identityCache = StorageUtil.getIdentityFromCacheForAddress(address);
    if (identityCache) {
      return identityCache;
    }
    const result = await BlockchainApiController.get({
      path: `/v1/identity/${address}`,
      params: {
        sender: ChainController.state.activeCaipAddress ? CoreHelperUtil.getPlainAddress(ChainController.state.activeCaipAddress) : void 0
      }
    });
    StorageUtil.updateIdentityCache({
      address,
      identity: result,
      timestamp: Date.now()
    });
    return result;
  },
  async fetchTransactions({ account, cursor, onramp, signal, cache, chainId }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { data: [], next: void 0 };
    }
    return BlockchainApiController.get({
      path: `/v1/account/${account}/history`,
      params: {
        cursor,
        onramp,
        chainId
      },
      signal,
      cache
    });
  },
  async fetchSwapQuote({ amount, userAddress, from: from13, to: to2, gasPrice }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { quotes: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/quotes`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        amount,
        userAddress,
        from: from13,
        to: to2,
        gasPrice
      }
    });
  },
  async fetchSwapTokens({ chainId }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { tokens: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/tokens`,
      params: { chainId }
    });
  },
  async fetchTokenPrice({ addresses }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { fungibles: [] };
    }
    return state5.api.post({
      path: "/v1/fungible/price",
      body: {
        currency: "usd",
        addresses,
        projectId: OptionsController.state.projectId
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async fetchSwapAllowance({ tokenAddress, userAddress }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { allowance: "0" };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/allowance`,
      params: {
        tokenAddress,
        userAddress
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async fetchGasPrice({ chainId }) {
    var _a;
    const { st: st2, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Gas Price");
    }
    return BlockchainApiController.get({
      path: `/v1/convert/gas-price`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        chainId,
        st: st2,
        sv
      }
    });
  },
  async generateSwapCalldata({ amount, from: from13, to: to2, userAddress, disableEstimate }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Swaps");
    }
    return state5.api.post({
      path: "/v1/convert/build-transaction",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        amount,
        eip155: {
          slippage: ConstantsUtil2.CONVERT_SLIPPAGE_TOLERANCE
        },
        projectId: OptionsController.state.projectId,
        from: from13,
        to: to2,
        userAddress,
        disableEstimate
      }
    });
  },
  async generateApproveCalldata({ from: from13, to: to2, userAddress }) {
    var _a;
    const { st: st2, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Swaps");
    }
    return BlockchainApiController.get({
      path: `/v1/convert/build-approve`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        userAddress,
        from: from13,
        to: to2,
        st: st2,
        sv
      }
    });
  },
  async getBalance(address, chainId, forceUpdate) {
    var _a;
    const { st: st2, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      SnackController.showError("Token Balance Unavailable");
      return { balances: [] };
    }
    const caipAddress = `${chainId}:${address}`;
    const cachedBalance = StorageUtil.getBalanceCacheForCaipAddress(caipAddress);
    if (cachedBalance) {
      return cachedBalance;
    }
    const balance = await BlockchainApiController.get({
      path: `/v1/account/${address}/balance`,
      params: {
        currency: "usd",
        chainId,
        forceUpdate,
        st: st2,
        sv
      }
    });
    StorageUtil.updateBalanceCache({
      caipAddress,
      balance,
      timestamp: Date.now()
    });
    return balance;
  },
  async lookupEnsName(name2) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { addresses: {}, attributes: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/profile/account/${name2}`,
      params: { apiVersion: "2" }
    });
  },
  async reverseLookupEnsName({ address }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return [];
    }
    return BlockchainApiController.get({
      path: `/v1/profile/reverse/${address}`,
      params: {
        sender: AccountController.state.address,
        apiVersion: "2"
      }
    });
  },
  async getEnsNameSuggestions(name2) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { suggestions: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/profile/suggestions/${name2}`,
      params: { zone: "reown.id" }
    });
  },
  async registerEnsName({ coinType, address, message, signature }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { success: false };
    }
    return state5.api.post({
      path: `/v1/profile/account`,
      body: { coin_type: coinType, address, message, signature },
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async generateOnRampURL({ destinationWallets, partnerUserId, defaultNetwork, purchaseAmount, paymentAmount }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return "";
    }
    const response = await state5.api.post({
      path: `/v1/generators/onrampurl`,
      params: {
        projectId: OptionsController.state.projectId
      },
      body: {
        destinationWallets,
        defaultNetwork,
        partnerUserId,
        defaultExperience: "buy",
        presetCryptoAmount: purchaseAmount,
        presetFiatAmount: paymentAmount
      }
    });
    return response.url;
  },
  async getOnrampOptions() {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { paymentCurrencies: [], purchaseCurrencies: [] };
    }
    try {
      const response = await BlockchainApiController.get({
        path: `/v1/onramp/options`
      });
      return response;
    } catch (e3) {
      return DEFAULT_OPTIONS;
    }
  },
  async getOnrampQuote({ purchaseCurrency, paymentCurrency, amount, network }) {
    var _a;
    try {
      const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
      if (!isSupported) {
        return null;
      }
      const response = await state5.api.post({
        path: `/v1/onramp/quote`,
        params: {
          projectId: OptionsController.state.projectId
        },
        body: {
          purchaseCurrency,
          paymentCurrency,
          amount,
          network
        }
      });
      return response;
    } catch (e3) {
      return {
        coinbaseFee: { amount, currency: paymentCurrency.id },
        networkFee: { amount, currency: paymentCurrency.id },
        paymentSubtotal: { amount, currency: paymentCurrency.id },
        paymentTotal: { amount, currency: paymentCurrency.id },
        purchaseAmount: { amount, currency: paymentCurrency.id },
        quoteId: "mocked-quote-id"
      };
    }
  },
  async getSmartSessions(caipAddress) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return [];
    }
    return BlockchainApiController.get({
      path: `/v1/sessions/${caipAddress}`
    });
  },
  async revokeSmartSession(address, pci, signature) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { success: false };
    }
    return state5.api.post({
      path: `/v1/sessions/${address}/revoke`,
      params: {
        projectId: OptionsController.state.projectId
      },
      body: {
        pci,
        signature
      }
    });
  },
  setClientId(clientId) {
    state5.clientId = clientId;
    state5.api = new FetchUtil({ baseUrl, clientId });
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AccountController.js
var state6 = proxy({
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: false,
  addressLabels: /* @__PURE__ */ new Map(),
  allAccounts: []
});
var AccountController = {
  state: state6,
  replaceState(newState) {
    if (!newState) {
      return;
    }
    Object.assign(state6, ref(newState));
  },
  subscribe(callback) {
    return ChainController.subscribeChainProp("accountState", (accountState2) => {
      if (accountState2) {
        return callback(accountState2);
      }
      return void 0;
    });
  },
  subscribeKey(property, callback, chain) {
    let prev = void 0;
    return ChainController.subscribeChainProp("accountState", (accountState2) => {
      if (accountState2) {
        const nextValue = accountState2[property];
        if (prev !== nextValue) {
          prev = nextValue;
          callback(nextValue);
        }
      }
    }, chain);
  },
  setStatus(status, chain) {
    ChainController.setAccountProp("status", status, chain);
  },
  getCaipAddress(chain) {
    return ChainController.getAccountProp("caipAddress", chain);
  },
  setCaipAddress(caipAddress, chain) {
    const newAddress = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : void 0;
    if (chain === ChainController.state.activeChain) {
      ChainController.state.activeCaipAddress = caipAddress;
    }
    ChainController.setAccountProp("caipAddress", caipAddress, chain);
    ChainController.setAccountProp("address", newAddress, chain);
  },
  setBalance(balance, balanceSymbol, chain) {
    ChainController.setAccountProp("balance", balance, chain);
    ChainController.setAccountProp("balanceSymbol", balanceSymbol, chain);
  },
  setProfileName(profileName, chain) {
    ChainController.setAccountProp("profileName", profileName, chain);
  },
  setProfileImage(profileImage, chain) {
    ChainController.setAccountProp("profileImage", profileImage, chain);
  },
  setUser(user, chain) {
    ChainController.setAccountProp("user", user, chain);
  },
  setAddressExplorerUrl(explorerUrl, chain) {
    ChainController.setAccountProp("addressExplorerUrl", explorerUrl, chain);
  },
  setSmartAccountDeployed(isDeployed, chain) {
    ChainController.setAccountProp("smartAccountDeployed", isDeployed, chain);
  },
  setCurrentTab(currentTab) {
    ChainController.setAccountProp("currentTab", currentTab, ChainController.state.activeChain);
  },
  setTokenBalance(tokenBalance, chain) {
    if (tokenBalance) {
      ChainController.setAccountProp("tokenBalance", tokenBalance, chain);
    }
  },
  setShouldUpdateToAddress(address, chain) {
    ChainController.setAccountProp("shouldUpdateToAddress", address, chain);
  },
  setAllAccounts(accounts, namespace) {
    ChainController.setAccountProp("allAccounts", accounts, namespace);
  },
  addAddressLabel(address, label, chain) {
    const map = ChainController.getAccountProp("addressLabels", chain) || /* @__PURE__ */ new Map();
    map.set(address, label);
    ChainController.setAccountProp("addressLabels", map, chain);
  },
  removeAddressLabel(address, chain) {
    const map = ChainController.getAccountProp("addressLabels", chain) || /* @__PURE__ */ new Map();
    map.delete(address);
    ChainController.setAccountProp("addressLabels", map, chain);
  },
  setConnectedWalletInfo(connectedWalletInfo, chain) {
    ChainController.setAccountProp("connectedWalletInfo", connectedWalletInfo, chain, false);
  },
  setPreferredAccountType(preferredAccountType, chain) {
    ChainController.setAccountProp("preferredAccountType", preferredAccountType, chain);
  },
  setSocialProvider(socialProvider, chain) {
    if (socialProvider) {
      ChainController.setAccountProp("socialProvider", socialProvider, chain);
    }
  },
  setSocialWindow(socialWindow, chain) {
    ChainController.setAccountProp("socialWindow", socialWindow ? ref(socialWindow) : void 0, chain);
  },
  setFarcasterUrl(farcasterUrl, chain) {
    ChainController.setAccountProp("farcasterUrl", farcasterUrl, chain);
  },
  async fetchTokenBalance(onError) {
    var _a, _b;
    state6.balanceLoading = true;
    const chainId = (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId;
    const chain = (_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.chainNamespace;
    const caipAddress = ChainController.state.activeCaipAddress;
    const address = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : void 0;
    if (state6.lastRetry && !CoreHelperUtil.isAllowedRetry(state6.lastRetry, 30 * ConstantsUtil2.ONE_SEC_MS)) {
      state6.balanceLoading = false;
      return [];
    }
    try {
      if (address && chainId && chain) {
        const response = await BlockchainApiController.getBalance(address, chainId);
        const filteredBalances = response.balances.filter((balance) => balance.quantity.decimals !== "0");
        this.setTokenBalance(filteredBalances, chain);
        state6.lastRetry = void 0;
        state6.balanceLoading = false;
        return filteredBalances;
      }
    } catch (error) {
      state6.lastRetry = Date.now();
      onError == null ? void 0 : onError(error);
      SnackController.showError("Token Balance Unavailable");
    } finally {
      state6.balanceLoading = false;
    }
    return [];
  },
  resetAccount(chain) {
    ChainController.resetAccount(chain);
  }
};

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/core/dist/index.es.js
var import_events7 = __toESM(require_events());

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var import_events = __toESM(require_events());
var import_time = __toESM(require_cjs());

// node_modules/@walletconnect/events/dist/esm/events.js
var IEvents = class {
};

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var n = class extends IEvents {
  constructor(e3) {
    super();
  }
};
var s2 = import_time.FIVE_SECONDS;
var r = { pulse: "heartbeat_pulse" };
var i2 = class _i extends n {
  constructor(e3) {
    super(e3), this.events = new import_events.EventEmitter(), this.interval = s2, this.interval = (e3 == null ? void 0 : e3.interval) || s2;
  }
  static async init(e3) {
    const t2 = new _i(e3);
    return await t2.init(), t2;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e3, t2) {
    this.events.on(e3, t2);
  }
  once(e3, t2) {
    this.events.once(e3, t2);
  }
  off(e3, t2) {
    this.events.off(e3, t2);
  }
  removeListener(e3, t2) {
    this.events.removeListener(e3, t2);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), (0, import_time.toMiliseconds)(this.interval));
  }
  pulse() {
    this.events.emit(r.pulse);
  }
};

// node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// node_modules/@reown/appkit-controllers/node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
  return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  let dbp;
  const getDB = () => {
    if (dbp)
      return dbp;
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    dbp = promisifyRequest(request);
    dbp.then((db) => {
      db.onclose = () => dbp = void 0;
    }, () => {
    });
    return dbp;
  };
  return (txMode, callback) => getDB().then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
function clear(customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.clear();
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}

// node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify = (data) => JSON.stringify(data, (_3, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_3, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var l3 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var c2 = { exports: {} };
(function() {
  let i5;
  function t2() {
  }
  i5 = t2, i5.prototype.getItem = function(e3) {
    return this.hasOwnProperty(e3) ? String(this[e3]) : null;
  }, i5.prototype.setItem = function(e3, n5) {
    this[e3] = String(n5);
  }, i5.prototype.removeItem = function(e3) {
    delete this[e3];
  }, i5.prototype.clear = function() {
    const e3 = this;
    Object.keys(e3).forEach(function(n5) {
      e3[n5] = void 0, delete e3[n5];
    });
  }, i5.prototype.key = function(e3) {
    return e3 = e3 || 0, Object.keys(this)[e3];
  }, i5.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l3 < "u" && l3.localStorage ? c2.exports = l3.localStorage : typeof window < "u" && window.localStorage ? c2.exports = window.localStorage : c2.exports = new t2();
})();

// node_modules/@walletconnect/logger/dist/index.es.js
var import_pino = __toESM(require_browser());
var import_pino2 = __toESM(require_browser());
var c3 = { level: "info" };
var n2 = "custom_context";
var l4 = 1e3 * 1024;
var O = class {
  constructor(e3) {
    this.nodeValue = e3, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
};
var d = class {
  constructor(e3) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e3, this.sizeInBytes = 0;
  }
  append(e3) {
    const t2 = new O(e3);
    if (t2.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e3} with size ${t2.size}`);
    for (; this.size + t2.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = t2), this.tail = t2) : (this.head = t2, this.tail = t2), this.lengthInNodes++, this.sizeInBytes += t2.size;
  }
  shift() {
    if (!this.head) return;
    const e3 = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e3.size;
  }
  toArray() {
    const e3 = [];
    let t2 = this.head;
    for (; t2 !== null; ) e3.push(t2.value), t2 = t2.next;
    return e3;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e3 = this.head;
    return { next: () => {
      if (!e3) return { done: true, value: null };
      const t2 = e3.value;
      return e3 = e3.next, { done: false, value: t2 };
    } };
  }
};
var L = class {
  constructor(e3, t2 = l4) {
    this.level = e3 ?? "error", this.levelValue = import_pino.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t2, this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e3, t2) {
    t2 === import_pino.levels.values.error ? console.error(e3) : t2 === import_pino.levels.values.warn ? console.warn(e3) : t2 === import_pino.levels.values.debug ? console.debug(e3) : t2 === import_pino.levels.values.trace ? console.trace(e3) : console.log(e3);
  }
  appendToLogs(e3) {
    this.logs.append(safeJsonStringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e3 }));
    const t2 = typeof e3 == "string" ? JSON.parse(e3).level : e3.level;
    t2 >= this.levelValue && this.forwardToConsole(e3, t2);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e3) {
    const t2 = this.getLogArray();
    return t2.push(safeJsonStringify({ extraMetadata: e3 })), new Blob(t2, { type: "application/json" });
  }
};
var m = class {
  constructor(e3, t2 = l4) {
    this.baseChunkLogger = new L(e3, t2);
  }
  write(e3) {
    this.baseChunkLogger.appendToLogs(e3);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e3) {
    return this.baseChunkLogger.logsToBlob(e3);
  }
  downloadLogsBlobInBrowser(e3) {
    const t2 = URL.createObjectURL(this.logsToBlob(e3)), o5 = document.createElement("a");
    o5.href = t2, o5.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(o5), o5.click(), document.body.removeChild(o5), URL.revokeObjectURL(t2);
  }
};
var B = class {
  constructor(e3, t2 = l4) {
    this.baseChunkLogger = new L(e3, t2);
  }
  write(e3) {
    this.baseChunkLogger.appendToLogs(e3);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e3) {
    return this.baseChunkLogger.logsToBlob(e3);
  }
};
var x = Object.defineProperty;
var S = Object.defineProperties;
var _ = Object.getOwnPropertyDescriptors;
var p = Object.getOwnPropertySymbols;
var T = Object.prototype.hasOwnProperty;
var z = Object.prototype.propertyIsEnumerable;
var f2 = (r3, e3, t2) => e3 in r3 ? x(r3, e3, { enumerable: true, configurable: true, writable: true, value: t2 }) : r3[e3] = t2;
var i3 = (r3, e3) => {
  for (var t2 in e3 || (e3 = {})) T.call(e3, t2) && f2(r3, t2, e3[t2]);
  if (p) for (var t2 of p(e3)) z.call(e3, t2) && f2(r3, t2, e3[t2]);
  return r3;
};
var g = (r3, e3) => S(r3, _(e3));
function k(r3) {
  return g(i3({}, r3), { level: (r3 == null ? void 0 : r3.level) || c3.level });
}
function v(r3, e3 = n2) {
  return r3[e3] || "";
}
function b(r3, e3, t2 = n2) {
  return r3[t2] = e3, r3;
}
function y2(r3, e3 = n2) {
  let t2 = "";
  return typeof r3.bindings > "u" ? t2 = v(r3, e3) : t2 = r3.bindings().context || "", t2;
}
function w(r3, e3, t2 = n2) {
  const o5 = y2(r3, t2);
  return o5.trim() ? `${o5}/${e3}` : e3;
}
function E(r3, e3, t2 = n2) {
  const o5 = w(r3, e3, t2), a3 = r3.child({ context: o5 });
  return b(a3, o5, t2);
}
function C(r3) {
  var e3, t2;
  const o5 = new m((e3 = r3.opts) == null ? void 0 : e3.level, r3.maxSizeInBytes);
  return { logger: (0, import_pino.default)(g(i3({}, r3.opts), { level: "trace", browser: g(i3({}, (t2 = r3.opts) == null ? void 0 : t2.browser), { write: (a3) => o5.write(a3) }) })), chunkLoggerController: o5 };
}
function I(r3) {
  var e3;
  const t2 = new B((e3 = r3.opts) == null ? void 0 : e3.level, r3.maxSizeInBytes);
  return { logger: (0, import_pino.default)(g(i3({}, r3.opts), { level: "trace" }), t2), chunkLoggerController: t2 };
}
function A(r3) {
  return typeof r3.loggerOverride < "u" && typeof r3.loggerOverride != "string" ? { logger: r3.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? C(r3) : I(r3);
}

// node_modules/@walletconnect/types/dist/index.es.js
var import_events4 = __toESM(require_events());
var a2 = Object.defineProperty;
var u2 = (e3, s4, r3) => s4 in e3 ? a2(e3, s4, { enumerable: true, configurable: true, writable: true, value: r3 }) : e3[s4] = r3;
var c4 = (e3, s4, r3) => u2(e3, typeof s4 != "symbol" ? s4 + "" : s4, r3);
var h3 = class extends IEvents {
  constructor(s4) {
    super(), this.opts = s4, c4(this, "protocol", "wc"), c4(this, "version", 2);
  }
};
var p2 = Object.defineProperty;
var b2 = (e3, s4, r3) => s4 in e3 ? p2(e3, s4, { enumerable: true, configurable: true, writable: true, value: r3 }) : e3[s4] = r3;
var v2 = (e3, s4, r3) => b2(e3, typeof s4 != "symbol" ? s4 + "" : s4, r3);
var I2 = class extends IEvents {
  constructor(s4, r3) {
    super(), this.core = s4, this.logger = r3, v2(this, "records", /* @__PURE__ */ new Map());
  }
};
var y3 = class {
  constructor(s4, r3) {
    this.logger = s4, this.core = r3;
  }
};
var m2 = class extends IEvents {
  constructor(s4, r3) {
    super(), this.relayer = s4, this.logger = r3;
  }
};
var d2 = class extends IEvents {
  constructor(s4) {
    super();
  }
};
var f3 = class {
  constructor(s4, r3, t2, q2) {
    this.core = s4, this.logger = r3, this.name = t2;
  }
};
var P2 = class extends IEvents {
  constructor(s4, r3) {
    super(), this.relayer = s4, this.logger = r3;
  }
};
var S2 = class extends IEvents {
  constructor(s4, r3) {
    super(), this.core = s4, this.logger = r3;
  }
};
var M = class {
  constructor(s4, r3, t2) {
    this.core = s4, this.logger = r3, this.store = t2;
  }
};
var O2 = class {
  constructor(s4, r3) {
    this.projectId = s4, this.logger = r3;
  }
};
var R = class {
  constructor(s4, r3, t2) {
    this.core = s4, this.logger = r3, this.telemetryEnabled = t2;
  }
};
var T2 = Object.defineProperty;
var k2 = (e3, s4, r3) => s4 in e3 ? T2(e3, s4, { enumerable: true, configurable: true, writable: true, value: r3 }) : e3[s4] = r3;
var i4 = (e3, s4, r3) => k2(e3, typeof s4 != "symbol" ? s4 + "" : s4, r3);
var J = class {
  constructor(s4) {
    this.opts = s4, i4(this, "protocol", "wc"), i4(this, "version", 2);
  }
};
var V = class {
  constructor(s4) {
    this.client = s4;
  }
};

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/core/dist/index.es.js
var import_time4 = __toESM(require_cjs());

// node_modules/@walletconnect/relay-auth/dist/index.es.js
var import_time2 = __toESM(require_cjs());
function En(t2) {
  return t2 instanceof Uint8Array || ArrayBuffer.isView(t2) && t2.constructor.name === "Uint8Array";
}
function fe(t2, ...e3) {
  if (!En(t2)) throw new Error("Uint8Array expected");
  if (e3.length > 0 && !e3.includes(t2.length)) throw new Error("Uint8Array expected of length " + e3 + ", got length=" + t2.length);
}
function De(t2, e3 = true) {
  if (t2.destroyed) throw new Error("Hash instance has been destroyed");
  if (e3 && t2.finished) throw new Error("Hash#digest() has already been called");
}
function gn(t2, e3) {
  fe(t2);
  const n5 = e3.outputLen;
  if (t2.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
var it = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
var _t = (t2) => new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
function yn(t2) {
  if (typeof t2 != "string") throw new Error("utf8ToBytes expected string, got " + typeof t2);
  return new Uint8Array(new TextEncoder().encode(t2));
}
function de(t2) {
  return typeof t2 == "string" && (t2 = yn(t2)), fe(t2), t2;
}
var xn = class {
  clone() {
    return this._cloneInto();
  }
};
function Bn(t2) {
  const e3 = (r3) => t2().update(de(r3)).digest(), n5 = t2();
  return e3.outputLen = n5.outputLen, e3.blockLen = n5.blockLen, e3.create = () => t2(), e3;
}
function he(t2 = 32) {
  if (it && typeof it.getRandomValues == "function") return it.getRandomValues(new Uint8Array(t2));
  if (it && typeof it.randomBytes == "function") return it.randomBytes(t2);
  throw new Error("crypto.getRandomValues must be defined");
}
function Cn(t2, e3, n5, r3) {
  if (typeof t2.setBigUint64 == "function") return t2.setBigUint64(e3, n5, r3);
  const o5 = BigInt(32), s4 = BigInt(4294967295), a3 = Number(n5 >> o5 & s4), u3 = Number(n5 & s4), i5 = r3 ? 4 : 0, D = r3 ? 0 : 4;
  t2.setUint32(e3 + i5, a3, r3), t2.setUint32(e3 + D, u3, r3);
}
var An = class extends xn {
  constructor(e3, n5, r3, o5) {
    super(), this.blockLen = e3, this.outputLen = n5, this.padOffset = r3, this.isLE = o5, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e3), this.view = _t(this.buffer);
  }
  update(e3) {
    De(this);
    const { view: n5, buffer: r3, blockLen: o5 } = this;
    e3 = de(e3);
    const s4 = e3.length;
    for (let a3 = 0; a3 < s4; ) {
      const u3 = Math.min(o5 - this.pos, s4 - a3);
      if (u3 === o5) {
        const i5 = _t(e3);
        for (; o5 <= s4 - a3; a3 += o5) this.process(i5, a3);
        continue;
      }
      r3.set(e3.subarray(a3, a3 + u3), this.pos), this.pos += u3, a3 += u3, this.pos === o5 && (this.process(n5, 0), this.pos = 0);
    }
    return this.length += e3.length, this.roundClean(), this;
  }
  digestInto(e3) {
    De(this), gn(e3, this), this.finished = true;
    const { buffer: n5, view: r3, blockLen: o5, isLE: s4 } = this;
    let { pos: a3 } = this;
    n5[a3++] = 128, this.buffer.subarray(a3).fill(0), this.padOffset > o5 - a3 && (this.process(r3, 0), a3 = 0);
    for (let l8 = a3; l8 < o5; l8++) n5[l8] = 0;
    Cn(r3, o5 - 8, BigInt(this.length * 8), s4), this.process(r3, 0);
    const u3 = _t(e3), i5 = this.outputLen;
    if (i5 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const D = i5 / 4, c7 = this.get();
    if (D > c7.length) throw new Error("_sha2: outputLen bigger than state");
    for (let l8 = 0; l8 < D; l8++) u3.setUint32(4 * l8, c7[l8], s4);
  }
  digest() {
    const { buffer: e3, outputLen: n5 } = this;
    this.digestInto(e3);
    const r3 = e3.slice(0, n5);
    return this.destroy(), r3;
  }
  _cloneInto(e3) {
    e3 || (e3 = new this.constructor()), e3.set(...this.get());
    const { blockLen: n5, buffer: r3, length: o5, finished: s4, destroyed: a3, pos: u3 } = this;
    return e3.length = o5, e3.pos = u3, e3.finished = s4, e3.destroyed = a3, o5 % n5 && e3.buffer.set(r3), e3;
  }
};
var wt = BigInt(2 ** 32 - 1);
var St = BigInt(32);
function le(t2, e3 = false) {
  return e3 ? { h: Number(t2 & wt), l: Number(t2 >> St & wt) } : { h: Number(t2 >> St & wt) | 0, l: Number(t2 & wt) | 0 };
}
function mn(t2, e3 = false) {
  let n5 = new Uint32Array(t2.length), r3 = new Uint32Array(t2.length);
  for (let o5 = 0; o5 < t2.length; o5++) {
    const { h: s4, l: a3 } = le(t2[o5], e3);
    [n5[o5], r3[o5]] = [s4, a3];
  }
  return [n5, r3];
}
var _n = (t2, e3) => BigInt(t2 >>> 0) << St | BigInt(e3 >>> 0);
var Sn = (t2, e3, n5) => t2 >>> n5;
var vn = (t2, e3, n5) => t2 << 32 - n5 | e3 >>> n5;
var In = (t2, e3, n5) => t2 >>> n5 | e3 << 32 - n5;
var Un = (t2, e3, n5) => t2 << 32 - n5 | e3 >>> n5;
var Tn = (t2, e3, n5) => t2 << 64 - n5 | e3 >>> n5 - 32;
var Fn = (t2, e3, n5) => t2 >>> n5 - 32 | e3 << 64 - n5;
var Nn = (t2, e3) => e3;
var Ln = (t2, e3) => t2;
var On = (t2, e3, n5) => t2 << n5 | e3 >>> 32 - n5;
var Hn = (t2, e3, n5) => e3 << n5 | t2 >>> 32 - n5;
var zn = (t2, e3, n5) => e3 << n5 - 32 | t2 >>> 64 - n5;
var Mn = (t2, e3, n5) => t2 << n5 - 32 | e3 >>> 64 - n5;
function qn(t2, e3, n5, r3) {
  const o5 = (e3 >>> 0) + (r3 >>> 0);
  return { h: t2 + n5 + (o5 / 2 ** 32 | 0) | 0, l: o5 | 0 };
}
var $n = (t2, e3, n5) => (t2 >>> 0) + (e3 >>> 0) + (n5 >>> 0);
var kn = (t2, e3, n5, r3) => e3 + n5 + r3 + (t2 / 2 ** 32 | 0) | 0;
var Rn = (t2, e3, n5, r3) => (t2 >>> 0) + (e3 >>> 0) + (n5 >>> 0) + (r3 >>> 0);
var jn = (t2, e3, n5, r3, o5) => e3 + n5 + r3 + o5 + (t2 / 2 ** 32 | 0) | 0;
var Zn = (t2, e3, n5, r3, o5) => (t2 >>> 0) + (e3 >>> 0) + (n5 >>> 0) + (r3 >>> 0) + (o5 >>> 0);
var Gn = (t2, e3, n5, r3, o5, s4) => e3 + n5 + r3 + o5 + s4 + (t2 / 2 ** 32 | 0) | 0;
var x2 = { fromBig: le, split: mn, toBig: _n, shrSH: Sn, shrSL: vn, rotrSH: In, rotrSL: Un, rotrBH: Tn, rotrBL: Fn, rotr32H: Nn, rotr32L: Ln, rotlSH: On, rotlSL: Hn, rotlBH: zn, rotlBL: Mn, add: qn, add3L: $n, add3H: kn, add4L: Rn, add4H: jn, add5H: Gn, add5L: Zn };
var [Vn, Yn] = (() => x2.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t2) => BigInt(t2))))();
var P3 = new Uint32Array(80);
var Q = new Uint32Array(80);
var Jn = class extends An {
  constructor() {
    super(128, 64, 16, false), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e3, Al: n5, Bh: r3, Bl: o5, Ch: s4, Cl: a3, Dh: u3, Dl: i5, Eh: D, El: c7, Fh: l8, Fl: p4, Gh: w4, Gl: h6, Hh: g4, Hl: S3 } = this;
    return [e3, n5, r3, o5, s4, a3, u3, i5, D, c7, l8, p4, w4, h6, g4, S3];
  }
  set(e3, n5, r3, o5, s4, a3, u3, i5, D, c7, l8, p4, w4, h6, g4, S3) {
    this.Ah = e3 | 0, this.Al = n5 | 0, this.Bh = r3 | 0, this.Bl = o5 | 0, this.Ch = s4 | 0, this.Cl = a3 | 0, this.Dh = u3 | 0, this.Dl = i5 | 0, this.Eh = D | 0, this.El = c7 | 0, this.Fh = l8 | 0, this.Fl = p4 | 0, this.Gh = w4 | 0, this.Gl = h6 | 0, this.Hh = g4 | 0, this.Hl = S3 | 0;
  }
  process(e3, n5) {
    for (let d5 = 0; d5 < 16; d5++, n5 += 4) P3[d5] = e3.getUint32(n5), Q[d5] = e3.getUint32(n5 += 4);
    for (let d5 = 16; d5 < 80; d5++) {
      const m4 = P3[d5 - 15] | 0, F3 = Q[d5 - 15] | 0, q2 = x2.rotrSH(m4, F3, 1) ^ x2.rotrSH(m4, F3, 8) ^ x2.shrSH(m4, F3, 7), z3 = x2.rotrSL(m4, F3, 1) ^ x2.rotrSL(m4, F3, 8) ^ x2.shrSL(m4, F3, 7), I3 = P3[d5 - 2] | 0, O5 = Q[d5 - 2] | 0, ot2 = x2.rotrSH(I3, O5, 19) ^ x2.rotrBH(I3, O5, 61) ^ x2.shrSH(I3, O5, 6), tt2 = x2.rotrSL(I3, O5, 19) ^ x2.rotrBL(I3, O5, 61) ^ x2.shrSL(I3, O5, 6), st2 = x2.add4L(z3, tt2, Q[d5 - 7], Q[d5 - 16]), at = x2.add4H(st2, q2, ot2, P3[d5 - 7], P3[d5 - 16]);
      P3[d5] = at | 0, Q[d5] = st2 | 0;
    }
    let { Ah: r3, Al: o5, Bh: s4, Bl: a3, Ch: u3, Cl: i5, Dh: D, Dl: c7, Eh: l8, El: p4, Fh: w4, Fl: h6, Gh: g4, Gl: S3, Hh: v5, Hl: L3 } = this;
    for (let d5 = 0; d5 < 80; d5++) {
      const m4 = x2.rotrSH(l8, p4, 14) ^ x2.rotrSH(l8, p4, 18) ^ x2.rotrBH(l8, p4, 41), F3 = x2.rotrSL(l8, p4, 14) ^ x2.rotrSL(l8, p4, 18) ^ x2.rotrBL(l8, p4, 41), q2 = l8 & w4 ^ ~l8 & g4, z3 = p4 & h6 ^ ~p4 & S3, I3 = x2.add5L(L3, F3, z3, Yn[d5], Q[d5]), O5 = x2.add5H(I3, v5, m4, q2, Vn[d5], P3[d5]), ot2 = I3 | 0, tt2 = x2.rotrSH(r3, o5, 28) ^ x2.rotrBH(r3, o5, 34) ^ x2.rotrBH(r3, o5, 39), st2 = x2.rotrSL(r3, o5, 28) ^ x2.rotrBL(r3, o5, 34) ^ x2.rotrBL(r3, o5, 39), at = r3 & s4 ^ r3 & u3 ^ s4 & u3, Ct3 = o5 & a3 ^ o5 & i5 ^ a3 & i5;
      v5 = g4 | 0, L3 = S3 | 0, g4 = w4 | 0, S3 = h6 | 0, w4 = l8 | 0, h6 = p4 | 0, { h: l8, l: p4 } = x2.add(D | 0, c7 | 0, O5 | 0, ot2 | 0), D = u3 | 0, c7 = i5 | 0, u3 = s4 | 0, i5 = a3 | 0, s4 = r3 | 0, a3 = o5 | 0;
      const At2 = x2.add3L(ot2, st2, Ct3);
      r3 = x2.add3H(At2, O5, tt2, at), o5 = At2 | 0;
    }
    ({ h: r3, l: o5 } = x2.add(this.Ah | 0, this.Al | 0, r3 | 0, o5 | 0)), { h: s4, l: a3 } = x2.add(this.Bh | 0, this.Bl | 0, s4 | 0, a3 | 0), { h: u3, l: i5 } = x2.add(this.Ch | 0, this.Cl | 0, u3 | 0, i5 | 0), { h: D, l: c7 } = x2.add(this.Dh | 0, this.Dl | 0, D | 0, c7 | 0), { h: l8, l: p4 } = x2.add(this.Eh | 0, this.El | 0, l8 | 0, p4 | 0), { h: w4, l: h6 } = x2.add(this.Fh | 0, this.Fl | 0, w4 | 0, h6 | 0), { h: g4, l: S3 } = x2.add(this.Gh | 0, this.Gl | 0, g4 | 0, S3 | 0), { h: v5, l: L3 } = x2.add(this.Hh | 0, this.Hl | 0, v5 | 0, L3 | 0), this.set(r3, o5, s4, a3, u3, i5, D, c7, l8, p4, w4, h6, g4, S3, v5, L3);
  }
  roundClean() {
    P3.fill(0), Q.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var Kn = Bn(() => new Jn());
var vt = BigInt(0);
var be = BigInt(1);
var Wn = BigInt(2);
function It(t2) {
  return t2 instanceof Uint8Array || ArrayBuffer.isView(t2) && t2.constructor.name === "Uint8Array";
}
function Ut(t2) {
  if (!It(t2)) throw new Error("Uint8Array expected");
}
function Tt(t2, e3) {
  if (typeof e3 != "boolean") throw new Error(t2 + " boolean expected, got " + e3);
}
var Xn = Array.from({ length: 256 }, (t2, e3) => e3.toString(16).padStart(2, "0"));
function Ft(t2) {
  Ut(t2);
  let e3 = "";
  for (let n5 = 0; n5 < t2.length; n5++) e3 += Xn[t2[n5]];
  return e3;
}
function pe(t2) {
  if (typeof t2 != "string") throw new Error("hex string expected, got " + typeof t2);
  return t2 === "" ? vt : BigInt("0x" + t2);
}
var K = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function we(t2) {
  if (t2 >= K._0 && t2 <= K._9) return t2 - K._0;
  if (t2 >= K.A && t2 <= K.F) return t2 - (K.A - 10);
  if (t2 >= K.a && t2 <= K.f) return t2 - (K.a - 10);
}
function Ee(t2) {
  if (typeof t2 != "string") throw new Error("hex string expected, got " + typeof t2);
  const e3 = t2.length, n5 = e3 / 2;
  if (e3 % 2) throw new Error("hex string expected, got unpadded hex of length " + e3);
  const r3 = new Uint8Array(n5);
  for (let o5 = 0, s4 = 0; o5 < n5; o5++, s4 += 2) {
    const a3 = we(t2.charCodeAt(s4)), u3 = we(t2.charCodeAt(s4 + 1));
    if (a3 === void 0 || u3 === void 0) {
      const i5 = t2[s4] + t2[s4 + 1];
      throw new Error('hex string expected, got non-hex character "' + i5 + '" at index ' + s4);
    }
    r3[o5] = a3 * 16 + u3;
  }
  return r3;
}
function Pn(t2) {
  return pe(Ft(t2));
}
function Et(t2) {
  return Ut(t2), pe(Ft(Uint8Array.from(t2).reverse()));
}
function ge(t2, e3) {
  return Ee(t2.toString(16).padStart(e3 * 2, "0"));
}
function Nt(t2, e3) {
  return ge(t2, e3).reverse();
}
function W(t2, e3, n5) {
  let r3;
  if (typeof e3 == "string") try {
    r3 = Ee(e3);
  } catch (s4) {
    throw new Error(t2 + " must be hex string or Uint8Array, cause: " + s4);
  }
  else if (It(e3)) r3 = Uint8Array.from(e3);
  else throw new Error(t2 + " must be hex string or Uint8Array");
  const o5 = r3.length;
  if (typeof n5 == "number" && o5 !== n5) throw new Error(t2 + " of length " + n5 + " expected, got " + o5);
  return r3;
}
function ye(...t2) {
  let e3 = 0;
  for (let r3 = 0; r3 < t2.length; r3++) {
    const o5 = t2[r3];
    Ut(o5), e3 += o5.length;
  }
  const n5 = new Uint8Array(e3);
  for (let r3 = 0, o5 = 0; r3 < t2.length; r3++) {
    const s4 = t2[r3];
    n5.set(s4, o5), o5 += s4.length;
  }
  return n5;
}
var Lt = (t2) => typeof t2 == "bigint" && vt <= t2;
function Qn(t2, e3, n5) {
  return Lt(t2) && Lt(e3) && Lt(n5) && e3 <= t2 && t2 < n5;
}
function ft(t2, e3, n5, r3) {
  if (!Qn(e3, n5, r3)) throw new Error("expected valid " + t2 + ": " + n5 + " <= n < " + r3 + ", got " + e3);
}
function tr(t2) {
  let e3;
  for (e3 = 0; t2 > vt; t2 >>= be, e3 += 1) ;
  return e3;
}
var er = (t2) => (Wn << BigInt(t2 - 1)) - be;
var nr = { bigint: (t2) => typeof t2 == "bigint", function: (t2) => typeof t2 == "function", boolean: (t2) => typeof t2 == "boolean", string: (t2) => typeof t2 == "string", stringOrUint8Array: (t2) => typeof t2 == "string" || It(t2), isSafeInteger: (t2) => Number.isSafeInteger(t2), array: (t2) => Array.isArray(t2), field: (t2, e3) => e3.Fp.isValid(t2), hash: (t2) => typeof t2 == "function" && Number.isSafeInteger(t2.outputLen) };
function Ot(t2, e3, n5 = {}) {
  const r3 = (o5, s4, a3) => {
    const u3 = nr[s4];
    if (typeof u3 != "function") throw new Error("invalid validator function");
    const i5 = t2[o5];
    if (!(a3 && i5 === void 0) && !u3(i5, t2)) throw new Error("param " + String(o5) + " is invalid. Expected " + s4 + ", got " + i5);
  };
  for (const [o5, s4] of Object.entries(e3)) r3(o5, s4, false);
  for (const [o5, s4] of Object.entries(n5)) r3(o5, s4, true);
  return t2;
}
function xe(t2) {
  const e3 = /* @__PURE__ */ new WeakMap();
  return (n5, ...r3) => {
    const o5 = e3.get(n5);
    if (o5 !== void 0) return o5;
    const s4 = t2(n5, ...r3);
    return e3.set(n5, s4), s4;
  };
}
var M2 = BigInt(0);
var N = BigInt(1);
var nt = BigInt(2);
var rr = BigInt(3);
var Ht = BigInt(4);
var Be = BigInt(5);
var Ce = BigInt(8);
function H(t2, e3) {
  const n5 = t2 % e3;
  return n5 >= M2 ? n5 : e3 + n5;
}
function or(t2, e3, n5) {
  if (e3 < M2) throw new Error("invalid exponent, negatives unsupported");
  if (n5 <= M2) throw new Error("invalid modulus");
  if (n5 === N) return M2;
  let r3 = N;
  for (; e3 > M2; ) e3 & N && (r3 = r3 * t2 % n5), t2 = t2 * t2 % n5, e3 >>= N;
  return r3;
}
function J2(t2, e3, n5) {
  let r3 = t2;
  for (; e3-- > M2; ) r3 *= r3, r3 %= n5;
  return r3;
}
function Ae(t2, e3) {
  if (t2 === M2) throw new Error("invert: expected non-zero number");
  if (e3 <= M2) throw new Error("invert: expected positive modulus, got " + e3);
  let n5 = H(t2, e3), r3 = e3, o5 = M2, s4 = N;
  for (; n5 !== M2; ) {
    const u3 = r3 / n5, i5 = r3 % n5, D = o5 - s4 * u3;
    r3 = n5, n5 = i5, o5 = s4, s4 = D;
  }
  if (r3 !== N) throw new Error("invert: does not exist");
  return H(o5, e3);
}
function sr(t2) {
  const e3 = (t2 - N) / nt;
  let n5, r3, o5;
  for (n5 = t2 - N, r3 = 0; n5 % nt === M2; n5 /= nt, r3++) ;
  for (o5 = nt; o5 < t2 && or(o5, e3, t2) !== t2 - N; o5++) if (o5 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r3 === 1) {
    const a3 = (t2 + N) / Ht;
    return function(i5, D) {
      const c7 = i5.pow(D, a3);
      if (!i5.eql(i5.sqr(c7), D)) throw new Error("Cannot find square root");
      return c7;
    };
  }
  const s4 = (n5 + N) / nt;
  return function(u3, i5) {
    if (u3.pow(i5, e3) === u3.neg(u3.ONE)) throw new Error("Cannot find square root");
    let D = r3, c7 = u3.pow(u3.mul(u3.ONE, o5), n5), l8 = u3.pow(i5, s4), p4 = u3.pow(i5, n5);
    for (; !u3.eql(p4, u3.ONE); ) {
      if (u3.eql(p4, u3.ZERO)) return u3.ZERO;
      let w4 = 1;
      for (let g4 = u3.sqr(p4); w4 < D && !u3.eql(g4, u3.ONE); w4++) g4 = u3.sqr(g4);
      const h6 = u3.pow(c7, N << BigInt(D - w4 - 1));
      c7 = u3.sqr(h6), l8 = u3.mul(l8, h6), p4 = u3.mul(p4, c7), D = w4;
    }
    return l8;
  };
}
function ir(t2) {
  if (t2 % Ht === rr) {
    const e3 = (t2 + N) / Ht;
    return function(r3, o5) {
      const s4 = r3.pow(o5, e3);
      if (!r3.eql(r3.sqr(s4), o5)) throw new Error("Cannot find square root");
      return s4;
    };
  }
  if (t2 % Ce === Be) {
    const e3 = (t2 - Be) / Ce;
    return function(r3, o5) {
      const s4 = r3.mul(o5, nt), a3 = r3.pow(s4, e3), u3 = r3.mul(o5, a3), i5 = r3.mul(r3.mul(u3, nt), a3), D = r3.mul(u3, r3.sub(i5, r3.ONE));
      if (!r3.eql(r3.sqr(D), o5)) throw new Error("Cannot find square root");
      return D;
    };
  }
  return sr(t2);
}
var ur = (t2, e3) => (H(t2, e3) & N) === N;
var cr = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function ar(t2) {
  const e3 = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n5 = cr.reduce((r3, o5) => (r3[o5] = "function", r3), e3);
  return Ot(t2, n5);
}
function fr(t2, e3, n5) {
  if (n5 < M2) throw new Error("invalid exponent, negatives unsupported");
  if (n5 === M2) return t2.ONE;
  if (n5 === N) return e3;
  let r3 = t2.ONE, o5 = e3;
  for (; n5 > M2; ) n5 & N && (r3 = t2.mul(r3, o5)), o5 = t2.sqr(o5), n5 >>= N;
  return r3;
}
function Dr(t2, e3) {
  const n5 = new Array(e3.length), r3 = e3.reduce((s4, a3, u3) => t2.is0(a3) ? s4 : (n5[u3] = s4, t2.mul(s4, a3)), t2.ONE), o5 = t2.inv(r3);
  return e3.reduceRight((s4, a3, u3) => t2.is0(a3) ? s4 : (n5[u3] = t2.mul(s4, n5[u3]), t2.mul(s4, a3)), o5), n5;
}
function me(t2, e3) {
  const n5 = e3 !== void 0 ? e3 : t2.toString(2).length, r3 = Math.ceil(n5 / 8);
  return { nBitLength: n5, nByteLength: r3 };
}
function _e(t2, e3, n5 = false, r3 = {}) {
  if (t2 <= M2) throw new Error("invalid field: expected ORDER > 0, got " + t2);
  const { nBitLength: o5, nByteLength: s4 } = me(t2, e3);
  if (s4 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a3;
  const u3 = Object.freeze({ ORDER: t2, isLE: n5, BITS: o5, BYTES: s4, MASK: er(o5), ZERO: M2, ONE: N, create: (i5) => H(i5, t2), isValid: (i5) => {
    if (typeof i5 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof i5);
    return M2 <= i5 && i5 < t2;
  }, is0: (i5) => i5 === M2, isOdd: (i5) => (i5 & N) === N, neg: (i5) => H(-i5, t2), eql: (i5, D) => i5 === D, sqr: (i5) => H(i5 * i5, t2), add: (i5, D) => H(i5 + D, t2), sub: (i5, D) => H(i5 - D, t2), mul: (i5, D) => H(i5 * D, t2), pow: (i5, D) => fr(u3, i5, D), div: (i5, D) => H(i5 * Ae(D, t2), t2), sqrN: (i5) => i5 * i5, addN: (i5, D) => i5 + D, subN: (i5, D) => i5 - D, mulN: (i5, D) => i5 * D, inv: (i5) => Ae(i5, t2), sqrt: r3.sqrt || ((i5) => (a3 || (a3 = ir(t2)), a3(u3, i5))), invertBatch: (i5) => Dr(u3, i5), cmov: (i5, D, c7) => c7 ? D : i5, toBytes: (i5) => n5 ? Nt(i5, s4) : ge(i5, s4), fromBytes: (i5) => {
    if (i5.length !== s4) throw new Error("Field.fromBytes: expected " + s4 + " bytes, got " + i5.length);
    return n5 ? Et(i5) : Pn(i5);
  } });
  return Object.freeze(u3);
}
var Se = BigInt(0);
var gt = BigInt(1);
function zt(t2, e3) {
  const n5 = e3.negate();
  return t2 ? n5 : e3;
}
function ve(t2, e3) {
  if (!Number.isSafeInteger(t2) || t2 <= 0 || t2 > e3) throw new Error("invalid window size, expected [1.." + e3 + "], got W=" + t2);
}
function Mt(t2, e3) {
  ve(t2, e3);
  const n5 = Math.ceil(e3 / t2) + 1, r3 = 2 ** (t2 - 1);
  return { windows: n5, windowSize: r3 };
}
function dr(t2, e3) {
  if (!Array.isArray(t2)) throw new Error("array expected");
  t2.forEach((n5, r3) => {
    if (!(n5 instanceof e3)) throw new Error("invalid point at index " + r3);
  });
}
function hr(t2, e3) {
  if (!Array.isArray(t2)) throw new Error("array of scalars expected");
  t2.forEach((n5, r3) => {
    if (!e3.isValid(n5)) throw new Error("invalid scalar at index " + r3);
  });
}
var qt = /* @__PURE__ */ new WeakMap();
var Ie = /* @__PURE__ */ new WeakMap();
function $t(t2) {
  return Ie.get(t2) || 1;
}
function lr(t2, e3) {
  return { constTimeNegate: zt, hasPrecomputes(n5) {
    return $t(n5) !== 1;
  }, unsafeLadder(n5, r3, o5 = t2.ZERO) {
    let s4 = n5;
    for (; r3 > Se; ) r3 & gt && (o5 = o5.add(s4)), s4 = s4.double(), r3 >>= gt;
    return o5;
  }, precomputeWindow(n5, r3) {
    const { windows: o5, windowSize: s4 } = Mt(r3, e3), a3 = [];
    let u3 = n5, i5 = u3;
    for (let D = 0; D < o5; D++) {
      i5 = u3, a3.push(i5);
      for (let c7 = 1; c7 < s4; c7++) i5 = i5.add(u3), a3.push(i5);
      u3 = i5.double();
    }
    return a3;
  }, wNAF(n5, r3, o5) {
    const { windows: s4, windowSize: a3 } = Mt(n5, e3);
    let u3 = t2.ZERO, i5 = t2.BASE;
    const D = BigInt(2 ** n5 - 1), c7 = 2 ** n5, l8 = BigInt(n5);
    for (let p4 = 0; p4 < s4; p4++) {
      const w4 = p4 * a3;
      let h6 = Number(o5 & D);
      o5 >>= l8, h6 > a3 && (h6 -= c7, o5 += gt);
      const g4 = w4, S3 = w4 + Math.abs(h6) - 1, v5 = p4 % 2 !== 0, L3 = h6 < 0;
      h6 === 0 ? i5 = i5.add(zt(v5, r3[g4])) : u3 = u3.add(zt(L3, r3[S3]));
    }
    return { p: u3, f: i5 };
  }, wNAFUnsafe(n5, r3, o5, s4 = t2.ZERO) {
    const { windows: a3, windowSize: u3 } = Mt(n5, e3), i5 = BigInt(2 ** n5 - 1), D = 2 ** n5, c7 = BigInt(n5);
    for (let l8 = 0; l8 < a3; l8++) {
      const p4 = l8 * u3;
      if (o5 === Se) break;
      let w4 = Number(o5 & i5);
      if (o5 >>= c7, w4 > u3 && (w4 -= D, o5 += gt), w4 === 0) continue;
      let h6 = r3[p4 + Math.abs(w4) - 1];
      w4 < 0 && (h6 = h6.negate()), s4 = s4.add(h6);
    }
    return s4;
  }, getPrecomputes(n5, r3, o5) {
    let s4 = qt.get(r3);
    return s4 || (s4 = this.precomputeWindow(r3, n5), n5 !== 1 && qt.set(r3, o5(s4))), s4;
  }, wNAFCached(n5, r3, o5) {
    const s4 = $t(n5);
    return this.wNAF(s4, this.getPrecomputes(s4, n5, o5), r3);
  }, wNAFCachedUnsafe(n5, r3, o5, s4) {
    const a3 = $t(n5);
    return a3 === 1 ? this.unsafeLadder(n5, r3, s4) : this.wNAFUnsafe(a3, this.getPrecomputes(a3, n5, o5), r3, s4);
  }, setWindowSize(n5, r3) {
    ve(r3, e3), Ie.set(n5, r3), qt.delete(n5);
  } };
}
function br(t2, e3, n5, r3) {
  if (dr(n5, t2), hr(r3, e3), n5.length !== r3.length) throw new Error("arrays of points and scalars must have equal length");
  const o5 = t2.ZERO, s4 = tr(BigInt(n5.length)), a3 = s4 > 12 ? s4 - 3 : s4 > 4 ? s4 - 2 : s4 ? 2 : 1, u3 = (1 << a3) - 1, i5 = new Array(u3 + 1).fill(o5), D = Math.floor((e3.BITS - 1) / a3) * a3;
  let c7 = o5;
  for (let l8 = D; l8 >= 0; l8 -= a3) {
    i5.fill(o5);
    for (let w4 = 0; w4 < r3.length; w4++) {
      const h6 = r3[w4], g4 = Number(h6 >> BigInt(l8) & BigInt(u3));
      i5[g4] = i5[g4].add(n5[w4]);
    }
    let p4 = o5;
    for (let w4 = i5.length - 1, h6 = o5; w4 > 0; w4--) h6 = h6.add(i5[w4]), p4 = p4.add(h6);
    if (c7 = c7.add(p4), l8 !== 0) for (let w4 = 0; w4 < a3; w4++) c7 = c7.double();
  }
  return c7;
}
function pr(t2) {
  return ar(t2.Fp), Ot(t2, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...me(t2.n, t2.nBitLength), ...t2, p: t2.Fp.ORDER });
}
var G = BigInt(0);
var j = BigInt(1);
var yt = BigInt(2);
var wr = BigInt(8);
var Er = { zip215: true };
function gr(t2) {
  const e3 = pr(t2);
  return Ot(t2, { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" }, { adjustScalarBytes: "function", domain: "function", uvRatio: "function", mapToCurve: "function" }), Object.freeze({ ...e3 });
}
function yr(t2) {
  const e3 = gr(t2), { Fp: n5, n: r3, prehash: o5, hash: s4, randomBytes: a3, nByteLength: u3, h: i5 } = e3, D = yt << BigInt(u3 * 8) - j, c7 = n5.create, l8 = _e(e3.n, e3.nBitLength), p4 = e3.uvRatio || ((y4, f7) => {
    try {
      return { isValid: true, value: n5.sqrt(y4 * n5.inv(f7)) };
    } catch {
      return { isValid: false, value: G };
    }
  }), w4 = e3.adjustScalarBytes || ((y4) => y4), h6 = e3.domain || ((y4, f7, b4) => {
    if (Tt("phflag", b4), f7.length || b4) throw new Error("Contexts/pre-hash are not supported");
    return y4;
  });
  function g4(y4, f7) {
    ft("coordinate " + y4, f7, G, D);
  }
  function S3(y4) {
    if (!(y4 instanceof d5)) throw new Error("ExtendedPoint expected");
  }
  const v5 = xe((y4, f7) => {
    const { ex: b4, ey: E3, ez: B3 } = y4, C5 = y4.is0();
    f7 == null && (f7 = C5 ? wr : n5.inv(B3));
    const A2 = c7(b4 * f7), U2 = c7(E3 * f7), _3 = c7(B3 * f7);
    if (C5) return { x: G, y: j };
    if (_3 !== j) throw new Error("invZ was invalid");
    return { x: A2, y: U2 };
  }), L3 = xe((y4) => {
    const { a: f7, d: b4 } = e3;
    if (y4.is0()) throw new Error("bad point: ZERO");
    const { ex: E3, ey: B3, ez: C5, et: A2 } = y4, U2 = c7(E3 * E3), _3 = c7(B3 * B3), T4 = c7(C5 * C5), $ = c7(T4 * T4), R2 = c7(U2 * f7), V3 = c7(T4 * c7(R2 + _3)), Y2 = c7($ + c7(b4 * c7(U2 * _3)));
    if (V3 !== Y2) throw new Error("bad point: equation left != right (1)");
    const Z2 = c7(E3 * B3), X = c7(C5 * A2);
    if (Z2 !== X) throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class d5 {
    constructor(f7, b4, E3, B3) {
      this.ex = f7, this.ey = b4, this.ez = E3, this.et = B3, g4("x", f7), g4("y", b4), g4("z", E3), g4("t", B3), Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(f7) {
      if (f7 instanceof d5) throw new Error("extended point not allowed");
      const { x: b4, y: E3 } = f7 || {};
      return g4("x", b4), g4("y", E3), new d5(b4, E3, j, c7(b4 * E3));
    }
    static normalizeZ(f7) {
      const b4 = n5.invertBatch(f7.map((E3) => E3.ez));
      return f7.map((E3, B3) => E3.toAffine(b4[B3])).map(d5.fromAffine);
    }
    static msm(f7, b4) {
      return br(d5, l8, f7, b4);
    }
    _setWindowSize(f7) {
      q2.setWindowSize(this, f7);
    }
    assertValidity() {
      L3(this);
    }
    equals(f7) {
      S3(f7);
      const { ex: b4, ey: E3, ez: B3 } = this, { ex: C5, ey: A2, ez: U2 } = f7, _3 = c7(b4 * U2), T4 = c7(C5 * B3), $ = c7(E3 * U2), R2 = c7(A2 * B3);
      return _3 === T4 && $ === R2;
    }
    is0() {
      return this.equals(d5.ZERO);
    }
    negate() {
      return new d5(c7(-this.ex), this.ey, this.ez, c7(-this.et));
    }
    double() {
      const { a: f7 } = e3, { ex: b4, ey: E3, ez: B3 } = this, C5 = c7(b4 * b4), A2 = c7(E3 * E3), U2 = c7(yt * c7(B3 * B3)), _3 = c7(f7 * C5), T4 = b4 + E3, $ = c7(c7(T4 * T4) - C5 - A2), R2 = _3 + A2, V3 = R2 - U2, Y2 = _3 - A2, Z2 = c7($ * V3), X = c7(R2 * Y2), et3 = c7($ * Y2), pt2 = c7(V3 * R2);
      return new d5(Z2, X, pt2, et3);
    }
    add(f7) {
      S3(f7);
      const { a: b4, d: E3 } = e3, { ex: B3, ey: C5, ez: A2, et: U2 } = this, { ex: _3, ey: T4, ez: $, et: R2 } = f7;
      if (b4 === BigInt(-1)) {
        const re = c7((C5 - B3) * (T4 + _3)), oe = c7((C5 + B3) * (T4 - _3)), mt2 = c7(oe - re);
        if (mt2 === G) return this.double();
        const se3 = c7(A2 * yt * R2), ie2 = c7(U2 * yt * $), ue2 = ie2 + se3, ce3 = oe + re, ae3 = ie2 - se3, Dn3 = c7(ue2 * mt2), dn3 = c7(ce3 * ae3), hn3 = c7(ue2 * ae3), ln3 = c7(mt2 * ce3);
        return new d5(Dn3, dn3, ln3, hn3);
      }
      const V3 = c7(B3 * _3), Y2 = c7(C5 * T4), Z2 = c7(U2 * E3 * R2), X = c7(A2 * $), et3 = c7((B3 + C5) * (_3 + T4) - V3 - Y2), pt2 = X - Z2, ee3 = X + Z2, ne2 = c7(Y2 - b4 * V3), un3 = c7(et3 * pt2), cn3 = c7(ee3 * ne2), an3 = c7(et3 * ne2), fn3 = c7(pt2 * ee3);
      return new d5(un3, cn3, fn3, an3);
    }
    subtract(f7) {
      return this.add(f7.negate());
    }
    wNAF(f7) {
      return q2.wNAFCached(this, f7, d5.normalizeZ);
    }
    multiply(f7) {
      const b4 = f7;
      ft("scalar", b4, j, r3);
      const { p: E3, f: B3 } = this.wNAF(b4);
      return d5.normalizeZ([E3, B3])[0];
    }
    multiplyUnsafe(f7, b4 = d5.ZERO) {
      const E3 = f7;
      return ft("scalar", E3, G, r3), E3 === G ? F3 : this.is0() || E3 === j ? this : q2.wNAFCachedUnsafe(this, E3, d5.normalizeZ, b4);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(i5).is0();
    }
    isTorsionFree() {
      return q2.unsafeLadder(this, r3).is0();
    }
    toAffine(f7) {
      return v5(this, f7);
    }
    clearCofactor() {
      const { h: f7 } = e3;
      return f7 === j ? this : this.multiplyUnsafe(f7);
    }
    static fromHex(f7, b4 = false) {
      const { d: E3, a: B3 } = e3, C5 = n5.BYTES;
      f7 = W("pointHex", f7, C5), Tt("zip215", b4);
      const A2 = f7.slice(), U2 = f7[C5 - 1];
      A2[C5 - 1] = U2 & -129;
      const _3 = Et(A2), T4 = b4 ? D : n5.ORDER;
      ft("pointHex.y", _3, G, T4);
      const $ = c7(_3 * _3), R2 = c7($ - j), V3 = c7(E3 * $ - B3);
      let { isValid: Y2, value: Z2 } = p4(R2, V3);
      if (!Y2) throw new Error("Point.fromHex: invalid y coordinate");
      const X = (Z2 & j) === j, et3 = (U2 & 128) !== 0;
      if (!b4 && Z2 === G && et3) throw new Error("Point.fromHex: x=0 and x_0=1");
      return et3 !== X && (Z2 = c7(-Z2)), d5.fromAffine({ x: Z2, y: _3 });
    }
    static fromPrivateKey(f7) {
      return O5(f7).point;
    }
    toRawBytes() {
      const { x: f7, y: b4 } = this.toAffine(), E3 = Nt(b4, n5.BYTES);
      return E3[E3.length - 1] |= f7 & j ? 128 : 0, E3;
    }
    toHex() {
      return Ft(this.toRawBytes());
    }
  }
  d5.BASE = new d5(e3.Gx, e3.Gy, j, c7(e3.Gx * e3.Gy)), d5.ZERO = new d5(G, j, j, G);
  const { BASE: m4, ZERO: F3 } = d5, q2 = lr(d5, u3 * 8);
  function z3(y4) {
    return H(y4, r3);
  }
  function I3(y4) {
    return z3(Et(y4));
  }
  function O5(y4) {
    const f7 = n5.BYTES;
    y4 = W("private key", y4, f7);
    const b4 = W("hashed private key", s4(y4), 2 * f7), E3 = w4(b4.slice(0, f7)), B3 = b4.slice(f7, 2 * f7), C5 = I3(E3), A2 = m4.multiply(C5), U2 = A2.toRawBytes();
    return { head: E3, prefix: B3, scalar: C5, point: A2, pointBytes: U2 };
  }
  function ot2(y4) {
    return O5(y4).pointBytes;
  }
  function tt2(y4 = new Uint8Array(), ...f7) {
    const b4 = ye(...f7);
    return I3(s4(h6(b4, W("context", y4), !!o5)));
  }
  function st2(y4, f7, b4 = {}) {
    y4 = W("message", y4), o5 && (y4 = o5(y4));
    const { prefix: E3, scalar: B3, pointBytes: C5 } = O5(f7), A2 = tt2(b4.context, E3, y4), U2 = m4.multiply(A2).toRawBytes(), _3 = tt2(b4.context, U2, C5, y4), T4 = z3(A2 + _3 * B3);
    ft("signature.s", T4, G, r3);
    const $ = ye(U2, Nt(T4, n5.BYTES));
    return W("result", $, n5.BYTES * 2);
  }
  const at = Er;
  function Ct3(y4, f7, b4, E3 = at) {
    const { context: B3, zip215: C5 } = E3, A2 = n5.BYTES;
    y4 = W("signature", y4, 2 * A2), f7 = W("message", f7), b4 = W("publicKey", b4, A2), C5 !== void 0 && Tt("zip215", C5), o5 && (f7 = o5(f7));
    const U2 = Et(y4.slice(A2, 2 * A2));
    let _3, T4, $;
    try {
      _3 = d5.fromHex(b4, C5), T4 = d5.fromHex(y4.slice(0, A2), C5), $ = m4.multiplyUnsafe(U2);
    } catch {
      return false;
    }
    if (!C5 && _3.isSmallOrder()) return false;
    const R2 = tt2(B3, T4.toRawBytes(), _3.toRawBytes(), f7);
    return T4.add(_3.multiplyUnsafe(R2)).subtract($).clearCofactor().equals(d5.ZERO);
  }
  return m4._setWindowSize(8), { CURVE: e3, getPublicKey: ot2, sign: st2, verify: Ct3, ExtendedPoint: d5, utils: { getExtendedPublicKey: O5, randomPrivateKey: () => a3(n5.BYTES), precompute(y4 = 8, f7 = d5.BASE) {
    return f7._setWindowSize(y4), f7.multiply(BigInt(3)), f7;
  } } };
}
BigInt(0), BigInt(1);
var kt = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var Ue = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
var xr = BigInt(1);
var Te = BigInt(2);
BigInt(3);
var Br = BigInt(5);
var Cr = BigInt(8);
function Ar(t2) {
  const e3 = BigInt(10), n5 = BigInt(20), r3 = BigInt(40), o5 = BigInt(80), s4 = kt, u3 = t2 * t2 % s4 * t2 % s4, i5 = J2(u3, Te, s4) * u3 % s4, D = J2(i5, xr, s4) * t2 % s4, c7 = J2(D, Br, s4) * D % s4, l8 = J2(c7, e3, s4) * c7 % s4, p4 = J2(l8, n5, s4) * l8 % s4, w4 = J2(p4, r3, s4) * p4 % s4, h6 = J2(w4, o5, s4) * w4 % s4, g4 = J2(h6, o5, s4) * w4 % s4, S3 = J2(g4, e3, s4) * c7 % s4;
  return { pow_p_5_8: J2(S3, Te, s4) * t2 % s4, b2: u3 };
}
function mr(t2) {
  return t2[0] &= 248, t2[31] &= 127, t2[31] |= 64, t2;
}
function _r(t2, e3) {
  const n5 = kt, r3 = H(e3 * e3 * e3, n5), o5 = H(r3 * r3 * e3, n5), s4 = Ar(t2 * o5).pow_p_5_8;
  let a3 = H(t2 * r3 * s4, n5);
  const u3 = H(e3 * a3 * a3, n5), i5 = a3, D = H(a3 * Ue, n5), c7 = u3 === t2, l8 = u3 === H(-t2, n5), p4 = u3 === H(-t2 * Ue, n5);
  return c7 && (a3 = i5), (l8 || p4) && (a3 = D), ur(a3, n5) && (a3 = H(-a3, n5)), { isValid: c7 || l8, value: a3 };
}
var Sr = (() => _e(kt, void 0, true))();
var vr = (() => ({ a: BigInt(-1), d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"), Fp: Sr, n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"), h: Cr, Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"), Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"), hash: Kn, randomBytes: he, adjustScalarBytes: mr, uvRatio: _r }))();
var Rt = (() => yr(vr))();
var jt = "EdDSA";
var Zt = "JWT";
var ut = ".";
var Dt = "base64url";
var Gt = "utf8";
var xt = "utf8";
var Vt = ":";
var Yt = "did";
var Jt = "key";
var dt = "base58btc";
var Kt = "z";
var Wt = "K36";
var Ne = 32;
function Xt(t2) {
  return globalThis.Buffer != null ? new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength) : t2;
}
function Le(t2 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt(globalThis.Buffer.allocUnsafe(t2)) : new Uint8Array(t2);
}
function Oe(t2, e3) {
  e3 || (e3 = t2.reduce((o5, s4) => o5 + s4.length, 0));
  const n5 = Le(e3);
  let r3 = 0;
  for (const o5 of t2) n5.set(o5, r3), r3 += o5.length;
  return Xt(n5);
}
function Ir(t2, e3) {
  if (t2.length >= 255) throw new TypeError("Alphabet too long");
  for (var n5 = new Uint8Array(256), r3 = 0; r3 < n5.length; r3++) n5[r3] = 255;
  for (var o5 = 0; o5 < t2.length; o5++) {
    var s4 = t2.charAt(o5), a3 = s4.charCodeAt(0);
    if (n5[a3] !== 255) throw new TypeError(s4 + " is ambiguous");
    n5[a3] = o5;
  }
  var u3 = t2.length, i5 = t2.charAt(0), D = Math.log(u3) / Math.log(256), c7 = Math.log(256) / Math.log(u3);
  function l8(h6) {
    if (h6 instanceof Uint8Array || (ArrayBuffer.isView(h6) ? h6 = new Uint8Array(h6.buffer, h6.byteOffset, h6.byteLength) : Array.isArray(h6) && (h6 = Uint8Array.from(h6))), !(h6 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (h6.length === 0) return "";
    for (var g4 = 0, S3 = 0, v5 = 0, L3 = h6.length; v5 !== L3 && h6[v5] === 0; ) v5++, g4++;
    for (var d5 = (L3 - v5) * c7 + 1 >>> 0, m4 = new Uint8Array(d5); v5 !== L3; ) {
      for (var F3 = h6[v5], q2 = 0, z3 = d5 - 1; (F3 !== 0 || q2 < S3) && z3 !== -1; z3--, q2++) F3 += 256 * m4[z3] >>> 0, m4[z3] = F3 % u3 >>> 0, F3 = F3 / u3 >>> 0;
      if (F3 !== 0) throw new Error("Non-zero carry");
      S3 = q2, v5++;
    }
    for (var I3 = d5 - S3; I3 !== d5 && m4[I3] === 0; ) I3++;
    for (var O5 = i5.repeat(g4); I3 < d5; ++I3) O5 += t2.charAt(m4[I3]);
    return O5;
  }
  function p4(h6) {
    if (typeof h6 != "string") throw new TypeError("Expected String");
    if (h6.length === 0) return new Uint8Array();
    var g4 = 0;
    if (h6[g4] !== " ") {
      for (var S3 = 0, v5 = 0; h6[g4] === i5; ) S3++, g4++;
      for (var L3 = (h6.length - g4) * D + 1 >>> 0, d5 = new Uint8Array(L3); h6[g4]; ) {
        var m4 = n5[h6.charCodeAt(g4)];
        if (m4 === 255) return;
        for (var F3 = 0, q2 = L3 - 1; (m4 !== 0 || F3 < v5) && q2 !== -1; q2--, F3++) m4 += u3 * d5[q2] >>> 0, d5[q2] = m4 % 256 >>> 0, m4 = m4 / 256 >>> 0;
        if (m4 !== 0) throw new Error("Non-zero carry");
        v5 = F3, g4++;
      }
      if (h6[g4] !== " ") {
        for (var z3 = L3 - v5; z3 !== L3 && d5[z3] === 0; ) z3++;
        for (var I3 = new Uint8Array(S3 + (L3 - z3)), O5 = S3; z3 !== L3; ) I3[O5++] = d5[z3++];
        return I3;
      }
    }
  }
  function w4(h6) {
    var g4 = p4(h6);
    if (g4) return g4;
    throw new Error(`Non-${e3} character`);
  }
  return { encode: l8, decodeUnsafe: p4, decode: w4 };
}
var Ur = Ir;
var Tr = Ur;
var He = (t2) => {
  if (t2 instanceof Uint8Array && t2.constructor.name === "Uint8Array") return t2;
  if (t2 instanceof ArrayBuffer) return new Uint8Array(t2);
  if (ArrayBuffer.isView(t2)) return new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Fr = (t2) => new TextEncoder().encode(t2);
var Nr = (t2) => new TextDecoder().decode(t2);
var Lr = class {
  constructor(e3, n5, r3) {
    this.name = e3, this.prefix = n5, this.baseEncode = r3;
  }
  encode(e3) {
    if (e3 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e3)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var Or = class {
  constructor(e3, n5, r3) {
    if (this.name = e3, this.prefix = n5, n5.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = n5.codePointAt(0), this.baseDecode = r3;
  }
  decode(e3) {
    if (typeof e3 == "string") {
      if (e3.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e3)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e3.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e3) {
    return ze(this, e3);
  }
};
var Hr = class {
  constructor(e3) {
    this.decoders = e3;
  }
  or(e3) {
    return ze(this, e3);
  }
  decode(e3) {
    const n5 = e3[0], r3 = this.decoders[n5];
    if (r3) return r3.decode(e3);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e3)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ze = (t2, e3) => new Hr({ ...t2.decoders || { [t2.prefix]: t2 }, ...e3.decoders || { [e3.prefix]: e3 } });
var zr = class {
  constructor(e3, n5, r3, o5) {
    this.name = e3, this.prefix = n5, this.baseEncode = r3, this.baseDecode = o5, this.encoder = new Lr(e3, n5, r3), this.decoder = new Or(e3, n5, o5);
  }
  encode(e3) {
    return this.encoder.encode(e3);
  }
  decode(e3) {
    return this.decoder.decode(e3);
  }
};
var Bt = ({ name: t2, prefix: e3, encode: n5, decode: r3 }) => new zr(t2, e3, n5, r3);
var ht = ({ prefix: t2, name: e3, alphabet: n5 }) => {
  const { encode: r3, decode: o5 } = Tr(n5, e3);
  return Bt({ prefix: t2, name: e3, encode: r3, decode: (s4) => He(o5(s4)) });
};
var Mr = (t2, e3, n5, r3) => {
  const o5 = {};
  for (let c7 = 0; c7 < e3.length; ++c7) o5[e3[c7]] = c7;
  let s4 = t2.length;
  for (; t2[s4 - 1] === "="; ) --s4;
  const a3 = new Uint8Array(s4 * n5 / 8 | 0);
  let u3 = 0, i5 = 0, D = 0;
  for (let c7 = 0; c7 < s4; ++c7) {
    const l8 = o5[t2[c7]];
    if (l8 === void 0) throw new SyntaxError(`Non-${r3} character`);
    i5 = i5 << n5 | l8, u3 += n5, u3 >= 8 && (u3 -= 8, a3[D++] = 255 & i5 >> u3);
  }
  if (u3 >= n5 || 255 & i5 << 8 - u3) throw new SyntaxError("Unexpected end of data");
  return a3;
};
var qr = (t2, e3, n5) => {
  const r3 = e3[e3.length - 1] === "=", o5 = (1 << n5) - 1;
  let s4 = "", a3 = 0, u3 = 0;
  for (let i5 = 0; i5 < t2.length; ++i5) for (u3 = u3 << 8 | t2[i5], a3 += 8; a3 > n5; ) a3 -= n5, s4 += e3[o5 & u3 >> a3];
  if (a3 && (s4 += e3[o5 & u3 << n5 - a3]), r3) for (; s4.length * n5 & 7; ) s4 += "=";
  return s4;
};
var k3 = ({ name: t2, prefix: e3, bitsPerChar: n5, alphabet: r3 }) => Bt({ prefix: e3, name: t2, encode(o5) {
  return qr(o5, r3, n5);
}, decode(o5) {
  return Mr(o5, r3, n5, t2);
} });
var $r = Bt({ prefix: "\0", name: "identity", encode: (t2) => Nr(t2), decode: (t2) => Fr(t2) });
var kr = Object.freeze({ __proto__: null, identity: $r });
var Rr = k3({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var jr = Object.freeze({ __proto__: null, base2: Rr });
var Zr = k3({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Gr = Object.freeze({ __proto__: null, base8: Zr });
var Vr = ht({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Yr = Object.freeze({ __proto__: null, base10: Vr });
var Jr = k3({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Kr = k3({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Wr = Object.freeze({ __proto__: null, base16: Jr, base16upper: Kr });
var Xr = k3({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Pr = k3({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var Qr = k3({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var to = k3({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var eo = k3({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var no = k3({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var ro = k3({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var oo = k3({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var so = k3({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var io = Object.freeze({ __proto__: null, base32: Xr, base32upper: Pr, base32pad: Qr, base32padupper: to, base32hex: eo, base32hexupper: no, base32hexpad: ro, base32hexpadupper: oo, base32z: so });
var uo = ht({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var co = ht({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var ao = Object.freeze({ __proto__: null, base36: uo, base36upper: co });
var fo = ht({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Do = ht({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var ho = Object.freeze({ __proto__: null, base58btc: fo, base58flickr: Do });
var lo = k3({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var bo = k3({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var po = k3({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var wo = k3({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Eo = Object.freeze({ __proto__: null, base64: lo, base64pad: bo, base64url: po, base64urlpad: wo });
var Me = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var go = Me.reduce((t2, e3, n5) => (t2[n5] = e3, t2), []);
var yo = Me.reduce((t2, e3, n5) => (t2[e3.codePointAt(0)] = n5, t2), []);
function xo(t2) {
  return t2.reduce((e3, n5) => (e3 += go[n5], e3), "");
}
function Bo(t2) {
  const e3 = [];
  for (const n5 of t2) {
    const r3 = yo[n5.codePointAt(0)];
    if (r3 === void 0) throw new Error(`Non-base256emoji character: ${n5}`);
    e3.push(r3);
  }
  return new Uint8Array(e3);
}
var Co = Bt({ prefix: "🚀", name: "base256emoji", encode: xo, decode: Bo });
var Ao = Object.freeze({ __proto__: null, base256emoji: Co });
var mo = $e;
var qe = 128;
var _o = 127;
var So = ~_o;
var vo = Math.pow(2, 31);
function $e(t2, e3, n5) {
  e3 = e3 || [], n5 = n5 || 0;
  for (var r3 = n5; t2 >= vo; ) e3[n5++] = t2 & 255 | qe, t2 /= 128;
  for (; t2 & So; ) e3[n5++] = t2 & 255 | qe, t2 >>>= 7;
  return e3[n5] = t2 | 0, $e.bytes = n5 - r3 + 1, e3;
}
var Io = Pt;
var Uo = 128;
var ke = 127;
function Pt(t2, r3) {
  var n5 = 0, r3 = r3 || 0, o5 = 0, s4 = r3, a3, u3 = t2.length;
  do {
    if (s4 >= u3) throw Pt.bytes = 0, new RangeError("Could not decode varint");
    a3 = t2[s4++], n5 += o5 < 28 ? (a3 & ke) << o5 : (a3 & ke) * Math.pow(2, o5), o5 += 7;
  } while (a3 >= Uo);
  return Pt.bytes = s4 - r3, n5;
}
var To = Math.pow(2, 7);
var Fo = Math.pow(2, 14);
var No = Math.pow(2, 21);
var Lo = Math.pow(2, 28);
var Oo = Math.pow(2, 35);
var Ho = Math.pow(2, 42);
var zo = Math.pow(2, 49);
var Mo = Math.pow(2, 56);
var qo = Math.pow(2, 63);
var $o = function(t2) {
  return t2 < To ? 1 : t2 < Fo ? 2 : t2 < No ? 3 : t2 < Lo ? 4 : t2 < Oo ? 5 : t2 < Ho ? 6 : t2 < zo ? 7 : t2 < Mo ? 8 : t2 < qo ? 9 : 10;
};
var ko = { encode: mo, decode: Io, encodingLength: $o };
var Re = ko;
var je = (t2, e3, n5 = 0) => (Re.encode(t2, e3, n5), e3);
var Ze = (t2) => Re.encodingLength(t2);
var Qt = (t2, e3) => {
  const n5 = e3.byteLength, r3 = Ze(t2), o5 = r3 + Ze(n5), s4 = new Uint8Array(o5 + n5);
  return je(t2, s4, 0), je(n5, s4, r3), s4.set(e3, o5), new Ro(t2, n5, e3, s4);
};
var Ro = class {
  constructor(e3, n5, r3, o5) {
    this.code = e3, this.size = n5, this.digest = r3, this.bytes = o5;
  }
};
var Ge = ({ name: t2, code: e3, encode: n5 }) => new jo(t2, e3, n5);
var jo = class {
  constructor(e3, n5, r3) {
    this.name = e3, this.code = n5, this.encode = r3;
  }
  digest(e3) {
    if (e3 instanceof Uint8Array) {
      const n5 = this.encode(e3);
      return n5 instanceof Uint8Array ? Qt(this.code, n5) : n5.then((r3) => Qt(this.code, r3));
    } else throw Error("Unknown type, must be binary type");
  }
};
var Ve = (t2) => async (e3) => new Uint8Array(await crypto.subtle.digest(t2, e3));
var Zo = Ge({ name: "sha2-256", code: 18, encode: Ve("SHA-256") });
var Go = Ge({ name: "sha2-512", code: 19, encode: Ve("SHA-512") });
var Vo = Object.freeze({ __proto__: null, sha256: Zo, sha512: Go });
var Ye = 0;
var Yo = "identity";
var Je = He;
var Jo = (t2) => Qt(Ye, Je(t2));
var Ko = { code: Ye, name: Yo, encode: Je, digest: Jo };
var Wo = Object.freeze({ __proto__: null, identity: Ko });
new TextEncoder(), new TextDecoder();
var Ke = { ...kr, ...jr, ...Gr, ...Yr, ...Wr, ...io, ...ao, ...ho, ...Eo, ...Ao };
({ ...Vo, ...Wo });
function We(t2, e3, n5, r3) {
  return { name: t2, prefix: e3, encoder: { name: t2, prefix: e3, encode: n5 }, decoder: { decode: r3 } };
}
var Xe = We("utf8", "u", (t2) => "u" + new TextDecoder("utf8").decode(t2), (t2) => new TextEncoder().encode(t2.substring(1)));
var te = We("ascii", "a", (t2) => {
  let e3 = "a";
  for (let n5 = 0; n5 < t2.length; n5++) e3 += String.fromCharCode(t2[n5]);
  return e3;
}, (t2) => {
  t2 = t2.substring(1);
  const e3 = Le(t2.length);
  for (let n5 = 0; n5 < t2.length; n5++) e3[n5] = t2.charCodeAt(n5);
  return e3;
});
var Pe = { utf8: Xe, "utf-8": Xe, hex: Ke.base16, latin1: te, ascii: te, binary: te, ...Ke };
function ct(t2, e3 = "utf8") {
  const n5 = Pe[e3];
  if (!n5) throw new Error(`Unsupported encoding "${e3}"`);
  return (e3 === "utf8" || e3 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t2.buffer, t2.byteOffset, t2.byteLength).toString("utf8") : n5.encoder.encode(t2).substring(1);
}
function rt(t2, e3 = "utf8") {
  const n5 = Pe[e3];
  if (!n5) throw new Error(`Unsupported encoding "${e3}"`);
  return (e3 === "utf8" || e3 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt(globalThis.Buffer.from(t2, "utf-8")) : n5.decoder.decode(`${n5.prefix}${t2}`);
}
function lt(t2) {
  return safeJsonParse(ct(rt(t2, Dt), Gt));
}
function bt(t2) {
  return ct(rt(safeJsonStringify(t2), Gt), Dt);
}
function Qe(t2) {
  const e3 = rt(Wt, dt), n5 = Kt + ct(Oe([e3, t2]), dt);
  return [Yt, Jt, n5].join(Vt);
}
function en(t2) {
  return ct(t2, Dt);
}
function nn(t2) {
  return rt(t2, Dt);
}
function rn(t2) {
  return rt([bt(t2.header), bt(t2.payload)].join(ut), xt);
}
function on(t2) {
  return [bt(t2.header), bt(t2.payload), en(t2.signature)].join(ut);
}
function sn(t2) {
  const e3 = t2.split(ut), n5 = lt(e3[0]), r3 = lt(e3[1]), o5 = nn(e3[2]), s4 = rt(e3.slice(0, 2).join(ut), xt);
  return { header: n5, payload: r3, signature: o5, data: s4 };
}
function Po(t2 = he(Ne)) {
  const e3 = Rt.getPublicKey(t2);
  return { secretKey: Oe([t2, e3]), publicKey: e3 };
}
async function Qo(t2, e3, n5, r3, o5 = (0, import_time2.fromMiliseconds)(Date.now())) {
  const s4 = { alg: jt, typ: Zt }, a3 = Qe(r3.publicKey), u3 = o5 + n5, i5 = { iss: a3, sub: t2, aud: e3, iat: o5, exp: u3 }, D = rn({ header: s4, payload: i5 }), c7 = Rt.sign(D, r3.secretKey.slice(0, 32));
  return on({ header: s4, payload: i5, signature: c7 });
}

// node_modules/detect-browser/es/index.js
var __spreadArray = function(to2, from13, pack) {
  if (pack || arguments.length === 2) for (var i5 = 0, l8 = from13.length, ar3; i5 < l8; i5++) {
    if (ar3 || !(i5 in from13)) {
      if (!ar3) ar3 = Array.prototype.slice.call(from13, 0, i5);
      ar3[i5] = from13[i5];
    }
  }
  return to2.concat(ar3 || Array.prototype.slice.call(from13));
};
var BrowserInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function BrowserInfo2(name2, version3, os2) {
      this.name = name2;
      this.version = version3;
      this.os = os2;
      this.type = "browser";
    }
    return BrowserInfo2;
  }()
);
var NodeInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function NodeInfo2(version3) {
      this.version = version3;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  }()
);
var SearchBotDeviceInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function SearchBotDeviceInfo2(name2, version3, os2, bot) {
      this.name = name2;
      this.version = version3;
      this.os = os2;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  }()
);
var BotInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  }()
);
var ReactNativeInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  }()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(function(matched, _a) {
    var browser = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version3 = versionParts.join(".");
  var os2 = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name2, version3, os2, searchBotMatch[1]);
  }
  return new BrowserInfo(name2, version3, os2);
}
function detectOS(ua) {
  for (var ii2 = 0, count = operatingSystemRules.length; ii2 < count; ii2++) {
    var _a = operatingSystemRules[ii2], os2 = _a[0], regex = _a[1];
    var match = regex.exec(ua);
    if (match) {
      return os2;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode2 = typeof process !== "undefined" && process.version;
  return isNode2 ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii2 = 0; ii2 < count; ii2++) {
    output.push("0");
  }
  return output;
}

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/dist/index.es.js
var import_time3 = __toESM(require_cjs());
var import_window_getters = __toESM(require_cjs2());
var import_window_metadata = __toESM(require_cjs3());

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var defineTransaction = defineFormatter("transaction", formatTransaction);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    contractAddress: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
var defineBlock = defineFormatter("block", formatBlock);

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/actions/public/getTransactionCount.js
async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [address, blockNumber ? numberToHex(blockNumber) : blockTag]
  }, { dedupe: Boolean(blockNumber) });
  return hexToNumber(count);
}

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/actions/wallet/sendTransaction.js
var supportsWalletNamespace = new LruMap(128);

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/promise/withDedupe.js
var promiseCache = new LruMap(8192);

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache = createIdStore();

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var defineTransactionReceipt = defineFormatter("transactionReceipt", formatTransactionReceipt);

// node_modules/@reown/appkit-controllers/node_modules/@noble/hashes/esm/ripemd160.js
var Rho = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
var Id = new Uint8Array(new Array(16).fill(0).map((_3, i5) => i5));
var Pi = Id.map((i5) => (9 * i5 + 5) % 16);
var idxL = [Id];
var idxR = [Pi];
for (let i5 = 0; i5 < 4; i5++)
  for (let j3 of [idxL, idxR])
    j3.push(j3[i5].map((k4) => Rho[k4]));
var shifts = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i5) => new Uint8Array(i5));
var shiftsL = idxL.map((idx, i5) => idx.map((j3) => shifts[i5][j3]));
var shiftsR = idxR.map((idx, i5) => idx.map((j3) => shifts[i5][j3]));
var Kl = new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr2 = new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function f4(group, x5, y4, z3) {
  if (group === 0)
    return x5 ^ y4 ^ z3;
  else if (group === 1)
    return x5 & y4 | ~x5 & z3;
  else if (group === 2)
    return (x5 | ~y4) ^ z3;
  else if (group === 3)
    return x5 & z3 | y4 & ~z3;
  else
    return x5 ^ (y4 | ~z3);
}
var R_BUF = new Uint32Array(16);
var RIPEMD160 = class extends HashMD2 {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2: h22, h3: h32, h4: h42 } = this;
    return [h0, h1, h22, h32, h42];
  }
  set(h0, h1, h22, h32, h42) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h22 | 0;
    this.h3 = h32 | 0;
    this.h4 = h42 | 0;
  }
  process(view, offset) {
    for (let i5 = 0; i5 < 16; i5++, offset += 4)
      R_BUF[i5] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar3 = al, bl = this.h1 | 0, br3 = bl, cl = this.h2 | 0, cr3 = cl, dl = this.h3 | 0, dr3 = dl, el = this.h4 | 0, er4 = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl[group], hbr = Kr2[group];
      const rl = idxL[group], rr4 = idxR[group];
      const sl = shiftsL[group], sr3 = shiftsR[group];
      for (let i5 = 0; i5 < 16; i5++) {
        const tl = rotl2(al + f4(group, bl, cl, dl) + R_BUF[rl[i5]] + hbl, sl[i5]) + el | 0;
        al = el, el = dl, dl = rotl2(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i5 = 0; i5 < 16; i5++) {
        const tr4 = rotl2(ar3 + f4(rGroup, br3, cr3, dr3) + R_BUF[rr4[i5]] + hbr, sr3[i5]) + er4 | 0;
        ar3 = er4, er4 = dr3, dr3 = rotl2(cr3, 10) | 0, cr3 = br3, br3 = tr4;
      }
    }
    this.set(this.h1 + cl + dr3 | 0, this.h2 + dl + er4 | 0, this.h3 + el + ar3 | 0, this.h4 + al + br3 | 0, this.h0 + bl + cr3 | 0);
  }
  roundClean() {
    R_BUF.fill(0);
  }
  destroy() {
    this.destroyed = true;
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd160 = wrapConstructor(() => new RIPEMD160());

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/nonceManager.js
function createNonceManager(parameters) {
  const { source } = parameters;
  const deltaMap = /* @__PURE__ */ new Map();
  const nonceMap = new LruMap(8192);
  const promiseMap = /* @__PURE__ */ new Map();
  const getKey = ({ address, chainId }) => `${address}.${chainId}`;
  return {
    async consume({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      const promise = this.get({ address, chainId, client });
      this.increment({ address, chainId });
      const nonce = await promise;
      await source.set({ address, chainId }, nonce);
      nonceMap.set(key, nonce);
      return nonce;
    },
    async increment({ address, chainId }) {
      const key = getKey({ address, chainId });
      const delta = deltaMap.get(key) ?? 0;
      deltaMap.set(key, delta + 1);
    },
    async get({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      let promise = promiseMap.get(key);
      if (!promise) {
        promise = (async () => {
          try {
            const nonce = await source.get({ address, chainId, client });
            const previousNonce = nonceMap.get(key) ?? 0;
            if (previousNonce > 0 && nonce <= previousNonce)
              return previousNonce + 1;
            nonceMap.delete(key);
            return nonce;
          } finally {
            this.reset({ address, chainId });
          }
        })();
        promiseMap.set(key, promise);
      }
      const delta = deltaMap.get(key) ?? 0;
      return delta + await promise;
    },
    reset({ address, chainId }) {
      const key = getKey({ address, chainId });
      deltaMap.delete(key);
      promiseMap.delete(key);
    }
  };
}
function jsonRpc() {
  return {
    async get(parameters) {
      const { address, client } = parameters;
      return getTransactionCount(client, {
        address,
        blockTag: "pending"
      });
    },
    set() {
    }
  };
}
var nonceManager = createNonceManager({
  source: jsonRpc()
});

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/version.js
var version = "0.1.1";

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/internal/errors.js
function getVersion2() {
  return version;
}

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/Errors.js
var BaseError4 = class _BaseError extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      var _a;
      if (options.cause instanceof _BaseError) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if ((_a = options.cause) == null ? void 0 : _a.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof _BaseError)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x5) => typeof x5 === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion2()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn3) {
    return walk(this, fn3);
  }
};
function walk(err, fn3) {
  if (fn3 == null ? void 0 : fn3(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn3);
  return fn3 ? null : err;
}

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/internal/bytes.js
function assertSize(bytes, size_) {
  if (size4(bytes) > size_)
    throw new SizeOverflowError({
      givenSize: size4(bytes),
      maxSize: size_
    });
}
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad2(bytes, options = {}) {
  const { dir, size: size8 = 32 } = options;
  if (size8 === 0)
    return bytes;
  if (bytes.length > size8)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size8,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size8);
  for (let i5 = 0; i5 < size8; i5++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i5 : size8 - i5 - 1] = bytes[padEnd ? i5 : bytes.length - i5 - 1];
  }
  return paddedBytes;
}

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/internal/hex.js
function assertSize2(hex, size_) {
  if (size5(hex) > size_)
    throw new SizeOverflowError2({
      givenSize: size5(hex),
      maxSize: size_
    });
}
function pad3(hex_, options = {}) {
  const { dir, size: size8 = 32 } = options;
  if (size8 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size8 * 2)
    throw new SizeExceedsPaddingSizeError2({
      size: Math.ceil(hex.length / 2),
      targetSize: size8,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size8 * 2, "0")}`;
}

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/Bytes.js
var decoder = new TextDecoder();
var encoder = new TextEncoder();
function from2(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex2(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex2(value, options = {}) {
  const { size: size8 } = options;
  let hex = value;
  if (size8) {
    assertSize2(value, size8);
    hex = padRight2(value, size8);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length2 = hexString.length / 2;
  const bytes = new Uint8Array(length2);
  for (let index2 = 0, j3 = 0; index2 < length2; index2++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j3++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j3++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError4(`Invalid byte sequence ("${hexString[j3 - 2]}${hexString[j3 - 1]}" in "${hexString}").`);
    }
    bytes[index2] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromString3(value, options = {}) {
  const { size: size8 } = options;
  const bytes = encoder.encode(value);
  if (typeof size8 === "number") {
    assertSize(bytes, size8);
    return padRight3(bytes, size8);
  }
  return bytes;
}
function padRight3(value, size8) {
  return pad2(value, { dir: "right", size: size8 });
}
function size4(value) {
  return value.length;
}
var SizeOverflowError = class extends BaseError4 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError = class extends BaseError4 {
  constructor({ size: size8, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size8}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/Hex.js
var encoder2 = new TextEncoder();
var hexes = Array.from({ length: 256 }, (_v, i5) => i5.toString(16).padStart(2, "0"));
function concat3(...values) {
  return `0x${values.reduce((acc, x5) => acc + x5.replace("0x", ""), "")}`;
}
function fromBoolean2(value, options = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padLeft2(hex, options.size);
  }
  return hex;
}
function fromBytes3(value, options = {}) {
  let string2 = "";
  for (let i5 = 0; i5 < value.length; i5++)
    string2 += hexes[value[i5]];
  const hex = `0x${string2}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padRight2(hex, options.size);
  }
  return hex;
}
function fromNumber2(value, options = {}) {
  const { signed, size: size8 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size8) {
    if (signed)
      maxValue = (1n << BigInt(size8) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size8) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size8,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size8 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size8)
    return padLeft2(hex, size8);
  return hex;
}
function fromString4(value, options = {}) {
  return fromBytes3(encoder2.encode(value), options);
}
function padLeft2(value, size8) {
  return pad3(value, { dir: "left", size: size8 });
}
function padRight2(value, size8) {
  return pad3(value, { dir: "right", size: size8 });
}
function size5(value) {
  return Math.ceil((value.length - 2) / 2);
}
var IntegerOutOfRangeError = class extends BaseError4 {
  constructor({ max, min, signed, size: size8, value }) {
    super(`Number \`${value}\` is not in safe${size8 ? ` ${size8 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
};
var SizeOverflowError2 = class extends BaseError4 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError2 = class extends BaseError4 {
  constructor({ size: size8, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size8}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/Hash.js
function keccak2562(value, options = {}) {
  const { as: as2 = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_2562(from2(value));
  if (as2 === "Bytes")
    return bytes;
  return fromBytes3(bytes);
}

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/internal/lru.js
var LruMap3 = class extends Map {
  constructor(size8) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size8;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/Caches.js
var caches = {
  checksum: new LruMap3(8192)
};
var checksum = caches.checksum;

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/Address.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError3({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum2(value) !== value)
      throw new InvalidAddressError3({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum2(address) {
  if (checksum.has(address))
    return checksum.get(address);
  assert(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak2562(fromString3(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i5 = 0; i5 < 40; i5 += 2) {
    if (hash[i5 >> 1] >> 4 >= 8 && characters[i5]) {
      characters[i5] = characters[i5].toUpperCase();
    }
    if ((hash[i5 >> 1] & 15) >= 8 && characters[i5 + 1]) {
      characters[i5 + 1] = characters[i5 + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum.set(address, result);
  return result;
}
var InvalidAddressError3 = class extends BaseError4 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError = class extends BaseError4 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError = class extends BaseError4 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/Solidity.js
var arrayRegex2 = /^(.*)\[([0-9]*)\]$/;
var bytesRegex2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var maxInt8 = 2n ** (8n - 1n) - 1n;
var maxInt16 = 2n ** (16n - 1n) - 1n;
var maxInt24 = 2n ** (24n - 1n) - 1n;
var maxInt32 = 2n ** (32n - 1n) - 1n;
var maxInt40 = 2n ** (40n - 1n) - 1n;
var maxInt48 = 2n ** (48n - 1n) - 1n;
var maxInt56 = 2n ** (56n - 1n) - 1n;
var maxInt64 = 2n ** (64n - 1n) - 1n;
var maxInt72 = 2n ** (72n - 1n) - 1n;
var maxInt80 = 2n ** (80n - 1n) - 1n;
var maxInt88 = 2n ** (88n - 1n) - 1n;
var maxInt96 = 2n ** (96n - 1n) - 1n;
var maxInt104 = 2n ** (104n - 1n) - 1n;
var maxInt112 = 2n ** (112n - 1n) - 1n;
var maxInt120 = 2n ** (120n - 1n) - 1n;
var maxInt128 = 2n ** (128n - 1n) - 1n;
var maxInt136 = 2n ** (136n - 1n) - 1n;
var maxInt144 = 2n ** (144n - 1n) - 1n;
var maxInt152 = 2n ** (152n - 1n) - 1n;
var maxInt160 = 2n ** (160n - 1n) - 1n;
var maxInt168 = 2n ** (168n - 1n) - 1n;
var maxInt176 = 2n ** (176n - 1n) - 1n;
var maxInt184 = 2n ** (184n - 1n) - 1n;
var maxInt192 = 2n ** (192n - 1n) - 1n;
var maxInt200 = 2n ** (200n - 1n) - 1n;
var maxInt208 = 2n ** (208n - 1n) - 1n;
var maxInt216 = 2n ** (216n - 1n) - 1n;
var maxInt224 = 2n ** (224n - 1n) - 1n;
var maxInt232 = 2n ** (232n - 1n) - 1n;
var maxInt240 = 2n ** (240n - 1n) - 1n;
var maxInt248 = 2n ** (248n - 1n) - 1n;
var maxInt256 = 2n ** (256n - 1n) - 1n;
var minInt8 = -(2n ** (8n - 1n));
var minInt16 = -(2n ** (16n - 1n));
var minInt24 = -(2n ** (24n - 1n));
var minInt32 = -(2n ** (32n - 1n));
var minInt40 = -(2n ** (40n - 1n));
var minInt48 = -(2n ** (48n - 1n));
var minInt56 = -(2n ** (56n - 1n));
var minInt64 = -(2n ** (64n - 1n));
var minInt72 = -(2n ** (72n - 1n));
var minInt80 = -(2n ** (80n - 1n));
var minInt88 = -(2n ** (88n - 1n));
var minInt96 = -(2n ** (96n - 1n));
var minInt104 = -(2n ** (104n - 1n));
var minInt112 = -(2n ** (112n - 1n));
var minInt120 = -(2n ** (120n - 1n));
var minInt128 = -(2n ** (128n - 1n));
var minInt136 = -(2n ** (136n - 1n));
var minInt144 = -(2n ** (144n - 1n));
var minInt152 = -(2n ** (152n - 1n));
var minInt160 = -(2n ** (160n - 1n));
var minInt168 = -(2n ** (168n - 1n));
var minInt176 = -(2n ** (176n - 1n));
var minInt184 = -(2n ** (184n - 1n));
var minInt192 = -(2n ** (192n - 1n));
var minInt200 = -(2n ** (200n - 1n));
var minInt208 = -(2n ** (208n - 1n));
var minInt216 = -(2n ** (216n - 1n));
var minInt224 = -(2n ** (224n - 1n));
var minInt232 = -(2n ** (232n - 1n));
var minInt240 = -(2n ** (240n - 1n));
var minInt248 = -(2n ** (248n - 1n));
var minInt256 = -(2n ** (256n - 1n));
var maxUint8 = 2n ** 8n - 1n;
var maxUint16 = 2n ** 16n - 1n;
var maxUint24 = 2n ** 24n - 1n;
var maxUint32 = 2n ** 32n - 1n;
var maxUint40 = 2n ** 40n - 1n;
var maxUint48 = 2n ** 48n - 1n;
var maxUint56 = 2n ** 56n - 1n;
var maxUint64 = 2n ** 64n - 1n;
var maxUint72 = 2n ** 72n - 1n;
var maxUint80 = 2n ** 80n - 1n;
var maxUint88 = 2n ** 88n - 1n;
var maxUint96 = 2n ** 96n - 1n;
var maxUint104 = 2n ** 104n - 1n;
var maxUint112 = 2n ** 112n - 1n;
var maxUint120 = 2n ** 120n - 1n;
var maxUint128 = 2n ** 128n - 1n;
var maxUint136 = 2n ** 136n - 1n;
var maxUint144 = 2n ** 144n - 1n;
var maxUint152 = 2n ** 152n - 1n;
var maxUint160 = 2n ** 160n - 1n;
var maxUint168 = 2n ** 168n - 1n;
var maxUint176 = 2n ** 176n - 1n;
var maxUint184 = 2n ** 184n - 1n;
var maxUint192 = 2n ** 192n - 1n;
var maxUint200 = 2n ** 200n - 1n;
var maxUint208 = 2n ** 208n - 1n;
var maxUint216 = 2n ** 216n - 1n;
var maxUint224 = 2n ** 224n - 1n;
var maxUint232 = 2n ** 232n - 1n;
var maxUint240 = 2n ** 240n - 1n;
var maxUint248 = 2n ** 248n - 1n;
var maxUint2563 = 2n ** 256n - 1n;

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/internal/cursor.js
var staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError2({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length2, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length2 - 1);
    return this.bytes.subarray(position, position + length2);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length2, size8) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length2);
    this.position += size8 ?? length2;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
var NegativeOffsetError = class extends BaseError4 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError2 = class extends BaseError4 {
  constructor({ length: length2, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
};
var RecursiveReadLimitExceededError = class extends BaseError4 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
};

// node_modules/@reown/appkit-controllers/node_modules/ox/_esm/core/AbiParameters.js
function encodePacked2(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i5 = 0; i5 < types.length; i5++) {
    const type = types[i5];
    const value = values[i5];
    data.push(encodePacked2.encode(type, value));
  }
  return concat3(...data);
}
(function(encodePacked5) {
  function encode11(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert(address);
      return padLeft2(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString4(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft2(fromBoolean2(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex2);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size8 = Number.parseInt(bits) / 8;
      return fromNumber2(value, {
        size: isArray ? 32 : size8,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex2);
    if (bytesMatch) {
      const [_type, size8] = bytesMatch;
      if (Number.parseInt(size8) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError2({
          expectedSize: Number.parseInt(size8),
          value
        });
      return padRight2(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex2);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i5 = 0; i5 < value.length; i5++) {
        data.push(encode11(childType, value[i5], true));
      }
      if (data.length === 0)
        return "0x";
      return concat3(...data);
    }
    throw new InvalidTypeError(type);
  }
  encodePacked5.encode = encode11;
})(encodePacked2 || (encodePacked2 = {}));
var BytesSizeMismatchError2 = class extends BaseError4 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size5(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
};
var LengthMismatchError = class extends BaseError4 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
};
var InvalidTypeError = class extends BaseError4 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
};

// node_modules/@reown/appkit-controllers/node_modules/base-x/src/esm/index.js
function base(ALPHABET2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  const BASE_MAP = new Uint8Array(256);
  for (let j3 = 0; j3 < BASE_MAP.length; j3++) {
    BASE_MAP[j3] = 255;
  }
  for (let i5 = 0; i5 < ALPHABET2.length; i5++) {
    const x5 = ALPHABET2.charAt(i5);
    const xc = x5.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x5 + " is ambiguous");
    }
    BASE_MAP[xc] = i5;
  }
  const BASE = ALPHABET2.length;
  const LEADER = ALPHABET2.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256);
  const iFACTOR = Math.log(256) / Math.log(BASE);
  function encode11(source) {
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
    let length2 = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    const size8 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    const b58 = new Uint8Array(size8);
    while (pbegin !== pend) {
      let carry = source[pbegin];
      let i5 = 0;
      for (let it1 = size8 - 1; (carry !== 0 || i5 < length2) && it1 !== -1; it1--, i5++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i5;
      pbegin++;
    }
    let it22 = size8 - length2;
    while (it22 !== size8 && b58[it22] === 0) {
      it22++;
    }
    let str = LEADER.repeat(zeroes);
    for (; it22 < size8; ++it22) {
      str += ALPHABET2.charAt(b58[it22]);
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
    let length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    const size8 = (source.length - psz) * FACTOR + 1 >>> 0;
    const b256 = new Uint8Array(size8);
    while (psz < source.length) {
      const charCode = source.charCodeAt(psz);
      if (charCode > 255) {
        return;
      }
      let carry = BASE_MAP[charCode];
      if (carry === 255) {
        return;
      }
      let i5 = 0;
      for (let it32 = size8 - 1; (carry !== 0 || i5 < length2) && it32 !== -1; it32--, i5++) {
        carry += BASE * b256[it32] >>> 0;
        b256[it32] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i5;
      psz++;
    }
    let it4 = size8 - length2;
    while (it4 !== size8 && b256[it4] === 0) {
      it4++;
    }
    const vch = new Uint8Array(zeroes + (size8 - it4));
    let j3 = zeroes;
    while (it4 !== size8) {
      vch[j3++] = b256[it4++];
    }
    return vch;
  }
  function decode8(string2) {
    const buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error("Non-base" + BASE + " character");
  }
  return {
    encode: encode11,
    decodeUnsafe,
    decode: decode8
  };
}
var esm_default = base;

// node_modules/@reown/appkit-controllers/node_modules/bs58/src/esm/index.js
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var esm_default2 = esm_default(ALPHABET);

// node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size8 = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size8);
  }
  return new Uint8Array(size8);
}

// node_modules/uint8arrays/esm/src/concat.js
function concat4(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});

// node_modules/multiformats/esm/vendor/base-x.js
function base2(ALPHABET2, name2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j3 = 0; j3 < BASE_MAP.length; j3++) {
    BASE_MAP[j3] = 255;
  }
  for (var i5 = 0; i5 < ALPHABET2.length; i5++) {
    var x5 = ALPHABET2.charAt(i5);
    var xc = x5.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x5 + " is ambiguous");
    }
    BASE_MAP[xc] = i5;
  }
  var BASE = ALPHABET2.length;
  var LEADER = ALPHABET2.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode11(source) {
    if (source instanceof Uint8Array) ;
    else if (ArrayBuffer.isView(source)) {
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
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size8 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size8);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i6 = 0;
      for (var it1 = size8 - 1; (carry !== 0 || i6 < length2) && it1 !== -1; it1--, i6++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i6;
      pbegin++;
    }
    var it22 = size8 - length2;
    while (it22 !== size8 && b58[it22] === 0) {
      it22++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it22 < size8; ++it22) {
      str += ALPHABET2.charAt(b58[it22]);
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
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size8 = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size8);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i6 = 0;
      for (var it32 = size8 - 1; (carry !== 0 || i6 < length2) && it32 !== -1; it32--, i6++) {
        carry += BASE * b256[it32] >>> 0;
        b256[it32] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i6;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size8 - length2;
    while (it4 !== size8 && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size8 - it4));
    var j4 = zeroes;
    while (it4 !== size8) {
      vch[j4++] = b256[it4++];
    }
    return vch;
  }
  function decode8(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode11,
    decodeUnsafe,
    decode: decode8
  };
}
var src = base2;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii2 = 0; ii2 < aa.byteLength; ii2++) {
    if (aa[ii2] !== bb[ii2]) {
      return false;
    }
  }
  return true;
};
var coerce = (o5) => {
  if (o5 instanceof Uint8Array && o5.constructor.name === "Uint8Array")
    return o5;
  if (o5 instanceof ArrayBuffer)
    return new Uint8Array(o5);
  if (ArrayBuffer.isView(o5)) {
    return new Uint8Array(o5.buffer, o5.byteOffset, o5.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString5 = (str) => new TextEncoder().encode(str);
var toString2 = (b4) => new TextDecoder().decode(b4);

// node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder2) {
    return or2(this, decoder2);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder2) {
    return or2(this, decoder2);
  }
  decode(input) {
    const prefix = input[0];
    const decoder2 = this.decoders[prefix];
    if (decoder2) {
      return decoder2.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or2 = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from7 = ({ name: name2, prefix, encode: encode11, decode: decode8 }) => new Codec(name2, prefix, encode11, decode8);
var baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode11, decode: decode8 } = base_x_default(alphabet2, name2);
  return from7({
    prefix,
    name: name2,
    encode: encode11,
    decode: (text) => coerce(decode8(text))
  });
};
var decode2 = (string2, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i5 = 0; i5 < alphabet2.length; ++i5) {
    codes[alphabet2[i5]] = i5;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i5 = 0; i5 < end; ++i5) {
    const value = codes[string2[i5]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode4 = (data, alphabet2, bitsPerChar) => {
  const pad5 = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i5 = 0; i5 < data.length; ++i5) {
    buffer2 = buffer2 << 8 | data[i5];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad5) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from7({
    prefix,
    name: name2,
    encode(input) {
      return encode4(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode2(input, alphabet2, bitsPerChar, name2);
    }
  });
};

// node_modules/multiformats/esm/src/bases/identity.js
var identity = from7({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString2(buf),
  decode: (str) => fromString5(str)
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base22
});
var base22 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var alphabetBytesToChars = alphabet.reduce((p4, c7, i5) => {
  p4[i5] = c7;
  return p4;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p4, c7, i5) => {
  p4[c7.codePointAt(0)] = i5;
  return p4;
}, []);
function encode5(data) {
  return data.reduce((p4, c7) => {
    p4 += alphabetBytesToChars[c7];
    return p4;
  }, "");
}
function decode3(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from7({
  prefix: "🚀",
  name: "base256emoji",
  encode: encode5,
  decode: decode3
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha2564,
  sha512: () => sha512
});

// node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode6;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode6(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode6.bytes = offset - oldOffset + 1;
  return out;
}
var decode4 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b4, l8 = buf.length;
  do {
    if (counter >= l8) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b4 = buf[counter++];
    res += shift < 28 ? (b4 & REST$1) << shift : (b4 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b4 >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode4,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/esm/src/varint.js
var decode5 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/multiformats/esm/src/hashes/digest.js
var create2 = (code2, digest2) => {
  const size8 = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size8);
  const bytes = new Uint8Array(digestOffset + size8);
  encodeTo(code2, bytes, 0);
  encodeTo(size8, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size8, digest2, bytes);
};
var decode6 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode5(bytes);
  const [size8, digestOffset] = decode5(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size8) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size8, digest2, bytes);
};
var equals2 = (a3, b4) => {
  if (a3 === b4) {
    return true;
  } else {
    return a3.code === b4.code && a3.size === b4.size && equals(a3.bytes, b4.bytes);
  }
};
var Digest = class {
  constructor(code2, size8, digest2, bytes) {
    this.code = code2;
    this.size = size8;
    this.digest = digest2;
    this.bytes = bytes;
  }
};

// node_modules/multiformats/esm/src/hashes/hasher.js
var from8 = ({ name: name2, code: code2, encode: encode11 }) => new Hasher(name2, code2, encode11);
var Hasher = class {
  constructor(name2, code2, encode11) {
    this.name = name2;
    this.code = code2;
    this.encode = encode11;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create2(this.code, result) : result.then((digest2) => create2(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha2564 = from8({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from8({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode7 = coerce;
var digest = (input) => create2(code, encode7(input));
var identity2 = {
  code,
  name,
  encode: encode7,
  digest
};

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/esm/src/cid.js
var CID = class _CID {
  constructor(version3, code2, multihash, bytes) {
    this.code = code2;
    this.version = version3;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create2(code2, digest2);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version3, _baseCache } = this;
    switch (version3) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof _CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version3, code: code2, multihash, bytes } = value;
      return new _CID(version3, code2, multihash, bytes || encodeCID(version3, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version3, multihash, code: code2 } = value;
      const digest2 = decode6(multihash);
      return _CID.create(version3, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version3, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version3) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version3, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version3, code2, digest2.bytes);
        return new _CID(version3, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return _CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return _CID.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i5, length2] = decode5(initialBytes.subarray(offset));
      offset += length2;
      return i5;
    };
    let version3 = next();
    let codec = DAG_PB_CODE;
    if (version3 === 18) {
      version3 = 0;
      offset = 0;
    } else if (version3 === 1) {
      codec = next();
    }
    if (version3 !== 0 && version3 !== 1) {
      throw new RangeError(`Invalid CID version ${version3}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size8 = offset + digestSize;
    const multihashSize = size8 - prefixSize;
    return {
      version: version3,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size: size8
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = _CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder2 = base3 || base32;
      return [
        base32.prefix,
        decoder2.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version3, code2, multihash) => {
  const codeOffset = encodingLength(version3);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version3, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version2 = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version2)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode11, decode8) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode11
    },
    decoder: { decode: decode8 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder2 = new TextDecoder("utf8");
  return "u" + decoder2.decode(buf);
}, (str) => {
  const encoder3 = new TextEncoder();
  return encoder3.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i5 = 0; i5 < buf.length; i5++) {
    string2 += String.fromCharCode(buf[i5]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i5 = 0; i5 < str.length; i5++) {
    buf[i5] = str.charCodeAt(i5);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/uint8arrays/esm/src/from-string.js
function fromString6(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string2, "utf8");
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/uint8arrays/esm/src/to-string.js
function toString3(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/dist/index.es.js
var import_elliptic = __toESM(require_elliptic());

// node_modules/@walletconnect/relay-api/dist/index.es.js
var C2 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } };

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/dist/index.es.js
function Ne2(e3) {
  if (!Number.isSafeInteger(e3) || e3 < 0) throw new Error("positive integer expected, got " + e3);
}
function Io2(e3) {
  return e3 instanceof Uint8Array || ArrayBuffer.isView(e3) && e3.constructor.name === "Uint8Array";
}
function je2(e3, ...t2) {
  if (!Io2(e3)) throw new Error("Uint8Array expected");
  if (t2.length > 0 && !t2.includes(e3.length)) throw new Error("Uint8Array expected of length " + t2 + ", got length=" + e3.length);
}
function ot(e3) {
  if (typeof e3 != "function" || typeof e3.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ne2(e3.outputLen), Ne2(e3.blockLen);
}
function me2(e3, t2 = true) {
  if (e3.destroyed) throw new Error("Hash instance has been destroyed");
  if (t2 && e3.finished) throw new Error("Hash#digest() has already been called");
}
function sn2(e3, t2) {
  je2(e3);
  const n5 = t2.outputLen;
  if (e3.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
var Ce2 = BigInt(2 ** 32 - 1);
var cn = BigInt(32);
function Oo2(e3, t2 = false) {
  return t2 ? { h: Number(e3 & Ce2), l: Number(e3 >> cn & Ce2) } : { h: Number(e3 >> cn & Ce2) | 0, l: Number(e3 & Ce2) | 0 };
}
function Ao2(e3, t2 = false) {
  let n5 = new Uint32Array(e3.length), r3 = new Uint32Array(e3.length);
  for (let o5 = 0; o5 < e3.length; o5++) {
    const { h: s4, l: i5 } = Oo2(e3[o5], t2);
    [n5[o5], r3[o5]] = [s4, i5];
  }
  return [n5, r3];
}
var No2 = (e3, t2, n5) => e3 << n5 | t2 >>> 32 - n5;
var So2 = (e3, t2, n5) => t2 << n5 | e3 >>> 32 - n5;
var Uo2 = (e3, t2, n5) => t2 << n5 - 32 | e3 >>> 64 - n5;
var _o2 = (e3, t2, n5) => e3 << n5 - 32 | t2 >>> 64 - n5;
var be2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function To2(e3) {
  return new Uint32Array(e3.buffer, e3.byteOffset, Math.floor(e3.byteLength / 4));
}
function st(e3) {
  return new DataView(e3.buffer, e3.byteOffset, e3.byteLength);
}
function J3(e3, t2) {
  return e3 << 32 - t2 | e3 >>> t2;
}
var an = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function $o2(e3) {
  return e3 << 24 & 4278190080 | e3 << 8 & 16711680 | e3 >>> 8 & 65280 | e3 >>> 24 & 255;
}
function un(e3) {
  for (let t2 = 0; t2 < e3.length; t2++) e3[t2] = $o2(e3[t2]);
}
function Ro2(e3) {
  if (typeof e3 != "string") throw new Error("utf8ToBytes expected string, got " + typeof e3);
  return new Uint8Array(new TextEncoder().encode(e3));
}
function we2(e3) {
  return typeof e3 == "string" && (e3 = Ro2(e3)), je2(e3), e3;
}
var it2 = class {
  clone() {
    return this._cloneInto();
  }
};
function fn(e3) {
  const t2 = (r3) => e3().update(we2(r3)).digest(), n5 = e3();
  return t2.outputLen = n5.outputLen, t2.blockLen = n5.blockLen, t2.create = () => e3(), t2;
}
function Se2(e3 = 32) {
  if (be2 && typeof be2.getRandomValues == "function") return be2.getRandomValues(new Uint8Array(e3));
  if (be2 && typeof be2.randomBytes == "function") return be2.randomBytes(e3);
  throw new Error("crypto.getRandomValues must be defined");
}
var ln = [];
var dn = [];
var hn = [];
var Po2 = BigInt(0);
var Ue2 = BigInt(1);
var Bo2 = BigInt(2);
var Lo2 = BigInt(7);
var jo2 = BigInt(256);
var Co2 = BigInt(113);
for (let e3 = 0, t2 = Ue2, n5 = 1, r3 = 0; e3 < 24; e3++) {
  [n5, r3] = [r3, (2 * n5 + 3 * r3) % 5], ln.push(2 * (5 * r3 + n5)), dn.push((e3 + 1) * (e3 + 2) / 2 % 64);
  let o5 = Po2;
  for (let s4 = 0; s4 < 7; s4++) t2 = (t2 << Ue2 ^ (t2 >> Lo2) * Co2) % jo2, t2 & Bo2 && (o5 ^= Ue2 << (Ue2 << BigInt(s4)) - Ue2);
  hn.push(o5);
}
var [ko2, Do2] = Ao2(hn, true);
var pn = (e3, t2, n5) => n5 > 32 ? Uo2(e3, t2, n5) : No2(e3, t2, n5);
var gn2 = (e3, t2, n5) => n5 > 32 ? _o2(e3, t2, n5) : So2(e3, t2, n5);
function Mo2(e3, t2 = 24) {
  const n5 = new Uint32Array(10);
  for (let r3 = 24 - t2; r3 < 24; r3++) {
    for (let i5 = 0; i5 < 10; i5++) n5[i5] = e3[i5] ^ e3[i5 + 10] ^ e3[i5 + 20] ^ e3[i5 + 30] ^ e3[i5 + 40];
    for (let i5 = 0; i5 < 10; i5 += 2) {
      const c7 = (i5 + 8) % 10, u3 = (i5 + 2) % 10, a3 = n5[u3], l8 = n5[u3 + 1], f7 = pn(a3, l8, 1) ^ n5[c7], d5 = gn2(a3, l8, 1) ^ n5[c7 + 1];
      for (let g4 = 0; g4 < 50; g4 += 10) e3[i5 + g4] ^= f7, e3[i5 + g4 + 1] ^= d5;
    }
    let o5 = e3[2], s4 = e3[3];
    for (let i5 = 0; i5 < 24; i5++) {
      const c7 = dn[i5], u3 = pn(o5, s4, c7), a3 = gn2(o5, s4, c7), l8 = ln[i5];
      o5 = e3[l8], s4 = e3[l8 + 1], e3[l8] = u3, e3[l8 + 1] = a3;
    }
    for (let i5 = 0; i5 < 50; i5 += 10) {
      for (let c7 = 0; c7 < 10; c7++) n5[c7] = e3[i5 + c7];
      for (let c7 = 0; c7 < 10; c7++) e3[i5 + c7] ^= ~n5[(c7 + 2) % 10] & n5[(c7 + 4) % 10];
    }
    e3[0] ^= ko2[r3], e3[1] ^= Do2[r3];
  }
  n5.fill(0);
}
var Lt2 = class _Lt extends it2 {
  constructor(t2, n5, r3, o5 = false, s4 = 24) {
    if (super(), this.blockLen = t2, this.suffix = n5, this.outputLen = r3, this.enableXOF = o5, this.rounds = s4, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Ne2(r3), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = To2(this.state);
  }
  keccak() {
    an || un(this.state32), Mo2(this.state32, this.rounds), an || un(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t2) {
    me2(this);
    const { blockLen: n5, state: r3 } = this;
    t2 = we2(t2);
    const o5 = t2.length;
    for (let s4 = 0; s4 < o5; ) {
      const i5 = Math.min(n5 - this.pos, o5 - s4);
      for (let c7 = 0; c7 < i5; c7++) r3[this.pos++] ^= t2[s4++];
      this.pos === n5 && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state: t2, suffix: n5, pos: r3, blockLen: o5 } = this;
    t2[r3] ^= n5, (n5 & 128) !== 0 && r3 === o5 - 1 && this.keccak(), t2[o5 - 1] ^= 128, this.keccak();
  }
  writeInto(t2) {
    me2(this, false), je2(t2), this.finish();
    const n5 = this.state, { blockLen: r3 } = this;
    for (let o5 = 0, s4 = t2.length; o5 < s4; ) {
      this.posOut >= r3 && this.keccak();
      const i5 = Math.min(r3 - this.posOut, s4 - o5);
      t2.set(n5.subarray(this.posOut, this.posOut + i5), o5), this.posOut += i5, o5 += i5;
    }
    return t2;
  }
  xofInto(t2) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(t2);
  }
  xof(t2) {
    return Ne2(t2), this.xofInto(new Uint8Array(t2));
  }
  digestInto(t2) {
    if (sn2(t2, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(t2), this.destroy(), t2;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(t2) {
    const { blockLen: n5, suffix: r3, outputLen: o5, rounds: s4, enableXOF: i5 } = this;
    return t2 || (t2 = new _Lt(n5, r3, o5, i5, s4)), t2.state32.set(this.state32), t2.pos = this.pos, t2.posOut = this.posOut, t2.finished = this.finished, t2.rounds = s4, t2.suffix = r3, t2.outputLen = o5, t2.enableXOF = i5, t2.destroyed = this.destroyed, t2;
  }
};
var Vo2 = (e3, t2, n5) => fn(() => new Lt2(t2, e3, n5));
var Ho2 = Vo2(1, 136, 256 / 8);
function ht2(e3) {
  if (!Number.isSafeInteger(e3) || e3 < 0) throw new Error("positive integer expected, got " + e3);
}
function Bn2(e3) {
  return e3 instanceof Uint8Array || ArrayBuffer.isView(e3) && e3.constructor.name === "Uint8Array";
}
function F(e3, ...t2) {
  if (!Bn2(e3)) throw new Error("Uint8Array expected");
  if (t2.length > 0 && !t2.includes(e3.length)) throw new Error("Uint8Array expected of length " + t2 + ", got length=" + e3.length);
}
function Ln2(e3, t2 = true) {
  if (e3.destroyed) throw new Error("Hash instance has been destroyed");
  if (t2 && e3.finished) throw new Error("Hash#digest() has already been called");
}
function cs(e3, t2) {
  F(e3);
  const n5 = t2.outputLen;
  if (e3.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
function jn2(e3) {
  if (typeof e3 != "boolean") throw new Error(`boolean expected, not ${e3}`);
}
var se = (e3) => new Uint32Array(e3.buffer, e3.byteOffset, Math.floor(e3.byteLength / 4));
var as = (e3) => new DataView(e3.buffer, e3.byteOffset, e3.byteLength);
var us = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!us) throw new Error("Non little-endian hardware is not supported");
function fs(e3) {
  if (typeof e3 != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(e3));
}
function pt(e3) {
  if (typeof e3 == "string") e3 = fs(e3);
  else if (Bn2(e3)) e3 = gt2(e3);
  else throw new Error("Uint8Array expected, got " + typeof e3);
  return e3;
}
function ls(e3, t2) {
  if (t2 == null || typeof t2 != "object") throw new Error("options must be defined");
  return Object.assign(e3, t2);
}
function ds(e3, t2) {
  if (e3.length !== t2.length) return false;
  let n5 = 0;
  for (let r3 = 0; r3 < e3.length; r3++) n5 |= e3[r3] ^ t2[r3];
  return n5 === 0;
}
var hs = (e3, t2) => {
  function n5(r3, ...o5) {
    if (F(r3), e3.nonceLength !== void 0) {
      const l8 = o5[0];
      if (!l8) throw new Error("nonce / iv required");
      e3.varSizeNonce ? F(l8) : F(l8, e3.nonceLength);
    }
    const s4 = e3.tagLength;
    s4 && o5[1] !== void 0 && F(o5[1]);
    const i5 = t2(r3, ...o5), c7 = (l8, f7) => {
      if (f7 !== void 0) {
        if (l8 !== 2) throw new Error("cipher output not supported");
        F(f7);
      }
    };
    let u3 = false;
    return { encrypt(l8, f7) {
      if (u3) throw new Error("cannot encrypt() twice with same key + nonce");
      return u3 = true, F(l8), c7(i5.encrypt.length, f7), i5.encrypt(l8, f7);
    }, decrypt(l8, f7) {
      if (F(l8), s4 && l8.length < s4) throw new Error("invalid ciphertext length: smaller than tagLength=" + s4);
      return c7(i5.decrypt.length, f7), i5.decrypt(l8, f7);
    } };
  }
  return Object.assign(n5, e3), n5;
};
function Cn2(e3, t2, n5 = true) {
  if (t2 === void 0) return new Uint8Array(e3);
  if (t2.length !== e3) throw new Error("invalid output length, expected " + e3 + ", got: " + t2.length);
  if (n5 && !ps(t2)) throw new Error("invalid output, must be aligned");
  return t2;
}
function kn2(e3, t2, n5, r3) {
  if (typeof e3.setBigUint64 == "function") return e3.setBigUint64(t2, n5, r3);
  const o5 = BigInt(32), s4 = BigInt(4294967295), i5 = Number(n5 >> o5 & s4), c7 = Number(n5 & s4), u3 = r3 ? 4 : 0, a3 = r3 ? 0 : 4;
  e3.setUint32(t2 + u3, i5, r3), e3.setUint32(t2 + a3, c7, r3);
}
function ps(e3) {
  return e3.byteOffset % 4 === 0;
}
function gt2(e3) {
  return Uint8Array.from(e3);
}
function Ee2(...e3) {
  for (let t2 = 0; t2 < e3.length; t2++) e3[t2].fill(0);
}
var Dn = (e3) => Uint8Array.from(e3.split("").map((t2) => t2.charCodeAt(0)));
var gs = Dn("expand 16-byte k");
var ys = Dn("expand 32-byte k");
var ms = se(gs);
var bs = se(ys);
function x3(e3, t2) {
  return e3 << t2 | e3 >>> 32 - t2;
}
function yt2(e3) {
  return e3.byteOffset % 4 === 0;
}
var Ve2 = 64;
var ws = 16;
var Mn2 = 2 ** 32 - 1;
var Vn2 = new Uint32Array();
function Es(e3, t2, n5, r3, o5, s4, i5, c7) {
  const u3 = o5.length, a3 = new Uint8Array(Ve2), l8 = se(a3), f7 = yt2(o5) && yt2(s4), d5 = f7 ? se(o5) : Vn2, g4 = f7 ? se(s4) : Vn2;
  for (let y4 = 0; y4 < u3; i5++) {
    if (e3(t2, n5, r3, l8, i5, c7), i5 >= Mn2) throw new Error("arx: counter overflow");
    const h6 = Math.min(Ve2, u3 - y4);
    if (f7 && h6 === Ve2) {
      const m4 = y4 / 4;
      if (y4 % 4 !== 0) throw new Error("arx: invalid block position");
      for (let L3 = 0, b4; L3 < ws; L3++) b4 = m4 + L3, g4[b4] = d5[b4] ^ l8[L3];
      y4 += Ve2;
      continue;
    }
    for (let m4 = 0, L3; m4 < h6; m4++) L3 = y4 + m4, s4[L3] = o5[L3] ^ a3[m4];
    y4 += h6;
  }
}
function vs(e3, t2) {
  const { allowShortKeys: n5, extendNonceFn: r3, counterLength: o5, counterRight: s4, rounds: i5 } = ls({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, t2);
  if (typeof e3 != "function") throw new Error("core must be a function");
  return ht2(o5), ht2(i5), jn2(s4), jn2(n5), (c7, u3, a3, l8, f7 = 0) => {
    F(c7), F(u3), F(a3);
    const d5 = a3.length;
    if (l8 === void 0 && (l8 = new Uint8Array(d5)), F(l8), ht2(f7), f7 < 0 || f7 >= Mn2) throw new Error("arx: counter overflow");
    if (l8.length < d5) throw new Error(`arx: output (${l8.length}) is shorter than data (${d5})`);
    const g4 = [];
    let y4 = c7.length, h6, m4;
    if (y4 === 32) g4.push(h6 = gt2(c7)), m4 = bs;
    else if (y4 === 16 && n5) h6 = new Uint8Array(32), h6.set(c7), h6.set(c7, 16), m4 = ms, g4.push(h6);
    else throw new Error(`arx: invalid 32-byte key, got length=${y4}`);
    yt2(u3) || g4.push(u3 = gt2(u3));
    const L3 = se(h6);
    if (r3) {
      if (u3.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r3(m4, L3, se(u3.subarray(0, 16)), L3), u3 = u3.subarray(16);
    }
    const b4 = 16 - o5;
    if (b4 !== u3.length) throw new Error(`arx: nonce must be ${b4} or 16 bytes`);
    if (b4 !== 12) {
      const O5 = new Uint8Array(12);
      O5.set(u3, s4 ? 0 : 12 - u3.length), u3 = O5, g4.push(u3);
    }
    const _3 = se(u3);
    return Es(e3, m4, L3, _3, a3, l8, f7, i5), Ee2(...g4), l8;
  };
}
var M3 = (e3, t2) => e3[t2++] & 255 | (e3[t2++] & 255) << 8;
var xs = class {
  constructor(t2) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = false, t2 = pt(t2), F(t2, 32);
    const n5 = M3(t2, 0), r3 = M3(t2, 2), o5 = M3(t2, 4), s4 = M3(t2, 6), i5 = M3(t2, 8), c7 = M3(t2, 10), u3 = M3(t2, 12), a3 = M3(t2, 14);
    this.r[0] = n5 & 8191, this.r[1] = (n5 >>> 13 | r3 << 3) & 8191, this.r[2] = (r3 >>> 10 | o5 << 6) & 7939, this.r[3] = (o5 >>> 7 | s4 << 9) & 8191, this.r[4] = (s4 >>> 4 | i5 << 12) & 255, this.r[5] = i5 >>> 1 & 8190, this.r[6] = (i5 >>> 14 | c7 << 2) & 8191, this.r[7] = (c7 >>> 11 | u3 << 5) & 8065, this.r[8] = (u3 >>> 8 | a3 << 8) & 8191, this.r[9] = a3 >>> 5 & 127;
    for (let l8 = 0; l8 < 8; l8++) this.pad[l8] = M3(t2, 16 + 2 * l8);
  }
  process(t2, n5, r3 = false) {
    const o5 = r3 ? 0 : 2048, { h: s4, r: i5 } = this, c7 = i5[0], u3 = i5[1], a3 = i5[2], l8 = i5[3], f7 = i5[4], d5 = i5[5], g4 = i5[6], y4 = i5[7], h6 = i5[8], m4 = i5[9], L3 = M3(t2, n5 + 0), b4 = M3(t2, n5 + 2), _3 = M3(t2, n5 + 4), O5 = M3(t2, n5 + 6), k4 = M3(t2, n5 + 8), E3 = M3(t2, n5 + 10), B3 = M3(t2, n5 + 12), j3 = M3(t2, n5 + 14);
    let v5 = s4[0] + (L3 & 8191), I3 = s4[1] + ((L3 >>> 13 | b4 << 3) & 8191), w4 = s4[2] + ((b4 >>> 10 | _3 << 6) & 8191), R2 = s4[3] + ((_3 >>> 7 | O5 << 9) & 8191), A2 = s4[4] + ((O5 >>> 4 | k4 << 12) & 8191), T4 = s4[5] + (k4 >>> 1 & 8191), N10 = s4[6] + ((k4 >>> 14 | E3 << 2) & 8191), S3 = s4[7] + ((E3 >>> 11 | B3 << 5) & 8191), U2 = s4[8] + ((B3 >>> 8 | j3 << 8) & 8191), $ = s4[9] + (j3 >>> 5 | o5), p4 = 0, C5 = p4 + v5 * c7 + I3 * (5 * m4) + w4 * (5 * h6) + R2 * (5 * y4) + A2 * (5 * g4);
    p4 = C5 >>> 13, C5 &= 8191, C5 += T4 * (5 * d5) + N10 * (5 * f7) + S3 * (5 * l8) + U2 * (5 * a3) + $ * (5 * u3), p4 += C5 >>> 13, C5 &= 8191;
    let D = p4 + v5 * u3 + I3 * c7 + w4 * (5 * m4) + R2 * (5 * h6) + A2 * (5 * y4);
    p4 = D >>> 13, D &= 8191, D += T4 * (5 * g4) + N10 * (5 * d5) + S3 * (5 * f7) + U2 * (5 * l8) + $ * (5 * a3), p4 += D >>> 13, D &= 8191;
    let P6 = p4 + v5 * a3 + I3 * u3 + w4 * c7 + R2 * (5 * m4) + A2 * (5 * h6);
    p4 = P6 >>> 13, P6 &= 8191, P6 += T4 * (5 * y4) + N10 * (5 * g4) + S3 * (5 * d5) + U2 * (5 * f7) + $ * (5 * l8), p4 += P6 >>> 13, P6 &= 8191;
    let G3 = p4 + v5 * l8 + I3 * a3 + w4 * u3 + R2 * c7 + A2 * (5 * m4);
    p4 = G3 >>> 13, G3 &= 8191, G3 += T4 * (5 * h6) + N10 * (5 * y4) + S3 * (5 * g4) + U2 * (5 * d5) + $ * (5 * f7), p4 += G3 >>> 13, G3 &= 8191;
    let X = p4 + v5 * f7 + I3 * l8 + w4 * a3 + R2 * u3 + A2 * c7;
    p4 = X >>> 13, X &= 8191, X += T4 * (5 * m4) + N10 * (5 * h6) + S3 * (5 * y4) + U2 * (5 * g4) + $ * (5 * d5), p4 += X >>> 13, X &= 8191;
    let Z2 = p4 + v5 * d5 + I3 * f7 + w4 * l8 + R2 * a3 + A2 * u3;
    p4 = Z2 >>> 13, Z2 &= 8191, Z2 += T4 * c7 + N10 * (5 * m4) + S3 * (5 * h6) + U2 * (5 * y4) + $ * (5 * g4), p4 += Z2 >>> 13, Z2 &= 8191;
    let he3 = p4 + v5 * g4 + I3 * d5 + w4 * f7 + R2 * l8 + A2 * a3;
    p4 = he3 >>> 13, he3 &= 8191, he3 += T4 * u3 + N10 * c7 + S3 * (5 * m4) + U2 * (5 * h6) + $ * (5 * y4), p4 += he3 >>> 13, he3 &= 8191;
    let pe2 = p4 + v5 * y4 + I3 * g4 + w4 * d5 + R2 * f7 + A2 * l8;
    p4 = pe2 >>> 13, pe2 &= 8191, pe2 += T4 * a3 + N10 * u3 + S3 * c7 + U2 * (5 * m4) + $ * (5 * h6), p4 += pe2 >>> 13, pe2 &= 8191;
    let ge2 = p4 + v5 * h6 + I3 * y4 + w4 * g4 + R2 * d5 + A2 * f7;
    p4 = ge2 >>> 13, ge2 &= 8191, ge2 += T4 * l8 + N10 * a3 + S3 * u3 + U2 * c7 + $ * (5 * m4), p4 += ge2 >>> 13, ge2 &= 8191;
    let ye2 = p4 + v5 * m4 + I3 * h6 + w4 * y4 + R2 * g4 + A2 * d5;
    p4 = ye2 >>> 13, ye2 &= 8191, ye2 += T4 * f7 + N10 * l8 + S3 * a3 + U2 * u3 + $ * c7, p4 += ye2 >>> 13, ye2 &= 8191, p4 = (p4 << 2) + p4 | 0, p4 = p4 + C5 | 0, C5 = p4 & 8191, p4 = p4 >>> 13, D += p4, s4[0] = C5, s4[1] = D, s4[2] = P6, s4[3] = G3, s4[4] = X, s4[5] = Z2, s4[6] = he3, s4[7] = pe2, s4[8] = ge2, s4[9] = ye2;
  }
  finalize() {
    const { h: t2, pad: n5 } = this, r3 = new Uint16Array(10);
    let o5 = t2[1] >>> 13;
    t2[1] &= 8191;
    for (let c7 = 2; c7 < 10; c7++) t2[c7] += o5, o5 = t2[c7] >>> 13, t2[c7] &= 8191;
    t2[0] += o5 * 5, o5 = t2[0] >>> 13, t2[0] &= 8191, t2[1] += o5, o5 = t2[1] >>> 13, t2[1] &= 8191, t2[2] += o5, r3[0] = t2[0] + 5, o5 = r3[0] >>> 13, r3[0] &= 8191;
    for (let c7 = 1; c7 < 10; c7++) r3[c7] = t2[c7] + o5, o5 = r3[c7] >>> 13, r3[c7] &= 8191;
    r3[9] -= 8192;
    let s4 = (o5 ^ 1) - 1;
    for (let c7 = 0; c7 < 10; c7++) r3[c7] &= s4;
    s4 = ~s4;
    for (let c7 = 0; c7 < 10; c7++) t2[c7] = t2[c7] & s4 | r3[c7];
    t2[0] = (t2[0] | t2[1] << 13) & 65535, t2[1] = (t2[1] >>> 3 | t2[2] << 10) & 65535, t2[2] = (t2[2] >>> 6 | t2[3] << 7) & 65535, t2[3] = (t2[3] >>> 9 | t2[4] << 4) & 65535, t2[4] = (t2[4] >>> 12 | t2[5] << 1 | t2[6] << 14) & 65535, t2[5] = (t2[6] >>> 2 | t2[7] << 11) & 65535, t2[6] = (t2[7] >>> 5 | t2[8] << 8) & 65535, t2[7] = (t2[8] >>> 8 | t2[9] << 5) & 65535;
    let i5 = t2[0] + n5[0];
    t2[0] = i5 & 65535;
    for (let c7 = 1; c7 < 8; c7++) i5 = (t2[c7] + n5[c7] | 0) + (i5 >>> 16) | 0, t2[c7] = i5 & 65535;
    Ee2(r3);
  }
  update(t2) {
    Ln2(this);
    const { buffer: n5, blockLen: r3 } = this;
    t2 = pt(t2);
    const o5 = t2.length;
    for (let s4 = 0; s4 < o5; ) {
      const i5 = Math.min(r3 - this.pos, o5 - s4);
      if (i5 === r3) {
        for (; r3 <= o5 - s4; s4 += r3) this.process(t2, s4);
        continue;
      }
      n5.set(t2.subarray(s4, s4 + i5), this.pos), this.pos += i5, s4 += i5, this.pos === r3 && (this.process(n5, 0, false), this.pos = 0);
    }
    return this;
  }
  destroy() {
    Ee2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(t2) {
    Ln2(this), cs(t2, this), this.finished = true;
    const { buffer: n5, h: r3 } = this;
    let { pos: o5 } = this;
    if (o5) {
      for (n5[o5++] = 1; o5 < 16; o5++) n5[o5] = 0;
      this.process(n5, 0, true);
    }
    this.finalize();
    let s4 = 0;
    for (let i5 = 0; i5 < 8; i5++) t2[s4++] = r3[i5] >>> 0, t2[s4++] = r3[i5] >>> 8;
    return t2;
  }
  digest() {
    const { buffer: t2, outputLen: n5 } = this;
    this.digestInto(t2);
    const r3 = t2.slice(0, n5);
    return this.destroy(), r3;
  }
};
function Is(e3) {
  const t2 = (r3, o5) => e3(o5).update(pt(r3)).digest(), n5 = e3(new Uint8Array(32));
  return t2.outputLen = n5.outputLen, t2.blockLen = n5.blockLen, t2.create = (r3) => e3(r3), t2;
}
var Os = Is((e3) => new xs(e3));
function As(e3, t2, n5, r3, o5, s4 = 20) {
  let i5 = e3[0], c7 = e3[1], u3 = e3[2], a3 = e3[3], l8 = t2[0], f7 = t2[1], d5 = t2[2], g4 = t2[3], y4 = t2[4], h6 = t2[5], m4 = t2[6], L3 = t2[7], b4 = o5, _3 = n5[0], O5 = n5[1], k4 = n5[2], E3 = i5, B3 = c7, j3 = u3, v5 = a3, I3 = l8, w4 = f7, R2 = d5, A2 = g4, T4 = y4, N10 = h6, S3 = m4, U2 = L3, $ = b4, p4 = _3, C5 = O5, D = k4;
  for (let G3 = 0; G3 < s4; G3 += 2) E3 = E3 + I3 | 0, $ = x3($ ^ E3, 16), T4 = T4 + $ | 0, I3 = x3(I3 ^ T4, 12), E3 = E3 + I3 | 0, $ = x3($ ^ E3, 8), T4 = T4 + $ | 0, I3 = x3(I3 ^ T4, 7), B3 = B3 + w4 | 0, p4 = x3(p4 ^ B3, 16), N10 = N10 + p4 | 0, w4 = x3(w4 ^ N10, 12), B3 = B3 + w4 | 0, p4 = x3(p4 ^ B3, 8), N10 = N10 + p4 | 0, w4 = x3(w4 ^ N10, 7), j3 = j3 + R2 | 0, C5 = x3(C5 ^ j3, 16), S3 = S3 + C5 | 0, R2 = x3(R2 ^ S3, 12), j3 = j3 + R2 | 0, C5 = x3(C5 ^ j3, 8), S3 = S3 + C5 | 0, R2 = x3(R2 ^ S3, 7), v5 = v5 + A2 | 0, D = x3(D ^ v5, 16), U2 = U2 + D | 0, A2 = x3(A2 ^ U2, 12), v5 = v5 + A2 | 0, D = x3(D ^ v5, 8), U2 = U2 + D | 0, A2 = x3(A2 ^ U2, 7), E3 = E3 + w4 | 0, D = x3(D ^ E3, 16), S3 = S3 + D | 0, w4 = x3(w4 ^ S3, 12), E3 = E3 + w4 | 0, D = x3(D ^ E3, 8), S3 = S3 + D | 0, w4 = x3(w4 ^ S3, 7), B3 = B3 + R2 | 0, $ = x3($ ^ B3, 16), U2 = U2 + $ | 0, R2 = x3(R2 ^ U2, 12), B3 = B3 + R2 | 0, $ = x3($ ^ B3, 8), U2 = U2 + $ | 0, R2 = x3(R2 ^ U2, 7), j3 = j3 + A2 | 0, p4 = x3(p4 ^ j3, 16), T4 = T4 + p4 | 0, A2 = x3(A2 ^ T4, 12), j3 = j3 + A2 | 0, p4 = x3(p4 ^ j3, 8), T4 = T4 + p4 | 0, A2 = x3(A2 ^ T4, 7), v5 = v5 + I3 | 0, C5 = x3(C5 ^ v5, 16), N10 = N10 + C5 | 0, I3 = x3(I3 ^ N10, 12), v5 = v5 + I3 | 0, C5 = x3(C5 ^ v5, 8), N10 = N10 + C5 | 0, I3 = x3(I3 ^ N10, 7);
  let P6 = 0;
  r3[P6++] = i5 + E3 | 0, r3[P6++] = c7 + B3 | 0, r3[P6++] = u3 + j3 | 0, r3[P6++] = a3 + v5 | 0, r3[P6++] = l8 + I3 | 0, r3[P6++] = f7 + w4 | 0, r3[P6++] = d5 + R2 | 0, r3[P6++] = g4 + A2 | 0, r3[P6++] = y4 + T4 | 0, r3[P6++] = h6 + N10 | 0, r3[P6++] = m4 + S3 | 0, r3[P6++] = L3 + U2 | 0, r3[P6++] = b4 + $ | 0, r3[P6++] = _3 + p4 | 0, r3[P6++] = O5 + C5 | 0, r3[P6++] = k4 + D | 0;
}
var Ns = vs(As, { counterRight: false, counterLength: 4, allowShortKeys: false });
var Ss = new Uint8Array(16);
var Hn2 = (e3, t2) => {
  e3.update(t2);
  const n5 = t2.length % 16;
  n5 && e3.update(Ss.subarray(n5));
};
var Us = new Uint8Array(32);
function Kn2(e3, t2, n5, r3, o5) {
  const s4 = e3(t2, n5, Us), i5 = Os.create(s4);
  o5 && Hn2(i5, o5), Hn2(i5, r3);
  const c7 = new Uint8Array(16), u3 = as(c7);
  kn2(u3, 0, BigInt(o5 ? o5.length : 0), true), kn2(u3, 8, BigInt(r3.length), true), i5.update(c7);
  const a3 = i5.digest();
  return Ee2(s4, c7), a3;
}
var _s = (e3) => (t2, n5, r3) => ({ encrypt(s4, i5) {
  const c7 = s4.length;
  i5 = Cn2(c7 + 16, i5, false), i5.set(s4);
  const u3 = i5.subarray(0, -16);
  e3(t2, n5, u3, u3, 1);
  const a3 = Kn2(e3, t2, n5, u3, r3);
  return i5.set(a3, c7), Ee2(a3), i5;
}, decrypt(s4, i5) {
  i5 = Cn2(s4.length - 16, i5, false);
  const c7 = s4.subarray(0, -16), u3 = s4.subarray(-16), a3 = Kn2(e3, t2, n5, c7, r3);
  if (!ds(u3, a3)) throw new Error("invalid tag");
  return i5.set(s4.subarray(0, -16)), e3(t2, n5, i5, i5, 1), Ee2(a3), i5;
} });
var Fn2 = hs({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _s(Ns));
var qn2 = class extends it2 {
  constructor(t2, n5) {
    super(), this.finished = false, this.destroyed = false, ot(t2);
    const r3 = we2(n5);
    if (this.iHash = t2.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o5 = this.blockLen, s4 = new Uint8Array(o5);
    s4.set(r3.length > o5 ? t2.create().update(r3).digest() : r3);
    for (let i5 = 0; i5 < s4.length; i5++) s4[i5] ^= 54;
    this.iHash.update(s4), this.oHash = t2.create();
    for (let i5 = 0; i5 < s4.length; i5++) s4[i5] ^= 106;
    this.oHash.update(s4), s4.fill(0);
  }
  update(t2) {
    return me2(this), this.iHash.update(t2), this;
  }
  digestInto(t2) {
    me2(this), je2(t2, this.outputLen), this.finished = true, this.iHash.digestInto(t2), this.oHash.update(t2), this.oHash.digestInto(t2), this.destroy();
  }
  digest() {
    const t2 = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t2), t2;
  }
  _cloneInto(t2) {
    t2 || (t2 = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n5, iHash: r3, finished: o5, destroyed: s4, blockLen: i5, outputLen: c7 } = this;
    return t2 = t2, t2.finished = o5, t2.destroyed = s4, t2.blockLen = i5, t2.outputLen = c7, t2.oHash = n5._cloneInto(t2.oHash), t2.iHash = r3._cloneInto(t2.iHash), t2;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
var mt = (e3, t2, n5) => new qn2(e3, t2).update(n5).digest();
mt.create = (e3, t2) => new qn2(e3, t2);
var bt2 = new Uint8Array([0]);
var Gn2 = new Uint8Array();
function Ps(e3, t2, n5, r3) {
  if (typeof e3.setBigUint64 == "function") return e3.setBigUint64(t2, n5, r3);
  const o5 = BigInt(32), s4 = BigInt(4294967295), i5 = Number(n5 >> o5 & s4), c7 = Number(n5 & s4), u3 = r3 ? 4 : 0, a3 = r3 ? 0 : 4;
  e3.setUint32(t2 + u3, i5, r3), e3.setUint32(t2 + a3, c7, r3);
}
function Bs(e3, t2, n5) {
  return e3 & t2 ^ ~e3 & n5;
}
function Ls(e3, t2, n5) {
  return e3 & t2 ^ e3 & n5 ^ t2 & n5;
}
var js = class extends it2 {
  constructor(t2, n5, r3, o5) {
    super(), this.blockLen = t2, this.outputLen = n5, this.padOffset = r3, this.isLE = o5, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(t2), this.view = st(this.buffer);
  }
  update(t2) {
    me2(this);
    const { view: n5, buffer: r3, blockLen: o5 } = this;
    t2 = we2(t2);
    const s4 = t2.length;
    for (let i5 = 0; i5 < s4; ) {
      const c7 = Math.min(o5 - this.pos, s4 - i5);
      if (c7 === o5) {
        const u3 = st(t2);
        for (; o5 <= s4 - i5; i5 += o5) this.process(u3, i5);
        continue;
      }
      r3.set(t2.subarray(i5, i5 + c7), this.pos), this.pos += c7, i5 += c7, this.pos === o5 && (this.process(n5, 0), this.pos = 0);
    }
    return this.length += t2.length, this.roundClean(), this;
  }
  digestInto(t2) {
    me2(this), sn2(t2, this), this.finished = true;
    const { buffer: n5, view: r3, blockLen: o5, isLE: s4 } = this;
    let { pos: i5 } = this;
    n5[i5++] = 128, this.buffer.subarray(i5).fill(0), this.padOffset > o5 - i5 && (this.process(r3, 0), i5 = 0);
    for (let f7 = i5; f7 < o5; f7++) n5[f7] = 0;
    Ps(r3, o5 - 8, BigInt(this.length * 8), s4), this.process(r3, 0);
    const c7 = st(t2), u3 = this.outputLen;
    if (u3 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const a3 = u3 / 4, l8 = this.get();
    if (a3 > l8.length) throw new Error("_sha2: outputLen bigger than state");
    for (let f7 = 0; f7 < a3; f7++) c7.setUint32(4 * f7, l8[f7], s4);
  }
  digest() {
    const { buffer: t2, outputLen: n5 } = this;
    this.digestInto(t2);
    const r3 = t2.slice(0, n5);
    return this.destroy(), r3;
  }
  _cloneInto(t2) {
    t2 || (t2 = new this.constructor()), t2.set(...this.get());
    const { blockLen: n5, buffer: r3, length: o5, finished: s4, destroyed: i5, pos: c7 } = this;
    return t2.length = o5, t2.pos = c7, t2.finished = s4, t2.destroyed = i5, o5 % n5 && t2.buffer.set(r3), t2;
  }
};
var Cs = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
var ie = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var ce = new Uint32Array(64);
var ks = class extends js {
  constructor() {
    super(64, 32, 8, false), this.A = ie[0] | 0, this.B = ie[1] | 0, this.C = ie[2] | 0, this.D = ie[3] | 0, this.E = ie[4] | 0, this.F = ie[5] | 0, this.G = ie[6] | 0, this.H = ie[7] | 0;
  }
  get() {
    const { A: t2, B: n5, C: r3, D: o5, E: s4, F: i5, G: c7, H: u3 } = this;
    return [t2, n5, r3, o5, s4, i5, c7, u3];
  }
  set(t2, n5, r3, o5, s4, i5, c7, u3) {
    this.A = t2 | 0, this.B = n5 | 0, this.C = r3 | 0, this.D = o5 | 0, this.E = s4 | 0, this.F = i5 | 0, this.G = c7 | 0, this.H = u3 | 0;
  }
  process(t2, n5) {
    for (let f7 = 0; f7 < 16; f7++, n5 += 4) ce[f7] = t2.getUint32(n5, false);
    for (let f7 = 16; f7 < 64; f7++) {
      const d5 = ce[f7 - 15], g4 = ce[f7 - 2], y4 = J3(d5, 7) ^ J3(d5, 18) ^ d5 >>> 3, h6 = J3(g4, 17) ^ J3(g4, 19) ^ g4 >>> 10;
      ce[f7] = h6 + ce[f7 - 7] + y4 + ce[f7 - 16] | 0;
    }
    let { A: r3, B: o5, C: s4, D: i5, E: c7, F: u3, G: a3, H: l8 } = this;
    for (let f7 = 0; f7 < 64; f7++) {
      const d5 = J3(c7, 6) ^ J3(c7, 11) ^ J3(c7, 25), g4 = l8 + d5 + Bs(c7, u3, a3) + Cs[f7] + ce[f7] | 0, h6 = (J3(r3, 2) ^ J3(r3, 13) ^ J3(r3, 22)) + Ls(r3, o5, s4) | 0;
      l8 = a3, a3 = u3, u3 = c7, c7 = i5 + g4 | 0, i5 = s4, s4 = o5, o5 = r3, r3 = g4 + h6 | 0;
    }
    r3 = r3 + this.A | 0, o5 = o5 + this.B | 0, s4 = s4 + this.C | 0, i5 = i5 + this.D | 0, c7 = c7 + this.E | 0, u3 = u3 + this.F | 0, a3 = a3 + this.G | 0, l8 = l8 + this.H | 0, this.set(r3, o5, s4, i5, c7, u3, a3, l8);
  }
  roundClean() {
    ce.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
var He2 = fn(() => new ks());
var Wn2 = BigInt(0);
function wt2(e3) {
  return e3 instanceof Uint8Array || ArrayBuffer.isView(e3) && e3.constructor.name === "Uint8Array";
}
function zn2(e3) {
  if (!wt2(e3)) throw new Error("Uint8Array expected");
}
var Ds = Array.from({ length: 256 }, (e3, t2) => t2.toString(16).padStart(2, "0"));
function Ms(e3) {
  zn2(e3);
  let t2 = "";
  for (let n5 = 0; n5 < e3.length; n5++) t2 += Ds[e3[n5]];
  return t2;
}
function Vs(e3) {
  if (typeof e3 != "string") throw new Error("hex string expected, got " + typeof e3);
  return e3 === "" ? Wn2 : BigInt("0x" + e3);
}
var ee = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Jn2(e3) {
  if (e3 >= ee._0 && e3 <= ee._9) return e3 - ee._0;
  if (e3 >= ee.A && e3 <= ee.F) return e3 - (ee.A - 10);
  if (e3 >= ee.a && e3 <= ee.f) return e3 - (ee.a - 10);
}
function Yn2(e3) {
  if (typeof e3 != "string") throw new Error("hex string expected, got " + typeof e3);
  const t2 = e3.length, n5 = t2 / 2;
  if (t2 % 2) throw new Error("hex string expected, got unpadded hex of length " + t2);
  const r3 = new Uint8Array(n5);
  for (let o5 = 0, s4 = 0; o5 < n5; o5++, s4 += 2) {
    const i5 = Jn2(e3.charCodeAt(s4)), c7 = Jn2(e3.charCodeAt(s4 + 1));
    if (i5 === void 0 || c7 === void 0) {
      const u3 = e3[s4] + e3[s4 + 1];
      throw new Error('hex string expected, got non-hex character "' + u3 + '" at index ' + s4);
    }
    r3[o5] = i5 * 16 + c7;
  }
  return r3;
}
function Xn2(e3) {
  return zn2(e3), Vs(Ms(Uint8Array.from(e3).reverse()));
}
function Hs(e3, t2) {
  return Yn2(e3.toString(16).padStart(t2 * 2, "0"));
}
function Ks(e3, t2) {
  return Hs(e3, t2).reverse();
}
function Zn2(e3, t2, n5) {
  let r3;
  if (typeof t2 == "string") try {
    r3 = Yn2(t2);
  } catch (s4) {
    throw new Error(e3 + " must be hex string or Uint8Array, cause: " + s4);
  }
  else if (wt2(t2)) r3 = Uint8Array.from(t2);
  else throw new Error(e3 + " must be hex string or Uint8Array");
  const o5 = r3.length;
  if (typeof n5 == "number" && o5 !== n5) throw new Error(e3 + " of length " + n5 + " expected, got " + o5);
  return r3;
}
var Et2 = (e3) => typeof e3 == "bigint" && Wn2 <= e3;
function Fs(e3, t2, n5) {
  return Et2(e3) && Et2(t2) && Et2(n5) && t2 <= e3 && e3 < n5;
}
function Qn2(e3, t2, n5, r3) {
  if (!Fs(t2, n5, r3)) throw new Error("expected valid " + e3 + ": " + n5 + " <= n < " + r3 + ", got " + t2);
}
var qs = { bigint: (e3) => typeof e3 == "bigint", function: (e3) => typeof e3 == "function", boolean: (e3) => typeof e3 == "boolean", string: (e3) => typeof e3 == "string", stringOrUint8Array: (e3) => typeof e3 == "string" || wt2(e3), isSafeInteger: (e3) => Number.isSafeInteger(e3), array: (e3) => Array.isArray(e3), field: (e3, t2) => t2.Fp.isValid(e3), hash: (e3) => typeof e3 == "function" && Number.isSafeInteger(e3.outputLen) };
function Gs(e3, t2, n5 = {}) {
  const r3 = (o5, s4, i5) => {
    const c7 = qs[s4];
    if (typeof c7 != "function") throw new Error("invalid validator function");
    const u3 = e3[o5];
    if (!(i5 && u3 === void 0) && !c7(u3, e3)) throw new Error("param " + String(o5) + " is invalid. Expected " + s4 + ", got " + u3);
  };
  for (const [o5, s4] of Object.entries(t2)) r3(o5, s4, false);
  for (const [o5, s4] of Object.entries(n5)) r3(o5, s4, true);
  return e3;
}
var ve2 = BigInt(0);
var Ke2 = BigInt(1);
function er2(e3, t2) {
  const n5 = e3 % t2;
  return n5 >= ve2 ? n5 : t2 + n5;
}
function Ws(e3, t2, n5) {
  if (t2 < ve2) throw new Error("invalid exponent, negatives unsupported");
  if (n5 <= ve2) throw new Error("invalid modulus");
  if (n5 === Ke2) return ve2;
  let r3 = Ke2;
  for (; t2 > ve2; ) t2 & Ke2 && (r3 = r3 * e3 % n5), e3 = e3 * e3 % n5, t2 >>= Ke2;
  return r3;
}
function z2(e3, t2, n5) {
  let r3 = e3;
  for (; t2-- > ve2; ) r3 *= r3, r3 %= n5;
  return r3;
}
BigInt(0), BigInt(1), BigInt(0), BigInt(1), BigInt(2), BigInt(8);
var xe2 = BigInt(0);
var vt2 = BigInt(1);
function zs(e3) {
  return Gs(e3, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...e3 });
}
function Js(e3) {
  const t2 = zs(e3), { P: n5 } = t2, r3 = (b4) => er2(b4, n5), o5 = t2.montgomeryBits, s4 = Math.ceil(o5 / 8), i5 = t2.nByteLength, c7 = t2.adjustScalarBytes || ((b4) => b4), u3 = t2.powPminus2 || ((b4) => Ws(b4, n5 - BigInt(2), n5));
  function a3(b4, _3, O5) {
    const k4 = r3(b4 * (_3 - O5));
    return _3 = r3(_3 - k4), O5 = r3(O5 + k4), [_3, O5];
  }
  const l8 = (t2.a - BigInt(2)) / BigInt(4);
  function f7(b4, _3) {
    Qn2("u", b4, xe2, n5), Qn2("scalar", _3, xe2, n5);
    const O5 = _3, k4 = b4;
    let E3 = vt2, B3 = xe2, j3 = b4, v5 = vt2, I3 = xe2, w4;
    for (let A2 = BigInt(o5 - 1); A2 >= xe2; A2--) {
      const T4 = O5 >> A2 & vt2;
      I3 ^= T4, w4 = a3(I3, E3, j3), E3 = w4[0], j3 = w4[1], w4 = a3(I3, B3, v5), B3 = w4[0], v5 = w4[1], I3 = T4;
      const N10 = E3 + B3, S3 = r3(N10 * N10), U2 = E3 - B3, $ = r3(U2 * U2), p4 = S3 - $, C5 = j3 + v5, D = j3 - v5, P6 = r3(D * N10), G3 = r3(C5 * U2), X = P6 + G3, Z2 = P6 - G3;
      j3 = r3(X * X), v5 = r3(k4 * r3(Z2 * Z2)), E3 = r3(S3 * $), B3 = r3(p4 * (S3 + r3(l8 * p4)));
    }
    w4 = a3(I3, E3, j3), E3 = w4[0], j3 = w4[1], w4 = a3(I3, B3, v5), B3 = w4[0], v5 = w4[1];
    const R2 = u3(B3);
    return r3(E3 * R2);
  }
  function d5(b4) {
    return Ks(r3(b4), s4);
  }
  function g4(b4) {
    const _3 = Zn2("u coordinate", b4, s4);
    return i5 === 32 && (_3[31] &= 127), Xn2(_3);
  }
  function y4(b4) {
    const _3 = Zn2("scalar", b4), O5 = _3.length;
    if (O5 !== s4 && O5 !== i5) {
      let k4 = "" + s4 + " or " + i5;
      throw new Error("invalid scalar, expected " + k4 + " bytes, got " + O5);
    }
    return Xn2(c7(_3));
  }
  function h6(b4, _3) {
    const O5 = g4(_3), k4 = y4(b4), E3 = f7(O5, k4);
    if (E3 === xe2) throw new Error("invalid private or public key received");
    return d5(E3);
  }
  const m4 = d5(t2.Gu);
  function L3(b4) {
    return h6(b4, m4);
  }
  return { scalarMult: h6, scalarMultBase: L3, getSharedSecret: (b4, _3) => h6(b4, _3), getPublicKey: (b4) => L3(b4), utils: { randomPrivateKey: () => t2.randomBytes(t2.nByteLength) }, GuBytes: m4 };
}
var xt2 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
var Ys = BigInt(1);
var tr2 = BigInt(2);
var Xs = BigInt(3);
var Zs = BigInt(5);
BigInt(8);
function Qs(e3) {
  const t2 = BigInt(10), n5 = BigInt(20), r3 = BigInt(40), o5 = BigInt(80), s4 = xt2, c7 = e3 * e3 % s4 * e3 % s4, u3 = z2(c7, tr2, s4) * c7 % s4, a3 = z2(u3, Ys, s4) * e3 % s4, l8 = z2(a3, Zs, s4) * a3 % s4, f7 = z2(l8, t2, s4) * l8 % s4, d5 = z2(f7, n5, s4) * f7 % s4, g4 = z2(d5, r3, s4) * d5 % s4, y4 = z2(g4, o5, s4) * g4 % s4, h6 = z2(y4, o5, s4) * g4 % s4, m4 = z2(h6, t2, s4) * l8 % s4;
  return { pow_p_5_8: z2(m4, tr2, s4) * e3 % s4, b2: c7 };
}
function ei(e3) {
  return e3[0] &= 248, e3[31] &= 127, e3[31] |= 64, e3;
}
var It2 = Js({ P: xt2, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (e3) => {
  const t2 = xt2, { pow_p_5_8: n5, b2: r3 } = Qs(e3);
  return er2(z2(n5, Xs, t2) * r3, t2);
}, adjustScalarBytes: ei, randomBytes: Se2 });

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var import_events5 = __toESM(require_events());

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DEFAULT_ERROR: () => DEFAULT_ERROR,
  IBaseJsonRpcProvider: () => n4,
  IEvents: () => e2,
  IJsonRpcConnection: () => o2,
  IJsonRpcProvider: () => r2,
  INTERNAL_ERROR: () => INTERNAL_ERROR,
  INVALID_PARAMS: () => INVALID_PARAMS,
  INVALID_REQUEST: () => INVALID_REQUEST,
  METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
  PARSE_ERROR: () => PARSE_ERROR,
  RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
  SERVER_ERROR: () => SERVER_ERROR,
  SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
  STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
  formatErrorMessage: () => formatErrorMessage,
  formatJsonRpcError: () => formatJsonRpcError,
  formatJsonRpcRequest: () => formatJsonRpcRequest,
  formatJsonRpcResult: () => formatJsonRpcResult,
  getBigIntRpcId: () => getBigIntRpcId,
  getError: () => getError,
  getErrorByCode: () => getErrorByCode,
  isHttpUrl: () => isHttpUrl,
  isJsonRpcError: () => isJsonRpcError,
  isJsonRpcPayload: () => isJsonRpcPayload,
  isJsonRpcRequest: () => isJsonRpcRequest,
  isJsonRpcResponse: () => isJsonRpcResponse,
  isJsonRpcResult: () => isJsonRpcResult,
  isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
  isLocalhostUrl: () => isLocalhostUrl,
  isNodeJs: () => isNodeJs,
  isReservedErrorCode: () => isReservedErrorCode,
  isServerErrorCode: () => isServerErrorCode,
  isValidDefaultRoute: () => isValidDefaultRoute,
  isValidErrorCode: () => isValidErrorCode,
  isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
  isValidRoute: () => isValidRoute,
  isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
  isValidWildcardRoute: () => isValidWildcardRoute,
  isWsUrl: () => isWsUrl,
  parseConnectionError: () => parseConnectionError,
  payloadId: () => payloadId,
  validateJsonRpcError: () => validateJsonRpcError
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR = "PARSE_ERROR";
var INVALID_REQUEST = "INVALID_REQUEST";
var METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
var INVALID_PARAMS = "INVALID_PARAMS";
var INTERNAL_ERROR = "INTERNAL_ERROR";
var SERVER_ERROR = "SERVER_ERROR";
var RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
var SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
var STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: "Parse error" },
  [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
  [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
  [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
  [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
  [SERVER_ERROR]: { code: -32e3, message: "Server error" }
};
var DEFAULT_ERROR = SERVER_ERROR;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code2) {
  return code2 <= SERVER_ERROR_CODE_RANGE[0] && code2 >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code2) {
  return RESERVED_ERROR_CODES.includes(code2);
}
function isValidErrorCode(code2) {
  return typeof code2 === "number";
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code2) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e3) => e3.code === code2);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return { valid: false, error: "Missing code for JSON-RPC error" };
  }
  if (typeof response.error.message === "undefined") {
    return { valid: false, error: "Missing message for JSON-RPC error" };
  }
  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
  }
  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);
    if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error code message for JSON-RPC: ${response.error.code}`
      };
    }
  }
  return { valid: true };
}
function parseConnectionError(e3, url, type) {
  return e3.message.includes("getaddrinfo ENOTFOUND") || e3.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e3;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
  isNodeJs: () => isNodeJs
});
var import_environment = __toESM(require_cjs4());
__reExport(env_exports, __toESM(require_cjs4()));
var isNodeJs = import_environment.isNode;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
__reExport(esm_exports, env_exports);

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error, data)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (typeof data !== "undefined") {
    error.data = data;
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }
  if (/\W/g.test(route)) {
    return false;
  }
  return true;
}
function isValidDefaultRoute(route) {
  return route === "*";
}
function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }
  if (!route.includes("*")) {
    return false;
  }
  if (route.split("*").length !== 2) {
    return false;
  }
  if (route.split("*").filter((x5) => x5.trim() === "").length !== 1) {
    return false;
  }
  return true;
}
function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

// node_modules/@walletconnect/jsonrpc-types/dist/index.es.js
var e2 = class {
};
var o2 = class extends e2 {
  constructor(c7) {
    super();
  }
};
var n4 = class extends e2 {
  constructor() {
    super();
  }
};
var r2 = class extends n4 {
  constructor(c7) {
    super();
  }
};

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
var HTTP_REGEX = "^https?:";
var WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var o3 = class extends r2 {
  constructor(t2) {
    super(t2), this.events = new import_events5.EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t2), this.connection.connected && this.registerEventListeners();
  }
  async connect(t2 = this.connection) {
    await this.open(t2);
  }
  async disconnect() {
    await this.close();
  }
  on(t2, e3) {
    this.events.on(t2, e3);
  }
  once(t2, e3) {
    this.events.once(t2, e3);
  }
  off(t2, e3) {
    this.events.off(t2, e3);
  }
  removeListener(t2, e3) {
    this.events.removeListener(t2, e3);
  }
  async request(t2, e3) {
    return this.requestStrict(formatJsonRpcRequest(t2.method, t2.params || [], t2.id || getBigIntRpcId().toString()), e3);
  }
  async requestStrict(t2, e3) {
    return new Promise(async (i5, s4) => {
      if (!this.connection.connected) try {
        await this.open();
      } catch (n5) {
        s4(n5);
      }
      this.events.on(`${t2.id}`, (n5) => {
        isJsonRpcError(n5) ? s4(n5.error) : i5(n5.result);
      });
      try {
        await this.connection.send(t2, e3);
      } catch (n5) {
        s4(n5);
      }
    });
  }
  setConnection(t2 = this.connection) {
    return t2;
  }
  onPayload(t2) {
    this.events.emit("payload", t2), isJsonRpcResponse(t2) ? this.events.emit(`${t2.id}`, t2) : this.events.emit("message", { type: t2.method, data: t2.params });
  }
  onClose(t2) {
    t2 && t2.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t2.code} ${t2.reason ? `(${t2.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t2 = this.connection) {
    this.connection === t2 && this.connection.connected || (this.connection.connected && this.close(), typeof t2 == "string" && (await this.connection.open(t2), t2 = this.connection), this.connection = this.setConnection(t2), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t2) => this.onPayload(t2)), this.connection.on("close", (t2) => this.onClose(t2)), this.connection.on("error", (t2) => this.events.emit("error", t2)), this.connection.on("register_error", (t2) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
};

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var import_events6 = __toESM(require_events());
var v3 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require_browser2();
var w2 = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u";
var d3 = (r3) => r3.split("?")[0];
var h4 = 10;
var b3 = v3();
var f5 = class {
  constructor(e3) {
    if (this.url = e3, this.events = new import_events6.EventEmitter(), this.registering = false, !isWsUrl(e3)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e3}`);
    this.url = e3;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e3, t2) {
    this.events.on(e3, t2);
  }
  once(e3, t2) {
    this.events.once(e3, t2);
  }
  off(e3, t2) {
    this.events.off(e3, t2);
  }
  removeListener(e3, t2) {
    this.events.removeListener(e3, t2);
  }
  async open(e3 = this.url) {
    await this.register(e3);
  }
  async close() {
    return new Promise((e3, t2) => {
      if (typeof this.socket > "u") {
        t2(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n5) => {
        this.onClose(n5), e3();
      }, this.socket.close();
    });
  }
  async send(e3) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify(e3));
    } catch (t2) {
      this.onError(e3.id, t2);
    }
  }
  register(e3 = this.url) {
    if (!isWsUrl(e3)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e3}`);
    if (this.registering) {
      const t2 = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t2 || this.events.listenerCount("open") >= t2) && this.events.setMaxListeners(t2 + 1), new Promise((n5, s4) => {
        this.events.once("register_error", (o5) => {
          this.resetMaxListeners(), s4(o5);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u") return s4(new Error("WebSocket connection is missing or invalid"));
          n5(this.socket);
        });
      });
    }
    return this.url = e3, this.registering = true, new Promise((t2, n5) => {
      const s4 = (0, esm_exports.isReactNative)() ? void 0 : { rejectUnauthorized: !isLocalhostUrl(e3) }, o5 = new b3(e3, [], s4);
      w2() ? o5.onerror = (i5) => {
        const a3 = i5;
        n5(this.emitError(a3.error));
      } : o5.on("error", (i5) => {
        n5(this.emitError(i5));
      }), o5.onopen = () => {
        this.onOpen(o5), t2(o5);
      };
    });
  }
  onOpen(e3) {
    e3.onmessage = (t2) => this.onPayload(t2), e3.onclose = (t2) => this.onClose(t2), this.socket = e3, this.registering = false, this.events.emit("open");
  }
  onClose(e3) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e3);
  }
  onPayload(e3) {
    if (typeof e3.data > "u") return;
    const t2 = typeof e3.data == "string" ? safeJsonParse(e3.data) : e3.data;
    this.events.emit("payload", t2);
  }
  onError(e3, t2) {
    const n5 = this.parseError(t2), s4 = n5.message || n5.toString(), o5 = formatJsonRpcError(e3, s4);
    this.events.emit("payload", o5);
  }
  parseError(e3, t2 = this.url) {
    return parseConnectionError(e3, d3(t2), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h4 && this.events.setMaxListeners(h4);
  }
  emitError(e3) {
    const t2 = this.parseError(new Error((e3 == null ? void 0 : e3.message) || `WebSocket connection failed for host: ${d3(this.url)}`));
    return this.events.emit("register_error", t2), t2;
  }
};

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/core/dist/index.es.js
var import_window_getters2 = __toESM(require_cjs2());
var ze3 = "wc";
var he2 = "core";
var B2 = `${ze3}@2:${he2}:`;
var Hs2 = import_time4.FIVE_SECONDS * 1e3;
var Ht2 = "https://verify.walletconnect.org";
var ue = Ht2;
var Yt3 = `${ue}/v3`;
function sr2(r3, e3) {
  if (r3.length >= 255) throw new TypeError("Alphabet too long");
  for (var t2 = new Uint8Array(256), s4 = 0; s4 < t2.length; s4++) t2[s4] = 255;
  for (var i5 = 0; i5 < r3.length; i5++) {
    var n5 = r3.charAt(i5), o5 = n5.charCodeAt(0);
    if (t2[o5] !== 255) throw new TypeError(n5 + " is ambiguous");
    t2[o5] = i5;
  }
  var a3 = r3.length, c7 = r3.charAt(0), h6 = Math.log(a3) / Math.log(256), u3 = Math.log(256) / Math.log(a3);
  function d5(l8) {
    if (l8 instanceof Uint8Array || (ArrayBuffer.isView(l8) ? l8 = new Uint8Array(l8.buffer, l8.byteOffset, l8.byteLength) : Array.isArray(l8) && (l8 = Uint8Array.from(l8))), !(l8 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (l8.length === 0) return "";
    for (var b4 = 0, x5 = 0, I3 = 0, D = l8.length; I3 !== D && l8[I3] === 0; ) I3++, b4++;
    for (var j3 = (D - I3) * u3 + 1 >>> 0, T4 = new Uint8Array(j3); I3 !== D; ) {
      for (var q2 = l8[I3], J4 = 0, K4 = j3 - 1; (q2 !== 0 || J4 < x5) && K4 !== -1; K4--, J4++) q2 += 256 * T4[K4] >>> 0, T4[K4] = q2 % a3 >>> 0, q2 = q2 / a3 >>> 0;
      if (q2 !== 0) throw new Error("Non-zero carry");
      x5 = J4, I3++;
    }
    for (var H2 = j3 - x5; H2 !== j3 && T4[H2] === 0; ) H2++;
    for (var me3 = c7.repeat(b4); H2 < j3; ++H2) me3 += r3.charAt(T4[H2]);
    return me3;
  }
  function g4(l8) {
    if (typeof l8 != "string") throw new TypeError("Expected String");
    if (l8.length === 0) return new Uint8Array();
    var b4 = 0;
    if (l8[b4] !== " ") {
      for (var x5 = 0, I3 = 0; l8[b4] === c7; ) x5++, b4++;
      for (var D = (l8.length - b4) * h6 + 1 >>> 0, j3 = new Uint8Array(D); l8[b4]; ) {
        var T4 = t2[l8.charCodeAt(b4)];
        if (T4 === 255) return;
        for (var q2 = 0, J4 = D - 1; (T4 !== 0 || q2 < I3) && J4 !== -1; J4--, q2++) T4 += a3 * j3[J4] >>> 0, j3[J4] = T4 % 256 >>> 0, T4 = T4 / 256 >>> 0;
        if (T4 !== 0) throw new Error("Non-zero carry");
        I3 = q2, b4++;
      }
      if (l8[b4] !== " ") {
        for (var K4 = D - I3; K4 !== D && j3[K4] === 0; ) K4++;
        for (var H2 = new Uint8Array(x5 + (D - K4)), me3 = x5; K4 !== D; ) H2[me3++] = j3[K4++];
        return H2;
      }
    }
  }
  function _3(l8) {
    var b4 = g4(l8);
    if (b4) return b4;
    throw new Error(`Non-${e3} character`);
  }
  return { encode: d5, decodeUnsafe: g4, decode: _3 };
}
var rr3 = sr2;
var nr2 = rr3;
var si2 = (r3) => {
  if (r3 instanceof Uint8Array && r3.constructor.name === "Uint8Array") return r3;
  if (r3 instanceof ArrayBuffer) return new Uint8Array(r3);
  if (ArrayBuffer.isView(r3)) return new Uint8Array(r3.buffer, r3.byteOffset, r3.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var or3 = (r3) => new TextEncoder().encode(r3);
var ar2 = (r3) => new TextDecoder().decode(r3);
var cr2 = class {
  constructor(e3, t2, s4) {
    this.name = e3, this.prefix = t2, this.baseEncode = s4;
  }
  encode(e3) {
    if (e3 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e3)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var hr2 = class {
  constructor(e3, t2, s4) {
    if (this.name = e3, this.prefix = t2, t2.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t2.codePointAt(0), this.baseDecode = s4;
  }
  decode(e3) {
    if (typeof e3 == "string") {
      if (e3.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e3)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e3.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e3) {
    return ri2(this, e3);
  }
};
var lr2 = class {
  constructor(e3) {
    this.decoders = e3;
  }
  or(e3) {
    return ri2(this, e3);
  }
  decode(e3) {
    const t2 = e3[0], s4 = this.decoders[t2];
    if (s4) return s4.decode(e3);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e3)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ri2 = (r3, e3) => new lr2({ ...r3.decoders || { [r3.prefix]: r3 }, ...e3.decoders || { [e3.prefix]: e3 } });
var ur2 = class {
  constructor(e3, t2, s4, i5) {
    this.name = e3, this.prefix = t2, this.baseEncode = s4, this.baseDecode = i5, this.encoder = new cr2(e3, t2, s4), this.decoder = new hr2(e3, t2, i5);
  }
  encode(e3) {
    return this.encoder.encode(e3);
  }
  decode(e3) {
    return this.decoder.decode(e3);
  }
};
var Ee3 = ({ name: r3, prefix: e3, encode: t2, decode: s4 }) => new ur2(r3, e3, t2, s4);
var de3 = ({ prefix: r3, name: e3, alphabet: t2 }) => {
  const { encode: s4, decode: i5 } = nr2(t2, e3);
  return Ee3({ prefix: r3, name: e3, encode: s4, decode: (n5) => si2(i5(n5)) });
};
var dr2 = (r3, e3, t2, s4) => {
  const i5 = {};
  for (let u3 = 0; u3 < e3.length; ++u3) i5[e3[u3]] = u3;
  let n5 = r3.length;
  for (; r3[n5 - 1] === "="; ) --n5;
  const o5 = new Uint8Array(n5 * t2 / 8 | 0);
  let a3 = 0, c7 = 0, h6 = 0;
  for (let u3 = 0; u3 < n5; ++u3) {
    const d5 = i5[r3[u3]];
    if (d5 === void 0) throw new SyntaxError(`Non-${s4} character`);
    c7 = c7 << t2 | d5, a3 += t2, a3 >= 8 && (a3 -= 8, o5[h6++] = 255 & c7 >> a3);
  }
  if (a3 >= t2 || 255 & c7 << 8 - a3) throw new SyntaxError("Unexpected end of data");
  return o5;
};
var gr2 = (r3, e3, t2) => {
  const s4 = e3[e3.length - 1] === "=", i5 = (1 << t2) - 1;
  let n5 = "", o5 = 0, a3 = 0;
  for (let c7 = 0; c7 < r3.length; ++c7) for (a3 = a3 << 8 | r3[c7], o5 += 8; o5 > t2; ) o5 -= t2, n5 += e3[i5 & a3 >> o5];
  if (o5 && (n5 += e3[i5 & a3 << t2 - o5]), s4) for (; n5.length * t2 & 7; ) n5 += "=";
  return n5;
};
var P4 = ({ name: r3, prefix: e3, bitsPerChar: t2, alphabet: s4 }) => Ee3({ prefix: e3, name: r3, encode(i5) {
  return gr2(i5, s4, t2);
}, decode(i5) {
  return dr2(i5, s4, t2, r3);
} });
var pr2 = Ee3({ prefix: "\0", name: "identity", encode: (r3) => ar2(r3), decode: (r3) => or3(r3) });
var yr2 = Object.freeze({ __proto__: null, identity: pr2 });
var br2 = P4({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var mr2 = Object.freeze({ __proto__: null, base2: br2 });
var fr2 = P4({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Dr3 = Object.freeze({ __proto__: null, base8: fr2 });
var vr2 = de3({ prefix: "9", name: "base10", alphabet: "0123456789" });
var wr2 = Object.freeze({ __proto__: null, base10: vr2 });
var _r2 = P4({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Er2 = P4({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Ir2 = Object.freeze({ __proto__: null, base16: _r2, base16upper: Er2 });
var Tr2 = P4({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Cr2 = P4({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var Pr2 = P4({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var Sr2 = P4({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var Rr2 = P4({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var Or2 = P4({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var Ar2 = P4({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var xr2 = P4({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var Nr2 = P4({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var $r2 = Object.freeze({ __proto__: null, base32: Tr2, base32upper: Cr2, base32pad: Pr2, base32padupper: Sr2, base32hex: Rr2, base32hexupper: Or2, base32hexpad: Ar2, base32hexpadupper: xr2, base32z: Nr2 });
var zr3 = de3({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var Lr3 = de3({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var kr2 = Object.freeze({ __proto__: null, base36: zr3, base36upper: Lr3 });
var jr2 = de3({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Ur2 = de3({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Mr2 = Object.freeze({ __proto__: null, base58btc: jr2, base58flickr: Ur2 });
var Fr2 = P4({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var Kr3 = P4({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var Br3 = P4({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var Vr2 = P4({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var qr2 = Object.freeze({ __proto__: null, base64: Fr2, base64pad: Kr3, base64url: Br3, base64urlpad: Vr2 });
var ni = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var Gr2 = ni.reduce((r3, e3, t2) => (r3[t2] = e3, r3), []);
var Wr2 = ni.reduce((r3, e3, t2) => (r3[e3.codePointAt(0)] = t2, r3), []);
function Hr2(r3) {
  return r3.reduce((e3, t2) => (e3 += Gr2[t2], e3), "");
}
function Yr3(r3) {
  const e3 = [];
  for (const t2 of r3) {
    const s4 = Wr2[t2.codePointAt(0)];
    if (s4 === void 0) throw new Error(`Non-base256emoji character: ${t2}`);
    e3.push(s4);
  }
  return new Uint8Array(e3);
}
var Jr3 = Ee3({ prefix: "🚀", name: "base256emoji", encode: Hr2, decode: Yr3 });
var Xr3 = Object.freeze({ __proto__: null, base256emoji: Jr3 });
var Zr2 = ai2;
var oi2 = 128;
var Qr3 = 127;
var en2 = ~Qr3;
var tn = Math.pow(2, 31);
function ai2(r3, e3, t2) {
  e3 = e3 || [], t2 = t2 || 0;
  for (var s4 = t2; r3 >= tn; ) e3[t2++] = r3 & 255 | oi2, r3 /= 128;
  for (; r3 & en2; ) e3[t2++] = r3 & 255 | oi2, r3 >>>= 7;
  return e3[t2] = r3 | 0, ai2.bytes = t2 - s4 + 1, e3;
}
var sn3 = Fe2;
var rn2 = 128;
var ci2 = 127;
function Fe2(r3, s4) {
  var t2 = 0, s4 = s4 || 0, i5 = 0, n5 = s4, o5, a3 = r3.length;
  do {
    if (n5 >= a3) throw Fe2.bytes = 0, new RangeError("Could not decode varint");
    o5 = r3[n5++], t2 += i5 < 28 ? (o5 & ci2) << i5 : (o5 & ci2) * Math.pow(2, i5), i5 += 7;
  } while (o5 >= rn2);
  return Fe2.bytes = n5 - s4, t2;
}
var nn2 = Math.pow(2, 7);
var on2 = Math.pow(2, 14);
var an2 = Math.pow(2, 21);
var cn2 = Math.pow(2, 28);
var hn2 = Math.pow(2, 35);
var ln2 = Math.pow(2, 42);
var un2 = Math.pow(2, 49);
var dn2 = Math.pow(2, 56);
var gn3 = Math.pow(2, 63);
var pn2 = function(r3) {
  return r3 < nn2 ? 1 : r3 < on2 ? 2 : r3 < an2 ? 3 : r3 < cn2 ? 4 : r3 < hn2 ? 5 : r3 < ln2 ? 6 : r3 < un2 ? 7 : r3 < dn2 ? 8 : r3 < gn3 ? 9 : 10;
};
var yn2 = { encode: Zr2, decode: sn3, encodingLength: pn2 };
var hi2 = yn2;
var li2 = (r3, e3, t2 = 0) => (hi2.encode(r3, e3, t2), e3);
var ui2 = (r3) => hi2.encodingLength(r3);
var Ke3 = (r3, e3) => {
  const t2 = e3.byteLength, s4 = ui2(r3), i5 = s4 + ui2(t2), n5 = new Uint8Array(i5 + t2);
  return li2(r3, n5, 0), li2(t2, n5, s4), n5.set(e3, i5), new bn2(r3, t2, e3, n5);
};
var bn2 = class {
  constructor(e3, t2, s4, i5) {
    this.code = e3, this.size = t2, this.digest = s4, this.bytes = i5;
  }
};
var di2 = ({ name: r3, code: e3, encode: t2 }) => new mn2(r3, e3, t2);
var mn2 = class {
  constructor(e3, t2, s4) {
    this.name = e3, this.code = t2, this.encode = s4;
  }
  digest(e3) {
    if (e3 instanceof Uint8Array) {
      const t2 = this.encode(e3);
      return t2 instanceof Uint8Array ? Ke3(this.code, t2) : t2.then((s4) => Ke3(this.code, s4));
    } else throw Error("Unknown type, must be binary type");
  }
};
var gi = (r3) => async (e3) => new Uint8Array(await crypto.subtle.digest(r3, e3));
var fn2 = di2({ name: "sha2-256", code: 18, encode: gi("SHA-256") });
var Dn2 = di2({ name: "sha2-512", code: 19, encode: gi("SHA-512") });
var vn2 = Object.freeze({ __proto__: null, sha256: fn2, sha512: Dn2 });
var pi2 = 0;
var wn = "identity";
var yi = si2;
var _n2 = (r3) => Ke3(pi2, yi(r3));
var En2 = { code: pi2, name: wn, encode: yi, digest: _n2 };
var In2 = Object.freeze({ __proto__: null, identity: En2 });
new TextEncoder(), new TextDecoder();
var bi2 = { ...yr2, ...mr2, ...Dr3, ...wr2, ...Ir2, ...$r2, ...kr2, ...Mr2, ...qr2, ...Xr3 };
({ ...vn2, ...In2 });
function Tn2(r3 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(r3) : new Uint8Array(r3);
}
function mi2(r3, e3, t2, s4) {
  return { name: r3, prefix: e3, encoder: { name: r3, prefix: e3, encode: t2 }, decoder: { decode: s4 } };
}
var fi2 = mi2("utf8", "u", (r3) => "u" + new TextDecoder("utf8").decode(r3), (r3) => new TextEncoder().encode(r3.substring(1)));
var Be2 = mi2("ascii", "a", (r3) => {
  let e3 = "a";
  for (let t2 = 0; t2 < r3.length; t2++) e3 += String.fromCharCode(r3[t2]);
  return e3;
}, (r3) => {
  r3 = r3.substring(1);
  const e3 = Tn2(r3.length);
  for (let t2 = 0; t2 < r3.length; t2++) e3[t2] = r3.charCodeAt(t2);
  return e3;
});
var Cn3 = { utf8: fi2, "utf-8": fi2, hex: bi2.base16, latin1: Be2, ascii: Be2, binary: Be2, ...bi2 };

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/sign-client/dist/index.es.js
var import_time5 = __toESM(require_cjs());
var import_events8 = __toESM(require_events());
var De2 = "wc";
var Le2 = 2;
var ke2 = "client";
var we3 = `${De2}@${Le2}:${ke2}:`;
var yt3 = "wc";
var wt3 = "auth";
var ae2 = `${yt3}@${1.5}:${wt3}:`;
var ce2 = `${ae2}:PUB_KEY`;

// node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js
var import_events9 = __toESM(require_events());
var import_cross_fetch = __toESM(require_browser_ponyfill());
var P5 = Object.defineProperty;
var w3 = Object.defineProperties;
var E2 = Object.getOwnPropertyDescriptors;
var c6 = Object.getOwnPropertySymbols;
var L2 = Object.prototype.hasOwnProperty;
var O4 = Object.prototype.propertyIsEnumerable;
var l7 = (r3, t2, e3) => t2 in r3 ? P5(r3, t2, { enumerable: true, configurable: true, writable: true, value: e3 }) : r3[t2] = e3;
var p3 = (r3, t2) => {
  for (var e3 in t2 || (t2 = {})) L2.call(t2, e3) && l7(r3, e3, t2[e3]);
  if (c6) for (var e3 of c6(t2)) O4.call(t2, e3) && l7(r3, e3, t2[e3]);
  return r3;
};
var v4 = (r3, t2) => w3(r3, E2(t2));
var j2 = { Accept: "application/json", "Content-Type": "application/json" };
var T3 = "POST";
var d4 = { headers: j2, method: T3 };
var g3 = 10;
var f6 = class {
  constructor(t2, e3 = false) {
    if (this.url = t2, this.disableProviderPing = e3, this.events = new import_events9.EventEmitter(), this.isAvailable = false, this.registering = false, !isHttpUrl(t2)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t2}`);
    this.url = t2, this.disableProviderPing = e3;
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(t2, e3) {
    this.events.on(t2, e3);
  }
  once(t2, e3) {
    this.events.once(t2, e3);
  }
  off(t2, e3) {
    this.events.off(t2, e3);
  }
  removeListener(t2, e3) {
    this.events.removeListener(t2, e3);
  }
  async open(t2 = this.url) {
    await this.register(t2);
  }
  async close() {
    if (!this.isAvailable) throw new Error("Connection already closed");
    this.onClose();
  }
  async send(t2) {
    this.isAvailable || await this.register();
    try {
      const e3 = safeJsonStringify(t2), s4 = await (await (0, import_cross_fetch.default)(this.url, v4(p3({}, d4), { body: e3 }))).json();
      this.onPayload({ data: s4 });
    } catch (e3) {
      this.onError(t2.id, e3);
    }
  }
  async register(t2 = this.url) {
    if (!isHttpUrl(t2)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t2}`);
    if (this.registering) {
      const e3 = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= e3 || this.events.listenerCount("open") >= e3) && this.events.setMaxListeners(e3 + 1), new Promise((s4, i5) => {
        this.events.once("register_error", (n5) => {
          this.resetMaxListeners(), i5(n5);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.isAvailable > "u") return i5(new Error("HTTP connection is missing or invalid"));
          s4();
        });
      });
    }
    this.url = t2, this.registering = true;
    try {
      if (!this.disableProviderPing) {
        const e3 = safeJsonStringify({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await (0, import_cross_fetch.default)(t2, v4(p3({}, d4), { body: e3 }));
      }
      this.onOpen();
    } catch (e3) {
      const s4 = this.parseError(e3);
      throw this.events.emit("register_error", s4), this.onClose(), s4;
    }
  }
  onOpen() {
    this.isAvailable = true, this.registering = false, this.events.emit("open");
  }
  onClose() {
    this.isAvailable = false, this.registering = false, this.events.emit("close");
  }
  onPayload(t2) {
    if (typeof t2.data > "u") return;
    const e3 = typeof t2.data == "string" ? safeJsonParse(t2.data) : t2.data;
    this.events.emit("payload", e3);
  }
  onError(t2, e3) {
    const s4 = this.parseError(e3), i5 = s4.message || s4.toString(), n5 = formatJsonRpcError(t2, i5);
    this.events.emit("payload", n5);
  }
  parseError(t2, e3 = this.url) {
    return parseConnectionError(t2, e3, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > g3 && this.events.setMaxListeners(g3);
  }
};

// node_modules/@reown/appkit-controllers/node_modules/@walletconnect/universal-provider/dist/index.es.js
var import_events10 = __toESM(require_events());
var St2 = "wc";
var Dt2 = "universal_provider";
var _2 = `${St2}@2:${Dt2}:`;
var et2 = "https://rpc.walletconnect.org/v1/";
var qt2 = `${et2}bundler`;

// node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js
var DEFAULT_SDK_URL = "https://secure.walletconnect.org/sdk";
var SECURE_SITE_SDK = (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_SDK_URL"] : void 0) || DEFAULT_SDK_URL;
var DEFAULT_LOG_LEVEL = (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_DEFAULT_LOG_LEVEL"] : void 0) || "error";
var SECURE_SITE_SDK_VERSION = (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_SDK_VERSION"] : void 0) || "4";
var W3mFrameRpcConstants = {
  SAFE_RPC_METHODS: [
    "eth_accounts",
    "eth_blockNumber",
    "eth_call",
    "eth_chainId",
    "eth_estimateGas",
    "eth_feeHistory",
    "eth_gasPrice",
    "eth_getAccount",
    "eth_getBalance",
    "eth_getBlockByHash",
    "eth_getBlockByNumber",
    "eth_getBlockReceipts",
    "eth_getBlockTransactionCountByHash",
    "eth_getBlockTransactionCountByNumber",
    "eth_getCode",
    "eth_getFilterChanges",
    "eth_getFilterLogs",
    "eth_getLogs",
    "eth_getProof",
    "eth_getStorageAt",
    "eth_getTransactionByBlockHashAndIndex",
    "eth_getTransactionByBlockNumberAndIndex",
    "eth_getTransactionByHash",
    "eth_getTransactionCount",
    "eth_getTransactionReceipt",
    "eth_getUncleCountByBlockHash",
    "eth_getUncleCountByBlockNumber",
    "eth_maxPriorityFeePerGas",
    "eth_newBlockFilter",
    "eth_newFilter",
    "eth_newPendingTransactionFilter",
    "eth_sendRawTransaction",
    "eth_syncing",
    "eth_uninstallFilter",
    "wallet_getCapabilities",
    "wallet_getCallsStatus",
    "eth_getUserOperationReceipt",
    "eth_estimateUserOperationGas",
    "eth_getUserOperationByHash",
    "eth_supportedEntryPoints",
    "wallet_getAssets"
  ],
  NOT_SAFE_RPC_METHODS: [
    "personal_sign",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "solana_signMessage",
    "solana_signTransaction",
    "solana_signAllTransactions",
    "solana_signAndSendTransaction",
    "wallet_sendCalls",
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    "eth_sendUserOperation"
  ],
  GET_CHAIN_ID: "eth_chainId",
  RPC_METHOD_NOT_ALLOWED_MESSAGE: "Requested RPC call is not allowed",
  RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: "Action not allowed",
  ACCOUNT_TYPES: {
    EOA: "eoa",
    SMART_ACCOUNT: "smartAccount"
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AlertController.js
var state7 = proxy({
  message: "",
  variant: "info",
  open: false
});
var AlertController = {
  state: state7,
  subscribeKey(key, callback) {
    return subscribeKey(state7, key, callback);
  },
  open(message, variant) {
    const { debug } = OptionsController.state;
    const { shortMessage, longMessage } = message;
    if (debug) {
      state7.message = shortMessage;
      state7.variant = variant;
      state7.open = true;
    }
    if (longMessage) {
      console.error(typeof longMessage === "function" ? longMessage() : longMessage);
    }
  },
  close() {
    state7.open = false;
    state7.message = "";
    state7.variant = "info";
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js
var baseUrl2 = CoreHelperUtil.getAnalyticsUrl();
var api = new FetchUtil({ baseUrl: baseUrl2, clientId: null });
var excluded = ["MODAL_CREATED"];
var state8 = proxy({
  timestamp: Date.now(),
  reportedErrors: {},
  data: {
    type: "track",
    event: "MODAL_CREATED"
  }
});
var EventsController = {
  state: state8,
  subscribe(callback) {
    return subscribe(state8, () => callback(state8));
  },
  getSdkProperties() {
    const { projectId, sdkType, sdkVersion } = OptionsController.state;
    return {
      projectId,
      st: sdkType,
      sv: sdkVersion || "html-wagmi-4.2.2"
    };
  },
  async _sendAnalyticsEvent(payload) {
    try {
      const address = AccountController.state.address;
      if (excluded.includes(payload.data.event) || typeof window === "undefined") {
        return;
      }
      await api.post({
        path: "/e",
        params: EventsController.getSdkProperties(),
        body: {
          eventId: CoreHelperUtil.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: payload.timestamp,
          props: { ...payload.data, address }
        }
      });
      state8.reportedErrors["FORBIDDEN"] = false;
    } catch (err) {
      const isForbiddenError = err instanceof Error && err.cause instanceof Response && err.cause.status === ConstantsUtil.HTTP_STATUS_CODES.FORBIDDEN && !state8.reportedErrors["FORBIDDEN"];
      if (isForbiddenError) {
        AlertController.open({
          shortMessage: "Invalid App Configuration",
          longMessage: `Origin ${isSafe() ? window.origin : "uknown"} not found on Allowlist - update configuration on cloud.reown.com`
        }, "error");
        state8.reportedErrors["FORBIDDEN"] = true;
      }
    }
  },
  sendEvent(data) {
    var _a;
    state8.timestamp = Date.now();
    state8.data = data;
    if ((_a = OptionsController.state.features) == null ? void 0 : _a.analytics) {
      EventsController._sendAnalyticsEvent(state8);
    }
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/SIWXUtil.js
var SIWXUtil = {
  getSIWX() {
    return OptionsController.state.siwx;
  },
  async initializeIfEnabled() {
    var _a;
    const siwx = OptionsController.state.siwx;
    const caipAddress = ChainController.getActiveCaipAddress();
    if (!(siwx && caipAddress)) {
      return;
    }
    const [namespace, chainId, address] = caipAddress.split(":");
    if (!ChainController.checkIfSupportedNetwork(namespace)) {
      return;
    }
    try {
      const sessions = await siwx.getSessions(`${namespace}:${chainId}`, address);
      if (sessions.length) {
        return;
      }
      await ModalController.open({
        view: "SIWXSignMessage"
      });
    } catch (error) {
      console.error("SIWXUtil:initializeIfEnabled", error);
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties: this.getSIWXEventProperties()
      });
      await ((_a = ConnectionController._getClient()) == null ? void 0 : _a.disconnect().catch(console.error));
      RouterController.reset("Connect");
      SnackController.showError("A problem occurred while trying initialize authentication");
    }
  },
  async requestSignMessage() {
    const siwx = OptionsController.state.siwx;
    const address = CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress());
    const network = ChainController.getActiveCaipNetwork();
    const client = ConnectionController._getClient();
    if (!siwx) {
      throw new Error("SIWX is not enabled");
    }
    if (!address) {
      throw new Error("No ActiveCaipAddress found");
    }
    if (!network) {
      throw new Error("No ActiveCaipNetwork or client found");
    }
    if (!client) {
      throw new Error("No ConnectionController client found");
    }
    try {
      const siwxMessage = await siwx.createMessage({
        chainId: network.caipNetworkId,
        accountAddress: address
      });
      const message = siwxMessage.toString();
      const connectorId = ConnectorController.getConnectorId(network.chainNamespace);
      if (connectorId === ConstantsUtil.CONNECTOR_ID.AUTH) {
        RouterController.pushTransactionStack({
          view: null,
          goBack: false,
          replace: true
        });
      }
      const signature = await client.signMessage(message);
      await siwx.addSession({
        data: siwxMessage,
        message,
        signature
      });
      ModalController.close();
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_SUCCESS",
        properties: this.getSIWXEventProperties()
      });
    } catch (error) {
      const properties = this.getSIWXEventProperties();
      if (!ModalController.state.open || RouterController.state.view === "ApproveTransaction") {
        await ModalController.open({
          view: "SIWXSignMessage"
        });
      }
      if (properties.isSmartAccount) {
        SnackController.showError("This application might not support Smart Accounts");
      } else {
        SnackController.showError("Signature declined");
      }
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties
      });
      console.error("SWIXUtil:requestSignMessage", error);
    }
  },
  async cancelSignMessage() {
    var _a;
    try {
      const siwx = this.getSIWX();
      const isRequired = (_a = siwx == null ? void 0 : siwx.getRequired) == null ? void 0 : _a.call(siwx);
      if (isRequired) {
        await ConnectionController.disconnect();
      } else {
        ModalController.close();
      }
      RouterController.reset("Connect");
      EventsController.sendEvent({
        event: "CLICK_CANCEL_SIWX",
        type: "track",
        properties: this.getSIWXEventProperties()
      });
    } catch (error) {
      console.error("SIWXUtil:cancelSignMessage", error);
    }
  },
  async getSessions() {
    const siwx = OptionsController.state.siwx;
    const address = CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress());
    const network = ChainController.getActiveCaipNetwork();
    if (!(siwx && address && network)) {
      return [];
    }
    return siwx.getSessions(network.caipNetworkId, address);
  },
  async isSIWXCloseDisabled() {
    var _a;
    const siwx = this.getSIWX();
    if (siwx) {
      const isApproveSignScreen = RouterController.state.view === "ApproveTransaction";
      const isSiwxSignMessage = RouterController.state.view === "SIWXSignMessage";
      if (isApproveSignScreen || isSiwxSignMessage) {
        return ((_a = siwx.getRequired) == null ? void 0 : _a.call(siwx)) && (await this.getSessions()).length === 0;
      }
    }
    return false;
  },
  async universalProviderAuthenticate({ universalProvider, chains, methods }) {
    var _a, _b, _c;
    const siwx = SIWXUtil.getSIWX();
    const namespaces = new Set(chains.map((chain) => chain.split(":")[0]));
    if (!siwx || namespaces.size !== 1 || !namespaces.has("eip155")) {
      return false;
    }
    const siwxMessage = await siwx.createMessage({
      chainId: ((_a = ChainController.getActiveCaipNetwork()) == null ? void 0 : _a.caipNetworkId) || "",
      accountAddress: ""
    });
    const result = await universalProvider.authenticate({
      nonce: siwxMessage.nonce,
      domain: siwxMessage.domain,
      uri: siwxMessage.uri,
      exp: siwxMessage.expirationTime,
      iat: siwxMessage.issuedAt,
      nbf: siwxMessage.notBefore,
      requestId: siwxMessage.requestId,
      version: siwxMessage.version,
      resources: siwxMessage.resources,
      statement: siwxMessage.statement,
      chainId: siwxMessage.chainId,
      methods,
      // The first chainId is what is used for universal provider to build the message
      chains: [siwxMessage.chainId, ...chains.filter((chain) => chain !== siwxMessage.chainId)]
    });
    SnackController.showLoading("Authenticating...", { autoClose: false });
    AccountController.setConnectedWalletInfo({
      ...result.session.peer.metadata,
      name: result.session.peer.metadata.name,
      icon: (_b = result.session.peer.metadata.icons) == null ? void 0 : _b[0],
      type: "WALLET_CONNECT"
    }, Array.from(namespaces)[0]);
    if ((_c = result == null ? void 0 : result.auths) == null ? void 0 : _c.length) {
      const sessions = result.auths.map((cacao) => {
        const message = universalProvider.client.formatAuthMessage({
          request: cacao.p,
          iss: cacao.p.iss
        });
        return {
          data: {
            ...cacao.p,
            accountAddress: cacao.p.iss.split(":").slice(-1).join(""),
            chainId: cacao.p.iss.split(":").slice(2, 4).join(":"),
            uri: cacao.p.aud,
            version: cacao.p.version || siwxMessage.version,
            expirationTime: cacao.p.exp,
            issuedAt: cacao.p.iat,
            notBefore: cacao.p.nbf
          },
          message,
          signature: cacao.s.s,
          cacao
        };
      });
      try {
        await siwx.setSessions(sessions);
        EventsController.sendEvent({
          type: "track",
          event: "SIWX_AUTH_SUCCESS",
          properties: SIWXUtil.getSIWXEventProperties()
        });
      } catch (error) {
        console.error("SIWX:universalProviderAuth - failed to set sessions", error);
        EventsController.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: SIWXUtil.getSIWXEventProperties()
        });
        await universalProvider.disconnect().catch(console.error);
        throw error;
      } finally {
        SnackController.hide();
      }
    }
    return true;
  },
  getSIWXEventProperties() {
    var _a;
    return {
      network: ((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId) || "",
      isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
    };
  },
  async clearSessions() {
    const siwx = this.getSIWX();
    if (siwx) {
      await siwx.setSessions([]);
    }
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TransactionsController.js
var state9 = proxy({
  transactions: [],
  coinbaseTransactions: {},
  transactionsByYear: {},
  lastNetworkInView: void 0,
  loading: false,
  empty: false,
  next: void 0
});
var TransactionsController = {
  state: state9,
  subscribe(callback) {
    return subscribe(state9, () => callback(state9));
  },
  setLastNetworkInView(lastNetworkInView) {
    state9.lastNetworkInView = lastNetworkInView;
  },
  async fetchTransactions(accountAddress, onramp) {
    var _a;
    if (!accountAddress) {
      throw new Error("Transactions can't be fetched without an accountAddress");
    }
    state9.loading = true;
    try {
      const response = await BlockchainApiController.fetchTransactions({
        account: accountAddress,
        cursor: state9.next,
        onramp,
        // Coinbase transaction history state updates require the latest data
        cache: onramp === "coinbase" ? "no-cache" : void 0,
        chainId: (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId
      });
      const nonSpamTransactions = this.filterSpamTransactions(response.data);
      const sameChainTransactions = this.filterByConnectedChain(nonSpamTransactions);
      const filteredTransactions = [...state9.transactions, ...sameChainTransactions];
      state9.loading = false;
      if (onramp === "coinbase") {
        state9.coinbaseTransactions = this.groupTransactionsByYearAndMonth(state9.coinbaseTransactions, response.data);
      } else {
        state9.transactions = filteredTransactions;
        state9.transactionsByYear = this.groupTransactionsByYearAndMonth(state9.transactionsByYear, sameChainTransactions);
      }
      state9.empty = filteredTransactions.length === 0;
      state9.next = response.next ? response.next : void 0;
    } catch (error) {
      EventsController.sendEvent({
        type: "track",
        event: "ERROR_FETCH_TRANSACTIONS",
        properties: {
          address: accountAddress,
          projectId: OptionsController.state.projectId,
          cursor: state9.next,
          isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      SnackController.showError("Failed to fetch transactions");
      state9.loading = false;
      state9.empty = true;
      state9.next = void 0;
    }
  },
  groupTransactionsByYearAndMonth(transactionsMap = {}, transactions = []) {
    const grouped = transactionsMap;
    transactions.forEach((transaction) => {
      const year = new Date(transaction.metadata.minedAt).getFullYear();
      const month = new Date(transaction.metadata.minedAt).getMonth();
      const yearTransactions = grouped[year] ?? {};
      const monthTransactions = yearTransactions[month] ?? [];
      const newMonthTransactions = monthTransactions.filter((tx) => tx.id !== transaction.id);
      grouped[year] = {
        ...yearTransactions,
        [month]: [...newMonthTransactions, transaction].sort((a3, b4) => new Date(b4.metadata.minedAt).getTime() - new Date(a3.metadata.minedAt).getTime())
      };
    });
    return grouped;
  },
  filterSpamTransactions(transactions) {
    return transactions.filter((transaction) => {
      const isAllSpam = transaction.transfers.every((transfer) => {
        var _a;
        return ((_a = transfer.nft_info) == null ? void 0 : _a.flags.is_spam) === true;
      });
      return !isAllSpam;
    });
  },
  filterByConnectedChain(transactions) {
    var _a;
    const chainId = (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId;
    const filteredTransactions = transactions.filter((transaction) => transaction.metadata.chain === chainId);
    return filteredTransactions;
  },
  clearCursor() {
    state9.next = void 0;
  },
  resetTransactions() {
    state9.transactions = [];
    state9.transactionsByYear = {};
    state9.lastNetworkInView = void 0;
    state9.loading = false;
    state9.empty = false;
    state9.next = void 0;
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js
var state10 = proxy({
  wcError: false,
  buffering: false,
  status: "disconnected"
});
var wcConnectionPromise;
var ConnectionController = {
  state: state10,
  subscribeKey(key, callback) {
    return subscribeKey(state10, key, callback);
  },
  _getClient() {
    return state10._client;
  },
  setClient(client) {
    state10._client = ref(client);
  },
  async connectWalletConnect() {
    var _a, _b, _c, _d;
    if (CoreHelperUtil.isTelegram() || CoreHelperUtil.isSafari() && CoreHelperUtil.isIos()) {
      if (wcConnectionPromise) {
        await wcConnectionPromise;
        wcConnectionPromise = void 0;
        return;
      }
      if (!CoreHelperUtil.isPairingExpired(state10 == null ? void 0 : state10.wcPairingExpiry)) {
        const link = state10.wcUri;
        state10.wcUri = link;
        return;
      }
      wcConnectionPromise = (_b = (_a = this._getClient()) == null ? void 0 : _a.connectWalletConnect) == null ? void 0 : _b.call(_a).catch(() => void 0);
      this.state.status = "connecting";
      await wcConnectionPromise;
      wcConnectionPromise = void 0;
      state10.wcPairingExpiry = void 0;
      this.state.status = "connected";
    } else {
      await ((_d = (_c = this._getClient()) == null ? void 0 : _c.connectWalletConnect) == null ? void 0 : _d.call(_c));
    }
  },
  async connectExternal(options, chain, setChain = true) {
    var _a, _b;
    await ((_b = (_a = this._getClient()) == null ? void 0 : _a.connectExternal) == null ? void 0 : _b.call(_a, options));
    if (setChain) {
      ChainController.setActiveNamespace(chain);
    }
  },
  async reconnectExternal(options) {
    var _a, _b;
    await ((_b = (_a = this._getClient()) == null ? void 0 : _a.reconnectExternal) == null ? void 0 : _b.call(_a, options));
    const namespace = options.chain || ChainController.state.activeChain;
    if (namespace) {
      ConnectorController.setConnectorId(options.id, namespace);
    }
  },
  async setPreferredAccountType(accountType) {
    var _a;
    ModalController.setLoading(true, ChainController.state.activeChain);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector) {
      return;
    }
    await (authConnector == null ? void 0 : authConnector.provider.setPreferredAccount(accountType));
    await this.reconnectExternal(authConnector);
    ModalController.setLoading(false, ChainController.state.activeChain);
    EventsController.sendEvent({
      type: "track",
      event: "SET_PREFERRED_ACCOUNT_TYPE",
      properties: {
        accountType,
        network: ((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId) || ""
      }
    });
  },
  async signMessage(message) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.signMessage(message);
  },
  parseUnits(value, decimals) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.parseUnits(value, decimals);
  },
  formatUnits(value, decimals) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.formatUnits(value, decimals);
  },
  async sendTransaction(args) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.sendTransaction(args);
  },
  async getCapabilities(params) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.getCapabilities(params);
  },
  async grantPermissions(params) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.grantPermissions(params);
  },
  async walletGetAssets(params) {
    var _a;
    return ((_a = this._getClient()) == null ? void 0 : _a.walletGetAssets(params)) ?? {};
  },
  async estimateGas(args) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.estimateGas(args);
  },
  async writeContract(args) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.writeContract(args);
  },
  async getEnsAddress(value) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.getEnsAddress(value);
  },
  async getEnsAvatar(value) {
    var _a;
    return (_a = this._getClient()) == null ? void 0 : _a.getEnsAvatar(value);
  },
  checkInstalled(ids) {
    var _a, _b;
    return ((_b = (_a = this._getClient()) == null ? void 0 : _a.checkInstalled) == null ? void 0 : _b.call(_a, ids)) || false;
  },
  resetWcConnection() {
    state10.wcUri = void 0;
    state10.wcPairingExpiry = void 0;
    state10.wcLinking = void 0;
    state10.recentWallet = void 0;
    state10.status = "disconnected";
    TransactionsController.resetTransactions();
    StorageUtil.deleteWalletConnectDeepLink();
  },
  resetUri() {
    state10.wcUri = void 0;
    state10.wcPairingExpiry = void 0;
  },
  finalizeWcConnection() {
    var _a, _b;
    const { wcLinking, recentWallet } = ConnectionController.state;
    if (wcLinking) {
      StorageUtil.setWalletConnectDeepLink(wcLinking);
    }
    if (recentWallet) {
      StorageUtil.setAppKitRecent(recentWallet);
    }
    EventsController.sendEvent({
      type: "track",
      event: "CONNECT_SUCCESS",
      properties: {
        method: wcLinking ? "mobile" : "qrcode",
        name: ((_b = (_a = RouterController.state.data) == null ? void 0 : _a.wallet) == null ? void 0 : _b.name) || "Unknown"
      }
    });
  },
  setWcBasic(wcBasic) {
    state10.wcBasic = wcBasic;
  },
  setUri(uri) {
    state10.wcUri = uri;
    state10.wcPairingExpiry = CoreHelperUtil.getPairingExpiry();
  },
  setWcLinking(wcLinking) {
    state10.wcLinking = wcLinking;
  },
  setWcError(wcError) {
    state10.wcError = wcError;
    state10.buffering = false;
  },
  setRecentWallet(wallet) {
    state10.recentWallet = wallet;
  },
  setBuffering(buffering) {
    state10.buffering = buffering;
  },
  setStatus(status) {
    state10.status = status;
  },
  async disconnect(namespace) {
    try {
      ModalController.setLoading(true, namespace);
      await SIWXUtil.clearSessions();
      await ChainController.disconnect(namespace);
      ModalController.setLoading(false, namespace);
      ConnectorController.setFilterByNamespace(void 0);
    } catch (error) {
      throw new Error("Failed to disconnect");
    }
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/PublicStateController.js
var state11 = proxy({
  loading: false,
  open: false,
  selectedNetworkId: void 0,
  activeChain: void 0,
  initialized: false
});
var PublicStateController = {
  state: state11,
  subscribe(callback) {
    return subscribe(state11, () => callback(state11));
  },
  set(newState) {
    Object.assign(state11, { ...state11, ...newState });
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js
var state12 = proxy({
  loading: false,
  loadingNamespaceMap: /* @__PURE__ */ new Map(),
  open: false,
  shake: false,
  namespace: void 0
});
var ModalController = {
  state: state12,
  subscribe(callback) {
    return subscribe(state12, () => callback(state12));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state12, key, callback);
  },
  async open(options) {
    var _a;
    const isConnected = AccountController.state.status === "connected";
    if (ConnectionController.state.wcBasic) {
      ApiController.prefetch({ fetchNetworkImages: false, fetchConnectorImages: false });
    } else {
      await ApiController.prefetch({
        fetchConnectorImages: !isConnected,
        fetchFeaturedWallets: !isConnected,
        fetchRecommendedWallets: !isConnected
      });
    }
    if (options == null ? void 0 : options.namespace) {
      await ChainController.switchActiveNamespace(options.namespace);
      ModalController.setLoading(true, options.namespace);
    } else {
      ModalController.setLoading(true);
    }
    ConnectorController.setFilterByNamespace(options == null ? void 0 : options.namespace);
    const caipAddress = (_a = ChainController.getAccountData(options == null ? void 0 : options.namespace)) == null ? void 0 : _a.caipAddress;
    const hasNoAdapters = ChainController.state.noAdapters;
    if (hasNoAdapters && !caipAddress) {
      if (CoreHelperUtil.isMobile()) {
        RouterController.reset("AllWallets");
      } else {
        RouterController.reset("ConnectingWalletConnectBasic");
      }
    } else if (options == null ? void 0 : options.view) {
      RouterController.reset(options.view);
    } else if (caipAddress) {
      RouterController.reset("Account");
    } else {
      RouterController.reset("Connect");
    }
    state12.open = true;
    PublicStateController.set({ open: true });
    EventsController.sendEvent({
      type: "track",
      event: "MODAL_OPEN",
      properties: { connected: Boolean(caipAddress) }
    });
  },
  close() {
    const isEmbeddedEnabled = OptionsController.state.enableEmbedded;
    const isConnected = Boolean(ChainController.state.activeCaipAddress);
    if (state12.open) {
      EventsController.sendEvent({
        type: "track",
        event: "MODAL_CLOSE",
        properties: { connected: isConnected }
      });
    }
    state12.open = false;
    ModalController.clearLoading();
    if (isEmbeddedEnabled) {
      if (isConnected) {
        RouterController.replace("Account");
      } else {
        RouterController.push("Connect");
      }
    } else {
      PublicStateController.set({ open: false });
    }
    ConnectionController.resetUri();
  },
  setLoading(loading, namespace) {
    if (namespace) {
      state12.loadingNamespaceMap.set(namespace, loading);
    }
    state12.loading = loading;
    PublicStateController.set({ loading });
  },
  clearLoading() {
    state12.loadingNamespaceMap.clear();
    state12.loading = false;
  },
  shake() {
    if (state12.shake) {
      return;
    }
    state12.shake = true;
    setTimeout(() => {
      state12.shake = false;
    }, 500);
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var state13 = proxy({
  view: "Connect",
  history: ["Connect"],
  transactionStack: []
});
var RouterController = {
  state: state13,
  subscribeKey(key, callback) {
    return subscribeKey(state13, key, callback);
  },
  pushTransactionStack(action) {
    state13.transactionStack.push(action);
  },
  popTransactionStack(cancel) {
    var _a, _b;
    const action = state13.transactionStack.pop();
    if (!action) {
      return;
    }
    if (cancel) {
      this.goBack();
      (_a = action == null ? void 0 : action.onCancel) == null ? void 0 : _a.call(action);
    } else {
      if (action.goBack) {
        this.goBack();
      } else if (action.replace) {
        const history = state13.history;
        const connectingSiweIndex = history.indexOf("ConnectingSiwe");
        if (connectingSiweIndex > 0) {
          this.goBackToIndex(connectingSiweIndex - 1);
        } else {
          ModalController.close();
          state13.history = [];
        }
      } else if (action.view) {
        this.reset(action.view);
      }
      (_b = action == null ? void 0 : action.onSuccess) == null ? void 0 : _b.call(action);
    }
  },
  push(view, data) {
    if (view !== state13.view) {
      state13.view = view;
      state13.history.push(view);
      state13.data = data;
    }
  },
  reset(view, data) {
    state13.view = view;
    state13.history = [view];
    state13.data = data;
  },
  replace(view, data) {
    const lastView = state13.history.at(-1);
    const isSameView = lastView === view;
    if (!isSameView) {
      state13.view = view;
      state13.history[state13.history.length - 1] = view;
      state13.data = data;
    }
  },
  goBack() {
    var _a;
    const shouldReload = !ChainController.state.activeCaipAddress && this.state.view === "ConnectingFarcaster";
    if (state13.history.length > 1 && !state13.history.includes("UnsupportedChain")) {
      state13.history.pop();
      const [last] = state13.history.slice(-1);
      if (last) {
        state13.view = last;
      }
    } else {
      ModalController.close();
    }
    if ((_a = state13.data) == null ? void 0 : _a.wallet) {
      state13.data.wallet = void 0;
    }
    setTimeout(() => {
      var _a2, _b, _c;
      if (shouldReload) {
        AccountController.setFarcasterUrl(void 0, ChainController.state.activeChain);
        const authConnector = ConnectorController.getAuthConnector();
        (_a2 = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _a2.reload();
        const optionsState = snapshot(OptionsController.state);
        (_c = (_b = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _b.syncDappData) == null ? void 0 : _c.call(_b, {
          metadata: optionsState.metadata,
          sdkVersion: optionsState.sdkVersion,
          projectId: optionsState.projectId,
          sdkType: optionsState.sdkType
        });
      }
    }, 100);
  },
  goBackToIndex(historyIndex) {
    if (state13.history.length > 1) {
      state13.history = state13.history.slice(0, historyIndex + 1);
      const [last] = state13.history.slice(-1);
      if (last) {
        state13.view = last;
      }
    }
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js
var state14 = proxy({
  themeMode: "dark",
  themeVariables: {},
  w3mThemeVariables: void 0
});
var ThemeController = {
  state: state14,
  subscribe(callback) {
    return subscribe(state14, () => callback(state14));
  },
  setThemeMode(themeMode) {
    state14.themeMode = themeMode;
    try {
      const authConnector = ConnectorController.getAuthConnector();
      if (authConnector) {
        const themeVariables = ThemeController.getSnapshot().themeVariables;
        authConnector.provider.syncTheme({
          themeMode,
          themeVariables,
          w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  setThemeVariables(themeVariables) {
    state14.themeVariables = { ...state14.themeVariables, ...themeVariables };
    try {
      const authConnector = ConnectorController.getAuthConnector();
      if (authConnector) {
        const themeVariablesSnapshot = ThemeController.getSnapshot().themeVariables;
        authConnector.provider.syncTheme({
          themeVariables: themeVariablesSnapshot,
          w3mThemeVariables: getW3mThemeVariables(state14.themeVariables, state14.themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  getSnapshot() {
    return snapshot(state14);
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js
var defaultActiveConnectors = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0
};
var state15 = proxy({
  allConnectors: [],
  connectors: [],
  activeConnector: void 0,
  filterByNamespace: void 0,
  activeConnectorIds: { ...defaultActiveConnectors }
});
var ConnectorController = {
  state: state15,
  subscribe(callback) {
    return subscribe(state15, () => {
      callback(state15);
    });
  },
  subscribeKey(key, callback) {
    return subscribeKey(state15, key, callback);
  },
  initialize(namespaces) {
    namespaces.forEach((namespace) => {
      const connectorId = StorageUtil.getConnectedConnectorId(namespace);
      if (connectorId) {
        this.setConnectorId(connectorId, namespace);
      }
    });
  },
  setActiveConnector(connector) {
    if (connector) {
      state15.activeConnector = ref(connector);
    }
  },
  setConnectors(connectors) {
    const newConnectors = connectors.filter((newConnector) => !state15.allConnectors.some((existingConnector) => existingConnector.id === newConnector.id && this.getConnectorName(existingConnector.name) === this.getConnectorName(newConnector.name) && existingConnector.chain === newConnector.chain));
    newConnectors.forEach((connector) => {
      if (connector.type !== "MULTI_CHAIN") {
        state15.allConnectors.push(ref(connector));
      }
    });
    state15.connectors = this.mergeMultiChainConnectors(state15.allConnectors);
  },
  removeAdapter(namespace) {
    state15.allConnectors = state15.allConnectors.filter((connector) => connector.chain !== namespace);
    state15.connectors = this.mergeMultiChainConnectors(state15.allConnectors);
  },
  mergeMultiChainConnectors(connectors) {
    const connectorsByNameMap = this.generateConnectorMapByName(connectors);
    const mergedConnectors = [];
    connectorsByNameMap.forEach((keyConnectors) => {
      const firstItem = keyConnectors[0];
      const isAuthConnector = (firstItem == null ? void 0 : firstItem.id) === ConstantsUtil.CONNECTOR_ID.AUTH;
      if (keyConnectors.length > 1 && firstItem) {
        mergedConnectors.push({
          name: firstItem.name,
          imageUrl: firstItem.imageUrl,
          imageId: firstItem.imageId,
          connectors: [...keyConnectors],
          type: isAuthConnector ? "AUTH" : "MULTI_CHAIN",
          // These values are just placeholders, we don't use them in multi-chain connector select screen
          chain: "eip155",
          id: (firstItem == null ? void 0 : firstItem.id) || ""
        });
      } else if (firstItem) {
        mergedConnectors.push(firstItem);
      }
    });
    return mergedConnectors;
  },
  generateConnectorMapByName(connectors) {
    const connectorsByNameMap = /* @__PURE__ */ new Map();
    connectors.forEach((connector) => {
      const { name: name2 } = connector;
      const connectorName = this.getConnectorName(name2);
      if (!connectorName) {
        return;
      }
      const connectorsByName = connectorsByNameMap.get(connectorName) || [];
      const haveSameConnector = connectorsByName.find((c7) => c7.chain === connector.chain);
      if (!haveSameConnector) {
        connectorsByName.push(connector);
      }
      connectorsByNameMap.set(connectorName, connectorsByName);
    });
    return connectorsByNameMap;
  },
  getConnectorName(name2) {
    if (!name2) {
      return name2;
    }
    const nameOverrideMap = {
      "Trust Wallet": "Trust"
    };
    return nameOverrideMap[name2] || name2;
  },
  getUniqueConnectorsByName(connectors) {
    const uniqueConnectors = [];
    connectors.forEach((c7) => {
      if (!uniqueConnectors.find((uc) => uc.chain === c7.chain)) {
        uniqueConnectors.push(c7);
      }
    });
    return uniqueConnectors;
  },
  addConnector(connector) {
    var _a, _b, _c;
    if (connector.id === ConstantsUtil.CONNECTOR_ID.AUTH) {
      const authConnector = connector;
      const optionsState = snapshot(OptionsController.state);
      const themeMode = ThemeController.getSnapshot().themeMode;
      const themeVariables = ThemeController.getSnapshot().themeVariables;
      (_b = (_a = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _a.syncDappData) == null ? void 0 : _b.call(_a, {
        metadata: optionsState.metadata,
        sdkVersion: optionsState.sdkVersion,
        projectId: optionsState.projectId,
        sdkType: optionsState.sdkType
      });
      (_c = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _c.syncTheme({
        themeMode,
        themeVariables,
        w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
      });
      this.setConnectors([connector]);
    } else {
      this.setConnectors([connector]);
    }
  },
  getAuthConnector(chainNamespace) {
    var _a;
    const activeNamespace = chainNamespace || ChainController.state.activeChain;
    const authConnector = state15.connectors.find((c7) => c7.id === ConstantsUtil.CONNECTOR_ID.AUTH);
    if (!authConnector) {
      return void 0;
    }
    if ((_a = authConnector == null ? void 0 : authConnector.connectors) == null ? void 0 : _a.length) {
      const connector = authConnector.connectors.find((c7) => c7.chain === activeNamespace);
      return connector;
    }
    return authConnector;
  },
  getAnnouncedConnectorRdns() {
    return state15.connectors.filter((c7) => c7.type === "ANNOUNCED").map((c7) => {
      var _a;
      return (_a = c7.info) == null ? void 0 : _a.rdns;
    });
  },
  getConnectorById(id) {
    return state15.allConnectors.find((c7) => c7.id === id);
  },
  getConnector(id, rdns) {
    const connectorsByNamespace = state15.allConnectors.filter((c7) => c7.chain === ChainController.state.activeChain);
    return connectorsByNamespace.find((c7) => {
      var _a;
      return c7.explorerId === id || ((_a = c7.info) == null ? void 0 : _a.rdns) === rdns;
    });
  },
  syncIfAuthConnector(connector) {
    var _a, _b;
    if (connector.id !== "ID_AUTH") {
      return;
    }
    const authConnector = connector;
    const optionsState = snapshot(OptionsController.state);
    const themeMode = ThemeController.getSnapshot().themeMode;
    const themeVariables = ThemeController.getSnapshot().themeVariables;
    (_b = (_a = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _a.syncDappData) == null ? void 0 : _b.call(_a, {
      metadata: optionsState.metadata,
      sdkVersion: optionsState.sdkVersion,
      sdkType: optionsState.sdkType,
      projectId: optionsState.projectId
    });
    authConnector.provider.syncTheme({
      themeMode,
      themeVariables,
      w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
    });
  },
  /**
   * Returns the connectors filtered by namespace.
   * @param namespace - The namespace to filter the connectors by.
   * @returns ConnectorWithProviders[].
   */
  getConnectorsByNamespace(namespace) {
    const namespaceConnectors = state15.allConnectors.filter((connector) => connector.chain === namespace);
    return this.mergeMultiChainConnectors(namespaceConnectors);
  },
  selectWalletConnector(wallet) {
    const connector = ConnectorController.getConnector(wallet.id, wallet.rdns);
    if (ChainController.state.activeChain === ConstantsUtil.CHAIN.SOLANA) {
      MobileWalletUtil.handleSolanaDeeplinkRedirect((connector == null ? void 0 : connector.name) || wallet.name || "");
    }
    if (connector) {
      RouterController.push("ConnectingExternal", { connector });
    } else {
      RouterController.push("ConnectingWalletConnect", { wallet });
    }
  },
  /**
   * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
   * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
   * @returns ConnectorWithProviders[].
   */
  getConnectors(namespace) {
    if (namespace) {
      return this.getConnectorsByNamespace(namespace);
    }
    return this.mergeMultiChainConnectors(state15.allConnectors);
  },
  /**
   * Sets the filter by namespace and updates the connectors.
   * @param namespace - The namespace to filter the connectors by.
   */
  setFilterByNamespace(namespace) {
    state15.filterByNamespace = namespace;
    state15.connectors = this.getConnectors(namespace);
    ApiController.setFilterByNamespace(namespace);
  },
  setConnectorId(connectorId, namespace) {
    if (connectorId) {
      state15.activeConnectorIds = {
        ...state15.activeConnectorIds,
        [namespace]: connectorId
      };
      StorageUtil.setConnectedConnectorId(namespace, connectorId);
    }
  },
  removeConnectorId(namespace) {
    state15.activeConnectorIds = {
      ...state15.activeConnectorIds,
      [namespace]: void 0
    };
    StorageUtil.deleteConnectedConnectorId(namespace);
  },
  getConnectorId(namespace) {
    if (!namespace) {
      return void 0;
    }
    return state15.activeConnectorIds[namespace];
  },
  isConnected(namespace) {
    if (!namespace) {
      return Object.values(state15.activeConnectorIds).some((id) => Boolean(id));
    }
    return Boolean(state15.activeConnectorIds[namespace]);
  },
  resetConnectorIds() {
    state15.activeConnectorIds = { ...defaultActiveConnectors };
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectorControllerUtil.js
function checkNamespaceConnectorId(namespace, connectorId) {
  return ConnectorController.getConnectorId(namespace) === connectorId;
}

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js
function getChainsToDisconnect(namespace) {
  const namespaces = Array.from(ChainController.state.chains.keys());
  let chains = [];
  if (namespace) {
    chains.push([namespace, ChainController.state.chains.get(namespace)]);
    if (checkNamespaceConnectorId(namespace, ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT)) {
      namespaces.forEach((ns) => {
        if (ns !== namespace && checkNamespaceConnectorId(ns, ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT)) {
          chains.push([ns, ChainController.state.chains.get(ns)]);
        }
      });
    } else if (checkNamespaceConnectorId(namespace, ConstantsUtil.CONNECTOR_ID.AUTH)) {
      namespaces.forEach((ns) => {
        if (ns !== namespace && checkNamespaceConnectorId(ns, ConstantsUtil.CONNECTOR_ID.AUTH)) {
          chains.push([ns, ChainController.state.chains.get(ns)]);
        }
      });
    }
  } else {
    chains = Array.from(ChainController.state.chains.entries());
  }
  return chains;
}

// node_modules/viem/_esm/utils/encoding/toRlp.js
function toRlp2(bytes, to2 = "hex") {
  const encodable = getEncodable(bytes);
  const cursor = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (to2 === "hex")
    return bytesToHex(cursor.bytes);
  return cursor.bytes;
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x5) => getEncodable(x5)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x5) => acc + x5.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length2 = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length: length2,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode: encode11 } of list) {
        encode11(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length2 = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length: length2,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length2) {
  if (length2 < 2 ** 8)
    return 1;
  if (length2 < 2 ** 16)
    return 2;
  if (length2 < 2 ** 24)
    return 3;
  if (length2 < 2 ** 32)
    return 4;
  throw new BaseError("Length is too large.");
}

// node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType2 = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction2(transaction) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber2(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber2(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType2[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList2(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var defineTransaction2 = defineFormatter2("transaction", formatTransaction2);
function formatAuthorizationList2(authorizationList) {
  return authorizationList.map((authorization) => ({
    address: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// node_modules/viem/_esm/utils/formatters/block.js
function formatBlock2(block) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction2(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
var defineBlock2 = defineFormatter2("block", formatBlock2);

// node_modules/viem/_esm/actions/public/getTransactionCount.js
async function getTransactionCount2(client, { address, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [
      address,
      typeof blockNumber === "bigint" ? numberToHex2(blockNumber) : blockTag
    ]
  }, {
    dedupe: Boolean(blockNumber)
  });
  return hexToNumber2(count);
}

// node_modules/viem/_esm/utils/blob/blobsToCommitments.js
function blobsToCommitments2(parameters) {
  const { kzg } = parameters;
  const to2 = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x5) => hexToBytes(x5)) : parameters.blobs;
  const commitments = [];
  for (const blob of blobs)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
  return to2 === "bytes" ? commitments : commitments.map((x5) => bytesToHex(x5));
}

// node_modules/viem/_esm/utils/blob/blobsToProofs.js
function blobsToProofs2(parameters) {
  const { kzg } = parameters;
  const to2 = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x5) => hexToBytes(x5)) : parameters.blobs;
  const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x5) => hexToBytes(x5)) : parameters.commitments;
  const proofs = [];
  for (let i5 = 0; i5 < blobs.length; i5++) {
    const blob = blobs[i5];
    const commitment = commitments[i5];
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
  }
  return to2 === "bytes" ? proofs : proofs.map((x5) => bytesToHex(x5));
}

// node_modules/viem/_esm/utils/hash/sha256.js
init_sha256();
function sha2565(value, to_) {
  const to2 = to_ || "hex";
  const bytes = sha256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to2 === "bytes")
    return bytes;
  return toHex(bytes);
}

// node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
function commitmentToVersionedHash2(parameters) {
  const { commitment, version: version3 = 1 } = parameters;
  const to2 = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
  const versionedHash = sha2565(commitment, "bytes");
  versionedHash.set([version3], 0);
  return to2 === "bytes" ? versionedHash : bytesToHex(versionedHash);
}

// node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
function commitmentsToVersionedHashes2(parameters) {
  const { commitments, version: version3 } = parameters;
  const to2 = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
  const hashes2 = [];
  for (const commitment of commitments) {
    hashes2.push(commitmentToVersionedHash2({
      commitment,
      to: to2,
      version: version3
    }));
  }
  return hashes2;
}

// node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction2 = 6;
var bytesPerFieldElement2 = 32;
var fieldElementsPerBlob2 = 4096;
var bytesPerBlob2 = bytesPerFieldElement2 * fieldElementsPerBlob2;
var maxBytesPerTransaction2 = bytesPerBlob2 * blobsPerTransaction2 - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob2 * blobsPerTransaction2;

// node_modules/viem/_esm/constants/kzg.js
var versionedHashVersionKzg2 = 1;

// node_modules/viem/_esm/errors/blob.js
var BlobSizeTooLargeError2 = class extends BaseError {
  constructor({ maxSize, size: size8 }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size8} bytes`],
      name: "BlobSizeTooLargeError"
    });
  }
};
var EmptyBlobError2 = class extends BaseError {
  constructor() {
    super("Blob data must not be empty.", { name: "EmptyBlobError" });
  }
};
var InvalidVersionedHashSizeError2 = class extends BaseError {
  constructor({ hash, size: size8 }) {
    super(`Versioned hash "${hash}" size is invalid.`, {
      metaMessages: ["Expected: 32", `Received: ${size8}`],
      name: "InvalidVersionedHashSizeError"
    });
  }
};
var InvalidVersionedHashVersionError2 = class extends BaseError {
  constructor({ hash, version: version3 }) {
    super(`Versioned hash "${hash}" version is invalid.`, {
      metaMessages: [
        `Expected: ${versionedHashVersionKzg2}`,
        `Received: ${version3}`
      ],
      name: "InvalidVersionedHashVersionError"
    });
  }
};

// node_modules/viem/_esm/utils/blob/toBlobs.js
function toBlobs2(parameters) {
  const to2 = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
  const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
  const size_ = size(data);
  if (!size_)
    throw new EmptyBlobError2();
  if (size_ > maxBytesPerTransaction2)
    throw new BlobSizeTooLargeError2({
      maxSize: maxBytesPerTransaction2,
      size: size_
    });
  const blobs = [];
  let active = true;
  let position = 0;
  while (active) {
    const blob = createCursor(new Uint8Array(bytesPerBlob2));
    let size8 = 0;
    while (size8 < fieldElementsPerBlob2) {
      const bytes = data.slice(position, position + (bytesPerFieldElement2 - 1));
      blob.pushByte(0);
      blob.pushBytes(bytes);
      if (bytes.length < 31) {
        blob.pushByte(128);
        active = false;
        break;
      }
      size8++;
      position += 31;
    }
    blobs.push(blob);
  }
  return to2 === "bytes" ? blobs.map((x5) => x5.bytes) : blobs.map((x5) => bytesToHex(x5.bytes));
}

// node_modules/viem/_esm/utils/blob/toBlobSidecars.js
function toBlobSidecars2(parameters) {
  const { data, kzg, to: to2 } = parameters;
  const blobs = parameters.blobs ?? toBlobs2({ data, to: to2 });
  const commitments = parameters.commitments ?? blobsToCommitments2({ blobs, kzg, to: to2 });
  const proofs = parameters.proofs ?? blobsToProofs2({ blobs, commitments, kzg, to: to2 });
  const sidecars = [];
  for (let i5 = 0; i5 < blobs.length; i5++)
    sidecars.push({
      blob: blobs[i5],
      commitment: commitments[i5],
      proof: proofs[i5]
    });
  return sidecars;
}

// node_modules/viem/_esm/utils/transaction/getTransactionType.js
function getTransactionType2(transaction) {
  if (transaction.type)
    return transaction.type;
  if (typeof transaction.authorizationList !== "undefined")
    return "eip7702";
  if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
    return "eip4844";
  if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transaction.gasPrice !== "undefined") {
    if (typeof transaction.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction });
}

// node_modules/viem/_esm/utils/formatters/log.js
function formatLog2(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/viem/_esm/utils/wait.js
async function wait2(time) {
  return new Promise((res) => setTimeout(res, time));
}

// node_modules/viem/_esm/errors/account.js
var AccountNotFoundError2 = class extends BaseError {
  constructor({ docsPath } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client."
    ].join("\n"), {
      docsPath,
      docsSlug: "account",
      name: "AccountNotFoundError"
    });
  }
};

// node_modules/viem/_esm/actions/wallet/sendTransaction.js
var supportsWalletNamespace2 = new LruMap2(128);

// node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses2 = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt2(transactionReceipt) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog2(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber2(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses2[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType2[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var defineTransactionReceipt2 = defineFormatter2("transactionReceipt", formatTransactionReceipt2);

// node_modules/viem/_esm/actions/wallet/sendCalls.js
var fallbackTransactionErrorMagicIdentifier = numberToHex2(0, {
  size: 32
});

// node_modules/viem/_esm/utils/uid.js
var size6 = 256;
var index = size6;
var buffer;
function uid2(length2 = 11) {
  if (!buffer || index + length2 > size6 * 2) {
    buffer = "";
    index = 0;
    for (let i5 = 0; i5 < size6; i5++) {
      buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
    }
  }
  return buffer.substring(index, index++ + length2);
}

// node_modules/viem/_esm/utils/promise/withDedupe.js
var promiseCache2 = new LruMap2(8192);
function withDedupe2(fn3, { enabled = true, id }) {
  if (!enabled || !id)
    return fn3();
  if (promiseCache2.get(id))
    return promiseCache2.get(id);
  const promise = fn3().finally(() => promiseCache2.delete(id));
  promiseCache2.set(id, promise);
  return promise;
}

// node_modules/viem/_esm/utils/promise/withRetry.js
function withRetry2(fn3, { delay: delay_ = 100, retryCount = 2, shouldRetry: shouldRetry2 = () => true } = {}) {
  return new Promise((resolve, reject) => {
    const attemptRetry = async ({ count = 0 } = {}) => {
      const retry = async ({ error }) => {
        const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
        if (delay)
          await wait2(delay);
        attemptRetry({ count: count + 1 });
      };
      try {
        const data = await fn3();
        resolve(data);
      } catch (err) {
        if (count < retryCount && await shouldRetry2({ count, error: err }))
          return retry({ error: err });
        reject(err);
      }
    };
    attemptRetry();
  });
}

// node_modules/viem/_esm/utils/buildRequest.js
function buildRequest2(request, options = {}) {
  return async (args, overrideOptions = {}) => {
    var _a;
    const { dedupe = false, methods, retryDelay = 150, retryCount = 3, uid: uid3 } = {
      ...options,
      ...overrideOptions
    };
    const { method } = args;
    if ((_a = methods == null ? void 0 : methods.exclude) == null ? void 0 : _a.includes(method))
      throw new MethodNotSupportedRpcError(new Error("method not supported"), {
        method
      });
    if ((methods == null ? void 0 : methods.include) && !methods.include.includes(method))
      throw new MethodNotSupportedRpcError(new Error("method not supported"), {
        method
      });
    const requestId = dedupe ? stringToHex(`${uid3}.${stringify(args)}`) : void 0;
    return withDedupe2(() => withRetry2(async () => {
      try {
        return await request(args);
      } catch (err_) {
        const err = err_;
        switch (err.code) {
          case ParseRpcError.code:
            throw new ParseRpcError(err);
          case InvalidRequestRpcError.code:
            throw new InvalidRequestRpcError(err);
          case MethodNotFoundRpcError.code:
            throw new MethodNotFoundRpcError(err, { method: args.method });
          case InvalidParamsRpcError.code:
            throw new InvalidParamsRpcError(err);
          case InternalRpcError.code:
            throw new InternalRpcError(err);
          case InvalidInputRpcError.code:
            throw new InvalidInputRpcError(err);
          case ResourceNotFoundRpcError.code:
            throw new ResourceNotFoundRpcError(err);
          case ResourceUnavailableRpcError.code:
            throw new ResourceUnavailableRpcError(err);
          case TransactionRejectedRpcError.code:
            throw new TransactionRejectedRpcError(err);
          case MethodNotSupportedRpcError.code:
            throw new MethodNotSupportedRpcError(err, {
              method: args.method
            });
          case LimitExceededRpcError.code:
            throw new LimitExceededRpcError(err);
          case JsonRpcVersionUnsupportedError.code:
            throw new JsonRpcVersionUnsupportedError(err);
          case UserRejectedRequestError.code:
            throw new UserRejectedRequestError(err);
          case UnauthorizedProviderError.code:
            throw new UnauthorizedProviderError(err);
          case UnsupportedProviderMethodError.code:
            throw new UnsupportedProviderMethodError(err);
          case ProviderDisconnectedError.code:
            throw new ProviderDisconnectedError(err);
          case ChainDisconnectedError.code:
            throw new ChainDisconnectedError(err);
          case SwitchChainError.code:
            throw new SwitchChainError(err);
          case UnsupportedNonOptionalCapabilityError.code:
            throw new UnsupportedNonOptionalCapabilityError(err);
          case UnsupportedChainIdError.code:
            throw new UnsupportedChainIdError(err);
          case DuplicateIdError.code:
            throw new DuplicateIdError(err);
          case UnknownBundleIdError.code:
            throw new UnknownBundleIdError(err);
          case BundleTooLargeError.code:
            throw new BundleTooLargeError(err);
          case AtomicReadyWalletRejectedUpgradeError.code:
            throw new AtomicReadyWalletRejectedUpgradeError(err);
          case AtomicityNotSupportedError.code:
            throw new AtomicityNotSupportedError(err);
          case 5e3:
            throw new UserRejectedRequestError(err);
          default:
            if (err_ instanceof BaseError)
              throw err_;
            throw new UnknownRpcError(err);
        }
      }
    }, {
      delay: ({ count, error }) => {
        var _a2;
        if (error && error instanceof HttpRequestError) {
          const retryAfter = (_a2 = error == null ? void 0 : error.headers) == null ? void 0 : _a2.get("Retry-After");
          if (retryAfter == null ? void 0 : retryAfter.match(/\d/))
            return Number.parseInt(retryAfter) * 1e3;
        }
        return ~~(1 << count) * retryDelay;
      },
      retryCount,
      shouldRetry: ({ error }) => shouldRetry(error)
    }), { enabled: dedupe, id: requestId });
  };
}
function shouldRetry(error) {
  if ("code" in error && typeof error.code === "number") {
    if (error.code === -1)
      return true;
    if (error.code === LimitExceededRpcError.code)
      return true;
    if (error.code === InternalRpcError.code)
      return true;
    return false;
  }
  if (error instanceof HttpRequestError && error.status) {
    if (error.status === 403)
      return true;
    if (error.status === 408)
      return true;
    if (error.status === 413)
      return true;
    if (error.status === 429)
      return true;
    if (error.status === 500)
      return true;
    if (error.status === 502)
      return true;
    if (error.status === 503)
      return true;
    if (error.status === 504)
      return true;
    return false;
  }
  return true;
}

// node_modules/viem/_esm/clients/transports/createTransport.js
function createTransport2({ key, methods, name: name2, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
  const uid3 = uid2();
  return {
    config: {
      key,
      methods,
      name: name2,
      request,
      retryCount,
      retryDelay,
      timeout,
      type
    },
    request: buildRequest2(request, { methods, retryCount, retryDelay, uid: uid3 }),
    value
  };
}

// node_modules/viem/_esm/clients/transports/fallback.js
function fallback2(transports_, config = {}) {
  const { key = "fallback", name: name2 = "Fallback", rank = false, shouldThrow: shouldThrow_ = shouldThrow, retryCount, retryDelay } = config;
  return ({ chain, pollingInterval = 4e3, timeout, ...rest }) => {
    let transports = transports_;
    let onResponse = () => {
    };
    const transport = createTransport2({
      key,
      name: name2,
      async request({ method, params }) {
        let includes;
        const fetch2 = async (i5 = 0) => {
          const transport2 = transports[i5]({
            ...rest,
            chain,
            retryCount: 0,
            timeout
          });
          try {
            const response = await transport2.request({
              method,
              params
            });
            onResponse({
              method,
              params,
              response,
              transport: transport2,
              status: "success"
            });
            return response;
          } catch (err) {
            onResponse({
              error: err,
              method,
              params,
              transport: transport2,
              status: "error"
            });
            if (shouldThrow_(err))
              throw err;
            if (i5 === transports.length - 1)
              throw err;
            includes ?? (includes = transports.slice(i5 + 1).some((transport3) => {
              const { include, exclude } = transport3({ chain }).config.methods || {};
              if (include)
                return include.includes(method);
              if (exclude)
                return !exclude.includes(method);
              return true;
            }));
            if (!includes)
              throw err;
            return fetch2(i5 + 1);
          }
        };
        return fetch2();
      },
      retryCount,
      retryDelay,
      type: "fallback"
    }, {
      onResponse: (fn3) => onResponse = fn3,
      transports: transports.map((fn3) => fn3({ chain, retryCount: 0 }))
    });
    if (rank) {
      const rankOptions = typeof rank === "object" ? rank : {};
      rankTransports({
        chain,
        interval: rankOptions.interval ?? pollingInterval,
        onTransports: (transports_2) => transports = transports_2,
        ping: rankOptions.ping,
        sampleCount: rankOptions.sampleCount,
        timeout: rankOptions.timeout,
        transports,
        weights: rankOptions.weights
      });
    }
    return transport;
  };
}
function shouldThrow(error) {
  if ("code" in error && typeof error.code === "number") {
    if (error.code === TransactionRejectedRpcError.code || error.code === UserRejectedRequestError.code || ExecutionRevertedError.nodeMessage.test(error.message) || error.code === 5e3)
      return true;
  }
  return false;
}
function rankTransports({ chain, interval = 4e3, onTransports, ping, sampleCount = 10, timeout = 1e3, transports, weights = {} }) {
  const { stability: stabilityWeight = 0.7, latency: latencyWeight = 0.3 } = weights;
  const samples = [];
  const rankTransports_ = async () => {
    const sample = await Promise.all(transports.map(async (transport) => {
      const transport_ = transport({ chain, retryCount: 0, timeout });
      const start = Date.now();
      let end;
      let success;
      try {
        await (ping ? ping({ transport: transport_ }) : transport_.request({ method: "net_listening" }));
        success = 1;
      } catch {
        success = 0;
      } finally {
        end = Date.now();
      }
      const latency = end - start;
      return { latency, success };
    }));
    samples.push(sample);
    if (samples.length > sampleCount)
      samples.shift();
    const maxLatency = Math.max(...samples.map((sample2) => Math.max(...sample2.map(({ latency }) => latency))));
    const scores = transports.map((_3, i5) => {
      const latencies = samples.map((sample2) => sample2[i5].latency);
      const meanLatency = latencies.reduce((acc, latency) => acc + latency, 0) / latencies.length;
      const latencyScore = 1 - meanLatency / maxLatency;
      const successes = samples.map((sample2) => sample2[i5].success);
      const stabilityScore = successes.reduce((acc, success) => acc + success, 0) / successes.length;
      if (stabilityScore === 0)
        return [0, i5];
      return [
        latencyWeight * latencyScore + stabilityWeight * stabilityScore,
        i5
      ];
    }).sort((a3, b4) => b4[0] - a3[0]);
    onTransports(scores.map(([, i5]) => transports[i5]));
    await wait2(interval);
    rankTransports_();
  };
  rankTransports_();
}

// node_modules/viem/_esm/errors/transport.js
var UrlRequiredError2 = class extends BaseError {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro",
      name: "UrlRequiredError"
    });
  }
};

// node_modules/viem/_esm/utils/promise/withTimeout.js
function withTimeout2(fn3, { errorInstance = new Error("timed out"), timeout, signal }) {
  return new Promise((resolve, reject) => {
    ;
    (async () => {
      let timeoutId;
      try {
        const controller = new AbortController();
        if (timeout > 0) {
          timeoutId = setTimeout(() => {
            if (signal) {
              controller.abort();
            } else {
              reject(errorInstance);
            }
          }, timeout);
        }
        resolve(await fn3({ signal: (controller == null ? void 0 : controller.signal) || null }));
      } catch (err) {
        if ((err == null ? void 0 : err.name) === "AbortError")
          reject(errorInstance);
        reject(err);
      } finally {
        clearTimeout(timeoutId);
      }
    })();
  });
}

// node_modules/viem/_esm/utils/rpc/id.js
function createIdStore2() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache2 = createIdStore2();

// node_modules/viem/_esm/utils/rpc/http.js
function getHttpRpcClient2(url, options = {}) {
  return {
    async request(params) {
      var _a;
      const { body, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
      const fetchOptions = {
        ...options.fetchOptions ?? {},
        ...params.fetchOptions ?? {}
      };
      const { headers, method, signal: signal_ } = fetchOptions;
      try {
        const response = await withTimeout2(async ({ signal }) => {
          const init = {
            ...fetchOptions,
            body: Array.isArray(body) ? stringify(body.map((body2) => ({
              jsonrpc: "2.0",
              id: body2.id ?? idCache2.take(),
              ...body2
            }))) : stringify({
              jsonrpc: "2.0",
              id: body.id ?? idCache2.take(),
              ...body
            }),
            headers: {
              "Content-Type": "application/json",
              ...headers
            },
            method: method || "POST",
            signal: signal_ || (timeout > 0 ? signal : null)
          };
          const request = new Request(url, init);
          const args = await (onRequest == null ? void 0 : onRequest(request, init)) ?? { ...init, url };
          const response2 = await fetch(args.url ?? url, args);
          return response2;
        }, {
          errorInstance: new TimeoutError({ body, url }),
          timeout,
          signal: true
        });
        if (onResponse)
          await onResponse(response);
        let data;
        if ((_a = response.headers.get("Content-Type")) == null ? void 0 : _a.startsWith("application/json"))
          data = await response.json();
        else {
          data = await response.text();
          try {
            data = JSON.parse(data || "{}");
          } catch (err) {
            if (response.ok)
              throw err;
            data = { error: data };
          }
        }
        if (!response.ok) {
          throw new HttpRequestError({
            body,
            details: stringify(data.error) || response.statusText,
            headers: response.headers,
            status: response.status,
            url
          });
        }
        return data;
      } catch (err) {
        if (err instanceof HttpRequestError)
          throw err;
        if (err instanceof TimeoutError)
          throw err;
        throw new HttpRequestError({
          body,
          cause: err,
          url
        });
      }
    }
  };
}

// node_modules/viem/_esm/clients/transports/http.js
function http2(url, config = {}) {
  const { batch, fetchOptions, key = "http", methods, name: name2 = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay, raw } = config;
  return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
    const { batchSize = 1e3, wait: wait3 = 0 } = typeof batch === "object" ? batch : {};
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || (chain == null ? void 0 : chain.rpcUrls.default.http[0]);
    if (!url_)
      throw new UrlRequiredError2();
    const rpcClient = getHttpRpcClient2(url_, {
      fetchOptions,
      onRequest: onFetchRequest,
      onResponse: onFetchResponse,
      timeout
    });
    return createTransport2({
      key,
      methods,
      name: name2,
      async request({ method, params }) {
        const body = { method, params };
        const { schedule } = createBatchScheduler({
          id: url_,
          wait: wait3,
          shouldSplitBatch(requests) {
            return requests.length > batchSize;
          },
          fn: (body2) => rpcClient.request({
            body: body2
          }),
          sort: (a3, b4) => a3.id - b4.id
        });
        const fn3 = async (body2) => batch ? schedule(body2) : [
          await rpcClient.request({
            body: body2
          })
        ];
        const [{ error, result }] = await fn3(body);
        if (raw)
          return { error, result };
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "http"
    }, {
      fetchOptions,
      url: url_
    });
  };
}

// node_modules/viem/_esm/utils/chain/defineChain.js
function defineChain2(chain) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...chain
  };
}

// node_modules/viem/_esm/utils/transaction/assertTransaction.js
function assertTransactionEIP77022(transaction) {
  const { authorizationList } = transaction;
  if (authorizationList) {
    for (const authorization of authorizationList) {
      const { chainId } = authorization;
      const address = authorization.address;
      if (!isAddress(address))
        throw new InvalidAddressError({ address });
      if (chainId < 0)
        throw new InvalidChainIdError({ chainId });
    }
  }
  assertTransactionEIP15592(transaction);
}
function assertTransactionEIP48442(transaction) {
  const { blobVersionedHashes } = transaction;
  if (blobVersionedHashes) {
    if (blobVersionedHashes.length === 0)
      throw new EmptyBlobError2();
    for (const hash of blobVersionedHashes) {
      const size_ = size(hash);
      const version3 = hexToNumber2(slice(hash, 0, 1));
      if (size_ !== 32)
        throw new InvalidVersionedHashSizeError2({ hash, size: size_ });
      if (version3 !== versionedHashVersionKzg2)
        throw new InvalidVersionedHashVersionError2({
          hash,
          version: version3
        });
    }
  }
  assertTransactionEIP15592(transaction);
}
function assertTransactionEIP15592(transaction) {
  const { chainId, maxPriorityFeePerGas, maxFeePerGas, to: to2 } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to2 && !isAddress(to2))
    throw new InvalidAddressError({ address: to2 });
  if (maxFeePerGas && maxFeePerGas > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
function assertTransactionEIP29302(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to: to2 } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to2 && !isAddress(to2))
    throw new InvalidAddressError({ address: to2 });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function assertTransactionLegacy2(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to: to2 } = transaction;
  if (to2 && !isAddress(to2))
    throw new InvalidAddressError({ address: to2 });
  if (typeof chainId !== "undefined" && chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}

// node_modules/viem/_esm/utils/transaction/serializeAccessList.js
function serializeAccessList2(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const serializedAccessList = [];
  for (let i5 = 0; i5 < accessList.length; i5++) {
    const { address, storageKeys } = accessList[i5];
    for (let j3 = 0; j3 < storageKeys.length; j3++) {
      if (storageKeys[j3].length - 2 !== 64) {
        throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j3] });
      }
    }
    if (!isAddress(address, { strict: false })) {
      throw new InvalidAddressError({ address });
    }
    serializedAccessList.push([address, storageKeys]);
  }
  return serializedAccessList;
}

// node_modules/viem/_esm/utils/transaction/serializeTransaction.js
function serializeTransaction2(transaction, signature) {
  const type = getTransactionType2(transaction);
  if (type === "eip1559")
    return serializeTransactionEIP1559(transaction, signature);
  if (type === "eip2930")
    return serializeTransactionEIP2930(transaction, signature);
  if (type === "eip4844")
    return serializeTransactionEIP4844(transaction, signature);
  if (type === "eip7702")
    return serializeTransactionEIP7702(transaction, signature);
  return serializeTransactionLegacy(transaction, signature);
}
function serializeTransactionEIP7702(transaction, signature) {
  const { authorizationList, chainId, gas, nonce, to: to2, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP77022(transaction);
  const serializedAccessList = serializeAccessList2(accessList);
  const serializedAuthorizationList = serializeAuthorizationList2(authorizationList);
  return concatHex([
    "0x04",
    toRlp2([
      toHex(chainId),
      nonce ? toHex(nonce) : "0x",
      maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? toHex(maxFeePerGas) : "0x",
      gas ? toHex(gas) : "0x",
      to2 ?? "0x",
      value ? toHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      serializedAuthorizationList,
      ...toYParitySignatureArray2(transaction, signature)
    ])
  ]);
}
function serializeTransactionEIP4844(transaction, signature) {
  const { chainId, gas, nonce, to: to2, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP48442(transaction);
  let blobVersionedHashes = transaction.blobVersionedHashes;
  let sidecars = transaction.sidecars;
  if (transaction.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
    const blobs2 = typeof transaction.blobs[0] === "string" ? transaction.blobs : transaction.blobs.map((x5) => bytesToHex(x5));
    const kzg = transaction.kzg;
    const commitments2 = blobsToCommitments2({
      blobs: blobs2,
      kzg
    });
    if (typeof blobVersionedHashes === "undefined")
      blobVersionedHashes = commitmentsToVersionedHashes2({
        commitments: commitments2
      });
    if (typeof sidecars === "undefined") {
      const proofs2 = blobsToProofs2({ blobs: blobs2, commitments: commitments2, kzg });
      sidecars = toBlobSidecars2({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
    }
  }
  const serializedAccessList = serializeAccessList2(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to2 ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    maxFeePerBlobGas ? toHex(maxFeePerBlobGas) : "0x",
    blobVersionedHashes ?? [],
    ...toYParitySignatureArray2(transaction, signature)
  ];
  const blobs = [];
  const commitments = [];
  const proofs = [];
  if (sidecars)
    for (let i5 = 0; i5 < sidecars.length; i5++) {
      const { blob, commitment, proof } = sidecars[i5];
      blobs.push(blob);
      commitments.push(commitment);
      proofs.push(proof);
    }
  return concatHex([
    "0x03",
    sidecars ? (
      // If sidecars are enabled, envelope turns into a "wrapper":
      toRlp2([serializedTransaction, blobs, commitments, proofs])
    ) : (
      // If sidecars are disabled, standard envelope is used:
      toRlp2(serializedTransaction)
    )
  ]);
}
function serializeTransactionEIP1559(transaction, signature) {
  const { chainId, gas, nonce, to: to2, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP15592(transaction);
  const serializedAccessList = serializeAccessList2(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to2 ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray2(transaction, signature)
  ];
  return concatHex([
    "0x02",
    toRlp2(serializedTransaction)
  ]);
}
function serializeTransactionEIP2930(transaction, signature) {
  const { chainId, gas, data, nonce, to: to2, value, accessList, gasPrice } = transaction;
  assertTransactionEIP29302(transaction);
  const serializedAccessList = serializeAccessList2(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    gasPrice ? toHex(gasPrice) : "0x",
    gas ? toHex(gas) : "0x",
    to2 ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray2(transaction, signature)
  ];
  return concatHex([
    "0x01",
    toRlp2(serializedTransaction)
  ]);
}
function serializeTransactionLegacy(transaction, signature) {
  const { chainId = 0, gas, data, nonce, to: to2, value, gasPrice } = transaction;
  assertTransactionLegacy2(transaction);
  let serializedTransaction = [
    nonce ? toHex(nonce) : "0x",
    gasPrice ? toHex(gasPrice) : "0x",
    gas ? toHex(gas) : "0x",
    to2 ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x"
  ];
  if (signature) {
    const v5 = (() => {
      if (signature.v >= 35n) {
        const inferredChainId = (signature.v - 35n) / 2n;
        if (inferredChainId > 0)
          return signature.v;
        return 27n + (signature.v === 35n ? 0n : 1n);
      }
      if (chainId > 0)
        return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
      const v6 = 27n + (signature.v === 27n ? 0n : 1n);
      if (signature.v !== v6)
        throw new InvalidLegacyVError({ v: signature.v });
      return v6;
    })();
    const r3 = trim(signature.r);
    const s4 = trim(signature.s);
    serializedTransaction = [
      ...serializedTransaction,
      toHex(v5),
      r3 === "0x00" ? "0x" : r3,
      s4 === "0x00" ? "0x" : s4
    ];
  } else if (chainId > 0) {
    serializedTransaction = [
      ...serializedTransaction,
      toHex(chainId),
      "0x",
      "0x"
    ];
  }
  return toRlp2(serializedTransaction);
}
function toYParitySignatureArray2(transaction, signature_) {
  const signature = signature_ ?? transaction;
  const { v: v5, yParity } = signature;
  if (typeof signature.r === "undefined")
    return [];
  if (typeof signature.s === "undefined")
    return [];
  if (typeof v5 === "undefined" && typeof yParity === "undefined")
    return [];
  const r3 = trim(signature.r);
  const s4 = trim(signature.s);
  const yParity_ = (() => {
    if (typeof yParity === "number")
      return yParity ? toHex(1) : "0x";
    if (v5 === 0n)
      return "0x";
    if (v5 === 1n)
      return toHex(1);
    return v5 === 27n ? "0x" : toHex(1);
  })();
  return [yParity_, r3 === "0x00" ? "0x" : r3, s4 === "0x00" ? "0x" : s4];
}

// node_modules/viem/_esm/utils/authorization/serializeAuthorizationList.js
function serializeAuthorizationList2(authorizationList) {
  if (!authorizationList || authorizationList.length === 0)
    return [];
  const serializedAuthorizationList = [];
  for (const authorization of authorizationList) {
    const { chainId, nonce, ...signature } = authorization;
    const contractAddress = authorization.address;
    serializedAuthorizationList.push([
      chainId ? toHex(chainId) : "0x",
      contractAddress,
      nonce ? toHex(nonce) : "0x",
      ...toYParitySignatureArray2({}, signature)
    ]);
  }
  return serializedAuthorizationList;
}

// node_modules/@noble/hashes/esm/legacy.js
init_md();
init_utils();
var SHA1_IV = Uint32Array.from([
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
]);
var SHA1_W = new Uint32Array(80);
var SHA1 = class extends HashMD {
  constructor() {
    super(64, 20, 8, false);
    this.A = SHA1_IV[0] | 0;
    this.B = SHA1_IV[1] | 0;
    this.C = SHA1_IV[2] | 0;
    this.D = SHA1_IV[3] | 0;
    this.E = SHA1_IV[4] | 0;
  }
  get() {
    const { A: A2, B: B3, C: C5, D, E: E3 } = this;
    return [A2, B3, C5, D, E3];
  }
  set(A2, B3, C5, D, E3) {
    this.A = A2 | 0;
    this.B = B3 | 0;
    this.C = C5 | 0;
    this.D = D | 0;
    this.E = E3 | 0;
  }
  process(view, offset) {
    for (let i5 = 0; i5 < 16; i5++, offset += 4)
      SHA1_W[i5] = view.getUint32(offset, false);
    for (let i5 = 16; i5 < 80; i5++)
      SHA1_W[i5] = rotl(SHA1_W[i5 - 3] ^ SHA1_W[i5 - 8] ^ SHA1_W[i5 - 14] ^ SHA1_W[i5 - 16], 1);
    let { A: A2, B: B3, C: C5, D, E: E3 } = this;
    for (let i5 = 0; i5 < 80; i5++) {
      let F3, K4;
      if (i5 < 20) {
        F3 = Chi(B3, C5, D);
        K4 = 1518500249;
      } else if (i5 < 40) {
        F3 = B3 ^ C5 ^ D;
        K4 = 1859775393;
      } else if (i5 < 60) {
        F3 = Maj(B3, C5, D);
        K4 = 2400959708;
      } else {
        F3 = B3 ^ C5 ^ D;
        K4 = 3395469782;
      }
      const T4 = rotl(A2, 5) + F3 + E3 + K4 + SHA1_W[i5] | 0;
      E3 = D;
      D = C5;
      C5 = rotl(B3, 30);
      B3 = A2;
      A2 = T4;
    }
    A2 = A2 + this.A | 0;
    B3 = B3 + this.B | 0;
    C5 = C5 + this.C | 0;
    D = D + this.D | 0;
    E3 = E3 + this.E | 0;
    this.set(A2, B3, C5, D, E3);
  }
  roundClean() {
    clean(SHA1_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha1 = createHasher(() => new SHA1());
var p32 = Math.pow(2, 32);
var K3 = Array.from({ length: 64 }, (_3, i5) => Math.floor(p32 * Math.abs(Math.sin(i5 + 1))));
var MD5_IV = SHA1_IV.slice(0, 4);
var MD5_W = new Uint32Array(16);
var MD5 = class extends HashMD {
  constructor() {
    super(64, 16, 8, true);
    this.A = MD5_IV[0] | 0;
    this.B = MD5_IV[1] | 0;
    this.C = MD5_IV[2] | 0;
    this.D = MD5_IV[3] | 0;
  }
  get() {
    const { A: A2, B: B3, C: C5, D } = this;
    return [A2, B3, C5, D];
  }
  set(A2, B3, C5, D) {
    this.A = A2 | 0;
    this.B = B3 | 0;
    this.C = C5 | 0;
    this.D = D | 0;
  }
  process(view, offset) {
    for (let i5 = 0; i5 < 16; i5++, offset += 4)
      MD5_W[i5] = view.getUint32(offset, true);
    let { A: A2, B: B3, C: C5, D } = this;
    for (let i5 = 0; i5 < 64; i5++) {
      let F3, g4, s4;
      if (i5 < 16) {
        F3 = Chi(B3, C5, D);
        g4 = i5;
        s4 = [7, 12, 17, 22];
      } else if (i5 < 32) {
        F3 = Chi(D, B3, C5);
        g4 = (5 * i5 + 1) % 16;
        s4 = [5, 9, 14, 20];
      } else if (i5 < 48) {
        F3 = B3 ^ C5 ^ D;
        g4 = (3 * i5 + 5) % 16;
        s4 = [4, 11, 16, 23];
      } else {
        F3 = C5 ^ (B3 | ~D);
        g4 = 7 * i5 % 16;
        s4 = [6, 10, 15, 21];
      }
      F3 = F3 + A2 + K3[i5] + MD5_W[g4];
      A2 = D;
      D = C5;
      C5 = B3;
      B3 = B3 + rotl(F3, s4[i5 % 4]);
    }
    A2 = A2 + this.A | 0;
    B3 = B3 + this.B | 0;
    C5 = C5 + this.C | 0;
    D = D + this.D | 0;
    this.set(A2, B3, C5, D);
  }
  roundClean() {
    clean(MD5_W);
  }
  destroy() {
    this.set(0, 0, 0, 0);
    clean(this.buffer);
  }
};
var md5 = createHasher(() => new MD5());
var Rho160 = Uint8Array.from([
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
  8
]);
var Id160 = (() => Uint8Array.from(new Array(16).fill(0).map((_3, i5) => i5)))();
var Pi160 = (() => Id160.map((i5) => (9 * i5 + 5) % 16))();
var idxLR = (() => {
  const L3 = [Id160];
  const R2 = [Pi160];
  const res = [L3, R2];
  for (let i5 = 0; i5 < 4; i5++)
    for (let j3 of res)
      j3.push(j3[i5].map((k4) => Rho160[k4]));
  return res;
})();
var idxL2 = (() => idxLR[0])();
var idxR2 = (() => idxLR[1])();
var shifts160 = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i5) => Uint8Array.from(i5));
var shiftsL160 = idxL2.map((idx, i5) => idx.map((j3) => shifts160[i5][j3]));
var shiftsR160 = idxR2.map((idx, i5) => idx.map((j3) => shifts160[i5][j3]));
var Kl160 = Uint32Array.from([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr160 = Uint32Array.from([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function ripemd_f(group, x5, y4, z3) {
  if (group === 0)
    return x5 ^ y4 ^ z3;
  if (group === 1)
    return x5 & y4 | ~x5 & z3;
  if (group === 2)
    return (x5 | ~y4) ^ z3;
  if (group === 3)
    return x5 & z3 | y4 & ~z3;
  return x5 ^ (y4 | ~z3);
}
var BUF_160 = new Uint32Array(16);
var RIPEMD1602 = class extends HashMD {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2: h22, h3: h32, h4: h42 } = this;
    return [h0, h1, h22, h32, h42];
  }
  set(h0, h1, h22, h32, h42) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h22 | 0;
    this.h3 = h32 | 0;
    this.h4 = h42 | 0;
  }
  process(view, offset) {
    for (let i5 = 0; i5 < 16; i5++, offset += 4)
      BUF_160[i5] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar3 = al, bl = this.h1 | 0, br3 = bl, cl = this.h2 | 0, cr3 = cl, dl = this.h3 | 0, dr3 = dl, el = this.h4 | 0, er4 = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl160[group], hbr = Kr160[group];
      const rl = idxL2[group], rr4 = idxR2[group];
      const sl = shiftsL160[group], sr3 = shiftsR160[group];
      for (let i5 = 0; i5 < 16; i5++) {
        const tl = rotl(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i5]] + hbl, sl[i5]) + el | 0;
        al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i5 = 0; i5 < 16; i5++) {
        const tr4 = rotl(ar3 + ripemd_f(rGroup, br3, cr3, dr3) + BUF_160[rr4[i5]] + hbr, sr3[i5]) + er4 | 0;
        ar3 = er4, er4 = dr3, dr3 = rotl(cr3, 10) | 0, cr3 = br3, br3 = tr4;
      }
    }
    this.set(this.h1 + cl + dr3 | 0, this.h2 + dl + er4 | 0, this.h3 + el + ar3 | 0, this.h4 + al + br3 | 0, this.h0 + bl + cr3 | 0);
  }
  roundClean() {
    clean(BUF_160);
  }
  destroy() {
    this.destroyed = true;
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd1603 = createHasher(() => new RIPEMD1602());

// node_modules/viem/_esm/utils/nonceManager.js
function createNonceManager2(parameters) {
  const { source } = parameters;
  const deltaMap = /* @__PURE__ */ new Map();
  const nonceMap = new LruMap2(8192);
  const promiseMap = /* @__PURE__ */ new Map();
  const getKey = ({ address, chainId }) => `${address}.${chainId}`;
  return {
    async consume({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      const promise = this.get({ address, chainId, client });
      this.increment({ address, chainId });
      const nonce = await promise;
      await source.set({ address, chainId }, nonce);
      nonceMap.set(key, nonce);
      return nonce;
    },
    async increment({ address, chainId }) {
      const key = getKey({ address, chainId });
      const delta = deltaMap.get(key) ?? 0;
      deltaMap.set(key, delta + 1);
    },
    async get({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      let promise = promiseMap.get(key);
      if (!promise) {
        promise = (async () => {
          try {
            const nonce = await source.get({ address, chainId, client });
            const previousNonce = nonceMap.get(key) ?? 0;
            if (previousNonce > 0 && nonce <= previousNonce)
              return previousNonce + 1;
            nonceMap.delete(key);
            return nonce;
          } finally {
            this.reset({ address, chainId });
          }
        })();
        promiseMap.set(key, promise);
      }
      const delta = deltaMap.get(key) ?? 0;
      return delta + await promise;
    },
    reset({ address, chainId }) {
      const key = getKey({ address, chainId });
      deltaMap.delete(key);
      promiseMap.delete(key);
    }
  };
}
function jsonRpc2() {
  return {
    async get(parameters) {
      const { address, client } = parameters;
      return getTransactionCount2(client, {
        address,
        blockTag: "pending"
      });
    },
    set() {
    }
  };
}
var nonceManager2 = createNonceManager2({
  source: jsonRpc2()
});

// node_modules/ox/_esm/core/Hash.js
init_sha3();
init_sha256();
function keccak2564(value, options = {}) {
  const { as: as2 = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from(value));
  if (as2 === "Bytes")
    return bytes;
  return fromBytes(bytes);
}

// node_modules/ox/_esm/core/internal/lru.js
var LruMap4 = class extends Map {
  constructor(size8) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size8;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/ox/_esm/core/Caches.js
var caches2 = {
  checksum: new LruMap4(8192)
};
var checksum3 = caches2.checksum;

// node_modules/ox/_esm/core/Address.js
var addressRegex2 = /^0x[a-fA-F0-9]{40}$/;
function assert2(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex2.test(value))
    throw new InvalidAddressError4({
      address: value,
      cause: new InvalidInputError2()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum4(value) !== value)
      throw new InvalidAddressError4({
        address: value,
        cause: new InvalidChecksumError2()
      });
  }
}
function checksum4(address) {
  if (checksum3.has(address))
    return checksum3.get(address);
  assert2(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak2564(fromString(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i5 = 0; i5 < 40; i5 += 2) {
    if (hash[i5 >> 1] >> 4 >= 8 && characters[i5]) {
      characters[i5] = characters[i5].toUpperCase();
    }
    if ((hash[i5 >> 1] & 15) >= 8 && characters[i5 + 1]) {
      characters[i5 + 1] = characters[i5 + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum3.set(address, result);
  return result;
}
var InvalidAddressError4 = class extends BaseError2 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError2 = class extends BaseError2 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError2 = class extends BaseError2 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/ox/_esm/core/Solidity.js
var arrayRegex4 = /^(.*)\[([0-9]*)\]$/;
var bytesRegex4 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex4 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var maxInt83 = 2n ** (8n - 1n) - 1n;
var maxInt163 = 2n ** (16n - 1n) - 1n;
var maxInt243 = 2n ** (24n - 1n) - 1n;
var maxInt323 = 2n ** (32n - 1n) - 1n;
var maxInt403 = 2n ** (40n - 1n) - 1n;
var maxInt483 = 2n ** (48n - 1n) - 1n;
var maxInt563 = 2n ** (56n - 1n) - 1n;
var maxInt643 = 2n ** (64n - 1n) - 1n;
var maxInt723 = 2n ** (72n - 1n) - 1n;
var maxInt803 = 2n ** (80n - 1n) - 1n;
var maxInt883 = 2n ** (88n - 1n) - 1n;
var maxInt963 = 2n ** (96n - 1n) - 1n;
var maxInt1043 = 2n ** (104n - 1n) - 1n;
var maxInt1123 = 2n ** (112n - 1n) - 1n;
var maxInt1203 = 2n ** (120n - 1n) - 1n;
var maxInt1283 = 2n ** (128n - 1n) - 1n;
var maxInt1363 = 2n ** (136n - 1n) - 1n;
var maxInt1443 = 2n ** (144n - 1n) - 1n;
var maxInt1523 = 2n ** (152n - 1n) - 1n;
var maxInt1603 = 2n ** (160n - 1n) - 1n;
var maxInt1683 = 2n ** (168n - 1n) - 1n;
var maxInt1763 = 2n ** (176n - 1n) - 1n;
var maxInt1843 = 2n ** (184n - 1n) - 1n;
var maxInt1923 = 2n ** (192n - 1n) - 1n;
var maxInt2003 = 2n ** (200n - 1n) - 1n;
var maxInt2083 = 2n ** (208n - 1n) - 1n;
var maxInt2163 = 2n ** (216n - 1n) - 1n;
var maxInt2243 = 2n ** (224n - 1n) - 1n;
var maxInt2323 = 2n ** (232n - 1n) - 1n;
var maxInt2403 = 2n ** (240n - 1n) - 1n;
var maxInt2483 = 2n ** (248n - 1n) - 1n;
var maxInt2563 = 2n ** (256n - 1n) - 1n;
var minInt83 = -(2n ** (8n - 1n));
var minInt163 = -(2n ** (16n - 1n));
var minInt243 = -(2n ** (24n - 1n));
var minInt323 = -(2n ** (32n - 1n));
var minInt403 = -(2n ** (40n - 1n));
var minInt483 = -(2n ** (48n - 1n));
var minInt563 = -(2n ** (56n - 1n));
var minInt643 = -(2n ** (64n - 1n));
var minInt723 = -(2n ** (72n - 1n));
var minInt803 = -(2n ** (80n - 1n));
var minInt883 = -(2n ** (88n - 1n));
var minInt963 = -(2n ** (96n - 1n));
var minInt1043 = -(2n ** (104n - 1n));
var minInt1123 = -(2n ** (112n - 1n));
var minInt1203 = -(2n ** (120n - 1n));
var minInt1283 = -(2n ** (128n - 1n));
var minInt1363 = -(2n ** (136n - 1n));
var minInt1443 = -(2n ** (144n - 1n));
var minInt1523 = -(2n ** (152n - 1n));
var minInt1603 = -(2n ** (160n - 1n));
var minInt1683 = -(2n ** (168n - 1n));
var minInt1763 = -(2n ** (176n - 1n));
var minInt1843 = -(2n ** (184n - 1n));
var minInt1923 = -(2n ** (192n - 1n));
var minInt2003 = -(2n ** (200n - 1n));
var minInt2083 = -(2n ** (208n - 1n));
var minInt2163 = -(2n ** (216n - 1n));
var minInt2243 = -(2n ** (224n - 1n));
var minInt2323 = -(2n ** (232n - 1n));
var minInt2403 = -(2n ** (240n - 1n));
var minInt2483 = -(2n ** (248n - 1n));
var minInt2563 = -(2n ** (256n - 1n));
var maxUint83 = 2n ** 8n - 1n;
var maxUint163 = 2n ** 16n - 1n;
var maxUint243 = 2n ** 24n - 1n;
var maxUint323 = 2n ** 32n - 1n;
var maxUint403 = 2n ** 40n - 1n;
var maxUint483 = 2n ** 48n - 1n;
var maxUint563 = 2n ** 56n - 1n;
var maxUint643 = 2n ** 64n - 1n;
var maxUint723 = 2n ** 72n - 1n;
var maxUint803 = 2n ** 80n - 1n;
var maxUint883 = 2n ** 88n - 1n;
var maxUint963 = 2n ** 96n - 1n;
var maxUint1043 = 2n ** 104n - 1n;
var maxUint1123 = 2n ** 112n - 1n;
var maxUint1203 = 2n ** 120n - 1n;
var maxUint1283 = 2n ** 128n - 1n;
var maxUint1363 = 2n ** 136n - 1n;
var maxUint1443 = 2n ** 144n - 1n;
var maxUint1523 = 2n ** 152n - 1n;
var maxUint1603 = 2n ** 160n - 1n;
var maxUint1683 = 2n ** 168n - 1n;
var maxUint1763 = 2n ** 176n - 1n;
var maxUint1843 = 2n ** 184n - 1n;
var maxUint1923 = 2n ** 192n - 1n;
var maxUint2003 = 2n ** 200n - 1n;
var maxUint2083 = 2n ** 208n - 1n;
var maxUint2163 = 2n ** 216n - 1n;
var maxUint2243 = 2n ** 224n - 1n;
var maxUint2323 = 2n ** 232n - 1n;
var maxUint2403 = 2n ** 240n - 1n;
var maxUint2483 = 2n ** 248n - 1n;
var maxUint2564 = 2n ** 256n - 1n;

// node_modules/ox/_esm/core/internal/cursor.js
var staticCursor2 = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError2({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError4({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError2({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError2({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length2, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length2 - 1);
    return this.bytes.subarray(position, position + length2);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length2, size8) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length2);
    this.position += size8 ?? length2;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
var NegativeOffsetError2 = class extends BaseError2 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError4 = class extends BaseError2 {
  constructor({ length: length2, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
};
var RecursiveReadLimitExceededError2 = class extends BaseError2 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
};

// node_modules/ox/_esm/core/AbiParameters.js
function encodePacked4(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError2({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i5 = 0; i5 < types.length; i5++) {
    const type = types[i5];
    const value = values[i5];
    data.push(encodePacked4.encode(type, value));
  }
  return concat(...data);
}
(function(encodePacked5) {
  function encode11(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert2(address);
      return padLeft(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString2(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex4);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size8 = Number.parseInt(bits) / 8;
      return fromNumber(value, {
        size: isArray ? 32 : size8,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex4);
    if (bytesMatch) {
      const [_type, size8] = bytesMatch;
      if (Number.parseInt(size8) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError4({
          expectedSize: Number.parseInt(size8),
          value
        });
      return padRight(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex4);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i5 = 0; i5 < value.length; i5++) {
        data.push(encode11(childType, value[i5], true));
      }
      if (data.length === 0)
        return "0x";
      return concat(...data);
    }
    throw new InvalidTypeError2(type);
  }
  encodePacked5.encode = encode11;
})(encodePacked4 || (encodePacked4 = {}));
var BytesSizeMismatchError4 = class extends BaseError2 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size2(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
};
var LengthMismatchError2 = class extends BaseError2 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
};
var InvalidTypeError2 = class extends BaseError2 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
};

// node_modules/viem/_esm/utils/signature/serializeSignature.js
init_secp256k1();

// node_modules/viem/_esm/utils/signature/parseCompactSignature.js
init_secp256k1();

// node_modules/viem/_esm/utils/signature/parseSignature.js
init_secp256k1();

// node_modules/viem/_esm/utils/signature/serializeCompactSignature.js
init_secp256k1();

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/ERC7811Util.js
var ERC7811Utils = {
  /**
   * Creates a Balance object from an ERC7811 Asset object
   * @param asset - Asset object to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns Balance object
   */
  createBalance(asset, chainId) {
    const metadata = {
      name: asset.metadata["name"] || "",
      symbol: asset.metadata["symbol"] || "",
      decimals: asset.metadata["decimals"] || 0,
      value: asset.metadata["value"] || 0,
      price: asset.metadata["price"] || 0,
      iconUrl: asset.metadata["iconUrl"] || ""
    };
    return {
      name: metadata.name,
      symbol: metadata.symbol,
      chainId,
      address: asset.address === "native" ? void 0 : this.convertAddressToCAIP10Address(asset.address, chainId),
      value: metadata.value,
      price: metadata.price,
      quantity: {
        decimals: metadata.decimals.toString(),
        numeric: this.convertHexToBalance({
          hex: asset.balance,
          decimals: metadata.decimals
        })
      },
      iconUrl: metadata.iconUrl
    };
  },
  /**
   * Converts a hex string to a Balance object
   * @param hex - Hex string to convert
   * @param decimals - Number of decimals to use
   * @returns Balance object
   */
  convertHexToBalance({ hex, decimals }) {
    return formatUnits(BigInt(hex), decimals);
  },
  /**
   * Converts an address to a CAIP-10 address
   * @param address - Address to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns CAIP-10 address
   */
  convertAddressToCAIP10Address(address, chainId) {
    return `${chainId}:${address}`;
  },
  /**
   *  Creates a CAIP-2 Chain ID from a chain ID and namespace
   * @param chainId  - Chain ID in hex format
   * @param namespace  - Chain namespace
   * @returns
   */
  createCAIP2ChainId(chainId, namespace) {
    return `${namespace}:${parseInt(chainId, 16)}`;
  },
  /**
   * Gets the chain ID in hex format from a CAIP-2 Chain ID
   * @param caip2ChainId - CAIP-2 Chain ID
   * @returns Chain ID in hex format
   */
  getChainIdHexFromCAIP2ChainId(caip2ChainId) {
    const parts = caip2ChainId.split(":");
    if (parts.length < 2 || !parts[1]) {
      return "0x0";
    }
    const chainPart = parts[1];
    const parsed = parseInt(chainPart, 10);
    return isNaN(parsed) ? "0x0" : `0x${parsed.toString(16)}`;
  },
  /**
   * Checks if a response is a valid WalletGetAssetsResponse
   * @param response - The response to check
   * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
   */
  isWalletGetAssetsResponse(response) {
    if (typeof response !== "object" || response === null) {
      return false;
    }
    return Object.values(response).every((value) => Array.isArray(value) && value.every((asset) => this.isValidAsset(asset)));
  },
  /**
   * Checks if an asset object is valid.
   * @param asset - The asset object to check.
   * @returns True if the asset is valid, false otherwise.
   */
  isValidAsset(asset) {
    return typeof asset === "object" && asset !== null && typeof asset.address === "string" && typeof asset.balance === "string" && (asset.type === "ERC20" || asset.type === "NATIVE") && typeof asset.metadata === "object" && asset.metadata !== null && typeof asset.metadata["name"] === "string" && typeof asset.metadata["symbol"] === "string" && typeof asset.metadata["decimals"] === "number" && typeof asset.metadata["price"] === "number" && typeof asset.metadata["iconUrl"] === "string";
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/SendApiUtil.js
var SendApiUtil = {
  async getMyTokensWithBalance(forceUpdate) {
    const address = AccountController.state.address;
    const caipNetwork = ChainController.state.activeCaipNetwork;
    if (!address || !caipNetwork) {
      return [];
    }
    if (caipNetwork.chainNamespace === "eip155") {
      const eip155Balances = await this.getEIP155Balances(address, caipNetwork);
      if (eip155Balances) {
        return this.filterLowQualityTokens(eip155Balances);
      }
    }
    const response = await BlockchainApiController.getBalance(address, caipNetwork.caipNetworkId, forceUpdate);
    return this.filterLowQualityTokens(response.balances);
  },
  async getEIP155Balances(address, caipNetwork) {
    var _a, _b;
    try {
      const chainIdHex = ERC7811Utils.getChainIdHexFromCAIP2ChainId(caipNetwork.caipNetworkId);
      const walletCapabilities = await ConnectionController.getCapabilities(address);
      if (!((_b = (_a = walletCapabilities == null ? void 0 : walletCapabilities[chainIdHex]) == null ? void 0 : _a["assetDiscovery"]) == null ? void 0 : _b.supported)) {
        return null;
      }
      const walletGetAssetsResponse = await ConnectionController.walletGetAssets({
        account: address,
        chainFilter: [chainIdHex]
      });
      if (!ERC7811Utils.isWalletGetAssetsResponse(walletGetAssetsResponse)) {
        return null;
      }
      const assets = walletGetAssetsResponse[chainIdHex] || [];
      return assets.map((asset) => ERC7811Utils.createBalance(asset, caipNetwork.caipNetworkId));
    } catch (error) {
      return null;
    }
  },
  /**
   * The 1Inch API includes many low-quality tokens in the balance response,
   * which appear inconsistently. This filter prevents them from being displayed.
   */
  filterLowQualityTokens(balances) {
    return balances.filter((balance) => balance.quantity.decimals !== "0");
  },
  mapBalancesToSwapTokens(balances) {
    return (balances == null ? void 0 : balances.map((token) => ({
      ...token,
      address: (token == null ? void 0 : token.address) ? token.address : ChainController.getActiveNetworkTokenAddress(),
      decimals: parseInt(token.quantity.decimals, 10),
      logoUri: token.iconUrl,
      eip2612: false
    }))) || [];
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SendController.js
var state16 = proxy({
  tokenBalances: [],
  loading: false
});
var SendController = {
  state: state16,
  subscribe(callback) {
    return subscribe(state16, () => callback(state16));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state16, key, callback);
  },
  setToken(token) {
    if (token) {
      state16.token = ref(token);
    }
  },
  setTokenAmount(sendTokenAmount) {
    state16.sendTokenAmount = sendTokenAmount;
  },
  setReceiverAddress(receiverAddress) {
    state16.receiverAddress = receiverAddress;
  },
  setReceiverProfileImageUrl(receiverProfileImageUrl) {
    state16.receiverProfileImageUrl = receiverProfileImageUrl;
  },
  setReceiverProfileName(receiverProfileName) {
    state16.receiverProfileName = receiverProfileName;
  },
  setGasPrice(gasPrice) {
    state16.gasPrice = gasPrice;
  },
  setGasPriceInUsd(gasPriceInUSD) {
    state16.gasPriceInUSD = gasPriceInUSD;
  },
  setNetworkBalanceInUsd(networkBalanceInUSD) {
    state16.networkBalanceInUSD = networkBalanceInUSD;
  },
  setLoading(loading) {
    state16.loading = loading;
  },
  sendToken() {
    var _a;
    switch ((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.chainNamespace) {
      case "eip155":
        this.sendEvmToken();
        return;
      case "solana":
        this.sendSolanaToken();
        return;
      default:
        throw new Error("Unsupported chain");
    }
  },
  sendEvmToken() {
    var _a, _b, _c, _d, _e3;
    if (((_a = this.state.token) == null ? void 0 : _a.address) && this.state.sendTokenAmount && this.state.receiverAddress) {
      EventsController.sendEvent({
        type: "track",
        event: "SEND_INITIATED",
        properties: {
          isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: this.state.token.address,
          amount: this.state.sendTokenAmount,
          network: ((_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.caipNetworkId) || ""
        }
      });
      this.sendERC20Token({
        receiverAddress: this.state.receiverAddress,
        tokenAddress: this.state.token.address,
        sendTokenAmount: this.state.sendTokenAmount,
        decimals: this.state.token.quantity.decimals
      });
    } else if (this.state.receiverAddress && this.state.sendTokenAmount && this.state.gasPrice && ((_c = this.state.token) == null ? void 0 : _c.quantity.decimals)) {
      EventsController.sendEvent({
        type: "track",
        event: "SEND_INITIATED",
        properties: {
          isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: (_d = this.state.token) == null ? void 0 : _d.symbol,
          amount: this.state.sendTokenAmount,
          network: ((_e3 = ChainController.state.activeCaipNetwork) == null ? void 0 : _e3.caipNetworkId) || ""
        }
      });
      this.sendNativeToken({
        receiverAddress: this.state.receiverAddress,
        sendTokenAmount: this.state.sendTokenAmount,
        gasPrice: this.state.gasPrice,
        decimals: this.state.token.quantity.decimals
      });
    }
  },
  async fetchTokenBalance(onError) {
    var _a, _b;
    state16.loading = true;
    const chainId = (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId;
    const chain = (_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.chainNamespace;
    const caipAddress = ChainController.state.activeCaipAddress;
    const address = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : void 0;
    if (state16.lastRetry && !CoreHelperUtil.isAllowedRetry(state16.lastRetry, 30 * ConstantsUtil2.ONE_SEC_MS)) {
      state16.loading = false;
      return [];
    }
    try {
      if (address && chainId && chain) {
        const balances = await SendApiUtil.getMyTokensWithBalance();
        state16.tokenBalances = balances;
        state16.lastRetry = void 0;
        return balances;
      }
    } catch (error) {
      state16.lastRetry = Date.now();
      onError == null ? void 0 : onError(error);
      SnackController.showError("Token Balance Unavailable");
    } finally {
      state16.loading = false;
    }
    return [];
  },
  fetchNetworkBalance() {
    if (state16.tokenBalances.length === 0) {
      return;
    }
    const networkTokenBalances = SendApiUtil.mapBalancesToSwapTokens(state16.tokenBalances);
    if (!networkTokenBalances) {
      return;
    }
    const networkToken = networkTokenBalances.find((token) => token.address === ChainController.getActiveNetworkTokenAddress());
    if (!networkToken) {
      return;
    }
    state16.networkBalanceInUSD = networkToken ? NumberUtil.multiply(networkToken.quantity.numeric, networkToken.price).toString() : "0";
  },
  isInsufficientNetworkTokenForGas(networkBalanceInUSD, gasPriceInUSD) {
    const gasPrice = gasPriceInUSD || "0";
    if (NumberUtil.bigNumber(networkBalanceInUSD).eq(0)) {
      return true;
    }
    return NumberUtil.bigNumber(NumberUtil.bigNumber(gasPrice)).gt(networkBalanceInUSD);
  },
  hasInsufficientGasFunds() {
    let isInsufficientNetworkTokenForGas = true;
    if (AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT) {
      isInsufficientNetworkTokenForGas = false;
    } else if (state16.networkBalanceInUSD) {
      isInsufficientNetworkTokenForGas = this.isInsufficientNetworkTokenForGas(state16.networkBalanceInUSD, state16.gasPriceInUSD);
    }
    return isInsufficientNetworkTokenForGas;
  },
  async sendNativeToken(params) {
    var _a, _b, _c, _d;
    RouterController.pushTransactionStack({
      view: "Account",
      goBack: false
    });
    const to2 = params.receiverAddress;
    const address = AccountController.state.address;
    const value = ConnectionController.parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
    const data = "0x";
    try {
      await ConnectionController.sendTransaction({
        chainNamespace: "eip155",
        to: to2,
        address,
        data,
        value: value ?? BigInt(0),
        gasPrice: params.gasPrice
      });
      SnackController.showSuccess("Transaction started");
      EventsController.sendEvent({
        type: "track",
        event: "SEND_SUCCESS",
        properties: {
          isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: ((_a = this.state.token) == null ? void 0 : _a.symbol) || "",
          amount: params.sendTokenAmount,
          network: ((_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.caipNetworkId) || ""
        }
      });
      this.resetSend();
    } catch (error) {
      console.error("SendController:sendERC20Token - failed to send native token", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      EventsController.sendEvent({
        type: "track",
        event: "SEND_ERROR",
        properties: {
          message: errorMessage,
          isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: ((_c = this.state.token) == null ? void 0 : _c.symbol) || "",
          amount: params.sendTokenAmount,
          network: ((_d = ChainController.state.activeCaipNetwork) == null ? void 0 : _d.caipNetworkId) || ""
        }
      });
      SnackController.showError("Something went wrong");
    }
  },
  async sendERC20Token(params) {
    var _a, _b;
    RouterController.pushTransactionStack({
      view: "Account",
      goBack: false
    });
    const amount = ConnectionController.parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
    try {
      if (AccountController.state.address && params.sendTokenAmount && params.receiverAddress && params.tokenAddress) {
        const tokenAddress = CoreHelperUtil.getPlainAddress(params.tokenAddress);
        await ConnectionController.writeContract({
          fromAddress: AccountController.state.address,
          tokenAddress,
          args: [params.receiverAddress, amount ?? BigInt(0)],
          method: "transfer",
          abi: ContractUtil.getERC20Abi(tokenAddress),
          chainNamespace: "eip155"
        });
        SnackController.showSuccess("Transaction started");
        this.resetSend();
      }
    } catch (error) {
      console.error("SendController:sendERC20Token - failed to send erc20 token", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      EventsController.sendEvent({
        type: "track",
        event: "SEND_ERROR",
        properties: {
          message: errorMessage,
          isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: ((_a = this.state.token) == null ? void 0 : _a.symbol) || "",
          amount: params.sendTokenAmount,
          network: ((_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.caipNetworkId) || ""
        }
      });
      SnackController.showError("Something went wrong");
    }
  },
  sendSolanaToken() {
    if (!this.state.sendTokenAmount || !this.state.receiverAddress) {
      SnackController.showError("Please enter a valid amount and receiver address");
      return;
    }
    RouterController.pushTransactionStack({
      view: "Account",
      goBack: false
    });
    ConnectionController.sendTransaction({
      chainNamespace: "solana",
      to: this.state.receiverAddress,
      value: this.state.sendTokenAmount
    }).then(() => {
      this.resetSend();
      AccountController.fetchTokenBalance();
    }).catch((error) => {
      SnackController.showError("Failed to send transaction. Please try again.");
      console.error("SendController:sendToken - failed to send solana transaction", error);
    });
  },
  resetSend() {
    state16.token = void 0;
    state16.sendTokenAmount = void 0;
    state16.receiverAddress = void 0;
    state16.receiverProfileImageUrl = void 0;
    state16.receiverProfileName = void 0;
    state16.loading = false;
    state16.tokenBalances = [];
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js
var accountState = {
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: false,
  addressLabels: /* @__PURE__ */ new Map(),
  allAccounts: [],
  user: void 0
};
var networkState = {
  caipNetwork: void 0,
  supportsAllNetworks: true,
  smartAccountEnabledNetworks: []
};
var state17 = proxy({
  chains: proxyMap(),
  activeCaipAddress: void 0,
  activeChain: void 0,
  activeCaipNetwork: void 0,
  noAdapters: false,
  universalAdapter: {
    networkControllerClient: void 0,
    connectionControllerClient: void 0
  },
  isSwitchingNamespace: false
});
var ChainController = {
  state: state17,
  subscribe(callback) {
    return subscribe(state17, () => {
      callback(state17);
    });
  },
  subscribeKey(key, callback) {
    return subscribeKey(state17, key, callback);
  },
  subscribeChainProp(property, callback, chain) {
    let prev = void 0;
    return subscribe(state17.chains, () => {
      var _a;
      const activeChain = chain || state17.activeChain;
      if (activeChain) {
        const nextValue = (_a = state17.chains.get(activeChain)) == null ? void 0 : _a[property];
        if (prev !== nextValue) {
          prev = nextValue;
          callback(nextValue);
        }
      }
    });
  },
  initialize(adapters, caipNetworks, clients) {
    const { chainId: activeChainId, namespace: activeNamespace } = StorageUtil.getActiveNetworkProps();
    const activeCaipNetwork = caipNetworks == null ? void 0 : caipNetworks.find((network) => network.id.toString() === (activeChainId == null ? void 0 : activeChainId.toString()));
    const defaultAdapter = adapters.find((adapter) => (adapter == null ? void 0 : adapter.namespace) === activeNamespace);
    const adapterToActivate = defaultAdapter || (adapters == null ? void 0 : adapters[0]);
    const namespaces = /* @__PURE__ */ new Set([...(caipNetworks == null ? void 0 : caipNetworks.map((network) => network.chainNamespace)) ?? []]);
    if ((adapters == null ? void 0 : adapters.length) === 0 || !adapterToActivate) {
      state17.noAdapters = true;
    }
    if (!state17.noAdapters) {
      state17.activeChain = adapterToActivate == null ? void 0 : adapterToActivate.namespace;
      state17.activeCaipNetwork = activeCaipNetwork;
      this.setChainNetworkData(adapterToActivate == null ? void 0 : adapterToActivate.namespace, { caipNetwork: activeCaipNetwork });
      if (state17.activeChain) {
        PublicStateController.set({ activeChain: adapterToActivate == null ? void 0 : adapterToActivate.namespace });
      }
    }
    namespaces.forEach((namespace) => {
      const namespaceNetworks = caipNetworks == null ? void 0 : caipNetworks.filter((network) => network.chainNamespace === namespace);
      ChainController.state.chains.set(namespace, {
        namespace,
        networkState: proxy({
          ...networkState,
          caipNetwork: namespaceNetworks == null ? void 0 : namespaceNetworks[0]
        }),
        accountState: proxy(accountState),
        caipNetworks: namespaceNetworks ?? [],
        ...clients
      });
      this.setRequestedCaipNetworks(namespaceNetworks ?? [], namespace);
    });
  },
  removeAdapter(namespace) {
    var _a, _b;
    if (state17.activeChain === namespace) {
      const nextAdapter = Array.from(state17.chains.entries()).find(([chainNamespace]) => chainNamespace !== namespace);
      if (nextAdapter) {
        const caipNetwork = (_b = (_a = nextAdapter[1]) == null ? void 0 : _a.caipNetworks) == null ? void 0 : _b[0];
        if (caipNetwork) {
          this.setActiveCaipNetwork(caipNetwork);
        }
      }
    }
    state17.chains.delete(namespace);
  },
  addAdapter(adapter, { networkControllerClient, connectionControllerClient }, caipNetworks) {
    state17.chains.set(adapter.namespace, {
      namespace: adapter.namespace,
      networkState: {
        ...networkState,
        caipNetwork: caipNetworks[0]
      },
      accountState,
      caipNetworks,
      connectionControllerClient,
      networkControllerClient
    });
    this.setRequestedCaipNetworks((caipNetworks == null ? void 0 : caipNetworks.filter((caipNetwork) => caipNetwork.chainNamespace === adapter.namespace)) ?? [], adapter.namespace);
  },
  addNetwork(network) {
    var _a;
    const chainAdapter = state17.chains.get(network.chainNamespace);
    if (chainAdapter) {
      const newNetworks = [...chainAdapter.caipNetworks || []];
      if (!((_a = chainAdapter.caipNetworks) == null ? void 0 : _a.find((caipNetwork) => caipNetwork.id === network.id))) {
        newNetworks.push(network);
      }
      state17.chains.set(network.chainNamespace, { ...chainAdapter, caipNetworks: newNetworks });
      this.setRequestedCaipNetworks(newNetworks, network.chainNamespace);
    }
  },
  removeNetwork(namespace, networkId) {
    var _a, _b, _c;
    const chainAdapter = state17.chains.get(namespace);
    if (chainAdapter) {
      const isActiveNetwork = ((_a = state17.activeCaipNetwork) == null ? void 0 : _a.id) === networkId;
      const newCaipNetworksOfAdapter = [
        ...((_b = chainAdapter.caipNetworks) == null ? void 0 : _b.filter((network) => network.id !== networkId)) || []
      ];
      if (isActiveNetwork && ((_c = chainAdapter == null ? void 0 : chainAdapter.caipNetworks) == null ? void 0 : _c[0])) {
        this.setActiveCaipNetwork(chainAdapter.caipNetworks[0]);
      }
      state17.chains.set(namespace, { ...chainAdapter, caipNetworks: newCaipNetworksOfAdapter });
      this.setRequestedCaipNetworks(newCaipNetworksOfAdapter || [], namespace);
    }
  },
  setAdapterNetworkState(chain, props) {
    const chainAdapter = state17.chains.get(chain);
    if (chainAdapter) {
      chainAdapter.networkState = {
        ...chainAdapter.networkState || networkState,
        ...props
      };
      state17.chains.set(chain, chainAdapter);
    }
  },
  setChainAccountData(chain, accountProps, _unknown = true) {
    if (!chain) {
      throw new Error("Chain is required to update chain account data");
    }
    const chainAdapter = state17.chains.get(chain);
    if (chainAdapter) {
      const newAccountState = { ...chainAdapter.accountState || accountState, ...accountProps };
      state17.chains.set(chain, { ...chainAdapter, accountState: newAccountState });
      if (state17.chains.size === 1 || state17.activeChain === chain) {
        if (accountProps.caipAddress) {
          state17.activeCaipAddress = accountProps.caipAddress;
        }
        AccountController.replaceState(newAccountState);
      }
    }
  },
  setChainNetworkData(chain, networkProps) {
    if (!chain) {
      return;
    }
    const chainAdapter = state17.chains.get(chain);
    if (chainAdapter) {
      const newNetworkState = { ...chainAdapter.networkState || networkState, ...networkProps };
      state17.chains.set(chain, { ...chainAdapter, networkState: newNetworkState });
    }
  },
  // eslint-disable-next-line max-params
  setAccountProp(prop, value, chain, replaceState = true) {
    this.setChainAccountData(chain, { [prop]: value }, replaceState);
    if (prop === "status" && value === "disconnected" && chain) {
      ConnectorController.removeConnectorId(chain);
    }
  },
  setActiveNamespace(chain) {
    var _a, _b;
    state17.activeChain = chain;
    const newAdapter = chain ? state17.chains.get(chain) : void 0;
    const caipNetwork = (_a = newAdapter == null ? void 0 : newAdapter.networkState) == null ? void 0 : _a.caipNetwork;
    if ((caipNetwork == null ? void 0 : caipNetwork.id) && chain) {
      state17.activeCaipAddress = (_b = newAdapter == null ? void 0 : newAdapter.accountState) == null ? void 0 : _b.caipAddress;
      state17.activeCaipNetwork = caipNetwork;
      this.setChainNetworkData(chain, { caipNetwork });
      StorageUtil.setActiveCaipNetworkId(caipNetwork == null ? void 0 : caipNetwork.caipNetworkId);
      PublicStateController.set({
        activeChain: chain,
        selectedNetworkId: caipNetwork == null ? void 0 : caipNetwork.caipNetworkId
      });
    }
  },
  setActiveCaipNetwork(caipNetwork) {
    var _a, _b, _c;
    if (!caipNetwork) {
      return;
    }
    if (state17.activeChain !== caipNetwork.chainNamespace) {
      this.setIsSwitchingNamespace(true);
    }
    const newAdapter = state17.chains.get(caipNetwork.chainNamespace);
    state17.activeChain = caipNetwork.chainNamespace;
    state17.activeCaipNetwork = caipNetwork;
    this.setChainNetworkData(caipNetwork.chainNamespace, { caipNetwork });
    if ((_a = newAdapter == null ? void 0 : newAdapter.accountState) == null ? void 0 : _a.address) {
      state17.activeCaipAddress = `${caipNetwork.chainNamespace}:${caipNetwork.id}:${(_b = newAdapter == null ? void 0 : newAdapter.accountState) == null ? void 0 : _b.address}`;
    } else {
      state17.activeCaipAddress = void 0;
    }
    this.setAccountProp("caipAddress", state17.activeCaipAddress, caipNetwork.chainNamespace);
    if (newAdapter) {
      AccountController.replaceState(newAdapter.accountState);
    }
    SendController.resetSend();
    PublicStateController.set({
      activeChain: state17.activeChain,
      selectedNetworkId: (_c = state17.activeCaipNetwork) == null ? void 0 : _c.caipNetworkId
    });
    StorageUtil.setActiveCaipNetworkId(caipNetwork.caipNetworkId);
    const isSupported = this.checkIfSupportedNetwork(caipNetwork.chainNamespace);
    if (!isSupported && OptionsController.state.enableNetworkSwitch && !OptionsController.state.allowUnsupportedChain && !ConnectionController.state.wcBasic) {
      this.showUnsupportedChainUI();
    }
  },
  addCaipNetwork(caipNetwork) {
    var _a;
    if (!caipNetwork) {
      return;
    }
    const chain = state17.chains.get(caipNetwork.chainNamespace);
    if (chain) {
      (_a = chain == null ? void 0 : chain.caipNetworks) == null ? void 0 : _a.push(caipNetwork);
    }
  },
  async switchActiveNamespace(namespace) {
    var _a;
    if (!namespace) {
      return;
    }
    const isDifferentChain = namespace !== ChainController.state.activeChain;
    const caipNetworkOfNamespace = (_a = ChainController.getNetworkData(namespace)) == null ? void 0 : _a.caipNetwork;
    const firstNetworkWithChain = ChainController.getCaipNetworkByNamespace(namespace, caipNetworkOfNamespace == null ? void 0 : caipNetworkOfNamespace.id);
    if (isDifferentChain && firstNetworkWithChain) {
      await ChainController.switchActiveNetwork(firstNetworkWithChain);
    }
  },
  async switchActiveNetwork(network) {
    var _a;
    const activeAdapter = ChainController.state.chains.get(ChainController.state.activeChain);
    const unsupportedNetwork = !((_a = activeAdapter == null ? void 0 : activeAdapter.caipNetworks) == null ? void 0 : _a.some((caipNetwork) => {
      var _a2;
      return caipNetwork.id === ((_a2 = state17.activeCaipNetwork) == null ? void 0 : _a2.id);
    }));
    if (unsupportedNetwork) {
      RouterController.goBack();
    }
    const networkControllerClient = this.getNetworkControllerClient(network.chainNamespace);
    if (networkControllerClient) {
      await networkControllerClient.switchCaipNetwork(network);
      EventsController.sendEvent({
        type: "track",
        event: "SWITCH_NETWORK",
        properties: { network: network.caipNetworkId }
      });
    }
  },
  getNetworkControllerClient(chainNamespace) {
    const chain = chainNamespace || state17.activeChain;
    const chainAdapter = state17.chains.get(chain);
    if (!chainAdapter) {
      throw new Error("Chain adapter not found");
    }
    if (!chainAdapter.networkControllerClient) {
      throw new Error("NetworkController client not set");
    }
    return chainAdapter.networkControllerClient;
  },
  getConnectionControllerClient(_chain) {
    const chain = _chain || state17.activeChain;
    if (!chain) {
      throw new Error("Chain is required to get connection controller client");
    }
    const chainAdapter = state17.chains.get(chain);
    if (!(chainAdapter == null ? void 0 : chainAdapter.connectionControllerClient)) {
      throw new Error("ConnectionController client not set");
    }
    return chainAdapter.connectionControllerClient;
  },
  getAccountProp(key, _chain) {
    var _a;
    let chain = state17.activeChain;
    if (_chain) {
      chain = _chain;
    }
    if (!chain) {
      return void 0;
    }
    const chainAccountState = (_a = state17.chains.get(chain)) == null ? void 0 : _a.accountState;
    if (!chainAccountState) {
      return void 0;
    }
    return chainAccountState[key];
  },
  getNetworkProp(key, namespace) {
    var _a;
    const chainNetworkState = (_a = state17.chains.get(namespace)) == null ? void 0 : _a.networkState;
    if (!chainNetworkState) {
      return void 0;
    }
    return chainNetworkState[key];
  },
  getRequestedCaipNetworks(chainToFilter) {
    const adapter = state17.chains.get(chainToFilter);
    const { approvedCaipNetworkIds = [], requestedCaipNetworks = [] } = (adapter == null ? void 0 : adapter.networkState) || {};
    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    return sortedNetworks;
  },
  getAllRequestedCaipNetworks() {
    const requestedCaipNetworks = [];
    state17.chains.forEach((chainAdapter) => {
      const caipNetworks = this.getRequestedCaipNetworks(chainAdapter.namespace);
      requestedCaipNetworks.push(...caipNetworks);
    });
    return requestedCaipNetworks;
  },
  setRequestedCaipNetworks(requestedCaipNetworks, chain) {
    this.setAdapterNetworkState(chain, { requestedCaipNetworks });
  },
  getAllApprovedCaipNetworkIds() {
    const approvedCaipNetworkIds = [];
    state17.chains.forEach((chainAdapter) => {
      const approvedIds = this.getApprovedCaipNetworkIds(chainAdapter.namespace);
      approvedCaipNetworkIds.push(...approvedIds);
    });
    return approvedCaipNetworkIds;
  },
  getActiveCaipNetwork() {
    return state17.activeCaipNetwork;
  },
  getActiveCaipAddress() {
    return state17.activeCaipAddress;
  },
  getApprovedCaipNetworkIds(namespace) {
    var _a;
    const adapter = state17.chains.get(namespace);
    const approvedCaipNetworkIds = ((_a = adapter == null ? void 0 : adapter.networkState) == null ? void 0 : _a.approvedCaipNetworkIds) || [];
    return approvedCaipNetworkIds;
  },
  async setApprovedCaipNetworksData(namespace) {
    const networkControllerClient = this.getNetworkControllerClient();
    const data = await (networkControllerClient == null ? void 0 : networkControllerClient.getApprovedCaipNetworksData());
    this.setAdapterNetworkState(namespace, {
      approvedCaipNetworkIds: data == null ? void 0 : data.approvedCaipNetworkIds,
      supportsAllNetworks: data == null ? void 0 : data.supportsAllNetworks
    });
  },
  checkIfSupportedNetwork(namespace, caipNetwork) {
    const activeCaipNetwork = caipNetwork || state17.activeCaipNetwork;
    const requestedCaipNetworks = this.getRequestedCaipNetworks(namespace);
    if (!requestedCaipNetworks.length) {
      return true;
    }
    return requestedCaipNetworks == null ? void 0 : requestedCaipNetworks.some((network) => network.id === (activeCaipNetwork == null ? void 0 : activeCaipNetwork.id));
  },
  checkIfSupportedChainId(chainId) {
    if (!state17.activeChain) {
      return true;
    }
    const requestedCaipNetworks = this.getRequestedCaipNetworks(state17.activeChain);
    return requestedCaipNetworks == null ? void 0 : requestedCaipNetworks.some((network) => network.id === chainId);
  },
  // Smart Account Network Handlers
  setSmartAccountEnabledNetworks(smartAccountEnabledNetworks, chain) {
    this.setAdapterNetworkState(chain, { smartAccountEnabledNetworks });
  },
  checkIfSmartAccountEnabled() {
    var _a;
    const networkId = NetworkUtil.caipNetworkIdToNumber((_a = state17.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    const activeChain = state17.activeChain;
    if (!activeChain || !networkId) {
      return false;
    }
    const smartAccountEnabledNetworks = this.getNetworkProp("smartAccountEnabledNetworks", activeChain);
    return Boolean(smartAccountEnabledNetworks == null ? void 0 : smartAccountEnabledNetworks.includes(Number(networkId)));
  },
  getActiveNetworkTokenAddress() {
    var _a, _b;
    const namespace = ((_a = state17.activeCaipNetwork) == null ? void 0 : _a.chainNamespace) || "eip155";
    const chainId = ((_b = state17.activeCaipNetwork) == null ? void 0 : _b.id) || 1;
    const address = ConstantsUtil2.NATIVE_TOKEN_ADDRESS[namespace];
    return `${namespace}:${chainId}:${address}`;
  },
  showUnsupportedChainUI() {
    ModalController.open({ view: "UnsupportedChain" });
  },
  checkIfNamesSupported() {
    const activeCaipNetwork = state17.activeCaipNetwork;
    return Boolean((activeCaipNetwork == null ? void 0 : activeCaipNetwork.chainNamespace) && ConstantsUtil2.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(activeCaipNetwork.chainNamespace));
  },
  resetNetwork(namespace) {
    this.setAdapterNetworkState(namespace, {
      approvedCaipNetworkIds: void 0,
      supportsAllNetworks: true,
      smartAccountEnabledNetworks: []
    });
  },
  resetAccount(chain) {
    const chainToWrite = chain;
    if (!chainToWrite) {
      throw new Error("Chain is required to set account prop");
    }
    state17.activeCaipAddress = void 0;
    this.setChainAccountData(chainToWrite, {
      smartAccountDeployed: false,
      currentTab: 0,
      caipAddress: void 0,
      address: void 0,
      balance: void 0,
      balanceSymbol: void 0,
      profileName: void 0,
      profileImage: void 0,
      addressExplorerUrl: void 0,
      tokenBalance: [],
      connectedWalletInfo: void 0,
      preferredAccountType: void 0,
      socialProvider: void 0,
      socialWindow: void 0,
      farcasterUrl: void 0,
      allAccounts: [],
      user: void 0,
      status: "disconnected"
    });
    ConnectorController.removeConnectorId(chainToWrite);
  },
  async disconnect(namespace) {
    const chainsToDisconnect = getChainsToDisconnect(namespace);
    try {
      SendController.resetSend();
      const disconnectResults = await Promise.allSettled(chainsToDisconnect.map(async ([ns, adapter]) => {
        var _a;
        try {
          const { caipAddress } = this.getAccountData(ns) || {};
          if (caipAddress && ((_a = adapter.connectionControllerClient) == null ? void 0 : _a.disconnect)) {
            await adapter.connectionControllerClient.disconnect(ns);
          }
          this.resetAccount(ns);
          this.resetNetwork(ns);
        } catch (error) {
          throw new Error(`Failed to disconnect chain ${ns}: ${error.message}`);
        }
      }));
      ConnectionController.resetWcConnection();
      const failures = disconnectResults.filter((result) => result.status === "rejected");
      if (failures.length > 0) {
        throw new Error(failures.map((f7) => f7.reason.message).join(", "));
      }
      StorageUtil.deleteConnectedSocialProvider();
      if (namespace) {
        ConnectorController.removeConnectorId(namespace);
      } else {
        ConnectorController.resetConnectorIds();
      }
      EventsController.sendEvent({
        type: "track",
        event: "DISCONNECT_SUCCESS",
        properties: {
          namespace: namespace || "all"
        }
      });
    } catch (error) {
      console.error(error.message || "Failed to disconnect chains");
      EventsController.sendEvent({
        type: "track",
        event: "DISCONNECT_ERROR",
        properties: {
          message: error.message || "Failed to disconnect chains"
        }
      });
    }
  },
  setIsSwitchingNamespace(isSwitchingNamespace) {
    state17.isSwitchingNamespace = isSwitchingNamespace;
  },
  getFirstCaipNetworkSupportsAuthConnector() {
    var _a, _b;
    const availableChains = [];
    let firstCaipNetwork = void 0;
    state17.chains.forEach((chain) => {
      if (ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((ns) => ns === chain.namespace)) {
        if (chain.namespace) {
          availableChains.push(chain.namespace);
        }
      }
    });
    if (availableChains.length > 0) {
      const firstAvailableChain = availableChains[0];
      firstCaipNetwork = firstAvailableChain ? (_b = (_a = state17.chains.get(firstAvailableChain)) == null ? void 0 : _a.caipNetworks) == null ? void 0 : _b[0] : void 0;
      return firstCaipNetwork;
    }
    return void 0;
  },
  getAccountData(chainNamespace) {
    var _a;
    if (!chainNamespace) {
      return AccountController.state;
    }
    return (_a = ChainController.state.chains.get(chainNamespace)) == null ? void 0 : _a.accountState;
  },
  getNetworkData(chainNamespace) {
    var _a;
    const namespace = chainNamespace || state17.activeChain;
    if (!namespace) {
      return void 0;
    }
    return (_a = ChainController.state.chains.get(namespace)) == null ? void 0 : _a.networkState;
  },
  getCaipNetworkByNamespace(chainNamespace, chainId) {
    var _a, _b, _c;
    if (!chainNamespace) {
      return void 0;
    }
    const chain = ChainController.state.chains.get(chainNamespace);
    const byChainId = (_a = chain == null ? void 0 : chain.caipNetworks) == null ? void 0 : _a.find((network) => network.id === chainId);
    if (byChainId) {
      return byChainId;
    }
    return ((_b = chain == null ? void 0 : chain.networkState) == null ? void 0 : _b.caipNetwork) || ((_c = chain == null ? void 0 : chain.caipNetworks) == null ? void 0 : _c[0]);
  },
  /**
   * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
   * @param namespace - The namespace to get the requested CaipNetwork IDs for
   * @returns The requested CaipNetwork IDs
   */
  getRequestedCaipNetworkIds() {
    const namespace = ConnectorController.state.filterByNamespace;
    const chains = namespace ? [state17.chains.get(namespace)] : Array.from(state17.chains.values());
    return chains.flatMap((chain) => (chain == null ? void 0 : chain.caipNetworks) || []).map((caipNetwork) => caipNetwork.caipNetworkId);
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js
var baseUrl3 = CoreHelperUtil.getApiUrl();
var api2 = new FetchUtil({ baseUrl: baseUrl3, clientId: null });
var entries = "40";
var recommendedEntries = "4";
var imageCountToFetch = 20;
var state18 = proxy({
  promises: {},
  page: 1,
  count: 0,
  featured: [],
  allFeatured: [],
  recommended: [],
  allRecommended: [],
  wallets: [],
  search: [],
  isAnalyticsEnabled: false,
  excludedWallets: [],
  isFetchingRecommendedWallets: false
});
var ApiController = {
  state: state18,
  subscribeKey(key, callback) {
    return subscribeKey(state18, key, callback);
  },
  _getSdkProperties() {
    const { projectId, sdkType, sdkVersion } = OptionsController.state;
    return {
      projectId,
      st: sdkType || "appkit",
      sv: sdkVersion || "html-wagmi-4.2.2"
    };
  },
  _filterOutExtensions(wallets) {
    if (OptionsController.state.isUniversalProvider) {
      return wallets.filter((w4) => Boolean(w4.mobile_link || w4.desktop_link || w4.webapp_link));
    }
    return wallets;
  },
  async _fetchWalletImage(imageId) {
    const imageUrl = `${api2.baseUrl}/getWalletImage/${imageId}`;
    const blob = await api2.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setWalletImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchNetworkImage(imageId) {
    const imageUrl = `${api2.baseUrl}/public/getAssetImage/${imageId}`;
    const blob = await api2.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setNetworkImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchConnectorImage(imageId) {
    const imageUrl = `${api2.baseUrl}/public/getAssetImage/${imageId}`;
    const blob = await api2.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setConnectorImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchCurrencyImage(countryCode) {
    const imageUrl = `${api2.baseUrl}/public/getCurrencyImage/${countryCode}`;
    const blob = await api2.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setCurrencyImage(countryCode, URL.createObjectURL(blob));
  },
  async _fetchTokenImage(symbol) {
    const imageUrl = `${api2.baseUrl}/public/getTokenImage/${symbol}`;
    const blob = await api2.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setTokenImage(symbol, URL.createObjectURL(blob));
  },
  async fetchNetworkImages() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const ids = requestedCaipNetworks == null ? void 0 : requestedCaipNetworks.map(({ assets }) => assets == null ? void 0 : assets.imageId).filter(Boolean).filter((imageId) => !AssetUtil.getNetworkImageById(imageId));
    if (ids) {
      await Promise.allSettled(ids.map((id) => ApiController._fetchNetworkImage(id)));
    }
  },
  async fetchConnectorImages() {
    const { connectors } = ConnectorController.state;
    const ids = connectors.map(({ imageId }) => imageId).filter(Boolean);
    await Promise.allSettled(ids.map((id) => ApiController._fetchConnectorImage(id)));
  },
  async fetchCurrencyImages(currencies = []) {
    await Promise.allSettled(currencies.map((currency) => ApiController._fetchCurrencyImage(currency)));
  },
  async fetchTokenImages(tokens = []) {
    await Promise.allSettled(tokens.map((token) => ApiController._fetchTokenImage(token)));
  },
  async fetchFeaturedWallets() {
    const { featuredWalletIds } = OptionsController.state;
    if (featuredWalletIds == null ? void 0 : featuredWalletIds.length) {
      const { data } = await api2.get({
        path: "/getWallets",
        params: {
          ...ApiController._getSdkProperties(),
          page: "1",
          entries: (featuredWalletIds == null ? void 0 : featuredWalletIds.length) ? String(featuredWalletIds.length) : recommendedEntries,
          include: featuredWalletIds == null ? void 0 : featuredWalletIds.join(",")
        }
      });
      data.sort((a3, b4) => featuredWalletIds.indexOf(a3.id) - featuredWalletIds.indexOf(b4.id));
      const images = data.map((d5) => d5.image_id).filter(Boolean);
      await Promise.allSettled(images.map((id) => ApiController._fetchWalletImage(id)));
      state18.featured = data;
      state18.allFeatured = data;
    }
  },
  async fetchRecommendedWallets() {
    try {
      state18.isFetchingRecommendedWallets = true;
      const { includeWalletIds, excludeWalletIds, featuredWalletIds } = OptionsController.state;
      const exclude = [...excludeWalletIds ?? [], ...featuredWalletIds ?? []].filter(Boolean);
      const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
      const { data, count } = await api2.get({
        path: "/getWallets",
        params: {
          ...ApiController._getSdkProperties(),
          page: "1",
          chains: caipNetworkIds,
          entries: recommendedEntries,
          include: includeWalletIds == null ? void 0 : includeWalletIds.join(","),
          exclude: exclude == null ? void 0 : exclude.join(",")
        }
      });
      const recent = StorageUtil.getRecentWallets();
      const recommendedImages = data.map((d5) => d5.image_id).filter(Boolean);
      const recentImages = recent.map((r3) => r3.image_id).filter(Boolean);
      await Promise.allSettled([...recommendedImages, ...recentImages].map((id) => ApiController._fetchWalletImage(id)));
      state18.recommended = data;
      state18.allRecommended = data;
      state18.count = count ?? 0;
    } catch {
    } finally {
      state18.isFetchingRecommendedWallets = false;
    }
  },
  async fetchWallets({ page }) {
    const { includeWalletIds, excludeWalletIds, featuredWalletIds } = OptionsController.state;
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    const exclude = [
      ...state18.recommended.map(({ id }) => id),
      ...excludeWalletIds ?? [],
      ...featuredWalletIds ?? []
    ].filter(Boolean);
    const { data, count } = await api2.get({
      path: "/getWallets",
      params: {
        ...ApiController._getSdkProperties(),
        page: String(page),
        entries,
        chains: caipNetworkIds,
        include: includeWalletIds == null ? void 0 : includeWalletIds.join(","),
        exclude: exclude.join(",")
      }
    });
    const images = data.slice(0, imageCountToFetch).map((w4) => w4.image_id).filter(Boolean);
    await Promise.allSettled(images.map((id) => ApiController._fetchWalletImage(id)));
    state18.wallets = CoreHelperUtil.uniqueBy([...state18.wallets, ...ApiController._filterOutExtensions(data)], "id");
    state18.count = count > state18.count ? count : state18.count;
    state18.page = page;
  },
  async initializeExcludedWallets({ ids }) {
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    const { data } = await api2.get({
      path: "/getWallets",
      params: {
        ...ApiController._getSdkProperties(),
        page: "1",
        entries: String(ids.length),
        chains: caipNetworkIds,
        include: ids == null ? void 0 : ids.join(",")
      }
    });
    if (data) {
      data.forEach((wallet) => {
        if (wallet == null ? void 0 : wallet.rdns) {
          state18.excludedWallets.push({ rdns: wallet.rdns, name: wallet.name });
        }
      });
    }
  },
  async searchWallet({ search, badge }) {
    const { includeWalletIds, excludeWalletIds } = OptionsController.state;
    state18.search = [];
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    const { data } = await api2.get({
      path: "/getWallets",
      params: {
        ...ApiController._getSdkProperties(),
        page: "1",
        entries: "100",
        search: search == null ? void 0 : search.trim(),
        badge_type: badge,
        chains: caipNetworkIds,
        include: includeWalletIds == null ? void 0 : includeWalletIds.join(","),
        exclude: excludeWalletIds == null ? void 0 : excludeWalletIds.join(",")
      }
    });
    EventsController.sendEvent({
      type: "track",
      event: "SEARCH_WALLET",
      properties: { badge: badge ?? "", search: search ?? "" }
    });
    const images = data.map((w4) => w4.image_id).filter(Boolean);
    await Promise.allSettled([
      ...images.map((id) => ApiController._fetchWalletImage(id)),
      CoreHelperUtil.wait(300)
    ]);
    state18.search = ApiController._filterOutExtensions(data);
  },
  initPromise(key, fetchFn) {
    const existingPromise = state18.promises[key];
    if (existingPromise) {
      return existingPromise;
    }
    return state18.promises[key] = fetchFn();
  },
  prefetch({ fetchConnectorImages = true, fetchFeaturedWallets = true, fetchRecommendedWallets = true, fetchNetworkImages = true } = {}) {
    const promises = [
      fetchConnectorImages && ApiController.initPromise("connectorImages", ApiController.fetchConnectorImages),
      fetchFeaturedWallets && ApiController.initPromise("featuredWallets", ApiController.fetchFeaturedWallets),
      fetchRecommendedWallets && ApiController.initPromise("recommendedWallets", ApiController.fetchRecommendedWallets),
      fetchNetworkImages && ApiController.initPromise("networkImages", ApiController.fetchNetworkImages)
    ].filter(Boolean);
    return Promise.allSettled(promises);
  },
  prefetchAnalyticsConfig() {
    var _a;
    if ((_a = OptionsController.state.features) == null ? void 0 : _a.analytics) {
      ApiController.fetchAnalyticsConfig();
    }
  },
  async fetchAnalyticsConfig() {
    try {
      const { isAnalyticsEnabled } = await api2.get({
        path: "/getAnalyticsConfig",
        params: ApiController._getSdkProperties()
      });
      OptionsController.setFeatures({ analytics: isAnalyticsEnabled });
    } catch (error) {
      OptionsController.setFeatures({ analytics: false });
    }
  },
  setFilterByNamespace(namespace) {
    if (!namespace) {
      state18.featured = state18.allFeatured;
      state18.recommended = state18.allRecommended;
      return;
    }
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    state18.featured = state18.allFeatured.filter((wallet) => {
      var _a;
      return (_a = wallet.chains) == null ? void 0 : _a.some((chain) => caipNetworkIds.includes(chain));
    });
    state18.recommended = state18.allRecommended.filter((wallet) => {
      var _a;
      return (_a = wallet.chains) == null ? void 0 : _a.some((chain) => caipNetworkIds.includes(chain));
    });
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OnRampController.js
var USDC_CURRENCY_DEFAULT = {
  id: "2b92315d-eab7-5bef-84fa-089a131333f5",
  name: "USD Coin",
  symbol: "USDC",
  networks: [
    {
      name: "ethereum-mainnet",
      display_name: "Ethereum",
      chain_id: "1",
      contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    },
    {
      name: "polygon-mainnet",
      display_name: "Polygon",
      chain_id: "137",
      contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    }
  ]
};
var USD_CURRENCY_DEFAULT = {
  id: "USD",
  payment_method_limits: [
    {
      id: "card",
      min: "10.00",
      max: "7500.00"
    },
    {
      id: "ach_bank_account",
      min: "10.00",
      max: "25000.00"
    }
  ]
};
var defaultState = {
  providers: ONRAMP_PROVIDERS,
  selectedProvider: null,
  error: null,
  purchaseCurrency: USDC_CURRENCY_DEFAULT,
  paymentCurrency: USD_CURRENCY_DEFAULT,
  purchaseCurrencies: [USDC_CURRENCY_DEFAULT],
  paymentCurrencies: [],
  quotesLoading: false
};
var state19 = proxy(defaultState);

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SwapController.js
var initialState = {
  // Loading states
  initializing: false,
  initialized: false,
  loadingPrices: false,
  loadingQuote: false,
  loadingApprovalTransaction: false,
  loadingBuildTransaction: false,
  loadingTransaction: false,
  // Error states
  fetchError: false,
  // Approval & Swap transaction states
  approvalTransaction: void 0,
  swapTransaction: void 0,
  transactionError: void 0,
  // Input values
  sourceToken: void 0,
  sourceTokenAmount: "",
  sourceTokenPriceInUSD: 0,
  toToken: void 0,
  toTokenAmount: "",
  toTokenPriceInUSD: 0,
  networkPrice: "0",
  networkBalanceInUSD: "0",
  networkTokenSymbol: "",
  inputError: void 0,
  // Request values
  slippage: ConstantsUtil2.CONVERT_SLIPPAGE_TOLERANCE,
  // Tokens
  tokens: void 0,
  popularTokens: void 0,
  suggestedTokens: void 0,
  foundTokens: void 0,
  myTokensWithBalance: void 0,
  tokensPriceMap: {},
  // Calculations
  gasFee: "0",
  gasPriceInUSD: 0,
  priceImpact: void 0,
  maxSlippage: void 0,
  providerFee: void 0
};
var state20 = proxy(initialState);

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TooltipController.js
var state21 = proxy({
  message: "",
  open: false,
  triggerRect: {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  },
  variant: "shade"
});
var TooltipController = {
  state: state21,
  subscribe(callback) {
    return subscribe(state21, () => callback(state21));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state21, key, callback);
  },
  showTooltip({ message, triggerRect, variant }) {
    state21.open = true;
    state21.message = message;
    state21.triggerRect = triggerRect;
    state21.variant = variant;
  },
  hide() {
    state21.open = false;
    state21.message = "";
    state21.triggerRect = {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    };
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/utils/EnsUtil.js
var SLIP44_MSB = 2147483648;
var EnsUtil = {
  convertEVMChainIdToCoinType(chainId) {
    if (chainId >= SLIP44_MSB) {
      throw new Error("Invalid chainId");
    }
    return (SLIP44_MSB | chainId) >>> 0;
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EnsController.js
var state22 = proxy({
  suggestions: [],
  loading: false
});
var EnsController = {
  state: state22,
  subscribe(callback) {
    return subscribe(state22, () => callback(state22));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state22, key, callback);
  },
  async resolveName(name2) {
    var _a, _b;
    try {
      return await BlockchainApiController.lookupEnsName(name2);
    } catch (e3) {
      const error = e3;
      throw new Error(((_b = (_a = error == null ? void 0 : error.reasons) == null ? void 0 : _a[0]) == null ? void 0 : _b.description) || "Error resolving name");
    }
  },
  async isNameRegistered(name2) {
    try {
      await BlockchainApiController.lookupEnsName(name2);
      return true;
    } catch {
      return false;
    }
  },
  async getSuggestions(value) {
    try {
      state22.loading = true;
      state22.suggestions = [];
      const response = await BlockchainApiController.getEnsNameSuggestions(value);
      state22.suggestions = response.suggestions.map((suggestion) => ({
        ...suggestion,
        name: suggestion.name
      })) || [];
      return state22.suggestions;
    } catch (e3) {
      const errorMessage = this.parseEnsApiError(e3, "Error fetching name suggestions");
      throw new Error(errorMessage);
    } finally {
      state22.loading = false;
    }
  },
  async getNamesForAddress(address) {
    try {
      const network = ChainController.state.activeCaipNetwork;
      if (!network) {
        return [];
      }
      const cachedEns = StorageUtil.getEnsFromCacheForAddress(address);
      if (cachedEns) {
        return cachedEns;
      }
      const response = await BlockchainApiController.reverseLookupEnsName({ address });
      StorageUtil.updateEnsCache({
        address,
        ens: response,
        timestamp: Date.now()
      });
      return response;
    } catch (e3) {
      const errorMessage = this.parseEnsApiError(e3, "Error fetching names for address");
      throw new Error(errorMessage);
    }
  },
  async registerName(name2) {
    const network = ChainController.state.activeCaipNetwork;
    if (!network) {
      throw new Error("Network not found");
    }
    const address = AccountController.state.address;
    const emailConnector = ConnectorController.getAuthConnector();
    if (!address || !emailConnector) {
      throw new Error("Address or auth connector not found");
    }
    state22.loading = true;
    try {
      const message = JSON.stringify({
        name: name2,
        attributes: {},
        // Unix timestamp
        timestamp: Math.floor(Date.now() / 1e3)
      });
      RouterController.pushTransactionStack({
        view: "RegisterAccountNameSuccess",
        goBack: false,
        replace: true,
        onCancel() {
          state22.loading = false;
        }
      });
      const signature = await ConnectionController.signMessage(message);
      const networkId = network.id;
      if (!networkId) {
        throw new Error("Network not found");
      }
      const coinType = EnsUtil.convertEVMChainIdToCoinType(Number(networkId));
      await BlockchainApiController.registerEnsName({
        coinType,
        address,
        signature,
        message
      });
      AccountController.setProfileName(name2, network.chainNamespace);
      RouterController.replace("RegisterAccountNameSuccess");
    } catch (e3) {
      const errorMessage = this.parseEnsApiError(e3, `Error registering name ${name2}`);
      RouterController.replace("RegisterAccountName");
      throw new Error(errorMessage);
    } finally {
      state22.loading = false;
    }
  },
  validateName(name2) {
    return /^[a-zA-Z0-9-]{4,}$/u.test(name2);
  },
  parseEnsApiError(error, defaultError) {
    var _a, _b;
    const ensError = error;
    return ((_b = (_a = ensError == null ? void 0 : ensError.reasons) == null ? void 0 : _a[0]) == null ? void 0 : _b.description) || defaultError;
  }
};

// node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsStateController.js
var state23 = proxy({
  isLegalCheckboxChecked: false
});

// node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var themeTag = void 0;
var darkModeTag = void 0;
var lightModeTag = void 0;
function initializeTheming(themeVariables, themeMode) {
  themeTag = document.createElement("style");
  darkModeTag = document.createElement("style");
  lightModeTag = document.createElement("style");
  themeTag.textContent = createRootStyles(themeVariables).core.cssText;
  darkModeTag.textContent = createRootStyles(themeVariables).dark.cssText;
  lightModeTag.textContent = createRootStyles(themeVariables).light.cssText;
  document.head.appendChild(themeTag);
  document.head.appendChild(darkModeTag);
  document.head.appendChild(lightModeTag);
  setColorTheme(themeMode);
}
function setColorTheme(themeMode) {
  if (darkModeTag && lightModeTag) {
    if (themeMode === "light") {
      darkModeTag.removeAttribute("media");
      lightModeTag.media = "enabled";
    } else {
      lightModeTag.removeAttribute("media");
      darkModeTag.media = "enabled";
    }
  }
}
function setThemeVariables(themeVariables) {
  if (themeTag && darkModeTag && lightModeTag) {
    themeTag.textContent = createRootStyles(themeVariables).core.cssText;
    darkModeTag.textContent = createRootStyles(themeVariables).dark.cssText;
    lightModeTag.textContent = createRootStyles(themeVariables).light.cssText;
  }
}
function createRootStyles(themeVariables) {
  return {
    core: css`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --w3m-modal-width: 360px;
        --w3m-color-mix-strength: ${unsafeCSS((themeVariables == null ? void 0 : themeVariables["--w3m-color-mix-strength"]) ? `${themeVariables["--w3m-color-mix-strength"]}%` : "0%")};
        --w3m-font-family: ${unsafeCSS((themeVariables == null ? void 0 : themeVariables["--w3m-font-family"]) || "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${unsafeCSS((themeVariables == null ? void 0 : themeVariables["--w3m-font-size-master"]) || "10px")};
        --w3m-border-radius-master: ${unsafeCSS((themeVariables == null ? void 0 : themeVariables["--w3m-border-radius-master"]) || "4px")};
        --w3m-z-index: ${unsafeCSS((themeVariables == null ? void 0 : themeVariables["--w3m-z-index"]) || 999)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-mini: calc(var(--w3m-font-size-master) * 0.8);
        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-medium: calc(var(--w3m-font-size-master) * 1.8);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);
        --wui-font-size-title-6: calc(var(--w3m-font-size-master) * 2.2);
        --wui-font-size-medium-title: calc(var(--w3m-font-size-master) * 2.4);
        --wui-font-size-2xl: calc(var(--w3m-font-size-master) * 4);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-2xl: -1.6px;
        --wui-letter-spacing-medium-title: -0.96px;
        --wui-letter-spacing-title-6: -0.88px;
        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-medium: -0.72px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;
        --wui-letter-spacing-mini: -0.16px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;
        --wui-spacing-5xl: 95px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-mdl: 36px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-2lg: 48px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;
        --wui-icon-size-xxl: 28px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-visual-size-size-inherit: inherit;
        --wui-visual-size-sm: 40px;
        --wui-visual-size-md: 55px;
        --wui-visual-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --wui-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-width-network-sm: 36px;
        --wui-width-network-md: 48px;
        --wui-width-network-lg: 86px;

        --wui-height-network-sm: 40px;
        --wui-height-network-md: 54px;
        --wui-height-network-lg: 96px;

        --wui-icon-size-network-xs: 12px;
        --wui-icon-size-network-sm: 16px;
        --wui-icon-size-network-md: 24px;
        --wui-icon-size-network-lg: 42px;

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-color-success-100: var(--wui-color-success-base-100);
        --wui-color-success-125: var(--wui-color-success-base-125);

        --wui-color-warning-100: var(--wui-color-warning-base-100);

        --wui-color-error-100: var(--wui-color-error-base-100);
        --wui-color-error-125: var(--wui-color-error-base-125);

        --wui-color-blue-100: var(--wui-color-blue-base-100);
        --wui-color-blue-90: var(--wui-color-blue-base-90);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-wallet-button-bg: var(--wui-wallet-button-bg-base);

        --wui-box-shadow-blue: var(--wui-color-accent-glass-020);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 20%, transparent);

          --wui-color-accent-100: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 100%,
            transparent
          );
          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-color-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-color-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-color-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-300)
          );
          --wui-color-fg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-325)
          );
          --wui-color-fg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-350)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-300)
          );
          --wui-color-bg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-325)
          );
          --wui-color-bg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-350)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-success-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-125)
          );

          --wui-color-warning-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-warning-base-100)
          );

          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );
          --wui-color-blue-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-100)
          );
          --wui-color-blue-90: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-90)
          );
          --wui-color-error-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-125)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );

          --wui-wallet-button-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-wallet-button-bg-base)
          );
        }
      }
    `,
    light: css`
      :root {
        --w3m-color-mix: ${unsafeCSS((themeVariables == null ? void 0 : themeVariables["--w3m-color-mix"]) || "#fff")};
        --w3m-accent: ${unsafeCSS(getW3mThemeVariables(themeVariables, "dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${unsafeCSS(getW3mThemeVariables(themeVariables, "dark")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(230, 100%, 67%, 1);
        --wui-color-blueberry-090: hsla(231, 76%, 61%, 1);
        --wui-color-blueberry-080: hsla(230, 59%, 55%, 1);
        --wui-color-blueberry-050: hsla(231, 100%, 70%, 0.1);

        --wui-color-fg-100: #e4e7e7;
        --wui-color-fg-125: #d0d5d5;
        --wui-color-fg-150: #a8b1b1;
        --wui-color-fg-175: #a8b0b0;
        --wui-color-fg-200: #949e9e;
        --wui-color-fg-225: #868f8f;
        --wui-color-fg-250: #788080;
        --wui-color-fg-275: #788181;
        --wui-color-fg-300: #6e7777;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #363636;

        --wui-color-bg-100: #141414;
        --wui-color-bg-125: #191a1a;
        --wui-color-bg-150: #1e1f1f;
        --wui-color-bg-175: #222525;
        --wui-color-bg-200: #272a2a;
        --wui-color-bg-225: #2c3030;
        --wui-color-bg-250: #313535;
        --wui-color-bg-275: #363b3b;
        --wui-color-bg-300: #3b4040;
        --wui-color-bg-325: #252525;
        --wui-color-bg-350: #ffffff;

        --wui-color-success-base-100: #26d962;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f25a67;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(242, 90, 103, 0.01);
        --wui-color-error-glass-002: rgba(242, 90, 103, 0.02);
        --wui-color-error-glass-005: rgba(242, 90, 103, 0.05);
        --wui-color-error-glass-010: rgba(242, 90, 103, 0.1);
        --wui-color-error-glass-015: rgba(242, 90, 103, 0.15);
        --wui-color-error-glass-020: rgba(242, 90, 103, 0.2);
        --wui-color-error-glass-025: rgba(242, 90, 103, 0.25);
        --wui-color-error-glass-030: rgba(242, 90, 103, 0.3);
        --wui-color-error-glass-060: rgba(242, 90, 103, 0.6);
        --wui-color-error-glass-080: rgba(242, 90, 103, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-color-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-color-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-color-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-color-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-color-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-color-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-color-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-color-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-color-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-color-gray-glass-080: rgba(255, 255, 255, 0.8);
        --wui-color-gray-glass-090: rgba(255, 255, 255, 0.9);

        --wui-color-dark-glass-100: rgba(42, 42, 42, 1);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: #1f3a28;
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --w3m-card-embedded-shadow-color: rgb(17 17 18 / 25%);
      }
    `,
    dark: css`
      :root {
        --w3m-color-mix: ${unsafeCSS((themeVariables == null ? void 0 : themeVariables["--w3m-color-mix"]) || "#000")};
        --w3m-accent: ${unsafeCSS(getW3mThemeVariables(themeVariables, "light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${unsafeCSS(getW3mThemeVariables(themeVariables, "light")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(231, 100%, 70%, 1);
        --wui-color-blueberry-090: hsla(231, 97%, 72%, 1);
        --wui-color-blueberry-080: hsla(231, 92%, 74%, 1);

        --wui-color-fg-100: #141414;
        --wui-color-fg-125: #2d3131;
        --wui-color-fg-150: #474d4d;
        --wui-color-fg-175: #636d6d;
        --wui-color-fg-200: #798686;
        --wui-color-fg-225: #828f8f;
        --wui-color-fg-250: #8b9797;
        --wui-color-fg-275: #95a0a0;
        --wui-color-fg-300: #9ea9a9;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #d0d0d0;

        --wui-color-bg-100: #ffffff;
        --wui-color-bg-125: #f5fafa;
        --wui-color-bg-150: #f3f8f8;
        --wui-color-bg-175: #eef4f4;
        --wui-color-bg-200: #eaf1f1;
        --wui-color-bg-225: #e5eded;
        --wui-color-bg-250: #e1e9e9;
        --wui-color-bg-275: #dce7e7;
        --wui-color-bg-300: #d8e3e3;
        --wui-color-bg-325: #f3f3f3;
        --wui-color-bg-350: #202020;

        --wui-color-success-base-100: #26b562;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f05142;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(240, 81, 66, 0.01);
        --wui-color-error-glass-002: rgba(240, 81, 66, 0.02);
        --wui-color-error-glass-005: rgba(240, 81, 66, 0.05);
        --wui-color-error-glass-010: rgba(240, 81, 66, 0.1);
        --wui-color-error-glass-015: rgba(240, 81, 66, 0.15);
        --wui-color-error-glass-020: rgba(240, 81, 66, 0.2);
        --wui-color-error-glass-025: rgba(240, 81, 66, 0.25);
        --wui-color-error-glass-030: rgba(240, 81, 66, 0.3);
        --wui-color-error-glass-060: rgba(240, 81, 66, 0.6);
        --wui-color-error-glass-080: rgba(240, 81, 66, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --wui-color-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-color-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-color-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-color-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-color-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-color-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-color-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-color-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-color-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-color-gray-glass-080: rgba(0, 0, 0, 0.8);
        --wui-color-gray-glass-090: rgba(0, 0, 0, 0.9);

        --wui-color-dark-glass-100: rgba(233, 233, 233, 1);

        --w3m-card-embedded-shadow-color: rgb(224 225 233 / 25%);
      }
    `
  };
}
var resetStyles = css`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`;
var elementStyles = css`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      box-shadow var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border, box-shadow, border-radius;
    outline: none;
    border: none;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  wui-flex {
    transition: border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius;
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-005);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }
  }

  button:disabled > wui-icon-box {
    opacity: 0.5;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`;
var colorStyles = css`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-blue-100 {
    color: var(--wui-color-blue-100);
  }

  .wui-color-blue-90 {
    color: var(--wui-color-blue-90);
  }

  .wui-color-error-125 {
    color: var(--wui-color-error-125);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-success-125 {
    color: var(--wui-color-success-125);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    color: var(--wui-color-fg-350);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-error-125 {
    background-color: var(--wui-color-error-125);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-success-125 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    background-color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    background-color: var(--wui-color-fg-350);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js
var UiHelperUtil = {
  getSpacingStyles(spacing, index2) {
    if (Array.isArray(spacing)) {
      return spacing[index2] ? `var(--wui-spacing-${spacing[index2]})` : void 0;
    } else if (typeof spacing === "string") {
      return `var(--wui-spacing-${spacing})`;
    }
    return void 0;
  },
  getFormattedDate(date) {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
  },
  getHostName(url) {
    try {
      const newUrl = new URL(url);
      return newUrl.hostname;
    } catch (error) {
      return "";
    }
  },
  getTruncateString({ string: string2, charsStart, charsEnd, truncate }) {
    if (string2.length <= charsStart + charsEnd) {
      return string2;
    }
    if (truncate === "end") {
      return `${string2.substring(0, charsStart)}...`;
    } else if (truncate === "start") {
      return `...${string2.substring(string2.length - charsEnd)}`;
    }
    return `${string2.substring(0, Math.floor(charsStart))}...${string2.substring(string2.length - Math.floor(charsEnd))}`;
  },
  generateAvatarColors(address) {
    const hash = address.toLowerCase().replace(/^0x/iu, "").replace(/[^a-f0-9]/gu, "");
    const baseColor = hash.substring(0, 6).padEnd(6, "0");
    const rgbColor = this.hexToRgb(baseColor);
    const masterBorderRadius = getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master");
    const radius = Number(masterBorderRadius == null ? void 0 : masterBorderRadius.replace("px", ""));
    const edge = 100 - 3 * radius;
    const gradientCircle = `${edge}% ${edge}% at 65% 40%`;
    const colors = [];
    for (let i5 = 0; i5 < 5; i5 += 1) {
      const tintedColor = this.tintColor(rgbColor, 0.15 * i5);
      colors.push(`rgb(${tintedColor[0]}, ${tintedColor[1]}, ${tintedColor[2]})`);
    }
    return `
    --local-color-1: ${colors[0]};
    --local-color-2: ${colors[1]};
    --local-color-3: ${colors[2]};
    --local-color-4: ${colors[3]};
    --local-color-5: ${colors[4]};
    --local-radial-circle: ${gradientCircle}
   `;
  },
  hexToRgb(hex) {
    const bigint = parseInt(hex, 16);
    const r3 = bigint >> 16 & 255;
    const g4 = bigint >> 8 & 255;
    const b4 = bigint & 255;
    return [r3, g4, b4];
  },
  tintColor(rgb, tint) {
    const [r3, g4, b4] = rgb;
    const tintedR = Math.round(r3 + (255 - r3) * tint);
    const tintedG = Math.round(g4 + (255 - g4) * tint);
    const tintedB = Math.round(b4 + (255 - b4) * tint);
    return [tintedR, tintedG, tintedB];
  },
  isNumber(character) {
    const regex = {
      number: /^[0-9]+$/u
    };
    return regex.number.test(character);
  },
  getColorTheme(theme) {
    var _a;
    if (theme) {
      return theme;
    } else if (typeof window !== "undefined" && window.matchMedia) {
      if ((_a = window.matchMedia("(prefers-color-scheme: dark)")) == null ? void 0 : _a.matches) {
        return "dark";
      }
      return "light";
    }
    return "dark";
  },
  splitBalance(input) {
    const parts = input.split(".");
    if (parts.length === 2) {
      return [parts[0], parts[1]];
    }
    return ["0", "00"];
  },
  roundNumber(number, threshold, fixed) {
    const roundedNumber = number.toString().length >= threshold ? Number(number).toFixed(fixed) : number;
    return roundedNumber;
  },
  formatNumberToLocalString(value, decimals = 2) {
    if (value === void 0) {
      return "0.00";
    }
    if (typeof value === "number") {
      return value.toLocaleString("en-US", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      });
    }
    return parseFloat(value).toLocaleString("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    });
  }
};

// node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
function standardCustomElement(tagName, descriptor) {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      if (!customElements.get(tagName)) {
        customElements.define(tagName, clazz);
      }
    }
  };
}
function legacyCustomElement(tagName, clazz) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, clazz);
  }
  return clazz;
}
function customElement(tagName) {
  return function create4(classOrDescriptor) {
    return typeof classOrDescriptor === "function" ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
  };
}

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConstantsUtil.js
var ConstantsUtil3 = {
  ACCOUNT_TABS: [{ label: "Tokens" }, { label: "NFTs" }, { label: "Activity" }],
  SECURE_SITE_ORIGIN: (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org",
  VIEW_DIRECTION: {
    Next: "next",
    Prev: "prev"
  },
  DEFAULT_CONNECT_METHOD_ORDER: ["email", "social", "wallet"],
  ANIMATION_DURATIONS: {
    HeaderText: 120,
    ModalHeight: 150,
    ViewTransition: 150
  }
};

export {
  require_cjs,
  IEvents,
  r,
  i2 as i,
  destr,
  createStore,
  get,
  set,
  del,
  clear,
  keys,
  safeJsonParse,
  safeJsonStringify,
  import_pino2 as import_pino,
  k,
  y2 as y,
  E,
  A,
  Qe,
  sn,
  Po,
  Qo,
  detect,
  require_cjs2,
  require_cjs3,
  concat4 as concat,
  fromString6 as fromString,
  toString3 as toString,
  C2 as C,
  payloadId,
  getBigIntRpcId,
  formatJsonRpcRequest,
  formatJsonRpcResult,
  formatJsonRpcError,
  isJsonRpcRequest,
  isJsonRpcResponse,
  isJsonRpcResult,
  isJsonRpcError,
  esm_exports,
  o3 as o,
  f5 as f,
  f6 as f2,
  NetworkUtil,
  ConstantsUtil,
  ParseUtil,
  proxy,
  subscribe,
  ref,
  subscribeKey,
  ConstantsUtil2,
  StorageUtil,
  CoreHelperUtil,
  AssetController,
  AssetUtil,
  OptionsController,
  AlertController,
  EventsController,
  ApiController,
  RouterController,
  ThemeController,
  ConnectorController,
  h3 as h,
  I2 as I,
  y3 as y2,
  m2 as m,
  d2 as d,
  f3,
  P2 as P,
  S2 as S,
  M,
  O2 as O,
  R,
  J,
  V,
  SnackController,
  SIWXUtil,
  ConnectionController,
  PublicStateController,
  toRlp2 as toRlp,
  formatTransaction2 as formatTransaction,
  defineTransaction2 as defineTransaction,
  defineBlock2 as defineBlock,
  sha2565 as sha256,
  formatLog2 as formatLog,
  AccountNotFoundError2 as AccountNotFoundError,
  defineTransactionReceipt2 as defineTransactionReceipt,
  fallback2 as fallback,
  http2 as http,
  defineChain2 as defineChain,
  serializeAccessList2 as serializeAccessList,
  serializeTransaction2 as serializeTransaction,
  toYParitySignatureArray2 as toYParitySignatureArray,
  ChainController,
  BlockchainApiController,
  AccountController,
  ModalController,
  TooltipController,
  EnsController,
  ConstantsUtil3,
  initializeTheming,
  setColorTheme,
  setThemeVariables,
  resetStyles,
  elementStyles,
  colorStyles,
  UiHelperUtil,
  customElement
};
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@walletconnect/relay-auth/dist/index.es.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@walletconnect/utils/dist/index.es.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=chunk-TARECR2R.js.map

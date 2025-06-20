import {
  init_sha2,
  sha256
} from "./chunk-VESSVHNC.js";
import {
  __commonJS,
  __esm
} from "./chunk-MVEJMUOB.js";

// node_modules/@noble/hashes/esm/sha256.js
var sha2562;
var init_sha256 = __esm({
  "node_modules/@noble/hashes/esm/sha256.js"() {
    init_sha2();
    sha2562 = sha256;
  }
});

// browser-external:buffer
var require_buffer = __commonJS({
  "browser-external:buffer"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "buffer" has been externalized for browser compatibility. Cannot access "buffer.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

export {
  require_buffer,
  sha2562 as sha256,
  init_sha256
};
//# sourceMappingURL=chunk-KPHJQWGP.js.map

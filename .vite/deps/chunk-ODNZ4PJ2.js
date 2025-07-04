import {
  UiHelperUtil,
  colorStyles,
  customElement,
  elementStyles,
  resetStyles
} from "./chunk-TARECR2R.js";
import {
  LitElement,
  _$LH,
  css,
  defaultConverter,
  html,
  noChange,
  notEqual,
  nothing
} from "./chunk-366LDVMV.js";

// node_modules/@lit/reactive-element/development/decorators/property.js
var DEV_MODE = true;
var issueWarning;
if (DEV_MODE) {
  globalThis.litIssuedWarnings ?? (globalThis.litIssuedWarnings = /* @__PURE__ */ new Set());
  issueWarning = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!globalThis.litIssuedWarnings.has(warning) && !globalThis.litIssuedWarnings.has(code)) {
      console.warn(warning);
      globalThis.litIssuedWarnings.add(warning);
    }
  };
}
var legacyProperty = (options, proto, name) => {
  const hasOwnProperty = proto.hasOwnProperty(name);
  proto.constructor.createProperty(name, options);
  return hasOwnProperty ? Object.getOwnPropertyDescriptor(proto, name) : void 0;
};
var defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
var standardProperty = (options = defaultPropertyDeclaration, target, context) => {
  const { kind, metadata } = context;
  if (DEV_MODE && metadata == null) {
    issueWarning("missing-class-metadata", `The class ${target} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);
  }
  let properties = globalThis.litPropertyMetadata.get(metadata);
  if (properties === void 0) {
    globalThis.litPropertyMetadata.set(metadata, properties = /* @__PURE__ */ new Map());
  }
  if (kind === "setter") {
    options = Object.create(options);
    options.wrapped = true;
  }
  properties.set(context.name, options);
  if (kind === "accessor") {
    const { name } = context;
    return {
      set(v) {
        const oldValue = target.get.call(this);
        target.set.call(this, v);
        this.requestUpdate(name, oldValue, options);
      },
      init(v) {
        if (v !== void 0) {
          this._$changeProperty(name, void 0, options, v);
        }
        return v;
      }
    };
  } else if (kind === "setter") {
    const { name } = context;
    return function(value) {
      const oldValue = this[name];
      target.call(this, value);
      this.requestUpdate(name, oldValue, options);
    };
  }
  throw new Error(`Unsupported decorator location: ${kind}`);
};
function property(options) {
  return (protoOrTarget, nameOrContext) => {
    return typeof nameOrContext === "object" ? standardProperty(options, protoOrTarget, nameOrContext) : legacyProperty(options, protoOrTarget, nameOrContext);
  };
}

// node_modules/@lit/reactive-element/development/decorators/state.js
function state(options) {
  return property({
    ...options,
    // Add both `state` and `attribute` because we found a third party
    // controller that is keying off of PropertyOptions.state to determine
    // whether a field is a private internal property or not.
    state: true,
    attribute: false
  });
}

// node_modules/@lit/reactive-element/development/decorators/query.js
var DEV_MODE2 = true;
var issueWarning2;
if (DEV_MODE2) {
  globalThis.litIssuedWarnings ?? (globalThis.litIssuedWarnings = /* @__PURE__ */ new Set());
  issueWarning2 = (code, warning) => {
    warning += code ? ` See https://lit.dev/msg/${code} for more information.` : "";
    if (!globalThis.litIssuedWarnings.has(warning) && !globalThis.litIssuedWarnings.has(code)) {
      console.warn(warning);
      globalThis.litIssuedWarnings.add(warning);
    }
  };
}

// node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/styles.js
var styles_default = css`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js
var __decorate = function(decorators, target, key, desc2) {
  var c = arguments.length, r = c < 3 ? target : desc2 === null ? desc2 = Object.getOwnPropertyDescriptor(target, key) : desc2, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc2);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiFlex = class WuiFlex2 extends LitElement {
  render() {
    this.style.cssText = `
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
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
WuiFlex.styles = [resetStyles, styles_default];
__decorate([
  property()
], WuiFlex.prototype, "flexDirection", void 0);
__decorate([
  property()
], WuiFlex.prototype, "flexWrap", void 0);
__decorate([
  property()
], WuiFlex.prototype, "flexBasis", void 0);
__decorate([
  property()
], WuiFlex.prototype, "flexGrow", void 0);
__decorate([
  property()
], WuiFlex.prototype, "flexShrink", void 0);
__decorate([
  property()
], WuiFlex.prototype, "alignItems", void 0);
__decorate([
  property()
], WuiFlex.prototype, "justifyContent", void 0);
__decorate([
  property()
], WuiFlex.prototype, "columnGap", void 0);
__decorate([
  property()
], WuiFlex.prototype, "rowGap", void 0);
__decorate([
  property()
], WuiFlex.prototype, "gap", void 0);
__decorate([
  property()
], WuiFlex.prototype, "padding", void 0);
__decorate([
  property()
], WuiFlex.prototype, "margin", void 0);
WuiFlex = __decorate([
  customElement("wui-flex")
], WuiFlex);

// node_modules/lit-html/development/directives/if-defined.js
var ifDefined = (value) => value ?? nothing;

// node_modules/lit-html/development/directive.js
var PartType = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
};
var directive = (c) => (...values) => ({
  // This property needs to remain unminified.
  ["_$litDirective$"]: c,
  values
});
var Directive = class {
  constructor(_partInfo) {
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  /** @internal */
  _$initialize(part, parent, attributeIndex) {
    this.__part = part;
    this._$parent = parent;
    this.__attributeIndex = attributeIndex;
  }
  /** @internal */
  _$resolve(part, props) {
    return this.update(part, props);
  }
  update(_part, props) {
    return this.render(...props);
  }
};

// node_modules/lit-html/development/directives/class-map.js
var ClassMapDirective = class extends Directive {
  constructor(partInfo) {
    var _a2;
    super(partInfo);
    if (partInfo.type !== PartType.ATTRIBUTE || partInfo.name !== "class" || ((_a2 = partInfo.strings) == null ? void 0 : _a2.length) > 2) {
      throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
  }
  render(classInfo) {
    return " " + Object.keys(classInfo).filter((key) => classInfo[key]).join(" ") + " ";
  }
  update(part, [classInfo]) {
    var _a2, _b2;
    if (this._previousClasses === void 0) {
      this._previousClasses = /* @__PURE__ */ new Set();
      if (part.strings !== void 0) {
        this._staticClasses = new Set(part.strings.join(" ").split(/\s/).filter((s) => s !== ""));
      }
      for (const name in classInfo) {
        if (classInfo[name] && !((_a2 = this._staticClasses) == null ? void 0 : _a2.has(name))) {
          this._previousClasses.add(name);
        }
      }
      return this.render(classInfo);
    }
    const classList = part.element.classList;
    for (const name of this._previousClasses) {
      if (!(name in classInfo)) {
        classList.remove(name);
        this._previousClasses.delete(name);
      }
    }
    for (const name in classInfo) {
      const value = !!classInfo[name];
      if (value !== this._previousClasses.has(name) && !((_b2 = this._staticClasses) == null ? void 0 : _b2.has(name))) {
        if (value) {
          classList.add(name);
          this._previousClasses.add(name);
        } else {
          classList.remove(name);
          this._previousClasses.delete(name);
        }
      }
    }
    return noChange;
  }
};
var classMap = directive(ClassMapDirective);

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/styles.js
var styles_default2 = css`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js
var __decorate2 = function(decorators, target, key, desc2) {
  var c = arguments.length, r = c < 3 ? target : desc2 === null ? desc2 = Object.getOwnPropertyDescriptor(target, key) : desc2, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc2);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiText = class WuiText2 extends LitElement {
  constructor() {
    super(...arguments);
    this.variant = "paragraph-500";
    this.color = "fg-300";
    this.align = "left";
    this.lineClamp = void 0;
  }
  render() {
    const classes = {
      [`wui-font-${this.variant}`]: true,
      [`wui-color-${this.color}`]: true,
      [`wui-line-clamp-${this.lineClamp}`]: this.lineClamp ? true : false
    };
    this.style.cssText = `
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `;
    return html`<slot class=${classMap(classes)}></slot>`;
  }
};
WuiText.styles = [resetStyles, styles_default2];
__decorate2([
  property()
], WuiText.prototype, "variant", void 0);
__decorate2([
  property()
], WuiText.prototype, "color", void 0);
__decorate2([
  property()
], WuiText.prototype, "align", void 0);
__decorate2([
  property()
], WuiText.prototype, "lineClamp", void 0);
WuiText = __decorate2([
  customElement("wui-text")
], WuiText);

// node_modules/lit-html/development/directive-helpers.js
var { _ChildPart: ChildPart } = _$LH;
var ENABLE_SHADYDOM_NOPATCH = true;
var _a, _b;
var wrap = ENABLE_SHADYDOM_NOPATCH && ((_a = window.ShadyDOM) == null ? void 0 : _a.inUse) && ((_b = window.ShadyDOM) == null ? void 0 : _b.noPatch) === true ? window.ShadyDOM.wrap : (node) => node;
var isPrimitive = (value) => value === null || typeof value != "object" && typeof value != "function";
var isSingleExpression = (part) => part.strings === void 0;

// node_modules/lit-html/development/async-directive.js
var DEV_MODE3 = true;
var notifyChildrenConnectedChanged = (parent, isConnected) => {
  var _a2;
  const children = parent._$disconnectableChildren;
  if (children === void 0) {
    return false;
  }
  for (const obj of children) {
    (_a2 = obj["_$notifyDirectiveConnectionChanged"]) == null ? void 0 : _a2.call(obj, isConnected, false);
    notifyChildrenConnectedChanged(obj, isConnected);
  }
  return true;
};
var removeDisconnectableFromParent = (obj) => {
  let parent, children;
  do {
    if ((parent = obj._$parent) === void 0) {
      break;
    }
    children = parent._$disconnectableChildren;
    children.delete(obj);
    obj = parent;
  } while ((children == null ? void 0 : children.size) === 0);
};
var addDisconnectableToParent = (obj) => {
  for (let parent; parent = obj._$parent; obj = parent) {
    let children = parent._$disconnectableChildren;
    if (children === void 0) {
      parent._$disconnectableChildren = children = /* @__PURE__ */ new Set();
    } else if (children.has(obj)) {
      break;
    }
    children.add(obj);
    installDisconnectAPI(parent);
  }
};
function reparentDisconnectables(newParent) {
  if (this._$disconnectableChildren !== void 0) {
    removeDisconnectableFromParent(this);
    this._$parent = newParent;
    addDisconnectableToParent(this);
  } else {
    this._$parent = newParent;
  }
}
function notifyChildPartConnectedChanged(isConnected, isClearingValue = false, fromPartIndex = 0) {
  const value = this._$committedValue;
  const children = this._$disconnectableChildren;
  if (children === void 0 || children.size === 0) {
    return;
  }
  if (isClearingValue) {
    if (Array.isArray(value)) {
      for (let i = fromPartIndex; i < value.length; i++) {
        notifyChildrenConnectedChanged(value[i], false);
        removeDisconnectableFromParent(value[i]);
      }
    } else if (value != null) {
      notifyChildrenConnectedChanged(value, false);
      removeDisconnectableFromParent(value);
    }
  } else {
    notifyChildrenConnectedChanged(this, isConnected);
  }
}
var installDisconnectAPI = (obj) => {
  if (obj.type == PartType.CHILD) {
    obj._$notifyConnectionChanged ?? (obj._$notifyConnectionChanged = notifyChildPartConnectedChanged);
    obj._$reparentDisconnectables ?? (obj._$reparentDisconnectables = reparentDisconnectables);
  }
};
var AsyncDirective = class extends Directive {
  constructor() {
    super(...arguments);
    this._$disconnectableChildren = void 0;
  }
  /**
   * Initialize the part with internal fields
   * @param part
   * @param parent
   * @param attributeIndex
   */
  _$initialize(part, parent, attributeIndex) {
    super._$initialize(part, parent, attributeIndex);
    addDisconnectableToParent(this);
    this.isConnected = part._$isConnected;
  }
  // This property needs to remain unminified.
  /**
   * Called from the core code when a directive is going away from a part (in
   * which case `shouldRemoveFromParent` should be true), and from the
   * `setChildrenConnected` helper function when recursively changing the
   * connection state of a tree (in which case `shouldRemoveFromParent` should
   * be false).
   *
   * @param isConnected
   * @param isClearingDirective - True when the directive itself is being
   *     removed; false when the tree is being disconnected
   * @internal
   */
  ["_$notifyDirectiveConnectionChanged"](isConnected, isClearingDirective = true) {
    var _a2, _b2;
    if (isConnected !== this.isConnected) {
      this.isConnected = isConnected;
      if (isConnected) {
        (_a2 = this.reconnected) == null ? void 0 : _a2.call(this);
      } else {
        (_b2 = this.disconnected) == null ? void 0 : _b2.call(this);
      }
    }
    if (isClearingDirective) {
      notifyChildrenConnectedChanged(this, isConnected);
      removeDisconnectableFromParent(this);
    }
  }
  /**
   * Sets the value of the directive's Part outside the normal `update`/`render`
   * lifecycle of a directive.
   *
   * This method should not be called synchronously from a directive's `update`
   * or `render`.
   *
   * @param directive The directive to update
   * @param value The value to set
   */
  setValue(value) {
    if (isSingleExpression(this.__part)) {
      this.__part._$setValue(value, this);
    } else {
      if (DEV_MODE3 && this.__attributeIndex === void 0) {
        throw new Error(`Expected this.__attributeIndex to be a number`);
      }
      const newValues = [...this.__part._$committedValue];
      newValues[this.__attributeIndex] = value;
      this.__part._$setValue(newValues, this, 0);
    }
  }
  /**
   * User callbacks for implementing logic to release any resources/subscriptions
   * that may have been retained by this directive. Since directives may also be
   * re-connected, `reconnected` should also be implemented to restore the
   * working state of the directive prior to the next render.
   */
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/development/directives/private-async-helpers.js
var PseudoWeakRef = class {
  constructor(ref) {
    this._ref = ref;
  }
  /**
   * Disassociates the ref with the backing instance.
   */
  disconnect() {
    this._ref = void 0;
  }
  /**
   * Reassociates the ref with the backing instance.
   */
  reconnect(ref) {
    this._ref = ref;
  }
  /**
   * Retrieves the backing instance (will be undefined when disconnected)
   */
  deref() {
    return this._ref;
  }
};
var Pauser = class {
  constructor() {
    this._promise = void 0;
    this._resolve = void 0;
  }
  /**
   * When paused, returns a promise to be awaited; when unpaused, returns
   * undefined. Note that in the microtask between the pauser being resumed
   * an await of this promise resolving, the pauser could be paused again,
   * hence callers should check the promise in a loop when awaiting.
   * @returns A promise to be awaited when paused or undefined
   */
  get() {
    return this._promise;
  }
  /**
   * Creates a promise to be awaited
   */
  pause() {
    this._promise ?? (this._promise = new Promise((resolve) => this._resolve = resolve));
  }
  /**
   * Resolves the promise which may be awaited
   */
  resume() {
    var _a2;
    (_a2 = this._resolve) == null ? void 0 : _a2.call(this);
    this._promise = this._resolve = void 0;
  }
};

// node_modules/lit-html/development/directives/until.js
var isPromise = (x) => {
  return !isPrimitive(x) && typeof x.then === "function";
};
var _infinity = 1073741823;
var UntilDirective = class extends AsyncDirective {
  constructor() {
    super(...arguments);
    this.__lastRenderedIndex = _infinity;
    this.__values = [];
    this.__weakThis = new PseudoWeakRef(this);
    this.__pauser = new Pauser();
  }
  render(...args) {
    return args.find((x) => !isPromise(x)) ?? noChange;
  }
  update(_part, args) {
    const previousValues = this.__values;
    let previousLength = previousValues.length;
    this.__values = args;
    const weakThis = this.__weakThis;
    const pauser = this.__pauser;
    if (!this.isConnected) {
      this.disconnected();
    }
    for (let i = 0; i < args.length; i++) {
      if (i > this.__lastRenderedIndex) {
        break;
      }
      const value = args[i];
      if (!isPromise(value)) {
        this.__lastRenderedIndex = i;
        return value;
      }
      if (i < previousLength && value === previousValues[i]) {
        continue;
      }
      this.__lastRenderedIndex = _infinity;
      previousLength = 0;
      Promise.resolve(value).then(async (result) => {
        while (pauser.get()) {
          await pauser.get();
        }
        const _this = weakThis.deref();
        if (_this !== void 0) {
          const index = _this.__values.indexOf(value);
          if (index > -1 && index < _this.__lastRenderedIndex) {
            _this.__lastRenderedIndex = index;
            _this.setValue(result);
          }
        }
      });
    }
    return noChange;
  }
  disconnected() {
    this.__weakThis.disconnect();
    this.__pauser.pause();
  }
  reconnected() {
    this.__weakThis.reconnect(this);
    this.__pauser.resume();
  }
};
var until = directive(UntilDirective);

// node_modules/@reown/appkit-ui/dist/esm/src/utils/CacheUtil.js
var CacheUtil = class {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  set(key, value) {
    this.cache.set(key, value);
  }
  get(key) {
    return this.cache.get(key);
  }
  has(key) {
    return this.cache.has(key);
  }
  delete(key) {
    this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
  }
};
var globalSvgCache = new CacheUtil();

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/styles.js
var styles_default3 = css`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js
var __decorate3 = function(decorators, target, key, desc2) {
  var c = arguments.length, r = c < 3 ? target : desc2 === null ? desc2 = Object.getOwnPropertyDescriptor(target, key) : desc2, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc2);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ICONS = {
  add: async () => (await import("./add-4GDQLRAA.js")).addSvg,
  allWallets: async () => (await import("./all-wallets-NDS7INV4.js")).allWalletsSvg,
  arrowBottomCircle: async () => (await import("./arrow-bottom-circle-KQLJCSSG.js")).arrowBottomCircleSvg,
  appStore: async () => (await import("./app-store-ZECCOZHG.js")).appStoreSvg,
  apple: async () => (await import("./apple-MJ6PFQOM.js")).appleSvg,
  arrowBottom: async () => (await import("./arrow-bottom-E7TKEM2K.js")).arrowBottomSvg,
  arrowLeft: async () => (await import("./arrow-left-KZKKLSSI.js")).arrowLeftSvg,
  arrowRight: async () => (await import("./arrow-right-DUVBY4OI.js")).arrowRightSvg,
  arrowTop: async () => (await import("./arrow-top-ZEILKEJG.js")).arrowTopSvg,
  bank: async () => (await import("./bank-XQ47YV26.js")).bankSvg,
  browser: async () => (await import("./browser-LHSDEMEL.js")).browserSvg,
  card: async () => (await import("./card-4V2QCTFV.js")).cardSvg,
  checkmark: async () => (await import("./checkmark-WGC73XNG.js")).checkmarkSvg,
  checkmarkBold: async () => (await import("./checkmark-bold-QTKB7ADA.js")).checkmarkBoldSvg,
  chevronBottom: async () => (await import("./chevron-bottom-7RVZ4ZX4.js")).chevronBottomSvg,
  chevronLeft: async () => (await import("./chevron-left-YX6LHDEO.js")).chevronLeftSvg,
  chevronRight: async () => (await import("./chevron-right-3XECLL5C.js")).chevronRightSvg,
  chevronTop: async () => (await import("./chevron-top-YY5F3G54.js")).chevronTopSvg,
  chromeStore: async () => (await import("./chrome-store-PN7Q4XCI.js")).chromeStoreSvg,
  clock: async () => (await import("./clock-CSQIZINZ.js")).clockSvg,
  close: async () => (await import("./close-VKECTDXC.js")).closeSvg,
  compass: async () => (await import("./compass-FCAN4WXM.js")).compassSvg,
  coinPlaceholder: async () => (await import("./coinPlaceholder-NOABUR4W.js")).coinPlaceholderSvg,
  copy: async () => (await import("./copy-KJJSJAPZ.js")).copySvg,
  cursor: async () => (await import("./cursor-W3FBM4RD.js")).cursorSvg,
  cursorTransparent: async () => (await import("./cursor-transparent-7OAOZO4Z.js")).cursorTransparentSvg,
  desktop: async () => (await import("./desktop-HMV2UDKO.js")).desktopSvg,
  disconnect: async () => (await import("./disconnect-ULKDSTAG.js")).disconnectSvg,
  discord: async () => (await import("./discord-H62IUJS3.js")).discordSvg,
  etherscan: async () => (await import("./etherscan-X7XZPFIZ.js")).etherscanSvg,
  extension: async () => (await import("./extension-7MGQ6OP5.js")).extensionSvg,
  externalLink: async () => (await import("./external-link-ZNH3SUWV.js")).externalLinkSvg,
  facebook: async () => (await import("./facebook-HSQBDNG7.js")).facebookSvg,
  farcaster: async () => (await import("./farcaster-VUODYHI4.js")).farcasterSvg,
  filters: async () => (await import("./filters-XIXZNZYF.js")).filtersSvg,
  github: async () => (await import("./github-TEWFD5ZY.js")).githubSvg,
  google: async () => (await import("./google-ISKP76DQ.js")).googleSvg,
  helpCircle: async () => (await import("./help-circle-7ACJC3FG.js")).helpCircleSvg,
  image: async () => (await import("./image-YZ64UUR5.js")).imageSvg,
  id: async () => (await import("./id-Q6QURGEG.js")).idSvg,
  infoCircle: async () => (await import("./info-circle-2G2EZFYF.js")).infoCircleSvg,
  lightbulb: async () => (await import("./lightbulb-DIWZSWHO.js")).lightbulbSvg,
  mail: async () => (await import("./mail-Q7SMBQCY.js")).mailSvg,
  mobile: async () => (await import("./mobile-YM42AJGB.js")).mobileSvg,
  more: async () => (await import("./more-BQ4HR22H.js")).moreSvg,
  networkPlaceholder: async () => (await import("./network-placeholder-HI2PKNXE.js")).networkPlaceholderSvg,
  nftPlaceholder: async () => (await import("./nftPlaceholder-WNQ4RBDC.js")).nftPlaceholderSvg,
  off: async () => (await import("./off-CI3RTRTL.js")).offSvg,
  playStore: async () => (await import("./play-store-57TPCIDA.js")).playStoreSvg,
  plus: async () => (await import("./plus-WGBDSOLM.js")).plusSvg,
  qrCode: async () => (await import("./qr-code-QDVWK737.js")).qrCodeIcon,
  recycleHorizontal: async () => (await import("./recycle-horizontal-JMN35YWI.js")).recycleHorizontalSvg,
  refresh: async () => (await import("./refresh-4ILTGRZ3.js")).refreshSvg,
  search: async () => (await import("./search-HDQZ6GRA.js")).searchSvg,
  send: async () => (await import("./send-KS7CM7ZM.js")).sendSvg,
  swapHorizontal: async () => (await import("./swapHorizontal-U4KQXUHY.js")).swapHorizontalSvg,
  swapHorizontalMedium: async () => (await import("./swapHorizontalMedium-SBC5OKZS.js")).swapHorizontalMediumSvg,
  swapHorizontalBold: async () => (await import("./swapHorizontalBold-VII5IJ4C.js")).swapHorizontalBoldSvg,
  swapHorizontalRoundedBold: async () => (await import("./swapHorizontalRoundedBold-U7MVYHWJ.js")).swapHorizontalRoundedBoldSvg,
  swapVertical: async () => (await import("./swapVertical-ZXG4N7SR.js")).swapVerticalSvg,
  telegram: async () => (await import("./telegram-NY5JVB7C.js")).telegramSvg,
  threeDots: async () => (await import("./three-dots-WXLQ2HTU.js")).threeDotsSvg,
  twitch: async () => (await import("./twitch-RMGZDERS.js")).twitchSvg,
  twitter: async () => (await import("./x-WMRJ6F26.js")).xSvg,
  twitterIcon: async () => (await import("./twitterIcon-AIDD5SYI.js")).twitterIconSvg,
  verify: async () => (await import("./verify-WPWR4BNZ.js")).verifySvg,
  verifyFilled: async () => (await import("./verify-filled-SGG5QX3Z.js")).verifyFilledSvg,
  wallet: async () => (await import("./wallet-V7ANFRUX.js")).walletSvg,
  walletConnect: async () => (await import("./walletconnect-ODRYJEQA.js")).walletConnectSvg,
  walletConnectLightBrown: async () => (await import("./walletconnect-ODRYJEQA.js")).walletConnectLightBrownSvg,
  walletConnectBrown: async () => (await import("./walletconnect-ODRYJEQA.js")).walletConnectBrownSvg,
  walletPlaceholder: async () => (await import("./wallet-placeholder-CETKJD6W.js")).walletPlaceholderSvg,
  warningCircle: async () => (await import("./warning-circle-UGB5OOSP.js")).warningCircleSvg,
  x: async () => (await import("./x-WMRJ6F26.js")).xSvg,
  info: async () => (await import("./info-2Y5J6F2L.js")).infoSvg,
  exclamationTriangle: async () => (await import("./exclamation-triangle-UC2I2B2W.js")).exclamationTriangleSvg,
  reown: async () => (await import("./reown-logo-PK7CXO6D.js")).reownSvg
};
async function getSvg(name) {
  if (globalSvgCache.has(name)) {
    return globalSvgCache.get(name);
  }
  const importFn = ICONS[name] ?? ICONS.copy;
  const svgPromise = importFn();
  globalSvgCache.set(name, svgPromise);
  return svgPromise;
}
var WuiIcon = class WuiIcon2 extends LitElement {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.name = "copy";
    this.color = "fg-300";
    this.aspectRatio = "1 / 1";
  }
  render() {
    this.style.cssText = `
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `;
    return html`${until(getSvg(this.name), html`<div class="fallback"></div>`)}`;
  }
};
WuiIcon.styles = [resetStyles, colorStyles, styles_default3];
__decorate3([
  property()
], WuiIcon.prototype, "size", void 0);
__decorate3([
  property()
], WuiIcon.prototype, "name", void 0);
__decorate3([
  property()
], WuiIcon.prototype, "color", void 0);
__decorate3([
  property()
], WuiIcon.prototype, "aspectRatio", void 0);
WuiIcon = __decorate3([
  customElement("wui-icon")
], WuiIcon);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/styles.js
var styles_default4 = css`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js
var __decorate4 = function(decorators, target, key, desc2) {
  var c = arguments.length, r = c < 3 ? target : desc2 === null ? desc2 = Object.getOwnPropertyDescriptor(target, key) : desc2, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc2);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiIconBox = class WuiIconBox2 extends LitElement {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.backgroundColor = "accent-100";
    this.iconColor = "accent-100";
    this.background = "transparent";
    this.border = false;
    this.borderColor = "wui-color-bg-125";
    this.icon = "copy";
  }
  render() {
    const iconSize = this.iconSize || this.size;
    const isLg = this.size === "lg";
    const isXl = this.size === "xl";
    const bgMix = isLg ? "12%" : "16%";
    const borderRadius = isLg ? "xxs" : isXl ? "s" : "3xl";
    const isGray = this.background === "gray";
    const isOpaque = this.background === "opaque";
    const isColorChange = this.backgroundColor === "accent-100" && isOpaque || this.backgroundColor === "success-100" && isOpaque || this.backgroundColor === "error-100" && isOpaque || this.backgroundColor === "inverse-100" && isOpaque;
    let bgValueVariable = `var(--wui-color-${this.backgroundColor})`;
    if (isColorChange) {
      bgValueVariable = `var(--wui-icon-box-bg-${this.backgroundColor})`;
    } else if (isGray) {
      bgValueVariable = `var(--wui-color-gray-${this.backgroundColor})`;
    }
    this.style.cssText = `
       --local-bg-value: ${bgValueVariable};
       --local-bg-mix: ${isColorChange || isGray ? `100%` : bgMix};
       --local-border-radius: var(--wui-border-radius-${borderRadius});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor === "wui-color-bg-125" ? `2px` : `1px`} solid ${this.border ? `var(--${this.borderColor})` : `transparent`}
   `;
    return html` <wui-icon color=${this.iconColor} size=${iconSize} name=${this.icon}></wui-icon> `;
  }
};
WuiIconBox.styles = [resetStyles, elementStyles, styles_default4];
__decorate4([
  property()
], WuiIconBox.prototype, "size", void 0);
__decorate4([
  property()
], WuiIconBox.prototype, "backgroundColor", void 0);
__decorate4([
  property()
], WuiIconBox.prototype, "iconColor", void 0);
__decorate4([
  property()
], WuiIconBox.prototype, "iconSize", void 0);
__decorate4([
  property()
], WuiIconBox.prototype, "background", void 0);
__decorate4([
  property({ type: Boolean })
], WuiIconBox.prototype, "border", void 0);
__decorate4([
  property()
], WuiIconBox.prototype, "borderColor", void 0);
__decorate4([
  property()
], WuiIconBox.prototype, "icon", void 0);
WuiIconBox = __decorate4([
  customElement("wui-icon-box")
], WuiIconBox);

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/styles.js
var styles_default5 = css`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js
var __decorate5 = function(decorators, target, key, desc2) {
  var c = arguments.length, r = c < 3 ? target : desc2 === null ? desc2 = Object.getOwnPropertyDescriptor(target, key) : desc2, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc2);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiImage = class WuiImage2 extends LitElement {
  constructor() {
    super(...arguments);
    this.src = "./path/to/image.jpg";
    this.alt = "Image";
    this.size = void 0;
  }
  render() {
    this.style.cssText = `
      --local-width: ${this.size ? `var(--wui-icon-size-${this.size});` : "100%"};
      --local-height: ${this.size ? `var(--wui-icon-size-${this.size});` : "100%"};
      `;
    return html`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`;
  }
  handleImageError() {
    this.dispatchEvent(new CustomEvent("onLoadError", { bubbles: true, composed: true }));
  }
};
WuiImage.styles = [resetStyles, colorStyles, styles_default5];
__decorate5([
  property()
], WuiImage.prototype, "src", void 0);
__decorate5([
  property()
], WuiImage.prototype, "alt", void 0);
__decorate5([
  property()
], WuiImage.prototype, "size", void 0);
WuiImage = __decorate5([
  customElement("wui-image")
], WuiImage);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/styles.js
var styles_default6 = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/index.js
var __decorate6 = function(decorators, target, key, desc2) {
  var c = arguments.length, r = c < 3 ? target : desc2 === null ? desc2 = Object.getOwnPropertyDescriptor(target, key) : desc2, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc2);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiTag = class WuiTag2 extends LitElement {
  constructor() {
    super(...arguments);
    this.variant = "main";
    this.size = "lg";
  }
  render() {
    this.dataset["variant"] = this.variant;
    this.dataset["size"] = this.size;
    const textVariant = this.size === "md" ? "mini-700" : "micro-700";
    return html`
      <wui-text data-variant=${this.variant} variant=${textVariant} color="inherit">
        <slot></slot>
      </wui-text>
    `;
  }
};
WuiTag.styles = [resetStyles, styles_default6];
__decorate6([
  property()
], WuiTag.prototype, "variant", void 0);
__decorate6([
  property()
], WuiTag.prototype, "size", void 0);
WuiTag = __decorate6([
  customElement("wui-tag")
], WuiTag);

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/styles.js
var styles_default7 = css`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/index.js
var __decorate7 = function(decorators, target, key, desc2) {
  var c = arguments.length, r = c < 3 ? target : desc2 === null ? desc2 = Object.getOwnPropertyDescriptor(target, key) : desc2, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc2);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiLoadingSpinner = class WuiLoadingSpinner2 extends LitElement {
  constructor() {
    super(...arguments);
    this.color = "accent-100";
    this.size = "lg";
  }
  render() {
    this.style.cssText = `--local-color: ${this.color === "inherit" ? "inherit" : `var(--wui-color-${this.color})`}`;
    this.dataset["size"] = this.size;
    return html`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`;
  }
};
WuiLoadingSpinner.styles = [resetStyles, styles_default7];
__decorate7([
  property()
], WuiLoadingSpinner.prototype, "color", void 0);
__decorate7([
  property()
], WuiLoadingSpinner.prototype, "size", void 0);
WuiLoadingSpinner = __decorate7([
  customElement("wui-loading-spinner")
], WuiLoadingSpinner);

export {
  property,
  state,
  ifDefined,
  directive,
  AsyncDirective,
  classMap
};
/*! Bundled license information:

@lit/reactive-element/development/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/development/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/directives/private-async-helpers.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/development/directives/until.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-ODNZ4PJ2.js.map

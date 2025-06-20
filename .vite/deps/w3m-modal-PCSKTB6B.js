import {
  ifDefined,
  property,
  state
} from "./chunk-ODNZ4PJ2.js";
import {
  AccountController,
  AlertController,
  ApiController,
  AssetController,
  AssetUtil,
  ChainController,
  ConnectionController,
  ConnectorController,
  ConstantsUtil,
  ConstantsUtil3 as ConstantsUtil2,
  CoreHelperUtil,
  EventsController,
  ModalController,
  OptionsController,
  RouterController,
  SIWXUtil,
  SnackController,
  ThemeController,
  TooltipController,
  UiHelperUtil,
  colorStyles,
  customElement,
  elementStyles,
  initializeTheming,
  resetStyles
} from "./chunk-TARECR2R.js";
import "./chunk-CZIQUEW2.js";
import {
  LitElement,
  css,
  html
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
import "./chunk-MVEJMUOB.js";

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-card/styles.js
var styles_default = css`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/components/wui-card/index.js
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiCard = class WuiCard2 extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
};
WuiCard.styles = [resetStyles, styles_default];
WuiCard = __decorate([
  customElement("wui-card")
], WuiCard);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-alertbar/styles.js
var styles_default2 = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-alertbar/index.js
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiAlertBar = class WuiAlertBar2 extends LitElement {
  constructor() {
    super(...arguments);
    this.message = "";
    this.backgroundColor = "accent-100";
    this.iconColor = "accent-100";
    this.icon = "info";
  }
  render() {
    this.style.cssText = `
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `;
    return html`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `;
  }
  onClose() {
    AlertController.close();
  }
};
WuiAlertBar.styles = [resetStyles, styles_default2];
__decorate2([
  property()
], WuiAlertBar.prototype, "message", void 0);
__decorate2([
  property()
], WuiAlertBar.prototype, "backgroundColor", void 0);
__decorate2([
  property()
], WuiAlertBar.prototype, "iconColor", void 0);
__decorate2([
  property()
], WuiAlertBar.prototype, "icon", void 0);
WuiAlertBar = __decorate2([
  customElement("wui-alertbar")
], WuiAlertBar);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-alertbar/styles.js
var styles_default3 = css`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-alertbar/index.js
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var presets = {
  info: {
    backgroundColor: "fg-350",
    iconColor: "fg-325",
    icon: "info"
  },
  success: {
    backgroundColor: "success-glass-reown-020",
    iconColor: "success-125",
    icon: "checkmark"
  },
  warning: {
    backgroundColor: "warning-glass-reown-020",
    iconColor: "warning-100",
    icon: "warningCircle"
  },
  error: {
    backgroundColor: "error-glass-reown-020",
    iconColor: "error-125",
    icon: "exclamationTriangle"
  }
};
var W3mAlertBar = class W3mAlertBar2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.open = AlertController.state.open;
    this.onOpen(true);
    this.unsubscribe.push(AlertController.subscribeKey("open", (val) => {
      this.open = val;
      this.onOpen(false);
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { message, variant } = AlertController.state;
    const preset = presets[variant];
    return html`
      <wui-alertbar
        message=${message}
        backgroundColor=${preset == null ? void 0 : preset.backgroundColor}
        iconColor=${preset == null ? void 0 : preset.iconColor}
        icon=${preset == null ? void 0 : preset.icon}
      ></wui-alertbar>
    `;
  }
  onOpen(isMounted) {
    if (this.open) {
      this.animate([
        { opacity: 0, transform: "scale(0.85)" },
        { opacity: 1, transform: "scale(1)" }
      ], {
        duration: 150,
        fill: "forwards",
        easing: "ease"
      });
      this.style.cssText = `pointer-events: auto`;
    } else if (!isMounted) {
      this.animate([
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.85)" }
      ], {
        duration: 150,
        fill: "forwards",
        easing: "ease"
      });
      this.style.cssText = `pointer-events: none`;
    }
  }
};
W3mAlertBar.styles = styles_default3;
__decorate3([
  state()
], W3mAlertBar.prototype, "open", void 0);
W3mAlertBar = __decorate3([
  customElement("w3m-alertbar")
], W3mAlertBar);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/styles.js
var styles_default4 = css`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/index.js
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiIconLink = class WuiIconLink2 extends LitElement {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.disabled = false;
    this.icon = "copy";
    this.iconColor = "inherit";
  }
  render() {
    const borderRadius = this.size === "lg" ? "--wui-border-radius-xs" : "--wui-border-radius-xxs";
    const padding = this.size === "lg" ? "--wui-spacing-1xs" : "--wui-spacing-2xs";
    this.style.cssText = `
    --local-border-radius: var(${borderRadius});
    --local-padding: var(${padding});
`;
    return html`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `;
  }
};
WuiIconLink.styles = [resetStyles, elementStyles, colorStyles, styles_default4];
__decorate4([
  property()
], WuiIconLink.prototype, "size", void 0);
__decorate4([
  property({ type: Boolean })
], WuiIconLink.prototype, "disabled", void 0);
__decorate4([
  property()
], WuiIconLink.prototype, "icon", void 0);
__decorate4([
  property()
], WuiIconLink.prototype, "iconColor", void 0);
WuiIconLink = __decorate4([
  customElement("wui-icon-link")
], WuiIconLink);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-select/styles.js
var styles_default5 = css`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-select/index.js
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiSelect = class WuiSelect2 extends LitElement {
  constructor() {
    super(...arguments);
    this.imageSrc = "";
  }
  render() {
    return html`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`;
  }
  imageTemplate() {
    if (this.imageSrc) {
      return html`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;
    }
    return html`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`;
  }
};
WuiSelect.styles = [resetStyles, elementStyles, colorStyles, styles_default5];
__decorate5([
  property()
], WuiSelect.prototype, "imageSrc", void 0);
WuiSelect = __decorate5([
  customElement("wui-select")
], WuiSelect);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-header/styles.js
var styles_default6 = css`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-header/index.js
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BETA_SCREENS = ["SmartSessionList"];
function headings() {
  var _a, _b, _c, _d, _e, _f, _g;
  const connectorName = (_b = (_a = RouterController.state.data) == null ? void 0 : _a.connector) == null ? void 0 : _b.name;
  const walletName = (_d = (_c = RouterController.state.data) == null ? void 0 : _c.wallet) == null ? void 0 : _d.name;
  const networkName = (_f = (_e = RouterController.state.data) == null ? void 0 : _e.network) == null ? void 0 : _f.name;
  const name = walletName ?? connectorName;
  const connectors = ConnectorController.getConnectors();
  const isEmail = connectors.length === 1 && ((_g = connectors[0]) == null ? void 0 : _g.id) === "w3m-email";
  return {
    Connect: `Connect ${isEmail ? "Email" : ""} Wallet`,
    Create: "Create Wallet",
    ChooseAccountName: void 0,
    Account: void 0,
    AccountSettings: void 0,
    AllWallets: "All Wallets",
    ApproveTransaction: "Approve Transaction",
    BuyInProgress: "Buy",
    ConnectingExternal: name ?? "Connect Wallet",
    ConnectingWalletConnect: name ?? "WalletConnect",
    ConnectingWalletConnectBasic: "WalletConnect",
    ConnectingSiwe: "Sign In",
    Convert: "Convert",
    ConvertSelectToken: "Select token",
    ConvertPreview: "Preview convert",
    Downloads: name ? `Get ${name}` : "Downloads",
    EmailLogin: "Email Login",
    EmailVerifyOtp: "Confirm Email",
    EmailVerifyDevice: "Register Device",
    GetWallet: "Get a wallet",
    Networks: "Choose Network",
    OnRampProviders: "Choose Provider",
    OnRampActivity: "Activity",
    OnRampTokenSelect: "Select Token",
    OnRampFiatSelect: "Select Currency",
    Profile: void 0,
    SwitchNetwork: networkName ?? "Switch Network",
    SwitchAddress: "Switch Address",
    Transactions: "Activity",
    UnsupportedChain: "Switch Network",
    UpgradeEmailWallet: "Upgrade your Wallet",
    UpdateEmailWallet: "Edit Email",
    UpdateEmailPrimaryOtp: "Confirm Current Email",
    UpdateEmailSecondaryOtp: "Confirm New Email",
    WhatIsABuy: "What is Buy?",
    RegisterAccountName: "Choose name",
    RegisterAccountNameSuccess: "",
    WalletReceive: "Receive",
    WalletCompatibleNetworks: "Compatible Networks",
    Swap: "Swap",
    SwapSelectToken: "Select token",
    SwapPreview: "Preview swap",
    WalletSend: "Send",
    WalletSendPreview: "Review send",
    WalletSendSelectToken: "Select Token",
    WhatIsANetwork: "What is a network?",
    WhatIsAWallet: "What is a wallet?",
    ConnectWallets: "Connect wallet",
    ConnectSocials: "All socials",
    ConnectingSocial: AccountController.state.socialProvider ? AccountController.state.socialProvider : "Connect Social",
    ConnectingMultiChain: "Select chain",
    ConnectingFarcaster: "Farcaster",
    SwitchActiveChain: "Switch chain",
    SmartSessionCreated: void 0,
    SmartSessionList: "Smart Sessions",
    SIWXSignMessage: "Sign In"
  };
}
var W3mHeader = class W3mHeader2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.heading = headings()[RouterController.state.view];
    this.network = ChainController.state.activeCaipNetwork;
    this.networkImage = AssetUtil.getNetworkImage(this.network);
    this.buffering = false;
    this.showBack = false;
    this.prevHistoryLength = 1;
    this.view = RouterController.state.view;
    this.viewDirection = "";
    this.headerText = headings()[RouterController.state.view];
    this.unsubscribe.push(AssetController.subscribeNetworkImages(() => {
      this.networkImage = AssetUtil.getNetworkImage(this.network);
    }), RouterController.subscribeKey("view", (val) => {
      setTimeout(() => {
        this.view = val;
        this.headerText = headings()[val];
      }, ConstantsUtil2.ANIMATION_DURATIONS.HeaderText);
      this.onViewChange();
      this.onHistoryChange();
    }), ConnectionController.subscribeKey("buffering", (val) => this.buffering = val), ChainController.subscribeKey("activeCaipNetwork", (val) => {
      this.network = val;
      this.networkImage = AssetUtil.getNetworkImage(this.network);
    }));
  }
  disconnectCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return html`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `;
  }
  onWalletHelp() {
    EventsController.sendEvent({ type: "track", event: "CLICK_WALLET_HELP" });
    RouterController.push("WhatIsAWallet");
  }
  async onClose() {
    const isUnsupportedChain = RouterController.state.view === "UnsupportedChain";
    if (isUnsupportedChain || await SIWXUtil.isSIWXCloseDisabled()) {
      ModalController.shake();
    } else {
      ModalController.close();
    }
  }
  rightHeaderTemplate() {
    var _a, _b, _c;
    const isSmartSessionsEnabled = (_c = (_b = (_a = OptionsController) == null ? void 0 : _a.state) == null ? void 0 : _b.features) == null ? void 0 : _c.smartSessions;
    if (RouterController.state.view !== "Account" || !isSmartSessionsEnabled) {
      return this.closeButtonTemplate();
    }
    return html`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${() => RouterController.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `;
  }
  closeButtonTemplate() {
    return html`
      <wui-icon-link
        ?disabled=${this.buffering}
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `;
  }
  titleTemplate() {
    const isBeta = BETA_SCREENS.includes(this.view);
    return html`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${isBeta ? html`<wui-tag variant="main">Beta</wui-tag>` : null}
      </wui-flex>
    `;
  }
  leftHeaderTemplate() {
    var _a;
    const { view } = RouterController.state;
    const isConnectHelp = view === "Connect";
    const isEmbeddedEnable = OptionsController.state.enableEmbedded;
    const isApproveTransaction = view === "ApproveTransaction";
    const isConnectingSIWEView = view === "ConnectingSiwe";
    const isAccountView = view === "Account";
    const enableNetworkSwitch = OptionsController.state.enableNetworkSwitch;
    const shouldHideBack = isApproveTransaction || isConnectingSIWEView || isConnectHelp && isEmbeddedEnable;
    if (isAccountView && enableNetworkSwitch) {
      return html`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${ifDefined((_a = this.network) == null ? void 0 : _a.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${ifDefined(this.networkImage)}
      ></wui-select>`;
    }
    if (this.showBack && !shouldHideBack) {
      return html`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        ?disabled=${this.buffering}
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`;
    }
    return html`<wui-icon-link
      data-hidden=${!isConnectHelp}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`;
  }
  onNetworks() {
    if (this.isAllowedNetworkSwitch()) {
      EventsController.sendEvent({ type: "track", event: "CLICK_NETWORKS" });
      RouterController.push("Networks");
    }
  }
  isAllowedNetworkSwitch() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
    const isValidNetwork = requestedCaipNetworks == null ? void 0 : requestedCaipNetworks.find(({ id }) => {
      var _a;
      return id === ((_a = this.network) == null ? void 0 : _a.id);
    });
    return isMultiNetwork || !isValidNetwork;
  }
  getPadding() {
    if (this.heading) {
      return ["l", "2l", "l", "2l"];
    }
    return ["0", "2l", "0", "2l"];
  }
  onViewChange() {
    const { history } = RouterController.state;
    let direction = ConstantsUtil2.VIEW_DIRECTION.Next;
    if (history.length < this.prevHistoryLength) {
      direction = ConstantsUtil2.VIEW_DIRECTION.Prev;
    }
    this.prevHistoryLength = history.length;
    this.viewDirection = direction;
  }
  async onHistoryChange() {
    var _a;
    const { history } = RouterController.state;
    const buttonEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("#dynamic");
    if (history.length > 1 && !this.showBack && buttonEl) {
      await buttonEl.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.showBack = true;
      buttonEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    } else if (history.length <= 1 && this.showBack && buttonEl) {
      await buttonEl.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.showBack = false;
      buttonEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  onGoBack() {
    RouterController.goBack();
  }
};
W3mHeader.styles = styles_default6;
__decorate6([
  state()
], W3mHeader.prototype, "heading", void 0);
__decorate6([
  state()
], W3mHeader.prototype, "network", void 0);
__decorate6([
  state()
], W3mHeader.prototype, "networkImage", void 0);
__decorate6([
  state()
], W3mHeader.prototype, "buffering", void 0);
__decorate6([
  state()
], W3mHeader.prototype, "showBack", void 0);
__decorate6([
  state()
], W3mHeader.prototype, "prevHistoryLength", void 0);
__decorate6([
  state()
], W3mHeader.prototype, "view", void 0);
__decorate6([
  state()
], W3mHeader.prototype, "viewDirection", void 0);
__decorate6([
  state()
], W3mHeader.prototype, "headerText", void 0);
W3mHeader = __decorate6([
  customElement("w3m-header")
], W3mHeader);

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-snackbar/styles.js
var styles_default7 = css`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`;

// node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-snackbar/index.js
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WuiSnackbar = class WuiSnackbar2 extends LitElement {
  constructor() {
    super(...arguments);
    this.backgroundColor = "accent-100";
    this.iconColor = "accent-100";
    this.icon = "checkmark";
    this.message = "";
    this.loading = false;
    this.iconType = "default";
  }
  render() {
    return html`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `;
  }
  templateIcon() {
    if (this.loading) {
      return html`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`;
    }
    if (this.iconType === "default") {
      return html`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`;
    }
    return html`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`;
  }
};
WuiSnackbar.styles = [resetStyles, styles_default7];
__decorate7([
  property()
], WuiSnackbar.prototype, "backgroundColor", void 0);
__decorate7([
  property()
], WuiSnackbar.prototype, "iconColor", void 0);
__decorate7([
  property()
], WuiSnackbar.prototype, "icon", void 0);
__decorate7([
  property()
], WuiSnackbar.prototype, "message", void 0);
__decorate7([
  property()
], WuiSnackbar.prototype, "loading", void 0);
__decorate7([
  property()
], WuiSnackbar.prototype, "iconType", void 0);
WuiSnackbar = __decorate7([
  customElement("wui-snackbar")
], WuiSnackbar);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-snackbar/styles.js
var styles_default8 = css`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-snackbar/index.js
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var presets2 = {
  loading: void 0,
  success: {
    backgroundColor: "success-100",
    iconColor: "success-100",
    icon: "checkmark"
  },
  error: {
    backgroundColor: "error-100",
    iconColor: "error-100",
    icon: "close"
  }
};
var W3mSnackBar = class W3mSnackBar2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.timeout = void 0;
    this.open = SnackController.state.open;
    this.unsubscribe.push(SnackController.subscribeKey("open", (val) => {
      this.open = val;
      this.onOpen();
    }));
  }
  disconnectedCallback() {
    clearTimeout(this.timeout);
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { message, variant, svg } = SnackController.state;
    const preset = presets2[variant];
    const { icon, iconColor } = svg ?? preset ?? {};
    return html`
      <wui-snackbar
        message=${message}
        backgroundColor=${preset == null ? void 0 : preset.backgroundColor}
        iconColor=${iconColor}
        icon=${icon}
        .loading=${variant === "loading"}
      ></wui-snackbar>
    `;
  }
  onOpen() {
    clearTimeout(this.timeout);
    if (this.open) {
      this.animate([
        { opacity: 0, transform: "translateX(-50%) scale(0.85)" },
        { opacity: 1, transform: "translateX(-50%) scale(1)" }
      ], {
        duration: 150,
        fill: "forwards",
        easing: "ease"
      });
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (SnackController.state.autoClose) {
        this.timeout = setTimeout(() => SnackController.hide(), 2500);
      }
    } else {
      this.animate([
        { opacity: 1, transform: "translateX(-50%) scale(1)" },
        { opacity: 0, transform: "translateX(-50%) scale(0.85)" }
      ], {
        duration: 150,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
};
W3mSnackBar.styles = styles_default8;
__decorate8([
  state()
], W3mSnackBar.prototype, "open", void 0);
W3mSnackBar = __decorate8([
  customElement("w3m-snackbar")
], W3mSnackBar);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip/styles.js
var styles_default9 = css`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip/index.js
var __decorate9 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mTooltip = class W3mTooltip2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.open = TooltipController.state.open;
    this.message = TooltipController.state.message;
    this.triggerRect = TooltipController.state.triggerRect;
    this.variant = TooltipController.state.variant;
    this.unsubscribe.push(...[
      TooltipController.subscribe((newState) => {
        this.open = newState.open;
        this.message = newState.message;
        this.triggerRect = newState.triggerRect;
        this.variant = newState.variant;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    this.dataset["variant"] = this.variant;
    const topValue = this.triggerRect.top;
    const leftValue = this.triggerRect.left;
    this.style.cssText = `
    --w3m-tooltip-top: ${topValue}px;
    --w3m-tooltip-left: ${leftValue}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width / 2}px;
    --w3m-tooltip-display: ${this.open ? "flex" : "none"};
    --w3m-tooltip-opacity: ${this.open ? 1 : 0};
    `;
    return html`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`;
  }
};
W3mTooltip.styles = [styles_default9];
__decorate9([
  state()
], W3mTooltip.prototype, "open", void 0);
__decorate9([
  state()
], W3mTooltip.prototype, "message", void 0);
__decorate9([
  state()
], W3mTooltip.prototype, "triggerRect", void 0);
__decorate9([
  state()
], W3mTooltip.prototype, "variant", void 0);
W3mTooltip = __decorate9([
  customElement("w3m-tooltip"),
  customElement("w3m-tooltip")
], W3mTooltip);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-router/styles.js
var styles_default10 = css`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-router/index.js
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var W3mRouter = class W3mRouter2 extends LitElement {
  constructor() {
    super();
    this.resizeObserver = void 0;
    this.prevHeight = "0px";
    this.prevHistoryLength = 1;
    this.unsubscribe = [];
    this.view = RouterController.state.view;
    this.viewDirection = "";
    this.unsubscribe.push(RouterController.subscribeKey("view", (val) => this.onViewChange(val)));
  }
  firstUpdated() {
    var _a;
    this.resizeObserver = new ResizeObserver(([content]) => {
      const height = `${content == null ? void 0 : content.contentRect.height}px`;
      if (this.prevHeight !== "0px") {
        this.style.setProperty("--prev-height", this.prevHeight);
        this.style.setProperty("--new-height", height);
        this.style.animation = "w3m-view-height 150ms forwards ease";
        this.style.height = "auto";
      }
      setTimeout(() => {
        this.prevHeight = height;
        this.style.animation = "unset";
      }, ConstantsUtil2.ANIMATION_DURATIONS.ModalHeight);
    });
    (_a = this.resizeObserver) == null ? void 0 : _a.observe(this.getWrapper());
  }
  disconnectedCallback() {
    var _a;
    (_a = this.resizeObserver) == null ? void 0 : _a.unobserve(this.getWrapper());
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return html`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`;
  }
  viewTemplate() {
    switch (this.view) {
      case "AccountSettings":
        return html`<w3m-account-settings-view></w3m-account-settings-view>`;
      case "Account":
        return html`<w3m-account-view></w3m-account-view>`;
      case "AllWallets":
        return html`<w3m-all-wallets-view></w3m-all-wallets-view>`;
      case "ApproveTransaction":
        return html`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;
      case "BuyInProgress":
        return html`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;
      case "ChooseAccountName":
        return html`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;
      case "Connect":
        return html`<w3m-connect-view></w3m-connect-view>`;
      case "Create":
        return html`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;
      case "ConnectingWalletConnect":
        return html`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;
      case "ConnectingWalletConnectBasic":
        return html`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;
      case "ConnectingExternal":
        return html`<w3m-connecting-external-view></w3m-connecting-external-view>`;
      case "ConnectingSiwe":
        return html`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;
      case "ConnectWallets":
        return html`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;
      case "ConnectSocials":
        return html`<w3m-connect-socials-view></w3m-connect-socials-view>`;
      case "ConnectingSocial":
        return html`<w3m-connecting-social-view></w3m-connecting-social-view>`;
      case "Downloads":
        return html`<w3m-downloads-view></w3m-downloads-view>`;
      case "EmailLogin":
        return html`<w3m-email-login-view></w3m-email-login-view>`;
      case "EmailVerifyOtp":
        return html`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;
      case "EmailVerifyDevice":
        return html`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;
      case "GetWallet":
        return html`<w3m-get-wallet-view></w3m-get-wallet-view>`;
      case "Networks":
        return html`<w3m-networks-view></w3m-networks-view>`;
      case "SwitchNetwork":
        return html`<w3m-network-switch-view></w3m-network-switch-view>`;
      case "Profile":
        return html`<w3m-profile-view></w3m-profile-view>`;
      case "SwitchAddress":
        return html`<w3m-switch-address-view></w3m-switch-address-view>`;
      case "Transactions":
        return html`<w3m-transactions-view></w3m-transactions-view>`;
      case "OnRampProviders":
        return html`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;
      case "OnRampActivity":
        return html`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;
      case "OnRampTokenSelect":
        return html`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;
      case "OnRampFiatSelect":
        return html`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;
      case "UpgradeEmailWallet":
        return html`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;
      case "UpdateEmailWallet":
        return html`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;
      case "UpdateEmailPrimaryOtp":
        return html`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;
      case "UpdateEmailSecondaryOtp":
        return html`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;
      case "UnsupportedChain":
        return html`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;
      case "Swap":
        return html`<w3m-swap-view></w3m-swap-view>`;
      case "SwapSelectToken":
        return html`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;
      case "SwapPreview":
        return html`<w3m-swap-preview-view></w3m-swap-preview-view>`;
      case "WalletSend":
        return html`<w3m-wallet-send-view></w3m-wallet-send-view>`;
      case "WalletSendSelectToken":
        return html`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;
      case "WalletSendPreview":
        return html`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;
      case "WhatIsABuy":
        return html`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;
      case "WalletReceive":
        return html`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;
      case "WalletCompatibleNetworks":
        return html`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;
      case "WhatIsAWallet":
        return html`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;
      case "ConnectingMultiChain":
        return html`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;
      case "WhatIsANetwork":
        return html`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;
      case "ConnectingFarcaster":
        return html`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;
      case "SwitchActiveChain":
        return html`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;
      case "RegisterAccountName":
        return html`<w3m-register-account-name-view></w3m-register-account-name-view>`;
      case "RegisterAccountNameSuccess":
        return html`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;
      case "SmartSessionCreated":
        return html`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;
      case "SmartSessionList":
        return html`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;
      case "SIWXSignMessage":
        return html`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;
      default:
        return html`<w3m-connect-view></w3m-connect-view>`;
    }
  }
  onViewChange(newView) {
    TooltipController.hide();
    let direction = ConstantsUtil2.VIEW_DIRECTION.Next;
    const { history } = RouterController.state;
    if (history.length < this.prevHistoryLength) {
      direction = ConstantsUtil2.VIEW_DIRECTION.Prev;
    }
    this.prevHistoryLength = history.length;
    this.viewDirection = direction;
    setTimeout(() => {
      this.view = newView;
    }, ConstantsUtil2.ANIMATION_DURATIONS.ViewTransition);
  }
  getWrapper() {
    var _a;
    return (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("div");
  }
};
W3mRouter.styles = styles_default10;
__decorate10([
  state()
], W3mRouter.prototype, "view", void 0);
__decorate10([
  state()
], W3mRouter.prototype, "viewDirection", void 0);
W3mRouter = __decorate10([
  customElement("w3m-router")
], W3mRouter);

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/styles.js
var styles_default11 = css`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.embedded) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.embedded) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

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

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/index.js
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SCROLL_LOCK = "scroll-lock";
var W3mModal = class W3mModal2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.abortController = void 0;
    this.hasPrefetched = false;
    this.enableEmbedded = OptionsController.state.enableEmbedded;
    this.open = ModalController.state.open;
    this.caipAddress = ChainController.state.activeCaipAddress;
    this.caipNetwork = ChainController.state.activeCaipNetwork;
    this.shake = ModalController.state.shake;
    this.filterByNamespace = ConnectorController.state.filterByNamespace;
    this.initializeTheming();
    ApiController.prefetchAnalyticsConfig();
    this.unsubscribe.push(...[
      ModalController.subscribeKey("open", (val) => val ? this.onOpen() : this.onClose()),
      ModalController.subscribeKey("shake", (val) => this.shake = val),
      ChainController.subscribeKey("activeCaipNetwork", (val) => this.onNewNetwork(val)),
      ChainController.subscribeKey("activeCaipAddress", (val) => this.onNewAddress(val)),
      OptionsController.subscribeKey("enableEmbedded", (val) => this.enableEmbedded = val),
      ConnectorController.subscribeKey("filterByNamespace", (val) => {
        var _a;
        if (this.filterByNamespace !== val && !((_a = ChainController.getAccountData(val)) == null ? void 0 : _a.caipAddress)) {
          ApiController.fetchRecommendedWallets();
          this.filterByNamespace = val;
        }
      })
    ]);
  }
  firstUpdated() {
    if (this.caipAddress) {
      if (this.enableEmbedded) {
        ModalController.close();
        this.prefetch();
        return;
      }
      this.onNewAddress(this.caipAddress);
    }
    if (this.open) {
      this.onOpen();
    }
    if (this.enableEmbedded) {
      this.prefetch();
    }
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    this.onRemoveKeyboardListener();
  }
  render() {
    this.style.cssText = `
      --local-border-bottom-mobile-radius: ${this.enableEmbedded ? "clamp(0px, var(--wui-border-radius-l), 44px)" : "0px"};
    `;
    if (this.enableEmbedded) {
      return html`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `;
    }
    return this.open ? html`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        ` : null;
  }
  contentTemplate() {
    return html` <wui-card
      shake="${this.shake}"
      data-embedded="${ifDefined(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`;
  }
  async onOverlayClick(event) {
    if (event.target === event.currentTarget) {
      await this.handleClose();
    }
  }
  async handleClose() {
    const isUnsupportedChain = RouterController.state.view === "UnsupportedChain";
    if (isUnsupportedChain || await SIWXUtil.isSIWXCloseDisabled()) {
      ModalController.shake();
    } else {
      ModalController.close();
    }
  }
  initializeTheming() {
    const { themeVariables, themeMode } = ThemeController.state;
    const defaultThemeMode = UiHelperUtil.getColorTheme(themeMode);
    initializeTheming(themeVariables, defaultThemeMode);
  }
  onClose() {
    this.open = false;
    this.classList.remove("open");
    this.onScrollUnlock();
    SnackController.hide();
    this.onRemoveKeyboardListener();
  }
  onOpen() {
    this.open = true;
    this.classList.add("open");
    this.onScrollLock();
    this.onAddKeyboardListener();
  }
  onScrollLock() {
    const styleTag = document.createElement("style");
    styleTag.dataset["w3m"] = SCROLL_LOCK;
    styleTag.textContent = `
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `;
    document.head.appendChild(styleTag);
  }
  onScrollUnlock() {
    const styleTag = document.head.querySelector(`style[data-w3m="${SCROLL_LOCK}"]`);
    if (styleTag) {
      styleTag.remove();
    }
  }
  onAddKeyboardListener() {
    var _a;
    this.abortController = new AbortController();
    const card = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("wui-card");
    card == null ? void 0 : card.focus();
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.handleClose();
      } else if (event.key === "Tab") {
        const { tagName } = event.target;
        if (tagName && !tagName.includes("W3M-") && !tagName.includes("WUI-")) {
          card == null ? void 0 : card.focus();
        }
      }
    }, this.abortController);
  }
  onRemoveKeyboardListener() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
    this.abortController = void 0;
  }
  async onNewAddress(caipAddress) {
    const isSwitchingNamespace = ChainController.state.isSwitchingNamespace;
    const nextConnected = CoreHelperUtil.getPlainAddress(caipAddress);
    const isDisconnectedInSameNamespace = !nextConnected && !isSwitchingNamespace;
    const isSwitchingNamespaceAndConnected = isSwitchingNamespace && nextConnected;
    if (isDisconnectedInSameNamespace) {
      ModalController.close();
    } else if (isSwitchingNamespaceAndConnected) {
      RouterController.goBack();
    }
    await SIWXUtil.initializeIfEnabled();
    this.caipAddress = caipAddress;
    ChainController.setIsSwitchingNamespace(false);
  }
  onNewNetwork(nextCaipNetwork) {
    var _a, _b, _c, _d;
    const prevCaipNetworkId = (_b = (_a = this.caipNetwork) == null ? void 0 : _a.caipNetworkId) == null ? void 0 : _b.toString();
    const nextNetworkId = (_c = nextCaipNetwork == null ? void 0 : nextCaipNetwork.caipNetworkId) == null ? void 0 : _c.toString();
    const networkChanged = prevCaipNetworkId && nextNetworkId && prevCaipNetworkId !== nextNetworkId;
    const isSwitchingNamespace = ChainController.state.isSwitchingNamespace;
    const isUnsupportedNetwork = ((_d = this.caipNetwork) == null ? void 0 : _d.name) === ConstantsUtil.UNSUPPORTED_NETWORK_NAME;
    const isConnectingExternal = RouterController.state.view === "ConnectingExternal";
    const isNotConnected = !this.caipAddress;
    const isNetworkChangedInSameNamespace = networkChanged && !isUnsupportedNetwork && !isSwitchingNamespace;
    const isUnsupportedNetworkScreen = RouterController.state.view === "UnsupportedChain";
    const isModalOpen = ModalController.state.open;
    const shouldGoBack = isModalOpen && !isConnectingExternal && (isNotConnected || isUnsupportedNetworkScreen || isNetworkChangedInSameNamespace);
    if (shouldGoBack) {
      RouterController.goBack();
    }
    this.caipNetwork = nextCaipNetwork;
  }
  prefetch() {
    if (!this.hasPrefetched) {
      ApiController.prefetch();
      ApiController.fetchWallets({ page: 1 });
      this.hasPrefetched = true;
    }
  }
};
W3mModal.styles = styles_default11;
__decorate11([
  property({ type: Boolean })
], W3mModal.prototype, "enableEmbedded", void 0);
__decorate11([
  state()
], W3mModal.prototype, "open", void 0);
__decorate11([
  state()
], W3mModal.prototype, "caipAddress", void 0);
__decorate11([
  state()
], W3mModal.prototype, "caipNetwork", void 0);
__decorate11([
  state()
], W3mModal.prototype, "shake", void 0);
__decorate11([
  state()
], W3mModal.prototype, "filterByNamespace", void 0);
W3mModal = __decorate11([
  customElement("w3m-modal")
], W3mModal);
export {
  W3mModal
};
//# sourceMappingURL=w3m-modal-PCSKTB6B.js.map

import {
  A,
  ApiController,
  ChainController,
  ConnectionController,
  ConnectorController,
  ConstantsUtil,
  ConstantsUtil3 as ConstantsUtil2,
  CoreHelperUtil,
  OptionsController,
  StorageUtil,
  fallback,
  http,
  k,
  proxy,
  ref,
  subscribe,
  subscribeKey
} from "./chunk-TARECR2R.js";

// node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js
var ConstantsUtil3 = {
  METMASK_CONNECTOR_NAME: "MetaMask",
  TRUST_CONNECTOR_NAME: "Trust Wallet",
  SOLFLARE_CONNECTOR_NAME: "Solflare",
  PHANTOM_CONNECTOR_NAME: "Phantom",
  COIN98_CONNECTOR_NAME: "Coin98",
  MAGIC_EDEN_CONNECTOR_NAME: "Magic Eden",
  BACKPACK_CONNECTOR_NAME: "Backpack",
  BITGET_CONNECTOR_NAME: "Bitget Wallet",
  FRONTIER_CONNECTOR_NAME: "Frontier",
  XVERSE_CONNECTOR_NAME: "Xverse Wallet",
  LEATHER_CONNECTOR_NAME: "Leather",
  EIP155: "eip155",
  ADD_CHAIN_METHOD: "wallet_addEthereumChain",
  EIP6963_ANNOUNCE_EVENT: "eip6963:announceProvider",
  EIP6963_REQUEST_EVENT: "eip6963:requestProvider",
  CONNECTOR_RDNS_MAP: {
    coinbaseWallet: "com.coinbase.wallet",
    coinbaseWalletSDK: "com.coinbase.wallet"
  },
  CONNECTOR_TYPE_EXTERNAL: "EXTERNAL",
  CONNECTOR_TYPE_WALLET_CONNECT: "WALLET_CONNECT",
  CONNECTOR_TYPE_INJECTED: "INJECTED",
  CONNECTOR_TYPE_ANNOUNCED: "ANNOUNCED",
  CONNECTOR_TYPE_AUTH: "AUTH",
  CONNECTOR_TYPE_MULTI_CHAIN: "MULTI_CHAIN",
  CONNECTOR_TYPE_W3M_AUTH: "ID_AUTH"
};

// node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js
var PresetsUtil = {
  ConnectorExplorerIds: {
    [ConstantsUtil.CONNECTOR_ID.COINBASE]: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
    [ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
    [ConstantsUtil.CONNECTOR_ID.SAFE]: "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
    [ConstantsUtil.CONNECTOR_ID.LEDGER]: "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927",
    [ConstantsUtil.CONNECTOR_ID.OKX]: "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
    [ConstantsUtil3.METMASK_CONNECTOR_NAME]: "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    [ConstantsUtil3.TRUST_CONNECTOR_NAME]: "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    [ConstantsUtil3.SOLFLARE_CONNECTOR_NAME]: "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",
    [ConstantsUtil3.PHANTOM_CONNECTOR_NAME]: "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    [ConstantsUtil3.COIN98_CONNECTOR_NAME]: "2a3c89040ac3b723a1972a33a125b1db11e258a6975d3a61252cd64e6ea5ea01",
    [ConstantsUtil3.MAGIC_EDEN_CONNECTOR_NAME]: "8b830a2b724a9c3fbab63af6f55ed29c9dfa8a55e732dc88c80a196a2ba136c6",
    [ConstantsUtil3.BACKPACK_CONNECTOR_NAME]: "2bd8c14e035c2d48f184aaa168559e86b0e3433228d3c4075900a221785019b0",
    [ConstantsUtil3.BITGET_CONNECTOR_NAME]: "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
    [ConstantsUtil3.FRONTIER_CONNECTOR_NAME]: "85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041",
    [ConstantsUtil3.XVERSE_CONNECTOR_NAME]: "2a87d74ae02e10bdd1f51f7ce6c4e1cc53cd5f2c0b6b5ad0d7b3007d2b13de7b",
    [ConstantsUtil3.LEATHER_CONNECTOR_NAME]: "483afe1df1df63daf313109971ff3ef8356ddf1cc4e45877d205eee0b7893a13"
  },
  NetworkImageIds: {
    1: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
    42161: "3bff954d-5cb0-47a0-9a23-d20192e74600",
    43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00",
    56: "93564157-2e8e-4ce7-81df-b264dbee9b00",
    250: "06b26297-fe0c-4733-5d6b-ffa5498aac00",
    10: "ab9c186a-c52f-464b-2906-ca59d760a400",
    137: "41d04d42-da3b-4453-8506-668cc0727900",
    5e3: "e86fae9b-b770-4eea-e520-150e12c81100",
    295: "6a97d510-cac8-4e58-c7ce-e8681b044c00",
    11155111: "e909ea0a-f92a-4512-c8fc-748044ea6800",
    84532: "a18a7ecd-e307-4360-4746-283182228e00",
    1301: "4eeea7ef-0014-4649-5d1d-07271a80f600",
    130: "2257980a-3463-48c6-cbac-a42d2a956e00",
    10143: "0a728e83-bacb-46db-7844-948f05434900",
    100: "02b53f6a-e3d4-479e-1cb4-21178987d100",
    9001: "f926ff41-260d-4028-635e-91913fc28e00",
    324: "b310f07f-4ef7-49f3-7073-2a0a39685800",
    314: "5a73b3dd-af74-424e-cae0-0de859ee9400",
    4689: "34e68754-e536-40da-c153-6ef2e7188a00",
    1088: "3897a66d-40b9-4833-162f-a2c90531c900",
    1284: "161038da-44ae-4ec7-1208-0ea569454b00",
    1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00",
    7777777: "845c60df-d429-4991-e687-91ae45791600",
    42220: "ab781bbc-ccc6-418d-d32d-789b15da1f00",
    8453: "7289c336-3981-4081-c5f4-efc26ac64a00",
    1313161554: "3ff73439-a619-4894-9262-4470c773a100",
    2020: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    2021: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    80094: "e329c2c9-59b0-4a02-83e4-212ff3779900",
    "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    EtWTRABZaYq6iMfeYKouRu166VU2xqa1: "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "000000000019d6689c085ae165831e93": "0b4838db-0161-4ffe-022d-532bf03dba00",
    "000000000933ea01ad0ee984209779ba": "39354064-d79b-420b-065d-f980c4b78200"
  },
  ConnectorImageIds: {
    [ConstantsUtil.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [ConstantsUtil.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
    [ConstantsUtil.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
    [ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
    [ConstantsUtil.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00"
  },
  ConnectorNamesMap: {
    [ConstantsUtil.CONNECTOR_ID.INJECTED]: "Browser Wallet",
    [ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
    [ConstantsUtil.CONNECTOR_ID.COINBASE]: "Coinbase",
    [ConstantsUtil.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
    [ConstantsUtil.CONNECTOR_ID.LEDGER]: "Ledger",
    [ConstantsUtil.CONNECTOR_ID.SAFE]: "Safe"
  },
  ConnectorTypesMap: {
    [ConstantsUtil.CONNECTOR_ID.INJECTED]: "INJECTED",
    [ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT]: "WALLET_CONNECT",
    [ConstantsUtil.CONNECTOR_ID.EIP6963]: "ANNOUNCED",
    [ConstantsUtil.CONNECTOR_ID.AUTH]: "AUTH"
  },
  WalletConnectRpcChainIds: [
    1,
    5,
    11155111,
    10,
    420,
    42161,
    421613,
    137,
    80001,
    42220,
    1313161554,
    1313161555,
    56,
    97,
    43114,
    43113,
    100,
    8453,
    84531,
    7777777,
    999,
    324,
    280
  ]
};

// node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js
var HelpersUtil = {
  getCaipTokens(tokens) {
    if (!tokens) {
      return void 0;
    }
    const caipTokens = {};
    Object.entries(tokens).forEach(([id, token]) => {
      caipTokens[`${ConstantsUtil3.EIP155}:${id}`] = token;
    });
    return caipTokens;
  },
  isLowerCaseMatch(str1, str2) {
    return (str1 == null ? void 0 : str1.toLowerCase()) === (str2 == null ? void 0 : str2.toLowerCase());
  }
};

// node_modules/@reown/appkit-utils/dist/esm/src/ErrorUtil.js
var ErrorUtil = {
  UniversalProviderErrors: {
    UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
      message: "Unauthorized: origin not allowed",
      alertErrorKey: "INVALID_APP_CONFIGURATION"
    },
    JWT_VALIDATION_ERROR: {
      message: "JWT validation error: JWT Token is not yet valid",
      alertErrorKey: "JWT_TOKEN_NOT_VALID"
    },
    INVALID_KEY: {
      message: "Unauthorized: invalid key",
      alertErrorKey: "INVALID_PROJECT_ID"
    }
  },
  ALERT_ERRORS: {
    SWITCH_NETWORK_NOT_FOUND: {
      shortMessage: "Network Not Found",
      longMessage: "Network not found - please make sure it is included in 'networks' array in createAppKit function"
    },
    INVALID_APP_CONFIGURATION: {
      shortMessage: "Invalid App Configuration",
      longMessage: () => `Origin ${isSafe() ? window.origin : "unknown"} not found on Allowlist - update configuration on cloud.reown.com`
    },
    SOCIALS_TIMEOUT: {
      shortMessage: "Invalid App Configuration",
      longMessage: () => "There was an issue loading the embedded wallet. Please verify that your domain is allowed at cloud.reown.com"
    },
    JWT_TOKEN_NOT_VALID: {
      shortMessage: "Session Expired",
      longMessage: "Invalid session found on UniversalProvider - please check your time settings and connect again"
    },
    INVALID_PROJECT_ID: {
      shortMessage: "Invalid App Configuration",
      longMessage: "Invalid Project ID - update configuration"
    },
    PROJECT_ID_NOT_CONFIGURED: {
      shortMessage: "Project ID Not Configured",
      longMessage: "Project ID Not Configured - update configuration on cloud.reown.com"
    }
  }
};
function isSafe() {
  return typeof window !== "undefined";
}

// node_modules/@reown/appkit-utils/dist/esm/src/LoggerUtil.js
var LoggerUtil = {
  createLogger(onError, level = "error") {
    const loggerOptions = k({
      level
    });
    const { logger } = A({
      opts: loggerOptions
    });
    logger.error = (...args) => {
      for (const arg of args) {
        if (arg instanceof Error) {
          onError(arg, ...args);
          return;
        }
      }
      onError(void 0, ...args);
    };
    return logger;
  }
};

// node_modules/@reown/appkit-utils/dist/esm/src/CaipNetworkUtil.js
var RPC_URL_HOST = "rpc.walletconnect.org";
function getBlockchainApiRpcUrl(caipNetworkId, projectId) {
  const url = new URL("https://rpc.walletconnect.org/v1/");
  url.searchParams.set("chainId", caipNetworkId);
  url.searchParams.set("projectId", projectId);
  return url.toString();
}
var WC_HTTP_RPC_SUPPORTED_CHAINS = [
  "near:mainnet",
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  "eip155:1101",
  "eip155:56",
  "eip155:42161",
  "eip155:7777777",
  "eip155:59144",
  "eip155:324",
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  "eip155:5000",
  "solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz",
  "eip155:80084",
  "eip155:5003",
  "eip155:100",
  "eip155:8453",
  "eip155:42220",
  "eip155:1313161555",
  "eip155:17000",
  "eip155:1",
  "eip155:300",
  "eip155:1313161554",
  "eip155:1329",
  "eip155:84532",
  "eip155:421614",
  "eip155:11155111",
  "eip155:8217",
  "eip155:43114",
  "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  "eip155:999999999",
  "eip155:11155420",
  "eip155:80002",
  "eip155:97",
  "eip155:43113",
  "eip155:137",
  "eip155:10",
  "eip155:1301",
  "bip122:000000000019d6689c085ae165831e93",
  "bip122:000000000933ea01ad0ee984209779ba"
];
var CaipNetworksUtil = {
  extendRpcUrlWithProjectId(rpcUrl, projectId) {
    let isReownUrl = false;
    try {
      const url = new URL(rpcUrl);
      isReownUrl = url.host === RPC_URL_HOST;
    } catch (e) {
      isReownUrl = false;
    }
    if (isReownUrl) {
      const url = new URL(rpcUrl);
      if (!url.searchParams.has("projectId")) {
        url.searchParams.set("projectId", projectId);
      }
      return url.toString();
    }
    return rpcUrl;
  },
  isCaipNetwork(network) {
    return "chainNamespace" in network && "caipNetworkId" in network;
  },
  getChainNamespace(network) {
    if (this.isCaipNetwork(network)) {
      return network.chainNamespace;
    }
    return ConstantsUtil.CHAIN.EVM;
  },
  getCaipNetworkId(network) {
    if (this.isCaipNetwork(network)) {
      return network.caipNetworkId;
    }
    return `${ConstantsUtil.CHAIN.EVM}:${network.id}`;
  },
  getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId) {
    var _a, _b, _c;
    const defaultRpcUrl = (_c = (_b = (_a = caipNetwork.rpcUrls) == null ? void 0 : _a.default) == null ? void 0 : _b.http) == null ? void 0 : _c[0];
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetworkId)) {
      return getBlockchainApiRpcUrl(caipNetworkId, projectId);
    }
    return defaultRpcUrl || "";
  },
  extendCaipNetwork(caipNetwork, { customNetworkImageUrls, projectId, customRpcUrls }) {
    var _a, _b, _c, _d, _e;
    const chainNamespace = this.getChainNamespace(caipNetwork);
    const caipNetworkId = this.getCaipNetworkId(caipNetwork);
    const networkDefaultRpcUrl = (_a = caipNetwork.rpcUrls.default.http) == null ? void 0 : _a[0];
    const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId);
    const chainDefaultRpcUrl = ((_d = (_c = (_b = caipNetwork == null ? void 0 : caipNetwork.rpcUrls) == null ? void 0 : _b["chainDefault"]) == null ? void 0 : _c.http) == null ? void 0 : _d[0]) || networkDefaultRpcUrl;
    const customRpcUrlsOfNetwork = ((_e = customRpcUrls == null ? void 0 : customRpcUrls[caipNetworkId]) == null ? void 0 : _e.map((i) => i.url)) || [];
    const rpcUrls = [...customRpcUrlsOfNetwork, reownRpcUrl];
    const rpcUrlsWithoutReown = [...customRpcUrlsOfNetwork];
    if (chainDefaultRpcUrl && !rpcUrlsWithoutReown.includes(chainDefaultRpcUrl)) {
      rpcUrlsWithoutReown.push(chainDefaultRpcUrl);
    }
    return {
      ...caipNetwork,
      chainNamespace,
      caipNetworkId,
      assets: {
        imageId: PresetsUtil.NetworkImageIds[caipNetwork.id],
        imageUrl: customNetworkImageUrls == null ? void 0 : customNetworkImageUrls[caipNetwork.id]
      },
      rpcUrls: {
        ...caipNetwork.rpcUrls,
        default: {
          http: rpcUrls
        },
        chainDefault: {
          http: rpcUrlsWithoutReown
        }
      }
    };
  },
  extendCaipNetworks(caipNetworks, { customNetworkImageUrls, projectId, customRpcUrls }) {
    return caipNetworks.map((caipNetwork) => CaipNetworksUtil.extendCaipNetwork(caipNetwork, {
      customNetworkImageUrls,
      customRpcUrls,
      projectId
    }));
  },
  getViemTransport(caipNetwork, projectId, customRpcUrls) {
    const transports = [];
    customRpcUrls == null ? void 0 : customRpcUrls.forEach((rpcUrl) => {
      transports.push(http(rpcUrl.url, rpcUrl.config));
    });
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
      const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetwork.caipNetworkId, projectId);
      transports.push(http(reownRpcUrl, {
        fetchOptions: {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      }));
    }
    return fallback(transports);
  },
  extendWagmiTransports(caipNetwork, projectId, transport) {
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
      const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetwork.caipNetworkId, projectId);
      return fallback([transport, http(reownRpcUrl)]);
    }
    return transport;
  },
  getUnsupportedNetwork(caipNetworkId) {
    return {
      id: caipNetworkId.split(":")[1],
      caipNetworkId,
      name: ConstantsUtil.UNSUPPORTED_NETWORK_NAME,
      chainNamespace: caipNetworkId.split(":")[0],
      nativeCurrency: {
        name: "",
        decimals: 0,
        symbol: ""
      },
      rpcUrls: {
        default: {
          http: []
        }
      }
    };
  },
  getCaipNetworkFromStorage(defaultCaipNetwork) {
    var _a;
    const caipNetworkIdFromStorage = StorageUtil.getActiveCaipNetworkId();
    const caipNetworks = ChainController.getAllRequestedCaipNetworks();
    const availableNamespaces = Array.from(((_a = ChainController.state.chains) == null ? void 0 : _a.keys()) || []);
    const namespace = caipNetworkIdFromStorage == null ? void 0 : caipNetworkIdFromStorage.split(":")[0];
    const isNamespaceAvailable = namespace ? availableNamespaces.includes(namespace) : false;
    const caipNetwork = caipNetworks == null ? void 0 : caipNetworks.find((cn) => cn.caipNetworkId === caipNetworkIdFromStorage);
    const isUnsupportedNetwork = isNamespaceAvailable && !caipNetwork && caipNetworkIdFromStorage;
    if (isUnsupportedNetwork) {
      return this.getUnsupportedNetwork(caipNetworkIdFromStorage);
    }
    if (caipNetwork) {
      return caipNetwork;
    }
    if (defaultCaipNetwork) {
      return defaultCaipNetwork;
    }
    return caipNetworks == null ? void 0 : caipNetworks[0];
  }
};

// node_modules/@reown/appkit-utils/dist/esm/src/ProviderUtil.js
var CLEAN_PROVIDERS_STATE = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0
};
var state = proxy({
  providers: { ...CLEAN_PROVIDERS_STATE },
  providerIds: { ...CLEAN_PROVIDERS_STATE }
});
var ProviderUtil = {
  state,
  subscribeKey(key, callback) {
    return subscribeKey(state, key, callback);
  },
  subscribe(callback) {
    return subscribe(state, () => {
      callback(state);
    });
  },
  subscribeProviders(callback) {
    return subscribe(state.providers, () => callback(state.providers));
  },
  setProvider(chainNamespace, provider) {
    if (provider) {
      state.providers[chainNamespace] = ref(provider);
    }
  },
  getProvider(chainNamespace) {
    return state.providers[chainNamespace];
  },
  setProviderId(chainNamespace, providerId) {
    if (providerId) {
      state.providerIds[chainNamespace] = providerId;
    }
  },
  getProviderId(chainNamespace) {
    if (!chainNamespace) {
      return void 0;
    }
    return state.providerIds[chainNamespace];
  },
  reset() {
    state.providers = { ...CLEAN_PROVIDERS_STATE };
    state.providerIds = { ...CLEAN_PROVIDERS_STATE };
  },
  resetChain(chainNamespace) {
    state.providers[chainNamespace] = void 0;
    state.providerIds[chainNamespace] = void 0;
  }
};

// node_modules/@reown/appkit-utils/dist/esm/src/TypeUtil.js
var SocialProviderEnum;
(function(SocialProviderEnum2) {
  SocialProviderEnum2["Google"] = "google";
  SocialProviderEnum2["Github"] = "github";
  SocialProviderEnum2["Apple"] = "apple";
  SocialProviderEnum2["Facebook"] = "facebook";
  SocialProviderEnum2["X"] = "x";
  SocialProviderEnum2["Discord"] = "discord";
  SocialProviderEnum2["Farcaster"] = "farcaster";
})(SocialProviderEnum || (SocialProviderEnum = {}));

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConnectorUtil.js
var ConnectorUtil = {
  getConnectorsByType(connectors, recommended, featured) {
    const { customWallets } = OptionsController.state;
    const recent = StorageUtil.getRecentWallets();
    const filteredRecommended = WalletUtil.filterOutDuplicateWallets(recommended);
    const filteredFeatured = WalletUtil.filterOutDuplicateWallets(featured);
    const multiChain = connectors.filter((connector) => connector.type === "MULTI_CHAIN");
    const announced = connectors.filter((connector) => connector.type === "ANNOUNCED");
    const injected = connectors.filter((connector) => connector.type === "INJECTED");
    const external = connectors.filter((connector) => connector.type === "EXTERNAL");
    return {
      custom: customWallets,
      recent,
      external,
      multiChain,
      announced,
      injected,
      recommended: filteredRecommended,
      featured: filteredFeatured
    };
  },
  showConnector(connector) {
    var _a;
    const rdns = (_a = connector.info) == null ? void 0 : _a.rdns;
    const isRDNSExcluded = Boolean(rdns) && ApiController.state.excludedWallets.some((wallet) => wallet.rdns === rdns);
    const isNameExcluded = Boolean(connector.name) && ApiController.state.excludedWallets.some((wallet) => HelpersUtil.isLowerCaseMatch(wallet.name, connector.name));
    if (connector.type === "INJECTED") {
      if (!CoreHelperUtil.isMobile() && connector.name === "Browser Wallet") {
        return false;
      }
      if (!rdns && !ConnectionController.checkInstalled()) {
        return false;
      }
      if (isRDNSExcluded || isNameExcluded) {
        return false;
      }
    }
    if (connector.type === "ANNOUNCED" && (isRDNSExcluded || isNameExcluded)) {
      return false;
    }
    return true;
  },
  getIsConnectedWithWC() {
    const chains = Array.from(ChainController.state.chains.values());
    const isConnectedWithWC = chains.some((chain) => {
      const connectorId = ConnectorController.getConnectorId(chain.namespace);
      return connectorId === ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT;
    });
    return isConnectedWithWC;
  },
  getConnectorTypeOrder({ recommended, featured, custom, recent, announced, injected, multiChain, external, overriddenConnectors = ((_a) => (_a = OptionsController.state.features) == null ? void 0 : _a.connectorTypeOrder)() ?? [] }) {
    const isConnectedWithWC = ConnectorUtil.getIsConnectedWithWC();
    const isWCEnabled = OptionsController.state.enableWalletConnect;
    const allConnectors = [
      { type: "walletConnect", isEnabled: isWCEnabled && !isConnectedWithWC },
      { type: "recent", isEnabled: recent.length > 0 },
      { type: "injected", isEnabled: [...injected, ...announced, ...multiChain].length > 0 },
      { type: "featured", isEnabled: featured.length > 0 },
      { type: "custom", isEnabled: custom && custom.length > 0 },
      { type: "external", isEnabled: external.length > 0 },
      { type: "recommended", isEnabled: recommended.length > 0 }
    ];
    const enabledConnectors = allConnectors.filter((option) => option.isEnabled);
    const enabledConnectorTypes = new Set(enabledConnectors.map((option) => option.type));
    const prioritizedConnectors = overriddenConnectors.filter((type) => enabledConnectorTypes.has(type)).map((type) => ({ type, isEnabled: true }));
    const remainingConnectors = enabledConnectors.filter(({ type: enabledConnectorType }) => {
      const hasPrioritizedConnector = prioritizedConnectors.some(({ type: prioritizedConnectorType }) => prioritizedConnectorType === enabledConnectorType);
      return !hasPrioritizedConnector;
    });
    return Array.from(new Set([...prioritizedConnectors, ...remainingConnectors].map(({ type }) => type)));
  }
};

// node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/WalletUtil.js
var WalletUtil = {
  filterOutDuplicatesByRDNS(wallets) {
    const connectors = OptionsController.state.enableEIP6963 ? ConnectorController.state.connectors : [];
    const recent = StorageUtil.getRecentWallets();
    const connectorRDNSs = connectors.map((connector) => {
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
  },
  filterOutDuplicatesByIds(wallets) {
    const connectors = ConnectorController.state.connectors.filter((connector) => connector.type === "ANNOUNCED" || connector.type === "INJECTED");
    const recent = StorageUtil.getRecentWallets();
    const connectorIds = connectors.map((connector) => connector.explorerId);
    const recentIds = recent.map((wallet) => wallet.id);
    const allIds = connectorIds.concat(recentIds);
    const filtered = wallets.filter((wallet) => !allIds.includes(wallet == null ? void 0 : wallet.id));
    return filtered;
  },
  filterOutDuplicateWallets(wallets) {
    const uniqueByRDNS = this.filterOutDuplicatesByRDNS(wallets);
    const uniqueWallets = this.filterOutDuplicatesByIds(uniqueByRDNS);
    return uniqueWallets;
  },
  markWalletsAsInstalled(wallets) {
    const { connectors } = ConnectorController.state;
    const installedConnectors = connectors.filter((c) => c.type === "ANNOUNCED").reduce((acum, val) => {
      var _a;
      if (!((_a = val.info) == null ? void 0 : _a.rdns)) {
        return acum;
      }
      acum[val.info.rdns] = true;
      return acum;
    }, {});
    const walletsWithInstalled = wallets.map((wallet) => ({
      ...wallet,
      installed: Boolean(wallet.rdns) && Boolean(installedConnectors[wallet.rdns ?? ""])
    }));
    const sortedWallets = walletsWithInstalled.sort((a, b) => Number(b.installed) - Number(a.installed));
    return sortedWallets;
  },
  getConnectOrderMethod(_features, _connectors) {
    var _a;
    const connectMethodOrder = (_features == null ? void 0 : _features.connectMethodsOrder) || ((_a = OptionsController.state.features) == null ? void 0 : _a.connectMethodsOrder);
    const connectors = _connectors || ConnectorController.state.connectors;
    if (connectMethodOrder) {
      return connectMethodOrder;
    }
    const { injected, announced } = ConnectorUtil.getConnectorsByType(connectors, ApiController.state.recommended, ApiController.state.featured);
    const shownInjected = injected.filter(ConnectorUtil.showConnector);
    const shownAnnounced = announced.filter(ConnectorUtil.showConnector);
    if (shownInjected.length || shownAnnounced.length) {
      return ["wallet", "email", "social"];
    }
    return ConstantsUtil2.DEFAULT_CONNECT_METHOD_ORDER;
  }
};

export {
  ConstantsUtil3 as ConstantsUtil,
  PresetsUtil,
  HelpersUtil,
  ErrorUtil,
  LoggerUtil,
  CaipNetworksUtil,
  ProviderUtil,
  WalletUtil,
  ConnectorUtil
};
//# sourceMappingURL=chunk-5QHL57AY.js.map

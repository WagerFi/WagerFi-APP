import {
  require_react_dom
} from "./chunk-S277HYIL.js";
import {
  useWallet
} from "./chunk-OU7VRZ6A.js";
import "./chunk-NPFSRFYW.js";
import {
  require_react
} from "./chunk-HZQOY4LB.js";
import "./chunk-TPI7CCOE.js";
import "./chunk-5NC5FW7O.js";
import "./chunk-KPHJQWGP.js";
import "./chunk-IBWGIHRU.js";
import "./chunk-VESSVHNC.js";
import "./chunk-Y5D73FR4.js";
import {
  WalletReadyState
} from "./chunk-FCW3QQ5O.js";
import "./chunk-5JTSV3KR.js";
import "./chunk-IJLNJGDT.js";
import {
  __toESM
} from "./chunk-MVEJMUOB.js";

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/useWalletModal.js
var import_react = __toESM(require_react(), 1);
var DEFAULT_CONTEXT = {
  setVisible(_open) {
    console.error(constructMissingProviderErrorMessage("call", "setVisible"));
  },
  visible: false
};
Object.defineProperty(DEFAULT_CONTEXT, "visible", {
  get() {
    console.error(constructMissingProviderErrorMessage("read", "visible"));
    return false;
  }
});
function constructMissingProviderErrorMessage(action, valueName) {
  return `You have tried to  ${action} "${valueName}" on a WalletModalContext without providing one. Make sure to render a WalletModalProvider as an ancestor of the component that uses WalletModalContext`;
}
var WalletModalContext = (0, import_react.createContext)(DEFAULT_CONTEXT);
function useWalletModal() {
  return (0, import_react.useContext)(WalletModalContext);
}

// node_modules/@solana/wallet-adapter-base-ui/lib/esm/useWalletConnectButton.js
var import_react2 = __toESM(require_react(), 1);
function useWalletConnectButton() {
  const { connect, connected, connecting, wallet } = useWallet();
  let buttonState;
  if (connecting) {
    buttonState = "connecting";
  } else if (connected) {
    buttonState = "connected";
  } else if (wallet) {
    buttonState = "has-wallet";
  } else {
    buttonState = "no-wallet";
  }
  const handleConnectButtonClick = (0, import_react2.useCallback)(() => {
    connect().catch(() => {
    });
  }, [connect]);
  return {
    buttonDisabled: buttonState !== "has-wallet",
    buttonState,
    onButtonClick: buttonState === "has-wallet" ? handleConnectButtonClick : void 0,
    walletIcon: wallet == null ? void 0 : wallet.adapter.icon,
    walletName: wallet == null ? void 0 : wallet.adapter.name
  };
}

// node_modules/@solana/wallet-adapter-base-ui/lib/esm/useWalletDisconnectButton.js
var import_react3 = __toESM(require_react(), 1);
function useWalletDisconnectButton() {
  const { disconnecting, disconnect, wallet } = useWallet();
  let buttonState;
  if (disconnecting) {
    buttonState = "disconnecting";
  } else if (wallet) {
    buttonState = "has-wallet";
  } else {
    buttonState = "no-wallet";
  }
  const handleDisconnectButtonClick = (0, import_react3.useCallback)(() => {
    disconnect().catch(() => {
    });
  }, [disconnect]);
  return {
    buttonDisabled: buttonState !== "has-wallet",
    buttonState,
    onButtonClick: buttonState === "has-wallet" ? handleDisconnectButtonClick : void 0,
    walletIcon: wallet == null ? void 0 : wallet.adapter.icon,
    walletName: wallet == null ? void 0 : wallet.adapter.name
  };
}

// node_modules/@solana/wallet-adapter-base-ui/lib/esm/useWalletMultiButton.js
var import_react4 = __toESM(require_react(), 1);
function useWalletMultiButton({ onSelectWallet }) {
  const { connect, connected, connecting, disconnect, disconnecting, publicKey, select, wallet, wallets } = useWallet();
  let buttonState;
  if (connecting) {
    buttonState = "connecting";
  } else if (connected) {
    buttonState = "connected";
  } else if (disconnecting) {
    buttonState = "disconnecting";
  } else if (wallet) {
    buttonState = "has-wallet";
  } else {
    buttonState = "no-wallet";
  }
  const handleConnect = (0, import_react4.useCallback)(() => {
    connect().catch(() => {
    });
  }, [connect]);
  const handleDisconnect = (0, import_react4.useCallback)(() => {
    disconnect().catch(() => {
    });
  }, [disconnect]);
  const handleSelectWallet = (0, import_react4.useCallback)(() => {
    onSelectWallet({ onSelectWallet: select, wallets });
  }, [onSelectWallet, select, wallets]);
  return {
    buttonState,
    onConnect: buttonState === "has-wallet" ? handleConnect : void 0,
    onDisconnect: buttonState !== "disconnecting" && buttonState !== "no-wallet" ? handleDisconnect : void 0,
    onSelectWallet: handleSelectWallet,
    publicKey: publicKey ?? void 0,
    walletIcon: wallet == null ? void 0 : wallet.adapter.icon,
    walletName: wallet == null ? void 0 : wallet.adapter.name
  };
}

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletConnectButton.js
var import_react8 = __toESM(require_react(), 1);

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletConnectionButton.js
var import_react7 = __toESM(require_react(), 1);

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/Button.js
var import_react5 = __toESM(require_react(), 1);
var Button = (props) => {
  return import_react5.default.createElement(
    "button",
    { className: `wallet-adapter-button ${props.className || ""}`, disabled: props.disabled, style: props.style, onClick: props.onClick, tabIndex: props.tabIndex || 0, type: "button" },
    props.startIcon && import_react5.default.createElement("i", { className: "wallet-adapter-button-start-icon" }, props.startIcon),
    props.children,
    props.endIcon && import_react5.default.createElement("i", { className: "wallet-adapter-button-end-icon" }, props.endIcon)
  );
};

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletIcon.js
var import_react6 = __toESM(require_react(), 1);
var WalletIcon = ({ wallet, ...props }) => {
  return wallet && import_react6.default.createElement("img", { src: wallet.adapter.icon, alt: `${wallet.adapter.name} icon`, ...props });
};

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletConnectionButton.js
function BaseWalletConnectionButton({ walletIcon, walletName, ...props }) {
  return import_react7.default.createElement(Button, { ...props, className: "wallet-adapter-button-trigger", startIcon: walletIcon && walletName ? import_react7.default.createElement(WalletIcon, { wallet: { adapter: { icon: walletIcon, name: walletName } } }) : void 0 });
}

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletConnectButton.js
function BaseWalletConnectButton({ children, disabled, labels, onClick, ...props }) {
  const { buttonDisabled, buttonState, onButtonClick, walletIcon, walletName } = useWalletConnectButton();
  return import_react8.default.createElement(BaseWalletConnectionButton, { ...props, disabled: disabled || buttonDisabled, onClick: (e) => {
    if (onClick) {
      onClick(e);
    }
    if (e.defaultPrevented) {
      return;
    }
    if (onButtonClick) {
      onButtonClick();
    }
  }, walletIcon, walletName }, children ? children : labels[buttonState]);
}

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletDisconnectButton.js
var import_react9 = __toESM(require_react(), 1);
function BaseWalletDisconnectButton({ children, disabled, labels, onClick, ...props }) {
  const { buttonDisabled, buttonState, onButtonClick, walletIcon, walletName } = useWalletDisconnectButton();
  return import_react9.default.createElement(BaseWalletConnectionButton, { ...props, disabled: disabled || buttonDisabled, onClick: (e) => {
    if (onClick) {
      onClick(e);
    }
    if (e.defaultPrevented) {
      return;
    }
    if (onButtonClick) {
      onButtonClick();
    }
  }, walletIcon, walletName }, children ? children : labels[buttonState]);
}

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletMultiButton.js
var import_react10 = __toESM(require_react(), 1);
function BaseWalletMultiButton({ children, labels, ...props }) {
  const { setVisible: setModalVisible } = useWalletModal();
  const { buttonState, onConnect, onDisconnect, publicKey, walletIcon, walletName } = useWalletMultiButton({
    onSelectWallet() {
      setModalVisible(true);
    }
  });
  const [copied, setCopied] = (0, import_react10.useState)(false);
  const [menuOpen, setMenuOpen] = (0, import_react10.useState)(false);
  const ref = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
    const listener = (event) => {
      const node = ref.current;
      if (!node || node.contains(event.target))
        return;
      setMenuOpen(false);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);
  const content = (0, import_react10.useMemo)(() => {
    if (children) {
      return children;
    } else if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 4) + ".." + base58.slice(-4);
    } else if (buttonState === "connecting" || buttonState === "has-wallet") {
      return labels[buttonState];
    } else {
      return labels["no-wallet"];
    }
  }, [buttonState, children, labels, publicKey]);
  return import_react10.default.createElement(
    "div",
    { className: "wallet-adapter-dropdown" },
    import_react10.default.createElement(BaseWalletConnectionButton, { ...props, "aria-expanded": menuOpen, style: { pointerEvents: menuOpen ? "none" : "auto", ...props.style }, onClick: () => {
      switch (buttonState) {
        case "no-wallet":
          setModalVisible(true);
          break;
        case "has-wallet":
          if (onConnect) {
            onConnect();
          }
          break;
        case "connected":
          setMenuOpen(true);
          break;
      }
    }, walletIcon, walletName }, content),
    import_react10.default.createElement(
      "ul",
      { "aria-label": "dropdown-list", className: `wallet-adapter-dropdown-list ${menuOpen && "wallet-adapter-dropdown-list-active"}`, ref, role: "menu" },
      publicKey ? import_react10.default.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: async () => {
        await navigator.clipboard.writeText(publicKey.toBase58());
        setCopied(true);
        setTimeout(() => setCopied(false), 400);
      }, role: "menuitem" }, copied ? labels["copied"] : labels["copy-address"]) : null,
      import_react10.default.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: () => {
        setModalVisible(true);
        setMenuOpen(false);
      }, role: "menuitem" }, labels["change-wallet"]),
      onDisconnect ? import_react10.default.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: () => {
        onDisconnect();
        setMenuOpen(false);
      }, role: "menuitem" }, labels["disconnect"]) : null
    )
  );
}

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletConnectButton.js
var import_react11 = __toESM(require_react(), 1);
var LABELS = {
  connecting: "Connecting ...",
  connected: "Connected",
  "has-wallet": "Connect",
  "no-wallet": "Connect Wallet"
};
function WalletConnectButton(props) {
  return import_react11.default.createElement(BaseWalletConnectButton, { ...props, labels: LABELS });
}

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletModal.js
var import_react15 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/Collapse.js
var import_react12 = __toESM(require_react(), 1);
var Collapse = ({ id, children, expanded = false }) => {
  const ref = (0, import_react12.useRef)(null);
  const instant = (0, import_react12.useRef)(true);
  const transition = "height 250ms ease-out";
  const openCollapse = () => {
    const node = ref.current;
    if (!node)
      return;
    requestAnimationFrame(() => {
      node.style.height = node.scrollHeight + "px";
    });
  };
  const closeCollapse = () => {
    const node = ref.current;
    if (!node)
      return;
    requestAnimationFrame(() => {
      node.style.height = node.offsetHeight + "px";
      node.style.overflow = "hidden";
      requestAnimationFrame(() => {
        node.style.height = "0";
      });
    });
  };
  (0, import_react12.useLayoutEffect)(() => {
    if (expanded) {
      openCollapse();
    } else {
      closeCollapse();
    }
  }, [expanded]);
  (0, import_react12.useLayoutEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    function handleComplete() {
      if (!node)
        return;
      node.style.overflow = expanded ? "initial" : "hidden";
      if (expanded) {
        node.style.height = "auto";
      }
    }
    function handleTransitionEnd(event) {
      if (node && event.target === node && event.propertyName === "height") {
        handleComplete();
      }
    }
    if (instant.current) {
      handleComplete();
      instant.current = false;
    }
    node.addEventListener("transitionend", handleTransitionEnd);
    return () => node.removeEventListener("transitionend", handleTransitionEnd);
  }, [expanded]);
  return import_react12.default.createElement("div", { className: "wallet-adapter-collapse", id, ref, role: "region", style: { height: 0, transition: instant.current ? void 0 : transition } }, children);
};

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletListItem.js
var import_react13 = __toESM(require_react(), 1);
var WalletListItem = ({ handleClick, tabIndex, wallet }) => {
  return import_react13.default.createElement(
    "li",
    null,
    import_react13.default.createElement(
      Button,
      { onClick: handleClick, startIcon: import_react13.default.createElement(WalletIcon, { wallet }), tabIndex },
      wallet.adapter.name,
      wallet.readyState === WalletReadyState.Installed && import_react13.default.createElement("span", null, "Detected")
    )
  );
};

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletSVG.js
var import_react14 = __toESM(require_react(), 1);
var WalletSVG = () => {
  return import_react14.default.createElement(
    "svg",
    { width: "97", height: "96", viewBox: "0 0 97 96", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    import_react14.default.createElement("circle", { cx: "48.5", cy: "48", r: "48", fill: "url(#paint0_linear_880_5115)", fillOpacity: "0.1" }),
    import_react14.default.createElement("circle", { cx: "48.5", cy: "48", r: "47", stroke: "url(#paint1_linear_880_5115)", strokeOpacity: "0.4", strokeWidth: "2" }),
    import_react14.default.createElement(
      "g",
      { clipPath: "url(#clip0_880_5115)" },
      import_react14.default.createElement("path", { d: "M65.5769 28.1523H31.4231C27.6057 28.1523 24.5 31.258 24.5 35.0754V60.9215C24.5 64.7389 27.6057 67.8446 31.4231 67.8446H65.5769C69.3943 67.8446 72.5 64.7389 72.5 60.9215V35.0754C72.5 31.258 69.3943 28.1523 65.5769 28.1523ZM69.7308 52.1523H59.5769C57.2865 52.1523 55.4231 50.289 55.4231 47.9985C55.4231 45.708 57.2864 43.8446 59.5769 43.8446H69.7308V52.1523ZM69.7308 41.0754H59.5769C55.7595 41.0754 52.6539 44.1811 52.6539 47.9985C52.6539 51.8159 55.7595 54.9215 59.5769 54.9215H69.7308V60.9215C69.7308 63.2119 67.8674 65.0754 65.5769 65.0754H31.4231C29.1327 65.0754 27.2692 63.212 27.2692 60.9215V35.0754C27.2692 32.785 29.1326 30.9215 31.4231 30.9215H65.5769C67.8673 30.9215 69.7308 32.7849 69.7308 35.0754V41.0754Z", fill: "url(#paint2_linear_880_5115)" }),
      import_react14.default.createElement("path", { d: "M61.4231 46.6172H59.577C58.8123 46.6172 58.1924 47.2371 58.1924 48.0018C58.1924 48.7665 58.8123 49.3863 59.577 49.3863H61.4231C62.1878 49.3863 62.8077 48.7664 62.8077 48.0018C62.8077 47.2371 62.1878 46.6172 61.4231 46.6172Z", fill: "url(#paint3_linear_880_5115)" })
    ),
    import_react14.default.createElement(
      "defs",
      null,
      import_react14.default.createElement(
        "linearGradient",
        { id: "paint0_linear_880_5115", x1: "3.41664", y1: "98.0933", x2: "103.05", y2: "8.42498", gradientUnits: "userSpaceOnUse" },
        import_react14.default.createElement("stop", { stopColor: "#9945FF" }),
        import_react14.default.createElement("stop", { offset: "0.14", stopColor: "#8A53F4" }),
        import_react14.default.createElement("stop", { offset: "0.42", stopColor: "#6377D6" }),
        import_react14.default.createElement("stop", { offset: "0.79", stopColor: "#24B0A7" }),
        import_react14.default.createElement("stop", { offset: "0.99", stopColor: "#00D18C" }),
        import_react14.default.createElement("stop", { offset: "1", stopColor: "#00D18C" })
      ),
      import_react14.default.createElement(
        "linearGradient",
        { id: "paint1_linear_880_5115", x1: "3.41664", y1: "98.0933", x2: "103.05", y2: "8.42498", gradientUnits: "userSpaceOnUse" },
        import_react14.default.createElement("stop", { stopColor: "#9945FF" }),
        import_react14.default.createElement("stop", { offset: "0.14", stopColor: "#8A53F4" }),
        import_react14.default.createElement("stop", { offset: "0.42", stopColor: "#6377D6" }),
        import_react14.default.createElement("stop", { offset: "0.79", stopColor: "#24B0A7" }),
        import_react14.default.createElement("stop", { offset: "0.99", stopColor: "#00D18C" }),
        import_react14.default.createElement("stop", { offset: "1", stopColor: "#00D18C" })
      ),
      import_react14.default.createElement(
        "linearGradient",
        { id: "paint2_linear_880_5115", x1: "25.9583", y1: "68.7101", x2: "67.2337", y2: "23.7879", gradientUnits: "userSpaceOnUse" },
        import_react14.default.createElement("stop", { stopColor: "#9945FF" }),
        import_react14.default.createElement("stop", { offset: "0.14", stopColor: "#8A53F4" }),
        import_react14.default.createElement("stop", { offset: "0.42", stopColor: "#6377D6" }),
        import_react14.default.createElement("stop", { offset: "0.79", stopColor: "#24B0A7" }),
        import_react14.default.createElement("stop", { offset: "0.99", stopColor: "#00D18C" }),
        import_react14.default.createElement("stop", { offset: "1", stopColor: "#00D18C" })
      ),
      import_react14.default.createElement(
        "linearGradient",
        { id: "paint3_linear_880_5115", x1: "58.3326", y1: "49.4467", x2: "61.0002", y2: "45.4453", gradientUnits: "userSpaceOnUse" },
        import_react14.default.createElement("stop", { stopColor: "#9945FF" }),
        import_react14.default.createElement("stop", { offset: "0.14", stopColor: "#8A53F4" }),
        import_react14.default.createElement("stop", { offset: "0.42", stopColor: "#6377D6" }),
        import_react14.default.createElement("stop", { offset: "0.79", stopColor: "#24B0A7" }),
        import_react14.default.createElement("stop", { offset: "0.99", stopColor: "#00D18C" }),
        import_react14.default.createElement("stop", { offset: "1", stopColor: "#00D18C" })
      ),
      import_react14.default.createElement(
        "clipPath",
        { id: "clip0_880_5115" },
        import_react14.default.createElement("rect", { width: "48", height: "48", fill: "white", transform: "translate(24.5 24)" })
      )
    )
  );
};

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletModal.js
var WalletModal = ({ className = "", container = "body" }) => {
  const ref = (0, import_react15.useRef)(null);
  const { wallets, select } = useWallet();
  const { setVisible } = useWalletModal();
  const [expanded, setExpanded] = (0, import_react15.useState)(false);
  const [fadeIn, setFadeIn] = (0, import_react15.useState)(false);
  const [portal, setPortal] = (0, import_react15.useState)(null);
  const [listedWallets, collapsedWallets] = (0, import_react15.useMemo)(() => {
    const installed = [];
    const notInstalled = [];
    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      } else {
        notInstalled.push(wallet);
      }
    }
    return installed.length ? [installed, notInstalled] : [notInstalled, []];
  }, [wallets]);
  const hideModal = (0, import_react15.useCallback)(() => {
    setFadeIn(false);
    setTimeout(() => setVisible(false), 150);
  }, [setVisible]);
  const handleClose = (0, import_react15.useCallback)((event) => {
    event.preventDefault();
    hideModal();
  }, [hideModal]);
  const handleWalletClick = (0, import_react15.useCallback)((event, walletName) => {
    select(walletName);
    handleClose(event);
  }, [select, handleClose]);
  const handleCollapseClick = (0, import_react15.useCallback)(() => setExpanded(!expanded), [expanded]);
  const handleTabKey = (0, import_react15.useCallback)((event) => {
    const node = ref.current;
    if (!node)
      return;
    const focusableElements = node.querySelectorAll("button");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }, [ref]);
  (0, import_react15.useLayoutEffect)(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        hideModal();
      } else if (event.key === "Tab") {
        handleTabKey(event);
      }
    };
    const { overflow } = window.getComputedStyle(document.body);
    setTimeout(() => setFadeIn(true), 0);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [hideModal, handleTabKey]);
  (0, import_react15.useLayoutEffect)(() => setPortal(document.querySelector(container)), [container]);
  return portal && (0, import_react_dom.createPortal)(import_react15.default.createElement(
    "div",
    { "aria-labelledby": "wallet-adapter-modal-title", "aria-modal": "true", className: `wallet-adapter-modal ${fadeIn && "wallet-adapter-modal-fade-in"} ${className}`, ref, role: "dialog" },
    import_react15.default.createElement(
      "div",
      { className: "wallet-adapter-modal-container" },
      import_react15.default.createElement(
        "div",
        { className: "wallet-adapter-modal-wrapper" },
        import_react15.default.createElement(
          "button",
          { onClick: handleClose, className: "wallet-adapter-modal-button-close" },
          import_react15.default.createElement(
            "svg",
            { width: "14", height: "14" },
            import_react15.default.createElement("path", { d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" })
          )
        ),
        listedWallets.length ? import_react15.default.createElement(
          import_react15.default.Fragment,
          null,
          import_react15.default.createElement("h1", { className: "wallet-adapter-modal-title" }, "Connect a wallet on Solana to continue"),
          import_react15.default.createElement(
            "ul",
            { className: "wallet-adapter-modal-list" },
            listedWallets.map((wallet) => import_react15.default.createElement(WalletListItem, { key: wallet.adapter.name, handleClick: (event) => handleWalletClick(event, wallet.adapter.name), wallet })),
            collapsedWallets.length ? import_react15.default.createElement(Collapse, { expanded, id: "wallet-adapter-modal-collapse" }, collapsedWallets.map((wallet) => import_react15.default.createElement(WalletListItem, { key: wallet.adapter.name, handleClick: (event) => handleWalletClick(event, wallet.adapter.name), tabIndex: expanded ? 0 : -1, wallet }))) : null
          ),
          collapsedWallets.length ? import_react15.default.createElement(
            "button",
            { className: "wallet-adapter-modal-list-more", onClick: handleCollapseClick, tabIndex: 0 },
            import_react15.default.createElement(
              "span",
              null,
              expanded ? "Less " : "More ",
              "options"
            ),
            import_react15.default.createElement(
              "svg",
              { width: "13", height: "7", viewBox: "0 0 13 7", xmlns: "http://www.w3.org/2000/svg", className: `${expanded ? "wallet-adapter-modal-list-more-icon-rotate" : ""}` },
              import_react15.default.createElement("path", { d: "M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z" })
            )
          ) : null
        ) : import_react15.default.createElement(
          import_react15.default.Fragment,
          null,
          import_react15.default.createElement("h1", { className: "wallet-adapter-modal-title" }, "You'll need a wallet on Solana to continue"),
          import_react15.default.createElement(
            "div",
            { className: "wallet-adapter-modal-middle" },
            import_react15.default.createElement(WalletSVG, null)
          ),
          collapsedWallets.length ? import_react15.default.createElement(
            import_react15.default.Fragment,
            null,
            import_react15.default.createElement(
              "button",
              { className: "wallet-adapter-modal-list-more", onClick: handleCollapseClick, tabIndex: 0 },
              import_react15.default.createElement(
                "span",
                null,
                expanded ? "Hide " : "Already have a wallet? View ",
                "options"
              ),
              import_react15.default.createElement(
                "svg",
                { width: "13", height: "7", viewBox: "0 0 13 7", xmlns: "http://www.w3.org/2000/svg", className: `${expanded ? "wallet-adapter-modal-list-more-icon-rotate" : ""}` },
                import_react15.default.createElement("path", { d: "M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z" })
              )
            ),
            import_react15.default.createElement(
              Collapse,
              { expanded, id: "wallet-adapter-modal-collapse" },
              import_react15.default.createElement("ul", { className: "wallet-adapter-modal-list" }, collapsedWallets.map((wallet) => import_react15.default.createElement(WalletListItem, { key: wallet.adapter.name, handleClick: (event) => handleWalletClick(event, wallet.adapter.name), tabIndex: expanded ? 0 : -1, wallet })))
            )
          ) : null
        )
      )
    ),
    import_react15.default.createElement("div", { className: "wallet-adapter-modal-overlay", onMouseDown: handleClose })
  ), portal);
};

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletModalButton.js
var import_react16 = __toESM(require_react(), 1);
var WalletModalButton = ({ children = "Select Wallet", onClick, ...props }) => {
  const { visible, setVisible } = useWalletModal();
  const handleClick = (0, import_react16.useCallback)((event) => {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented)
      setVisible(!visible);
  }, [onClick, setVisible, visible]);
  return import_react16.default.createElement(Button, { ...props, className: "wallet-adapter-button-trigger", onClick: handleClick }, children);
};

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletModalProvider.js
var import_react17 = __toESM(require_react(), 1);
var WalletModalProvider = ({ children, ...props }) => {
  const [visible, setVisible] = (0, import_react17.useState)(false);
  return import_react17.default.createElement(
    WalletModalContext.Provider,
    { value: {
      visible,
      setVisible
    } },
    children,
    visible && import_react17.default.createElement(WalletModal, { ...props })
  );
};

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletDisconnectButton.js
var import_react18 = __toESM(require_react(), 1);
var LABELS2 = {
  disconnecting: "Disconnecting ...",
  "has-wallet": "Disconnect",
  "no-wallet": "Disconnect Wallet"
};
function WalletDisconnectButton(props) {
  return import_react18.default.createElement(BaseWalletDisconnectButton, { ...props, labels: LABELS2 });
}

// node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletMultiButton.js
var import_react19 = __toESM(require_react(), 1);
var LABELS3 = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Select Wallet"
};
function WalletMultiButton(props) {
  return import_react19.default.createElement(BaseWalletMultiButton, { ...props, labels: LABELS3 });
}
export {
  BaseWalletConnectButton,
  BaseWalletDisconnectButton,
  BaseWalletMultiButton,
  WalletConnectButton,
  WalletDisconnectButton,
  WalletIcon,
  WalletModal,
  WalletModalButton,
  WalletModalContext,
  WalletModalProvider,
  WalletMultiButton,
  useWalletModal
};
//# sourceMappingURL=@solana_wallet-adapter-react-ui.js.map

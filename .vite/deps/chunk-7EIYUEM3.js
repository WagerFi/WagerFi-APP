import {
  require_events
} from "./chunk-SQBP2HP4.js";
import {
  __toESM
} from "./chunk-MVEJMUOB.js";

// node_modules/@ledgerhq/errors/lib-es/helpers.js
var errorClasses = {};
var deserializers = {};
var addCustomErrorDeserializer = (name, deserializer) => {
  deserializers[name] = deserializer;
};
var createCustomErrorClass = (name) => {
  class CustomErrorClass extends Error {
    constructor(message, fields, options) {
      super(message || name, options);
      Object.setPrototypeOf(this, CustomErrorClass.prototype);
      this.name = name;
      if (fields) {
        for (const k in fields) {
          this[k] = fields[k];
        }
      }
      if (options && isObject(options) && "cause" in options && !("cause" in this)) {
        const cause = options.cause;
        this.cause = cause;
        if ("stack" in cause) {
          this.stack = this.stack + "\nCAUSE: " + cause.stack;
        }
      }
    }
  }
  errorClasses[name] = CustomErrorClass;
  return CustomErrorClass;
};
function isObject(value) {
  return typeof value === "object";
}

// node_modules/@ledgerhq/errors/lib-es/index.js
var AccountNameRequiredError = createCustomErrorClass("AccountNameRequired");
var AccountNotSupported = createCustomErrorClass("AccountNotSupported");
var AccountAwaitingSendPendingOperations = createCustomErrorClass("AccountAwaitingSendPendingOperations");
var AmountRequired = createCustomErrorClass("AmountRequired");
var BluetoothRequired = createCustomErrorClass("BluetoothRequired");
var BtcUnmatchedApp = createCustomErrorClass("BtcUnmatchedApp");
var CantOpenDevice = createCustomErrorClass("CantOpenDevice");
var CashAddrNotSupported = createCustomErrorClass("CashAddrNotSupported");
var ClaimRewardsFeesWarning = createCustomErrorClass("ClaimRewardsFeesWarning");
var CurrencyNotSupported = createCustomErrorClass("CurrencyNotSupported");
var DeviceAppVerifyNotSupported = createCustomErrorClass("DeviceAppVerifyNotSupported");
var DeviceGenuineSocketEarlyClose = createCustomErrorClass("DeviceGenuineSocketEarlyClose");
var DeviceNotGenuineError = createCustomErrorClass("DeviceNotGenuine");
var DeviceOnDashboardExpected = createCustomErrorClass("DeviceOnDashboardExpected");
var DeviceOnDashboardUnexpected = createCustomErrorClass("DeviceOnDashboardUnexpected");
var DeviceInOSUExpected = createCustomErrorClass("DeviceInOSUExpected");
var DeviceHalted = createCustomErrorClass("DeviceHalted");
var DeviceNameInvalid = createCustomErrorClass("DeviceNameInvalid");
var DeviceSocketFail = createCustomErrorClass("DeviceSocketFail");
var DeviceSocketNoBulkStatus = createCustomErrorClass("DeviceSocketNoBulkStatus");
var DeviceNeedsRestart = createCustomErrorClass("DeviceSocketNoBulkStatus");
var UnresponsiveDeviceError = createCustomErrorClass("UnresponsiveDeviceError");
var DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
var DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
var DeviceExtractOnboardingStateError = createCustomErrorClass("DeviceExtractOnboardingStateError");
var DeviceOnboardingStatePollingError = createCustomErrorClass("DeviceOnboardingStatePollingError");
var EnpointConfigError = createCustomErrorClass("EnpointConfig");
var EthAppPleaseEnableContractData = createCustomErrorClass("EthAppPleaseEnableContractData");
var FeeEstimationFailed = createCustomErrorClass("FeeEstimationFailed");
var FirmwareNotRecognized = createCustomErrorClass("FirmwareNotRecognized");
var HardResetFail = createCustomErrorClass("HardResetFail");
var InvalidXRPTag = createCustomErrorClass("InvalidXRPTag");
var InvalidAddress = createCustomErrorClass("InvalidAddress");
var InvalidNonce = createCustomErrorClass("InvalidNonce");
var InvalidAddressBecauseDestinationIsAlsoSource = createCustomErrorClass("InvalidAddressBecauseDestinationIsAlsoSource");
var LatestMCUInstalledError = createCustomErrorClass("LatestMCUInstalledError");
var UnknownMCU = createCustomErrorClass("UnknownMCU");
var LedgerAPIError = createCustomErrorClass("LedgerAPIError");
var LedgerAPIErrorWithMessage = createCustomErrorClass("LedgerAPIErrorWithMessage");
var LedgerAPINotAvailable = createCustomErrorClass("LedgerAPINotAvailable");
var ManagerAppAlreadyInstalledError = createCustomErrorClass("ManagerAppAlreadyInstalled");
var ManagerAppRelyOnBTCError = createCustomErrorClass("ManagerAppRelyOnBTC");
var ManagerAppDepInstallRequired = createCustomErrorClass("ManagerAppDepInstallRequired");
var ManagerAppDepUninstallRequired = createCustomErrorClass("ManagerAppDepUninstallRequired");
var ManagerDeviceLockedError = createCustomErrorClass("ManagerDeviceLocked");
var ManagerFirmwareNotEnoughSpaceError = createCustomErrorClass("ManagerFirmwareNotEnoughSpace");
var ManagerNotEnoughSpaceError = createCustomErrorClass("ManagerNotEnoughSpace");
var ManagerUninstallBTCDep = createCustomErrorClass("ManagerUninstallBTCDep");
var NetworkDown = createCustomErrorClass("NetworkDown");
var NetworkError = createCustomErrorClass("NetworkError");
var NoAddressesFound = createCustomErrorClass("NoAddressesFound");
var NotEnoughBalance = createCustomErrorClass("NotEnoughBalance");
var NotEnoughBalanceSwap = createCustomErrorClass("NotEnoughBalanceSwap");
var NotEnoughBalanceToDelegate = createCustomErrorClass("NotEnoughBalanceToDelegate");
var NotEnoughBalanceInParentAccount = createCustomErrorClass("NotEnoughBalanceInParentAccount");
var NotEnoughSpendableBalance = createCustomErrorClass("NotEnoughSpendableBalance");
var NotEnoughBalanceBecauseDestinationNotCreated = createCustomErrorClass("NotEnoughBalanceBecauseDestinationNotCreated");
var NoAccessToCamera = createCustomErrorClass("NoAccessToCamera");
var NotEnoughGas = createCustomErrorClass("NotEnoughGas");
var NotEnoughGasSwap = createCustomErrorClass("NotEnoughGasSwap");
var TronEmptyAccount = createCustomErrorClass("TronEmptyAccount");
var MaybeKeepTronAccountAlive = createCustomErrorClass("MaybeKeepTronAccountAlive");
var NotSupportedLegacyAddress = createCustomErrorClass("NotSupportedLegacyAddress");
var GasLessThanEstimate = createCustomErrorClass("GasLessThanEstimate");
var PriorityFeeTooLow = createCustomErrorClass("PriorityFeeTooLow");
var PriorityFeeTooHigh = createCustomErrorClass("PriorityFeeTooHigh");
var PriorityFeeHigherThanMaxFee = createCustomErrorClass("PriorityFeeHigherThanMaxFee");
var MaxFeeTooLow = createCustomErrorClass("MaxFeeTooLow");
var PasswordsDontMatchError = createCustomErrorClass("PasswordsDontMatch");
var PasswordIncorrectError = createCustomErrorClass("PasswordIncorrect");
var RecommendSubAccountsToEmpty = createCustomErrorClass("RecommendSubAccountsToEmpty");
var RecommendUndelegation = createCustomErrorClass("RecommendUndelegation");
var TimeoutTagged = createCustomErrorClass("TimeoutTagged");
var UnexpectedBootloader = createCustomErrorClass("UnexpectedBootloader");
var MCUNotGenuineToDashboard = createCustomErrorClass("MCUNotGenuineToDashboard");
var RecipientRequired = createCustomErrorClass("RecipientRequired");
var UnavailableTezosOriginatedAccountReceive = createCustomErrorClass("UnavailableTezosOriginatedAccountReceive");
var UnavailableTezosOriginatedAccountSend = createCustomErrorClass("UnavailableTezosOriginatedAccountSend");
var UpdateFetchFileFail = createCustomErrorClass("UpdateFetchFileFail");
var UpdateIncorrectHash = createCustomErrorClass("UpdateIncorrectHash");
var UpdateIncorrectSig = createCustomErrorClass("UpdateIncorrectSig");
var UpdateYourApp = createCustomErrorClass("UpdateYourApp");
var UserRefusedDeviceNameChange = createCustomErrorClass("UserRefusedDeviceNameChange");
var UserRefusedAddress = createCustomErrorClass("UserRefusedAddress");
var UserRefusedFirmwareUpdate = createCustomErrorClass("UserRefusedFirmwareUpdate");
var UserRefusedAllowManager = createCustomErrorClass("UserRefusedAllowManager");
var UserRefusedOnDevice = createCustomErrorClass("UserRefusedOnDevice");
var PinNotSet = createCustomErrorClass("PinNotSet");
var ExpertModeRequired = createCustomErrorClass("ExpertModeRequired");
var TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
var TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
var TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
var TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
var TransactionHasBeenValidatedError = createCustomErrorClass("TransactionHasBeenValidatedError");
var TransportExchangeTimeoutError = createCustomErrorClass("TransportExchangeTimeoutError");
var DeviceShouldStayInApp = createCustomErrorClass("DeviceShouldStayInApp");
var WebsocketConnectionError = createCustomErrorClass("WebsocketConnectionError");
var WebsocketConnectionFailed = createCustomErrorClass("WebsocketConnectionFailed");
var WrongDeviceForAccount = createCustomErrorClass("WrongDeviceForAccount");
var WrongDeviceForAccountPayout = createCustomErrorClass("WrongDeviceForAccountPayout");
var WrongDeviceForAccountRefund = createCustomErrorClass("WrongDeviceForAccountRefund");
var WrongAppForCurrency = createCustomErrorClass("WrongAppForCurrency");
var ETHAddressNonEIP = createCustomErrorClass("ETHAddressNonEIP");
var CantScanQRCode = createCustomErrorClass("CantScanQRCode");
var FeeNotLoaded = createCustomErrorClass("FeeNotLoaded");
var FeeNotLoadedSwap = createCustomErrorClass("FeeNotLoadedSwap");
var FeeRequired = createCustomErrorClass("FeeRequired");
var FeeTooHigh = createCustomErrorClass("FeeTooHigh");
var PendingOperation = createCustomErrorClass("PendingOperation");
var SyncError = createCustomErrorClass("SyncError");
var PairingFailed = createCustomErrorClass("PairingFailed");
var PeerRemovedPairing = createCustomErrorClass("PeerRemovedPairing");
var GenuineCheckFailed = createCustomErrorClass("GenuineCheckFailed");
var LedgerAPI4xx = createCustomErrorClass("LedgerAPI4xx");
var LedgerAPI5xx = createCustomErrorClass("LedgerAPI5xx");
var FirmwareOrAppUpdateRequired = createCustomErrorClass("FirmwareOrAppUpdateRequired");
var ReplacementTransactionUnderpriced = createCustomErrorClass("ReplacementTransactionUnderpriced");
var OpReturnDataSizeLimit = createCustomErrorClass("OpReturnSizeLimit");
var DustLimit = createCustomErrorClass("DustLimit");
var LanguageNotFound = createCustomErrorClass("LanguageNotFound");
var NoDBPathGiven = createCustomErrorClass("NoDBPathGiven");
var DBWrongPassword = createCustomErrorClass("DBWrongPassword");
var DBNotReset = createCustomErrorClass("DBNotReset");
var SequenceNumberError = createCustomErrorClass("SequenceNumberError");
var DisabledTransactionBroadcastError = createCustomErrorClass("DisabledTransactionBroadcastError");
var HwTransportErrorType;
(function(HwTransportErrorType2) {
  HwTransportErrorType2["Unknown"] = "Unknown";
  HwTransportErrorType2["LocationServicesDisabled"] = "LocationServicesDisabled";
  HwTransportErrorType2["LocationServicesUnauthorized"] = "LocationServicesUnauthorized";
  HwTransportErrorType2["BluetoothScanStartFailed"] = "BluetoothScanStartFailed";
})(HwTransportErrorType || (HwTransportErrorType = {}));
var TransportError = class extends Error {
  constructor(message, id2) {
    const name = "TransportError";
    super(message || name);
    this.name = name;
    this.message = message;
    this.stack = new Error(message).stack;
    this.id = id2;
  }
};
addCustomErrorDeserializer("TransportError", (e) => new TransportError(e.message, e.id));
var StatusCodes = {
  ACCESS_CONDITION_NOT_FULFILLED: 38916,
  ALGORITHM_NOT_SUPPORTED: 38020,
  CLA_NOT_SUPPORTED: 28160,
  CODE_BLOCKED: 38976,
  CODE_NOT_INITIALIZED: 38914,
  COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 27009,
  CONDITIONS_OF_USE_NOT_SATISFIED: 27013,
  CONTRADICTION_INVALIDATION: 38928,
  CONTRADICTION_SECRET_CODE_STATUS: 38920,
  DEVICE_IN_RECOVERY_MODE: 26159,
  CUSTOM_IMAGE_EMPTY: 26158,
  FILE_ALREADY_EXISTS: 27273,
  FILE_NOT_FOUND: 37892,
  GP_AUTH_FAILED: 25344,
  HALTED: 28586,
  INCONSISTENT_FILE: 37896,
  INCORRECT_DATA: 27264,
  INCORRECT_LENGTH: 26368,
  INCORRECT_P1_P2: 27392,
  INS_NOT_SUPPORTED: 27904,
  DEVICE_NOT_ONBOARDED: 27911,
  DEVICE_NOT_ONBOARDED_2: 26129,
  INVALID_KCV: 38021,
  INVALID_OFFSET: 37890,
  LICENSING: 28482,
  LOCKED_DEVICE: 21781,
  MAX_VALUE_REACHED: 38992,
  MEMORY_PROBLEM: 37440,
  MISSING_CRITICAL_PARAMETER: 26624,
  NO_EF_SELECTED: 37888,
  NOT_ENOUGH_MEMORY_SPACE: 27268,
  OK: 36864,
  PIN_REMAINING_ATTEMPTS: 25536,
  REFERENCED_DATA_NOT_FOUND: 27272,
  SECURITY_STATUS_NOT_SATISFIED: 27010,
  TECHNICAL_PROBLEM: 28416,
  UNKNOWN_APDU: 27906,
  USER_REFUSED_ON_DEVICE: 21761,
  NOT_ENOUGH_SPACE: 20738,
  APP_NOT_FOUND_OR_INVALID_CONTEXT: 20771,
  INVALID_APP_NAME_LENGTH: 26378,
  GEN_AES_KEY_FAILED: 21529,
  INTERNAL_CRYPTO_OPERATION_FAILED: 21530,
  INTERNAL_COMPUTE_AES_CMAC_FAILED: 21531,
  ENCRYPT_APP_STORAGE_FAILED: 21532,
  INVALID_BACKUP_STATE: 26178,
  PIN_NOT_SET: 21762,
  INVALID_BACKUP_LENGTH: 26419,
  INVALID_RESTORE_STATE: 26179,
  INVALID_CHUNK_LENGTH: 26420,
  INVALID_BACKUP_HEADER: 26698,
  // Not documented:
  TRUSTCHAIN_WRONG_SEED: 45063
};
function getAltStatusMessage(code) {
  switch (code) {
    case 26368:
      return "Incorrect length";
    case 26624:
      return "Missing critical parameter";
    case 27010:
      return "Security not satisfied (dongle locked or have invalid access rights)";
    case 27013:
      return "Condition of use not satisfied (denied by the user?)";
    case 27264:
      return "Invalid data received";
    case 27392:
      return "Invalid parameter received";
    case 21781:
      return "Locked device";
  }
  if (28416 <= code && code <= 28671) {
    return "Internal error, please report";
  }
}
var TransportStatusError = class _TransportStatusError extends Error {
  /**
   * @param statusCode The error status code coming from a Transport implementation
   * @param options containing:
   *  - canBeMappedToChildError: enable the mapping of TransportStatusError to an error extending/inheriting from it
   *  . Ex: LockedDeviceError. Default to true.
   */
  constructor(statusCode, { canBeMappedToChildError = true } = {}) {
    const statusText = Object.keys(StatusCodes).find((k) => StatusCodes[k] === statusCode) || "UNKNOWN_ERROR";
    const smsg = getAltStatusMessage(statusCode) || statusText;
    const statusCodeStr = statusCode.toString(16);
    const message = `Ledger device: ${smsg} (0x${statusCodeStr})`;
    super(message);
    this.name = "TransportStatusError";
    this.statusCode = statusCode;
    this.statusText = statusText;
    Object.setPrototypeOf(this, _TransportStatusError.prototype);
    if (canBeMappedToChildError && statusCode === StatusCodes.LOCKED_DEVICE) {
      return new LockedDeviceError(message);
    }
  }
};
var LockedDeviceError = class _LockedDeviceError extends TransportStatusError {
  constructor(message) {
    super(StatusCodes.LOCKED_DEVICE, { canBeMappedToChildError: false });
    if (message) {
      this.message = message;
    }
    this.name = "LockedDeviceError";
    Object.setPrototypeOf(this, _LockedDeviceError.prototype);
  }
};
addCustomErrorDeserializer("TransportStatusError", (e) => new TransportStatusError(e.statusCode));

// node_modules/@ledgerhq/logs/lib-es/index.js
var id = 0;
var subscribers = [];
var log = (type, message, data) => {
  const obj = {
    type,
    id: String(++id),
    date: /* @__PURE__ */ new Date()
  };
  if (message)
    obj.message = message;
  if (data)
    obj.data = data;
  dispatch(obj);
};
var trace = ({ type, message, data, context }) => {
  const obj = {
    type,
    id: String(++id),
    date: /* @__PURE__ */ new Date()
  };
  if (message)
    obj.message = message;
  if (data)
    obj.data = data;
  if (context)
    obj.context = context;
  dispatch(obj);
};
var LocalTracer = class _LocalTracer {
  constructor(type, context) {
    this.type = type;
    this.context = context;
  }
  trace(message, data) {
    trace({
      type: this.type,
      message,
      data,
      context: this.context
    });
  }
  getContext() {
    return this.context;
  }
  setContext(context) {
    this.context = context;
  }
  updateContext(contextToAdd) {
    this.context = Object.assign(Object.assign({}, this.context), contextToAdd);
  }
  getType() {
    return this.type;
  }
  setType(type) {
    this.type = type;
  }
  /**
   * Create a new instance of the LocalTracer with an updated `type`
   *
   * It does not mutate the calling instance, but returns a new LocalTracer,
   * following a simple builder pattern.
   */
  withType(type) {
    return new _LocalTracer(type, this.context);
  }
  /**
   * Create a new instance of the LocalTracer with a new `context`
   *
   * It does not mutate the calling instance, but returns a new LocalTracer,
   * following a simple builder pattern.
   *
   * @param context A TraceContext, that can undefined to reset the context
   */
  withContext(context) {
    return new _LocalTracer(this.type, context);
  }
  /**
   * Create a new instance of the LocalTracer with an updated `context`,
   * on which an additional context is merged with the existing one.
   *
   * It does not mutate the calling instance, but returns a new LocalTracer,
   * following a simple builder pattern.
   */
  withUpdatedContext(contextToAdd) {
    return new _LocalTracer(this.type, Object.assign(Object.assign({}, this.context), contextToAdd));
  }
};
var listen = (cb) => {
  subscribers.push(cb);
  return () => {
    const i = subscribers.indexOf(cb);
    if (i !== -1) {
      subscribers[i] = subscribers[subscribers.length - 1];
      subscribers.pop();
    }
  };
};
function dispatch(log2) {
  for (let i = 0; i < subscribers.length; i++) {
    try {
      subscribers[i](log2);
    } catch (e) {
      console.error(e);
    }
  }
}
if (typeof window !== "undefined") {
  window.__ledgerLogsListen = listen;
}

// node_modules/@ledgerhq/hw-transport/lib-es/Transport.js
var import_events = __toESM(require_events());
var __awaiter = function(thisArg, _arguments, P, generator) {
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
};
var DEFAULT_LOG_TYPE = "transport";
var Transport = class {
  constructor({ context, logType } = {}) {
    this.exchangeTimeout = 3e4;
    this.unresponsiveTimeout = 15e3;
    this.deviceModel = null;
    this._events = new import_events.default();
    this.send = (cla_1, ins_1, p1_1, p2_1, ...args_1) => __awaiter(this, [cla_1, ins_1, p1_1, p2_1, ...args_1], void 0, function* (cla, ins, p1, p2, data = Buffer.alloc(0), statusList = [StatusCodes.OK], { abortTimeoutMs } = {}) {
      const tracer = this.tracer.withUpdatedContext({ function: "send" });
      if (data.length >= 256) {
        tracer.trace("data.length exceeded 256 bytes limit", { dataLength: data.length });
        throw new TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
      }
      tracer.trace("Starting an exchange", { abortTimeoutMs });
      const response = yield this.exchange(
        // The size of the data is added in 1 byte just before `data`
        Buffer.concat([Buffer.from([cla, ins, p1, p2]), Buffer.from([data.length]), data]),
        { abortTimeoutMs }
      );
      tracer.trace("Received response from exchange");
      const sw = response.readUInt16BE(response.length - 2);
      if (!statusList.some((s) => s === sw)) {
        throw new TransportStatusError(sw);
      }
      return response;
    });
    this._appAPIlock = null;
    this.tracer = new LocalTracer(logType !== null && logType !== void 0 ? logType : DEFAULT_LOG_TYPE, context);
  }
  /**
   * Send data to the device using a low level API.
   * It's recommended to use the "send" method for a higher level API.
   * @param {Buffer} apdu - The data to send.
   * @param {Object} options - Contains optional options for the exchange function
   *  - abortTimeoutMs: stop the exchange after a given timeout. Another timeout exists
   *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
   * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
   */
  exchange(_apdu, { abortTimeoutMs: _abortTimeoutMs } = {}) {
    throw new Error("exchange not implemented");
  }
  /**
   * Send apdus in batch to the device using a low level API.
   * The default implementation is to call exchange for each apdu.
   * @param {Array<Buffer>} apdus - array of apdus to send.
   * @param {Observer<Buffer>} observer - an observer that will receive the response of each apdu.
   * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop sending apdus.
   */
  exchangeBulk(apdus, observer) {
    let unsubscribed = false;
    const unsubscribe = () => {
      unsubscribed = true;
    };
    const main = () => __awaiter(this, void 0, void 0, function* () {
      if (unsubscribed)
        return;
      for (const apdu of apdus) {
        const r = yield this.exchange(apdu);
        if (unsubscribed)
          return;
        const status = r.readUInt16BE(r.length - 2);
        if (status !== StatusCodes.OK) {
          throw new TransportStatusError(status);
        }
        observer.next(r);
      }
    });
    main().then(() => !unsubscribed && observer.complete(), (e) => !unsubscribed && observer.error(e));
    return { unsubscribe };
  }
  /**
   * Set the "scramble key" for the next data exchanges with the device.
   * Each app can have a different scramble key and it is set internally during instantiation.
   * @param {string} key - The scramble key to set.
   * deprecated This method is no longer needed for modern transports and should be migrated away from.
   * no @ before deprecated as it breaks documentationjs on version 14.0.2
   * https://github.com/documentationjs/documentation/issues/1596
   */
  setScrambleKey(_key) {
  }
  /**
   * Close the connection with the device.
   *
   * Note: for certain transports (hw-transport-node-hid-singleton for ex), once the promise resolved,
   * the transport instance is actually still cached, and the device is disconnected only after a defined timeout.
   * But for the consumer of the Transport, this does not matter and it can consider the transport to be closed.
   *
   * @returns {Promise<void>} A promise that resolves when the transport is closed.
   */
  close() {
    return Promise.resolve();
  }
  /**
   * Listen for an event on the transport instance.
   * Transport implementations may have specific events. Common events include:
   * "disconnect" : triggered when the transport is disconnected.
   * @param {string} eventName - The name of the event to listen for.
   * @param {(...args: Array<any>) => any} cb - The callback function to be invoked when the event occurs.
   */
  on(eventName, cb) {
    this._events.on(eventName, cb);
  }
  /**
   * Stop listening to an event on an instance of transport.
   */
  off(eventName, cb) {
    this._events.removeListener(eventName, cb);
  }
  emit(event, ...args) {
    this._events.emit(event, ...args);
  }
  /**
   * Enable or not logs of the binary exchange
   */
  setDebugMode() {
    console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
  }
  /**
   * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
   */
  setExchangeTimeout(exchangeTimeout) {
    this.exchangeTimeout = exchangeTimeout;
  }
  /**
   * Define the delay before emitting "unresponsive" on an exchange that does not respond
   */
  setExchangeUnresponsiveTimeout(unresponsiveTimeout) {
    this.unresponsiveTimeout = unresponsiveTimeout;
  }
  /**
   * create() allows to open the first descriptor available or
   * throw if there is none or if timeout is reached.
   * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
   * @example
  TransportFoo.create().then(transport => ...)
   */
  static create(openTimeout = 3e3, listenTimeout) {
    return new Promise((resolve, reject) => {
      let found = false;
      const sub = this.listen({
        next: (e) => {
          found = true;
          if (sub)
            sub.unsubscribe();
          if (listenTimeoutId)
            clearTimeout(listenTimeoutId);
          this.open(e.descriptor, openTimeout).then(resolve, reject);
        },
        error: (e) => {
          if (listenTimeoutId)
            clearTimeout(listenTimeoutId);
          reject(e);
        },
        complete: () => {
          if (listenTimeoutId)
            clearTimeout(listenTimeoutId);
          if (!found) {
            reject(new TransportError(this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
          }
        }
      });
      const listenTimeoutId = listenTimeout ? setTimeout(() => {
        sub.unsubscribe();
        reject(new TransportError(this.ErrorMessage_ListenTimeout, "ListenTimeout"));
      }, listenTimeout) : null;
    });
  }
  /**
   * Wrapper to make an exchange "atomic" (blocking any other exchange)
   *
   * It also handles "unresponsiveness" by emitting "unresponsive" and "responsive" events.
   *
   * @param f The exchange job, using the transport to run
   * @returns a Promise resolving with the output of the given job
   */
  exchangeAtomicImpl(f) {
    return __awaiter(this, void 0, void 0, function* () {
      const tracer = this.tracer.withUpdatedContext({
        function: "exchangeAtomicImpl",
        unresponsiveTimeout: this.unresponsiveTimeout
      });
      if (this.exchangeBusyPromise) {
        tracer.trace("Atomic exchange is already busy");
        throw new TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
      }
      let resolveBusy;
      const busyPromise = new Promise((r) => {
        resolveBusy = r;
      });
      this.exchangeBusyPromise = busyPromise;
      let unresponsiveReached = false;
      const timeout = setTimeout(() => {
        tracer.trace(`Timeout reached, emitting Transport event "unresponsive"`, {
          unresponsiveTimeout: this.unresponsiveTimeout
        });
        unresponsiveReached = true;
        this.emit("unresponsive");
      }, this.unresponsiveTimeout);
      try {
        const res = yield f();
        if (unresponsiveReached) {
          tracer.trace("Device was unresponsive, emitting responsive");
          this.emit("responsive");
        }
        return res;
      } finally {
        tracer.trace("Finalize, clearing busy guard");
        clearTimeout(timeout);
        if (resolveBusy)
          resolveBusy();
        this.exchangeBusyPromise = null;
      }
    });
  }
  decorateAppAPIMethods(self, methods, scrambleKey) {
    for (const methodName of methods) {
      self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
    }
  }
  decorateAppAPIMethod(methodName, f, ctx, scrambleKey) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
      const { _appAPIlock } = this;
      if (_appAPIlock) {
        return Promise.reject(new TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"));
      }
      try {
        this._appAPIlock = methodName;
        this.setScrambleKey(scrambleKey);
        return yield f.apply(ctx, args);
      } finally {
        this._appAPIlock = null;
      }
    });
  }
  /**
   * Sets the context used by the logging/tracing mechanism
   *
   * Useful when re-using (cached) the same Transport instance,
   * but with a new tracing context.
   *
   * @param context A TraceContext, that can undefined to reset the context
   */
  setTraceContext(context) {
    this.tracer = this.tracer.withContext(context);
  }
  /**
   * Updates the context used by the logging/tracing mechanism
   *
   * The update only overrides the key-value that are already defined in the current context.
   *
   * @param contextToAdd A TraceContext that will be added to the current context
   */
  updateTraceContext(contextToAdd) {
    this.tracer.updateContext(contextToAdd);
  }
  /**
   * Gets the tracing context of the transport instance
   */
  getTraceContext() {
    return this.tracer.getContext();
  }
};
Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
var Transport_default = Transport;

export {
  DisconnectedDevice,
  DisconnectedDeviceDuringOperation,
  TransportOpenUserCancelled,
  TransportError,
  StatusCodes,
  TransportStatusError,
  log,
  Transport_default
};
//# sourceMappingURL=chunk-7EIYUEM3.js.map

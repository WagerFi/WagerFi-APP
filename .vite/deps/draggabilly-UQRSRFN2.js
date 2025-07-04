import {
  __commonJS
} from "./chunk-MVEJMUOB.js";

// node_modules/get-size/get-size.js
var require_get_size = __commonJS({
  "node_modules/get-size/get-size.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory();
      } else {
        window2.getSize = factory();
      }
    })(window, function factory() {
      function getStyleSize(value) {
        let num = parseFloat(value);
        let isValid = value.indexOf("%") == -1 && !isNaN(num);
        return isValid && num;
      }
      let measurements = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth"
      ];
      let measurementsLength = measurements.length;
      function getZeroSize() {
        let size = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        };
        measurements.forEach((measurement) => {
          size[measurement] = 0;
        });
        return size;
      }
      function getSize(elem) {
        if (typeof elem == "string") elem = document.querySelector(elem);
        let isElement = elem && typeof elem == "object" && elem.nodeType;
        if (!isElement) return;
        let style = getComputedStyle(elem);
        if (style.display == "none") return getZeroSize();
        let size = {};
        size.width = elem.offsetWidth;
        size.height = elem.offsetHeight;
        let isBorderBox = size.isBorderBox = style.boxSizing == "border-box";
        measurements.forEach((measurement) => {
          let value = style[measurement];
          let num = parseFloat(value);
          size[measurement] = !isNaN(num) ? num : 0;
        });
        let paddingWidth = size.paddingLeft + size.paddingRight;
        let paddingHeight = size.paddingTop + size.paddingBottom;
        let marginWidth = size.marginLeft + size.marginRight;
        let marginHeight = size.marginTop + size.marginBottom;
        let borderWidth = size.borderLeftWidth + size.borderRightWidth;
        let borderHeight = size.borderTopWidth + size.borderBottomWidth;
        let styleWidth = getStyleSize(style.width);
        if (styleWidth !== false) {
          size.width = styleWidth + // add padding and border unless it's already including it
          (isBorderBox ? 0 : paddingWidth + borderWidth);
        }
        let styleHeight = getStyleSize(style.height);
        if (styleHeight !== false) {
          size.height = styleHeight + // add padding and border unless it's already including it
          (isBorderBox ? 0 : paddingHeight + borderHeight);
        }
        size.innerWidth = size.width - (paddingWidth + borderWidth);
        size.innerHeight = size.height - (paddingHeight + borderHeight);
        size.outerWidth = size.width + marginWidth;
        size.outerHeight = size.height + marginHeight;
        return size;
      }
      return getSize;
    });
  }
});

// node_modules/ev-emitter/ev-emitter.js
var require_ev_emitter = __commonJS({
  "node_modules/ev-emitter/ev-emitter.js"(exports, module) {
    (function(global, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory();
      } else {
        global.EvEmitter = factory();
      }
    })(typeof window != "undefined" ? window : exports, function() {
      function EvEmitter() {
      }
      let proto = EvEmitter.prototype;
      proto.on = function(eventName, listener) {
        if (!eventName || !listener) return this;
        let events = this._events = this._events || {};
        let listeners = events[eventName] = events[eventName] || [];
        if (!listeners.includes(listener)) {
          listeners.push(listener);
        }
        return this;
      };
      proto.once = function(eventName, listener) {
        if (!eventName || !listener) return this;
        this.on(eventName, listener);
        let onceEvents = this._onceEvents = this._onceEvents || {};
        let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        onceListeners[listener] = true;
        return this;
      };
      proto.off = function(eventName, listener) {
        let listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return this;
        let index = listeners.indexOf(listener);
        if (index != -1) {
          listeners.splice(index, 1);
        }
        return this;
      };
      proto.emitEvent = function(eventName, args) {
        let listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return this;
        listeners = listeners.slice(0);
        args = args || [];
        let onceListeners = this._onceEvents && this._onceEvents[eventName];
        for (let listener of listeners) {
          let isOnce = onceListeners && onceListeners[listener];
          if (isOnce) {
            this.off(eventName, listener);
            delete onceListeners[listener];
          }
          listener.apply(this, args);
        }
        return this;
      };
      proto.allOff = function() {
        delete this._events;
        delete this._onceEvents;
        return this;
      };
      return EvEmitter;
    });
  }
});

// node_modules/unidragger/unidragger.js
var require_unidragger = __commonJS({
  "node_modules/unidragger/unidragger.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          window2,
          require_ev_emitter()
        );
      } else {
        window2.Unidragger = factory(
          window2,
          window2.EvEmitter
        );
      }
    })(typeof window != "undefined" ? window : exports, function factory(window2, EvEmitter) {
      function Unidragger() {
      }
      let proto = Unidragger.prototype = Object.create(EvEmitter.prototype);
      proto.handleEvent = function(event) {
        let method = "on" + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      let startEvent, activeEvents;
      if ("ontouchstart" in window2) {
        startEvent = "touchstart";
        activeEvents = ["touchmove", "touchend", "touchcancel"];
      } else if (window2.PointerEvent) {
        startEvent = "pointerdown";
        activeEvents = ["pointermove", "pointerup", "pointercancel"];
      } else {
        startEvent = "mousedown";
        activeEvents = ["mousemove", "mouseup"];
      }
      proto.touchActionValue = "none";
      proto.bindHandles = function() {
        this._bindHandles("addEventListener", this.touchActionValue);
      };
      proto.unbindHandles = function() {
        this._bindHandles("removeEventListener", "");
      };
      proto._bindHandles = function(bindMethod, touchAction) {
        this.handles.forEach((handle) => {
          handle[bindMethod](startEvent, this);
          handle[bindMethod]("click", this);
          if (window2.PointerEvent) handle.style.touchAction = touchAction;
        });
      };
      proto.bindActivePointerEvents = function() {
        activeEvents.forEach((eventName) => {
          window2.addEventListener(eventName, this);
        });
      };
      proto.unbindActivePointerEvents = function() {
        activeEvents.forEach((eventName) => {
          window2.removeEventListener(eventName, this);
        });
      };
      proto.withPointer = function(methodName, event) {
        if (event.pointerId === this.pointerIdentifier) {
          this[methodName](event, event);
        }
      };
      proto.withTouch = function(methodName, event) {
        let touch;
        for (let changedTouch of event.changedTouches) {
          if (changedTouch.identifier === this.pointerIdentifier) {
            touch = changedTouch;
          }
        }
        if (touch) this[methodName](event, touch);
      };
      proto.onmousedown = function(event) {
        this.pointerDown(event, event);
      };
      proto.ontouchstart = function(event) {
        this.pointerDown(event, event.changedTouches[0]);
      };
      proto.onpointerdown = function(event) {
        this.pointerDown(event, event);
      };
      const cursorNodes = ["TEXTAREA", "INPUT", "SELECT", "OPTION"];
      const clickTypes = ["radio", "checkbox", "button", "submit", "image", "file"];
      proto.pointerDown = function(event, pointer) {
        let isCursorNode = cursorNodes.includes(event.target.nodeName);
        let isClickType = clickTypes.includes(event.target.type);
        let isOkayElement = !isCursorNode || isClickType;
        let isOkay = !this.isPointerDown && !event.button && isOkayElement;
        if (!isOkay) return;
        this.isPointerDown = true;
        this.pointerIdentifier = pointer.pointerId !== void 0 ? (
          // pointerId for pointer events, touch.indentifier for touch events
          pointer.pointerId
        ) : pointer.identifier;
        this.pointerDownPointer = {
          pageX: pointer.pageX,
          pageY: pointer.pageY
        };
        this.bindActivePointerEvents();
        this.emitEvent("pointerDown", [event, pointer]);
      };
      proto.onmousemove = function(event) {
        this.pointerMove(event, event);
      };
      proto.onpointermove = function(event) {
        this.withPointer("pointerMove", event);
      };
      proto.ontouchmove = function(event) {
        this.withTouch("pointerMove", event);
      };
      proto.pointerMove = function(event, pointer) {
        let moveVector = {
          x: pointer.pageX - this.pointerDownPointer.pageX,
          y: pointer.pageY - this.pointerDownPointer.pageY
        };
        this.emitEvent("pointerMove", [event, pointer, moveVector]);
        let isDragStarting = !this.isDragging && this.hasDragStarted(moveVector);
        if (isDragStarting) this.dragStart(event, pointer);
        if (this.isDragging) this.dragMove(event, pointer, moveVector);
      };
      proto.hasDragStarted = function(moveVector) {
        return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
      };
      proto.dragStart = function(event, pointer) {
        this.isDragging = true;
        this.isPreventingClicks = true;
        this.emitEvent("dragStart", [event, pointer]);
      };
      proto.dragMove = function(event, pointer, moveVector) {
        this.emitEvent("dragMove", [event, pointer, moveVector]);
      };
      proto.onmouseup = function(event) {
        this.pointerUp(event, event);
      };
      proto.onpointerup = function(event) {
        this.withPointer("pointerUp", event);
      };
      proto.ontouchend = function(event) {
        this.withTouch("pointerUp", event);
      };
      proto.pointerUp = function(event, pointer) {
        this.pointerDone();
        this.emitEvent("pointerUp", [event, pointer]);
        if (this.isDragging) {
          this.dragEnd(event, pointer);
        } else {
          this.staticClick(event, pointer);
        }
      };
      proto.dragEnd = function(event, pointer) {
        this.isDragging = false;
        setTimeout(() => delete this.isPreventingClicks);
        this.emitEvent("dragEnd", [event, pointer]);
      };
      proto.pointerDone = function() {
        this.isPointerDown = false;
        delete this.pointerIdentifier;
        this.unbindActivePointerEvents();
        this.emitEvent("pointerDone");
      };
      proto.onpointercancel = function(event) {
        this.withPointer("pointerCancel", event);
      };
      proto.ontouchcancel = function(event) {
        this.withTouch("pointerCancel", event);
      };
      proto.pointerCancel = function(event, pointer) {
        this.pointerDone();
        this.emitEvent("pointerCancel", [event, pointer]);
      };
      proto.onclick = function(event) {
        if (this.isPreventingClicks) event.preventDefault();
      };
      proto.staticClick = function(event, pointer) {
        let isMouseup = event.type === "mouseup";
        if (isMouseup && this.isIgnoringMouseUp) return;
        this.emitEvent("staticClick", [event, pointer]);
        if (isMouseup) {
          this.isIgnoringMouseUp = true;
          setTimeout(() => {
            delete this.isIgnoringMouseUp;
          }, 400);
        }
      };
      return Unidragger;
    });
  }
});

// node_modules/draggabilly/draggabilly.js
var require_draggabilly = __commonJS({
  "node_modules/draggabilly/draggabilly.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          window2,
          require_get_size(),
          require_unidragger()
        );
      } else {
        window2.Draggabilly = factory(
          window2,
          window2.getSize,
          window2.Unidragger
        );
      }
    })(
      typeof window != "undefined" ? window : exports,
      function factory(window2, getSize, Unidragger) {
        function noop() {
        }
        let jQuery = window2.jQuery;
        function Draggabilly(element, options) {
          this.element = typeof element == "string" ? document.querySelector(element) : element;
          if (jQuery) {
            this.$element = jQuery(this.element);
          }
          this.options = {};
          this.option(options);
          this._create();
        }
        let proto = Draggabilly.prototype = Object.create(Unidragger.prototype);
        proto.option = function(opts) {
          this.options = {
            ...this.options,
            ...opts
          };
        };
        const positionValues = ["relative", "absolute", "fixed"];
        proto._create = function() {
          this.position = {};
          this._getPosition();
          this.startPoint = { x: 0, y: 0 };
          this.dragPoint = { x: 0, y: 0 };
          this.startPosition = { ...this.position };
          let style = getComputedStyle(this.element);
          if (!positionValues.includes(style.position)) {
            this.element.style.position = "relative";
          }
          this.on("pointerDown", this.handlePointerDown);
          this.on("pointerUp", this.handlePointerUp);
          this.on("dragStart", this.handleDragStart);
          this.on("dragMove", this.handleDragMove);
          this.on("dragEnd", this.handleDragEnd);
          this.setHandles();
          this.enable();
        };
        proto.setHandles = function() {
          let { handle } = this.options;
          if (typeof handle == "string") {
            this.handles = this.element.querySelectorAll(handle);
          } else if (typeof handle == "object" && handle.length) {
            this.handles = handle;
          } else if (handle instanceof HTMLElement) {
            this.handles = [handle];
          } else {
            this.handles = [this.element];
          }
        };
        const cancelableEvents = ["dragStart", "dragMove", "dragEnd"];
        let emitEvent = proto.emitEvent;
        proto.emitEvent = function(eventName, args) {
          let isCanceled = !this.isEnabled && cancelableEvents.includes(eventName);
          if (isCanceled) return;
          emitEvent.call(this, eventName, args);
          let jquery = window2.jQuery;
          if (!jquery || !this.$element) return;
          let event;
          let jqArgs = args;
          let isFirstArgEvent = args && args[0] instanceof Event;
          if (isFirstArgEvent) [event, ...jqArgs] = args;
          let $event = jquery.Event(event);
          $event.type = eventName;
          this.$element.trigger($event, jqArgs);
        };
        proto._getPosition = function() {
          let style = getComputedStyle(this.element);
          let x = this._getPositionCoord(style.left, "width");
          let y = this._getPositionCoord(style.top, "height");
          this.position.x = isNaN(x) ? 0 : x;
          this.position.y = isNaN(y) ? 0 : y;
          this._addTransformPosition(style);
        };
        proto._getPositionCoord = function(styleSide, measure) {
          if (styleSide.includes("%")) {
            let parentSize = getSize(this.element.parentNode);
            return !parentSize ? 0 : parseFloat(styleSide) / 100 * parentSize[measure];
          }
          return parseInt(styleSide, 10);
        };
        proto._addTransformPosition = function(style) {
          let transform = style.transform;
          if (!transform.startsWith("matrix")) return;
          let matrixValues = transform.split(",");
          let xIndex = transform.startsWith("matrix3d") ? 12 : 4;
          let translateX = parseInt(matrixValues[xIndex], 10);
          let translateY = parseInt(matrixValues[xIndex + 1], 10);
          this.position.x += translateX;
          this.position.y += translateY;
        };
        proto.handlePointerDown = function(event, pointer) {
          if (!this.isEnabled) return;
          this.pointerDownPointer = {
            pageX: pointer.pageX,
            pageY: pointer.pageY
          };
          event.preventDefault();
          document.activeElement.blur();
          this.bindActivePointerEvents(event);
          this.element.classList.add("is-pointer-down");
        };
        proto.handleDragStart = function() {
          if (!this.isEnabled) return;
          this._getPosition();
          this.measureContainment();
          this.startPosition.x = this.position.x;
          this.startPosition.y = this.position.y;
          this.setLeftTop();
          this.dragPoint.x = 0;
          this.dragPoint.y = 0;
          this.element.classList.add("is-dragging");
          this.animate();
        };
        proto.measureContainment = function() {
          let container = this.getContainer();
          if (!container) return;
          let elemSize = getSize(this.element);
          let containerSize = getSize(container);
          let {
            borderLeftWidth,
            borderRightWidth,
            borderTopWidth,
            borderBottomWidth
          } = containerSize;
          let elemRect = this.element.getBoundingClientRect();
          let containerRect = container.getBoundingClientRect();
          let borderSizeX = borderLeftWidth + borderRightWidth;
          let borderSizeY = borderTopWidth + borderBottomWidth;
          let position = this.relativeStartPosition = {
            x: elemRect.left - (containerRect.left + borderLeftWidth),
            y: elemRect.top - (containerRect.top + borderTopWidth)
          };
          this.containSize = {
            width: containerSize.width - borderSizeX - position.x - elemSize.width,
            height: containerSize.height - borderSizeY - position.y - elemSize.height
          };
        };
        proto.getContainer = function() {
          let containment = this.options.containment;
          if (!containment) return;
          let isElement = containment instanceof HTMLElement;
          if (isElement) return containment;
          if (typeof containment == "string") {
            return document.querySelector(containment);
          }
          return this.element.parentNode;
        };
        proto.handleDragMove = function(event, pointer, moveVector) {
          if (!this.isEnabled) return;
          let dragX = moveVector.x;
          let dragY = moveVector.y;
          let grid = this.options.grid;
          let gridX = grid && grid[0];
          let gridY = grid && grid[1];
          dragX = applyGrid(dragX, gridX);
          dragY = applyGrid(dragY, gridY);
          dragX = this.containDrag("x", dragX, gridX);
          dragY = this.containDrag("y", dragY, gridY);
          dragX = this.options.axis == "y" ? 0 : dragX;
          dragY = this.options.axis == "x" ? 0 : dragY;
          this.position.x = this.startPosition.x + dragX;
          this.position.y = this.startPosition.y + dragY;
          this.dragPoint.x = dragX;
          this.dragPoint.y = dragY;
        };
        function applyGrid(value, grid, method) {
          if (!grid) return value;
          method = method || "round";
          return Math[method](value / grid) * grid;
        }
        proto.containDrag = function(axis, drag, grid) {
          if (!this.options.containment) return drag;
          let measure = axis == "x" ? "width" : "height";
          let rel = this.relativeStartPosition[axis];
          let min = applyGrid(-rel, grid, "ceil");
          let max = this.containSize[measure];
          max = applyGrid(max, grid, "floor");
          return Math.max(min, Math.min(max, drag));
        };
        proto.handlePointerUp = function() {
          this.element.classList.remove("is-pointer-down");
        };
        proto.handleDragEnd = function() {
          if (!this.isEnabled) return;
          this.element.style.transform = "";
          this.setLeftTop();
          this.element.classList.remove("is-dragging");
        };
        proto.animate = function() {
          if (!this.isDragging) return;
          this.positionDrag();
          requestAnimationFrame(() => this.animate());
        };
        proto.setLeftTop = function() {
          let { x, y } = this.position;
          this.element.style.left = `${x}px`;
          this.element.style.top = `${y}px`;
        };
        proto.positionDrag = function() {
          let { x, y } = this.dragPoint;
          this.element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        };
        proto.setPosition = function(x, y) {
          this.position.x = x;
          this.position.y = y;
          this.setLeftTop();
        };
        proto.enable = function() {
          if (this.isEnabled) return;
          this.isEnabled = true;
          this.bindHandles();
        };
        proto.disable = function() {
          if (!this.isEnabled) return;
          this.isEnabled = false;
          if (this.isDragging) this.dragEnd();
          this.unbindHandles();
        };
        const resetCssProperties = ["transform", "left", "top", "position"];
        proto.destroy = function() {
          this.disable();
          resetCssProperties.forEach((prop) => {
            this.element.style[prop] = "";
          });
          this.unbindHandles();
          if (this.$element) this.$element.removeData("draggabilly");
        };
        proto._init = noop;
        if (jQuery && jQuery.bridget) {
          jQuery.bridget("draggabilly", Draggabilly);
        }
        return Draggabilly;
      }
    );
  }
});
export default require_draggabilly();
/*! Bundled license information:

get-size/get-size.js:
  (*!
   * Infinite Scroll v2.0.4
   * measure size of elements
   * MIT license
   *)

unidragger/unidragger.js:
  (*!
   * Unidragger v3.0.1
   * Draggable base class
   * MIT license
   *)

draggabilly/draggabilly.js:
  (*!
   * Draggabilly v3.0.0
   * Make that shiz draggable
   * https://draggabilly.desandro.com
   * MIT license
   *)
*/
//# sourceMappingURL=draggabilly-UQRSRFN2.js.map

import { capitalize } from "./utils";
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DOMLIstener`);
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = setMethodName(listener);
      if (!this[method]) {
        const name = this.name;
        throw new Error(
          `Method ${method} not implemented in ${name} Component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = setMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function setMethodName(eventName) {
  return "on" + capitalize(eventName);
}

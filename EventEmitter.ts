type Listener = (...args: any[]) => void;

export class EventEmitter {
  events: Record<string, Listener[]>;

  constructor() {
    this.events = {};
  }

  on(eventName: string, listener: Listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  off(eventName: string, listener: Listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (currentListener) => currentListener !== listener
      );
    }
  }

  emit(eventName: string, ...args: any[]) {
    const events = this.events[eventName];

    if (events) {
      for (const callback of events) {
        callback.call(null, args);
      }
    }
  }
}

const emitter = new EventEmitter();

const logData = (data: Record<string, string>) => console.log(data);
const errorData = (data: Record<string, string>) => console.error(data);

emitter.on("data", logData);
emitter.on("data", errorData);

emitter.emit("data", { message: "Hello, world!" });

emitter.off("data", errorData);

emitter.emit("data", { message: "after" });

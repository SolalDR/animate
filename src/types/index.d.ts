declare module "@solaldr/emitter" {
  type EventCallback = (data: unknown) => void
  class Emitter {
    on: (event: string, cb: EventCallback) => any
    off: (event: string, cb: EventCallback) => any
    addEventListener: (event: string, cb: EventCallback) => any
    removeEventListener: (event: string, cb: EventCallback) => any
    once: (event: string, cb: EventCallback) => any
    /**
     * @ignore
     */
    emit: (event: string, data: unknown) => any
  }

  export default Emitter
}
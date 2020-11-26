class JsFailError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, JsFailError.prototype);
  }
}

export default JsFailError;

class NewUrlError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NewUrlError.prototype);
  }
}

export default NewUrlError;

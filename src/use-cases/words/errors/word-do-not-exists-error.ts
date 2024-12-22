export class WordDoNotExistsError extends Error {
  constructor() {
    super('Try another word');
  }
}

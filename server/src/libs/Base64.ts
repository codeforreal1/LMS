class Base64 {
  static encode(text: string) {
    if (text == null) {
      throw new Error('Text to encode is required');
    }
    return Buffer.from(text).toString('base64');
  }

  static decode(encodedText: string) {
    if (encodedText == null) {
      throw new Error('Text to decode is required');
    }
    return Buffer.from(encodedText, 'base64').toString('ascii');
  }

  static isValid(encodedText: string) {
    if (encodedText == null) {
      throw new Error('Text to decrypt is required');
    }
    try {
      const decodedText = Base64.decode(encodedText);
      return encodedText === Base64.encode(decodedText);
    } catch (_) {
      return false;
    }
  }
}

export default Base64;

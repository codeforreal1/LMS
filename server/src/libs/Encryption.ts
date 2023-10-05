import 'dotenv/config';
import crypto from 'crypto';

const encryptionAlgorithm = 'aes-256-gcm';
const encryptionKey = process.env.ENCRYPTION_KEY as string; // Must be 64 character for iv length 12

const IV_BYTE_LENGTH = 12;
const IV = crypto.randomBytes(IV_BYTE_LENGTH);

interface DefaultOptions {
  encrypt: {
    secretKey: string;
  };
  decrypt: {
    secretKey: string;
  };
}

const defaultOptions: DefaultOptions = {
  encrypt: {
    secretKey: encryptionKey,
  },
  decrypt: {
    secretKey: encryptionKey,
  },
};

class Encryption {
  static generateKeys(destinationPublicKey: string) {
    if (destinationPublicKey == null) {
      throw new Error('Destination public key is required.');
    }
    const entity = crypto.createECDH('prime256v1');
    entity.generateKeys();
    const publicKey = entity
      .getPublicKey(null, 'compressed')
      .toString('base64');
    const privateKey = entity.computeSecret(
      destinationPublicKey,
      'base64',
      'hex',
    );

    return {
      publicKey,
      privateKey,
    };
  }

  static encrypt(text: string, options = defaultOptions.encrypt) {
    options = { ...defaultOptions.encrypt, ...options };

    const cipher = crypto.createCipheriv(
      encryptionAlgorithm,
      Buffer.from(options.secretKey, 'hex'),
      IV,
    );
    let encryptedText = cipher.update(text, 'utf8', 'hex');
    encryptedText += cipher.final('hex');

    const iv = IV.toString('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    const payload = iv + encryptedText + authTag;
    return Buffer.from(payload, 'hex').toString('base64');
  }

  static decrypt(hash: string, options = defaultOptions.decrypt) {
    options = { ...defaultOptions.decrypt, ...options };

    const payload = Buffer.from(hash, 'base64').toString('hex');

    const iv = payload.slice(0, IV_BYTE_LENGTH * 2);
    const encryptedText = payload.slice(IV_BYTE_LENGTH * 2, -32);
    const authTag = payload.slice(-32);

    const decipher = crypto.createDecipheriv(
      encryptionAlgorithm,
      Buffer.from(options.secretKey, 'hex'),
      Buffer.from(iv, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export default Encryption;

import bcrypt from 'bcrypt';

class Password {
  static hash(password: string, saltRounds: number = 12) {
    return bcrypt.hash(password, saltRounds);
  }

  static compare(comparisonPassword: string, hashedPassword: string) {
    return bcrypt.compare(comparisonPassword, hashedPassword);
  }
}

export default Password;

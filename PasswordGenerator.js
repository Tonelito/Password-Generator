// Password Generator
class PasswordGenerator {
  constructor() {
    this.lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    this.uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.numberChars = "0123456789";
    this.symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  }

  /**
   * Generate a random password
   * @param {Object} options - Password generation options
   * @param {number} [options.length=12] - Length of the password
   * @param {boolean} [options.includeLowercase=true] - Include lowercase letters
   * @param {boolean} [options.includeUppercase=true] - Include uppercase letters
   * @param {boolean} [options.includeNumbers=true] - Include numbers
   * @param {boolean} [options.includeSymbols=true] - Include symbols
   * @returns {string} Generated password
   */
  generate(options = {}) {
    const {
      length = 12,
      includeLowercase = true,
      includeUppercase = true,
      includeNumbers = true,
      includeSymbols = true,
    } = options;

    // Validate password length
    if (length < 4) {
      throw new Error("Password length must be at least 4 characters");
    }

    // Collect selected character sets
    let charSets = [];
    if (includeLowercase) charSets.push(this.lowercaseChars);
    if (includeUppercase) charSets.push(this.uppercaseChars);
    if (includeNumbers) charSets.push(this.numberChars);
    if (includeSymbols) charSets.push(this.symbolChars);

    // Ensure at least one character set is selected
    if (charSets.length === 0) {
      throw new Error("At least one character set must be selected");
    }

    // Generate password
    let password = "";
    const allChars = charSets.join("");

    // Ensure at least one character from each selected set
    charSets.forEach((charSet) => {
      password += this.getRandomChar(charSet);
    });

    // Fill remaining length with random characters
    while (password.length < length) {
      password += this.getRandomChar(allChars);
    }

    // Shuffle the password to randomize character placement
    return this.shuffleString(password);
  }

  /**
   * Get a random character from a given set
   * @param {string} charSet - Set of characters to choose from
   * @returns {string} Randomly selected character
   */
  getRandomChar(charSet) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
  }

  /**
   * Shuffle the characters in a string
   * @param {string} str - String to shuffle
   * @returns {string} Shuffled string
   */
  shuffleString(str) {
    const array = str.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  }
}

const passwordGen = new PasswordGenerator();
console.log(
  passwordGen.generate({
    length: 16,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true,
  }),
);

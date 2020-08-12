import zxcvbn from 'zxcvbn';

/**
 * @description
 * determines the password strength using the zxcvbn library
 * @param { string } email
 * @param { string } password
 * @returns {{ score: number, warning: string, suggestions: [string] }}
 */
const checkPasswordStrength = (email, password) => {
    let passwordData = zxcvbn(password, [email])
    let passwordStrengthData = {
        score: passwordData.score,
        warning: passwordData.feedback.warning,
        suggestions: passwordData.feedback.suggestions,
    }
    return passwordStrengthData;
}

/**
 * @description
 * determines whether password is to short
 * @param {string} password 
 * @param {number} minLength
 * @returns {boolean}
 */
const checkPasswordToShort = (password, minLength) => {

    if (password.length < minLength) return true;
    return false;
}

/**
 * @description
 * determines whether password has a special a special character
 * @param {string} password
 * @returns {boolean} false when password doesn't contain a special character
 */
const checkPasswordContainsSpecialCharacter = (password) => {
    // uses regex to determine if password contains various characters
    let specialFormat = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    return !specialFormat.test(password);
}

/**
 * @description
 * determines whether password has a capital letter
 * @param {string} password
 * @returns {boolean} false when password doesn't contain a capital letter
 */
const checkPasswordHasCapital = (password) => {
    // uses regex to determine if password contains various characters
    let capitalFormat = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    return !capitalFormat.test(password);
}

/**
 * @description
 * determines whether password has a lowercase character
 * @param {string} password
 * @returns {boolean} false when password doesn't contain a lowercase letter
 */
const checkPasswordHasLowercase = (password) => {
    // uses regex to determine if password contains various characters
    let lowercaseFormat = /[abcdefghijklmnopqrstuvwxyz]/;
    return !lowercaseFormat.test(password);
}

/**
 * @description
 * used to determine if the the password has a number
 * @param {string} password 
 * @returns {boolean} false when password doesn't contain a number
 */
const checkPasswordHasNumber = (password) => {
    // uses regex to determine if password contains various characters
    let numbersFormat = /[1234567890]/;
    return !numbersFormat.test(password);
}

export {
    checkPasswordStrength,
    checkPasswordToShort,
    checkPasswordContainsSpecialCharacter,
    checkPasswordHasCapital,
    checkPasswordHasLowercase,
    checkPasswordHasNumber,
};
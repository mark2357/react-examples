/**
 * @description
 * a helper function to store data into local storage
 * @param {string} key 
 * @param {string} value 
 */
const storeInLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

/**
 * @description
 * a helper function to retrieve data from local storage
 * @param {string} key 
 * @param {string} value 
 */
const retrieveFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}

module.exports = {
    storeInLocalStorage,
    retrieveFromLocalStorage
}
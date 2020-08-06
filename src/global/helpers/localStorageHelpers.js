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

/**
 * a helper function to remove a key from local storage
 * @param {*} key 
 */
const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

module.exports = {
    storeInLocalStorage,
    retrieveFromLocalStorage,
    removeFromLocalStorage
}
import localStorageKeys from '../constants/localStorageKeys';

/**
 * @description
 * a helper function to store data into local storage
 * @param {string} key 
 * @param {string} value 
 */
const storeInLocalStorage = (key, value) => {
    if(!Object.values(localStorageKeys).includes(key)) console.warn(`key: ${key} is not in local storage keys constant`);
    localStorage.setItem(key, value);
}

/**
 * @description
 * a helper function to retrieve data from local storage
 * @param {string} key 
 * @param {string} value 
 */
const retrieveFromLocalStorage = (key) => {
    if(!Object.values(localStorageKeys).includes(key)) console.warn(`key: ${key} is not in local storage keys constant`);
    return localStorage.getItem(key);
}

/**
 * a helper function to remove a key from local storage
 * @param {*} key 
 */
const removeFromLocalStorage = (key) => {
    if(!Object.values(localStorageKeys).includes(key)) console.warn(`key: ${key} is not in local storage keys constant`);
    localStorage.removeItem(key);
}

export {
    storeInLocalStorage,
    retrieveFromLocalStorage,
    removeFromLocalStorage
}
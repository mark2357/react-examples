import { storeInLocalStorage, removeFromLocalStorage } from '../../../../global/helpers/localStorageHelpers';
import LOCAL_STORAGE_KEYS from '../../../../global/constants/localStorageKeys';

/**
 * @description
 * sets the currently logged in user
 * an email of null will remove the local storage entry
 * @param {string} email the email of the new logged in user
 */
const setLoggedInUser = (email) => {
    //in a real world scenario this helper function would send a request to the server which would send back a token to store

    if(email === null) {
        //logging out user
        removeFromLocalStorage(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);
    }
    else {
        storeInLocalStorage(LOCAL_STORAGE_KEYS.LOGGED_IN_USER, email);
    }

};


export default setLoggedInUser
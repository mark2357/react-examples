import { retrieveFromLocalStorage } from '../../../../global/helpers/localStorageHelpers';
import LOCAL_STORAGE_KEYS from '../../../../global/constants/localStorageKeys';

/**
 * @description
 * @param {string} email the email that is being checked
 * @returns {boolean}
 * returns true when a user account exists for the given email 
 */
const isUserAccount = (email) => {
    //in a real world scenario this helper function would send a request to the server and wait for a response

    let userAccountsString = retrieveFromLocalStorage(LOCAL_STORAGE_KEYS.USER_ACCOUNT_DATA);

    // no accounts have been stored in local storage yet
    if(userAccountsString === null)
        return false;
    
    let userAccounts = JSON.parse(userAccountsString);

    if(userAccounts[email] === undefined)
        return false;

    return true;
};


export default isUserAccount;
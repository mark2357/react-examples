import { retrieveFromLocalStorage } from '../../../../global/helpers/localStorageHelpers';
import LOCAL_STORAGE_KEYS from '../../../../global/constants/localStorageKeys';


/**
 * @description
 * returns true when the user given email and password is a valid user account
 * @param {string} email 
 * @param {string} password 
 * @returns {boolean}
 */
const validUserAccountAndPassword = (email, password) => {
    //in a real world scenario this helper function would send a request to the server and wait for a response

    let userAccountsString = retrieveFromLocalStorage(LOCAL_STORAGE_KEYS.USER_ACCOUNT_DATA);

    let userAccounts = null;
    if(userAccountsString === null) {
        userAccounts = {}
    }
    else {
        userAccounts = JSON.parse(userAccountsString);
    }

    if(email in userAccounts) {
        if(userAccounts[email].email === email && userAccounts[email].password === password) {
            return true;
        }
    }
    return false;
};


export default validUserAccountAndPassword;
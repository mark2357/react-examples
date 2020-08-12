import { storeInLocalStorage, retrieveFromLocalStorage } from '../../../../global/helpers/localStorageHelpers';
import LOCAL_STORAGE_KEYS from '../../../../global/constants/localStorageKeys';

/**
 * @description
 * @param {string} email the email that is being checked
 */
const saveUserAccount = (email, password, override) => {
    //in a real world scenario this helper function would send a request to the server and wait for a response

    let userAccountsString = retrieveFromLocalStorage(LOCAL_STORAGE_KEYS.USER_ACCOUNT_DATA);

    let userAccounts = null;
    if(userAccountsString === null) {
        userAccounts = {}
    }
    else {
        userAccounts = JSON.parse(userAccountsString);
    }
    // account already exists
    if(email in userAccounts && !override) {
        console.warn('cannot save new user account as one already exists with this email and override is set to false');
        return;
    }
    userAccounts[email] = {
        email: email,
        password: password
    };
    storeInLocalStorage(LOCAL_STORAGE_KEYS.USER_ACCOUNT_DATA, JSON.stringify(userAccounts));
};


export default saveUserAccount;
import { storeInLocalStorage, retrieveFromLocalStorage } from '../../../global/helpers/localStorageHelpers';
import LOCAL_STORAGE_KEYS from '../../../global/constants/localStorageKeys';

/**
 * @description
 * @param {string} email the email that is being checked
 */
const saveNewUserAccount = (email, password) => {
    //in a real world scenario this helper function would send a request to the server and wait for a response

    let userAccountsString = retrieveFromLocalStorage(LOCAL_STORAGE_KEYS.USER_ACCOUNT_DATA);

    let userAccounts = null;
    if(userAccountsString === null) {
        userAccounts = {}
    }
    else {
        userAccounts = JSON.parse(userAccountsString);
    }

    userAccounts[email] = {
        email: email,
        password: password
    };
    storeInLocalStorage(LOCAL_STORAGE_KEYS.USER_ACCOUNT_DATA, JSON.stringify(userAccounts));
};


export default saveNewUserAccount;
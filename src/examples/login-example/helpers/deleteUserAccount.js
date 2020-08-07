import { storeInLocalStorage, retrieveFromLocalStorage } from '../../../global/helpers/localStorageHelpers';
import LOCAL_STORAGE_KEYS from '../../../global/constants/localStorageKeys';

/**
 * @description
 * deletes the user account for the given email
 * @param {string} email
 */
const deleteUserAccount = (email) => {
    //in a real world scenario this helper function would send a request to the server with an auth token and wait for a response

    console.log('deleteUserAccount called');
    let userAccountsString = retrieveFromLocalStorage(LOCAL_STORAGE_KEYS.USER_ACCOUNT_DATA);

    let userAccounts = null;
    if(userAccountsString === null) {
        //returns as there is no user account to delete
        return;
    }
    else {
        userAccounts = JSON.parse(userAccountsString);
    }

    if(email in userAccounts) {
        delete userAccounts[email];
        storeInLocalStorage(LOCAL_STORAGE_KEYS.USER_ACCOUNT_DATA, JSON.stringify(userAccounts));
    }
};


export default deleteUserAccount;
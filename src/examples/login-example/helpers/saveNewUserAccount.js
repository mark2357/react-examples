

import { storeInLocalStorage, retrieveFromLocalStorage } from '../../../global/helpers/localStorageHelpers';

/**
 * @description
 * @param { string } email the email that is being checked
 * returns true when a user account exists for the given email 
 */
const saveNewUserAccount = (email, password) => {
    //in a real world scenario this helper function would send a request to the server and wait for a response

    // TODO: convert user-account-data to a constant
    let userAccountsString = retrieveFromLocalStorage('user-account-data');

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
    storeInLocalStorage('user-account-data', JSON.stringify(userAccounts));
};


export default saveNewUserAccount;
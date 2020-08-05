

import { retrieveFromLocalStorage } from '../../../global/helpers/localStorageHelpers';

const validUserAccountAndPassword = (email, password) => {
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

    if(userAccounts[email] !== undefined) {
        if(userAccounts[email].email === email && userAccounts[email].password === password) {
            return true;
        }
    }
    return false;
};


export default validUserAccountAndPassword;
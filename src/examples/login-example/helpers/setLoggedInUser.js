import { storeInLocalStorage } from '../../../global/helpers/localStorageHelpers';

/**
 * @description
 * sets the currently logged in user
 * @param {string} email the email of the new logged in user
 */
const setLoggedInUser = (email) => {
    //in a real world scenario this helper function would send a request to the server which would send back a token to store
    storeInLocalStorage('logged-in-user', email);
};


export default setLoggedInUser
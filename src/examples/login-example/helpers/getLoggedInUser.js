import { retrieveFromLocalStorage } from '../../../global/helpers/localStorageHelpers';


/**\
 * @description
 * returns the logged in users username, or null if there is no logged in user
 * @returns {string | null}
 */
const getLoggedInUser = () => {
    //in a real world scenario this would retrieve a token from local storage
    // then use that token to retrieve the logged in users details from the server

    // TODO: convert logged-in-user to a constant
    let loggedInUserString = retrieveFromLocalStorage('logged-in-user');

    // no logged in user
    if(loggedInUserString === null) {
        return null;
    }
    else {
        return loggedInUserString;
    }
};

export default getLoggedInUser;
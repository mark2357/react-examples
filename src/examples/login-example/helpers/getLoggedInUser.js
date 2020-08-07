import { retrieveFromLocalStorage } from '../../../global/helpers/localStorageHelpers';
import LOCAL_STORAGE_KEYS from '../../../global/constants/localStorageKeys';

/**
 * @description
 * returns the logged in users username, or null if there is no logged in user
 * @returns {string | null}
 */
const getLoggedInUser = () => {
    //in a real world scenario this would retrieve a token from local storage
    // then use that token to retrieve the logged in users details from the server

    let loggedInUserString = retrieveFromLocalStorage(LOCAL_STORAGE_KEYS.LOGGED_IN_USER);

    // no logged in user
    if(loggedInUserString === null) {
        return null;
    }
    else {
        return loggedInUserString;
    }
};

export default getLoggedInUser;
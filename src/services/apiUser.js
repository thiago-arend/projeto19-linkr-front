import axios from "axios";

function verifyFriendsExistence(token) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/followed`, {}, auth);
    return promise;
}

function selectSearchResults(token, str) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/search-users`, str, auth);
    return promise;
}

const apiUser = { verifyFriendsExistence, selectSearchResults };
export default apiUser;
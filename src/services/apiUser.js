import axios from "axios";

function verifyFriendsExistence(token) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/followed`, {}, auth);
    return promise;
}

const apiUser = { verifyFriendsExistence };
export default apiUser;
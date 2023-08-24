import axios from "axios";

function verifyFriendsExistence(token) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/followed`, {}, auth);
    return promise;
}

function verifyFollowingUser(token, id) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/is-following/${id}`, {}, auth);
    return promise;
}

function followUser(token, id) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/${id}/follow`, {}, auth);
    return promise;
}

function unfollowUser(token, id) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/${id}/unfollow`, {}, auth);
    return promise;
}

const apiUser = { verifyFriendsExistence, verifyFollowingUser, followUser, unfollowUser };
export default apiUser;
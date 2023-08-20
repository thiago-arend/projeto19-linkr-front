import axios from "axios";
//import dotenv from "dotenv";

function signOut(token) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/signout`, {}, auth);
    return promise;
}

function getUser(token) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/autenticated-user`, auth);

    return promise;
}

const apiAuth = { signOut, getUser };
export default apiAuth;
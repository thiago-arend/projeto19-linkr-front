import axios from "axios";
//import dotev from "dotenv";

function signOut(token) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/signout`, {}, auth);
    return promise;
}

const apiAuth = { signOut };
export default apiAuth;
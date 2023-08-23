import axios from "axios";

function getTimelinePosts(token) {

    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/posts/timeline`, auth);
    return promise;
}

const apiPosts= { getTimelinePosts };
export default apiPosts;
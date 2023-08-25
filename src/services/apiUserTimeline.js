import axios from "axios";

function getUserTimeline(id) {

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/posts/user/${id}`);
    return promise;
}

const apiUserTimeline = { getUserTimeline };
export default apiUserTimeline;
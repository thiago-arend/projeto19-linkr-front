import axios from "axios";

function getTrendingHashtags() {

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/trending`);
    return promise;
}

const apiHashtag = { getTrendingHashtags };
export default apiHashtag;
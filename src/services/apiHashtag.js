import axios from "axios";

function getTrendingHashtags() {

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/trending`);
    return promise;
}

function getPostsByHashtag(hashtag) {

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`);
    return promise;
}

const apiHashtag = { getTrendingHashtags, getPostsByHashtag };
export default apiHashtag;
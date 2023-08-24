import axios from "axios";

function getPost() {

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/posts/timeline`);
    return promise;
}

const apiPost = { getPost };
export default apiPost;
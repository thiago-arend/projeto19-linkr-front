import axios from "axios";

function getTimelinePosts(token) {

    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/posts/timeline`, auth);
    return promise;
}

function likePost(token, postId) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/post/${postId}/like`, {}, auth);
    return promise;
}

function dislikePost(token, postId) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/post/${postId}/dislike`, {}, auth);
    return promise;
}

function addRepost(token, postId) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/respost/${postId}`, {}, auth);
    return promise;
}

function addComment(token, postId, comment) {
    const auth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/post/${postId}/comment`,
    {comment: comment}, auth);
    return promise;
}

const apiPosts= { getTimelinePosts, likePost, dislikePost, addRepost, addComment };
export default apiPosts;
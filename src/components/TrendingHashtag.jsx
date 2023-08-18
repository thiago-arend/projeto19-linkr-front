import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiHashtag from "../services/apiHashtag";

export default function TrendingHashtag(props) {
    const { hashtag } = props.hashtag;
    const { setPosts } = props;
    const navigate = useNavigate();

    function handleClick() {
        
        apiHashtag.getPostsByHashtag(hashtag)
            .then((res) => {

                setPosts(res.data);
                navigate(`/hashtag/${hashtag}`);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    return (
        <Hashtag onClick={handleClick}># {hashtag}</Hashtag>
    );
}

const Hashtag = styled.li`
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    color: #FFF;
    font-weight: bold;
    margin: 12px 0;

    &:hover {
        cursor: pointer;
    }
`;
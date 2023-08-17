import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function TrendingHashtag(props) {
    const { hashtag } = props.hashtag;
    const navigate = useNavigate();

    return (
        <Hashtag onClick={() => navigate(`/hashtag/${hashtag}`)}># {hashtag}</Hashtag>
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
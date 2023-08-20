import { useEffect, useState } from "react";
import styled from "styled-components";
import apiHashtag from "../services/apiHashtag";
import { useLocation } from "react-router-dom";
import TrendingHashtag from "../components/TrendingHashtag";
import Navbar from "../components/Navbar";

export default function HashtagPage(props) {
    const { trendingHashtags, setTrendingHashtags, posts, setPosts } = props;
    const hashtag = useLocation().pathname.split("/")[2];
    console.log(posts);

    useEffect(() => {
        apiHashtag.getTrendingHashtags()
            .then((res) => {
                setTrendingHashtags(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });

        apiHashtag.getPostsByHashtag(hashtag)
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);

    return (
        <>
            <Navbar />
            <PageContainer>

                <SuperContent>
                    <HashtagTitle># {hashtag}</HashtagTitle>
                    <ContentContainer>
                        <TimelineContainer></TimelineContainer>
                        <TrendingContainer>
                            <TrendingHeader>
                                <h1>trending</h1>
                                <div></div>
                            </TrendingHeader>
                            <TrendingContent>
                                <ol>
                                    {trendingHashtags && trendingHashtags.map(h => <TrendingHashtag
                                        setPosts={setPosts}
                                        key={h.hashtag}
                                        hashtag={h} />)}
                                </ol>
                            </TrendingContent>
                        </TrendingContainer>
                    </ContentContainer>
                </SuperContent>
            </PageContainer>
        </>
    );
}

const PageContainer = styled.div`
    background-color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: calc(100vh - 72px);
    margin: 72px 0 0;
`;

const TrendingContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #171717;
    width: 301px;
    height: 426px;
    border-radius: 20px;
`;

const TrendingContent = styled.div`
    position: absolute;
    bottom: 44px;
    left: 20px;
    right: 20px;
    height: 300px;
    width: 261px;

    ol {
        list-style-type: none;
    }
`;

const TrendingHeader = styled.div`
    position: absolute;
    top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    width: 100%;
    height: 50px;

    h1 {
        margin-left: 20px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: bold;
        color: #FFF;
    }

    div {
        height: 2px;
        background-color: #484848;
        width: 100%;
    }
`;

const SuperContent = styled.div`
    height: 500px;
`;

const TimelineContainer = styled.div`
    background-color: red;
    width: 611px;
    height: 600px;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1040px;
`;

const HashtagTitle = styled.div`
    width: 651px;
    height: 100px;

    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: bold;
    color: #FFF;
`;
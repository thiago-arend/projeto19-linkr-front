import Post from "../components/Post";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import apiHashtag from "../services/apiHashtag";
import TrendingHashtag from "../components/TrendingHashtag";
import { UserContext } from "../contexts/userContext";
import defaultAvatar from "../assets/default-avatar.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiAuth from "../services/apiAuth";
import Navbar from "../components/Navbar";
import apiPosts from "../services/apiPosts";
import apiUser from "../services/apiUser";
import FollowButton from "../components/FollowButton";


export default function TimelinePage(props) {
    const { trendingHashtags, setTrendingHashtags, setPosts } = props;
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [userImage, setUserImage] = useState(undefined);
    const [timelinePosts, setTimelinePosts] = useState([]);
    const [userHasFriends, setUserHasFriends] = useState(false);

    useEffect(() => {
        if (!user) return navigate("/")

        apiAuth.getUser(user.token)
            .then((res) => {
                setUserImage(res.data.photoUrl);
            })
            .catch((err) => {
                console.log(err.response.data);
            });

        apiHashtag.getTrendingHashtags()
            .then((res) => {
                setTrendingHashtags(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });

        apiPosts.getTimelinePosts(user.token)
            .then((res) => {
                console.log(res.data);
                setTimelinePosts(res.data)
            })
            .catch((err) => {
                console.log(err.response.data);
            });

        apiUser.verifyFriendsExistence(user.token)
            .then((res) => {
                /*console.log(res.data);*/
                setUserHasFriends(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });

    }, []);

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setPost(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsButtonDisabled(true);

        try {
            await publishPost();
        } finally {
            setIsButtonDisabled(false);
            setPost({});
        }
    };

    async function publishPost() {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/timeline`,
                { ...post, userId: user.userId },
                config
            );

            console.log("Ok!");
            navigate("/timeline");
        } catch (err) {
            alert("There was an error when publishing your link!");
        }
    }


    return (
        <>
            <Navbar />
            <PageContainer>

                <SuperContent>
                    <TimelineTitle>timeline</TimelineTitle>
                    <ContentContainer>
                        <TimelineContainer>
                            <PublishContainer>
                                <AvatarContainer><img src={userImage ? userImage : defaultAvatar} /></AvatarContainer>
                                <PostCreationContainer data-test="publish-box">
                                    <h1>What are you going to share today?</h1>
                                    <form onSubmit={handleSubmit}>
                                        <input data-test="link"
                                            required type="url"
                                            placeholder="http:// ..."
                                            name="url"
                                            value={post.url || ""}
                                            onChange={handleChange}
                                            disabled={isButtonDisabled}
                                        />
                                        <input data-test="description"
                                            type="description"
                                            placeholder="Awesome article about #javascript"
                                            name="description"
                                            value={post.description || ""}
                                            onChange={handleChange}
                                            disabled={isButtonDisabled}
                                        />
                                        <button data-test="publish-btn"
                                            type="submit"
                                            disabled={isButtonDisabled}
                                        >{isButtonDisabled ? "Publishing..." : "Publish"}
                                        </button>
                                    </form>
                                </PostCreationContainer>
                            </PublishContainer>
                            <PostsContainer>
                                <FollowButton />
                                {(userHasFriends === false)
                                    ?
                                    <Message data-test="message">You don't follow anyone yet. Search for new friends!</Message>
                                    :
                                    (
                                        (timelinePosts.length === 0)
                                            ?
                                            <Message>No posts found from your friends</Message>
                                            :
                                            timelinePosts.map(p => <Post post={p} />
                                            )
                                    )}
                            </PostsContainer>
                        </TimelineContainer>
                        <TrendingContainer data-test="trending">
                            <TrendingHeader>
                                <h1>trending</h1>
                                <div></div>
                            </TrendingHeader>
                            <TrendingContent>
                                <ol>
                                    {trendingHashtags && trendingHashtags.map(h => <TrendingHashtag  data-test="hashtag"
                                        key={h.hashtag}
                                        hashtag={h}
                                        setPosts={setPosts} />)}
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

const Message = styled.h1`
    margin-left: 20px;
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: bold;
    color: #FFF;
`

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

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 700px;
    height: 600px;
    padding-bottom: 20px;
`;

const PostsContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1040px;
`;

const SuperContent = styled.div`
    height: 500px;
`;

const TimelineTitle = styled.div`
    width: 651px;
    height: 100px;

    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: bold;
    color: #FFF;
`;

const PublishContainer = styled.div`
  width: 100%;
  min-height: 209px;
  border-radius: 16px;
  display: flex;
  justify-content: space-around;
  background: #ffffff;
  margin-bottom: 30px;
`

const AvatarContainer = styled.div`
  height:  23.22222222222222vh;
  width: 3.0729166666666665vw; 
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 12px;
    margin-left: 8px;
  }
`

const PostCreationContainer = styled.div`
  margin-right: 10px;
  width: 26.145833333333332vw;
  height: 23.22222222222222vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h1 {
    font-family: Lato;
    font-size: 20px;
    font-weight: 300;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #707070;
    margin-top: 10px;
  }

  input {
    width: 26.145833333333332vw;
    height: 7.333333333333333vh;
    margin-bottom: 5px;
    border-radius: 5px;
    border: none;
    background: #efefef;
    font-family: Lato;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: #949494;
  }

  input:first-child {
    height: 3.3333333333333335vh;
  }

  button {
    width: 112px;
    height: 31px;
    border-radius: 5px;
    border: none;
    background: #1877F2;
    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFFFFF;
    float: right;
  }
`

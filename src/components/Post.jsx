import styled from "styled-components";
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import avatar from "../assets/default-avatar.jpg"
import { useEffect, useState, useContext } from "react";
import editIcon from "../assets/dashicons_edit.png";
import trashCan from "../assets/trashcan.png";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import apiPosts from "../services/apiPosts";

export default function Post(props) {
    const {
        hashtags, likedByViwer, photoUrl, numberOfLikes,
        postDescription, postId, postOwner, postUrl, whoLiked,
        numberOfComments, numberOfReposts, Comments
    } = props.post;
    let [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(likedByViwer);
    const [likesCount, setLikesCount] = useState(Number(numberOfLikes));
    const [repostModal, setrepostModal] = useState(true);
    const [repostsCount, setrepostsCount] = useState(Number(numberOfReposts));
    const [CommentsCount, setCommentsCount] = useState(Number(numberOfComments));
    const [commentSection, setcommentSection] = useState(false);
    const [repostedByYou, setrepostedByYou] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedDescription, setEditedDescription] = useState(postDescription);
    const { user } = useContext(UserContext)

    function handleLike() {
        if (!liked) {
            apiPosts.likePost(user.token, postId)
                .then(() => {
                    setLikesCount(likesCount + 1);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });

        } else {
            apiPosts.dislikePost(user.token, postId)
                .then(() => {
                    setLikesCount(likesCount - 1);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        }

        setLiked(!liked);
    }

    function openRepostModal() {
        setrepostModal(!repostModal)
    }
    function openComments() {
        setcommentSection(!commentSection)
    }
    function addComment(e) {
        e.preventDefault();
        apiPosts.addComment(user.token, postId, newComment)
            .then((res) => {
                setCommentsCount(CommentsCount + 1)
            })
            .catch((res) => {
                console.log(res)
            })
        setNewComment('');
    }
    function addComment2() {
        apiPosts.addComment(user.token, postId, newComment)
            .then((res) => {
                setCommentsCount(CommentsCount + 1)
            })
            .catch((res) => {
                console.log(res)
            })
        setNewComment('');
    }

    function addRepost(postId) {
        apiPosts.addRepost(user.token, postId)
            .then((res) => {
                setrepostsCount(repostsCount + 1)
                setrepostedByYou(true)
            })
            .catch((res) => {
                if (res.response.data == "This repost is alredy done!") {
                    setrepostedByYou(true)
                }
                console.log(res)
            })
        setrepostModal(!repostModal)
    }

    function showWhoLiked() {
        if (whoLiked === null) return;

        if (whoLiked.length > 2)
            alert(`Curtido por ${whoLiked[0]}, ${whoLiked[1]} e outras ${whoLiked.slice(2).length} pessoas`)
        else if (whoLiked.length === 2)
            alert(`Curtido por ${whoLiked[0]} e ${whoLiked[1]}`);
        else
            alert(`Curtido por ${whoLiked[0]}`);
    }

    function handleEditClick() {
        setEditMode(true);
    }

    function handleSaveEdit() {
        setEditedDescription(editedDescription);
        setEditMode(false);

        editPost()
    }

    function editPost() {
        const config = { headers: { Authorization: `Bearer ${user.token}` } }

        const updatedPostData = {
            description: editedDescription,
        }

        axios.put(`${process.env.REACT_APP_API_URL}/post/${postId}`, updatedPostData, config)
            .then(response => {
                console.log("Post updated successfully", response.data);
            })
            .catch(error => {
                console.error("Error updating post", error);
            })
    }

    return (
        <>
            <RepostModal escondido={repostModal} >
                <div>
                    <span>
                        Do you want to re-post this link?
                    </span>
                    <div>
                        <button onClick={() => openRepostModal()} > No, cancel </button>
                        <button onClick={() => addRepost(postId)}> Yes, share! </button>
                    </div>
                </div>
            </RepostModal>

            <PostContainer data-test="post" opencomments={commentSection}>
                <RepostedByYou escondido={setrepostedByYou}>
                    Re-posted by you
                </RepostedByYou>
                <LeftSide>
                    <img src={photoUrl && photoUrl} />
                    <LeftSideIcons>
                        <ion-icon data-test="like-btn" onClick={handleLike} liked={liked} name={liked ? "heart" : "heart-outline"}></ion-icon>
                        <span data-test="counter" onClick={showWhoLiked}> {likesCount} likes </span>
                    </LeftSideIcons>
                    <LeftSideIcons onClick={() => openComments()}>
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                        <span> {CommentsCount} comments </span>
                    </LeftSideIcons>
                    <LeftSideIcons>
                        <ion-icon onClick={() => openRepostModal()} name="git-compare-outline"></ion-icon>
                        <span> {repostsCount} re-posts </span>
                    </LeftSideIcons>
                </LeftSide>
                <RightSide>
                    <AuthorName>
                        {postOwner}
                        <div>
                            <img src={editIcon} onClick={handleEditClick} />
                            <img src={trashCan} />
                        </div>

                    </AuthorName>
                    {editMode ? (
                        <EditDescriptionInput
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                    ) : (
                        <PostDescription>
                            {editedDescription} {hashtags && hashtags.map(h => <span>{`#${h} `}</span>)}<br />
                            {postUrl}
                        </PostDescription>
                    )}
                    {editMode && <button onClick={handleSaveEdit}>Save</button>}
                </RightSide>
                <CommentsContainer escondido={!commentSection}>
                    {(Comments.length !== 0 && Comments[0].id !== null)
                        ?
                        Comments.map(comentario => {
                            return (
                                <div key={comentario.id}>
                                    <img src={comentario.commentatorPfp} alt="" />
                                    <div>
                                        <h1> {comentario.commentatorName} </h1>
                                        <h2> {comentario.commentary} </h2>
                                    </div>

                                </div>)
                        })
                        :
                        <span> Nenhum comentário até agora </span>
                    }
                    <NewCommentContainer onSubmit={addComment}>
                        <img src={avatar} alt="" />
                        <input 
                            type="text"
                            placeholder="write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <ion-icon onClick={() => addComment2()} name="paper-plane-outline"></ion-icon>
                    </NewCommentContainer>
                </CommentsContainer>
                
            </PostContainer>
        </>
    )

}
const PostContainer = styled.div`
    gap: 10px;
    width: 100%;
    height: 276px;
    border: 1px;
    border-radius: 10px;
    background-color: #171717;
    margin-bottom: 14px;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: ${props => props.opencomments ? '200px' : '0px'};
`;

const AuthorName = styled.h1`
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    color: #FFF;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    img:nth-child(2) {
        width: 14px;
        height: 14px;
        float: right;
        margin-left: 5px;
        
    }

    img {
        width: 23px;
        height: 23px;
        cursor: pointer;
    }
`;

const PostDescription = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    color: #B7B7B7;
    width: 100%;
    overflow: hidden;
    span {
        font-weight: bold;
        color: #FFF;
    }
`;

const LeftSide = styled.div`
    box-sizing: border-box;
    width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 15px;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    padding-left: 30px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 100%;
    }
    
`
const LeftSideIcons = styled.div`
    width: 150%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ion-icon {
        color: ${props => props.liked ? 'red' : 'white'};
        font-size: 20px;
        cursor: pointer;
    }
    span {
        color: #FFFFFF;
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: center;
    }
`
const RightSide = styled.div`
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 85%;
    height: 100%;
    h1 {
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        color: #FFFFFF;
    }
    h2 {
        font-family: Lato;
        font-size: 17px;
        font-weight: 400;
        color: #FFFFFF;
    }
`
const EditDescriptionInput = styled.textarea`
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    color: #B7B7B7;
    background-color: #171717;
    border: none;
    resize: none;
    width: 90%;
    padding: 8px;
    border-radius: 5px;
    background: white;
`
const RepostModal = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1000;

    display: ${props => props.escondido ? 'none' : 'flex'};
    width: 100vw;
    height: 100vh;
    background-color: white;
    opacity: 90%;

    div {
        z-index: 1001;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 596px;
        height: 210px;
        position: fixed;
        top: calc(50% - 105px);
        left: calc(50% - 298px);
        border-radius: 20px;
        background-color: #333333;

        span {
            font-family: Lato;
            font-size: 29px;
            font-weight: 700;
            line-height: 35px;
            letter-spacing: 0em;
            text-align: center;
            color: #FFFFFF;
        }
        div {
            position: unset;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            button {
                width: 134px;
                height: 37px;
                border-radius: 5px;
            }
        }
    }
`
const RepostedByYou = styled.div`
    z-index: -1;
    background-color: #1E1E1E;
    width: 100%;
    height: 220px;
    position: absolute;
    top: -25px;
    left: 0px;
    padding-top: 5px;
    border-radius: 16px;
    text-align: center;
    display: ${props => props.escondido ? 'none' : 'flex'};
`

const CommentsContainer = styled.div`
    padding-bottom: 80px;
    position: relative;
    box-sizing: border-box;
    z-index: -1;
    background-color: #1E1E1E;
    width: 100%;
    height: 220px;

    overflow-y: scroll;


    position: absolute;
    top: 195px;
    left: 0px;
    padding-top: 5px;
    border-radius: 16px;
    text-align: center;
    display: ${props => props.escondido ? 'none' : 'flex'};
    flex-direction: column;
    padding: 30px;
    justify-content: flex-start;
    align-items: space-evenly ;
    span {
        color: white;
    }
    div {
        padding-bottom: 5px;
        border-bottom: 1px solid #353535;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        img {
            width: 39px;
            height: 39px;
            border-radius: 100%;
        }
        div {
            padding: 7.5px;
            border: unset;

            display: flex;
            flex-direction: column;
            h1 {
                font-family: Lato;
                font-size: 14px;
                font-weight: 700;
                line-height: 17px;
                letter-spacing: 0em;
                text-align: left;
                color: #f3f3f3;
            }
            h2 {
                font-family: Lato;
                font-size: 14px;
                font-weight: 400;
                line-height: 17px;
                letter-spacing: 0em;
                text-align: left;
                color: #ACACAC;
            }
        }
    }
`

const NewCommentContainer = styled.form`
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 95%;
    position: sticky;
    left: 20px;
    bottom: -40px;
    gap: 20px;
    img {
            width: 39px;
            height: 39px;
            border-radius: 100%;
        }
    input {
        width: 510px;
        height: 39px;
        border-radius: 8px;
        background-color: #252525;
    }
    ion-icon {
        font-size: 25px;
        position: absolute;
        bottom: 10px;
        right: 25px;
        color: white;
        cursor: pointer;
    }
`
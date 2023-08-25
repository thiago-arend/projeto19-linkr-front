import styled from "styled-components";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { useEffect, useState, useContext } from "react";
import editIcon from "../assets/dashicons_edit.png";
import trashCan from "../assets/trashcan.png";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import apiPosts from "../services/apiPosts";

export default function Post(props) {
    const { hashtags, likedByViwer, photoUrl, numberOfLikes, postDescription, postId, postOwner, postUrl, whoLiked } = props.post;
    const [liked, setLiked] = useState(likedByViwer);
    const [likesCount, setLikesCount] = useState(Number(numberOfLikes));
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
        <PostContainer>
            <LeftSide>
                <img src={photoUrl && photoUrl} />
                <ion-icon onClick={handleLike} liked={liked} name={liked ? "heart" : "heart-outline"}></ion-icon>
                <span onClick={showWhoLiked}> {likesCount} likes </span>
            </LeftSide>
            <RightSide>
                <AuthorName>
                    {postOwner} <img src={trashCan} /> <img src={editIcon} onClick={handleEditClick} />
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
        </PostContainer>
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
    
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AuthorName = styled.h1`
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    color: #FFF;

    img {
        width: 14px;
        height: 14px;
        float: right;
        margin-left: 5px;
    }

    img:nth-child(2) {
        width: 23px;
        height: 23px;
    }
`;

const PostDescription = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    color: #B7B7B7;

    span {
        font-weight: bold;
        color: #FFF;
    }
`;

const LeftSide = styled.div`
    box-sizing: border-box;
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 15px;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 100%;
    }
    ion-icon {
        color: ${props => props.liked ? 'red' : 'white'};
        font-size: 40px;
    }
    span {
        font-family: Lato;
        color: white;
        font-size: 15px;
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
    width: 100%;
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
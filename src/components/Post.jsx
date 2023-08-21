import styled from "styled-components";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { useEffect, useState, useContext } from "react";
import editIcon from "../assets/dashicons_edit.png";
import trashCan from "../assets/trashcan.png";
import axios from "axios";
import { UserContext } from "../contexts/userContext";

export default function Post(props) {
    const { description, id, likeCount, photoUrl, url, username, whoLikedList } = props.post;
    const { hashtags } = props;
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likeCount);
    const [editMode, setEditMode] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const { user } = useContext(UserContext)

    useEffect(() => {
        setLikesCount(likeCount);
    }, []);

    function handleLike() {
        if (!liked) {
            setLikesCount(likesCount + 1);
        } else {
            setLikesCount(likesCount - 1);
        }

        setLiked(!liked);
    }

    function showWhoLiked() {
        if (whoLikedList === null) return;

        if (whoLikedList.length > 2)
            alert(`Curtido por ${whoLikedList[0]}, ${whoLikedList[1]} e outras ${whoLikedList.slice(2).length} pessoas`)
        else if (whoLikedList.length === 2)
            alert(`Curtido por ${whoLikedList[0]} e ${whoLikedList[1]}`);
        else
            alert(`Curtido por ${whoLikedList[0]}`);
    }

    function handleEditClick() {
        setEditMode(true);
    }

    function handleSaveEdit() {
        // Update the description with the edited content
        setEditedDescription(editedDescription);
        setEditMode(false);

        editPost()
    }

    function editPost() {
        const config = { headers: { Authorization: `Bearer ${user.token}` } }

        const updatedPostData = {
            description: editedDescription, // Use the edited description from state
            // Add other properties if needed
        }

        axios.put(`${process.env.REACT_APP_API_URL}/post/${id}`, updatedPostData, config)
            .then(response => {
                console.log("Post updated successfully", response.data);
                // You might want to update your component's state or trigger some UI change here
            })
            .catch(error => {
                console.error("Error updating post", error);
                // Handle errors or show an error message to the user
            })
    }

    return (
        <PostContainer>
            <LeftSide>
                <img src={photoUrl} />
                <ion-icon onClick={handleLike} liked={liked} name={liked ? "heart" : "heart-outline"}></ion-icon>
                <span onClick={showWhoLiked}> {likesCount} likes </span>
            </LeftSide>
            <RightSide>
                <AuthorName>
                    {username} <img src={trashCan} /> <img src={editIcon} onClick={handleEditClick} />
                </AuthorName>
                {/* Display the description or the input field based on editMode */}
                {editMode ? (
                    <EditDescriptionInput
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                ) : (
                    <PostDescription>
                        {editedDescription} {hashtags.map(h => <span>{`#${h} `}</span>)}
                    </PostDescription>
                )}
                <LinkPreview url={"https://www.google.com.br/"} width='100%' />
                {/* Display the save button if in edit mode */}
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
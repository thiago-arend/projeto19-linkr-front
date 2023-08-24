import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import apiUser from "../services/apiUser";
import { UserContext } from "../contexts/userContext";

export default function FollowButton() {
    //const id = Number(useLocation().pathname.split("/")[1]);
    const id = 2;
    const { user } = useContext(UserContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isAbled, setIsAbled] = useState(true);

    useEffect(() => {
        apiUser.verifyFollowingUser(user.token, id)
            .then((res) => {
                setIsFollowing(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);

    function handleFollow() {
        setIsAbled(false);

        if (!isFollowing) {

            apiUser.followUser(user.token, id)
            .then(() => {
                setIsAbled(true);
                setIsFollowing(true);
            })
            .catch(() => {
                alert("It was not possible to follow the user. Try again later!");
            });
        } else {

            apiUser.unfollowUser(user.token, id)
            .then(() => {
                setIsAbled(true);
                setIsFollowing(false);
            })
            .catch(() => {
                alert("It was not possible to unfollow the user. Try again later!");
            });
        }
    }

    if (user.userId === id) return;
    
    return (
        <StyledButton disabled={!isAbled} onClick={handleFollow} >{isFollowing ? "Unfollow" : "Follow"}</StyledButton>
    )
}

const StyledButton = styled.button`
    width: 112px;
    height: 31px;
    border-radius: 5px;
    border: none;
    background: #1877F2;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFFFFF;
    
    &:disabled {
        color: #1877F2;
        background-color: #FFF;
    }
`;
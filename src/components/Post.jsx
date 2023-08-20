import styled from "styled-components";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import img from "../assets/profile-image.jpeg"

export default function Post(props) {
    let { 
        postOwner, postUrl, postDescription, 
        numberOfLikes, likedByViewer
    } = props;
        return(
            <PostContainer>
                <LeftSide>
                    <img src={img} />
                    <ion-icon liked={likedByViewer? true: false} name={likedByViewer? 'heart': 'heart-outline'}></ion-icon>
                    <span> {numberOfLikes} likes </span>
                </LeftSide>
                <RightSide>
                    <h1>
                        {postOwner}
                    </h1>
                    <h2>
                        {postDescription} {"#hashtagsdopost"}
                    </h2>
                    <LinkPreview url={postUrl} width='400px' />
                </RightSide>
            </PostContainer>
        )

}
const PostContainer = styled.div`
    * {
        box-sizing: border-box;
    }
    gap: 10px;
    width: 611px;
    height: 276px;
    border: 1px;
    padding: 20px;
    border-radius: 10px;
    background-color: #171717;
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`
const LeftSide = styled.div`
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: flex-start;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
        border-radius: 100%;
    }
    border: 1px solid red;
    ion-icon {
        color: ${props => props.liked === true? 'white' : 'red'};
        font-size: 40px;
    }
    span {
        font-family: Lato;
        color: white;
        font-size: 15px;
    }
`
const RightSide = styled.div`
    padding: 10px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    border: 1px solid blue;
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

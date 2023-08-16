import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [buttonStatus, setbuttonStatus] = useState(0)

    const handleSignUp = async () => {

        setbuttonStatus(1)

        const data = {
            email: email,
            name: name,
            password: password,
            confirmPassword: confirmPassword,
            photoUrl: photoURL,
        }

        if (!email || !name || !password || !confirmPassword) {
            alert('Please fill in all fields.');
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, data);
                console.log(response.data);
                alert(response.data)
                setbuttonStatus(0)
                navigate('/');
            } catch (error) {
                alert(`Error: ${error.message}`);
                setbuttonStatus(0)
                console.error(error.message);
            }
        }


    }



    return (
        <SingUpContainer>
            <GrayBox>
            </GrayBox>
            <SignUpDiv>
                <SignUpForm>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="text" placeholder="Username" value={name} onChange={(e) => setname(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Input type="text" placeholder="Photo URL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                    <SignUpButton buttonstatus={buttonStatus} onClick={handleSignUp}>Sign Up</SignUpButton>
                    <p> <Link to="/">Switch back to login</Link></p>
                </SignUpForm>
            </SignUpDiv>
        </SingUpContainer>
    );

}

const SingUpContainer = styled.section`
    width: 1440px;
    height: 100%;
    background-color: red;
    display: flex;
    justify-content: center; 
    align-items: center;
`;

const GrayBox = styled.div`
    width: 905px;
    height: 1024px;
    background-color: #151515;
`;

const SignUpDiv = styled.div`
    height: 1024px;
    width: 535px;
    background-color: blue;
    display: flex;
    justify-content: center; 
    align-items: center; 
`;

const SignUpForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;

    p a {
        color: white;
    }
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SignUpButton = styled.button`
    padding: 10px 20px;
    background-color: ${props => props.buttonstatus === 1 ? '#ccc' : '#007bff'};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: ${props => props.buttonstatus === 1 ? 'not-allowed' : 'pointer'};
`;


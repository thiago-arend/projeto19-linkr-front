import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    const handleSignUp = async () => {

        const data = {
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            photoUrl: photoURL,
        }


        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, data);

            console.log(response.data); // Trate a resposta da API conforme necessário
            navigate('/');



        } catch (error) {
            alert(error.message)
            console.error(error.message);
        }

    }



    return (
        <SingUpContainer>
            <GrayBox>
            </GrayBox>
            <SignUpDiv>
                <SignUpForm>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Input type="text" placeholder="Photo URL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                    <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
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
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
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
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
`;

const SignUpForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SignUpButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

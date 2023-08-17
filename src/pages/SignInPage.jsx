import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export default function SignInPage() {

    /* Variaveis de Estado */


    /* Configurações da Página */
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    const User = useContext(UserContext).UserData;
    const setUser = useContext(UserContext).SetUserData;

    /* Token: existencia + uso */

    useEffect(() => {
        /* Se houver um Token: */
        /*let token = localStorage.getItem("token");

        if (token && !User) {
          let promisse1 = axios.post(`${url}/checkLogin`, { token });
    
          promisse1.then((resposta) => {
    
            setUser({
              id: resposta.data.id,
              username: resposta.data.username,
              photoUrl: resposta.data.photoUrl
              email: resposta.data.email,
              token: resposta.data.token,
            });
            navigate("/home");
          });
        }*/
    }, []);




    return (
        <SingInContainer>
            
        </SingInContainer>
    );
}

const SingInContainer = styled.section`

`;

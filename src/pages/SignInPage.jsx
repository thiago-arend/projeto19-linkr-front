import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../App.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export default function SignInPage() {

    /* Variaveis de Estado */


    /* Configurações da Página */
    const navigate = useNavigate();
    /*const url = import.meta.env.VITE_API_URL;*/
    const User = useContext(UserContext).UserData;
    const setUser = useContext(UserContext).SetUserData;

    /* Token: existencia + uso */

    /* Se houver um Token: */
    useEffect(() => {

    }, []);




    return (
        <SingInContainer>
            Texto Texte para tela de Login
        </SingInContainer>
    );
}

const SingInContainer = styled.section`

`;

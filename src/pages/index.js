import axios from "axios";
import { UserContext } from "../App.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SingInContainer, TitleContainer, ContentContainer, FormContainer } from "./SignInPage/styled.js";

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

      <TitleContainer>
        <ContentContainer>
          <h1>Linkr</h1>
          <p>
            save, share and discover<br />the best links on the web
          </p>
        </ContentContainer>
      </TitleContainer>

      <FormContainer>
        <form>
          <input
            required
            type="email"
            placeholder="E-mail"
            name="email"
          />
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
          />
          <button type="submit">Log In</button>
        </form>

        <Link to="signup">
          First time? Create an account!
        </Link>
      </FormContainer>

    </SingInContainer>
  );
}
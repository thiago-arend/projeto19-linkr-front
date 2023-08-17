import styled from "styled-components";
import SignInPage from "./pages";
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const UserContext = createContext();

export default function App() {
  let [UserData, SetUserData] = useState(null);

  return (
    <UserContext.Provider value={{UserData, SetUserData}}>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </UserContext.Provider>
  );
}

const PagesContainer = styled.main`
  background-color: darkgray;
`;

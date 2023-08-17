import styled from "styled-components";
import SignInPage from "./pages/SignInPage";
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserProvider from "./contexts/userContext";
import HomePage from "./pages/HomePage";
import HashtagPage from "./pages/HashtagPage";

export const UserContext = createContext();

export default function App() {

  return (
    <UserProvider>
      {/*<PagesContainer>*/}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          </Routes>
        </BrowserRouter>
      {/*</PagesContainer>*/}
    </UserProvider>
  );
}

const PagesContainer = styled.div`
    background-color: red;
`;

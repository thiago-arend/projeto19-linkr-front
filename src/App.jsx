import styled from "styled-components";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"; 
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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

const PagesContainer = styled.div`
  background-color: red;
`;

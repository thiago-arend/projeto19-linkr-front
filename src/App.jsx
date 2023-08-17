import styled from "styled-components";
import SignInPage from "./pages/SignInPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserProvider from "./contexts/userContext";

export default function App() {

  return (
    <UserProvider>
      {/*<PagesContainer>*/}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
      {/*</PagesContainer>*/}
    </UserProvider>
  );
}

const PagesContainer = styled.div`
    background-color: red;
`;

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"; 
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserProvider from "./contexts/userContext";
import TimelinePage from "./pages/TimelinePage";
import HashtagPage from "./pages/HashtagPage";

export const UserContext = createContext();

export default function App() {
  const [trendingHashtags, setTrendingHashtags] = useState(undefined);
  const [posts, setPosts] = useState(undefined);

  return (
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/timeline" element={<TimelinePage setPosts={setPosts} trendingHashtags={trendingHashtags} setTrendingHashtags={setTrendingHashtags}/>} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage posts={posts} setPosts={setPosts} trendingHashtags={trendingHashtags} setTrendingHashtags={setTrendingHashtags}/>} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
    </UserProvider>
  );
}


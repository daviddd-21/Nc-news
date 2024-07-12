// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Articles from "./Components/Articles";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import ArticlePage from "./Components/ArticlePage";
import CommentsPage from "./Components/CommentsPage";
import PostCommentPage from "./Components/PostCommentPage";
import Homepage from "./Components/Homepage";
import ErrorPage from "./Components/ErrorPage";
import RegisterPage from "./Components/RegisterPage";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route
          path="/articles/:article_id/comments"
          element={<CommentsPage />}
        />
        <Route
          path="/articles/:article_id/comments/post-a-comment"
          element={<PostCommentPage />}
        />
        <Route path="error/404" element={<ErrorPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;

//use text add an article/comment
//use contained for register/login
// use outlined for pagination thing

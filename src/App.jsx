import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import ArticlePage from "./Components/ArticlePage";
import CommentsPage from "./Components/CommentsPage";
import PostCommentPage from "./Components/PostCommentPage";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route
          path="/articles/:article_id/comments"
          element={<CommentsPage />}
        />
        <Route
          path="/articles/:article_id/comments/post-a-comment"
          element={<PostCommentPage />}
        />
      </Routes>
    </>
  );
}

export default App;

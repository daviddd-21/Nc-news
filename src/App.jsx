import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import ArticlePage from "./Components/ArticlePage";
import CommentsPage from "./Components/CommentsPage";

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
      </Routes>
    </>
  );
}

export default App;

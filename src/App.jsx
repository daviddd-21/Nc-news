// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Articles from "./Components/Articles";
import Navbar from "./Components/Navbar";
import ArticlePage from "./Components/ArticlePage";
import Homepage from "./Components/Homepage";
import RegisterPage from "./Components/RegisterPage";
import PostAnArticle from "./Components/PostAnArticle";
import { UserContext } from "./Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  if (user === "guest") {
    navigate("/");
  }
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post-an-article" element={<PostAnArticle />} />
      </Routes>
    </>
  );
}

export default App;

//use text add an article/comment
//use contained for register/login
// use outlined for pagination thing

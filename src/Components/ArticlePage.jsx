import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById, patchArticleByID } from "../utils/functions";
import ArticleDetails from "./ArticlePage-components/ArticleDetails";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id).then(({ data }) => {
      setArticle(data.article);
      setVotes(data.article.votes);
      setIsLoading(false);
    });
  }, [votes]);

  const handleVotes = (event) => {
    let vote;
    if (event.target.id === "Upvote") {
      vote = 1;
    } else {
      vote = -1;
    }
    patchArticleByID(article_id, vote).then(({ data }) => {
      setVotes(data.updatedArticle.votes);
    });
  };

  const path = `/articles/${article_id}/comments`;

  return !isLoading ? (
    <div>
      <ArticleDetails article={article} votes={votes} />
      <button id="Upvote" onClick={handleVotes}>
        Upvote
      </button>
      <button id="Downvote" onClick={handleVotes}>
        Downvote
      </button>{" "}
      <br />
      <button>
        <Link to={path}>View comments</Link>
      </button>
    </div>
  ) : (
    <p>Loading ...</p>
  );
};

export default ArticlePage;

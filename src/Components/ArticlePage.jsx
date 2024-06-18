import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById, patchArticleByID } from "../utils/functions";
import ArticleDetails from "./ArticlePage-components/ArticleDetails";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [votesState, setVotesState] = useState(0);

  useEffect(() => {
    fetchArticleById(article_id).then(({ data }) => {
      setArticle(data.article);
    });
  }, [votesState]);

  const handleVotes = (vote) => {
    useEffect(() => {
      patchArticleByID(article_id, vote).then(({ data }) => {
        setVotesState(data.updatedArticle.votes);
      });
    }, []);
  };

  return (
    <div>
      <ArticleDetails
        article={article}
        votesState={votesState}
        setVotesState={setVotesState}
      />
      <button onClick={handleVotes(1)}>Upvote</button>
      <button onClick={handleVotes(-1)}>Downvote</button> <br />
      <button>
        <Link>View comments</Link>
      </button>
    </div>
  );
};

export default ArticlePage;

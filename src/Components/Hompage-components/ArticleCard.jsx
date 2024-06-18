import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const {
    author,
    title,
    topic,
    article_id,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;
  const path = `articles/${article_id}`;

  return (
    <div>
      <h3>{title}</h3>
      <img src={article_img_url} />
      <p>
        {author}, Topic: {topic}
      </p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
      <button>
        <Link to={path}>View article</Link>
      </button>
    </div>
  );
};

export default ArticleCard;

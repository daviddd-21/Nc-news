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

  const date = new Date(created_at);
  const dateFormatted = date.toUTCString();

  return (
    <div>
      <h3>{title}</h3>
      <img src={article_img_url} />
      <p>@{author}</p>
      <p>{dateFormatted}</p>
      <p>Topic: {topic[0].toUpperCase() + topic.slice(1)}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
      <button>
        <Link to={path}>View article</Link>
      </button>
    </div>
  );
};

export default ArticleCard;

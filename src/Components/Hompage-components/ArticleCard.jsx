const ArticleCard = ({ article }) => {
  const {
    author,
    title,
    topic,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  return (
    <div>
      <h3>{title}</h3>
      <img src={article_img_url} />
      <p>
        {author}, Topic: {topic}
      </p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
    </div>
  );
};

export default ArticleCard;

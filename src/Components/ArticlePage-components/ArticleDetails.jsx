const ArticleDetails = ({ article, votes }) => {
  const {
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
  } = article;

  let date;

  if (created_at) {
    date = new Date(created_at);
  }

  return (
    <div>
      <h2>{title}</h2>
      <img src={article_img_url} />
      <p>
        By: {author}, Topic: {topic}
      </p>
      <p>{body}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
      <p>{date ? date.toUTCString() : null}</p>
    </div>
  );
};

export default ArticleDetails;

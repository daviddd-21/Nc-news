const Comment = ({ comment }) => {
  const { author, body, votes, created_at } = comment;

  let date;

  if (created_at) {
    date = new Date(created_at);
  }

  return (
    <li>
      <p>
        @{author}
        {"  "}
        {date ? date.toUTCString() : null}
      </p>
      <p>{body}</p>
      <p>Votes: {votes}</p>
      <button>Upvote</button>
      <button>Downvote</button>
    </li>
  );
};

export default Comment;

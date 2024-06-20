import { Link } from "react-router-dom";
import { deleteComment } from "../../utils/functions";

const Comment = ({ comment, username, setDeleted, setIsLoading }) => {
  const { author, body, votes, created_at, comment_id } = comment;

  let date;

  if (created_at) {
    date = new Date(created_at);
  }

  const DeleteButton = () => {
    if (author === username) {
      return <button onClick={handleDelete}>Delete</button>;
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    deleteComment(comment_id).then(() => {
      setIsLoading(false);
      setDeleted(true);
    });
  };

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
      <br />
      <DeleteButton />
    </li>
  );
};

export default Comment;

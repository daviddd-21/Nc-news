import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/functions";
import Comment from "./CommentsPage-components/Comment";

const CommentsPage = () => {
  const { article_id } = useParams();
  const username = "tickle122";
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setCommentsLoading(true);
    fetchCommentsByArticleId(article_id).then(({ data }) => {
      setComments(data.comments);
      setCommentsLoading(false);
    });
  }, [article_id, isLoading, deleted]);

  const handleClick = () => {
    setDeleted(false);
  };

  const path = `/articles/${article_id}/comments/post-a-comment`;

  if (isLoading) {
    // refine later
    return <p>One moment...</p>;
  }

  if (deleted) {
    const path = `/articles/${article_id}/comments`;
    return (
      <p>
        Comment has been deleted.{" "}
        <Link onClick={handleClick} to={path}>
          Return to comments
        </Link>
      </p>
    );
  }

  return (
    <div>
      <button>
        <Link to={path}>Add a comment</Link>
      </button>
      <ol>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.comment_id}
              comment={comment}
              username={username}
              setDeleted={setDeleted}
              setIsLoading={setIsLoading}
            />
          );
        })}
      </ol>
      <button>
        <Link to={path}>Add a comment</Link>
      </button>
    </div>
  );
};

export default CommentsPage;

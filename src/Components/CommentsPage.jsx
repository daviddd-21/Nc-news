import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/functions";
import Comment from "./CommentsPage-components/Comment";

const CommentsPage = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(article_id).then(({ data }) => {
      setComments(data.comments);
      setIsLoading(false);
    });
  }, [article_id]);

  const path = `/articles/${article_id}/comments/post-a-comment`;

  return (
    <div>
      <button>
        <Link to={path}>Add a comment</Link>
      </button>
      <ol>
        {comments.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </ol>
      <button>
        <Link to={path}>Add a comment</Link>
      </button>
    </div>
  );
};

export default CommentsPage;

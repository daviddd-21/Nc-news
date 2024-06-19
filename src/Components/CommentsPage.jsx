import { useParams } from "react-router-dom";
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

  return (
    <div>
      <ol>
        {comments.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </ol>
    </div>
  );
};

export default CommentsPage;

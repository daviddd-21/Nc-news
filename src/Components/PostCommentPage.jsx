import { useState, useEffect } from "react";
import { postComment } from "../utils/functions";
import { Link, useParams } from "react-router-dom";

const PostCommentPage = () => {
  const { article_id } = useParams();
  if (!typeof article_id === "number") {
    // refine later
    return <h2>Page not found</h2>;
  }
  const username = "tickle122";
  const [comment, setComment] = useState("");
  const [posted, setPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    if (event.target.id === "comment") {
      setComment(event.target.value);
    }
  };

  useEffect(() => {}, [isLoading]);

  const handleSubmit = (event) => {
    setIsLoading(true);

    event.preventDefault();
    postComment(article_id, username, comment)
      .then(() => {
        setIsLoading(false);
        setPosted(true);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  if (isLoading) {
    return <p>One moment...</p>;
  }

  if (posted) {
    const path = `/articles/${article_id}`;
    return (
      <div>
        <p>
          Comment has been added. <Link to={path}>Return to article</Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>user: @{username}</p>
      <label htmlFor="body">Comment: </label>
      <input
        id="comment"
        onChange={handleChange}
        value={comment}
        name="body"
        required
      />{" "}
      <br />
      <button>Submit</button>
    </form>
  );
};

export default PostCommentPage;

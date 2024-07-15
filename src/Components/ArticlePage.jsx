import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  fetchArticleById,
  patchArticleByID,
  postComment,
} from "../utils/functions";
import ArticleDetails from "./ArticlePage-components/ArticleDetails";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {
  Typography,
  TextField,
  Stack,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { fetchCommentsByArticleId } from "../utils/functions";
import Comment from "./Articles-components/Comment";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === "guest") navigate("/");
    fetchArticleById(article_id)
      .then(({ data }) => {
        setArticle(data.article);
        setVotes(data.article.votes);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchCommentsByArticleId(article_id)
      .then(({ data }) => {
        setComments(data.comments);
        setIsLoading(false);
      })

      .catch((err) => {
        setComments([]);
        setIsLoading(false);
      });
  }, []);

  const handleUpVotes = () => {
    let vote = 1;
    setVotes(votes + 1);
    patchArticleByID(article_id, vote).catch(() => {
      setVotes(votes - 1);
    });
  };

  const handleDownVotes = () => {
    let vote = -1;
    setVotes(votes - 1);
    patchArticleByID(article_id, vote).catch(() => {
      setVotes(votes + 1);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setComment("");
    setComments((comments) => {
      return [comment, ...comments];
    });

    postComment(article_id, user, comment).catch(() => {
      setComments((comments) => {
        return comments.filter(
          (addedComment) => comment.body !== addedComment.body
        );
      });
    });
  };

  return !isLoading ? (
    <div>
      <ArticleDetails article={article} votes={votes} />
      <p>
        <IconButton onClick={handleUpVotes}>
          <ThumbUpIcon color="success" />
        </IconButton>
        {"  "} {votes}
        <IconButton onClick={handleDownVotes}>
          <ThumbDownIcon color="error" />
        </IconButton>
      </p>
      <Stack
        label="Add a comment"
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <TextField
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          variant="standard"
          size="large"
          type="text"
          placeholder="Add a comment"
          helperText={user !== "guest" ? null : "Please log in to comment"}
          InputProps={
            comment && user !== "guest"
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={handleSubmit}>
                        <SendIcon />
                      </Button>
                    </InputAdornment>
                  ),
                }
              : null
          }
        ></TextField>
      </Stack>
      <br />
      <Typography variant="h5">Comments</Typography>
      <br />
      <ol>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.comment_id}
              comment={comment}
              user={user}
              setComments={setComments}
            />
          );
        })}
      </ol>
    </div>
  ) : (
    <Stack alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
};

export default ArticlePage;

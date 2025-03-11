import { deleteComment } from "../../utils/functions";
import { IconButton, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState } from "react";
import { patchCommentByID } from "../../utils/functions";

const Comment = ({ comment, user, setComments }) => {
  const { author, body, votes, created_at, comment_id } = comment;
  const [commentVotes, setCommentVotes] = useState(votes);

  let date;

  if (created_at) {
    date = new Date(created_at);
  }

  const DeleteButton = () => {
    if (author === user) {
      return (
        <IconButton color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      );
    } else return null;
  };

  const handleDelete = () => {
    setComments((comments) => {
      return comments.filter((comment) => comment.comment_id !== comment_id);
    });
    deleteComment(comment_id).then(() => {});
  };

  const handleUpVotes = () => {
    let vote = 1;
    setCommentVotes(commentVotes + 1);
    patchCommentByID(comment_id, vote).catch(() => {
      setVotes(votes - 1);
    });
  };

  const handleDownVotes = () => {
    let vote = -1;
    setCommentVotes(commentVotes - 1);
    patchCommentByID(comment_id, vote).catch(() => {
      setVotes(votes + 1);
    });
  };

  return (
    <li>
      <Grid container>
        <Grid item xs>
          <Typography variant="h5">By: @{author}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5">
            {date ? date.toUTCString().slice(5, 22) : null}
          </Typography>
        </Grid>
      </Grid>

      <p>
        {body} <DeleteButton />
      </p>
      <p>
        <IconButton color="success" onClick={handleUpVotes}>
          <ThumbUpIcon />
        </IconButton>{" "}
        {commentVotes}{" "}
        <IconButton color="error" onClick={handleDownVotes}>
          <ThumbDownIcon />
        </IconButton>
      </p>
      <br />
    </li>
  );
};

export default Comment;

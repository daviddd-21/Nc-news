import { Link, useNavigate } from "react-router-dom";
import {
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

const ArticleCard = ({ article }) => {
  const {
    author,
    title,
    topic,
    article_id,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;
  const path = `/articles/${article_id}`;

  const date = new Date(created_at);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
  const day = String(date.getDate()).padStart(2, "0");
  const dateFormatted = `${year}-${month}-${day}`;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Stack onClick={handleClick} className="article-card">
      <Card>
        <CardContent>
          <Typography
            align="left"
            className="article-title"
            variant="h6"
            sx={{
              height: "70px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "2",
            }}
          >
            {title}
          </Typography>
          <Grid container>
            <Grid item xs>
              <Typography align="left" variant="subtitle2">
                By: @{author}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography align="right" variant="subtitle1" id="article-text">
                {dateFormatted}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardMedia
          component="img"
          height="auto"
          image={article_img_url}
          className="article-img"
        />
        <CardContent>
          <Typography variant="subtitle1">
            <span className="votes-text">Votes: {votes}</span>{" "}
            <span className="comments-text">Comments: {comment_count}</span>{" "}
            <span className="topic-text">
              {topic[0].toUpperCase() + topic.slice(1)}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ArticleCard;

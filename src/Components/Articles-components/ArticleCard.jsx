import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
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
  const dateFormatted = date.toUTCString();

  return (
    <Box my={4}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs>
              <Typography variant="h6">
                {title} {"("}
                {topic[0].toUpperCase() + topic.slice(1)}
                {")"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography align="right" variant="subtitle1">
                {dateFormatted}
              </Typography>
            </Grid>
          </Grid>
          <Typography align="left" variant="subtitle2">
            By: @{author}
          </Typography>
        </CardContent>
        <CardMedia component="img" height="auto" image={article_img_url} />
        <CardContent>
          <Typography variant="subtitle1">Votes: {votes}</Typography>
          <Typography variant="subtitle1">Comments: {comment_count}</Typography>
        </CardContent>
        <CardActions>
          <Button>
            <Link to={path} color="white">
              View article
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ArticleCard;

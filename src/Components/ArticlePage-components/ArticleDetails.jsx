import { Typography, Stack, Grid } from "@mui/material";

const ArticleDetails = ({ article, votes }) => {
  const {
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
  } = article;

  let date;

  if (created_at) {
    date = new Date(created_at);
  }

  return (
    <>
      <Typography
        textAlign="center"
        fontWeight="bold"
        marginTop="50px"
        variant="h3"
      >
        {title}
      </Typography>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexWrap="wrap"
        direction="row"
        className="article-details-container"
      >
        <Stack className="article-details-img-container">
          <img className="article-details-img" src={article_img_url} />
        </Stack>
        <Stack className="article-details-text-container">
          <Grid container>
            <Grid item xs alignItems="left">
              <Typography textAlign="left" variant="h6">
                By: @{author}
              </Typography>
            </Grid>
            <Grid item xs alignItems="right">
              <Typography variant="h6">
                {date ? date.toUTCString().slice(5, 22) : null}
              </Typography>
            </Grid>
          </Grid>
          <p>{body}</p>
        </Stack>
      </Stack>
    </>
  );

  // return (
  //   <div>
  //     <h2>{title}</h2>
  //     <img src={article_img_url} />
  //     <p>
  //       By: {author}, Topic: {topic}
  //     </p>
  //     <p>{body}</p>
  //     <p>Votes: {votes}</p>
  //     <p>Comments: {comment_count}</p>
  //     <p>{date ? date.toUTCString() : null}</p>
  //   </div>
  // );
};
export default ArticleDetails;

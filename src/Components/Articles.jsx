import { fetchArticles, fetchTopics } from "../utils/functions";
import { useState, useEffect } from "react";
import ArticleCard from "./Articles-components/ArticleCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TextField, MenuItem, Box, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const topicParam = searchParams.get("topic");
  const [topicQuery, setTopicQuery] = useState(() => {
    if (topicParam) return topicParam;
    return "All";
  });

  const sortByParam = searchParams.get("sort_by");
  const [sortByQuery, setSortByQuery] = useState(() => {
    if (sortByParam) return sortByParam;
    return "created_at";
  });

  const orderParam = searchParams.get("order");
  const [orderQuery, setOrderQuery] = useState(() => {
    if (orderParam) return orderParam;
    if (sortByQuery === "title") return "ASC";
    return "DESC";
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(topicQuery, sortByQuery, orderQuery)
      .then(({ data }) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.log("Articles error");
      });
    fetchTopics()
      .then(({ data }) => {
        setIsLoading(false);
        setTopics(data.topics);
      })
      .catch((err) => {
        console.log("Topics error");
      });
  }, [topicQuery, orderQuery, sortByQuery]);

  const handleTopicChange = (event) => {
    const topicQuery = event.target.value;
    setTopicQuery(topicQuery);
    if (topicQuery) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("topic", topicQuery);
      setSearchParams(newParams);
    } else {
      const newParams = new URLSearchParams(searchParams);
      setSearchParams(newParams);
    }
  };

  const handleSortByChange = (event) => {
    const sortByQuery = event.target.value;
    setSortByQuery(sortByQuery);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortByQuery);
    setSearchParams(newParams);
  };

  const handleOrderChange = (event) => {
    const orderQuery = event.target.value;
    setOrderQuery(orderQuery);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", orderQuery);
    setSearchParams(newParams);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Stack className="articles-page-container">
        <Stack
          className="articles-filter-container"
          justifyContent="center"
          alignItems="center"
          direction="row"
          my={2}
          marginTop="80px"
        >
          <Box width="220px" my={1} mx={1}>
            <TextField
              onChange={handleTopicChange}
              label="Topic"
              helperText="Filter articles by topic"
              fullWidth
              value={topicQuery}
              select
            >
              <MenuItem value="All">All</MenuItem>
              {topics.map((topic) => {
                const value = topic.slug[0].toUpperCase() + topic.slug.slice(1);
                return (
                  <MenuItem value={topic.slug} key={topic.slug}>
                    {value}
                  </MenuItem>
                );
              })}
            </TextField>
          </Box>
          <Box width="220px" my={1} mx={1}>
            <TextField
              onChange={handleSortByChange}
              label="Sort articles by"
              value={sortByQuery}
              helperText="Sort by"
              fullWidth
              select
            >
              <MenuItem value="created_at">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="comment_count">Comment count</MenuItem>
              <MenuItem value="votes">Votes</MenuItem>
            </TextField>
          </Box>
          <Box width="220px" my={1}>
            <TextField
              onChange={handleOrderChange}
              label="Order"
              value={orderQuery}
              fullWidth
              helperText="Sort by ascending or descending"
              select
            >
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </TextField>
          </Box>
        </Stack>
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="row"
          className="articles-container"
          width="100%"
          maxWidth="100%"
          margin="0 auto"
        >
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default Articles;

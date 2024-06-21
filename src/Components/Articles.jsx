import { fetchArticles, fetchTopics } from "../utils/functions";
import { useState, useEffect } from "react";
import Query from "./Articles-components/Query";
import ArticleCard from "./Articles-components/ArticleCard";
import { useSearchParams, useNavigate } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const topicParam = searchParams.get("topic");
  const [topicQuery, setTopicQuery] = useState(topicParam);

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

  useEffect(() => {
    fetchArticles(topicQuery, sortByQuery, orderQuery)
      .then(({ data }) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchTopics().then(({ data }) => {
      setTopics(data.topics);
    });
  }, [topicQuery, orderQuery, sortByQuery]);

  const navigate = useNavigate();

  const handleTopicChange = (event) => {
    const topicQuery = event.target.value;
    setTopicQuery(topicQuery);
    if (topicQuery) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("topic", topicQuery);
      setSearchParams(newParams);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("topic");
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

  return (
    <>
      <form>
        <label htmlFor="topic">Filter by topic</label>
        <select value={topicQuery} onChange={handleTopicChange} name="topic">
          <option value="">All</option>
          {topics.map((topic) => {
            const value = topic.slug[0].toUpperCase() + topic.slug.slice(1);
            return (
              <option value={topic.slug} key={topic.slug}>
                {value}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="sort_by">Sort by: </label>
        <select
          onChange={handleSortByChange}
          name="sort_by"
          value={sortByQuery}
        >
          <option value="created_at">Date</option>
          <option value="title">Title</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </select>
        <label htmlFor="order">Order: </label>
        <select onChange={handleOrderChange} name="order" value={orderQuery}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </form>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </>
  );
};

export default Articles;

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

  useEffect(() => {
    fetchArticles(topicQuery).then(({ data }) => {
      setArticles(data.articles);
    });
    fetchTopics().then(({ data }) => {
      setTopics(data.topics);
    });
  }, [topicQuery]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const topicQuery = event.target.value;
    setTopicQuery(topicQuery);
    if (topicQuery) {
      navigate(`/articles?topic=${topicQuery}`);
    } else {
      navigate(`/articles`);
    }
  };

  return (
    <>
      <form>
        <label htmlFor="topic">Filter by topic</label>
        <select value={topicQuery} onChange={handleChange}>
          <option value="">All</option>
          {topics.map((topic) => {
            return (
              <option value={topic.slug} key={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
      </form>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </>
  );
};

export default Articles;

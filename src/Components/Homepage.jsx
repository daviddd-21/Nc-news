import { fetchArticles } from "../utils/functions";
import { useState, useEffect } from "react";
import Query from "./Hompage-components/Query";
import ArticleCard from "./Hompage-components/ArticleCard";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("");

  useEffect(() => {
    fetchArticles(query, option).then(({ data }) => {
      setArticles(data.articles);
    });
  }, [option, query]);

  return (
    <>
      <Query setQuery={setQuery} setOption={setOption} />
      {articles.map((article) => {
        return <ArticleCard article={article} />;
      })}
    </>
  );
};

export default Homepage;

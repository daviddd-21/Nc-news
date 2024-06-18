import axios from "axios";
const origin = axios.create({ baseURL: "https://news-api-y9rq.onrender.com" });

export function fetchArticles(query, option) {
  const queries = {
    params: {},
  };
  queries.params[query] = option;
  return origin.get("/api/articles", queries);
}

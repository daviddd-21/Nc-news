import axios from "axios";
const origin = axios.create({ baseURL: "https://news-api-y9rq.onrender.com" });

export function fetchArticles(query, option) {
  const queries = {
    params: {},
  };
  queries.params[query] = option;
  return origin.get("/api/articles", queries);
}

export function fetchArticleById(article_id) {
  return origin.get(`/api/articles/${article_id}`);
}

export function patchArticleByID(article_id, vote) {
  return origin.patch(`/api/articles/${article_id}`, { inc_votes: vote });
}

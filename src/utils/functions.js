import axios from "axios";
const origin = axios.create({ baseURL: "https://news-api-y9rq.onrender.com" });

export function fetchArticles(topicQuery) {
  const queries = {
    params: {},
  };
  if (topicQuery) {
    queries.params.topic = topicQuery;
  }
  return origin.get("/api/articles", queries);
}

export function fetchArticleById(article_id) {
  return origin.get(`/api/articles/${article_id}`);
}

export function patchArticleByID(article_id, vote) {
  return origin.patch(`/api/articles/${article_id}`, { inc_votes: vote });
}

export function fetchCommentsByArticleId(article_id) {
  return origin.get(`/api/articles/${article_id}/comments`);
}

export function postComment(article_id, username, comment) {
  return origin.post(`/api/articles/${article_id}/comments`, {
    username: username,
    body: comment,
  });
}

export function deleteComment(comment_id) {
  return origin.delete(`/api/comments/${comment_id}`);
}

export function fetchTopics() {
  return origin.get("/api/topics");
}

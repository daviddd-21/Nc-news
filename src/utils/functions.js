import axios from "axios";
const origin = axios.create({ baseURL: "https://news-api-y9rq.onrender.com" });

export function fetchArticles(topicQuery, sortByQuery, orderQuery) {
  const queries = {
    params: {
      sort_by: sortByQuery,
      order: orderQuery,
    },
  };
  if (topicQuery !== "All") {
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

export function fetchUsers() {
  return origin.get("/api/users");
}

export function fetchUserByUsername(username) {
  return origin.get(`/api/users/${username}`).catch((err) => {
    return err;
  });
}

export function postUser(name, username, password, avatar_url) {
  return origin.post("/api/users", { name, username, password, avatar_url });
}

export function patchCommentByID(comment_id, vote) {
  return origin.patch(`/api/comments/${comment_id}`, { inc_votes: vote });
}

const avatarUrl = "../../public/no-image-provided.png";

export function postArticle(
  title,
  topic,
  author,
  body,
  avatar_url = avatarUrl
) {
  return origin.post("/api/articles", {
    title,
    topic,
    author,
    body,
    avatar_url,
  });
}

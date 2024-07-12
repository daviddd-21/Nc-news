import { useState, useContext } from "react";
import { postUser } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const input = event.target.value;
    if (event.target.id === "name") setName(input);
    if (event.target.id === "username") setUsername(input);
    if (event.target.id === "password") setPassword(input);
    if (event.target.id === "avatarURL") setAvatarURL(input);
  };

  //add a password validation

  const handleSubmit = (event) => {
    event.preventDefault();
    postUser(name, username, password, avatarURL).then(() => {
      setUser(username);
      navigate("/articles");
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          name="name"
          value={name}
          onChange={handleChange}
          id="name"
          required
        />
        <br />
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          id="username"
          required
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          value={password}
          onChange={handleChange}
          id="password"
          type="password"
          required
        />
        <br />
        <label htmlFor="avatarURL">Avatar URL: </label>
        <input
          name="avatarURL"
          value={avatarURL}
          onChange={handleChange}
          id="avatarURL"
          type="url"
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

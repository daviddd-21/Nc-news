import { useState, useContext } from "react";
import { postUser } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { TextField, Stack, Button } from "@mui/material";

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
    <Stack spacing={2} direction="column" marginTop={5}>
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          label="Name"
          value={name}
          onChange={handleChange}
          helperText="What should we call you?"
          id="name"
          required
        />
        <br />

        <TextField
          label="Username"
          size="small"
          value={username}
          onChange={handleChange}
          helperText="Please enter your username"
          id="username"
          required
        />
        <br />

        <TextField
          label="Password"
          size="small"
          value={password}
          onChange={handleChange}
          helperText="Please enter your password"
          id="password"
          type="password"
          required
        />
        <br />
        <TextField
          label="AvatarURL"
          size="small"
          value={avatarURL}
          helperText="Please enter your avatar URL"
          onChange={handleChange}
          id="avatarURL"
          type="url"
        />
        <br />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </form>
    </Stack>
  );
};

export default RegisterPage;

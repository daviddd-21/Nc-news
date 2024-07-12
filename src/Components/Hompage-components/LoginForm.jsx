import { useState } from "react";
import { fetchUserByUsername } from "../../utils/functions";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const input = event.target.value;
    if (event.target.id === "username") {
      setUsername(input);
    }
    if (event.target.id === "password") {
      setPassword(input);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetchUserByUsername(username)
      .then(({ data }) => {
        console.log(data);
        if (data.user.password === password) {
          setUser(username);
          navigate("/articles");
        } else {
          return new Error();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleLogin}>
      <TextField
        onChange={handleChange}
        value={username}
        id="username"
        label="Username"
        type="text"
        helperText={!username ? "Please enter your username" : null}
        required
      />
      <br />
      <TextField
        onChange={handleChange}
        value={password}
        id="password"
        label="Password"
        type="password"
        helperText={!password ? "Please enter your password" : null}
        required
        InputProps={
          password && username
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="submit">
                      <SendIcon />
                    </Button>
                  </InputAdornment>
                ),
              }
            : null
        }
      />{" "}
      <br />
      <p>
        Don' have an account, register <Link to="/register">here</Link>
      </p>
    </form>
  );
};

export default LoginForm;

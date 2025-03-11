import { useState } from "react";
import { fetchUserByUsername } from "../../utils/functions";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const input = event.target.value;
    if (event.target.id === "username") {
      setUsername(input);
      setIsVisible(false);
    }
    if (event.target.id === "password") {
      setPassword(input);
      setIsVisible(false);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetchUserByUsername(username)
      .then(({ data }) => {
        if (data.user.password === password) {
          setUser(username);
          navigate("/articles");
        }
      })
      .catch((err) => {
        setIsVisible(true);
      });
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <Stack
          alignItems="center"
          justifyContent="center"
          width="200px"
          className="usernameTextbox"
        >
          <TextField
            onChange={handleChange}
            value={username}
            id="username"
            label="Username"
            type="text"
            helperText={!username ? "Please enter your username" : null}
            required
          />
        </Stack>

        <Stack maxWidth="200px">
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
        </Stack>
      </form>
      <div style={{ display: isVisible ? "block" : "none" }}>
        <Typography>Wrong username or password. Please try again!</Typography>
      </div>
      <Stack>
        <p>
          Don't have an account, register <Link to="/register">here</Link>
        </p>
      </Stack>
    </>
  );
};

export default LoginForm;

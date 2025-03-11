import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { postArticle } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Stack,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const PostAnArticle = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  if (user === "guest") navigate("/");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [isLoading]);

  const handleChange = (event) => {
    const input = event.target.value;
    if (event.target.id === "title") setTitle(input);
    if (event.target.id === "body") setBody(input);
    if (event.target.id === "avatarURL") setAvatarURL(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !body || !topic) return;
    setIsLoading(true);
    postArticle(title, topic, user, body, avatarURL).then(() => {
      navigate("/articles");
    });
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="start"
      alignItems="center"
      marginTop={5}
    >
      <Typography variant="h5">
        Please fill in the required details to post an article
      </Typography>
      <Stack width={200}>
        <TextField
          label="Title"
          size="small"
          value={title}
          onChange={handleChange}
          helperText="Title of the article"
          id="title"
          type="text"
          required
        />
      </Stack>

      <Stack sm={{ width: 400 }} width={300}>
        <TextField
          label="Body"
          size="small"
          value={body}
          onChange={handleChange}
          helperText="Write your article here"
          id="body"
          multiline
          type="text"
          rows={5}
          required
        />
      </Stack>

      <Stack width={150}>
        <TextField
          label="Topic"
          size="small"
          onChange={(event) => setTopic(event.target.value)}
          helperText="Topic of the article"
          id="topic"
          select
          value={topic}
          required
        >
          <MenuItem value="" disabled selected>
            Please Choose
          </MenuItem>
          <MenuItem value="coding">Coding</MenuItem>
          <MenuItem value="football">Football</MenuItem>
          <MenuItem value="cooking">Cooking</MenuItem>
        </TextField>
      </Stack>

      <Stack width={300}>
        <TextField
          size="small"
          label="Avatar URL"
          value={avatarURL}
          onChange={handleChange}
          helperText="Please enter your avatar URL"
          id="avatarURL"
          required
          type="url"
        />
      </Stack>

      <Stack>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Post
        </Button>
      </Stack>
    </Stack>
  );
};

export default PostAnArticle;

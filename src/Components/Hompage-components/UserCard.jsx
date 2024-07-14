import { Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const UserCard = ({ userDetails, setUser }) => {
  const { username, name, avatar_url } = userDetails;
  const navigate = useNavigate();

  const handleClick = () => {
    setUser(username);
    navigate("/articles");
  };

  return (
    <Stack spacing={1} direction="column" alignItems="center">
      <Avatar className="avatar" onClick={handleClick}>
        <img src={avatar_url} className="avatar-img" />
      </Avatar>
      <p>@{username}</p>
    </Stack>
  );
};

export default UserCard;

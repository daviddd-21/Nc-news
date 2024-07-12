import { Typography, Button } from "@mui/material";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) navigate("/");
    else navigate("/articles");
  };
  return (
    <Typography variant="h1">
      <button onClick={handleClick}>Nc News</button>
    </Typography>
  );
};

export default Header;

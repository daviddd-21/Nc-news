import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../Context/UserContext";
import { useContext, useState, useEffect } from "react";
import { fetchUserByUsername } from "../utils/functions";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [nameOfUser, setNameOfUser] = useState("Guest");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = () => {
    return anchorEl ? true : false;
  };

  useEffect(() => {
    if (user !== "guest") {
      fetchUserByUsername(user).then(({ data }) => {});
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nc News
          </Typography>
        </IconButton>
        <IconButton
          size="large"
          id="menu-button"
          onClick={handleClick}
          aria-controls={open ? "navbar-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? true : undefined}
        >
          <MenuIcon id="menu-icon"></MenuIcon>
        </IconButton>
        <Menu id="navbar-menu" anchorEl={anchorEl} open={open} MenuListProps={{
          "aria-labelledby": 
        }}>
          <MenuItem>Hello, {nameOfUser}</MenuItem>
          <MenuItem>Manage my articles</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Manage my account</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

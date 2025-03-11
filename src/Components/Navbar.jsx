import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../Context/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserByUsername } from "../utils/functions";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [nameOfUser, setNameOfUser] = useState("guest");

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (user !== "guest") {
      fetchUserByUsername(user).then(({ data }) => {
        setNameOfUser(data.user.username);
      });
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeline = (msg) => {
    handleMenuClose();
    window.alert(msg);
    navigate("/");
  };

  const handleSuccess = (path) => {
    handleMenuClose();
    navigate(path);
  };

  return (
    <AppBar position="fixed" className="navbar">
      {" "}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nc News
        </Typography>

        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="navbar-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="navbar-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{ "aria-labelledby": "menu-button" }}
          >
            <MenuItem onClick={handleMenuClose}>Hello, {nameOfUser}!</MenuItem>
            <MenuItem
              onClick={() => {
                user === "guest"
                  ? handleDeline("Please log in first")
                  : handleSuccess("/articles");
              }}
            >
              View all articles
            </MenuItem>
            <MenuItem
              onClick={() => {
                user === "guest"
                  ? handleDeline("Please log in first")
                  : handleSuccess("/post-an-article");
              }}
            >
              Post an article
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                setUser("guest");
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

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

  return (
    <AppBar position="fixed">
      {" "}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nc News
        </Typography>

        {/* <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Stack direction="row" spacing={2}>
            <Typography>Hello, {nameOfUser}</Typography>
            <Typography>Manage my articles</Typography>
            <Typography>Settings</Typography>
            <Typography>Manage my account</Typography>
          </Stack>
        </Box> */}

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
                  ? window.alert("Please log in first")
                  : navigate("/articles");
                handleMenuClose;
              }}
            >
              View all articles
            </MenuItem>
            <MenuItem
              onClick={() => {
                user === "guest"
                  ? window.alert("Please log in first")
                  : navigate("/post-an-article");
                handleMenuClose;
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

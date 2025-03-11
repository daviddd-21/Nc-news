import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/functions";
import UserCard from "./Hompage-components/UserCard";
import LoginForm from "./Hompage-components/LoginForm";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { Stack, CircularProgress } from "@mui/material";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(({ data }) => {
      setUsers(() => {
        return data.users.filter((user) => {
          return (
            user.username === "tickle122" ||
            user.username === "grumpy19" ||
            user.username === "happyamy2016" ||
            user.username === "cooljmessy" ||
            user.username === "weegembump" ||
            user.username === "jessjelly"
          );
        });
      });
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <h1 className="welcome-message">Welcome to Nc News</h1>
        <h2>Get started by logging in</h2>
        <LoginForm setUser={setUser} />
      </Stack>

      <Stack
        spacing={4}
        justifyContent="center"
        direction="column"
        alignItems="center"
        display="flex"
      >
        <h2>Guest users</h2>
        <Stack spacing={4} direction="row" className="avatarsContainer">
          {users.map((user) => {
            return (
              <UserCard
                key={user.username}
                userDetails={user}
                setUser={setUser}
              />
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default Homepage;

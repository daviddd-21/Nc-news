import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/functions";
import UserCard from "./Hompage-components/UserCard";
import LoginForm from "./Hompage-components/LoginForm";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useContext(UserContext);

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
    });
  }, []);

  return (
    <>
      <p>Get started by logging in</p>
      <LoginForm setUser={setUser} />
      <div>
        <p>
          Or alternatively you can login as a guest with one of the guest users
        </p>
        {users.map((user) => {
          return (
            <UserCard
              key={user.username}
              userDetails={user}
              setUser={setUser}
            />
          );
        })}
      </div>
    </>
  );
};

export default Homepage;

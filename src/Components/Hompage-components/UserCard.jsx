import { useNavigate } from "react-router-dom";

const UserCard = ({ userDetails, setUser }) => {
  const { username, name, avatar_url } = userDetails;
  const navigate = useNavigate();

  const handleClick = () => {
    setUser(username);
    navigate("/articles");
  };

  return (
    <div>
      <p>@{username}</p>
      <p>{name}</p>
      <button onClick={handleClick}>
        <img src={avatar_url} />
      </button>
    </div>
  );
};

export default UserCard;

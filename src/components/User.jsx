import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  if (!user) return;

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default User;

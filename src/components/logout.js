// Val slightly changed this on 12/1
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const directToLogin = () => {
    window.location.href = `${window.location.origin}`;
  };
  return (
    <>
      {isAuthenticated ? (
        <button
          style={{
            padding: "5px",
            cursor: "pointer",
            fontSize: "14px",
            backgroundColor: "gold",
          }}
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <button
          style={{
            padding: "5px",
            cursor: "pointer",
            fontSize: "14px",
            backgroundColor: "gold",
          }}
          onClick={directToLogin}
        >
          Login
        </button>
      )}
    </>
  );
};

export default LogoutButton;

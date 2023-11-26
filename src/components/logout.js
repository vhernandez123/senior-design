import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const directToLogin = () => {
    localStorage.setItem("isAuthenticated", "false");
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
          onClick={() => logout()}
        >
          Log out
        </button>
      ) : (
        <button
          style={{
            padding: "15px",
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

import { useAuth0 } from "@auth0/auth0-react";

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
            padding: "15px",
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

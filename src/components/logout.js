// Val slightly changed this on 12/1
import { useAuth0 } from "@auth0/auth0-react";
import { left } from "@popperjs/core";

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
            paddingLeft:'10px',
            paddingRight:'10px',
            cursor: "pointer",
            fontSize: "14px",
            backgroundColor: "gold",
            borderRadius:'50%',
            marginLeft:"20px"
          }}
          onClick={logout}
        >
          Log
          <br></br>
          out
        </button>
      ) : (
        <button
          style={{
            padding: "5px",
            paddingLeft:'10px',
            paddingRight:'10px',
            cursor: "pointer",
            fontSize: "14px",
            backgroundColor: "gold",
            borderRadius:'50%',
            marginLeft:"20px"
          }}
          onClick={directToLogin}
        >
          Log <br></br>in
        </button>
      )}
    </>
  );
};

export default LogoutButton;

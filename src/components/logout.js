import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Button
        href="/AddPet"
        variant="contained"
        style={{ backgroundColor: "#01B636", color: "white" }}
        onClick={() => logout()}
      >
        Log out
      </Button>
    )
  );
};
export default LogoutButton;

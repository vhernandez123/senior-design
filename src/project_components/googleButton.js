import { useAuth0 } from "@auth0/auth0-react";
import GoogleButton from "react-google-button";
const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <GoogleButton onClick={() => loginWithRedirect()}>Sign-In</GoogleButton>
    )
  );
};
export default LoginButton;

import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton=()=>{
    const{logout,isAuthenticated}=useAuth0();
    return(
        isAuthenticated &&(
        <button style={
        {
         padding: '15px',
         cursor:"pointer",
         fontSize:'14px',
         backgroundColor:"gold"
        }} onClick={()=>logout()}>
log
out
        </button>
    ))
}
export default LogoutButton;
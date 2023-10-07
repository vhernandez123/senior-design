import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton=()=>{
    const{logout,isAuthenticated}=useAuth0();
    return(
        isAuthenticated &&(
        <button style={
        {
         width:'70%',
         padding: '20px',
         cursor:"pointer",
         backgroundColor:"green"
        }} onClick={()=>logout()}>
Sign out
        </button>
    ))
}
export default LogoutButton;
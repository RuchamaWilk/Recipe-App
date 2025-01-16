import { jwtDecode } from "jwt-decode";


export const getToken=()=>{
    console.log("getToken?")
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token not found");
      return null;
    }
    return token
    /*try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error.message);
      return null;
    }*/

  }

  export const getUser=()=>{
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        console.error("No user found in localStorage");
        return null;
      }
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user JSON:", error);
      return null;
    }
  }
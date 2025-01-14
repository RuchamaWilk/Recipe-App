import { jwtDecode } from "jwt-decode";


export const getToken=()=>{
    console.log("getToken?")
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token not found");
      return null;
    }
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    return decodedToken;

  }

  export const getUser=()=>{
    console.log("getUser?")
    const userNow = localStorage.getItem('user');
    if (!userNow) {
      console.error("user not found");
      return null;
    }
    console.log(JSON.parse(userNow))
    return JSON.parse(userNow);

  }
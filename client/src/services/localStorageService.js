import { jwtDecode } from "jwt-decode";

export const setTokenUser =( tokenValue,userData )=>{
  localStorage.setItem('token', tokenValue)
  localStorage.setItem('user', JSON.stringify(userData))

}

export const getDecodedToken=()=>{
  return jwtDecode(localStorage.getItem('token'));
}

export const getToken=()=>{
    return localStorage.getItem('token');
  }

  export const getUser=()=>{
    return JSON.parse(localStorage.getItem('user'));
  }

  export const removeStorage=()=>{
    localStorage.removeItem("token") 
    localStorage.removeItem("user") 

  }
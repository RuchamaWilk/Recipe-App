import { jwtDecode } from "jwt-decode";

export const setTokenUser =( tokenValue )=>{
  localStorage.setItem('token', tokenValue);
}

export const getDecodedToken=()=>{
  return jwtDecode(localStorage.getItem('token'));
}

export const getToken=()=>{
    return localStorage.getItem('token');
  }

export const removeStorage=()=>{
    localStorage.removeItem("token") 
}
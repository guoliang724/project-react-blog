import http from "./httpService";
import jwtDecode from "jwt-decode";

const endPoint = "https://aqueous-atoll-66200.herokuapp.com/api/auth/";

http.axiosHeaders(getJwt());
export async function login(email, password) {
  const { data: jwt } = await http.post(endPoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function loginWithjwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithjwt,
  logout,
  getJwt,
  getCurrentUser,
};

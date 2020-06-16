import axios from "axios";
import { toast } from "react-toastify";

export function axiosHeaders(jwt) {
  axios.defaults.headers.post["x-auth-token"] = jwt;
  axios.defaults.headers.put["x-auth-token"] = jwt;
  axios.defaults.headers.delete["x-auth-token"] = jwt;
}
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;
  if (error.response && error.response.status === 403) toast("Forbidden....");
  else if (error.response && error.response.status === 400)
    toast("Please Login First....");
  else if (error.response && error.response.status === 401)
    toast("Access Denied....");
  else if (expectedError) {
    toast("unexpected error: try another name please...");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  axiosHeaders,
};

import http from "./httpService";

const endPoint = "https://aqueous-atoll-66200.herokuapp.com/api/users";
const Regist = async (user) => {
  return await http.post(endPoint + "/new", user);
};

export default Regist;

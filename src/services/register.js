import http from "./httpService";

const endPoint = "https://aqueous-atoll-66200.herokuapp.com/api/users";
const Regist = async (user) => {
  const { data } = await http.post(endPoint + "/new", user);
  console.log("data", data);
  return data;
};

export default Regist;

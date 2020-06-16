import http from "./httpService";

export async function getTypes() {
  const { data } = await http.get(
    "https://aqueous-atoll-66200.herokuapp.com/api/types"
  );
  return data;
}

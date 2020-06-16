import http from "./httpService";

const endPoint = "https://aqueous-atoll-66200.herokuapp.com/api/blogs";
export async function getBlogs() {
  const { data: blogs } = await http.get(endPoint);
  return blogs;
}

export async function getBlog(id) {
  const { data: blog } = await http.get(endPoint + "/" + id);
  //console.log("getblog", blog);
  return blog;
}
export async function UpdateBlogLike(blog) {
  console.log("service blog", blog);
  await http.put(endPoint + "/update", blog);
}

export async function saveBlog(blog) {
  if (blog._id) {
    try {
      // console.log("saveblog", blog);
      // console.log("put", await http.put(endPoint + "/update", blog));
      return await http.put(endPoint + "/update", blog);
    } catch (ex) {
      console.log(ex);
    }
  } else {
    try {
      let body = { ...blog };
      delete body._id;
      return await http.post(endPoint + "/new", body);
    } catch (ex) {
      console.log(ex);
    }
  }
}

export async function deleteBlog(post) {
  return http.delete(endPoint + "/delete/" + post._id);
}

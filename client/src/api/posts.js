import axios from "axios";
export const getPosts = () => {
  return axios.get("http://localhost:3000/posts").then((res) => res.data);
};

export const getPost = (id) => {
  return axios.get(`http://localhost:3000/posts/${id}`).then((res) => res.data);
};

export const createPost = ({ title, body }) => {
  return axios
    .post("http://localhost:3000/posts", {
      title,
      body,
      userId: 1,
      id: Math.random(),
    })
    .then((res) => res.data);
};

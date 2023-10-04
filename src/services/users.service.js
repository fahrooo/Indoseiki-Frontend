import axios from "axios";

export const getUsers = (callback) => {
  axios
    .get("http://localhost:5000/users")
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const postUsers = (data, callback) => {
  axios
    .post("http://localhost:5000/users/create", data)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const putUsers = (id, data, callback) => {
  axios
    .put(`http://localhost:5000/users/update/${id}`, data)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const deleteUsers = (id, callback) => {
  axios
    .delete(`http://localhost:5000/users/delete/${id}`)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

import axios from "axios";

export const getHistory = (callback) => {
  axios
    .get("http://localhost:5000/history")
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const postHistory = (data, callback) => {
  axios
    .post("http://localhost:5000/history/create", data)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const putHistory = (id, data, callback) => {
  axios
    .put(`http://localhost:5000/history/update/${id}`, data)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const deleteHistory = (id, callback) => {
  axios
    .delete(`http://localhost:5000/history/delete/${id}`)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

import axios from "axios";

export const getBook = (callback) => {
  axios
    .get("http://localhost:5000/book")
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const postBook = (data, callback) => {
  axios
    .post("http://localhost:5000/book/create", data)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const putBook = (id, data, callback) => {
  axios
    .put(`http://localhost:5000/book/update/${id}`, data)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

export const deleteBook = (id, callback) => {
  axios
    .delete(`http://localhost:5000/book/delete/${id}`)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

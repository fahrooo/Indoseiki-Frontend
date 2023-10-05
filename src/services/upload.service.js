import axios from "axios";

export const postUpload = (data, callback) => {
  axios
    .post("http://localhost:5000/upload", data)
    .then((res) => callback(res.data))
    .catch((err) => callback(err));
};

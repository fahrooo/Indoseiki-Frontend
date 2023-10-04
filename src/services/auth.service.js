import axios from "axios";

export const Login = (data, callback) => {
  axios
    .post("http://localhost:5000/login", data)
    .then((res) => callback(true, res))
    .catch((err) => callback(false, err));
};

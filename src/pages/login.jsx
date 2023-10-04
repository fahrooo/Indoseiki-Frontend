import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Login } from "../services/auth.service";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [login, setLogin] = useState(false);
  const [loginFailed, setLoginFailed] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    Login(data, (status, res) => {
      if (status) {
        localStorage.setItem("data", JSON.stringify(res.data.data));
        setLogin(status);
      } else {
        setLoginFailed(res.response.data.message);
      }
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      {login && <Navigate to="/users" replace={true} />}
      <div
        className="shadow-lg p-5 bg-white rounded rounded-3"
        style={{ width: "370px" }}
      >
        <h4 className="text-center fw-bold mb-4">Login</h4>
        {loginFailed && (
          <div
            className="alert alert-danger d-flex justify-content-center"
            role="alert"
          >
            {loginFailed}
          </div>
        )}
        <div className="box">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="FormEmail">
              <Form.Label className="fw-semibold">Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="true"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="********"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

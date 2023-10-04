import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="shadow-lg p-5 bg-white rounded rounded-3"
        style={{ width: "350px" }}
      >
        <h4 className="text-center fw-bold">Login</h4>
        <div className="mt-4">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control type="password" placeholder="********" />
            </Form.Group>
            <Button variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

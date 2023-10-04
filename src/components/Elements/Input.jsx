import Form from "react-bootstrap/Form";

const Input = (props) => {
  const { id, title, name, type, placeholder } = props;
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label className="fw-semibold">{title}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="true"
        required
      />
    </Form.Group>
  );
};

export default Input;

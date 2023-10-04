import Form from "react-bootstrap/Form";

const Input = (props) => {
  const { id, title, name, type, placeholder, value, setValue } = props;
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label className="fw-semibold">{title}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        autoComplete="true"
        required
      />
    </Form.Group>
  );
};

export default Input;

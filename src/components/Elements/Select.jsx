import Form from "react-bootstrap/Form";

const Select = (props) => {
  const { id, title, name, placeholder, value, setValue, data } = props;
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label className="fw-semibold">{title}</Form.Label>
      <Form.Select
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        required
      >
        <option disabled selected value="">
          {placeholder}
        </option>
        {data
          .filter((item) => item.value != "")
          .map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            );
          })}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;

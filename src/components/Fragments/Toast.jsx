import Toast from "react-bootstrap/Toast";

const ToastShow = (props) => {
  const { show, toggleShow, status, children, color } = props;
  return (
    <Toast show={show} onClose={toggleShow} className="position-absolute top-0 end-0 mt-5 me-2">
      <Toast.Header className={`bg-${color} text-white`}>
        <strong className="me-auto">{status}!</strong>
      </Toast.Header>
      <Toast.Body className="bg-white">{children}</Toast.Body>
    </Toast>
  );
};

export default ToastShow;

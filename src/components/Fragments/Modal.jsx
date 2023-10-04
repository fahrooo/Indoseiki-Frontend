import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ModalShow = ({
  show,
  handleClose,
  children,
  handleSubmit,
  title,
  titleButton,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="px-5">{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            {titleButton}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalShow;

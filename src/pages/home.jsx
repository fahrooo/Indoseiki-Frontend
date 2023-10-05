import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Navbar from "../components/Fragments/Navbar";
import { useEffect, useState } from "react";
import { getBook, putBook } from "../services/book.service";
import { postHistory } from "../services/history.service";
import ToastShow from "../components/Fragments/Toast";
import { useLogin } from "../hooks/useLogin";

const HomePage = () => {
  const [book, setBook] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [statusToast, setStatusToast] = useState("");
  const [messageToast, setMessageToast] = useState("");
  const [colorToast, setColorToast] = useState("");

  const toggleShowToast = () => setShowToast(!showToast);

  useEffect(() => {
    getBook((res) => {
      setBook(res.data);
    });
  }, [showToast]);

  const profile = useLogin();
  const handleBorrow = (id) => {
    let today = new Date().toISOString().slice(0, 10);

    const data = {
      idUser: profile.id,
      idBook: id,
      dateBorrow: today,
    };

    postHistory(data, (res) => {
      if (res.status === 200) {
        putBook(id, { isAvailable: false }, (res) => {
          if (res.status === 200) {
            setColorToast("success");
            setStatusToast("Berhasil");
            setMessageToast("Book Berhasil Dipinjam!");
            toggleShowToast();
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          } else {
            setColorToast("danger");
            setStatusToast("Gagal");
            setMessageToast("Book Gagal Dipinjam!");
            toggleShowToast();
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }
        });
      } else {
        setColorToast("danger");
        setStatusToast("Gagal");
        setMessageToast("Book Gagal Dipinjam!");
        toggleShowToast();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "50px 200px" }}>
        <ToastShow
          show={showToast}
          toggleShow={toggleShowToast}
          status={statusToast}
          color={colorToast}
        >
          {messageToast}
        </ToastShow>
        <h2 className="text-center mb-5">Please Borrow Your Book</h2>
        <Container>
          {book == undefined && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <h4>Data Not Found</h4>
            </div>
          )}
          <Row md={4}>
            {book != undefined &&
              book.map((item, index) => {
                return (
                  <Col
                    key={index}
                    className="d-flex flex-wrap justify-content-center align-items-center rounded p-1"
                  >
                    <div className="p-3 bg-dark text-white rounded">
                      <Image
                        src={`http://localhost:5000/images/${item.image}`}
                        thumbnail
                        className="object-fit-fill border rounded"
                        alt="cover-book"
                      />
                      <div
                        className="my-3 text-center"
                        style={{ height: "120px" }}
                      >
                        <h5>
                          {item.title} ({item.year})
                        </h5>
                        <h6>{item.author}</h6>
                        <p>{item.genre}</p>
                      </div>
                      <div className="">
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() => handleBorrow(item.id)}
                          disabled={item.isAvailable ? false : true}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePage;

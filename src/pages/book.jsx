import { ComboBox, DataGrid, GridColumn } from "rc-easyui";
import Navbar from "../components/Fragments/Navbar";
import { forwardRef, useEffect, useState } from "react";
import {
  deleteBook,
  getBook,
  postBook,
  putBook,
} from "../services/book.service";
import { Button } from "react-bootstrap";
import ModalShow from "../components/Fragments/Modal";
import Input from "../components/Elements/Input";
import ToastShow from "../components/Fragments/Toast";
import Select from "../components/Elements/Select";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";

import "react-datepicker/dist/react-datepicker.css";

const CustomDate = forwardRef(({ value, onClick }, ref) => (
  <button
    className="btn btn-outline-primary"
    style={{ width: "100%" }}
    onClick={onClick}
    ref={ref}
    type="button"
  >
    <h6 className="m-1">{value}</h6>
  </button>
));

CustomDate.displayName = "customDate";

const BookPage = () => {
  const [book, seBook] = useState([]);
  const [showTambah, setShowTambah] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [statusToast, setStatusToast] = useState("");
  const [messageToast, setMessageToast] = useState("");
  const [colorToast, setColorToast] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuhtor] = useState("");

  const handleShowTambah = () => {
    setTitle("");
    setGenre("");
    setAuhtor("");
    setStartDate(new Date());
    setShowTambah(true);
  };
  const handleCloseTambah = () => setShowTambah(false);

  const handleShowEdit = (id) => {
    const bookbyid = book.find((item) => item.id === id);
    setId(id);
    setTitle(bookbyid.title);
    setGenre(bookbyid.genre);
    setAuhtor(bookbyid.author);
    setStartDate(new Date(bookbyid.year, 11, 24));
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const handleShowDelete = (id) => {
    const bookbyid = book.find((item) => item.id === id);
    setId(id);
    setTitle(bookbyid.title);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);

  const toggleShowToast = () => setShowToast(!showToast);

  const handleSubmitTambah = (e) => {
    e.preventDefault();

    const data = {
      title,
      genre,
      author,
      year: startDate.getFullYear(),
      isAvailable: true,
      image: "test.jpg",
    };

    postBook(data, (res) => {
      if (res.status === 200) {
        setColorToast("success");
        setStatusToast("Berhasil");
        setMessageToast("Data Book Berhasil Ditambahkan!");
        toggleShowToast();
        handleCloseTambah();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setColorToast("danger");
        setStatusToast("Gagal");
        setMessageToast("Data Book Gagal Ditambahkan!");
        toggleShowToast();
        handleCloseTambah();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const data = {
      title,
      genre,
      author,
      year: startDate.getFullYear(),
    };

    putBook(id, data, (res) => {
      if (res.status === 200) {
        setColorToast("success");
        setStatusToast("Berhasil");
        setMessageToast("Data Book Berhasil Diubah!");
        toggleShowToast();
        handleCloseEdit();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setColorToast("danger");
        setStatusToast("Gagal");
        setMessageToast("Data Book Gagal Diubah!");
        toggleShowToast();
        handleCloseEdit();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    });
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();

    deleteBook(id, (res) => {
      if (res.status === 200) {
        setColorToast("success");
        setStatusToast("Berhasil");
        setMessageToast("Data Book Berhasil Dihapus!");
        toggleShowToast();
        handleCloseDelete();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setColorToast("danger");
        setStatusToast("Gagal");
        setMessageToast("Data Book Gagal Dihapus!");
        toggleShowToast();
        handleCloseDelete();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    getBook((res) => {
      seBook(res.data);
    });
  }, [showToast]);

  const genreFilter = [
    { value: "", text: "All" },
    { value: "Action", text: "Action" },
    { value: "Comedy", text: "Comedy" },
    { value: "Horror", text: "Horror" },
    { value: "Romance", text: "Romance" },
  ];

  return (
    <>
      <Navbar />
      <div style={{ padding: "50px 200px" }}>
        <h2>Data Book</h2>
        <div className="d-flex justify-content-end mb-2">
          <Button variant="success" type="button" onClick={handleShowTambah}>
            Tambah
          </Button>
        </div>
        <ToastShow
          show={showToast}
          toggleShow={toggleShowToast}
          status={statusToast}
          color={colorToast}
        >
          {messageToast}
        </ToastShow>
        {book == undefined && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h4>Data Not Found</h4>
          </div>
        )}
        {book != undefined && (
          <DataGrid data={book} multiSort filterable style={{ height: 400 }}>
            <GridColumn
              field="rn"
              align="center"
              width="30px"
              cellCss="datagrid-td-rownumber"
              render={({ rowIndex }) => <span>{rowIndex + 1}</span>}
            />
            <GridColumn field="title" title="Title" sortable></GridColumn>
            <GridColumn
              field="genre"
              title="Genre"
              sortable
              filter={() => (
                <ComboBox
                  data={genreFilter}
                  editable={false}
                  inputStyle={{ textAlign: "center" }}
                />
              )}
            ></GridColumn>
            <GridColumn field="author" title="Author" sortable></GridColumn>
            <GridColumn field="year" title="Year" align="center"></GridColumn>
            <GridColumn
              field="action"
              title="Action"
              align="center"
              render={({ row }) => (
                <div className="p-1">
                  <Button
                    variant="primary"
                    type="button"
                    className="btn-sm me-2"
                    onClick={() => handleShowEdit(row.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    className="btn-sm"
                    onClick={() => handleShowDelete(row.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            ></GridColumn>
          </DataGrid>
        )}
        <ModalShow
          show={showTambah}
          handleClose={handleCloseTambah}
          title="Tambah Book"
          titleButton="Submit"
          handleSubmit={handleSubmitTambah}
        >
          <Input
            id="FormTitle"
            title="Title"
            name="title"
            type="text"
            placeholder="Title Book"
            value={title}
            setValue={setTitle}
          />
          <Select
            id="FormGenre"
            title="Genre"
            name="genre"
            placeholder="Select Genre"
            value={genre}
            setValue={setGenre}
            data={genreFilter}
          />
          <Input
            id="FormAuthor"
            title="Author"
            name="auhtor"
            type="text"
            placeholder="Auhtor Book"
            value={author}
            setValue={setAuhtor}
          />
          <Form.Group className="mb-3" controlId="FormYear">
            <Form.Label className="fw-semibold">Year</Form.Label>
            <div className="d-grid">
              <DatePicker
                id="FormYear"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<CustomDate />}
                showYearPicker
                dateFormat="yyyy"
                name="year"
              />
            </div>
          </Form.Group>
        </ModalShow>
        <ModalShow
          show={showEdit}
          handleClose={handleCloseEdit}
          title="Edit Book"
          titleButton="Save"
          handleSubmit={handleSubmitEdit}
        >
          <Input
            id="FormTitle"
            title="Title"
            name="title"
            type="text"
            placeholder="Title Book"
            value={title}
            setValue={setTitle}
          />
          <Select
            id="FormGenre"
            title="Genre"
            name="genre"
            placeholder="Select Genre"
            value={genre}
            setValue={setGenre}
            data={genreFilter}
          />
          <Input
            id="FormAuthor"
            title="Author"
            name="auhtor"
            type="text"
            placeholder="Auhtor Book"
            value={author}
            setValue={setAuhtor}
          />
          <Form.Group className="mb-3" controlId="FormYear">
            <Form.Label className="fw-semibold">Year</Form.Label>
            <div className="d-grid">
              <DatePicker
                id="FormYear"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<CustomDate />}
                showYearPicker
                dateFormat="yyyy"
                name="year"
              />
            </div>
          </Form.Group>
        </ModalShow>
        <ModalShow
          show={showDelete}
          handleClose={handleCloseDelete}
          title="Delete Book"
          titleButton="Delete"
          handleSubmit={handleSubmitDelete}
          color="danger"
        >
          <h6>Apakah anda yakin ingin menghapus book {title}?</h6>
        </ModalShow>{" "}
      </div>
    </>
  );
};

export default BookPage;

import { DataGrid, GridColumn } from "rc-easyui";
import Navbar from "../components/Fragments/Navbar";
import { useEffect, useState } from "react";
import {
  deleteUsers,
  getUsers,
  postUsers,
  putUsers,
} from "../services/users.service";
import { Button } from "react-bootstrap";
import ModalShow from "../components/Fragments/Modal";
import Input from "../components/Elements/Input";
import ToastShow from "../components/Fragments/Toast";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showTambah, setShowTambah] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [statusToast, setStatusToast] = useState("");
  const [messageToast, setMessageToast] = useState("");
  const [colorToast, setColorToast] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowTambah = () => setShowTambah(true);
  const handleCloseTambah = () => setShowTambah(false);

  const handleShowEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setId(id);
    setName(user.name);
    setEmail(user.email);
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const handleShowDelete = (id) => {
    const user = users.find((user) => user.id === id);
    setId(id);
    setName(user.name);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);

  const toggleShowToast = () => setShowToast(!showToast);

  const handleSubmitTambah = (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: password,
    };

    postUsers(data, (res) => {
      if (res.status === 200) {
        setColorToast("success");
        setStatusToast("Berhasil");
        setMessageToast("Data User Berhasil Ditambahkan!");
        toggleShowToast();
        handleCloseTambah();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setColorToast("danger");
        setStatusToast("Gagal");
        setMessageToast("Data User Gagal Ditambahkan!");
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
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    putUsers(id, data, (res) => {
      if (res.status === 200) {
        setColorToast("success");
        setStatusToast("Berhasil");
        setMessageToast("Data User Berhasil Diubah!");
        toggleShowToast();
        handleCloseEdit();
        setPassword("");
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setColorToast("danger");
        setStatusToast("Gagal");
        setMessageToast("Data User Gagal Diubah!");
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

    deleteUsers(id, (res) => {
      if (res.status === 200) {
        setColorToast("success");
        setStatusToast("Berhasil");
        setMessageToast("Data User Berhasil Dihapus!");
        toggleShowToast();
        handleCloseDelete();
        setPassword("");
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setColorToast("danger");
        setStatusToast("Gagal");
        setMessageToast("Data User Gagal Dihapus!");
        toggleShowToast();
        handleCloseDelete();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    getUsers((res) => {
      setUsers(res.data);
    });
  }, [showToast]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "50px 200px" }}>
        <h2>Data Users</h2>
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
        {users == undefined && (
          <div className="d-flex justify-content-center align-items-center" style={{height: "400px"}}>
            <h4>Data Not Found</h4>
          </div>
        )}
        {users != undefined && (
          <DataGrid data={users} style={{ height: 400 }}>
            <GridColumn
              field="rn"
              align="center"
              width="30px"
              cellCss="datagrid-td-rownumber"
              render={({ rowIndex }) => <span>{rowIndex + 1}</span>}
            />
            <GridColumn field="name" title="Name"></GridColumn>
            <GridColumn field="email" title="Email"></GridColumn>
            <GridColumn
              field=""
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
          title="Tambah User"
          titleButton="Submit"
          handleSubmit={handleSubmitTambah}
        >
          <Input
            id="FormName"
            title="Name"
            name="name"
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            setValue={setName}
          />
          <Input
            id="FormEmail"
            title="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            setValue={setEmail}
          />
          <Input
            id="FormPassword"
            title="Password"
            name="password"
            type="password"
            placeholder="********"
            value={password}
            setValue={setPassword}
          />
        </ModalShow>
        <ModalShow
          show={showEdit}
          handleClose={handleCloseEdit}
          title="Edit User"
          titleButton="Save"
          handleSubmit={handleSubmitEdit}
        >
          <Input
            id="FormName"
            title="Name"
            name="name"
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            setValue={setName}
          />
          <Input
            id="FormEmail"
            title="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            setValue={setEmail}
          />
          <Input
            id="FormPassword"
            title="Password"
            name="password"
            type="password"
            placeholder="********"
            value={password}
            setValue={setPassword}
          />
        </ModalShow>
        <ModalShow
          show={showDelete}
          handleClose={handleCloseDelete}
          title="Delete User"
          titleButton="Delete"
          handleSubmit={handleSubmitDelete}
          color="danger"
        >
          <h6>Apakah anda yakin ingin menghapus user {name}?</h6>
        </ModalShow>
      </div>
    </>
  );
};

export default UsersPage;

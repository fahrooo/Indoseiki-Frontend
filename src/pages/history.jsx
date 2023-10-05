import { DataGrid, GridColumn } from "rc-easyui";
import { Button } from "react-bootstrap";
import Navbar from "../components/Fragments/Navbar";
import ToastShow from "../components/Fragments/Toast";
import { useEffect, useState } from "react";
import { getHistory, putHistory } from "../services/history.service";
import { useLogin } from "../hooks/useLogin";
import { putBook } from "../services/book.service";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [statusToast, setStatusToast] = useState("");
  const [messageToast, setMessageToast] = useState("");
  const [colorToast, setColorToast] = useState("");

  const toggleShowToast = () => setShowToast(!showToast);

  const profile = useLogin();

  useEffect(() => {
    getHistory((res) => {
      setHistory(res.data.filter((item) => item.idUser == profile.id));
    });
  }, [showToast, profile]);

  const handleReturn = (row) => {
    let today = new Date().toISOString().slice(0, 10);

    putHistory(row.id, { dateReturn: today }, (res) => {
      if (res.status === 200) {
        putBook(row.idBook, { isAvailable: true }, (res) => {
          if (res.status === 200) {
            setColorToast("success");
            setStatusToast("Berhasil");
            setMessageToast("Book Berhasil Dikembalikan!");
            toggleShowToast();
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          } else {
            setColorToast("danger");
            setStatusToast("Gagal");
            setMessageToast("Book Gagal Dikembalikan!");
            toggleShowToast();
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }
        });
      } else {
        setColorToast("danger");
        setStatusToast("Gagal");
        setMessageToast("Data User Gagal Diubah!");
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
        <h2>Data Users</h2>
        <ToastShow
          show={showToast}
          toggleShow={toggleShowToast}
          status={statusToast}
          color={colorToast}
        >
          {messageToast}
        </ToastShow>
        {history == undefined && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h4>Data Not Found</h4>
          </div>
        )}
        {history != undefined && (
          <DataGrid data={history} style={{ height: 400 }}>
            <GridColumn
              field="rn"
              align="center"
              width="30px"
              cellCss="datagrid-td-rownumber"
              render={({ rowIndex }) => <span>{rowIndex + 1}</span>}
            />
            <GridColumn
              field="book"
              title="Book"
              render={({ row }) => <div className="">{row.book.title}</div>}
            ></GridColumn>
            <GridColumn
              field="dateBorrow"
              title="Borrow Date"
              align="center"
            ></GridColumn>
            <GridColumn
              field="dateReturn"
              title="Date Return"
              align="center"
              render={({ row }) => (
                <div className="p-1">
                  {row.dateReturn == null ? (
                    <Button
                      variant="primary"
                      type="button"
                      className="btn-sm me-2"
                      onClick={() => handleReturn(row)}
                    >
                      Return
                    </Button>
                  ) : (
                    row.dateReturn
                  )}
                </div>
              )}
            ></GridColumn>
          </DataGrid>
        )}
      </div>
    </>
  );
};

export default HistoryPage;

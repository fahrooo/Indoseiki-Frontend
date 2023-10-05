import { Button } from "react-bootstrap";
import { utils, writeFile } from "xlsx";

const ExcelExport = ({ excelData, fileName }) => {
  const exportToExcel = async () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_json(ws, excelData, { origin: "A1", skipHeader: false });
    utils.book_append_sheet(wb, ws, fileName);
    writeFile(wb, fileName + ".xlsx");
  };

  return (
    <Button variant="success" onClick={() => exportToExcel()}>
      Export
    </Button>
  );
};

export default ExcelExport;

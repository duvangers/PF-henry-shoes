import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Datatable = ({
  name,
  buttonName,
  pathButton,
  rows,
  columns,
  rowsInPage,
}) => {
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {name}
        {buttonName ? (
          <Link to={pathButton ? pathButton : "/"} className="link">
            {buttonName}
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns}
        pageSize={rowsInPage}
        rowsPerPageOptions={[rowsInPage]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

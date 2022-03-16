import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const columns = [
  {
    field: "nutrientName",
    property: "Vitamin Name",
    minWidth: 170,
    // align: "center",
  },
  {
    field: "value",
    property: "Vitamin Amount",
    minWidth: 170,
    // align: "center",
    // editable: true,
  },
  {
    field: "unitName",
    property: "Vitamin Amount Unit",
    minWidth: 170,
    // align: "center",
  },
];

const SearchTable = ({ newData, authProps }) => {

  return (
    <div
      className="relative flex h-96 w-7/12 mx-auto overflow-hidden"
      // style={{ height: 400, width: "100%" }}
    >
      <DataGrid
        rows={newData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        className="absolute pl-4 "
      />
    </div>
  );
};

export default SearchTable;

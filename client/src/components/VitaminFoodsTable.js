import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const VitaminFoodsTable = ({ data }) => {

  const [gridData] = React.useState(data);

  const rows= [];

  data.foods.forEach((item, i) => {
    rows.push({ id: i+1, col1: item})
  });
  
  const columns = [
    { field: 'col1', headerName: "Foods with " + data.vitamin_name, width: 300 },
  ];


  return (
    <>
      <div
        className="relative flex h-96 w-7/12 mx-auto overflow-hidden"
        // style={{ height: 400, width: "100%" }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          className="absolute pl-4 "
        />
      </div>
    </>
  );
};

export default VitaminFoodsTable;
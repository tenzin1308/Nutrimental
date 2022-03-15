import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const columns = [
  {
    field: "{data.vitamin_name}",
    property: "Vitamin Name",
    minWidth: 170,
    // align: "center",
  },
];

const VitaminFoodsTable = ({ data }) => {
  const [gridData] = React.useState(data);


  // function to run timer to wait before executing next line
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));


  const newData = gridData.filter((item) => item.value > 0);
  newData.forEach((item, i) => {
    item.id = i + 1;
  });



  return (
    <>
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
    </>
  );
};

export default VitaminFoodsTable;
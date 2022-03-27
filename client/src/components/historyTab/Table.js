import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./FoodHistory";
import "./table.css";

const Table = ({ data, column, user_email}) => {
  const [editFormData, setEditFormData] = useState({
    food_name: "",
    amount: "",
    calories: "",
   
  });

  const [editEnable, setEditEnable] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //const [editID, setID] = useState(data);

  const editHandler = (event, item) => {
    event.preventDefault();

    setEditEnable(item._id);

    const formValues = {
      food_name: item.food_name,
      amount: item.amount,
      calories: item.calories,
      
    };
    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const cancelHandler = () => {
    setEditEnable(false);
  };


  const handleEditFormSubmit = async (id, index) => {
    await axios
      .put(
        `/api/food-history/put/?id=${id}&user_email=${user_email}`,
          {
            food_name: editFormData.food_name,
            amount: editFormData.amount,
            calories: editFormData.calories,
          }
      )
      .then((res) => {
        console.log('res =>',res);
        toast.success("Food updated successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setEditFormData({
      food_name: "",
      amount: "",
      calories: "",
    });
    setEditEnable(!editEnable);
    data[index].food_name = editFormData.food_name;
    data[index].amount = editFormData.amount;
    data[index].calories = editFormData.calories;
    
    
    
    
    setRefresh(true);
    setRefresh(false);
    setRefresh(true);
    setRefresh(false);
  };

  const deleteHandler = async (item, index) => {
    if (window.confirm("Are you sure you want to delete")) {
      await axios
        .delete(
          `/api/food-history/delete/?user_email=${user_email}&_id=${item}`
        )
        .then((res) => {
          toast.success("Food deleted successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
      data.splice(index, 1);
      setRefresh(true);
      setRefresh(false);
      setRefresh(true);
      setRefresh(false);
    }
  };
  useEffect(() => {}, [refresh, data]);

  return (
    <form className="food-history-form">
      <table
        className="food-history-table"
        // className="table-auto"
        // className="max-w-[900px] border-collapse w-[200%] my-2 mx-auto"
      >
        <thead>
          <tr>
            {column.map((item, index) => (
              <TableHeadItem item={item} key={index} />
            ))}
            <th
              className="food-history-table-th"
              //  className="border-2 border-solid border-blue-600 p-2"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <Fragment>
                <TableRow
                  item={item}
                  index={index}
                  editHandler={editHandler}
                  editEnable={editEnable}
                  cancelHandler={cancelHandler}
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleEditFormSubmit={handleEditFormSubmit}
                  deleteHandler={deleteHandler}
                />
              </Fragment>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

const TableHeadItem = ({ item}) => (
  <th className="food-history-table-th">{item.heading}</th>
);
const TableRow = ({
  item,
  index,
  editHandler,
  editEnable,
  cancelHandler,
  deleteHandler,
  handleEditFormSubmit,
  editFormData,
  handleEditFormChange,
}) => {
  useEffect(() => {}, [editFormData]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const monthName = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.toLocaleTimeString("en-US", 
      { hour: "numeric", minute: "2-digit", hour12: true, });
  
    return `${monthName} ${day}, ${year}: ${hour}`;
  };

  return (
    <>
      <td className="food-history-table-td"> {formatDate(item.date)} </td>
      <td className="food-history-table-td">
        {item._id === editEnable ? (
          <input
            type="text"
            required="required"
            placeholder={item.food_name}
            name="food_name"
            value={editFormData.food_name}
            onChange={handleEditFormChange}
          ></input>
        ) : (
          item.food_name
        )}
      </td>

      <td className="food-history-table-td">
        {item._id === editEnable ? (
          <input
            type="text"
            required="required"
            placeholder={item.amount}
            name="amount"
            value={editFormData.amount}
            onChange={handleEditFormChange}
          ></input>
        ) : (
          item.amount
        )}
      </td>

      <td className="food-history-table-td">
        {item._id === editEnable ? (
          <input
            type="text"
            required="required"
            placeholder={item.calories}
            name="calories"
            value={editFormData.calories}
            onChange={handleEditFormChange}
          ></input>
        ) : (
          item.calories
        )}
      </td>

      {/* <td className="food-history-table-td flex justify-evenly">
       */}

      <td className="food-history-table-td">
        {item._id === editEnable ? (
          <div className="flex justify-between">
            <CheckIcon onClick={() => handleEditFormSubmit(item._id, index)} />
            <CancelPresentationSharpIcon onClick={cancelHandler} />
          </div>
        ) : (
          <div className="flex justify-between">
            <EditIcon onClick={(event) => editHandler(event, item)} />
            <DeleteForeverIcon onClick={() => deleteHandler(item._id, index)} />
          </div>
        )}
      </td>
    </>
  );
};

export default Table;
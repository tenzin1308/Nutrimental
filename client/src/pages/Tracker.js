import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import AccountLayout from "../components/AccountLayout";
import FoodHistory from "../components/historyTab/FoodHistory";
import MacroTracker from "../components/track/MacroTracker";
import NutrientAdvice from "../components/track/NutrientAdvice";

const TABS = ["Nutrient Tracker", "Nutrient Advice", "Food History"];

const Tracker = ({ authProps }) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [dateState, setDateState] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState("");
  const [userSelected, setUserSelected] = useState(false);

  const changeDate = (e) => {
    setDateState(e);
  };

  const buttonHandler = () => {
    if (selectedUser === "") {
      toast.error("You have not selected a user. Please choose a user.");
    } else {
      setUserSelected(true);
    }
  };

  const handleSelectedUser = (e) => {
    setSelectedUser(e.target.value);
  };

  return authProps.isAuthenticated && authProps.session ? (
    authProps.user.isdietitian ? (
      <div>
        <FormControl fullWidth={true}>
          <InputLabel>Please select a user</InputLabel>
          <Select value="" label="Place Holder" onChange={handleSelectedUser}>
            {authProps.user.whoUser.map((item, i) => {
              return (
                <MenuItem value={item} index={i} key={i}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <button
          className="text px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-2 my-3"
          onClick={buttonHandler}
        >
          View Dietary Information
        </button>
        {userSelected ? (
          <div className="w-screen h-auto">
            <AccountLayout
              tabsLst={["Nutrient Tracker", "Food History"]}
              handleTabUpdate={setSelectedTab}
              selectedTab={selectedTab}
              comps={
                selectedTab === "Nutrient Tracker" && (
                  <div className="flex flex-row items-center">
                    <img
                      src="https://img.icons8.com/ios/50/000000/calendar--v1.png"
                      className="w-5 h-5 -mr-10"
                      alt="calendar-icon"
                    />
                    <DatePicker
                      selected={dateState}
                      onChange={changeDate}
                      popperPlacement="bottom-end"
                      className="cursor-pointer pl-14 w-40 bg-transparent border-gray-300"
                    />
                  </div>
                )
              }
            >
              <div className="p-4 w-full">
                {selectedTab === "Nutrient Tracker" ? (
                  <div>
                    <MacroTracker
                      authProps={authProps}
                      date={dateState}
                      role={authProps.user.isdietitian}
                      clientEmail={selectedUser}
                    />
                  </div>
                ) : (
                  selectedTab === "Food History" && (
                    <div>
                      <FoodHistory user_email={selectedUser} />
                    </div>
                  )
                )}
              </div>
            </AccountLayout>
          </div>
        ) : (
          //<div>UserSelected is currently false so this is being displayed instead</div>
          <div></div>
        )}
      </div>
    ) : (
      <div className="w-screen h-auto">
        <AccountLayout
          tabsLst={TABS}
          handleTabUpdate={setSelectedTab}
          selectedTab={selectedTab}
          comps={
            selectedTab === "Nutrient Tracker" && (
              <div className="flex flex-row items-center">
                <img
                  src="https://img.icons8.com/ios/50/000000/calendar--v1.png"
                  className="w-5 h-5 -mr-10"
                  alt="calendar-icon"
                />
                <DatePicker
                  selected={dateState}
                  onChange={changeDate}
                  popperPlacement="bottom-end"
                  className="cursor-pointer pl-14 w-40 bg-transparent border-gray-300"
                />
              </div>
            )
          }
        >
          <div className="p-4 w-full">
            {selectedTab === "Nutrient Tracker" ? (
              <div>
                <MacroTracker
                  authProps={authProps}
                  date={dateState}
                  role={authProps.user.isdietitian}
                  clientEmail={""}
                />
              </div>
            ) : selectedTab === "Nutrient Advice" ? (
              <div>
                <NutrientAdvice />
              </div>
            ) : (
              selectedTab === "Food History" && (
                <div>
                  <FoodHistory user_email={authProps.user.user_email} />
                </div>
              )
            )}
          </div>
        </AccountLayout>
      </div>
    )
  ) : (
    <div>404 page</div>
  );
};

export default Tracker;

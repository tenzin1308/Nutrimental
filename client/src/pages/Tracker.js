import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AccountLayout from "../components/AccountLayout";
import FoodHistory from "../components/historyTab/FoodHistory";
import MacroTracker from "../components/track/MacroTracker";
import NutrientAdvice from "../components/track/NutrientAdvice";

const TABS = ["Nutrient Tracker", "Nutrient Advice", "Food History"];

const Tracker = ({ authProps }) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [dateState, setDateState] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const changeDate = (e) => {
    setDateState(e);
  };

  const handleSelectedUser = (e) => {
    setSelectedUser(e.target.value);
    setIsSelected(!isSelected);
  };

  useEffect(() => { }, [isSelected]);

  return authProps.isAuthenticated && authProps.session ? (
    authProps.user.isdietitian ? (
      <div className="w-screen h-auto">
        {!isSelected ?
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
          : <>
            {/* display the selected User at the center of the screen and cross button next to it which reset the isSelected to false */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <h3 className="text-center">{selectedUser}</h3>
                <button
                  className="flex items-center justify-center"
                  onClick={() => setIsSelected(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414L10 14.586l6.293-6.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>

        }
        {isSelected ? (
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
          //<div>isSelected is currently false so this is being displayed instead</div>
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

import React, { useState, useEffect } from "react";
import AccountLayout from "../components/AccountLayout";
import MacroTracker from "../components/track/MacroTracker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TABS = ["Nutrient Tracker", "Nutrient Advice", "Food History"];

const Tracker = ({ authProps }) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };

  return (
    authProps.isAuthenticated &&
    authProps.session && (
      <div className="w-screen h-auto">
        <AccountLayout
          tabsLst={TABS}
          handleTabUpdate={setSelectedTab}
          selectedTab={selectedTab}
          comps={
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
          }
        >
          <div className="p-4 w-full">
            {selectedTab === "Nutrient Tracker" ? (
              <div>
                <MacroTracker
                  user_email={authProps.user.user_email}
                  date={dateState}
                />
              </div>
            ) : selectedTab === "Nutrient Advice" ? (
              <div>
                <h1>{selectedTab}</h1>
              </div>
            ) : (
              selectedTab === "Food History" && (
                <div>
                  <h1>{selectedTab}</h1>
                </div>
              )
            )}
          </div>
        </AccountLayout>
      </div>
    )
  );
};

export default Tracker;

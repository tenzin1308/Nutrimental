import React, { useState, useEffect } from "react";
import AccountLayout from "../components/AccountLayout";
import MacroTracker from "../components/track/MacroTracker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TABS = ["Nutrient Tracker", "Nutrient Advice", "Food History"];

const Tracker = ({ authProps }) => {
  const [selectedTab, setSelectedTab] = React.useState(TABS[0]);
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };

  useEffect(() => {}, [selectedTab, dateState]);

  return (
    authProps.isAuthenticated &&
    authProps.session && (
      <div className="w-screen h-auto">
        <AccountLayout
          tabsLst={TABS}
          handleTabUpdate={setSelectedTab}
          selectedTab={selectedTab}
          comps={<Calendar value={dateState} onChange={changeDate} />}
        >
          <div className="p-4 w-full">
            {/* <h1 className=" text-5xl">ITS WORKING!! THE TRACKER PAGE</h1>
            <br /> */}
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

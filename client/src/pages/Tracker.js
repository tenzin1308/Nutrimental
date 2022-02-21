import React, { useEffect } from "react";
import AccountLayout from "../components/AccountLayout";
import MacroTracker from "../components/track/MacroTracker";

const TABS = [
  "Macro Tracker",
  "Nutrient Tracker",
  "Nutrient Advice",
  "Food History",
];

const Tracker = ({ authProps }) => {
  const [selectedTab, setSelectedTab] = React.useState(TABS[0]);

  useEffect(() => {}, [selectedTab]);

  return (
    authProps.isAuthenticated &&
    authProps.session && (
      <AccountLayout
        tabsLst={TABS}
        handleTabUpdate={setSelectedTab}
        selectedTab={selectedTab}
      >
        <div className="p-4">
          <h1 className=" text-5xl">ITS WORKING!! THE TRACKER PAGE</h1>
          <br />
          {selectedTab === "Nutrient Tracker" ? (
            <div>
              <MacroTracker user_email={authProps.user.user_email} />
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
    )
  );
};

export default Tracker;

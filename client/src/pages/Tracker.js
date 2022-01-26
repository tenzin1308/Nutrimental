import React, { useEffect } from "react";
import AccountLayout from "../components/AccountLayout";

const TABS = [
  "Macro Tracker",
  "Nutrient Tracker",
  "Nutrient Advice",
  "Food History",
];

const Tracker = () => {
  const [selectedTab, setSelectedTab] = React.useState(TABS[0]);

  useEffect(() => {}, [selectedTab]);

  return (
    <AccountLayout
      tabsLst={TABS}
      handleTabUpdate={setSelectedTab}
      selectedTab={selectedTab}
    >
      <div className="p-4">
        <h1 className=" text-5xl">ITS WORKING!! THE TRACKER PAGE</h1>
        <br />
        {selectedTab === "Macro Tracker" ? (
          <div>
            <h1>{selectedTab}</h1>
          </div>
        ) : selectedTab === "Nutrient Tracker" ? (
          <div>
            <h1>{selectedTab}</h1>
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
  );
};

export default Tracker;

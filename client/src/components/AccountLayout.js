import React from "react";
import Tabs from "./Tabs";

const AccountLayout = ({
  tabsLst = ["placeholder"],
  children,
  comps,
  selectedTab,
  handleTabUpdate,
  showTabs = true,
  className = "",
}) => {
  return (
    <div className="flex justify-center py-8 w-full">
      <div className={`py-8 px-4 shadow w-2/3 ${className}`}>
        {showTabs ? (
          <>
            <div className="flex justify-between">
              <div className="flex items-start justify-center">
                <Tabs
                  className="text-3xl font-extrabold text-black shadow"
                  tabs={tabsLst}
                  selectedTab={selectedTab}
                  handleTabUpdate={handleTabUpdate}
                />
              </div>
              <div>{comps}</div>
            </div>
            <div className="mt-4 px-4 shadow">{children}</div>
          </>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

export default AccountLayout;

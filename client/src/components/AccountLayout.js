import React from "react";
import Tabs from "./Tabs";

const AccountLayout = ({
  tabsLst = ["placeholder"],
  children,
  selectedTab,
  handleTabUpdate,
}) => {
  return (
    <div className="flex-col justify-start py-8 sm:px-6 lg:px-8 w-auto sm:mx-24 md:mx-44 lg:mx-44">
      <div className="sm:mx-auto">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="items-start justify-between flex">
            <Tabs
              className="text-3xl font-extrabold text-black shadow sm:rounded-lg"
              tabs={tabsLst}
              selectedTab={selectedTab}
              handleTabUpdate={handleTabUpdate}
            />
          </div>
          <div className="mt-4 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function TabsWrappedLabel({
  tabs = [],
  className = "",
  selectedTab = "",
  handleTabUpdate,
}) {
  // const [selected, setSelected] = React.useState(selectedTab);

  const handleChange = (event, newValue) => {
    // setSelected(newValue);
    handleTabUpdate(newValue);
  };

  return (
    <Box className={className}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        {tabs.map((val, i) => (
          <Tab value={val} label={val} key={val} />
        ))}
        {/* <Tab
          value="one"
          label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
          wrapped
        />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" /> */}
      </Tabs>
    </Box>
  );
}
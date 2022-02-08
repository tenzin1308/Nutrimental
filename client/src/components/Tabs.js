import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

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
      </Tabs>
    </Box>
  );
}

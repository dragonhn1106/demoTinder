import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

TabPanel.propTypes = {};

function TabPanel(props) {
  const { children, value, index, title, subTitle, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <p style={{ margin: 0, fontSize: 14, fontWeight:"bold", color: '#999999'}}>{title}</p>
          <p style={{ margin: 0, fontSize: 18, fontWeight:"bold", color: '#2d2e31', marginTop: 5}}>{subTitle}</p>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;

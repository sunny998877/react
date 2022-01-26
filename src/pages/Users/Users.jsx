import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useStyles } from './style';
import AddUser from './AddUser/AddUser';
// import AddAgent from './AddAgent/AddAgent';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const Users = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="User" {...a11yProps(0)} />
        <Tab label="Agent" {...a11yProps(1)} />
      </Tabs>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AddUser />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {/* <AddAgent /> */}
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
};

export default Users;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

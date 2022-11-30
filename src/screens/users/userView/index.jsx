import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useDocument } from "react-firebase-hooks/firestore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SummarizeIcon from "@mui/icons-material/Summarize";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import { doc } from "firebase/firestore";

import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import Settings from "./Settings";
import Summary from "./Summary";
import { db } from "../../../firebase";
import Events from "./Events";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: "5px" }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserView = () => {
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);

  const [value] = useDocument(doc(db, "users", id), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log("Value1....", value?.data().subjectId);
  const user = value?.data();
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const linkStyle = {
    //margin: "1rem",
    textDecoration: "none",
    color: "white",
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (user === undefined) return <></>;

  const tabsOption = [
    {
      label: "Summary",
      icon: <SummarizeIcon sx={{ fontSize: "1.3rem" }} />,
    },
    {
      label: "Events",
      icon: <RestaurantIcon sx={{ fontSize: "1.3rem" }} />,
    },
    {
      label: "Settings",
      icon: <ManageAccountsIcon sx={{ fontSize: "1.3rem" }} />,
    },
  ];

  return (
    <Box m="10px">
      <Box
        pt="10px"
        pb="10px"
        sx={{
          borderColor: "divider",
        }}
      >
        <Breadcrumbs
          sx={{
            color: colors.grey[100],
          }}
        >
          <Link underline="hover" color="inherit" to={"/"} style={linkStyle}>
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            to={"/users"}
            style={linkStyle}
          >
            Users
          </Link>
          <Typography color="text.primary">
            {value?.data().subjectId}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Header
        title="Participant Dashboard"
        subtitle={`Participant ID: ${value?.data().subjectId}`}
      />

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: "20px",
        }}
      >
        <Tabs
          value={tabIndex}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="user edit tabs"
          variant="scrollable"
          sx={{
            mb: 1,
            "& a": {
              minHeight: "auto",
              py: 1.5,
              px: 1,
              mr: 1.25,
              color: theme.palette.grey[600],
              flexDirection: "row",
            },
            "& a.Mui-selected": {
              color: theme.palette.secondary.main,
            },
            "& .MuiTabs-indicator": {
              bottom: 2,
            },
            "& a > svg": {
              marginBottom: "0px !important",
              mr: 1.25,
            },
          }}
        >
          {tabsOption.map((tab, index) => (
            <Tab
              key={index}
              component={Link}
              to="#"
              icon={tab.icon}
              label={tab.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <Summary />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Events />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <Settings />
      </TabPanel>
    </Box>
  );
};

export default UserView;

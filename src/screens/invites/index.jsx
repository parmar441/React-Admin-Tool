import { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import moment from "moment";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import AddIcon from "@mui/icons-material/Add";

import { db } from "../../firebase";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddInvite from "./AddInvite";

const Invites = () => {
  const useCollectionData = (query, idField = "id") => {
    const [value, loading, error] = useCollection(query);

    const data = [];
    if (!loading) {
      value.forEach((snap) => {
        data.push({
          ...snap.data(),
          [idField]: snap.id,
        });
      });
    }

    return [data, loading, error];
  };

  const invitesRef = collection(db, "invites");
  const [invites, loading] = useCollectionData(invitesRef);
  const [pageSize, setPageSize] = useState(10);
  const [inviteData, setInviteData] = useState();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (invite = null) => {
    setInviteData(invite.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("INVITES MOUNTED");
    return () => {
      console.log("INVITES UNMOUNTED");
    };
  }, []);

  if (loading) {
    return <></>;
  }

  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "subjectId",
      headerName: "Participant ID",
      flex: 1,
      cellClassName: "participantId-column--cell",
    },
    {
      field: "pin",
      headerName: "PIN",
      flex: 1,
      cellClassName: "pin-column--cell",
    },
    {
      field: "isRegistered",
      headerName: "Registered",
      flex: 1,
      cellClassName: "isRegistered-column--cell",
      valueFormatter: (params) => (params?.value === true ? "Yes" : "No"),
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mode",
      headerName: "Mode",
      flex: 1,
      cellClassName: "timestamp-column--cell",
      valueFormatter: (params) => {
        return params?.value === undefined
          ? "Event"
          : params?.value === 0
          ? "Event"
          : "Interval";
      },
    },
    {
      field: "timestamp",
      headerName: "Registered On",
      flex: 1,
      cellClassName: "timestamp-column--cell",
      valueFormatter: (params) => {
        return params?.value !== undefined
          ? moment(params?.value.toDate()).format("MM/DD/YYYY h:mm A")
          : "";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      //hide: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Box
              m="2px"
              p="2px"
              justifyContent="center"
              borderRadius="4px"
              backgroundColor={colors.greenAccent[600]}
            >
              <Button
                onClick={(event) => handleClickOpen(params)}
                sx={{
                  color: colors.grey[100],
                  padding: "0px 5px 0px 5px",
                }}
              >
                Edit
              </Button>
            </Box>
          </>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="inherit">
        <GridToolbarContainer>
          <GridToolbarColumnsButton
            sx={{
              color: colors.primary[100],
            }}
          />
          <GridToolbarFilterButton
            sx={{
              color: colors.primary[100],
            }}
          />
        </GridToolbarContainer>
        <Button
          onClick={handleClickOpen}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 30px",
            marginBottom: "5px",
          }}
        >
          <AddIcon sx={{ mr: "5px" }} />
          Add
        </Button>
      </Box>
    );
  }

  return (
    <Box m="20px" id="parentCo" style={{ position: "relative" }}>
      <Header title="Invites" subtitle="List of Invites" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          getRowId={(r) => r.subjectId}
          rows={invites || []}
          columns={columns}
          rowsPerPageOptions={[10, 25, 50]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            panel: {
              sx: {
                "& .MuiTypography-root": {
                  color: colors.primary[100],
                },
                "& .MuiDataGrid-filterForm": {
                  bgcolor: colors.primary[400],
                },
              },
            },
          }}
        />
      </Box>
      <AddInvite
        open={open}
        inviteData={inviteData}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default Invites;

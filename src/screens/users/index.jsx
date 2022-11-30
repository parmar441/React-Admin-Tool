import { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { CSVLink } from "react-csv";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import { db } from "../../firebase";
import {
  exportHeaders,
  userData as studyExportData,
} from "../../utils/exportHelper";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const useCollectionData = (query, idField = "id") => {
    const [value, loading, error] = useCollection(query);
    const data = [];
    if (!loading) {
      value.forEach((snap) => {
        const user = { ...snap.data() };
        data.push({
          ...user,
          [idField]: snap.id,
        });
      });
    }
    return [data, loading, error];
  };

  const [users, loading] = useCollectionData(collection(db, "users"));

  const navigate = useNavigate();

  useEffect(() => {
    console.log("USERS MOUNTED");
    return () => {
      console.log("USERS UNMOUNTED");
    };
  }, []);

  const [pageSize, setPageSize] = useState(25);

  if (loading) {
    return <></>;
  }

  const columns = [
    {
      field: "id",
      headerName: "Id",
      cellClassName: "id-column--cell",
      hide: true,
    },
    {
      field: "subjectId",
      headerName: "Participant ID",
      flex: 0.75,
      cellClassName: "participantId-column--cell",
    },
    {
      field: "mode",
      headerName: "Mode",
      flex: 1.5,
      cellClassName: "dayOneFastingGlucoseTimestamp-column--cell",
      valueGetter: (params) => {
        const {
          row: { mode },
        } = params;
        return mode === 0 ? "Event" : "Interval";
      },
      valueFormatter: (params) => params?.value,
    },
    {
      field: "timestamp",
      headerName: "Created",
      flex: 1.5,
      cellClassName: "timestamp-column--cell",
      valueGetter: (params) => {
        const {
          row: { timestamp },
        } = params;
        return moment.utc(timestamp.toDate()).format("lll");
      },
      valueFormatter: (params) => params?.value,
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
                component={Link}
                to={`/userView/${params.id}`}
                sx={{
                  color: colors.grey[100],
                  padding: "0px 5px 0px 5px",
                }}
              >
                Dashboard
              </Button>
            </Box>
          </>
        );
      },
    },
  ];

  const exportData = studyExportData(users);

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
        <Box>
          <CSVLink
            headers={exportHeaders}
            data={exportData}
            filename={`mEMDA-${moment.utc().format("YYYY-MM-DD HHmmss")}.csv`}
            style={{ textDecoration: "none" }}
          >
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                mb: "10px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Exports
            </Button>
          </CSVLink>
        </Box>
      </Box>
    );
  }

  // sort copy of users array to handle read only error
  const sortedData = [...users];

  return (
    <Box m="20px">
      <Header title="Participants" subtitle="List of Participants" />
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
          autoHeight
          onRowClick={(params, event) => {
            if (!event.ignore) {
              navigate(`/userView/${params.row.id}`);
            }
          }}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          getRowId={(row) => row.id}
          rows={sortedData}
          columns={columns}
          rowHeight={45}
          rowsPerPageOptions={[25, 50, 100]}
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
    </Box>
  );
};

export default Users;

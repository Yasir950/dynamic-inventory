import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import DataTable from "react-data-table-component";
import { ExportBtn } from "styled/styled";
import { ExportIcon } from "assets/images/users/Svg";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import VehicleHistory from "pages/vehicles/vehicleHistory";

export const ReactTable = ({
  column,
  rows,
  name,
  search,
  pending,
  totalPrice,
  calculateTotal,
  disablePagination,
}) => {
  const [filteredRows, setFilteredRows] = React.useState([]); // Initialize as empty array
  const [state, setState] = useState({
    vehicleDetail: false,
    vehicle: [],
  });
  React.useEffect(() => {
    setFilteredRows(rows); // Update filteredRows when rows change
  }, [rows]);
  const Export = ({ onExport }) => (
    <ExportBtn onClick={(e) => onExport(e.target.value)}>
      <Stack
        direction={"row"}
        alignContent={"center"}
        justifyContent={"center"}
        spacing={1}
      >
        <ExportIcon />
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
          Export
        </Typography>
      </Stack>
    </ExportBtn>
  );
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleSearch = (event) => {
      const query = event.target.value.toLowerCase();
      const filtered = rows.filter((row) => {
        return (
          row.current_status?.name?.toLowerCase().includes(query) ||
          // add any other fields you want to search
          Object.values(row).some(
            (value) =>
              typeof value === "string" && value.toLowerCase().includes(query)
          )
        );
      });
      if (filtered && totalPrice === 1) {
        calculateTotal(filtered);
        setFilteredRows(filtered);
      } else if (filtered && totalPrice === 2) {
        calculateTotal(filtered);

        setFilteredRows(filtered);
      } else {
        setFilteredRows(filtered);
      }
    };

    return (
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography
          sx={{ fontSize: "18px", fontWeight: 500, color: "#101828" }}
        >
          {name}
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Export onExport={() => downloadCSV(filteredRows)} />
          {!search && (
            <FormControl
              sx={{
                width: { xs: "100%", md: 210 },
                height: "50px",
                background: "#ffffff",
              }}
            >
              <OutlinedInput
                onChange={handleSearch}
                size="small"
                id="header-search"
                sx={{ borderRadius: "6px" }}
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: -0.5 }}>
                    <SearchOutlined />
                  </InputAdornment>
                }
                aria-describedby="header-search-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                placeholder="Search"
              />
            </FormControl>
          )}
        </Stack>
      </Stack>
    );
  }, [filteredRows]);

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(filteredRows[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array?.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <CircularProgress />
      <div>Loading...</div>
    </div>
  );
  const handleRowClick = (row) => {
    if (row.vin) {
      setState((prev) => ({
        ...prev,
        vehicleDetail: true,
        vehicle: row.history,
      }));
      // You can add more logic here if needed, like fetching vehicle details
    }
  };
  const handleDetailModel = () => {
    setState((prev) => ({
      ...prev,
      vehicleDetail: !state.vehicleDetail,
      vehicle: [],
    }));
  };
  const customStyles = {
    rows: {
      style: {
        cursor: "pointer", // 👈 This will change the cursor to pointer
      },
    },
  };
  return (
    <>
      <DataTable
        columns={column}
        data={filteredRows}
        selectableRows
        pagination={search || !disablePagination}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        progressComponent={<CustomLoader />}
        progressPending={pending}
        paginationRowsPerPageOptions={[100, 200, 300, 400, 500]}
        onRowClicked={handleRowClick}
        customStyles={customStyles}
      />
      <div>
        {disablePagination && (
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#101828",
              marginTop: 2,
              padding: "20px",
              gap: "150px",
              display: "flex",
            }}
          >
            <span>Total</span>{" "}
            {/* <span>
              {filteredRows?.reduce(
                (acc, item) => acc + Number(item.amount),
                0
              )}
            </span>{" "}
            <span style={{ marginLeft: "-35px" }}>
              {filteredRows?.reduce(
                (acc, item) => acc + Number(item.balance),
                0
              )}
            </span>{" "} */}
          </Typography>
        )}
      </div>
      <Dialog
        open={state.vehicleDetail}
        onClose={handleDetailModel}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{ fontWeight: "bold", textAlign: "center", fontSize: "24px" }}
        >
          Vehicle History
        </DialogTitle>
        <DialogContent>
          {state.vehicle && state?.vehicle.length !== 0 ? (
            <VehicleHistory data={state.vehicle} />
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <Typography sx={{ fontSize: "18px" }}>
                No vehicle history available.
              </Typography>
            </div>
          )}
          {/* <List>
            {state.vehicle.length !== 0 ? (
              state.vehicle.map((item, index) => {
                const statusId = item.status?.id;
                const statusName = item.status?.name;
                const config = statusConfig[statusId] || {};

                return (
                  <ListItem
                    key={index}
                    sx={{
                      borderRadius: 2,
                      mb: 2,
                      px: 2,
                      py: 1.5,
                    }}
                  >
                    <ListItemIcon>
                      <Typography fontSize={24}>
                        {config.icon || "❓"}{" "}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">
                          Status:{" "}
                          <span style={{ color: config.color }}>
                            {statusName || "Unknown"}
                          </span>
                        </Typography>
                      }
                      secondary={
                        <>
                          {item.note_details && (
                            <Typography>Note: {item.note_details}</Typography>
                          )}
                          {item.created_at && (
                            <Typography>
                              Date: {new Date(item.created_at).toLocaleString()}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                );
              })
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <Typography sx={{ fontSize: "18px" }}>
                  No vehicle history available.
                </Typography>
              </div>
            )}
          </List> */}
        </DialogContent>
        <DialogActions>
          <ExportBtn onClick={handleDetailModel}>Cancel</ExportBtn>
        </DialogActions>
      </Dialog>
    </>
  );
};

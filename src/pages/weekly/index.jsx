import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import React, { useEffect, useState } from "react";
import { getWeeklyData, updateData } from "apiservices";
import EditableTable from "pages/extra-pages/sample-page";
import { useSelector } from "react-redux";
import { FilterIcon } from "assets/images/users/Svg";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import WeeklyTable from "./weeklyTable";

// ===============================|| COMPONENT - SKU ||=============================== //

function createData(item) {
  return {
    sku: item.sku,
    total_consumed: item.total_consumed,
    week_number: item.week_number,
  };
}

export default function WeeklyComp() {
  const [pending, setPending] = useState(true);
  const [state, setState] = useState({ userData: [] });

  const updatedObj = useSelector((state) => state.user.updatedObj);
  const [week, setWeek] = useState("");

  // Create array of 52 weeks
  const weeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);

  const handleChange = (event) => {
    getContainersData(event.target.value);
    setWeek(event.target.value);
  };

  useEffect(() => {
    getContainersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedObj]);

  const getContainersData = async (week = "") => {
    try {
      setPending(true);
      const res = await getWeeklyData(
        "daily-consumption/weekly_buckets",
        week ? week : ""
      );

      if (!Array.isArray(res)) {
        console.warn("getData did not return an array:", res);
        setState((prev) => ({ ...prev, userData: [] }));
        setPending(false);
        return;
      }

      const rowsData = res.map((item) => createData(item));
      setState((prev) => ({ ...prev, userData: rowsData }));
    } catch (err) {
      console.error("Failed to fetch SKUs:", err);
      setState((prev) => ({ ...prev, userData: [] }));
    } finally {
      setPending(false);
    }
  };

  // group rows by week_number
  const groupedData = state.userData.reduce((acc, item) => {
    if (!acc[item.week_number]) acc[item.week_number] = [];
    acc[item.week_number].push(item);
    return acc;
  }, {});

  const columnsConfig = [
    { name: "SKU", selectorField: "sku" },
    { name: "Total Consumed", selectorField: "total_consumed", type: "number" },
    // { name: "Week Number", selectorField: "week_number", type: "number" },
  ];

  const handleSave = async (updatedData) => {
    console.log("Parent received updated data:", updatedData);
    let res = await updateData(
      updatedData,
      updatedData?.id,
      "daily-consumption/weekly_buckets"
    );
    console.log("Update response:", res);
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
        >
          Weekly Consumption
          <Breadcrumbs title="Adjustments" />
        </Typography>
        <div
          style={{
            width: "328px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FilterIcon />
          <FormControl fullWidth>
            <InputLabel id="week-select-label">All Week</InputLabel>
            <Select
              labelId="week-select-label"
              value={week}
              onChange={handleChange}
            >
              {weeks.map((w, index) => (
                <MenuItem key={index} value={index + 1}>
                  {w}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Stack>

      {/* render a table per week group */}
      {Object.entries(groupedData).map(([weekNum, rows]) => {
        const totalForWeek = rows.reduce(
          (sum, r) => sum + Number(r.total_consumed || 0),
          0
        );
        return (
          <div key={weekNum} style={{ marginTop: "32px" }}>
            <WeeklyTable
              initialData={rows}
              columnsConfig={columnsConfig}
              onSave={handleSave}
              loading={pending}
              week={weekNum}
              total={totalForWeek}
            />
          </div>
        );
      })}
    </Grid>
  );
}

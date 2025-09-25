import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import React, { useEffect, useState } from "react";
import "style.css";
import { getGraphData, updateData } from "apiservices";
import EditableTable from "pages/extra-pages/sample-page";
import { useSelector } from "react-redux";
import Example from "pages/vehicles";
import { FilterIcon } from "assets/images/users/Svg";
import { getReportData } from "../../apiservices";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import Alert from "misc/dialogue";
import { Box } from "@mui/material";
import ApexChart from "../dashboard/MonthlyBarChart";
import { ExportBtn } from "styled/styled";

dayjs.extend(isoWeek);
// ===============================|| COMPONENT - SKU ||=============================== //

function createData(item) {
  return {
    sku: item.sku,
    case: item.case,
    target: item.target,
    onhand: item.onhand,
    replenishment: item.replenishment,
    consumption: item.consumption,
    total_available: item.total_available,
    shortfall: item.shortfall,
  };
}

export default function ShortfallComp() {
  const [pending, setPending] = useState(true);
  const [state, setState] = useState({
    userData: [],
    showGraph: false,
    startDate: "2025-09-01",
    endDate: "2025-09-09",
    graphData: [],
    rowData: {},
  });

  const updatedObj = useSelector((state) => state.user.updatedObj);
  useEffect(() => {
    getContainersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedObj]);

  const getContainersData = async (start, end) => {
    try {
      setPending(true);
      const res = await getReportData(
        "sku-shortfall-report",
        start ? start : dayjs().format("YYYY-MM-DD"),
        end ? end : dayjs().format("YYYY-MM-DD")
      ); // assumed to return array of the objects you posted
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

  // Columns mapped to the API object keys. Use `editable: true` where inline editing should be allowed.
  const columnsConfig = [
    { name: "SKU", selectorField: "sku" },
    // { name: "Description", selectorField: "description" },
    {
      name: "Target",
      selectorField: "target",
      type: "number",
    },
    {
      name: "On Hand",
      selectorField: "onhand",
      type: "number",
    },
    {
      name: "On Order",
      selectorField: "replenishment",
      type: "number",
    },
    {
      name: "Case",
      selectorField: "case",
      editable: true,
      type: "number",
    },
    // {
    //   name: "Consumption",
    //   selectorField: "consumption",
    //   type: "number",
    // },
    // {
    //   name: "Total Available",
    //   selectorField: "total_available",
    //   type: "number",
    // },
    {
      name: "Shortfall",
      selectorField: "shortfall",
      type: "number",
    },
  ];

  const handleSave = async (updatedData) => {
    let res = await updateData(updatedData, updatedData?.id, "skus");
    console.log("Update response:", res);
    if (res.id) {
      getContainersData();
      toast.success("Data updated successfully");
    }
    // call your API to persist updates here
    // e.g. updateSkuBulk(updatedData) or send patch requests per-row
  };
  const handleAddOpen = async (row = "", dates) => {
    if (row.sku) {
      let res = await getGraphData(
        "daily-consumption/inventory-trend/",
        row.sku,
        dates?.start || dayjs().subtract(15, "week").format("YYYY-MM-DD"),
        dates?.end || dayjs().format("YYYY-MM-DD"),
        dates?.bucket || "weekly"
      );
      setState((prev) => ({ ...prev, graphData: res, rowData: row }));
    }
    if (!dates) {
      setState((prev) => ({
        ...prev,
        showGraph: !prev.showGraph,
      }));
    }
  };
  const applyDates = ({ start, end }) => {
    getContainersData(start, end);
  };
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
        >
          Shortfall Report
          <Breadcrumbs title="SKUs" />
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
          <Example onApply={(data) => applyDates(data)} short={true} />
        </div>
      </Stack>

      <EditableTable
        initialData={state.userData}
        columnsConfig={columnsConfig}
        onSave={handleSave}
        loading={pending}
        rowClick={(row) => handleAddOpen(row)}
      />
      <Alert
        open={state.showGraph}
        close={handleAddOpen}
        content={
          <Box sx={{ width: "90%", margin: "auto", marginTop: 4 }}>
            <ApexChart
              data={state.graphData}
              set={(dates) => handleAddOpen(state.rowData, dates)}
            />
          </Box>
        }
        action={
          <>
            <ExportBtn onClick={handleAddOpen} sx={{ width: "120px" }}>
              cancel
            </ExportBtn>
          </>
        }
      />
    </Grid>
  );
}

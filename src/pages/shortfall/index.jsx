import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import React, { useEffect, useState } from "react";
import "style.css";
import { updateData } from "apiservices";
import EditableTable from "pages/extra-pages/sample-page";
import { useSelector } from "react-redux";
import Example from "pages/vehicles";
import { FilterIcon } from "assets/images/users/Svg";
import { getReportData } from "../../apiservices";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
// ===============================|| COMPONENT - SKU ||=============================== //

function createData(item) {
  return {
    sku: item.sku,
    // description: item.description,
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
      name: "Replenishment",
      selectorField: "replenishment",
      type: "number",
    },
    {
      name: "Consumption",
      selectorField: "consumption",
      type: "number",
    },
    {
      name: "Total Available",
      selectorField: "total_available",
      type: "number",
    },
    {
      name: "Shortfall",
      selectorField: "shortfall",
      type: "number",
    },
  ];

  const handleSave = async (updatedData) => {
    let res = await updateData(updatedData, updatedData?.id, "skus");
    console.log("Update response:", res);
    // call your API to persist updates here
    // e.g. updateSkuBulk(updatedData) or send patch requests per-row
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
      />
    </Grid>
  );
}

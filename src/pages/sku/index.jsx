import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import React, { useEffect, useState } from "react";
import "style.css";
import { getData, getGraphData, updateData } from "apiservices";
import EditableTable from "pages/extra-pages/sample-page";
import { useSelector } from "react-redux";
import Example from "pages/vehicles";
import { FilterIcon } from "assets/images/users/Svg";
import { Box } from "@mui/material";
import { ExportBtn } from "styled/styled";
import ApexChart from "../dashboard/MonthlyBarChart";
import Alert from "misc/dialogue";

// ===============================|| COMPONENT - SKU ||=============================== //
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { toast } from "react-toastify";

dayjs.extend(isoWeek);
function createData(item) {
  // Map API object -> table row object
  return {
    id: item.id,
    sku: item.sku,
    product_name: item.product_name,
    abc_category: item.abc_category,
    min_inventory_floor: item.min_inventory_floor,
    default_lead_time: item.default_lead_time,
    custom_lead_time: item.custom_lead_time,
    // reorder_point: item.reorder_point,
    sku_reliability_factor: item.sku_reliability_factor,
    effective_lead_time: item.effective_lead_time,
    stock_date: item.stock_date,
    created_at: item.created_at,
    updated_at: item.updated_at,
    supplier_name: item.supplier_name,
    target: item.target,
    cost: item.cost,
    location: item.location,
    quantity: item.quantity,
    case: item.case,
    discontinued: item.discontinued,
  };
}

export default function SKUComp() {
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

  const getContainersData = async (start = "", end = "") => {
    try {
      setPending(true);
      const res = await getData("skus", start, end); // assumed to return array of the objects you posted

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
    {
      name: "Product Name",
      selectorField: "product_name",
    },
    { name: "ABC Category", selectorField: "abc_category" },
    {
      name: "Min Inventory Floor",
      selectorField: "min_inventory_floor",
      editable: true,
      type: "number",
    },
    {
      name: "Default Lead Time",
      selectorField: "default_lead_time",
      editable: true,
      type: "number",
    },
    {
      name: "Case",
      selectorField: "case",
      editable: true,
      type: "number",
    },
    {
      name: "Discontinued",
      selectorField: "discontinued",
      type: "number",
    },
    {
      name: "Cost",
      selectorField: "cost",
      type: "number",
    },
    {
      name: "Location",
      selectorField: "location",
    },
    {
      name: "On Hand",
      selectorField: "quantity",
      type: "number",
    },
    // {
    //   name: "Custom Lead Time",
    //   selectorField: "custom_lead_time",
    //   editable: true,

    //   type: "number",
    // },
    {
      name: "Target",
      selectorField: "target",
      editable: true,
      type: "number",
    },
    {
      name: "SKU Reliability",
      selectorField: "sku_reliability_factor",

      type: "number",
    },
    {
      name: "Effective Lead Time",
      selectorField: "effective_lead_time",

      type: "number",
    },
    { name: "Stock Date", selectorField: "stock_date" },
    { name: "Supplier Name", selectorField: "supplier_name" },
    { name: "Target", selectorField: "target" },
  ];

  const handleSave = async (updatedData) => {
    let res = await updateData(updatedData, updatedData?.id, "skus");
    if (res.id) {
      getContainersData();
      toast.success("Data updated successfully");
    }
    // call your API to persist updates here
    // e.g. updateSkuBulk(updatedData) or send patch requests per-row
  };

  const handleAddOpen = async (row = "", dates) => {
    if (row.id) {
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
        startDate: "",
        endDate: "",
      }));
    }
  };
  const applyDates = ({ start, end, bucket }) => {
    getContainersData(start, end, bucket);
  };
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
        >
          SKU
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
          <Example onApply={(data) => applyDates(data)} />
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

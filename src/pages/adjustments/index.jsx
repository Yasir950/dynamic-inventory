import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import React, { useEffect, useState } from "react";
import "style.css";
import { getData, updateData } from "apiservices";
import EditableTable from "pages/extra-pages/sample-page";
import { useSelector } from "react-redux";
import { FilterIcon } from "assets/images/users/Svg";
import Example from "pages/vehicles";

// ===============================|| COMPONENT - SKU ||=============================== //

function createData(item) {
  return {
    id: item.id,
    sku: item.sku,
    location: item.location,
    adjustment_type: item.adjustment_type,
    quantity_change: item.quantity_change,
    reason: item.reason,
    adjusted_by: item.adjusted_by,
    adjustment_date: item.adjustment_date,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export default function ReplenishmentComp() {
  const [pending, setPending] = useState(true);
  const [state, setState] = useState({ userData: [] });

  const updatedObj = useSelector((state) => state.user.updatedObj);

  useEffect(() => {
    getContainersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedObj]);

  const getContainersData = async (start = "", end = "") => {
    try {
      setPending(true);
      const res = await getData("adjustments", start, end); // assumed to return array of the objects you posted
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
    { name: "SKU", selectorField: "sku", editable: false },
    { name: "Location", selectorField: "location", editable: true },
    {
      name: "Adjustment Type",
      selectorField: "adjustment_type",
      editable: true,
    },
    {
      name: "Qty Change",
      selectorField: "quantity_change",
      type: "number",
      editable: true,
    },
    { name: "Reason", selectorField: "reason", editable: true },
    { name: "Adjusted By", selectorField: "adjusted_by", editable: true },
    {
      name: "Adjustment Date",
      selectorField: "adjustment_date",
      type: "date",
      editable: true,
    },
  ];

  const handleSave = async (updatedData) => {
    console.log("Parent received updated data:", updatedData);
    let res = await updateData(updatedData, updatedData?.id, "adjustments");
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
          Adjustments
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
          <Example onApply={(data) => applyDates(data)} />
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

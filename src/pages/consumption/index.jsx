import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import React, { useEffect, useState } from "react";
import "style.css";
import { getData } from "apiservices";
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
    quantity_consumed: item.quantity_consumed,
    week_start: item.week_start,
    order_date: item.order_date,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export default function ConsumptionComp() {
  const [pending, setPending] = useState(true);
  const [state, setState] = useState({ userData: [] });

  const updatedObj = useSelector((state) => state.user.updatedObj);

  useEffect(() => {
    getContainersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedObj]);

  const getContainersData = async () => {
    try {
      setPending(true);
      const res = await getData("daily-consumption"); // assumed to return array of the objects you posted
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
    { name: "ID", selectorField: "id", editable: false },
    { name: "SKU", selectorField: "sku", editable: true },
    { name: "Location", selectorField: "location", editable: true },
    {
      name: "Quantity Consumed",
      selectorField: "quantity_consumed",
      type: "number",
      editable: true,
    },
    {
      name: "Week Start",
      selectorField: "week_start",
      type: "number",
      editable: true,
    },
    {
      name: "Order Date",
      selectorField: "order_date",
      type: "date",
      editable: true,
    },
    {
      name: "Created At",
      selectorField: "created_at",
      type: "date",
      editable: false,
    },
  ];

  const handleSave = (updatedData) => {
    console.log("Parent received updated data:", updatedData);
    // call your API to persist updates here
    // e.g. updateSkuBulk(updatedData) or send patch requests per-row
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
        >
          Daily Consumption
          <Breadcrumbs title="Daily Consumption" />
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
          <Example />
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

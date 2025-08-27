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
import Example from "pages/vehicles";
import { FilterIcon } from "assets/images/users/Svg";

// ===============================|| COMPONENT - SKU ||=============================== //

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
    reorder_point: item.reorder_point,
    sku_reliability_factor: item.sku_reliability_factor,
    effective_lead_time: item.effective_lead_time,
    stock_date: item.stock_date,
    created_at: item.created_at,
    updated_at: item.updated_at,
    supplier: item.supplier,
  };
}

export default function SKUComp() {
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
      const res = await getData("skus"); // assumed to return array of the objects you posted
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
    { name: "ID", selectorField: "id", width: "70px" },
    { name: "SKU", selectorField: "sku" },
    {
      name: "Product Name",
      selectorField: "product_name",
    },
    { name: "ABC Category", selectorField: "abc_category" },
    {
      name: "Min Inventory Floor",
      selectorField: "min_inventory_floor",

      type: "number",
    },
    {
      name: "Default Lead Time",
      selectorField: "default_lead_time",

      type: "number",
    },
    {
      name: "Custom Lead Time",
      selectorField: "custom_lead_time",

      type: "number",
    },
    {
      name: "Reorder Point",
      selectorField: "reorder_point",

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
    { name: "Created At", selectorField: "created_at" },
    { name: "Supplier", selectorField: "supplier" },
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

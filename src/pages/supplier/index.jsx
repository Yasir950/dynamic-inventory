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
  return {
    id: item.id,
    supplier_name: item.supplier_name,
    contact_info: item.contact_info,
    default_lead_time: item.default_lead_time,
    avg_lead_time_variance: item.avg_lead_time_variance,
    delivery_reliability_score: item.delivery_reliability_score,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export default function Suppliercomp() {
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
      const res = await getData("suppliers"); // assumed to return array of the objects you posted
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
    { name: "Supplier Name", selectorField: "supplier_name" },
    { name: "Contact Info", selectorField: "contact_info" },
    {
      name: "Default Lead Time",
      selectorField: "default_lead_time",
      type: "number",
    },
    {
      name: "Avg Lead Time Variance",
      selectorField: "avg_lead_time_variance",
      type: "number",
    },
    {
      name: "Delivery Reliability Score",
      selectorField: "delivery_reliability_score",
      type: "number",
    },
    {
      name: "Created At",
      selectorField: "created_at",
      type: "date",
      editable: false,
    },
    {
      name: "Updated At",
      selectorField: "updated_at",
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
          Suppliers
          <Breadcrumbs title="Suppliers" />
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

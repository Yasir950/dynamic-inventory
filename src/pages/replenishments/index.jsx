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
import { ExportBtn } from "styled/styled";
import { Box } from "@mui/material";
import Alert from "misc/dialogue";
import axios from "axios";
import { toast } from "react-toastify";

// ===============================|| COMPONENT - SKU ||=============================== //

function createData(item) {
  return {
    id: item.id,
    purchase_order_number: item.purchase_order_number,
    sku: item.sku,
    supplier: item.supplier,
    quantity_ordered: item.quantity_ordered,
    quantity_received: item.quantity_received,
    po_create_date: item.po_create_date,
    expected_arrival_date: item.expected_arrival_date,
    actual_received_date: item.actual_received_date,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export default function ReplenishmentComp() {
  const [pending, setPending] = useState(true);
  const [state, setState] = useState({ userData: [], import: false });
  const [uploading, setUploading] = useState(false);

  const updatedObj = useSelector((state) => state.user.updatedObj);

  useEffect(() => {
    getContainersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedObj]);

  const getContainersData = async (start = "", end = "") => {
    try {
      setPending(true);
      const res = await getData("replenishments", start, end); // assumed to return array of the objects you posted
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
    {
      name: "PO Number",
      selectorField: "purchase_order_number",
      type: "number",
      editable: false,
    },
    { name: "SKU", selectorField: "sku", editable: true },
    { name: "Supplier", selectorField: "supplier", editable: true },
    {
      name: "Qty Ordered",
      selectorField: "quantity_ordered",
      type: "number",
      editable: true,
    },
    {
      name: "Qty Received",
      selectorField: "quantity_received",
      type: "number",
      editable: true,
    },
    {
      name: "PO Created",
      selectorField: "po_create_date",
      type: "date",
      editable: true,
    },
    {
      name: "Actual Received",
      selectorField: "actual_received_date",
      type: "date",
      editable: true,
    },
  ];

  const handleSave = async (updatedData) => {
    console.log("Parent received updated data:", updatedData);
    let res = await updateData(updatedData, updatedData?.id, "replenishments");
    console.log("Update response:", res);
    // call your API to persist updates here
    // e.g. updateSkuBulk(updatedData) or send patch requests per-row
  };
  const applyDates = ({ start, end }) => {
    getContainersData(start, end);
  };
  const importData = () => {
    setState((prev) => ({ ...prev, import: !prev.import }));
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("Please select a file to upload");

    await handleUpload(file);
  };
  const handleUpload = async (file) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "https://inventron.ezauq.com/api/import_replenishment_excel/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        toast.success("File uploaded successfully!");
        importData(); // close modal
        getContainersData();
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
        >
          Replenishments
          <Breadcrumbs title="Replenishments" />
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
        importModel={() => importData()}
      />
      <Alert
        open={state.import}
        close={importData}
        content={
          <Box sx={{ width: "90%", margin: "auto", marginTop: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Please upload your Replenishment Excel file:
            </Typography>

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              disabled={uploading}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "100%",
              }}
            />

            {uploading && (
              <Typography sx={{ mt: 2, fontSize: "14px", color: "#666" }}>
                Uploading...
              </Typography>
            )}
          </Box>
        }
        action={
          <>
            <ExportBtn onClick={importData} sx={{ width: "120px" }}>
              cancel
            </ExportBtn>
          </>
        }
      />
    </Grid>
  );
}

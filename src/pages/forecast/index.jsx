import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import React, { useEffect, useState } from "react";
import "style.css";
import { deleteData, getData, saveForecast, updateData } from "apiservices";
import EditableTable from "pages/extra-pages/sample-page";
import { useDispatch, useSelector } from "react-redux";
import Example from "pages/vehicles";
import { FilterIcon } from "assets/images/users/Svg";
import { AddBtn, ExportBtn, MyBtn } from "styled/styled";
import { changeForm, clearData, updatedData } from "redux/slices/userSlice";
import { Box, FormHelperText, InputLabel, TextField } from "@mui/material";
import Alert from "misc/dialogue";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DeleteIcon, EditIcon } from "assets/images/users/Svg";

// ===============================|| COMPONENT - SKU ||=============================== //

function createData(item) {
  // Map API object -> table row object
  return {
    id: item.id,
    sku: item.sku,
    location: item.location,
    forecast_start_date: item.forecast_start_date,
    forecast_end_date: item.forecast_end_date,
    forecasted_quantity: item.forecasted_quantity,
    forcast_name: item.forcast_name,
    forcast_type: item.forcast_type,
  };
}
export default function ForecastComp() {
  const columnsConfig = [
    { name: "ID", selectorField: "id", width: "70px" },
    { name: "SKU", selectorField: "sku" },
    { name: "Forcast Name", selectorField: "forcast_name" },
    { name: "Forcast Type", selectorField: "forcast_type" },
    { name: "Location", selectorField: "location" },
    { name: "Forecast Start Date", selectorField: "forecast_start_date" },
    { name: "Forecast End Date", selectorField: "forecast_end_date" },
    {
      name: "Forecasted Quantity",
      selectorField: "forecasted_quantity",
      editable: true,
      type: "number",
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [pending, setPending] = useState(true);
  const [state, setState] = useState({ userData: [] });
  const dispatch = useDispatch();
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const isAddForm = useSelector((state) => state.user.isAddForm);
  useEffect(() => {
    getContainersData();
    if (updatedObj) {
      reset({
        id: updatedObj?.id,
        sku: updatedObj?.sku,
        location: updatedObj?.location,
        forecast_start_date: updatedObj?.forecast_start_date,
        forecast_end_date: updatedObj?.forecast_end_date,
        forecasted_quantity: updatedObj?.forecasted_quantity,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedObj]);

  const getContainersData = async () => {
    try {
      setPending(true);
      const res = await getData("forecasts"); // assumed to return array of the objects you posted
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

  const handleAddOpen = () => {
    dispatch(changeForm());
    dispatch(clearData());
  };
  const handleEdit = (row) => {
    dispatch(updatedData(row));
  };
  const handleDelete = async (id) => {
    let res = await deleteData("forecasts", id);
    getContainersData();
    toast.error("Data deleted successfully");
  };
  const handleSave = async (updatedData) => {
    console.log("Parent received updated data:", updatedData);
    let res = await updateData(updatedData, updatedData?.id, "forecasts");
    console.log("Update response:", res);
    // call your API to persist updates here
    // e.g. updateSkuBulk(updatedData) or send patch requests per-row
  };
  const onSubmit = async (data) => {
    if (updatedObj) {
      let res = await updateData(data, updatedObj?.id, "forecasts");
      if (res) {
        console.log(res);
        toast.success("Data saved successfully");
        getContainersData();
        handleAddOpen();
      }
    } else {
      let res = await saveForecast(data);
      if (res) {
        console.log(res);
        toast.success("Data saved successfully");
        getContainersData();
        handleAddOpen();
      }
    }
  };
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
        >
          Forecast
          <Breadcrumbs title="Forecast" />
        </Typography>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <AddBtn onClick={handleAddOpen}>Add Forecast</AddBtn>
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
      </Stack>

      <EditableTable
        initialData={state.userData}
        columnsConfig={columnsConfig}
        onSave={handleSave}
        loading={pending}
        edit={handleEdit}
        handleDelete={handleDelete}
        name="Forecast"
      />
      <Alert
        open={isAddForm}
        close={handleAddOpen}
        title={
          <Stack alignItems={"center"}>
            <Typography sx={{ fontWeight: 600, fontSize: "28px" }} variant="h5">
              {" "}
              Add Forecast
            </Typography>
          </Stack>
        }
        content={
          <Box sx={{ width: "90%", margin: "auto", marginTop: 4 }}>
            <Grid container spacing={2}>
              {/* Left Side */}
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ mb: 1 }}>SKU</InputLabel>
                <TextField
                  error={!!errors.sku}
                  helperText={errors.sku?.message}
                  {...register("sku", { required: true })}
                  fullWidth
                />
                {errors.sku && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"please fill this field"}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ mb: 1 }}>Forcast Name</InputLabel>
                <TextField
                  error={!!errors.forcast_name}
                  helperText={errors.forcast_name?.message}
                  {...register("forcast_name", { required: true })}
                  fullWidth
                />
                {errors.forcast_name && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"please fill this field"}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ mb: 1 }}>Forcast Type</InputLabel>
                <TextField
                  error={!!errors.forcast_type}
                  helperText={errors.forcast_type?.message}
                  {...register("forcast_type", { required: true })}
                  fullWidth
                />
                {errors.forcast_type && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"please fill this field"}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ mb: 1 }}>Location</InputLabel>
                <TextField
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  {...register("location", { required: true })}
                  fullWidth
                />
                {errors.location && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"please fill this field"}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ mb: 1 }}>Forest Start Date</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  error={!!errors.forecast_start_date}
                  helperText={errors.forecast_start_date?.message}
                  required
                  {...register("forecast_start_date", { required: true })}
                />
                {errors.forecast_start_date && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"please fill this field"}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ mb: 1 }}>Forest End Date</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  error={!!errors.forecast_end_date}
                  helperText={errors.forecast_end_date?.message}
                  required
                  {...register("forecast_end_date", { required: true })}
                />
                {errors.forecast_end_date && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"please fill this field"}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ mb: 1 }}>Forecasted Quantity</InputLabel>
                <TextField
                  error={!!errors.forecasted_quantity}
                  helperText={errors.forecasted_quantity?.message}
                  {...register("forecasted_quantity", { required: true })}
                  fullWidth
                />
                {errors.forecasted_quantity && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"please fill this field"}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </Box>
        }
        action={
          <>
            <ExportBtn onClick={handleAddOpen} sx={{ width: "120px" }}>
              cancel
            </ExportBtn>
            <MyBtn sx={{ width: "120px" }} onClick={handleSubmit(onSubmit)}>
              Submit
            </MyBtn>
          </>
        }
      />
    </Grid>
  );
}

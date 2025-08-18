import { RightOutlined } from "@ant-design/icons";
import {
  Breadcrumbs,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { saveRatesData, updateRatesData } from "apiservices";
import MainCard from "components/MainCard";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddBtn } from "styled/styled";
function AddRate({ closeForm, Rate }) {
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let MonthData = new FormData();
    if (updatedObj) {
      MonthData.append("month", data.month);
      MonthData.append("shipping_charges_file", data.shipping[0]);
      MonthData.append("towing_charges_file", data.towing[0]);
      let res = await updateRatesData(MonthData, updatedObj?.id);
      if (res?.id) {
        toast.success("rate updated successfully");
        Rate();
        closeForm();
      }
    } else {
      MonthData.append("month", data.month);
      MonthData.append("shipping_charges_file", data.shipping[0]);
      MonthData.append("towing_charges_file", data.towing[0]);
      let res = await saveRatesData(MonthData);
      if (res?.id) {
        toast.success("rate saved successfully");
        Rate();
        closeForm();
      }
    }
  };
  useEffect(() => {
    console.log(updatedObj);
    if (updatedObj) {
      reset({
        month: updatedObj.month || "",
      });
    }
    return () => {};
  }, [updatedObj]);

  return (
    <>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 600, fontSize: "30px", color: "#09090B" }}
        >
          Add Rate
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
              <span
                style={{ color: "#000000", fontSize: "14px", fontWeight: 400 }}
              >
                Rates
              </span>{" "}
              <RightOutlined /> Add Rate
            </Typography>
          </Breadcrumbs>
        </Typography>
      </Stack>
      <MainCard
        sx={{
          mt: 2,
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        content={false}
      >
        <Grid container rowSpacing={3} columnSpacing={15}>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel htmlFor="email-login">Month</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                type="month"
                {...register("month", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.month && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Month is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel htmlFor="email-login">
              Shipping Charges Detail
            </InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                type="file"
                {...register("shipping", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.shipping && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Shipping is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel htmlFor="email-login">Towing Charges Detail</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                type="file"
                {...register("towing", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.towing && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Towing is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Stack
          justifyContent={"space-between"}
          flexDirection={"row-reverse"}
          sx={{ mt: 10 }}
        >
          <Stack direction={"row"} spacing={2}>
            <AddBtn
              sx={{
                background: "#fff",
                border: "1px solid #FF8900",
                color: "#FF8900",
              }}
              onClick={closeForm}
            >
              Cancel
            </AddBtn>
            <AddBtn onClick={handleSubmit(onSubmit)}>Add</AddBtn>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
}

export default AddRate;

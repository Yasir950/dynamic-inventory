import {
  EyeInvisibleOutlined,
  EyeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Breadcrumbs,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { getRolesData, saveUserData, updateUserData } from "apiservices";
import MainCard from "components/MainCard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddBtn } from "styled/styled";
function AddUser({ closeForm, getUser }) {
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const [state, setState] = useState({
    rolesData: [],
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const getRoles = async () => {
    let res = await getRolesData();
    setState((prev) => ({ ...prev, rolesData: res }));
  };
  const onSubmit = async (data) => {
    if (updatedObj) {
      let roleId = state.rolesData.filter((item) => item.name === data.role);

      let userData = {
        ...data,
        is_superuser: false,
        profile_image: null,
        password: 123,
        role: roleId[0].id,
      };
      let res = await updateUserData(userData, updatedObj?.id);
      if (res?.id) {
        toast.success("user updated successfully");
        getUser();
        closeForm();
      }
    } else {
      let roleId = state.rolesData.filter((item) => item.name === data.role);

      let userData = {
        ...data,
        is_superuser: false,
        profile_image: null,
        password: 123,
        role: roleId[0].id,
      };
      let res = await saveUserData(userData);
      console.log(res);
      if (res?.id) {
        toast.success("user saved successfully");
        getUser();
        closeForm();
      }
    }
  };
  useEffect(() => {
    getRoles();
    if (updatedObj) {
      reset({
        first_name: updatedObj.first_name || "",
        email: updatedObj.email || "",
        password: "",
        user_type: updatedObj.user_type || "Management",
        role: updatedObj.role,
        is_active: updatedObj.is_active === "Active" ? true : false,
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
          Add User
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
              <span
                style={{ color: "#000000", fontSize: "14px", fontWeight: 400 }}
              >
                Users
              </span>{" "}
              <RightOutlined /> Add User
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
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">User Name</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("first_name", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.first_name && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"User Name is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Email</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("email", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.email && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Email is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {updatedObj == null && (
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel htmlFor="email-login">Password</InputLabel>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"Password is required"}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Profile Image</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                // {...register("profile_image", { required: true })}
                type="file"
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Select User Type</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <select
                className="style-class"
                {...register("user_type", { required: true })}
                defaultValue=""
              >
                <option value="Management">Management</option>
                <option value="Company">Company</option>
              </select>
              {errors.user_type && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Select User Type"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Select Role</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <select
                className="style-class"
                {...register("role", { required: true })}
                defaultValue=""
              >
                {state.rolesData.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Select user role"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Status</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <select className="style-class" {...register("is_active")}>
                <option value={true}>Active</option>
                <option value={false}>InActive</option>
              </select>
              {errors.is_active && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Select Status"}
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

export default AddUser;

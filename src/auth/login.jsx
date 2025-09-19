import React from "react";
import { LabelForm, LoginContainer, MyBtn, SimpleBtn } from "../styled/styled";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import logo from "../assets/images/users/logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Alert from "../misc/dialogue";
import { toast } from "react-toastify";
import "../style.css";
import { useNavigate } from "react-router";
import { login } from "apiservices";
import { useDispatch } from "react-redux";
import { setToken } from "redux/slices/userSlice";
import { useForm } from "react-hook-form";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 4,
  width: 16,
  height: 16,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#f5f8fa",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
    ...theme.applyStyles("dark", {
      backgroundColor: "#30404d",
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
    ...theme.applyStyles("dark", {
      background: "rgba(57,75,89,.5)",
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
    backgroundColor: "#394b59",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});
function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const email = watch("email");
  const password = watch("password");
  const [showPassword, setShowPassword] = React.useState(false);
  const [state, setState] = React.useState({
    alert: false,
  });

  const handleAlert = (name) => {
    setState((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const handleClick = async (data) => {
    let userData = {
      email: data.email,
      password: data.password,
    };
    let res = await login(userData);
    // Navigate to the dashboard page after successful login.
    if (res.user) {
      localStorage.setItem("token", res.access);
      dispatch(setToken(res.access));
      localStorage.setItem("username", res.user.first_name);
      localStorage.setItem("email", res.user.email);
      localStorage.setItem("user", JSON.stringify(res.user));
      setTimeout(
        function () {
          // navigate('/dashboard'); // Replace "/dashboard" with the actual route for your dashboard page.
        },
        [1000]
      );

      window.location.href = "/sku";
      toast.success("Login successfully");
    } else {
      toast.error("Wrong Credentials. Please try again");
    }
    // Clear the form fields
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <LoginContainer sx={{ width: { sm: "50%", lg: "35%" } }}>
        <img src={logo} alt="Mantis" width="40" />
        <FormGroup sx={{ width: { sm: "100%", md: "80%", gap: 12 } }}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Typography
              sx={{ fontSize: "26px", fontWeight: "600", mt: "20px" }}
            >
              Login
            </Typography>
            <LabelForm htmlFor="my-input" sx={{ fontSize: "15px" }}>
              Inventron – Manage your inventory, anytime, anywhere.
            </LabelForm>
          </Stack>

          <FormControl>
            <LabelForm htmlFor="my-input" sx={{ mb: 1 }}>
              Email
            </LabelForm>
            <OutlinedInput
              {...register("email", { required: true })}
              id="my-input"
              name="email"
              placeholder="Enter user email"
              rows={1}
              size="small"
            />
          </FormControl>
          {errors.email && (
            <span style={{ fontSize: "10px", color: "red" }}>
              *This field is required
            </span>
          )}
          <FormControl>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <LabelForm htmlFor="my-input">Password</LabelForm>
              <Button
                variant="text"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "13px",
                  color: "#0095FF",
                }}
                onClick={() => handleAlert("alert")}
              >
                Forgot Password?
              </Button>
            </div>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              id="my-input"
              placeholder="Enter password"
              rows={1}
              size="small"
            />
          </FormControl>
          {errors.password && (
            <span style={{ fontSize: "10px", color: "red" }}>
              *This field is required
            </span>
          )}
          <FormControlLabel
            control={
              <Checkbox
                sx={{ "&:hover": { bgcolor: "transparent" } }}
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                inputProps={{ "aria-label": "Checkbox demo" }}
                // {...props}
              />
            }
            label="Remember me"
            sx={{ color: "#4B465C" }}
          />
          <MyBtn
            sx={{
              background: password && email && "#FF8900",
              color: password && email && "#FAFAFA",
              "&:hover": {
                background: password && email ? "#FF8900" : "#ECECEC",
                color: password && email ? "#FAFAFA" : "#9F9F9F",
              },
            }}
            onClick={handleSubmit(handleClick)}
          >
            Login
          </MyBtn>
        </FormGroup>
        <Alert
          open={state.alert}
          close={() => handleAlert("alert")}
          title={
            <div>
              <Typography sx={{ fontWeight: 700 }}>Forgot Password</Typography>
            </div>
          }
          content={
            <FormGroup>
              <FormControl sx={{ mb: 1 }}>
                <LabelForm htmlFor="my-input">Old Password</LabelForm>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  // value={state.password}
                  name="password"
                  // onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  id="my-input"
                  placeholder="Enter old password"
                  rows={1}
                  size="small"
                  sx={{ borderRadius: "50px", width: "100%" }}
                />
              </FormControl>
              <FormControl sx={{ mb: 1 }}>
                <LabelForm htmlFor="my-input">New Password</LabelForm>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  // value={state.password}
                  // name="password"
                  // onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  id="my-input"
                  placeholder="Enter new password"
                  rows={1}
                  size="small"
                  sx={{ borderRadius: "50px", width: "100%" }}
                />
              </FormControl>
              <FormControl>
                <LabelForm htmlFor="my-input">Confirm Password</LabelForm>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  // value={state.password}
                  // name="password"
                  // onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  id="my-input"
                  placeholder="Confirm password"
                  rows={1}
                  size="small"
                  sx={{ borderRadius: "50px", width: "100%" }}
                />
              </FormControl>
            </FormGroup>
          }
          action={
            <>
              <>
                <SimpleBtn onClick={() => handleAlert("alert")}>
                  cancel
                </SimpleBtn>
                <MyBtn
                  sx={{ width: "110px" }}
                  onClick={() => handleAlert("alert")}
                >
                  Done
                </MyBtn>
              </>
            </>
          }
        />
      </LoginContainer>
    </div>
  );
}

export default LoginComponent;

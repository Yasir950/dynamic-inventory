import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import "style.css";
import MainCard from "components/MainCard";
import {
  Breadcrumbs,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { Dot, MyBtn } from "styled/styled";
import { useForm } from "react-hook-form";
import { changePassword } from "apiservices";
import { toast } from "react-toastify";
// ===============================|| COMPONENT - COLOR ||=============================== //

export default function AccountsComp() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  const [language, setLanguage] = React.useState("");
  const languages = ["All Regions", "English", "Urdu", "French"];

  const handlePassChange = async (data)=>{
    console.log(data)
    let res = await changePassword(data);
    toast.success(res.detail)
  }
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Stack justifyContent={"space-between"} flexDirection={"row"}>
          <Typography
            sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
          >
            Account Setting
            <Breadcrumbs navigation={navigation} title="Users" />
          </Typography>
        </Stack>
        <MainCard
          sx={{
            mt: 2,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          content={false}
        >
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography
                component="span"
                sx={{ fontSize: "18px", color: "#101828", fontWeight: 500 }}
              >
                Language
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <InputLabel>Select</InputLabel>
                <TextField
                  select
                  sx={{ minWidth: { md: "300px", xs: "200px" } }}
                  defaultValue={"All Regions"}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <MyBtn sx={{ mt: 3, minWidth: { md: "300px", xs: "200px" } }}>
                  save
                </MyBtn>
              </Grid>
            </AccordionDetails>
          </Accordion> */}
                <Typography sx={{fontSize:'20px', fontWeight:'700'}}>Change Password</Typography>
        
              <Grid container rowGap={4} sx={{padding:4}} columnGap={5}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <InputLabel>Current Password</InputLabel>
                  <TextField
                  {...register("current_password", { required: true })}
                    type="password"
                    fullWidth
                  ></TextField>
          {errors.email && <span style={{fontSize:"10px", color:"red"}}>*This field is required</span>}
                </Grid>
                <Grid container columnGap={4}>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <InputLabel>New Password</InputLabel>
                    <TextField
                      type="password"
                  {...register("new_password", { required: true })}
                      fullWidth
                    ></TextField>
          {errors.email && <span style={{fontSize:"10px", color:"red"}}>*This field is required</span>}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <InputLabel>Confirm New Password</InputLabel>
                    <TextField
                      type="password"
                  {...register("repeat_password", { required: true })}
                      fullWidth
                    ></TextField>
          {errors.email && <span style={{fontSize:"10px", color:"red"}}>*This field is required</span>}

                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} rowGap={2}>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#4B465C",
                      mb: 2,
                    }}
                  >
                    {" "}
                    Password Requirement
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "#4B465C",
                      mb: 1,
                    }}
                  >
                    • Minimum 8 characters long - the more, the better
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "#4B465C",
                      mb: 1,
                    }}
                  >
                    • At least one lowercase character
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "#4B465C",
                      mb: 1,
                    }}
                  >
                    • At least one number, symbol, or whitespace character
                  </Typography>
                  <MyBtn sx={{ mt: 3, minWidth: { md: "300px", xs: "200px" } }} onClick={handleSubmit(handlePassChange)}>
                    save
                  </MyBtn>
                </Grid>
              </Grid>
           
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span" sx={{ fontSize: "18px", color: "#101828", fontWeight: 500 }}>Upload Document</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container rowGap={4} sx={{padding:4}} columnGap={5}>
                <Grid item xs={12} sm={6} md={6} lg={5.5}>
                  <InputLabel>Select Document Type</InputLabel>
                  <TextField
                  fullWidth
                  select
                  >
                     {languages.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={5.5}>
                  <InputLabel>Select Country</InputLabel>
                  <TextField
                  fullWidth
                  select
                  >
                     {languages.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={5.5}>
                  <InputLabel>License Number</InputLabel>
                  <TextField
                  fullWidth
                  
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={5.5}>
                  <InputLabel>Expiration Date</InputLabel>
                  <TextField
                  fullWidth
                  type="date"
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={11.4}>
                  <InputLabel>All Images</InputLabel>
                  <TextField
                  fullWidth
                  type="file"
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} rowGap={2}>
            
                  <MyBtn sx={{ mt: 3, minWidth: { md: "300px", xs: "200px" } }}>
                    save
                  </MyBtn>
                </Grid>
              </Grid>
            </AccordionDetails>
          
          </Accordion> */}
        </MainCard>
      </Grid>
    </>
  );
}

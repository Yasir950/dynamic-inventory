import { RightOutlined } from "@ant-design/icons";
import {
  Breadcrumbs,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { getCompanies, getRolesData, saveTransData, saveUserData, updateUserData } from "apiservices";
import MainCard from "components/MainCard";
import React, { useEffect, useState } from "react";
import {useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddBtn } from "styled/styled";
function AddTransactions({ closeForm, getUser }) {
  const updatedObj = useSelector((state) => state.user.updatedObj);
   const [companies, setCompanies] = useState(0);
   const [company, setCompany] = useState(0);
   const [type, setType] = useState('credit');

  const [state, setState] = useState({
    rolesData: [],
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
    useEffect(() => {
      getCompaniesData();
     
    }, []);
   const getCompaniesData =async()=>{
        let res = await getCompanies();
        if(res){
          setCompanies(res)}
      }
  const getRoles = async () => {
    let res = await getRolesData();
    setState((prev) => ({ ...prev, rolesData: res }));
  };
  const onSubmit = async (data) => {
    if (updatedObj) {
      let roleId = state.rolesData.filter(item=>item.name === data.role)
      let userData = { ...data, is_superuser: false, profile_image: null,password: 123, role:roleId[0].id};
      let res = await updateUserData(userData, updatedObj?.id);
      if (res?.id) {
        toast.success("user updated successfully");
        getUser();
        closeForm();
      }
    } else {
      let userData = { ...data, company: company, type: type};
      let res = await saveTransData(userData);
      if (res?.id) {
        toast.success("transaction saved successfully");
        getUser();
        closeForm();
      }
    }
  };
  useEffect(() => {
    getRoles();
    if (updatedObj) {
      reset({
        first_name: updatedObj.first_name || '',
        email: updatedObj.email || '',
        password: '',
        user_type: updatedObj.user_type || 'Management',
        role: updatedObj.role,
        is_active: updatedObj.is_active  === 'Active' ? true : false,
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
          Add Transaction
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
              <span
                style={{ color: "#000000", fontSize: "14px", fontWeight: 400 }}
              >
                Transactions
              </span>{" "}
              <RightOutlined /> Add Transaction
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
            <InputLabel htmlFor="email-login">Company</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <select className="style-class" value={company}  onChange={(e) => setCompany( e.target.value )} >
                        {companies && companies.map(item=>(
                        <option key={item.id} value={item.id}>{item.company_name}</option>
                        ))}
                      </select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Transaction Amount</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("amount", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
      
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Transaction Type</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined" >
            <select className="style-class" value={type}  onChange={(e) => setType( e.target.value )} disabled={!updatedObj}>
                        <option key={1} value={'credit'}>Credit</option>
                        <option key={2} value={'debit'}>{'Debit'}</option>
                      </select>
            
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Notes</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
multiline
rows={3}
                {...register("description", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
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

export default AddTransactions;

import { EyeInvisibleOutlined, EyeOutlined, RightOutlined } from '@ant-design/icons';
import { Breadcrumbs, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { saveCompanies, updateCompanies } from 'apiservices';
import MainCard from 'components/MainCard';
import { CitiesArr } from 'misc/Data';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddBtn } from 'styled/styled';

const IndustryTypes=['Technology',
  'Healthcare',
  'Retail',
  'Finance & Banking',
  'Manufacturing',
  'Education',
  'Construction',
  'Transportation & Logistics',
  'Real Estate',
  'Hospitality & Tourism',
  'Marketing & Advertising',
  'Entertainment',
  'Legal Services',
  'Energy & Utilities',
  'Food & Beverage','USED CARS BUSINESS']
  const CountriesArr=[
    'Egypt',
    'United States',
    'Canada',
    'Mexico',
    'Australia',
    'Saudi Arabia',
    'United Arab Emirates',
    'Turkey',
    'New Zealand',
    'Italy',
    'France',
    'Colombia'
    ]
  
function CreateCompany({closeForm, getData}) {
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm()
     const [showPassword, setShowPassword] = React.useState(false);
      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
  useEffect(() => {
      if (updatedObj) {
        reset({
          company_name: updatedObj.company_name || '',
          email: updatedObj.email || '',
          password: updatedObj.password,
          authorized_person_name: updatedObj.authorized_person_name || '',
          contact_no: updatedObj.contact_no || '',
          industry_type: updatedObj.industry_type || '',
          country: updatedObj.country || '',
          city: updatedObj.city || '',
          address: updatedObj.address || '',
          initial_account_limit: updatedObj.initial_account_limit || '',
        });
      }
      return () => {};
    }, [updatedObj]);
    const onSubmit = async (data) => {
        if (updatedObj) {
          let userData = { ...data, cid: updatedObj.cid};
          let res = await updateCompanies(userData, updatedObj?.cid);
          if (res?.id) {
            toast.success("company updated successfully");
            getData();
            closeForm();
          }
        } else {
          console.log(data)
          let userData = { ...data };
          let res = await saveCompanies(userData);
          if (res?.id) {
            toast.success("company saved successfully");
            getData();
            closeForm();
          }
        }
      };
  return (
    <>
      <Stack justifyContent={'space-between'}  flexDirection={'row'}>
        <Typography sx={{ fontWeight: 600, fontSize: '30px', color: '#09090B' }}>
          Create Company
          <Breadcrumbs aria-label="breadcrumb">
          <Typography   sx={{ fontSize:"14px", fontWeight:300}}>
          <span style={{color:"#000000", fontSize:"14px", fontWeight:400}}>Company</span> <RightOutlined/>  Create Company
  </Typography>
</Breadcrumbs>
        </Typography>
      </Stack>
      <MainCard sx={{ mt: 2, padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} content={false}>
        <Grid container rowSpacing={3} columnSpacing={15}>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Company Name</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <OutlinedInput
              {...register("company_name", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
              {errors.company_name && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Authorised Person Name</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <OutlinedInput
              {...register("authorized_person_name", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
              {errors.authorized_person_name && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Contact Number</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <OutlinedInput
              {...register("contact_no", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
              />
              {errors.contact_no && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Email</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <OutlinedInput
              {...register("email", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
              {errors.email && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

            </FormControl>
          </Grid>
          {updatedObj == null &&
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Password</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <OutlinedInput
             type={showPassword ? 'text' : 'password'}
              {...register("password", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          edge="end"
                                          color="secondary"
                                        >
                                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                      </InputAdornment>
                                    }
              />
              {errors.password && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

            </FormControl>
          </Grid>}
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login" >Industry/Type of Business</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <select
            className="style-class"
              {...register("industry_type", { required: true })}
              >
                {IndustryTypes.map(item=>(
                  <option key={item} value={item}>{item}</option>

                ))}
              </select>
              {errors.industry_type && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login" >Country</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <OutlinedInput
              {...register("country", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
              {errors.country && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login" >City</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <OutlinedInput
              {...register("city", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
              {errors.city && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel htmlFor="email-login" >Address</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <TextField
              {...register("address", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                multiline
                rows={4}
                inputProps={{
                  'aria-label': 'weight'
                }}
              />
              {errors.address && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}
              
            </FormControl>
          </Grid>
         
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login" >Initial Customer Account Limit</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <TextField
              {...register("initial_account_limit", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
              />
              {errors.initial_account_limit && <FormHelperText style={{color:'red',  marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

            </FormControl>
          </Grid>
        </Grid>
        <Stack justifyContent={'space-between'} flexDirection={'row-reverse'} sx={{ mt: 10 }}>
          <Stack direction={'row'} spacing={2}>
            <AddBtn sx={{ background: "#fff", border: "1px solid #FF8900", color: "#FF8900" }} onClick={closeForm}>Cancel</AddBtn>
            <AddBtn onClick={handleSubmit(onSubmit)}>Save</AddBtn>
          </Stack>
        </Stack>
      </MainCard>
    </>

  );
}

export default CreateCompany;

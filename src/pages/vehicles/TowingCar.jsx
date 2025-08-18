import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { AddBtn, ExportBtn } from 'styled/styled';
import MuiTable from 'misc/MuiTable';
import React, { useEffect, useState } from 'react';
import { MyBtn } from 'styled/styled';
import { Box, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, Switch, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from 'misc/dialogue';
import 'style.css';
import { deleteItem, getMakers, getModels, getVehicles, saveVehicles, updateVehicles } from 'apiservices';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changeForm, clearData, updatedData } from 'redux/slices/userSlice';
import { DeleteIcon, EditIcon } from 'assets/images/users/Svg';
import { ReactTable } from 'misc/ReactTable';
import Img from 'asset/truck.jpg'
import Img1 from 'asset/1.png'
import Img2 from 'asset/2.png'
import Img3 from 'asset/3.png'
import pdf from 'asset/pdf.png'
import { useNavigate } from 'react-router';
import { CitiesArr, RegionsArr, UnitedStatesStates } from 'misc/Data';
// ===============================|| COMPONENT - COLOR ||=============================== //

function createData(id, vin, lot, maker, model, color, year, vehicle_type, car_condition, car_title,car_key,purchase_date,region,state,city,auction_location,sale_price,delivered_date,gate_pass_pin,address,focal_person_phone,destination_status,current_status,approval_status,invoice,images) {
  
  return {
    id,
    vin,
    lot,
    maker,
    model,
    color,
    year,
    vehicle_type,
    car_condition,
    car_title,car_key,purchase_date,region,state,city,auction_location,sale_price,delivered_date,gate_pass_pin,address,focal_person_phone,destination_status,current_status,approval_status,invoice,images
  };
}


export default function TowingCarComp() {
  const navigate = useNavigate()
  const handleThumbnailClick = () => {
    navigate('/view-pdf');
  };
  const headCells = [
    {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:500,
      color:'#101828'
      // override the row height
    },
    
  },
  {
    name: 'Lot No',
    selector: row => row.lot,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Photo',
    cell: row => (
      <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
    <img src={Img} alt='' width={'50'} height={'50'} style={{borderRadius:"6px"}}/>
    <Stack>
  <Typography sx={{fontSize:'14px', fontWeight:400, color:'#667085'}}>{row.maker}</Typography>
  <Typography sx={{fontSize:'14px', fontWeight:400, color:'#667085'}}>{row.model}</Typography>
  <Stack direction={'row'}>
  <img src={Img1} alt='' width={'16'} height={'16'} />
  <img src={Img2} alt='' width={'16'} height={'16'} />
  <img src={Img3} alt='' width={'16'} height={'16'} />
  </Stack>

    </Stack>
      </Stack>
  ), 
    sortable: true,
    minWidth:'150px',
    style: {
      minHeight:"80px",
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
    {
    name: 'Year',
    selector: row => row.year,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
    {
    name: 'Maker',
    selector: row => row.maker,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
    {
    name: 'Model',
    selector: row => row.model,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
    {
    name: 'Region',
    selector: row => row.region,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'VIN',
    selector: row => row.vin,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Destination Status',
    selector: row => row.destination_status,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Color',
    cell: row => (
      <div style={{ fontSize: '14px', fontWeight: 400, color: row.color.toLowerCase() }}>
        {row.color}
      </div>
    ),
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      // override the row height
    },
    
  },
  {
    name: 'Invoice',
    cell: row => (
    <img src={pdf} alt='' width={'18'} height={'24'} style={{borderRadius:"6px"}} onClick={handleThumbnailClick} className='cursor-pointer'/>), 
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  
   {
    name: 'Buyer',
    selector: row => row.focal_person_phone,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Price',
    selector: row => row.sale_price,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Purchase Date',
    selector: row => row.purchase_date,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Delivered Date',
    selector: row => row.delivered_date,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Location',
    selector: row => row.auction_location,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Title',
    selector: row => row.car_title,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Vehicle Type',
    selector: row => row.vehicle_type,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Car Condition',
    selector: row => row.car_condition,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Car Key',
    selector: row => row.car_key,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'City',
    selector: row => row.city,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  
  {
    name: 'Gate Pass Pin',
    selector: row => row.gate_pass_pin,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  
  {
    name: 'Address',
    selector: row => row.address,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },
  {
    name: 'Current Status',
    cell: row => (
      <div style={{ fontSize: '13px', fontWeight: 400, background:'#ECFDF3', width: '90px', borderRadius:"10px",
        height: '22px',
        padding: '2px 8px 2px 6px',
        }}>
        {row.current_status == 1 ? 'Deleivered' : '' }
      </div>
    ),
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    
  },

  {
    name: 'Approval Status',
    cell: row => (row.approval_status ? <Switch
      defaultChecked
       size="small"
       disabled
    /> : <Switch
     size="small"
     disabled
  />), // Simplified conditional
    sortable: true,
    
  },
  {
    name: 'Actions',
    style: {
      fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
    },
    cell: row => (
      <>
        <button
          className='cursor-pointer'
          onClick={() => handleDelete(row.id || row.cid)}
          style={{ background: "none", border: '0px' }}
        >
          <DeleteIcon />
        </button>
        <button
          className='cursor-pointer'
          onClick={() => handleEdit(row)}
          style={{ background: "none", border: '0px' }}
        >
          <EditIcon />
        </button>
      </>
    ), // Use `cell` instead of `selector` for rendering JSX
  },
  ];
  const [activeStep, setActiveStep] = useState(0);
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const isAddForm = useSelector((state) => state.user.isAddForm)
  const dispatch = useDispatch();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  const [state, setState] = useState({
    selected: 'all',
    userData:[],
    makersData:[],
    modelsData:[]
  })
  useEffect(() => {
    getVehiclesData();
    getMakersData();
    console.log(updatedObj);
    if (updatedObj) {
      let makers = state.makersData.filter(item=>item.name == updatedObj.maker)
      let models = state.modelsData.filter(item=>item.name == updatedObj.model)
      reset({
        vin: updatedObj.vin || '',
        lot: updatedObj.lot || '',
        email: updatedObj.email || '',
        maker: makers.id,
        model: models.id || '',
        color: updatedObj.color || '',
        vehicle_type: updatedObj.vehicle_type ,
        car_condition: updatedObj.car_condition ,
        car_title: updatedObj.car_title ,
        car_key: updatedObj.car_key ,
        purchase_date: updatedObj.purchase_date ,
        region: updatedObj.region ,
        state: updatedObj.state ,
        city: updatedObj.city ,
        auction_location: updatedObj.auction_location ,
        sale_price: updatedObj.sale_price ,
        delivered_date: updatedObj.delivered_date ,
        gate_pass_pin: updatedObj.gate_pass_pin ,
        address: updatedObj.gate_pass_pin ,
        focal_person_phone: updatedObj.focal_person_phone ,
        destination_status: updatedObj.destination_status ,
        current_status: updatedObj.current_status ,
        approval_status: updatedObj.approval_status ,
      });
    }
    return () => {
    };
  }, [updatedObj]);
  const getVehiclesData =async()=>{
    let res = await getVehicles();
   const rowsData = res.map(item=>(createData(item.id, item.vin, item.lot, item.model.maker.name, item.model.name, item.color, item.year, item.vehicle_type, item.car_condition, item.car_title,item.car_key,item.purchase_date,item.region,item.state,item.city,item.auction_location,item.sale_price,item.delivered_date,item.gate_pass_pin,item.address,item.focal_person_phone,item.destination_status,item.current_status,item.approval_status,item.invoice,item.images )))
    setState(prev=>({...prev, userData: rowsData}))
  }
  const getMakersData =async()=>{
    let res = await getMakers();
    let resp = await getModels();
    setState(prev=>({...prev, makersData: res, modelsData:resp}))
  }
  const handleEdit = (row) => {
    dispatch(updatedData(row))
  };

  const handleDelete = async (id) => {
   let res= await deleteItem('vehicles',id)
   if(res === 204){
    getVehiclesData();
    toast.error("Company deleted successfully");
   }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
    const onSubmit = async (data) => {
      if (updatedObj) {
        let userData = { ...data, images: null, invoice: null, id:updatedObj.id };
        let res = await updateVehicles(userData, updatedObj?.id);
        if (res?.id) {
          toast.success("user updated successfully");
          getVehiclesData();
          handleAddOpen();
        }
      } else {
        let userData = { ...data, images: null, invoice: null };
        let res = await saveVehicles(userData);
        if (res?.id) {
          toast.success("user saved successfully");
          getVehiclesData();
          handleAddOpen();
        }
      }
    };
     const handleAddOpen = () => {
        dispatch(changeForm())
        dispatch(clearData())
      }
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Stack justifyContent={'space-between'} flexDirection={'row'}>
          <Typography sx={{ fontWeight: 300, fontSize: '30px', color: '#09090B' }}>
            Vehicles
            <Breadcrumbs navigation={navigation} title="Users" />
          </Typography>
          <Stack direction={'row'} spacing={2}>
            <ExportBtn sx={{ height: "42px" }}>Bulk Excel Upload</ExportBtn>
            <AddBtn onClick={handleAddOpen}>Add Vehicle</AddBtn>
          </Stack>
        </Stack>
        <MainCard
          sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          content={false}
        >
          <ReactTable name={'Towing Cars'} column={headCells} rows={state.userData} />
        </MainCard>
      </Grid>
      <Alert
        open={isAddForm}
        close={handleAddOpen}
        title={
          <Stack alignItems={'center'}>
            <Typography sx={{ fontWeight: 600, fontSize: "28px" }} variant="h5" > Add Vehicle</Typography>
          </Stack>
        }
        content={
          <Box sx={{ width: "90%", margin: "auto", marginTop: 4 }}>
            <Stepper activeStep={activeStep} sx={{ marginBottom: 4 }}>
              <Step>
                <StepLabel>Vehicle Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Other Details</StepLabel>
              </Step>
            </Stepper>

            {activeStep === 0 && (
              <form>
                <Grid container spacing={2}>
                  {/* Left Side */}
                  <Grid item xs={12} sm={6}>
                  <InputLabel>VIN No</InputLabel>
                    <TextField fullWidth  required  {...register("vin", { required: true })}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Lot No</InputLabel>
                    <TextField fullWidth  required  {...register("lot", { required: true })}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Color</InputLabel>
                    <FormControl fullWidth required>
                      <select className="style-class" {...register("color", { required: true })}>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Black">Black</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Vehicle Type</InputLabel>
                    <FormControl fullWidth required>
                      <select className="style-class" {...register("vehicle_type", { required: true })}>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Truck">Truck</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Maker</InputLabel>
                    <FormControl fullWidth required>
                    <select className="style-class" {...register("maker", { required: true })}>
                        {state.makersData.map(item=>(
                          <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Model</InputLabel>
                    <FormControl fullWidth required>
                    <select className="style-class" {...register("model", { required: true })}>
                        {state.modelsData.map(item=>(

                          <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Title</InputLabel>
                    <FormControl fullWidth required>
                      <TextField fullWidth  required  {...register("car_title", { required: true })}/>
                    
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3} direction={'row'}>
                  <InputLabel>Purchased Date</InputLabel>
                    <TextField
                      fullWidth
                      {...register("purchase_date", { required: true })}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                    
                  </Grid>
                  <Grid item xs={6} sm={3}>
                  <InputLabel>Select Year</InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker
        views={['year']} // Restrict views to only "year"
        
        renderInput={(params) => <TextField {...register("year", { required: true })}  {...params}/>}
      />
    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Car Condition</InputLabel>
                    <FormControl fullWidth required>
                    <select className="style-class" {...register("car_condition", { required: true })}>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Car Key</InputLabel>
                    <FormControl fullWidth required>
                    <select className="style-class"  {...register("car_key", { required: true })}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            )}

            {activeStep === 1 && (
              <Box>
                <Grid container spacing={2}>
                  {/* Left Side */}
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Sale Price</InputLabel>
                    <TextField fullWidth  required {...register("sale_price", { required: true })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Destination</InputLabel>
                    <TextField fullWidth  required {...register("destination_status", { required: true })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Region</InputLabel>
                    <FormControl fullWidth required>
                      <select className="style-class" {...register("region", { required: true })}>
                      {RegionsArr.map(item=>(
                        <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                      <InputLabel>State</InputLabel>
                    <FormControl fullWidth required>
                      <select className="style-class" {...register("state", { required: true })}>
                      {UnitedStatesStates.map(item=>(
                        <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                      <InputLabel>City</InputLabel>
                    <FormControl fullWidth required>
                      <select className="style-class" {...register("city", { required: true })}>
                        {CitiesArr.map(item=>(
                        <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <InputLabel>Auction Location</InputLabel>
                    <FormControl fullWidth required>
                    <select className="style-class" {...register("auction_location", { required: true })}>
                    {CitiesArr.map(item=>(
                        <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Address</InputLabel>
                    <TextField fullWidth  required {...register("address", { required: true })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Focal Person Phone</InputLabel>
                    <TextField fullWidth  required {...register("focal_person_phone", { required: true })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Gate Pass Pin</InputLabel>
                    <TextField type='password' fullWidth  required {...register("gate_pass_pin", { required: true })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Add Image</InputLabel>
                    <TextField type='file' fullWidth  required {...register("images", { required: true })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Add Invoice</InputLabel>
                    <TextField type='file' fullWidth  required {...register("invoice", { required: true })} />
                  </Grid>
                 
                </Grid>
              </Box>
            )}
          </Box>
        }
        action={
          <>
            {activeStep === 0 && (
              <>
                <ExportBtn onClick={handleAddOpen} sx={{ width: "120px" }}>cancel</ExportBtn>
                <MyBtn sx={{ width: '120px' }} onClick={handleNext} disabled={activeStep === 1}>
                  Next
                </MyBtn>
              </>)}
            {activeStep === 1 && (
              <>
                <ExportBtn onClick={handleBack} sx={{ width: "120px" }}>Back</ExportBtn>
                <MyBtn  sx={{ width: '120px' }} onClick={handleSubmit(onSubmit)} disabled={activeStep === 0}>
                  Submit
                </MyBtn>
              </>)}
          </>
        }
      />
       
    </>
  );
}


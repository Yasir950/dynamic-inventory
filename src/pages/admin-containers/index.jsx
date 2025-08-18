import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { AddBtn, BoldTypo, ExportBtn, MyBtn } from 'styled/styled';
import React, { useEffect, useState } from 'react';
import {  DeleteIcon, EditIcon } from 'assets/images/users/Svg';
import {Box, Divider,FormHelperText,InputLabel, MenuItem, Step, StepLabel, Stepper, TextField } from '@mui/material';
import 'style.css';
import { useForm } from 'react-hook-form';
import { AppstoreAddOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeForm, clearData, updatedData } from 'redux/slices/userSlice';
import { addVehicle, deleteItem, Filter, getContainers, getContainerStatus, getUnassVehicles, saveContainers, updateContainers } from 'apiservices';
import { toast } from 'react-toastify';
import { ReactTable } from 'misc/ReactTable';
import Alert from 'misc/dialogue';
import Select from 'react-select';

// ===============================|| COMPONENT - COLOR ||=============================== //


function createData(id, container_number, booking, departure_port, destination_port, vehicles,status, loaded_date, etd, shipping_date, eta, arrived_port_date, arrived_store_date, cars_shipping_amount, containers_rent,containers_size, action) {
    return {
      id, container_number, booking, departure_port, destination_port,vehicles, status, loaded_date, etd, shipping_date, eta, arrived_port_date, arrived_store_date, cars_shipping_amount, containers_rent,containers_size, action
    };
}
function createVehicleData(id, vin, lot ,auction_image,maker, model,company, ) {
  
  return {
    id,
    vin,
    lot,
    auction_image,
    maker,
    model,
    company,
   
  };
}
const vehiclesHeadCells = [
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
  minWidth:"200px",
  cell: row => (
    <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
  <img src={`data:image/jpeg;base64,${row?.auction_image}`} alt='' width={'50'} height={'50'} style={{borderRadius:"6px"}}/> 

  <Stack>
<Typography sx={{fontSize:'14px', fontWeight:400, color:'#667085'}}>{row.model?.name }</Typography>

  </Stack>
    </Stack>
), 
  sortable: true,
  
  style: {
    
    minHeight:"80px",
    fontSize: '14px',
    fontWeight:400,
    color:"#667085"
    // override the row height
  },
  
},
{
  name: 'Maker',
  selector: row => row.maker?.name ? row.maker?.name : row.maker,
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
  selector: row => row.model?.name ? row.model.name : row.model,
  sortable: true,
  style: {
    fontSize: '14px',
    fontWeight:400,
    color:"#667085"
    // override the row height
  },
  
},
{
  name: 'Company',
  minWidth: 200,

  selector: row =>row.company,
  sortable: true,
  style: {
    fontSize: '14px',
    fontWeight:400,
    color:"#667085"
    // override the row height
  },
  
},



];
export default function AdminContainersComp() {
  let user =JSON.parse(localStorage.getItem('user'));
  let normalUser = !user?.is_superuser && user?.company
  const [pending, setPending] = useState(true);
  const adminHeadCells = [
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
    name: 'Container No',
    selector: row => row.container_number,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Booking',
    selector: row => row.booking,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Departure Port',
    selector: row => row.departure_port,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Designation Port',
    selector: row => row.destination_port,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Vehicles',
    cell: row => (
      <div style={{ fontSize: '14px', fontWeight: 400, color:"blue"}} className='cursor-pointer'  onClick={()=>openVehiclesDetail(row.vehicles)}>
        {row?.vehicles?.length}
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
    name: 'Status',
    cell: row => (
      <div style={{ fontSize: '11px', fontWeight: 400, background:row.status =="New"?'#6F7B91':row.status =="In Transit"?'#8DC9CC':row.status =="Arrived Port"?'#F2C43A':row.status =="Loaded"?'#EB6B5C':row.status =="In Shipping"?'#A0C6A2':row.status =="Handed Over"?'#FF9F30':row.status =="At Port"?'#0095FF':row.status =="Delivered"?'#14BA6D':"", width: '300px', borderRadius:"10px",
        height: '22px',
        // padding: '2px 8px 2px 6px',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:"#FFFFFF"
       
        }}>
        {row.status}
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
    name: 'Loaded Date',
    selector: row => row.loaded_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
  },
  {
    name: 'ETD',
    selector: row => row.etd,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
    
  }, 
  {
    name: 'Shipping Date',
    selector: row => row.shipping_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
    
  }, 
  {
    name: 'ETA',
    selector: row => row.eta,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
    
  }, 
  {
    name: 'Arrived Port Date',
    selector: row => row.arrived_port_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
    
  }, 
  {
    name: 'Arrived Store Date',
    selector: row => row.arrived_store_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
  }, 
  
  {
    name: 'Cars Shipping Amount',
    selector: row => row.cars_shipping_amount,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
  }, 
    {
    name: 'Containers Rent',
    selector: row => row.containers_rent,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg",
    
  }, 
  {
    name: 'Containers Size',
    selector: row => row.containers_size,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
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
        <button
          className='cursor-pointer'
          onClick={() => addVehclesModal(row)}
          style={{ background: "none", border: '0px' }}
        >
          <AppstoreAddOutlined />
        </button>
        </>
      </>
    ), // Use `cell` instead of `selector` for rendering JSX
  },
  ];
  const cusHeadCells = [
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
    name: 'Container No',
    selector: row => row.container_number,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Booking',
    selector: row => row.booking,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Departure Port',
    selector: row => row.departure_port,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Designation Port',
    selector: row => row.destination_port,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Vehicles',
    cell: row => (
      <div style={{ fontSize: '14px', fontWeight: 400, color:"blue"}} className='cursor-pointer'  onClick={()=>openVehiclesDetail(row.vehicles)}>
        {row?.vehicles?.length}
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
    name: 'Status',
    cell: row => (
      <div style={{ fontSize: '11px', fontWeight: 400, background:row.status =="New"?'#6F7B91':row.status =="In Transit"?'#8DC9CC':row.status =="Arrived Port"?'#F2C43A':row.status =="Loaded"?'#EB6B5C':row.status =="In Shipping"?'#A0C6A2':row.status =="Handed Over"?'#FF9F30':row.status =="At Port"?'#0095FF':row.status =="Delivered"?'#14BA6D':"", width: '300px', borderRadius:"10px",
        height: '22px',
        // padding: '2px 8px 2px 6px',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:"#FFFFFF"
       
        }}>
        {row.status}
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
    name: 'Loaded Date',
    selector: row => row.loaded_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
  },
  {
    name: 'ETD',
    selector: row => row.etd,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
    
  }, 
  {
    name: 'Shipping Date',
    selector: row => row.shipping_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
    
  }, 
  {
    name: 'ETA',
    selector: row => row.eta,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
    
  }, 
  {
    name: 'Arrived Port Date',
    selector: row => row.arrived_port_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
    
  }, 
  {
    name: 'Arrived Store Date',
    selector: row => row.arrived_store_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
  }, 
  

  {
    name: 'Containers Size',
    selector: row => row.containers_size,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    hide:"lg"
  }, 
  ];
    const [state, setState] = useState({
        selected: 'all',
        alert:false,
        userData:[],
        addVehModal:false,
        contId:"",
        vehicles:[],
        detailModal:false,
        containerCounts:[],
        totalCount:0,
        totalPrice:0
    })
    const [activeStep, setActiveStep] = useState(0);
    const [region, setRegion] = React.useState("");
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [dateType, setDateType] = React.useState("");
    const [status, setStatus] = React.useState("All");
    const [vehileList, setVehicleList] = React.useState([]);
    const [selectedVehicle, setSelectedVehicle] = React.useState([]);
    const isAddForm = useSelector((state) => state.user.isAddForm)
      const updatedObj = useSelector((state) => state.user.updatedObj);
    
    const dispatch = useDispatch();
    const changeSelection = (select) => {
        setState((prevState) => ({ ...prevState, selected: select }));
    }
      const getVehiclesData =async()=>{
        let res = await getUnassVehicles();
res?.map(item=>(
            item.label = `${item.vin} - ${item.model} - ${item.maker}`,
            item.value = item.id
          ))
        setVehicleList(res)
      }
      const getContainersCountData =async()=>{
        let res = await getContainerStatus();

       let count=0;
       res.map(item=> count += item.count)
       setState((prevState) => ({ ...prevState, containerCounts: res, totalCount: count}));

      }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();
    
    const filters = [
        { label: "All", count: 372, color: "#FDEDEC", active: true },
        { label: "In Shipping", count: 69, color: "#FFF4E5", active: false },
        { label: "Arrived Port", count: 0, color: "#EDF7ED", active: false },
        { label: "Arrived Store", count: 32, color: "#FDEDEC", active: false },
        { label: "Delivered", count: 271, color: "#EAF4FE", active: false },
    ];
  useEffect(() => {
    getContainersData();
    getContainersCountData();
    if (updatedObj) {
      reset({
        container_number: updatedObj.container_number || '',
        booking: updatedObj.booking || '',
        departure_port: updatedObj.departure_port || '',
        destination_port: updatedObj.destination_port,
        status: updatedObj.status || '',
        loaded_date: updatedObj.loaded_date || '',
        etd: updatedObj.etd ,
        shipping_date: updatedObj.shipping_date ,
        eta: updatedObj.eta ,
        arrived_port_date: updatedObj.arrived_port_date ,
        arrived_store_date: updatedObj.arrived_store_date ,
        cars_shipping_amount: updatedObj.cars_shipping_amount ,
        containers_rent: updatedObj.containers_rent ,
        containers_size: updatedObj.containers_size 
      });
    }
    return () => {
    };
  }, [updatedObj]);
    const dateTypes = ["loaded date", " arrived port"];
      const getContainersData =async()=>{
          let res = await getContainers();
         const rowsData = res.map(item=>(createData(item.id, item.container_number, item.booking, item.departure_port, item.destination_port,item.vehicles, item.status, item.loaded_date, item.etd, item.shipping_date, item.eta,item.arrived_port_date,item.arrived_store_date,item.cars_shipping_amount,item.containers_rent,item.containers_size)))
        calculateTotal(rowsData)
         setState(prev=>({...prev, userData: rowsData}))
        setPending(false)
        }
        const calculateTotal = (rowsData) =>{
          const totalPrice = rowsData.reduce((sum, row) => sum + parseInt(row.cars_shipping_amount), 0);
          setState(prev=>({...prev, totalPrice: totalPrice}))
        }
const openVehiclesDetail=(row)=>{
  if(row && row[0]?.id){
  const rowsData = row.map(item=>(createVehicleData(item.id,
    item.vin,
    item.lot,
    item.auction_image,
    item.maker,
    item.model,
    item.company?.company_name,

   )))
setState(prev=>({...prev, detailModal:!prev.detailModal,vehicles: rowsData}))}
else{
  setState(prev=>({...prev, detailModal:!prev.detailModal, vehicles: []}))
}
}
  const handleEdit = (row) => {
    dispatch(updatedData(row))
  };

  const handleDelete = async (id) => {
   let res= await deleteItem('auth/containers',id)
   if(res === 204){
    toast.error("user deleted successfully");
   }
  };
    const handleAddOpen = () => {
           dispatch(changeForm())
           dispatch(clearData())
         }
    
         const handleStepOneNext = handleSubmit((data) => {
          // If validation passes, move to next step
          
          setActiveStep((prevStep) => prevStep + 1);
        });
    
      const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
      };
       const onSubmit = async (data) => {
            if (updatedObj) {
              let userData = { ...data, id:updatedObj.id };
              let res = await updateContainers(userData, updatedObj?.id);
              if (res?.id) {
                toast.success("Container updated successfully");
                getContainersData();
                handleAddOpen();
              }
            } else {
              let userData = { ...data};
              let res = await saveContainers(userData);
              if (res) {
                toast.success("Container saved successfully");
                getContainersData();
                handleAddOpen();
              }
            }
          };
    const addVehclesModal=(row)=>{
     if(row?.id){
    getVehiclesData();

       setState((prevState) => ({...prevState, addVehModal:!prevState.addVehModal , contId:row?.id}));}else{
        setState((prevState) => ({...prevState, addVehModal:!prevState.addVehModal}));
       }
    }   
    const addVehIntoContainer =async()=>{
      console.log(selectedVehicle)
      // let data={container:state.contId};
      // let res= await addVehicle(data,selectedVehicle);
      // if(res){
      //   toast.success("Vehicle added successfully");
      //   addVehclesModal()
      //   getContainers();
      // }
    }
    const handleVehicle =(e)=>{
      setSelectedVehicle(e)
    }
    const handleFilter=async(stat)=>{
      if(stat == 'All'){
        getContainersData();
      }else{
  let data={
    status: stat,
    region: region,
    start_date: fromDate,
    end_date: toDate,
    date_type: dateType,
  }
  let res= await Filter(data.status, data.region, data.start_date, data.end_date, data.date_type)
  if(res){
    const rowsData = res.map(item=>(createData(item.id, item.container_number, item.booking, item.departure_port, item.destination_port,item.vehicles, item.status, item.loaded_date, item.etd, item.shipping_date, item.eta,item.arrived_port_date,item.arrived_store_date,item.cars_shipping_amount,item.containers_rent,item.containers_size)))
    setState(prev=>({...prev, userData: rowsData}))
    calculateTotal(rowsData)
  }

}
setStatus(stat)

    }
    return (
        <>
            <Grid item xs={12} md={12} lg={12}>
                <Stack justifyContent={'space-between'} flexDirection={'row'}>
                    <Typography sx={{ fontWeight: 300, fontSize: '30px', color: '#09090B' }}>
                        Containers
                        <Breadcrumbs navigation={navigation} title="Users" />
                    </Typography>
                    {!normalUser &&     <AddBtn onClick={handleAddOpen}>Add Containers</AddBtn>}
                </Stack>
                <MainCard
                    sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    content={false}
                >
                    <BoldTypo sx={{ fontSize: '18px', fontWeight: 500, color: '#101828' }}>All Filters</BoldTypo>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container xs={12} md={12} lg={12} gap={3} alignItems={'center'} sx={{ mb: 3 }}>
                    <Stack
                                key={'All'}
                                flexDirection={'row'}
                                alignItems="center"
                                gap={2}
                            >
                                <Typography
                                onClick={()=>handleFilter('All')}
                                className='cursor-pointer'
                                    sx={{ fontWeight: 600, fontSize: "14px", color: "#000", borderBottom: status === 'All' ? "4px solid orange" : "none", }}
                                >
                                    {'All'}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        color: '#FA5A7D',
                                        mt: '4px',
                                        width: '57px',
                                        height: '30px',
                                        padding: '4px 10px 4px 10px',
                                        borderRadius: '16px',
                                        background: '#FFEDF0',
                                        textAlign: "center"

                                    }}
                                >
                                    {state.totalCount}
                                </Typography>
                            </Stack>
                        {state.containerCounts.map((filter) => (
                            <Stack
                                key={filter.status}
                                flexDirection={'row'}
                                alignItems="center"
                                gap={2}
                            >
                                <Typography
                                onClick={()=>handleFilter(filter.status)}
                                className='cursor-pointer'
                                    sx={{ fontWeight: 600, fontSize: "14px", color: "#000", borderBottom: status === filter.status ? "4px solid orange" : "none", }}
                                >
                                    {filter.status}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        color: '#FA5A7D',
                                        mt: '4px',
                                        width: '57px',
                                        height: '30px',
                                        padding: '4px 10px 4px 10px',
                                        borderRadius: '16px',
                                        background: '#FFEDF0',
                                        textAlign: "center"

                                    }}
                                >
                                    {filter.count}
                                </Typography>
                            </Stack>
                        ))}
                    </Grid>
                    <Grid container xs={12} md={12} lg={12} sx={{ mb: 3 }} gap={1}>
                        {/* <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('way')}>
                <InputLabel sx={{mb:1}}>All Regions</InputLabel>
                            <TextField
                                fullWidth
                                defaultValue={'All Regions'}
                                value={region}
                                onChange={(e) => { setRegion(e.target.value); handleFilter(); }}
                            >
                                
                            </TextField>
                        </Grid> */}
                        <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('hand')} >
                <InputLabel sx={{mb:1}}>From Date</InputLabel>
                            <TextField
                                fullWidth
                                type='date'
                                value={fromDate}
                                onChange={(event) => {
                                  setFromDate(event.target.value); // Get the date value from the input
                                  handleFilter(); // Call your filter function
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('hand')} >
                        <InputLabel sx={{mb:1}}>To Date</InputLabel>
                            <TextField
                                fullWidth
                                type='date'
                                value={fromDate}
                                onChange={(event) => setToDate(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2} onClick={() => changeSelection('manifest')}>
                <InputLabel sx={{mb:1}}>Date Type</InputLabel>
                            <TextField
                                fullWidth
                                select
                                defaultValue={dateTypes[0]}
                                value={dateType}
                                onChange={(e) => setDateType(e.target.value)}
                            >
                                {dateTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                    </Grid>
                </MainCard>
                <MainCard
                    sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    content={false}
                >
                  {/* {!normalUser &&
                   <Grid container xs={12} md={12} lg={12} spacing={3} justifyContent={'center'} alignItems={'center'} sx={{ mb: 3 }}>
                                                              <Grid item xs={12} sm={6} md={4} lg={2.4} >
                                                                <VehicleCards
                                                                title={state.totalPrice}
                                                                  icon={<DashIcon1 />}
                                                                  content={'TOTAL'}
                                                                  bg="#FA5A7D1A"
                                                                />
                                                              </Grid>
                                                              </Grid>} */}
                  <ReactTable  column={!normalUser ? adminHeadCells:cusHeadCells} rows={state.userData} name={'Containers'} pending={pending} totalPrice={1} calculateTotal={(data=>calculateTotal(data))}/>
                </MainCard>
            </Grid>
            <Alert
        open={isAddForm}
        close={handleAddOpen}
        title={
          <Stack alignItems={'center'}>
            <Typography sx={{ fontWeight: 600, fontSize: '28px' }} variant="h5">
              {' '}
              Add Container
            </Typography>
          </Stack>
        }
        content={
          <Box sx={{ width: '90%', margin: 'auto', marginTop: 4 }}>
            <Stepper activeStep={activeStep} sx={{ marginBottom: 4 }}>
              <Step>
                <StepLabel>Container Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Other Details</StepLabel>
              </Step>
            </Stepper>

            {activeStep === 0 && (
              <Grid container spacing={2}>
                {/* Left Side */}
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{mb:1}}>Container No</InputLabel>
                  <TextField  error={!!errors.container_number}
  helperText={errors.container_number?.message} {...register('container_number', { required: true })} fullWidth />
     {errors.container_number && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}
  
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Booking</InputLabel>
                  <TextField  error={!!errors.booking}
  helperText={errors.booking?.message} {...register('booking', { required: true })} fullWidth   />
     {errors.booking && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Departure Port</InputLabel>
                   <TextField fullWidth error={!!errors.departure_port}
  helperText={errors.departure_port?.message} required {...register("departure_port", { required: true })} />
     {errors.departure_port && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Destination Port</InputLabel>
                  <TextField fullWidth error={!!errors.destination_port}
  helperText={errors.destination_port?.message} required {...register("destination_port", { required: true })} />
     {errors.destination_port && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}
  
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Shipping Date</InputLabel>
                  <TextField fullWidth type='date' error={!!errors.shipping_date}
  helperText={errors.shipping_date?.message} required {...register("shipping_date", { required: true })} />
     {errors.shipping_date && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Loaded Date</InputLabel>
                  <TextField fullWidth type='date' error={!!errors.loaded_date}
  helperText={errors.loaded_date?.message}  required {...register("loaded_date", { required: true })} />
     {errors.loaded_date && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <Box>
                <Grid container spacing={2}>
                  {/* Left Side */}
                  <Grid item xs={12} sm={6}>
                  <InputLabel sx={{mb:1}}>ETD</InputLabel>
                  <TextField fullWidth type='date' error={!!errors.etd}
  helperText={errors.etd?.message} required {...register("etd", { required: true })} />
     {errors.etd && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>ETA</InputLabel>
                <TextField fullWidth type='date' error={!!errors.eta}
  helperText={errors.eta?.message} required {...register("eta", { required: true })} />
     {errors.eta && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Container Rent</InputLabel>
                  <TextField error={!!errors.containers_rent}
  helperText={errors.containers_rent?.message} {...register('containers_rent', { required: true })} fullWidth    />
     {errors.containers_rent && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Container Size</InputLabel>
                  <TextField error={!!errors.containers_size}
  helperText={errors.containers_size?.message} {...register('containers_size', { required: true })} fullWidth    />
     {errors.containers_size && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Arrived Port Date</InputLabel>
                  <TextField type='date' error={!!errors.arrived_port_date}
  helperText={errors.arrived_port_date?.message} {...register('arrived_port_date', { required: true })} fullWidth    />
     {errors.arrived_port_date && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Arrived Store Date</InputLabel>
                  <TextField type='date' error={!!errors.arrived_store_date}
  helperText={errors.arrived_store_date?.message} {...register('arrived_store_date', { required: true })} fullWidth   />
     {errors.arrived_store_date && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Cars Shipping Amount</InputLabel>
                  <TextField error={!!errors.cars_shipping_amount}
  helperText={errors.cars_shipping_amount?.message} {...register('cars_shipping_amount', { required: true })} fullWidth    />
     {errors.cars_shipping_amount && <FormHelperText style={{color:'red', marginLeft:'0px'}}>{'please fill this field'}</FormHelperText>}

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel sx={{mb:1}}>Status</InputLabel>
                <select className="style-class" {...register("status", { required: true })}>
                <option value="New">New</option> 
                        <option value="In Shipping">In Shipping</option>
                        <option value="Arrived Port">Arrived Port</option>
                        <option value="Arrived Store">Arrived Store</option>
                        <option value="Deleivered">Deleivered</option>
                      </select>
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
                <ExportBtn onClick={handleAddOpen} sx={{ width: '120px' }}>
                  cancel
                </ExportBtn>
                <MyBtn sx={{ width: '120px' }} onClick={handleStepOneNext} disabled={activeStep === 1}>
                  Next
                </MyBtn>
              </>)}
            {activeStep === 1 && (
              <>
                <ExportBtn onClick={handleBack} sx={{ width: '120px' }}>
                  Back
                </ExportBtn>
                <MyBtn sx={{ width: '120px' }}  disabled={activeStep === 0} onClick={handleSubmit(onSubmit)}>
                  Submit
                </MyBtn>
              </>)}
          </>
        }
      />
          <Alert
        open={state.addVehModal}
        close={addVehclesModal}
        title={
          <Stack alignItems={'center'}>
            <Typography sx={{ fontWeight: 600, fontSize: '28px' }} variant="h5">
              {' '}
              Add Vehicle Into Container
            </Typography>
          </Stack>
        }
        content={
          <Box sx={{ width: '90%', margin: 'auto', marginTop: 4, height: '200px' }}>
            <Grid container>
 <Grid item xs={12} sm={12}>
                <InputLabel sx={{mb:1}}>Select Vehicle</InputLabel>
                 <Select
                        options={vehileList}
                        value={selectedVehicle}
                        onChange={handleVehicle}
                        isSearchable={true} // this is default true, can be omitted
                      />
                
                </Grid>
            </Grid>
          </Box>
        }
        action={
          <>
           
                <ExportBtn onClick={addVehclesModal} sx={{ width: '120px' }}>
                  Cancel
                </ExportBtn>
                <MyBtn sx={{ width: '120px' }}   onClick={addVehIntoContainer}>
                  Submit
                </MyBtn>
          </>
        }
      />
          <Alert
        open={state.detailModal}
        close={openVehiclesDetail}
        title={
          <Stack alignItems={'center'}>
            <Typography sx={{ fontWeight: 600, fontSize: '28px' }} variant="h5">
              {' '}
              Vehicles Details
            </Typography>
          </Stack>
        }
        content={
          <Box sx={{ width: '90%', margin: 'auto', marginTop: 4 }}>
            <ReactTable  column={vehiclesHeadCells} rows={state.vehicles} name={'Containers'}/>
          </Box>
        }
        action={
          <>
           
                <ExportBtn onClick={openVehiclesDetail} sx={{ width: '120px' }}>
                  Cancel
                </ExportBtn>
                
          </>
        }
      />
        </>
    );
}

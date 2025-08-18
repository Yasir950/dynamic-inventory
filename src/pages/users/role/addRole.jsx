import { Breadcrumbs, FormControl, Grid, InputLabel, Link, OutlinedInput, Stack, Switch, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react'
import { AddBtn } from 'styled/styled';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import MuiTable from 'misc/MuiTable';
import { changeForm, clearData, updatedData } from 'redux/slices/userSlice';
import { deleteItem, getPermissionsApi, getRolesData, saveRolesData, updateRoleData } from 'apiservices';
import { toast } from 'react-toastify';
import { ReactTable } from 'misc/ReactTable';
import { DeleteIcon, EditIcon } from 'assets/images/users/Svg';


function createData(id, name, is_admin, permissions) {
  return {
    id,
    name,
    is_admin,
    permissions
  };
}
function AddRoleComp() {
  const [pending, setPending] = useState(true);
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
     name: 'Name',
     selector: row => row.name,
     sortable: true,
     style: {
       fontSize: '14px',
       fontWeight:400,
       color:"#667085"
       // override the row height
     },
     
   },
  
   {
     name: 'Is Admin',
     cell: row => (row.is_active ? <CheckCircleOutlined style={{color:'#14BA6D'}} /> : <CloseCircleOutlined style={{color:'#FA4D4D'}}/>),
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
  const isAddForm = useSelector((state) => state.user.isAddForm)
  const dispatch = useDispatch()
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [state, setState] = useState({
      userData:[],
      permissions: [],
      title:''
    })
    useEffect(() => {
      getRoles();
      getPermissions();
      if(updatedObj){
        setState(prev=>({...prev, title: updatedObj?.name }))
        setSelectedPermissions(updatedObj?.permissions)
      }
      return () => {
      };
    }, [updatedObj]);
    const getRoles =async()=>{
      let res = await getRolesData();
     const rowsData = res.map(item=>(createData(item.id, item.name, item.is_admin === true ? 'Active' : 'InActive', item.permissions)))
      setState(prev=>({...prev, userData: rowsData}))
      setPending(false);
    }
    const getPermissions =async()=>{
      let res = await getPermissionsApi();
      setState(prev=>({...prev, permissions: res}))
    }
  const handleAddOpen = () => {
    setState(prev=>({...prev, title: ""}))
        setSelectedPermissions([])
      dispatch(changeForm())
      dispatch(clearData())
    }
    const handleCheckboxChange = (id) => {
      setSelectedPermissions((prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Remove if already selected
          : [...prev, id] // Add if not selected
      );
    };
    const handleChange =(e)=>{
      setState(prev=>({...prev, title : e.target.value}))
    }
    const saveRoles = async()=>{
      if (updatedObj) {
        let data = {
          name: state.title,
          permissions: selectedPermissions,
          id:updatedObj.id
        }
            let res = await updateRoleData(data, updatedObj?.id);
            if (res?.id) {
              toast.success("roles updated successfully");
              getRoles();
              handleAddOpen();
            }
          } else {
            if(state.title){
            let data = {
              name: state.title,
              permissions: selectedPermissions
            }
            // API Call to save roles and permissions
            let res = await saveRolesData(data)
            if (res?.id) {
              toast.success("role saved successfully");
              getRoles();
              handleAddOpen();
            }}else{
              toast.error("Please Enter Role Name");
            }
          }
    }
     const handleEdit = (row) => {
        dispatch(updatedData(row))
      };
    
      const handleDelete = async (id) => {
       let res= await deleteItem('auth/roles',id)
       if(res === 204){
        getRoles();
        toast.error("role deleted successfully");
       }
      };
  return (
    <>
    {isAddForm ?
    <>
      <Stack justifyContent={'space-between'} flexDirection={'row'}>
        <Typography sx={{ fontWeight: 600, fontSize: '30px', color: '#09090B' }}>
          Add Role
          <Breadcrumbs aria-label="breadcrumb">
  <Typography   sx={{ fontSize:"14px", fontWeight:300}}>
  <span style={{color:"#000000", fontSize:"14px", fontWeight:400}}>Roles</span> <RightOutlined/>  Add Role
  </Typography>
</Breadcrumbs>
        </Typography>
      </Stack>
      <MainCard sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} content={false}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel htmlFor="email-login">Title</InputLabel>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <OutlinedInput
              value={state.title}
              onChange={handleChange}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12} >
            <InputLabel htmlFor="email-login">Select Role</InputLabel>
            <Grid container justifyContent={'space-between'} sx={{ padding: '20px' }}>
              {state.permissions.map(item=>(
                <Grid item xs={6} sm={2} >
              <FormControlLabel key={item.id} control={<Checkbox  checked={selectedPermissions.includes(item.id)} // Check if selected
              onChange={() => handleCheckboxChange(item.id)}/>} label={item.name} />
              </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Stack justifyContent={'space-between'} flexDirection={'row-reverse'} sx={{ mt: 10 }}>
          <Stack direction={'row'} spacing={2}>
            <AddBtn sx={{ background: '#fff', border: '1px solid #FF8900', color: '#FF8900' }} onClick={handleAddOpen}>Cancel</AddBtn>
            <AddBtn onClick={saveRoles}>Add</AddBtn>
          </Stack>
        </Stack>
      </MainCard>
    </>
    :
    <>
    <Stack justifyContent={'space-between'} flexDirection={{xs:'column',sm:'row'}} alignItems={'center'}>
        <Typography sx={{ fontWeight: 600, fontSize: '30px', color: '#09090B' }}>
          Roles
          <Breadcrumbs aria-label="breadcrumb">
          <Typography   sx={{ fontSize:"14px", fontWeight:300}}>
          <span style={{color:"#000000", fontSize:"14px", fontWeight:400}}>Users</span> <RightOutlined/>  Roles
  </Typography>
</Breadcrumbs>
        </Typography>
        <AddBtn onClick={handleAddOpen}><PlusOutlined style={{margin:5}}/> Add Roles</AddBtn>
      </Stack>
      <Grid item xs={12} md={12} lg={12}>
        <MainCard
          sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          content={false}
        >
          <ReactTable column={headCells} rows={state.userData} name={'Roles'} pending={pending}/>
        </MainCard>
      </Grid>
    </>
    }
    </>

  );
}

export default AddRoleComp;

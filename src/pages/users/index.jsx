// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { AddBtn } from 'styled/styled';
import { useEffect, useState } from 'react';
import { deleteItem, getUsersData } from 'apiservices';
import { PlusOutlined, RightOutlined , CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { Breadcrumbs } from '@mui/material';
import AddUser from './AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { changeForm, clearData, updatedData } from 'redux/slices/userSlice';
import { ReactTable } from 'misc/ReactTable';
import { DeleteIcon, EditIcon } from 'assets/images/users/Svg';
import { toast } from 'react-toastify';

// ===============================|| COMPONENT - COLOR ||=============================== //


function createData(id, first_name, contact_no, email, profile_image, user_type, role, is_active) {
  return {
    id,
    first_name,
    email,
    contact_no,
    profile_image,
    user_type,
    role,
    is_active
  };
}
export default function UsersComp() {
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
    selector: row => row.first_name,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Contact No',
    selector: row => row.contact_no,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'User Type',
    selector: row => row.user_type,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Role',
    selector: row => row.role,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Email',
    selector: row => row.email,
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
    cell: row => (row.is_active ? <CheckCircleOutlined style={{color:'#14BA6D'}} /> : <CloseCircleOutlined style={{color:'#FA4D4D'}}/>), // Simplified conditional
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
   const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const handleEdit = (row) => {
    dispatch(updatedData(row))
  };

  const handleDelete = async (id) => {
   let res= await deleteItem('auth/users',id)
   if(res === 204){
    getUsers();
    toast.error("user deleted successfully");
   }
  };
  const isAddForm = useSelector((state) => state.user.isAddForm)
  const [state, setState] = useState({
    userData:[],
  })
  useEffect(() => {
    getUsers();
    return () => {
    };
  }, []);
  const getUsers =async()=>{
    let res = await getUsersData();
   const rowsData = res.map(item=>(createData(item.id, item.first_name,  item.contact_no,item.email, item.profile_image, item.user_type ? item.user_type : "", item.role.name, item.is_active === true ? 'Active' : 'InActive' )))
    setState(prev=>({...prev, userData: rowsData}))
    setPending(false);
  }
  const handleAddOpen = () => {
    dispatch(changeForm())
    dispatch(clearData())
  }
  return (
    <>
    {isAddForm ?
    <AddUser closeForm={handleAddOpen} getUser={getUsers}/>
  :
    <>
      <Stack justifyContent={'space-between'} flexDirection={{xs:'column',sm:'row'}} alignItems={'center'}>
        <Typography sx={{ fontWeight: 600, fontSize: '30px', color: '#09090B' }}>
          Users
          <Breadcrumbs aria-label="breadcrumb">
          <Typography   sx={{ fontSize:"14px", fontWeight:300}}>
          <span style={{color:"#000000", fontSize:"14px", fontWeight:400}}>Dashboard</span> <RightOutlined/>  Users
  </Typography>
</Breadcrumbs>
        </Typography>
        <AddBtn onClick={handleAddOpen}><PlusOutlined style={{margin:5}}/> Add User</AddBtn>
      </Stack>
      <Grid item xs={12} md={12} lg={12}>
        <MainCard
          sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          content={false}
        >
          <ReactTable  column={headCells} rows={state.userData} name={'Users'} pending={pending}/>
          {/* <MuiTable name={'Users'} column={headCells} rows={state.userData} url={'auth/users'} getUsers={getUsers}/> */}
        </MainCard>
      </Grid>
    </>
  }
    </>
  );
}


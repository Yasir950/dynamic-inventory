import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { AddBtn } from 'styled/styled';
import MuiTable from 'misc/MuiTable';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Breadcrumbs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CreateCompany from './create';
import { changeForm, clearData, updatedData } from 'redux/slices/userSlice';
import { useEffect, useState } from 'react';
import { deleteItem, getCompanies } from 'apiservices';
import { DeleteIcon, EditIcon } from 'assets/images/users/Svg';
import { toast } from 'react-toastify';
import { ReactTable } from 'misc/ReactTable';

// ===============================|| COMPONENT - COLOR ||=============================== //
function createData(cid, company_name, contact_no, email, country, city, address, initial_account_limit, authorized_person_name, industry_type) {
  return {
    cid,
    company_name,
    contact_no,
    email,
    country,
    city,
    address,
    initial_account_limit,
    authorized_person_name,
    industry_type
  };
}

export default function CompanyComp() {
  const headCells = [
     {
     name: 'CID',
     selector: row => row.cid,
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
     selector: row => row.company_name,
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
     name: 'Country',
     selector: row => row.country,
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
  //  {
  //   name: 'Authorized Person Name',
  //   selector: row => row.authorized_person_name,
  //   sortable: true,
  //   style: {
  //     fontSize: '14px',
  //     fontWeight:400,
  //     color:"#667085"
  //     // override the row height
  //   },
  //   hide:'lg'
    
  // },
  // {
  //   name: 'Industry Type',
  //   selector: row => row.industry_type,
  //   sortable: true,
  //   style: {
  //     fontSize: '14px',
  //     fontWeight:400,
  //     color:"#667085"
  //     // override the row height
  //   },
  //   hide:'lg'

    
  // },
  // {
  //   name: 'initial Account Limit',
  //   selector: row => row.initial_account_limit,
  //   sortable: true,
  //   style: {
  //     fontSize: '14px',
  //     fontWeight:400,
  //     color:"#667085"
  //     // override the row height
  //   },
  //   hide:'lg'

  // },
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
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);
  const isAddForm = useSelector((state) => state.user.isAddForm)
 const [state, setState] = useState({
    userData:[],
  })
  useEffect(() => {
    getCompaniesData();
    return () => {
    };
  }, []);
  const getCompaniesData =async()=>{
    let res = await getCompanies();
    if(res){
   const rowsData = res.map(item=>(createData(item.id, item.company_name,  item.contact_no,item.email, item.country, item.city , item.address, item.initial_account_limit, item.authorized_person_name, item.industry_type )))
   setState(prev=>({...prev, userData: rowsData}))}
   setPending(false);
  }
  const handleAddOpen = () => {
      dispatch(changeForm())
      dispatch(clearData())
    }
      const handleEdit = (row) => {
        dispatch(updatedData(row))
      };
    
      const handleDelete = async (id) => {
       let res= await deleteItem('companies',id)
       if(res === 204){
        getCompaniesData();
        toast.error("company deleted successfully");
       }
      };
  return (
    <>
    {isAddForm ? (
      <CreateCompany closeForm={handleAddOpen} getData={getCompaniesData}/>
    ):
      <>
      <Stack justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
        <Typography sx={{ fontWeight: 600, fontSize: '30px', color: '#09090B' }}>
          Manage Companies
          <Breadcrumbs aria-label="breadcrumb">
          <Typography   sx={{ fontSize:"14px", fontWeight:300}}>
          <span style={{color:"#000000", fontSize:"14px", fontWeight:400}}>Company</span> <RightOutlined/>  Manage Companies
  </Typography>
</Breadcrumbs>
        </Typography>
        <AddBtn onClick={handleAddOpen}><PlusOutlined style={{margin:5}}/>Add Company</AddBtn>
      </Stack>
      <Grid item xs={12} md={12} lg={12}>
        <MainCard
          sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          content={false}
        >
          <ReactTable name={'Comapany'} column={headCells} rows={state.userData} pending={pending}/>
        </MainCard>
      </Grid>
      </>
    }
    </>
  );
}


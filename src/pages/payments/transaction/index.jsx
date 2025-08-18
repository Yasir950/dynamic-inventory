// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { AddBtn } from 'styled/styled';
import { useEffect, useState } from 'react';
import { deleteItem, getByTransactions, getCreditTransactions, getTransactionData, getUsersData } from 'apiservices';
import { PlusOutlined, RightOutlined , CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { Breadcrumbs } from '@mui/material';
import AddTransactions from './Add';
import { useDispatch, useSelector } from 'react-redux';
import { changeForm, clearData, updatedData } from 'redux/slices/userSlice';
import { ReactTable } from 'misc/ReactTable';
import { DeleteIcon, EditIcon } from 'assets/images/users/Svg';
import { toast } from 'react-toastify';
import Alert from 'misc/dialogue';

// ===============================|| COMPONENT - COLOR ||=============================== //


function createData(id, amount, balance,company, type, transaction_date, description) {
  return {
    id,
    amount,
    balance,
    company,
    type,
    transaction_date,
    description
  };
}
function createInvoiceData(id,company, issue_date, due_date, total,discount,description, status,subtotal, is_published, items, action) {
  return {
    id,company, issue_date, due_date, total,discount,description,status ,subtotal, is_published, items, action
  };
}
export default function TransactionComp() {
  let user =JSON.parse(localStorage.getItem('user'));
  let normalUser = !user?.is_superuser && user?.company
  const invoiceHeadCells = [
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
    name: 'Company',
    selector: row => row.company,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Issue Date',
    selector: row => row.issue_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Due Date',
    selector: row => row.due_date,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Total',
    selector: row => row.total,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Discount',
    selector: row => row.discount,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Payment',
    selector: row => row.status,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Description',
    selector: row => row.description,
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
      <div style={{ fontSize: '13px', fontWeight: 400, background:'#ECFDF3', width: '90px', borderRadius:"10px",
        height: '22px',
        padding: '2px 8px 2px 6px',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
       
        }}>
        {row.is_published}
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
 
  ];
  const headCells = [
    {
    name: 'ID',
    selector: row => row.type==="credit"?<div className='cursor-pointer' onClick={()=>handleModal(row)} style={{color:'blue'}}>
{row.id}
    </div>:row.id,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:500,
      color:'#101828'
      // override the row height
		},
    
  },
  {
    name: 'Transaction Amount',
    selector: row => row.amount,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Balance',
    selector: row => row.balance,
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
    selector: row => row.company?.company_name,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
  {
    name: 'Transaction Type',
    cell: row => (
      <div style={{ fontSize: '13px', fontWeight: 400, background:row.type==="credit"?'#3CD856':"#FD7D95", width: '90px', borderRadius:"10px",
        height: '22px',
        padding: '2px 8px 2px 6px',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
       color:"#FFFFFF"
        }}>
        {row.type?.toUpperCase()}
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
    name: 'Transaction Date',
    selector: row => formatDate(row.transaction_date) ,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },
    {
    name: 'Description',
    selector: row => row.description,
    sortable: true,
    style: {
			fontSize: '14px',
      fontWeight:400,
      color:"#667085"
      // override the row height
		},
    
  },

 
  ];
  
  const dispatch = useDispatch();
    const [pending, setPending] = useState(true);
    const [modal, setModal] = useState(false);

  const formatDate = (timestamp) => {
    if(timestamp){
    return new Date(timestamp).toISOString().split("T")[0]; }
  };
 
  const isAddForm = useSelector((state) => state.user.isAddForm)
  const [state, setState] = useState({
    userData:[],
    creditData:[],
    transactionData:[]
  })
  useEffect(() => {
    getUsers();
    // getCreditData();
    return () => {
    };
  }, []);
  const getUsers =async()=>{
    let res = await getTransactionData();
   const rowsData = res.map(item=>(createData(item.id, item.amount,  item.balance, item.company,item.type, item.transaction_date, item.description)))
    setState(prev=>({...prev, userData: rowsData}))
    setPending(false);
  }
  const getCreditData =async()=>{
    let res = await getCreditTransactions();
   const rowsData = res.map(item=>(createData(item.id, item.amount,  item.balance, item.company,item.type, item.transaction_date, item.description)))

    setState(prev=>({...prev, creditData: rowsData}))
    setPending(false);
  }
  const getTransData =async(id)=>{
            let res = await getByTransactions(id);
            const rowsData =res && res.map(item=>(createInvoiceData(item.invoice.id,item.invoice.company.company_name, item.invoice.issue_date, item.invoice.due_date,  item.invoice.total,item.invoice.discount,item.invoice.description,item.invoice.status,item.invoice.subtotal, item.invoice.is_published,  item.invoice.items)))
            setState(prev=>({...prev, transactionData: rowsData}))
       setPending(false);
  
          }
  const handleAddOpen = () => {
    dispatch(changeForm())
    dispatch(clearData())
  }
  const handleModal = (row="") => {
    if(row?.id){
      getTransData(row?.id)
    }
  setModal(!modal);
  }
  return (
    <>
    {isAddForm ?
    <AddTransactions closeForm={handleAddOpen} getUser={getUsers}/>
  :
    <>
      <Stack justifyContent={'space-between'} flexDirection={{xs:'column',sm:'row'}} alignItems={'center'}>
        <Typography sx={{ fontWeight: 600, fontSize: '30px', color: '#09090B' }}>
          Transactions
          <Breadcrumbs aria-label="breadcrumb">
          <Typography   sx={{ fontSize:"14px", fontWeight:300}}>
          <span style={{color:"#000000", fontSize:"14px", fontWeight:400}}>Dashboard</span> <RightOutlined/>  Transactions
  </Typography>
</Breadcrumbs>
        </Typography>
        {!normalUser &&
        <AddBtn onClick={handleAddOpen}><PlusOutlined style={{margin:5}}/> Add Transaction</AddBtn>}
      </Stack>
      <Grid item xs={12} md={12} lg={12}>
        <MainCard
          sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          content={false}
        >
          <ReactTable  column={headCells} rows={state.userData} name={'Transaction'} pending={pending} disablePagination={true}/>
          {/* <MuiTable name={'Users'} column={headCells} rows={state.userData} url={'auth/users'} getUsers={getUsers}/> */}
        </MainCard>
      </Grid>
    </>
  }
   <Alert
        open={modal}
        close={()=>handleModal("")}
        content={
          <ReactTable  column={invoiceHeadCells} rows={state.transactionData} name={'Invoices'} pending={pending}/>
      
        }
      />
    </>
  );
}


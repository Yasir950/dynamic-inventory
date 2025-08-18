import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  InputLabel,
  Stack,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { getCompanies, getUnassVehicles, getVehicles, saveInvoices, updatedInvoices } from "apiservices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from 'react-select';
const CreateInvoice = ({ handleAddOpen, getInvoices }) => {
  const [invoice, setInvoice] = useState({
    issue_date: "",
    due_date: "",
    from: "",
    company: "",
    description: "",
    subtotal: 0,
    total: 0,
    vehicle:'',
    items: [{ item_name: "", price: 0, discount: 0, total: 0 }],
  });
    const [companies, setCompanies] = useState([]);
  const updatedObj = useSelector((state) => state.user.updatedObj);
      const [vehileList, setVehicleList] = React.useState([]);
  
  const invoiceRef = useRef();
  useEffect(() => {
    getVehiclesData();
    const fetchCompanies = async () => {
      try {
        let res = await getCompanies();
        if (res) {
          res?.map(item=>(
            item.label = item.company_name,
            item.value = item.company_name
          ))
          setCompanies(res);
          // Ensure `updatedObj.company` exists before filtering
          if (updatedObj?.company) {
            if (updatedObj) {
              const filteredCompany = res.filter(company => company.company_name === updatedObj.company.company_name);
              const updatedItems = updatedObj.items?.map((item) => ({
                id:item.id,
                item_name: item.item_name || "",
                price: item.price || 0,
                discount: item.discount ,
                total: item.price || 0,
              })) || [{ item_name: "", price: 0, discount: 0, total: 0 }];
        
              const subtotal = updatedItems.reduce((sum, item) => sum + Number(item.price), 0);
              const total = updatedItems.reduce((sum, item) => sum + Number(item.total), 0);
                
              setInvoice({
                issue_date: updatedObj.issue_date || "",
                due_date: updatedObj.due_date || "",
                from: updatedObj.from || "",
                company: filteredCompany[0] || "",
                description: updatedObj.description || "",
                vehicle:updatedObj.vehicle || "",
                subtotal,
                total,
                items: updatedItems,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, [updatedObj]);
const getVehiclesData =async()=>{
        let res = await getVehicles();
res?.map(item=>(
            item.label = `${item.vin} - ${item.model} - ${item.maker}`,
            item.value = item.id
          ))
        setVehicleList(res)
      }
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
      total:
        field === "price"
          ? parseFloat(value) - updatedItems[index].discount
          : field === "discount" ? updatedItems[index].price - parseFloat(value) : updatedItems[index].total,
    };

    const subtotal = updatedItems.reduce((sum, item) => sum + Number(item.price), 0);
    const total = updatedItems.reduce((sum, item) => sum + Number(item.total), 0);
    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
      subtotal,
      total,
    }));
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { item_name: "", price: 0, discount: 0, total: 0 }],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = invoice.items.filter((_, i) => i !== index);
    const subtotal = updatedItems.reduce((sum, item) => sum + Number(item.price), 0);
    const total = updatedItems.reduce((sum, item) => sum + Number(item.total), 0);
    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
      subtotal,
      total,
    }));
  };

  const saveDraft = async (value) => {
    if(updatedObj){
      let discount = invoice.items.reduce((sum, item) => sum + (parseInt(item.discount) || 0), 0);
      let data = {
        ...invoice,
        is_published: value,
        status: "Pending",
        discount:discount,
        company:invoice.company.id,
        vehicle:invoice.vehicle.id,

      };
      let res = await updatedInvoices(data, updatedObj?.id);
      if (res?.id || res?.pdf_url) {
        toast.success(res.pdf_url ?"Invoice published successfully":"Invoice updated successfully");
        handleAddOpen();
        getInvoices();
        setInvoice({
          issue_date: "",
          due_date: "",
          from: "",
          company: "",
          description: "",
          vehicle: "",
          subtotal: 0,
          total: 0,
          items: [{ item_name: "", price: 0, discount: 8, total: 0 }],
        });
      }
    }else{
      let discount = invoice.items.reduce((sum, item) => sum + (parseInt(item.discount) || 0), 0);
      let data = {
        ...invoice,
        is_published: value,
        status: "Pending",
        discount:discount,
        company:invoice.company.id,
        vehicle:invoice.vehicle.id,

      };
    
      
      let res = await saveInvoices(data);
      if (res.id) {
        toast.success("Invoice saved successfully");
        handleAddOpen();
        getInvoices();
        setInvoice({
          issue_date: "",
          due_date: "",
          from: "",
          company: "",
          vehicle: "",
          description: "",
          subtotal: 0,
          total: 0,
          items: [{ item_name: "", price: 0, discount: "", total: 0 }],
        });
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create Invoice
      </Typography>
      <div ref={invoiceRef}>
      <Grid container spacing={1} >
      <Grid item xs={12} sm={4}>
          <InputLabel>Bill To</InputLabel>
            <Select
        options={companies}
        value={invoice.company}
        onChange={(e) => setInvoice({ ...invoice, company: e })}
        isSearchable={true} // this is default true, can be omitted
      />
        </Grid>
       <Grid item xs={4} sm={4}>
                      <InputLabel >Select Vehicle</InputLabel>
                       <Select
                              options={vehileList}
                              value={invoice.vehicle}
                              onChange={(e) => setInvoice({ ...invoice, vehicle: e })}
                              isSearchable={true} // this is default true, can be omitted
                            />
                      
                      </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Issue Date</InputLabel>
          <TextField
            fullWidth
            type="date"
            value={invoice.issue_date}
            onChange={(e) => setInvoice({ ...invoice, issue_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        
        <Grid item xs={12} sm={2}>
          <InputLabel>Due Date</InputLabel>
          <TextField
            fullWidth
            type="date"
            value={invoice.due_date}
            onChange={(e) => setInvoice({ ...invoice, due_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <Box mt={3}>
        <Typography variant="h6">Items</Typography>
        {invoice.items.map((item, index) => (
          <Grid container key={index} alignItems="center" sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Item Name"
                value={item.item_name}
                onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField fullWidth label="Discount" value={item.discount}  onChange={(e) => handleItemChange(index, "discount", e.target.value)}/>
            </Grid>
            <Grid item xs={1}>
              <TextField fullWidth label="Total" value={item.total} disabled />
            </Grid>
            <Grid item xs={1}>
              <IconButton color="error" onClick={() => removeItem(index)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<Add />} onClick={addItem} sx={{ mt: 2, color: "rgba(255, 137, 0, 1)" }}>
          Add Item
        </Button>
      </Box>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sm={6}>
      <TextField
          fullWidth
          multiline
          rows={3}
          label="Note"
          variant="outlined"
          value={invoice.description}
          onChange={(e) => setInvoice({ ...invoice, description: e.target.value })}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction={'row'} justifyContent={'space-between'} bgcolor="rgba(255, 137, 0, 0.08)" sx={{height:'45px', padding:"10px", borderRadius:"3px" }}>
          <Typography variant="h6">SUBTOTAL</Typography>
          <Typography variant="h6"> {invoice.subtotal}</Typography>
          </Stack>
      
          <Stack direction={'row'} justifyContent={'space-between'} bgcolor="#2A3348" sx={{height:'45px', padding:"10px" , color:'#FFFFFF',borderRadius:"3px"}}>
          <Typography variant="h6">TOTAL</Typography>
          <Typography variant="h6"> {invoice.total}</Typography>
          </Stack>
        </Grid>
      </Grid>
      </div>
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
      <Button onClick={handleAddOpen} variant="contained" sx={{ bgcolor: "#9EA2AA", '&:hover':{
          bgcolor: "#9EA2AA"
        } }}>
          Cancel
        </Button>
        <Button onClick={() => saveDraft("Draft")} variant="contained" sx={{ bgcolor: "#9EA2AA", '&:hover':{
          bgcolor: "#9EA2AA"
        } }}>
          Save Draft
        </Button>
        <Button variant="contained" onClick={()=>saveDraft("Published")} sx={{ bgcolor: "#FF8900", color: "#fff", '&:hover':{
          bgcolor: "#FF8900"
        } }}>
          Publish
        </Button>
      
      </Box>
    </Container>
  );
};

export default CreateInvoice;

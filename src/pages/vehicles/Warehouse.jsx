import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { AddBtn, ExportBtn } from 'styled/styled';
import MuiTable from 'misc/MuiTable';
import React, { useState } from 'react';
import { MyBtn } from 'styled/styled';
import { Box, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField } from '@mui/material';

import Alert from 'misc/dialogue';
import 'style.css';
// ===============================|| COMPONENT - COLOR ||=============================== //

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'S.No'
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Lot No'
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Photo'
  },
  {
    id: 'carbs',
    disablePadding: false,
    label: 'Year'
  },
  {
    id: 'protein',
    disablePadding: false,
    label: 'Make'
  },
  {
    id: 'region',
    disablePadding: false,
    label: 'Region'
  },
  {
    id: 'vin',
    numeric: true,
    disablePadding: false,
    label: 'Vin'
  },
  {
    id: 'des',
    disablePadding: false,
    label: 'Destination'
  },
  {
    id: 'color',
    disablePadding: false,
    label: 'Color'
  }
];
function createData(id, name, calories, fat, carbs, protein, region, vin, des, color) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
    region,
    vin,
    des,
    color
  };
}

const rowsData = [
  createData(1, '01', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(2, '02', 'Donut', 2000, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(3, '03', 'Eclair', 2001, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(4, '04', '234234', 2003, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(5, '05', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(6, '06', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(7, '07', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(8, '08', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(9, '09', '234234', 2020, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(10, '10', '234234', 2025, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(11, '11', '234234', 2012, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(12, '12', '234234', 2025, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black'),
  createData(13, '13', '234234', 2022, 'CHEVROLET', 'SONATA', 'New Jersey', '2HGFC2F69LH557659', 'JEBEL ALI, UAE (AEJEA)', 'Black')
];
export default function WarehouseCarComp() {
  const [activeStep, setActiveStep] = useState(0);

  const [state, setState] = useState({
    selected: 'all'
  })

  const handleAlert = (name) => {
    setState((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Stack justifyContent={'space-between'} flexDirection={'row'}>
          <Typography sx={{ fontWeight: 300, fontSize: '30px', color: '#09090B' }}>
            Vehicles
            <Breadcrumbs navigation={navigation} title="Users" />
          </Typography>
          <Stack direction={'row'} spacing={2}>
            <ExportBtn sx={{ height: '42px' }}>Bulk Excel Upload</ExportBtn>
            <AddBtn onClick={() => handleAlert('alert')}>Add Vehicle</AddBtn>
          </Stack>
        </Stack>
        <MainCard
          sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          content={false}
        >
          <MuiTable name={'Towing Cars'} column={headCells} rows={rowsData} />
        </MainCard>
      </Grid>
      <Alert
        open={state.alert}
        close={() => handleAlert('alert')}
        title={
          <Stack alignItems={'center'}>
            <Typography sx={{ fontWeight: 600, fontSize: "28px" }} variant="h5"> Add Vehicle</Typography>
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
                    <TextField fullWidth label="VIN No" required defaultValue="1025792358" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Lot No" required defaultValue="1025792358" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Color</InputLabel>
                      <Select>
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="Blue">Blue</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Vehicle Type</InputLabel>
                      <Select>
                        <MenuItem value="SUV">SUV</MenuItem>
                        <MenuItem value="Sedan">Sedan</MenuItem>
                        <MenuItem value="Truck">Truck</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Maker</InputLabel>
                      <Select>
                        <MenuItem value="Toyota">Toyota</MenuItem>
                        <MenuItem value="Honda">Honda</MenuItem>
                        <MenuItem value="Ford">Ford</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Model</InputLabel>
                      <Select>
                        <MenuItem value="Model1">Model1</MenuItem>
                        <MenuItem value="Model2">Model2</MenuItem>
                        <MenuItem value="Model3">Model3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Title</InputLabel>
                      <Select>
                        <MenuItem value="Clean">Clean</MenuItem>
                        <MenuItem value="Salvage">Salvage</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Purchased Date"
                      type="date"
                      defaultValue="2024-02-09"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      type="number"
                      defaultValue="2023"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Car Condition</InputLabel>
                      <Select>
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Used">Used</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Car Key</InputLabel>
                      <Select defaultValue="Yes">
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
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
                    <TextField fullWidth label="VIN No" required defaultValue="1025792358" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Lot No" required defaultValue="1025792358" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Color</InputLabel>
                      <Select>
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="Blue">Blue</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Vehicle Type</InputLabel>
                      <Select>
                        <MenuItem value="SUV">SUV</MenuItem>
                        <MenuItem value="Sedan">Sedan</MenuItem>
                        <MenuItem value="Truck">Truck</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Maker</InputLabel>
                      <Select>
                        <MenuItem value="Toyota">Toyota</MenuItem>
                        <MenuItem value="Honda">Honda</MenuItem>
                        <MenuItem value="Ford">Ford</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Model</InputLabel>
                      <Select>
                        <MenuItem value="Model1">Model1</MenuItem>
                        <MenuItem value="Model2">Model2</MenuItem>
                        <MenuItem value="Model3">Model3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Title</InputLabel>
                      <Select>
                        <MenuItem value="Clean">Clean</MenuItem>
                        <MenuItem value="Salvage">Salvage</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Purchased Date"
                      type="date"
                      defaultValue="2024-02-09"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      type="number"
                      defaultValue="2023"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Car Condition</InputLabel>
                      <Select>
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Used">Used</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Car Key</InputLabel>
                      <Select defaultValue="Yes">
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
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
                <ExportBtn onClick={() => handleAlert('alert')} sx={{ width: "120px" }}>cancel</ExportBtn>
                <MyBtn sx={{ width: '120px' }} onClick={handleNext} disabled={activeStep === 1}>
                  Next
                </MyBtn>
              </>)}
            {activeStep === 1 && (
              <>
                <ExportBtn onClick={handleBack} sx={{ width: "120px" }}>Back</ExportBtn>
                <MyBtn sx={{ width: '120px' }} onClick={handleNext} disabled={activeStep === 0}>
                  Submit
                </MyBtn>
              </>)}
          </>
        }
      />
    </>
  );
}


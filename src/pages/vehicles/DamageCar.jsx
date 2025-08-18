import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { AddBtn, ExportBtn } from 'styled/styled';
import MuiTable from 'misc/MuiTable';
import React, { useState } from 'react';
import { MyBtn } from 'styled/styled';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField
} from '@mui/material';

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
export default function DamageCarComp() {
  const [activeStep, setActiveStep] = useState(0);

  const [state, setState] = useState({
    selected: 'all'
  })

  const handleAlert = (name) => {
    setState((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const [selectedParts, setSelectedParts] = useState(["Front Bumper", "Headlights"]);

  const steps = [
    "Car Details",
    "Warehouse Images",
    "Store Images",
    "Loading Images",
    "Other Details",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleChipClick = (part) => {
    if (selectedParts.includes(part)) {
      setSelectedParts(selectedParts.filter((p) => p !== part));
    } else {
      setSelectedParts([...selectedParts, part]);
    }
  };
  const damageParts = [
    "Front Bumper",
    "Headlights",
    "Hood",
    "Doors",
    "Windshield",
    "Rear Bumper",
  ];
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            {/* Step 1: Car Details */}
            <Grid container spacing={2}>
              {/* Lot Number Input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Select Lot No"
                  defaultValue="1025792358"
                  required
                />
              </Grid>

              {/* Car Details Card */}
              <Grid item xs={12}>
                <Card sx={{ display: "flex", alignItems: "center" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image="https://via.placeholder.com/150" // Replace with your image URL
                    alt="Car Image"
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#0056D2" }}>
                      2023 NISSAN ALTIMA SR
                    </Typography>
                    <Typography variant="body2">
                      Lot Number: #342784832
                    </Typography>
                    <Typography variant="body2">Model: ALTIMA SR</Typography>
                    <Typography variant="body2">Year: 2023</Typography>
                    <Typography variant="body2">
                      Chassis No: 1N4BL4CV7NN382424
                    </Typography>
                    <Typography variant="body2">Maker: NISSAN</Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Damage Parts */}
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Select Damage Parts
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {damageParts.map((part) => (
                    <Chip
                      key={part}
                      label={part}
                      onClick={() => handleChipClick(part)}
                      color={selectedParts.includes(part) ? "primary" : "default"}
                      clickable
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            {/* Step 2: Warehouse Images */}
            <Typography variant="h6" gutterBottom>
              Upload Warehouse Images
            </Typography>
            <TextField
              type="file"
              fullWidth
              helperText="Upload images of the vehicle stored in the warehouse."
              inputProps={{ multiple: true }}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            {/* Step 3: Store Images */}
            <Typography variant="h6" gutterBottom>
              Upload Store Images
            </Typography>
            <TextField
              type="file"
              fullWidth
              helperText="Upload images of the vehicle from the store."
              inputProps={{ multiple: true }}
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            {/* Step 4: Loading Images */}
            <Typography variant="h6" gutterBottom>
              Upload Loading Images
            </Typography>
            <TextField
              type="file"
              fullWidth
              helperText="Upload images of the vehicle during loading."
              inputProps={{ multiple: true }}
            />
          </Box>
        );
      case 4:
        return (
          <Box>
            {/* Step 5: Other Details */}
            <Typography variant="h6" gutterBottom>
              Other Details
            </Typography>
            <TextField
              fullWidth
              label="Additional Notes"
              multiline
              rows={4}
              helperText="Add any other relevant details about the request."
            />
          </Box>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
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
            <AddBtn onClick={() => handleAlert('alert')}>Add Request</AddBtn>
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
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Render Current Step */}
            <Box>{renderStepContent(activeStep)}</Box>


          </Box>
        }
        action={
          <>
            {activeStep !== steps.length - 1 && (
              <>
                <ExportBtn onClick={handleBack} sx={{ width: "120px" }}>Back</ExportBtn>

                <MyBtn sx={{ width: '120px' }} onClick={handleNext} disabled={activeStep === steps.length - 1}>
                  Next
                </MyBtn>
              </>)}
            {activeStep === steps.length - 1 && (
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


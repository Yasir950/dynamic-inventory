import { Box, Button, FormLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';


export const LoginContainer = styled(Container)({
  background: '#FFFFFF',
  height: '588px',
  padding: '72px',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

export const LabelForm = styled(FormLabel)({
  fontSize: '14px',
  color: '#4B465C'
});

export const MyBtn = styled(Button)({
  borderRadius: '6px',
  color: '#9F9F9F',
  textTransform: 'capitalize',
  fontWeight: 'normal',
  backgroundColor: '#ECECEC',
  
  '&:focus': {
    backgroundColor: '#FF8900',
    color: '#FAFAFA'
  }
});
export const SimpleBtn = styled(Button)({
  borderRadius: '50px',
  color: '#1F2937',
  textTransform: 'capitalize',
  fontWeight: 'normal',
  backgroundColor: '#fff',
  border: '1px solid #323346',
  // width:"110px",
  '&:hover': {
    backgroundColor: '#F5F5F5',
    color: '#1F2937'
  }
});

export const BoldTypo = styled(Typography)({
  fontWeight: 600,
  fontSize: "24px",
  color: "#151D48"

});
export const NormalTypo = styled(Typography)({
  fontWeight: 300,
  fontSize: "14px",
  color: "#425166"
});
export const DashboardBox = styled(Stack)({
  // width: '170px',
  height: '189px',
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid #979797'

});
export const VehicleBox = styled(Stack)({
  height: '100px',
  borderRadius: '16px',
  padding: '15px'
});
export const StatusBtn = styled(Stack)({
  height: '46px',
  borderRadius: '4px',
  background: '#BF83FF1A',
  padding: '12px',
  color: '#425166'
});
export const AddBtn = styled(Button)({
  // width: '120px',
  height: '42px',
  padding: '8px 10px 8px 10px',
  borderRadius: '6px',
  background: '#FF8900',
  color: '#FFFFFF',
  boxShadow: '0px 1px 2px 0px #0000000D',
  '&:hover': {
    background: '#FF8900',
    color: '#FFF'
  }
});
export const ExportBtn = styled(Button)({
  // width: '150px',
  height: '35px',
  padding: '15px 30px 15px 30px',
  borderRadius: '8px',
  border: '1px solid #D0D5DD',
  color: '#344054',
  textAlign: 'center',

  
});

export const StatusContainer = styled(Typography)({
  height:'22px',
  width:"65px",
  textAlign:"center",
  padding: '0px 8px 2px 6px',
  borderRadius: '16px',
  background:'#ECFDF3',
  display:"flex",
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:"center",
  color:'#037847',
  gap:5
});
export const Dot = styled(Typography)({
  width: '6px',
height: '6px',
background:'#14BA6D',
borderRadius: '16px',
});
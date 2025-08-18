import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import React, { useEffect } from 'react';
import { Divider } from '@mui/material';
import 'style.css';
import { getCompanyById } from 'apiservices';
// ===============================|| COMPONENT - COLOR ||=============================== //


export default function ContactInfoComp() {
  useEffect(() => {
    const json = JSON.parse(localStorage.getItem('user'))
      getCompany(json.company);
      return () => {
        
      };
    }, []);
const  getCompany=async(id)=>{
   console.log(id)
    let res= await getCompanyById(id);
console.log(res)
  }
    return (
        <>
            <Grid item xs={12} md={12} lg={12}>
                <Stack justifyContent={'space-between'} flexDirection={'row'}>
                    <Typography sx={{ fontWeight: 300, fontSize: '30px', color: '#09090B' }}>
                        Contact Information
                        <Breadcrumbs navigation={navigation} title="Users" />
                    </Typography>
                </Stack>
                <MainCard
                    sx={{ mt: 2, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    content={false}
                >
                  
                    <Grid container xs={12} md={12} lg={12} gap={5} alignItems={'center'} sx={{ mb: 3, padding:3 }} columnGap={10}>
                    <Grid item xs={12} sm={6} md={6} lg={5} >
                        <Stack justifyContent={'space-between'} direction={'row'} sx={{mb:1}}>
                        <Typography >First Name</Typography>
                        <Typography sx={{fontWeight:600}}>Yasir</Typography>
                        </Stack>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5} >
                        <Stack justifyContent={'space-between'} direction={'row'} sx={{mb:1}}>
                        <Typography >Last Name</Typography>
                        <Typography sx={{fontWeight:600}}>Abbas</Typography>
                        </Stack>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5} >
                        <Stack justifyContent={'space-between'} direction={'row'} sx={{mb:1}}>
                        <Typography >Phone</Typography>
                        <Typography sx={{fontWeight:600}}>0234122135</Typography>
                        </Stack>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5} >
                        <Stack justifyContent={'space-between'} direction={'row'} sx={{mb:1}}>
                        <Typography >Buyer Code</Typography>
                        <Typography sx={{fontWeight:600}}>MAH1897</Typography>
                        </Stack>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5} >
                        <Stack justifyContent={'space-between'} direction={'row'} sx={{mb:1}}>
                        <Typography >Company Name</Typography>
                        <Typography sx={{fontWeight:600}}>Car Auctions LLC-2</Typography>
                        </Stack>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5} >
                        <Stack justifyContent={'space-between'} direction={'row'} sx={{mb:1}}>
                        <Typography >Address</Typography>
                        <Typography sx={{fontWeight:600}}>Sajja Industrial Area</Typography>
                        </Stack>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5} >
                        <Stack justifyContent={'space-between'} direction={'row'} sx={{mb:1}}>
                        <Typography >Country</Typography>
                        <Typography sx={{fontWeight:600}}>UAE</Typography>
                        </Stack>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5} >
                        <Stack justifyContent={'space-between'} direction={'row'} sx={{mb:1}}>
                        <Typography >State</Typography>
                        <Typography sx={{fontWeight:600}}>Sharjah</Typography>
                        </Stack>
                        <Divider/>
                    </Grid>
                    </Grid>
               
                </MainCard>
        
            </Grid>
        </>
    );
}

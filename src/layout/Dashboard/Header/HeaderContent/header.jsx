import { Stack, Typography } from '@mui/material'
import DateRangedComp from 'misc/daterange';
import React from 'react'

function WelcomHeader() {
  return (
    <Stack justifyContent={'space-between'} flexDirection={'row'}>
      <Typography sx={{fontWeight:300, fontSize:'30px',color:'#09090B'}}>
        Welcome <span style={{fontWeight:600}}>Super!</span>
      </Typography>
      <DateRangedComp/>
    </Stack>
  )
}

export default WelcomHeader;

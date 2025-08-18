import { Stack } from '@mui/system'
import { ArrowIcon, DashIcon1 } from 'assets/images/users/Svg';
import React from 'react'
import { BoldTypo, DashboardBox, NormalTypo } from 'styled/styled';

function DashboardCards({title, content, icon}) {
  return (
    <DashboardBox flexDirection={'column'}>
      <Stack flexDirection={'row-reverse'}>
        <ArrowIcon/>
      </Stack>
      {icon}
      <BoldTypo >{title}</BoldTypo>
      <NormalTypo >{content}</NormalTypo>
    </DashboardBox>
  )
}

export default DashboardCards

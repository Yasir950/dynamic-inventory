import { Stack } from '@mui/system'
import React from 'react'
import { BoldTypo, VehicleBox, NormalTypo } from 'styled/styled';

function VehicleCards({title, content, icon, bg, selected}) {
  return (
    <VehicleBox flexDirection={'column'} sx={{ background: bg, border: selected && '1px solid #FD7D95'}}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <BoldTypo>{title}</BoldTypo>
      {icon}
      </Stack>
      <NormalTypo>{content}</NormalTypo>
    </VehicleBox>
  )
}

export default VehicleCards;

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl
      sx={{
        minWidth: 245,
        background: '#BF83FF1A',
        border: '1px solid #FF8900',
        borderRadius: '4px',
        '&:hover': {
          border: '1px solid #FF8900'
    } }}>
      <InputLabel id="demo-select-small-label">Select Other Location</InputLabel>
      <Select labelId="demo-select-small-label" id="demo-select-small" value={age} label="Age" onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Pakistan</MenuItem>
        <MenuItem value={20}>India</MenuItem>
        <MenuItem value={30}>China</MenuItem>
      </Select>
    </FormControl>
  );
}
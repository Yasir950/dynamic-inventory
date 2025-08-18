import { FilterIcon } from "assets/images/users/Svg";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Stack, Typography } from '@mui/material'

const DateRangeFilter = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div style={{ width: "328px",display:'flex', alignItems:'center', justifyContent:"space-between"}}>
     <FilterIcon/>   
        <Typography >Filter</Typography>
      <DatePicker
      sx={{ width: "243px"}}
        selected={startDate}
        onChange={(dates) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        placeholderText="dd MM yyyy - dd MM yyyy"
        dateFormat="dd MMM yyyy"
        className="form-control"
      />
    </div>
  );
};

export default DateRangeFilter;

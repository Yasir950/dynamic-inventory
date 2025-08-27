import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";

import React, { useState } from "react";

const DateRangeComponent = () => {
  const [date, setDate] = useState(new Date());

  const handleSelect = (newDate) => {
    console.log(newDate); // native Date object
    setDate(newDate);
  };

  return <Calendar date={date} onChange={handleSelect} />;
};

export default DateRangeComponent;

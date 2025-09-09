import React from "react";
import DateRangeFilter from "./DamageCar";

const Example = ({ apply }) => {
  return (
    <div style={{ padding: 16 }}>
      <DateRangeFilter onApply={apply} />
    </div>
  );
};

export default Example;

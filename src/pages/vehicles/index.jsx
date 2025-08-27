import React from "react";
import DateRangeFilter from "./DamageCar";

const Example = () => {
  const handleApply = ({ start, end }) => {
    console.log("Applied Range:", {
      start: start.format("YYYY-MM-DD"),
      end: end.format("YYYY-MM-DD"),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <DateRangeFilter onApply={handleApply} />
    </div>
  );
};

export default Example;

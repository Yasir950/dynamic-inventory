import { FilterIcon } from "assets/images/users/Svg";
import Example from "pages/vehicles";
import React from "react";
import ReactApexChart from "react-apexcharts";

const StackedWithLine = ({ data, set }) => {
  // build categories
  const { target, zones, trend } = data || {};

  if (!trend || !zones) {
    return <div>Loading chart...</div>;
  }

  // Zone sizes
  const redZone = parseInt(zones.red, 10);
  const yellowZone = parseInt(zones.yellow, 10);
  const greenZone = parseInt(zones.green, 10);
  // Dates & on-hand values
  const dates = trend.map((t) => t.date);
  const onHand = trend.map((t) => t.on_hand);
  const maxY = Math.max(...onHand, target) + 10; // +10 for spacing

  // recalc green so that stacked bars always reach maxY
  const greenDynamic = maxY - (redZone + yellowZone);

  // Chart series
  const series = [
    {
      name: "Red Zone",
      type: "bar",
      data: trend.map(() => redZone),
    },
    {
      name: "Yellow Zone",
      type: "bar",
      data: trend.map(() => yellowZone),
    },
    {
      name: "Green Zone",
      type: "bar",
      data: trend.map(() => greenDynamic),
    },
    {
      name: "On Hand",
      type: "line",
      data: onHand,
    },
  ];

  // Chart options
  const options = {
    chart: { stacked: true, height: 420, toolbar: { show: true } },
    plotOptions: { bar: { columnWidth: "60%", borderRadius: 4 } },
    stroke: { width: [0, 0, 0, 3] }, // 3px line for On Hand
    markers: {
      size: [0, 0, 0, 6], // no dots on bar series, 6px dots on line
      strokeColors: "#fff", // white border around dots
      strokeWidth: 2,
      hover: { size: 8 },
    },
    colors: ["#E53935", "#F9A825", "#00C853", "#000"], // green, yellow, red, blue

    xaxis: {
      categories: dates,
    },
    yaxis: [
      {
        show: true,
        // labels: { show: false }, // hide left values
      },
      {
        seriesName: "On Hand",
        opposite: true,
        min: 0, // ✅ start from 0
        title: { text: "" },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "top",
    },
  };
  const handleApply = ({ start, end }) => {
    set({
      start: start.format("YYYY-MM-DD"),
      end: end.format("YYYY-MM-DD"),
    });
  };
  return (
    <div>
      <div
        style={{
          width: "328px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FilterIcon />
        <Example apply={handleApply} />
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={420}
      />
    </div>
  );
};

export default StackedWithLine;

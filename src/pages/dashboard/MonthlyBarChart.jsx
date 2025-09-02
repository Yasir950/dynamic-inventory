import React from "react";
import ReactApexChart from "react-apexcharts";

const StackedWithLine = () => {
  const series = [
    // 🔵 Stacked bars (all on the same stack)
    { name: "Income", type: "bar", data: [44, 55, 41, 67, 22, 43, 21, 49] },
    { name: "Cashflow", type: "bar", data: [13, 23, 20, 8, 13, 27, 33, 12] },
    { name: "Expenses", type: "bar", data: [11, 17, 15, 15, 21, 14, 20, 8] },
    // 🟡 Line (not stacked)
    {
      name: "Revenue",
      type: "line",
      data: [90, 120, 100, 130, 80, 95, 110, 140],
    },
  ];

  const options = {
    chart: {
      type: "line", // mixed chart
      stacked: true, // stacks only the BAR series
      height: 420,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false, // ⬅️ vertical columns (required for stacked+line)
        columnWidth: "45%",
        borderRadius: 4,
      },
    },
    // bars no stroke; line has stroke
    stroke: { width: [0, 0, 0, 3] },
    // 3 bar colors + 1 line color
    colors: ["#1E88E5", "#00C853", "#E53935", "#F9A825"],
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
      ],
    },
    yaxis: [
      {
        // left axis for stacked bars
        title: { text: "Values" },
      },
      {
        // right axis for the line
        seriesName: "Revenue", // binds this axis to the "Revenue" series
        opposite: true,
        title: { text: "Revenue" },
      },
    ],
    legend: { position: "top" },
    tooltip: { shared: true, intersect: false },
    fill: { opacity: [0.9, 0.9, 0.9, 1] },
    markers: { size: [0, 0, 0, 4] }, // show marker only for line
  };

  return (
    <div>
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

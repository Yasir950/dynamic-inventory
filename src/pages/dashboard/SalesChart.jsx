import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";

export default function SalesChart({ data }) {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("sm"));

  // 🔹 Ensure data is valid
  const safeData = Array.isArray(data) && data.length > 0 ? data : [];

  // Extract X-Axis Categories & Y-Axis Values
  const categories = safeData.map((item) => item.vehicle_status);
  const vehicleCounts = safeData.map((item) => item.vehicle_count);
  const dummyCounts = safeData.map((item) => item.vehicles_amount);

  const [series, setSeries] = useState([
    { name: "Vehicles Amount", data: dummyCounts },
    { name: "Vehicles Count", data: vehicleCounts },
  ]);
  useEffect(() => {
    if (safeData.length > 0) {
      const updatedSeries = [
        {
          name: "Vehicles Amount",
          data: safeData.map((item) => item.vehicles_amount),
        }, // Placeholder
        {
          name: "Vehicles Count",
          data: safeData.map((item) => item.vehicle_count),
        },
      ];
      setSeries(updatedSeries);
    }
  }, [data]); // 🔹 Update when data changes

  const chartOptions = {
    chart: {
      type: "bar",
      height: 430,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: xsDown ? "60%" : "20%",
        borderRadius: 2,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: categories, // 🔹 Handle dynamic categories
      labels: {
        rotate: -45,
        style: { colors: theme.palette.text.secondary },
      },
    },
    yaxis: [
      {
        labels: { style: { colors: theme.palette.text.secondary } },
      },
      {
        opposite: true,
        labels: { style: { colors: theme.palette.text.secondary } },
      },
    ],
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex }) {
          if (seriesIndex === 0) {
            return `$${val.toLocaleString()} USD`; // 🔹 First series: Vehicle Amount
          } else if (seriesIndex === 1) {
            return `${val} Vehicles`; // 🔹 Second series: Vehicle Count
          }
          return val;
        },
      },
    },
    grid: { borderColor: theme.palette.divider },
    colors: ["#40ABFC", "#40EAB0"],
    responsive: [
      {
        breakpoint: 600,
        options: {
          yaxis: { show: true },
        },
      },
    ],
  };

  // 🔹 Show Loading Message if No Data
  if (safeData.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center", color: "gray" }}>
        Loading chart data...
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2.5, pb: 0, mt: 1 }}>
      <Box id="chart" sx={{ bgcolor: "transparent" }}>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={360}
        />
      </Box>
    </Box>
  );
}

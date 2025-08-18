import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function BasicTable({data}) {
  const uniqueStatuses = [
    ...new Set(data.flatMap((item) => item.status_count.map((s) => s.status)))
  ];
  
  return (
    <TableContainer >
    <Table>
      {/* Table Head */}
      <TableHead>
        <TableRow sx={{ backgroundColor: "rgba(255, 137, 0, 0.8)" }}>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>Region</TableCell>
          {uniqueStatuses.map((status) => (
            <TableCell key={status} sx={{ color: "white", fontWeight: "bold" }}>
              {status}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      {/* Table Body */}
      <TableBody>
        {data.map((regionData) => (
          <TableRow key={regionData.region}>
            {/* Region Name */}
            <TableCell sx={{ fontWeight: "bold" }}>{regionData.region}</TableCell>

            {/* Status Counts */}
            {uniqueStatuses.map((status) => {
              // Find the vehicle count for the given status
              const statusData = regionData.status_count.find((s) => s.status === status);
              return (
                <TableCell key={status}>
                  {statusData ? statusData.vehicle_count : "-"}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

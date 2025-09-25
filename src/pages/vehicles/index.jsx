import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  Button,
  Box,
  Popover,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const quickOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

const DateRangeDropdown = ({ onApply, short, graph, target }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [start, setStart] = useState(dayjs().format("YYYY-MM-DD"));
  const [end, setEnd] = useState(dayjs().format("YYYY-MM-DD"));
  const [displayValue, setDisplayValue] = useState("Select Date");
  const [selectedQuick, setSelectedQuick] = useState(null);
  const [bucket, setBucket] = useState("weekly");
  const open = Boolean(anchorEl);

  // Open card
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    if (short) {
      setDisplayValue(
        `${dayjs().format("YYYY-MM-DD")} - ${dayjs().format("YYYY-MM-DD")}`
      );
    }
    if (graph) {
      setStart(dayjs().subtract(15, "week").format("YYYY-MM-DD"));
      setEnd(dayjs().format("YYYY-MM-DD"));
      setDisplayValue(
        `${dayjs().subtract(15, "week").format("YYYY-MM-DD")} - ${dayjs().format("YYYY-MM-DD")}`
      );
    }
    if (target) {
      setStart(dayjs().subtract(6, "week").format("YYYY-MM-DD"));
      setEnd(dayjs().format("YYYY-MM-DD"));
      setDisplayValue(
        `${dayjs().subtract(6, "week").format("YYYY-MM-DD")} - ${dayjs().format("YYYY-MM-DD")}`
      );
    }
    return () => {};
  }, []);
  // Close card
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Quick select handlers
  const setToday = () => {
    const today = dayjs().format("YYYY-MM-DD");
    setStart(today);
    setEnd(today);
    setSelectedQuick("today");
  };

  const setThisWeek = () => {
    const weekStart = dayjs().startOf("week").format("YYYY-MM-DD");
    const weekEnd = dayjs().endOf("week").format("YYYY-MM-DD");
    setStart(weekStart);
    setEnd(weekEnd);
    setSelectedQuick("week");
  };

  const setThisMonth = () => {
    const monthStart = dayjs().startOf("month").format("YYYY-MM-DD");
    const monthEnd = dayjs().endOf("month").format("YYYY-MM-DD");
    setStart(monthStart);
    setEnd(monthEnd);
    setSelectedQuick("month");
  };

  // Apply and close
  const handleApply = () => {
    const s = dayjs(start);
    const e = dayjs(end);
    const rangeText = `${s.format("YYYY-MM-DD")} - ${e.format("YYYY-MM-DD")}`;
    setDisplayValue(rangeText);
    if (graph) {
      onApply?.({
        start: s.format("YYYY-MM-DD"),
        end: e.format("YYYY-MM-DD"),
        bucket: bucket,
      });
    } else {
      onApply?.({ start: s.format("YYYY-MM-DD"), end: e.format("YYYY-MM-DD") });
    }
    handleClose();
  };

  return (
    <>
      {/* Main Input */}
      <TextField
        value={displayValue}
        onClick={handleClick}
        fullWidth
        size="small"
        variant="outlined"
        InputProps={{ readOnly: true }}
        sx={{
          cursor: "pointer",
          width: 280,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#FF8900",
            },
            "&:hover fieldset": {
              borderColor: "#FF8900",
            },
          },
        }}
      />

      {/* Popup Card */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Card sx={{ p: 2, borderRadius: 3, minWidth: 380 }}>
          <CardContent>
            {graph && (
              <select
                style={{
                  backgroundColor: "#FFF",
                  color: "#FF8900",
                  border: "1px solid #FF8900",
                  borderRadius: 4,
                  padding: "10px 12px",
                  width: "80%",
                  marginBottom: 16,
                }}
                value={bucket}
                onChange={(e) => setBucket(e.target.value)}
              >
                <option value={"weekly"}>Weekly</option>
                <option value={"daily"}>Daily</option>
              </select>
            )}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {quickOptions.map((opt) => (
                <Button
                  key={opt.value}
                  variant="outlined"
                  size="small"
                  onClick={
                    opt.value === "today"
                      ? setToday
                      : opt.value === "week"
                        ? setThisWeek
                        : setThisMonth
                  }
                  sx={{
                    borderColor: "#FF8900",
                    color: selectedQuick === opt.value ? "white" : "#FF8900",
                    backgroundColor:
                      selectedQuick === opt.value ? "#FF8900" : "transparent",
                    "&:hover": {
                      backgroundColor: "#FF8900",
                      color: "white",
                      borderColor: "#FF8900",
                    },
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </Stack>

            {/* From / To Inputs */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Box>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => {
                    setStart(e.target.value);
                    setSelectedQuick(null);
                  }}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid #FF8900",
                  }}
                />
              </Box>
              <span>-</span>
              <Box>
                <input
                  type="date"
                  value={end}
                  onChange={(e) => {
                    setEnd(e.target.value);
                    setSelectedQuick(null);
                  }}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid #FF8900",
                  }}
                />
              </Box>
            </Stack>

            {/* Apply Button */}
            <Button
              fullWidth
              size="small"
              onClick={handleApply}
              sx={{
                borderColor: "#FF8900",
                color: "#FF8900",
                backgroundColor: "transparent",
                border: "1px solid",
                "&:hover": {
                  backgroundColor: "#FF8900",
                  color: "white",
                  borderColor: "#FF8900",
                },
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Apply
            </Button>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default DateRangeDropdown;

// material-ui
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

// assets
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { useNavigate } from "react-router";
import React from "react";

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

export default function Search() {
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSearch = () => {
    // navigate(`/track`, { state: value });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Call your function here
      handleSearch();
    }
  };
  return (
    <Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
      <FormControl
        sx={{
          width: { xs: "100%", md: 463 },
          height: "38px",
          background: "#F9F9F9",
          border: 0,
        }}
      >
        <OutlinedInput
          size="small"
          id="header-search"
          sx={{ borderRadius: "6px" }}
          onChange={handleChange}
          value={value}
          onKeyDown={handleKeyDown}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined onClick={handleSearch} />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            "aria-label": "weight",
          }}
          placeholder="Enter SKU to search inventory"
        />
      </FormControl>
    </Box>
  );
}

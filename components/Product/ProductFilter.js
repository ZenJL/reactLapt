import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const ExpenseFilter = (props) => {
  const { selectedYearHandle, resetData } = props;

  const [year, setYear] = useState("");

  const handleChange = (event) => {
    setYear(event.target.value);
    selectedYearHandle(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        justifyItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
        <Button
          // sx={{ display: "flex", alignItems: "center" }}
          variant="contained"
          onClick={resetData}
        >
          Reset
        </Button>
      </Box>

      <Box
        sx={{ width: 120, backgroundColor: "#4b4b4b", borderRadius: "12px" }}
      >
        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: "white",
              fontWeight: "bold",
            }}
            id="select-year"
          >
            Year
          </InputLabel>
          <Select
            labelId="select-year"
            id="demo-simple-select"
            value={year}
            label="Year"
            onChange={handleChange}
            sx={{ color: "white" }}
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ExpenseFilter;

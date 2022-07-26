import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useEffect } from "react";

const NameFilter = ({ onFilter }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    onFilter(value);
  }, [value]);

  return (
    <Box spacing={2} sx={{ paddingInline: 2 }}>
      <TextField
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ paddingInline: 1 }}>
              <SearchIcon sx={{ opacity: ".5" }} />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
};

export default NameFilter;

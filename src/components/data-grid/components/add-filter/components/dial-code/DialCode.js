import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const DialCode = ({ onFilter }) => {
  const dials = useSelector((state) => state.dial.value);
  const [value, setValue] = useState("");

  useEffect(() => {
    onFilter(value);
  }, [value]);

  return (
    <Stack sx={{ paddingInline: 2, width: 200 }}>
      <TextField
        variant="standard"
        select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        SelectProps={{
          defaultValue: "",
          displayEmpty: true,
          renderValue: (selected) => {
            if (!selected) {
              return (
                <Typography
                  sx={{
                    color: "currentColor",
                    opacity: "0.42",
                  }}
                >
                  الكود
                </Typography>
              );
            } else {
              const selectedCountry = dials.filter(
                (item) => item.dial === selected
              )[0];
              return (
                <Stack direction="row" spacing={1}>
                  <img src={selectedCountry.flag} style={{ maxWidth: 20 }} />
                  <Typography>{selectedCountry.dial}</Typography>
                </Stack>
              );
            }
          },
          MenuProps: {
            PaperProps: { style: { maxHeight: "250px" } },
          },
          IconComponent: KeyboardArrowDownIcon,
        }}
      >
        {dials.map((item, index) => (
          <MenuItem value={item.dial} key={item.code + " " + index}>
            <Stack direction="row" spacing={1}>
              <img src={item.flag} style={{ maxWidth: 20 }} />
              <Typography>{item.name}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default DialCode;

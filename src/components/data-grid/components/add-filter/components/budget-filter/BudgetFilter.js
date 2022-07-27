import { Input, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";

const options = [
  {
    name: "يساوي",
    value: "يساوي",
  },
  {
    name: "اكبر من",
    value: "اكبر",
  },
  {
    name: "اصغر من",
    value: "اصغر",
  },
];

const BudgetFilter = ({ onFilter = () => {} }) => {
  const [type, setType] = useState(options[0].value);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!Boolean(value)) return onFilter(null);
    onFilter({
      eval: type,
      value: value.replace(",", ""),
    });
  }, [value]);

  return (
    <Stack spacing={2} sx={{ paddingInline: 2 }}>
      <TextField
        variant="standard"
        select
        onChange={(e) => {
          setType(e.target.value);
        }}
        value={type}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.name + " " + option.value + " " + index}
            value={option.value}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <NumberFormat
        value={value}
        customInput={Input}
        onChange={async (e) => {
          setValue(e.target.value);
        }}
        thousandSeparator
      />
    </Stack>
  );
};

export default BudgetFilter;

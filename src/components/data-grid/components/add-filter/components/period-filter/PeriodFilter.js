import { FormControlLabel, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import useValidate from "../../../../../../hooks/useValidate";

const PeriodFilter = ({ onFilter }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const validate = useValidate();

  useEffect(() => {
    validate([
      {
        name: "from",
        value: from,
        isRequired: true,
      },
      {
        name: "to",
        value: to,
        isRequired: true,
      },
    ]).then((output) => {
      if (!output.ok) return onFilter(null);
      onFilter(
        `من: ${from.split("-").reverse().join("/")} - إلى: ${to
          .split("-")
          .reverse()
          .join("/")}`
      );
    });
  }, [from, to]);

  const handleFromChange = (e) => {
    if (
      parseInt(to.split("-").join("")) <
      parseInt(e.target.value.split("-").join(""))
    ) {
      setFrom(to);
    } else {
      setFrom(e.target.value);
    }
  };

  const handleToChange = (e) => {
    if (
      parseInt(from.split("-").join("")) >
      parseInt(e.target.value.split("-").join(""))
    ) {
      setTo(from);
    } else {
      setTo(e.target.value);
    }
  };

  return (
    <Stack spacing={2} sx={{ paddingInline: 2, direction: "rtl" }}>
      <FormControlLabel
        label="من"
        control={
          <TextField
            variant="standard"
            type="date"
            value={from}
            onChange={handleFromChange}
          />
        }
        sx={{ margin: 0, gap: 1 }}
      />
      <FormControlLabel
        label="إلى"
        control={
          <TextField
            variant="standard"
            type="date"
            value={to}
            onChange={handleToChange}
          />
        }
        sx={{ margin: 0, gap: 1 }}
      />
    </Stack>
  );
};

export default PeriodFilter;

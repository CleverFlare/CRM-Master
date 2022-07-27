import { useSelect } from "@mui/base";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const StatusFilter = ({ onFilter }) => {
  const statusStore = useSelector((state) => state.status.value);
  const [status, setStatus] = useState(statusStore[0].name);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    switch (isNew) {
      case true:
        onFilter("العملاء الجدد");
        break;
      case false:
        onFilter(status);
        break;
    }
  }, [isNew, status]);

  return (
    <Stack sx={{ paddingInline: 2, width: 300 }}>
      <FormControlLabel
        label="العملاء الجدد"
        control={
          <Checkbox
            value={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
          />
        }
      />
      {!isNew && (
        <TextField
          variant="standard"
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusStore.map((status, index) => (
            <MenuItem value={status.name} key={status.name + " " + index}>
              {status.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Stack>
  );
};

export default StatusFilter;

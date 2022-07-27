import { Button, Chip, Menu, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import filtersMapping from "../../mappings/filters";

const CustomChip = ({
  variant = "name",
  onDelete = () => {},
  info = {},
  onEdit = () => {},
}) => {
  const [results, setResults] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnFilter = (output) => {
    setResults(output);
  };

  return (
    <Box>
      <Chip
        label={
          <Stack direction="row" spacing={1} sx={{ direction: "ltr" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {info?.type} {info?.data?.eval && `(${info?.data?.eval})`}:
            </Typography>
            <Typography>
              {typeof info?.data === "string" && info?.data}
            </Typography>
            <Typography>
              {typeof info?.data === "object" && info?.data?.value.trim()}
            </Typography>
          </Stack>
        }
        sx={{
          height: "40px",
          borderRadius: "100vmax",
          p: 1,
          direction: "rtl",
          boxShadow: "0 3px 6px #0005",
          "& .MuiChip-deleteIcon": {
            marginLeft: 0,
          },
        }}
        onDelete={(e) => onDelete(e)}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {filtersMapping.map((filter, index) =>
          info?.type === filter?.type
            ? React.cloneElement(filter?.component, {
                key: filter?.type + " " + index,
                onFilter: handleOnFilter,
              })
            : null
        )}
        <Button
          variant="contained"
          sx={{ marginInline: 2, marginTop: 2 }}
          onClick={() => {
            handleClose();
            onEdit(results);
          }}
        >
          تعديل
        </Button>
      </Menu>
    </Box>
  );
};

export default CustomChip;

import { Box, Button, Chip, Menu, MenuItem } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import React from "react";
import filtersMapping from "../../mappings/filters";

const AddFilter = ({ onFilter, filters }) => {
  const [results, setResults] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [filterInfo, setFilterInfo] = useState({
    type: null,
    component: null,
  });

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [filterAnchorEL, setFilterAnchorEL] = useState(null);

  const filterOpen = Boolean(filterAnchorEL);

  const handleCloseFilter = () => {
    setFilterAnchorEL(null);
  };

  const handleFilter = (filterObject) => {
    setResults(filterObject);
  };

  const handleSubmit = () => {
    if (!Boolean(results)) return;
    onFilter({
      type: filterInfo.type,
      parameter: filtersMapping
        .find((item) => item.type === filterInfo.type)
        .parameter(results),
      output: results,
    });
    handleCloseFilter();
    handleClose();
  };

  return (
    <Box>
      <Chip
        label="إضافة تصفية"
        icon={<AddCircleIcon />}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{
          height: "40px",
          borderRadius: "100vmax",
          p: 1,
          direction: "rtl",
          boxShadow: "0 3px 6px #0005",
          "& .MuiChip-icon": {
            marginRight: 0,
          },
        }}
        color="primary"
      />
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        // sx={{ width: "500px" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{ sx: { width: "180px" } }}
      >
        <Box>
          {filtersMapping.map((filter, index) => (
            <MenuItem
              onClick={(e) => setFilterAnchorEL(e.currentTarget)}
              disabled={Boolean(
                (filter?.disableCondition &&
                  filters?.find(filter?.disableCondition)) ||
                  (filter?.onlyOnce &&
                    filters?.find((item) => item?.type === filter?.type))
              )}
              onMouseEnter={() =>
                setFilterInfo({
                  type: filter?.type,
                  component: filter?.component,
                })
              }
              key={filter?.name + " " + index}
            >
              {filter?.name}
            </MenuItem>
          ))}
          <Menu
            open={filterOpen}
            anchorEl={filterAnchorEL}
            onClose={handleCloseFilter}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {filterInfo.component &&
              React.cloneElement(filterInfo.component, {
                onFilter: handleFilter,
              })}
            <Button
              variant="contained"
              sx={{ marginTop: 2, marginInline: 2 }}
              onClick={handleSubmit}
            >
              إضافة
            </Button>
          </Menu>
        </Box>
      </Menu>
    </Box>
  );
};

export default AddFilter;

import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState, useEffect } from "react";
import useGet from "../../../hooks/useGet";

const FilterItem = ({
  name,
  properties,
  property,
  array,
  setter = () => {},
  disableSorting,
}) => {
  const [sort, setSort] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [balance, setBalance] = useState("equal");
  const open = Boolean(anchorEl);
  const [filterBy, setFilterBy] = useState("equal");
  const [compareValue, setCompareValue] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const handleBalanceChange = (event) => {
    setBalance(event.target.value);
  };

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleSortTopToBottom = () => {
    const newArray = [...array];
    return setter((old) => [
      ...old.sort((a, b) => a[property].localeCompare(b[property], ["ar"])),
    ]);
  };

  const handleSortBottomToTop = () => {
    const newArray = [...array];
    return setter((old) => [
      ...old.sort((a, b) => b[property].localeCompare(a[property], ["ar"])),
    ]);
  };

  const handleSortReset = () => {
    return setter((old) => [
      ...array.filter((item) =>
        old?.map((oldItem) => oldItem.id)?.includes(item.id)
      ),
    ]);
  };

  const handleSetSort = (event) => {
    switch (sort) {
      case "top-to-bottom":
        setSort("bottom-to-top");
        handleSortBottomToTop();
        break;
      case "bottom-to-top":
        setSort(null);
        handleSortReset();
        break;
      default:
        setSort("top-to-bottom");
        handleSortTopToBottom();
    }
  };

  const handleBudgetFilter = (value) => {
    if (value === "" && Boolean(array?.length)) return setter([...array]);
    switch (filterBy) {
      case "equal":
        return setter(
          array?.filter(
            (item) => parseFloat(item.allData.max_budget) === parseFloat(value)
          )
        );
      case "greater":
        return setter(
          array?.filter(
            (item) => parseFloat(item.allData.max_budget) > parseFloat(value)
          )
        );
      case "less":
        return setter(
          array?.filter(
            (item) => parseFloat(item.allData.max_budget) < parseFloat(value)
          )
        );
    }
  };

  const handleFilter = () => {
    if (selectedProject === "" && Boolean(array?.length))
      return setter((old) => [...old]);
    setter((old) => [
      ...old?.filter((item) =>
        item.allData.bussiness?.includes(selectedProject)
      ),
    ]);
  };

  useEffect(() => {
    handleBudgetFilter(compareValue);
    handleFilter();
  }, [compareValue, selectedProject]);

  return (
    <Stack
      direction="row"
      sx={{
        paddingInline: 5,
        cursor: "pointer",
        flex: 1,
        overflow: "hidden",
        position: "relative",
        minWidth: 110,
      }}
      justifyContent={!properties ? "center" : "left"}
      onClick={disableSorting ? null : handleSetSort}
    >
      <Box
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {name}**
      </Box>
      {!disableSorting && (
        <Box sx={{ overflow: "hidden" }}>
          <IconButton>
            {!sort && <ArrowUpwardIcon opacity={0.4} />}
            {sort === "top-to-bottom" && <ArrowUpwardIcon />}
            {sort === "bottom-to-top" && <ArrowDownwardIcon />}
          </IconButton>
        </Box>
      )}
      {properties && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
          }}
        >
          <IconButton onClick={handleOpenMenu}>
            <MenuIcon sx={{ width: 18, height: 18 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              "& .MuiMenu-paper": {
                minWidth: 200,
              },
            }}
          >
            {Array.isArray(properties) && (
              <MenuItem>
                <ListItemText
                  onClick={(e) => {
                    setSelectedProject("");
                    handleCloseMenu(e);
                  }}
                >
                  الجميع
                </ListItemText>
              </MenuItem>
            )}
            {Array.isArray(properties) ? (
              properties?.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={(e) => {
                    setSelectedProject(item.text);
                    handleCloseMenu(e);
                  }}
                  selected={selectedProject === item.text}
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText>{item.text}</ListItemText>
                </MenuItem>
              ))
            ) : (
              <Stack
                direction="column"
                sx={{
                  width: "100%",
                  padding: "10px 15px",
                  boxSizing: "border-box",
                }}
                justifyContent="center"
                spacing={2}
                onClick={(event) => event.stopPropagation()}
              >
                {/* <FormControl>
                  <Select
                    value={balance}
                    onChange={handleBalanceChange}
                    size="small"
                  >
                    <MenuItem value="equal">يساوي</MenuItem>
                    <MenuItem value="greater">اكثر من</MenuItem>
                    <MenuItem value="less">اقل من</MenuItem>
                  </Select>
                </FormControl> */}
                <TextField
                  variant="standard"
                  select
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <Typography sx={{ opacity: ".5" }}>الفئة</Typography>
                        );
                      } else {
                        switch (selected) {
                          case "equal":
                            return "يساوي";
                          case "greater":
                            return "اكثر من";
                          case "less":
                            return "اقل من";
                        }
                      }
                    },
                  }}
                  value={filterBy}
                  onChange={(e) => {
                    setCompareValue("");
                    setFilterBy(e.target.value);
                  }}
                >
                  <MenuItem value="equal">يساوي</MenuItem>
                  <MenuItem value="greater">اكثر من</MenuItem>
                  <MenuItem value="less">اقل من</MenuItem>
                </TextField>
                <TextField
                  variant="standard"
                  type="number"
                  inputProps={{ min: 0 }}
                  placeholder="ادخل الرقم"
                  size="small"
                  onChange={(e) => {
                    setCompareValue(e.target.value);
                  }}
                  value={compareValue}
                />
              </Stack>
            )}
          </Menu>
        </Box>
      )}
    </Stack>
  );
};

export default FilterItem;

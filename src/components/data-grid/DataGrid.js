import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { useEffect } from "react";

const FilterItem = ({
  name,
  properties,
  disableSorting,
  onSortTopToBottom,
  onSortBottomToTop,
  onSortReset,
}) => {
  const [sort, setSort] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [balance, setBalance] = useState("equal");
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleSetSort = (event) => {
    switch (sort) {
      case "top-to-bottom":
        setSort("bottom-to-top");
        onSortBottomToTop();
        break;
      case "bottom-to-top":
        setSort(null);
        onSortReset();
        break;
      default:
        setSort("top-to-bottom");
        onSortTopToBottom();
    }
  };

  const handleBalanceChange = (event) => {
    setBalance(event.target.value);
  };

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
            {Array.isArray(properties) ? (
              properties.map((item, index) => (
                <MenuItem key={index} onClick={handleCloseMenu}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText>{item.text}</ListItemText>
                </MenuItem>
              ))
            ) : (
              <Stack
                direction="column"
                sx={{
                  width: "100%",
                  paddingInline: "20px",
                  boxSizing: "border-box",
                }}
                justifyContent="center"
                spacing={2}
                onClick={(event) => event.stopPropagation()}
              >
                <FormControl>
                  <Select
                    value={balance}
                    onChange={handleBalanceChange}
                    size="small"
                  >
                    <MenuItem value="equal">يساوي</MenuItem>
                    <MenuItem value="greater">اكثر من</MenuItem>
                    <MenuItem value="less">اقل من</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  placeholder="ادخل الرقم"
                  size="small"
                />
              </Stack>
            )}
          </Menu>
        </Box>
      )}
    </Stack>
  );
};

const TablePagination = () => {
  const [page, setPage] = useState(1);
  const max = 19;

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  const handleIncrease = () => {
    setPage((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    if (page < 1) setPage(1);
    if (page > max) setPage(max);
  }, [page]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      spacing={1}
      sx={{ direction: "ltr" }}
    >
      <IconButton onClick={handleIncrease}>
        <ArrowForwardIosIcon
          sx={{ width: "15px", height: "15px" }}
          color="primary"
        />
      </IconButton>
      <Typography variant="caption" sx={{ fontWeight: "bold" }} color="primary">
        {max}
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: "bold" }} color="primary">
        من
      </Typography>
      <Box sx={{ color: "primary" }}>
        <input
          type="number"
          className="disable-number-controllers"
          value={page}
          onInput={handleChange}
          style={{
            width: 20,
            height: 20,
            textAlign: "center",
            fontWeight: "bold",
            outline: "none",
            color: "#233975",
            direction: "ltr",
          }}
        />
      </Box>
      <IconButton onClick={handleDecrease}>
        <ArrowBackIosNewIcon
          sx={{ width: "15px", height: "15px" }}
          color="primary"
        />
      </IconButton>
    </Stack>
  );
};

const areaMenu = [
  {
    text: "الشيخ زايد",
  },
  {
    text: "الشيخ زايد",
  },
  {
    text: "الشيخ زايد",
  },
  {
    text: "الشيخ زايد",
  },
];

const code = [
  {
    text: "(20+)",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
        style={{ maxWidth: 20 }}
      />
    ),
  },
  {
    text: "(20+)",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
        style={{ maxWidth: 20 }}
      />
    ),
  },
  {
    text: "(20+)",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
        style={{ maxWidth: 20 }}
      />
    ),
  },
  {
    text: "(20+)",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
        style={{ maxWidth: 20 }}
      />
    ),
  },
];

const projectsMenu = [
  {
    text: "الشيخ زايد & أكتوبر",
  },
  {
    text: "الشيخ زايد & أكتوبر",
  },
  {
    text: "الشيخ زايد & أكتوبر",
  },
  {
    text: "الشيخ زايد & أكتوبر",
  },
];

const balance = "filter";

const DataGrid = ({ rows, columns }) => {
  const [rowsCopy, setRowsCopy] = useState(rows ? rows : null);

  const handleSortTopToBottom = () => {
    const newArray = [...rows];
    return setRowsCopy([
      ...newArray.sort((a, b) => a.name.localeCompare(b.name, ["ar"])),
    ]);
  };

  const handleSortBottomToTop = () => {
    const newArray = [...rows];
    return setRowsCopy([
      ...newArray.sort((a, b) => b.name.localeCompare(a.name, ["ar"])),
    ]);
  };

  const handleSortReset = () => {
    return setRowsCopy([...rows]);
  };

  useEffect(() => {
    setRowsCopy(rows);
  }, []);

  return (
    <Paper sx={{ overflowX: "auto" }}>
      <Box sx={{ overflowX: "auto" }}>
        <Stack
          direction="column"
          sx={{ width: "max-content", minWidth: "100%" }}
        >
          {/* Grid Header */}
          <Stack
            direction="row"
            alignItems="center"
            divider={
              <Divider orientation="vertical" variant="middle" flexItem />
            }
            sx={{ width: "100%", height: 70 }}
          >
            <FilterItem
              name="الأسم"
              onSortTopToBottom={handleSortTopToBottom}
              onSortBottomToTop={handleSortBottomToTop}
              onSortReset={handleSortReset}
            />
            <FilterItem name="كود البلد" properties={code} disableSorting />
            <FilterItem name="المنطقة" properties={areaMenu} disableSorting />
            <FilterItem
              name="المشروع"
              properties={projectsMenu}
              disableSorting
            />
            <FilterItem name="الميزانية" properties={balance} disableSorting />
          </Stack>
          <Divider orientation="horizontal" />
          {/* Grid Content */}
          <Table
            sx={{
              width: "100%",
              "& .MuiTableCell-root": {
                border: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    {column.headerName ? column.headerName : column.field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsCopy &&
                rowsCopy.map((row, rowIndex) => {
                  return (
                    <TableRow
                      sx={{
                        bgcolor: rowIndex % 2 == 0 ? "#f5f5f5" : "initial",
                      }}
                      key={rowIndex}
                    >
                      {columns &&
                        columns.map((column, columnIndex) => {
                          if (row[column.field]) {
                            return (
                              <TableCell key={columnIndex}>
                                {row[column.field]}
                              </TableCell>
                            );
                          } else {
                            throw Error(
                              `The field "${column.field}" does not match any key in the object, error fired at index ${rowIndex}`
                            );
                          }
                        })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Stack>
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ direction: "rtl", paddingBlock: 1 }}
      >
        <TablePagination />
      </Stack>
    </Paper>
  );
};

export default DataGrid;

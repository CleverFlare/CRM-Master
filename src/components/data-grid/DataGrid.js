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
import { cloneElement, useState } from "react";

const FilterColumn = ({ name, properties, disableSorting }) => {
  const [hovered, setHovered] = useState(false);
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
        return setSort("bottom-to-top");
      case "bottom-to-top":
        return setSort(null);
      default:
        return setSort("top-to-bottom");
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        <Box sx={{ width: hovered || sort ? "auto" : 0, overflow: "hidden" }}>
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
            width: hovered ? "auto" : 0,
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
                direction="row"
                sx={{
                  width: "100%",
                  paddingInline: "20px",
                  boxSizing: "border-box",
                }}
                justifyContent="center"
                spacing={2}
                onClick={(event) => event.stopPropagation()}
              >
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  placeholder="ادخل الرقم"
                  size="small"
                />
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
              </Stack>
            )}
          </Menu>
        </Box>
      )}
    </Stack>
  );
};

const TablePagination = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      spacing={1}
      sx={{ direction: "ltr" }}
    >
      <IconButton>
        <ArrowForwardIosIcon
          sx={{ width: "15px", height: "15px" }}
          color="primary"
        />
      </IconButton>
      <Typography variant="caption" sx={{ fontWeight: "bold" }} color="primary">
        19
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: "bold" }} color="primary">
        من
      </Typography>
      <Box sx={{ color: "primary" }}>
        <input
          type="text"
          defaultValue={1}
          style={{
            width: 20,
            height: 20,
            textAlign: "center",
            fontWeight: "bold",
            outline: "none",
            color: "#233975",
          }}
        />
      </Box>
      <IconButton>
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

const DataGrid = () => {
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
            <FilterColumn name="الأسم" />
            <FilterColumn name="كود البلد" properties={code} disableSorting />
            <FilterColumn name="المنطقة" properties={areaMenu} disableSorting />
            <FilterColumn
              name="المشروع"
              properties={projectsMenu}
              disableSorting
            />
            <FilterColumn
              name="الميزانية"
              properties={balance}
              disableSorting
            />
          </Stack>
          <Divider orientation="horizontal" />
          {/* Grid Content */}
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>الأسم</TableCell>
                <TableCell>الهاتف</TableCell>
                <TableCell>المشروع</TableCell>
                <TableCell>تعليق</TableCell>
                <TableCell>مسؤول المبيعات</TableCell>
                <TableCell>القناة</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>محمد علي</TableCell>
                <TableCell>01010203112</TableCell>
                <TableCell>الشيخ زايد & أكتوبر</TableCell>
                <TableCell>لايوجد</TableCell>
                <TableCell>أحمد محمد</TableCell>
                <TableCell>اليوتيوب</TableCell>
              </TableRow>
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

// text-overflow: ellipsis;
//     overflow: hidden;
//     white-space: nowrap;

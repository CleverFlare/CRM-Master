import {
  Box,
  Button,
  Divider,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

const FilterColumn = ({ name }) => {
  const [hovered, setHovered] = useState(false);
  const [sort, setSort] = useState(null);

  const handleSetSort = (event) => {
    console.log(event);
    switch (sort) {
      case "top-to-bottom":
        return setSort("bottom-to-top");
      case "bottom-to-top":
        return setSort(null);
      default:
        return setSort("top-to-bottom");
    }
  };

  const handleFilterMenu = (event) => {
    event.stopPropagation();
  };

  return (
    <Stack
      direction="row"
      sx={{
        paddingInline: 5,
        cursor: "pointer",
        flex: 1,
        overflowX: "hidden",
        position: "relative",
      }}
      onClick={handleSetSort}
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
      <Box sx={{ width: hovered || sort ? "auto" : 0, overflow: "hidden" }}>
        <IconButton>
          {!sort && <ArrowUpwardIcon opacity={0.4} />}
          {sort === "top-to-bottom" && <ArrowUpwardIcon />}
          {sort === "bottom-to-top" && <ArrowDownwardIcon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          width: hovered ? "auto" : 0,
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
        }}
      >
        <IconButton onClick={handleFilterMenu}>
          <MenuIcon sx={{ width: 18, height: 18 }} />
        </IconButton>
      </Box>
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

const DataGrid = () => {
  return (
    <Paper>
      {/* Grid Header */}
      <Stack
        direction="row"
        alignItems="center"
        divider={<Divider orientation="vertical" variant="middle" flexItem />}
        sx={{ width: "100%", height: 70 }}
      >
        <FilterColumn name="الأسم" />
        <FilterColumn name="كود البلد" />
        <FilterColumn name="المنطقة" />
        <FilterColumn name="المشروع" />
        <FilterColumn name="الميزانية" />
      </Stack>
      <Divider orientation="horizontal" />
      {/* Grid Content */}
      <Table>
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
      {/* Grid Footer */}
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

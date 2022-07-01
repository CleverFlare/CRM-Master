import {
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import FilterItem from "./items/FilterItem";
import TablePagination from "./items/TablePagination";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    setRowsCopy(rows);
  }, []);

  return (
    <Paper sx={{ overflowX: "auto" }} elevation={2}>
      <Paper variant="outlined">
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
                property="name"
                array={rows}
                setter={setRowsCopy}
              />
              <FilterItem name="كود البلد" properties={code} disableSorting />
              <FilterItem name="المنطقة" properties={areaMenu} disableSorting />
              <FilterItem
                name="المشروع"
                properties={projectsMenu}
                disableSorting
              />
              <FilterItem
                name="الميزانية"
                properties={balance}
                disableSorting
              />
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
    </Paper>
  );
};

export default DataGrid;

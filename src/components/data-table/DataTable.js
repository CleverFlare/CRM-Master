import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const DataTable = ({
  title,
  minWidth = "initial",
  maxWidth = "initial",
  width = "initial",
  columns,
  rows,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        minHeight: "600px",
        height: 0,
        minWidth,
        maxWidth,
        width,
      }}
    >
      <Stack direction="column" sx={{ height: "100%" }}>
        <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
          <Typography>{title}</Typography>
        </Box>
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Table
            sx={{
              width: "100%",
              "& .MuiTableCell-root": {
                height: "max-content",
                border: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                {columns?.map((column, index) => (
                  <TableCell key={index}>
                    {column.headerName ? column.headerName : column.field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ height: "max-content" }}>
              {rows &&
                rows?.map((row, rowIndex) => {
                  return (
                    <TableRow
                      sx={{
                        bgcolor: rowIndex % 2 == 0 ? "#f9f9f9" : "initial",
                      }}
                      key={rowIndex}
                    >
                      {columns &&
                        columns?.map((column, columnIndex) => {
                          if (row[column.field]) {
                            return (
                              <TableCell key={columnIndex}>
                                {row[column.field]}
                              </TableCell>
                            );
                          } else {
                            // console.log(column.field);
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
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", p: 2 }}>
          <Link to="" style={{ textDecoration: "none", width: "max-content" }}>
            <Typography sx={{ color: "#6d5bc6" }}>عرض الجميع</Typography>
          </Link>
        </Box>
      </Stack>
    </Paper>
  );
};

export default DataTable;

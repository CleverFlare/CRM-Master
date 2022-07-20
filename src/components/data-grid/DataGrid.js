import {
  Backdrop,
  Box,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import FilterItem from "./items/FilterItem";
import TablePagination from "./items/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import CustomersEditDialog from "../../components/customers-edit-dialog/CustomersEditDialog";
import { useState, useEffect } from "react";
import EditCustomerPassword from "../edit-customer-password/EditCustomerPassword";
import ArchiveIcon from "@mui/icons-material/Archive";
import KeyIcon from "@mui/icons-material/Key";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import areaMenu from "./assets/AreaMenuMapping";
import code from "./assets/CountryCodeMapping";
import projectsMenu from "./assets/ProjectsMenuMapping";

const balance = "filter";

const DataGrid = ({
  rows,
  columns,
  nameWithSearch,
  maxRowsPerPage,
  onDelete = null,
  onArchive = null,
  onChangePassword = null,
  onBlock = null,
  onEdit = null,
}) => {
  const [rowsCopy, setRowsCopy] = useState(null);
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [openEditPass, setOpenEditPass] = useState(false);
  const [initials, setInitial] = useState(false);
  const [pages, setPages] = useState(19);
  const [currentPage, setCurrentPage] = useState(1);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(maxRowsPerPage);

  const handleSetInitials = (value) => {
    setInitial(value);
  };

  const handleCloseEditInfo = () => {
    setOpenEditInfo(false);
  };

  const handleCloseEditPass = () => {
    setOpenEditPass(false);
  };

  const handleSearchName = (event) => {
    const filteredArray = rows.filter((item, index) =>
      item.name.includes(event.target.value)
    );
    console.log(filteredArray);
    setRowsCopy(filteredArray);
  };

  useEffect(() => {
    if (rows) {
      setRowsCopy(rows);
      setPages(Math.ceil(rows.length / maxRowsPerPage));
    }
  }, [rows]);

  useEffect(() => {
    setSliceStart(maxRowsPerPage * (currentPage - 1));
    setSliceEnd(maxRowsPerPage * currentPage);
  }, [currentPage]);

  return (
    <Paper sx={{ overflowX: "auto" }} elevation={2}>
      <Paper variant="outlined">
        <Box sx={{ overflowX: "auto" }}>
          <Stack
            direction="column"
            sx={{ width: "max-content", minWidth: "100%" }}
          >
            {/* Grid Header */}

            {nameWithSearch ? (
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
                <Stack
                  direction="row-reverse"
                  alignItems="center"
                  sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    paddingInline: 10,
                  }}
                >
                  <TextField
                    variant="standard"
                    placeholder="بحث"
                    sx={{
                      width: 400,
                      "& .MuiInput-root": {
                        borderRadius: "100vmax",
                        border: "none",
                        bgcolor: "#f5f5f5",
                        padding: 0.5,
                        boxSizing: "border-box",
                      },
                    }}
                    onChange={handleSearchName}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Stack>
            ) : (
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
                <FilterItem
                  name="المنطقة"
                  properties={areaMenu}
                  disableSorting
                />
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
            )}
            <Divider orientation="horizontal" />
            {/* Grid Content */}
            <Box
              sx={{
                maxHeight: 600,
                height: 600,
                minHeight: 600,
                overflowY: "auto",
              }}
            >
              {rowsCopy && (
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
                      {columns.map((column, index) => (
                        <TableCell key={index}>
                          {column.headerName ? column.headerName : column.field}
                        </TableCell>
                      ))}
                      {(onDelete ||
                        onArchive ||
                        onChangePassword ||
                        onBlock ||
                        onEdit) && <TableCell>إجرائات</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ height: "max-content" }}>
                    {rowsCopy &&
                      rowsCopy
                        .slice(sliceStart, sliceEnd)
                        .map((row, rowIndex) => {
                          return (
                            <TableRow
                              sx={{
                                bgcolor:
                                  rowIndex % 2 == 0 ? "#f5f5f5" : "initial",
                              }}
                              key={rowIndex}
                            >
                              {columns &&
                                columns.map((column, columnIndex) => {
                                  if (column.customeContent) {
                                    return (
                                      <TableCell key={columnIndex}>
                                        {column.customeContent(
                                          {
                                            ...row,
                                          },
                                          setOpenEditInfo,
                                          setOpenEditPass,
                                          handleSetInitials
                                        )}
                                      </TableCell>
                                    );
                                  }
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
                              {(onDelete ||
                                onArchive ||
                                onChangePassword ||
                                onBlock ||
                                onEdit) && (
                                <TableCell>
                                  <Stack direction="row" spacing={2}>
                                    {onChangePassword && (
                                      <IconButton
                                        size="small"
                                        sx={{
                                          bgcolor: "#495f9b",
                                          color: "white",
                                          borderRadius: 2,
                                          "&:hover": {
                                            backgroundColor: "#5c77c1",
                                          },
                                        }}
                                        onClick={(event) =>
                                          onChangePassword(event, row)
                                        }
                                      >
                                        <KeyIcon />
                                      </IconButton>
                                    )}
                                    {onEdit && (
                                      <IconButton
                                        size="small"
                                        sx={{
                                          bgcolor: "#96ee9d",
                                          color: "white",
                                          borderRadius: 2,
                                          "&:hover": {
                                            backgroundColor: "#b2f1b7",
                                          },
                                        }}
                                        onClick={(event) => onEdit(event, row)}
                                      >
                                        <EditIcon />
                                      </IconButton>
                                    )}
                                    {onDelete && (
                                      <IconButton
                                        size="small"
                                        sx={{
                                          bgcolor: "#f8c6c6",
                                          color: "#ff3c3c",
                                          borderRadius: 2,
                                          "&:hover": {
                                            backgroundColor: "#ffe9e9",
                                          },
                                        }}
                                        onClick={(event) =>
                                          onDelete(event, row)
                                        }
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )}
                                    {onBlock && (
                                      <IconButton
                                        size="small"
                                        sx={{
                                          bgcolor: "#ff3c3c",
                                          color: "white",
                                          borderRadius: 2,
                                          "&:hover": {
                                            backgroundColor: "#ff8080",
                                          },
                                        }}
                                        onClick={(event) => onBlock(event, row)}
                                      >
                                        <BlockIcon />
                                      </IconButton>
                                    )}
                                  </Stack>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              )}
              {!rowsCopy && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100%",
                  }}
                >
                  <CircularProgress color="primary" />
                </Box>
              )}
            </Box>
          </Stack>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ direction: "rtl", paddingBlock: 1 }}
        >
          <TablePagination
            max={pages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        </Stack>
      </Paper>
      <CustomersEditDialog
        isOpened={openEditInfo}
        onClose={handleCloseEditInfo}
        initials={initials}
      />
      <EditCustomerPassword
        isOpened={openEditPass}
        onClose={handleCloseEditPass}
      />
    </Paper>
  );
};

export default DataGrid;

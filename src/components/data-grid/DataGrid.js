import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../../hooks/useGet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomChip from "./components/custom-chip/CustomChip";
import AddFilter from "./components/add-filter/AddFilter";
import amountMapping from "./mappings/amount";
import filtersMapping from "./mappings/filters";

const balance = "filter";

const DataGrid = ({
  rows,
  columns,
  maxRowsPerPage,
  onView = null,
  onDelete = null,
  onArchive = null,
  onChangePassword = null,
  onBlock = null,
  onEdit = null,
  onNext = () => {},
  onPrev = () => {},
  onInput = () => {},
  max = 1,
  current,
  isPending = false,
  filterURL,
  syncName,
}) => {
  // const [parameters, setParameters] = useState("?");

  const [rowsCopy, setRowsCopy] = useState(null);

  // const [getUsingFilters, getUsingFiltersError] = useGet(
  //   filterURL + parameters
  // );

  const dispatch = useDispatch();

  const [filters, setFilters] = useState([]);

  const [projectsGetRequest, projectsGetRequestError] = useGet(
    "aqar/api/router/Project/"
  );

  const handleSearchName = (event) => {
    const filteredArray = rows.filter((item, index) =>
      item.name?.includes(event.target.value)
    );
    setRowsCopy(filteredArray);
  };

  useEffect(() => {
    if (rows) {
      setRowsCopy(rows);
    }
  }, [rows]);

  useEffect(() => {
    projectsGetRequest().then((res) =>
      dispatch({ type: "projects/set", payload: res.results })
    );
  }, []);

  const handleAddNewFilter = (filterOutput) => {
    if (
      filters.some(
        (item) => JSON.stringify(item) === JSON.stringify(filterOutput)
      )
    )
      return;
    setFilters((old) => [...old, filterOutput]);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters;
    newFilters.splice(index, 1);
    setFilters([...newFilters]);
  };

  const handleEditFilter = (output, index) => {
    const newFilters = filters;
    newFilters[index].output = output;
    newFilters[index].parameter = filtersMapping
      .find((item) => item?.type === newFilters[index]?.type)
      .parameter(output);
    setFilters([...newFilters]);
  };

  useEffect(() => {
    // setParameters(
    //   "?" +
    //     filters
    //       .map(
    //         (item) =>
    //           item?.parameter +
    //           "=" +
    //           (typeof item?.output === "string"
    //             ? item?.output === "?????????????? ??????????"
    //               ? "1"
    //               : encodeURIComponent(item?.output)
    //             : encodeURIComponent(item?.output?.value))
    //       )
    //       .join("&")
    // );
    const parsedParameters = filters
      .map((item) => {
        console.log(
          item?.output
            .replace(/????: | ??????:/gi, "")
            .split("-")
            .reverse()
            .join("-")
        );
        return (
          item?.parameter +
          "=" +
          (typeof item?.output === "string"
            ? item?.output === "?????????????? ??????????"
              ? "1"
              : encodeURIComponent(
                  item?.output
                    .replace(/????: | ??????:/gi, "")
                    .split("-")
                    .reverse()
                    .join("-")
                )
            : encodeURIComponent(item?.output?.value))
        );
      })
      .join("&");
    dispatch({ type: "parameters/set", payload: parsedParameters });
  }, [filters]);

  // useEffect(() => {
  //   getUsingFilters().then((res) => {
  //     dispatch({ type: syncName + "/set", payload: res.results });
  //   });
  // }, [parameters]);

  return (
    <Paper sx={{ overflowX: "auto", marginBlock: 5 }} elevation={2}>
      <Paper variant="outlined">
        <Stack
          direction="row"
          sx={{ p: 2, maxWidth: "100%", flexWrap: "wrap", rowGap: 2 }}
          spacing={2}
        >
          <Paper variant="outlined">
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ paddingInline: 2, height: "100%" }}
              spacing={2}
            >
              <Typography variant="body2">?????? ??????????????</Typography>
              <TextField
                variant="standard"
                select
                sx={{
                  width: 70,
                  borderRadius: "100vmax",
                  "& .MuiInputBase-root, & .MuiSelect-standard": {
                    borderRadius: "100vmax",
                  },
                  "& .MuiSelect-standard": {
                    paddingBlock: "0",
                  },
                }}
                defaultValue={amountMapping[0]}
                SelectProps={{
                  IconComponent: KeyboardArrowDownIcon,
                }}
              >
                {amountMapping.map((item, index) => (
                  <MenuItem value={item} key={item + " " + index}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Paper>
          {filters.map((filter, index) => (
            <CustomChip
              info={{ type: filter?.type, data: filter?.output }}
              key={filter.type + " " + index}
              onDelete={() => handleRemoveFilter(index)}
              onEdit={(output) => handleEditFilter(output, index)}
            />
          ))}
          <AddFilter onFilter={handleAddNewFilter} filters={filters} />
        </Stack>
        <Divider orientation="horizontal" />
        <Box sx={{ overflowX: "auto" }}>
          <Stack
            direction="column"
            sx={{
              width: "max-content",
              minWidth: "100%",
              position: "relative",
            }}
          >
            {/* Grid Header */}

            {/* filter items were here */}
            {/* Grid Content */}
            <Box
              sx={{
                maxHeight: 600,
                height: 600,
                minHeight: 600,
                overflowY: isPending ? "hidden" : "auto",
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
                  <TableHead
                    sx={{
                      position: "sticky",
                      top: 0,
                      zIndex: 500,
                      bgcolor: "white",
                    }}
                  >
                    <TableRow>
                      {columns?.map((column, index) => (
                        <TableCell key={index}>
                          {column.headerName ? column.headerName : column.field}
                        </TableCell>
                      ))}
                      {(onDelete ||
                        onArchive ||
                        onChangePassword ||
                        onBlock ||
                        onEdit) && <TableCell>??????????????</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ height: "max-content" }}>
                    {rowsCopy &&
                      rowsCopy
                        // .slice(sliceStart, sliceEnd)
                        ?.map((row, rowIndex) => {
                          return (
                            <TableRow
                              sx={{
                                bgcolor:
                                  rowIndex % 2 == 0
                                    ? "#f5f5f5"
                                    : "#fff"
                                    ? "pointer"
                                    : "default",
                              }}
                              key={rowIndex}
                            >
                              {columns &&
                                columns?.map((column, columnIndex) => {
                                  if (column.customeContent) {
                                    return (
                                      <TableCell key={columnIndex}>
                                        {column.customeContent({
                                          ...row,
                                          columnIndex: columnIndex,
                                          rowIndex: rowIndex,
                                        })}
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
                                    {onView && (
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
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          onView(event, row);
                                        }}
                                      >
                                        <RemoveRedEyeIcon />
                                      </IconButton>
                                    )}
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
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          onChangePassword(event, row);
                                        }}
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
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          onEdit(event, row);
                                        }}
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
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          onDelete(event, row);
                                        }}
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
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          onBlock(event, row);
                                        }}
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
              {isPending && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100%",
                    bgcolor: "#fff",
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
            max={max}
            current={current}
            // page={currentPage}
            // setPage={setCurrentPage}
            onNext={onNext}
            onPrev={onPrev}
            onInput={onInput}
          />
        </Stack>
      </Paper>
    </Paper>
  );
};

export default DataGrid;

// {nameWithSearch ? (
//   <Stack
//     direction="row"
//     alignItems="center"
//     divider={
//       <Divider orientation="vertical" variant="middle" flexItem />
//     }
//     sx={{ width: "100%", height: 70 }}
//   >
//     <FilterItem
//       name="??????????"
//       property="name"
//       array={rows}
//       setter={setRowsCopy}
//     />
//     <Stack
//       direction="row-reverse"
//       alignItems="center"
//       sx={{
//         width: "100%",
//         boxSizing: "border-box",
//         paddingInline: 10,
//       }}
//     >
//       <TextField
//         variant="standard"
//         placeholder="??????"
//         sx={{
//           width: 400,
//           "& .MuiInput-root": {
//             borderRadius: "100vmax",
//             border: "none",
//             bgcolor: "#f5f5f5",
//             padding: 0.5,
//             boxSizing: "border-box",
//           },
//         }}
//         onChange={handleSearchName}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton>
//                 <SearchIcon />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//     </Stack>
//   </Stack>
// ) : (
//   <Stack
//     direction="row"
//     alignItems="center"
//     divider={
//       <Divider orientation="vertical" variant="middle" flexItem />
//     }
//     sx={{ width: "100%", height: 70 }}
//   >
//     <FilterItem
//       name="??????????"
//       property="name"
//       array={rows}
//       actualArray={rowsCopy}
//       setter={setRowsCopy}
//     />
//     <FilterItem name="?????? ??????????" properties={code} disableSorting />
//     {/* <FilterItem
//       name="??????????????"
//       properties={areaMenu}
//       disableSorting
//     /> */}
//     <FilterItem
//       name="??????????????"
//       properties={projects?.map((project) => ({
//         text: project.name,
//       }))}
//       disableSorting
//       array={rows}
//       setter={setRowsCopy}
//       actualArray={rowsCopy}
//     />
//     <FilterItem
//       name="??????????????????"
//       properties={balance}
//       disableSorting
//       array={rows}
//       actualArray={rowsCopy}
//       setter={setRowsCopy}
//     />
//   </Stack>
// )}

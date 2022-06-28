import { Box, Button, Divider, IconButton, Paper, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";

const FilterColumn = ({ name }) => {
  const [hovered, setHovered] = useState(false);
  const [sort, setSort] = useState(null);

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

  return (
    <Stack
      direction="row"
      sx={{
        paddingInline: 5,
        cursor: "pointer",
        flex: 1,
      }}
      onClick={handleSetSort}
      onMouseEnter={() => {
        setHovered(true);
        console.log(hovered);
      }}
      onMouseLeave={() => {
        setHovered(false);
        console.log(hovered);
      }}
    >
      <Box sx={{ maxWidth: "max-content", flexShrink: 1 }}>{name}**</Box>
      <Box sx={{ width: hovered || sort ? "50px" : 0, overflow: "hidden" }}>
        <IconButton>
          {!sort && <ArrowUpwardIcon opacity={0.4} />}
          {sort === "top-to-bottom" && <ArrowUpwardIcon />}
          {sort === "bottom-to-top" && <ArrowDownwardIcon />}
        </IconButton>
      </Box>
    </Stack>
  );
};

const DataGrid = () => {
  return (
    <Paper elevation={3}>
      <Stack
        direction="row"
        alignItems="center"
        divider={<Divider orientation="vertical" variant="middle" flexItem />}
        sx={{ width: "100%", height: 70 }}
      >
        <FilterColumn name="تجربة" />
        <Box
          sx={{ paddingInline: 5, cursor: "pointer", flex: 1 }}
          onClick={(e) => console.log(e.target.innerText)}
        >
          الأسم**
        </Box>
        <Box
          sx={{ paddingInline: 5, cursor: "pointer", flex: 1 }}
          onClick={(e) => console.log(e.target.innerText)}
        >
          كود البلد**
        </Box>
        <Box
          sx={{ paddingInline: 5, cursor: "pointer", flex: 1 }}
          onClick={(e) => console.log(e.target.innerText)}
        >
          المنطقة**
        </Box>
        <Box
          sx={{ paddingInline: 5, cursor: "pointer", flex: 1 }}
          onClick={(e) => console.log(e.target.innerText)}
        >
          المشروع**
        </Box>
        <Box
          sx={{ paddingInline: 5, cursor: "pointer", flex: 1 }}
          onClick={(e) => console.log(e.target.innerText)}
        >
          الميزانية**
        </Box>
      </Stack>
      <Divider orientation="horizontal" />
      {/* <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        <Box
          sx={{ paddingInline: 5, cursor: "pointer", flex: 1 }}
          onClick={(e) => console.log(e.target.innerText)}
        >
          Item 1
        </Box>
        <Box
          sx={{ paddingInline: 5, cursor: "pointer", flex: 1 }}
          onClick={(e) => console.log(e.target.innerText)}
        >
          Item 2
        </Box>
        <Box
          sx={{ paddingInline: 5, cursor: "pointer", flex: 1 }}
          onClick={(e) => console.log(e.target.innerText)}
        >
          Item 3
        </Box>
      </Stack> */}
    </Paper>
  );
};

export default DataGrid;

import { Divider, Paper, Stack } from "@mui/material";

const DataGrid = () => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Paper>Item 1</Paper>
      <Paper>Item 2</Paper>
      <Paper>Item 3</Paper>
    </Stack>
  );
};

export default DataGrid;

import { IconButton, Stack } from "@mui/material";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import DataGrid from "../../../components/data-grid/DataGrid";
import DeleteIcon from "@mui/icons-material/Delete";

const dummyColumns = [
  {
    field: "name",
    headerName: "الأسم",
  },
  {
    field: "createdAt",
    headerName: "تاريخ الإنشاء",
  },
  {
    field: "remove",
    headerName: "إجرائات",
    customeContent: (params) => (
      <IconButton>
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const dummyRows = [
  {
    name: "قناة",
    createdAt: "حاجة",
  },
];

const DisplayChannels = () => {
  return (
    <Wrapper>
      <Parameter links={[{ text: "القنوات" }, { text: "عرض القنوات" }]} />
      <DataGrid
        rows={dummyRows}
        columns={dummyColumns}
        nameWithSearch
        maxRowsPerPage={10}
      />
    </Wrapper>
  );
};

export default DisplayChannels;

import { Avatar } from "@mui/material";
import DataGrid from "../../../components/data-grid/DataGrid";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";

const dummyColumns = [
  {
    field: "picture",
    headerName: " ",
    customeContent: (params) => {
      return (
        <Avatar
          src={params.picture}
          variant="rounded"
          sx={{ width: 90, height: 90 }}
        >
          U
        </Avatar>
      );
    },
  },
  {
    field: "area",
    headerName: "المساحة",
  },
  {
    field: "rooms",
    headerName: "عدد الغرف",
  },
  {
    field: "genre",
    headerName: "نوع التشطيب",
  },
  {
    field: "district",
    headerName: "المنطقة",
  },
  {
    field: "price",
    headerName: "نوع التشطيب",
  },
  {
    field: "floor",
    headerName: "نوع التشطيب",
  },
];

const dummyRows = [
  {
    picture:
      "https://i.pinimg.com/originals/66/d9/f5/66d9f5afdc5337d3f9eac362b970c426.jpg",
    area: "300م",
    rooms: "4",
    genre: "سوبر لوكس",
    district: "وادي دجلة",
    price: "10000000",
    floor: "4",
  },
  {
    picture:
      "https://i.pinimg.com/originals/66/d9/f5/66d9f5afdc5337d3f9eac362b970c426.jpg",
    area: "300م",
    rooms: "4",
    genre: "سوبر لوكس",
    district: "وادي دجلة",
    price: "10000000",
    floor: "4",
  },
  {
    picture:
      "https://i.pinimg.com/originals/66/d9/f5/66d9f5afdc5337d3f9eac362b970c426.jpg",
    area: "300م",
    rooms: "4",
    genre: "سوبر لوكس",
    district: "وادي دجلة",
    price: "10000000",
    floor: "4",
  },
  {
    picture:
      "https://i.pinimg.com/originals/66/d9/f5/66d9f5afdc5337d3f9eac362b970c426.jpg",
    area: "300م",
    rooms: "4",
    genre: "سوبر لوكس",
    district: "وادي دجلة",
    price: "10000000",
    floor: "4",
  },
];

const UnitsView = () => {
  return (
    <Wrapper>
      <Parameter links={[{ text: "الوحدات" }, { text: "عرض الوحدات" }]} />
      <DataGrid
        rows={dummyRows}
        current="1"
        max="1"
        columns={dummyColumns}
        onView={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </Wrapper>
  );
};

export default UnitsView;

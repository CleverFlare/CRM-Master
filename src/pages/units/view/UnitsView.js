import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../../components/data-grid/DataGrid";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import useGet from "../../../hooks/useGet";
import usePagination from "../../../hooks/usePagination";

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
  const units = useSelector((state) => state.units.value);
  const dispatch = useDispatch();
  const [current, limit, isPending, onNext, onPrev] = usePagination(
    "aqar/api/router/Unit/",
    {
      storeValuesToDispatch: "units",
    }
  );
  const [getRequest, getRequestError] = useGet("aqar/api/router/Unit/");
  useEffect(() => {
    getRequest().then((res) => {
      dispatch({ type: "units/set", payload: res });
    });
  }, []);
  const parseToProperData = (json) => {
    let parentArray = [];
    json?.map((item, index) => {
      const unit = {
        picture: item.images[0],
        area: item.area_size,
        rooms: item.room_number,
        genre: item.complete_type,
        district: item.area,
        price: item.price,
        floor: item.unit_number,
      };
      parentArray.push(unit);
    });
    return parentArray;
  };
  return (
    <Wrapper>
      <Parameter links={[{ text: "الوحدات" }, { text: "عرض الوحدات" }]} />
      <DataGrid
        rows={Boolean(units.length) && parseToProperData(units)}
        current={current}
        max={limit}
        isPending={isPending}
        onNext={onNext}
        onPrev={onPrev}
        columns={dummyColumns}
        onView={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </Wrapper>
  );
};

export default UnitsView;

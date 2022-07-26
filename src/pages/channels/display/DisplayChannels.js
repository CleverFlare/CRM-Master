import { Avatar, IconButton, Stack } from "@mui/material";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import DataGrid from "../../../components/data-grid/DataGrid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import useGet from "../../../hooks/useGet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePost from "../../../hooks/usePost";
import useDelete from "../../../hooks/useDelete";
import useFormatTimeAndDate from "../../../hooks/useFormatTimeAndDate";
import usePagination from "../../../hooks/usePagination";

const dummyColumns = [
  {
    field: "picture",
    headerName: "الصورة",
    customeContent: (params) => (
      <Avatar src={params.picture} variant="rounded">
        {params.name[0].toUpperCase()}
      </Avatar>
    ),
  },
  {
    field: "name",
    headerName: "الأسم",
  },
  {
    field: "createdAt",
    headerName: "تاريخ الإنشاء",
  },
];

const dummyRows = [
  {
    name: "قناة",
    createdAt: "حاجة",
    id: 1,
  },
];

const DisplayChannels = () => {
  const [current, limit, isPending, onNext, onPrev] = usePagination(
    "aqar/api/router/Channel/",
    { storeValuesToDispatch: "channels" }
  );
  const permissions = useSelector((state) => state.permissions.value);
  const format = useFormatTimeAndDate();
  const parseToProperData = (json) => {
    if (!Boolean(json?.length)) return;
    let parentArray = [];
    json?.map((item) => {
      const customer = {
        name: item.name,
        createdAt: format(item.created_at),
        id: item.id,
        picture: item.logo,
      };
      parentArray.push(customer);
    });
    return parentArray;
  };
  const channels = useSelector((state) => state.channels.value);
  // const [rowsData, setRowsData] = useState(
  //   Boolean(channels?.length) ? parseToProperData(channels) : []
  // );

  const [deleteRequest, successAlert, errorAlert] = useDelete(
    "aqar/api/router/Channel/",
    "تم محو القناة بنجاح"
  );

  const dispatch = useDispatch();
  const [channelsGetRequest, channelsGetRequestError] = useGet(
    "aqar/api/router/Channel/"
  );

  useEffect(() => {
    // if (Boolean(channels?.length)) return;
    channelsGetRequest().then((res) => {
      console.log("breh");
      const parsedData = parseToProperData(res);
      dispatch({
        type: "channels/set",
        payload: res?.results,
      });
      // setRowsData(parseToProperData(res));
    });
  }, []);

  const handleDelete = (e, rowData) => {
    deleteRequest("channels", rowData.id);
    // .then(() => {
    // setRowsData(parseToProperData(channels));
    // });
  };
  return (
    <Wrapper>
      <Parameter links={[{ text: "القنوات" }, { text: "عرض القنوات" }]} />
      <DataGrid
        current={current}
        max={limit}
        onNext={onNext}
        onPrev={onPrev}
        isPending={isPending}
        rows={Boolean(channels?.length) ? parseToProperData(channels) : null}
        columns={dummyColumns}
        nameWithSearch
        maxRowsPerPage={8}
        onDelete={
          permissions?.includes("delete_aqarchannel") ? handleDelete : null
        }
      />
      {successAlert}
      {errorAlert}
    </Wrapper>
  );
};

export default DisplayChannels;

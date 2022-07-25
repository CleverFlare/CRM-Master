import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import DataGrid from "../../../components/data-grid/DataGrid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDelete from "../../../hooks/useDelete";
import useFormatTimeAndDate from "../../../hooks/useFormatTimeAndDate";

const dummyColumns = [
  {
    field: "name",
    headerName: "اسم الحالة",
  },
  {
    field: "createdAt",
    headerName: "تاريخ الإنشاء",
  },
];

const dummyRows = [
  {
    id: 1,
    name: "not determined",
    createdAt: "2022-07-18T13:12:14Z",
    organization: 1,
  },
];

const Statuses = () => {
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);
  const status = useSelector((state) => state.status.value);
  const format = useFormatTimeAndDate();
  const [deleteRequest, deleteSuccessAlert, deleteErrorAlert] = useDelete(
    "aqar/api/router/Status/",
    "تم محو الحالة بنجاح!"
  );
  const dispatch = useDispatch();

  const handleDelete = (e, rowData) => {
    deleteRequest("status", rowData.id);
  };

  useEffect(() => {
    if (status.length) return;
    fetch(domain + "aqar/api/router/Status/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch data of that resource");

        return res.json();
      })
      .then((json) => {
        dispatch({
          type: "status/set",
          payload: json?.results,
        });
      });
  }, []);

  const parseToProperData = (data) => {
    let returnedArray = [];
    data.map((item) => {
      returnedArray.push({
        name: item.name,
        createdAt: format(item.created_at),
      });
    });
    return returnedArray;
  };

  return (
    <Wrapper>
      <Parameter links={[{ text: "العملاء" }, { text: "حالات العميل" }]} />
      <DataGrid
        rows={Boolean(status.length) ? parseToProperData(status) : null}
        columns={dummyColumns}
        nameWithSearch
        maxRowsPerPage={8}
        onDelete={handleDelete}
      />
      {deleteSuccessAlert}
      {deleteErrorAlert}
    </Wrapper>
  );
};

export default Statuses;

import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import DataGrid from "../../../components/data-grid/DataGrid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const dummyColumns = [
  {
    field: "name",
    headerName: "اسم الوظيفة",
  },
  {
    field: "created_at",
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
  const [statusData, setStatusData] = useState(status ? status : null);
  const dispatch = useDispatch();

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
        setStatusData(json);
        dispatch({
          type: "status/set",
          payload: json,
        });
      });
  }, []);
  return (
    <Wrapper>
      <Parameter links={[{ text: "العملاء" }, { text: "حالات العميل" }]} />
      <DataGrid
        rows={statusData}
        columns={dummyColumns}
        nameWithSearch
        maxRowsPerPage={10}
      />
    </Wrapper>
  );
};

export default Statuses;

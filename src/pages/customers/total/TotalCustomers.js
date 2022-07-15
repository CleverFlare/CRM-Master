import Parameter from "../../../components/parameter/Parameter";
import DataGrid from "../../../components/data-grid/DataGrid";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const dummyColumns = [
  {
    field: "name",
    headerName: "الاسم",
  },
  {
    field: "phone",
    headerName: "الهاتف",
  },
  {
    field: "project",
    headerName: "المشروع",
  },
  {
    field: "comment",
    headerName: "تعليق",
  },
  {
    field: "saler",
    headerName: "مسؤول المبيعات",
  },
  {
    field: "channel",
    headerName: "القناة",
  },
];

const TotalCustomers = () => {
  const domain = useSelector((state) => state.domain.value);
  const token = useSelector((state) => state.token.value);
  const allCustomers = useSelector((state) => state.allCustomers.value);
  const dispatch = useDispatch();

  const [rows, setRows] = useState(allCustomers.length ? allCustomers : null);

  const parseToProperData = (json) => {
    let parentArray = [];
    json.map((item, index) => {
      console.log(item.bussiness.join(", "));
      const customer = {
        name: item.user.first_name + " " + item.user.last_name,
        phone: item.user.phone,
        project:
          item.bussiness.length >= 0 ? item.bussiness.join(", ") : "لا يوجد",
        comment: "لايوجد",
        saler: item.agent,
        channel: item.channel,
      };
      parentArray.push(customer);
    });
    return parentArray;
  };

  useEffect(() => {
    if (allCustomers.length) return;
    fetch(domain + "aqar/api/router/Client/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const parsedData = parseToProperData(json);
        setRows(parsedData);
        dispatch({
          type: "allCustomers/set",
          payload: parsedData,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div style={{ height: 697 }}>
      <Wrapper sx={{ height: "100%" }}>
        <Parameter
          links={[
            {
              text: "العملاء",
              path: "#",
            },
            {
              text: "جميع العملاء",
              path: "/customers/total",
            },
          ]}
        />
        <DataGrid rows={rows} columns={dummyColumns} maxRowsPerPage={10} />
      </Wrapper>
    </div>
  );
};

export default TotalCustomers;

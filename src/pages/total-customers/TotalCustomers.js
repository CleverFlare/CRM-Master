import Parameter from "../../components/parameter/Parameter";
import DataGrid from "../../components/data-grid/DataGrid";
import Wrapper from "../../components/wrapper/Wrapper";
import { useEffect, useState } from "react";

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
  const [rows, setRows] = useState(null);
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
    fetch("http://137.184.58.193:8000/aqar/api/router/Client/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token 4b0d32e62fab4bf53d1907ab69cf6b3a9583eca1",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setRows(parseToProperData(json));
        console.log(parseToProperData(json));
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

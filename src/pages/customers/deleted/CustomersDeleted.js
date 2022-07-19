// import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import Parameter from "../../../components/parameter/Parameter";
import { Avatar, Box, Button, Checkbox, Paper, Stack } from "@mui/material";
import DataGrid from "../../../components/data-grid/DataGrid";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const dummyRows = [
  {
    name: "أ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
    id: 1,
  },
  {
    name: "ت",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 2,
  },
  {
    name: "ج",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 3,
  },
  {
    name: "ث",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 4,
  },
  {
    name: "ب",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
    id: 5,
  },
  {
    name: "د",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 6,
  },
  {
    name: "ح",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 7,
  },
  {
    name: "ز",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 8,
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 9,
  },
  {
    name: "ذ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 10,
  },
  {
    name: "ر",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 11,
  },
];

const CustomersDeleted = () => {
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);
  const deletedCustomers = useSelector((state) => state.deletedCustomers.value);
  const [rows, setRows] = useState(
    deletedCustomers.length ? deletedCustomers : null
  );
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    fetch(domain + "aqar/api/router/RestoreClient/", {
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
        console.log(json);
        dispatch({ type: "deletedCustomers/set", payload: [...json] });
        setRows([...json]);
      });
  }, []);

  const handleRestore = () => {
    const requestBody = {
      organization: 1,
      id: selected,
    };
    fetch(domain + "qar/api/router/RestoreClient/", {
      method: "DELETE",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't delete these customers");

        return res.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelected((old) => [...old, id]);
    } else {
      setSelected((old) => [...old.filter((item) => item !== id)]);
    }
  };

  useEffect(() => {
    if (!deletedCustomers.length) return;
    fetch(domain + "aqar/api/router/Client/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data for that resource");
        return res.json();
      })
      .then((json) => {
        console.log(json);
      });
  }, []);

  const dummyColumns = [
    {
      field: "check",
      headerName: " ",
      customeContent: (params) => {
        return (
          <Checkbox onChange={(e) => handleCheckboxChange(e, params.id)} />
        );
      },
    },
    {
      field: "name",
      headerName: "الأسم",
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
              text: "العملاء المحذوفة",
              path: "/customers/total",
            },
          ]}
        />
        <DataGrid rows={rows} columns={dummyColumns} maxRowsPerPage={10} />
        <Stack
          sx={{ width: "100%", marginTop: "20px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            sx={{ marginBlock: 2 }}
            onClick={handleRestore}
          >
            إسترجاع
          </Button>
        </Stack>
      </Wrapper>
    </div>
  );
};

export default CustomersDeleted;

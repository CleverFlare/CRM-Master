// import { DataGrid } from "@mui/x-data-grid";
import { Fragment } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import Parameter from "../../../components/parameter/Parameter";
import {
  Avatar,
  Box,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import DataGrid from "../../../components/data-grid/DataGrid";
import Wrapper from "../../../components/wrapper/Wrapper";

import { useState } from "react";
import useGet from "../../../hooks/useGet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const dummyColumns = [
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
    headerName: "موظف",
  },
  {
    field: "channel",
    headerName: "القناة",
  },
];

const dummyRows = [
  {
    name: "أ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "ت",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ج",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ث",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ب",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "د",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ح",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ز",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ذ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ر",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
];

const CustomersNew = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [getRequest, getRequestError] = useGet(
    "aqar/api/router/NewClient/?start=" +
      (Boolean(endPoint)
        ? endPoint.split("-").reverse().join("-")
        : startPoint.split("-").reverse().join("-")) +
      "&end=" +
      (Boolean(startPoint)
        ? startPoint.split("-").reverse().join("-")
        : endPoint.split("-").reverse().join("-")) +
      ""
  );
  const newClients = useSelector((state) => state.newClients.value);
  const dispatch = useDispatch();

  const handleSetValues = (type, value) => {
    const startPointAsNumber = parseInt(startPoint.split("-").join(""));
    const endPointAsNumber = parseInt(endPoint.split("-").join(""));
    const currentAsNumber = parseInt(value.split("-").join(""));
    switch (type) {
      case "start":
        if (startPointAsNumber > currentAsNumber)
          return setStartPoint(endPoint);
        return setStartPoint(value);
      case "end":
        if (endPointAsNumber < currentAsNumber) return setEndPoint(startPoint);
        return setEndPoint(value);
      default:
        throw Error("something went wrong");
    }
  };

  useEffect(() => {
    if (!Boolean(startPoint) || !Boolean(endPoint)) return;
    getRequest().then((res) => {
      dispatch({ type: "newClients/set", payload: res.results });
    });
  }, [startPoint, endPoint]);

  const parseToProperData = (json) => {
    let parentArray = [];
    json?.map((item, index) => {
      const customer = {
        name: item.user.first_name + " " + item.user.last_name,
        phone: item.user.phone,
        project: Boolean(item.bussiness.length)
          ? item.bussiness.join(", ")
          : "لا يوجد",
        comment: "لايوجد",
        saler: item.agent.name,
        channel: item.channel,
        id: item.id,
        allData: item,
      };
      parentArray.push(customer);
    });
    return parentArray;
  };

  return (
    <Wrapper sx={{ height: "100%" }}>
      <Parameter
        links={[
          {
            text: "العملاء",
            path: "#",
          },
          {
            text: "العملاء الجدد",
            path: "/customers/total",
          },
        ]}
      />
      <Stack
        direction="row"
        sx={{ width: "100%", height: 10 }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <FormControlLabel
          label="من"
          control={
            <TextField
              variant="standard"
              type="date"
              value={endPoint}
              onChange={(e) => handleSetValues("end", e.target.value)}
              onInput={(e) => handleSetValues("end", e.target.value)}
              sx={{ marginInline: 1 }}
              pattern="\d{4}-\d{2}-\d{2}"
            />
          }
          sx={{ direction: "rtl" }}
        />
        <FormControlLabel
          label="إلى"
          control={
            <TextField
              variant="standard"
              type="date"
              value={startPoint}
              onChange={(e) => handleSetValues("start", e.target.value)}
              onInput={(e) => handleSetValues("start", e.target.value)}
              sx={{ marginInline: 1 }}
              // pattern="\d{2}-\d{2}-\d{4}"
            />
          }
          sx={{ direction: "rtl" }}
        />
      </Stack>
      <DataGrid
        rows={Boolean(newClients.length) ? parseToProperData(newClients) : null}
        columns={dummyColumns}
        maxRowsPerPage={10}
        onDelete={() => {}}
      />
    </Wrapper>
  );
};

export default CustomersNew;

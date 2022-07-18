import { IconButton, Paper, Stack } from "@mui/material";
import DataGrid from "../../../components/data-grid/DataGrid";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import KeyIcon from "@mui/icons-material/Key";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const dummyColumns = [
  {
    field: "name",
    headerName: "اسم الوظيفة",
  },
  {
    field: "createdAt",
    headerName: "تاريخ الإنشاء",
  },
  {
    field: "employees",
    headerName: "عدد الموظفين",
  },
  {
    field: "createdBy",
    headerName: "تمت الإضافة بواسطة",
  },
];

const dummyRows = [
  {
    name: "وظيفة",
    createdAt: "2/2/2022",
    employees: "4",
    createdBy: "محمد ماهر",
  },
];

const Jobs = () => {
  const [jobsData, setJobsData] = useState(null);
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);
  const jobs = useSelector((state) => state.jobs.value);
  const dispatch = useDispatch();

  const convertIntoProperObject = (json) => {
    const arrayOfData = [];
    json.map((item, index) => {
      arrayOfData.push({
        name: item.title,
        createdAt: item.created_at,
      });
    });
    return arrayOfData;
  };

  useEffect(() => {
    if (jobs.length) return;
    fetch(domain + "aqar/api/router/Job/", {
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
        setJobsData(convertIntoProperObject(json));
        dispatch({ type: "jobs/set", payload: convertIntoProperObject(json) });
      });
  }, []);
  return (
    <>
      <Wrapper>
        <Parameter links={[{ text: "الموظفين" }, { text: "الوظائف" }]} />
        <DataGrid
          rows={jobsData}
          columns={dummyColumns}
          nameWithSearch
          maxRowsPerPage={5}
        />
      </Wrapper>
    </>
  );
};

export default Jobs;

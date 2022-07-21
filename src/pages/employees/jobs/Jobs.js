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
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";

const dummyColumns = [
  {
    field: "title",
    headerName: "اسم الوظيفة",
  },
  {
    field: "createdAt",
    headerName: "تاريخ الإنشاء",
  },
];

const dummyRows = [
  {
    name: "وظيفة",
    created_at: "2/2/2022",
  },
];

const Jobs = () => {
  const permissions = useSelector((state) => state.permissions.value);
  const jobs = useSelector((state) => state.jobs.value);
  const [jobsGetRequest, jobsGetRequestError] = useGet("aqar/api/router/Job/");
  const [deleteRequest, successAlert, errorAlert] = useDelete(
    "aqar/api/router/Job/",
    "تم حذف الوظيفة بنجاح"
  );
  const dispatch = useDispatch();

  const convertIntoProperObject = (json) => {
    const arrayOfData = [];
    json.map((item, index) => {
      arrayOfData.push({
        title: item.title,
        createdAt: item.created_at,
        id: item.id,
      });
    });
    return arrayOfData;
  };

  useEffect(() => {
    if (Boolean(jobs.length)) return;
    jobsGetRequest().then((res) => {
      dispatch({ type: "jobs/set", payload: res });
    });
  }, []);

  const handleDelete = (e, rowData) => {
    deleteRequest("jobs", rowData.id);
  };

  return (
    <>
      <Wrapper>
        <Parameter links={[{ text: "الموظفين" }, { text: "الوظائف" }]} />
        <DataGrid
          rows={Boolean(jobs.length) ? convertIntoProperObject(jobs) : []}
          columns={dummyColumns}
          nameWithSearch
          maxRowsPerPage={8}
          onDelete={
            permissions.includes("delete_aqarjob") ? handleDelete : null
          }
        />
        {successAlert}
        {errorAlert}
      </Wrapper>
    </>
  );
};

export default Jobs;

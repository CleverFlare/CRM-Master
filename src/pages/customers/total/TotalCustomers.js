import Parameter from "../../../components/parameter/Parameter";
import DataGrid from "../../../components/data-grid/DataGrid";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";
import CustomerDetails from "../../../components/customer-details/CustomerDetails";
import { Button, Checkbox, Stack } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";

const TotalCustomers = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [initials, setInitials] = useState({});
  const permissions = useSelector((state) => state.permissions.value);
  const [exportArray, setExportArray] = useState({});
  const [customersGetRequest, customersGetRequestError] = useGet(
    "aqar/api/router/Client/"
  );
  const [exportComp, setExportComp] = useState(null);
  const allCustomers = useSelector((state) => state.allCustomers.value);
  const dispatch = useDispatch();

  const dummyColumns = [
    {
      field: "check",
      headerName: "تحديد للإستيراد",
      customeContent: (params) => (
        <Checkbox
          onClick={(e) => {
            e.stopPropagation();
            switch (e.target.checked) {
              case true:
                setExportArray((old) => {
                  // const assignment = old;
                  old[`${params.rowIndex}`] = {
                    //prettier-ignore
                    "الأسم": params.name,
                    //prettier-ignore
                    "الهاتف": params.phone,
                    //prettier-ignore
                    "المشروع": params.project,
                    //prettier-ignore
                    "تعليق": params.comment,
                    //prettier-ignore
                    "مسؤول المبيعات": params.saler,
                    //prettier-ignore
                    "القناة": params.channel,
                  };
                  return { ...old };
                });
                break;
              case false:
                setExportArray((old) => {
                  old[`${params.rowIndex}`] = null;
                  delete old[`${params.rowIndex}`];
                  return { ...old };
                });
                break;
            }
          }}
        />
      ),
    },
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

  const parseToProperData = (json) => {
    let parentArray = [];
    json.map((item, index) => {
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

  const [deleteRequest, successAlert, errorAlert] = useDelete(
    "aqar/api/router/Client/",
    "تم نقل العميل إلى العملاء المحذوفة"
  );

  useEffect(() => {
    if (Boolean(allCustomers?.length)) return;
    customersGetRequest().then((res) => {
      dispatch({
        type: "allCustomers/set",
        payload: res,
      });
    });
  }, []);

  console.log(allCustomers);

  const handleDelete = (e, rowData) => {
    deleteRequest("allCustomers", rowData.id);
  };

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

        <DataGrid
          rows={
            Boolean(allCustomers?.length) ? parseToProperData(allCustomers) : []
          }
          onClick={(e, rowData) => {
            setInitials(rowData);
            setOpenDetails(true);
            console.log(rowData);
          }}
          columns={dummyColumns}
          maxRowsPerPage={8}
          onDelete={
            permissions.includes("delete_aqarclient") ? handleDelete : null
          }
        />
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ paddingBottom: "20px" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              if (!Boolean(Object.keys(exportArray).length)) return;
              setExportComp(
                <CSVDownload
                  data={Object.keys(exportArray).map((key) => exportArray[key])}
                  target="_parent"
                  filename={"my-file.csv"}
                />
              );
              setTimeout(() => {
                setExportComp(null);
              }, 0);
            }}
          >
            إستخراج
          </Button>

          {exportComp}
        </Stack>
        {successAlert}
        {errorAlert}
        {permissions.includes("change_aqarclient") && (
          <CustomerDetails
            isOpened={openDetails}
            onClose={() => setOpenDetails(false)}
            initials={initials}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default TotalCustomers;

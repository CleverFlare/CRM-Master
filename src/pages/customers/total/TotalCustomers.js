import Parameter from "../../../components/parameter/Parameter";
import DataGrid from "../../../components/data-grid/DataGrid";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";
import CustomerDetails from "../../../components/customer-details/CustomerDetails";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";
import usePagination from "../../../hooks/usePagination";

const TotalCustomers = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [initials, setInitials] = useState({});
  const permissions = useSelector((state) => state.permissions.value);
  const [exportObject, setExportObject] = useState({});
  const [selectAll, setSelectAll] = useState({
    selectedAll: false,
    exclude: [],
  });
  const [customersGetRequest] = useGet("aqar/api/router/Client/");

  const [data, setData] = useState([]);
  const [exportComp, setExportComp] = useState(null);
  const allCustomers = useSelector((state) => state.allCustomers.value);
  const [current, limit, isPending, onNext, onPrev] = usePagination(
    "aqar/api/router/Client/",
    {
      storeValuesToDispatch: "allCustomers",
    }
  );
  const dispatch = useDispatch();

  const dummyColumns = [
    {
      field: "check",
      headerName: (
        <>
          <Checkbox
            onChange={(e) => {
              if (Boolean(allCustomers.length)) {
                switch (e.target.checked) {
                  case true:
                    setSelectAll((old) => ({ ...old, selectedAll: true }));
                    break;
                  case false:
                    setSelectAll((old) => ({ ...old, selectedAll: false }));
                }
              }
            }}
          />
        </>
      ),
      customeContent: (params) => (
        <Checkbox
          checked={
            (selectAll.selectedAll &&
              !selectAll.exclude?.includes(params.id)) ||
            Boolean(Object.keys(exportObject)?.includes(`${params.id}`))
          }
          onChange={(e) => {
            e.stopPropagation();
            switch (e.target.checked) {
              case true:
                if (selectAll.selectedAll) {
                  if (selectAll.exclude.length === 1)
                    return setSelectAll((old) => ({ ...old, exclude: [] }));
                  const index = selectAll.exclude.indexOf(params.id);
                  console.log(index);
                  // const newArray = selectAll.exclude.splice(index, 1);
                  setSelectAll((old) => {
                    old.exclude.splice(index, 1);
                    return {
                      ...old,
                      exclude: [...old.exclude],
                    };
                  });
                } else {
                  setExportObject((old) => {
                    old[`${params.id}`] = {
                      //prettier-ignore
                      "الأسم": params.name,
                      //prettier-ignore
                      "الهاتف": params.phone,
                      //prettier-ignore
                      "المشروع": params.project,
                      //prettier-ignore
                      "تعليق": params.comment,
                      //prettier-ignore
                      "الموظف": params.saler,
                    };
                    return { ...old };
                  });
                }
                break;
              case false:
                if (selectAll.selectedAll) {
                  setSelectAll((old) => ({
                    ...old,
                    exclude: [...old.exclude, params.id],
                  }));
                } else {
                  setExportObject((old) => {
                    delete old[`${params.id}`];
                    return { ...old };
                  });
                }
                break;
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
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
      headerName: "الموظف",
    },
    // {
    //   field: "channel",
    //   headerName: "القناة",
    // },
  ];

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

  const [deleteRequest, successAlert, errorAlert] = useDelete(
    "aqar/api/router/Client/",
    "تم نقل العميل إلى العملاء المحذوفة"
  );

  useEffect(() => {
    customersGetRequest().then((res) => {
      dispatch({
        type: "allCustomers/set",
        payload: res.results,
      });
    });
  }, []);

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
            Boolean(allCustomers?.length)
              ? parseToProperData(allCustomers)
              : null
          }
          onView={(e, rowData) => {
            setInitials(rowData);
            setOpenDetails(true);
          }}
          current={current}
          max={limit}
          onNext={onNext}
          onPrev={onPrev}
          isPending={isPending}
          columns={dummyColumns}
          maxRowsPerPage={7}
          onDelete={
            permissions?.includes("delete_aqarclient") ? handleDelete : null
          }
          filterURL="aqar/api/router/Client/"
          syncName="allCustomers"
        />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingBottom: "20px" }}
          spacing={2}
        >
          <Button
            variant="contained"
            sx={{ width: "200px", height: "50px" }}
            color="error"
          >
            حذف المحدد
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (
                !Boolean(Object.keys(exportObject).length) ||
                selectAll.selectedAll
              )
                return;
              setExportComp(
                <CSVDownload
                  data={Object.keys(exportObject)?.map(
                    (key) => exportObject[key]
                  )}
                  target="_parent"
                  filename={"my-file.csv"}
                />
              );
              setTimeout(() => {
                setExportComp(null);
              }, 0);
            }}
            sx={{ width: "200px", height: "50px" }}
          >
            إستيراد المحدد
          </Button>
        </Stack>
        {exportComp}
        {successAlert}
        {errorAlert}
        {permissions?.includes("change_aqarclient") && (
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

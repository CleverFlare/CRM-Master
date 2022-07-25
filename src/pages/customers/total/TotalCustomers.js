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
  const [customersGetRequest, customersGetRequestError] = useGet(
    "aqar/api/router/Client/"
  );

  const [data, setData] = useState([]);
  const [exportComp, setExportComp] = useState(null);
  const allCustomers = useSelector((state) => state.allCustomers.value);
  const [current, limit, onNext, onPrev] = usePagination(
    "aqar/api/router/Client/",
    {
      storeValuesToDispatch: "allCustomers",
    },
    setData
  );
  console.log(current);
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
                    parseToProperData(allCustomers)?.map((item, index) => {
                      setExportObject((old) => {
                        old[`${index}`] = {
                          //prettier-ignore
                          "الأسم": item.name,
                          //prettier-ignore
                          "الهاتف": item.phone,
                          //prettier-ignore
                          "المشروع": item.project,
                          //prettier-ignore
                          "تعليق": item.comment,
                          //prettier-ignore
                          "موظف": item.saler,
                          //prettier-ignore
                          "القناة": item.channel,
                        };
                        return { ...old };
                      });
                    });
                    break;
                  case false:
                    setExportObject({});
                }
              }
            }}
          />
        </>
      ),
      customeContent: (params) => (
        <Checkbox
          checked={Boolean(
            Object?.keys(exportObject)?.includes(`${params.rowIndex}`)
          )}
          onChange={(e) => {
            e.stopPropagation();
            switch (e.target.checked) {
              case true:
                setExportObject((old) => {
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
                    "موظف": params.saler,
                    //prettier-ignore
                    "القناة": params.channel,
                  };
                  return { ...old };
                });
                break;
              case false:
                setExportObject((old) => {
                  old[`${params.rowIndex}`] = null;
                  delete old[`${params.rowIndex}`];
                  return { ...old };
                });
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
      // dispatch({
      //   type: "allCustomers/set",
      //   payload: res.results,
      // });
      setData([...res.results]);
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
          rows={Boolean(data?.length) ? parseToProperData(data) : null}
          onView={(e, rowData) => {
            setInitials(rowData);
            setOpenDetails(true);
            console.log(rowData);
          }}
          current={current}
          max={limit}
          onNext={onNext}
          onPrev={onPrev}
          columns={dummyColumns}
          maxRowsPerPage={7}
          onDelete={
            permissions?.includes("delete_aqarclient") ? handleDelete : null
          }
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
              if (!Boolean(Object.keys(exportObject).length)) return;
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

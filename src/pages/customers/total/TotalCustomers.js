import Parameter from "../../../components/parameter/Parameter";
import DataGrid from "../../../components/data-grid/DataGrid";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";
import CustomerDetails from "../../../components/customer-details/CustomerDetails";

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
  const [openDetails, setOpenDetails] = useState(false);
  const [initials, setInitials] = useState({});
  const permissions = useSelector((state) => state.permissions.value);
  const [customersGetRequest, customersGetRequestError] = useGet(
    "aqar/api/router/Client/"
  );
  const allCustomers = useSelector((state) => state.allCustomers.value);
  const dispatch = useDispatch();

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
        saler: item.agent,
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
    if (Boolean(allCustomers.length)) return;
    customersGetRequest().then((res) => {
      dispatch({
        type: "allCustomers/set",
        payload: res,
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
            Boolean(allCustomers.length) ? parseToProperData(allCustomers) : []
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
        {successAlert}
        {errorAlert}
        <CustomerDetails
          isOpened={openDetails}
          onClose={() => setOpenDetails(false)}
          initials={initials}
        />
      </Wrapper>
    </div>
  );
};

export default TotalCustomers;

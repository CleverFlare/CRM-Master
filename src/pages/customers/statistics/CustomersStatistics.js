import { Grid, Stack } from "@mui/material";
import DataTable from "../../../components/data-table/DataTable";
import Parameter from "../../../components/parameter/Parameter";
import StatisticalCard from "../../../components/statistical-card/StatisticalCard";
import Wrapper from "../../../components/wrapper/Wrapper";

const followedDummyColumns = [
  {
    field: "code",
    headerName: "كود الموظف",
  },
];

const followedDummyRows = [
  {
    code: "54335",
  },
  {
    code: "54335",
  },
  {
    code: "54335",
  },
  {
    code: "54335",
  },
  {
    code: "54335",
  },
  {
    code: "54335",
  },
];

const statusDummyColumn = [
  {
    field: "name",
    headerName: "الأسم",
  },
  {
    field: "number",
    headerName: "رقم الهاتف",
  },
  {
    field: "date",
    headerName: "التاريخ",
  },
  {
    field: "comment",
    headerName: "تعليق",
  },
];

const statusDummyRows = [
  {
    name: "محمد احمد",
    number: "01014464684",
    date: "23/10/2022",
    comment: "مغلق",
  },
  {
    name: "محمد احمد",
    number: "01014464684",
    date: "23/10/2022",
    comment: "لم يتم الرد",
  },
  {
    name: "محمد احمد",
    number: "01014464684",
    date: "23/10/2022",
    comment: "تواصل واتساب",
  },
  {
    name: "محمد احمد",
    number: "01014464684",
    date: "23/10/2022",
    comment: "لم يتم الرد",
  },
  {
    name: "محمد احمد",
    number: "01014464684",
    date: "23/10/2022",
    comment: "مغلق",
  },
  {
    name: "محمد احمد",
    number: "01014464684",
    date: "23/10/2022",
    comment: "لم يتم الرد",
  },
  {
    name: "محمد احمد",
    number: "01014464684",
    date: "23/10/2022",
    comment: "تواصل واتساب",
  },
  {
    name: "محمد احمد",
    number: "01014464684",
    date: "23/10/2022",
    comment: "لم يتم الرد",
  },
];

const bestDummyColumn = [
  {
    field: "name",
    headerName: "الأسم",
  },
  {
    field: "amount",
    headerName: "عدد العملاء",
  },
];

const bestDummyRows = [
  {
    name: "محمد احمد",
    amount: "450",
  },
  {
    name: "محمد احمد",
    amount: "440",
  },
  {
    name: "محمد احمد",
    amount: "430",
  },
  {
    name: "محمد احمد",
    amount: "420",
  },
  {
    name: "محمد احمد",
    amount: "410",
  },
  {
    name: "محمد احمد",
    amount: "400",
  },
  {
    name: "محمد احمد",
    amount: "350",
  },
  {
    name: "محمد احمد",
    amount: "250",
  },
];

const CustomersStatistics = () => {
  return (
    <Wrapper>
      <Parameter links={[{ text: "عملاء" }, { text: "احصائيات العملاء" }]} />
      <Stack spacing={5}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item lg={3}>
            <StatisticalCard
              title="جميع العملاء"
              since="منذ يوم"
              number="19097"
              percentage={100}
              profit={100}
            />
          </Grid>
          <Grid item lg={3}>
            <StatisticalCard
              title="العملاء المؤجله"
              since="منذ شهر"
              number="9856"
              profit={4.1}
              bars={[5, 4, 2, 4, 2, 3, 5, 1, 3]}
            />
          </Grid>
          <Grid item lg={3}>
            <StatisticalCard
              title="العملاء الجدد"
              since="اكتساب"
              number="75.2%"
              percentage={50}
              loss={2.4}
            />
          </Grid>
          <Grid item lg={3}>
            <StatisticalCard
              title="الموظفين الجدد"
              since="منذ اسبوع"
              number="2125"
              profit={22.4}
              bars={[5, 4, 2, 4, 2, 3, 5, 1, 3]}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ width: "100%" }}
          wrap="wrap"
        >
          <Grid item lg={3} xs={12}>
            <DataTable
              title="الموظف المتابع"
              columns={followedDummyColumns}
              rows={followedDummyRows}
              width="100%"
              minWidth="100px"
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <DataTable
              title="حالة العميل"
              columns={statusDummyColumn}
              rows={statusDummyRows}
              width="100%"
              minWidth="100px"
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <DataTable
              title="افضل موظف"
              columns={bestDummyColumn}
              rows={bestDummyRows}
              width="100%"
              minWidth="100px"
            />
          </Grid>
        </Grid>
      </Stack>
    </Wrapper>
  );
};

export default CustomersStatistics;

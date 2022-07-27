import BudgetFilter from "../components/add-filter/components/budget-filter/BudgetFilter";
import DialCode from "../components/add-filter/components/dial-code/DialCode";
import NameFilter from "../components/add-filter/components/name-filter/NameFilter";
import PeriodFilter from "../components/add-filter/components/period-filter/PeriodFilter";
import StatusFilter from "../components/add-filter/components/status-filter/StatusFilter";

const filtersMapping = [
  {
    name: "الأسم",
    type: "اسم",
    component: <NameFilter />,
  },
  {
    name: "كود البلد",
    type: "كود بلد",
    component: <DialCode />,
  },
  {
    name: "المشروع",
    type: "مشروع",
  },
  {
    name: "الحالة/العملاء الجدد",
    type: "حالة",
    component: <StatusFilter />,
    disableCondition: (item) => item?.output === "العملاء الجدد",
  },
  {
    name: "الميزانية",
    type: "ميزانية",
    component: <BudgetFilter />,
    disableCondition: (item) =>
      item?.output?.eval === "اكبر" || item?.output?.eval === "اصغر",
  },
  {
    name: "فترة زمنية",
    type: "فترة",
    component: <PeriodFilter />,
  },
];

export default filtersMapping;

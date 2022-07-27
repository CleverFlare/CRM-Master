import BudgetFilter from "../components/add-filter/components/budget-filter/BudgetFilter";
import DialCode from "../components/add-filter/components/dial-code/DialCode";
import NameFilter from "../components/add-filter/components/name-filter/NameFilter";
import PeriodFilter from "../components/add-filter/components/period-filter/PeriodFilter";
import ProjectFilter from "../components/add-filter/components/project-ftiler/ProjectFilter";
import StatusFilter from "../components/add-filter/components/status-filter/StatusFilter";

const filtersMapping = [
  {
    name: "الأسم",
    type: "اسم",
    component: <NameFilter />,
    parameter: () => "name",
  },
  {
    name: "كود البلد",
    type: "كود بلد",
    component: <DialCode />,
    parameter: () => "phone",
  },
  {
    name: "المشروع",
    type: "مشروع",
    component: <ProjectFilter />,
    parameter: () => "bussiness",
  },
  {
    name: "الحالة/العملاء الجدد",
    type: "حالة",
    component: <StatusFilter />,
    disableCondition: (item) => item?.output === "العملاء الجدد",
    parameter: (item) => {
      switch (item) {
        case "العملاء الجدد":
          return "state";
        default:
          return "event";
      }
    },
  },
  {
    name: "الميزانية",
    type: "ميزانية",
    component: <BudgetFilter />,
    disableCondition: (item) =>
      item?.output?.eval === "اكبر" || item?.output?.eval === "اصغر",
    parameter: (item) => {
      switch (item.eval) {
        case "اكبر":
          return "max_budget_gte";
        case "اصغر":
          return "max_budget_lte";
        case "يساوي":
          return "max_budget";
      }
    },
  },
  {
    name: "فترة زمنية",
    type: "فترة",
    component: <PeriodFilter />,
    parameter: () => "created_at",
  },
];

export default filtersMapping;

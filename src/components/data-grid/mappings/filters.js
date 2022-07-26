import BudgetFilter from "../components/add-filter/components/budget-filter/BudgetFilter";
import NameFilter from "../components/add-filter/components/name-filter/NameFilter";

const filtersMapping = [
  {
    name: "الأسم",
    type: "name",
    component: <NameFilter />,
  },
  {
    name: "كود البلد",
    type: "dial",
  },
  {
    name: "المشروع",
    type: "project",
  },
  {
    name: "الحالة",
    type: "status",
  },
  {
    name: "الميزانية",
    type: "budget",
    component: <BudgetFilter />,
  },
];

export default filtersMapping;

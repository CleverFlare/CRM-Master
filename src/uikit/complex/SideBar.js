import "./css/sidebar.css";
import Avatar from "../simple/Avatar";
import Typography from "../simple/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon";
import PeopleIcon from "../../icons/PeoplIcon";
import ArrowIcon from "../../icons/ArrowIcon";
import { useEffect, useState } from "react";

const SideButtons = ({ svg, title, src, onClick }) => {
  return (
    <>
      {src && (
        <NavLink to={src} className="nav-link">
          <div className="nav-link__icon-wrapper">{svg && svg}</div>
          <div className="nav-link__title-wrapper">{title}</div>
        </NavLink>
      )}
      {!src && (
        <button onClick={onClick} className="nav-link">
          <div className="nav-link__icon-wrapper">{svg}</div>
          <div className="nav-link__title-wrapper">{title}</div>
        </button>
      )}
    </>
  );
};

const SideDropDown = ({ svg, title, children }) => {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const handleDropDown = () => {
    setDropDown((prevValue) => !prevValue);
    if (!dropDown) {
      navigate(children[0].props.src);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="drop-down-wrapper">
      <button className="nav-link" onClick={handleDropDown}>
        <div className="nav-link__icon-wrapper">{svg}</div>
        <div className="nav-link__title-wrapper">{title}</div>
        <div
          className="nav-link__arrow-wrapper"
          style={{ transform: dropDown ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ArrowIcon />
        </div>
      </button>
      {dropDown && (
        <div className="drop-down-wrapper__links-wrapper">{children}</div>
      )}
    </div>
  );
};

const SideBar = ({ name, role, picture }) => {
  return (
    <div className="side-bar-wrapper">
      <div className="side-bar">
        <div className="top-wrapper">
          <Avatar name={name} picture={picture} size="82px" />
          <Typography varient="regular">{name}</Typography>
          <Typography varient="smaller" weight="bold">
            {role}
          </Typography>
        </div>
        <div className="links-wrapper">
          <SideButtons svg={<HomeIcon />} title="الرئيسية" src="/" />
          <SideDropDown svg={<PeopleIcon />} title="العملاء">
            <SideButtons title="جميع العملاء" src="customers/all" />
            <SideButtons title="العملاء الجدد" src="customers/new" />
            <SideButtons title="عملائي" src="customers/my" />
            <SideButtons title="إضافة عميل جديد" src="customers/add" />
            <SideButtons title="إستيراد عملاء" src="customers/import" />
            <SideButtons title="العملاء المتأخرين" src="customers/late" />
            <SideButtons title="العملاء المحذوفة" src="customers/deleted" />
          </SideDropDown>
          <SideButtons
            svg={<PeopleIcon />}
            title="إضافة مشروع جديد"
            src="/add-project"
          />
          <SideButtons
            svg={<PeopleIcon />}
            title="تقارير فريق المبيعات"
            src="/sales"
          />
          <SideButtons svg={<PeopleIcon />} title="الموظفين" src="/employees" />
          <SideButtons svg={<PeopleIcon />} title="تسجيل الخروج" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

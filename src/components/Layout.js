import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import useGet from "../hooks/useGet";
import SideBar from "./sidebar/SideBar";
import TopBar from "./topbar/TopBar";
import { useSelector, useDispatch } from "react-redux";

const sidebarWidth = 240;

const Layout = ({ children }) => {
  const [userInfoGetRequest, userInfoGetRequestError] = useGet(
    "aqar/api/router/UserInfo/"
  );
  const id = useSelector((state) => state.id.value);
  const dispatch = useDispatch();
  const smallScreen = useMediaQuery("(max-width:712px)");
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleToggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  useEffect(() => {
    userInfoGetRequest("aqar/api/router/UserInfo/" + id).then((res) => {
      console.log(
        res.user_permissions.map((item) => {
          return item.codename;
        })
      );
      dispatch({
        type: "permissions/set",
        payload: res.user_permissions.map((item) => item.codename),
      });
      dispatch({
        type: "userInfo/set",
        payload: {
          name: res.first_name + " " + res.last_name,
          job: "مندوب مبيعات",
          picture: res.image,
        },
      });
    });
  }, []);
  return (
    <div
      className={smallScreen ? "layout-small-screen" : "layout-big-screen"}
      style={{
        gridTemplateColumns: smallScreen ? `1fr` : `${sidebarWidth}px 1fr`,
      }}
    >
      <TopBar mobile={smallScreen} onBurgerClick={handleToggleMenu} />
      <SideBar
        width={sidebarWidth}
        name="أحمد محمد"
        role="مندوب مبيعات"
        permanent={!smallScreen}
        open={mobileMenu}
        onClose={() => setMobileMenu(false)}
      />
      <div style={{ overflowY: "auto" }}>{children}</div>
    </div>
  );
};

export default Layout;

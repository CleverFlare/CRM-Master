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
    userInfoGetRequest().then((res) => {
      dispatch({
        type: "permissions/set",
        payload: res?.results?.[0]?.user_permissions?.map(
          (item) => item.codename
        ),
      });
      dispatch({
        type: "userInfo/set",
        payload: {
          name:
            res?.results?.[0]?.first_name + " " + res?.result?.[0]?.last_name,
          job: res?.results?.[0]?.job_title,
          picture: res?.results?.[0]?.image,
          username: res?.results?.[0]?.username,
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

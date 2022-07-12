import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import SideBar from "./sidebar/SideBar";
import TopBar from "./topbar/TopBar";

const sidebarWidth = 240;

const Layout = ({ children }) => {
  const smallScreen = useMediaQuery("(max-width:712px)");
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleToggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };
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

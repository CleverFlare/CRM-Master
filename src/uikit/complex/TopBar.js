import BellIcon from "../../icons/BellIcon";
import IconButton from "../simple/IconButton";
import SearchBar from "../simple/SearchBar";
import "./css/topbar.css";

const TopBar = () => {
  return (
    <div className="top-nav">
      <IconButton svg={<BellIcon />} size="40px" color="white" />
      <SearchBar />
    </div>
  );
};

export default TopBar;

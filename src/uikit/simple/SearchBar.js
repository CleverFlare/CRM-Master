import SearchIcon from "../../icons/SearchIcon";
import SearchStyles from "./css/searchbar.module.css";

const SearchBar = () => {
  return (
    <span className={SearchStyles["search-wrapper"]}>
      <div className={SearchStyles["input-wrapper"]}>
        <input type="text" placeholder="بحث" />
      </div>
      <div className={SearchStyles["icon-wrapper"]}>
        <SearchIcon />
      </div>
    </span>
  );
};

export default SearchBar;

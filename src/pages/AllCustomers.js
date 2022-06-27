import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";

const AllCustomers = () => {
  return (
    <div style={{ height: 400 }}>
      <Container sx={{ height: "100%" }}>
        <Parameter path="العملاء<<جميع العملاء" />
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            ColumnMenuIcon: MenuIcon,
          }}
        />
      </Container>
    </div>
  );
};

export default AllCustomers;

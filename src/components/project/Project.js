import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const Project = ({ picture, title, address }) => {
  return (
    <Card sx={{ maxWidth: 800, height: 110, display: "flex" }}>
      <CardMedia
        component="img"
        sx={{
          width: "100px",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "4px",
        }}
        image={picture}
        alt="project's picture"
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Stack
          justifyContent="space-between"
          sx={{ height: "100%", maxWidth: "max-content" }}
        >
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant="caption" color="primary">
            {address}
          </Typography>
        </Stack>
        <Stack
          direction="row-reverse"
          alignItems="end"
          sx={{ flex: 1, height: "100%" }}
        >
          <Button variant="contained" sx={{ width: 100 }} color="error">
            حذف
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Project;

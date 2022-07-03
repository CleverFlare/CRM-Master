import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export const ProjectSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 800, height: 110, display: "flex" }}>
      {/* <CardMedia
        component="img"
        sx={{
          width: "100px",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "4px",
        }}
        image={picture}
        alt="project's picture"
      /> */}
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100px",
        }}
        height="100%"
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
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={100} />
        </Stack>
        <Stack
          direction="row-reverse"
          alignItems="end"
          sx={{ flex: 1, height: "100%" }}
        >
          <Skeleton variant="rectangular" width={100} height={36} />
        </Stack>
      </CardContent>
    </Card>
  );
};

const Project = ({ picture, title, address, id }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    fetch("http://137.184.58.193:8000/aqar/api/router/Project/" + id + "/", {
      method: "DELETE",
      headers: {
        //prettier-ignore
        "Authorization": "Token 4b0d32e62fab4bf53d1907ab69cf6b3a9583eca1",
      },
    }).then(() => {
      setIsDeleted(true);
    });
  };

  return (
    <Collapse in={!isDeleted}>
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
            <Button
              variant="contained"
              sx={{ width: 100 }}
              color="error"
              onClick={handleDelete}
            >
              حذف
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Collapse>
  );
};

export default Project;

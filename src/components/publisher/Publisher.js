import React from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";

const Publisher = ({ name, picture }) => {
  return (
    <Card sx={{ maxWidth: "666px" }}>
      <CardHeader
        avatar={
          <Avatar src={picture ? picture : null}>
            {name ? name[0].toUpperCase() : ""}
          </Avatar>
        }
        title={
          <input
            type="text"
            style={{ width: "100%", border: "none", outline: "none" }}
            placeholder={`مالذي يدور في بالك، ${name.split(" ")[0]}؟`}
          />
        }
      />
      <CardActions
        sx={{ justifyContent: "space-between", paddingInline: "55px" }}
      >
        <Box sx={{ minWidth: "max-content" }}>
          <Tooltip title="add picture">
            <IconButton>
              <AddAPhotoIcon
                color="primary"
                style={{ transform: "scaleX(-1)" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="add reaction">
            <IconButton>
              <AddReactionIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
        <Button
          variant="contained"
          sx={{ minWidth: "min-content", width: 200 }}
          disableElevation
        >
          إضافة
        </Button>
      </CardActions>
    </Card>
  );
};

export default Publisher;

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
import { useState } from "react";

const Publisher = ({ name, picture, dataSetter }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content) return;
    const data = {
      content: content,
      organization: 1,
      user: 1,
    };
    fetch("http://137.184.58.193:8000/aqar/api/router/Post/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        //prettier-ignore
        "Authorization": "Token 4b0d32e62fab4bf53d1907ab69cf6b3a9583eca1",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data for that resource");

        return res.json();
      })
      .then((json) => {
        console.log(json);
        setContent("");
        dataSetter((oldPosts) => [...oldPosts, json]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Card sx={{ maxWidth: "766px" }}>
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
            value={content}
            onChange={(event) => setContent(event.target.value)}
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
          onClick={handleSubmit}
        >
          إضافة
        </Button>
      </CardActions>
    </Card>
  );
};

export default Publisher;

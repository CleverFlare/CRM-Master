import React from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";

const Publisher = ({ name, picture, dataSetter }) => {
  const [content, setContent] = useState("");
  const token = useSelector((state) => state.token.value);
  const userId = useSelector((state) => state.id.value);
  const domain = useSelector((state) => state.domain.value);
  const inputFile = useRef();

  const handleSubmit = () => {
    if (!content) return;
    const formData = new FormData();
    formData.set("organization", 1);
    formData.set("content", content);
    formData.set("user", userId);
    inputFile.current.files[0] &&
      formData.set("media", inputFile.current.files[0]);
    fetch(domain + "aqar/api/router/Post/", {
      method: "POST",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
      body: formData,
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
            <IconButton onClick={() => inputFile.current.click()}>
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
        <input
          type="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(event) => console.log(event.target.files)}
        />
      </CardActions>
    </Card>
  );
};

export default Publisher;

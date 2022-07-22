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
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import usePost from "../../hooks/usePost";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

const Publisher = ({ name, picture, dataSetter }) => {
  const [content, setContent] = useState("");
  const token = useSelector((state) => state.token.value);
  const userId = useSelector((state) => state.id.value);
  const domain = useSelector((state) => state.domain.value);
  const [emojisAnchorEl, setEmojisAnchorEl] = useState(null);
  const openEmojisList = Boolean(emojisAnchorEl);
  const [postRequest, successAlert, errorAlert, isPending] = usePost(
    "aqar/api/router/Post/",
    "تم إضافة منشور جديد بنجاح"
  );
  const inputFile = useRef();

  const handleSubmit = () => {
    if (!content) return;
    const formData = new FormData();
    formData.set("organization", 1);
    formData.set("content", content);
    formData.set("user", userId);
    inputFile.current.files[0] &&
      formData.set("media", inputFile.current.files[0]);
    postRequest(formData, false, "posts");
  };

  const handleAddEmoji = (e, selectedEmoji) => {
    setContent((old) => old + selectedEmoji.emoji);
    console.log(selectedEmoji);
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
          <div style={{ display: "inline-block" }}>
            <IconButton onClick={(e) => setEmojisAnchorEl(e.currentTarget)}>
              <AddReactionIcon color="primary" />
            </IconButton>
            <Menu
              anchorEl={emojisAnchorEl}
              open={openEmojisList}
              onClose={(e) => setEmojisAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{ direction: "rtl" }}
            >
              <Picker
                onEmojiClick={handleAddEmoji}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                groupNames={{ smileys_people: "PEOPLE" }}
              />
            </Menu>
          </div>
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
      {successAlert}
      {errorAlert}
    </Card>
  );
};

export default Publisher;

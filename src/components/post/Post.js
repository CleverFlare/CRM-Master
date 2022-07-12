import React from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  CardActions,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Skeleton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  Grow,
  Stack,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useEffect } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

export const PostSkeleton = () => {
  return (
    <Card
      sx={{
        maxWidth: "766px",
      }}
    >
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" width={200} />}
        subheader={<Skeleton variant="text" width={100} />}
        sx={{
          "& .MuiCardHeader-title": { color: "#233975" },
          "& .MuiCardHeader-subheader": { color: "#233975", fontSize: "12px" },
        }}
      />
      <CardContent>
        <Box
          sx={{
            padding: "0 55px",
          }}
        >
          <Typography variant="body2" color="primary">
            <Skeleton variant="text" />
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Skeleton variant="rectangular" width={80} height={36} />
        <Skeleton variant="rectangular" width={80} height={36} />
        <Skeleton variant="circular" width={30} height={30} />
      </CardActions>
      <Divider />
      <Box>
        <Skeleton variant="rectangular" height={36} />
      </Box>
    </Card>
  );
};

const EditPostDialog = ({ open, onClose, id, init, originalSetter }) => {
  const [editedContent, setEditedContent] = useState(init);

  const handleSubmit = () => {
    if (!editedContent) return;
    const data = {
      content: editedContent,
    };
    fetch("http://137.184.58.193:8000/aqar/api/router/Post/" + id + "/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        //prettier-ignore
        "Authorization": "Token 94d7a586cefcf05c8242c6bb4537c4179aa30c37",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data for that resource");

        originalSetter(editedContent);
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setEditedContent(init);
      }}
      TransitionComponent={Transition}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 700,
        },
      }}
    >
      <DialogTitle>تعديل المنشور</DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          multiline
          variant="standard"
          fullWidth
          value={editedContent}
          onChange={(event) => setEditedContent(event.target.value)}
        />
      </DialogContent>
      <Divider />
      <DialogContent>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ width: 100 }}
            onClick={handleSubmit}
          >
            حفظ
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 100 }}
            onClick={() => {
              onClose();
              setEditedContent(init);
            }}
          >
            إلغاء
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const Post = ({ name, picture, date, children, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeletion = () => {
    fetch("http://137.184.58.193:8000/aqar/api/router/Post/" + id + "/", {
      method: "DELETE",
      headers: {
        //prettier-ignore
        "Authorization": "Token 94d7a586cefcf05c8242c6bb4537c4179aa30c37",
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data for that resource");
        setIsDeleted(true);
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleCloseEditPostDialog = () => {
    setOpenEdit(false);
  };

  return (
    <Collapse in={!isDeleted} unmountOnExit>
      <Card
        sx={{
          maxWidth: "766px",
        }}
      >
        <EditPostDialog
          open={openEdit}
          onClose={handleCloseEditPostDialog}
          init={children}
        />
        <CardHeader
          avatar={
            <Avatar src={picture ? picture : null}>
              {name ? name[0] : ""}
            </Avatar>
          }
          action={
            <div style={{ position: "relative" }}>
              <Tooltip title="settings">
                <IconButton onClick={handleOpenMenu}>
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    setOpenEdit(true);
                  }}
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>تعديل المنشور</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    handleDeletion();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText>نقل إلى سلة المهملات</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <NotificationsOffIcon />
                  </ListItemIcon>
                  <ListItemText>إيقاف إشعارات المنشور</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          }
          title={name}
          subheader={date ? date.split("T")[0].replace(/-/gi, "/") : "منذ ساعة"}
          sx={{
            "& .MuiCardHeader-title": { color: "#233975" },
            "& .MuiCardHeader-subheader": {
              color: "#233975",
              fontSize: "12px",
            },
          }}
        />
        <CardContent>
          <Box
            sx={{
              padding: "0 55px",
              direction: /[a-z]/gi.test(children) ? "rtl" : "ltr",
            }}
          >
            <Typography variant="body2" color="primary">
              {children}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Tooltip title="likes">
            <Button endIcon={<FavoriteIcon />}>أعجبني</Button>
          </Tooltip>
          <Tooltip title="comments">
            <Button endIcon={<ChatBubbleIcon />}>تعليقات</Button>
          </Tooltip>
          <Tooltip title="share">
            <IconButton color="primary">
              <ReplyIcon color="primary" sx={{ transform: "scaleX(-1)" }} />
            </IconButton>
          </Tooltip>
        </CardActions>
        <Divider />
        <Box>
          <input
            type="text"
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "none",
              outline: "none",
              padding: "5px 15px",
            }}
            placeholder="اكتب تعليق"
          />
        </Box>
      </Card>
    </Collapse>
  );
};

export default Post;

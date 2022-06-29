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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";

const Post = ({ name, picture, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ maxWidth: "666px" }}>
      <CardHeader
        avatar={
          <Avatar src={picture ? picture : null}>
            {name ? name[0].toUpperCase() : ""}
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
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>تعديل المنشور</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
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
        subheader="منذ ساعة"
        sx={{
          "& .MuiCardHeader-title": { color: "#233975" },
          "& .MuiCardHeader-subheader": { color: "#233975", fontSize: "12px" },
        }}
      />
      <CardContent>
        <Box sx={{ padding: "0 55px" }}>
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
          <IconButton>
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
  );
};

export default Post;

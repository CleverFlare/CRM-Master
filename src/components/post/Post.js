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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";

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

const Post = ({ name, picture, date, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      sx={{
        maxWidth: "766px",
      }}
    >
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
        subheader={date ? date.split("T")[0].replace(/-/gi, "/") : "منذ ساعة"}
        sx={{
          "& .MuiCardHeader-title": { color: "#233975" },
          "& .MuiCardHeader-subheader": { color: "#233975", fontSize: "12px" },
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
  );
};

export default Post;

import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Box } from "@mui/system";

const NotificationItem = ({ onClick, picture, content, time, burgerMenu }) => {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemAvatar>
        <Avatar src={picture} sx={{ bgcolor: "orange" }}>
          M
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={content} secondary={time} />
    </ListItemButton>
  );
};

const TopBar = ({ mobile, onBurgerClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0px 3px 10px -1px rgb(35 57 117)",
      }}
    >
      <Toolbar>
        {mobile && (
          <IconButton
            sx={{ color: "white", marginLeft: 5 }}
            onClick={() => onBurgerClick()}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: mobile ? "flex-end" : "space-between",
            maxWidth: "90%",
            width: "90%",
          }}
        >
          <div>
            <Tooltip title="Notifications">
              <IconButton sx={{ color: "white" }} onClick={handleOpenMenu}>
                <NotificationsActiveIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <List sx={{ maxWidth: 500, width: "100%" }}>
                <ListItem>
                  <ListItemText primary="الإشعارات" />
                </ListItem>
                <Divider variant="middle" />
                <NotificationItem
                  onClick={handleCloseMenu}
                  picture="https://www.wallpaperflare.com/static/0/180/839/model-portrait-colton-haynes-man-wallpaper.jpg"
                  content="تعليق باسطة أحمد مجدي على المنشور الخاص بك"
                  time="منذ 1 دقائق"
                />
                <NotificationItem
                  onClick={handleCloseMenu}
                  picture="https://www.wallpaperflare.com/static/0/180/839/model-portrait-colton-haynes-man-wallpaper.jpg"
                  content="تعليق باسطة أحمد مجدي على المنشور الخاص بك"
                  time="منذ 1 دقائق"
                />
                <NotificationItem
                  onClick={handleCloseMenu}
                  picture="https://www.wallpaperflare.com/static/0/180/839/model-portrait-colton-haynes-man-wallpaper.jpg"
                  content="تعليق باسطة أحمد مجدي على المنشور الخاص بك"
                  time="منذ 1 دقائق"
                />
              </List>
            </Menu>
          </div>
          <TextField
            variant="standard"
            sx={{
              bgcolor: "white",
              border: "none",
              borderRadius: 1,
              width: "inherit",
              maxWidth: 300,
              minWidth: 10,
              "& .MuiInputBase-input": {
                paddingInline: "10px",
                fontSize: "12px",
                border: "none",
              },
            }}
            autoComplete="off"
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <IconButton size="small">
                  <SearchIcon fontSize="small" color="primary" />
                </IconButton>
              ),
            }}
            placeholder="بحث"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

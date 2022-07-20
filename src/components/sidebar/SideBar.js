import {
  Avatar,
  Badge,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";
import FeedIcon from "@mui/icons-material/Feed";
import BadgeIcon from "@mui/icons-material/Badge";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SideBar = ({ width, name, role, permanent, open, onClose }) => {
  const [customers, setCustomers] = useState(false);
  const [channels, setChannels] = useState(false);
  const [projects, setProjects] = useState(false);
  const [employees, setEmployees] = useState(false);
  const [settings, setSettings] = useState(false);
  const userInfo = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: "token/remove" });
  };

  const menuItems = [
    {
      type: "normal",
      text: "الرئيسية",
      icon: <AutoAwesomeMosaicIcon sx={{ color: "white" }} />,
      path: "/",
    },
    {
      type: "parent",
      text: "العملاء",
      icon: <GroupsIcon sx={{ color: "white" }} />,
      expander: customers,
      setExpander: setCustomers,
      children: [
        {
          text: "احصائيات العملاء",
          path: "/customers/statistics",
        },
        {
          text: "جميع العملاء",
          path: "/customers/total",
        },
        {
          text: "العملاء الجدد",
          path: "/customers/new",
        },
        {
          text: "العملاء المحذوفة",
          path: "/customers/deleted",
        },
        {
          text: "إضافة عميل جديد",
          path: "/customers/add-new",
        },
        {
          text: "إضافة حالة عميل",
          path: "/customers/add-status",
        },
        {
          text: "حالات العميل",
          path: "/customers/statuses",
        },
        {
          text: "إستيراد عملاء",
          path: "/customers/import",
        },
        {
          text: "تصدير عملاء",
          path: "/customers/export",
        },
      ],
    },
    {
      type: "parent",
      text: "المشاريع",
      icon: <StoreIcon sx={{ color: "white" }} />,
      expander: projects,
      setExpander: setProjects,
      children: [
        {
          text: "عرض المشاريع",
          path: "/projects/display",
        },
        {
          text: "إضافة مشروع جديد",
          path: "/projects/new",
        },
      ],
    },
    {
      type: "normal",
      text: "تقارير فريق المبيعات",
      icon: <FeedIcon sx={{ color: "white" }} />,
      path: "/reports",
    },
    {
      type: "parent",
      text: "الموظفين",
      icon: <BadgeIcon sx={{ color: "white" }} />,
      expander: employees,
      setExpander: setEmployees,
      children: [
        {
          text: "إضافة موظف جديد",
          path: "/employees/new",
        },
        {
          text: "بيانات الموظفين",
          path: "/employees/data",
        },
        {
          text: "إضافة وظيفة",
          path: "/employees/add-job",
        },
        {
          text: "الوظائف",
          path: "/employees/jobs",
        },
      ],
    },
    {
      type: "parent",
      text: "القنوات",
      icon: <AddCircleIcon sx={{ color: "white" }} />,
      expander: channels,
      setExpander: setChannels,
      children: [
        {
          text: "إضافة قناة",
          path: "/channels/add-new",
        },
        {
          text: "عرض القنوات",
          path: "/channels/display",
        },
      ],
    },
    "divider",
    {
      type: "parent",
      text: "الإعدادات",
      icon: <SettingsIcon sx={{ color: "white" }} />,
      expander: settings,
      setExpander: setSettings,
      children: [
        {
          text: "تعديل كلمة السر",
          path: "/settings/change-password",
        },
      ],
    },
    "divider",
    {
      type: "normal",
      text: "تسجيل الخروج",
      icon: <LogoutIcon sx={{ color: "white" }} />,
      callback: handleLogout,
    },
  ];

  const handleExpand = (value, setter) => {
    setter(!value);
  };

  return (
    <Drawer
      variant={permanent ? "permanent" : "temporary"}
      open={open}
      anchor="right"
      sx={{
        width: width,
        "& .MuiDrawer-paper": {
          width: width,
          bgcolor: "#233975",
          color: "white",
          border: "none",
          borderRadius: !permanent ? "0 50px 50px 0" : 0,
          boxShadow: "2px -1px 10px -1px rgb(35 57 117)",
          right: "none",
          left: 0,
        },
        "& .MuiBackdrop-root": {
          bgcolor: "rgb(255 255 255 / 50%)",
        },
      }}
      onClose={onClose}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
        }}
      >
        {/* <Badge
          overlap="circular"
          badgeContent={
            <IconButton
              sx={{
                bgcolor: "white",
                color: "black",
                boxShadow: "0 0 10px #fff",
                "&:hover": {
                  bgcolor: "white",
                },
              }}
              size="small"
            >
              <AddAPhotoIcon color="primary" fontSize="small" />
            </IconButton>
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        > */}
        <Avatar sx={{ width: 60, height: 60 }} src={userInfo?.picture} />
        {/* </Badge> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ position: "relative" }}
          >
            {/* <IconButton
              sx={{
                color: "white",
                position: "absolute",
                left: "-50%",
              }}
            >
              <EditIcon
                sx={{ color: "white" }}
                fontSize="small"
                sx={{ fontSize: "15px" }}
              />
            </IconButton> */}
            <Typography>{userInfo?.name}</Typography>
          </Stack>
          <Typography variant="caption">{userInfo?.job}</Typography>
        </Box>
      </Box>
      <List>
        {menuItems.map((item, index) => {
          if (item === "divider")
            return (
              <Divider
                sx={{ borderColor: "rgb(255 255 255 / 8%)" }}
                key={index}
              />
            );

          switch (item.type) {
            case "normal":
              return (
                <ListItemButton
                  key={index}
                  sx={{
                    bgcolor:
                      location.pathname === item.path ? "#f4f4f4" : "initial",
                    "& *": {
                      color:
                        location.pathname === item.path
                          ? "primary.main"
                          : "white",
                    },
                    "&:hover": {
                      bgcolor:
                        location.pathname === item.path ? "#f4f4f4" : "initial",
                    },
                    "&:hover *": {
                      color:
                        location.pathname === item.path
                          ? "primary.main"
                          : "white",
                    },
                  }}
                  onClick={() =>
                    item.path ? navigate(item.path) : item.callback()
                  }
                >
                  <ListItemIcon sx={{ minWidth: "34px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              );
            case "parent":
              return (
                <React.Fragment key={index}>
                  <ListItemButton
                    onClick={() =>
                      handleExpand(item.expander, item.setExpander)
                    }
                  >
                    <ListItemIcon sx={{ minWidth: "34px" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    {item.expander ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  <Collapse in={item.expander} timeout="auto" unmountOnExit>
                    {item.children.map((child, index) => (
                      <ListItemButton
                        key={index}
                        sx={{
                          pl: 7,
                          bgcolor:
                            location.pathname === child.path
                              ? "#f4f4f4"
                              : "initial",
                          "& *": {
                            color:
                              location.pathname === child.path
                                ? "primary.main"
                                : "white",
                          },
                          "&:hover": {
                            bgcolor:
                              location.pathname === child.path
                                ? "#f4f4f4"
                                : "initial",
                          },
                          "&:hover *": {
                            color:
                              location.pathname === child.path
                                ? "primary.main"
                                : "white",
                          },
                        }}
                        onClick={() => navigate(child.path)}
                      >
                        <ListItemText
                          primary={child.text}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: ".80rem",
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </Collapse>
                </React.Fragment>
              );
          }
        })}
      </List>
    </Drawer>
  );
};

export default SideBar;

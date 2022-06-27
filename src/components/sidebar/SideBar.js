import {
  Avatar,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { Box } from "@mui/system";
import { useState } from "react";

const SideBar = ({ width, name, role, permanent, open, onClose }) => {
  const [customers, setCustomers] = useState(false);
  const [projects, setProjects] = useState(false);
  const [employees, setEmployees] = useState(false);
  const [settings, setSettings] = useState(false);
  const variant = open ? "temporary" : "persistent";

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
          borderRadius: !permanent ? "50px 0 0 50px" : 0,
          boxShadow: "-1px -1px 10px -1px rgb(35 57 117)",
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
        <Avatar sx={{ width: 60, height: 60 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
          }}
        >
          <Typography>{name}</Typography>
          <Typography variant="caption">{role}</Typography>
        </Box>
      </Box>
      <List>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <AutoAwesomeMosaicIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="الرئيسية" sx={{ textAlign: "right" }} />
        </ListItemButton>
        <ListItemButton onClick={() => handleExpand(customers, setCustomers)}>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <GroupsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="العملاء" sx={{ textAlign: "right" }} />
          {customers ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={customers} timeout="auto" unmountOnExit>
          <List>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="احصائيات العملاء"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="جميع العملاء"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="العملاء الجدد"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="العملاء المحذوفة"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="إضافة عميل جديد"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="إستيراد عملاء"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="تصدير عملاء"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleExpand(projects, setProjects)}>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <StoreIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="المشاريع" sx={{ textAlign: "right" }} />
          {projects ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={projects} timeout="auto" unmountOnExit>
          <List>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="عرض المشاريع"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="إضافة مشروع جديد"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <FeedIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary="تقارير فريق المبيعات"
            sx={{ textAlign: "right" }}
          />
        </ListItemButton>
        <ListItemButton onClick={() => handleExpand(employees, setEmployees)}>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <BadgeIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="الموظفين" sx={{ textAlign: "right" }} />
          {employees ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={employees} timeout="auto" unmountOnExit>
          <List>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="إضافة موظف جديد"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="تعديل بيانات الموظفين"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <AddCircleIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="إضافة قناة" sx={{ textAlign: "right" }} />
        </ListItemButton>
        <Divider sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
        <ListItemButton onClick={() => handleExpand(settings, setSettings)}>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <SettingsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="الإعدادات" sx={{ textAlign: "right" }} />
          {settings ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={settings} timeout="auto" unmountOnExit>
          <List>
            <ListItemButton sx={{ pr: 7 }}>
              <ListItemText
                primary="تعديل كلمة السر"
                sx={{
                  textAlign: "right",
                  "& .MuiListItemText-primary": { fontSize: ".80rem" },
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <LogoutIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="تسجيل الخروج" sx={{ textAlign: "right" }} />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SideBar;

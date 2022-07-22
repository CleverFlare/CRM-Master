import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Grow,
  Typography,
  Table,
  TableHead,
  TableCell,
  Box,
  TableBody,
  TableRow,
  Button,
  IconButton,
  Card,
  Avatar,
  TextField,
  MenuItem,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import useControls from "../../hooks/useControls";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} unmountOnExit />;
});

const dummyColumns = [
  {
    field: "project",
    headerName: "المشروعات",
  },
  {
    field: "channel",
    headerName: "القناة الإعلانية",
  },
  {
    field: "agent",
    headerName: "مسؤول المبيعات",
  },
  {
    field: "createdBy",
    headerName: "إنشاء بواسطة",
  },
  {
    field: "status",
    headerName: "حالة العميل",
  },
  {
    field: "date",
    headerName: "تاريخ الإنشاء",
  },
];

const dummyComments = [
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "محمد ماهر",
    content: "حاجة",
    date: "22/7/2022",
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "محمد ماهر",
    content: "حاجة",
    date: "22/7/2022",
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "محمد ماهر",
    content: "حاجة",
    date: "22/7/2022",
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "محمد ماهر",
    content: "حاجة",
    date: "22/7/2022",
  },
];

const dummyStatuses = ["مهتم", "غير مهتم", "حيادي"];

const CustomerDetails = ({
  isOpened = false,
  onClose = () => {},
  initials = {},
}) => {
  const [controls, setControl, resetControls] = useControls({
    comment: "",
    status: "",
  });
  const status = useSelector((state) => state.status.value);
  const dispatch = useDispatch();
  const [statusGetRequest, statusGetRequestError] = useGet(
    "aqar/api/router/Status/"
  );
  const [commentPostRequest, successAlert, errorAlert, isPending] = usePost(
    "aqar/api/router/CommentClient/"
  );
  const [tab, setTab] = useState("home");
  const convertToProperData = (array) => {
    const newArray = [];
    array?.map((item) => {
      const object = {
        project: item.bussiness.map((project) => project.name).join(" ، "),
        channel: item.channel,
        agent: item.agent,
        favContact: item.fav_contacts,
        createdBy:
          initials?.allData?.history[0]?.history_user?.first_name +
          " " +
          initials?.allData?.history[0]?.history_user?.last_name,
        budgest: item.max_budget,
        date: item.created_at.split("T")[0].replace(/-/gi, "/"),
      };
      newArray.push(object);
    });
    return newArray;
  };

  const clientDetails = [
    {
      name: "الأسم",
      value: initials.name,
    },
    {
      name: "الهاتف",
      value: initials.phone,
      icon: (
        <Stack direction="row">
          <IconButton sx={{ color: "white" }}>
            <TelegramIcon sx={{ color: "#27a6e6" }} />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <WhatsAppIcon sx={{ color: "#5ef979" }} />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <LocalPhoneIcon sx={{ color: "#127fff" }} />
          </IconButton>
        </Stack>
      ),
    },
    {
      name: "المشروع",
      value: initials.project,
    },
    {
      name: "القناة الإعلانية",
      value: initials.channel,
    },
    {
      name: "مسؤول المبيعات",
      value: initials.saler,
      icon: (
        <IconButton sx={{ color: "white" }}>
          <ChangeCircleIcon sx={{ color: "white", transform: "scale(1.2)" }} />
        </IconButton>
      ),
    },
    {
      name: "تاريخ الإنشاء",
      value: initials?.allData?.created_at?.split("T")[0].replace(/-/gi, "/"),
    },
    {
      name: "تعليق",
      value: initials.comment,
      icon: (
        <IconButton sx={{ color: "white" }} onClick={() => setTab("comment")}>
          <ChatBubbleIcon sx={{ color: "white", transform: "scale(1.2)" }} />
        </IconButton>
      ),
    },
  ];

  const handleOnClose = (e) => {
    setTab("home");
    resetControls();
    onClose(e);
  };

  useEffect(() => {
    if (Boolean(status.legth)) return;
    statusGetRequest().then((res) => {
      dispatch({ type: "status/set", payload: res });
    });
  }, []);

  const handleSave = () => {
    if (controls.comment) {
      const requestBody = {
        comment: controls.name,
        client: initials?.id,
      };
      commentPostRequest(requestBody, true).then((res) => {
        if (res === null) return;
        resetControls();
      });
    }
  };

  return (
    <>
      <Dialog
        open={tab === "home" && isOpened}
        onClose={handleOnClose}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: (theme) => theme.palette.primary.main,
            color: "white",
            maxWidth: 1000,
            width: "90vw",
            maxHeight: "90vh",
            overflowY: "auto",
          },
          ".MuiDialogContent-root": {
            height: "max-content",
            flex: "unset",
            overflow: "initial",
          },
        }}
        BackdropProps={{
          sx: {
            bgcolor: "rgb(255 255 255 / 50%)",
          },
        }}
      >
        <DialogTitle>تفاصيل العميل</DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              border: "1px solid #ffffff6e",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 0 20px #ffffff6e",
            }}
            spacing={2}
          >
            {clientDetails.map((clientDetail, index) => (
              <Stack
                direction="row"
                key={clientDetail.name + index}
                alignItems="center"
                spacing={2}
              >
                <Typography>
                  {clientDetail.name} : {clientDetail.value}
                </Typography>
                {clientDetail?.icon}
              </Stack>
            ))}
          </Stack>
        </DialogContent>

        <DialogTitle>تاريخ العميل</DialogTitle>
        <DialogContent>
          <Stack spacing={4} justifyContent="center" alignItems="center">
            <Box
              sx={{
                width: "100%",
                border: "1px solid #ffffff6e",
                borderRadius: 2,
                p: 2,
                boxShadow: "0 0 20px #ffffff6e",
                boxSizing: "border-box",
                "& .MuiTableCell-root": {
                  border: "none",
                },
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {dummyColumns.map((headData, index) => (
                      <TableCell sx={{ color: "white" }} key={index}>
                        {headData?.headerName
                          ? headData?.headerName
                          : headData?.field}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={{ maxHeight: "300px", overflowY: "auto" }}>
                  {[...convertToProperData(initials?.allData?.history)]?.map(
                    (row, index) => (
                      <TableRow key={index}>
                        {dummyColumns.map((column, index) => (
                          <TableCell sx={{ color: "white" }} key={index}>
                            {row[column.field]}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
            <Button
              variant="contained"
              sx={{
                maxWidth: "150px",
                width: "100vmax",
                height: "50px",
                bgcolor: "#f54242",
                color: "white",
                "&:hover": {
                  bgcolor: "#f54242",
                  color: "white",
                  filter: "brightness(.9)",
                },
              }}
              onClick={onClose}
            >
              <Typography sx={{ fontWeight: "bold" }}>إلغاء</Typography>
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog
        open={tab === "comment" && isOpened}
        onClose={handleOnClose}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: (theme) => theme.palette.primary.main,
            color: "white",
            maxWidth: 700,
            width: "90vw",
            maxHeight: "90vh",
            overflowY: "auto",
          },
          ".MuiDialogContent-root": {
            height: "max-content",
            flex: "unset",
            overflow: "initial",
          },
        }}
        BackdropProps={{
          sx: {
            bgcolor: "rgb(255 255 255 / 50%)",
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>التعليقات</Typography>
            <IconButton sx={{ color: "white" }} onClick={() => setTab("home")}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              border: "1px solid #ffffff6e",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 0 20px #ffffff6e",
              maxHeight: 300,
              overflowY: "auto",
            }}
            spacing={2}
          >
            {dummyComments.map((comment, index) => (
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                key={index}
              >
                <Avatar src={comment.picture} sx={{ width: 70, height: 70 }} />
                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{ height: "100%" }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body1">{comment.name}</Typography>
                    <Typography variant="caption" sx={{ opacity: ".5" }}>
                      {comment.date}
                    </Typography>
                  </Stack>
                  <Typography variant="body2">{comment.content}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogContent>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <TextField
              variant="standard"
              multiline
              rows={3}
              placeholder="تعليق"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": { bgcolor: "white" },
              }}
              value={controls.comment}
              onChange={(e) => setControl("comment", e.target.value)}
            />
            <TextField
              variant="standard"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": { bgcolor: "white" },
              }}
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  console.log(selected);
                  if (!selected) {
                    return (
                      <Typography sx={{ opacity: ".5" }}>الحالة</Typography>
                    );
                  } else {
                    return status.filter((item) => item.id === selected)[0]
                      .name;
                  }
                },
                MenuProps: { PaperProps: { style: { maxHeight: "250px" } } },
              }}
              select
              value={controls.status}
              onChange={(e) => setControl("status", e.target.value)}
            >
              {status.map((status, index) => (
                <MenuItem value={status.id} key={index}>
                  {status.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              sx={{
                maxWidth: "150px",
                width: "100vmax",
                height: "50px",
                bgcolor: "white",
                color: (theme) => theme.palette.primary.main,
                "&:hover": {
                  bgcolor: "white",
                  color: (theme) => theme.palette.primary.main,
                  filter: "brightness(.9)",
                },
              }}
              onClick={handleSave}
            >
              <Typography sx={{ fontWeight: "bold" }}>حفظ</Typography>
            </Button>
          </Stack>
        </DialogContent>
        {successAlert}
        {errorAlert}
      </Dialog>
    </>
  );
};

export default CustomerDetails;

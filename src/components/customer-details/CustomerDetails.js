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
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import useControls from "../../hooks/useControls";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import { useDispatch, useSelector } from "react-redux";
import useValidate from "../../hooks/useValidate";

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
    headerName: "الموظف",
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
    job: "مسؤول مبيعات",
    selected: true,
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "احمد محمود",
    content: "حاجة",
    date: "22/7/2022",
    job: "مسؤول مبيعات",
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "محمود عبدالله",
    content: "حاجة",
    date: "22/7/2022",
    job: "مسؤول مبيعات",
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "مصطفى عبدالرحمن",
    content: "حاجة",
    date: "22/7/2022",
    job: "مسؤول مبيعات",
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "عبدالله خالد",
    content: "حاجة",
    date: "22/7/2022",
    job: "مسؤول مبيعات",
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "عبدالرحمن احمد",
    content: "حاجة",
    date: "22/7/2022",
    job: "مسؤول مبيعات",
  },
  {
    picture:
      "https://cdn.pixabay.com/photo/2021/04/05/12/39/man-6153298_1280.jpg",
    name: "خالد إبراهيم",
    content: "حاجة",
    date: "22/7/2022",
    job: "مسؤول مبيعات",
  },
];

const dummyStatuses = ["مهتم", "غير مهتم", "حيادي"];

const CustomerDetails = ({
  isOpened = false,
  onClose = () => {},
  initials = {},
}) => {
  const [commentControls, commentSetControl, commentResetControls] =
    useControls({
      comment: "",
      status: "",
    });
  const [agentControls, agentSetControl, agentResetControls] = useControls({
    search: "",
    agent: "",
    transferMethod: 1,
  });
  const [
    agentPostRequest,
    agentSuccessAlert,
    agentErrorAlert,
    agentRequestIsPending,
  ] = usePost("aqar/api/transfer/", "تم التبديل بنجاح!");
  const validate = useValidate();
  const [errors, setErrors] = useState({});
  const status = useSelector((state) => state.status.value);
  const dispatch = useDispatch();
  const [statusGetRequest, statusGetRequestError] = useGet(
    "aqar/api/router/Status/"
  );
  const [
    commentPostRequest,
    commentSuccessAlert,
    commentErrorAlert,
    isPending,
  ] = usePost("aqar/api/router/CommentClient/");
  const [employeesGetRequest, employeesGetRequestError] = useGet(
    "aqar/api/router/Employee/"
  );
  const employees = useSelector((state) => state.employees.value);
  const [tab, setTab] = useState("home");
  const convertToProperData = (array) => {
    const newArray = [];
    array?.map((item) => {
      const object = {
        project: item.bussiness.join(" ، "),
        channel: item.channel,
        agent: item.agent,
        status: item.event,
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
          <IconButton
            sx={{ color: "white" }}
            onClick={() => window.open("https://web.telegram.org/z/", "_blank")}
          >
            <TelegramIcon sx={{ color: "#27a6e6" }} />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            onClick={() =>
              window.open("https://wa.me/" + initials.phone, "_blank")
            }
          >
            <WhatsAppIcon sx={{ color: "#5ef979" }} />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            onClick={() =>
              window.open(
                "https://www.truecaller.com/search/eg/" + initials.phone,
                "_blank"
              )
            }
          >
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
      name: "موظف",
      value: initials.saler,
      icon: (
        <IconButton sx={{ color: "white" }} onClick={() => setTab("agent")}>
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
    {
      name: "الميزانية",
      value: initials?.allData?.max_budget,
    },
  ];

  const handleOnClose = (e) => {
    console.log(employees);
    setTab("home");
    commentResetControls();
    onClose(e);
  };

  useEffect(() => {
    if (Boolean(status.legth)) return;
    statusGetRequest().then((res) => {
      dispatch({ type: "status/set", payload: res.results });
    });
    if (Boolean(employees?.length)) return;
    employeesGetRequest().then((res) => {
      dispatch({ type: "employees/set", payload: res.results });
    });
  }, []);

  useEffect(() => {
    agentSetControl("agent", initials?.allData?.agent?.id);
  }, [initials?.allData?.agent?.id]);

  const handleSave = () => {
    validate([
      {
        name: "comment",
        value: commentControls.comment,
        isRequired: true,
      },
      {
        name: "status",
        value: commentControls.status,
        isRequired: true,
      },
    ]).then((output) => {
      setErrors(output.errors);
      if (!output.ok) return;
      const requestBody = {
        comment: commentControls.comment,
        client: initials?.id,
        event: commentControls.status,
      };
      commentPostRequest(requestBody, true, [
        {
          path: "aqar/api/router/Client/",
          name: "allCustomers",
        },
      ]).then((res) => {
        if (res === null) return;
        commentResetControls();
        handleOnClose();
      });
    });
  };

  const handleSubmitAgent = () => {
    if (agentControls.agent === initials?.allData?.agent?.id) return;
    const requestBody = {
      client: initials?.id,
      agent: agentControls.agent,
      option: Boolean(Number(agentControls.transferMethod)),
    };
    agentPostRequest(requestBody, true, [
      { name: "allCustomers", path: "aqar/api/router/Client/" },
    ]).then((res) => {
      if (res === null) return;
      handleOnClose();
    });
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
            {clientDetails?.map((clientDetail, index) => (
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
              <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {dummyColumns?.map((headData, index) => (
                        <TableCell
                          sx={{
                            color: "white",
                            position: "sticky",
                            top: 0,
                            bgcolor: (theme) => theme.palette.primary.main,
                          }}
                          key={index}
                        >
                          {headData?.headerName
                            ? headData?.headerName
                            : headData?.field}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ maxHeight: "100px", overflowY: "auto" }}>
                    {[...convertToProperData(initials?.allData?.history)]?.map(
                      (row, index) => (
                        <TableRow key={index}>
                          {dummyColumns?.map((column, index) => (
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
              minHeight: 300,
              overflowY: "auto",
            }}
            spacing={2}
          >
            {initials?.allData?.aqar_comment_client?.map((comment, index) => (
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                key={index}
              >
                <Avatar src={comment.picture} sx={{ width: 50, height: 50 }} />
                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{ height: "100%" }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body1">
                      {comment.commenter__first_name +
                        " " +
                        comment.commenter__last_name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: ".5" }}>
                      {comment.created_at.split("T")[0].replace(/-/gi, "/")}
                    </Typography>
                  </Stack>
                  <Typography variant="body2">
                    {Boolean(comment.comment) ? comment.comment : "s"}
                  </Typography>
                </Stack>
              </Stack>
            ))}
            {!Boolean(initials?.allData?.aqar_comment_client?.length) && (
              <Stack
                sx={{ width: "100%", height: "100%", flex: 1 }}
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h4" sx={{ color: "#fff5" }}>
                  فارغ
                </Typography>
              </Stack>
            )}
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
              value={commentControls.comment}
              onChange={(e) => commentSetControl("comment", e.target.value)}
              error={Boolean(errors?.comment)}
              helperText={errors?.comment}
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
              value={commentControls.status}
              onChange={(e) => commentSetControl("status", e.target.value)}
              error={Boolean(errors?.status)}
              helperText={errors?.status}
            >
              {status?.map((status, index) => (
                <MenuItem value={status.id} key={index}>
                  {status.name}
                </MenuItem>
              ))}
            </TextField>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
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
              <Button
                variant="contained"
                sx={{
                  maxWidth: "150px",
                  width: "100vmax",
                  height: "50px",
                  bgcolor: "#f54242",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#f54242",
                    color: "#fff",
                    filter: "brightness(.9)",
                  },
                }}
                onClick={handleOnClose}
              >
                <Typography sx={{ fontWeight: "bold" }}>إلغاء</Typography>
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
        {commentErrorAlert}
      </Dialog>
      <Dialog
        open={isOpened && tab === "agent"}
        onClose={handleOnClose}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: (theme) => theme.palette.primary.main,
            color: "white",
            maxWidth: 500,
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
            <Typography>تحويل هذا العميل إلى</Typography>
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
              maxHeight: 400,
              minHeight: 400,
            }}
            spacing={2}
          >
            <TextField
              variant="standard"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": { bgcolor: "white" },
              }}
              placeholder="بحث"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ paddingInline: "5px" }}>
                    <SearchIcon sx={{ opacity: ".5" }} />
                  </InputAdornment>
                ),
              }}
              value={agentControls.search}
              onChange={(e) => agentSetControl("search", e.target.value)}
            />
            <List
              sx={{
                height: "100%",
                overflowY: "auto",
              }}
            >
              {employees
                ?.filter(
                  (item) =>
                    (
                      item?.user?.first_name +
                      " " +
                      item?.user?.last_name
                    )?.includes(agentControls.search) ||
                    item?.job?.includes(agentControls.search)
                )
                ?.map((agent, index) => (
                  <ListItemButton
                    selected={agent?.id === agentControls?.agent}
                    onClick={(e) => agentSetControl("agent", agent?.id)}
                    sx={{
                      borderRadius: 2,
                      "&.Mui-selected": {
                        bgcolor: "#b5b5b5",
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "#b5b5b5",
                      },
                      "& .MuiListItemText-primary": {
                        color: "#fff",
                      },
                      "& .MuiListItemText-secondary": {
                        color: "#fff",
                      },
                    }}
                    key={index}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={agent?.picture}
                        sx={{ width: 40, height: 40 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        agent?.user?.first_name + " " + agent?.user?.last_name
                      }
                      secondary={agent?.job}
                    />
                  </ListItemButton>
                ))}
            </List>
          </Stack>
        </DialogContent>
        <DialogContent>
          <FormGroup sx={{ marginBottom: 5 }}>
            <RadioGroup
              name="transfer-method"
              value={agentControls.transferMethod}
              onChange={(e) =>
                agentSetControl("transferMethod", e.target.value)
              }
            >
              <FormControlLabel
                control={
                  <Radio
                    sx={{
                      color: "white",
                      "& *": {
                        color: "white",
                      },
                    }}
                  />
                }
                label="نفس المرحلة"
                value={1}
              />
              <FormControlLabel
                control={
                  <Radio
                    sx={{
                      color: "white",
                      "& *": {
                        color: "white",
                      },
                    }}
                  />
                }
                label="حذف السجلات"
                value={0}
              />
            </RadioGroup>
          </FormGroup>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
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
              onClick={handleSubmitAgent}
            >
              <Typography sx={{ fontWeight: "bold" }}>حفظ</Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                maxWidth: "150px",
                width: "100vmax",
                height: "50px",
                bgcolor: "#f54242",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#f54242",
                  color: "#fff",
                  filter: "brightness(.9)",
                },
              }}
              onClick={handleOnClose}
            >
              <Typography sx={{ fontWeight: "bold" }}>إلغاء</Typography>
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerDetails;

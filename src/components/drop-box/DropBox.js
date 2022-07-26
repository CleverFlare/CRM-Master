import {
  Button,
  Paper,
  Typography,
  Stack,
  Card,
  CardHeader,
  Avatar,
  Divider,
  LinearProgress,
} from "@mui/material";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useSelector } from "react-redux";

const DropBox = ({ variant }) => {
  const [files, setFiles] = useState([]);
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);

  const fileRef = useRef();

  const handleOpenFile = (event) => {
    fileRef.current.click();
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("organization", 1);
    const file = fileRef.current.files[0];
    formData.append("file", file);
    const allFiles = [...files, { picture: "", progress: 0 }];
    setFiles(allFiles);
    // setTimeout(() => {
    //   allFiles[allFiles.length - 1].progress = 50;
    //   setFiles([...allFiles]);
    // }, 1000);
    // setTimeout(() => {
    //   allFiles[allFiles.length - 1].progress = 100;
    //   setFiles([...allFiles]);
    // }, 2000);
    axios.post(domain + "aqar/api/import/", formData, {
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
      onUploadProgress: (progress) => {
        const { loaded, total } = progress;
        const percentage = Math.floor((loaded * 100) / total);
        allFiles[allFiles.length - 1].progress = percentage;
        setFiles([...allFiles]);
      },
    });
  };

  const handleExport = () => {
    window.open(domain + "aqar/api/export/", "_parent");
  };

  const handleSubmit = () => {
    if (variant !== "upload") {
      handleExport();
    } else {
      fileRef.current.click();
    }
  };

  return (
    <Paper sx={{ bgcolor: "#f5f6fa", maxWidth: 600, width: "100%" }}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={handleUpload}
      />
      <Stack spacing={2}>
        <Paper
          variant="outlined"
          sx={{
            borderStyle: "dashed",
            borderWidth: "3px",
            bgcolor: "#f5f6fa",
            cursor: "default",
            margin: 2,
          }}
          onClick={handleSubmit}
        >
          <Stack
            sx={{
              width: "100%",
              paddingBlock: 10,
            }}
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <BackupOutlinedIcon
              sx={{
                width: 100,
                height: 100,
                transform: variant === "upload" ? "scale(1)" : "scale(-1)",
              }}
              color="primary"
            />
            <Typography
              variant="h5"
              color="neutral.main"
              sx={{ textAlign: "center" }}
            >
              قم بالسحب والإفلات هنا
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ width: 150, height: 50 }}
              onClick={handleSubmit}
            >
              {variant === "upload" ? "رفع الملف" : "تحميل الملف"}
            </Button>
          </Stack>
        </Paper>
        {Boolean(files.length) && (
          <Stack divider={<Divider />}>
            {files?.map((file, index) => (
              <Card
                sx={{
                  bgcolor: "transparent",
                  boxShadow: "none",
                  position: "relative",
                }}
                key={index}
              >
                <CardHeader
                  avatar={<Avatar src={file.picture && file.picture} />}
                  title={
                    <Typography sx={{ color: "#7884a0" }}>
                      {file.progress !== 100
                        ? `يتم الأن ${
                            variant === "upload" ? "رفع" : "تحميل"
                          } ملف العملاء`
                        : `تم ${
                            variant === "upload" ? "رفع" : "تحميل"
                          } ملف العملاء`}
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="body2"
                      sx={{ color: "#a1a9bf", marginBlock: "5px" }}
                    >
                      428kb
                    </Typography>
                  }
                  action={
                    file.progress ? (
                      <CheckCircleIcon sx={{ color: "#687ddb" }} size="large" />
                    ) : (
                      <CancelIcon sx={{ color: "#ff6464" }} size="large" />
                    )
                  }
                  sx={{
                    "& .MuiCardHeader-action": {
                      margin: 0,
                      alignSelf: "unset",
                      display: "flex",
                      alignItems: "center",
                      transform: "scale(1.2)",
                    },
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: "100px",
                    pointerEvents: "none",
                    color: "#23397542",
                    visibility: file.progress === 100 ? "hidden" : "visible",
                    opacity: file.progress === 100 ? "0" : "1",
                    transition: "1s",
                  }}
                >
                  {file.progress}%
                </Typography>
                {/* {file.progress !== 100 && ( */}
                <LinearProgress
                  variant="determinate"
                  value={file.progress}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    backgroundColor: "transparent",
                    "& .MuiLinearProgress-bar1Determinate": {
                      bgcolor: "#23397542",
                    },
                    "& .MuiLinearProgress-bar1Determinate": {
                      bgcolor: "#23397542",
                    },
                    visibility: file.progress === 100 ? "hidden" : "visible",
                    opacity: file.progress === 100 ? "0" : "1",
                    transition: "1s",
                  }}
                />
                {/* )} */}
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default DropBox;

// owner_01000015160

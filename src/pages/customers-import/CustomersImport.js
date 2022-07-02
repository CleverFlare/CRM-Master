import { Button, Paper, Stack, Typography } from "@mui/material";
import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { useRef } from "react";

const CustomersImport = () => {
  const fileRef = useRef();
  const handleOpenFile = (event) => {
    fileRef.current.click();
  };
  return (
    <>
      <Wrapper>
        <input type="file" style={{ display: "none" }} ref={fileRef} />
        <Parameter
          links={[
            {
              text: "العملاء",
              path: "/",
            },
            {
              text: "إستيراد عملاء",
              path: "/",
            },
          ]}
        />
        <Stack alignItems="center">
          <Paper sx={{ padding: 2, bgcolor: "#f5f6fa", width: "max-content" }}>
            <Stack spacing={4}>
              <Paper
                variant="outlined"
                sx={{
                  borderStyle: "dashed",
                  borderWidth: "3px",
                  bgcolor: "#f5f6fa",
                  cursor: "default",
                }}
                onClick={handleOpenFile}
              >
                <Stack
                  sx={{ paddingInline: 20, paddingBlock: 8 }}
                  justifyContent="center"
                  alignItems="center"
                  spacing={5}
                >
                  <BackupOutlinedIcon
                    sx={{ width: 100, height: 100 }}
                    color="primary"
                  />
                  <Typography variant="h5" color="neutral.main">
                    قم بالسحب والإفلات هنا
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ width: 150, height: 50 }}
                  >
                    رفع الملف
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Paper>
        </Stack>
      </Wrapper>
    </>
  );
};

export default CustomersImport;

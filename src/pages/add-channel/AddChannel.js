import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";

const AddChannel = () => {
  return (
    <>
      <Wrapper>
        <Parameter
          links={[
            {
              text: "إضافة قناة",
              path: "/",
            },
          ]}
        />
        <Paper
          sx={{
            padding: 2,
            paddingRight: 10,
            maxWidth: "766px",
            boxSizing: "border-box",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography color="primary">اسم القناة</Typography>
            </Grid>
            <Grid item xs={10}>
              <Paper
                elevation={4}
                sx={{
                  flex: 1,
                }}
              >
                <TextField variant="standard" fullWidth />
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Typography color="primary">صورة القناة</Typography>
            </Grid>
            <Grid item xs={10}>
              <Paper
                elevation={4}
                sx={{
                  flex: 1,
                }}
              >
                <TextField
                  variant="standard"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ position: "relative" }}
                      >
                        <IconButton>
                          <input
                            id="attach-file"
                            type="file"
                            style={{
                              display: "none",
                            }}
                          />
                          <label
                            htmlFor="attach-file"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              cursor: "pointer",
                            }}
                          ></label>
                          <AddPhotoAlternateIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ paddingBlock: 5, maxWidth: "666px" }}
        >
          <Button
            variant="contained"
            sx={{ maxWidth: "110px", width: "110px" }}
          >
            حفظ
          </Button>
        </Stack>
      </Wrapper>
    </>
  );
};

export default AddChannel;

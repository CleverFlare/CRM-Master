import {
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box } from "@mui/system";

const StatisticalCard = ({
  title = "عنوان",
  since = "منذ شهر",
  number = "0000",
  percentage,
  profit,
  loss = 0,
  bars,
}) => {
  return (
    <Paper
      sx={{
        boxShadow: "0px 3px 10px -1px rgb(35 57 117)",
        bgcolor: (theme) => theme.palette.primary.main,
        width: "280px",
        color: "white",
      }}
      elevation={3}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingInline: 2, paddingBlock: 1 }}
      >
        <Typography>{title}</Typography>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, .5)" }}>
          {since}
        </Typography>
      </Stack>
      <Divider light />
      <Stack sx={{ p: 2, minHeight: "70px" }}>
        <Box
          sx={{ direction: "rtl", display: "flex", gap: "40px", flex: ".4" }}
        >
          {number && (
            <Typography variant="h5">
              {number.replace(/(\d\d)(\d\d\d)/gi, "$1,$2")}
            </Typography>
          )}
          {profit ? (
            <Typography variant="body2" sx={{ color: "yellowgreen" }}>
              +{profit}%
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: "red" }}>
              -{loss}%
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", flex: "4" }}>
          {bars ? (
            <Stack
              direction="row"
              sx={{ flex: "1", width: "100%" }}
              alignItems="flex-end"
              spacing={1}
            >
              {bars.map((bar, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    bgcolor: "#0093ee",
                    borderRadius: "100vmax",
                    height: `${bar * 20}%`,
                  }}
                ></Box>
              ))}
            </Stack>
          ) : (
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                width: "100%",
                marginTop: "5px",
                bgcolor: "white",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#0093ee",
                },
              }}
            />
          )}
        </Box>
      </Stack>
      <Divider light />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingInline: 2, cursor: "pointer" }}
      >
        <Typography variant="body2">عرض التحليلات كاملة</Typography>
        <IconButton sx={{ color: "white" }}>
          <MoreHorizIcon sx={{ color: "white" }} />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default StatisticalCard;

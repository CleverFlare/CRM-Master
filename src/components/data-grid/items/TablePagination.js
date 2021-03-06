import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";

const TablePagination = ({
  max,
  page,
  setPage,
  current = "1",
  onNext = () => {},
  onPrev = () => {},
  onInput = () => {},
}) => {
  const [disableRight, setDisableRight] = useState(false);
  const [disableLeft, setDisableLeft] = useState(false);
  // const handleChange = (event) => {
  //   setPage(event.target.value);
  // };

  // const handleIncrease = () => {
  //   setPage((prev) => prev + 1);
  // };

  // const handleDecrease = () => {
  //   setPage((prev) => prev - 1);
  // };

  // useEffect(() => {
  //   if (page < 1) setPage(1);
  //   if (page > max) setPage(max);
  // }, [page]);

  useEffect(() => {
    if (current <= 1) {
      setDisableLeft(true);
    } else {
      setDisableLeft(false);
    }

    if (current >= max) {
      setDisableRight(true);
    } else {
      setDisableRight(false);
    }

    if (isNaN(max)) {
      max = 1;
    }
  }, [max, current]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      spacing={1}
      sx={{ direction: "ltr" }}
    >
      <IconButton
        onClick={onNext}
        disabled={disableRight}
        sx={{
          "&.Mui-disabled": {
            opacity: ".2",
          },
        }}
      >
        <ArrowForwardIosIcon
          sx={{ width: "15px", height: "15px" }}
          color="primary"
        />
      </IconButton>
      <Typography variant="caption" sx={{ fontWeight: "bold" }} color="primary">
        {max}
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: "bold" }} color="primary">
        من
      </Typography>
      <Box sx={{ color: "primary" }}>
        <input
          type="number"
          className="disable-number-controllers"
          value={current}
          onInput={onInput}
          style={{
            width: 20,
            height: 20,
            textAlign: "center",
            fontWeight: "bold",
            outline: "none",
            color: "#233975",
            direction: "ltr",
          }}
        />
      </Box>
      <IconButton
        onClick={onPrev}
        disabled={disableLeft}
        sx={{
          "&.Mui-disabled": {
            opacity: ".2",
          },
        }}
      >
        <ArrowBackIosNewIcon
          sx={{ width: "15px", height: "15px" }}
          color="primary"
        />
      </IconButton>
    </Stack>
  );
};

export default TablePagination;

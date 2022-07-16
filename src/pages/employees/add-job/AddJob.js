import { Stack, Paper, TextField, useMediaQuery, Button } from "@mui/material";
import { useState } from "react";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AddJob = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    name: "",
  });
  const [proceed, setProceed] = useState(false);

  const handleCheckForErrors = () => {
    setErrors({
      name: "",
    });
    if (!name) {
      setErrors((oldObject) => ({ ...oldObject, name: "هذا الحقل إلزامي" }));
    } else {
      setProceed(true);
    }
    return;
  };

  const handleSubmit = () => {
    handleCheckForErrors();
  };

  useEffect(() => {
    if (proceed) {
      fetch(domain + "aqar/api/router/Job/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          //prettier-ignore
          "Authorization": "Token " + token,
        },
      })
        .then((res) => {
          setName("");
          if (!res.ok) throw Error("couldn't set the job for some reason");

          return res.json();
        })
        .then((json) => {
          console.log(json);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [proceed]);
  return (
    <Wrapper>
      <Parameter links={[{ text: "الموظفين" }, { text: "إضافة وظيفة" }]} />
      <Stack
        sx={{
          maxWidth: "766px",
        }}
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Paper
          sx={{
            padding: sm ? 2 : 0,
            width: "100%",
            boxSizing: "border-box",
            boxShadow: sm ? "inherit" : "none",
          }}
        >
          <TextField
            variant="standard"
            label="الوظيفة"
            placeholder="الوظيفة"
            sx={{
              width: "100%",
              maxWidth: 600,
            }}
            error={Boolean(errors?.name)}
            helperText={errors?.name}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Paper>
        <Button
          variant="contained"
          sx={{ maxWidth: 150, width: "100%", height: 45 }}
          onClick={handleSubmit}
        >
          حفظ
        </Button>
      </Stack>
    </Wrapper>
  );
};

export default AddJob;

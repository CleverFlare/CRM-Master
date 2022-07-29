import {
  Paper,
  useMediaQuery,
  Stack,
  Typography,
  Divider,
  TextField,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  InputAdornment,
  IconButton,
  Input,
  FormControlLabel,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import useControls from "../../../hooks/useControls";
import usePost from "../../../hooks/usePost";
import useValidate from "../../../hooks/useValidate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import { useRef } from "react";
import NumberFormat from "react-number-format";

const UnitsAddNew = () => {
  const sm = useMediaQuery("(max-width:912px)");
  const fileInputRef = useRef();
  const [errors, setErrors] = useState();
  const [postRequest, successAlert, errorAlert, isPending] = usePost(
    "aqar/api/router/Unit/",
    "تم إضافة وحدة بنجاح!"
  );
  const validate = useValidate();
  const [controls, setControl, resetControls] = useControls({
    district: "",
    address: "",
    type: "",
    floor: "",
    area: "",
    rooms: "",
    bathroom: "",
    genre: "",
    price: "",
    client: "",
    notes: "",
    pictures: {},
  });

  const handleSubmit = () => {
    validate([
      {
        name: "district",
        value: controls.district,
        isRequired: true,
      },
      {
        name: "address",
        value: controls.address,
        isRequired: true,
      },
      {
        name: "type",
        value: controls.type,
        isRequired: true,
      },
      {
        name: "floor",
        value: controls.floor,
        isRequired: true,
      },
      {
        name: "area",
        value: controls.area,
        isRequired: true,
        validation: [
          {
            regex: /(?<=^\d\d\d)\.(?=\d)|^\d\d\d$/gi,
            value: "تأكد انه يوجد ثلاث ارقم فقط قبل العلامة العشرية",
          },
        ],
      },
      {
        name: "rooms",
        value: controls.rooms,
        isRequired: true,
      },
      {
        name: "bathrooms",
        value: controls.bathrooms,
        isRequired: true,
      },
      {
        name: "genre",
        value: controls.genre,
        isRequired: true,
      },
      {
        name: "price",
        value: controls.price,
        isRequired: true,
      },
      {
        name: "client",
        value: controls.client,
        isRequired: true,
      },
      {
        name: "notes",
        value: controls.notes,
        isRequired: true,
      },
      {
        name: "pictures",
        value: Object.keys(controls.pictures)
          .map((picture) => controls.pictures[picture].name)
          .join(""),
        isRequired: true,
      },
    ]).then((output) => {
      setErrors(output?.errors);
      console.log(output?.errors);
      if (!output?.ok) return;
      const formData = new FormData();
      formData.append("address", controls?.address);
      formData.append("area", controls?.district);
      Object.keys(controls?.pictures).map((picture) => {
        formData.append("image", controls?.pictures[picture]);
      });
      formData.append("unit_number", controls?.floor);
      formData.append("room_number", controls?.rooms);
      formData.append("bath_count", controls?.bathrooms);
      formData.append("bath_count", controls?.bathrooms);
      formData.append("price", controls?.price.replace(",", ""));
      formData.append("comment", controls?.notes);
      formData.append("unit_type", controls?.type);
      formData.append("area_size", controls?.area.replace(" متر", ""));
      formData.append("complete_type", controls?.genre);
      formData.append("client", controls?.client);
      postRequest(formData, false).then((res) => {
        if (!res) return;
        resetControls();
      });
    });
  };

  return (
    <Wrapper>
      <Parameter links={[{ text: "الوحدات" }, { text: "إضافة وحدة" }]} />
      <Paper>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            setControl("pictures", e.target.files);
          }}
        />
        <Stack sx={{ padding: 2, bgcolor: "#f8f8f9" }}>
          <Typography sx={{ fontWeight: "bold" }}>مرحبا بك!</Typography>
          <Typography>الرجاء ملئ المعلومات الآتية لاضافة وحدة جديدة</Typography>
        </Stack>
        <Divider orientation="horizontal" />
        <Stack direction="column" spacing={sm ? 2 : 5} sx={{ padding: 2 }}>
          <Stack
            direction={sm ? "column" : "row"}
            justifyContent="space-between"
            spacing={sm ? 2 : 1}
          >
            <TextField
              variant="standard"
              label="المنطقة"
              placeholder="المنطقة"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              fullWidth={sm}
              onChange={({ target: { value } }) =>
                setControl("district", value)
              }
              value={controls.district}
              error={Boolean(errors?.district)}
              helperText={errors?.district}
            />
            <TextField
              variant="standard"
              label="العنوان"
              placeholder="العنوان"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.address}
              onChange={(event) => setControl("address", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.address)}
              helperText={errors?.address}
            />
            <TextField
              variant="standard"
              label="نوع الوحدة"
              placeholder="نوع الوحدة"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.type}
              onChange={(event) => setControl("type", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.type)}
              helperText={errors?.type}
            />
          </Stack>
          <Stack
            direction={sm ? "column" : "row"}
            justifyContent="space-between"
            spacing={sm ? 2 : 1}
          >
            <NumberFormat
              customInput={TextField}
              variant="standard"
              label="الدور"
              placeholder="الدور"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.floor}
              onChange={(event) => setControl("floor", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.floor)}
              helperText={errors?.floor}
            />
            <NumberFormat
              customInput={TextField}
              suffix=" متر"
              decimalSeparator="."
              decimalScale={3}
              variant="standard"
              label="المساحة"
              placeholder="المساحة"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.area}
              onChange={(event) => setControl("area", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.area)}
              helperText={errors?.area}
            />
            <NumberFormat
              customInput={TextField}
              variant="standard"
              label="عدد الغرف"
              placeholder="عدد الغرف"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.rooms}
              onChange={(event) => setControl("rooms", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.rooms)}
              helperText={errors?.rooms}
            />
          </Stack>
          <Stack
            direction={sm ? "column" : "row"}
            justifyContent="space-between"
            spacing={sm ? 2 : 1}
          >
            <NumberFormat
              customInput={TextField}
              variant="standard"
              label="عدد الحمامات"
              placeholder="عدد الحمامات"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.bathrooms}
              onChange={(event) => setControl("bathrooms", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.bathrooms)}
              helperText={errors?.bathrooms}
            />
            <TextField
              variant="standard"
              label="نوع التشطيب"
              placeholder="نوع التشطيب"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.genre}
              onChange={(event) => setControl("genre", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.genre)}
              helperText={errors?.genre}
            />
            <NumberFormat
              customInput={TextField}
              thousandSeparator
              variant="standard"
              label="السعر"
              placeholder="السعر"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.price}
              onChange={(event) => setControl("price", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.price)}
              helperText={errors?.price}
            />
          </Stack>
          <Stack
            direction={sm ? "column" : "row"}
            justifyContent="space-between"
            spacing={sm ? 2 : 1}
          >
            <TextField
              variant="standard"
              label="اسم العميل"
              placeholder="اسم العميل"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.client}
              onChange={(event) => setControl("client", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.client)}
              helperText={errors?.client}
            />
            <TextField
              variant="standard"
              label="ملاحظات"
              placeholder="ملاحظات"
              sx={{
                width: sm ? "100%" : "400px",
              }}
              value={controls.notes}
              onChange={(event) => setControl("notes", event.target.value)}
              fullWidth={sm}
              error={Boolean(errors?.notes)}
              helperText={errors?.notes}
            />
            <TextField
              variant="standard"
              label="صور"
              placeholder="صور"
              sx={{
                width: sm ? "100%" : "400px",
                "& .MuiInputBase-input": {
                  cursor: "pointer",
                },
              }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={(e) => fileInputRef.current.click()}>
                      <AddPhotoAlternateIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={Object.keys(controls.pictures)
                .map((picture) => controls.pictures[picture]?.name)
                .join(" - ")}
              fullWidth={sm}
              error={Boolean(errors?.price)}
              helperText={errors?.price}
            />
          </Stack>
        </Stack>
        {successAlert}
        {errorAlert}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ padding: 2, bgcolor: "#fffaf3" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isPending}
          >
            حفظ
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => resetControls()}
            disabled={isPending}
          >
            الغاء
          </Button>
        </Stack>
      </Paper>
    </Wrapper>
  );
};

export default UnitsAddNew;

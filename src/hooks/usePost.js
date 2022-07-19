import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGet from "./useGet";

const usePost = (
  path,
  successMessage = "sent successfully!",
  onSuccess = () => {}
) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.requestInfo.value.token);
  const host = useSelector(
    ({ requestInfo }) =>
      requestInfo.value.protocol +
      "://" +
      (requestInfo.value.subDomain ? requestInfo.value.subDomain + "." : "") +
      requestInfo.value.domain +
      "." +
      requestInfo.value.topLevelDomain +
      "/" +
      path
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [syncDataRequest, syncDataRequestError] = useGet(path);

  const request = async (requestBody, requestName) =>
    axios
      .post(host, JSON.stringify(requestBody), {
        headers: {
          "Content-type": "application/json",
          //prettier-ignore
          "Authorization": "Token " + token,
        },
      })
      .then((res) => {
        setSuccess(true);
        onSuccess();
        if (requestName === null) {
          console.error(
            'you didn\'t provide the "requestName" to sync get data'
          );
        } else {
          syncDataRequest().then((res) => {
            console.log(res);
            dispatch({ type: requestName + "/set", payload: res });
          });
        }
        // syncDataRequest();
        return res.data;
      })
      .catch((err) => {
        setError(err.message);
        return null;
      });

  return [
    request,
    <Snackbar
      open={Boolean(error)}
      autoHideDuration={1000}
      onClose={() => setError("")}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert severity="error" variant="filled" onClose={() => setError("")}>
        {error && error}
      </Alert>
    </Snackbar>,
    <Snackbar
      open={success}
      autoHideDuration={1000}
      onClose={() => setSuccess(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        severity="success"
        variant="filled"
        onClose={() => setSuccess(false)}
      >
        {successMessage && successMessage}
      </Alert>
    </Snackbar>,
  ];
};

export default usePost;

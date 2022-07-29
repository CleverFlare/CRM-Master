import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGet from "./useGet";

const usePost = (
  path,
  successMessage = "تم الإرسال بنجاح!",
  onSuccess = () => {}
) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
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
  const [isPending, setIsPending] = useState(false);
  const [syncDataRequest, syncDataRequestError] = useGet(path);

  const request = async (requestBody, json = true, requestName) => {
    setIsPending(true);
    const headers = json
      ? {
          "Content-type": "application/json",
          //prettier-ignore
          "Authorization": "Token " + token,
        }
      : {
          //prettier-ignore
          "Authorization": "Token " + token,
        };
    return axios
      .post(host, json ? JSON.stringify(requestBody) : requestBody, {
        headers,
      })
      .then((res) => {
        setIsPending(false);
        setSuccess(true);
        onSuccess();
        if (requestName === null) {
          console.info(
            'you didn\'t provide the "requestName" to sync get data'
          );
        } else if (Array.isArray(requestName)) {
          requestName.forEach((item) => {
            syncDataRequest(item.path).then((res) => {
              dispatch({ type: item.name + "/set", payload: res.results });
            });
          });
        } else {
          syncDataRequest().then((res) => {
            dispatch({ type: requestName + "/set", payload: res.results });
          });
        }
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        if (err.response.status === 400) {
          setError(err.response.data[Object.keys(err.response.data)[0]]);
        } else {
          setError(err.message);
        }
        return null;
      });
  };

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
    isPending,
  ];
};

export default usePost;

import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const useGet = (path) => {
  const token = useSelector((state) => state.token.value);
  const host = useSelector(
    ({ requestInfo }) =>
      requestInfo.value.protocol +
      "://" +
      (requestInfo.value.subDomain ? requestInfo.value.subDomain + "." : "") +
      requestInfo.value.domain +
      "." +
      requestInfo.value.topLevelDomain +
      "/"
  );
  const [error, setError] = useState(null);

  const request = async (customPath = null) =>
    axios
      .get(host + (customPath ? customPath : path), {
        headers: {
          //prettier-ignore
          "Authorization": "Token " + token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        setError(err.message);
        return null;
      });

  return [request, error];
};

export default useGet;

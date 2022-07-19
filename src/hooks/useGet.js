import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const useGet = (path) => {
  const [output, setOputput] = useState(null);
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

  const request = async () =>
    axios
      .get(host, {
        headers: {
          //prettier-ignore
          "Authorization": "Token " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        setError(err.message);
        return null;
      });

  return [request, error];
};

export default useGet;

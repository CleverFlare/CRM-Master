import { useEffect, useState } from "react";

const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token" + " " + token,
      },
    })
      .then((data) => {
        if (!data.ok) throw Error("couldn't fetch the data for that resource");

        return data.json();
      })
      .then((json) => {
        setData(json);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

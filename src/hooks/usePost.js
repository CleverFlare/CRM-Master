import { useEffect, useState } from "react";

const usePost = (method, token, data) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: method ? method : "POST",
      headers: {
        "Content-type": "application/json",
        //prettier-ignore
        "Authorization": "Token" + " " + token,
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.ok) throw Error("couldn't fetch the data for that resource");

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
};

export default usePost;

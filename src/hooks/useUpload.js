import { useEffect } from "react";
import { useState } from "react";

const useUpload = (url, data) => {
  const [response, setResponse] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const formData = new FormData();
    Object.keys(data).map((key, index) => formData.append(`${key}`, data.key));
    const xhr = new XMLHttpRequest();

    req.open("POST", url);

    req.upload.addEventListener("progress", (e) => {
      const percentComplete = (e.load / e.total) * 100;

      setProgress(Math.round(percentComplete));
    });

    req.addEventListener("load", (e) => {
      console.log(e.status);
      console.log(e.response);
    });

    req.send(formData);
  });
};

export default useUpload;

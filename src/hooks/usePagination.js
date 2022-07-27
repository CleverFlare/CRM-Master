import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGet from "./useGet";

const usePagination = (path, { storeValuesToDispatch = "" }) => {
  const [currentPage, setCurrent] = useState(1);

  const [isPending, setIsPending] = useState(true);

  const [limitPage, setLimit] = useState(null);

  const dispatch = useDispatch();

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
  const [getLimit, getLimitError] = useGet(path);
  const [nextPageGetRequest, nextPageGetRequestError] = useGet(
    path + "?page=" + (currentPage + 1)
  );
  const [prevPageGetRequest, prevPageGetRequestError] = useGet(
    path + "?page=" + (currentPage - 1)
  );

  useEffect(() => {
    getLimit().then((res) => {
      setIsPending(false);
      setLimit(Math.ceil(res.count / res.results.length));
    });
  }, []);

  const onNext = async () => {
    if (currentPage + 1 > limitPage) return;
    setIsPending(true);
    setCurrent((old) => old + 1);
    nextPageGetRequest().then((res) => {
      dispatch({ type: storeValuesToDispatch + "/set", payload: res.results });
      setIsPending(false);
    });
  };

  const onPrev = async () => {
    if (currentPage - 1 <= 0) return;
    setIsPending(true);
    setCurrent((old) => old - 1);
    prevPageGetRequest().then((res) => {
      dispatch({ type: storeValuesToDispatch + "/set", payload: res.results });
      setIsPending(false);
    });
  };
  return [currentPage, limitPage, isPending, onNext, onPrev];
};

export default usePagination;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGet from "./useGet";

const usePagination = (path, { storeValuesToDispatch = "" }, setter) => {
  const [currentPage, setCurrent] = useState(1);

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

  getLimit().then((res) => setLimit(Math.ceil(res.count / 8)));

  const onNext = async () => {
    if (currentPage + 1 > limitPage) return;
    return nextPageGetRequest().then((res) => {
      if (currentPage + 1 > limitPage) return;
      console.log(!Boolean(res.next));
      if (Boolean(res.next)) {
        //null == return false
        setCurrent((old) => old + 1);
      }
      // if (Boolean(storeValuesToDispatch))
      //   dispatch({
      //     type: storeValuesToDispatch + "/set",
      //     payload: res.results,
      //   });
      setter([...res.results]);
    });
  };

  const onPrev = async () => {
    if (currentPage - 1 <= 0) return;
    return prevPageGetRequest().then((res) => {
      if (currentPage - 1 <= 0) return;
      console.log(!Boolean(res.previous));
      if (!Boolean(res.previous)) {
        setCurrent((old) => old - 1);
      }
      // if (Boolean(storeValuesToDispatch))
      // switch (Boolean(setter)) {
      //   case true:
      //     break;
      //   case false:
      //     dispatch({
      //       type: storeValuesToDispatch + "/set",
      //       payload: res.results,
      //     });
      //     break;
      // }
      setter([...res.results]);
    });
  };
  return [currentPage, limitPage, onNext, onPrev];
};

export default usePagination;

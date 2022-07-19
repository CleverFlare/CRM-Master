import { useCallback, useEffect } from "react";
import { useState } from "react";

const useControls = (operands) => {
  const [controls, setControls] = useState({ ...operands });

  const handleSetControl = useCallback(
    (key, value) => {
      setControls({ ...controls, [key]: value });
    },
    [controls]
  );

  const handleReset = useCallback(() => {
    setControls({ ...operands });
  }, [controls]);

  return [controls, handleSetControl, handleReset];
};

export default useControls;

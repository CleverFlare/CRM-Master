import { useState } from "react";

const useControls = (operands) => {
  const [controls, setControls] = useState(operands);

  const handleSetControls = (key, value) => {
    setControls((old) => ({ ...old, [key]: value }));
  };

  const handleReset = () => {
    setControls(operands);
  };

  return [controls, handleSetControls, handleReset];
};

export default useControls;

import { useState } from "react";

export const useReports = () => {
  const [indexStatus, setIndexStatus] = useState('');

  return { indexStatus, setIndexStatus };
};

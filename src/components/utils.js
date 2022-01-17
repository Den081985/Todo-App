import React, { useEffect, useRef } from "react";

//функция для работы с предыдущими состояниями
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

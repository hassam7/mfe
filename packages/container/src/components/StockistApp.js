import React, { useRef, useEffect } from "react";
import { mount } from "stockist/Stockist";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount();
  }, []);

  return <app-root ref={ref}></app-root>;
};

"use client";
import React, { PropsWithChildren } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

const Lenis = ({ children }: PropsWithChildren) => {
  return (
    <ReactLenis root options={{ duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
};

export default Lenis;

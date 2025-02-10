"use client";

import dynamic from "next/dynamic";

const Success = dynamic(() => import("@/app/Components/cart/success"), {
  ssr: false,
});

export default function User() {
  return (
    <>
      <Success />
    </>
  );
}

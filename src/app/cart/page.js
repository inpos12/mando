"use client";

import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/app/Components/cart/cart"), {
  ssr: false,
});

export default function User() {
  return (
    <>
      <Cart />
    </>
  );
}

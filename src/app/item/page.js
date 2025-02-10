"use client";
import dynamic from "next/dynamic";

const Item = dynamic(() => import("@/app/Components/Item/item"), {
  ssr: false,
});

export default function Item_Page() {
  return (
    <>
      <Item />
    </>
  );
}

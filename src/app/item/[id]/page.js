"use client";
import dynamic from "next/dynamic";

const ItemDetail = dynamic(() => import("@/app/Components/Item/itemdetail"), {
  ssr: false,
});

export default function Item_Page() {
  return (
    <>
      <ItemDetail />
    </>
  );
}

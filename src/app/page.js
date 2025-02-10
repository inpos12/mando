"use client";
import dynamic from "next/dynamic";

// 홈 컴포넌트를 동적으로 불러오기
const HomeComponent = dynamic(() => import("@/app/Components/home"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HomeComponent />
    </>
  );
}

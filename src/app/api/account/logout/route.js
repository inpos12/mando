// app/api/logout/route.js

import { NextResponse } from "next/server";
export async function POST() {
  // 쿠키에서 'token'을 삭제합니다.
  const response = NextResponse.json({ message: "로그아웃 성공" });

  // 쿠키에서 'token'을 삭제
  response.cookies.delete("token", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 HTTPS
    sameSite: "Strict",
    expires: new Date(0), // 쿠키 만료 시간을 과거로 설정하여 즉시 삭제
  });

  return response;
}

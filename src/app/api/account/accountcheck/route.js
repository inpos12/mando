import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    if (token) {
      jwt.verify(token.value, process.env.JWT_SECRET);
      return NextResponse.json(
        {
          message: "로그인 상태입니다.",
          cart: "/cart",
          user: "/user",
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err.name);
    if (err.name === "TokenExpiredError") {
      return NextResponse.json(
        { messageErr: "세션이 만료되었습니다." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "알 수 없는 서버 에러" },
      { status: 500 }
    );
  }
}

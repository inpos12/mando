import client from "@/config/dbconfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getCollection } from "@/modules/dbService";
export async function POST(req) {
  try {
    const { id, password } = await req.json();
    await client.connect();
    if (!id) {
      return NextResponse.json(
        { message1: "아이디 빈칸인지 확인" },
        { status: 201 }
      );
    } else if (!password) {
      return NextResponse.json(
        { message1: "비밀번호 빈칸인지 확인" },
        { status: 201 }
      );
    } else if (!id && !password) {
      return NextResponse.json(
        { message1: "아이디 비밀번호 빈칸인지 확인" },
        { status: 201 }
      );
    }

    const collection = await getCollection("account");
    const result = await collection.find({ id: { $eq: id } }).toArray();
    if (result.length === 0) {
      return NextResponse.json(
        { message2: "아이디,비밀번호를 확인해주세요" },
        { status: 202 }
      );
    }
    const hashPassword = result[0].hashPassword;
    const isMatch = await bcrypt.compare(password, hashPassword);

    if (!isMatch) {
      return NextResponse.json(
        { message3: "아이디,비밀번호를 확인해주세요" },
        { status: 203 }
      );
    }
    if (isMatch) {
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign(
        { userId: result[0]._id.toString() }, // ObjectId를 문자열로 변환
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "30m",
        }
      );

      const response = NextResponse.json(
        { message: "로그인성공" },
        {
          status: 200,
        }
      );
      response.cookies.set("token", token, {
        httpOnly: true, // 자바스크립트에서 쿠키에 접근할 수 없도록 설정
        // secure: process.env.NODE_ENV === "production", // HTTPS에서만 전송
        secure: false,
        maxAge: 30 * 60 * 1000,
        // maxAge: 10 * 60 * 1000, // 쿠키 만료 시간 (10분)
        path: "/", // 모든 경로에서 쿠키가 유효하도록 설정
        sameSite: "Strict", // CSRF 공격 방지를 위한 SameSite 설정
      });
      return response;
    }
  } catch (err) {
    return NextResponse.json(
      { message: "알수없는 서버 에러" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

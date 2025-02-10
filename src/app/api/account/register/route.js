import client from "@/config/dbconfig";
import { getCollection } from "@/modules/dbService";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id, password, phone, name } = await req.json();
    console.log(phone);
    if (!id || !password) {
      return NextResponse.json(
        { message: "아이디 ,빈칸확인" },
        { status: 203 }
      );
    } else if (!id && !password && !phone) {
      return NextResponse.json(
        { message: "비밀번호 빈칸 확인" },
        { status: 203 }
      );
    }
    const collection = await getCollection("account");
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);
    if (id && password && phone) {
      await collection.insertOne({ name, id, hashPassword, phone });
      return NextResponse.json({ message: "회원가입 성공" }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "알수없는 오류발생" }, { status: 500 });
  } finally {
    await client.close();
  }
}

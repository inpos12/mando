import client from "@/config/dbconfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCollection } from "@/modules/dbService";
import { tokenUserIds } from "@/services/authService";

export async function POST(req) {
  try {
    const token = await req.cookies.get("token");
    const { password } = await req.json();
    if (token) {
      const collection = await getCollection("account");
      const UserId = await tokenUserIds(token.value);

      const result = await collection
        .find(
          { _id: { $eq: UserId } },
          { projection: { id: 1, hashPassword: 1, _id: 0 } }
        )
        .toArray();
      const isMatch = await bcrypt.compare(password, result[0].hashPassword);
      if (!isMatch) {
        return NextResponse.json(
          { successErr: "비밀번호 틀림" },
          { status: 201 }
        );
      }
      if (isMatch) {
        return NextResponse.json(
          { success: "성공", href: "/user/information" },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    return NextResponse.json({ messageErr: "알수없는에러" }, { status: 500 });
  } finally {
    await client.close();
  }
}

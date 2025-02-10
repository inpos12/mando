import client from "@/config/dbconfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { getCollection } from "@/modules/dbService";
import { tokenUserIds } from "@/services/authService";

export async function GET(req) {
  try {
    const token = await req.cookies.get("token");
    if (token) {
      const collection = await getCollection("account");
      const UserId = await tokenUserIds(token.value);
      const result = await collection
        .find(
          { _id: { $eq: UserId } },
          { projection: { name: 1, id: 1, phone: 1, hashPassword: 1 } }
        )
        .toArray();
      return NextResponse.json(
        {
          success: "성공",
          userName: result[0].name,
          userId: result[0].id,
          userPhone: result[0].phone,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ messageErr: "알수없는에러" }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function PUT(req) {
  try {
    const token = await req.cookies.get("token");
    const { password, newpassword, newcheackpassword } = await req.json();
    if (token) {
      const collection = await getCollection("account");
      const UserId = await tokenUserIds(token.value);
      const resultfind = await collection
        .find({ _id: UserId }, { hashPassword: 1 })
        .toArray();
      const currenthashPassword = resultfind[0].hashPassword;
      const isMatch = await bcrypt.compare(password, currenthashPassword);
      if (!isMatch) {
        return NextResponse.json(
          { message: "현재 비밀번호가 일치하는지 확인해주세요" },
          { status: 201 }
        );
      }
      if (newpassword !== newcheackpassword) {
        return NextResponse.json(
          { message: "새 비밀번호와 새 비밀번호 확인이 동일해야 합니다" },
          { status: 202 }
        );
      }
      if (!newpassword || !newcheackpassword) {
        return NextResponse.json(
          { message: "비밀번호를 입력해주세요" },
          { status: 203 }
        );
      }
      if (isMatch && newpassword === newcheackpassword) {
        const saltRound = 12;
        const salt = await bcrypt.genSalt(saltRound);
        const hashPassword = await bcrypt.hash(newcheackpassword, salt); // 새비밀번호를 해싱
        await collection.updateOne(
          { _id: { $eq: UserId } },
          { $set: { hashPassword } }
        ); // 비밀번호가맞을시 데이터에 비밀번호 업데이트
        return NextResponse.json(
          { message: "비밀번호가 변경되었습니다." },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    return NextResponse.json({ messageErr: "알수없는에러" }, { status: 500 });
  }
}

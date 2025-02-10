import client from "@/config/dbconfig";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getCollection } from "@/modules/dbService";
import { tokenUserIds } from "@/services/authService";

export async function POST(req) {
  const token = req.cookies.get("token"); // 쿠키에서 토큰 가져오기
  const { id } = await req.json(); // 요청 본문에서 아이템 id 추출
  const ItemId = ObjectId.createFromHexString(id);

  try {
    if (token) {
      const collection = await getCollection("account");
      const UserIds = await tokenUserIds(token.value);
      await collection.updateOne(
        { _id: UserIds }, // userId가 _id인 문서 찾기
        { $push: { items: ItemId } } // items 배열에 id 추가
      );
      return NextResponse.json({ message: "담기성공" }, { result: "200" });
    } else {
      return NextResponse.json(
        { message: "로그인을 해주세요" },
        { result: 404 }
      );
    }
  } catch (err) {
    console.log("addCart server Error", err);
  } finally {
    await client.close();
  }
}

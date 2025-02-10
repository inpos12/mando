import client from "@/config/dbconfig";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getCollection } from "@/modules/dbService";
import { tokenUserIds } from "@/services/authService";

export async function POST(req) {
  try {
    const token = await req.cookies.get("token");
    if (token) {
      const { _ids } = await req.json();
      const collection = await getCollection("account");
      const UserId = await tokenUserIds(token.value);
      const ObjectIds = ObjectId.createFromHexString(_ids);
      await collection.updateOne(
        { _id: { $eq: UserId } }, // userId로 사용자 찾기
        { $pull: { items: { $in: [ObjectIds] } } } // items 배열에서 ObjectIds에 포함된 값만 삭제
      );
      return NextResponse.json({ message: "삭제완료" }, { status: 200 });
    }
  } catch (err) {
    console.log("deletecart server Error", err);
  } finally {
    await client.close();
  }
}

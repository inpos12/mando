import { NextResponse } from "next/server";
import axios from "axios";
import { getCollection } from "@/modules/dbService";
import { tokenUserIds } from "@/services/authService";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const url = "https://api.tosspayments.com/v1/payments/confirm";
    const { orderId, paymentKey, amount } = await req.json();
    const widgetSecretKey = process.env.WIDGET_SECRET_KEY;
    const encryptedSecretKey =
      "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");
    const headers = {
      Authorization: encryptedSecretKey,
    };

    const result = await axios.post(
      url,
      { orderId, paymentKey, amount },
      { headers }
    );

    if (result.data.status === "DONE") {
      return NextResponse.json({ message: "성공" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "결제 처리 실패" }, { status: 400 });
    }
  } catch (err) {
    console.error("Success server Error:", err.message);
    return NextResponse.json(
      { message: "결제 실패", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const token = await req.cookies.get("token");

  try {
    const collection = await getCollection("account");
    const userId = await tokenUserIds(token.value);
    await collection.updateOne(
      { _id: userId }, // 조건: _id가 userId와 일치하는 문서 찾기
      { $set: { items: [] } } // items 배열을 빈 배열로 설정하여 전체 삭제
    );
    return NextResponse.json({ message: "성공" }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}

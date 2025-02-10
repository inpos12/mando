import { NextResponse } from "next/server";
import { getCollection } from "@/modules/dbService";
import { tokenUserIds } from "@/services/authService";

let memorytotalPrice = {};

export async function POST(req) {
  try {
    const token = await req.cookies.get("token");
    const { count } = await req.json();
    if (!token) {
      return NextResponse.json(
        { messageErr: "Authentication required." },
        { status: 401 }
      );
    }

    if (token) {
      const collection = await getCollection("account");
      const UserId = await tokenUserIds(token.value);
      const result = await collection
        .find(
          { _id: { $eq: UserId } },
          { projection: { id: 1, items: 1, _id: 0 } }
        )
        .toArray();
      const collectionItems = await getCollection("item");
      const resultItems = await collectionItems
        .find({ _id: { $in: result[0]?.items } })
        .toArray();
      const price = resultItems.map((item) => item.price);
      const newPrice = price.map((price, index) => price * count[index]);
      const totalPrice = newPrice.reduce(
        (sum, currentValue) => sum + currentValue
      );

      return NextResponse.json(
        {
          message: "성공",
          resultItems,
          totalPrice,
          newPrice,
        },
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json({ messageErr: "알수없는에러" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const OrderIdRandomStr = Buffer.from(Math.random().toString())
      .toString("base64")
      .slice(0, 20);
    const successUrl = "/cart/success";
    const failUrl = "/fail";
    const customerEmail = "customer123@gmail.com";
    const customerName = "김토스";
    const customerMobilePhone = "01012341234";

    return NextResponse.json(
      {
        OrderIdRandomStr,
        successUrl,
        failUrl,
        customerEmail,
        customerName,
        customerMobilePhone,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("cart server Error ");
  }
}

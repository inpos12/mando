import client from "@/config/dbconfig";
import { getCollection } from "@/modules/dbService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collection = await getCollection("item");
    const result = await collection
      .find({}, { projection: { name: 1, price: 1, image: 1, id: 1, _id: 1 } })
      .toArray();
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

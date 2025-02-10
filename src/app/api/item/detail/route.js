import client from "@/config/dbconfig";
import { getCollection } from "@/modules/dbService";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();
    const object = ObjectId.createFromHexString(id);
    const collection = await getCollection("item");
    const result = await collection
      .find(
        { _id: { $eq: object } },
        { projection: { name: 1, price: 1, image: 1, _id: 0 } }
      )
      .toArray();
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: " Error " }, { status: 500 });
  }
}

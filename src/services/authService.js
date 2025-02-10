import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export function decodeToken(token, secret) {
  try {
    const decode = jwt.verify(token, secret);
    return decode.userId;
  } catch (error) {
    console.log("decode error");
  }
}

export function toObjectId(userId) {
  try {
    return ObjectId.createFromHexString(userId);
  } catch (error) {
    console.error("faile to ObjectId  error", error);
  }
}

export async function tokenUserIds(token, secret = process.env.JWT_SECRET) {
  const UserId = decodeToken(token, secret);
  if (!UserId) return null;
  return toObjectId(UserId);
}

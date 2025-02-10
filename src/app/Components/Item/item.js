"use client";
// https://ibb.co/QJ7jt08
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Item() {
  const [item, setItem] = useState([]); // item 상태 (초기값은 빈 배열)

  async function Item_list() {
    const PostApi = "/api/item/";
    try {
      const result = await axios.get(PostApi);

      if (result.status === 200) {
        setItem(result.data.result);
      }
      // 데이터가 잘 들어오면 상태 업데이트
    } catch (err) {}
  }

  useEffect(() => {
    Item_list(); // 페이지 로드 시 데이터 요청
  }, []);

  const base64 = "data:image/jpeg;base64,";
  const blurImg =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII=";

  return (
    <>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {item?.map((item, index) => (
          <Link key={index} href={`/item/${item._id}`}>
            <li>
              {item.name} - {item.price}
              <Image
                width={200} // 원본 이미지 크기
                height={200} // 원본 이미지 크기
                placeholder="blur" // 추가
                blurDataURL={base64 + blurImg} // 추가
                src={item.image}
                alt="itemImage"
              />
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

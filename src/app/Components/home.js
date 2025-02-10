"use client";
import Footer from "./common/footer";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MainContainer,
  HeroSection,
  HeroImage,
  HeroText,
  ProductSection,
  SectionTitle,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  TagContainer,
  Tag,
  ProductName,
  ProductPrice,
} from "./home.style";
import "@/app/Components/home.style.css";
import SlideImg1 from "@/public/image/1.jpg";

export default function Home() {
  const [item, setItem] = useState([]);
  const ItemListApi = "/api/item";
  async function ItemList() {
    try {
      const result = await axios.get(ItemListApi);
      if (result.status === 200) {
        setItem(result.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    ItemList();
  }, []);
  const base64 = "data:image/jpeg;base64,";
  const blurImg =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII=";

  return (
    <>
      <MainContainer>
        <HeroSection>
          <HeroImage
            src={SlideImg1}
            alt="메인 이미지"
            fill
            priority
            placeholder="blur"
            blurDataURL={base64 + blurImg}
          />
          <HeroText>수경 왕만두 본점 : 031-409-6989</HeroText>
        </HeroSection>

        <ProductSection>
          <SectionTitle>대표상품</SectionTitle>
          <ProductGrid>
            {item.map((item, index) => (
              <ProductCard key={index}>
                <Link href={`/item/${item._id}`}>
                  <ProductImage
                    width={264}
                    height={264}
                    src={item.image}
                    alt={item.name}
                    placeholder="blur"
                    blurDataURL={base64 + blurImg}
                  />
                  <ProductInfo>
                    <TagContainer>
                      <Tag>추천</Tag>
                      <Tag>히트</Tag>
                    </TagContainer>
                    <ProductName>{item.name}</ProductName>
                    <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
                  </ProductInfo>
                </Link>
              </ProductCard>
            ))}
          </ProductGrid>
        </ProductSection>
      </MainContainer>
    </>
  );
}

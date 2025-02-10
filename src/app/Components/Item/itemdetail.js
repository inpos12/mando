"use client";
import styled from "styled-components";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, H2, H3, Row } from "@/app/Components/common/common.style";
import Image from "next/image";
import { Button } from "@/app/Components/common/Login.style";
export default function Item_Detail() {
  const [data, setData] = useState();
  const params = useParams(); // URL에서 파라미터 추출
  const id = params.id;
  const DetailApi = `/api/item/detail/`;
  const breakpoints = {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
  };

  const ProductContainer = styled(Container)`
    min-height: 90vh;
    display: flex;
    align-items: center;
    background: #f8f9fa;
    padding: 40px 20px;

    @media (max-width: ${breakpoints.mobile}) {
      padding: 20px 10px;
    }
  `;

  const ProductCard = styled(Row)`
    background: white;
    border-radius: 20px;
    padding: 40px;
    gap: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    max-width: 1000px;
    margin: 0 auto;

    @media (max-width: ${breakpoints.tablet}) {
      flex-direction: column;
      padding: 20px;
      gap: 24px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 16px;
      gap: 16px;
    }
  `;

  const ImageWrapper = styled.div`
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    flex: 1;
    max-width: 500px;

    @media (max-width: ${breakpoints.tablet}) {
      width: 100%;
      max-width: 100%;
      aspect-ratio: 1;
    }

    img {
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  `;

  const ProductInfo = styled.div`
    background: #ffffff;
    max-width: 400px;
    width: 100%;
    padding: 32px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;

    @media (max-width: ${breakpoints.tablet}) {
      max-width: 100%;
      padding: 24px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 16px;
    }
  `;

  const ProductName = styled(H2)`
    font-size: 1.8rem;
    color: #2d3748;
    margin-bottom: 16px;
    font-weight: 700;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.5rem;
      margin-bottom: 12px;
    }
  `;

  const ProductPrice = styled(H3)`
    font-size: 1.5rem;
    color: #00b0ff;
    margin-bottom: 24px;
    font-weight: 600;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.3rem;
      margin-bottom: 16px;
    }
  `;

  const ProductDescription = styled.div`
    margin: 24px 0;

    @media (max-width: ${breakpoints.mobile}) {
      margin: 16px 0;
    }
  `;

  const DeliveryInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 24px;

    @media (max-width: ${breakpoints.mobile}) {
      padding: 8px 12px;
      margin-bottom: 16px;
    }
  `;

  const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: auto;

    @media (max-width: ${breakpoints.tablet}) {
      flex-direction: row;
      gap: 16px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
      gap: 8px;
    }
  `;

  const ActionButton = styled(Button)`
    padding: 16px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: ${breakpoints.tablet}) {
      flex: 1;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 14px;
      font-size: 0.95rem;
    }
  `;

  async function DetailFetch() {
    try {
      const result = await axios.post(DetailApi, { id });
      setData(result.data.result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      }
    }
  }

  async function AddToCart(e) {
    e.preventDefault();

    try {
      const addToCartApi = "/api/account/addcart/";
      const result = await axios.post(
        addToCartApi,
        { id },
        { withCredentials: true }
      );
      if (result.status === 200) {
        alert(result.data.message);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.messageErr);
      }
    }
  }

  async function AddToBuyCart(e) {
    e.preventDefault();

    try {
      const addToCartApi = "/api/account/addcart/";
      const result = await axios.post(
        addToCartApi,
        { id },
        { withCredentials: true }
      );
      if (result.status === 200) {
        window.location.href = "/cart";
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.messageErr);
      }
    }
  }

  useEffect(() => {
    DetailFetch();
  }, []);
  const base64 = "data:image/jpeg;base64,";
  const blurImg =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII=";
  return (
    <>
      <ProductContainer>
        {data?.map((data, index) => (
          <ProductCard key={index}>
            <ImageWrapper>
              <Image
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL={base64 + blurImg}
                src={data.image}
                alt={data.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </ImageWrapper>

            <ProductInfo>
              <ProductName>{data.name}</ProductName>
              <ProductPrice>{data.price.toLocaleString()}원</ProductPrice>

              <ProductDescription>
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.6",
                    fontSize: "0.95rem",
                  }}
                >
                  당일 제작
                </p>
              </ProductDescription>

              <DeliveryInfo>
                <span style={{ color: "#888" }}>배송비</span>
                <span style={{ fontWeight: "500" }}>무료배송</span>
              </DeliveryInfo>

              <ButtonGroup>
                <ActionButton type="button" onClick={AddToCart}>
                  장바구니 담기
                </ActionButton>
                <ActionButton type="button" onClick={AddToBuyCart}>
                  바로 구매하기
                </ActionButton>
              </ButtonGroup>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductContainer>
    </>
  );
}

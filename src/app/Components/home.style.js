import dynamic from "next/dynamic";
import styled from "styled-components";
import { Container, Ul, Li, P, H3, H2, H1 } from "./common/common.style";
const Image = dynamic(() => import("next/image"), { ssr: false }); // 서버 사이드 렌더링 비활성화
export const MainContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  }

  @media (max-width: 768px) {
    height: 40vh;
    min-height: 300px;
  }
`;

export const HeroImage = styled(Image)`
  object-fit: cover;
`;

export const HeroText = styled(H2)`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 90%;
  }
`;

export const ProductSection = styled(Container)`
  display: block;
  padding: 80px 20px;
  background: #f8f9fa;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

export const SectionTitle = styled(H1)`
  text-align: center;
  margin-bottom: 60px;
  font-size: 2.5rem;
  color: #b42432;
  font-weight: 700;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #b42432;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 40px;
  }
`;

export const ProductGrid = styled(Ul)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 16px;

  @media (max-width: 768px) {
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

export const ProductCard = styled(Li)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(180, 36, 50, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(180, 36, 50, 0.15);
  }
`;

export const ProductImage = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ProductInfo = styled.div`
  padding: 20px;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Tag = styled(P)`
  background: rgba(180, 36, 50, 0.1);
  color: #b42432;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const ProductName = styled(H3)`
  color: #333;
  margin-bottom: 8px;
  font-size: 1.1rem;
  transition: color 0.2s ease;

  ${ProductCard}:hover & {
    color: #b42432;
  }
`;

export const ProductPrice = styled(H2)`
  color: #b42432;
  font-weight: 600;
  font-size: 1.2rem;
`;

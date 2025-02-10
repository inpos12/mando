"use client";
import styled from "styled-components";

// Footer component
const FooterContainer = styled.footer`
  background: #2d2d2d;
  color: #ffffff;
  padding: 60px 0 40px;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 16px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #ffffff;
    position: relative;
    padding-bottom: 12px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: #b42432;
    }
  }

  p {
    color: #cccccc;
    margin-bottom: 12px;
    font-size: 0.9rem;
    transition: color 0.2s ease;
    cursor: pointer;

    &:hover {
      color: #ffffff;
    }
  }
`;
export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>수경 왕만두</h3>
          <p>경기도 안산시 상록구</p>
          <p>전화: 031-409-6989</p>
          <p>이메일: contact@example.com</p>
        </FooterSection>
        <FooterSection>
          <h3>영업시간</h3>
          <p>평일: 09:00 - 21:00</p>
          <p>주말: 10:00 - 20:00</p>
          <p>공휴일: 10:00 - 20:00</p>
        </FooterSection>
        <FooterSection>
          <h3>고객 서비스</h3>
          <p>주문 조회</p>
          <p>배송 안내</p>
          <p>자주 묻는 질문</p>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
}

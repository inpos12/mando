"use client";
import styled from "styled-components";
import { H3 } from "../common/common.style";
import { useEffect, useState } from "react";

export const DeletButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background-color: white;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #b42432;
    border-color: #b42432;
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;

export const TimeContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const TimeSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const TimeTitle = styled(H3)`
  margin-bottom: 16px;
  color: #333;
  font-weight: 600;

  @media (max-width: 768px) {
    margin-bottom: 12px;
    font-size: 1rem;
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

export const TimeButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: ${(props) => (props.$active ? "#b42432" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  border: 1px solid ${(props) => (props.$active ? "#b42432" : "#e0e0e0")};
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$active ? "#b42432" : "#f5f5f5")};
    border-color: #b42432;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

export const PaymentButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 1.1rem;
  background-color: #b42432;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;

  &:hover {
    background-color: #a01f2c;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 1rem;
  }
`;

export default function TimeSelect() {
  const [activeButton, setActiveButton] = useState(null);

  function handleButtonClick(id) {
    setActiveButton(id);
  }

  const morningTimes = [
    { id: "1", time: "09:00" },
    { id: "2", time: "10:00" },
    { id: "3", time: "11:00" },
    { id: "4", time: "12:00" },
  ];

  const afternoonTimes = [
    { id: "5", time: "13:00" },
    { id: "6", time: "14:00" },
    { id: "7", time: "15:00" },
    { id: "8", time: "16:00" },
    { id: "9", time: "17:00" },
    { id: "10", time: "18:00" },
    { id: "11", time: "19:00" },
    { id: "12", time: "20:00" },
  ];

  return (
    <TimeContainer>
      <TimeSection>
        <TimeTitle>오전</TimeTitle>
        <ButtonGrid>
          {morningTimes.map(({ id, time }) => (
            <TimeButton
              key={id}
              $active={activeButton === id}
              onClick={() => handleButtonClick(id)}
            >
              {time}
            </TimeButton>
          ))}
        </ButtonGrid>
      </TimeSection>

      <TimeSection>
        <TimeTitle>오후</TimeTitle>
        <ButtonGrid>
          {afternoonTimes.map(({ id, time }) => (
            <TimeButton
              key={id}
              $active={activeButton === id}
              onClick={() => handleButtonClick(id)}
            >
              {time}
            </TimeButton>
          ))}
        </ButtonGrid>
      </TimeSection>
    </TimeContainer>
  );
}

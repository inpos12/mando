"use client";
import styled from "styled-components";
import { H3 } from "../common/common.style";
import { useEffect, useState } from "react";

export const DeletButton = styled.button`
  margin-right: 29px;
`;

export const Button = styled.button`
  padding: 4px 14px;
  font-size: 18px;
  background-color: transparent;

  border: 1px solid black;
  border-radius: 10px;
  margin: 5px 0;
`;
export const PaymentButton = styled.button`
  font-size: 20px;
  width: 100%;
  background-color: #bf2023;
  border-radius: 10px;
  color: white;
  padding: 10px 0;
`;

export default function TimeSelect() {
  const [activeButton, setActiveButton] = useState(null); // 클릭된 버튼 ID 추적
  function handleButtonClick(id) {
    setActiveButton(id); // 클릭된 버튼 ID로 상태 업데이트
  }

  return (
    <>
      <H3 style={{ marginBottom: "10px" }}>오전</H3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          id="1"
          onClick={() => handleButtonClick("1")} // 클릭 시 해당 버튼 ID를 상태로 업데이트
          style={{
            backgroundColor: activeButton === "1" ? "#bf2023" : "transparent",
            color: activeButton === "1" ? "white" : "",
          }}
        >
          09:00
        </Button>
        <Button
          id="2"
          onClick={() => handleButtonClick("2")}
          style={{
            backgroundColor: activeButton === "2" ? "#bf2023" : "transparent",
            color: activeButton === "2" ? "white" : "",
          }}
        >
          10:00
        </Button>
        <Button
          id="3"
          onClick={() => handleButtonClick("3")}
          style={{
            backgroundColor: activeButton === "3" ? "#bf2023" : "transparent",
            color: activeButton === "3" ? "white" : "",
          }}
        >
          11:00
        </Button>
        <Button
          id="4"
          onClick={() => handleButtonClick("4")}
          style={{
            backgroundColor: activeButton === "4" ? "#bf2023" : "transparent",
            color: activeButton === "4" ? "white" : "",
          }}
        >
          12:00
        </Button>
      </div>
      <H3 style={{ margin: "10px 0" }}>오후</H3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Button
          id="5"
          onClick={() => handleButtonClick("5")} // 클릭 시 해당 버튼 ID를 상태로 업데이트
          style={{
            backgroundColor: activeButton === "5" ? "#bf2023" : "transparent", // 클릭된 버튼만 빨간색
            color: activeButton === "5" ? "white" : "",
          }}
        >
          01:00
        </Button>
        <Button
          id="6"
          onClick={() => handleButtonClick("6")}
          style={{
            backgroundColor: activeButton === "6" ? "#bf2023" : "transparent",
            color: activeButton === "6" ? "white" : "",
          }}
        >
          02:00
        </Button>
        <Button
          id="7"
          onClick={() => handleButtonClick("7")}
          style={{
            backgroundColor: activeButton === "7" ? "#bf2023" : "transparent",
            color: activeButton === "7" ? "white" : "",
          }}
        >
          03:00
        </Button>
        <Button
          id="8"
          onClick={() => handleButtonClick("8")}
          style={{
            backgroundColor: activeButton === "8" ? "#bf2023" : "transparent",
            color: activeButton === "8" ? "white" : "",
          }}
        >
          04:00
        </Button>
        <Button
          id="9"
          onClick={() => handleButtonClick("9")} // 클릭 시 해당 버튼 ID를 상태로 업데이트
          style={{
            backgroundColor: activeButton === "9" ? "#bf2023" : "transparent", // 클릭된 버튼만 빨간색
            color: activeButton === "9" ? "white" : "",
          }}
        >
          05:00
        </Button>
        <Button
          id="10"
          onClick={() => handleButtonClick("10")}
          style={{
            backgroundColor: activeButton === "10" ? "#bf2023" : "transparent",
            color: activeButton === "10" ? "white" : "",
          }}
        >
          06:00
        </Button>
        <Button
          id="11"
          onClick={() => handleButtonClick("11")}
          style={{
            backgroundColor: activeButton === "11" ? "#bf2023" : "transparent",
            color: activeButton === "11" ? "white" : "",
          }}
        >
          07:00
        </Button>
        <Button
          id="12"
          onClick={() => handleButtonClick("12")}
          style={{
            backgroundColor: activeButton === "12" ? "#bf2023" : "transparent",
            color: activeButton === "12" ? "white" : "",
          }}
        >
          08:00
        </Button>
      </div>
    </>
  );
}

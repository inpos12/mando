"use client";
import axios from "axios";
import "./toss.css";
import { useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";
export default function Success() {
  const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  const [data, setData] = useState({});

  useEffect(() => {
    // 컴포넌트가 마운트되면 데이터 설정
    if (orderId && paymentKey && amount) {
      setData({
        orderId: orderId,
        paymentKey: paymentKey,
        amount: amount,
      });
    }
  }, [paymentKey, orderId, amount]);

  const confirmLoadingSection = document.querySelector(".confirm-loading");
  const confirmSuccessSection = document.querySelector(".confirm-success");

  async function confirmPayment() {
    const url = "/api/account/cart/success";
    try {
      const result = await axios.post(url, { orderId, paymentKey, amount });
      if (result.status === 200) {
        confirmLoadingSection.style.display = "none";
        confirmSuccessSection.style.display = "flex";
        await axios.delete(url, {}, { withCredentials: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="wrapper w-100">
        <div className="flex-column align-center confirm-loading w-100 max-w-540">
          <div className="flex-column align-center">
            <img
              src="https://static.toss.im/lotties/loading-spot-apng.png"
              width="120"
              height="120"
            ></img>
            <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
            <h4 className="text-center description">
              결제 승인하고 완료해보세요.
            </h4>
          </div>
          <div className="w-100">
            <button
              onClick={confirmPayment}
              id="confirmPaymentButton"
              className="btn primary w-100"
            >
              결제 승인하기
            </button>
          </div>
        </div>
        <div className="flex-column align-center confirm-success w-100 max-w-540">
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            width="120"
            height="120"
          ></img>
          <h2 className="title">결제를 완료했어요</h2>
          <div className="response-section w-100">
            <div className="flex justify-between">
              <span className="response-label">결제 금액</span>
              <span className="response-text">{data.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">주문번호</span>
              <span className="response-text">{data.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">paymentKey</span>
              <span className="response-text">{data.paymentKey}</span>
            </div>
          </div>

          <div className="w-100 button-group">
            <div className="flex" style={{ gap: "16px" }}>
              <a
                className="btn w-100"
                href="https://developers.tosspayments.com/sandbox"
              >
                다시 테스트하기
              </a>
              <a
                className="btn w-100"
                href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
                target="_blank"
                rel="noreferrer noopener"
              >
                결제 연동 문서가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

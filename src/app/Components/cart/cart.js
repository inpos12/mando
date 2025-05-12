"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import TimeSelect, { DeletButton, PaymentButton } from "./cart.style";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

import {
  Container,
  H1,
  Row,
  Ul,
  Li,
  H3,
  P,
} from "@/app/Components/common/common.style";
import { useEffect, useState } from "react";
import { LoginFullContiner } from "../common/Login.style";
import styled from "styled-components";

const Image = dynamic(() => import("next/image"), { ssr: false });

const CartPageContainer = styled(Container)`
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const CartContent = styled(Row)`
  max-width: 1220px;
  margin: 0 auto;
  background: #f6f6f6;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CartItemsSection = styled(Ul)`
  display: block;
  width: 65%;
  padding: 24px;
  background: #f7f7f7;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const CartHeader = styled(Li)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    padding-bottom: 12px;
  }
`;

const CartItem = styled(Li)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin: 24px 0;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  gap: 8px;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ItemSelect = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-weight: 600;
  min-width: 80px;

  &:focus {
    outline: none;
    border-color: #b42432;
  }
`;

const OrderSummary = styled(Ul)`
  padding: 24px;
  display: block;
  width: 35%;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const TossPaymentButton = styled.button`
  background-color: #00b0ff; /* 버튼 배경색 */
  color: white; /* 글자 색 */
  font-size: 16px; /* 글자 크기 */
  font-weight: bold; /* 글자 두껍게 */
  padding: 12px 30px; /* 버튼 안쪽 여백 (세로, 가로) */
  border: none; /* 테두리 제거 */
  border-radius: 8px; /* 둥근 모서리 */
  cursor: pointer; /* 마우스 커서가 손 모양으로 변경 */
  transition: background-color 0.3s ease; /* 배경색 변화에 부드러운 효과 */
  &:hover {
    background-color: #0099cc; /* 마우스를 올렸을 때 배경색 변화 */
  }
  &:active {
    background-color: #0077b3; /* 버튼을 클릭했을 때 배경색 변화 */
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #ccc; /* 비활성화된 버튼 색상 */
    cursor: not-allowed; /* 비활성화된 상태에서는 클릭할 수 없게 설정 */
  }
`;

export default function Cart() {
  const [payment, setPayment] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [count, setCount] = useState([1, 1, 1, 1, 1, 1]);
  const [price, setPrice] = useState([]);
  const userApi = "/api/account/cart";
  const deletApi = "/api/account/deletecart";

  // 장바구니 데이터 가져오기
  useEffect(() => {
    async function UserFetch() {
      try {
        const result = await axios.post(
          userApi,
          { count },
          { withCredentials: true }
        );
        if (result.status === 200) {
          setItemList(result.data.resultItems);
          setTotalPrice(result.data.totalPrice);
          setPrice(result.data.newPrice);
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 500) {
            const firstpaybutton = document.getElementById("paymentbutton");
            firstpaybutton.disabled = true;
          }
        }
      }
    }
    UserFetch();
  }, [count]);
  // 아이템 수량 변경
  function handleCountChange(e, index) {
    const value = e.target.value;
    const newCount = [...count];
    newCount[index] = value;
    setCount(newCount);
  }
  // 장바구니 아이템 삭제
  async function handleDelet(_ids) {
    try {
      const result = await axios.post(
        deletApi,
        { _ids },
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        alert(result.data.message);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 토스페이 결체 창 띄우기
  function CheckoutPage() {
    // 토스페이먼츠 클라이언트 키
    const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
    //누구나 결제가능
    const customerKey = ANONYMOUS;
    // 가격설정
    const [amount, setAmount] = useState({
      currency: "KRW",
      value: totalPrice,
    });
    const [ready, setReady] = useState();
    const [widgets, setWidgets] = useState(null);
    // 예약 및 결제 버튼
    async function tosspaymentsButton() {
      try {
        let result = await axios.get(userApi);

        // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
        // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
        // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
        await widgets.requestPayment({
          orderId: result.data.OrderIdRandomStr,
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + result.data.successUrl,
          failUrl: window.location.origin + result.data.failUrl,
          customerEmail: result.data.customerEmail,
          customerName: result.data.customerName,
          customerMobilePhone: result.data.customerMobilePhone,
        });
      } catch (err) {
        console.log(err);
      }
    }

    //
    useEffect(() => {
      async function fetchPaymentWidgets() {
        // ------  결제위젯 초기화 ------
        const tossPayments = await loadTossPayments(clientKey);
        // 회원 결제
        const widgets = tossPayments.widgets({
          customerKey,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

        setWidgets(widgets);
      }

      fetchPaymentWidgets();
    }, [clientKey, customerKey]);

    useEffect(() => {
      async function renderPaymentWidgets() {
        if (widgets == null) {
          return;
        }

        // ------ 주문의 결제 금액 설정 ------
        await widgets.setAmount(amount);

        await Promise.all([
          // ------  결제 UI 렌더링 ------
          widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          }),
          // ------  이용약관 UI 렌더링 ------
          widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          }),
        ]);

        setReady(true);
      }

      renderPaymentWidgets();
    }, [widgets]);

    useEffect(() => {
      if (widgets == null) {
        return;
      }

      widgets.setAmount(amount);
    }, [widgets, amount]);

    return (
      <>
        <LoginFullContiner
          onClick={() => {
            if (payment === true) {
              setPayment(false);
            }
          }}
          style={{ display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <div
            className="wrapper"
            style={{
              position: "absolute",
              zIndex: 101,
              maxWidth: "100%",
              width: "50%",
            }}
          >
            <div className="box_section">
              {/* 결제 UI */}
              <div id="payment-method" />
              {/* 이용약관 UI */}
              <div id="agreement" />
              {/* 쿠폰 체크박스 */}

              {/* 결제하기 버튼 */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px 0",
                  background: "white",
                }}
              >
                <TossPaymentButton
                  className="button"
                  id="payment-button"
                  disabled={!ready}
                  onClick={tosspaymentsButton}
                >
                  결제하기
                </TossPaymentButton>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const base64 = "data:image/jpeg;base64,";
  const blurImg =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII=";

  return (
    <>
      {payment && <CheckoutPage />}
      <CartPageContainer>
        <CartContent>
          <CartItemsSection>
            <CartHeader>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <DeletButton />
                <H3>전체 선택</H3>
              </div>
              <div style={{ display: "flex", gap: "32px" }}>
                <H3>수량</H3>
                <H3>금액</H3>
              </div>
            </CartHeader>

            {itemList?.map((list, index) => (
              <CartItem key={index}>
                <ItemInfo>
                  <DeletButton onClick={() => handleDelet(list._id)}>
                    x
                  </DeletButton>
                  <Image
                    width={100}
                    height={100}
                    placeholder="blur"
                    blurDataURL={base64 + blurImg}
                    src={list.image}
                    alt="ItemImage"
                    style={{ borderRadius: "8px" }}
                  />
                  <ItemDetails>
                    <P style={{ fontWeight: "600" }}>{list.name}</P>
                    <P style={{ fontWeight: "600" }}>
                      {list.price.toLocaleString()}원
                    </P>
                  </ItemDetails>
                </ItemInfo>

                <ItemControls>
                  <ItemSelect
                    onChange={(e) => handleCountChange(e, index)}
                    value={count[index] || 1}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </ItemSelect>
                  <P
                    style={{
                      fontWeight: "600",
                      minWidth: "80px",
                      textAlign: "right",
                    }}
                  >
                    {price[index]}원
                  </P>
                </ItemControls>
              </CartItem>
            ))}
          </CartItemsSection>

          <OrderSummary>
            <Li
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "600",
              }}
            >
              예약 및 결제
            </Li>
            <Li style={{ margin: "20px 0", color: "#666" }}>
              당일 예약만 가능합니다.
            </Li>
            <hr
              style={{
                margin: "20px 0",
                border: "none",
                borderTop: "1px solid #eee",
              }}
            />
            <TimeSelect />
            <hr
              style={{
                margin: "20px 0",
                border: "none",
                borderTop: "1px solid #eee",
              }}
            />
            <H1
              style={{
                textAlign: "center",
                marginBottom: "24px",
                color: "#b42432",
                fontSize: "1.8rem",
              }}
            >
              {totalPrice?.toLocaleString()}원
            </H1>
            <PaymentButton
              id="paymentbutton"
              onClick={() => setPayment(!payment)}
            >
              예약 및 결제
            </PaymentButton>
          </OrderSummary>
        </CartContent>
      </CartPageContainer>
    </>
  );
}

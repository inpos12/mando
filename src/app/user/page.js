"use client";
import axios from "axios";
import { Container, Row, H2 } from "@/app/Components/common/common.style";
import { useEffect } from "react";
import { LoginRow, Input, Button } from "../Components/common/Login.style";
import { useRouter } from "next/navigation";
export default function User() {
  const router = useRouter();
  const userApi = "/api/account/user";
  async function UserFetch(e) {
    e.preventDefault();
    const password = e.target.password.value;
    try {
      const result = await axios.post(
        userApi,
        { password },
        { withCredentials: true }
      );
      if (result.status === 201) {
        alert(result.data.successErr);
      }
      if (result.status === 200) {
        alert(result.data.success);
        router.push(result.data.href);
        console.log(result.data.href);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.messageErr);
      }
    }
  }

  return (
    <>
      <Container>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
          }}
        >
          <LoginRow onSubmit={UserFetch}>
            <H2 style={{ textAlign: "center", marginBottom: "20px" }}>
              내정보페이지
            </H2>
            <Input name="password" placeholder="비밀번호" type="password" />
            <Button>확인</Button>
          </LoginRow>
        </Row>
      </Container>
    </>
  );
}

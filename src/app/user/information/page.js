"use client";

import axios from "axios";
import {
  Container,
  Li,
  P,
  Row,
  Ul,
  H2,
} from "@/app/Components/common/common.style";
import {
  Button,
  Input,
  LoginContainer,
  LoginFullContiner,
  LoginRow,
} from "@/app/Components/common/Login.style";
import { useEffect, useState } from "react";

const styleLi = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  maxWidth: "400px",
  width: "100%",
};

const styleP = {
  width: "100px",
  textAlign: "left",
};

const styleInput = {
  margin: "0",
  color: "#bababa",
};
const styleButton = {
  margin: "0",
};
export default function Information() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordChangeForm, setPasswordChangeForm] = useState();

  const informationApi = "/api/account/user/information";
  async function UserFetch() {
    try {
      const result = await axios.get(informationApi, {
        withCredentials: true,
      });
      setUserName(result.data.userName);
      setUserId(result.data.userId);
      setPhone(result.data.userPhone);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.MessageErr);
      }
    }
  }

  async function ChangePassword(e) {
    e.preventDefault();
    const password = e.target.password.value;
    const newpassword = e.target.newpassword.value;
    const newcheackpassword = e.target.newcheackpassword.value;

    try {
      const result = await axios.put(informationApi, {
        password,
        newpassword,
        newcheackpassword,
      });
      if (result.status === 201) {
        alert(result.data.message);
      } else if (result.status === 202) {
        alert(result.data.message);
      } else if (result.status === 203) {
        alert(result.data.message);
      } else if (result.status === 200) {
        alert(result.data.message);
        window.location.reload();
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.MessageErr);
      }
    }
  }

  function passwordChangehandler() {
    setPasswordChangeForm(true);
  }
  useEffect(() => {
    const fullcontainer = document.querySelector(".fullcontainer");
    const container = document.querySelector(".container");
    const body = document.querySelector("body");
    if (passwordChangeForm === true) {
      fullcontainer.style.display = "flex";
      container.style.display = "flex";
      body.style.overflow = "hidden";
      fullcontainer.addEventListener("click", function click() {
        fullcontainer.style.display = "none";
        container.style.display = "none";
        body.style.overflow = "visible";
        setPasswordChangeForm(false);
      });
    }
    console.log(passwordChangeForm);
  }, [passwordChangeForm]);

  useEffect(() => {
    UserFetch();
  }, []);
  return (
    <>
      <Container style={{ padding: "0" }}>
        <Row style={{ maxWidth: "600px", margin: "200px" }}>
          <Ul
            style={{
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <Li style={styleLi}>
              <H2
                style={{ textAlign: "center", width: "100%", color: "#bf2032" }}
              >
                내정보페이지
              </H2>
            </Li>
            <Li style={styleLi}>
              <P style={styleP}>아이디</P>
              <Input style={styleInput} type="text" disabled value={userId} />
            </Li>
            <Li style={styleLi}>
              <P style={styleP}>이름</P>
              <Input style={styleInput} type="text" disabled value={userName} />
            </Li>
            <Li style={styleLi}>
              <P style={styleP}>휴대폰</P>
              <Input style={styleInput} type="text" disabled value={phone} />
            </Li>
            <Li style={styleLi}>
              <P style={styleP}>비밀번호</P>
              <Button onClick={passwordChangehandler} style={styleButton}>
                비밀번호 수정
              </Button>
            </Li>
          </Ul>
        </Row>
      </Container>
      <LoginFullContiner className="fullcontainer"></LoginFullContiner>

      <LoginContainer
        className="container"
        style={{ display: "none", maxHeight: "400px" }}
      >
        <LoginRow onSubmit={ChangePassword}>
          <H2
            style={{
              color: "#bf2032",
              textAlign: "center",
              marginBottom: "38px",
            }}
          >
            비밀번호 변경
          </H2>
          <Input name="password" placeholder="현재 비밀번호" type="password" />
          <Input name="newpassword" placeholder="새 비밀번호" type="password" />
          <Input
            name="newcheackpassword"
            placeholder="새 비밀번호 확인"
            type="password"
          />

          <Button type="submit">확인</Button>
        </LoginRow>
      </LoginContainer>
    </>
  );
}

"use client";
import styled from "styled-components";
import { H2 } from "./common.style";

export const LoginFullContiner = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(178, 178, 178, 0.5);
  position: absolute;
  z-index: 100;
  justify-content: center;
  align-items: center;
  display: none;
`;
export const LoginContainer = styled.div`
  position: absolute;
  z-index: 1000;
  max-width: 460px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  background-color: white;
  justify-content: center;
  align-items: center;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
`;
export const LoginRow = styled.form`
  max-width: 360px;
  width: 100%;
  height: auto;
`;

export const Input = styled.input`
  width: 100%;
  background-color: white;
  border: 1px solid #cbcbc9;
  margin-bottom: 22px;
  padding: 10px 0 10px 16px;
  font-weight: bold;
  color: black;
  display: ${(props) => props.display};
  &::placeholder {
    color: gray;
  }
  &:focus {
    outline: none;
  }
`;
export const Button = styled.button`
  width: 100%;
  background-color: #bf2032;
  color: white;
  margin-bottom: 22px;
  font-size: 16px;
  font-weight: bold;
  padding: 17px 0;
  border-radius: 6px;
`;
export const LinkButton = styled.h1`
  width: 100%;
  background-color: black;
  color: white;
  margin-bottom: 22px;
  font-size: 16px;
  font-weight: bold;
  padding: 17px 0;
  border-radius: 6px;
  text-align: center;
`;

export function accounthandler(showformclass, hideformclass) {
  const showform = document.querySelector(showformclass);
  const hideform = document.querySelector(hideformclass);
  if ((showform.style.display = "flex")) {
    showform.style.display = "none";
    hideform.style.display = "flex";
  }
}

export function LoginForm(props) {
  return (
    <>
      <LoginContainer
        className={props.formclass}
        style={{ maxHeight: props.maxheight }}
      >
        <LoginRow onSubmit={props.Submit}>
          <H2
            style={{
              color: "#bf2032",
              textAlign: "center",
              marginBottom: "38px",
            }}
          >
            {props.title}
          </H2>
          <Input
            display={props.display}
            disabled={props.namedisabled}
            name="name"
            placeholder="이름"
            type="text"
            value={"홍길동"}
          />
          <Input name="id" placeholder="아이디" type="text" value={"admin"} />
          <Input
            name="password"
            placeholder="비밀번호"
            type="password"
            value={"admin"}
          />
          <Input
            name="phone"
            type="tel"
            id="phone"
            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
            placeholder="예: 010-1234-5678"
            required
            display={props.display}
            disabled={props.phonedisabled}
            value={"010-1234-5678"}
          />
          <Button type="submit">{props.button}</Button>
          <LinkButton onClick={props.linkhandler}>{props.link}</LinkButton>
        </LoginRow>
      </LoginContainer>
    </>
  );
}

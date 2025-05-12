"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  NavContainer,
  NavRow,
  Ul,
  Li,
  H2,
} from "@/app/Components/common/common.style";
import {
  LoginFullContiner,
  LoginForm,
  accounthandler,
} from "@/app/Components/common/Login.style";
import Logo from "@/public/image/logo5.png";
import account from "@/public/image/account.png";
import cart from "@/public/image/cart.png";
import Image from "next/image";
import Link from "next/link";
// https://ibb.co/0rL0sgR

export default function Header() {
  const base64 = "data:image/jpeg;base64,";
  const blurImg =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII=";
  const router = useRouter();
  const logincheckApi = "/api/account/accountcheck/";
  const [login, setLogin] = useState(false);
  const [loginform, setLoginForm] = useState(false);

  // 로그인상태 확인
  async function logincheck() {
    try {
      const result = await axios.get(logincheckApi, { withCredentials: true });
      if (result.status === 200) {
        setLogin(true);
      }
    } catch (err) {
      if (err.response.status === 404) {
        await axios.post("/api/account/logout"); // 로그아웃 API 호출
        setLogin(false); // 로그인 상태 false로 설정
        alert(err.response.data.messageErr);
        window.location.href = "/";
      }
    }
  }
  useEffect(() => {
    logincheck();
    console.log("eee");
  }, [login]);

  // 로그인호출
  async function Login(e) {
    e.preventDefault();
    const LoginApi = "/api/account/login";
    const id = e.target.id.value;
    const password = e.target.password.value;
    try {
      const result = await axios.post(LoginApi, { id, password });
      console.log(result);
      if (result.status === 201) {
        alert(result.data.message1);
      }
      if (result.status === 202) {
        alert(result.data.message2);
      }
      if (result.status === 203) {
        alert(result.data.message3);
      }
      if (result.status === 200) {
        alert(result.data.message);
        window.location.reload();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert(err.response.data.message);
        }
      } else {
        console.log("ddd");
      }
    }
  }
  // 로그아웃핸들러
  async function handlerLogout() {
    try {
      await axios.post("/api/account/logout"); // 로그아웃 API 호출
      setLogin(false); // 로그인 상태 false로 설정
      alert("로그아웃되었습니다.");
    } catch {
      console.log("eee");
    }
  }

  //회원가입 호출
  async function Register(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const id = e.target.id.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;
    const loginform = document.querySelector(".loginform");
    const registrform = document.querySelector(".registerform");

    try {
      const RegisterApi = "/api/account/register";
      const result = await axios.post(RegisterApi, {
        name,
        id,
        password,
        phone,
      });
      if (result.status === 203) {
        alert(result.data.message);
      } else if (result.status === 200) {
        alert(result.data.message);
        registrform.style.display = "none";
        loginform.style.display = "flex";
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }
  // register button click =  form Show
  function Loginhandler() {
    accounthandler(".loginform", ".registerform");
  }
  // login button click =  form Show
  function Registerhandler() {
    accounthandler(".registerform", ".loginform");
  }

  // cart page
  async function Cart(e) {
    e.preventDefault();
    try {
      const result = await axios.get(logincheckApi, { withCredentials: true });
      if (result.status === 200) {
        router.push(result.data.cart);
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert(err.response.data.message);
      }
    }
  }
  async function User(e) {
    e.preventDefault();
    try {
      const result = await axios.get(logincheckApi, { withCredentials: true });
      if (result.status === 200) {
        router.push(result.data.user);
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert(err.response.data.message);
      }
    }
  }

  // login form show

  function formhandler() {
    const fullcontainer = document.querySelector(".fullcontainer");
    const loginform = document.querySelector(".loginform");
    const registerform = document.querySelector(".registerform");
    const body = document.querySelector("body");
    if ((fullcontainer.style.display = "none")) {
      fullcontainer.style.display = "flex";
      loginform.style.display = "flex";
      body.style.overflow = "hidden";
      setLoginForm(true);
    }
    if ((fullcontainer.style.display = "flex")) {
      fullcontainer.addEventListener("click", function () {
        fullcontainer.style.display = "none";
        loginform.style.display = "none";
        registerform.style.display = "none";
        body.style.overflow = "visible";

        setLoginForm(false);
      });
    }
  }

  return (
    <>
      <NavContainer>
        <NavRow>
          <Link href="/">
            <Image
              width={290}
              height={70}
              placeholder="blur"
              blurDataURL={base64 + blurImg}
              src={Logo}
              alt="itemImage"
              style={{ padding: "10px 0", width: "100%" }}
            />
          </Link>
          <Ul style={{ maxWidth: "771px" }}>
            <Li>가게소개</Li>
            <Li>메뉴안내</Li>
            <Li>수경소식</Li>
            <Li>매장안내</Li>
          </Ul>
          <Ul style={{ maxWidth: "221px", justifyContent: "space-around" }}>
            <Li>
              <button onClick={User}>
                <Image width={25} alt="account" src={account} />
              </button>
            </Li>
            <Li>
              <button onClick={Cart}>
                <Image width={25} alt="cart" src={cart} />
              </button>
            </Li>
            <Li>
              {login ? (
                <button onClick={handlerLogout}>로그아웃</button>
              ) : (
                <button onClick={formhandler}>로그인</button>
              )}
            </Li>
          </Ul>
        </NavRow>
        <LoginFullContiner className="fullcontainer"></LoginFullContiner>
        <LoginForm
          Submit={Login}
          formclass="loginform"
          title="회원로그인"
          button="로그인"
          display="none"
          link="회원가입"
          maxheight="420px"
          phonedisabled="disabled"
          namedisable="disabled"
          linkhandler={Loginhandler}
        />
        <LoginForm
          Submit={Register}
          formclass="registerform"
          title="회원가입"
          button="회원가입"
          link="로그인"
          maxheight="600px"
          linkhandler={Registerhandler}
        />
      </NavContainer>
    </>
  );
}

"use client";
import axios from "axios";
export default function Register() {
  async function handlerRegister(e) {
    e.preventDefault();
    const PostApi = "/api/account/register/";
    const id = e.target.id.value;
    const password = e.target.password.value;

    try {
      const result = await axios.post(PostApi, { id, password });
      console.log(result.data);
    } catch (err) {
      // 에러 처리
    }
  }

  return (
    <>
      <h1>회원가입</h1>
      <form
        onSubmit={handlerRegister}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input name="id" type="text" />
        <input name="password" type="password" />

        <button type="submit">회원가입</button>
      </form>
    </>
  );
}

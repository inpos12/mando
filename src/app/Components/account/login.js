"use client";
import axios from "axios";
export default function Login() {
  async function handlerRegister(e) {
    e.preventDefault();
    const PostApi = "/api/account/login";
    const id = e.target.id.value;
    const password = e.target.password.value;
    try {
      const result = await axios.post(PostApi, { id, password });
      if (result.status === 200) {
        alert(result.data.message);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          alert(err.response.data.message);
        }
      }
    }
  }

  return (
    <>
      <h1>로그인</h1>
      <form
        onSubmit={handlerRegister}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input name="id" type="text" value="admin" />
        <input name="password" type="password" value="admin" />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

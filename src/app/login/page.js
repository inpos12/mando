"use client";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/app/Components/account/login"), {
  ssr: false,
});

export default function LoginPage() {
  return <Login />;
}

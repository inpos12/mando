"use client";
import dynamic from "next/dynamic";

const Register = dynamic(() => import("@/app/Components/account/register"), {
  ssr: false,
});

export default function RegisterPage() {
  return <Register />;
}

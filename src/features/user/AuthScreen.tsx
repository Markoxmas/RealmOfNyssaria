import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import Register from "./Register";
import Login from "./Login";

export default function AuthScreen() {
  const { isLogin } = useAppSelector((state) => state.user);
  return <div>{isLogin ? <Login /> : <Register />}</div>;
}

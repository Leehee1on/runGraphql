import React from "react";

type headerProps = {
  state: boolean;
  Cookies: any;
};

export default function Header({ state, Cookies }: headerProps) {
  const logout = () => {
    Cookies.remove("x_auth");
    document.location.href = "/main";
  };
  const signInNavi = () => {
    document.location.href = "/signIn";
  };
  const signUpNavi = () => {
    document.location.href = "/signUp";
  };
  const mainNavi = () => {
    document.location.href = "/main";
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
      <div onClick={mainNavi}>홈</div>
      {state ? (
        <div onClick={logout}>로그아웃</div>
      ) : (
        <div style={{ display: "flex" }}>
          <div onClick={signInNavi}>로그인하기</div>
          <div style={{ padding: "0 20px" }}>|</div>
          <div onClick={signUpNavi}>회원가입</div>
        </div>
      )}
    </div>
  );
}

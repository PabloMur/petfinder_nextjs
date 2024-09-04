"use client";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { RecoilRoot } from "recoil";

const CustomLayout = ({ children }: any) => {
  return (
    <RecoilRoot>
      <Header></Header>
      {children}
      <Footer></Footer>
    </RecoilRoot>
  );
};

export { CustomLayout };

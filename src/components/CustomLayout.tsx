"use client";
import { SessionProvider } from "next-auth/react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { RecoilRoot } from "recoil";

interface CustomLayoutProps {
  children?: React.ReactNode;
}

const CustomLayout = ({ children }: CustomLayoutProps) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <Header />
        {children}
        <Footer />
      </SessionProvider>
    </RecoilRoot>
  );
};

export { CustomLayout };

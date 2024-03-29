import { ReactNode } from "react";
import Container from "./Container";
import Footer from "./Footer";
import Nav from "./Nav";

interface PageLayoutProps {
  children: ReactNode;
  narrow?: boolean;
}

export default ({ children, narrow = false }: PageLayoutProps) => {
  return (
    <>
      <Nav />
      <Container narrow={narrow}>{children}</Container>
      <Footer />
    </>
  );
};

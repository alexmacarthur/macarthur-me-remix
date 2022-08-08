import { useLoaderData } from "@remix-run/react";
import Container from "./Container"
import Nav from "./Nav"

export default ({
  children
}) => {
  const data = useLoaderData();

  console.log(data);



  return (
    <>
      <Nav />
      <Container>
        { children }
      </Container>
    </>
  )
}

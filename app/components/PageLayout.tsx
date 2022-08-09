import Container from "./Container"
import Nav from "./Nav"

export default ({
  children
}) => {
  return (
    <>
      <Nav />
      <Container>
        { children }
      </Container>
    </>
  )
}

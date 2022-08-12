import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-16 px-0 pb-6 pt-0">
      <hr className="divider divider--wide" />
      <Container classes="text-center pt-6">
        <span className="text-base">
          &copy; Alex MacArthur | {new Date().getFullYear()}
        </span>
      </Container>
    </footer>
  );
}

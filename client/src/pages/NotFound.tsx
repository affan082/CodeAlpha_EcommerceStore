import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      className="py-5 text-center"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="tag-label mb-3">ERROR 404</div>
      <h1 className="brand-wordmark mb-3" style={{ fontSize: "2.5rem" }}>
        PAGE NOT FOUND
      </h1>
      <p className="text-stone mb-4" style={{ maxWidth: "400px" }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-ink">
        BACK TO HOME
      </Link>
    </Container>
  );
};

export default NotFound;

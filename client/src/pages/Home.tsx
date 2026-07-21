import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategorySection from "../components/product/CategorySection";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <div
        className="d-flex flex-column justify-content-center align-items-start"
        style={{
          height: "70vh",
          backgroundColor: "#1A1A1A",
          color: "#FAFAF8",
          paddingLeft: "8%",
        }}
      >
        <div className="tag-label mb-3" style={{ color: "#B8B8B8" }}>
          MEN'S ESSENTIALS
        </div>
        <h1 className="brand-wordmark display-3 mb-3">
          FINE FIT.
          <br />
          NO NOISE.
        </h1>
        <p className="mb-4" style={{ maxWidth: "420px", color: "#D0D0D0" }}>
          Pants, tees, and casual shirts built around fit, fabric, and quiet
          confidence.
        </p>
        <Link
          to="/shop/Pants"
          className="btn btn-outline-light font-mono"
          style={{ borderRadius: 0 }}
        >
          SHOP NEW ARRIVALS →
        </Link>
      </div>

      <Container className="text-center py-5">
        <div
          className="d-flex justify-content-center gap-5 font-mono"
          style={{ fontSize: "0.85rem" }}
        >
          <Link to="/shop/Pants" className="text-reset text-decoration-none">
            PANTS
          </Link>
          <Link to="/shop/T-Shirts" className="text-reset text-decoration-none">
            T-SHIRTS
          </Link>
          <Link
            to="/shop/Casual Shirts"
            className="text-reset text-decoration-none"
          >
            CASUAL SHIRTS
          </Link>
        </div>
      </Container>

      <CategorySection category="Pants" />
      <hr style={{ borderColor: "#E4E2DD" }} />
      <CategorySection category="T-Shirts" />
      <hr style={{ borderColor: "#E4E2DD" }} />
      <CategorySection category="Casual Shirts" />
    </>
  );
};

export default Home;

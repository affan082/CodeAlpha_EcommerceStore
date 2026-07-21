import { Navbar as BsNavbar, Container, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  return (
    <BsNavbar
      expand="md"
      className="bg-white border-bottom py-3"
      style={{ borderColor: "#E4E2DD" }}
    >
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="brand-wordmark fs-4">
          FINEFIT
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav" />
        <BsNavbar.Collapse id="main-nav">
          <Nav
            className="mx-auto font-mono"
            style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
          >
            <Nav.Link as={Link} to="/shop/Pants">
              PANTS
            </Nav.Link>
            <Nav.Link as={Link} to="/shop/T-Shirts">
              T-SHIRTS
            </Nav.Link>
            <Nav.Link as={Link} to="/shop/Casual Shirts">
              CASUAL SHIRTS
            </Nav.Link>
          </Nav>
          <Nav
            className="align-items-center font-mono"
            style={{ fontSize: "0.85rem" }}
          >
            <Nav.Link as={Link} to="/cart" className="position-relative">
              CART
              {itemCount > 0 && (
                <Badge bg="dark" className="ms-1">
                  {itemCount}
                </Badge>
              )}
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/account/orders">
                  ORDERS
                </Nav.Link>
                {user.role === "admin" && (
                  <Nav.Link as={Link} to="/admin">
                    ADMIN
                  </Nav.Link>
                )}
                <Nav.Link onClick={logout} role="button">
                  LOGOUT
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;

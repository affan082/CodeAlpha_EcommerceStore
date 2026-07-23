import { Container, Nav } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <Container className="pt-4">
      <div className="tag-label mb-2">ADMIN DASHBOARD</div>
      <Nav variant="tabs" className="mb-2">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/admin/products"
            active={location.pathname.includes("products")}
          >
            PRODUCTS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/admin/orders"
            active={location.pathname.includes("orders")}
          >
            ORDERS
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </Container>
  );
};

export default AdminLayout;

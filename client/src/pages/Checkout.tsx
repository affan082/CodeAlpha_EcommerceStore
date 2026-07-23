import { useState, type FormEvent } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const total =
    cart?.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0) ?? 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const { data } = await axiosInstance.post("/orders", {
        shippingAddress: { address, city, postalCode },
      });
      await refreshCart();
      navigate(`/order/${data._id}`);
      toast.success("Order placed successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2 className="brand-wordmark mb-3">YOUR CART IS EMPTY</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="brand-wordmark mb-4">CHECKOUT</h1>
      <Row className="g-5">
        <Col md={7}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="tag-label">Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{ borderRadius: 0 }}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="tag-label">City</Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    style={{ borderRadius: 0 }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="tag-label">Postal Code</Form.Label>
                  <Form.Control
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    style={{ borderRadius: 0 }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="btn-ink w-100" disabled={placing}>
              {placing ? "PLACING ORDER..." : "PLACE ORDER"}
            </Button>
          </Form>
        </Col>
        <Col md={5}>
          <div className="tag-label mb-3">ORDER SUMMARY</div>
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="d-flex justify-content-between mb-2"
              style={{ fontSize: "0.9rem" }}
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span className="price-tag">
                Rs. {(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <span className="tag-label">TOTAL</span>
            <span className="price-tag" style={{ fontSize: "1.1rem" }}>
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;

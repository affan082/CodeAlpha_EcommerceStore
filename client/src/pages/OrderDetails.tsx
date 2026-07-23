import { useEffect, useState } from "react";
import { Container, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import type { Order } from "../types/order";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    axiosInstance
      .get<Order>(`/orders/${id}`)
      .then(({ data }) => setOrder(data));
  }, [id]);

  if (!order)
    return (
      <Container className="py-5">
        <p className="text-stone">Loading...</p>
      </Container>
    );

  return (
    <Container className="py-5" style={{ maxWidth: "700px" }}>
      <div className="tag-label mb-2">ORDER CONFIRMED</div>
      <h1 className="brand-wordmark mb-4">
        Order #{order._id.slice(-8).toUpperCase()}
      </h1>

      <Badge bg="dark" className="font-mono mb-4">
        {order.status.toUpperCase()}
      </Badge>

      <div className="mb-4">
        <div className="tag-label mb-2">SHIPPING TO</div>
        <p className="mb-0">{order.shippingAddress.address}</p>
      </div>

      <div className="tag-label mb-2">ITEMS</div>
      {order.items.map((item, idx) => (
        <div
          key={idx}
          className="d-flex justify-content-between border-bottom py-2"
        >
          <span>
            {item.name} × {item.quantity}
          </span>
          <span className="price-tag">
            Rs. {(item.price * item.quantity).toLocaleString()}
          </span>
        </div>
      ))}

      <div className="d-flex justify-content-between mt-3">
        <span className="tag-label">TOTAL</span>
        <span className="price-tag" style={{ fontSize: "1.1rem" }}>
          Rs. {order.totalPrice.toLocaleString()}
        </span>
      </div>
    </Container>
  );
};

export default OrderDetails;

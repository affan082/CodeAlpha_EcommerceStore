import { useEffect, useState } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import type { Order } from "../types/order";

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get<Order[]>("/orders/myorders").then(({ data }) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container className="py-5">
      <h1 className="brand-wordmark mb-4">MY ORDERS</h1>
      {loading ? (
        <p className="text-stone">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-stone">No orders yet.</p>
      ) : (
        <Table borderless className="align-middle">
          <thead>
            <tr className="tag-label border-bottom">
              <th>ORDER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-bottom">
                <td>
                  <Link to={`/order/${o._id}`} className="text-reset">
                    #{o._id.slice(-8).toUpperCase()}
                  </Link>
                </td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="price-tag">
                  Rs. {o.totalPrice.toLocaleString()}
                </td>
                <td>
                  <Badge bg="dark" className="font-mono">
                    {o.status.toUpperCase()}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyOrders;

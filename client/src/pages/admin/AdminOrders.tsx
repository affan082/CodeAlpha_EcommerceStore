import { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import type { Order, OrderStatus } from "../../types/order";
import { toast } from "react-toastify";

const statuses: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = () => {
    axiosInstance.get<Order[]>("/orders").then(({ data }) => setOrders(data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    await axiosInstance.put(`/orders/${id}/status`, { status });
    toast.success("Order status updated");
    loadOrders();
  };

  return (
    <Container className="py-5">
      <h1 className="brand-wordmark mb-4">ORDERS</h1>
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
              <td>#{o._id.slice(-8).toUpperCase()}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td className="price-tag">Rs. {o.totalPrice.toLocaleString()}</td>
              <td>
                <Form.Select
                  value={o.status}
                  onChange={(e) =>
                    updateStatus(o._id, e.target.value as OrderStatus)
                  }
                  style={{ borderRadius: 0, width: "160px" }}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s.toUpperCase()}
                    </option>
                  ))}
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrders;

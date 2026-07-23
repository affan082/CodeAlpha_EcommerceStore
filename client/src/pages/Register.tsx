import { useState, type FormEvent } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "400px" }} className="py-5">
      <h2 className="brand-wordmark mb-4">CREATE ACCOUNT</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="tag-label">Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ borderRadius: 0 }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="tag-label">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderRadius: 0 }}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="tag-label">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={{ borderRadius: 0 }}
          />
        </Form.Group>
        <Button type="submit" className="btn-ink w-100" disabled={loading}>
          {loading ? "Creating account..." : "CREATE ACCOUNT"}
        </Button>
      </Form>
      <p className="mt-3 font-mono" style={{ fontSize: "0.8rem" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </Container>
  );
};

export default Register;

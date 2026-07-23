import { useEffect, useState, type FormEvent } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import type { Product, ProductCategory } from "../../types/product";
import { toast } from "react-toastify";

const categories: ProductCategory[] = ["Pants", "T-Shirts", "Casual Shirts"];

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Pants");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  const loadProducts = () => {
    axiosInstance
      .get<Product[]>("/products")
      .then(({ data }) => setProducts(data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("Pants");
    setStock("");
    setImages(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setName(p.name);
    setDescription(p.description);
    setPrice(String(p.price));
    setCategory(p.category);
    setStock(String(p.stock));
    setImages(null);
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    if (images) {
      Array.from(images).forEach((file) => formData.append("images", file));
    }

    try {
      if (editing) {
        await axiosInstance.put(`/products/${editing._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setShowModal(false);
      toast.success(editing ? "Product updated" : "Product created");
      loadProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await axiosInstance.delete(`/products/${id}`);
    toast.success("Product deleted");
    loadProducts();
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="brand-wordmark mb-0">PRODUCTS</h1>
        <Button className="btn-ink" onClick={openCreate}>
          + ADD PRODUCT
        </Button>
      </div>

      <Table borderless className="align-middle">
        <thead>
          <tr className="tag-label border-bottom">
            <th>NAME</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-bottom">
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td className="price-tag">Rs. {p.price.toLocaleString()}</td>
              <td>{p.stock}</td>
              <td>
                <Button
                  variant="link"
                  className="tag-label p-0 me-3"
                  onClick={() => openEdit(p)}
                >
                  EDIT
                </Button>
                <Button
                  variant="link"
                  className="tag-label p-0 text-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title
            className="brand-wordmark"
            style={{ fontSize: "1.2rem" }}
          >
            {editing ? "EDIT PRODUCT" : "ADD PRODUCT"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="tag-label">Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ borderRadius: 0 }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="tag-label">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ borderRadius: 0 }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="tag-label">Price (Rs.)</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{ borderRadius: 0 }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="tag-label">Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                style={{ borderRadius: 0 }}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="tag-label">Stock</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                style={{ borderRadius: 0 }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="tag-label">Images (up to 4)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setImages((e.target as HTMLInputElement).files)
                }
                style={{ borderRadius: 0 }}
              />
            </Form.Group>
            <Button type="submit" className="btn-ink w-100">
              {editing ? "SAVE CHANGES" : "CREATE PRODUCT"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminProducts;

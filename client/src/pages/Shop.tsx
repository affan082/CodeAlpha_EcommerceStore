import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import type { Product, ProductCategory } from "../types/product";
import ProductCard from "../components/product/ProductCard";

const Shop = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get<Product[]>("/products").then(({ data }) => {
      const filtered = category
        ? data.filter((p) => p.category === (category as ProductCategory))
        : data;
      setProducts(filtered);
      setLoading(false);
    });
  }, [category]);

  return (
    <Container className="py-5">
      <div className="tag-label mb-2">SHOP</div>
      <h1 className="brand-wordmark mb-4">{category || "ALL PRODUCTS"}</h1>

      {loading ? (
        <p className="text-stone">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-stone">No products found in this category.</p>
      ) : (
        <Row xs={2} md={4} className="g-5">
          {products.map((p) => (
            <Col key={p._id}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Shop;

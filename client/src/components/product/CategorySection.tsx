import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import type { Product, ProductCategory } from "../../types/product";
import ProductCard from "./ProductCard";

const CategorySection = ({ category }: { category: ProductCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axiosInstance.get<Product[]>("/products").then(({ data }) => {
      setProducts(data.filter((p) => p.category === category).slice(0, 4));
    });
  }, [category]);

  if (products.length === 0) return null;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <h2 className="h4 mb-0">{category}</h2>
        <Link to={`/shop/${category}`} className="btn btn-outline-ink btn-sm">
          View More →
        </Link>
      </div>
      <Row xs={2} md={4} className="g-4">
        {products.map((p) => (
          <Col key={p._id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategorySection;

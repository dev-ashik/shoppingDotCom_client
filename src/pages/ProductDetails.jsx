import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import { BsCart3 } from "react-icons/bs";
import { serverURL } from "../../serverUrl";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const { slug } = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${serverURL}/api/v1/product/products/${slug}`
      );
      if (data.success) {
        setProduct(data.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${serverURL}/api/v1/product//related-product/${pid}/${cid}`
      );
      if (data.success) {
        setRelatedProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) {
      getProduct();
    }
  }, [slug]);

  return (
    <Layout>
      <h5 className="text-center second_header">Product Details</h5>
      <div className="col">
        <div className="card m-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={`${serverURL}/api/v1/product/product-photo/${product?._id}`}
                className="card-img-top"
                alt="product image"
                style={{
                  height: "400px",
                  objectFit: "contain",
                  backgroundImage:
                    "linear-gradient(120deg, #541a8b80 0%, #6f8892 100%)",
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title second_header">{product?.name}</h5>
                <p className="card-text gray-text">
                  category: {product?.category?.name}
                </p>
                <p className="card-text gray-text">{product?.description}</p>
                <p className="card-text gray-text m-0">${product?.price}</p>
                <p className="card-text gray-text">
                  quantity: {product?.quantity}
                </p>

                <button
                  className="primary_btn addToCart_btn"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added");
                  }}
                >
                  <BsCart3 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="text-center second_header">Similar Product</h5>
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2" style={{borderTop: "2px solid #541a8b80"}}>
        
        {relatedProducts?.map((product) => (
          <div
            key={product._id}
            className="card m-2 p-0"
            style={{ maxWidth: 540 }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`${serverURL}/api/v1/product/product-photo/${product?._id}`}
                  className="card-img-top"
                  alt="product image"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    backgroundImage:
                      "linear-gradient(120deg, #541a8b80 0%, #6f8892 100%)",
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title second_header">{product.name}</h5>
                  <p className="card-text">
                    {product?.description.length > 70
                      ? `${product?.description.substring(0, 70)}. . .`
                      : product?.description}
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      $ {product.price}
                    </small>
                  </p>

                  <div className="d-flex align-items-center">
                    <Link
                      to={`/product/${product.slug}`}
                      className="primary_btn cardSeeMore_btn me-3"
                    >
                      see more
                    </Link>
                    <button
                      className="primary_btn addToCart_btn "
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added");
                      }}
                    >
                      <BsCart3 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;

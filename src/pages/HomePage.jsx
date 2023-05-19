import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { Checkbox, Radio } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { BsCart3 } from "react-icons/bs";

const prices_data = [
  {
    _id: 0,
    name: "$0 to 19",
    array: [0, 19],
  },
  {
    _id: 1,
    name: "$20 to 39",
    array: [20, 39],
  },
  {
    _id: 2,
    name: "$40 to 59",
    array: [40, 59],
  },
  {
    _id: 3,
    name: "$60 to 79",
    array: [60, 79],
  },
  {
    _id: 4,
    name: "$80 to 89",
    array: [0, 19],
  },
  {
    _id: 5,
    name: "$100 to 999",
    array: [100, 999],
  },
  {
    _id: 6,
    name: "$1000 to 10000",
    array: [1000, 10000],
  },
];

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [cart, setCart] = useCart();

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://shopping-dot-com-server.onrender.com/api/v1/product/products"
      );

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://shopping-dot-com-server.onrender.com/api/v1/category/get-categories"
      );
      if (data.success) {
        setCategories(data.categorys);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    if (!checked.length || !priceRange.length) {
      getAllProducts();
    }
  }, [checked.length, priceRange.length]);

  useEffect(() => {
    if (checked.length || priceRange.length) {
      filterProduct();
    }
  }, [checked, priceRange]);

  // filter category
  const handleFilterCategory = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filterd product
  const filterProduct = async () => {
    console.log("Filter product");
    try {
      const { data } = await axios.post(
        "https://shopping-dot-com-server.onrender.com/api/v1/product/product-filters",
        {
          checked,
          priceRange,
        }
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"all products best offers"}>
      <div className="homePage">
        <div className="homePage_left">
          <h5 className="second_header">Filter By Category</h5>
          <div className="d-flex flex-column">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) =>
                  handleFilterCategory(e.target.checked, category._id)
                }
              >
                {category.name}
              </Checkbox>
            ))}
          </div>

          <h5 className="second_header mt-4">Filter By Price</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setPriceRange(e.target.value)}>
              {prices_data?.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="homePage_right mb-4">
          {/* <h4 className="text-center">All products</h4> */}
          <div
            className="row row-cols-1 row-cols-md-3 g-4"
            style={{ width: "100%" }}
          >
            {products.length < 1 && <h5>loading...</h5>}

            {products?.map((product) => (
              <div className="col" key={product._id}>
                <div className="card h-100 product_cart">
                  <img
                    src={`https://shopping-dot-com-server.onrender.com/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top card_product_img"
                    alt="product image"
                  />
                  <div className="card-body">
                    <h5 className="card-title second_header">{product.name}</h5>

                    {product.description.length > 30 ? (
                      <p className="card-text gray-text">
                        {product.description.substring(0, 70)}...
                      </p>
                    ) : (
                      <p className="card-text gray-text">{product.description}</p>
                    )}

                    <p className="card_product_price"><strong>$</strong> {product.price}</p>
                  </div>
                  <div className="card-footer border-0 position-relative">
                    <Link
                      to={`/product/${product.slug}`}
                      className="primary_btn cardSeeMore_btn position-absolute"
                    >
                      see more
                    </Link>
                    <button
                      className="primary_btn addToCart_btn position-absolute"
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

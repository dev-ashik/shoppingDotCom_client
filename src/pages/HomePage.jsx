import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";

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
  // console.log(auth)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/products"
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
        "http://localhost:8000/api/v1/category/get-categories"
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
      const { data } = await axios.post("http://localhost:8000/api/v1/product/product-filters", {
        checked,
        priceRange,
      });

      setProducts(data.products);
    }catch(error) {
      console.log(error)
    }
  };

  // console.log(products);
  return (
    <Layout title={"all products best offers"}>
      <div className="row">
        <div className="col-md-3">
          <h4>Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                // name={category.name}
                // value={category.name}
                onChange={(e) =>
                  handleFilterCategory(e.target.checked, category._id)
                }
              >
                {category.name}
              </Checkbox>
            ))}
          </div>

          <h4>Filter By Price</h4>
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
        <div className="col-md-8">
          <h4 className="text-center">All products</h4>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.length < 1 && <h5>loading...</h5>}

            {products?.map(({ _id, name, description, price }) => (
              <div className="col" key={_id}>
                <div className="card h-100">
                  <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${_id}`}
                    className="card-img-top"
                    alt="product image"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      backgroundImage:
                        "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>

                    {description.length > 30 ? (
                      <p className="card-text">
                        {description.substring(0, 70)}...
                      </p>
                    ) : (
                      <p className="card-text">{description}</p>
                    )}

                    <p>${price}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      <button className="btn btn-primary me-3">see more</button>
                      <button className="btn btn-primary">add to cart</button>
                    </small>
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

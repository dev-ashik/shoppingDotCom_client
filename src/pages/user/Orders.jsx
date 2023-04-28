import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import MenuOfUsers from "../../components/Layout/MenuOfUsers";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  const getOrders = async () => {
    const {data} = await axios.get("http://localhost:8000/api/v1/product/orders")

    if(data.success) {
      setOrders(data.orders);
    }
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <MenuOfUsers />
          </div>
          <div className="col-md-9">
            <h2>All orders</h2>

            <div className="">
              {
                orders.map(product => (
                  <div key={product._id} className="m-2 p-2" style={{border: "1px solid black"}}>
                    {
                    product.products.length > 1 ? (
                      product.products.map((pId) => <div className="">
                      <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${pId}`}
                    className="card-img-top m-2"
                    alt="product image"
                    style={{
                      height: "200px",
                      width: "200px",
                      objectFit: "contain",
                      backgroundImage:
                        "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                    }}
                  />
                      </div>)
                    ) : (<>
                    <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${product.products}`}
                    className="card-img-top m-2"
                    alt="product image"
                    style={{
                      height: "200px",
                      width: "200px",
                      objectFit: "contain",
                      backgroundImage:
                        "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                    }}
                  />
                    </>)
                    }
                    <p>address: {product.address}</p>
                    <p>payment: {product.payment}</p>
                    <p>Time: { new Date(product.createdAt).getDate()}-{ new Date(product.createdAt).getMonth() + 1}-{ new Date(product.createdAt).getFullYear()} <small>dd/mm/yy</small></p>

                    <p>status: {product.status}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

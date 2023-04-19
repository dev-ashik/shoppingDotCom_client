import React from "react";
import Layout from "../../components/Layout/Layout";
import MenuOfUsers from "../../components/Layout/MenuOfUsers";

const Orders = () => {
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <MenuOfUsers />
          </div>
          <div className="col-md-9">
            <h2>All orders</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

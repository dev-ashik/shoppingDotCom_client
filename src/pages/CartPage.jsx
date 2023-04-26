import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();


  // total price
  const totalPrice = () => {
    try{
        let total = 0;
        cart?.map(item => { total = total + item.price})
        return total
    } catch(error) {
        console.log(error)
    }
  }

  // remove Cart Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);

      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <h4>hello {auth?.token && auth?.user?.name}</h4>
          {/* <h4>
            {cart?.length > 1
              ? `You have ${cart.length} items ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : `You didn't add any product`}
          </h4> */}
          {cart?.length < 1 && <h4>cart is empty</h4>}
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((product) => (
              <div className="row m-2 flex-row" key={product._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt="product image"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      backgroundImage:
                        "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{product.name}</h4>
                  <p>{product.description.substring(0, 50)}...</p>
                  <p>Price: {product.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h4>Cart Summary</h4>
            <hr />
                Total ---------- ${totalPrice()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

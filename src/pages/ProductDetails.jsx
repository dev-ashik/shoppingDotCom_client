import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([])
    const { slug } = useParams();

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/products/${slug}`)
            if(data.success) {
                setProduct(data.product)
                getSimilarProduct(data?.product._id, data?.product.category._id )
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product//related-product/${pid}/${cid}`)
            if(data.success) {
                setRelatedProducts(data.products)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(()=> {
        if(slug) {
            getProduct();
        }
    }, [])

    // console.log(product)
    // console.log(relatedProducts)


  return (
    <Layout>
        <h4>Product Details</h4>
        <div className="col">
                <div className="card h-100">
                  <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${product?._id}`}
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
                    <h5 className="card-title">{product?.name}</h5>

                    {/* {product.description.length > 30 ? (
                      <p className="card-text">
                        {description?.substring(0, 70)}...
                      </p>
                    ) : (
                      <p className="card-text">{product?.description}</p>
                    )} */}

                    <p>${product?.price}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      <Link to={`/product/${product?.slug}`} className="btn btn-primary me-3" >see more</Link>
                      <button className="btn btn-primary">add to cart</button>
                    </small>
                  </div>
                </div>
              </div>


              <div className='row'>
                {
                    relatedProducts?.map((product)=> (
                        <div key={product._id}>
                            <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${product?._id}`}
                    className="card-img-top"
                    alt="product image"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      backgroundImage:
                        "linear-gradient(120deg, #d6e6ff 0%, #cfeffd 100%)",
                    }}
                  />
                  {product.name}
                        </div>
                    ))
                }
              </div>
    </Layout>
  )
}

export default ProductDetails
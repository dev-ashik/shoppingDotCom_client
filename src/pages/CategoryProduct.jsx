import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const param = useParams();

    const getProduct = async () => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v1/product/product-category/${param.slug}`)

            setProducts(data?.products);
            setCategory(data.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getProduct();
    }, [param.slug])
    console.log(products, category)
  return (
    <Layout>
        <div className="container">
            <h4>Category: {category.name}</h4>
        </div>
    </Layout>
  )
}

export default CategoryProduct
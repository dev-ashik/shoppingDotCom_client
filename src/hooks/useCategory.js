import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverURL } from '../../serverUrl';

const useCategory = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async() => {
        try {
            const { data } = await axios.get(
              `${serverURL}/api/v1/category/get-categories`
            );
            if (data.success) {
              setCategories(data.categorys);
            }
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(()=> {
        getCategories();
    }, [])

  return categories
}

export default useCategory
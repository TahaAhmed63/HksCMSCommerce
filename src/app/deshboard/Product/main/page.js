"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PoductTable from '@/MainComponents/PoductTable';

 const MainProductpage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mx-auto">
      <PoductTable products={products} />
    </div>
  );
};

export default MainProductpage
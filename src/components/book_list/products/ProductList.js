import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BooksWrapper } from './productListStyles';
import ProductListTop from './top/ProductListTop';
import Product from './mainProdList/Product';
import { ProdGridBox } from './mainProdList/styles';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(false);
  useEffect(() => {
    const fetchProductList = async () => {
      const resp = await fetch('/products/all');
      if (resp.ok) {
        const result = await resp.json();
        setProducts(result);
      } else {
        setMessage(true);
      }
    };
    fetchProductList();
  }, []);
  return (
    <BooksWrapper>
      <ProductListTop />
      <ProdGridBox>
        {message && <h1>Сбой сервера ... перезагрузите страницу</h1>}
        {products.length > 0 && products.map((item) => (
          <Link
            to={`/book/${item.id}`}
            key={item.id}
            style={{ textDecoration: 'none' }}
          >
            <Product
              title={item.title}
              price={item.price}
              url={item.cover}
              author={item.author}
            />
          </Link>

        ))}
      </ProdGridBox>


    </BooksWrapper>
  );
};

export default ProductList;

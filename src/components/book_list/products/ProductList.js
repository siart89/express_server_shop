import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BooksWrapper } from './productListStyles';
import ProductListTop from './top/ProductListTop';
import Product from './mainProdList/Product';
import { ProdGridBox } from './mainProdList/styles';
import setLength from '../../../store/actions/setLength';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const { pageNum, maxOnPage, sort } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProductList = async () => {
      const resp = await fetch(`/products/all?pagenum=${pageNum}&limit=${maxOnPage}&sort=${sort}`);
      if (resp.ok) {
        const result = await resp.json();
        setProducts(result.product);
        dispatch(setLength(result.product.length, result.count));
      } else {
        setMessage(true);
      }
    };
    fetchProductList();
  }, [dispatch, maxOnPage, pageNum, sort]);
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

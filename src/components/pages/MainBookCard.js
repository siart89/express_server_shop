import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookCardWrapper } from '../bookCard/bookCardStyles';
import BookInfo from '../bookCard/BookInfo';
import PriceInfo from '../bookCard/PriceInfo';

const MainBookCard = () => {
  const [info, setInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/book/card/${id}`);
      if (resp.ok) {
        const result = await resp.json();
        setInfo(result);
      } else {
        setInfo(null);
      }
    };
    fetchData();
  }, [id]);
  console.log(info);
  return (
    <BookCardWrapper>
      {info && (
        <>
          <BookInfo
            title={info.title}
            author={info.author}
            cover={info.cover}
            description={info.description}
          />
          <PriceInfo price={info.price} />
        </>
      )}
    </BookCardWrapper>
  );
};

export default MainBookCard;

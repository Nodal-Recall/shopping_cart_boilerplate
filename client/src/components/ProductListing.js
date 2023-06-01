import React from "react";

import Product from './Product.js';

const ProductListing = ({ products, onSubmitEdit, onDelete }) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(({ _id: id, title, price, quantity }) => {
          return (
            <Product
              key={id}
              id={id}
              name={title}
              price={price}
              quantity={quantity}
              onSubmitEdit={onSubmitEdit}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ProductListing;

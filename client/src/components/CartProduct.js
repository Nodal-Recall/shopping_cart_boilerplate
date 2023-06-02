import { useState } from "react";

const CartProduct = ({ name, price, quantity }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>${price}</td>
    </tr>
  );
};

export default CartProduct;

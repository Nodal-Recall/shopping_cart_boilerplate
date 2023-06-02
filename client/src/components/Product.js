import { useState } from "react";
import EditProductForm from "./EditProductForm";

const Product = ({
  id,
  name,
  price,
  quantity,
  onSubmitEdit,
  onDelete,
  onAddToCart
}) => {
  const [editFormVisible, setEditFormVisible] = useState(false);

  const onToggleVisibility = () => {
    setEditFormVisible((prevState) => !prevState);
  };

  const onDeleteButton = () => {
    onDelete(id);
  };

  const onAddToCartButton = () => {
    onAddToCart(id);
  };

  const makeRed = (quantity) => {
    if (quantity === 0) {
      return "quantity none-left";
    }

    return "quantity";
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{name}</h3>
        <p className="price">${price} </p>
        <p className={makeRed(quantity)}>
          {quantity} left in stock
        </p>
        <div className="actions product-actions">
          <button
            className="add-to-cart"
            onClick={onAddToCartButton}
            disabled={quantity === 0}>
            Add to Cart
          </button>
          <button
            className="edit"
            onClick={onToggleVisibility}
          >Edit</button>
        </div>
        <button
          className="delete-button"
          onClick={onDeleteButton}>
            <span>X</span>
        </button>
      </div>
      {editFormVisible ?
        <EditProductForm
          id={id}
          onToggleVisibility={onToggleVisibility}
          initialName={name}
          initialPrice={price}
          initialQuantity={quantity}
          onSubmitEdit={onSubmitEdit}
        /> : ""}
    </li>
  );
};

export default Product;

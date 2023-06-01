import { useState } from "react";
import EditProductForm from "./EditProductForm";

const Product = ({ id, name, price, quantity, onSubmitEdit, onDelete }) => {
  const [editFormVisible, setEditFormVisible] = useState(false);

  const onToggleVisibility = () => {
    setEditFormVisible((prevState) => !prevState);
  };

  const onDeleteButton = () => {
    onDelete(id);
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{name}</h3>
        <p className="price">${price} </p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
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

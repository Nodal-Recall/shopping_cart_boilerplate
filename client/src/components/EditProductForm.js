import { useState } from "react";

const EditProductForm = ({
    id,
    onToggleVisibility,
    initialName,
    initialPrice,
    initialQuantity,
    onSubmitEdit
}) => {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(initialQuantity);

  const reset = () => {
    setName("");
    setPrice("");
    setQuantity("");
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    onSubmitEdit({ id, title: name, price, quantity }, reset)
    onToggleVisibility();
  }

  return (
    <div className="edit-form">
    <h3>Edit Product</h3>
    <form onSubmit={onSubmitForm}>
      <div className="input-group">
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          value={name}
          aria-label="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-price">Price</label>
        <input
          type="number"
          id="product-price"
          value={price}
          aria-label="Product Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-quantity">Quantity</label>
        <input
          type="number"
          id="product-quantity"
          value={quantity}
          aria-label="Product Quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="actions form-actions">
        <button type="submit">Update</button>
        <button
          type="button"
          onClick={onToggleVisibility}>
          Cancel
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditProductForm;

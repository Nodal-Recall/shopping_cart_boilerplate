import { useState } from "react";

const AddProductForm = ({ onSubmit }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const onToggleVisibility = () => {
    setFormVisible((prevState) => !prevState);
  };

  const reset = () => {
    setName("");
    setPrice("");
    setQuantity("");

    onToggleVisibility();
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    onSubmit({ title: name, price, quantity }, reset);
  }

  const visibilityClass = formVisible ?
    'add-form visible' : 'add-form';

  return (
    <div className={visibilityClass}>
      <p>
        <button
          className="add-product-button"
          onClick={onToggleVisibility}
        >Add A Product</button>
      </p>
      <h3>Add Product</h3>
      <form onSubmit={onSubmitForm}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={onToggleVisibility}
          >Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;

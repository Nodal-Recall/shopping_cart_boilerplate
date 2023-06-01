import { useState, useEffect } from "react";

import ProductListing from './ProductListing'
import AddProductForm from './AddProductForm'

import productService from '../services/products'

const Header = () => {
  return (
    <header>
      <h1>The Shop!</h1>
      <p>Your cart is empty</p>
      <p>Total: $0</p>
      <button className="checkout" disabled>Checkout</button>
    </header>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      let products = await productService.getAll();
      setProducts(products);
    })();
  }, []);

  const handleSubmit = async (newProduct, callback) => {
    try {
      const createdProduct = await productService.create(newProduct);
      setProducts((prevState) => prevState.concat(createdProduct));

      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitEdit = async (updatedProduct, callback) => {
    try {
      const id = updatedProduct.id;
      const product = {
        title: updatedProduct.title,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity
      }

      const response = await productService.update(id, product)

      setProducts((prevState) => {
        return prevState.map((p) => {
          if (p._id === id) {
            return response;
          } else {
            return p;
          }
        })
      })

      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);

      setProducts((prevState) => {
        return prevState.filter((p) => p._id !== id)
      });
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="comments">
      <Header />
      <main>
        <ProductListing
          products={products}
          onSubmitEdit={handleSubmitEdit}
          onDelete={handleDelete} />
      </main>
      <AddProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;

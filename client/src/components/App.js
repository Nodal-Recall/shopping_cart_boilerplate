import { useState, useEffect } from "react";

import Cart from "./Cart";
import ProductListing from './ProductListing'
import AddProductForm from './AddProductForm'

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllItems,
  addItem,
  clearCart,
} from '../services/products'

const Header = ({ cart, onCheckout }) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart
        cart={cart}
        onCheckout={onCheckout} />
    </header>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    (async () => {
      let products = await getAllProducts();
      setProducts(products);

      let cart = await getAllItems();
      setCart(cart);
    })();
  }, []);

  const handleSubmitAddProduct = async (newProduct, callback) => {
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts((prevState) => prevState.concat(createdProduct));

      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitEditProduct = async (updatedProduct, callback) => {
    try {
      const id = updatedProduct.id;
      const product = {
        title: updatedProduct.title,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity
      }

      const response = await updateProduct(id, product)

      setProducts((prevState) => {
        return prevState.map((p) => {
          if (p._id === id) {
            return response;
          }

          return p;
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
      await deleteProduct(id);

      setProducts((prevState) => {
        return prevState.filter((p) => p._id !== id)
      });

      setCart((prevState) => {
        return prevState.filter((p) => p.productId !== id)
      })
    } catch(error) {
      console.log(error);
    }
  }

  const handleAddToCart = async (id) => {
    try {
      const { product, item } = await addItem(id);

      setCart((prevState) => {
        let quantityUpdated = false;

        const newCart = prevState.map((i) => {
          if (i.productId === id) {
            quantityUpdated = true;
            return item;
          } else {
            return i;
          }
        })

        if (quantityUpdated) {
          return newCart;
        }

        return prevState.concat(item);
      });

      setProducts((prevState) => {
        return prevState.map((p) => p._id === id ? product : p);
      });
    } catch(error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await clearCart();

      setCart([]);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="comments">
      <Header
        cart={cart}
        onCheckout={handleCheckout} />
      <main>
        <ProductListing
          products={products}
          onSubmitEdit={handleSubmitEditProduct}
          onDelete={handleDelete}
          onAddToCart={handleAddToCart}/>
      </main>
      <AddProductForm onSubmit={handleSubmitAddProduct} />
    </div>
  );
};

export default App;

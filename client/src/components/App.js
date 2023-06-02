import { useState, useEffect } from "react";

import Cart from "./Cart";
import ProductListing from './ProductListing'
import AddProductForm from './AddProductForm'

import productService from '../services/products'
import cartService from '../services/cart'

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
      let products = await productService.getAll();
      setProducts(products);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let cart = await cartService.getAll();
      setCart(cart);
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

  const handleAddToCart = async (id) => {
    try {
      const { product, item } = await cartService.add(id);

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
        return prevState.map((p) => {
          if (p._id === id) {
            return product;
          } else {
            return p;
          }
        })
      })
    } catch(error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await cartService.clear();

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
          onSubmitEdit={handleSubmitEdit}
          onDelete={handleDelete}
          onAddToCart={handleAddToCart}/>
      </main>
      <AddProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;

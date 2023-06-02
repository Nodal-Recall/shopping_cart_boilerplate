import CartProduct from "./CartProduct";

const Cart = ({ cart, onCheckout }) => {

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> : ""}
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((p) => {
            return (<CartProduct
                      key={p._id}
                      name={p.title}
                      price={p.price}
                      quantity={p.quantity} />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total">
              Total: ${cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button
          className="checkout"
          onClick={onCheckout}
          disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

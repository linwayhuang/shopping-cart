import { useOutletContext } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useOutletContext();

  if (cart.length === 0) return <h2>Your cart is empty</h2>;

  return (
    <div>
      <h1>Cart</h1>

      {cart.map((item) => (
        <div key={item.id}>
          <img src={item.image} width="70" />
          <h3>{item.title}</h3>
          <p>${item.price}</p>

          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.id, Number(e.target.value))
            }
          />

          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

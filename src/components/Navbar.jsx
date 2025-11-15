import { Link } from "react-router-dom"

export default function Navbar({cart}) {
    // Calculate total number of items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log("cart content", cart);
    console.log("total items:", totalItems);

    return (
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/shop">Shop</Link> |{" "}
            <Link to="/cart">Cart {totalItems > 0 && (<span>{totalItems}</span>)}</Link> |{" "}
        </nav>
    )
}
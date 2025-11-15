import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { fetchAllProducts } from "../data/products";

export default function ShopPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { handleAddToCart } = useOutletContext();

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await fetchAllProducts();
                
                // Add quantity field to each product
                const productsWithQty = data.map((p) => ({...p, quantity: 0}));

                setProducts(productsWithQty);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    // Update quantity inside product
    const updateLocalQuantity = (id, newQty) => {
        setProducts(prevProducts => 
            prevProducts.map(product =>
                product.id === id
                ? { ... product, quantity: Math.max(0, newQty)}
                : product
            )
        );
    };

    const increment = (id) => {
        const product = products.find(p => p.id === id);
        updateLocalQuantity(id, product.quantity + 1);
    };
    
    const decrement = (id) => {
        const product = products.find(p => p.id === id);
        updateLocalQuantity(id, product.quantity - 1);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Welcome to the Shop Page</h1>;
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        <Link to={`/shop/${p.slug}`} state={{ id: p.id }}>
                            <img
                                src={p.image}
                                alt={p.title}
                                style={{width: "80px", verticalAlign: "middle"}}
                            />{' '}
                            <h3>{p.title}</h3>
                            <p><strong>{p.price}</strong></p>
                        </Link>
                        <div>
                            <button onClick={() => decrement(p.id)}>-</button>
                            <input type="number" min="0" readOnly value={p.quantity}/>
                            <button onClick={() => increment(p.id)}>+</button>
                        </div>
                        <button onClick={() => handleAddToCart(p)}>Add To Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
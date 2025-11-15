import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchProductById, fetchAllProducts, createSlug } from "../data/products";

export default function ProductDetail() {
    const { slug } = useParams(); // The variable name must match the name after the semicolon
    // useParams extracts the dynamic part of the URL

    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProduct() {
            try {
                // Option 1: if we came from Shop page, we already have the ID
                if (location.state?.id) {
                    const data = await fetchProductById(location.state.id);
                    setProduct(data);
                    return;
                }

                // Option 2: If user refreshed or came directly via URL, find product by slug
                const allProducts = await fetchAllProducts();
                const found = allProducts.find((p) => createSlug(p.title) === slug);
                if (found) {
                    const data = await fetchProductById(found.id);
                    setProduct(data);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [slug, location.state]);

    if (loading) return <p>Loading product...</p>;
    if (error) return <p>Error: {error}</p>
    if (!product) return <h1>Product not found</h1>;

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} style={{width: "200px"}} />
            <p>{product.description}</p>
            <p>
                <strong>${product.price}</strong>
            </p>
            <p>Category: {product.category}</p>
        </div>
    )
}
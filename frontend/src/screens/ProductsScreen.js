import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./products.css"

export default function ProductsScreen() {
    useEffect(() => {
        fetchProducts()
    }, [])

    const [products, setProducts] = useState([]);

    const [numbers, setNumbers] = useState([]);
    const [activePage, setActivePage] = useState(0);

    const url = "https://bulk-upload-system-by-jitendra.herokuapp.com/products?page=1&limit=20"

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchProducts = () => {
        setLoading(true)
        axios.get(url)
            .then((res) => {
                if (res.data.data) {
                    setProducts(res.data.data)
                    let numArray = [];
                    for (let i = 1; i <= res.data.totalPages; i++) {
                        numArray.push(i);
                    }
                    setActivePage(1)
                    setLoading(false)
                    setNumbers(numArray);
                }

                if (res.data.message) {
                    setMessage(res.data.message);
                    setLoading(false)
                }
            }
            ).catch((e) => {
                setError(e.message)
                setLoading(false);
            })
    }

    const fetchSomeProducts = (item) => {
        const url = `https://bulk-upload-system-by-jitendra.herokuapp.com/products?page=${item}&limit=20`
        setActivePage(item)
        setLoading(true);
        axios.get(url)
            .then((res) => {
                setProducts(res.data.data)
                setLoading(false);
            }
            ).catch((e) => {
                setLoading(false);
                setError(e.message);
            })
    }

    return (
        <div>
            <div className='products-container'>
                {
                    !loading && products.map((item) => <ProductItem key={item._id} item={item} />)
                }

            </div>
            <div className='pagination-bar'>

                {
                    numbers.length && (
                        numbers.map((item) =>
                            <span onClick={() => fetchSomeProducts(item)} key={item} style={{ padding: 10, backgroundColor: activePage === item ? "red" : "lightpink", color: activePage === item ? "white" : "black", marginRight: 10 }}>
                                {item}
                            </span>)
                    )
                }
            </div>
            {
                message && (
                    <div style={{ width: "80%", padding: 20, marginTop: 30, backgroundColor: "red", borderRadius: 10, marginLeft: "10%" }}>
                        <h2 style={{ textAlign: "center", color: "lavenderblush" }}>{message}</h2>
                    </div>
                )
            }

            {
                loading && (
                    <div style={{ width: "80%", padding: 20, marginTop: 30, backgroundColor: "lightgreen", borderRadius: 10, marginLeft: "10%" }}>
                        <h2 style={{ textAlign: "center", color: "lavenderblush" }}>Loading ...</h2>
                    </div>
                )
            }
            {
                error && (
                    <div style={{ width: "80%", padding: 20, marginTop: "20%", backgroundColor: "red", borderRadius: 10, marginLeft: "10%" }}>
                        <h2 style={{ textAlign: "center", color: "lavenderblush" }}>{error}</h2>
                    </div>
                )
            }
        </div>
    )
}
const ProductItem = ({ item }) => {
    return (
        <div className='product-container'>
            <div className='image-container'>
                <img src={item.image} alt="product" />
            </div>
            <div className='product-details-container'>
                <p className='row'><span style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</span> <span style={{ fontWeight: "bold" }}>₹{item.price}</span></p>
                <p className='row'><span style={{ fontStyle: "italic" }}>{item.category}</span> <span>{item.inStock ? "In Stock - " + item.stock  : "Out of stock"}</span></p>
                <p className='product-description'>{item.description}</p>
                <button>Add to Cart</button>
            </div>
        </div>
    )
}
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../pages/Cart';

export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    // localStorage.setItem('temp', "first")
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark  position-fixed"
                style={{ filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fst-italic" to="/">Food Express Delivery</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            

                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" to="/myOrder" aria-current="page">My Orders</Link>
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form>
                            : <div>
                                <button className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                                        Cart {" "}
                                        <Badge pill bg="danger" >{items.length}
                                            {/* <ShoppingCartIcon /> */}
                                        </Badge>
                                </button>
                                    {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /></Modal> : null}
                                <button onClick={handleLogout} className="btn bg-white text-danger mx-2">Logout</button>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
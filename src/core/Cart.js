import React, { useState, useEffect } from 'react'
import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getproducts } from './helper/coreapicalls';
import { loadCart } from './helper/CartHelper';
import BraintreePayment from './PaymentGateways/BraintreePayment';
import { IsAuthenticated } from '../auth/helper';
import { Link } from "react-router-dom";


const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        RemoveFromCart={true}
                        AddToCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        );
    };

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">
                    {products.length > 0 ? (
                        loadAllProducts()
                    ) : (
                            <h4>No products</h4>
                        )}
                </div>
                <div className="col-6">
                    {IsAuthenticated() ? (
                        <BraintreePayment products={products} setReload={setReload} />
                    ) : (<div>
                        <h4>Please Login to checkout</h4>
                        <Link className="btn btn-success btn-block" to="/signin"> Login</Link></div>
                        )}
                </div>
            </div>
        </Base>
    );
};

export default Cart;
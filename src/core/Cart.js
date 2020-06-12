import React, { useState, useEffect } from 'react'
import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getproducts } from './helper/coreapicalls';
import { loadCart } from './helper/CartHelper';
import StripeCheckout from './PaymentGateways/StripeCheckout';


export default function Cart() {

    const [products, setproducts] = useState([])

    const [reload, setReload] = useState(false)


    useEffect(() => {
        setproducts(loadCart())
    }, [reload])

    const loadAllProducts = () => {
        return (
            <div>
                <h2>Cart Items</h2>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        RemoveFromCart={true}
                        AddToCart={false}
                        setReload={setReload}
                        reload={reload} />
                ))}
            </div>
        )
    }
    const loadCheckout = () => {
        return (
            <div>
                <StripeCheckout
                    products={products}
                    setReload={setReload} />
            </div>
        )
    }

    return (
        <Base tittle="Cart items" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    );
}

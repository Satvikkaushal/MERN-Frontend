import React, { useState, useEffect } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemformCart } from './helper/CartHelper';

const Card = ({
    product, AddToCart = true,
    RemoveFromCart = false,
    setReload = f => f,
    //function(f){return f}
    reload = undefined
}) => {



    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const cartTittle = product
        ? product.name
        : "A photo from pexels";

    const cartDescription = product
        ? product.description
        : "Default description";

    const cartPrice = product
        ? product.price
        : "Not able to load price";


    const getRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const addToCart = () => {
        addItemToCart(product, () => {
            setRedirect(true)
        })
    }


    const showAddToCart = (AddToCart) => {
        return (
            AddToCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (RemoveFromCart) => {
        return (
            RemoveFromCart && (
                <button
                    onClick={() => {
                        removeItemformCart(product._id)
                        setReload(!reload);
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )

    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTittle}</div>
            <div className="card-body" >
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cartDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {getRedirect(redirect)}
                        {showAddToCart(AddToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(RemoveFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;



